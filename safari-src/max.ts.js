import { vn as ref } from "./runtime-core.esm-bundler.js";
import { r as useBrowserSyncStorage, t as defaultSettings } from "./storeTypes.js";
import { c as startSharedFunctions, i as getCurrentEpisodeNumber, l as sendMessage, n as createSlider, t as Platforms } from "./shared-functions.js";
//#region src/content-script/max.ts
var { data: settings, promise } = useBrowserSyncStorage("settings", defaultSettings);
var videoSpeed = ref(1);
var lastAdTimeText = 0;
var config = {
	attributes: true,
	childList: true,
	subtree: true
};
async function logStartOfAddon() {
	console.log("%cStreaming enhanced", "color: #00aeef;font-size: 2em;");
	console.log("Settings", settings.value);
}
async function startHBO() {
	await promise;
	logStartOfAddon();
	startSharedFunctions(Platforms.HBO);
	HBOObserver.observe(document, config);
	if (settings.value.HBO?.speedSlider) HBO_SpeedKeyboard();
	if (settings.value.Video?.doubleClick) HBO_doubleClick();
}
async function addSkippedTime(startTime, endTime, key) {
	if (typeof startTime === "number" && typeof endTime === "number" && endTime > startTime) {
		console.log(key, endTime - startTime);
		settings.value.Statistics[key] += endTime - startTime;
		sendMessage("increaseBadge", {}, "background");
	}
}
var HBOObserver = new MutationObserver(HBO);
async function HBO() {
	const video = document.querySelector("video");
	const time = video?.currentTime;
	if (settings.value.HBO?.skipIntro) HBO_Intro(video, time);
	if (settings.value.HBO?.skipCredits) HBO_Credits(time);
	if (settings.value.HBO?.watchCredits) HBO_Watch_Credits(video);
	if (settings.value.HBO?.speedSlider) HBO_SpeedSlider(video);
}
function HBO_Intro(video, time) {
	if (getCurrentEpisodeNumber(document.querySelector("[data-testid=\"player-ux-season-episode\"]")?.textContent) == 1) return;
	const button = document.querySelector("button[class*=\"SkipButton-\"]");
	if (button?.checkVisibility({ visibilityProperty: true })) {
		button.click();
		console.log("Intro skipped", button);
		setTimeout(function() {
			addSkippedTime(time, video?.currentTime, "IntroTimeSkipped");
		}, 600);
	}
}
function HBO_Credits(time) {
	const button = document.querySelector("button[class*=\"UpNextButton-\"]");
	if (button && lastAdTimeText < time - 1) {
		lastAdTimeText = time;
		button.click();
		settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
		console.log("Credits skipped", button);
	}
}
function HBO_Watch_Credits(video) {
	let button = document.querySelector("button[class*=\"DismissButton-\"]");
	if (button) {
		button.click();
		settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
		console.log("Watched Credits", button);
	}
	button = document.querySelector(".player-shrink-transition-enter-done");
	if (video && button) {
		video.click();
		settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
		console.log("Watched Credits", button);
	}
}
var HBOSliderStyle = "height: 1em;background: rgb(221, 221, 221);display: none;width:200px;";
var HBOSpeedStyle = "font-size: 1.5em;color:#b2b2b2;";
var HBODivStyle = "height:48px;display: flex;align-items: center;";
async function HBO_SpeedSlider(video) {
	if (!document.querySelector("#videoSpeedSlider")) {
		const position = document.querySelector("div[class*=\"ControlsFooterBottomRight-\"]");
		if (position) createSlider(video, videoSpeed, position, HBOSliderStyle, HBOSpeedStyle, HBODivStyle);
	}
}
async function HBO_SpeedKeyboard() {
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
async function HBO_doubleClick() {
	if (settings.value.Video?.doubleClick) document.ondblclick = function() {
		document.querySelector("[data-testid=\"player-ux-fullscreen-button\"]")?.click();
	};
	else document.ondblclick = null;
}
startHBO();
//#endregion
