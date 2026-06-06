# 🔴 Live Centre Guide

The Live Centre is the dedicated area of the World Cup 2026 Application for monitoring matches currently in progress.

It provides real-time match information, scores and tournament action as it happens.

---

# Accessing The Live Centre

Open the World Cup 2026 Application from the Home Assistant sidebar.

Select:

```text
Live Centre
```

from the navigation menu.

---

# What The Live Centre Shows

The Live Centre focuses on matches that are currently taking place.

Information may include:

* Live Fixtures
* Current Scores
* Match Status
* Kick-Off Times
* Team Information
* Match Progress

---

# Live Matches

When matches are being played, they will appear automatically in the Live Centre.

Example:

```text
England 2 - 1 Brazil
65'
```

The displayed information updates automatically as the match progresses.

---

# Match Status

The Live Centre displays the current status of each match.

Examples include:

```text
LIVE
```

```text
1H
```

```text
HT
```

```text
2H
```

```text
PAUSED
```

```text
FT
```

---

# Current Scores

Scores update automatically during live matches.

Example:

```text
Spain 3 - 2 Germany
```

The integration automatically refreshes more frequently during live matches to keep information up to date.

---

# Live Match Counter

The Live Centre displays how many matches are currently in progress.

Example:

```text
Live Matches
3
```

---

# No Live Matches

When no matches are currently being played, the Live Centre may display:

```text
No Live Matches
```

or show upcoming fixtures instead.

This is normal behaviour.

---

# Automatic Updates

Version 3.2 includes smart polling.

When live matches are detected:

```text
Update Interval
1 Minute
```

When no matches are live:

```text
Update Interval
15 Minutes
```

This provides faster updates while reducing unnecessary API requests.

---

# During Match Days

The Live Centre becomes one of the most active sections of the application.

Ideal for:

✅ Following scores

✅ Monitoring multiple matches

✅ Tracking live tournament action

✅ Checking match progress

---

# Mobile Support

The Live Centre is fully responsive and supports:

* Desktop
* Tablet
* Mobile Devices

Live information automatically adapts to different screen sizes.

---

# Troubleshooting

## No Live Matches Showing

This may occur when:

* No matches are currently being played
* Data has not yet refreshed
* The tournament has not started

---

## Scores Not Updating

Refresh your browser:

```text
Ctrl + F5
```

or reload the integration.

---

## Live Centre Appears Empty

Verify:

```text
Settings → Devices & Services
```

shows the World Cup 2026 integration loaded correctly.

---

## Data Appears Delayed

The integration depends on upstream data sources and update intervals.

During live matches, updates occur more frequently.

---

# Summary

The Live Centre is your real-time World Cup match tracker, providing live scores, match status and current tournament action directly within Home Assistant.

Perfect for following FIFA World Cup 2026 as it happens. ⚽🏆
