# 🏆 FIFA World Cup 2026 Dashboard Example

A ready-to-use Home Assistant dashboard example for the **World Cup 2026** custom HACS integration.

This updated version includes the newer dashboard add-ons/cards we built, including fixtures with stadiums, Golden Boot/assist tables, countdown cards, live match tracking, knockout stage cards, tournament records and the full stats hub.

---

# 📦 Required Components

Before importing this dashboard, install the following components.

## Required HACS Frontend Card

### Card Mod

Used for:

* Neon borders
* Glassmorphism effects
* Glow animations
* Custom styling
* Dashboard visual enhancements

Repository:

```text
https://github.com/thomasloven/lovelace-card-mod
```

Install via:

```text
HACS → Frontend → Card Mod
```

---

## Required Integration

### World Cup 2026

Repository:

```text
https://github.com/Adya84/ha-world-cup-2026
```

Install via:

```text
HACS → Integrations → World Cup 2026
```

---

## Required Data Source

### Football-Data.org API Key

Register for a free API key:

```text
https://www.football-data.org/
```

Add your API key when configuring the integration.

---

# 🛠 Installation Order

1. Install HACS
2. Install Card Mod
3. Restart Home Assistant
4. Install World Cup 2026 Integration
5. Restart Home Assistant
6. Add the Integration
7. Enter your Football-Data API Key
8. Import the Dashboard YAML
9. Enjoy the World Cup

---

# ✅ Updated Dashboard Add-ons Included

### Group Stage

* All 12 groups: Group A to Group L
* Neon styled tables
* Position, played, wins, draws, losses, goal difference and points

### Fixtures & Results

* Fixtures & Stadiums card
* Upcoming matches
* Kick-off time
* Stadium / venue display
* Status icons for scheduled, live, half-time and full-time
* Latest results
* Live matches
* Next kick-off

### Player Stats

* Golden Boot Race
* Golden Boot Podium
* Top Assists table

### Tournament Countdown

* Days until kick-off
* Kick-off imminent state
* Almost time state
* One week to go state

### Knockout Stage

* Knockout overview
* Current stage
* Teams remaining
* Eliminated teams calculation
* Matches remaining
* Tournament progress card
* Tournament records card

### Stats Hub

* World Cup stadiums
* Full tournament stats table
* Total goals
* Goals per match
* Live goals
* Biggest win
* Highest scoring match
* Latest result
* Top scorer
* Top assist
* Top scoring team
* Best defence

---

# ⚠️ Entity Names

This dashboard uses these entities:

```yaml
sensor.world_cup_best_defence
sensor.world_cup_biggest_win
sensor.world_cup_countdown
sensor.world_cup_current_stage
sensor.world_cup_days_until_final
sensor.world_cup_fixtures
sensor.world_cup_goals_per_match
sensor.world_cup_highest_scoring_match
sensor.world_cup_latest_result
sensor.world_cup_live_goals
sensor.world_cup_matches_remaining
sensor.world_cup_progress
sensor.world_cup_standings
sensor.world_cup_top_assist
sensor.world_cup_top_assists
sensor.world_cup_top_scorer
sensor.world_cup_top_scorers
sensor.world_cup_top_scoring_team
sensor.world_cup_total_goals
sensor.world_cup_total_matches_played
```

If Home Assistant has renamed your entities, update the YAML before importing.

Check entity names in:

```text
Settings → Devices & Services → Entities
```

---

# 📊 Tournament Progress

Tournament progress calculations use the official FIFA World Cup 2026 total of:

```text
104 Matches
```

This avoids Home Assistant state size limitations when fixture attributes are restricted.

---

# ⚠️ Fixture Attributes

The dashboard uses the simplified fixture attributes provided by the integration, including:

```jinja2
m.home
m.away
m.homeScore
m.awayScore
m.status
m.utcDate
m.group
m.stage
m.venue
```

The dashboard now safely falls back to `TBC` where venue/stadium data is not available.

---

# 📋 Full Dashboard YAML

Copy everything inside the block below into Home Assistant's Raw Configuration Editor.

