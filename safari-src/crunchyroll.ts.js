import { i as __toESM, t as require_browser_polyfill } from "./browser-polyfill.js";
import { Cn as toRaw, vn as ref } from "./runtime-core.esm-bundler.js";
import { r as useBrowserSyncStorage, t as defaultSettings } from "./storeTypes.js";
import { a as getDiffInDays, c as startSharedFunctions, f as applyStretch, l as sendMessage, n as createSlider, o as getIsTransparent, r as getColorForRating, t as Platforms } from "./shared-functions.js";
//#region src/content-script/crunchyroll.ts
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
startSharedFunctions(Platforms.Crunchyroll);
var { data: settings, promise } = useBrowserSyncStorage("settings", defaultSettings);
var { data: crunchyList, promise: crunchyListPromise } = useBrowserSyncStorage("crunchyList", [], false);
var url = globalThis.location.href;
var date = /* @__PURE__ */ new Date();
var today = date.toISOString().split("T")[0];
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
async function startCrunchyroll() {
	await promise;
	await crunchyListPromise;
	logStartOfAddon();
	if (settings.value.Crunchyroll.releaseCalendar) Crunchyroll_ReleaseCalendar();
	if (settings.value.Crunchyroll.profile) {
		const pickInterval = setInterval(function() {
			Crunchyroll_AutoPickProfile();
		}, 100);
		setTimeout(function() {
			clearInterval(pickInterval);
		}, 2e3);
	}
	if (settings.value.Video.playOnFullScreen) startPlayOnFullScreen();
	if (settings.value.Video.doubleClick) startdoubleClick();
	if (settings.value.Crunchyroll.speedSlider) Crunchyroll_SpeedKeyboard();
	CrunchyrollObserver.observe(document, config);
	getMALCache();
}
var MALCache = {};
var MALGCdiff = 30;
function getMALUrl(id) {
	return `https://myanimelist.net/anime/${id}`;
}
async function getMALCache() {
	MALCache = (await import_browser_polyfill.storage.local.get("MALCache"))?.MALCache;
	if (typeof MALCache !== "object") {
		console.log("MALCache not found, creating new one", MALCache);
		try {
			await import_browser_polyfill.storage.local.set({ MALCache: {} });
		} catch (error) {
			console.log(error);
		}
		MALCache = {};
	}
	if (settings.value.Crunchyroll?.showRating) startMALRatingInterval();
	if (getDiffInDays(settings.value.General.MALGCdate, date) >= MALGCdiff) malGarbageCollection();
	import_browser_polyfill.storage.onChanged.addListener(function(changes, areaName) {
		if (areaName === "local" && changes?.MALCache) MALCache = changes.MALCache.newValue;
	});
}
async function setMALCache() {
	const megaBytes = new TextEncoder().encode(JSON.stringify(MALCache)).length / 1024 / 1024;
	if (megaBytes < 5) await import_browser_polyfill.storage.local.set({ MALCache });
	else {
		console.log("MALCache cleared", megaBytes);
		MALCache = {};
		await import_browser_polyfill.storage.local.set({ MALCache });
	}
}
async function malGarbageCollection() {
	console.log("malGarbageCollection started, deleting old ratings:");
	const keys = Object.keys(MALCache);
	for (const key of keys) if (getDiffInDays(MALCache[key].date, date) >= MALGCdiff) delete MALCache[key];
	settings.value.General.MALGCdate = today;
	setMALCache();
}
var MAL_MAX_QUERY_LENGTH = 64;
function getMALSearchQuery(title) {
	return title.split(":")[0].trim().slice(0, MAL_MAX_QUERY_LENGTH).trim();
}
async function getMALInfo(title, card) {
	const searchUrl = `https://api.myanimelist.net/v2/anime?q=${encodeURIComponent(getMALSearchQuery(title))}&limit=1&fields=mean,num_scoring_users,media_type,start_date,main_picture`;
	const data = await sendMessage("fetch", {
		url: searchUrl,
		type: "mal"
	}, "background");
	const node = data?.data?.[0]?.node;
	if (!node) console.log("MAL: no match or fetch error for", title, data);
	const compiledData = {
		id: node?.id ?? 0,
		title: node?.title ?? title,
		score: node?.mean ?? null,
		num_scoring_users: node?.num_scoring_users ?? 0,
		media_type: node?.media_type ?? "",
		start_date: node?.start_date ?? "",
		poster: node?.main_picture?.medium ?? null,
		date: today
	};
	MALCache[title] = compiledData;
	setMALRatingOnCard(card, compiledData);
	setMALCache();
}
function setMALRatingOnCard(card, data) {
	if (card.querySelector("#mal-rating")) return;
	const a = data?.id ? document.createElement("a") : document.createElement("div");
	a.id = "mal-rating";
	if (data?.id) {
		a.href = getMALUrl(data.id);
		a.target = "_blank";
	}
	const voteCount = data.num_scoring_users || 0;
	const score = data.score ?? 0;
	Object.assign(a.style, {
		position: "absolute",
		bottom: "0",
		right: "0.2vw",
		color: "black",
		textDecoration: "none",
		background: getColorForRating(score, voteCount < 50),
		borderRadius: "5px",
		padding: "0 2px 0 2px",
		zIndex: "2",
		fontSize: "1vw"
	});
	if (data.score) {
		let releaseText = "";
		if (settings.value.Video?.showYear && data.start_date) releaseText = new Date(data.start_date).getFullYear() + "-";
		a.textContent = releaseText + data.score.toFixed(1);
	} else a.textContent = "?";
	card.style.position = "relative";
	card.appendChild(a);
	if (getIsTransparent(score, voteCount < 50)) {
		const greyOverlay = document.createElement("div");
		Object.assign(greyOverlay.style, {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			bottom: "0",
			background: "rgba(40, 40, 40, 0.7)",
			pointerEvents: "none",
			zIndex: "1"
		});
		card.appendChild(greyOverlay);
	}
}
var MAL_NO_MATCH_RETRY_DAYS = 1;
function addMALRating() {
	document.querySelectorAll("div[data-t~=\"series-card\"]:not(.mal-rated)").forEach((cardEl) => {
		const card = cardEl;
		card.classList.add("mal-rated");
		const title = card.querySelector("h3[data-t=\"title\"] a")?.textContent?.trim();
		if (!title) return;
		const cached = MALCache[title];
		const cacheTtlDays = cached?.id ? MALGCdiff : MAL_NO_MATCH_RETRY_DAYS;
		if (cached && getDiffInDays(cached.date, date) < cacheTtlDays) setMALRatingOnCard(card, cached);
		else getMALInfo(title, card);
	});
}
async function startMALRatingInterval() {
	addMALRating();
	const MALRatingInterval = setInterval(function() {
		if (!settings.value.Crunchyroll?.showRating) {
			console.log("stopped observing| MAL Rating");
			clearInterval(MALRatingInterval);
			return;
		}
		addMALRating();
	}, 1e3);
}
var CrunchyrollObserver = new MutationObserver(Crunchyroll);
async function Crunchyroll() {
	if (settings.value.Crunchyroll?.profile) Crunchyroll_profile();
	const video = document.querySelector("video");
	if (!video) return;
	if (settings.value.Crunchyroll?.bigPlayer) Crunchyroll_bigPlayerStyle();
	const time = video?.currentTime;
	Crunchyroll_Intro_Outro(video, time);
	if (settings.value.Crunchyroll?.speedSlider) Crunchyroll_SpeedSlider(video);
	if (settings.value.Video?.scrollVolume) Crunchyroll_scrollVolume(video);
	applyStretch(video);
}
async function Crunchyroll_profile() {
	const img = document.querySelector(".avatar-wrapper img");
	if (img && img.src !== settings.value.General.Crunchyroll_profilePicture) {
		settings.value.General.Crunchyroll_profilePicture = img.src;
		console.log("Profile switched to", img.src);
	}
}
async function Crunchyroll_AutoPickProfile() {
	if (document.querySelector(".profile-item-name")) document.querySelectorAll(".erc-profile-item img")?.forEach((element) => {
		const img = element;
		if (img.src === settings.value.General.Crunchyroll_profilePicture) {
			img.click();
			console.log("Profile automatically chosen:", img.src);
			settings.value.Statistics.SegmentsSkipped++;
			sendMessage("increaseBadge", {}, "background");
		}
	});
}
var styleId = "enhanced-crunchyroll-big-player-style";
async function Crunchyroll_bigPlayerStyle() {
	if (document.getElementById(styleId)) return;
	const style = document.createElement("style");
	style.id = styleId;
	style.textContent = `
      .video-player-wrapper{
					max-height: calc(100vw / 1.7777);
          height: 100vh;
      }
			[class^="app-layout__header"] {
					position: absolute;
          top: 0;
          width: 100%;
          height: 3.75rem;
          z-index: 999;
			}
      .erc-large-header {
          position: absolute;
          top: 0;
          width: 100%;
          height: 3.75rem;
          z-index: 999;
      }
      .erc-large-header .header-content {
          position: absolute;
          top: -3.75rem;
          transition: top 0.4s, top 0.4s;
      }
      .erc-large-header:hover .header-content {
          top: 0;
      }
  `;
	document.head.appendChild(style);
}
async function Crunchyroll_scrollVolume(video) {
	const volumeControl = document.querySelector("[data-testid=\"bottom-left-controls-stack\"]:not(.enhanced) [data-testid=\"volume-slider-container\"]");
	if (volumeControl) {
		volumeControl?.parentElement?.classList.add("enhanced");
		volumeControl.addEventListener("wheel", (event) => {
			event.preventDefault();
			let volume = video.volume;
			if (event.deltaY < 0) volume = Math.min(1, volume + .1);
			else volume = Math.max(0, volume - .1);
			video.volume = volume;
		});
	}
}
function OnFullScreenChange() {
	const video = document.querySelector("video");
	if (document.fullscreenElement && video) {
		video.play();
		console.log("auto-played on fullscreen");
		settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
	}
}
async function startPlayOnFullScreen() {
	if (settings.value.Video?.playOnFullScreen) {
		console.log("started observing| PlayOnFullScreen");
		addEventListener("fullscreenchange", OnFullScreenChange);
	} else {
		console.log("stopped observing| PlayOnFullScreen");
		removeEventListener("fullscreenchange", OnFullScreenChange);
	}
}
function shouldBlockPreviewSkip(ariaLabel, skipAfterCredits) {
	return !skipAfterCredits && (ariaLabel?.toLowerCase().includes("preview") ?? false);
}
var skipped = false;
var reverseButtonClicked = false;
var reverseButtonStartTime;
var reverseButtonEndTime;
async function Crunchyroll_Intro_Outro(video, time) {
	if (video.paused || video.currentTime <= 2) return;
	const isOutro = time > video.duration / 2;
	if (!settings.value.Crunchyroll?.skipIntro && !isOutro) return;
	if (!settings.value.Crunchyroll?.skipCredits && isOutro) return;
	if (!reverseButtonClicked) {
		const button = document.querySelector("button:has(svg[data-testid=\"skip-intro-icon\"])");
		const ariaLabel = button?.getAttribute("aria-label");
		if (button && button.checkVisibility({ opacityProperty: true }) && !skipped && !ariaLabel?.toLowerCase()?.includes("recap")) {
			skipped = true;
			setTimeout(function() {
				if (isOutro && settings.value.Crunchyroll?.skipAfterCredits) {
					const nextEpButton = document.querySelector("[data-testid=\"next-episode-button\"]");
					if (nextEpButton) {
						nextEpButton.click();
						console.log("Outro skipped", nextEpButton);
					} else {
						button?.click();
						console.log("Outro skipped", button);
					}
				} else if (shouldBlockPreviewSkip(ariaLabel, !!settings.value.Crunchyroll?.skipAfterCredits)) console.log("After-credits preview left alone (skipAfterCredits disabled)", button);
				else {
					button?.click();
					console.log("Intro skipped", button, settings.value.General.Crunchyroll_skipTimeout);
					setTimeout(function() {
						CrunchyrollGobackbutton(time, video?.currentTime);
						addSkippedTime(time, video?.currentTime, "IntroTimeSkipped");
					}, 600);
				}
				setTimeout(function() {
					skipped = false;
				}, 2e3);
			}, settings.value.General.Crunchyroll_skipTimeout);
		}
	} else if (!document.querySelector(".reverse-button")) addButton(reverseButtonStartTime, reverseButtonEndTime);
}
function addButton(startTime, endTime) {
	if (reverseButtonClicked) return;
	const button = document.createElement("div");
	button.setAttribute("class", "reverse-button kat:inline-flex kat:items-center kat:justify-center kat:rounded-full kat:border kat:border-solid kat:ps-24 kat:pe-24 kat:pt-12 kat:pb-12 kat:text-sm kat:font-semibold kat:leading-none kat:transition-colors kat:duration-200 kat:outline-none kat:cursor-pointer kat:disabled:cursor-not-allowed kat:bg-neutral-50 kat:border-transparent kat:text-neutral-900 kat:hover:bg-neutral-200 kat:active:bg-neutral-300 kat:focus-visible:ring-4 kat:focus-visible:ring-taupe-600 kat:disabled:bg-neutral-600 kat:disabled:text-neutral-400 kat:z-1001 kat:gap-4 kat:min-w-161 kat:h-44 kat:shadow-lg kat:self-end kat:mr-40 kat:pointer-events-auto");
	button.textContent = "Rewind?";
	const buttonTimeout = setTimeout(() => {
		button.remove();
	}, 5e3);
	button.onclick = function() {
		reverseButtonClicked = true;
		const reverseButton = document.querySelector("[data-testid=\"jump-backward-button\"]");
		const clicksNeeded = Math.ceil((endTime - startTime) / 10);
		for (let i = 0; i < clicksNeeded; i++) reverseButton?.click();
		button.remove();
		clearTimeout(buttonTimeout);
		const waitTime = endTime - startTime + 2;
		setTimeout(function() {
			reverseButtonClicked = false;
		}, waitTime * 1e3);
	};
	const position = document.querySelector("[data-testid=\"player-controls-root\"]")?.querySelector("[data-testid=\"bottom-controls-autohide\"]");
	if (position) position.before(button);
}
async function CrunchyrollGobackbutton(startTime, endTime) {
	reverseButtonStartTime = startTime;
	reverseButtonEndTime = endTime;
	addButton(startTime, endTime);
}
var videoSpeed = ref(1);
var CrunchyrollSliderStyle = "display: none;margin: auto;width:200px;";
var CrunchyrollSpeedStyle = "color: white;margin: auto;padding: 0 5px;width: 40px;";
async function Crunchyroll_SpeedSlider(video) {
	if (video) {
		if (!document.querySelector("#videoSpeedSlider")) {
			const position = document.querySelector("[data-testid=\"bottom-right-controls-stack\"]");
			if (position) {
				createSlider(video, videoSpeed, position, CrunchyrollSliderStyle, CrunchyrollSpeedStyle);
				document.querySelector("button[data-testid=\"playback-speed-button\"]")?.remove();
			}
		} else video.playbackRate = videoSpeed.value;
	}
}
async function Crunchyroll_SpeedKeyboard() {
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
async function startdoubleClick() {
	document.ondblclick = function() {
		document.querySelector("button[data-testid=\"fullscreen-button\"]")?.click();
	};
}
function setReleaseRemoved(element) {
	element.classList.add("removed");
	element.style.display = "none";
}
function showAllElements() {
	document.querySelectorAll("li article.release.js-release").forEach((element) => {
		if (!element.parentElement) return;
		element.parentElement.classList.remove("removed");
		element.parentElement.style.display = "block";
	});
}
var langs = [
	"English",
	"Deutsch",
	"Français",
	"Japanese",
	"French",
	"German",
	"América Latina",
	"Portuguese",
	"Português",
	"Spanish",
	"Indonesian",
	"Italian",
	"Castilian",
	"Russian",
	"España",
	"Italiano",
	"Brasil",
	"普通话",
	"Русский"
];
var filterNoDubs = "all";
var filterAllDubs = "none";
var dubLanguageRegex = /\(([^()\d]+?)(?:\s+Dub)?\)(?!.*\([^()]*\))/;
function titleContainsDub(title) {
	const isDub = title?.includes("Dub") || /[^(]*\(\D*\)[^(]*/g.test(title) || title?.includes("Audio");
	if (isDub) {
		const dubLanguage = dubLanguageRegex.exec(title)?.[1]?.trim();
		if (dubLanguage && !langs.includes(dubLanguage)) langs.push(dubLanguage);
	}
	return isDub;
}
function titleContainsAllowedDub(title) {
	const selectedDubLanguage = settings.value.Crunchyroll.dubLanguage;
	if (selectedDubLanguage === filterNoDubs) return true;
	else if (selectedDubLanguage === filterAllDubs) return false;
	return title?.includes(selectedDubLanguage);
}
var getTitle = (el) => el?.textContent?.trim() ?? "";
var getEpisodeRegex = /(\d+)(?!.*\d)/;
function filterFunctions() {
	const showsByTitle = /* @__PURE__ */ new Map();
	const list = document.querySelectorAll("li article.release.js-release");
	list.forEach((element, index) => {
		if (!element.parentElement) return;
		if (!element?.checkVisibility()) {
			element.parentElement.classList.add("removed");
			return;
		}
		const titleElement = element?.querySelector("cite[itemprop='name']");
		const title = getTitle(titleElement);
		if (titleElement?.textContent) titleElement.textContent = title.replace(/Season \d*/, "");
		const queuedFlag = element.querySelector("div.queue-flag:not(.queued)");
		const premiereFlag = element.querySelector("div.premiere-flag");
		const episodeNumber = Number.parseInt(element.querySelector("a.available-episode-link")?.textContent?.match(getEpisodeRegex)?.[1] ?? "-1");
		if (titleContainsDub(title) && !titleContainsAllowedDub(title)) setReleaseRemoved(element.parentElement);
		else if (settings.value.Crunchyroll.filterQueued && queuedFlag && !premiereFlag) setReleaseRemoved(element.parentElement);
		else if (settings.value.Crunchyroll.filterDuplicates) {
			if (showsByTitle.has(title)) showsByTitle.get(title)?.push({
				index,
				episode: episodeNumber
			});
			else showsByTitle.set(title, [{
				index,
				episode: episodeNumber
			}]);
		}
	});
	showsByTitle.forEach((shows) => {
		if (shows.length > 1) {
			shows.sort((a, b) => {
				const episodeDiff = b.episode - a.episode;
				if (episodeDiff !== 0) return episodeDiff;
				return a.index - b.index;
			});
			shows.slice(1).forEach((show) => {
				const element = list[show.index];
				if (element.parentElement) setReleaseRemoved(element.parentElement);
			});
		}
	});
}
function createFilterElement(filterType, filterText, settingsValue) {
	const label = document.createElement("label");
	const span = document.createElement("span");
	span.style.display = "flex";
	span.style.alignItems = "center";
	const input = document.createElement("input");
	input.type = "checkbox";
	input.checked = settingsValue;
	input.id = filterType;
	input.onclick = function() {
		settings.value.Crunchyroll[filterType] = input.checked;
		showAllElements();
		filterFunctions();
	};
	const p = document.createElement("p");
	p.style.width = "100px";
	p.textContent = filterText;
	label.appendChild(span);
	span.appendChild(input);
	span.appendChild(p);
	return label;
}
function createDubLanguageSelectElement() {
	const label = document.createElement("label");
	const span = document.createElement("span");
	span.style.display = "flex";
	span.style.alignItems = "start";
	span.style.flexDirection = "column";
	const select = document.createElement("select");
	select.id = "filterDubLanguage";
	const selectedDubLanguage = settings.value.Crunchyroll.dubLanguage || filterAllDubs;
	const options = [
		filterAllDubs,
		filterNoDubs,
		...langs
	];
	options.forEach((lang) => {
		const option = document.createElement("option");
		option.value = lang;
		option.textContent = lang;
		select.appendChild(option);
	});
	select.value = selectedDubLanguage;
	if (!options.includes(selectedDubLanguage)) {
		select.value = filterAllDubs;
		settings.value.Crunchyroll.dubLanguage = filterAllDubs;
	}
	select.onchange = function() {
		settings.value.Crunchyroll.dubLanguage = select.value;
		showAllElements();
		filterFunctions();
	};
	const p = document.createElement("p");
	p.textContent = "Show these dubs:";
	label.appendChild(span);
	span.appendChild(p);
	span.appendChild(select);
	return label;
}
function addButtons() {
	const toggleForm = document.querySelector("#filter_toggle_form");
	if (!toggleForm?.firstElementChild) return;
	toggleForm.style.display = "flex";
	toggleForm.firstElementChild.appendChild(createDubLanguageSelectElement());
	toggleForm.firstElementChild.appendChild(createFilterElement("filterQueued", "Show Playlist only", settings.value.Crunchyroll.filterQueued));
	toggleForm.firstElementChild.appendChild(createFilterElement("filterDuplicates", "Filter Duplicates", settings.value.Crunchyroll.filterDuplicates));
}
function addShowsToList(position, list) {
	list.forEach((element) => {
		const article = document.createElement("article");
		article.className = "release js-release";
		const time = document.createElement("time");
		time.className = "available-time";
		time.textContent = new Date(element.time).toLocaleString([], {
			hour: "2-digit",
			minute: "2-digit"
		});
		const div1 = document.createElement("div");
		const div2 = document.createElement("div");
		div2.className = "queue-flag queued";
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "0 0 48 48");
		const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
		use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "/i/svg/simulcastcalendar/calendar_icons.svg#cr_bookmark");
		svg.appendChild(use);
		div2.appendChild(svg);
		const h1 = document.createElement("h1");
		h1.className = "season-name";
		const a = document.createElement("a");
		a.className = "js-season-name-link";
		a.href = element?.href || "";
		a.setAttribute("itemprop", "url");
		const cite = document.createElement("cite");
		cite.setAttribute("itemprop", "name");
		cite.textContent = element?.name || "";
		a.appendChild(cite);
		h1.appendChild(a);
		div1.appendChild(div2);
		div1.appendChild(h1);
		article.appendChild(time);
		article.appendChild(div1);
		position.appendChild(article);
	});
}
function clickOnCurrentDay() {
	const days = document.querySelectorAll(".specific-date [datetime]");
	for (const day of days) {
		const dateOnPage = new Date(day?.getAttribute("datetime") ?? "");
		if (date.getDay() == dateOnPage.getDay()) {
			day.closest("li.day")?.classList.add("active");
			return date.toLocaleDateString() == dateOnPage.toLocaleDateString();
		}
	}
	return false;
}
function createLocalList() {
	const localList = [];
	document.querySelectorAll("ol.releases li:not(.removed) article.release.js-release").forEach((element) => {
		const queuedFlag = element.querySelector("div.queue-flag:not(.queued)");
		if (element.querySelector("div.premiere-flag") && !queuedFlag) return;
		const h1 = element.querySelector("h1.season-name a");
		const name = h1?.firstChild?.nextSibling?.textContent;
		const href = h1?.href;
		const time = element.firstElementChild?.getAttribute("datetime") ?? "";
		localList.push({
			href,
			name,
			time
		});
	});
	return localList;
}
function filterOldList(isCurrentWeek, localList) {
	let oldList = toRaw(crunchyList.value);
	const lastElement = localList.at(-1);
	if (!lastElement?.time) return oldList;
	const lastTime = new Date(lastElement.time);
	const [lastDay, lastHr, lastMin] = [
		lastTime.getDay(),
		lastTime.getHours(),
		lastTime.getMinutes()
	];
	if (!isCurrentWeek) oldList = [];
	else oldList = oldList.filter((item) => {
		return item && shiftSunday(date.getDay()) - shiftSunday(new Date(item.time).getDay()) <= 0;
	}).filter((item) => {
		const itemTime = new Date(item.time);
		const itemHr = itemTime.getHours();
		const itemDay = itemTime.getDay();
		return lastDay != itemDay || itemDay != date.getDay() || itemHr > lastHr || itemHr == lastHr && itemTime.getMinutes() > lastMin;
	});
	return oldList;
}
var shiftSunday = (a) => (a + 6) % 7;
function addSavedCrunchyList() {
	const localList = createLocalList();
	const isCurrentWeek = clickOnCurrentDay();
	const oldList = localList.length > 0 ? filterOldList(isCurrentWeek, localList) : toRaw(crunchyList.value);
	crunchyList.value = localList.concat(oldList);
	if (isCurrentWeek) document.querySelectorAll("section.calendar-day").forEach((element) => {
		const datetime = element.querySelector("time")?.getAttribute("datetime") ?? "";
		const weekday = new Date(datetime).getDay();
		if (shiftSunday(date.getDay()) - shiftSunday(weekday) < 0) element?.children?.[1]?.firstChild?.nextSibling?.remove();
		addShowsToList(element.children[1], oldList.filter((item) => new Date(item.time).getDay() == weekday));
	});
}
async function Crunchyroll_ReleaseCalendar() {
	if (url.includes("simulcastcalendar")) {
		filterFunctions();
		if (!document.querySelector("#filterQueued")) addButtons();
		addSavedCrunchyList();
	}
}
startCrunchyroll();
//#endregion
export { getEpisodeRegex, shouldBlockPreviewSkip };
