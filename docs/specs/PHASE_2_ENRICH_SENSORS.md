# Phase 2 — Enrich Existing Sensors with Untapped API Data

> **Status:** DONE  
> **Depends on:** Phase 1 complete  
> **Files modified:** `sensor.py`  
> **Files to read first:** `docs/DEVELOPMENT.md` (Sections 4, 7), `docs/specs/PHASE_1_BUG_FIXES.md`

---

## Overview

All data in this phase is **already returned by the existing API calls** — no new endpoints, no extra rate-limit cost. The fields are simply not being read or surfaced yet.

| Field | Source | Currently used? |
|---|---|---|
| `score.halfTime.home/away` | matches endpoint | ❌ No |
| `score.duration` | matches endpoint | ❌ No |
| `score.winner` | matches endpoint | Partially (knockout elimination only) |
| `minute` | matches endpoint | ❌ No |
| `table[].form` | standings endpoint | ❌ No |

**New sensors added in this phase:**
1. `WorldCupGroupLeadersSensor` — current leader per group
2. `WorldCupExtraTimeSensor` — knockout matches that went to extra time
3. `WorldCupPenaltyShootoutSensor` — knockout matches decided by penalty shootout

**Existing sensors enriched:**
- `format_match()` — add `halfTimeHome`, `halfTimeAway`, `duration`, `minute`, `winner`
- `WorldCupLiveMatchesSensor` — already uses `format_match`, gains live minute for free
- `WorldCupStandingsSensor` — add `form` per team in the table

---

## Change 1: Enrich `format_match()` Helper

### File: `custom_components/world_cup_2026/sensor.py`

**Locate** `format_match(m, match_number=None)` (around line 411 in current code).

**Current return dict:**
```python
return {
    "matchNumber": match_number,
    "utcDate": m.get("utcDate"),
    "status": m.get("status"),
    "stage": m.get("stage"),
    "group": m.get("group"),
    "venue": venue.get("stadium"),
    "venueCity": venue.get("city"),
    "venueCountry": venue.get("country"),
    "venueFlag": venue.get("flag"),
    "home": home_name,
    "away": away_name,
    "homeScore": score.get("home"),
    "awayScore": score.get("away"),
}
```

**Replace with:**
```python
half_time = m.get("score", {}).get("halfTime", {}) or {}
score_meta = m.get("score", {}) or {}

return {
    "matchNumber": match_number,
    "utcDate": m.get("utcDate"),
    "status": m.get("status"),
    "stage": m.get("stage"),
    "group": m.get("group"),
    "venue": venue.get("stadium"),
    "venueCity": venue.get("city"),
    "venueCountry": venue.get("country"),
    "venueFlag": venue.get("flag"),
    "home": home_name,
    "away": away_name,
    "homeScore": score.get("home"),
    "awayScore": score.get("away"),
    # New fields — Phase 2
    "halfTimeHome": half_time.get("home"),
    "halfTimeAway": half_time.get("away"),
    "duration": score_meta.get("duration"),        # REGULAR | EXTRA_TIME | PENALTY_SHOOTOUT
    "winner": score_meta.get("winner"),             # HOME_TEAM | AWAY_TEAM | DRAW | null
    "minute": m.get("minute"),                     # int, only set when IN_PLAY or PAUSED
}
```

**Why:**
- `halfTime` can be `None` from the API before the match starts, hence the `or {}` guard.
- `score_meta.get("duration")` is `None` for upcoming matches — consumers must handle `None`.
- `minute` is `None` for non-live matches — this is correct and expected; display logic decides what to show.
- All existing attribute consumers are backward-compatible; new keys are additive.

**Downstream effect:** Every sensor that calls `format_match()` automatically gains these fields in its `extra_state_attributes` with no further changes required. This includes `WorldCupLiveMatchesSensor`, `WorldCupTodayMatchesSensor`, `WorldCupCompletedMatchesSensor`, and all group/stage sensors.

---

## Change 2: Enrich `WorldCupStandingsSensor` with Form

### File: `custom_components/world_cup_2026/sensor.py`

**Locate** `WorldCupStandingsSensor.extra_state_attributes` (around line 579).

