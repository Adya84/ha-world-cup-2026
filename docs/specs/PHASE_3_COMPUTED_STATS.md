# Phase 3 — Computed Betting & Stats Sensors

> **Status:** DONE  
> **Depends on:** Phase 1 complete, Phase 2 recommended (fixtures include halfTime scores)  
> **Files modified:** `sensor.py`  
> **Files to read first:** `docs/DEVELOPMENT.md` (Sections 4, 7), `docs/specs/PHASE_2_ENRICH_SENSORS.md`

---

## Overview

All sensors in this phase are **computed entirely from match results already in coordinator data**. Zero new API calls. Zero new endpoints. The data has been there all along — we're just doing maths on it.

These are the stats that matter most to football fans and bettors monitoring the tournament. They answer questions like "is this a high-scoring tournament?", "are comebacks happening?", "which teams are keeping clean sheets?".

**New sensors in this phase:**

| Sensor | Entity ID | Description |
|---|---|---|
| BTTS Rate | `sensor.world_cup_btts_rate` | % of matches where both teams scored |
| Over 2.5 Goals Rate | `sensor.world_cup_over_2_5_rate` | % of matches with 3+ total goals |
| Draw Rate | `sensor.world_cup_draw_rate` | % of finished matches ending in a draw |
| Clean Sheets | `sensor.world_cup_clean_sheets` | Teams with most 0-conceded matches; tournament clean sheet count |
| Unbeaten Teams | `sensor.world_cup_unbeaten_teams` | Teams with no losses yet |
| Comeback Tracker | `sensor.world_cup_comebacks` | Matches where the HT-losing team drew or won at FT |
| First Half Goals | `sensor.world_cup_first_half_goals` | Goals scored in first half across all matches |
| Second Half Goals | `sensor.world_cup_second_half_goals` | Goals scored in second half across all matches |

---

## Shared Helper Functions

Add these **module-level helper functions** to `sensor.py`, near the existing helpers (`finished_matches`, `live_matches`, `get_team_goal_stats`):

```python
def both_scored(match: dict) -> bool:
    """True if both teams scored at least one goal in a finished match."""
    home, away = full_time_score(match)
    return (home is not None and away is not None
            and home > 0 and away > 0)


def total_goals(match: dict) -> int:
    """Total goals in a finished match. Returns 0 if scores are unavailable."""
    home, away = full_time_score(match)
    return (home or 0) + (away or 0)


def was_draw(match: dict) -> bool:
    """True if match ended in a draw (including 0-0)."""
    home, away = full_time_score(match)
    return home is not None and away is not None and home == away


def half_time_score(match: dict) -> tuple[int | None, int | None]:
    """Return (home_ht, away_ht) from the halfTime score node."""
    ht = (match.get("score") or {}).get("halfTime") or {}
    return ht.get("home"), ht.get("away")


def is_comeback(match: dict) -> bool:
    """
    True if the team that was LOSING at half-time ended up drawing or winning.
    Requires both halfTime and fullTime scores to be available.
    A 0-0 half-time is NOT a comeback scenario — nobody was losing.
    """
    ht_home, ht_away = half_time_score(match)
    ft_home, ft_away = full_time_score(match)

    if any(v is None for v in [ht_home, ht_away, ft_home, ft_away]):
        return False

    if ht_home > ht_away:
        # Away was losing at HT — check if they drew or won at FT
        return ft_away >= ft_home
    if ht_away > ht_home:
        # Home was losing at HT — check if they drew or won at FT
        return ft_home >= ft_away

    return False  # 0-0 or level at HT — not a comeback scenario
```

---

## Sensor Implementations

Add all sensors below to `sensor.py`. Register them in `async_setup_entry` at the end of the sensors list under a `# --- Phase 3 additions ---` comment.

---

### Sensor 1: BTTS Rate

