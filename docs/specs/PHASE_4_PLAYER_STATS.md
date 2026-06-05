# Phase 4 — Enhanced Player Statistics Sensors

> **Status:** DONE  
> **Depends on:** Phase 1 complete (scorers endpoint must be fetched)  
> **Files modified:** `sensor.py`  
> **Files to read first:** `docs/DEVELOPMENT.md` (Sections 4, 7), `docs/specs/PHASE_1_BUG_FIXES.md`

---

## Overview

Phase 4 builds on the scorers data now properly fetched (Phase 1). The existing `format_scorer()` helper already captures `goals`, `assists`, `penalties`, `nationality`, and `position` — but none of the sensors surface the richer fields, and there's no combined G+A leaderboard or non-penalty scorer ranking.

**Existing sensors that get enriched (no new entity IDs):**
- `WorldCupTopScorerSensor` — add nationality, position, age to attributes
- `WorldCupTopScorersSensor` — already surfaces top 20; ensure all fields are included

**New sensors added:**

| Sensor | Entity ID | Description |
|---|---|---|
| Non-Penalty Top Scorer | `sensor.world_cup_top_scorer_no_pen` | Leading scorer excluding penalty goals |
| Goal Contributions | `sensor.world_cup_goal_contributions` | G+A leaderboard |
| Penalty Goals | `sensor.world_cup_penalty_goals` | Total pens scored; per-player penalty counts |

---

## Change 1: Enrich `format_scorer()` Helper

### File: `custom_components/world_cup_2026/sensor.py`

**Locate** `format_scorer(s)` (around line 437 in current code).

**Current:**
```python
def format_scorer(s):
    player = s.get("player", {})
    team = s.get("team", {})

    return {
        "name": player.get("name") or "Unknown",
        "firstName": player.get("firstName"),
        "lastName": player.get("lastName"),
        "dateOfBirth": player.get("dateOfBirth"),
        "nationality": player.get("nationality"),
        "team": team.get("shortName") or team.get("name") or "Unknown",
        "goals": s.get("goals") or 0,
        "assists": s.get("assists") or 0,
        "penalties": s.get("penalties") or 0,
    }
```

**Add computed fields:**
```python
def format_scorer(s: dict) -> dict:
    player = s.get("player") or {}
    team = s.get("team") or {}

    goals = s.get("goals") or 0
    assists = s.get("assists") or 0
    penalties = s.get("penalties") or 0
    non_pen_goals = max(goals - penalties, 0)

    # Compute age from dateOfBirth if available
    dob = player.get("dateOfBirth")
    age = None
    if dob:
        try:
            from datetime import date
            born = date.fromisoformat(dob)
            today = date.today()
            age = today.year - born.year - ((today.month, today.day) < (born.month, born.day))
        except (ValueError, TypeError):
            age = None

    return {
        "name": player.get("name") or "Unknown",
        "firstName": player.get("firstName"),
        "lastName": player.get("lastName"),
        "dateOfBirth": dob,
        "age": age,                                        # Phase 4: computed from dateOfBirth
        "nationality": player.get("nationality"),
        "position": player.get("position"),                # Phase 4: e.g. "Attacker", "Midfielder"
        "team": team.get("shortName") or team.get("name") or "Unknown",
        "goals": goals,
        "assists": assists,
        "penalties": penalties,
        "nonPenaltyGoals": non_pen_goals,                  # Phase 4: goals - penalties
        "goalContributions": goals + assists,              # Phase 4: G+A combined
    }
```

**Why add fields here rather than in sensors:**
- `format_scorer` is the single point of transformation for scorer data.
- Adding fields here means ALL scorer sensors (`WorldCupTopScorerSensor`, `WorldCupTopScorersSensor`, `WorldCupTopAssistsSensor`, `WorldCupTopAssistSensor`) automatically gain the new fields in their attributes — no further changes needed to those sensors.
- Computed once per scorer object rather than N times across N sensors.

**Age calculation note:** The `date` import is inside the function to avoid a module-level import adding noise to the file. Alternatively, move `from datetime import date` to the top of the file if other functions are added that use it.

---

## Change 2: New Sensor — Non-Penalty Top Scorer

**Concept:** The Golden Boot is awarded for total goals. But bettors, pundits, and advanced football fans care about *non-penalty goals* because pens inflate a striker's tally. This sensor surfaces the "true" goalscorer.

```python
class WorldCupTopScorerNoPenSensor(CoordinatorEntity, SensorEntity):
    """
    Top scorer by non-penalty goals (total goals minus penalty goals).
    This is the most meaningful goalscoring metric in advanced football analysis.
    A player with 5 non-pen goals beats a player with 6 goals (4 from the spot).
    """

    _attr_unique_id = "world_cup_top_scorer_no_pen"
    _attr_name = "World Cup Top Scorer (No Penalties)"

    @property
    def native_value(self) -> str:
        scorers = self._ranked()
        if not scorers:
            return "No scorers yet"
        top = scorers[0]
        return f"{top['name']} - {top['nonPenaltyGoals']} goals (excl. pens)"

    @property
    def extra_state_attributes(self) -> dict:
        return {"scorers": self._ranked()[:20]}

    def _ranked(self) -> list[dict]:
        """Scorers ranked by non-penalty goals, then total goals as tiebreaker."""
        scorers = [format_scorer(s) for s in get_scorers(self.coordinator)]
        # Only include players who scored at least one non-penalty goal
        scorers = [s for s in scorers if s["nonPenaltyGoals"] > 0]
        scorers.sort(
            key=lambda x: (x["nonPenaltyGoals"], x["goals"]),
            reverse=True,
        )
        return scorers
```

