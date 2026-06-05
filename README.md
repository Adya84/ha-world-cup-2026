# ⚽ Home Assistant World Cup 2026

A comprehensive Home Assistant integration for the FIFA World Cup 2026, providing live fixtures, results, standings, statistics, player data, tournament analytics and a ready-to-import dashboard.

---

## 🌟 Features

### ⚽ Live Match Data

* Live Fixtures
* Match Results
* Group Standings
* Live Match Status
* Match Statistics
* Goal Scorers
* Match Countdown
* Kick-Off Information

---

### 🏆 Tournament Tracking

Track every stage of the FIFA World Cup 2026:

* Group Stage
* Last 32
* Last 16
* Quarter Finals
* Semi Finals
* Third Place Playoff
* Final

---

### 📊 Tournament Statistics

* Tournament Progress
* Matches Played
* Matches Remaining
* Total Goals Scored
* Goals Per Match
* Current Tournament Stage
* Teams Remaining
* Teams Eliminated
* Live Goals Counter
* Countdown To Kick-Off
* Days Until Final

---

### 👤 Player Statistics

* Top Goal Scorers
* Enhanced Player Statistics
* Tournament Leaders
* Player Performance Data

---

### 📈 Advanced Analytics

* Betting & Statistics Sensors
* Computed Tournament Metrics
* Team Performance Data
* Additional API Statistics
* Match Insights

---

### 🌍 Multi-Language Support

Automatically follows the Home Assistant user's selected language.

Currently includes:

* English
* French
* German
* Spanish
* Italian
* Dutch

More languages can easily be added through community contributions.

---

### 🎨 Dashboard Included

Ready-to-import Home Assistant dashboard featuring:

* Group Standings
* Fixtures & Results
* Knockout Tournament Tracking
* Tournament Statistics
* Player Statistics
* Live Match Information

---

### 🧪 Demo Mode

No API access required to test the integration.

* Demo Fixtures Included
* Dashboard Testing
* Full Sensor Preview

---

# 🚀 Version 2.2.0

### New Features

* Multi-language support
* Automatic Home Assistant language detection
* English, French, German, Spanish, Italian and Dutch translations
* Translation-ready sensor architecture
* Goal Scorer Support
* Enhanced Player Statistics
* Betting & Statistics Sensors
* Additional API Data Sensors
* Improved Dashboard
* Smarter Data Polling
* Improved Home Assistant Architecture
* Bundled Demo Fixtures

---

## 🙏 Contributors

Thank you to everyone who has helped improve the World Cup 2026 integration.

Special thanks to Fabbbrrr for contributing enhancements including:

* Enhanced player statistics
* Additional tournament sensors
* Betting & statistics sensors
* Dashboard improvements
* Architecture improvements
* Demo fixture support

Community contributions help make this integration better for everyone.

---

## ❤️ Support Development

If you enjoy this project and would like to support future development:

https://paypal.me/graffidoodle

---

## 👟 Player Statistics

### Golden Boot

* Top Scorer
* Top Scorers Table
* Golden Boot Dashboard Cards

### Playmaker Award

* Top Assist Provider
* Top Assists Table

---

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
https://github.com/Adya84/ha-world-cup-2026
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

If you want to explore the integration and build dashboards before the tournament starts (or when no live matches are available), you can enable **Demo Mode**:

1. Go to **Settings → Devices & Services → World Cup 2026 → Configure**
2. Toggle **Demo Mode** on
3. Click **Submit**

The integration reloads automatically.

Demo mode loads pre-built fixture data locally instead of calling the API, allowing dashboards and sensors to populate with realistic tournament data immediately.

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

## Tournament Statistics

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

## Betting & Match Statistics

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

Tournament progress calculations use the official FIFA World Cup 2026 total of:

```text
104 Matches
```

ensuring accurate progress tracking throughout the tournament.

---

# 🔄 Data Source

Match data, standings and player statistics are provided by:

**Football-Data.org**

Updates occur automatically throughout the tournament.

---

# ⚠️ Disclaimer

This project is an independent community integration.

It is not affiliated with FIFA, Football-Data.org, Home Assistant or HACS.

---

## 👨‍💻 Author

Created and maintained by **Adrian Apel**.

GitHub:

https://github.com/Adya84/ha-world-cup-2026

Special thanks to all contributors who have helped improve the integration.