**Current table row construction:**
```python
table.append({
    "position": team.get("position"),
    "team": team_data.get("shortName") or team_data.get("name"),
    "playedGames": team.get("playedGames"),
    "won": team.get("won"),
    "draw": team.get("draw"),
    "lost": team.get("lost"),
    "goalsFor": team.get("goalsFor"),
    "goalsAgainst": team.get("goalsAgainst"),
    "goalDifference": team.get("goalDifference"),
    "points": team.get("points"),
})
```

**Add `form` field:**
```python
table.append({
    "position": team.get("position"),
    "team": team_data.get("shortName") or team_data.get("name"),
    "playedGames": team.get("playedGames"),
    "won": team.get("won"),
    "draw": team.get("draw"),
    "lost": team.get("lost"),
    "goalsFor": team.get("goalsFor"),
    "goalsAgainst": team.get("goalsAgainst"),
    "goalDifference": team.get("goalDifference"),
    "points": team.get("points"),
    "form": team.get("form") or "",               # e.g. "W,W,D,L,W" — Phase 2
})
```

**Why:** `form` is already in the API response. The `or ""` guard handles the `None` case before matches are played. Dashboard Lovelace cards can render form strings directly.

---

## Change 3: New Sensor — `WorldCupGroupLeadersSensor`

**Sensor concept:** A single sensor whose `native_value` is the number of groups currently played (useful as a change trigger) and whose `extra_state_attributes` contains the current leader for each group. Useful for dashboards showing who's top of each group.

**Add this class to `sensor.py`:**

```python
class WorldCupGroupLeadersSensor(CoordinatorEntity, SensorEntity):
    """Current leader (1st place) of each World Cup group."""

    _attr_unique_id = "world_cup_group_leaders"
    _attr_name = "World Cup Group Leaders"

    @property
    def native_value(self) -> int:
        """Return count of groups that have at least one match played."""
        leaders = self._compute_leaders()
        return len(leaders)

    @property
    def extra_state_attributes(self) -> dict:
        return {"leaders": self._compute_leaders()}

    def _compute_leaders(self) -> list[dict]:
        """
        Returns a list of dicts, one per group that has at least 1 game played.
        Each dict: { group, team, points, played, won, draw, lost, goalDifference, form }
        Groups with no games played yet are omitted.
        """
        leaders = []
        for group in get_standings(self.coordinator):
            table = group.get("table") or []
            # Filter to teams that have played at least one game
            active = [row for row in table if (row.get("playedGames") or 0) > 0]
            if not active:
                continue
            # Table is already sorted by the API (points desc, GD desc)
            top = active[0]
            team_data = top.get("team", {}) or {}
            leaders.append({
                "group": group.get("group"),
                "team": team_data.get("shortName") or team_data.get("name") or "Unknown",
                "points": top.get("points") or 0,
                "played": top.get("playedGames") or 0,
                "won": top.get("won") or 0,
                "draw": top.get("draw") or 0,
                "lost": top.get("lost") or 0,
                "goalDifference": top.get("goalDifference") or 0,
                "form": top.get("form") or "",
            })
        return leaders
```

**HA pitfalls:**
- The API sorts the standings table correctly; do not re-sort here. Re-sorting would need a tiebreaker implementation to match FIFA rules exactly (which is complex and error-prone).
- During group stage, this updates in real-time as matches complete.
- After group stage ends, this becomes a snapshot of the final group standings. That is correct behaviour.

---

## Change 4: New Sensor — `WorldCupExtraTimeSensor`

**Sensor concept:** Tracks knockout matches that required extra time (but NOT penalties). `native_value` is the count; `extra_state_attributes` lists the matches.

```python
def knockout_finished_matches(coordinator) -> list:
    """Finished matches that are NOT group stage."""
    return [
        m for m in finished_matches(coordinator)
        if m.get("stage") != "GROUP_STAGE"
    ]


class WorldCupExtraTimeSensor(CoordinatorEntity, SensorEntity):
    """Knockout matches decided in extra time (not including penalty shootouts)."""

    _attr_unique_id = "world_cup_extra_time_matches"
    _attr_name = "World Cup Extra Time Matches"

    @property
    def native_value(self) -> int:
        return len(self._et_matches())

    @property
    def extra_state_attributes(self) -> dict:
        return {
            "matches": [format_match(m) for m in self._et_matches()]
        }

    def _et_matches(self) -> list:
        return [
            m for m in knockout_finished_matches(self.coordinator)
            if (m.get("score") or {}).get("duration") == "EXTRA_TIME"
        ]
```

