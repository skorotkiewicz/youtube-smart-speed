# 📦 YouTube Smart Speed Installation Guide

## 🔧 Firefox Installation

### Step 1: File Preparation
1. Download all files from the project folder
2. Make sure you have the following files:
   - `manifest.json`
   - `content.js`
   - `brain.js` 
   - `background.js`
   - `popup.html` and `popup.js`
   - `options.html` and `options.js`
   - `overlay.css`

### Step 2: Loading into Firefox
1. Open Firefox
2. Type in address bar: `about:debugging#/runtime/this-firefox`
3. Click **"Load Temporary Add-on"**
4. Select the `manifest.json` file from the plugin folder
5. Plugin will be loaded and icon will appear in toolbar

### Step 3: First Run
1. Go to YouTube.com
2. Click Smart Speed icon in toolbar
3. Check if status shows "Smart Speed ENABLED"
4. Play any video - plugin will start working automatically

## ⚙️ Configuration

### Basic Settings
1. Right-click on plugin icon
2. Select **"Options"** or click "Open Settings" in popup
3. Adjust parameters to your preferences:
   - **Minimum/Maximum speed** (default 2x-3.25x)
   - **Smart Speed** - main feature toggle
   - **Auto-training** - whether AI should learn continuously
   - **HUD** - whether to show information on screen

### Advanced Options
- **Model reset** - removes trained AI data and starts fresh
- **Speed range** - full control from 0.25x to 4x
- **Settings sync** - preserves preferences between sessions

## 🎯 First Use

1. **Open YouTube** - plugin works only on youtube.com
2. **Play video** - preferably with dialogue (lectures, interviews)
3. **Check HUD** - should show current speed
4. **Observe behavior** - speeds up during silence, slows during speech

## ❓ Troubleshooting

### Plugin Not Working
- Check if you're on youtube.com
- Refresh YouTube page
- Check console (F12) for errors

### No HUD on Screen  
- Check settings - make sure HUD is enabled
- Some fullscreen modes may hide HUD

### Plugin Not Responding to Audio
- Check if video has sound
- Make sure browser has permission for audio access
- Chrome may require user interaction before audio access

### Settings Not Saving
- Check plugin permissions for storage access
- Try disabling and re-enabling plugin

## 🔄 Updates

To update the plugin:
1. Remove old plugin from `about:debugging`
2. Load new version using same steps
3. Settings should be preserved

## 🗑️ Uninstallation

1. Go to `about:debugging#/runtime/this-firefox`
2. Find "YouTube Smart Speed" 
3. Click **"Remove"**
4. Plugin will be completely removed along with data

## 💡 Usage Tips

- **Works best** with spoken content (lectures, podcasts)
- **Auto-training** improves accuracy over time
- **Experiment** with speed ranges for different content types
- **Use HUD** to monitor performance
- **Reset model** when AI doesn't behave as expected

---
**Need help? Check logs in developer console (F12)**