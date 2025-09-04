console.log("SmartSpeed background running...");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.action === "toggleSmartSpeed") {
		chrome.tabs.sendMessage(sender.tab.id, { action: "toggleSmartSpeed" });
		sendResponse({ status: "ok" });
	}
});
