# 🖼️ Adding a Background Image to a Home Assistant Dashboard

This guide explains how to add a custom background image to your Home Assistant dashboard.

---

# Method 1 - Using the WWW Folder (Recommended)

## Step 1 - Upload Your Image

Using File Editor, Samba or Studio Code Server, upload your image to:

```text
/config/www/
```

Example:

```text
/config/www/worldcup.png
```

---

## Step 2 - Test the Image

Open the image in your browser:

```text
http://YOUR_HOME_ASSISTANT_IP:8123/local/worldcup.png
```

Example:

```text
http://192.168.1.100:8123/local/worldcup.png
```

If the image loads, Home Assistant can access it correctly.

---

## Step 3 - Install Card Mod

If not already installed:

1. Open HACS
2. Search for:

```text
card-mod
```

3. Install
4. Restart Home Assistant

---

## Step 4 - Add Background Image

Open your dashboard.

Click:

```text
⋮ → Edit Dashboard
```

Then:

```text
Raw Configuration Editor
```

Add:

```yaml
views:
  - title: World Cup 2026
    path: world-cup
    theme: Backend-selected
    cards: []
    card_mod:
      style: |
        :host {
          --lovelace-background: url('/local/worldcup.png') center center fixed;
          background-size: cover;
        }
```

---

# Method 2 - Dashboard Background (Recommended for Full Screen Images)

Navigate to:

```text
Settings → Dashboards
```

Open your dashboard.

Click:

```text
Edit Dashboard
```

Select:

```text
Change Background
```

Enter:

```text
/local/worldcup.png
```

Save.

This method uses Home Assistant's built-in dashboard background support.

---

# Method 3 - Picture Card

To display an image as a card:

```yaml
type: picture
image: /local/worldcup.png
```

---

# Method 4 - Full Width Banner Image

Example:

```yaml
type: picture
image: /local/worldcup.png
tap_action:
  action: none
hold_action:
  action: none
```

Useful for:

* Tournament Banners
* Team Logos
* Sponsor Images
* Dashboard Headers

---

# Recommended Image Sizes

### Desktop Background

```text
1920 x 1080
```

### Mobile Background

```text
1080 x 1920
```

### Header Banner

```text
1920 x 500
```

### Logo

```text
512 x 512
```

---

# Troubleshooting

### Image Not Loading

Check:

```text
/config/www/worldcup.png
```

Exists.

Then test:

```text
http://YOUR_HOME_ASSISTANT_IP:8123/local/worldcup.png
```

---

### Image Appears Blurry

Use:

```text
1920 x 1080
```

or higher resolution.

---

### Background Not Updating

Press:

```text
Ctrl + F5
```

or clear browser cache.

---

# Example

Image location:

```text
/config/www/worldcup.png
```

Dashboard image URL:

```text
/local/worldcup.png
```

This is the most common and recommended method for adding custom images to Home Assistant dashboards.
