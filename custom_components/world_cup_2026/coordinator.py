"""World Cup 2026 data coordinator."""

from __future__ import annotations

from datetime import timedelta, datetime, timezone
import asyncio
import base64
import json
import logging
from pathlib import Path

import aiohttp

from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import WorldCupAPI

_LOGGER = logging.getLogger(__name__)

SCAN_INTERVAL_NORMAL = timedelta(minutes=5)
SCAN_INTERVAL_LIVE = timedelta(minutes=1)

TOTAL_WORLD_CUP_MATCHES = 104
LIVE_STATUSES = {"IN_PLAY", "PAUSED", "LIVE", "1H", "2H", "HT", "HALF_TIME"}
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


def _normalise_team_name(value):
    """Normalise team names so football-data and API-Football can be matched."""
    value = str(value or "").lower()
    replacements = {
        "&": " and ",
        "republic": "",
        "south korea": "korea",
        "korea republic": "korea",
        "usa": "united states",
        "u.s.a.": "united states",
        "turkiye": "turkey",
        "türkiye": "turkey",
        "côte d’ivoire": "ivory coast",
        "cote d ivoire": "ivory coast",
        "cote d'ivoire": "ivory coast",
        "bosnia and herzegovina": "bosnia herzegovina",
        "bosnia-herzegovina": "bosnia herzegovina",
        "bosnia & herzegovina": "bosnia herzegovina",
        "cape verde islands": "cape verde",
    }
    for old, new in replacements.items():
        value = value.replace(old, new)
    value = "".join(ch if ch.isalnum() else " " for ch in value)
    return " ".join(value.split())


