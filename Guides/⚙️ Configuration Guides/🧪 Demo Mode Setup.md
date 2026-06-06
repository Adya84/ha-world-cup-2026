# 🧪 Demo Mode Setup

Demo Mode allows you to test the World Cup 2026 integration and dashboard without requiring live tournament data.

It is ideal for:

* Testing dashboards
* Exploring features before the tournament starts
* Development and troubleshooting
* Demonstrating the integration to others

---

# What Is Demo Mode?

When Demo Mode is enabled, the integration generates sample World Cup data including:

* Fixtures
* Results
* Group Standings
* Live Matches
* Knockout Fixtures
* Tournament Statistics
* Player Statistics
* Stadium Information

This allows the dashboard and World Cup Application to function as if the tournament is already underway.

---

# Enabling Demo Mode

Navigate to:

```text
Settings → Devices & Services
```

Open:

```text
World Cup 2026
```

Click:

```text
Configure
```

Enable:

```text
Demo Mode
```

Click:

```text
Submit
```

---

# Restart Home Assistant

After enabling Demo Mode:

```text
Settings → System → Restart
```

Allow Home Assistant to restart fully.

---

# Verify Demo Data

Open:

```text
Developer Tools → States
```

Search for:

```text
world_cup
```

You should now see World Cup sensors populated with demonstration data.

---

# Testing The Dashboard

Demo Mode provides data for:

✅ Tournament Overview

✅ Fixtures & Results

✅ Group Standings

✅ Knockout Centre

✅ Statistics Hub

✅ Tournament Records

✅ Stadium Information

✅ Golden Boot Race

✅ Player Statistics

---

# Testing The World Cup Application

The dedicated World Cup Application can also be tested using Demo Mode.

Pages available include:

* Overview
* Live Centre
* Fixtures & Results
* Group Standings
* Knockout Centre
* Statistics Hub
* Tournament Records
* Stadium Information

---

# Demo Mode Limitations

Demo Mode is designed for testing purposes only.

Data may:

* Be simulated
* Not represent real fixtures
* Not reflect actual results
* Reset between updates

---

# Disabling Demo Mode

Navigate to:

```text
Settings → Devices & Services
```

Open:

```text
World Cup 2026
```

Click:

```text
Configure
```

Disable:

```text
Demo Mode
```

Click:

```text
Submit
```

Restart Home Assistant.

The integration will return to using live tournament data.

---

# Troubleshooting

### No Demo Data Appears

Restart Home Assistant after enabling Demo Mode.

---

### Dashboard Still Empty

Allow a few minutes for sensors to update and refresh the browser:

```text
Ctrl + F5
```

---

### Application Not Showing Demo Data

Restart Home Assistant and ensure Demo Mode is enabled in the integration settings.

---

# Setup Complete

You can now explore and test the World Cup 2026 integration before the tournament begins using realistic demonstration data. ⚽🏆
