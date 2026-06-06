"""WebSocket API for World Cup 2026."""
from __future__ import annotations

import voluptuous as vol

from homeassistant.components import websocket_api

from ..const import DOMAIN

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


def _serialise_leaderboard_player(player, index):
    if not isinstance(player, dict):
        return {
            "position": index + 1,
            "name": str(player),
            "points": 0,
        }

    name = (
        player.get("name")
        or player.get("player")
        or player.get("Player")
        or player.get("entrant")
        or player.get("Entrant")
        or player.get("username")
        or "Unknown"
    )

    points = (
        player.get("points")
        or player.get("Points")
        or player.get("score")
        or player.get("Score")
        or player.get("total")
        or player.get("Total")
        or 0
    )

    try:
        points = int(points)
    except (TypeError, ValueError):
        points = 0

    return {
        "position": player.get("position") or player.get("Position") or index + 1,
        "name": name,
        "points": points,
    }


@websocket_api.websocket_command(
    {
        vol.Required("type"): "world_cup_2026/get_overview",
    }
)
@websocket_api.async_response
async def websocket_get_overview(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        connection.send_error(msg["id"], "not_loaded", "World Cup 2026 not loaded")
        return

    data = coordinator.data or {}

    matches = data.get("matches", [])
    standings = data.get("standings", [])
    scorers = data.get("scorers", [])
    leaderboard = data.get("leaderboard", [])

    live_matches = [m for m in matches if m.get("status") in LIVE_STATUSES]
    finished_matches = [m for m in matches if m.get("status") in FINISHED_STATUSES]

    connection.send_result(
        msg["id"],
        {
            "title": "World Cup 2026",
            "matches_total": 104,
            "matches_loaded": len(matches),
            "matches_played": len(finished_matches),
            "matches_remaining": max(104 - len(finished_matches), 0),
            "live_matches": len(live_matches),
            "groups": len(standings) or 12,
            "top_scorers": len(scorers),
            "leaderboard_players": len(leaderboard),
            "last_update_success": coordinator.last_update_success,
            "demo_mode": getattr(coordinator.api, "demo_mode", False),
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "world_cup_2026/get_live_matches",
    }
)
@websocket_api.async_response
async def websocket_get_live_matches(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        connection.send_error(msg["id"], "not_loaded", "World Cup 2026 not loaded")
        return

    matches = (coordinator.data or {}).get("matches", [])
    live_matches = [m for m in matches if m.get("status") in LIVE_STATUSES]

    connection.send_result(
        msg["id"],
        [_serialise_match(match) for match in live_matches],
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "world_cup_2026/get_fixtures",
    }
)
@websocket_api.async_response
async def websocket_get_fixtures(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        connection.send_error(msg["id"], "not_loaded", "World Cup 2026 not loaded")
        return

    matches = (coordinator.data or {}).get("matches", [])

    connection.send_result(
        msg["id"],
        [_serialise_match(match) for match in matches],
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "world_cup_2026/get_groups",
    }
)
@websocket_api.async_response
async def websocket_get_groups(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        connection.send_error(msg["id"], "not_loaded", "World Cup 2026 not loaded")
        return

    connection.send_result(
        msg["id"],
        (coordinator.data or {}).get("standings", []),
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "world_cup_2026/get_scorers",
    }
)
@websocket_api.async_response
async def websocket_get_scorers(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        connection.send_error(msg["id"], "not_loaded", "World Cup 2026 not loaded")
        return

    connection.send_result(
        msg["id"],
        (coordinator.data or {}).get("scorers", []),
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "world_cup_2026/get_leaderboard",
    }
)
@websocket_api.async_response
async def websocket_get_leaderboard(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        connection.send_error(msg["id"], "not_loaded", "World Cup 2026 not loaded")
        return

    data = coordinator.data or {}

    leaderboard = (
        data.get("leaderboard")
        or data.get("players")
        or data.get("entries")
        or []
    )

    serialised = [
        _serialise_leaderboard_player(player, index)
        for index, player in enumerate(leaderboard)
    ]

    serialised.sort(key=lambda item: item.get("points", 0), reverse=True)

    for index, player in enumerate(serialised):
        player["position"] = index + 1

    connection.send_result(msg["id"], serialised)


async def async_register_websocket_api(hass) -> None:
    websocket_api.async_register_command(hass, websocket_get_overview)
    websocket_api.async_register_command(hass, websocket_get_live_matches)
    websocket_api.async_register_command(hass, websocket_get_fixtures)
    websocket_api.async_register_command(hass, websocket_get_groups)
    websocket_api.async_register_command(hass, websocket_get_scorers)
    websocket_api.async_register_command(hass, websocket_get_leaderboard)
