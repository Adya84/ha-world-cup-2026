from __future__ import annotations

import json
import logging
from pathlib import Path

_LOGGER = logging.getLogger(__name__)


class GoldenBootManager:
    """Local Golden Boot fallback manager."""

    def __init__(self, hass):
        self.hass = hass
        self.file_path = Path(__file__).parent / "data" / "golden_boot.json"

    def load(self):
        """Load local fallback Golden Boot data."""
        try:
            with open(self.file_path, "r", encoding="utf-8") as file:
                data = json.load(file)

            if isinstance(data, list):
                return data

            return []

        except FileNotFoundError:
            _LOGGER.warning("Golden Boot fallback file not found: %s", self.file_path)
            return []
        except Exception as err:
            _LOGGER.warning("Could not load Golden Boot fallback data: %s", err)
            return []

    def get_scorers(self, limit=100):
        """Return local fallback scorers sorted by goals and assists."""
        players = self.load()

        players.sort(
            key=lambda player: (
                int(player.get("goals") or 0),
                int(player.get("assists") or 0),
            ),
            reverse=True,
        )

        return players[:limit]
