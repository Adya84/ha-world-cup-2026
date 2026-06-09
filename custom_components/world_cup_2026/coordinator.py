"""World Cup 2026 data coordinator."""

from __future__ import annotations

from datetime import timedelta
import json
import logging
from pathlib import Path

from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import WorldCupAPI

_LOGGER = logging.getLogger(__name__)

SCAN_INTERVAL_NORMAL = timedelta(minutes=15)
SCAN_INTERVAL_LIVE = timedelta(minutes=1)

TOTAL_WORLD_CUP_MATCHES = 104
LIVE_STATUSES = {"IN_PLAY", "PAUSED", "LIVE", "1H", "2H", "HT"}
FINISHED_STATUSES = {"FINISHED", "FT", "AET", "PEN"}


def _country_flag(country):
    """Return the flag emoji for a host country."""
    return {
        "USA": "🇺🇸",
        "Canada": "🇨🇦",
        "Mexico": "🇲🇽",
    }.get(country, "")


def _stadium_note(stadium):
    """Return the current venue note used by the existing frontend."""
    real_name = stadium.get("real_name")

    if real_name == "MetLife Stadium":
        return "Final venue"
    if real_name == "Estadio Azteca":
        return "Opening match venue"

    return "Host venue"


def _load_stadiums():
    """Load stadium data from local JSON file."""
    stadiums_file = Path(__file__).parent / "data" / "stadiums.json"

    try:
        with open(stadiums_file, encoding="utf-8") as file:
            stadiums = json.load(file)
    except FileNotFoundError:
        _LOGGER.error("stadiums.json not found: %s", stadiums_file)
        return []
    except json.JSONDecodeError as err:
        _LOGGER.error("Invalid stadiums.json: %s", err)
        return []
    except Exception as err:  # pylint: disable=broad-exception-caught
        _LOGGER.error("Failed to load stadiums.json: %s", err)
        return []

    if not isinstance(stadiums, list):
        _LOGGER.error("stadiums.json must contain a list of stadiums")
        return []

    return stadiums


async def _async_load_stadiums(hass):
    """Load stadium data without blocking the event loop."""
    return await hass.async_add_executor_job(_load_stadiums)


def _serialise_stadium(stadium):
    """Convert local JSON stadium data into the existing frontend format."""
    country = stadium.get("country", "")

    return {
        "name": stadium.get("name"),
        "real_name": stadium.get("real_name"),
        "stadium": stadium.get("real_name") or stadium.get("name", "TBC"),
        "city": stadium.get("city", "TBC"),
        "country": country,
        "flag": _country_flag(country),
        "capacity": stadium.get("capacity", 0),
        "matches": stadium.get("matches", 0),
        "image": stadium.get("image"),
        "note": _stadium_note(stadium),
    }


def _team_name(team):
    if isinstance(team, dict):
        return team.get("shortName") or team.get("name") or team.get("tla") or "TBC"
    return team or "TBC"


def _full_time_score(match):
    score = match.get("score") or {}
    full_time = score.get("fullTime") or {}
    return full_time.get("home"), full_time.get("away")


def _is_finished(match):
    home, away = _full_time_score(match)
    return match.get("status") in FINISHED_STATUSES or (home is not None and away is not None)


def _serialise_basic_match(match):
    home, away = _full_time_score(match)
    return {
        "id": match.get("id"),
        "utcDate": match.get("utcDate"),
        "status": match.get("status"),
        "stage": match.get("stage"),
        "group": match.get("group"),
        "homeTeam": _team_name(match.get("homeTeam", {})),
        "awayTeam": _team_name(match.get("awayTeam", {})),
        "homeScore": home,
        "awayScore": away,
    }


def _build_team_goal_stats(matches):
    stats = {}

    for match in matches:
        if not _is_finished(match):
            continue

        home_name = _team_name(match.get("homeTeam", {}))
        away_name = _team_name(match.get("awayTeam", {}))
        home_score, away_score = _full_time_score(match)

        if home_score is None or away_score is None:
            continue

        for team in (home_name, away_name):
            stats.setdefault(
                team,
                {
                    "team": team,
                    "played": 0,
                    "goalsFor": 0,
                    "goalsAgainst": 0,
                    "goalDifference": 0,
                    "cleanSheets": 0,
                    "wins": 0,
                    "draws": 0,
                    "losses": 0,
                },
            )

        stats[home_name]["played"] += 1
        stats[home_name]["goalsFor"] += home_score
        stats[home_name]["goalsAgainst"] += away_score

        stats[away_name]["played"] += 1
        stats[away_name]["goalsFor"] += away_score
        stats[away_name]["goalsAgainst"] += home_score

        if away_score == 0:
            stats[home_name]["cleanSheets"] += 1
        if home_score == 0:
            stats[away_name]["cleanSheets"] += 1

        if home_score > away_score:
            stats[home_name]["wins"] += 1
            stats[away_name]["losses"] += 1
        elif away_score > home_score:
            stats[away_name]["wins"] += 1
            stats[home_name]["losses"] += 1
        else:
            stats[home_name]["draws"] += 1
            stats[away_name]["draws"] += 1

    for item in stats.values():
        item["goalDifference"] = item["goalsFor"] - item["goalsAgainst"]

    return list(stats.values())


