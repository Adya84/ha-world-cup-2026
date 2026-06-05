"""
pytest configuration for World Cup 2026 integration tests.

Uses pytest-homeassistant-custom-component for HA test infrastructure.
Fixture data is loaded from tests/fixtures/*.json.

Install dependencies:
    pip install pytest pytest-asyncio pytest-homeassistant-custom-component aioresponses

Run tests:
    pytest tests/ -v
"""
from __future__ import annotations

import json
import pathlib

import pytest

FIXTURES_DIR = pathlib.Path(__file__).parent / "fixtures"


# ---------------------------------------------------------------------------
# Raw fixture loaders
# ---------------------------------------------------------------------------

@pytest.fixture
def matches_fixture() -> dict:
    """Return the raw matches API response from fixtures/matches.json."""
    return json.loads((FIXTURES_DIR / "matches.json").read_text())


@pytest.fixture
def standings_fixture() -> dict:
    """Return the raw standings API response from fixtures/standings.json."""
    return json.loads((FIXTURES_DIR / "standings.json").read_text())


@pytest.fixture
def scorers_fixture() -> dict:
    """Return the raw scorers API response from fixtures/scorers.json."""
    return json.loads((FIXTURES_DIR / "scorers.json").read_text())


@pytest.fixture
def all_fixtures(matches_fixture, standings_fixture, scorers_fixture) -> dict:
    """
    Return a combined coordinator data dict — the same shape that
    WorldCupCoordinator._async_update_data() returns.

    Use this to create a mock coordinator in sensor unit tests:

        class MockCoordinator:
            data = all_fixtures

        sensor = WorldCupBttsRateSensor(MockCoordinator())
        assert sensor.native_value == 50.0
    """
    return {
        "matches": matches_fixture["matches"],
        "standings": standings_fixture["standings"],
        "scorers": scorers_fixture["scorers"],
    }


# ---------------------------------------------------------------------------
# Empty-data fixture — tests graceful degradation
# ---------------------------------------------------------------------------

@pytest.fixture
def empty_fixtures() -> dict:
    """Coordinator data with all-empty lists — simulates pre-tournament state."""
    return {"matches": [], "standings": [], "scorers": []}
