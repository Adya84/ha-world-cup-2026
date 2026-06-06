# 🌍 Multi-Language Dashboard Setup

Version 3.2 includes built-in multi-language dashboard support, allowing dashboard labels, headings and navigation to be displayed in multiple languages.

---

# Supported Languages

The dashboard currently supports:

* English 🇬🇧
* French 🇫🇷
* German 🇩🇪
* Spanish 🇪🇸
* Italian 🇮🇹
* Dutch 🇳🇱
* Portuguese 🇵🇹
* Arabic 🇸🇦
* Japanese 🇯🇵
* Korean 🇰🇷
* Swedish 🇸🇪
* Norwegian 🇳🇴

Additional languages may be added in future updates.

---

# Creating The Language Helper

Navigate to:

```text
Settings → Devices & Services → Helpers
```

Click:

```text
Create Helper
```

Select:

```text
Dropdown
```

---

# Configure The Helper

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

Click:

```text
Create
```

---

# Selecting A Language

Open the World Cup dashboard.

Locate the language selector.

Choose your preferred language from the dropdown menu.

The dashboard will automatically update supported labels and navigation items.

---

# World Cup Application Support

The dedicated World Cup Application also supports language selection.

Language changes apply to:

* Navigation
* Overview
* Fixtures
* Groups
* Knockout Centre
* Statistics Hub
* Tournament Records
* Stadium Information

---

# Changing Languages

You can switch languages at any time.

Simply select a new language from:

```text
World Cup Dashboard Language
```

The dashboard will update automatically.

---

# Adding New Languages

Community translations are welcome.

If you would like to contribute a new language:

1. Fork the repository
2. Create translation files
3. Submit a Pull Request

---

# Troubleshooting

### Language Selector Missing

Ensure the helper has been created correctly.

Check:

```text
input_select.world_cup_dashboard_language
```

exists within Home Assistant.

---

### Dashboard Not Changing Language

Refresh your browser:

```text
Ctrl + F5
```

and allow the dashboard to reload.

---

### Some Text Still Appears In English

Not all dashboard elements may currently be translated.

Additional translations will be added in future updates.

---

# Setup Complete

Your World Cup 2026 dashboard is now ready to display information in your preferred language. 🌍⚽🏆
