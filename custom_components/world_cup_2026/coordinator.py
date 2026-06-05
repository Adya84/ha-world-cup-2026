"""World Cup 2026 data coordinator."""

from __future__ import annotations

from datetime import timedelta
import logging

from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import WorldCupAPI

_LOGGER = logging.getLogger(__name__)

SCAN_INTERVAL_NORMAL = timedelta(minutes=15)
SCAN_INTERVAL_LIVE = timedelta(minutes=1)

LIVE_STATUSES = {"IN_PLAY", "PAUSED"}


class WorldCupCoordinator(DataUpdateCoordinator):
    def __init__(self, hass, api: WorldCupAPI) -> None:
        super().__init__(
            hass,
            _LOGGER,
            name="World Cup 2026",
            update_interval=SCAN_INTERVAL_NORMAL,
        )
        self.api = api

    async def _async_update_data(self) -> dict:
        """Fetch all data from the three API endpoints.

        Partial failure strategy: if the scorers endpoint fails (e.g., 429 or
        transient network error), matches and standings are still returned so the
        majority of sensors keep working. A warning is logged; the coordinator does
        NOT raise UpdateFailed for a scorers-only failure.

        Adaptive polling: after each successful fetch, update_interval is adjusted
        based on whether any live matches are detected. HA picks up the new interval
        on the next scheduled tick — this is correct behaviour per HA internals.
        """
        try:
            matches_data = await self.api.get_matches()
            standings_data = await self.api.get_standings()
        except Exception as err:
            raise UpdateFailed(f"Error fetching World Cup data: {err}") from err

        # Scorers: soft failure — don't crash the coordinator if this endpoint fails
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
