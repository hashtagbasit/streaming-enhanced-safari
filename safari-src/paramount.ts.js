import { Ht as watch, vn as ref } from "./runtime-core.esm-bundler.js";
import { r as useBrowserSyncStorage, t as defaultSettings } from "./storeTypes.js";
import { c as startSharedFunctions, f as applyStretch, l as sendMessage, n as createSlider, t as Platforms } from "./shared-functions.js";
//#region src/content-script/paramount.ts
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
async function startParamount() {
	await promise;
	logStartOfAddon();
	startSharedFunctions(Platforms.Paramount);
	ParamountObserver.observe(document, config);
	if (settings.value.Paramount?.speedSlider) Paramount_SpeedKeyboard();
	if (settings.value.Video?.doubleClick) Paramount_doubleClick();
}
async function addSkippedTime(startTime, endTime, key) {
	if (typeof startTime === "number" && typeof endTime === "number" && endTime > startTime) {
		console.log(key, endTime - startTime);
		settings.value.Statistics[key] += endTime - startTime;
		sendMessage("increaseBadge", {}, "background");
	}
}
async function resetLastAdTimeText(time = 1e3) {
	setTimeout(() => {
		lastAdTimeText = 0;
	}, time);
}
var ParamountObserver = new MutationObserver(Paramount);
async function Paramount() {
	const video = document.querySelector("video");
	const time = video?.currentTime;
	if (settings.value.Paramount?.skipIntro) Paramount_Intro(video, time);
	if (settings.value.Paramount?.skipCredits) Paramount_Credits(time);
	if (settings.value.Paramount?.watchCredits) Paramount_Watch_Credits(video);
	if (settings.value.Paramount?.speedSlider) Paramount_SpeedSlider(video);
	if (settings.value.Paramount?.skipAd) Paramount_SkipAd(video);
	applyStretch(video);
}
var lastIntroTime = -1;
function resetLastIntroTime() {
	setTimeout(() => {
		lastIntroTime = -1;
	}, 5e3);
}
function Paramount_Intro(video, time) {
	const button = document.querySelector("button.skip-button");
	if (button && button.getAttribute("disabled") !== "") {
		const timeCheck = Math.floor(video?.currentTime ?? 0);
		if (typeof timeCheck === "number" && lastIntroTime != timeCheck) {
			lastIntroTime = timeCheck;
			resetLastIntroTime();
			button.click();
			console.log("Intro skipped", button);
			setTimeout(function() {
				addSkippedTime(time, video?.currentTime, "IntroTimeSkipped");
			}, 600);
		}
	}
}
var lastCreditText = "";
async function resetLastCreditText(time = 1e3) {
	setTimeout(() => {
		lastCreditText = "";
	}, time);
}
function Paramount_Credits(time) {
	const div = document.querySelector("div[class*=\"end-card-panel-\"]");
	if (div) {
		const button = div.querySelector("button.play-button");
		const title = div.querySelector("h2.sub-title")?.getAttribute("title") ?? "";
		if (lastCreditText != title && button) {
			lastCreditText = title;
			resetLastCreditText();
			button.click();
			settings.value.Statistics.SegmentsSkipped++;
			sendMessage("increaseBadge", {}, "background");
			console.log("skipped Credits", button);
		}
	}
}
function Paramount_Watch_Credits(video) {
	const button = document.querySelector("div[class*=\"end-card-panel-\"]")?.querySelector("button#close-btn");
	if (button) {
		button.click();
		settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
		console.log("Watched Credits", button);
	}
}
var ParamountSliderStyle = "width:200px;display:none;";
var ParamountSpeedStyle = "font-size: 1.5em;width: 2em;color:#fff;cursor: pointer;";
var ParamountDivStyle = "height:48px;display: flex;align-items: center;align-self:center;";
async function Paramount_SpeedSlider(video) {
	if (video) {
		const alreadySlider = document.querySelector("#videoSpeedSlider");
		if (!alreadySlider) {
			const position = document.querySelector("div.controls-bottom-right");
			if (position) createSlider(video, videoSpeed, position, ParamountSliderStyle, ParamountSpeedStyle, ParamountDivStyle);
		} else {
			const speed = document.querySelector("#videoSpeed");
			if (speed) {
				speed.onclick = function() {
					alreadySlider.style.display = alreadySlider.style.display === "block" ? "none" : "block";
				};
				watch(videoSpeed, (newValue) => {
					speed.textContent = newValue.toFixed(1) + "x";
					alreadySlider.value = (newValue * 10).toString();
				});
			}
			if (video.playbackRate != Number.parseFloat(alreadySlider.value) / 10) video.playbackRate = Number.parseFloat(alreadySlider.value) / 10;
			alreadySlider.oninput = function() {
				if (speed) speed.textContent = (Number.parseFloat(alreadySlider.value) / 10).toFixed(1) + "x";
				video.playbackRate = Number.parseFloat(alreadySlider.value) / 10;
			};
		}
	}
}
async function Paramount_SpeedKeyboard() {
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
async function Paramount_doubleClick() {
	if (settings.value.Video?.doubleClick) document.ondblclick = function() {
		document.querySelector("button.btn-fullscreen")?.click();
	};
	else document.ondblclick = null;
}
async function Paramount_SkipAd(video) {
	const adTime = Number.parseInt(document.querySelector("div.ad-info-manager-circular-loader-copy")?.textContent ?? "0");
	if (adTime > 0 && !lastAdTimeText) {
		lastAdTimeText = adTime;
		resetLastAdTimeText(3e3);
		video.currentTime += adTime;
		const adOverlay = document.querySelector("div.ad-click-overlay");
		if (adOverlay) {
			adOverlay.remove();
			video.onclick = function(event) {
				if (video.paused) video.play();
				else video.pause();
			};
		}
		console.log("Skipped ad, length:", adTime, "s");
		settings.value.Statistics.ParamountAdTimeSkipped += adTime;
		settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
	}
}
startParamount();
//#endregion
