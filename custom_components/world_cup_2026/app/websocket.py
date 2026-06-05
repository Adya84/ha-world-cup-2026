"""WebSocket API for World Cup 2026."""
from __future__ import annotations

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from ..const import DOMAIN


@websocket_api.websocket_command(
    {
        "type": "world_cup_2026/get_overview",
    }
)
@websocket_api.async_response
async def websocket_get_overview(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Return World Cup 2026 overview data."""

    coordinators = hass.data.get(DOMAIN, {})

    if not coordinators:
        connection.send_error(
            msg["id"],
            "not_loaded",
            "World Cup 2026 integration is not loaded",
        )
        return

    coordinator = next(iter(coordinators.values()))

    data = {
        "title": "World Cup 2026",
        "matches": 104,
        "groups": 12,
        "entities": 62,
        "languages": 12,
        "demo_mode": getattr(coordinator.api, "demo_mode", False),
        "last_update_success": coordinator.last_update_success,
    }

    connection.send_result(msg["id"], data)


async def async_register_websocket_api(hass: HomeAssistant) -> None:
    """Register World Cup 2026 websocket commands."""
    websocket_api.async_register_command(hass, websocket_get_overview)
