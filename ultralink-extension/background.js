import browserAPI from "./src/browserAPI.js";
import { storage } from "./src/storage.js";

async function handleTabUpdate(tabInfo) {
	if (tabInfo.url) {
		let urls = (await storage.get("urls")) || [];
		const hostname = new URL(tabInfo.url).hostname;
		const url = new URL(tabInfo.url);

		if (!urls.some((item) => item.url === hostname)) {
			urls.unshift({
				hostname,
				url,
				title: tabInfo.title || "Untitled",
				favicon: tabInfo.favIconUrl || "default-favicon.png",
				timestamp: Date.now(),
			});

			await storage.set("urls", urls);
		}

		notifyUrlUpdate(urls);
	}
}

function notifyUrlUpdate(urls) {
	console.log("Sending urlUpdated message", urls);

	browserAPI.runtime.sendMessage({ action: "urlUpdated", urls: urls });
}

console.log("Background script loaded");
// Listen for tab updates
browserAPI.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete") {
		handleTabUpdate(tab);
	}
});

// Listen for tab activation
browserAPI.tabs.onActivated.addListener((activeInfo) => {
	browserAPI.tabs.get(activeInfo.tabId, (tab) => {
		handleTabUpdate(tab);
	});
});

// Listen for window focus changes
browserAPI.windows.onFocusChanged.addListener((windowId) => {
	if (windowId !== browserAPI.windows.WINDOW_ID_NONE) {
		browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs.length > 0) {
				handleTabUpdate(tabs[0]);
			}
		});
	}
});

// Set side panel behavior on installation
browserAPI.runtime.onInstalled.addListener(() => {
	browserAPI.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
