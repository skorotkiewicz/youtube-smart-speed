let hudElement = null;
let currentVideo = null;
let audioContext = null;
let analyser = null;
let source = null;

const settings = {
	smartSpeedEnabled: true,
	autoTrain: true,
	showHud: true,
	minSpeed: 2,
	maxSpeed: 3.25,
	manualSpeed: 1.0,
};

function loadSettings() {
	chrome.storage.sync.get(Object.keys(settings), (cfg) => {
		Object.assign(settings, cfg);

		if (settings.showHud) {
			initHUD();
		} else if (hudElement) {
			hudElement.remove();
			hudElement = null;
		}

		// Now that settings are loaded, set up video observer
		setupVideoObserver();
	});
}

loadSettings();

// HUD initialization
function initHUD() {
	if (hudElement) {
		hudElement.remove();
		hudElement = null;
	}

	hudElement = document.createElement("div");
	hudElement.id = "smartspeed-hud";

	if (settings.smartSpeedEnabled) {
		hudElement.textContent = "Smart Speed: 1x";
	} else {
		// Manual mode with controls
		const leftBtn = document.createElement("button");
		leftBtn.className = "speed-control-btn";
		leftBtn.textContent = "◀";
		leftBtn.onclick = () => changeManualSpeed(-0.25);

		const speedDisplay = document.createElement("span");
		speedDisplay.textContent = `Manual: ${settings.manualSpeed}x`;

		const rightBtn = document.createElement("button");
		rightBtn.className = "speed-control-btn";
		rightBtn.textContent = "▶";
		rightBtn.onclick = () => changeManualSpeed(0.25);

		hudElement.appendChild(leftBtn);
		hudElement.appendChild(speedDisplay);
		hudElement.appendChild(rightBtn);
	}

	const video = document.querySelector("video");
	const container = video ? video.parentElement : null;

	if (container) {
		container.appendChild(hudElement);

		// Hide HUD by default
		hudElement.style.display = "none";

		// Show/hide on hover
		container.addEventListener("mouseenter", () => {
			if (hudElement) hudElement.style.display = "flex";
		});

		container.addEventListener("mouseleave", () => {
			if (hudElement) hudElement.style.display = "none";
		});
	} else {
		document.body.appendChild(hudElement);
	}
}

function changeManualSpeed(delta) {
	settings.manualSpeed = Math.max(
		0.25,
		Math.min(4.0, settings.manualSpeed + delta),
	);
	settings.manualSpeed = Math.round(settings.manualSpeed * 100) / 100; // Round to 2 decimals

	// Update video speed immediately
	const video = document.querySelector("video");
	if (video && !settings.smartSpeedEnabled) {
		video.playbackRate = settings.manualSpeed;
	}

	// Update HUD display
	if (hudElement && !settings.smartSpeedEnabled) {
		const speedDisplay = hudElement.querySelector("span");
		if (speedDisplay) {
			speedDisplay.textContent = `Manual: ${settings.manualSpeed}x`;
		}
	}

	// Save to storage
	chrome.storage.sync.set({ manualSpeed: settings.manualSpeed });
}

// simple model
const net = new brain.NeuralNetwork({ hiddenLayers: [4] });

// load trained model if exists
chrome.storage.local.get("smartSpeedModel", (res) => {
	if (res.smartSpeedModel) {
		net.fromJSON(res.smartSpeedModel);
	} else {
		// initial training
		net.train([
			{ input: { volume: 0.0 }, output: { silence: 1 } },
			{ input: { volume: 0.9 }, output: { speech: 1 } },
		]);
	}
});

