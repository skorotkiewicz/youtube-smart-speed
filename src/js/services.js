// Configuration for different video services
const VIDEO_SERVICES = {
	youtube: {
		name: "YouTube",
		domains: ["youtube.com", "www.youtube.com", "m.youtube.com"],
		videoSelector: "video",
		containerSelector: ".html5-video-player",
		playerContainer: ".html5-video-player",
		enabled: true,
	},

	vimeo: {
		name: "Vimeo",
		domains: ["vimeo.com", "www.vimeo.com", "player.vimeo.com"],
		videoSelector: "video",
		containerSelector: ".player",
		playerContainer: ".player",
		enabled: true,
	},

	dailymotion: {
		name: "Dailymotion",
		domains: ["dailymotion.com", "www.dailymotion.com"],
		videoSelector: "video",
		containerSelector: ".player-container",
		playerContainer: ".player-container",
		enabled: true,
	},

	twitch: {
		name: "Twitch",
		domains: ["twitch.tv", "www.twitch.tv"],
		videoSelector: "video",
		containerSelector: ".player-video",
		playerContainer: ".player-video",
		enabled: true,
	},

	netflix: {
		name: "Netflix",
		domains: ["netflix.com", "www.netflix.com"],
		videoSelector: "video",
		containerSelector: ".player-container",
		playerContainer: ".player-container",
		enabled: true,
	},

	// disneyplus: {
	// 	name: "Disney+",
	// 	domains: ["disneyplus.com", "www.disneyplus.com"],
	// 	videoSelector: "#hivePlayer",
	// 	containerSelector: "#hivePlayer",
	// 	playerContainer: "#hivePlayer",
	// 	enabled: false,
	// },

	disneyplus: {
		name: "Disney+",
		domains: ["disneyplus.com", "www.disneyplus.com"],
		videoSelector: "video",
		containerSelector: ".player-container",
		playerContainer: ".player-container",
		enabled: false,
	},

	// Template for adding new services
	template: {
		name: "New Service",
		domains: ["example.com", "www.example.com"],
		videoSelector: "video",
		containerSelector: ".video-container",
		playerContainer: ".video-container",
		enabled: false,
	},
};

// Get current service based on domain
function getCurrentService() {
	const hostname = window.location.hostname;

	for (const [key, service] of Object.entries(VIDEO_SERVICES)) {
		if (service.enabled && service.domains.includes(hostname)) {
			return { ...service, key };
		}
	}

	return null;
}

// Check if current page is supported
function isSupportedPage() {
	return getCurrentService() !== null;
}

// Get all enabled services
function getEnabledServices() {
	return Object.entries(VIDEO_SERVICES)
		.filter(([key, service]) => service.enabled && key !== "template")
		.map(([key, service]) => ({ ...service, key }));
}

// Add new service dynamically
function addService(key, config) {
	if (VIDEO_SERVICES[key]) {
		console.warn(`Service ${key} already exists`);
		return false;
	}

	VIDEO_SERVICES[key] = {
		...VIDEO_SERVICES.template,
		...config,
		enabled: true,
	};

	console.log(`Added new service: ${key}`);
	return true;
}

// Remove service
function removeService(key) {
	if (VIDEO_SERVICES[key] && key !== "template") {
		delete VIDEO_SERVICES[key];
		console.log(`Removed service: ${key}`);
		return true;
	}
	return false;
}

// Enable/disable service
function toggleService(key, enabled) {
	if (VIDEO_SERVICES[key] && key !== "template") {
		VIDEO_SERVICES[key].enabled = enabled;
		console.log(`${enabled ? "Enabled" : "Disabled"} service: ${key}`);
		return true;
	}
	return false;
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
	module.exports = {
		VIDEO_SERVICES,
		getCurrentService,
		isSupportedPage,
		getEnabledServices,
		addService,
		removeService,
		toggleService,
	};
}
