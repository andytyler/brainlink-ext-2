import browserAPI from "./browserAPI";

export const storage = {
	get: (key) => {
		return new Promise((resolve) => {
			browserAPI.storage.local.get(key, (result) => {
				resolve(result[key] || []);
			});
		});
	},
	set: (key, value) => {
		return new Promise((resolve) => {
			browserAPI.storage.local.set({ [key]: value }, resolve);
		});
	},
};
