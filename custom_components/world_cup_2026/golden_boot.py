from __future__ import annotations

import json
from pathlib import Path


class GoldenBootManager:
    def __init__(self, hass):
        self.hass = hass

        self.file_path = (
            Path(__file__).parent
            / "data"
            / "golden_boot.json"
        )

    def load(self):
        try:
            with open(self.file_path, "r", encoding="utf-8") as file:
                return json.load(file)
        except Exception:
            return []

    def save(self, data):
        with open(self.file_path, "w", encoding="utf-8") as file:
            json.dump(data, file, indent=2, ensure_ascii=False)

    def get_scorers(self):
        players = self.load()

        players.sort(
            key=lambda x: (
                x.get("goals", 0),
                x.get("assists", 0)
            ),
            reverse=True
        )

        return players

    def update_player(
        self,
        player_name,
        team,
        goals=0,
        assists=0,
        penalties=0,
        matches=0,
    ):
        players = self.load()

        player_found = False

        for player in players:
            if player["player"] == player_name:
                player["goals"] = goals
                player["assists"] = assists
                player["penalties"] = penalties
                player["matches"] = matches
                player_found = True
                break

        if not player_found:
            players.append(
                {
                    "player": player_name,
                    "team": team,
                    "goals": goals,
                    "assists": assists,
                    "penalties": penalties,
                    "matches": matches,
                }
            )

        self.save(players)

    def top_scorers(self, limit=20):
        return self.get_scorers()[:limit]
