"""World Cup 2026 API client."""

from __future__ import annotations

import asyncio
import json
import os

import aiohttp

FIXTURES_DIR = os.path.join(os.path.dirname(__file__), "fixtures")

PUBLIC_FEED_BASE_URL = (
    "https://raw.githubusercontent.com/Adya84/ha-world-cup-2026/main"
)


class WorldCupAPI:
    def __init__(self, api_key: str, demo_mode: bool = False) -> None:
        """
        Args:
            api_key: kept for compatibility with existing config entries.
            demo_mode: When True, all methods return data from fixtures/*.json.
        """
        self.api_key = api_key
        self.demo_mode = demo_mode

    def _load_fixture(self, filename: str) -> dict:
        """Load a JSON fixture file from fixtures/."""
        path = os.path.join(FIXTURES_DIR, filename)
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

    async def _get(self, url: str) -> dict:
        """Shared GET helper for GitHub raw JSON feeds."""
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                response.raise_for_status()
                return await response.json(content_type=None)

    async def get_matches(self) -> dict:
        """Return World Cup matches from the public GitHub feed."""
        if self.demo_mode:
            return await asyncio.to_thread(self._load_fixture, "matches.json")

        return await self._get(f"{PUBLIC_FEED_BASE_URL}/matches.json")

    async def get_standings(self) -> dict:
        """Return group standings from the public GitHub feed."""
        if self.demo_mode:
            return await asyncio.to_thread(self._load_fixture, "standings.json")

        return await self._get(f"{PUBLIC_FEED_BASE_URL}/standings.json")

    async def get_scorers(self) -> dict:
        """Return scorers from the public GitHub feed."""
        if self.demo_mode:
            return await asyncio.to_thread(self._load_fixture, "scorers.json")

        return await self._get(f"{PUBLIC_FEED_BASE_URL}/scorers.json")
