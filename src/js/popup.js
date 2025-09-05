// Firefox compatibility: Inline constants
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

let servicesConfig = null;

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
}

function loadServicesConfig(callback) {
	// Get services from background script (single source of truth)
	chrome.runtime.sendMessage({ action: "getServices" }, (response) => {
		servicesConfig = response?.services || VIDEO_SERVICES;
		if (callback) callback();
	});
}

function isSupportedUrl(url) {
	try {
		const hostname = new URL(url).hostname;

		for (const service of Object.values(servicesConfig)) {
			if (
				service.enabled &&
				service.domains.some((domain) => hostname.includes(domain))
			) {
				return true;
			}
		}
		return false;
	} catch (e) {
		return false;
	}
}

function getServiceName(url) {
	try {
		const hostname = new URL(url).hostname;

		for (const service of Object.values(servicesConfig)) {
			if (
				service.enabled &&
				service.domains.some((domain) => hostname.includes(domain))
			) {
				return service.name;
			}
		}
		return "Video";
	} catch (e) {
		return "Video";
	}
}

function getSupportedServicesList() {
	return Object.values(servicesConfig)
		.filter((service) => service.enabled)
		.map((service) => service.name)
		.join(", ");
}

function checkStatus() {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const tab = tabs[0];
		if (tab && isSupportedUrl(tab.url)) {
			const serviceName = getServiceName(tab.url);
			chrome.tabs.sendMessage(tab.id, { action: "getStatus" }, (response) => {
				if (response) {
					updateUI(response.enabled, response.settings);
				} else {
					document.getElementById("statusText").textContent =
						`Cannot connect to ${serviceName} tab`;
					document.getElementById("speedInfo").textContent =
						`Refresh ${serviceName} page`;
				}
			});
		} else {
			document.getElementById("statusText").textContent =
				"Open supported video site";
			document.getElementById("speedInfo").textContent =
				`Plugin works on ${getSupportedServicesList()}`;
		}
	});
}

document.addEventListener("DOMContentLoaded", () => {
	// Load services config first, then check status
	loadServicesConfig(() => {
		checkStatus();
	});
});

document.getElementById("toggle").addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const tab = tabs[0];
		if (tab && isSupportedUrl(tab.url)) {
			chrome.tabs.sendMessage(
				tab.id,
				{ action: "toggleSmartSpeed" },
				(response) => {
					if (response) {
						updateUI(response.enabled);
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
