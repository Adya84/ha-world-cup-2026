# ⚽ Home Assistant World Cup 2026

A complete FIFA World Cup 2026 integration and dedicated tournament application for Home Assistant.

Track every fixture, result, player, team, group, stadium and tournament statistic from the largest FIFA World Cup ever held.

Featuring 48 teams, 12 groups, 104 matches and host venues across the United States, Canada and Mexico.

---

## 📦 Installation

### Option 1: Install via HACS

1. Open Home Assistant.
2. Go to **HACS**.
3. Open the menu in the top-right corner and select **Custom repositories**.
4. Add this repository URL:

   `https://github.com/Adya84/ha-world-cup-2026`

5. Select **Integration** as the category.
6. Click **Add**.
7. Search for **World Cup 2026** in HACS.
8. Download and install the integration.
9. Restart Home Assistant.

### Option 2: Manual Installation

1. Download or clone this repository.
2. Copy the integration folder:

   `custom_components/world_cup_2026`

   into your Home Assistant configuration directory:

   `config/custom_components/world_cup_2026`

3. Your folder structure should look like this:

   `config/custom_components/world_cup_2026/manifest.json`

4. Restart Home Assistant.

---

## ⚙️ Configuration

1. In Home Assistant, go to **Settings**.
2. Open **Devices & Services**.
3. Click **Add Integration**.
4. Search for **World Cup 2026**.
5. Enter your `football-data.org` API key when prompted.
6. Complete the setup flow.

---

## 🧪 Demo Mode

Demo mode can be enabled after setup:

1. Go to **Settings → Devices & Services**.
2. Open the **World Cup 2026** integration.
3. Click **Configure**.
4. Enable **Demo Mode**.
5. Save the options.

Demo mode loads local fixture data instead of calling the live API, making it ideal for dashboard testing and development before the tournament begins.

---

## 🔑 API Key

This integration uses data from:

https://www.football-data.org/

A valid API key is required for live tournament data.

The API key is entered during the Home Assistant setup process.

---

# 🚀 Latest Release - v3.3.3

The World Cup 2026 integration continues to evolve with major improvements to the dedicated tournament application.

---

## 🍺 New In v3.3.3

### Supporters & Community Update

A major update focused on recognising supporters and improving the overall application experience.

Features include:

- New dedicated Supporters page
- Latest Supporters section
- Supporter Wall recognition system
- Country flags displayed for supporters
- Date-based supporter ordering
- Automatic highlighting of newest supporters
- Improved Supporters page layout
- Buy Me a Beer support integration
- Cleaner supporter recognition experience

### 🎨 User Interface Improvements

- Buy Me a Beer button moved into the application header
- Donation bars removed from standard application pages
- Less intrusive support prompts
- Improved header layout
- Better use of screen space
- Improved tablet compatibility
- Improved mobile layouts
- Cleaner application design throughout

### ⚙️ Home Assistant Improvements

- Fixed async blocking file access warnings
- Improved compatibility with newer Home Assistant releases
- Improved file loading performance
- Better application responsiveness
- General stability improvements

### 🌍 Language Improvements

- Added Polish language support
- Translation improvements
- Updated language selector support

---

## 🏟 Previous Release - v3.3.0

### Stadiums & Venues Upgrade

Major upgrade to the Stadiums & Venues section.

Features include:

- All 16 official FIFA World Cup 2026 venues
- Dedicated stadium database
- Stadium photographs
- Real stadium names
- Host city information
- Stadium capacities
- Matches hosted
- Final venue showcase
- Improved venue page layout

---

# 🌟 Features

## 🧭 Dedicated World Cup Application

A fully featured World Cup application built directly into Home Assistant.

Navigate instantly between:

- Overview
- Live Centre
- Fixtures & Results
- Groups Centre
- Knockout Centre
- Golden Boot Centre
- Statistics Hub
- Records Hub
- Stadiums & Venues
- Supporters

Designed for desktop, tablet and mobile devices with modern navigation and a dedicated World Cup experience.

---

## ⚽ Live Match Data

Track the tournament in real time with:

