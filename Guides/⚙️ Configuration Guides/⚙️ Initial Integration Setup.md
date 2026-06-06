# ⚙️ Initial Integration Setup

This guide explains how to configure the World Cup 2026 integration after installation.

---

# Step 1 - Install The Integration

Install the World Cup 2026 integration through HACS.

If you haven't already done this, please follow the installation guide first.

After installation:

```text
Restart Home Assistant
```

---

# Step 2 - Add The Integration

Navigate to:

```text
Settings → Devices & Services
```

Click:

```text
Add Integration
```

Search for:

```text
World Cup 2026
```

Select the integration.

---

# Step 3 - Configure The Integration

Follow the setup wizard.

Depending on your version, you may be asked to configure:

* API Access
* Demo Mode
* Update Settings

Complete the setup and click:

```text
Submit
```

---

# Step 4 - Verify Installation

Navigate to:

```text
Settings → Devices & Services
```

Locate:

```text
World Cup 2026
```

You should see the integration listed and loaded successfully.

---

# Step 5 - Check Sensors

Navigate to:

```text
Developer Tools → States
```

Search for:

```text
world_cup
```

You should see World Cup entities and sensors.

Examples may include:

```text
sensor.world_cup_2026_matches_played
sensor.world_cup_2026_matches_remaining
sensor.world_cup_2026_total_goals
sensor.world_cup_2026_live_matches
```

Available sensors will vary depending on your version.

---

# Step 6 - Verify Data Updates

Open the integration.

Check:

```text
Last Updated
```

and ensure data is being refreshed successfully.

If using live data, fixtures and standings should begin appearing automatically.

---

# Step 7 - Optional Dashboard Installation

To install the included dashboard:

1. Create a new dashboard
2. Import the supplied YAML file
3. Save the dashboard

For detailed instructions, see the Dashboard Installation Guide.

---

# Step 8 - Optional Dashboard Background

To customise your dashboard:

1. Open the dashboard
2. Click:

```text
Edit Dashboard
```

3. Select:

```text
Change Background
```

4. Upload your preferred image

The dashboard background will be applied automatically.

---

# Step 9 - Optional Language Support

Version 3.2 includes multi-language dashboard support.

Supported languages include:

* English
* French
* German
* Spanish
* Italian
* Dutch
* Portuguese
* Arabic
* Japanese
* Korean
* Swedish
* Norwegian

Language can be changed directly from the dashboard using the included language selector.

---

# Step 10 - Optional World Cup Application

Version 3.2 includes a dedicated World Cup application accessible directly from the Home Assistant sidebar.

Features include:

* Overview
* Live Centre
* Fixtures & Results
* Group Standings
* Knockout Centre
* Statistics Hub
* Tournament Records
* Stadium Information

The World Cup Application sidebar is currently **Beta** and may receive additional updates and improvements.

---

# Troubleshooting

### No Data Appearing

Allow a few minutes for the first update cycle to complete.

---

### Sensors Unavailable

Restart Home Assistant and verify the integration is loaded correctly.

---

### Dashboard Empty

Ensure the integration is configured and sensor data is available before importing the dashboard.

---

### Sidebar Application Missing

Clear your browser cache:

```text
Ctrl + F5
```

and restart Home Assistant.

---

# Setup Complete

Your World Cup 2026 integration is now ready to use.

Enjoy following every match, goal and statistic from FIFA World Cup 2026 directly within Home Assistant. ⚽🏆