---

## Change 5: New Sensor — `WorldCupPenaltyShootoutSensor`

**Sensor concept:** Knockout matches decided by penalty shootout.

```python
class WorldCupPenaltyShootoutSensor(CoordinatorEntity, SensorEntity):
    """Knockout matches decided by penalty shootout."""

    _attr_unique_id = "world_cup_penalty_shootouts"
    _attr_name = "World Cup Penalty Shootouts"

    @property
    def native_value(self) -> int:
        return len(self._pen_matches())

    @property
    def extra_state_attributes(self) -> dict:
        return {
            "matches": [format_match(m) for m in self._pen_matches()]
        }

    def _pen_matches(self) -> list:
        return [
            m for m in knockout_finished_matches(self.coordinator)
            if (m.get("score") or {}).get("duration") == "PENALTY_SHOOTOUT"
        ]
```

**Note on `score.duration`:** The API sets `duration` to `"PENALTY_SHOOTOUT"` for the entire match when it went to pens — even though extra time was also played. So `EXTRA_TIME` and `PENALTY_SHOOTOUT` are mutually exclusive values. A match that went to ET and then pens will have `"PENALTY_SHOOTOUT"`, not `"EXTRA_TIME"`.

---

## Change 6: Register New Sensors in `async_setup_entry`

In `sensor.py`, within `async_setup_entry()`, append the three new sensors **after** the existing sensor list:

```python
sensors = [
    # ... all existing sensors ...
    # --- Phase 2 additions ---
    WorldCupGroupLeadersSensor(coordinator),
    WorldCupExtraTimeSensor(coordinator),
    WorldCupPenaltyShootoutSensor(coordinator),
]
```

Also add the `knockout_finished_matches` helper function at module level (near the existing `finished_matches` and `live_matches` helpers around line 484).

---

## New Entity IDs After This Phase

```
sensor.world_cup_group_leaders
sensor.world_cup_extra_time_matches
sensor.world_cup_penalty_shootouts
```

All existing entity IDs are unchanged. The enriched `format_match()` adds new keys to existing sensors' attributes without changing their state values.

---

## Acceptance Criteria

- [ ] `sensor.world_cup_live_matches` attributes include `minute` (an int) for any match with `status=IN_PLAY` in fixtures
- [ ] `sensor.world_cup_completed_matches` attributes include `halfTimeHome`, `halfTimeAway`, `duration`, `winner` for each match
- [ ] `sensor.world_cup_standings` attributes include `form` per team (e.g., `"W,W,D"` or `""` before any games)
- [ ] `sensor.world_cup_group_leaders` `native_value` equals the number of groups with at least one game played
- [ ] `sensor.world_cup_group_leaders` attributes contain a `leaders` list with correct team names and points
- [ ] `sensor.world_cup_extra_time_matches` returns `0` when no ET matches in fixture data
- [ ] `sensor.world_cup_extra_time_matches` returns correct count when fixtures include matches with `"duration": "EXTRA_TIME"`
- [ ] `sensor.world_cup_penalty_shootouts` similarly works with `"duration": "PENALTY_SHOOTOUT"` fixtures
- [ ] No HA state-machine warnings about invalid state types
- [ ] All new sensors survive coordinator data being `None` (early startup race condition)

---

## Testing Notes

Update `tests/fixtures/matches.json` to include:
- At least one match with `"status": "IN_PLAY"` and `"minute": 67`
- At least one FINISHED match with `"score": {"duration": "EXTRA_TIME", "halfTime": {"home": 1, "away": 0}, "fullTime": {"home": 2, "away": 1}}`
- At least one FINISHED match with `"score": {"duration": "PENALTY_SHOOTOUT", "halfTime": {"home": 0, "away": 0}, "fullTime": {"home": 1, "away": 1}}`
- These must be in a non-GROUP_STAGE stage (e.g., `"stage": "QUARTER_FINALS"`)

See `tests/fixtures/matches.json` for the full fixture file covering all these cases.
