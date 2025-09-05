document.addEventListener("DOMContentLoaded", () => {
	const defaults = {
		smartSpeedEnabled: true,
		autoTrain: true,
		showHud: true,
		minSpeed: 2,
		maxSpeed: 3.25
	};

	chrome.storage.sync.get(Object.keys(defaults), (cfg) => {
		const config = { ...defaults, ...cfg };
		
		document.getElementById("smartSpeedEnabled").checked = config.smartSpeedEnabled;
		document.getElementById("autoTrain").checked = config.autoTrain;
		document.getElementById("showHud").checked = config.showHud;
		
		document.getElementById("minSpeedRange").value = config.minSpeed;
		document.getElementById("minSpeedNumber").value = config.minSpeed;
		document.getElementById("maxSpeedRange").value = config.maxSpeed;
		document.getElementById("maxSpeedNumber").value = config.maxSpeed;
	});

	function syncSpeedInputs(rangeId, numberId) {
		const range = document.getElementById(rangeId);
		const number = document.getElementById(numberId);
		const otherRange = rangeId === 'minSpeedRange' ? 'maxSpeedRange' : 'minSpeedRange';
		const otherNumber = rangeId === 'minSpeedRange' ? 'maxSpeedNumber' : 'minSpeedNumber';
		
		function updateValue() {
			const value = parseFloat(this.value);
			const isMin = rangeId === 'minSpeedRange';
			const otherValue = parseFloat(document.getElementById(otherRange).value);
			
			if (isMin && value >= otherValue) {
				this.value = Math.max(0.25, otherValue - 0.25);
			} else if (!isMin && value <= otherValue) {
				this.value = Math.min(4, otherValue + 0.25);
			}
			
			range.value = this.value;
			number.value = this.value;
		}
		
		range.addEventListener('input', updateValue);
		number.addEventListener('input', updateValue);
	}

	syncSpeedInputs('minSpeedRange', 'minSpeedNumber');
	syncSpeedInputs('maxSpeedRange', 'maxSpeedNumber');

	document.getElementById("save").addEventListener("click", () => {
		const settings = {
			smartSpeedEnabled: document.getElementById("smartSpeedEnabled").checked,
			autoTrain: document.getElementById("autoTrain").checked,
			showHud: document.getElementById("showHud").checked,
			minSpeed: parseFloat(document.getElementById("minSpeedNumber").value),
			maxSpeed: parseFloat(document.getElementById("maxSpeedNumber").value)
		};

		chrome.storage.sync.set(settings, () => {
			const button = document.getElementById("save");
			const originalText = button.textContent;
			button.textContent = "Saved!";
			button.style.background = "#4CAF50";
			
			setTimeout(() => {
				button.textContent = originalText;
				button.style.background = "#4CAF50";
			}, 1500);
			
			chrome.tabs.query({url: "*://*.youtube.com/*"}, (tabs) => {
				tabs.forEach(tab => {
					chrome.tabs.sendMessage(tab.id, { action: "settingsUpdated", settings });
				});
			});
		});
	});

	document.getElementById("resetModel").addEventListener("click", () => {
		if (confirm("Are you sure you want to reset the trained neural network model? This operation is irreversible.")) {
			chrome.storage.local.remove("smartSpeedModel", () => {
				const button = document.getElementById("resetModel");
				const originalText = button.textContent;
				button.textContent = "Model reset!";
				button.style.background = "#4CAF50";
				
				setTimeout(() => {
					button.textContent = originalText;
					button.style.background = "#ff9800";
				}, 2000);
				
				chrome.tabs.query({url: "*://*.youtube.com/*"}, (tabs) => {
					tabs.forEach(tab => {
						chrome.tabs.sendMessage(tab.id, { action: "modelReset" });
					});
				});
			});
		}
	});
});
