# ⏱️ Configuring Update Intervals

The World Cup 2026 integration automatically updates tournament data throughout the competition.

Version 3.2 includes smart polling that increases update frequency during live matches and reduces updates when no matches are being played.

---

# Default Update Behaviour

The integration uses two update intervals:

### Normal Mode

When no matches are live:

```text
15 Minutes
```

### Live Match Mode

When matches are in progress:

```text
1 Minute
```

This helps reduce unnecessary API requests while keeping live match information current.

---

# Automatic Live Match Detection

The integration automatically detects when a match enters a live state.

Examples include:

```text
IN_PLAY
LIVE
1H
2H
HT
PAUSED
```

When a live match is detected:

✅ Fixtures update more frequently

✅ Scores refresh automatically

✅ Live match information updates faster

---

# No Configuration Required

For most users, no manual configuration is required.

The integration automatically manages update intervals based on tournament activity.

---

# Recommended Settings

For normal use:

```text
Use Default Settings
```

This provides the best balance between:

* API Usage
* Performance
* Live Data Accuracy

---

# Monitoring Updates

Navigate to:

```text
Settings → Devices & Services
```

Open:

```text
World Cup 2026
```

You can verify that updates are occurring successfully by checking:

```text
Last Successful Update
```

---

# Troubleshooting

### Data Appears Out Of Date

Wait for the next scheduled update.

If necessary:

```text
Settings → Devices & Services
```

Select:

```text
World Cup 2026
```

Then:

```text
Reload
```

---

### Live Scores Not Updating

Verify:

* Internet connectivity
* API availability
* Integration is loaded correctly

Then reload the integration.

---

### Force A Refresh

You can manually refresh the integration by:

```text
Settings → Devices & Services
```

Selecting:

```text
World Cup 2026
```

Then clicking:

```text
Reload
```

---

# Important Notes

Frequent updates may be limited by the upstream data provider.

The integration automatically balances update speed with API usage to provide the best possible experience during the tournament.

---

# Summary

Version 3.2 automatically adjusts update intervals depending on tournament activity.

* 15 Minutes During Normal Operation
* 1 Minute During Live Matches

No manual configuration is required for most users. ⚽🏆