function analyzeAndSetSpeed(video) {
	if (!settings.smartSpeedEnabled) return;

	// Reuse AudioContext if available
	if (!audioContext) {
		audioContext = new AudioContext();
		analyser = audioContext.createAnalyser();
		source = audioContext.createMediaElementSource(video);
		source.connect(analyser);
		analyser.connect(audioContext.destination);
	}

	const data = new Uint8Array(analyser.fftSize);

	function tick() {
		if (!settings.smartSpeedEnabled) return;

		analyser.getByteTimeDomainData(data);
		let rms = 0;
		for (let i = 0; i < data.length; i++) {
			rms += (data[i] - 128) ** 2;
		}
		rms = Math.sqrt(rms / data.length) / 128;

		// wyjście sieci
		const result = net.run({ volume: rms });

		// confidence: silence → faster, speech → slower
		const confidence =
			result.silence / ((result.silence || 0) + (result.speech || 0));
		const speed =
			settings.minSpeed + confidence * (settings.maxSpeed - settings.minSpeed);
		video.playbackRate = parseFloat(speed.toFixed(2));

		if (hudElement && settings.showHud) {
			hudElement.textContent = `Smart Speed: ${speed.toFixed(2)}x`;
		}

		// Auto-training
		if (settings.autoTrain) {
			net.train(
				[
					{
						input: { volume: rms },
						output: {
							silence: rms < 0.05 ? 1 : 0,
							speech: rms >= 0.05 ? 1 : 0,
						},
					},
				],
				{ iterations: 1 },
			);
			chrome.storage.local.set({ smartSpeedModel: net.toJSON() });
		}

		requestAnimationFrame(tick);
	}

	tick();
}

function startSmartSpeed(video) {
	// upewniamy się, że model jest gotowy przed startem
	chrome.storage.local.get("smartSpeedModel", (res) => {
		if (res.smartSpeedModel) net.fromJSON(res.smartSpeedModel);
		analyzeAndSetSpeed(video);
	});
}

function setupVideoObserver() {
	const video = document.querySelector("video");
	if (video) {
		currentVideo = video;
		if (settings.smartSpeedEnabled) {
			startSmartSpeed(video);
		} else {
			video.playbackRate = settings.manualSpeed;
		}
	} else {
		// Observe for video element if not found
		const observer = new MutationObserver(() => {
			const video = document.querySelector("video");
			if (video) {
				observer.disconnect();
				currentVideo = video;
				if (settings.smartSpeedEnabled) {
					startSmartSpeed(video);
				} else {
					video.playbackRate = settings.manualSpeed;
				}
			}
		});
		observer.observe(document.body, { childList: true, subtree: true });
	}
}

// message listener (e.g. ON/OFF)
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.action === "toggleSmartSpeed") {
		settings.smartSpeedEnabled = !settings.smartSpeedEnabled;
		chrome.storage.sync.set({ smartSpeedEnabled: settings.smartSpeedEnabled });

		const video = currentVideo || document.querySelector("video");
		if (!settings.smartSpeedEnabled) {
			if (video) video.playbackRate = settings.manualSpeed;
			if (settings.showHud) {
				initHUD(); // Rebuild HUD with manual controls
			}
		} else {
			if (video) startSmartSpeed(video);
			if (settings.showHud) {
				initHUD(); // Rebuild HUD in smart mode
			}
		}

		sendResponse({ status: "toggled", enabled: settings.smartSpeedEnabled });
	} else if (msg.action === "settingsUpdated") {
		Object.assign(settings, msg.settings);

		if (settings.showHud) {
			initHUD();
		} else if (hudElement) {
			hudElement.remove();
			hudElement = null;
		}

		const video = currentVideo || document.querySelector("video");
		if (settings.smartSpeedEnabled && video) {
			startSmartSpeed(video);
		} else if (video) {
			video.playbackRate = settings.manualSpeed;
		}

		sendResponse({ status: "settings updated" });
	} else if (msg.action === "modelReset") {
		net.train([
			{ input: { volume: 0.0 }, output: { silence: 1 } },
			{ input: { volume: 0.9 }, output: { speech: 1 } },
		]);

		sendResponse({ status: "model reset" });
	} else if (msg.action === "getStatus") {
		sendResponse({
			enabled: settings.smartSpeedEnabled,
			settings: settings,
		});
	}
});
