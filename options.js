document.addEventListener("DOMContentLoaded", () => {
	const defaults = {
		smartSpeedEnabled: true,
		autoTrain: true,
		showHud: true,
		minSpeed: 2,
		maxSpeed: 3.25,
		manualSpeed: 1.0,
	};

	chrome.storage.sync.get(Object.keys(defaults), (cfg) => {
		const config = { ...defaults, ...cfg };

		document.getElementById("smartSpeedEnabled").checked =
			config.smartSpeedEnabled;
		document.getElementById("autoTrain").checked = config.autoTrain;
		document.getElementById("showHud").checked = config.showHud;

		document.getElementById("minSpeedRange").value = config.minSpeed;
		document.getElementById("minSpeedNumber").value = config.minSpeed;
		document.getElementById("maxSpeedRange").value = config.maxSpeed;
		document.getElementById("maxSpeedNumber").value = config.maxSpeed;
		document.getElementById("manualSpeedRange").value = config.manualSpeed;
		document.getElementById("manualSpeedNumber").value = config.manualSpeed;
	});

	function syncSpeedInputs(rangeId, numberId) {
		const range = document.getElementById(rangeId);
		const number = document.getElementById(numberId);

		function updateValue() {
			const value = parseFloat(this.value);

			// Cross-check for min and max speeds
			if (rangeId === "minSpeedRange" || rangeId === "maxSpeedRange") {
				const otherRange =
					rangeId === "minSpeedRange" ? "maxSpeedRange" : "minSpeedRange";
				const otherValue = parseFloat(
					document.getElementById(otherRange).value,
				);
				const isMin = rangeId === "minSpeedRange";

				if (isMin && value >= otherValue) {
					this.value = Math.max(0.25, otherValue - 0.25);
				} else if (!isMin && value <= otherValue) {
					this.value = Math.min(4, otherValue + 0.25);
				}
			}

			range.value = this.value;
			number.value = this.value;
		}

		range.addEventListener("input", updateValue);
		number.addEventListener("input", updateValue);
	}

	syncSpeedInputs("minSpeedRange", "minSpeedNumber");
	syncSpeedInputs("maxSpeedRange", "maxSpeedNumber");
	syncSpeedInputs("manualSpeedRange", "manualSpeedNumber");

	document.getElementById("save").addEventListener("click", () => {
		const settings = {
			smartSpeedEnabled: document.getElementById("smartSpeedEnabled").checked,
			autoTrain: document.getElementById("autoTrain").checked,
			showHud: document.getElementById("showHud").checked,
			minSpeed: parseFloat(document.getElementById("minSpeedNumber").value),
			maxSpeed: parseFloat(document.getElementById("maxSpeedNumber").value),
			manualSpeed: parseFloat(
				document.getElementById("manualSpeedNumber").value,
			),
		};

		chrome.storage.sync.set(settings, () => {
			if (chrome.runtime.lastError) {
				console.error("Error saving settings:", chrome.runtime.lastError);
				const button = document.getElementById("save");
				button.textContent = "Error saving!";
				button.style.background = "#f44336";
				setTimeout(() => {
					button.textContent = "Save Settings";
					button.style.background = "#4CAF50";
				}, 2000);
				return;
			}

			const button = document.getElementById("save");
			const originalText = button.textContent;
			button.textContent = "Saved!";
			button.style.background = "#4CAF50";

			setTimeout(() => {
				button.textContent = originalText;
				button.style.background = "#4CAF50";
			}, 1500);

			chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
				tabs.forEach((tab) => {
					chrome.tabs.sendMessage(tab.id, {
						action: "settingsUpdated",
						settings,
					});
				});
			});
		});
	});

	document.getElementById("resetModel").addEventListener("click", () => {
		if (
			confirm(
				"Are you sure you want to reset the trained neural network model? This operation is irreversible.",
			)
		) {
			chrome.storage.local.remove("smartSpeedModel", () => {
				const button = document.getElementById("resetModel");
				const originalText = button.textContent;
				button.textContent = "Model reset!";
				button.style.background = "#4CAF50";

				setTimeout(() => {
					button.textContent = originalText;
					button.style.background = "#ff9800";
				}, 2000);

				chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
					tabs.forEach((tab) => {
						chrome.tabs.sendMessage(tab.id, { action: "modelReset" });
					});
				});
			});
		}
	});
});
