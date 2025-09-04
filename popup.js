let currentState = null;

function updateUI(enabled, settings) {
	const statusElement = document.getElementById("status");
	const statusText = document.getElementById("statusText");
	const speedInfo = document.getElementById("speedInfo");
	const toggleButton = document.getElementById("toggle");

	if (enabled) {
		statusElement.className = "status enabled";
		statusText.textContent = "✅ Smart Speed WŁĄCZONY";
		toggleButton.textContent = "Wyłącz Smart Speed";
		toggleButton.className = "toggle-btn enabled";
	} else {
		statusElement.className = "status disabled";
		statusText.textContent = "❌ Smart Speed WYŁĄCZONY";
		toggleButton.textContent = "Włącz Smart Speed";
		toggleButton.className = "toggle-btn";
	}

	if (settings) {
		speedInfo.textContent = `Prędkość: ${settings.minSpeed}x - ${settings.maxSpeed}x | Auto-trening: ${settings.autoTrain ? 'ON' : 'OFF'} | HUD: ${settings.showHud ? 'ON' : 'OFF'}`;
	}
	
	currentState = enabled;
}

function checkStatus() {
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		const tab = tabs[0];
		if (tab && tab.url.includes('youtube.com')) {
			chrome.tabs.sendMessage(tab.id, { action: "getStatus" }, (response) => {
				if (response) {
					updateUI(response.enabled, response.settings);
				} else {
					document.getElementById("statusText").textContent = "Nie można połączyć z kartą YouTube";
					document.getElementById("speedInfo").textContent = "Odśwież stronę YouTube";
				}
			});
		} else {
			document.getElementById("statusText").textContent = "Otwórz kartę YouTube";
			document.getElementById("speedInfo").textContent = "Plugin działa tylko na YouTube";
		}
	});
}

document.addEventListener("DOMContentLoaded", () => {
	checkStatus();
});

document.getElementById("toggle").addEventListener("click", () => {
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		const tab = tabs[0];
		if (tab && tab.url.includes('youtube.com')) {
			chrome.tabs.sendMessage(tab.id, { action: "toggleSmartSpeed" }, (response) => {
				if (response) {
					updateUI(response.enabled, currentState ? {} : {});
					setTimeout(checkStatus, 100);
				}
			});
		}
	});
});

document.getElementById("options").addEventListener("click", () => {
	chrome.runtime.openOptionsPage();
});