```yaml
views:
  - type: sections
    sections:
      - type: grid
        cards:
          - type: heading
            heading_style: title
          - type: markdown
            content: |
              <h2>🏆 Group A</h2> <table>
                <tr>
                  <th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
                </tr>
                {% set s = state_attr('sensor.world_cup_standings', 'standings') or [] %}
                {% for g in s if g.group in ['Group A', 'GROUP_A'] %}
                {% for t in g.table %}
                <tr>
                  <td>{{ t.position }}</td>
                  <td>{{ t.team if t.team is string else t.team.shortName }}</td>
                  <td>{{ t.playedGames }}</td>
                  <td>{{ t.won }}</td>
                  <td>{{ t.draw }}</td>
                  <td>{{ t.lost }}</td>
                  <td>{{ t.goalDifference }}</td>
                  <td><b>{{ t.points }}</b></td>
                </tr>
                {% endfor %}
                {% endfor %}
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45) !important;
                  border-radius: 22px;
                  border: 2px solid rgba(0,255,255,0.45);
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 12px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }
                th {
                  color: #00ffff;
                  text-align: left;
                  padding: 4px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }
                td {
                  padding: 4px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
          - type: markdown
            content: |
              <h2>🏆 Group B</h2> <table>
                <tr>
                  <th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
                </tr>
                {% set s = state_attr('sensor.world_cup_standings', 'standings') or [] %}
                {% for g in s if g.group in ['Group B', 'GROUP_B'] %}
                {% for t in g.table %}
                <tr>
                  <td>{{ t.position }}</td>
                  <td>{{ t.team if t.team is string else t.team.shortName }}</td>
                  <td>{{ t.playedGames }}</td>
                  <td>{{ t.won }}</td>
                  <td>{{ t.draw }}</td>
                  <td>{{ t.lost }}</td>
                  <td>{{ t.goalDifference }}</td>
                  <td><b>{{ t.points }}</b></td>
                </tr>
                {% endfor %}
                {% endfor %}
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45) !important;
                  border-radius: 22px;
                  border: 2px solid rgba(0,255,255,0.45);
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 12px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }
                th {
                  color: #00ffff;
                  text-align: left;
                  padding: 4px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }
                td {
                  padding: 4px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
          - type: markdown
            content: |
              <h2>🏆 Group E</h2> <table>
                <tr>
                  <th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
                </tr>
                {% set s = state_attr('sensor.world_cup_standings', 'standings') or [] %}
                {% for g in s if g.group in ['Group E', 'GROUP_E'] %}
                {% for t in g.table %}
                <tr>
                  <td>{{ t.position }}</td>
                  <td>{{ t.team if t.team is string else t.team.shortName }}</td>
                  <td>{{ t.playedGames }}</td>
                  <td>{{ t.won }}</td>
                  <td>{{ t.draw }}</td>
                  <td>{{ t.lost }}</td>
                  <td>{{ t.goalDifference }}</td>
                  <td><b>{{ t.points }}</b></td>
                </tr>
                {% endfor %}
                {% endfor %}
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45) !important;
                  border-radius: 22px;
                  border: 2px solid rgba(0,255,255,0.45);
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 12px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }
                th {
                  color: #00ffff;
                  text-align: left;
                  padding: 4px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }
                td {
                  padding: 4px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
          - type: markdown
            content: |
              <h2>🏆 Group F</h2> <table>
                <tr>
                  <th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
                </tr>
                {% set s = state_attr('sensor.world_cup_standings', 'standings') or [] %}
                {% for g in s if g.group in ['Group F', 'GROUP_F'] %}
                {% for t in g.table %}
                <tr>
                  <td>{{ t.position }}</td>
                  <td>{{ t.team if t.team is string else t.team.shortName }}</td>
                  <td>{{ t.playedGames }}</td>
                  <td>{{ t.won }}</td>
                  <td>{{ t.draw }}</td>
                  <td>{{ t.lost }}</td>
                  <td>{{ t.goalDifference }}</td>
                  <td><b>{{ t.points }}</b></td>
                </tr>
                {% endfor %}
                {% endfor %}
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45) !important;
                  border-radius: 22px;
                  border: 2px solid rgba(0,255,255,0.45);
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 12px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }
                th {
                  color: #00ffff;
                  text-align: left;
                  padding: 4px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }
                td {
                  padding: 4px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
          - type: markdown
            content: |
              <h2>🏆 Group I</h2> <table>
                <tr>
                  <th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
                </tr>
                {% set s = state_attr('sensor.world_cup_standings', 'standings') or [] %}
                {% for g in s if g.group in ['Group I', 'GROUP_I'] %}
                {% for t in g.table %}
                <tr>
                  <td>{{ t.position }}</td>
                  <td>{{ t.team if t.team is string else t.team.shortName }}</td>
                  <td>{{ t.playedGames }}</td>
                  <td>{{ t.won }}</td>
                  <td>{{ t.draw }}</td>
                  <td>{{ t.lost }}</td>
                  <td>{{ t.goalDifference }}</td>
                  <td><b>{{ t.points }}</b></td>
                </tr>
                {% endfor %}
                {% endfor %}
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45) !important;
                  border-radius: 22px;
                  border: 2px solid rgba(0,255,255,0.45);
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 12px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }
                th {
                  color: #00ffff;
                  text-align: left;
                  padding: 4px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }
                td {
                  padding: 4px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
          - type: markdown
            content: |
              <h2>🏆 Group J</h2> <table>
                <tr>
                  <th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
                </tr>
                {% set s = state_attr('sensor.world_cup_standings', 'standings') or [] %}
                {% for g in s if g.group in ['Group J', 'GROUP_J'] %}
                {% for t in g.table %}
                <tr>
                  <td>{{ t.position }}</td>
                  <td>{{ t.team if t.team is string else t.team.shortName }}</td>
                  <td>{{ t.playedGames }}</td>
                  <td>{{ t.won }}</td>
                  <td>{{ t.draw }}</td>
                  <td>{{ t.lost }}</td>
                  <td>{{ t.goalDifference }}</td>
                  <td><b>{{ t.points }}</b></td>
                </tr>
                {% endfor %}
                {% endfor %}
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45) !important;
                  border-radius: 22px;
                  border: 2px solid rgba(0,255,255,0.45);
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 12px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }
                th {
                  color: #00ffff;
                  text-align: left;
                  padding: 4px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }
                td {
                  padding: 4px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
        column_span: 2
      - type: grid
        cards:
          - type: heading
            heading_style: title
          - type: markdown
            content: |
              <h2>🏆 Group C</h2> <table>
                <tr>
                  <th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
                </tr>
                {% set s = state_attr('sensor.world_cup_standings', 'standings') or [] %}
                {% for g in s if g.group in ['Group C', 'GROUP_C'] %}
                {% for t in g.table %}
                <tr>
                  <td>{{ t.position }}</td>
                  <td>{{ t.team if t.team is string else t.team.shortName }}</td>
                  <td>{{ t.playedGames }}</td>
                  <td>{{ t.won }}</td>
                  <td>{{ t.draw }}</td>
                  <td>{{ t.lost }}</td>
                  <td>{{ t.goalDifference }}</td>
                  <td><b>{{ t.points }}</b></td>
                </tr>
                {% endfor %}
                {% endfor %}
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45) !important;
                  border-radius: 22px;
                  border: 2px solid rgba(0,255,255,0.45);
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 12px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }
                th {
                  color: #00ffff;
                  text-align: left;
                  padding: 4px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }
                td {
                  padding: 4px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
          - type: markdown
            content: |
              <h2>🏆 Group D</h2> <table>
                <tr>
                  <th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
                </tr>
                {% set s = state_attr('sensor.world_cup_standings', 'standings') or [] %}
                {% for g in s if g.group in ['Group D', 'GROUP_D'] %}
                {% for t in g.table %}
                <tr>
                  <td>{{ t.position }}</td>
                  <td>{{ t.team if t.team is string else t.team.shortName }}</td>
                  <td>{{ t.playedGames }}</td>
                  <td>{{ t.won }}</td>
                  <td>{{ t.draw }}</td>
                  <td>{{ t.lost }}</td>
                  <td>{{ t.goalDifference }}</td>
                  <td><b>{{ t.points }}</b></td>
                </tr>
                {% endfor %}
                {% endfor %}
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45) !important;
                  border-radius: 22px;
                  border: 2px solid rgba(0,255,255,0.45);
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 12px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }
                th {
                  color: #00ffff;
                  text-align: left;
                  padding: 4px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }
                td {
                  padding: 4px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
          - type: markdown
            content: |
              <h2>🏆 Group G</h2> <table>
                <tr>
                  <th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
                </tr>
                {% set s = state_attr('sensor.world_cup_standings', 'standings') or [] %}
                {% for g in s if g.group in ['Group G', 'GROUP_G'] %}
                {% for t in g.table %}
                <tr>
                  <td>{{ t.position }}</td>
                  <td>{{ t.team if t.team is string else t.team.shortName }}</td>
                  <td>{{ t.playedGames }}</td>
                  <td>{{ t.won }}</td>
                  <td>{{ t.draw }}</td>
                  <td>{{ t.lost }}</td>
                  <td>{{ t.goalDifference }}</td>
                  <td><b>{{ t.points }}</b></td>
                </tr>
                {% endfor %}
                {% endfor %}
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45) !important;
                  border-radius: 22px;
                  border: 2px solid rgba(0,255,255,0.45);
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 12px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }
                th {
                  color: #00ffff;
                  text-align: left;
                  padding: 4px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }
                td {
                  padding: 4px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
          - type: markdown
            content: |
              <h2>🏆 Group H</h2> <table>
                <tr>
                  <th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
                </tr>
                {% set s = state_attr('sensor.world_cup_standings', 'standings') or [] %}
                {% for g in s if g.group in ['Group H', 'GROUP_H'] %}
                {% for t in g.table %}
                <tr>
                  <td>{{ t.position }}</td>
                  <td>{{ t.team if t.team is string else t.team.shortName }}</td>
                  <td>{{ t.playedGames }}</td>
                  <td>{{ t.won }}</td>
                  <td>{{ t.draw }}</td>
                  <td>{{ t.lost }}</td>
                  <td>{{ t.goalDifference }}</td>
                  <td><b>{{ t.points }}</b></td>
                </tr>
                {% endfor %}
                {% endfor %}
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45) !important;
                  border-radius: 22px;
                  border: 2px solid rgba(0,255,255,0.45);
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 12px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }
                th {
                  color: #00ffff;
                  text-align: left;
                  padding: 4px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }
                td {
                  padding: 4px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
          - type: markdown
            content: |
              <h2>🏆 Group K</h2> <table>
                <tr>
                  <th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
                </tr>
                {% set s = state_attr('sensor.world_cup_standings', 'standings') or [] %}
                {% for g in s if g.group in ['Group K', 'GROUP_K'] %}
                {% for t in g.table %}
                <tr>
                  <td>{{ t.position }}</td>
                  <td>{{ t.team if t.team is string else t.team.shortName }}</td>
                  <td>{{ t.playedGames }}</td>
                  <td>{{ t.won }}</td>
                  <td>{{ t.draw }}</td>
                  <td>{{ t.lost }}</td>
                  <td>{{ t.goalDifference }}</td>
                  <td><b>{{ t.points }}</b></td>
                </tr>
                {% endfor %}
                {% endfor %}
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45) !important;
                  border-radius: 22px;
                  border: 2px solid rgba(0,255,255,0.45);
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 12px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }
                th {
                  color: #00ffff;
                  text-align: left;
                  padding: 4px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }
                td {
                  padding: 4px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
          - type: markdown
            content: |
              <h2>🏆 Group L</h2> <table>
                <tr>
                  <th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th>
                </tr>
                {% set s = state_attr('sensor.world_cup_standings', 'standings') or [] %}
                {% for g in s if g.group in ['Group L', 'GROUP_L'] %}
                {% for t in g.table %}
                <tr>
                  <td>{{ t.position }}</td>
                  <td>{{ t.team if t.team is string else t.team.shortName }}</td>
                  <td>{{ t.playedGames }}</td>
                  <td>{{ t.won }}</td>
                  <td>{{ t.draw }}</td>
                  <td>{{ t.lost }}</td>
                  <td>{{ t.goalDifference }}</td>
                  <td><b>{{ t.points }}</b></td>
                </tr>
                {% endfor %}
                {% endfor %}
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45) !important;
                  border-radius: 22px;
                  border: 2px solid rgba(0,255,255,0.45);
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 12px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }
                th {
                  color: #00ffff;
                  text-align: left;
                  padding: 4px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }
                td {
                  padding: 4px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
        column_span: 2
    header:
      card:
        type: markdown
        text_only: true
        content: |-

          # 🏆 FIFA WORLD CUP 2026
          Group Stage

          **USA • Canada • Mexico 2026**
    badges: []
    background:
      opacity: 40
      alignment: center
      size: cover
      repeat: repeat
      attachment: fixed
      image:
        media_content_id: media-source://image_upload/247f9d0450fd44ee007e8fa2ea47416e
        media_content_type: image/jpeg
        metadata:
          title: >-
            AAW_J6e_suZHwmP_tKcGkkeYw3aoA_69wdkMM-zFgBLcIbjgmsGD2GSw1tFgw-DTMtbEtpoSzAdmtBcAvs19x1tl800UjhiK0sCWDT4hjrn-_lqStwtuGB2kntvigH7hvt5Ix2WygkcYqb5v8Jjhaqwh6pD0d5OuoYZ44ktWbpJZvlUODAq0EqBz96Dc1sAg.jpg
          thumbnail: /api/image/serve/247f9d0450fd44ee007e8fa2ea47416e/256x256
          media_class: image
          navigateIds:
            - {}
            - media_content_type: app
              media_content_id: media-source://image_upload
    cards: []
    max_columns: 4
    title: 🏆 FIFA WORLD CUP 2026 Group Stage
    icon: ''
    show_icon_and_title: true
  - type: sections
    max_columns: 4
    title: 📅 FIXTURES & RESULTS
    path: games
    sections:
      - type: grid
        cards:
          - type: heading
            heading_style: title
          - type: markdown
            content: >
              # 🏟️ Fixtures & Stadiums


              {% set matches = state_attr('sensor.world_cup_fixtures',
              'matches') or [] %}


              {% if matches | count == 0 %}

              No fixtures available.

              {% else %}


              <table>
                <tr>
                  <th>Date</th>
                  <th>KO</th>
                  <th>Match</th>
                  <th>Stadium</th>
                  <th></th>
                </tr>

                {% for m in matches[:20] %}
                {% set status =
                  '🕒' if m.status in ['TIMED', 'SCHEDULED']
                  else '🔴' if m.status == 'IN_PLAY'
                  else '⏸️' if m.status == 'PAUSED'
                  else '🏁' if m.status == 'FINISHED'
                  else '•'
                %}
                <tr>
                  <td>{{ as_timestamp(m.utcDate) | timestamp_custom('%d %b', true) }}</td>
                  <td>{{ as_timestamp(m.utcDate) | timestamp_custom('%H:%M', true) }}</td>
                  <td>{{ m.home }} v {{ m.away }}</td>
                  <td>{{ m.venue if m.venue is defined else 'TBC' }}</td>
                  <td>{{ status }}</td>
                </tr>
                {% endfor %}
              </table>


              {% endif %}

              <div style="margin-top:10px; color:#00ffff;">
                🕒 Scheduled &nbsp;&nbsp;
                🔴 Live &nbsp;&nbsp;
                ⏸️ Half Time &nbsp;&nbsp;
                🏁 Full Time
              </div>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45);
                  border: 2px solid rgba(0,255,255,0.45);
                  border-radius: 22px;
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 14px;
                }

                h1 {
                  color: #00ffff;
                  text-align: center;
                  margin-top: 0;
                  text-shadow: 0 0 10px rgba(0,255,255,0.7);
                }

                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 12px;
                }

                th {
                  color: #00ffff;
                  padding: 6px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }

                td {
                  padding: 6px;
                  border-bottom: 1px solid rgba(255,255,255,0.10);
                  text-align: center;
                }

                td:nth-child(3) {
                  font-weight: 700;
                  color: white;
                }

                td:nth-child(4) {
                  color: rgba(255,255,255,0.75);
                  font-size: 11px;
                }
      - type: grid
        cards:
          - type: heading
            heading_style: title
          - type: markdown
            content: >
              # 🏆 GOLDEN BOOT RACE


              {% set scorers = state_attr('sensor.world_cup_top_scorers',
              'scorers') or [] %}


              {% if scorers | count == 0 %}

              ⚽ No goals scored yet

              {% else %}

              {% for p in scorers[:10] %}

              <div class="scorer-row">
                <span class="rank">
                  {% if loop.index == 1 %}🥇
                  {% elif loop.index == 2 %}🥈
                  {% elif loop.index == 3 %}🥉
                  {% else %}{{ loop.index }}.
                  {% endif %}
                </span>
                <span class="player">{{ p.name }}</span>
                <span class="team">{{ p.team }}</span>
                <span class="goals">{{ p.goals }} ⚽</span>
              </div>

              {% endfor %}

              {% endif %}
            card_mod:
              style:
                ha-markdown$: |
                  h1 {
                    text-align: center;
                    font-size: 22px;
                    margin-bottom: 18px;
                    color: #ffffff;
                    text-shadow:
                      0 0 8px rgba(0,255,255,0.9),
                      0 0 18px rgba(0,255,255,0.55);
                  }

                  .scorer-row {
                    display: grid;
                    grid-template-columns: 42px 1fr 90px 58px;
                    align-items: center;
                    gap: 8px;
                    margin: 8px 0;
                    padding: 10px 12px;
                    border-radius: 14px;
                    background: rgba(0,255,255,0.07);
                    border: 1px solid rgba(0,255,255,0.18);
                  }

                  .rank {
                    font-size: 18px;
                    text-align: center;
                  }

                  .player {
                    font-weight: 700;
                    color: #ffffff;
                  }

                  .team {
                    font-size: 12px;
                    color: rgba(255,255,255,0.7);
                    text-align: right;
                  }

                  .goals {
                    font-weight: 800;
                    color: #00ffff;
                    text-align: right;
                    text-shadow: 0 0 8px rgba(0,255,255,0.7);
                  }
                .: |
                  ha-card {
                    background: rgba(5,14,24,0.38) !important;
                    backdrop-filter: blur(10px);
                    border-radius: 24px;
                    border: 2px solid rgba(0,255,255,0.38);
                    box-shadow:
                      0 0 20px rgba(0,255,255,0.25),
                      inset 0 0 14px rgba(0,255,255,0.08);
                    padding: 14px;
                    overflow: hidden;
                  }
          - type: markdown
            content: >
              {% set scorers =
              state_attr('sensor.world_cup_top_scorers','scorers') or [] %}


              # 👟 GOLDEN BOOT PODIUM


              {% if scorers|count >= 3 %}


              <div class="podium">


              <div class="second">

              <div class="player">{{ scorers[1].name }}</div>

              <div class="team">{{ scorers[1].team }}</div>

              <div class="goals">{{ scorers[1].goals }} ⚽</div>

              <div class="step silver">2</div>

              </div>


              <div class="first">

              <div class="player winner">{{ scorers[0].name }}</div>

              <div class="team">{{ scorers[0].team }}</div>

              <div class="goals">{{ scorers[0].goals }} ⚽</div>

              <div class="step gold">👟</div>

              </div>


              <div class="third">

              <div class="player">{{ scorers[2].name }}</div>

              <div class="team">{{ scorers[2].team }}</div>

              <div class="goals">{{ scorers[2].goals }} ⚽</div>

              <div class="step bronze">3</div>

              </div>


              </div>


              {% else %}

              Waiting for scorer data...

              {% endif %}
            card_mod:
              style:
                ha-markdown$: |
                  h1 {
                    text-align: center;
                    font-size: 22px;
                    margin-bottom: 18px;
                    color: #ffffff;
                    text-shadow:
                      0 0 8px rgba(0,255,255,0.9),
                      0 0 18px rgba(0,255,255,0.55);
                  }

                  .scorer-row {
                    display: grid;
                    grid-template-columns: 42px 1fr 90px 58px;
                    align-items: center;
                    gap: 8px;
                    margin: 8px 0;
                    padding: 10px 12px;
                    border-radius: 14px;
                    background: rgba(0,255,255,0.07);
                    border: 1px solid rgba(0,255,255,0.18);
                  }

                  .rank {
                    font-size: 18px;
                    text-align: center;
                  }

                  .player {
                    font-weight: 700;
                    color: #ffffff;
                  }

                  .team {
                    font-size: 12px;
                    color: rgba(255,255,255,0.7);
                    text-align: right;
                  }

                  .goals {
                    font-weight: 800;
                    color: #00ffff;
                    text-align: right;
                    text-shadow: 0 0 8px rgba(0,255,255,0.7);
                  }
                .: |
                  ha-card {
                    background: rgba(5,14,24,0.38) !important;
                    backdrop-filter: blur(10px);
                    border-radius: 24px;
                    border: 2px solid rgba(0,255,255,0.38);
                    box-shadow:
                      0 0 20px rgba(0,255,255,0.25),
                      inset 0 0 14px rgba(0,255,255,0.08);
                    padding: 14px;
                    overflow: hidden;
                  }
          - type: markdown
            content: >
              # 🎯 TOP ASSISTS


              {% set assists = state_attr('sensor.world_cup_top_assists',
              'assists') or [] %}


              {% if assists | count == 0 %}

              🎯 No assists yet

              {% else %}

              {% for p in assists[:10] %}

              <div class="assist-row">
                <span class="rank">
                  {% if loop.index == 1 %}🎯👑
                  {% elif loop.index == 2 %}🎯
                  {% elif loop.index == 3 %}🎯
                  {% else %}{{ loop.index }}.
                  {% endif %}
                </span>
                <span class="player">{{ p.name }}</span>
                <span class="team">{{ p.team }}</span>
                <span class="assists">{{ p.assists }} 🎯</span>
              </div>

              {% endfor %}

              {% endif %}
            card_mod:
              style:
                ha-markdown$: |
                  h1 {
                    text-align: center;
                    font-size: 22px;
                    margin-bottom: 18px;
                    color: #ffffff;
                    text-shadow:
                      0 0 8px rgba(0,255,255,0.9),
                      0 0 18px rgba(0,255,255,0.55);
                  }

                  .scorer-row {
                    display: grid;
                    grid-template-columns: 42px 1fr 90px 58px;
                    align-items: center;
                    gap: 8px;
                    margin: 8px 0;
                    padding: 10px 12px;
                    border-radius: 14px;
                    background: rgba(0,255,255,0.07);
                    border: 1px solid rgba(0,255,255,0.18);
                  }

                  .rank {
                    font-size: 18px;
                    text-align: center;
                  }

                  .player {
                    font-weight: 700;
                    color: #ffffff;
                  }

                  .team {
                    font-size: 12px;
                    color: rgba(255,255,255,0.7);
                    text-align: right;
                  }

                  .goals {
                    font-weight: 800;
                    color: #00ffff;
                    text-align: right;
                    text-shadow: 0 0 8px rgba(0,255,255,0.7);
                  }
                .: |
                  ha-card {
                    background: rgba(5,14,24,0.38) !important;
                    backdrop-filter: blur(10px);
                    border-radius: 24px;
                    border: 2px solid rgba(0,255,255,0.38);
                    box-shadow:
                      0 0 20px rgba(0,255,255,0.25),
                      inset 0 0 14px rgba(0,255,255,0.08);
                    padding: 14px;
                    overflow: hidden;
                  }
          - type: markdown
            content: >
              ## ⚽ Latest Results


              {% set matches = state_attr('sensor.world_cup_fixtures',
              'matches') or [] %}

              {% set results = matches | selectattr('status', 'eq', 'FINISHED')
              | list %}


              {% if results | count == 0 %}
                No matches completed yet.
              {% else %}


              <table>
                <tr>
                  <th>Match</th>
                  <th>Score</th>
                </tr>

                {% for m in results[-10:] | reverse %}
                <tr>
                  <td>{{ m.home }} v {{ m.away }}</td>
                  <td>{{ m.homeScore }} - {{ m.awayScore }}</td>
                </tr>
                {% endfor %}

              </table>


              {% endif %}
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45) !important;
                  border-radius: 22px;
                  border: 2px solid rgba(0,255,255,0.45);
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 14px;
                }

                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }

                th {
                  color: #00ffff;
                  text-align: left;
                  padding: 6px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }

                td {
                  padding: 6px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
      - type: grid
        cards:
          - type: heading
            heading_style: title
          - type: markdown
            content: >
              <center> 🏆<br> <b>FIFA WORLD CUP</b><br> <b>2026</b><br> USA •
              CANADA • MEXICO<br><br>

              <b>PRE TOURNAMENT</b><br> <span
              style="font-size:52px;font-weight:900;color:#00ffff;"> {{
              states('sensor.world_cup_countdown') }} </span><br> DAYS TO
              GO<br><br>

              <b style="font-size:28px;color:#00ffff;"> {{
              states('sensor.world_cup_total_matches_played') }} / 104 </b><br>
              MATCHES PLAYED<br><br>

              ⚽ {{ states('sensor.world_cup_total_goals') }} GOALS<br> 📈 {{
              states('sensor.world_cup_goals_per_match') }} GOALS / MATCH
              </center>
            card_mod:
              style: |
                ha-card {
                  text-align: center;
                  background: rgba(5,14,24,0.48);
                  border-radius: 28px;
                  border: 2px solid rgba(0,255,255,0.38);
                  box-shadow:
                    0 0 30px rgba(0,255,255,0.25),
                    inset 0 0 15px rgba(0,255,255,0.08);
                  padding: 28px;
                  color: white;
                  font-size: 16px;
                }
          - type: markdown
            content: >
              {% set matches = state_attr('sensor.world_cup_fixtures',
              'matches') or [] %} {% set live = matches | selectattr('status',
              'eq', 'IN_PLAY') | list %}

              <h2>🔴 Live Matches</h2>

              {% if live | count == 0 %}
                <p>No live matches right now.</p>
              {% else %}
                {% for m in live %}
                  <h3>{{ m.home }} {{ m.homeScore }} - {{ m.awayScore }} {{ m.away }}</h3>
                {% endfor %}
              {% endif %}
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45);
                  border-radius: 22px;
                  color: white;
                  text-align: center;
                  padding: 18px;
                  border: 2px solid rgba(0,255,255,0.65);
                  box-shadow:
                    0 0 12px rgba(0,255,255,0.45),
                    0 0 24px rgba(0,255,255,0.30),
                    inset 0 0 12px rgba(0,255,255,0.10);
                  animation: wcCyanGlow 2.5s ease-in-out infinite;
                }

                h1 {
                  color: #00ffff;
                  text-shadow:
                    0 0 8px rgba(0,255,255,0.9),
                    0 0 18px rgba(0,255,255,0.55);
                }

                @keyframes wcCyanGlow {
                  0% {
                    box-shadow:
                      0 0 10px rgba(0,255,255,0.30),
                      0 0 20px rgba(0,255,255,0.20),
                      inset 0 0 8px rgba(0,255,255,0.08);
                  }

                  50% {
                    box-shadow:
                      0 0 22px rgba(0,255,255,0.85),
                      0 0 42px rgba(0,255,255,0.55),
                      inset 0 0 16px rgba(0,255,255,0.18);
                  }

                  100% {
                    box-shadow:
                      0 0 10px rgba(0,255,255,0.30),
                      0 0 20px rgba(0,255,255,0.20),
                      inset 0 0 8px rgba(0,255,255,0.08);
                  }
                }
      - type: grid
        cards:
          - type: heading
            heading_style: title
          - type: markdown
            content: >
              # ⏳ Tournament Countdown


              {% set kickoff = as_datetime('2026-06-11 20:00:00') %}

              {% set days = ((as_timestamp(kickoff) - as_timestamp(now())) /
              86400) | int %}


              🏆 World Cup starts in


              # {{ days }} Days


              {% if days <= 1 %}

              ## 🏆 KICKOFF IMMINENT 🏆

              {% elif days <= 3 %}

              ## ⚽ Almost Time!

              {% elif days <= 7 %}

              ## 🏟️ One Week To Go

              {% endif %}
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45);
                  border-radius: 22px;
                  color: white;
                  text-align: center;
                  padding: 18px;
                  border: 2px solid rgba(0,255,255,0.65);
                  box-shadow:
                    0 0 12px rgba(0,255,255,0.45),
                    0 0 24px rgba(0,255,255,0.30),
                    inset 0 0 12px rgba(0,255,255,0.10);
                  animation: wcCyanGlow 2.5s ease-in-out infinite;
                }

                h1 {
                  color: #00ffff;
                  text-shadow:
                    0 0 8px rgba(0,255,255,0.9),
                    0 0 18px rgba(0,255,255,0.55);
                }

                @keyframes wcCyanGlow {
                  0% {
                    box-shadow:
                      0 0 10px rgba(0,255,255,0.30),
                      0 0 20px rgba(0,255,255,0.20),
                      inset 0 0 8px rgba(0,255,255,0.08);
                  }

                  50% {
                    box-shadow:
                      0 0 22px rgba(0,255,255,0.85),
                      0 0 42px rgba(0,255,255,0.55),
                      inset 0 0 16px rgba(0,255,255,0.18);
                  }

                  100% {
                    box-shadow:
                      0 0 10px rgba(0,255,255,0.30),
                      0 0 20px rgba(0,255,255,0.20),
                      inset 0 0 8px rgba(0,255,255,0.08);
                  }
                }
          - type: markdown
            content: >
              # ⚽ Next Kick-Off

              {% set matches = state_attr('sensor.world_cup_fixtures',
              'matches') or [] %} {% set upcoming = matches |
              selectattr('status','in',['TIMED','SCHEDULED']) | list %}

              {% if upcoming %}
                {{ upcoming[0].home }} v {{ upcoming[0].away }}

                🕒 {{ as_timestamp(upcoming[0].utcDate) | timestamp_custom('%d %b %H:%M', true) }}
              {% else %}
                No upcoming fixtures found.
              {% endif %}
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45);
                  border: 2px solid rgba(0,255,255,0.45);
                  border-radius: 22px;
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 14px;
                }
    header: {}
    icon: ''
    show_icon_and_title: true
    cards: []
    background:
      opacity: 60
      alignment: center
      size: cover
      repeat: repeat
      attachment: fixed
      image:
        media_content_id: media-source://image_upload/f14f1125ca3d65f08ee029ea96fb42cc
        media_content_type: image/png
        metadata:
          title: ChatGPT Image Jun 2, 2026, 02_27_18 PM.png
          thumbnail: /api/image/serve/f14f1125ca3d65f08ee029ea96fb42cc/256x256
          media_class: image
          navigateIds:
            - {}
            - media_content_type: app
              media_content_id: media-source://image_upload
  - type: sections
    max_columns: 4
    title: 🏆 KNOCKOUT STAGE
    path: knockout-stage
    sections:
      - type: grid
        cards:
          - type: markdown
            content: >
              <h1>🏆 Knockout Stage</h1>

              <h3>Live bracket will fill automatically when knockout fixtures
              appear.</h3>


              {% set matches = state_attr('sensor.world_cup_fixtures',
              'matches') or [] %}

              {% set ko = matches | rejectattr('stage', 'eq', 'GROUP_STAGE') |
              list %}


              {% if ko | count == 0 %}
                <p>No knockout fixtures available yet.</p>
              {% else %}


              <table>
                <tr>
                  <th>Stage</th>
                  <th>Date</th>
                  <th>KO</th>
                  <th>Match</th>
                  <th>Status</th>
                </tr>

                {% for m in ko %}
                {% set status = 'Scheduled' if m.status == 'TIMED' else 'Scheduled' if m.status == 'SCHEDULED' else 'LIVE' if m.status == 'IN_PLAY' else 'Half Time' if m.status == 'PAUSED' else 'Finished' if m.status == 'FINISHED' else m.status %}

                <tr>
                  <td>{{ m.stage | replace('_', ' ') | title if m.stage else '-' }}</td>
                  <td>{{ as_timestamp(m.utcDate) | timestamp_custom('%d %b', true) }}</td>
                  <td>{{ as_timestamp(m.utcDate) | timestamp_custom('%H:%M', true) }}</td>
                  <td>{{ m.home }} v {{ m.away }}</td>
                  <td>{{ status }}</td>
                </tr>
                {% endfor %}
              </table>


              {% endif %}
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45);
                  border: 2px solid rgba(0,255,255,0.45);
                  border-radius: 24px;
                  box-shadow: 0 0 24px rgba(0,255,255,0.35);
                  color: white;
                  padding: 18px;
                  text-align: center;
                  max-width: 1200px;
                  margin: 0 auto;
                }

                h1 {
                  color: #00ffff;
                  margin-top: 0;
                }

                h3 {
                  color: rgba(255,255,255,0.8);
                  font-weight: 400;
                }

                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 14px;
                }

                th {
                  color: #00ffff;
                  padding: 7px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }

                td {
                  padding: 7px;
                  border-bottom: 1px solid rgba(255,255,255,0.12);
                }
          - type: markdown
            content: >
              # 🏆 Knockout Stage


              {% set played = states('sensor.world_cup_total_matches_played') |
              int(0) %}

              {% set stage = states('sensor.world_cup_current_stage') %}


              {% if played == 0 %}
                {% set teams = 48 %}
                {% set fixed_stage = 'Pre Tournament' %}
              {% elif stage == 'Group Stage' %}
                {% set teams = 48 %}
                {% set fixed_stage = stage %}
              {% elif stage == 'Last 32' %}
                {% set teams = 32 %}
                {% set fixed_stage = stage %}
              {% elif stage == 'Last 16' %}
                {% set teams = 16 %}
                {% set fixed_stage = stage %}
              {% elif stage == 'Quarter Finals' %}
                {% set teams = 8 %}
                {% set fixed_stage = stage %}
              {% elif stage == 'Semi Finals' %}
                {% set teams = 4 %}
                {% set fixed_stage = stage %}
              {% elif stage == 'Final' %}
                {% set teams = 2 %}
                {% set fixed_stage = stage %}
              {% else %}
                {% set teams = 48 %}
                {% set fixed_stage = stage %}
              {% endif %}


              ## {{ fixed_stage }}


              ### 🌍 Teams Remaining

              # {{ teams }}


              ### ❌ Eliminated

              # {{ 48 - teams }}


              ### ⚽ Matches Remaining

              # {{ states('sensor.world_cup_matches_remaining') }}
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45);
                  border: 2px solid rgba(0,255,255,0.45);
                  border-radius: 22px;
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 14px;
                  text-align: center;
                }

                h1 {
                  color: #00ffff;
                  margin-top: 0;
                }

                h2 {
                  color: white;
                  margin-bottom: 18px;
                }

                h3 {
                  color: rgba(255,255,255,0.75);
                  margin-bottom: 0;
                }
      - type: grid
        cards:
          - type: heading
            heading_style: title
      - type: grid
        cards:
          - type: heading
            heading_style: title
          - type: markdown
            content: >
              # 📊 Tournament Progress


              {% set played = states('sensor.world_cup_total_matches_played') |
              int(0) %}

              {% set total = 104 %}


              Matches Played:


              ## {{ played }}


              Total Matches:


              ## {{ total }}


              Matches Remaining:


              ## {{ total - played }}


              Progress:


              ## {{ ((played / total) * 100) | round(1) }}%
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45);
                  border: 2px solid rgba(0,255,255,0.45);
                  border-radius: 22px;
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 14px;
                  text-align: center;
                }

                h1 {
                  color: #00ffff;
                  margin-top: 0;
                }
      - type: grid
        cards:
          - type: heading
            heading_style: title
          - type: markdown
            content: |
              # 🏆 Tournament Records

              ## 🔥 Biggest Win
              # {{ states('sensor.world_cup_biggest_win') }}

              ## 🚀 Highest Scoring Match
              # {{ states('sensor.world_cup_highest_scoring_match') }}

              ## ⚽ Top Scoring Team
              # {{ states('sensor.world_cup_top_scoring_team') }}

              ## 🛡️ Best Defence
              # {{ states('sensor.world_cup_best_defence') }}

              ## 📰 Latest Result
              # {{ states('sensor.world_cup_latest_result') }}
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45);
                  border: 2px solid rgba(0,255,255,0.45);
                  border-radius: 22px;
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 14px;
                  text-align: center;
                }

                h1 {
                  color: #00ffff;
                  margin-top: 0;
                  text-shadow: 0 0 10px rgba(0,255,255,0.7);
                }

                h2 {
                  color: rgba(255,255,255,0.75);
                  font-size: 16px;
                  margin-bottom: 2px;
                }

                h1 + h2 {
                  margin-top: 12px;
                }

                h2 + h1 {
                  color: white;
                  font-size: 20px;
                  margin-top: 0;
                  margin-bottom: 14px;
                }
    header:
      card:
        type: markdown
        text_only: true
        content: 🏆 KNOCKOUT STAGE
    background:
      opacity: 60
      alignment: center
      size: cover
      repeat: repeat
      attachment: fixed
      image:
        media_content_id: media-source://image_upload/32bb5a2be677f35f153e446a930ef3b6
        media_content_type: image/png
        metadata:
          title: ChatGPT Image Jun 2, 2026, 02_27_18 PM.png
          thumbnail: /api/image/serve/32bb5a2be677f35f153e446a930ef3b6/256x256
          media_class: image
          navigateIds:
            - {}
            - media_content_type: app
              media_content_id: media-source://image_upload
    cards: []
  - type: sections
    max_columns: 4
    title: 📊 World Cup Stats Hub
    path: stats
    sections:
      - type: grid
        cards:
          - type: markdown
            content: |
              # 🏟️ World Cup Stadiums

              <table width="100%">
                <tr>
                  <th>Country</th>
                  <th>Stadium</th>
                  <th>City</th>
                </tr>

                <tr><td>🇺🇸 USA</td><td>MetLife Stadium</td><td>New York/New Jersey</td></tr>
                <tr><td>🇺🇸 USA</td><td>AT&T Stadium</td><td>Dallas</td></tr>
                <tr><td>🇺🇸 USA</td><td>SoFi Stadium</td><td>Los Angeles</td></tr>
                <tr><td>🇺🇸 USA</td><td>Mercedes-Benz Stadium</td><td>Atlanta</td></tr>
                <tr><td>🇺🇸 USA</td><td>Lincoln Financial Field</td><td>Philadelphia</td></tr>
                <tr><td>🇺🇸 USA</td><td>NRG Stadium</td><td>Houston</td></tr>
                <tr><td>🇺🇸 USA</td><td>Hard Rock Stadium</td><td>Miami</td></tr>
                <tr><td>🇺🇸 USA</td><td>Lumen Field</td><td>Seattle</td></tr>
                <tr><td>🇺🇸 USA</td><td>Levi's Stadium</td><td>San Francisco</td></tr>
                <tr><td>🇺🇸 USA</td><td>Arrowhead Stadium</td><td>Kansas City</td></tr>
                <tr><td>🇺🇸 USA</td><td>Gillette Stadium</td><td>Boston</td></tr>

                <tr><td>🇨🇦 Canada</td><td>BC Place</td><td>Vancouver</td></tr>
                <tr><td>🇨🇦 Canada</td><td>BMO Field</td><td>Toronto</td></tr>

                <tr><td>🇲🇽 Mexico</td><td>Estadio Azteca</td><td>Mexico City</td></tr>
                <tr><td>🇲🇽 Mexico</td><td>Estadio BBVA</td><td>Monterrey</td></tr>
                <tr><td>🇲🇽 Mexico</td><td>Estadio Akron</td><td>Guadalajara</td></tr>
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45);
                  border: 2px solid rgba(0,255,255,0.45);
                  border-radius: 22px;
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 14px;
                }

                h1 {
                  color: #00ffff;
                  text-align: center;
                  margin-top: 0;
                  text-shadow: 0 0 10px rgba(0,255,255,0.7);
                }

                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 13px;
                }

                th {
                  color: #00ffff;
                  padding: 8px;
                  border-bottom: 1px solid rgba(0,255,255,0.35);
                }

                td {
                  padding: 6px;
                  border-bottom: 1px solid rgba(255,255,255,0.08);
                  text-align: center;
                }
      - type: grid
        cards:
          - type: heading
            heading_style: title
      - type: grid
        cards:
          - type: heading
            heading_style: title
          - type: markdown
            content: >
              # 📊 World Cup Stats Hub


              {% set played = states('sensor.world_cup_total_matches_played') |
              int(0) %}

              {% set stage = states('sensor.world_cup_current_stage') %}


              {% if played == 0 %}
                {% set teams = 48 %}
              {% elif stage == 'Group Stage' %}
                {% set teams = 48 %}
              {% elif stage == 'Last 32' %}
                {% set teams = 32 %}
              {% elif stage == 'Last 16' %}
                {% set teams = 16 %}
              {% elif stage == 'Quarter Finals' %}
                {% set teams = 8 %}
              {% elif stage == 'Semi Finals' %}
                {% set teams = 4 %}
              {% elif stage == 'Final' %}
                {% set teams = 2 %}
              {% else %}
                {% set teams = 48 %}
              {% endif %}


              <table>
                <tr><td>🏆 Current Stage</td><td>{{ states('sensor.world_cup_current_stage') }}</td></tr>
                <tr><td>⏳ Days Until Kickoff</td><td>{{ states('sensor.world_cup_countdown') }}</td></tr>
                <tr><td>🏁 Days Until Final</td><td>{{ states('sensor.world_cup_days_until_final') }}</td></tr>
                <tr><td>📈 Tournament Progress</td><td>{{ states('sensor.world_cup_progress') }}%</td></tr>
                <tr><td>⚽ Matches Played</td><td>{{ states('sensor.world_cup_total_matches_played') }} / 104</td></tr>
                <tr><td>🧮 Matches Remaining</td><td>{{ states('sensor.world_cup_matches_remaining') }}</td></tr>

                {% if played == 0 %}
                <tr><td>🌍 Teams Entered</td><td>48</td></tr>
                <tr><td>❌ Teams Eliminated</td><td>0</td></tr>
                {% else %}
                <tr><td>🌍 Teams Remaining</td><td>{{ teams }}</td></tr>
                <tr><td>❌ Teams Eliminated</td><td>{{ 48 - teams }}</td></tr>
                {% endif %}

                <tr><td>⚽ Total Goals</td><td>{{ states('sensor.world_cup_total_goals') }}</td></tr>
                <tr><td>📊 Goals Per Match</td><td>{{ states('sensor.world_cup_goals_per_match') }}</td></tr>
                <tr><td>🔴 Live Goals</td><td>{{ states('sensor.world_cup_live_goals') }}</td></tr>
                <tr><td>🔥 Biggest Win</td><td>{{ states('sensor.world_cup_biggest_win') }}</td></tr>
                <tr><td>🚀 Highest Scoring Match</td><td>{{ states('sensor.world_cup_highest_scoring_match') }}</td></tr>
                <tr><td>📰 Latest Result</td><td>{{ states('sensor.world_cup_latest_result') }}</td></tr>
                <tr><td>👟 Top Scorer</td><td>{{ states('sensor.world_cup_top_scorer') }}</td></tr>
                <tr><td>🎯 Top Assist</td><td>{{ states('sensor.world_cup_top_assist') }}</td></tr>
                <tr><td>⚽ Top Scoring Team</td><td>{{ states('sensor.world_cup_top_scoring_team') }}</td></tr>
                <tr><td>🛡️ Best Defence</td><td>{{ states('sensor.world_cup_best_defence') }}</td></tr>
              </table>
            card_mod:
              style: |
                ha-card {
                  background: rgba(5,14,24,0.45);
                  border: 2px solid rgba(0,255,255,0.45);
                  border-radius: 22px;
                  box-shadow: 0 0 20px rgba(0,255,255,0.30);
                  color: white;
                  padding: 14px;
                }

                h1 {
                  color: #00ffff;
                  text-align: center;
                  margin-top: 0;
                  margin-bottom: 15px;
                  text-shadow: 0 0 10px rgba(0,255,255,0.7);
                }

                table {
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 14px;
                }

                td {
                  padding: 8px 6px;
                  border-bottom: 1px solid rgba(0,255,255,0.15);
                }

                td:first-child {
                  text-align: left;
                  color: rgba(255,255,255,0.75);
                  font-weight: 600;
                  width: 50%;
                }

                td:last-child {
                  text-align: right;
                  color: white;
                  font-weight: 800;
                }

                tr:hover {
                  background: rgba(0,255,255,0.05);
                }

                tr:last-child td {
                  border-bottom: none;
                }
    cards: []
    background:
      opacity: 60
      alignment: center
      size: cover
      repeat: repeat
      attachment: fixed
      image:
        media_content_id: media-source://image_upload/a25da5ec42604bb131a330b4eeb399c0
        media_content_type: image/png
        metadata:
          title: WorldCupPurple.png
          thumbnail: /api/image/serve/a25da5ec42604bb131a330b4eeb399c0/256x256
          media_class: image
          navigateIds:
            - {}
            - media_content_type: app
              media_content_id: media-source://image_upload
```
