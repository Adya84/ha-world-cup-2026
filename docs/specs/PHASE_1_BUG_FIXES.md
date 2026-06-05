# Phase 1 — Bug Fixes: Scorers API + Adaptive Polling

> **Status:** TODO  
> **Blocking:** Phases 2, 3, 4  
> **Files to modify:** `api.py`, `coordinator.py`  
> **Files to read first:** `docs/DEVELOPMENT.md` (Sections 4–6)

---

## Overview

Phase 1 fixes two critical defects:

1. **Scorers API never called** — `coordinator.py` does not fetch `/v4/competitions/WC/scorers`, so all four player-stat sensors (`WorldCupTopScorerSensor`, `WorldCupTopScorersSensor`, `WorldCupTopAssistSensor`, `WorldCupTopAssistsSensor`) return empty data in production.

2. **Static 15-minute poll interval** — Live match scores are only refreshed every 15 minutes. This should drop to 1 minute whenever at least one match has status `IN_PLAY` or `PAUSED`.

---

## Change 1: Add Scorers Endpoint to `api.py`

### File: `custom_components/world_cup_2026/api.py`

**Current state:**
```python
class WorldCupAPI:
    def __init__(self, api_key):
        self.api_key = api_key

    async def get_matches(self): ...
    async def get_standings(self): ...
```

**Required state after change:**
```python
import json
import os
import aiohttp


FIXTURES_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "tests", "fixtures")


class WorldCupAPI:
    def __init__(self, api_key, demo_mode: bool = False):
        """
        Args:
            api_key: football-data.org API key. Ignored when demo_mode=True.
            demo_mode: When True, all methods return data from tests/fixtures/*.json
                       instead of making HTTP calls. Use for development and testing.
        """
        self.api_key = api_key
        self.demo_mode = demo_mode

    def _load_fixture(self, filename: str) -> dict:
        """Load a JSON fixture file. Raises FileNotFoundError if missing."""
        path = os.path.join(FIXTURES_DIR, filename)
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

    async def get_matches(self) -> dict:
        if self.demo_mode:
            return self._load_fixture("matches.json")
        return await self._get("https://api.football-data.org/v4/competitions/WC/matches")

    async def get_standings(self) -> dict:
        if self.demo_mode:
            return self._load_fixture("standings.json")
        return await self._get("https://api.football-data.org/v4/competitions/WC/standings")

    async def get_scorers(self) -> dict:
        """
        Returns top scorers for the World Cup.
        Uses limit=100 to capture all scorers, not just the default top 10.
        Returns {"scorers": []} on 404 (no matches played yet) rather than raising.
        """
        if self.demo_mode:
            return self._load_fixture("scorers.json")
        try:
            return await self._get(
                "https://api.football-data.org/v4/competitions/WC/scorers?limit=100"
            )
        except aiohttp.ClientResponseError as err:
            if err.status == 404:
                # Scorers endpoint returns 404 before any matches are played.
                return {"scorers": []}
            raise

    async def _get(self, url: str) -> dict:
        """Shared GET helper with auth header and error raising."""
        headers = {"X-Auth-Token": self.api_key}
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                return await response.json()
```

**Why this way:**
- `demo_mode` is set at construction time (not a global flag), making it easy to unit-test by passing `demo_mode=True` to the API object.
- The shared `_get()` helper eliminates repeated boilerplate and makes it easy to add headers, retries, or timeout logic later.
- The 404 guard on `get_scorers()` handles the pre-tournament state gracefully without crashing the coordinator.

---

## Change 2: Adaptive Polling + Scorers Fetch in `coordinator.py`

### File: `custom_components/world_cup_2026/coordinator.py`

**Current state:**
```python
from datetime import timedelta
import logging
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from .api import WorldCupAPI

_LOGGER = logging.getLogger(__name__)
SCAN_INTERVAL = timedelta(minutes=15)

class WorldCupCoordinator(DataUpdateCoordinator):
    def __init__(self, hass, api: WorldCupAPI):
        super().__init__(hass, _LOGGER, name="World Cup 2026", update_interval=SCAN_INTERVAL)
        self.api = api

    async def _async_update_data(self):
        try:
            matches = await self.api.get_matches()
            standings = await self.api.get_standings()
            return {
                "matches": matches.get("matches", []),
                "standings": standings.get("standings", []),
            }
        except Exception as err:
            raise UpdateFailed(f"Error fetching World Cup data: {err}") from err
```

