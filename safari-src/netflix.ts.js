import { vn as ref } from "./runtime-core.esm-bundler.js";
import { n as useBrowserLocalStorage, r as useBrowserSyncStorage, t as defaultSettings } from "./storeTypes.js";
import { c as startSharedFunctions, f as applyStretch, i as getCurrentEpisodeNumber, l as sendMessage, n as createSlider, t as Platforms } from "./shared-functions.js";
//#region src/content-script/netflix.ts
startSharedFunctions(Platforms.Netflix);
var { data: settings, promise } = useBrowserSyncStorage("settings", defaultSettings);
var { data: hiddenTitles, promise: hiddenTitlesPromise } = useBrowserLocalStorage("hiddenTitles", {}, false);
var today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
var ua = navigator.userAgent;
var lastAdTimeText = 0;
var curVideoTitle = null;
var videoSpeed = ref(1);
var isEdge = /edg/i.test(ua);
var config = {
	attributes: true,
	childList: true,
	subtree: true
};
async function logStartOfAddon() {
	console.log("%cStreaming enhanced", "color: #00aeef;font-size: 2em;");
	console.log("Settings", settings.value);
}
async function addSkippedTime(startTime, endTime, key) {
	if (typeof startTime === "number" && typeof endTime === "number" && endTime > startTime) {
		console.log(key, endTime - startTime);
		settings.value.Statistics[key] += endTime - startTime;
		sendMessage("increaseBadge", {}, "background");
	}
}
async function resetLastATimeText(time = 1e3) {
	setTimeout(() => {
		lastAdTimeText = 0;
	}, time);
}
async function startNetflix() {
	await promise;
	await hiddenTitlesPromise;
	logStartOfAddon();
	if (settings.value.Netflix?.profile) AutoPickProfile();
	if (settings.value.Netflix?.skipAd) Netflix_SkipAdInterval();
	if (settings.value.Netflix?.speedSlider) Netflix_SpeedKeyboard();
	NetflixObserver.observe(document, config);
}
var NetflixObserver = new MutationObserver(Netflix);
function Netflix() {
	const video = document.querySelector("video");
	const NSettings = settings.value.Netflix;
	if (NSettings?.profile) Netflix_profile();
	curVideoTitle = getTitle() || curVideoTitle;
	if (NSettings?.skipIntro && getCurrentEpisodeNumber(curVideoTitle) != 1) {
		if (Netflix_General("[data-uia=\"player-skip-intro\"]", "Intro skipped", false)) {
			if (video) {
				const time = video?.currentTime;
				setTimeout(function() {
					addSkippedTime(time, video?.currentTime, "IntroTimeSkipped");
				}, 600);
			}
		}
	}
	if (NSettings?.skipRecap) {
		if (Netflix_General("[data-uia=\"player-skip-recap\"]", "Recap skipped", false) || Netflix_General("[data-uia=\"player-skip-preplay\"]", "Recap skipped", false)) {
			if (video) {
				const time = video?.currentTime;
				setTimeout(function() {
					addSkippedTime(time, video?.currentTime, "RecapTimeSkipped");
				}, 600);
			}
		}
	}
	if (NSettings?.skipCredits) Netflix_General("[data-uia=\"next-episode-seamless-button-draining\"]", "Credits skipped");
	if (NSettings?.watchCredits) Netflix_General("[data-uia=\"watch-credits-seamless-button\"]", "Credits watched");
	if (NSettings?.skipBlocked) Netflix_General("[data-uia=\"interrupt-autoplay-continue\"]", "Blocked skipped");
	if (NSettings?.speedSlider && video) Netflix_SpeedSlider(video);
	if (settings.value.Video?.scrollVolume && video) Netflix_scrollVolume(video);
	applyStretch(video);
	if (NSettings?.removeGames) Netflix_removeGames();
	if (NSettings?.hideTitles) addHideTitleButton();
}
function getTitle() {
	const container = document.querySelector("[data-uia=\"video-title\"]");
	if (!container) return "";
	return Array.from(container.querySelectorAll("span")).map((s) => (s.textContent ?? "").trim()).join(" ");
}
async function Netflix_scrollVolume(video) {
	const volumeControl = document.querySelector("[data-uia*=\"control-volume\"] div:not(.enhanced)");
	if (volumeControl) {
		volumeControl.classList.add("enhanced");
		const handleVolumeControl = (event) => {
			let volume = video.volume;
			if (event.deltaY < 0) volume = Math.min(1, volume + .1);
			else volume = Math.max(0, volume - .1);
			video.volume = volume;
		};
		volumeControl?.removeEventListener("wheel", handleVolumeControl);
		volumeControl?.addEventListener("wheel", handleVolumeControl);
	}
}
function decodeHtmlEntities(str) {
	return new DOMParser().parseFromString("<!doctype html><body>" + str, "text/html").body.textContent;
}
function Netflix_profile() {
	const currentProfile = document.querySelector("[href*='/YourAccount']");
	if (currentProfile) {
		const currentProfileName = decodeHtmlEntities(currentProfile?.getAttribute("aria-label")?.split("–")?.[0].split("-")?.[0].slice(0, -1) ?? "");
		if (currentProfileName && currentProfileName !== settings.value.General.profileName) {
			settings.value.General.profilePicture = (currentProfile?.firstChild?.firstChild)?.src;
			console.log("Profile switched to", currentProfileName, settings.value.General?.profilePicture);
			settings.value.General.profileName = currentProfileName;
			console.log("Profile switched to", currentProfileName);
		}
	}
}
function AutoPickProfile() {
	if (!globalThis.location.pathname.includes("Profile") && !globalThis.location.pathname.includes("profile")) document.querySelectorAll(".profile-name").forEach((button) => {
		if (button.textContent === settings.value.General.profileName) {
			settings.value.General.profilePicture = (button?.parentElement?.firstChild?.firstChild)?.style?.backgroundImage?.slice(5, -2);
			button?.parentElement?.click();
			console.log("Profile automatically chosen:", settings.value.General.profileName);
			settings.value.Statistics.SegmentsSkipped++;
			sendMessage("increaseBadge", {}, "background");
		}
	});
}
function Netflix_General(selector, name, incBadge = true) {
	const button = document.querySelector(selector);
	if (button) {
		console.log(name, button);
		button.click();
		if (incBadge) settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
		return true;
	}
	return false;
}
function parseAdTime(adTimeText) {
	if (!adTimeText) return 0;
	let adTime;
	if (adTimeText.includes(":")) adTime = Number.parseInt(/:\d+/.exec(adTimeText ?? "")?.[0].substring(1) ?? "") + Number.parseInt(/\d+/.exec(adTimeText ?? "")?.[0] ?? "") * 60;
	else adTime = Number.parseInt(adTimeText);
	if (Number.isNaN(adTime)) return 0;
	return adTime;
}
function Netflix_SkipAdInterval() {
	const AdInterval = setInterval(() => {
		if (!settings.value.Netflix?.skipAd) {
			console.log("stopped observing| Ad");
			clearInterval(AdInterval);
			return;
		}
		const video = document.querySelector("video");
		const adLength = parseAdTime(document.querySelector("span[class*=\"mmvz9h\"]")?.textContent);
		if (video && (adLength || lastAdTimeText)) {
			let playBackRate = 8;
			if (isEdge) playBackRate = 3;
			if ((adLength || lastAdTimeText) && video.paused) video.play();
			if (adLength > 2 && video.playbackRate != playBackRate) {
				console.log("Ad skipped, length:", adLength, "s");
				settings.value.Statistics.NetflixAdTimeSkipped += adLength;
				settings.value.Statistics.SegmentsSkipped++;
				sendMessage("increaseBadge", {}, "background");
				if (settings.value.Video.epilepsy) video.style.opacity = "0";
				video.muted = true;
				video.playbackRate = playBackRate;
				lastAdTimeText = adLength;
			} else if (adLength <= 2 || !adLength && lastAdTimeText) {
				video.muted = false;
				video.playbackRate = videoSpeed.value;
				lastAdTimeText = 0;
				if (settings.value.Video.epilepsy) video.style.opacity = "1";
			}
		}
		const div = document.querySelector("div[data-uia=\"pause-ad-title-display\"]");
		const button = document.querySelector("button[data-uia=\"pause-ad-expand-button\"]");
		if (button && div?.checkVisibility({ opacityProperty: true }) && (!video || video.paused && lastAdTimeText != video.currentTime / 10)) {
			if (video) lastAdTimeText = video.currentTime / 10;
			resetLastATimeText();
			button.click();
			console.log("Remove Video Paused ad", button);
			settings.value.Statistics.SegmentsSkipped++;
			sendMessage("increaseBadge", {}, "background");
			setTimeout(() => {
				(video || document.querySelector("video"))?.pause();
			}, 100);
		}
	}, 100);
}
var NetflixSliderStyle = "display: none;width:200px;";
var NetflixSpeedStyle = "font-size: 3em;padding: 0 5px;margin: unset;align-content: center;";
function Netflix_SpeedSlider(video) {
	if (!document.querySelector("#videoSpeedSlider")) {
		const p = (document.querySelector("[data-uia=\"controls-standard\"]")?.firstChild)?.children;
		if (p) {
			const position = p[p.length - 2]?.firstChild?.lastChild;
			if (position) createSlider(video, videoSpeed, position, NetflixSliderStyle, NetflixSpeedStyle);
		}
	}
}
async function Netflix_SpeedKeyboard() {
	const steps = settings.value.General.sliderSteps / 10;
	document.addEventListener("keydown", (event) => {
		const video = document.querySelector("video");
		if (!video) return;
		if (event.key === "d") {
			video.playbackRate = Math.min(video.playbackRate + steps * 2, settings.value.General.sliderMax / 10);
			videoSpeed.value = video.playbackRate;
		} else if (event.key === "s") {
			video.playbackRate = Math.max(video.playbackRate - steps * 2, .6);
			videoSpeed.value = video.playbackRate;
		}
	});
}
function Netflix_removeGames() {
	const gamesRow = document.querySelector("div.mobile-games-row");
	if (gamesRow) {
		gamesRow.remove();
		console.log("Netflix removed games");
		settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
	}
	const BetaRow = document.querySelector("a[data-uia=\"cloud-game-card\"]")?.closest("section");
	if (BetaRow) {
		BetaRow.remove();
		console.log("Netflix removed beta games");
		settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
	}
}
function addHideTitleButton() {
	const expandButton = document.querySelector("div.buttonControls--expand-button:not(.enhanced)");
	if (!expandButton?.parentElement) return;
	expandButton.classList.add("enhanced");
	const id = expandButton.closest("a")?.href?.split("?")[0]?.split("/")?.at(-1);
	if (!id) return;
	const a = document.querySelector(`a[href*="${id}"]`);
	const title = a?.getAttribute("aria-label");
	if (!a || !title) return;
	const button = document.createElement("button");
	button.className = "color-supplementary";
	button.style.cssText = "aspect-ratio: 1 / 1;border-radius: 50%;margin: 0;";
	button.onclick = function() {
		const item = a.closest("div[data-virtual-slot]");
		if (item) item.style.display = "none";
		expandButton.closest(".previewModal--container")?.remove();
		hiddenTitles.value[title] = {
			platform: "Netflix",
			mediaType: null,
			posterPath: null,
			dateAdded: today
		};
	};
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg.style.cssText = "width:24px;height:24px;";
	svg.setAttribute("viewBox", "0 0 24 24");
	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("fill", "currentColor");
	path.setAttribute("d", "M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q1.465 0 2.82-.514q1.357-.515 2.465-1.494L6.008 6.716q-.96 1.107-1.484 2.463T4 12q0 3.35 2.325 5.675T12 20m5.992-2.716q.98-1.107 1.493-2.463Q20 13.465 20 12q0-3.35-2.325-5.675T12 4q-1.471 0-2.834.505q-1.362.504-2.45 1.503z");
	svg.appendChild(path);
	button.appendChild(svg);
	expandButton.parentElement.insertBefore(button, expandButton.parentElement.lastChild);
}
startNetflix();
//#endregion
