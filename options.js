document.addEventListener("DOMContentLoaded", () => {
	chrome.storage.sync.get(["autoTrain", "showHud"], (cfg) => {
		document.getElementById("autoTrain").checked = !!cfg.autoTrain;
		document.getElementById("showHud").checked = !!cfg.showHud;
	});

	document.getElementById("save").addEventListener("click", () => {
		const autoTrain = document.getElementById("autoTrain").checked;
		const showHud = document.getElementById("showHud").checked;

		chrome.storage.sync.set({ autoTrain, showHud }, () => {
			alert("Ustawienia zapisane!");
		});
	});
});
