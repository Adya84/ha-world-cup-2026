"""WebSocket API for World Cup 2026."""
from __future__ import annotations

import voluptuous as vol

from homeassistant.components import websocket_api

from ..const import DOMAIN
from ..golden_boot import GoldenBootManager

LIVE_STATUSES = {"IN_PLAY", "PAUSED", "LIVE", "1H", "2H", "HT"}
FINISHED_STATUSES = {"FINISHED", "FT", "AET", "PEN"}


def _get_coordinator(hass):
    coordinators = hass.data.get(DOMAIN, {})
    if not coordinators:
        return None
    return next(iter(coordinators.values()))


def _match_team_name(team):
    if isinstance(team, dict):
        return team.get("name") or team.get("shortName") or team.get("tla") or "TBC"
    return team or "TBC"


def _serialise_match(match):
    home_team = match.get("homeTeam", {})
    away_team = match.get("awayTeam", {})
    score = match.get("score", {})

    full_time = score.get("fullTime", {}) if isinstance(score, dict) else {}

    return {
        "id": match.get("id"),
        "utcDate": match.get("utcDate"),
        "status": match.get("status"),
        "stage": match.get("stage"),
        "group": match.get("group"),
        "homeTeam": _match_team_name(home_team),
        "awayTeam": _match_team_name(away_team),
        "homeScore": full_time.get("home"),
        "awayScore": full_time.get("away"),
    }


def _normalise_scorer(scorer):
    """Convert football-data.org scorer data into frontend format."""
    player = scorer.get("player", {})
    team = scorer.get("team", {})

    if isinstance(player, dict):
        player_name = player.get("name") or player.get("firstName") or "Unknown"
    else:
        player_name = player or "Unknown"

    if isinstance(team, dict):
        team_name = team.get("shortName") or team.get("name") or team.get("tla") or "TBC"
    else:
        team_name = team or "TBC"

    return {
        "player": scorer.get("player_name") or scorer.get("name") or player_name,
        "team": scorer.get("team_name") or team_name,
        "goals": scorer.get("goals", 0),
        "assists": scorer.get("assists", 0),
        "penalties": scorer.get("penalties"),
        "matches": scorer.get("matches"),
        "yellow_cards": scorer.get("yellow_cards"),
        "red_cards": scorer.get("red_cards"),
        "minutes": scorer.get("minutes"),
        "source": scorer.get("source", "football-data.org"),
    }


def _get_normalised_scorers(hass, coordinator):
    """Use football-data.org scorers first, then local JSON fallback."""
    api_scorers = (coordinator.data or {}).get("scorers", [])

    if api_scorers:
        return [_normalise_scorer(scorer) for scorer in api_scorers]

    manager = GoldenBootManager(hass)
    fallback_scorers = manager.get_scorers(limit=100)

    return [
        {
            **_normalise_scorer(scorer),
            "source": scorer.get("source", "local fallback"),
        }
        for scorer in fallback_scorers
    ]


def _send_not_loaded(connection, msg):
    connection.send_error(msg["id"], "not_loaded", "World Cup 2026 not loaded")


@websocket_api.websocket_command({vol.Required("type"): "world_cup_2026/get_overview"})
@websocket_api.async_response
async def websocket_get_overview(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        _send_not_loaded(connection, msg)
        return

    data = coordinator.data or {}
    matches = data.get("matches", [])
    standings = data.get("standings", [])
    scorers = _get_normalised_scorers(hass, coordinator)
    statistics = data.get("statistics", {})

    live_matches = [m for m in matches if m.get("status") in LIVE_STATUSES]
    finished_matches = [m for m in matches if m.get("status") in FINISHED_STATUSES]

    connection.send_result(
        msg["id"],
        {
            "title": "World Cup 2026",
            "matches_total": statistics.get("matches_total", 104),
            "matches_loaded": len(matches),
            "matches_played": statistics.get("matches_played", len(finished_matches)),
            "matches_remaining": statistics.get("matches_remaining", max(104 - len(finished_matches), 0)),
            "live_matches": len(live_matches),
            "groups": len(standings) or 12,
            "top_scorers": len(scorers),
            "total_goals": statistics.get("total_goals", 0),
            "goals_per_match": statistics.get("goals_per_match", 0),
            "progress": statistics.get("progress", 0),
            "last_update_success": coordinator.last_update_success,
            "demo_mode": getattr(coordinator.api, "demo_mode", False),
        },
    )


@websocket_api.websocket_command({vol.Required("type"): "world_cup_2026/get_live_matches"})
@websocket_api.async_response
async def websocket_get_live_matches(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        _send_not_loaded(connection, msg)
        return

    matches = (coordinator.data or {}).get("matches", [])
    live_matches = [m for m in matches if m.get("status") in LIVE_STATUSES]

    connection.send_result(
        msg["id"],
        [_serialise_match(match) for match in live_matches],
    )


@websocket_api.websocket_command({vol.Required("type"): "world_cup_2026/get_fixtures"})
@websocket_api.async_response
async def websocket_get_fixtures(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        _send_not_loaded(connection, msg)
        return

    matches = (coordinator.data or {}).get("matches", [])

    connection.send_result(
        msg["id"],
        [_serialise_match(match) for match in matches],
    )


@websocket_api.websocket_command({vol.Required("type"): "world_cup_2026/get_groups"})
@websocket_api.async_response
async def websocket_get_groups(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        _send_not_loaded(connection, msg)
        return

    connection.send_result(
        msg["id"],
        (coordinator.data or {}).get("standings", []),
    )


@websocket_api.websocket_command({vol.Required("type"): "world_cup_2026/get_scorers"})
@websocket_api.async_response
async def websocket_get_scorers(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        _send_not_loaded(connection, msg)
        return

    connection.send_result(
        msg["id"],
        _get_normalised_scorers(hass, coordinator),
    )


@websocket_api.websocket_command({vol.Required("type"): "world_cup_2026/get_statistics"})
@websocket_api.async_response
async def websocket_get_statistics(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        _send_not_loaded(connection, msg)
        return

    connection.send_result(
        msg["id"],
        (coordinator.data or {}).get("statistics", {}),
    )


@websocket_api.websocket_command({vol.Required("type"): "world_cup_2026/get_records"})
@websocket_api.async_response
async def websocket_get_records(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        _send_not_loaded(connection, msg)
        return

    connection.send_result(
        msg["id"],
        (coordinator.data or {}).get("records", {}),
    )


@websocket_api.websocket_command({vol.Required("type"): "world_cup_2026/get_venues"})
@websocket_api.async_response
async def websocket_get_venues(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        _send_not_loaded(connection, msg)
        return

    connection.send_result(
        msg["id"],
        (coordinator.data or {}).get("venues", {}),
    )


async def async_register_websocket_api(hass) -> None:
    websocket_api.async_register_command(hass, websocket_get_overview)
    websocket_api.async_register_command(hass, websocket_get_live_matches)
    websocket_api.async_register_command(hass, websocket_get_fixtures)
    websocket_api.async_register_command(hass, websocket_get_groups)
    websocket_api.async_register_command(hass, websocket_get_scorers)
    websocket_api.async_register_command(hass, websocket_get_statistics)
    websocket_api.async_register_command(hass, websocket_get_records)
    websocket_api.async_register_command(hass, websocket_get_venues)
