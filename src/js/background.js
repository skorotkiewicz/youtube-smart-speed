// Shared constants (no duplication with options.js)
const DEFAULT_SETTINGS = {
	smartSpeedEnabled: true,
	autoTrain: true,
	showHud: true,
	minSpeed: 2,
	maxSpeed: 3.25,
	manualSpeed: 1.0,
};

// Import services configuration
// Note: In manifest v2, we can't directly import, so we'll define services here
const VIDEO_SERVICES = {
	youtube: {
		name: "YouTube",
		domains: ["youtube.com", "www.youtube.com", "m.youtube.com"],
		enabled: true,
	},
	vimeo: {
		name: "Vimeo",
		domains: ["vimeo.com", "www.vimeo.com", "player.vimeo.com"],
		enabled: true,
	},
	dailymotion: {
		name: "Dailymotion",
		domains: ["dailymotion.com", "www.dailymotion.com"],
		enabled: true,
	},
	twitch: {
		name: "Twitch",
		domains: ["twitch.tv", "www.twitch.tv"],
		enabled: true,
	},
	netflix: {
		name: "Netflix",
		domains: ["netflix.com", "www.netflix.com"],
		enabled: true,
	},
	disneyplus: {
		name: "Disney+",
		domains: ["disneyplus.com", "www.disneyplus.com"],
		enabled: true,
	},
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.action === "toggleSmartSpeed" || msg.action === "getStatus") {
		if (sender.tab) {
			chrome.tabs.sendMessage(sender.tab.id, msg, sendResponse);
			return true; // Keep message channel open for async response
		} else {
			sendResponse({ status: "error", message: "No active tab" });
		}
	}

	// Handle services request from popup
	if (msg.action === "getServices") {
		sendResponse({ services: VIDEO_SERVICES });
		return false;
	}

	// Handle defaults request from options page
	if (msg.action === "getDefaults") {
		sendResponse({ defaults: DEFAULT_SETTINGS });
		return false;
	}
});

// Initialize settings with defaults on extension install
chrome.runtime.onInstalled.addListener(() => {
	// Only set defaults if settings don't exist
	chrome.storage.sync.get(Object.keys(DEFAULT_SETTINGS), (result) => {
		const hasExistingSettings = Object.keys(result).length > 0;

		if (!hasExistingSettings) {
			chrome.storage.sync.set(DEFAULT_SETTINGS);
		}
	});
});