```python
class WorldCupBttsRateSensor(CoordinatorEntity, SensorEntity):
    """
    Both Teams to Score (BTTS) rate.
    BTTS = both teams scored at least one goal.
    Returns percentage of finished matches where BTTS occurred.
    """

    _attr_unique_id = "world_cup_btts_rate"
    _attr_name = "World Cup BTTS Rate"
    _attr_native_unit_of_measurement = "%"

    @property
    def native_value(self) -> float:
        played = finished_matches(self.coordinator)
        if not played:
            return 0.0
        count = sum(1 for m in played if both_scored(m))
        return round(count / len(played) * 100, 1)

    @property
    def extra_state_attributes(self) -> dict:
        played = finished_matches(self.coordinator)
        btts = [m for m in played if both_scored(m)]
        return {
            "btts_count": len(btts),
            "matches_played": len(played),
            "btts_matches": [format_match(m) for m in btts[-10:]],   # last 10 BTTS matches
        }
```

**Dashboard usage example:** A gauge card showing BTTS % makes a great betting-context card. Historical World Cups average ~55–60% BTTS in group stages.

---

### Sensor 2: Over 2.5 Goals Rate

```python
class WorldCupOver25Sensor(CoordinatorEntity, SensorEntity):
    """
    Percentage of finished matches with 3 or more total goals (over 2.5).
    The 2.5 goals betting line is the most common total goals market.
    """

    _attr_unique_id = "world_cup_over_2_5_rate"
    _attr_name = "World Cup Over 2.5 Goals Rate"
    _attr_native_unit_of_measurement = "%"

    @property
    def native_value(self) -> float:
        played = finished_matches(self.coordinator)
        if not played:
            return 0.0
        count = sum(1 for m in played if total_goals(m) >= 3)
        return round(count / len(played) * 100, 1)

    @property
    def extra_state_attributes(self) -> dict:
        played = finished_matches(self.coordinator)
        over = [m for m in played if total_goals(m) >= 3]
        under = [m for m in played if total_goals(m) < 3]
        return {
            "over_count": len(over),
            "under_count": len(under),
            "matches_played": len(played),
            "average_goals": round(
                sum(total_goals(m) for m in played) / len(played), 2
            ) if played else 0,
        }
```

---

### Sensor 3: Draw Rate

```python
class WorldCupDrawRateSensor(CoordinatorEntity, SensorEntity):
    """
    Percentage of finished matches ending in a draw.
    Note: For knockout stage matches that went to ET or pens, the fullTime
    score at 90 minutes is used. A 1-1 at 90' that goes to pens counts as a
    draw here, which is the correct interpretation for this stat.
    """

    _attr_unique_id = "world_cup_draw_rate"
    _attr_name = "World Cup Draw Rate"
    _attr_native_unit_of_measurement = "%"

    @property
    def native_value(self) -> float:
        played = finished_matches(self.coordinator)
        if not played:
            return 0.0
        count = sum(1 for m in played if was_draw(m))
        return round(count / len(played) * 100, 1)

    @property
    def extra_state_attributes(self) -> dict:
        played = finished_matches(self.coordinator)
        draws = [m for m in played if was_draw(m)]
        return {
            "draw_count": len(draws),
            "matches_played": len(played),
        }
```

---

### Sensor 4: Clean Sheets

```python
class WorldCupCleanSheetsSensor(CoordinatorEntity, SensorEntity):
    """
    Teams with the most clean sheets (matches where they conceded 0 goals).
    native_value: total clean sheet count across all teams all matches.
    Attributes: ranked list of teams by clean sheet count.
    """

    _attr_unique_id = "world_cup_clean_sheets"
    _attr_name = "World Cup Clean Sheets"

    @property
    def native_value(self) -> int:
        return sum(v for v in self._team_clean_sheets().values())

    @property
    def extra_state_attributes(self) -> dict:
        cs = self._team_clean_sheets()
        ranked = sorted(
            [{"team": t, "cleanSheets": n} for t, n in cs.items()],
            key=lambda x: x["cleanSheets"],
            reverse=True,
        )
        return {
            "total_clean_sheets": self.native_value,
            "teams": ranked[:20],
        }

    def _team_clean_sheets(self) -> dict[str, int]:
        """Returns {team_name: clean_sheet_count} for all finished matches."""
        cs: dict[str, int] = {}
        for match in finished_matches(self.coordinator):
            home, away = get_home_away_names(match)
            home_score, away_score = full_time_score(match)
            if home_score is None or away_score is None:
                continue
            # Away team kept a clean sheet if home scored 0
            if home_score == 0:
                cs[away] = cs.get(away, 0) + 1
            # Home team kept a clean sheet if away scored 0
            if away_score == 0:
                cs[home] = cs.get(home, 0) + 1
        return cs
```

