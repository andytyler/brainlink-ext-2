const isChromeExtension = typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id;

const browserAPI = isChromeExtension
	? chrome
	: {
			tabs: {
				onUpdated: {
					addListener: () => {},
				},
				onActivated: {
					addListener: () => {},
				},
				get: (tabId, callback) => callback({}),
				query: () => Promise.resolve([]),
			},
			windows: {
				onFocusChanged: {
					addListener: () => {},
				},
				WINDOW_ID_NONE: -1,
			},
			runtime: {
				sendMessage: () => Promise.resolve(),
				onMessage: {
					addListener: () => {},
					removeListener: () => {},
				},
			},
			sidePanel: {
				setPanelBehavior: () => Promise.resolve(),
			},
	  };

export default browserAPI;