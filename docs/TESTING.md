# Testing Guide — World Cup 2026 HA Integration

> This guide explains how to test the integration without a live API or active World Cup matches.

---

## The Problem

Testing a live sports integration is hard:
- The API requires a key
- Matches only happen during the tournament
- Specific states (IN_PLAY, EXTRA_TIME, PENALTY_SHOOTOUT) are rare and temporary
- Rate limits prevent hammering the real API in dev

## The Solution: Demo Mode

The integration ships with a **demo mode** that replaces all HTTP calls with local JSON fixtures. The fixtures in `tests/fixtures/` are carefully designed to cover every edge case across all phases.

---

## 1. Enabling Demo Mode

Demo mode is a **runtime toggle in the HA UI** — no code changes or restarts needed.

### Via HA Settings (Recommended)

1. Go to **Settings → Devices & Services**
2. Find **World Cup 2026** → click **Configure**
3. Toggle **Demo mode** → **Submit**
4. The integration reloads automatically

When demo mode is on, the `WorldCupAPI` class returns data from `tests/fixtures/*.json` instead of making HTTP calls. The setting persists across HA restarts.

To turn it off: repeat the same steps and toggle Demo mode off.

### Via pytest (Unit Tests)

Pass `demo_mode=True` directly when constructing the API in tests:

```python
from custom_components.world_cup_2026.api import WorldCupAPI

api = WorldCupAPI(api_key="test", demo_mode=True)
```

No HA instance needed — the API class loads fixtures from disk synchronously in demo mode.

---

## 2. What the Fixtures Cover

### `tests/fixtures/matches.json`

| Match ID | Status | Stage | Key Scenario |
|---|---|---|---|
| 1001 | FINISHED | GROUP_A | BTTS=true, over 2.5, HT goals scored |
| 1002 | FINISHED | GROUP_A | BTTS=false, 1-0, clean sheet for winner |
| 1003 | FINISHED | GROUP_B | 0-0 draw — clean sheet both teams, no BTTS |
| 1004 | FINISHED | GROUP_B | 2-2 draw — comeback (Spain 2-0 up at HT) |
| 1005 | FINISHED | GROUP_C | Comeback win (Netherlands 0-1 down at HT, won 2-1) |
| 1006 | FINISHED | GROUP_D | High-scoring (4-2), BTTS, over 2.5 |
| 1007 | IN_PLAY | GROUP_E | Live match, minute=67 — triggers 1-min poll interval |
| 1008 | TIMED | GROUP_F | Upcoming match — null scores |
| 2001 | FINISHED | QUARTER_FINALS | EXTRA_TIME duration |
| 2002 | FINISHED | SEMI_FINALS | PENALTY_SHOOTOUT duration |

### `tests/fixtures/standings.json`

- 6 groups represented (A–F)
- Groups A/B/C/D have games played with realistic tables and form strings
- Groups E/F have no games played (all zeros) — tests zero-game handling
- Form strings: `"W,W"`, `"D,W"`, `""` — covers all states

### `tests/fixtures/scorers.json`

| Player | Goals | Assists | Penalties | Key Scenario |
|---|---|---|---|---|
| Haaland | 4 | 2 | 0 | Pure scorer — tops no-pen list |
| Mbappé | 3 | 1 | 2 | Mixed — 1 non-pen goal |
| Ronaldo | 2 | 0 | 2 | All pens — excluded from no-pen list |
| De Bruyne | 1 | 4 | 0 | High assists — tops G+A via assists |
| Modric | 2 | 1 | 0 | Midfielder with goals |
| Neymar | 0 | 3 | 0 | Assists only — not in scorer lists |
| Unknown | 1 | 0 | 0 | null dateOfBirth — age computation test |
| Messi | 3 | 2 | 1 | Mixed: 2 non-pen goals, G+A=5 |

---

## 3. Expected Sensor Values with Fixtures

Run through these manually in HA Developer Tools → States after enabling demo mode:

### Phase 1 (after fix)
| Sensor | Expected value |
|---|---|
| `sensor.world_cup_top_scorer` | `"Erling Haaland - 4 goals"` |
| `sensor.world_cup_top_assist` | `"Kevin De Bruyne - 4 assists"` |

### Phase 2
| Sensor | Expected value |
|---|---|
| `sensor.world_cup_group_leaders` | `5` (5 groups with games: A, B, C, D, and E is IN_PLAY) |
| `sensor.world_cup_extra_time_matches` | `1` (match 2001) |
| `sensor.world_cup_penalty_shootouts` | `1` (match 2002) |
| Live match attributes | Include `"minute": 67` |
| Completed match attributes | Include `"halfTimeHome"`, `"halfTimeAway"`, `"duration"` |

### Phase 3
| Sensor | Expected value | Reasoning |
|---|---|---|
| `sensor.world_cup_btts_rate` | `50.0` | 3 of 6 finished group matches are BTTS (1001, 1004, 1006) — note 2001 and 2002 are knockout, so 3/6=50% from group stage; total finished = 8 matches including knockouts |
| `sensor.world_cup_over_2_5_rate` | Varies | Count 3+ goal matches |
| `sensor.world_cup_draw_rate` | Varies | Count draws (1003 and 1004) |
| `sensor.world_cup_clean_sheets` | Count > 0 | 1002 (Argentina clean sheet), 1003 (both teams) |
| `sensor.world_cup_unbeaten_teams` | List | Brazil, Netherlands, Belgium, Uruguay, and others |
| `sensor.world_cup_comebacks` | `2` | Match 1005 (away came back) and match 1004 (England came back) |
| `sensor.world_cup_first_half_goals` | Count | Sum of all halfTime scores across finished matches |
| `sensor.world_cup_second_half_goals` | Count | fullTime - halfTime for each finished match |