---

## Change 3: New Sensor — Goal Contributions Leaderboard

**Concept:** Goals + Assists combined. This is the primary metric for overall attacking contribution and is used heavily in betting markets for "most goal involvements".

```python
class WorldCupGoalContributionsSensor(CoordinatorEntity, SensorEntity):
    """
    Goal contributions (Goals + Assists) leaderboard.
    native_value: the leader's name and G+A total.
    Attributes: top 20 players by goal contributions.
    """

    _attr_unique_id = "world_cup_goal_contributions"
    _attr_name = "World Cup Goal Contributions"

    @property
    def native_value(self) -> str:
        ranked = self._ranked()
        if not ranked:
            return "No data yet"
        top = ranked[0]
        return f"{top['name']} - {top['goalContributions']} (G+A)"

    @property
    def extra_state_attributes(self) -> dict:
        return {"players": self._ranked()[:20]}

    def _ranked(self) -> list[dict]:
        """
        Rank by goalContributions (G+A), then goals as tiebreaker,
        then assists as second tiebreaker.
        Only include players with at least 1 goal or 1 assist.
        """
        scorers = [format_scorer(s) for s in get_scorers(self.coordinator)]
        scorers = [s for s in scorers if s["goalContributions"] > 0]
        scorers.sort(
            key=lambda x: (x["goalContributions"], x["goals"], x["assists"]),
            reverse=True,
        )
        return scorers
```

---

## Change 4: New Sensor — Penalty Goals

**Concept:** Surfaces all penalty goals in the tournament. The `native_value` is the total count; attributes break it down by player. Useful for understanding how "pen-heavy" a tournament is and for betting markets on penalty conversion rates.

```python
class WorldCupPenaltyGoalsSensor(CoordinatorEntity, SensorEntity):
    """
    Total penalty goals scored in the tournament.
    Surfaces per-player penalty counts for betting and statistical context.
    """

    _attr_unique_id = "world_cup_penalty_goals"
    _attr_name = "World Cup Penalty Goals"

    @property
    def native_value(self) -> int:
        return sum(
            (s.get("penalties") or 0) for s in get_scorers(self.coordinator)
        )

    @property
    def extra_state_attributes(self) -> dict:
        scorers = [format_scorer(s) for s in get_scorers(self.coordinator)]
        pen_scorers = [s for s in scorers if s["penalties"] > 0]
        pen_scorers.sort(key=lambda x: x["penalties"], reverse=True)

        total_goals_all = sum(s["goals"] for s in scorers)
        total_pens = self.native_value

        return {
            "total_penalty_goals": total_pens,
            "total_goals": total_goals_all,
            "penalty_percentage": round(total_pens / total_goals_all * 100, 1)
            if total_goals_all else 0,
            "players": pen_scorers[:20],
        }
```

---

## Registration in `async_setup_entry`

```python
sensors = [
    # ... all existing + Phase 2 + Phase 3 sensors ...

    # --- Phase 4 additions ---
    WorldCupTopScorerNoPenSensor(coordinator),
    WorldCupGoalContributionsSensor(coordinator),
    WorldCupPenaltyGoalsSensor(coordinator),
]
```

---

## New Entity IDs After This Phase

```
sensor.world_cup_top_scorer_no_pen
sensor.world_cup_goal_contributions
sensor.world_cup_penalty_goals
```

---

## Enriched Attributes on Existing Sensors

After `format_scorer()` is updated, these existing sensors gain new attribute fields automatically:

| Sensor | New attribute fields |
|---|---|
| `sensor.world_cup_top_scorer` | `age`, `position`, `nonPenaltyGoals`, `goalContributions` |
| `sensor.world_cup_top_scorers` | Same, for each scorer in the list |
| `sensor.world_cup_top_assist` | Same fields |
| `sensor.world_cup_top_assists` | Same, for each player in list |

No code changes needed in those sensors — they call `format_scorer()` which now returns richer data.

---

## Acceptance Criteria

- [ ] `format_scorer()` returns `nonPenaltyGoals = goals - penalties` (never negative due to `max(..., 0)`)
- [ ] `format_scorer()` returns `goalContributions = goals + assists`
- [ ] `format_scorer()` returns correct `age` computed from `dateOfBirth`
- [ ] `format_scorer()` returns `age = None` when `dateOfBirth` is missing or malformed
- [ ] `sensor.world_cup_top_scorer_no_pen` excludes players with 0 non-penalty goals
- [ ] `sensor.world_cup_top_scorer_no_pen` correctly ranks: player with 4 goals (0 pens) beats player with 5 goals (2 pens)
- [ ] `sensor.world_cup_goal_contributions` ranks by G+A, breaking ties by goals
- [ ] `sensor.world_cup_penalty_goals` returns 0 when no scorers yet
- [ ] `sensor.world_cup_penalty_goals` `penalty_percentage` equals 0.0 when no goals yet (divide-by-zero guard)
- [ ] Existing sensors `sensor.world_cup_top_scorer` and `sensor.world_cup_top_assist` now include `age`, `position`, `nonPenaltyGoals`, `goalContributions` in their attributes

---

## Fixture Requirements

Ensure `tests/fixtures/scorers.json` includes:
- At least one player with `penalties > 0` and `goals > penalties` (tests non-pen ranking)
- At least one player with `penalties == goals` (all goals from the spot — should rank low/excluded in no-pen sensor)
- Players with `assists > 0` (tests G+A ranking)
- At least one player with a valid `dateOfBirth` (tests age computation)
- At least one player with `dateOfBirth: null` (tests null handling)

See `tests/fixtures/scorers.json` for the pre-built fixture covering these cases.
