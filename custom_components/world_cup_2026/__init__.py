"""World Cup 2026 integration."""
from __future__ import annotations

import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .api import WorldCupAPI
from .const import CONF_API_KEY, DEFAULT_DEMO_MODE, DOMAIN, OPT_DEMO_MODE
from .coordinator import WorldCupCoordinator

_LOGGER = logging.getLogger(__name__)

PLATFORMS = ["sensor"]


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """
    Set up the World Cup 2026 integration from a config entry.

    Creates the API client and coordinator, performs the first data fetch,
    stores the coordinator in hass.data so platform setup (sensor.py) can
    retrieve it without duplicating setup logic.

    Also registers an options-update listener so that saving new options
    (e.g. toggling demo mode) automatically reloads the integration.
    """
    demo_mode: bool = entry.options.get(OPT_DEMO_MODE, DEFAULT_DEMO_MODE)

    if demo_mode:
        _LOGGER.info(
            "World Cup 2026: demo mode enabled — loading fixture data, no API calls"
        )

    api = WorldCupAPI(api_key=entry.data[CONF_API_KEY], demo_mode=demo_mode)
    coordinator = WorldCupCoordinator(hass, api)

    # First refresh raises ConfigEntryNotReady on failure, which HA handles gracefully.
    await coordinator.async_config_entry_first_refresh()

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = coordinator

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    # When the user saves options, reload the entry so the new settings take effect.
    entry.async_on_unload(entry.add_update_listener(_async_reload_entry))

    return True


async def _async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload the integration when options are updated."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry and clean up hass.data."""
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unloaded:
        hass.data[DOMAIN].pop(entry.entry_id, None)
    return unloaded
