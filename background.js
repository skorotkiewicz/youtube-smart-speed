chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.action === "toggleSmartSpeed" || msg.action === "getStatus") {
		if (sender.tab) {
			chrome.tabs.sendMessage(sender.tab.id, msg, sendResponse);
			return true; // Keep message channel open for async response
		} else {
			sendResponse({ status: "error", message: "No active tab" });
		}
	}
});

// Initialize settings with defaults on extension install
chrome.runtime.onInstalled.addListener(() => {
	const defaultSettings = {
		smartSpeedEnabled: true,
		autoTrain: true,
		showHud: true,
		minSpeed: 2,
		maxSpeed: 3.25,
		manualSpeed: 1.0,
	};

	// Only set defaults if settings don't exist
	chrome.storage.sync.get(Object.keys(defaultSettings), (result) => {
		const hasExistingSettings = Object.keys(result).length > 0;

		if (!hasExistingSettings) {
			chrome.storage.sync.set(defaultSettings);
		}
	});
});
