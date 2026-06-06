# 🛒 Installing HACS (Home Assistant Community Store)

HACS allows you to install custom integrations, dashboards, themes and plugins directly into Home Assistant.

---

## Step 1 - Enable Advanced Mode

Navigate to:

```text
Profile
```

Enable:

```text
Advanced Mode
```

---

## Step 2 - Install HACS

Open:

```text
Settings → Add-ons
```

Install:

```text
Terminal & SSH
```

or

```text
Studio Code Server
```

---

## Step 3 - Open Terminal

Run:

```bash
wget -O - https://get.hacs.xyz | bash -
```

Wait for the installation to complete.

---

## Step 4 - Restart Home Assistant

Navigate to:

```text
Settings → System
```

Click:

```text
Restart
```

---

## Step 5 - Add HACS Integration

After Home Assistant has restarted:

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
HACS
```

Select:

```text
Home Assistant Community Store
```

---

## Step 6 - Authorise GitHub

Follow the on-screen instructions.

You will be asked to:

1. Log into GitHub
2. Enter a verification code
3. Authorise HACS

---

## Step 7 - Complete Setup

Once authorised:

Navigate to:

```text
HACS
```

from the Home Assistant sidebar.

You now have access to:

✅ Integrations

✅ Frontend Cards

✅ Themes

✅ Dashboard Plugins

✅ Templates

---

## Installing The World Cup 2026 Integration

Once HACS is installed:

Navigate to:

```text
HACS → Integrations
```

Click:

```text
⋮ → Custom Repositories
```

Add:

```text
https://github.com/Adya84/ha-world-cup-2026
```

Category:

```text
Integration
```

Click:

```text
Add
```

Search for:

```text
World Cup 2026
```

Install the integration and restart Home Assistant.

---

## Troubleshooting

### HACS Not Showing

Restart Home Assistant and refresh your browser.

---

### Cannot Find HACS Integration

Ensure Home Assistant has fully restarted after installation.

---

### GitHub Authentication Fails

Try logging out and back into GitHub, then repeat the authorisation process.

---

HACS is now installed and ready to use. 🎉
