let smartEnabled = true;
let hudElement = null;
let autoTrainEnabled = true;
let showHudEnabled = true;
let minSpeed = 2;
let maxSpeed = 3.25;

const settings = {
	smartSpeedEnabled: true,
	autoTrain: true,
	showHud: true,
	minSpeed: 2,
	maxSpeed: 3.25
};

function loadSettings() {
	chrome.storage.sync.get(Object.keys(settings), (cfg) => {
		Object.assign(settings, cfg);
		smartEnabled = settings.smartSpeedEnabled;
		autoTrainEnabled = settings.autoTrain;
		showHudEnabled = settings.showHud;
		minSpeed = settings.minSpeed;
		maxSpeed = settings.maxSpeed;
		
		if (showHudEnabled) {
			initHUD();
		} else if (hudElement) {
			hudElement.remove();
			hudElement = null;
		}
	});
}

loadSettings();

// inicjalizacja HUD
function initHUD() {
	if (hudElement) return;
	
	hudElement = document.createElement("div");
	hudElement.id = "smartspeed-hud";
	hudElement.textContent = smartEnabled ? "Smart Speed: 1x" : "Smart Speed: OFF";
	document.body.appendChild(hudElement);
}

// prosty model
const net = new brain.NeuralNetwork({ hiddenLayers: [4] });

// wczytanie wytrenowanego modelu jeśli istnieje
chrome.storage.local.get("smartSpeedModel", (res) => {
	if (res.smartSpeedModel) {
		net.fromJSON(res.smartSpeedModel);
	} else {
		// trening startowy
		net.train([
			{ input: { volume: 0.0 }, output: { silence: 1 } },
			{ input: { volume: 0.9 }, output: { speech: 1 } },
		]);
	}
});

function analyzeAndSetSpeed(video) {
	if (!smartEnabled) return;

	const ctx = new AudioContext();
	const src = ctx.createMediaElementSource(video);
	const analyser = ctx.createAnalyser();
	src.connect(analyser);
	analyser.connect(ctx.destination);

	const data = new Uint8Array(analyser.fftSize);

	function tick() {
		if (!smartEnabled) return;

		analyser.getByteTimeDomainData(data);
		let rms = 0;
		for (let i = 0; i < data.length; i++) {
			rms += (data[i] - 128) ** 2;
		}
		rms = Math.sqrt(rms / data.length) / 128;

		// wyjście sieci
		const result = net.run({ volume: rms });

		// confidence: cisza → szybciej, mowa → wolniej
		const confidence =
			result.silence / ((result.silence || 0) + (result.speech || 0));
		const speed = minSpeed + confidence * (maxSpeed - minSpeed);
		video.playbackRate = parseFloat(speed.toFixed(2));

		if (hudElement && showHudEnabled) {
			hudElement.textContent = `Smart Speed: ${speed.toFixed(2)}x`;
		}

		// auto-trening: korzystamy z globalnej zmiennej, nie wołamy get w każdej klatce
		if (autoTrainEnabled) {
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
			const json = net.toJSON();
			console.log(json);
			chrome.storage.local.set({ smartSpeedModel: json });
		}

		requestAnimationFrame(tick);
	}

	tick();
}

// function analyzeAndSetSpeed(video) {
// 	if (!smartEnabled) return;

// 	const ctx = new AudioContext();
// 	const src = ctx.createMediaElementSource(video);
// 	const analyser = ctx.createAnalyser();
// 	src.connect(analyser);
// 	analyser.connect(ctx.destination);

// 	const data = new Uint8Array(analyser.fftSize);

// 	function tick() {
// 		if (!smartEnabled) return;

// 		analyser.getByteTimeDomainData(data);
// 		let rms = 0;
// 		for (let i = 0; i < data.length; i++) {
// 			rms += (data[i] - 128) ** 2;
// 		}
// 		rms = Math.sqrt(rms / data.length) / 128;

// 		const result = net.run({ volume: rms });

// 		// interpolacja prędkości 2x - 4x w zależności od pewności
// 		const confidence = result.silence / (result.silence + result.speech);
// 		const speed = 2 + confidence * (3.25 - 2);
// 		video.playbackRate = parseFloat(speed.toFixed(2));

