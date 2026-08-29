import { Ht as watch, vn as ref } from "./runtime-core.esm-bundler.js";
import { r as useBrowserSyncStorage, t as defaultSettings } from "./storeTypes.js";
import { c as startSharedFunctions, f as applyStretch, i as getCurrentEpisodeNumber, l as sendMessage, n as createSlider, s as parseAdTime, t as Platforms } from "./shared-functions.js";
//#region src/content-script/amazon.ts
var { data: settings, promise } = useBrowserSyncStorage("settings", defaultSettings);
var ua = navigator.userAgent;
var isMobile = /mobile|streamingEnhanced/i.test(ua);
var lastAdTimeText = 0;
var videoSpeed = ref(1);
var initialUrl = globalThis.location.href;
var hostname = globalThis.location.hostname;
var title = document.title;
var isPrimeVideo = /amazon|primevideo/i.test(hostname) && (/video/i.test(title) || /video/i.test(initialUrl));
var config = {
	attributes: true,
	childList: true,
	subtree: true
};
var AMAZON_PAID_CARD_SELECTOR = "article[data-card-entitlement=\"Unentitled\"]";
var AMAZON_STORE_ICON_SELECTOR = "svg.NbhXwl, [data-testid='entitlement-icon'] svg";
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
if (isPrimeVideo) {
	startSharedFunctions(Platforms.Amazon);
	startAmazon();
}
async function startAmazon() {
	await promise;
	logStartOfAddon();
	if (settings.value?.Video?.doubleClick) Amazon_doubleClick();
	if (settings.value.Amazon?.speedSlider) Amazon_SpeedKeyboard();
	AmazonObserver.observe(document, config);
	if (settings.value.Amazon?.selfAd) Amazon_selfAdTimeout();
	if (settings.value.Amazon?.skipAd) setTimeout(function() {
		Amazon_FreeveeTimeout();
	}, 1e3);
	if (settings.value.Video?.userAgent && isMobile) Amazon_customizeMobileView();
	if (settings.value.Amazon?.improveUI) Amazon_improveUI();
}
var AmazonVideoClass = ".dv-player-fullscreen video";
var AmazonObserver = new MutationObserver(Amazon);
function Amazon() {
	if (settings.value.Amazon?.filterPaid) Amazon_FilterPaid();
	const video = document.querySelector(AmazonVideoClass);
	if (settings.value.Amazon?.skipIntro) Amazon_Intro(video);
	if (settings.value.Amazon?.skipCredits) Amazon_Credits();
	if (settings.value.Amazon?.watchCredits) Amazon_Watch_Credits();
	if (settings.value.Amazon?.speedSlider) Amazon_SpeedSlider(video);
	if (settings.value.Amazon?.xray) Amazon_xray();
	if (settings.value.Video?.scrollVolume) Amazon_scrollVolume();
	applyStretch(video);
}
async function Amazon_scrollVolume() {
	const volumeControl = document.querySelector("[aria-label=\"Volume\"]:not(.enhanced)");
	if (volumeControl) {
		volumeControl.classList.add("enhanced");
		volumeControl?.addEventListener("wheel", (event) => {
			const video = document.querySelector(AmazonVideoClass);
			if (!video) return;
			let volume = video.volume;
			if (event.deltaY < 0) volume = Math.min(1, volume + .1);
			else volume = Math.max(0, volume - .1);
			video.volume = volume;
		});
	}
}
var lastIntroTime = -1;
function resetLastIntroTime() {
	setTimeout(() => {
		lastIntroTime = -1;
	}, 5e3);
}
function Amazon_Intro(video) {
	if (!reverseButtonClicked && lastIntroTime === -1 && getCurrentEpisodeNumber(document.querySelector("[data-testid=\"dp-atf-play-button\"]")?.textContent) != 1) {
		let button = document.querySelector("[class*=skipelement]");
		if (!button) button = Array.from(document.querySelectorAll("button")).find((button) => {
			const buttonText = button.textContent?.replace(/\s+/g, " ").trim().toLowerCase() ?? "";
			return buttonText === "vorspann überspringen" || buttonText === "pular abertura" || buttonText === "イントロをスキップ" || buttonText === "pomiń wstęp" || buttonText === "소개 건너뛰기" || buttonText === "jeneriği atla" || buttonText === "laktawan ang intro" || buttonText.includes("intro");
		});
		if (button?.checkVisibility() && !document.querySelector("[class*=nextupcard-button]")) {
			const time = Math.floor(video?.currentTime ?? 0);
			lastIntroTime = time;
			resetLastIntroTime();
			button.click();
			console.log("Intro skipped", button);
			setTimeout(function() {
				AmazonGobackbutton(video, button?.parentElement?.parentElement?.parentElement, time, video.currentTime);
				addSkippedTime(time, video.currentTime, "IntroTimeSkipped");
			}, 50);
		}
	}
}
var reverseButtonClicked = false;
async function AmazonGobackbutton(video, position, startTime, endTime) {
	if (position) {
		const button = document.createElement("button");
		button.style.cssText = "padding: 0px 22px; line-height: normal; min-width: 0px; z-index: 999; pointer-events: all;";
		button.setAttribute("class", "fqye4e3 f1ly7q5u fk9c3ap fz9ydgy f1xrlb00 f1hy0e6n fgbpje3 f1uteees f1h2a8xb  f1cg7427 fiqc9rt fg426ew f1ekwadg");
		button.dataset.uia = "reverse-button";
		button.textContent = "Rewind?";
		position?.appendChild(button);
		const buttonTimeout = setTimeout(() => {
			button?.remove();
		}, 5e3);
		function goBack() {
			reverseButtonClicked = true;
			video.currentTime = startTime;
			button?.remove();
			clearTimeout(buttonTimeout);
			console.log("stopped observing| Intro");
			const waitTime = endTime - startTime + 2;
			setTimeout(function() {
				reverseButtonClicked = false;
			}, waitTime * 1e3);
		}
		button.addEventListener("click", goBack);
	}
}
async function Amazon_Credits() {
	const button = document.querySelector("[class*=nextupcard-button]");
	if (button) {
		const newEpNumber = document.querySelector("[class*=nextupcard-episode]");
		if (newEpNumber?.textContent && !/(?<!\S)1(?!\S)/.exec(newEpNumber.textContent) && lastAdTimeText != newEpNumber.textContent) {
			lastAdTimeText = newEpNumber.textContent ?? "";
			resetLastATimeText();
			button.click();
			settings.value.Statistics.SegmentsSkipped++;
			sendMessage("increaseBadge", {}, "background");
			console.log("skipped Credits", button);
		}
	}
}
async function Amazon_Watch_Credits() {
	const button = document.querySelector("[class*=nextupcardhide-button]");
	if (button) {
		button.click();
		settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
		console.log("Watched Credits", button);
	}
}
var AmazonSliderStyle = "height: 1em;background: rgb(221, 221, 221);display: none;width:200px;";
async function Amazon_SpeedSlider(video) {
	if (video) {
		let pauseButton = void 0;
		const alreadySlider = document.querySelector(".dv-player-fullscreen #videoSpeedSlider");
		if (!alreadySlider) {
			let position = document.querySelector(".dv-player-fullscreen [class*=infobar-container]")?.firstChild?.lastChild;
			if (!position) {
				pauseButton = document.querySelector("#atvwebplayersdk-play-pause-button");
				position = pauseButton?.parentElement?.parentElement?.parentElement?.lastChild;
			}
			if (position) createSlider(video, videoSpeed, position, AmazonSliderStyle, "cursor: pointer;", "", pauseButton);
		} else {
			const speed = document.querySelector(".dv-player-fullscreen #videoSpeed");
			if (speed) {
				speed.onclick = function() {
					alreadySlider.style.display = alreadySlider.style.display === "block" ? "none" : "block";
				};
				watch(videoSpeed, (newValue) => {
					speed.textContent = newValue.toFixed(1) + "x";
					alreadySlider.value = (newValue * 10).toString();
				});
			}
			if (video.playbackRate != parseFloat(alreadySlider.value) / 10) video.playbackRate = parseFloat(alreadySlider.value) / 10;
			alreadySlider.oninput = function() {
				if (speed) speed.textContent = (parseFloat(alreadySlider.value) / 10).toFixed(1) + "x";
				video.playbackRate = parseFloat(alreadySlider.value) / 10;
			};
		}
	}
}
async function Amazon_SpeedKeyboard() {
	const steps = settings.value.General.sliderSteps / 10;
	document.addEventListener("keydown", (event) => {
		const video = document.querySelector(AmazonVideoClass);
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
var AMAZON_ALLOWED_FILTER_PATHS = /(storefront|genre|movie|amazon-video|\/tv|\/addons)/i;
function shouldRunAmazonPaidFilter(url) {
	return AMAZON_ALLOWED_FILTER_PATHS.test(url);
}
function isStoreIconTitle(title) {
	return /store/i.test(title ?? "");
}
function shouldRemoveWholePaidSection(visibleCardsCount, paidCardsCount, bannerOffset = 2) {
	if (visibleCardsCount <= 0 || paidCardsCount <= 0) return false;
	return visibleCardsCount - bannerOffset <= paidCardsCount;
}
async function Amazon_FilterPaid() {
	const currentUrl = globalThis.location.href;
	if (!shouldRunAmazonPaidFilter(currentUrl)) return;
	Array.from(document.querySelectorAll("section[data-testid*='carousel'] ul:has(svg.NbhXwl, [data-testid='entitlement-icon'] svg), ul:has(article[data-card-entitlement=\"Unentitled\"])")).forEach((a) => {
		deletePaidCategory(a);
	});
}
function hasPaidMarker(element) {
	if (element.querySelector(AMAZON_PAID_CARD_SELECTOR)) return true;
	return Array.from(element.querySelectorAll(AMAZON_STORE_ICON_SELECTOR)).some((icon) => {
		if (icon.classList.contains("NbhXwl")) return true;
		return isStoreIconTitle(icon.querySelector("title")?.textContent ?? "");
	});
}
async function deletePaidCategory(a) {
	const visibleCards = Array.from(a.children).filter((child) => {
		return child instanceof HTMLElement && child.tagName === "LI" && child.dataset.hidden !== "true";
	});
	const paidCards = visibleCards.filter((card) => hasPaidMarker(card));
	if (paidCards.length === 0) return;
	if (shouldRemoveWholePaidSection(visibleCards.length, paidCards.length)) {
		a.closest("section")?.remove();
		settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
	} else paidCards.forEach((b) => {
		b.remove();
		settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
	});
}
function Amazon_FreeveeTimeout() {
	const AdInterval = setInterval(function() {
		if (!settings.value.Amazon.skipAd) {
			console.log("stopped observing| FreeVee Ad");
			clearInterval(AdInterval);
			return;
		}
		const video = document.querySelector(AmazonVideoClass);
		if (video && !video.paused && video.currentTime > 0) skipAd(video);
	}, 100);
}
async function skipAd(video) {
	const adTimeText = document.querySelector(".dv-player-fullscreen .atvwebplayersdk-ad-timer-remaining-time");
	if (adTimeText?.checkVisibility()) {
		let adTime;
		adTime = parseAdTime(adTimeText?.childNodes?.[0]?.textContent);
		if (!adTime) adTime = parseAdTime(adTimeText?.childNodes?.[1]?.textContent);
		if (!document.querySelector(".fu4rd6c.f1cw2swo") && typeof adTime == "number" && adTime > 1 && !lastAdTimeText) {
			lastAdTimeText = adTime;
			const bigTime = 90;
			resetLastATimeText(adTime > bigTime ? 3e3 : 1e3);
			const skipTime = adTime > bigTime ? bigTime : adTime - 1;
			video.currentTime += skipTime;
			console.log("FreeVee Ad skipped, length:", skipTime, "s");
			settings.value.Statistics.AmazonAdTimeSkipped += skipTime;
			settings.value.Statistics.SegmentsSkipped++;
			sendMessage("increaseBadge", {}, "background");
		}
	}
}
async function resetLastATimeText(time = 1e3) {
	setTimeout(() => {
		lastAdTimeText = 0;
	}, time);
}
async function Amazon_selfAdTimeout() {
	const AdInterval = setInterval(function() {
		if (!settings.value.Amazon.selfAd) {
			console.log("stopped observing| Self Ad");
			clearInterval(AdInterval);
			return;
		}
		const video = document.querySelector(AmazonVideoClass);
		if (video) video.onplay = function() {
			const dvWebPlayer = document.querySelector("#dv-web-player");
			if (dvWebPlayer && getComputedStyle(dvWebPlayer).display != "none") {
				const button = document.querySelector(".fu4rd6c.f1cw2swo");
				if (button) {
					const adTime = parseInt(/:\d+/.exec(document.querySelector(".atvwebplayersdk-adtimeindicator-text")?.innerHTML ?? "")?.[0]?.substring(1) ?? "");
					setTimeout(() => {
						button.click();
						if (typeof adTime === "number") settings.value.Statistics.AmazonAdTimeSkipped += adTime;
						settings.value.Statistics.SegmentsSkipped++;
						sendMessage("increaseBadge", {}, "background");
						console.log("Self Ad skipped, length:", adTime, button);
					}, 150);
				}
			}
		};
	}, 100);
}
async function Amazon_customizeMobileView() {
	console.log("customizeMobileView");
	if (!globalThis.location.href.includes("/gp/video/detail/")) {
		const meta = document.createElement("meta");
		meta.name = "viewport";
		meta.content = "width=device-width, initial-scale=1";
		document.head.appendChild(meta);
		const navBelt = document.querySelector("#nav-belt");
		if (navBelt) {
			navBelt.style.width = "100vw";
			navBelt.style.display = "flex";
			navBelt.style.flexDirection = "column";
			navBelt.style.height = "fit-content";
		}
		const navMain = document.querySelector("#nav-main");
		if (navMain) navMain.style.display = "none";
	}
}
var lastClosedXrayUrl = "";
async function Amazon_xray() {
	if (lastClosedXrayUrl === window.location.href) return;
	const xrayButton = document.querySelector(".xrayVodHeaderTitle.expanded .arrow.show");
	if (xrayButton) {
		xrayButton.click();
		settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
		console.log("Xray closed", xrayButton);
		lastClosedXrayUrl = window.location.href;
	}
}
async function Amazon_doubleClick() {
	if (settings.value.Video?.doubleClick) document.ondblclick = function() {
		document.querySelector(".dv-player-fullscreen button[class*=fullscreen-button], button[aria-label*='Fullscreen'], button[aria-label*='Vollbild']")?.click();
	};
	else document.ondblclick = null;
}
var timer;
async function Amazon_improveUI() {
	const style = document.createElement("style");
	style.textContent = `
		.atvwebplayersdk-playpause-button,
		.atvwebplayersdk-fastseekback-button,
		.atvwebplayersdk-fastseekforward-button{
		  opacity: 0.45 !important;
		}
		.atvwebplayersdk-playpause-button:hover,
		.atvwebplayersdk-fastseekback-button:hover,
		.atvwebplayersdk-fastseekforward-button:hover{
		  opacity: 0.8 !important;
		}
		.f1makowq{
			opacity: 0 !important;
		}
	`;
	document.head.appendChild(style);
	document.addEventListener("scroll", () => {
		document.body.style.pointerEvents = "none";
	});
	document.addEventListener("scrollend", () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			document.body.style.pointerEvents = "auto";
		}, 400);
	});
}
//#endregion
export { isStoreIconTitle, shouldRemoveWholePaidSection, shouldRunAmazonPaidFilter };
