# World Cup 2026 HA Integration — Development Guide

> **Purpose**: This document is the single source of truth for any developer or AI model picking up work on this integration. Read this before touching any code. Every architectural decision is explained here so you can make correct judgment calls on edge cases.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Repository Structure](#2-repository-structure)
3. [Architecture & Data Flow](#3-architecture--data-flow)
4. [Home Assistant Integration Patterns](#4-home-assistant-integration-patterns)
5. [API Layer](#5-api-layer)
6. [Coordinator Pattern](#6-coordinator-pattern)
7. [Sensor Pattern](#7-sensor-pattern)
8. [Code Conventions](#8-code-conventions)
9. [Phase Roadmap](#9-phase-roadmap)
10. [Testing Strategy](#10-testing-strategy)
11. [Common Pitfalls](#11-common-pitfalls)

---

## 1. Project Overview

This is a **HACS custom integration** for Home Assistant that surfaces FIFA World Cup 2026 data as HA sensors. Data comes from the **football-data.org v4 API** (free tier). Users configure it with a free API key.

**Free tier API endpoints used:**
| Endpoint | Data |
|---|---|
| `GET /v4/competitions/WC/matches` | All 104 matches, scores, status, stage, group |
| `GET /v4/competitions/WC/standings` | Group standings tables with form |
| `GET /v4/competitions/WC/scorers?limit=100` | Top scorers with goals, assists, penalties |

**Free tier rate limit:** 10 requests/minute. With 3 endpoints and adaptive polling, this is never approached.

**Key constraint:** Everything must work within the free tier. Do not add endpoints that require paid tiers (individual match detail, team squads, head-to-head). See Section 5 for what data is actually returned by each free-tier endpoint.

---

## 2. Repository Structure

```
ha-world-cup-2026/
├── custom_components/
│   └── world_cup_2026/
│       ├── __init__.py          # Entry point: async_setup_entry, async_unload_entry, coordinator init
│       ├── api.py               # WorldCupAPI: raw HTTP calls, demo mode
│       ├── coordinator.py       # WorldCupCoordinator: DataUpdateCoordinator, adaptive polling
│       ├── sensor.py            # All sensor classes + helper functions
│       ├── config_flow.py       # ConfigFlow (API key + validation) + OptionsFlow (demo mode toggle)
│       ├── const.py             # DOMAIN, CONF_API_KEY, OPT_DEMO_MODE, DEFAULT_DEMO_MODE
│       ├── manifest.json        # Integration metadata for HACS
│       ├── strings.json         # HA config/options UI strings (source of truth)
│       └── translations/
│           └── en.json          # HA runtime translations (must match strings.json)
├── tests/
│   ├── conftest.py              # pytest fixtures: raw loaders + all_fixtures + empty_fixtures
│   └── fixtures/
│       ├── matches.json         # Realistic sample: FINISHED, IN_PLAY, TIMED, ET, pens
│       ├── standings.json       # 6 groups with tables + form fields (A-F)
│       └── scorers.json         # 8 scorers covering all player-stat edge cases
├── docs/
│   ├── DEVELOPMENT.md           # THIS FILE
│   ├── TESTING.md               # How to test without live API / active matches
│   ├── specs/
│   │   ├── PHASE_1_BUG_FIXES.md
│   │   ├── PHASE_2_ENRICH_SENSORS.md
│   │   ├── PHASE_3_COMPUTED_STATS.md
│   │   └── PHASE_4_PLAYER_STATS.md
│   └── guides/
│       ├── installation.md      # End-user installation guide
│       └── dashboard_installation.md  # Dashboard setup guide
├── Examples/                    # Dashboard YAML examples
└── README.md                    # User-facing docs (HACS listing)
```

**Cleanup needed (manual `git rm` required — sandbox cannot delete pre-existing files):**
- `brands/` at repo root — duplicate of `custom_components/world_cup_2026/brand/`
- `custom_components/world_cup_2026/logo.png` — superseded by `brand/` folder
- `specs/` at repo root — contents moved to `docs/specs/`
- `Instructions Guide/` at repo root — contents moved to `docs/guides/`

---

## 3. Architecture & Data Flow

```
football-data.org API
        │
        │  HTTP (aiohttp, every N minutes)
        ▼
  WorldCupAPI (api.py)
  - get_matches()       → raw JSON dict
  - get_standings()     → raw JSON dict
  - get_scorers()       → raw JSON dict
  - supports demo_mode  → loads from tests/fixtures/*.json
        │
        │  called by coordinator
        ▼
  WorldCupCoordinator (coordinator.py)
  - extends DataUpdateCoordinator
  - calls all 3 API methods in one update cycle
  - stores data as: { "matches": [...], "standings": [...], "scorers": [...] }
  - ADAPTIVE POLLING: 1 min when live matches exist, 15 min otherwise
        │
        │  coordinator.data shared across all sensors via CoordinatorEntity
        ▼
  Sensor entities (sensor.py)
  - All extend CoordinatorEntity + SensorEntity
  - Read from coordinator.data — NEVER call API directly
  - native_value: simple scalar (string, int, float) — HA state
  - extra_state_attributes: dict with rich data — HA attributes
        │
        │  HA state machine
        ▼
  Home Assistant Frontend / Automations
```

**Critical rule:** Sensors never call the API. They only read from `coordinator.data`. All data transformation happens in sensor classes or shared helper functions in `sensor.py`.

---

## 4. Home Assistant Integration Patterns

These are non-negotiable HA requirements. Violating them causes bugs, warnings in HA logs, or broken entity registries.

### 4.1 Coordinator Created in `__init__.py`

The `WorldCupCoordinator` is created and stored in `async_setup_entry` inside `__init__.py`, **not** in `sensor.py`. This is the correct HA pattern — it means a single coordinator instance is shared across all sensor entities, and `async_unload_entry` can cleanly tear it down.

```python
# __init__.py
async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    demo_mode: bool = entry.options.get(OPT_DEMO_MODE, DEFAULT_DEMO_MODE)
    api = WorldCupAPI(api_key=entry.data[CONF_API_KEY], demo_mode=demo_mode)
    coordinator = WorldCupCoordinator(hass, api)
    await coordinator.async_config_entry_first_refresh()
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = coordinator
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(_async_reload_entry))
    return True
```

`sensor.py` reads the coordinator from `hass.data[DOMAIN][entry.entry_id]` — it never creates it.

### 4.2 Options Flow and Demo Mode

Demo mode is a **runtime toggle** exposed via HA's Settings UI — not a code constant. It is set in `const.py` as `OPT_DEMO_MODE = "demo_mode"` with `DEFAULT_DEMO_MODE = False`.

**User flow:** Settings → Devices & Services → World Cup 2026 → Configure → toggle "Demo mode" → Save. The integration reloads automatically (via `add_update_listener`), and on next `async_setup_entry` the new value is read from `entry.options`.

**Why not a constant:** A code constant requires a git commit and HA restart. The OptionsFlow approach lets users (and developers) toggle it without touching code, and it persists across HA restarts via the config entry store.

```python
# WorldCupOptionsFlow in config_flow.py
async def async_step_init(self, user_input=None):
    if user_input is not None:
        return self.async_create_entry(title="", data=user_input)
    current = self._config_entry.options.get(OPT_DEMO_MODE, DEFAULT_DEMO_MODE)
    schema = vol.Schema({vol.Optional(OPT_DEMO_MODE, default=current): bool})
    return self.async_show_form(step_id="init", data_schema=schema)
```

### 4.3 Unique IDs

Every sensor **must** have a stable, unique `_attr_unique_id`. Format: `world_cup_{descriptor}`.

```python
class WorldCupExampleSensor(CoordinatorEntity, SensorEntity):
    _attr_unique_id = "world_cup_example"   # SNAKE_CASE, no spaces
    _attr_name = "World Cup Example"         # Human-readable
```

**Never** use dynamic data (match IDs, scores) in `_attr_unique_id`. If the unique ID changes, HA creates a duplicate entity and orphans the old one.

### 4.4 State Size Limits

HA has a **16 KB limit** on entity state + attributes combined. Sensors with large lists (fixtures, scorers) must cap their attribute lists:

```python
# Good: limit large lists
return {"matches": all_matches[:40]}

# Bad: return all 104 matches
return {"matches": all_matches}
```

Current limits in use:
- `WorldCupFixturesSensor`: 40 matches
- `WorldCupTopScorersSensor`: 20 scorers
- `WorldCupCompletedMatchesSensor`: last 20 matches

### 4.5 native_value Must Be a Scalar

`native_value` (the entity's main state) **must** be a string, int, or float. Never a dict or list. Rich data goes in `extra_state_attributes`.

```python
# Good
@property
def native_value(self):
    return "Argentina 2-1 France"

# Bad — will cause HA errors
@property
def native_value(self):
    return {"home": "Argentina", "score": "2-1"}
```

### 4.6 Units of Measurement

Declare units where semantically correct. This enables HA history graphs.

```python
_attr_native_unit_of_measurement = "%"     # for rate sensors
_attr_native_unit_of_measurement = "days"  # for countdown sensors
# Leave unset for string-valued sensors
```

### 4.7 SensorStateClass

For numeric sensors that benefit from HA statistics (history, graphs):

```python
from homeassistant.components.sensor import SensorStateClass

_attr_state_class = SensorStateClass.MEASUREMENT  # for totals that change
# Not needed for string-valued sensors
```

Do not set `state_class` on sensors whose value can decrease (e.g., matches remaining) — HA interprets MEASUREMENT as always-increasing for some graph types. Use `TOTAL_INCREASING` only for genuinely monotonic values like total goals.

### 4.8 Error Handling in Sensors

Sensors must return safe defaults when data is missing. Never raise exceptions from `native_value` or `extra_state_attributes`. Use `coordinator.data` guards:

```python
def get_matches(coordinator):
    return coordinator.data.get("matches", []) if coordinator.data else []
```

### 4.9 Entity Registration Order

New sensors added to `async_setup_entry` in `sensor.py` are appended to the `sensors` list. Do not reorder existing sensors — HA uses position for some internal tracking. Always append new sensors at the end of the list or in a new logical block.

### 4.10 CoordinatorEntity vs Polling

All sensors **must** use `CoordinatorEntity` (not `RestoreEntity` or plain `SensorEntity`). This ensures all sensors update in a single batch when the coordinator fetches new data, rather than each sensor making independent API calls.

```python
class MySensor(CoordinatorEntity, SensorEntity):
    def __init__(self, coordinator):
        super().__init__(coordinator)
        # CoordinatorEntity.__init__ handles listener registration
```

### 4.11 Translations

HA requires two files for config/options UI labels to render correctly:

- **`custom_components/world_cup_2026/strings.json`** — source of truth used by HA's translation tooling and the config flow validator.
- **`custom_components/world_cup_2026/translations/en.json`** — runtime file loaded by HA when displaying the UI. Must be identical to `strings.json`.

If you add a new field to `config_flow.py` (either `ConfigFlow` or `OptionsFlow`), you **must** add matching entries to both files under the relevant `config.step` or `options.step` key. Failing to do so results in the UI showing the raw key string (e.g., `"demo_mode"`) instead of a human-readable label.

---

## 5. API Layer

### 5.1 What the Free Tier Returns

**`/v4/competitions/WC/matches`** — Each match object includes:
```json
{
  "id": 12345,
  "utcDate": "2026-06-12T18:00:00Z",
  "status": "FINISHED",          // SCHEDULED | TIMED | IN_PLAY | PAUSED | FINISHED
  "minute": 90,                   // current minute (IN_PLAY/PAUSED only)
  "stage": "GROUP_STAGE",         // GROUP_STAGE | LAST_32 | LAST_16 | QUARTER_FINALS | SEMI_FINALS | THIRD_PLACE | FINAL
  "group": "GROUP_A",             // null for knockout stages
  "homeTeam": { "id": 1, "name": "Brazil", "shortName": "Brazil" },
  "awayTeam": { "id": 2, "name": "Mexico", "shortName": "Mexico" },
  "score": {
    "winner": "HOME_TEAM",        // HOME_TEAM | AWAY_TEAM | DRAW | null
    "duration": "REGULAR",        // REGULAR | EXTRA_TIME | PENALTY_SHOOTOUT
    "fullTime": { "home": 2, "away": 1 },
    "halfTime": { "home": 1, "away": 0 }
  }
}
```

**Key fields NOT available on free tier in the list endpoint:**
- `goals` array (scorer details by minute) — requires individual match fetch
- `bookings` (cards) — requires individual match fetch
- `statistics` (shots, possession) — requires individual match fetch
- `odds` — requires individual match fetch
- `lineups` — requires individual match fetch

**`/v4/competitions/WC/standings`** — Each group entry includes:
```json
{
  "group": "GROUP_A",
  "stage": "GROUP_STAGE",
  "table": [
    {
      "position": 1,
      "team": { "id": 1, "name": "Brazil", "shortName": "Brazil" },
      "playedGames": 3,
      "form": "W,W,D",            // Last 5 results — VERY USEFUL, currently unused
      "won": 2, "draw": 1, "lost": 0,
      "points": 7,
      "goalsFor": 5, "goalsAgainst": 2, "goalDifference": 3
    }
  ]
}
```

**`/v4/competitions/WC/scorers?limit=100`** — Each scorer entry:
```json
{
  "player": {
    "id": 44,
    "name": "Erling Haaland",
    "firstName": "Erling",
    "lastName": "Haaland",
    "dateOfBirth": "2000-07-21",
    "nationality": "Norway",
    "position": "Attacker"
  },
  "team": { "id": 100, "name": "Norway", "shortName": "Norway" },
  "goals": 5,
  "assists": 2,
  "penalties": 1
}
```

### 5.2 Demo Mode

`WorldCupAPI` accepts a `demo_mode: bool` constructor argument. When `True`, all API methods load from `tests/fixtures/*.json` instead of making HTTP calls. This enables full UI testing without API access or live matches.

The value is read from `entry.options.get(OPT_DEMO_MODE, DEFAULT_DEMO_MODE)` in `__init__.py` each time the integration loads — making it fully UI-driven. See `docs/TESTING.md` for the full workflow.

---

## 6. Coordinator Pattern

### 6.1 Adaptive Polling

The coordinator uses two poll intervals:
- `SCAN_INTERVAL_NORMAL = timedelta(minutes=15)` — no live matches
- `SCAN_INTERVAL_LIVE = timedelta(minutes=1)` — at least one match IN_PLAY or PAUSED

After each `_async_update_data` call, the coordinator inspects the fetched matches and updates `self.update_interval` accordingly. HA's `DataUpdateCoordinator` respects dynamic changes to `update_interval`.

```python
has_live = any(
    m.get("status") in ("IN_PLAY", "PAUSED")
    for m in data.get("matches", [])
)
self.update_interval = SCAN_INTERVAL_LIVE if has_live else SCAN_INTERVAL_NORMAL
```

### 6.2 Data Shape Contract

All sensors depend on this exact shape from `coordinator.data`:

```python
{
    "matches": list[dict],    # raw match objects from API
    "standings": list[dict],  # raw group standing objects from API
    "scorers": list[dict],    # raw scorer objects from API
}
```

**Never change the top-level keys** without updating every sensor that reads them. The helper functions `get_matches()`, `get_standings()`, `get_scorers()` in `sensor.py` are the canonical accessors — always use these, never access `coordinator.data` directly in sensor classes.

### 6.3 Partial Failure Handling

If one endpoint fails (e.g., scorers 429 rate limit), do not fail the entire update. The coordinator should attempt all three calls and return whatever succeeded. See Phase 1 spec for the implementation pattern.

---

## 7. Sensor Pattern

### 7.1 Anatomy of a Sensor

```python
class WorldCupExampleSensor(CoordinatorEntity, SensorEntity):
    # Required: stable unique ID
    _attr_unique_id = "world_cup_example"
    # Required: human-readable name
    _attr_name = "World Cup Example"
    # Optional: unit for numeric sensors
    _attr_native_unit_of_measurement = "%"

    @property
    def native_value(self):
        """Return the sensor's main state — must be a scalar."""
        data = get_matches(self.coordinator)
        if not data:
            return "No data"
        # ... compute value
        return result

    @property
    def extra_state_attributes(self):
        """Return a dict of additional attributes — can be complex."""
        return {
            "key": "value",
            "list": [...]   # cap at reasonable length
        }
```

### 7.2 Naming Convention

| Pattern | Example |
|---|---|
| Class name | `WorldCupBttsRateSensor` |
| `_attr_unique_id` | `"world_cup_btts_rate"` |
| `_attr_name` | `"World Cup BTTS Rate"` |
| Entity ID (auto-derived) | `sensor.world_cup_btts_rate` |

### 7.3 Helper Functions

Put all data-access and computation logic in **module-level functions** in `sensor.py`, not inside sensor classes. This makes them testable in isolation and reusable across sensors.

```python
# Good — testable function
def compute_btts_rate(coordinator):
    matches = [m for m in finished_matches(coordinator) if ...]
    return round(len(matches) / total * 100, 1) if total else 0

class WorldCupBttsRateSensor(CoordinatorEntity, SensorEntity):
    @property
    def native_value(self):
        return compute_btts_rate(self.coordinator)
```

### 7.4 Registering New Sensors

In `sensor.py → async_setup_entry()`, append new sensors to the `sensors` list:

```python
sensors = [
    # ... existing sensors ...
    WorldCupNewSensor(coordinator),   # append at end of relevant block
]
```

Never remove or reorder existing sensors. HA tracks them by unique ID, but reordering causes unnecessary registry churn.

---

## 8. Code Conventions

- **Python**: 3.11+. Use `f-strings`, `walrus operator`, `datetime.fromisoformat()`.
- **Async**: All API calls use `async/await` with `aiohttp`. Never use `requests`.
- **Imports**: Group as: stdlib → homeassistant → local (`.api`, `.coordinator`, `.const`).
- **No magic numbers**: Constants go in `const.py` or at the top of `sensor.py`.
- **Type hints**: Not required but encouraged for helper functions.
- **Logging**: Use `_LOGGER = logging.getLogger(__name__)` in each module. Log warnings for unexpected data shapes, errors for exceptions.
- **Null safety**: API fields can be `None`. Always use `.get()` with defaults. The `or 0` pattern is widely used for numeric fields.

---

## 9. Phase Roadmap

| Phase | Status | Spec | Description |
|---|---|---|---|
| **Phase 1** | ✅ DONE | `docs/specs/PHASE_1_BUG_FIXES.md` | Fix scorers API call; adaptive polling |
| **Phase 2** | ✅ DONE | `docs/specs/PHASE_2_ENRICH_SENSORS.md` | halfTime scores; score.duration; live minute; team form; group leaders |
| **Phase 3** | ✅ DONE | `docs/specs/PHASE_3_COMPUTED_STATS.md` | BTTS rate; Over 2.5 rate; draw rate; comebacks; clean sheets; unbeaten teams |
| **Phase 4** | ✅ DONE | `docs/specs/PHASE_4_PLAYER_STATS.md` | Non-penalty scorer; G+A contributions; enriched player profiles |

**Already implemented (no spec work needed):**
- Demo mode toggle — OptionsFlow in `config_flow.py`, reads from `entry.options`; auto-reload on save
- Coordinator created in `__init__.py` — `sensor.py` reads from `hass.data[DOMAIN][entry.entry_id]`
- API key validation on config flow submit — real HTTP call, field-level errors for invalid/unreachable
- Duplicate entry prevention — `async_set_unique_id(DOMAIN)` + `_abort_if_unique_id_configured()`
- `strings.json` + `translations/en.json` — config and options UI labels
- `tests/conftest.py` — pytest fixtures for all three JSON fixture files

**Dependency order:** Phase 1 must be completed before any other phase. Phases 2–4 are independent of each other once Phase 1 is done, but 2 → 3 → 4 is the recommended order.

Each spec document contains:
- Exact files to modify
- Exact code to add/change
- Acceptance criteria
- HA-specific pitfalls for that feature

---

## 10. Testing Strategy

Full testing guide: `docs/TESTING.md`

### 10.1 Demo Mode (Recommended for UI Testing)

Demo mode is enabled via the HA Settings UI — no code changes needed:

1. Go to **Settings → Devices & Services → World Cup 2026 → Configure**
2. Toggle **Demo mode** on → Save
3. The integration reloads automatically

When demo mode is active, `WorldCupAPI` returns data from `tests/fixtures/*.json` instead of making HTTP calls. The setting persists across HA restarts via `config_entry.options`.

The fixtures in `tests/fixtures/` are designed to cover:
- Group stage matches in all statuses (FINISHED, IN_PLAY, TIMED)
- Knockout matches with EXTRA_TIME and PENALTY_SHOOTOUT duration
- Matches covering BTTS, over/under 2.5, comeback, and clean sheet scenarios
- A live match with `minute` set (for testing adaptive polling logic)

### 10.2 Unit Tests (pytest)

Uses `pytest-homeassistant-custom-component`. Mocks `aiohttp.ClientSession` with `aioresponses`. Test individual sensor classes by feeding them known fixture data.

```bash
pip install pytest-homeassistant-custom-component aioresponses
pytest tests/ -v
```

### 10.3 Manual Testing Checklist

Before marking a phase complete:
- [ ] No errors in HA logs at integration load
- [ ] All new sensors appear in Developer Tools → States
- [ ] `native_value` is a scalar (not dict/list)
- [ ] `extra_state_attributes` is under 16 KB
- [ ] Sensor still works when coordinator data is `None` (simulate with demo fixtures that have empty arrays)
- [ ] Adaptive polling: confirm `update_interval` changes when `status = IN_PLAY` fixture is used

---

## 11. Common Pitfalls

### "My sensor returns None / Unknown"
- Check that `coordinator.data` is not `None` (use the `get_matches()` helper)
- Check that `native_value` returns a scalar — returning `None` is valid HA state, but returning `{}` is not

### "Sensor disappeared from HA after I renamed it"
- You changed `_attr_unique_id`. The old entity is now orphaned. Go to HA → Settings → Entities, filter by integration, and delete the orphaned entity.
- **Fix**: Never change `_attr_unique_id` after release. If renaming, keep the old unique_id.

### "Score is None for upcoming matches"
- `fullTime.home` and `fullTime.away` are `None` for TIMED/SCHEDULED matches. Always check before arithmetic.

### "Standings returns empty list"
- Standings are not available until group matches start. During tournament setup, the API returns an empty standings array. All standing-based sensors must handle `[]` gracefully.

### "Scorers endpoint returns 404"
- This happens before any matches are played. Handle with try/except and return `{"scorers": []}`.

### "HA state history shows gaps"
- Caused by the sensor returning different Python types at different times (e.g., `int` vs `None`). Ensure `native_value` always returns the same type, using `0` or `"No data"` as safe defaults.

### "Adaptive polling is not changing"
- `DataUpdateCoordinator.update_interval` is read at the *start* of the next scheduled update, not immediately. The interval change takes effect for the *following* poll. This is correct HA behaviour — no fix needed.

### "Rate limit exceeded (429) on startup"
- The coordinator fires all 3 API calls simultaneously on first load. Add a small stagger if this becomes an issue, but the free tier limit of 10 req/min is generous for 3 calls.