// 		if (hudElement) {
// 			hudElement.textContent = `Speed: ${speed.toFixed(2)}x`;
// 		}

// 		// auto-trening: zapisujemy model co tick jeśli autoTrain włączone
// 		chrome.storage.sync.get("autoTrain", (cfg) => {
// 			const autoTrain = cfg?.autoTrain ?? true; // domyślnie !false
// 			if (autoTrain) {
// 				net.train(
// 					[
// 						{
// 							input: { volume: rms },
// 							output: {
// 								silence: rms < 0.05 ? 1 : 0,
// 								speech: rms >= 0.05 ? 1 : 0,
// 							},
// 						},
// 					],
// 					{ iterations: 1 },
// 				);
// 				const json = net.toJSON();
// 				chrome.storage.local.set({ smartSpeedModel: json });
// 			}
// 		});

// 		requestAnimationFrame(tick);
// 	}

// 	tick();
// }

// function startSmartSpeed(video) {
// 	chrome.storage.local.get("smartSpeedModel", (res) => {
// 		if (res.smartSpeedModel) {
// 			net.fromJSON(res.smartSpeedModel);
// 			console.log("SmartSpeed model loaded from storage");
// 		} else {
// 			net.train([
// 				{ input: { volume: 0.0 }, output: { silence: 1 } },
// 				{ input: { volume: 0.9 }, output: { speech: 1 } },
// 			]);
// 		}

// 		// dopiero teraz uruchamiamy tick loop
// 		analyzeAndSetSpeed(video);
// 	});
// }

// function setupVideoObserver() {
// 	const video = document.querySelector("video");
// 	if (video) {
// 		// analyzeAndSetSpeed(video);
// 		startSmartSpeed(video);
// 	}
// }

// setupVideoObserver();

// // odbiór komunikatów (np. ON/OFF)
// chrome.runtime.onMessage.addListener((msg) => {
// 	if (msg.action === "toggleSmartSpeed") {
// 		smartEnabled = !smartEnabled;
// 		if (!smartEnabled) {
// 			const video = document.querySelector("video");
// 			if (video) video.playbackRate = 1.0;
// 			if (hudElement) hudElement.textContent = "Smart OFF";
// 		} else {
// 			setupVideoObserver();
// 		}
// 	}
// });

function startSmartSpeed(video) {
	// upewniamy się, że model jest gotowy przed startem
	chrome.storage.local.get("smartSpeedModel", (res) => {
		if (res.smartSpeedModel) net.fromJSON(res.smartSpeedModel);
		analyzeAndSetSpeed(video);
	});
}

function setupVideoObserver() {
	const video = document.querySelector("video");
	if (video) startSmartSpeed(video);
}

setupVideoObserver();

// odbiór komunikatów (np. ON/OFF)
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.action === "toggleSmartSpeed") {
		smartEnabled = !smartEnabled;
		chrome.storage.sync.set({ smartSpeedEnabled: smartEnabled });
		
		const video = document.querySelector("video");
		if (!smartEnabled) {
			if (video) video.playbackRate = 1.0;
			if (hudElement && showHudEnabled) {
				hudElement.textContent = "Smart Speed: OFF";
			}
		} else {
			if (video) startSmartSpeed(video);
			if (hudElement && showHudEnabled) {
				hudElement.textContent = "Smart Speed: 1x";
			}
		}
		
		sendResponse({ status: "toggled", enabled: smartEnabled });
		
	} else if (msg.action === "settingsUpdated") {
		Object.assign(settings, msg.settings);
		smartEnabled = settings.smartSpeedEnabled;
		autoTrainEnabled = settings.autoTrain;
		showHudEnabled = settings.showHud;
		minSpeed = settings.minSpeed;
		maxSpeed = settings.maxSpeed;
		
		if (showHudEnabled) {
			initHUD();
		} else if (hudElement) {
			hudElement.remove();
			hudElement = null;
		}
		
		const video = document.querySelector("video");
		if (smartEnabled && video) {
			startSmartSpeed(video);
		} else if (video) {
			video.playbackRate = 1.0;
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
			enabled: smartEnabled,
			settings: settings
		});
	}
});