**Required state after change:**
```python
from datetime import timedelta
import logging
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
from .api import WorldCupAPI

_LOGGER = logging.getLogger(__name__)

SCAN_INTERVAL_NORMAL = timedelta(minutes=15)
SCAN_INTERVAL_LIVE = timedelta(minutes=1)

LIVE_STATUSES = {"IN_PLAY", "PAUSED"}


class WorldCupCoordinator(DataUpdateCoordinator):
    def __init__(self, hass, api: WorldCupAPI):
        super().__init__(
            hass,
            _LOGGER,
            name="World Cup 2026",
            update_interval=SCAN_INTERVAL_NORMAL,
        )
        self.api = api

    async def _async_update_data(self) -> dict:
        """
        Fetch all data from the three API endpoints.

        Partial failure strategy: if the scorers endpoint fails (e.g., 429),
        we still return matches and standings so the majority of sensors keep
        working. A warning is logged; the coordinator does NOT raise UpdateFailed
        for a scorers-only failure.

        Adaptive polling: after each successful fetch, the update_interval is
        adjusted based on whether any live matches are detected. HA's coordinator
        picks up the new interval on the NEXT scheduled tick — this is correct
        behaviour per HA internals.
        """
        try:
            matches_data = await self.api.get_matches()
            standings_data = await self.api.get_standings()
        except Exception as err:
            raise UpdateFailed(f"Error fetching World Cup data: {err}") from err

        # Scorers: soft failure — don't crash the coordinator if this fails
        try:
            scorers_data = await self.api.get_scorers()
        except Exception as err:
            _LOGGER.warning("Failed to fetch scorers (will retry next cycle): %s", err)
            scorers_data = {"scorers": []}

        matches = matches_data.get("matches", [])
        standings = standings_data.get("standings", [])
        scorers = scorers_data.get("scorers", [])

        # Adaptive polling: switch to 1-minute interval when matches are live
        has_live = any(m.get("status") in LIVE_STATUSES for m in matches)
        new_interval = SCAN_INTERVAL_LIVE if has_live else SCAN_INTERVAL_NORMAL

        if self.update_interval != new_interval:
            _LOGGER.debug(
                "Switching poll interval to %s (live=%s)",
                new_interval,
                has_live,
            )
            self.update_interval = new_interval

        return {
            "matches": matches,
            "standings": standings,
            "scorers": scorers,
        }
```

**Why this way:**
- `SCAN_INTERVAL_NORMAL` and `SCAN_INTERVAL_LIVE` are module-level constants — easy to tune without hunting through logic.
- `LIVE_STATUSES` is a set (O(1) lookup) rather than a list.
- Scorers failure is a warning, not a hard error. This matters because the scorers endpoint can legitimately return 404 or 429 more often than matches/standings.
- The interval only logs when it actually changes, reducing noise.
- `DataUpdateCoordinator.update_interval` is a public attribute — assigning to it is supported by HA's internal scheduler.

---

## Change 3: Demo Mode — Already Implemented

> **Skip this change. Demo mode is fully implemented via OptionsFlow — no code changes needed here.**

Demo mode is a UI toggle in HA's Settings UI (Settings → Devices & Services → World Cup 2026 → Configure). It is stored in `config_entry.options[OPT_DEMO_MODE]` and read in `__init__.py`:

```python
demo_mode: bool = entry.options.get(OPT_DEMO_MODE, DEFAULT_DEMO_MODE)
api = WorldCupAPI(api_key=entry.data[CONF_API_KEY], demo_mode=demo_mode)
```

The integration reloads automatically when the option is changed. `api.py` already supports the `demo_mode` constructor argument (see Change 1 above — the spec's `WorldCupAPI` definition includes it).

See `docs/TESTING.md` Section 1 for the full enable/disable workflow.

---

## Acceptance Criteria

- [ ] `WorldCupTopScorerSensor.native_value` returns a player name and goal count (not "No scorers yet") when fixtures data is loaded
- [ ] `WorldCupTopAssistSensor.native_value` similarly returns real data
- [ ] `coordinator.update_interval` equals `timedelta(minutes=1)` when a match with `status="IN_PLAY"` is present in the fetched data
- [ ] `coordinator.update_interval` equals `timedelta(minutes=15)` when all matches are FINISHED or TIMED
- [ ] Enabling demo mode via the HA UI (Settings → Configure → Demo mode on) causes the coordinator to load from `tests/fixtures/*.json` with no HTTP calls
- [ ] If `tests/fixtures/scorers.json` does not exist when demo mode is active, a `FileNotFoundError` is raised with a clear path — not a silent failure
- [ ] No errors or warnings in HA logs during normal operation after this change

---

## Testing This Phase

1. Enable demo mode: Settings → Devices & Services → World Cup 2026 → Configure → Demo mode on → Submit
2. Confirm integration reloads (HA logs show reload message)
3. Ensure `tests/fixtures/matches.json`, `tests/fixtures/standings.json`, and `tests/fixtures/scorers.json` exist (see `docs/TESTING.md`)
4. Go to Developer Tools → States → filter by `world_cup`
5. Verify `sensor.world_cup_top_scorer` shows a player name, not "No scorers yet"
6. Verify `sensor.world_cup_top_assist` shows a player name, not "No assists yet"
7. Edit `tests/fixtures/matches.json` — change one match's `status` to `"IN_PLAY"` — then call `homeassistant.update_entity` on any world_cup sensor and verify the interval changes in HA logs