**Note:** A 0-0 draw gives both teams a clean sheet. This is statistically correct.

---

### Sensor 5: Unbeaten Teams

```python
class WorldCupUnbeatenTeamsSensor(CoordinatorEntity, SensorEntity):
    """
    Teams that have played at least one match and have not yet lost.
    Once the group stage ends, most teams are eliminated so this becomes
    less meaningful — but it remains useful during the group stage to show
    which nations are still unbeaten.
    """

    _attr_unique_id = "world_cup_unbeaten_teams"
    _attr_name = "World Cup Unbeaten Teams"

    @property
    def native_value(self) -> int:
        return len(self._unbeaten())

    @property
    def extra_state_attributes(self) -> dict:
        return {
            "count": self.native_value,
            "teams": self._unbeaten(),
        }

    def _unbeaten(self) -> list[str]:
        """
        Returns sorted list of team names with at least 1 match played and 0 losses.
        Uses fullTime scores from finished matches only.
        """
        played: dict[str, int] = {}
        lost: set[str] = set()

        for match in finished_matches(self.coordinator):
            home, away = get_home_away_names(match)
            home_score, away_score = full_time_score(match)
            if home_score is None or away_score is None:
                continue

            played[home] = played.get(home, 0) + 1
            played[away] = played.get(away, 0) + 1

            if home_score < away_score:
                lost.add(home)
            elif away_score < home_score:
                lost.add(away)

        return sorted(
            [team for team, count in played.items() if count > 0 and team not in lost]
        )
```

---

### Sensor 6: Comeback Tracker

```python
class WorldCupComebacksSensor(CoordinatorEntity, SensorEntity):
    """
    Matches where the team that was losing at half-time came back to draw or win.
    Requires halfTime scores to be available (they are in the free-tier API response).
    """

    _attr_unique_id = "world_cup_comebacks"
    _attr_name = "World Cup Comebacks"

    @property
    def native_value(self) -> int:
        return len(self._comeback_matches())

    @property
    def extra_state_attributes(self) -> dict:
        matches = self._comeback_matches()
        return {
            "count": len(matches),
            "matches": [self._format_comeback(m) for m in matches],
        }

    def _comeback_matches(self) -> list[dict]:
        return [m for m in finished_matches(self.coordinator) if is_comeback(m)]

    def _format_comeback(self, m: dict) -> dict:
        """Extended format_match with halfTime context for comeback display."""
        base = format_match(m)
        ht_home, ht_away = half_time_score(m)
        base["halfTimeHome"] = ht_home
        base["halfTimeAway"] = ht_away
        return base
```

**Testing tip:** Create fixture matches with halfTime 0-1 / fullTime 2-1 to test the positive case, and halfTime 0-0 / fullTime 1-0 to confirm the neutral case is NOT a comeback.

---

### Sensor 7: First Half Goals

```python
class WorldCupFirstHalfGoalsSensor(CoordinatorEntity, SensorEntity):
    """
    Total goals scored in the first half across all finished matches.
    Computed as sum of halfTime scores.
    Requires score.halfTime to be populated (available in free tier).
    """

    _attr_unique_id = "world_cup_first_half_goals"
    _attr_name = "World Cup First Half Goals"

    @property
    def native_value(self) -> int:
        total = 0
        for match in finished_matches(self.coordinator):
            ht_home, ht_away = half_time_score(match)
            total += (ht_home or 0) + (ht_away or 0)
        return total

    @property
    def extra_state_attributes(self) -> dict:
        played = finished_matches(self.coordinator)
        first_half = self.native_value
        total = sum(total_goals(m) for m in played)
        return {
            "first_half_goals": first_half,
            "total_goals": total,
            "first_half_percentage": round(first_half / total * 100, 1) if total else 0,
        }
```

---

### Sensor 8: Second Half Goals

