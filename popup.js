document.getElementById("toggle").addEventListener("click", () => {
	chrome.runtime.sendMessage({ action: "toggleSmartSpeed" });
});