### Phase 4
| Sensor | Expected value |
|---|---|
| `sensor.world_cup_top_scorer_no_pen` | `"Erling Haaland - 4 goals (excl. pens)"` |
| `sensor.world_cup_goal_contributions` | `"Erling Haaland - 6 (G+A)"` (4+2) or De Bruyne 5 (1+4) — check tiebreak |
| `sensor.world_cup_penalty_goals` | `5` (Mbappé 2 + Ronaldo 2 + Messi 1) |

---

## 4. Modifying Fixtures for Edge Case Testing

Fixtures are plain JSON. Edit them freely to test specific scenarios.

**To test zero-state (pre-tournament):**
```json
{ "matches": [], "standings": [], "scorers": [] }
```
Every sensor should return `0`, `"No data"`, or `[]` without errors.

**To test live match adaptive polling:**
Change any match's `"status": "FINISHED"` to `"status": "IN_PLAY"`. After the coordinator next refreshes, check HA logs for `"Switching poll interval to 0:01:00"`.

**To test all-TIMED (tournament not started):**
Set all matches to `"status": "TIMED"` and all scores to `null`. Sensors should handle null scores gracefully.

**To test ET + pens spread:**
Add more matches with `"stage": "LAST_16"` and `"duration": "EXTRA_TIME"` or `"PENALTY_SHOOTOUT"`. Verify count sensors increment correctly.

---

## 5. Unit Testing with pytest

### Setup

```bash
pip install pytest pytest-asyncio aioresponses pytest-homeassistant-custom-component --break-system-packages
```

### Running tests

```bash
cd ha-world-cup-2026
pytest tests/ -v
```

### Test structure (to be built out)

```
tests/
├── conftest.py           # Shared fixtures: hass instance, mock coordinator
├── test_api.py           # Tests WorldCupAPI demo mode + fixture loading
├── test_coordinator.py   # Tests adaptive polling interval logic
├── test_sensor_phase1.py # Scorer sensors return correct values
├── test_sensor_phase2.py # halfTime, duration, form in attributes
├── test_sensor_phase3.py # BTTS, over 2.5, draw rate, etc.
├── test_sensor_phase4.py # Non-pen scorer, G+A, penalty goals
└── fixtures/             # JSON fixture files (shared with demo mode)
```

### Example test pattern

```python
# tests/test_sensor_phase3.py
import pytest
from custom_components.world_cup_2026.sensor import (
    WorldCupBttsRateSensor,
    both_scored,
)

def test_both_scored_true():
    match = {"score": {"fullTime": {"home": 2, "away": 1}}}
    assert both_scored(match) is True

def test_both_scored_false_clean_sheet():
    match = {"score": {"fullTime": {"home": 1, "away": 0}}}
    assert both_scored(match) is False

def test_both_scored_zero_zero():
    match = {"score": {"fullTime": {"home": 0, "away": 0}}}
    assert both_scored(match) is False

def test_both_scored_null_scores():
    match = {"score": {"fullTime": {"home": None, "away": None}}}
    assert both_scored(match) is False
```

---

## 6. Manual Testing Checklist

Run this checklist after completing each phase:

- [ ] Enable demo mode (Settings → Devices & Services → World Cup 2026 → Configure → Demo mode on)
- [ ] Confirm integration reloads automatically (check Settings → System → Logs for reload message)
- [ ] No errors in HA logs at startup
- [ ] Developer Tools → States → filter `world_cup` shows all expected sensors
- [ ] Each new sensor has the correct `native_value` type (string, int, or float)
- [ ] Each new sensor `extra_state_attributes` contains the expected keys
- [ ] Edge case: set all matches to `"status": "TIMED"` → no sensor raises an exception
- [ ] Edge case: empty fixtures `{"matches": [], "standings": [], "scorers": []}` → all sensors return safe defaults
- [ ] Disable demo mode (same UI, toggle off → Submit) and verify sensors still load (will show "No data" until tournament starts)

---

## 7. Fixture File Validity

Validate fixture JSON before testing:

```bash
python -m json.tool tests/fixtures/matches.json > /dev/null && echo "OK"
python -m json.tool tests/fixtures/standings.json > /dev/null && echo "OK"
python -m json.tool tests/fixtures/scorers.json > /dev/null && echo "OK"
```

---

## 8. Rate Limit Awareness

The free tier allows 10 requests/minute. During normal operation with 15-min polling:
- 3 calls per 15 minutes = 0.2 calls/minute average → well within limits

During live polling:
- 3 calls per 1 minute = 3 calls/minute → still well within limits

If you see 429 errors in logs, the scorers endpoint will gracefully return `{"scorers": []}` and log a warning. This is handled without crashing the coordinator (see Phase 1 spec).
