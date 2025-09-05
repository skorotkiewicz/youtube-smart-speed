let currentState = null;

function updateUI(enabled, settings) {
	const statusElement = document.getElementById("status");
	const statusText = document.getElementById("statusText");
	const speedInfo = document.getElementById("speedInfo");
	const toggleButton = document.getElementById("toggle");

	if (enabled) {
		statusElement.className = "status enabled";
		statusText.textContent = "✅ Smart Speed ENABLED";
		toggleButton.textContent = "Disable Smart Speed";
		toggleButton.className = "toggle-btn enabled";
	} else {
		statusElement.className = "status disabled";
		statusText.textContent = "❌ Smart Speed DISABLED";
		toggleButton.textContent = "Enable Smart Speed";
		toggleButton.className = "toggle-btn";
	}

	if (settings) {
		speedInfo.textContent = `Speed: ${settings.minSpeed}x - ${settings.maxSpeed}x | Auto-training: ${settings.autoTrain ? "ON" : "OFF"} | HUD: ${settings.showHud ? "ON" : "OFF"}`;
	}

	currentState = enabled;
}

function checkStatus() {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const tab = tabs[0];
		if (tab && tab.url.includes("youtube.com")) {
			chrome.tabs.sendMessage(tab.id, { action: "getStatus" }, (response) => {
				if (response) {
					updateUI(response.enabled, response.settings);
				} else {
					document.getElementById("statusText").textContent =
						"Cannot connect to YouTube tab";
					document.getElementById("speedInfo").textContent =
						"Refresh YouTube page";
				}
			});
		} else {
			document.getElementById("statusText").textContent = "Open YouTube tab";
			document.getElementById("speedInfo").textContent =
				"Plugin works only on YouTube";
		}
	});
}

document.addEventListener("DOMContentLoaded", () => {
	checkStatus();
});

document.getElementById("toggle").addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const tab = tabs[0];
		if (tab && tab.url.includes("youtube.com")) {
			chrome.tabs.sendMessage(
				tab.id,
				{ action: "toggleSmartSpeed" },
				(response) => {
					if (response) {
						updateUI(response.enabled, currentState ? {} : {});
						setTimeout(checkStatus, 100);
					}
				},
			);
		}
	});
});

document.getElementById("options").addEventListener("click", () => {
	chrome.runtime.openOptionsPage();
});
