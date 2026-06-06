# 📊 Installing the World Cup 2026 Dashboard in Home Assistant

This guide explains how to install and import the included World Cup 2026 dashboard into Home Assistant.

---

# Step 1 - Install the Integration

Install the World Cup 2026 integration via HACS:

1. Open **HACS**
2. Click **Integrations**
3. Click **Custom Repositories**
4. Add:

```text
https://github.com/Adya84/ha-world-cup-2026
```

5. Category:

```text
Integration
```

6. Click **Add**
7. Search for:

```text
World Cup 2026
```

8. Install
9. Restart Home Assistant

---

# Step 2 - Configure the Integration

1. Navigate to:

```text
Settings → Devices & Services
```

2. Click:

```text
Add Integration
```

3. Search for:

```text
World Cup 2026
```

4. Complete the setup wizard.

Once configured you should see the World Cup sensors appear.

---

# Step 3 - Create a Dashboard

1. Navigate to:

```text
Settings → Dashboards
```

2. Click:

```text
Add Dashboard
```

3. Enter a name such as:

```text
World Cup 2026
```

4. Save the dashboard.

---

# Step 4 - Open Dashboard Configuration

Open the newly created dashboard.

Click:

```text
⋮ (Top Right)
```

Then:

```text
Edit Dashboard
```

Select:

```text
Raw Configuration Editor
```

---

# Step 5 - Import Dashboard YAML

Open the included dashboard file:

```text
world_cup_dashboard.yaml
```

Copy the entire contents.

Paste into:

```text
Raw Configuration Editor
```

Replace any existing content.

Click:

```text
Save
```

---

# Step 6 - Create Required Helpers

Some dashboard features require a language selector helper.

Navigate to:

```text
Settings → Devices & Services → Helpers
```

Create:

### Input Select

Name:

```text
World Cup Dashboard Language
```

Entity ID:

```text
input_select.world_cup_dashboard_language
```

Options:

```text
English
French
German
Spanish
Italian
Dutch
Portuguese
Arabic
Japanese
Korean
Swedish
Norwegian
```

Save the helper.

---

# Step 7 - Refresh Dashboard

After importing:

1. Refresh browser
2. Clear cache if required
3. Reload Home Assistant

You should now see:

✅ Overview

✅ Live Centre

✅ Fixtures & Results

✅ Group Standings

✅ Knockout Centre

✅ Statistics Hub

✅ Tournament Records

✅ Stadium Information

✅ Multi-Language Support

---

# Optional - Sidebar Application (Beta)

Version 3.2 introduces the dedicated World Cup Application.

Features:

* Automatic Sidebar Loading
* Built-In Navigation
* Mobile Friendly Layout
* Statistics Hub
* Records Centre
* Venue Information
* Knockout Tracking

The World Cup Application is currently **Beta** and may receive additional updates and improvements.

---

# Troubleshooting

### Dashboard Shows Missing Entities

Ensure the integration has been configured correctly and sensors have been created.

### Dashboard Loads But No Data Appears

Wait a few minutes for the first API update.

Check:

```text
Settings → Devices & Services → World Cup 2026
```

### Sidebar Application Not Appearing

Restart Home Assistant and clear browser cache:

```text
Ctrl + F5
```

---

# Need Help?

GitHub Issues:

https://github.com/Adya84/ha-world-cup-2026/issues

Project Repository:

https://github.com/Adya84/ha-world-cup-2026

---

Enjoy the FIFA World Cup 2026 directly inside Home Assistant! ⚽🏆

