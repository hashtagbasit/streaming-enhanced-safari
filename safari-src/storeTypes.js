import { i as __toESM, t as require_browser_polyfill } from "./browser-polyfill.js";
import { Cn as toRaw, Ht as watch, tt as nextTick, vn as ref } from "./runtime-core.esm-bundler.js";
//#region src/composables/useBrowserStorage.ts
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
function mergeDeep(defaults, source) {
	const output = { ...defaults };
	Object.keys(defaults).forEach((key) => {
		const defaultValue = defaults[key];
		const sourceValue = source?.[key];
		if (isObject(defaultValue) && sourceValue != null) output[key] = mergeDeep(defaultValue, sourceValue);
		else if (checkType(defaultValue, sourceValue)) output[key] = sourceValue;
		else {
			output[key] = defaultValue;
			console.log("Type mismatch", key, sourceValue, defaultValue);
		}
	});
	return output;
}
function checkType(defaultValue, value) {
	return value === null || defaultValue === void 0 || typeof value === typeof defaultValue && Array.isArray(value) == Array.isArray(defaultValue);
}
function isObject(value) {
	return value !== null && value instanceof Object && !Array.isArray(value);
}
function useBrowserSyncStorage(key, defaultValue, merge = true) {
	return useBrowserStorage(key, defaultValue, "sync", merge);
}
function useBrowserLocalStorage(key, defaultValue, merge = true) {
	return useBrowserStorage(key, defaultValue, "local", merge);
}
function useBrowserStorage(key, defaultValue, storageType = "sync", merge = true) {
	const data = ref(defaultValue);
	let isUpdatingFromStorage = true;
	const defaultIsObject = isObject(defaultValue);
	const promise = (async () => {
		const result = await import_browser_polyfill.storage[storageType].get(key);
		if (result?.[key] !== void 0) {
			if (defaultIsObject && isObject(result[key])) data.value = merge ? mergeDeep(defaultValue, result[key]) : result[key];
			else if (checkType(defaultValue, result[key])) data.value = result[key];
		}
		await nextTick();
		isUpdatingFromStorage = false;
	})();
	watch(data, (newValue) => {
		if (!isUpdatingFromStorage) {
			if (checkType(defaultValue, newValue)) import_browser_polyfill.storage[storageType].set({ [key]: toRaw(newValue) });
			else console.error("not updating " + key + ": type mismatch");
		}
	}, {
		deep: true,
		flush: "post"
	});
	import_browser_polyfill.storage.onChanged.addListener(async function(changes, areaName) {
		if (areaName === storageType && changes?.[key]) {
			isUpdatingFromStorage = true;
			const { newValue } = changes[key];
			data.value = newValue;
			await nextTick();
			isUpdatingFromStorage = false;
		}
	});
	return {
		data,
		promise
	};
}
//#endregion
//#region src/stores/storeTypes.ts
var defaultSettings = {
	Amazon: {
		skipIntro: true,
		skipCredits: true,
		watchCredits: false,
		selfAd: true,
		skipAd: true,
		speedSlider: true,
		filterPaid: false,
		showRating: true,
		xray: true,
		improveUI: true,
		hideTitles: true
	},
	Netflix: {
		skipIntro: true,
		skipRecap: true,
		skipCredits: true,
		watchCredits: false,
		skipBlocked: true,
		skipAd: true,
		speedSlider: true,
		profile: true,
		showRating: true,
		removeGames: true,
		hideTitles: true
	},
	Disney: {
		skipIntro: true,
		skipCredits: true,
		watchCredits: false,
		skipAd: true,
		speedSlider: true,
		showRating: true,
		hideTitles: true
	},
	Crunchyroll: {
		skipIntro: true,
		skipCredits: true,
		skipAfterCredits: false,
		speedSlider: true,
		releaseCalendar: true,
		profile: true,
		bigPlayer: true,
		filterQueued: true,
		dubLanguage: "none",
		filterDuplicates: true,
		showRating: true
	},
	HBO: {
		skipIntro: true,
		skipCredits: true,
		watchCredits: false,
		speedSlider: true,
		showRating: true
	},
	Paramount: {
		skipIntro: true,
		skipCredits: true,
		watchCredits: false,
		speedSlider: true,
		showRating: true,
		skipAd: true
	},
	Video: {
		playOnFullScreen: true,
		epilepsy: false,
		userAgent: true,
		doubleClick: true,
		scrollVolume: true,
		showYear: false,
		dimLowRatings: false,
		stretch: "off",
		stretchZoom: 1
	},
	Statistics: {
		AmazonAdTimeSkipped: 0,
		NetflixAdTimeSkipped: 0,
		DisneyAdTimeSkipped: 0,
		ParamountAdTimeSkipped: 0,
		IntroTimeSkipped: 0,
		RecapTimeSkipped: 0,
		SegmentsSkipped: 0
	},
	General: {
		Crunchyroll_profilePicture: "",
		profileName: "",
		profilePicture: "",
		sliderSteps: 1,
		sliderMin: 5,
		sliderMax: 20,
		GCdate: "2024-01-01",
		MALGCdate: "2024-01-01",
		Crunchyroll_skipTimeout: 0,
		RatingThresholds: [
			{
				color: "red",
				value: 5.5
			},
			{
				color: "rgb(245, 197, 24)",
				value: 7
			},
			{
				color: "rgb(0, 166, 0)",
				value: 10
			}
		]
	}
};
//#endregion
export { useBrowserLocalStorage as n, useBrowserSyncStorage as r, defaultSettings as t };