```python
class WorldCupSecondHalfGoalsSensor(CoordinatorEntity, SensorEntity):
    """
    Total goals scored after half-time (fullTime minus halfTime).
    Note: For matches going to ET, second-half goals includes goals in ET
    because the API's fullTime score reflects 90 minutes only, not ET.
    """

    _attr_unique_id = "world_cup_second_half_goals"
    _attr_name = "World Cup Second Half Goals"

    @property
    def native_value(self) -> int:
        total = 0
        for match in finished_matches(self.coordinator):
            ft_home, ft_away = full_time_score(match)
            ht_home, ht_away = half_time_score(match)
            if any(v is None for v in [ft_home, ft_away, ht_home, ht_away]):
                continue
            second_half = (ft_home - ht_home) + (ft_away - ht_away)
            total += max(second_half, 0)  # guard against malformed data
        return total

    @property
    def extra_state_attributes(self) -> dict:
        played = finished_matches(self.coordinator)
        second_half = self.native_value
        total = sum(total_goals(m) for m in played)
        return {
            "second_half_goals": second_half,
            "total_goals": total,
            "second_half_percentage": round(second_half / total * 100, 1) if total else 0,
        }
```

---

## Registration in `async_setup_entry`

```python
sensors = [
    # ... all existing + Phase 2 sensors ...

    # --- Phase 3 additions ---
    WorldCupBttsRateSensor(coordinator),
    WorldCupOver25Sensor(coordinator),
    WorldCupDrawRateSensor(coordinator),
    WorldCupCleanSheetsSensor(coordinator),
    WorldCupUnbeatenTeamsSensor(coordinator),
    WorldCupComebacksSensor(coordinator),
    WorldCupFirstHalfGoalsSensor(coordinator),
    WorldCupSecondHalfGoalsSensor(coordinator),
]
```

---

## New Entity IDs After This Phase

```
sensor.world_cup_btts_rate
sensor.world_cup_over_2_5_rate
sensor.world_cup_draw_rate
sensor.world_cup_clean_sheets
sensor.world_cup_unbeaten_teams
sensor.world_cup_comebacks
sensor.world_cup_first_half_goals
sensor.world_cup_second_half_goals
```

---

## Acceptance Criteria

- [ ] `sensor.world_cup_btts_rate` returns `0.0` when no matches played; correct % with mixed fixture data
- [ ] `sensor.world_cup_over_2_5_rate` correctly counts matches with exactly 2 goals as "under" and 3+ as "over"
- [ ] `sensor.world_cup_draw_rate` counts 0-0 as a draw (BTTS=false but draw=true — test both)
- [ ] `sensor.world_cup_clean_sheets` gives clean sheet to BOTH teams in a 0-0 draw
- [ ] `sensor.world_cup_unbeaten_teams` excludes teams with zero matches played
- [ ] `sensor.world_cup_comebacks` returns 0 for a 0-0 HT / 1-0 FT match (no comeback)
- [ ] `sensor.world_cup_comebacks` returns 1 for a 0-1 HT / 1-1 FT match (comeback draw)
- [ ] `sensor.world_cup_comebacks` returns 1 for a 0-1 HT / 2-1 FT match (comeback win)
- [ ] First half + second half goals sum to total goals (verify with `sensor.world_cup_total_goals`)
- [ ] All sensors return safe defaults (0, 0.0, or empty list) when coordinator data is empty
- [ ] No sensor raises an exception for matches with `null` halfTime scores (e.g., upcoming or live matches without HT scores yet)

---

## Fixture Requirements

Ensure `tests/fixtures/matches.json` includes at least:

| Scenario | halfTime | fullTime | Covered |
|---|---|---|---|
| BTTS true | any | 2-1 | BTTS, over 2.5 |
| BTTS false, under 2.5 | any | 1-0 | BTTS, over 2.5, clean sheet |
| 0-0 draw | 0-0 | 0-0 | draw rate, clean sheets (both), BTTS false |
| 2-2 draw | 1-1 | 2-2 | draw rate, BTTS true |
| Comeback win | 0-1 | 2-1 | comeback tracker |
| No comeback (level HT) | 0-0 | 1-0 | comeback negative test |
| Over 2.5 | any | 3-1 | over 2.5 |
