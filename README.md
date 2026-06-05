# ⚽ FIFA World Cup 2026 for Home Assistant

# 💙 Support Development

If you enjoy this integration and would like to support future development, please consider making a donation.

## ☕ Donate via PayPal

### 👉 https://paypal.me/graffidoodle

Donations help support:

* New Features
* Dashboard Enhancements
* Additional Statistics
* Tournament Improvements
* Ongoing Maintenance

Thank you for your support.

---

Live FIFA World Cup 2026 fixtures, standings, groups, knockout stages, player statistics and tournament records directly inside Home Assistant.

Track every match of the 2026 FIFA World Cup from kick-off to the Final with live updates, tournament statistics and custom dashboard cards.

---

# 🏆 Features

## ⚽ Fixtures & Results

* Next Match
* Live Matches
* Today's Matches
* Tomorrow's Matches
* Completed Matches
* Latest Result
* Full Tournament Fixture List

## 🌍 Group Stage Tracking

Monitor all 12 World Cup groups:

* Group A
* Group B
* Group C
* Group D
* Group E
* Group F
* Group G
* Group H
* Group I
* Group J
* Group K
* Group L

Includes:

* Position
* Played
* Wins
* Draws
* Losses
* Goal Difference
* Points

## 🏆 Knockout Stages

Track the entire knockout tournament:

* Last 32
* Last 16
* Quarter Finals
* Semi Finals
* Third Place Playoff
* Final

## 📊 Tournament Statistics

* Tournament Progress
* Matches Played
* Matches Remaining
* Total Goals
* Goals Per Match
* Current Stage
* Teams Remaining
* Teams Eliminated
* Live Goals
* Countdown To Kick-Off
* Days Until Final

## 👟 Player Statistics

### Golden Boot

* Top Scorer
* Top Scorers Table
* Golden Boot Dashboard Cards

### Playmaker Award

* Top Assist Provider
* Top Assists Table

## 🔥 Tournament Records

* Biggest Win
* Highest Scoring Match
* Top Scoring Team
* Best Defence
* Latest Result

---

# 📦 Installation

## HACS Installation

1. Open HACS
2. Navigate to **Integrations**
3. Click the three-dot menu
4. Select **Custom Repositories**
5. Add:

```text
https://github.com/Fabbbrrr/ha-world-cup-2026
```

6. Select **Integration**
7. Install **World Cup 2026**
8. Restart Home Assistant

---

# ⚙️ Configuration

1. Obtain a free API key from Football-Data.org
2. Open:

```text
Settings → Devices & Services
```

3. Click:

```text
Add Integration
```

4. Search for:

```text
World Cup 2026
```

5. Enter your Football-Data API key
6. Complete setup

---

# 🧪 Demo Mode

If you want to explore the integration and build dashboards before the tournament starts (or when no live matches are available), you can enable **Demo mode**:

1. Go to **Settings → Devices & Services → World Cup 2026 → Configure**
2. Toggle **Demo mode** on
3. Click **Submit** — the integration reloads automatically

Demo mode loads pre-built fixture data locally instead of calling the API. All sensors populate with realistic tournament data so you can design and test your dashboards immediately. Turn it off the same way when you want live data.

---

# 🧩 Available Sensors

## Core Sensors

```text
sensor.world_cup_fixtures
sensor.world_cup_standings
sensor.world_cup_next_match
sensor.world_cup_live_matches
sensor.world_cup_today_matches
sensor.world_cup_tomorrow_matches
sensor.world_cup_completed_matches
```

## Group Sensors

```text
sensor.world_cup_group_a
sensor.world_cup_group_b
sensor.world_cup_group_c
sensor.world_cup_group_d
sensor.world_cup_group_e
sensor.world_cup_group_f
sensor.world_cup_group_g
sensor.world_cup_group_h
sensor.world_cup_group_i
sensor.world_cup_group_j
sensor.world_cup_group_k
sensor.world_cup_group_l
```

## Knockout Sensors

```text
sensor.world_cup_last_32
sensor.world_cup_last_16
sensor.world_cup_quarter_finals
sensor.world_cup_semi_finals
sensor.world_cup_third_place
sensor.world_cup_final
```

## Statistics Sensors

```text
sensor.world_cup_total_goals
sensor.world_cup_total_matches_played
sensor.world_cup_matches_remaining
sensor.world_cup_progress
sensor.world_cup_goals_per_match
sensor.world_cup_current_stage
sensor.world_cup_teams_remaining
sensor.world_cup_eliminated_teams
sensor.world_cup_live_goals
sensor.world_cup_countdown
sensor.world_cup_days_until_final
```

## Tournament Records

```text
sensor.world_cup_biggest_win
sensor.world_cup_highest_scoring_match
sensor.world_cup_latest_result
sensor.world_cup_top_scoring_team
sensor.world_cup_best_defence
```

## Player Statistics

```text
sensor.world_cup_top_scorer
sensor.world_cup_top_scorers
sensor.world_cup_top_assist
sensor.world_cup_top_assists
sensor.world_cup_top_scorer_no_pen
sensor.world_cup_goal_contributions
sensor.world_cup_penalty_goals
```

## Betting & Match Stats

```text
sensor.world_cup_btts_rate
sensor.world_cup_over_2_5_rate
sensor.world_cup_draw_rate
sensor.world_cup_clean_sheets
sensor.world_cup_unbeaten_teams
sensor.world_cup_comebacks
sensor.world_cup_first_half_goals
sensor.world_cup_second_half_goals
```

## Knockout Tracking

```text
sensor.world_cup_group_leaders
sensor.world_cup_extra_time_matches
sensor.world_cup_penalty_shootouts
```

---

# ⚠️ State Size Optimisation

To avoid Home Assistant state size limitations, the fixtures sensor limits stored match attributes.

Tournament progress calculations use the official World Cup total of:

```text
104 Matches
```

ensuring accurate progress tracking throughout the tournament.

---

# 🔄 Data Source

Match data and standings are provided by:

Football-Data.org

Updates occur automatically throughout the tournament.

---

# ⚠️ Disclaimer

This project is an independent community integration.

It is not affiliated with FIFA, Football-Data.org, Home Assistant or HACS.

---

Originally created by **Adrian Apel** ([@Adya84](https://github.com/Adya84/ha-world-cup-2026)).

Forked and maintained by **[@Fabbbrrr](https://github.com/Fabbbrrr)**.
