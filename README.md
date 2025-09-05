# SmartSpeed - Multi-Service AI Playback Control

Intelligent Firefox extension that automatically adjusts video playback speed on multiple platforms (YouTube, Vimeo, Dailymotion, Twitch, Netflix, Disney+, and more) based on real-time audio analysis using artificial intelligence.

## 🚀 Features

### ✨ Main Capabilities
- **Intelligent speed control** - AI analyzes audio in real-time
- **Adaptive acceleration** - automatically speeds up during silence
- **Controlled deceleration** - slows down during detected speech
- **Machine learning** - neural network learns from your usage patterns
- **Manual speed control** - set custom playback speed when AI is disabled
- **Full configuration** - all parameters can be customized to your preferences

### ⚙️ User Settings
- **Speed range** - set your own range from 0.25x to 4x (default 2x-3.25x)
- **Manual speed** - custom speed for manual mode (default 1.0x)
- **Smart Speed ON/OFF** - easily enable/disable AI functionality
- **Auto-training** - enable/disable neural network machine learning
- **On-screen HUD** - show/hide current speed information with hover
- **Model reset** - start training from scratch

## 📱 Interface

### Popup (click plugin icon)
- Quick Smart Speed enable/disable toggle
- Current settings preview
- Service detection (YouTube, Vimeo, Dailymotion, Twitch, Netflix, Disney+)
- Direct access to options

### Options Page
- Detailed configuration of all features
- Intuitive sliders for speed settings
- Advanced AI training options

## 🔧 Installation

### Firefox:
1. Download all files from the repository
2. Open Firefox
3. Go to `about:debugging#/runtime/this-firefox`
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the plugin folder

<!-- ### Chrome :
1. Download all files from the repository
2. Open Chrome
3. Go to `chrome://extensions/`
4. Enable "Developer mode" (top right)
5. Click "Load unpacked"
6. Select the project folder containing `manifest.json` -->

## 🎯 How It Works

The plugin utilizes:
- **Web Audio API** - for real-time audio analysis
- **Brain.js** - machine learning library
- **Chrome Storage API** - for storing settings and trained model

### Process:
1. Plugin analyzes audio signal from YouTube video
2. Calculates RMS (Root Mean Square) for volume detection
3. Neural network classifies audio as "silence" or "speech"
4. Based on results, adjusts playback speed within specified range
5. Model learns continuously (if auto-training enabled)

## 🛠️ File Structure

```
/smart-speed/
├── manifest.json          # Extension configuration
├── README.md             # This documentation
├── src/                  # Source code
│   ├── js/              # JavaScript files
│   │   ├── background.js    # Background communication
│   │   ├── brain.js        # Machine learning library
│   │   ├── content.js      # Main video page logic
│   │   ├── options.js      # Settings page logic
│   │   ├── popup.js        # Popup interface logic
│   │   └── services.js     # Multi-service configuration
│   ├── css/             # Stylesheets
│   │   └── overlay.css     # HUD and overlay styles
│   └── html/            # HTML templates
│       ├── options.html    # Settings page
│       └── popup.html      # Extension popup
├── icons/               # Extension icons
│   ├── icon16.svg
│   ├── icon48.svg
│   └── icon128.svg
└── docs/                # Documentation
    ├── INSTALLATION.md
    ├── RELEASE_CHECKLIST.md
    └── SERVICES.md       # Guide for adding new video services
```

## 🎨 Customization

All parameters can be customized in settings:
- **Minimum speed**: how slow to play during speech
- **Maximum speed**: how fast to play during silence  
- **Volume threshold**: sensitivity for silence/speech detection
- **Analysis frequency**: how often to analyze audio

## 🔍 Debugging

Open developer tools (F12) on YouTube to see:
- Audio analysis logs
- Neural network state
- Model saving/loading
- Error messages

## 📈 Version 2.0.0

### ✨ New Features:
- **Manual speed control** - custom playback speed when AI is disabled
- **HUD hover functionality** - speed display appears on video hover
- **Organized project structure** - professional directory layout
- **Full user configuration** - all parameters customizable
- **Better popup interface** - state preview and quick access
- **Advanced training options** - enable/disable AI learning
- **Model reset capability** - start fresh training

### 🚀 Improvements:
- **Performance optimization** - reduced memory usage and faster loading
- **Code cleanup** - removed redundant code and debug artifacts
- **Better error handling** - more robust operation
- **Memory management** - proper cleanup and resource reuse
- **Cross-browser compatibility** - works on both Chrome and Firefox
- **Stable operation** - fixed timing issues and race conditions

## ⚠️ Requirements

- Firefox 60+
- Active YouTube connection
- JavaScript enabled

## 📝 License

Open-source project - you can freely modify and adapt to your needs.

---
**Developed with ❤️ for the YouTube community**