def _match_key_from_names(home, away):
    return f"{_normalise_team_name(home)}|{_normalise_team_name(away)}"


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
        self._live_minutes_cache = {}
        self._live_minutes_last_fetch = None
        self._live_api_football_cache = {}
        self._live_api_football_last_fetch = None


    def _read_github_settings(self):
        """Read GitHub sync settings from /config/secrets.yaml.

        Expected entries:
        github_token: "github_pat_..."
        github_repo: "Adya84/ha-world-cup-2026"
        github_branch: "main"   # optional
        """
        secrets_file = Path("/config/secrets.yaml")
        settings = {
            "github_token": None,
            "github_repo": "Adya84/ha-world-cup-2026",
            "github_branch": "main",
            "api_football_key": None,
        }

        if not secrets_file.exists():
            return settings

        try:
            content = secrets_file.read_text(encoding="utf-8")
        except Exception as err:  # pylint: disable=broad-exception-caught
            _LOGGER.warning("Could not read secrets.yaml for GitHub sync: %s", err)
            return settings

        for line in content.splitlines():
            line = line.strip()
            if not line or line.startswith("#") or ":" not in line:
                continue

            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")

            if key in settings:
                settings[key] = value

        return settings

    async def _export_public_json(self, matches, standings, scorers):
        """Export public JSON files to /config/www/worldcup."""
        export_dir = Path("/config/www/worldcup")
        export_dir.mkdir(parents=True, exist_ok=True)

        files = {
            "matches.json": {"matches": matches},
            "standings.json": {"standings": standings},
            "scorers.json": {"scorers": scorers},
        }

        for filename, payload in files.items():
            await asyncio.to_thread(
                lambda name=filename, data=payload: (export_dir / name).write_text(
                    json.dumps(data, indent=2),
                    encoding="utf-8",
                )
            )

        return files

    async def _github_get_sha(self, session, repo, branch, filename, headers):
        """Return the existing GitHub file SHA if the file already exists."""
        url = f"https://api.github.com/repos/{repo}/contents/{filename}?ref={branch}"

        async with session.get(url, headers=headers) as response:
            if response.status == 404:
                return None

            if response.status >= 400:
                text = await response.text()
                raise UpdateFailed(
                    f"GitHub SHA lookup failed for {filename}: {response.status} {text}"
                )

            data = await response.json()
            return data.get("sha")

    async def _github_upload_file(self, session, repo, branch, filename, payload, headers):
        """Upload one JSON file to GitHub."""
        raw_content = json.dumps(payload, indent=2)
        encoded_content = base64.b64encode(raw_content.encode("utf-8")).decode("utf-8")
        url = f"https://api.github.com/repos/{repo}/contents/{filename}"

        sha = await self._github_get_sha(session, repo, branch, filename, headers)

        body = {
            "message": f"Update {filename}",
            "content": encoded_content,
            "branch": branch,
        }

        if sha:
            body["sha"] = sha

        async with session.put(url, headers=headers, json=body) as response:
            if response.status not in (200, 201):
                text = await response.text()
                raise UpdateFailed(
                    f"GitHub upload failed for {filename}: {response.status} {text}"
                )

    async def _sync_public_json_to_github(self, files):
        """Sync exported JSON files to the configured GitHub repository."""
        settings = self._read_github_settings()
        token = settings.get("github_token")
        repo = settings.get("github_repo") or "Adya84/ha-world-cup-2026"
        branch = settings.get("github_branch") or "main"

        if not token:
            _LOGGER.debug("GitHub sync skipped: github_token not set in secrets.yaml")
            return

        headers = {
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }

        timeout = aiohttp.ClientTimeout(total=30)

        async with aiohttp.ClientSession(timeout=timeout) as session:
            for filename, payload in files.items():
                await self._github_upload_file(
                    session,
                    repo,
                    branch,
                    filename,
                    payload,
                    headers,
                )

        _LOGGER.info("World Cup public JSON synced to GitHub repo %s", repo)

    def _api_football_enabled(self):
        settings = self._read_github_settings()
        return settings.get("api_football_key")

    def _normalise_api_football_goal_event(self, event):
        """Convert an API-Football event into a small goal-event object."""
        if not isinstance(event, dict):
            return None

        event_type = str(event.get("type") or "").lower()
        if event_type != "goal":
            return None

        time_data = event.get("time") or {}
        team_data = event.get("team") or {}
        player_data = event.get("player") or {}
        assist_data = event.get("assist") or {}

        player_name = player_data.get("name") if isinstance(player_data, dict) else None
        team_name = team_data.get("name") if isinstance(team_data, dict) else None
        assist_name = assist_data.get("name") if isinstance(assist_data, dict) else None

        if not player_name or not team_name:
            return None

        minute = time_data.get("elapsed") if isinstance(time_data, dict) else None
        extra = time_data.get("extra") if isinstance(time_data, dict) else None

        try:
            minute = int(minute) if minute is not None else None
        except (TypeError, ValueError):
            minute = None

        try:
            extra = int(extra) if extra is not None else None
        except (TypeError, ValueError):
            extra = None

        return {
            "type": "Goal",
            "team": team_name,
            "player": player_name,
            "minute": minute,
            "extra": extra,
            "detail": event.get("detail"),
            "assist": assist_name,
        }

    async def _fetch_api_football_events_for_fixture(self, session, fixture_id, headers):
        """Fetch goal events for one API-Football fixture."""
        if not fixture_id:
            return []

        url = f"https://v3.football.api-sports.io/fixtures/events?fixture={fixture_id}"
        try:
            async with session.get(url, headers=headers) as response:
                if response.status >= 400:
                    text = await response.text()
                    _LOGGER.warning(
                        "API-Football fixture events lookup failed for %s: %s %s",
                        fixture_id,
                        response.status,
                        text,
                    )
                    return []
                payload = await response.json()
        except Exception as err:  # pylint: disable=broad-exception-caught
            _LOGGER.warning("API-Football fixture events lookup failed for %s: %s", fixture_id, err)
            return []

        return [
            event
            for event in (
                self._normalise_api_football_goal_event(item)
                for item in (payload.get("response", []) or [])
            )
            if event
        ]

    async def _fetch_live_data_from_api_football(self):
        """Fetch live elapsed minutes and goal events from API-Football only.

        Uses /fixtures?live=all and extracts fixture.status.elapsed.
        Goal events are read from the live payload when available, otherwise
        /fixtures/events is queried for each live fixture. Results are cached
        for five minutes to protect the free API limit.
        """
        api_key = self._api_football_enabled()
        if not api_key:
            return {}

        now = datetime.now(timezone.utc)
        if (
            self._live_api_football_last_fetch
            and now - self._live_api_football_last_fetch < timedelta(minutes=5)
        ):
            return self._live_api_football_cache

        url = "https://v3.football.api-sports.io/fixtures?live=all"
        headers = {"x-apisports-key": api_key}
        timeout = aiohttp.ClientTimeout(total=30)
        live_data = {}

        try:
            async with aiohttp.ClientSession(timeout=timeout) as session:
                async with session.get(url, headers=headers) as response:
                    if response.status >= 400:
                        text = await response.text()
                        _LOGGER.warning(
                            "API-Football live lookup failed: %s %s",
                            response.status,
                            text,
                        )
                        return self._live_api_football_cache

                    payload = await response.json()

                live_items = payload.get("response", []) or []
                for item in live_items:
                    fixture = item.get("fixture") or {}
                    fixture_id = fixture.get("id")
                    status = fixture.get("status") or {}
                    elapsed = status.get("elapsed")

                    teams = item.get("teams") or {}
                    home = (teams.get("home") or {}).get("name")
                    away = (teams.get("away") or {}).get("name")

                    if not home or not away:
                        continue

                    try:
                        elapsed = int(elapsed) if elapsed is not None else None
                    except (TypeError, ValueError):
                        elapsed = None

                    goal_events = [
                        event
                        for event in (
                            self._normalise_api_football_goal_event(event)
                            for event in (item.get("events", []) or [])
                        )
                        if event
                    ]

                    if not goal_events and fixture_id:
                        goal_events = await self._fetch_api_football_events_for_fixture(
                            session,
                            fixture_id,
                            headers,
                        )

                    item_data = {
                        "minute": elapsed,
                        "goalEvents": goal_events,
                    }

                    live_data[_match_key_from_names(home, away)] = item_data
                    live_data[_match_key_from_names(away, home)] = item_data

        except Exception as err:  # pylint: disable=broad-exception-caught
            _LOGGER.warning("API-Football live lookup failed: %s", err)
            return self._live_api_football_cache

        self._live_api_football_cache = live_data
        self._live_api_football_last_fetch = now
        self._live_minutes_cache = {
            key: value.get("minute")
            for key, value in live_data.items()
            if value.get("minute") is not None
        }
        self._live_minutes_last_fetch = now
        _LOGGER.debug("API-Football live data loaded for %s matches", len(live_data))
        return live_data

    async def _fetch_live_minutes_from_api_football(self):
        """Backward-compatible helper returning only live minutes."""
        live_data = await self._fetch_live_data_from_api_football()
        return {
            key: value.get("minute")
            for key, value in live_data.items()
            if value.get("minute") is not None
        }

    async def _add_live_api_football_data_to_matches(self, matches):
        """Add minute and goalEvents fields to live football-data matches."""
        if not any(match.get("status") in LIVE_STATUSES for match in matches):
            return matches

        live_data = await self._fetch_live_data_from_api_football()
        if not live_data:
            return matches

        for match in matches:
            if match.get("status") not in LIVE_STATUSES:
                continue

            home = _team_name(match.get("homeTeam", {}))
            away = _team_name(match.get("awayTeam", {}))
            data = live_data.get(_match_key_from_names(home, away))

            if not data:
                continue

            minute = data.get("minute")
            if minute is not None:
                match["minute"] = minute

            goal_events = data.get("goalEvents") or []
            if goal_events:
                match["goalEvents"] = goal_events
                match["events"] = goal_events

        return matches

    async def _add_live_minutes_to_matches(self, matches):
        """Backward-compatible wrapper for older internal calls."""
        return await self._add_live_api_football_data_to_matches(matches)

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
        matches = await self._add_live_api_football_data_to_matches(matches)
        standings = standings_data.get("standings", [])
        scorers = scorers_data.get("scorers", [])

        has_live = any(m.get("status") in LIVE_STATUSES for m in matches)
        new_interval = SCAN_INTERVAL_LIVE if has_live else SCAN_INTERVAL_NORMAL

        if self.update_interval != new_interval:
            _LOGGER.debug("Switching poll interval to %s (live=%s)", new_interval, has_live)
            self.update_interval = new_interval

        data = {
            "matches": matches,
            "standings": standings,
            "scorers": scorers,
            "statistics": _build_statistics(matches, standings, scorers),
            "records": _build_records(matches),
            "venues": await _build_venues(self.hass),
        }

        try:
            files = await self._export_public_json(matches, standings, scorers)
            await self._sync_public_json_to_github(files)
        except Exception as err:  # pylint: disable=broad-exception-caught
            _LOGGER.warning("World Cup public JSON export/sync failed: %s", err)

        return data
