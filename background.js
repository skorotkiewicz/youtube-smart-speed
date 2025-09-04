console.log("SmartSpeed background running...");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.action === "toggleSmartSpeed") {
		if (sender.tab) {
			chrome.tabs.sendMessage(sender.tab.id, { action: "toggleSmartSpeed" }, sendResponse);
		} else {
			sendResponse({ status: "error", message: "No active tab" });
		}
		return true; // Keep message channel open for async response
	} else if (msg.action === "getStatus") {
		if (sender.tab) {
			chrome.tabs.sendMessage(sender.tab.id, { action: "getStatus" }, sendResponse);
		} else {
			sendResponse({ status: "error", message: "No active tab" });
		}
		return true; // Keep message channel open for async response
	}
});

// Initialize settings with defaults on extension install
chrome.runtime.onInstalled.addListener(() => {
	const defaultSettings = {
		smartSpeedEnabled: true,
		autoTrain: true,
		showHud: true,
		minSpeed: 2,
		maxSpeed: 3.25
	};
	
	chrome.storage.sync.set(defaultSettings, () => {
		console.log("SmartSpeed: Default settings initialized");
	});
});
