"""WebSocket API for World Cup 2026."""
from __future__ import annotations

import voluptuous as vol

from homeassistant.components import websocket_api

from ..const import DOMAIN


def _get_coordinator(hass):
    coordinators = hass.data.get(DOMAIN, {})
    if not coordinators:
        return None
    return next(iter(coordinators.values()))


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

    connection.send_result(
        msg["id"],
        {
            "title": "World Cup 2026",
            "tournament": "FIFA World Cup",
            "year": 2026,
            "matches": 104,
            "groups": 12,
            "entities": 62,
            "languages": 12,
            "demo_mode": getattr(coordinator.api, "demo_mode", False),
            "last_update_success": coordinator.last_update_success,
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "world_cup_2026/get_dashboard",
    }
)
@websocket_api.async_response
async def websocket_get_dashboard(hass, connection, msg) -> None:
    coordinator = _get_coordinator(hass)

    if coordinator is None:
        connection.send_error(msg["id"], "not_loaded", "World Cup 2026 not loaded")
        return

    data = coordinator.data or {}

    matches = data.get("matches", [])
    teams = data.get("teams", [])
    players = data.get("players", [])

    live_matches = [
        match for match in matches
        if match.get("status") in ("LIVE", "IN_PLAY", "1H", "2H", "HT")
    ]

    completed_matches = [
        match for match in matches
        if match.get("status") in ("FINISHED", "FT", "AET", "PEN")
    ]

    connection.send_result(
        msg["id"],
        {
            "current_stage": data.get("current_stage", "Group Stage"),
            "matches_total": 104,
            "matches_played": len(completed_matches),
            "matches_remaining": 104 - len(completed_matches),
            "live_matches_count": len(live_matches),
            "teams_count": len(teams),
            "players_count": len(players),
            "last_update_success": coordinator.last_update_success,
            "demo_mode": getattr(coordinator.api, "demo_mode", False),
            "live_matches": live_matches[:5],
        },
    )


async def async_register_websocket_api(hass) -> None:
    websocket_api.async_register_command(hass, websocket_get_overview)
    websocket_api.async_register_command(hass, websocket_get_dashboard)
