import { t as require_browser_polyfill } from "./browser-polyfill.js";
import { Ht as watch, vn as ref } from "./runtime-core.esm-bundler.js";
import { r as useBrowserSyncStorage, t as defaultSettings } from "./storeTypes.js";
import { c as startSharedFunctions, i as getCurrentEpisodeNumber, l as sendMessage, n as createSlider, s as parseAdTime, t as Platforms } from "./shared-functions.js";
require_browser_polyfill();
var { data: settings, promise } = useBrowserSyncStorage("settings", defaultSettings);
var hostname = globalThis.location.hostname;
var isDisney = /disneyplus|starplus/i.test(hostname);
var isHotstar = /hotstar|jiostar|jiocinema/i.test(hostname);
var isStarPlus = /starplus/i.test(hostname);
if (isHotstar) startSharedFunctions(Platforms.Hotstar);
else startSharedFunctions(Platforms.Disney);
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
var videoSpeed = ref(1);
async function startDisney() {
	await promise;
	logStartOfAddon();
	if (isHotstar) Hotstar_doubleClick();
	if (settings.value.Disney?.speedSlider) Disney_SpeedKeyboard();
	DisneyObserver.observe(document, config);
	setInterval(function() {
		const video = Array.from(document.querySelectorAll("video")).find((v) => v.checkVisibility());
		if (settings.value.Disney?.skipAd) Disney_skipAd(video);
	}, 300);
}
var DisneyObserver = new MutationObserver(Disney);
function Disney() {
	const video = Array.from(document.querySelectorAll("video")).find((v) => v.checkVisibility());
	const time = video?.currentTime;
	if (settings.value.Disney?.skipIntro) Disney_Intro(video, time);
	Disney_skipCredits(time);
	if (settings.value.Disney?.watchCredits) Disney_Watch_Credits();
	if (settings.value.Disney?.speedSlider) Disney_SpeedSlider(video);
	if (isDisney) Disney_addHomeButton();
	if (settings.value.Video?.scrollVolume) Disney_scrollVolume(video);
}
async function Disney_skipAd(video) {
	if (video && !video.paused) {
		const adTimeText = document.querySelector("ad-badge-overlay")?.shadowRoot?.querySelector(".ad-badge-overlay__content--time-display");
		if (adTimeText) {
			const adTime = parseAdTime(adTimeText?.textContent);
			if (adTime && adTime >= 1 && lastAdTimeText != video.currentTime) {
				if (lastAdTimeText == 0) {
					console.log("Disney Ad skipped, length:", adTime, "s");
					settings.value.Statistics.DisneyAdTimeSkipped += adTime;
					settings.value.Statistics.SegmentsSkipped++;
					sendMessage("increaseBadge", {}, "background");
				}
				lastAdTimeText = video.currentTime;
				video.currentTime += adTime;
			}
		} else lastAdTimeText = 0;
		const continueText = document.querySelector("p.toast-notification__text[aria-hidden='true']");
		if (continueText?.checkVisibility()) {
			continueText.remove();
			settings.value.Statistics.SegmentsSkipped++;
			sendMessage("increaseBadge", {}, "background");
		}
	}
}
async function Disney_scrollVolume(video) {
	const volumeControl = document.querySelector("div.audio-control:not(.enhanced)");
	if (volumeControl) {
		volumeControl.classList.add("enhanced");
		volumeControl.addEventListener("wheel", (event) => {
			console.log("wheel");
			let volume = video.volume;
			if (event.deltaY < 0) volume = Math.min(1, volume + .1);
			else volume = Math.max(0, volume - .1);
			video.volume = volume;
			const sliderChildren = (volumeControl.querySelector(".slider-container")?.firstChild)?.children;
			if (sliderChildren.length > 2) {
				const firstChild = sliderChildren[1];
				const secondChild = sliderChildren[2];
				firstChild.style.strokeDashoffset = 100 - volume * 100 + "px";
				firstChild.style.height = volume * 100 + "%";
				secondChild.style.height = volume * 100 + "%";
			}
		});
	}
}
async function Disney_Intro(video, time) {
	if (getCurrentEpisodeNumber(document.querySelector("main-app-controls-overlay")?.shadowRoot?.querySelector("title-bug")?.shadowRoot?.querySelector(".subtitle-field span")?.textContent) == 1) return;
	let button;
	if (isStarPlus) button = document.querySelector("[data-gv2elementkey=\"playNext\"]");
	else if (isDisney) button = document.querySelector("skip-overlay")?.shadowRoot?.querySelector("skip-button")?.shadowRoot?.querySelector("button");
	else button = document.evaluate("//span[contains(., 'Skip Intro')]", document, null, XPathResult.ANY_TYPE, null)?.iterateNext()?.parentElement;
	if (button) {
		console.log("Intro/Recap found", document.querySelector("[data-testid=\"icon-restart\"]"));
		button.click();
		console.log("Intro/Recap skipped", button);
		setTimeout(function() {
			addSkippedTime(time, video?.currentTime, "IntroTimeSkipped");
		}, 600);
	}
}
async function Disney_skipCredits(currentTime) {
	let button;
	if (isStarPlus) button = document.querySelector("[data-gv2elementkey=\"playNext\"]");
	else if (isDisney) button = document.querySelector("up-next-lite-v1")?.shadowRoot?.querySelector("button");
	else button = document.evaluate("//span[contains(., 'Next Episode')]", document, null, XPathResult.ANY_TYPE, null)?.iterateNext()?.parentElement;
	if (button) {
		const time = currentTime;
		if (time && lastAdTimeText != time) {
			lastAdTimeText = time;
			if (settings.value.Disney?.skipCredits) {
				button.click();
				console.log("Credits skipped", button);
				settings.value.Statistics.SegmentsSkipped++;
				sendMessage("increaseBadge", {}, "background");
				resetLastATimeText();
			}
		}
	}
}
async function Disney_addHomeButton() {
	const buttonDiv = document.querySelector("[data-testid=\"browser-action-button\"]")?.parentElement;
	if (buttonDiv && !document.querySelector("#homeButton")) {
		const homeButton = document.createElement("button");
		homeButton.textContent = "Home";
		homeButton.id = "homeButton";
		homeButton.style.cssText = "color: white;background-color: #40424A;border: rgb(64, 66, 74);border-radius: 5px;padding: 0 2px 0 2px;height: 56px;padding-left: 24px;padding-right: 24px;letter-spacing: 1.76px;font-size: 15px;  text-transform: uppercase;cursor: pointer;font-family:\"Avenir-World-for-Disney-Demi\", sans-serif;";
		homeButton.onmouseover = function() {
			homeButton.style.backgroundColor = "#474a53";
		};
		homeButton.onmouseout = function() {
			homeButton.style.backgroundColor = "#40424A";
		};
		homeButton.onclick = function() {
			globalThis.location.href = "/";
		};
		buttonDiv.appendChild(homeButton);
	}
}
async function Disney_Watch_Credits() {
	let button;
	if (isStarPlus) button = document.querySelector("[data-gv2elementkey=\"playNext\"]");
	else if (isDisney) button = document.querySelector("up-next-lite-v1")?.shadowRoot?.querySelector("button");
	else button = document.evaluate("//span[contains(., 'Next Episode')]", document, null, XPathResult.ANY_TYPE, null)?.iterateNext()?.parentElement;
	if (button) {
		let time;
		if (isDisney) time = /\d+/.exec(button?.textContent ?? "")?.[0];
		if (isHotstar && !document.evaluate("//span[contains(., 'My Space')]", document, null, XPathResult.ANY_TYPE, null)?.iterateNext() || time && lastAdTimeText != time) {
			const video = Array.from(document.querySelectorAll("video")).find((v) => v.checkVisibility());
			if (video) {
				video.click();
				lastAdTimeText = time ?? 0;
				console.log("Credits Watched", button);
				settings.value.Statistics.SegmentsSkipped++;
				sendMessage("increaseBadge", {}, "background");
				resetLastATimeText();
			}
		}
	}
}
var DisneySliderStyle = "pointer-events: auto;background: rgb(221, 221, 221);display: none;width:200px;z-index:1000;";
var DisneySpeedStyle = "height:20px;color:#f9f9f9;pointer-events: auto;padding: 0 5px;z-index:1000;";
async function Disney_SpeedSlider(video) {
	if (video) {
		document.querySelector("pointer-actions")?.style?.setProperty("z-index", "0");
		const disneyControls = document.querySelector("main-app-controls-overlay")?.shadowRoot;
		const alreadySlider = disneyControls?.querySelector("#videoSpeedSlider");
		if (!alreadySlider) {
			let position;
			if (isDisney) position = document?.querySelector("main-app-controls-overlay")?.shadowRoot?.querySelector(".experience-controls");
			else position = document.querySelector(".icon-player-landscape")?.parentElement?.parentElement?.parentElement?.parentElement;
			if (position) createSlider(video, videoSpeed, position, DisneySliderStyle, DisneySpeedStyle);
		} else {
			const speed = disneyControls?.querySelector("#videoSpeed");
			if (speed) {
				speed.onclick = function(event) {
					event.stopPropagation();
					event.preventDefault();
					event.stopImmediatePropagation();
					alreadySlider.style.display = alreadySlider.style.display === "block" ? "none" : "block";
				};
				watch(videoSpeed, (newValue) => {
					speed.textContent = newValue.toFixed(1) + "x";
					alreadySlider.value = (newValue * 10).toString();
				});
			}
			if (video.playbackRate !== Number.parseFloat(alreadySlider.value) / 10) video.playbackRate = Number.parseFloat(alreadySlider.value) / 10;
			alreadySlider.oninput = function(event) {
				event.stopPropagation();
				event.preventDefault();
				event.stopImmediatePropagation();
				const sliderValue = Number.parseFloat(alreadySlider.value);
				if (speed) speed.textContent = (sliderValue / 10).toFixed(1) + "x";
				video.playbackRate = sliderValue / 10;
				videoSpeed.value = sliderValue / 10;
			};
		}
	}
}
async function Disney_SpeedKeyboard() {
	const steps = settings.value.General.sliderSteps / 10;
	document.addEventListener("keydown", (event) => {
		const video = Array.from(document.querySelectorAll("video")).find((v) => v.checkVisibility());
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
async function Hotstar_doubleClick() {
	if (settings.value.Video?.doubleClick) document.ondblclick = function() {
		document.querySelector(".icon-player-landscape")?.closest("button")?.click();
		document.querySelector(".icon-player-portrait")?.closest("button")?.click();
	};
	else document.ondblclick = null;
}
startDisney();
//#endregion
