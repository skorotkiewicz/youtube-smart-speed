# YouTube Smart Speed - AI Playback Control

Intelligent Firefox plugin that automatically adjusts YouTube playback speed based on real-time audio analysis using artificial intelligence.

## 🚀 Features

### ✨ Main Capabilities
- **Intelligent speed control** - AI analyzes audio in real-time
- **Adaptive acceleration** - automatically speeds up during silence
- **Controlled deceleration** - slows down during detected speech
- **Machine learning** - neural network learns from your usage patterns
- **Full configuration** - all parameters can be customized to your preferences

### ⚙️ User Settings
- **Speed range** - set your own range from 0.25x to 4x (default 2x-3.25x)
- **Smart Speed ON/OFF** - easily enable/disable functionality
- **Auto-training** - enable/disable neural network machine learning
- **On-screen HUD** - show/hide current speed information
- **Model reset** - start training from scratch

## 📱 Interface

### Popup (click plugin icon)
- Quick Smart Speed enable/disable toggle
- Current settings preview
- Direct access to options

### Options Page
- Detailed configuration of all features
- Intuitive sliders for speed settings
- Advanced AI training options

## 🔧 Installation

1. Download all files from the repository
2. Open Firefox
3. Go to `about:debugging#/runtime/this-firefox`
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the plugin folder

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

- `manifest.json` - extension configuration
- `content.js` - main logic running on YouTube page  
- `brain.js` - machine learning library
- `background.js` - background script for communication
- `popup.html/js` - popup interface
- `options.html/js` - settings page
- `overlay.css` - styles for on-screen HUD

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

### New Features:
- Full user configuration
- Better popup interface with state preview
- Advanced training options
- Model reset capability
- Improved settings page with visual interface

### Improvements:
- More stable operation
- Better memory management
- Performance optimization
- Increased compatibility

## ⚠️ Requirements

- Firefox 60+
- Active YouTube connection
- JavaScript enabled

## 📝 License

Open-source project - you can freely modify and adapt to your needs.

---
**Developed with ❤️ for the YouTube community**