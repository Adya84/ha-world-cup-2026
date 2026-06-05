# World Cup 2026 Dashboard Installation Guide

## Installing the Dashboard

### Step 1 — Open the GitHub Repository

Open the World Cup 2026 GitHub repository and navigate to:

```text
examples
```

Open:

```text
dashboardRawConfig.yaml
```

### Step 2 — Copy the Dashboard YAML

Copy the entire contents of:

```text
dashboardRawConfig.yaml
```

Make sure you copy the complete file.

### Step 3 — Create a New Dashboard in Home Assistant

In Home Assistant go to:

```text
Settings → Dashboards
```

Click:

```text
Add Dashboard
```

Enter a name such as:

```text
World Cup 2026
```

Then click Create.

### Step 4 — Open the Raw Configuration Editor

Open your new dashboard.

Click **Edit Dashboard**.

Then click the **⋮ (three dots)** in the top-right corner.

Select **Raw configuration editor**.

### Step 5 — Paste the Dashboard YAML

Select all existing YAML in the editor and delete it.

Paste in the contents of:

```text
dashboardRawConfig.yaml
```

### Step 6 — Save

Click **Save**.

Your World Cup 2026 Dashboard should now be installed.

---

# Adding the Dashboard Background

## Step 1 — Download the Background Images

Return to the GitHub repository.

Navigate to:

```text
examples
```

Download:

```text
worldcup.png
worldcuppurple.png
```

## Step 2 — Open Dashboard Settings

Open your World Cup 2026 Dashboard.

Click **Edit Dashboard**.

Then click the **⋮ (three dots)**.

Select **Dashboard settings**.

## Step 3 — Upload a Background Image

Locate **Background**.

Click **Upload Image**.

Choose either:

```text
worldcup.png
```

or

```text
worldcuppurple.png
```

from your computer.

Home Assistant will automatically upload and apply the image.

## Step 4 — Save

Click **Save**.

The dashboard will now use the selected background image.

---

# Changing Backgrounds

To switch between the included backgrounds:

1. Open Dashboard Settings.
2. Select the Background option.
3. Upload the alternative image.
4. Click Save.

---

# Troubleshooting

## Dashboard Shows Missing Entities

Ensure the World Cup 2026 Integration is installed and working correctly before importing the dashboard.

## Background Image Not Showing

Try:

- Refreshing your browser (CTRL + F5)
- Confirming the image uploaded successfully
- Reopening the dashboard

## Dashboard Looks Different From the Screenshots

Check that:

- The World Cup 2026 Integration is installed.
- All sensors have been created successfully.
- The complete dashboardRawConfig.yaml file was copied.
- One of the supplied background images has been applied.
- Any required custom cards listed in the repository have been installed.

## You're Ready!

Your World Cup 2026 Dashboard should now match the example screenshots included in the GitHub repository.