- Live Fixtures
- Match Results
- Live Match Status
- Group Standings
- Match Statistics
- Goal Scorers
- Match Countdown
- Kick-Off Information
- Today's Matches
- Tomorrow's Matches
- Completed Matches
- Live Goals Counter
- Match Venue Information

---

## 🏆 Tournament Tracking

Follow every stage of the FIFA World Cup 2026:

- Group Stage
- Round of 32
- Round of 16
- Quarter Finals
- Semi Finals
- Third Place Playoff
- Final

Includes dedicated knockout stage tracking and tournament progression monitoring.

---

## 📊 Statistics Hub

Advanced tournament analytics including:

- Tournament Progress
- Matches Played
- Matches Remaining
- Total Goals
- Goals Per Match
- Draw Rate
- BTTS Rate
- Over 2.5 Goals Rate
- Live Match Count
- Team Performance Metrics
- Tournament Completion Percentage

---

## 🔥 Tournament Records

Track major World Cup records throughout the tournament.

Includes:

- Biggest Win
- Highest Scoring Match
- Latest Result
- Top Scoring Team
- Best Defence
- Team Goal Statistics
- Goal Difference Rankings
- Tournament Record Tracking

---

## 👤 Golden Boot Centre

Track the race for the Golden Boot.

Includes:

- Goals
- Assists
- Top Scorers
- Tournament Leaders
- Automatic football-data.org Updates
- Local Fallback Support

---

## 🏟 Stadiums & Venues

Comprehensive venue support including:

- Official FIFA Venue Names
- Real Stadium Names
- Stadium Photographs
- Host City Information
- Stadium Capacities
- Matches Hosted
- USA Venues
- Canada Venues
- Mexico Venues
- Final Venue Information

Includes all 16 official FIFA World Cup 2026 host venues.

---

## ❤️ Supporters Wall

Recognising the amazing community supporting development.

Features include:

- Dedicated Supporters page
- Latest Supporters section
- Country flags
- Supporter Wall
- Date-based supporter ordering
- Community recognition

Supporters are displayed directly inside the application.

---

## 🌍 Multi-Language Support

Built-in language support includes:

- English 🇬🇧
- French 🇫🇷
- German 🇩🇪
- Spanish 🇪🇸
- Italian 🇮🇹
- Dutch 🇳🇱
- Portuguese 🇵🇹
- Arabic 🇸🇦
- Japanese 🇯🇵
- Korean 🇰🇷
- Swedish 🇸🇪
- Norwegian 🇳🇴
- Polish 🇵🇱

Additional features:

- Automatic Language Persistence
- Localised Date Formatting
- Arabic RTL Support
- Translated Group Headings
- Built-In Language Selector

---

## 🎨 Dashboard Included

Ready-to-import dashboard featuring:

- Tournament Overview
- Fixtures & Results
- Group Standings
- Live Match Centre
- Statistics Hub
- Records Hub
- Golden Boot Centre
- Knockout Centre
- Stadiums & Venues
- Supporters Page
- Multi-Language Support
- Mobile Friendly Layout

---

## 🧪 Demo Mode

No API access required.

Demo mode includes:

- Demo Fixtures
- Demo Results
- Dashboard Testing
- Sensor Testing
- Full Dashboard Preview
- Offline Development Support

Perfect for testing before the tournament begins.

---

## 📦 Included Sensors

The integration provides sensors covering:

- Tournament Information
- Live Match Data
- Fixtures & Results
- Group Standings
- Player Statistics
- Tournament Analytics
- Tournament Records
- Venue Information
- Knockout Tracking
- Stadium Data
- Host Cities
- Final Venue Information

---

# ❤️ Support Development

If you enjoy using the World Cup 2026 integration and would like to support future development:

## 🍺 Buy Me a Beer

PayPal:

https://paypal.me/graffidoodle

Every contribution helps support:

- New Features
- Dashboard Improvements
- Bug Fixes
- Ongoing Maintenance
- Translation Support
- Future Tournament Integrations
- API Testing
- Development Time

### 🎖 Supporters Wall

Want your name displayed in the application?

Simply Buy Me a Beer and your name will be added to the Supporters Wall inside the World Cup 2026 app.

Thank you to everyone supporting the project and helping make World Cup 2026 the ultimate Home Assistant football integration.