def _build_statistics(matches, standings, scorers):
    finished = [m for m in matches if _is_finished(m)]
    live = [m for m in matches if m.get("status") in LIVE_STATUSES]

    total_goals = 0
    draws = 0
    btts = 0
    over_25 = 0

    for match in finished:
        home, away = _full_time_score(match)
        if home is None or away is None:
            continue

        goals = home + away
        total_goals += goals

        if home == away:
            draws += 1
        if home > 0 and away > 0:
            btts += 1
        if goals >= 3:
            over_25 += 1

    played = len(finished)

    return {
        "matches_total": TOTAL_WORLD_CUP_MATCHES,
        "matches_loaded": len(matches),
        "matches_played": played,
        "matches_remaining": max(TOTAL_WORLD_CUP_MATCHES - played, 0),
        "progress": round((played / TOTAL_WORLD_CUP_MATCHES) * 100, 1) if TOTAL_WORLD_CUP_MATCHES else 0,
        "total_goals": total_goals,
        "goals_per_match": round(total_goals / played, 2) if played else 0,
        "draws": draws,
        "draw_rate": round((draws / played) * 100, 1) if played else 0,
        "btts": btts,
        "btts_rate": round((btts / played) * 100, 1) if played else 0,
        "over_25": over_25,
        "over_25_rate": round((over_25 / played) * 100, 1) if played else 0,
        "live_matches": len(live),
        "groups": len(standings),
        "scorers": len(scorers),
    }


def _build_records(matches):
    finished = [m for m in matches if _is_finished(m)]
    team_stats = _build_team_goal_stats(matches)

    biggest_win = None
    biggest_margin = -1
    highest_scoring_match = None
    highest_total_goals = -1
    latest_result = None

    for match in finished:
        home, away = _full_time_score(match)
        if home is None or away is None:
            continue

        margin = abs(home - away)
        total_goals = home + away

        if margin > biggest_margin:
            biggest_margin = margin
            biggest_win = _serialise_basic_match(match)
            biggest_win["margin"] = margin

        if total_goals > highest_total_goals:
            highest_total_goals = total_goals
            highest_scoring_match = _serialise_basic_match(match)
            highest_scoring_match["totalGoals"] = total_goals

    if finished:
        latest_result = _serialise_basic_match(finished[-1])

    top_scoring_team = None
    best_defence = None
    clean_sheets = None

    if team_stats:
        top_scoring_team = sorted(team_stats, key=lambda t: t["goalsFor"], reverse=True)[0]
        best_defence = sorted(team_stats, key=lambda t: (t["goalsAgainst"], -t["played"]))[0]
        clean_sheets = sorted(team_stats, key=lambda t: t["cleanSheets"], reverse=True)[0]

    return {
        "highest_scoring_match": highest_scoring_match,
        "biggest_win": biggest_win,
        "latest_result": latest_result,
        "top_scoring_team": top_scoring_team,
        "best_defence": best_defence,
        "clean_sheets": clean_sheets,
        "team_stats": sorted(team_stats, key=lambda t: t["goalsFor"], reverse=True),
    }


async def _build_venues(hass):
    stadiums = [
        _serialise_stadium(stadium)
        for stadium in await _async_load_stadiums(hass)
    ]

    countries = {}
    for venue in stadiums:
        country = venue["country"]
        countries[country] = countries.get(country, 0) + 1

    final_venue = next(
        (venue for venue in stadiums if venue["stadium"] == "MetLife Stadium"),
        stadiums[0] if stadiums else None,
    )

    return {
        "stadiums": stadiums,
        "host_cities": [
            {
                "city": venue["city"],
                "country": venue["country"],
                "flag": venue["flag"],
                "stadium": venue["stadium"],
            }
            for venue in stadiums
        ],
        "country_counts": countries,
        "final_venue": final_venue,
    }


class WorldCupCoordinator(DataUpdateCoordinator):
    def __init__(self, hass, api: WorldCupAPI) -> None:
        super().__init__(
            hass,
            _LOGGER,
            name="World Cup 2026",
            update_interval=SCAN_INTERVAL_NORMAL,
        )
        self.api = api

    async def _async_update_data(self) -> dict:
        """Fetch all World Cup data and build app-ready derived data."""
        try:
            matches_data = await self.api.get_matches()
            standings_data = await self.api.get_standings()
        except Exception as err:
            raise UpdateFailed(f"Error fetching World Cup data: {err}") from err

        try:
            scorers_data = await self.api.get_scorers()
        except Exception as err:
            _LOGGER.warning("Failed to fetch scorers (will retry next cycle): %s", err)
            scorers_data = {"scorers": []}

        matches = matches_data.get("matches", [])
        standings = standings_data.get("standings", [])
        scorers = scorers_data.get("scorers", [])

        has_live = any(m.get("status") in LIVE_STATUSES for m in matches)
        new_interval = SCAN_INTERVAL_LIVE if has_live else SCAN_INTERVAL_NORMAL

        if self.update_interval != new_interval:
            _LOGGER.debug("Switching poll interval to %s (live=%s)", new_interval, has_live)
            self.update_interval = new_interval

        return {
            "matches": matches,
            "standings": standings,
            "scorers": scorers,
            "statistics": _build_statistics(matches, standings, scorers),
            "records": _build_records(matches),
            "venues": await _build_venues(self.hass),
        }
