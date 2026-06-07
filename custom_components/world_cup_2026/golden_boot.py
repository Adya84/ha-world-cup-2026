from __future__ import annotations

import json
from datetime import date
from pathlib import Path
from typing import Any


class GoldenBootManager:
    """Load and save manually tracked World Cup Golden Boot data."""

    def __init__(self, hass) -> None:
        self.hass = hass
        self.file_path = Path(__file__).parent / "data" / "golden_boot.json"

    def load(self) -> list[dict[str, Any]]:
        """Load player tracker data from JSON."""
        try:
            if not self.file_path.exists():
                self.file_path.parent.mkdir(parents=True, exist_ok=True)
                self.save([])
                return []

            with self.file_path.open("r", encoding="utf-8") as file:
                data = json.load(file)

            if isinstance(data, dict):
                players = data.get("players", [])
            else:
                players = data

            if not isinstance(players, list):
                return []

            return [player for player in players if isinstance(player, dict)]
        except Exception:
            return []

    def save(self, data: list[dict[str, Any]]) -> None:
        """Save player tracker data to JSON."""
        self.file_path.parent.mkdir(parents=True, exist_ok=True)
        with self.file_path.open("w", encoding="utf-8") as file:
            json.dump(data, file, indent=2, ensure_ascii=False)

    def _normalise_player(self, player: dict[str, Any]) -> dict[str, Any]:
        """Return a player record with all expected fields present."""
        return {
            "player": player.get("player") or player.get("name") or "Unknown",
            "team": player.get("team") or "Unknown",
            "goals": int(player.get("goals", 0) or 0),
            "assists": int(player.get("assists", 0) or 0),
            "penalties": int(player.get("penalties", 0) or 0),
            "matches": int(player.get("matches", 0) or 0),
            "yellow_cards": int(player.get("yellow_cards", player.get("yellowCards", 0)) or 0),
            "red_cards": int(player.get("red_cards", player.get("redCards", 0)) or 0),
            "minutes": int(player.get("minutes", 0) or 0),
            "last_updated": player.get("last_updated") or date.today().isoformat(),
        }

    def get_scorers(self) -> list[dict[str, Any]]:
        """Return scorers sorted by Golden Boot order."""
        players = [self._normalise_player(player) for player in self.load()]

        players.sort(
            key=lambda player: (
                player.get("goals", 0),
                player.get("assists", 0),
                -player.get("matches", 0),
                -player.get("minutes", 0),
            ),
            reverse=True,
        )

        return players

    def update_player(
        self,
        player_name: str,
        team: str,
        goals: int = 0,
        assists: int = 0,
        penalties: int = 0,
        matches: int = 0,
        yellow_cards: int = 0,
        red_cards: int = 0,
        minutes: int = 0,
    ) -> None:
        """Add or replace a player record."""
        players = [self._normalise_player(player) for player in self.load()]
        updated = False

        for player in players:
            if player["player"].casefold() == player_name.casefold():
                player.update(
                    {
                        "team": team,
                        "goals": int(goals or 0),
                        "assists": int(assists or 0),
                        "penalties": int(penalties or 0),
                        "matches": int(matches or 0),
                        "yellow_cards": int(yellow_cards or 0),
                        "red_cards": int(red_cards or 0),
                        "minutes": int(minutes or 0),
                        "last_updated": date.today().isoformat(),
                    }
                )
                updated = True
                break

        if not updated:
            players.append(
                {
                    "player": player_name,
                    "team": team,
                    "goals": int(goals or 0),
                    "assists": int(assists or 0),
                    "penalties": int(penalties or 0),
                    "matches": int(matches or 0),
                    "yellow_cards": int(yellow_cards or 0),
                    "red_cards": int(red_cards or 0),
                    "minutes": int(minutes or 0),
                    "last_updated": date.today().isoformat(),
                }
            )

        self.save(players)

    def top_scorers(self, limit: int = 20) -> list[dict[str, Any]]:
        """Return the top scorers only."""
        return self.get_scorers()[:limit]
