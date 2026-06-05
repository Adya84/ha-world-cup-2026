# World Cup 2026 Integration & Dashboard Installation Guide

This guide will walk you through installing the World Cup 2026 Integration via HACS and importing the included dashboard into Home Assistant.

Repository:

https://github.com/Adya84/ha-world-cup-2026

---

# Part 1 - Install the Integration via HACS

## Step 1 - Open HACS

In Home Assistant, open:

Settings → HACS

Select:

Integrations

---

## Step 2 - Add the Repository

Click the three dots (⋮) in the top-right corner.

Select:

Custom repositories

Add the following repository:

https://github.com/Adya84/ha-world-cup-2026

Category:

Integration

Click:

Add

---

## Step 3 - Download the Integration

Search for:

World Cup 2026

Open the integration and click:

Download

Wait for HACS to complete the installation.

---

## Step 4 - Restart Home Assistant

Go to:

Settings → System → Restart

Restart Home Assistant.

---

## Step 5 - Add the Integration

After Home Assistant restarts:

Go to:

Settings → Devices & Services

Click:

Add Integration

Search for:

World Cup 2026

Select the integration and complete the setup wizard.

---

## Step 6 - Verify Installation

You should now see:

World Cup 2026

listed under Devices & Services.

The integration will automatically create the required entities and sensors.

---

# Part 2 - Install the Included Dashboard

## Step 1 - Download the Dashboard YAML

Open:

https://github.com/Adya84/ha-world-cup-2026

Navigate to:

examples

Open:

dashboardRawConfig.yaml

Copy the entire contents of the file.

---

## Step 2 - Create a Dashboard

In Home Assistant go to:

Settings → Dashboards

Click:

Add Dashboard

Enter a name such as:

World Cup 2026

Click:

Create

---

## Step 3 - Open the Raw Configuration Editor

Open your new dashboard.

Click:

Edit Dashboard

Click the three dots (⋮) in the top-right corner.

Select:

Raw configuration editor

---

## Step 4 - Paste the Dashboard YAML

Delete everything currently in the editor.

Paste the contents of:

dashboardRawConfig.yaml

Click:

Save

The dashboard should now load.

---

# Part 3 - Install the Background Images

## Step 1 - Download the Included Backgrounds

Return to:

https://github.com/Adya84/ha-world-cup-2026

Navigate to:

examples

Download:

worldcup.png

and

worldcuppurple.png

---

## Step 2 - Upload a Background

Open your World Cup 2026 dashboard.

Click:

Edit Dashboard

Click the three dots (⋮)

Select:

Dashboard settings

Locate:

Background

Click:

Upload Image

Select either:

worldcup.png

or

worldcuppurple.png

Home Assistant will automatically upload and apply the image.

---

## Step 3 - Save

Click:

Save

Your dashboard should now match the screenshots shown in the GitHub repository.

---

# Updating the Integration

When a new version becomes available:

1. Open HACS.
2. Open Integrations.
3. Select World Cup 2026.
4. Click Update.
5. Restart Home Assistant.

---

# Troubleshooting

## Integration Not Appearing

- Restart Home Assistant.
- Clear browser cache.
- Verify the repository URL is correct.
- Confirm the repository was added as an Integration.

## Dashboard Missing Entities

- Verify the integration is installed.
- Wait a few minutes for sensors to populate.
- Restart Home Assistant.

## Background Not Showing

- Refresh your browser (CTRL + F5).
- Verify the image uploaded successfully.
- Reopen the dashboard.

---

# Need Help?

Visit the GitHub repository:

https://github.com/Adya84/ha-world-cup-2026

for the latest releases, updates and documentation.
