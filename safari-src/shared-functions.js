import { i as __toESM, t as require_browser_polyfill } from "./browser-polyfill.js";
import { Ht as watch } from "./runtime-core.esm-bundler.js";
import { n as useBrowserLocalStorage, r as useBrowserSyncStorage, t as defaultSettings } from "./storeTypes.js";
import { c as PortMessage, f as encodeConnectionArgs, l as createDeliveryLogger, n as createEndpointRuntime, r as createStreamWirings, t as require_browser_polyfill$1, u as createFingerprint } from "./browser-polyfill2.js";
//#region node_modules/webext-bridge/dist/chunk-E2HJRHOS.js
var import_browser_polyfill$1 = /* @__PURE__ */ __toESM(require_browser_polyfill$1(), 1);
var createPersistentPort = (name = "") => {
	const fingerprint = createFingerprint();
	let port;
	let undeliveredQueue = [];
	const pendingResponses = createDeliveryLogger();
	const onMessageListeners = /* @__PURE__ */ new Set();
	const onFailureListeners = /* @__PURE__ */ new Set();
	const handleMessage = (msg, port2) => {
		switch (msg.status) {
			case "undeliverable":
				if (!undeliveredQueue.some((m) => m.message.messageID === msg.message.messageID)) undeliveredQueue = [...undeliveredQueue, {
					message: msg.message,
					resolvedDestination: msg.resolvedDestination
				}];
				return;
			case "deliverable":
				undeliveredQueue = undeliveredQueue.reduce((acc, queuedMsg) => {
					if (queuedMsg.resolvedDestination === msg.deliverableTo) {
						PortMessage.toBackground(port2, {
							type: "deliver",
							message: queuedMsg.message
						});
						return acc;
					}
					return [...acc, queuedMsg];
				}, []);
				return;
			case "delivered":
				if (msg.receipt.message.messageType === "message") pendingResponses.add(msg.receipt);
				return;
			case "incoming":
				if (msg.message.messageType === "reply") pendingResponses.remove(msg.message.messageID);
				onMessageListeners.forEach((cb) => cb(msg.message, port2));
				return;
			case "terminated": {
				const rogueMsgs = pendingResponses.entries().filter((receipt) => msg.fingerprint === receipt.to);
				pendingResponses.remove(rogueMsgs);
				rogueMsgs.forEach(({ message }) => onFailureListeners.forEach((cb) => cb(message)));
			}
		}
	};
	const connect = () => {
		port = import_browser_polyfill$1.default.runtime.connect({ name: encodeConnectionArgs({
			endpointName: name,
			fingerprint
		}) });
		port.onMessage.addListener(handleMessage);
		port.onDisconnect.addListener(connect);
		PortMessage.toBackground(port, {
			type: "sync",
			pendingResponses: pendingResponses.entries(),
			pendingDeliveries: [...new Set(undeliveredQueue.map(({ resolvedDestination }) => resolvedDestination))]
		});
	};
	connect();
	return {
		onFailure(cb) {
			onFailureListeners.add(cb);
		},
		onMessage(cb) {
			onMessageListeners.add(cb);
		},
		postMessage(message) {
			PortMessage.toBackground(port, {
				type: "deliver",
				message
			});
		}
	};
};
//#endregion
//#region node_modules/webext-bridge/dist/chunk-ICLXI4BR.js
var promise$1;
var getMessagePort = (thisContext, namespace, onMessage) => promise$1 != null ? promise$1 : promise$1 = new Promise((resolve) => {
	const acceptMessagingPort = (event) => {
		const { data: { cmd, scope, context }, ports } = event;
		if (cmd === "webext-port-offer" && scope === namespace && context !== thisContext) {
			window.removeEventListener("message", acceptMessagingPort);
			ports[0].onmessage = onMessage;
			ports[0].postMessage("port-accepted");
			return resolve(ports[0]);
		}
	};
	const offerMessagingPort = () => {
		const channel = new MessageChannel();
		channel.port1.onmessage = (event) => {
			if (event.data === "port-accepted") {
				window.removeEventListener("message", acceptMessagingPort);
				return resolve(channel.port1);
			}
			onMessage?.(event);
		};
		window.postMessage({
			cmd: "webext-port-offer",
			scope: namespace,
			context: thisContext
		}, "*", [channel.port2]);
	};
	window.addEventListener("message", acceptMessagingPort);
	if (thisContext === "window") setTimeout(offerMessagingPort, 0);
	else offerMessagingPort();
});
var usePostMessaging = (thisContext) => {
	let allocatedNamespace;
	let messagingEnabled = false;
	let onMessageCallback;
	let portP;
	return {
		enable: () => messagingEnabled = true,
		onMessage: (cb) => onMessageCallback = cb,
		postMessage: async (msg) => {
			if (thisContext !== "content-script" && thisContext !== "window") throw new Error("Endpoint does not use postMessage");
			if (!messagingEnabled) throw new Error("Communication with window has not been allowed");
			ensureNamespaceSet(allocatedNamespace);
			return (await portP).postMessage(msg);
		},
		setNamespace: (nsps) => {
			if (allocatedNamespace) throw new Error("Namespace once set cannot be changed");
			allocatedNamespace = nsps;
			portP = getMessagePort(thisContext, nsps, ({ data }) => onMessageCallback == null ? void 0 : onMessageCallback(data));
		}
	};
};
function ensureNamespaceSet(namespace) {
	if (typeof namespace !== "string" || namespace.trim().length === 0) throw new Error(`webext-bridge uses window.postMessage to talk with other "window"(s) for message routingwhich is global/conflicting operation in case there are other scripts using webext-bridge. Call Bridge#setNamespace(nsps) to isolate your app. Example: setNamespace('com.facebook.react-devtools'). Make sure to use same namespace across all your scripts whereever window.postMessage is likely to be used\``);
}
//#endregion
//#region node_modules/webext-bridge/dist/content-script.js
var win = usePostMessaging("content-script");
var port = createPersistentPort();
var endpointRuntime = createEndpointRuntime("content-script", (message) => {
	if (message.destination.context === "window") win.postMessage(message);
	else port.postMessage(message);
});
win.onMessage((message) => {
	message.origin = {
		context: "window",
		tabId: null
	};
	endpointRuntime.handleMessage(message);
});
port.onMessage(endpointRuntime.handleMessage);
port.onFailure((message) => {
	if (message.origin.context === "window") {
		win.postMessage({
			type: "error",
			transactionID: message.transactionId
		});
		return;
	}
	endpointRuntime.endTransaction(message.transactionId);
});
var { sendMessage, onMessage } = endpointRuntime;
var { openStream, onOpenStreamChannel } = createStreamWirings(endpointRuntime);
//#endregion
//#region src/content-script/shared-functions.ts
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
console.log("shared-functions loaded");
var { data: settings, promise } = useBrowserSyncStorage("settings", defaultSettings);
var { data: hiddenTitles, promise: hiddenTitlesPromise } = useBrowserLocalStorage("hiddenTitles", {}, false);
var date = /* @__PURE__ */ new Date();
var today = date.toISOString().split("T")[0];
var ua = navigator.userAgent;
var isMobile = /mobile|streamingEnhanced/i.test(ua);
var url = globalThis.location.href;
var hostname = globalThis.location.hostname;
var title = document.title;
var isPrimeVideo = /amazon|primevideo/i.test(hostname) && (/video/i.test(title) || /video/i.test(url));
var isNetflix = /netflix/i.test(hostname);
var isDisney = /disneyplus|starplus/i.test(hostname);
var isHotstar = /hotstar|jiostar|jiocinema/i.test(hostname);
var isHBO = /max.com/i.test(hostname);
var isParamount = /paramount/i.test(hostname) || /paramountplus/i.test(hostname);
var htmlLang = document.documentElement.lang;
var AmazonVideoClass = ".dv-player-fullscreen video";
var DBCache = {};
var Platforms = /* @__PURE__ */ function(Platforms) {
	Platforms["Netflix"] = "netflix";
	Platforms["Amazon"] = "amazon";
	Platforms["StarPlus"] = "starplus";
	Platforms["Disney"] = "disney";
	Platforms["Hotstar"] = "hotstar";
	Platforms["Crunchyroll"] = "crunchyroll";
	Platforms["HBO"] = "hbo";
	Platforms["Paramount"] = "paramount";
	return Platforms;
}({});
async function startSharedFunctions(platform) {
	if (platform == "amazon") isPrimeVideo = true;
	if (platform == "netflix") isNetflix = true;
	if (platform == "disney") isDisney = true;
	if (platform == "hotstar") isHotstar = true;
	if (platform == "hbo") isHBO = true;
	if (platform == "paramount") isParamount = true;
	await promise;
	if (isNetflix || isPrimeVideo) {
		await hiddenTitlesPromise;
		console.log("hiddenTitles", hiddenTitles.value);
	}
	if (settings.value.Video.playOnFullScreen) startPlayOnFullScreen();
	getDBCache();
}
function getCurrentEpisodeNumber(title) {
	if (!title) return null;
	const nums = title.match(/\d+/g)?.map(Number) ?? [];
	if (nums.length === 0) return null;
	return nums.at(-1);
}
async function getDBCache() {
	DBCache = (await import_browser_polyfill.storage.local.get("DBCache"))?.DBCache;
	if (typeof DBCache !== "object") {
		console.log("DBCache not found, creating new one", DBCache);
		try {
			await import_browser_polyfill.storage.local.set({ DBCache: {} });
		} catch (error) {
			console.log(error);
		}
		DBCache = {};
	}
	if (isNetflix) {
		if (settings.value.Netflix?.showRating || settings.value.Netflix?.hideTitles) startShowRatingInterval(settings.value.Netflix?.showRating, settings.value.Netflix?.hideTitles);
	} else if (isDisney || isHotstar) {
		if (settings.value.Disney?.showRating || settings.value.Disney?.hideTitles) startShowRatingInterval(settings.value.Disney?.showRating, settings.value.Disney?.hideTitles);
	} else if (isPrimeVideo) {
		if (settings.value.Amazon?.showRating || settings.value.Amazon?.hideTitles) startShowRatingInterval(settings.value.Amazon?.showRating, settings.value.Amazon?.hideTitles);
	} else if (isHBO && settings.value.HBO?.showRating) startShowRatingInterval();
	else if (isParamount && settings.value.Paramount?.showRating) startShowRatingInterval();
	if (getDiffInDays(settings.value.General.GCdate, date) >= GCdiff) garbageCollection();
	import_browser_polyfill.storage.onChanged.addListener(function(changes, areaName) {
		if (areaName === "local" && changes?.DBCache) DBCache = changes.DBCache.newValue;
	});
}
async function setDBCache() {
	const megaBytes = new TextEncoder().encode(JSON.stringify(DBCache)).length / 1024 / 1024;
	if (megaBytes < 5) {
		console.log("updateDBCache size:", megaBytes.toFixed(4) + " MB");
		await import_browser_polyfill.storage.local.set({ DBCache });
	} else {
		console.log("DBCache cleared", megaBytes);
		DBCache = {};
		await import_browser_polyfill.storage.local.set({ DBCache });
	}
}
var GCdiff = 30;
async function garbageCollection() {
	console.log("garbageCollection started, deleting old ratings:");
	const keys = Object.keys(DBCache);
	for (const key of keys) if (getDiffInDays(DBCache[key].date, date) >= GCdiff || DBCache[key].db != "tmdb") {
		console.log(DBCache[key].date, key);
		delete DBCache[key];
	}
	settings.value.General.GCdate = today;
	setDBCache();
}
function parseAdTime(adTimeText) {
	if (!adTimeText) return false;
	const adTime = Number.parseInt(/:\d+/.exec(adTimeText ?? "")?.[0].substring(1) ?? "") + Number.parseInt(/\d+/.exec(adTimeText ?? "")?.[0] ?? "") * 60;
	if (Number.isNaN(adTime)) return false;
	return adTime;
}
function createSlider(video, videoSpeed, position, sliderStyle, speedStyle, divStyle = "", cleanupTarget = null) {
	videoSpeed.value = videoSpeed.value || video.playbackRate;
	const slider = document.createElement("input");
	slider.id = "videoSpeedSlider";
	slider.type = "range";
	slider.min = settings.value.General.sliderMin.toString();
	slider.max = settings.value.General.sliderMax.toString();
	slider.value = (videoSpeed.value * 10).toString();
	slider.step = settings.value.General.sliderSteps.toString();
	slider.style.cssText = sliderStyle;
	const speed = document.createElement("p");
	speed.id = "videoSpeed";
	speed.textContent = videoSpeed.value ? videoSpeed.value.toFixed(1) + "x" : "1.0x";
	watch(videoSpeed, (newValue) => {
		speed.textContent = newValue.toFixed(1) + "x";
		slider.value = (newValue * 10).toString();
	});
	speed.style.cssText = speedStyle;
	if (divStyle) {
		const div = document.createElement("div");
		div.style.cssText = divStyle;
		div.appendChild(slider);
		div.appendChild(speed);
		position.prepend(div);
	} else position.prepend(slider, speed);
	if (cleanupTarget) {
		const cleanup = () => {
			if (divStyle) slider.parentElement?.remove();
			else {
				slider.remove();
				speed.remove();
			}
		};
		const cleanupObserver = new MutationObserver(() => {
			if (!cleanupTarget.isConnected) {
				cleanup();
				cleanupObserver.disconnect();
			}
		});
		cleanupObserver.observe(document.body ?? document.documentElement, {
			childList: true,
			subtree: true
		});
		if (!cleanupTarget.isConnected) {
			cleanup();
			cleanupObserver.disconnect();
		}
	}
	if (videoSpeed.value) video.playbackRate = videoSpeed.value;
	speed.onclick = function(event) {
		event.stopPropagation();
		event.preventDefault();
		event.stopImmediatePropagation();
		slider.style.display = slider.style.display === "block" ? "none" : "block";
	};
	slider.onclick = function(event) {
		event.stopPropagation();
		event.preventDefault();
		event.stopImmediatePropagation();
	};
	slider.oninput = function(event) {
		event.stopPropagation();
		event.preventDefault();
		event.stopImmediatePropagation();
		const sliderValue = Number.parseFloat(slider.value);
		speed.textContent = (sliderValue / 10).toFixed(1) + "x";
		video.playbackRate = sliderValue / 10;
		videoSpeed.value = sliderValue / 10;
	};
	return {
		slider,
		speed
	};
}
async function getMovieInfo(title, card, media_type = null, year = null) {
	const locale = htmlLang || navigator?.language || "en-US";
	const queryType = media_type ?? "multi";
	let url = `https://api.themoviedb.org/3/search/${queryType}?query=${encodeURIComponent(title)}&include_adult=false&language=${locale}&page=1`;
	if (year) url += `&year=${year}`;
	const data = await sendMessage("fetch", {
		url,
		type: "tmdb"
	}, "background");
	if (data != void 0) {
		if (data?.results) data.results = data.results?.filter((item) => item.media_type?.toLowerCase() !== "person");
		const movie = data?.results?.[0];
		const compiledData = {
			id: movie?.id,
			media_type: queryType == "multi" ? movie?.media_type : queryType,
			score: movie?.vote_average,
			vote_count: movie?.vote_count,
			release_date: movie?.release_date || movie?.first_air_date,
			title: movie?.title || movie?.original_title || movie?.name || movie?.original_name,
			poster_path: movie?.poster_path ?? null,
			date: today,
			db: "tmdb"
		};
		DBCache[title] = compiledData;
		setRatingOnCard(card, compiledData, title);
	}
}
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/g;
function showRating() {
	if (isDisney) {
		url = globalThis.location.href;
		if (url.includes("search")) return false;
		if (url.includes("entity")) {
			const SelectedTab = document.querySelector("[aria-selected=\"true\"]");
			return uuidRegex.test(SelectedTab?.id?.split("_control")?.[0] ?? "") && SelectedTab?.getAttribute("aria-label") != "EXTRAS";
		}
		return true;
	} else if (isPrimeVideo) {
		if (globalThis.location.href.includes("detail")) return document.querySelector("[data-testid=\"btf-related-tab\"]")?.getAttribute("tabIndex") == "0";
		return true;
	} else return true;
}
async function startShowRatingInterval(optionShowRating = true, optionHideTitles = false) {
	if (showRating()) addRating(optionShowRating, optionHideTitles);
	const RatingInterval = setInterval(function() {
		if (isNetflix) {
			optionShowRating = settings.value.Netflix?.showRating;
			optionHideTitles = settings.value.Netflix?.hideTitles;
		} else if (isDisney || isHotstar) {
			optionShowRating = settings.value.Disney?.showRating;
			optionHideTitles = settings.value.Disney?.hideTitles;
		} else if (isPrimeVideo) {
			optionShowRating = settings.value.Amazon?.showRating;
			optionHideTitles = settings.value.Amazon?.hideTitles;
		}
		if (isNetflix && !(settings.value.Netflix?.showRating || settings.value.Netflix?.hideTitles) || isPrimeVideo && !(settings.value.Amazon?.showRating || settings.value.Amazon?.hideTitles) || (isDisney || isHotstar) && !(settings.value.Disney?.showRating || settings.value.Disney?.hideTitles) || isHBO && !settings.value.HBO?.showRating || isParamount && !settings.value.Paramount?.showRating) {
			console.log("stopped adding Rating");
			clearInterval(RatingInterval);
			return;
		}
		if (showRating()) addRating(optionShowRating, optionHideTitles);
	}, 1e3);
}
function getDiffInDays(firstDate, secondDate) {
	if (!firstDate || !secondDate) return 31;
	return Math.round(Math.abs(new Date(secondDate).getTime() - new Date(firstDate).getTime()) / 864e5);
}
function useDBCache(title, card, media_type) {
	if (!DBCache[title]?.date) DBCache[title].date = today;
	const vote_count = DBCache[title]?.vote_count || 100;
	const diffInReleaseDate = vote_count < 100 && getDiffInDays(DBCache[title].date, date) > 1 && getDiffInDays(DBCache[title]?.release_date, date) <= 50;
	if (getDiffInDays(DBCache[title].date, date) >= GCdiff || diffInReleaseDate) {
		if (diffInReleaseDate) console.log("update recent movie:", title, ",refresh:", getDiffInDays(DBCache[title].date, date), ",Age:", getDiffInDays(DBCache[title]?.release_date, date), "Vote count:", vote_count);
		else console.log("update old rating:", title, ",Age:", getDiffInDays(DBCache[title].date, date));
		getMovieInfo(title, card, media_type);
	} else setRatingOnCard(card, DBCache[title], title);
}
function Amazon_getMediaType(type) {
	if (!type) return null;
	if (type.toLowerCase().includes("tv")) return "tv";
	if (type.toLowerCase().includes("movie")) return "movie";
	return null;
}
function getAllTitleCardsTypes() {
	let AllTitleCardsTypes = [];
	if (isNetflix) AllTitleCardsTypes = [document.querySelectorAll("a[data-uia=\"standard-card\"]:not(.imdb), a[data-uia=\"progress-card\"]:not(.imdb)")];
	else if (isDisney) AllTitleCardsTypes = [document.querySelectorAll("a[data-testid='set-item']:not([href^='/browse/page']):not(.imdb)")];
	else if (isHotstar) AllTitleCardsTypes = [document.querySelectorAll("[data-testid='tray-card-default']:not(.imdb), [data-testid='tray-horizontal-card-hover']:not(.imdb)")];
	else if (isHBO) AllTitleCardsTypes = [document.querySelectorAll("a[class*='StyledTileLinkNormal-']:not(.imdb)")];
	else if (isParamount) AllTitleCardsTypes = [document.querySelectorAll("a[href*='/shows']:not(.imdb), a[href*='/movies']:not(.imdb)")];
	else if (isPrimeVideo) AllTitleCardsTypes = [document.querySelectorAll("li article[data-card-title]:not([data-card-entity-type='EVENT']):not([data-card-title='Live-TV']):not(:has(#rating))"), document.querySelectorAll("article[data-testid*='-card']:not(:has(#rating))")];
	return AllTitleCardsTypes;
}
function isElementVisible(el) {
	if (!el) return false;
	const rect = el.getBoundingClientRect();
	return rect.bottom > 0 && rect.right > 0 && rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.left < (window.innerWidth || document.documentElement.clientWidth);
}
async function addRating(showRating, optionHideTitles) {
	url = globalThis.location.href;
	const AllTitleCardsTypes = getAllTitleCardsTypes();
	let lastTitle = "";
	let updateDBCache = false;
	for (let type = 0; type < AllTitleCardsTypes.length; type++) {
		const titleCards = AllTitleCardsTypes[type];
		for (let i = 0; i < titleCards.length; i++) {
			const card = titleCards[i];
			if (isNetflix || isDisney || isHotstar || isHBO || isParamount) card.classList.add("imdb");
			else if (isPrimeVideo) {
				if (type == 0) card?.closest("li")?.classList.add("imdb");
				else if (type == 1) card?.classList.add("imdb");
			}
			const media_type = getMediaType(card);
			const title = getCleanTitle(card, type);
			if (!title) continue;
			if (optionHideTitles) {
				if (hiddenTitles.value[title]) {
					let item;
					if (isNetflix) item = card.closest("[data-virtual-slot]") || card.parentElement;
					else if (isDisney) item = card.parentElement;
					else if (isHotstar) item = card.closest("[data-testid='tray-card-default']") || card.closest("a") || card.parentElement;
					else if (isPrimeVideo) item = card.closest("li");
					if (item) {
						if (item.style.display === "none") continue;
						item.style.display = "none";
					}
					settings.value.Statistics.SegmentsSkipped++;
					sendMessage("increaseBadge", {}, "background");
					console.log("hidden Title", title);
					continue;
				}
				if (isDisney || isHotstar || isPrimeVideo) addHideTitleButton(card, title, media_type, type);
			}
			if (showRating && (!isDisney || !card?.classList.contains("_1p76x1y4"))) {
				if (lastTitle != title && !title.includes("Netflix") && !title.includes("Prime Video")) {
					lastTitle = title;
					if ((DBCache[title]?.score || getDiffInDays(DBCache[title]?.date, date) <= 7) && (!media_type || DBCache[title]?.media_type == media_type)) useDBCache(title, card, media_type);
					else if (!isElementVisible(card)) {
						if (isNetflix || isDisney || isHotstar || isHBO || isParamount) card.classList.remove("imdb");
						else if (isPrimeVideo) {
							if (type == 0) card?.closest("li")?.classList.remove("imdb");
							else if (type == 1) card?.classList.remove("imdb");
						}
						continue;
					} else {
						getMovieInfo(title, card, media_type);
						updateDBCache = true;
					}
				}
			}
		}
	}
	if (updateDBCache) setTimeout(function() {
		setDBCache();
	}, 5e3);
}
function addHideTitleButton(card, title, mediaType, cardType = 0) {
	let target;
	if (isHotstar) target = card.closest("[data-testid='tray-card-default']") || card.closest("[data-testid='tray-horizontal-card-hover']") || card;
	else if (isPrimeVideo) target = cardType == 0 ? card?.querySelector("[data-testid=\"packshot\"]") : card;
	else target = card.parentElement;
	if (!target || target.querySelector("#hideTitleButton")) return;
	if (isPrimeVideo && getComputedStyle(target).position === "static") target.style.position = "relative";
	const button = document.createElement("button");
	button.id = "hideTitleButton";
	button.textContent = "X";
	button.style.cssText = "position: absolute; top: 0; right: 0; background: transparent; color: white; border: none; font-size: 12px;text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; z-index: 10;";
	button.onclick = function(event) {
		event.stopPropagation();
		event.preventDefault();
		const item = target;
		if (item) {
			if (isDisney || isHotstar) item.style.display = "none";
			else if (isPrimeVideo) {
				const li = card.closest("li");
				if (li) li.style.display = "none";
			}
		}
		hiddenTitles.value[title] = {
			platform: isPrimeVideo ? "Amazon" : "Disney",
			mediaType,
			posterPath: DBCache[title]?.poster_path ?? null,
			dateAdded: today
		};
	};
	target.appendChild(button);
}
function getMediaType(card) {
	let media_type = null;
	if (isNetflix) {
		if (url.includes("genre/83")) media_type = "tv";
		else if (url.includes("genre/34399")) media_type = "movie";
	} else if (isDisney) {
		if (url.includes("browse/series")) media_type = "tv";
		else if (url.includes("browse/movies")) media_type = "movie";
		else if (/(Staffel)|(Nummer)|(Season)|(Episod)|(Number)/g.test(title ?? "")) media_type = "tv";
	} else if (isParamount) {
		const href = card.getAttribute("href") || "";
		if (href.includes("/shows/")) media_type = "tv";
		else if (href.includes("/movies/")) media_type = "movie";
	} else if (isHBO) {
		const href = card.getAttribute("href") || "";
		if (href.includes("show") || href.includes("series")) media_type = "tv";
		else if (href.includes("movie")) media_type = "movie";
	} else if (isPrimeVideo) {
		if (url.includes("video/tv")) media_type = "tv";
		else if (url.includes("video/movie")) media_type = "movie";
		else media_type = Amazon_getMediaType(card.dataset.cardEntityType ?? "");
	} else if (isHotstar) {
		if (url.includes("/movies/")) media_type = "movie";
		else if (url.includes("/tv-shows/")) media_type = "tv";
	}
	return media_type;
}
function getCleanTitle(card, type) {
	let title;
	if (isNetflix) title = card?.getAttribute("aria-label")?.split(" (")[0];
	else if (isDisney) {
		const prompt = card.querySelector("div[data-testid=\"hero-carousel-prompt\"]");
		if (prompt?.textContent) title = Disney_fixTitle(card?.getAttribute("aria-label")?.replace(" " + prompt.textContent, ""));
		else title = Disney_fixTitle(card?.getAttribute("aria-label") ?? void 0);
		if (url.includes("entity")) {
			if (document.querySelector("[aria-selected=\"true\"]")?.id.split("_control")[0] != card.closest("div[role=\"tabpanel\"]")?.id) title = "";
		}
	} else if (isHotstar) {
		title = (card?.querySelector("[data-testid='action']")?.getAttribute("aria-label") || card?.querySelector("a")?.getAttribute("aria-label") || card?.getAttribute("aria-label") || card?.getAttribute("alt") || card.querySelector("img")?.getAttribute("alt") || card.querySelector("[data-testid='card-hover-title-cutout'] img")?.getAttribute("alt") || card.querySelector("span")?.textContent || "").replaceAll(/(S\d+\sE\d+)/g, "").split(",")[0].replace(/\s\d+$/, "").trim();
		if (!title || [
			"show",
			"movie",
			"live",
			"episode",
			"special",
			"free"
		].includes(title.toLowerCase())) title = void 0;
	} else if (isPrimeVideo) {
		if (card.querySelector("a")?.href?.includes("detail")) {
			if (type == 0) title = Amazon_fixTitle(card.dataset.cardTitle ?? "");
			else if (type == 1) title = Amazon_fixTitle(card.querySelector("a")?.getAttribute("aria-label") ?? "");
		}
	} else if (isHBO) {
		const href = card.getAttribute("href") || "";
		if (href.includes("show") || href.includes("series") || href.includes("movie") || href.includes("topical") || href.includes("standalone")) title = card.querySelector("p[class*='md_strong-']")?.textContent ?? "";
	} else if (isParamount) title = card.getAttribute("title") ?? "";
	return title;
}
var Brands = String.raw`Hulu Original Series|Disney\+ Original|STAR (?:Original|Generic)|ZDF Enterprises`;
var Badge = String.raw`New(?: (?:Episode|Movie|Series))? Badge|`;
var DISNEY_TITLE_RE_EN = new RegExp([
	String.raw`^`,
	String.raw`(?:Number\s+\d+\s+)?`,
	String.raw`(?:(?:`,
	String.raw`Catch Up on the Series|`,
	Badge,
	Brands,
	String.raw`)\s+)*`,
	String.raw`\s*`,
	String.raw`(?<title>[\s\S]+?)`,
	String.raw`(?=`,
	String.raw`\s+(?:`,
	String.raw`Season\b|New Episode\b|Rated\b|Released\b|Coming\b|Prepare\b|Catch Up on the Series|`,
	Badge,
	String.raw`Select for details on this title\.|`,
	String.raw`\d+\s+hour\b|\d+\s+minutes remaining\b|`,
	Brands,
	String.raw`)`,
	String.raw`|$`,
	String.raw`)`
].join(""));
var DISNEY_TITLE_RE_DE = new RegExp([
	String.raw`^`,
	String.raw`(?:Nummer\s+\d+\s+)?`,
	String.raw`(?:(?:${Brands})\s+)*`,
	String.raw`(?:Label:\s+(?:Neuer Film|Neue Serie|Neue Folge|Neu)\s+)*`,
	String.raw`\s*`,
	String.raw`(?!Nur\s+noch\s+\d+\s+Sekunden\b)`,
	String.raw`(?<title>[\s\S]+?)`,
	String.raw`(?=`,
	String.raw`\s+(?:`,
	String.raw`Jetzt\s+aufholen\b|Altersfreigabe:|Erscheinungsjahr:|Genre:|Label:|`,
	String.raw`Ab\b|ab\b|Neue Folge\b|Mach\s+dich\s+bereit\b|`,
	String.raw`Für\s+Details\s+zu\s+diesem\s+Titel\s+auswählen\.|`,
	String.raw`Staffel\b|Folge\b|Noch\b|\d+\s*Stunde\b|\d+\s*Stunden\b|\d+\s*Minuten\b|`,
	Brands,
	String.raw`)`,
	String.raw`|$`,
	String.raw`)`
].join(""), "u");
function Disney_fixTitle(title) {
	const regex = htmlLang == "de" ? DISNEY_TITLE_RE_DE : DISNEY_TITLE_RE_EN;
	return title?.match(regex)?.groups?.title?.trim();
}
function Amazon_fixTitle(title) {
	return title?.split(" - ")[0]?.split(" – ")[0]?.replaceAll(/(S\d+)/g, "")?.replaceAll(/ \[.*\]/g, "")?.replaceAll(/\s\(.*\)/g, "")?.replaceAll(/:?\sStaffel-?\s\d+/g, "")?.replaceAll(/:?\sSeason-?\s\d+/g, "")?.replaceAll(/ \/ \d/g, "")?.split(": Die komplette")[0]?.split(": The complete")[0];
}
function getColorForRating(rating, lowVoteCount) {
	if (!rating || lowVoteCount) return "grey";
	for (const threshold of settings.value.General.RatingThresholds) if (rating <= threshold.value) return threshold.color;
}
function getIsTransparent(rating, lowVoteCount) {
	if (!settings.value.Video?.dimLowRatings) return false;
	if ((!rating || rating <= settings.value.General.RatingThresholds[0].value) && !lowVoteCount) return true;
	return false;
}
function getTMDBUrl(id, media_type) {
	return `https://www.themoviedb.org/${media_type}/${id}`;
}
async function setRatingOnCard(card, data, title) {
	let div;
	if (data?.id) {
		if (isHotstar) {
			div = document.createElement("div");
			div.style.cursor = "pointer";
			div.onclick = (event) => {
				event.stopPropagation();
				event.preventDefault();
				window.open(getTMDBUrl(data.id, data.media_type), "_blank");
			};
		} else {
			const a = document.createElement("a");
			a.href = getTMDBUrl(data.id, data.media_type);
			a.target = "_blank";
			div = a;
		}
	} else div = document.createElement("div");
	const vote_count = data?.vote_count || 0;
	div.id = "rating";
	let zIndexValue = "2";
	if (isDisney) zIndexValue = "";
	else if (isPrimeVideo) zIndexValue = "3";
	Object.assign(div.style, {
		position: "absolute",
		bottom: "0",
		color: "black",
		textDecoration: "none",
		background: getColorForRating(data?.score, vote_count < 50),
		borderRadius: "5px",
		padding: "0 2px 0 2px",
		right: isNetflix ? "0.2vw" : "0",
		zIndex: zIndexValue,
		fontSize: isMobile ? "4vw" : "1vw"
	});
	if (data?.score >= 0) {
		let releaseDate = "";
		if (settings.value.Video?.showYear && data?.release_date) releaseDate = new Date(data?.release_date).getFullYear() + "-";
		div.textContent = releaseDate + data.score?.toFixed(1);
		div.setAttribute("alt", "Filtered title: " + title + ", Fetched title: " + data?.title + ", media_type: " + data?.media_type + ", Vote count: " + vote_count);
	} else {
		div.textContent = "?";
		div.setAttribute("alt", "Filtered title: " + title + (data?.title ? ", Fetched title: " + data?.title : "") + (data?.media_type ? ", media_type: " + data?.media_type : ""));
		console.log("no score found:", title, data, card);
	}
	const greyOverlay = document.createElement("div");
	Object.assign(greyOverlay.style, {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: "rgba(40, 40, 40, 0.7)",
		pointerEvents: "none",
		zIndex: 2
	});
	if (isNetflix) {
		const titleCardContainer = card.closest("div[data-virtual-slot]");
		if (titleCardContainer) {
			titleCardContainer.appendChild(div);
			if (getIsTransparent(data?.score, vote_count < 50)) titleCardContainer.appendChild(greyOverlay);
		}
	} else if (isHBO) {
		card.appendChild(div);
		if (getIsTransparent(data?.score, vote_count < 50)) card.appendChild(greyOverlay);
	} else if (isParamount) {
		card.style.position = "unset";
		card.appendChild(div);
		if (getIsTransparent(data?.score, vote_count < 50)) card.appendChild(greyOverlay);
	} else if (isDisney) {
		const parentDiv = card?.closest("div");
		if (parentDiv) {
			if (card.nextElementSibling && card.nextElementSibling.id != "hideTitleButton") {
				div.style.top = card.offsetHeight + "px";
				div.style.bottom = "";
			}
			parentDiv.style.position = "relative";
			parentDiv.appendChild(div);
			if (getIsTransparent(data?.score, vote_count < 50)) parentDiv.appendChild(greyOverlay);
		}
	} else if (isHotstar) {
		const targetContainer = card;
		if (targetContainer && !targetContainer.querySelector("#rating")) {
			div.style.zIndex = "10";
			targetContainer.appendChild(div);
			if (getIsTransparent(data?.score, vote_count < 50)) targetContainer.appendChild(greyOverlay);
		}
	} else if (isPrimeVideo) {
		let position = card;
		if (card.dataset.cardTitle) position = card?.firstChild?.firstChild;
		else if (card.querySelector("div[data-testid=\"title-metadata-main\"]")) position = card.querySelector("div[data-testid=\"title-metadata-main\"]");
		position?.appendChild(div);
		if (getIsTransparent(data?.score, vote_count < 50)) position?.appendChild(greyOverlay);
	}
}
function OnFullScreenChange() {
	let video;
	if (isDisney) video = Array.from(document.querySelectorAll("video")).find((v) => v.checkVisibility());
	else if (isNetflix || isHotstar || isHBO || isParamount) video = document.querySelector("video");
	else video = document.querySelector(AmazonVideoClass);
	if (document.fullscreenElement && video) {
		video.play();
		console.log("auto-played on fullscreen");
		settings.value.Statistics.SegmentsSkipped++;
		sendMessage("increaseBadge", {}, "background");
	}
}
async function startPlayOnFullScreen() {
	if (settings.value.Video?.playOnFullScreen) addEventListener("fullscreenchange", OnFullScreenChange);
	else removeEventListener("fullscreenchange", OnFullScreenChange);
}
//#endregion
export { getDiffInDays as a, startSharedFunctions as c, getCurrentEpisodeNumber as i, sendMessage as l, createSlider as n, getIsTransparent as o, getColorForRating as r, parseAdTime as s, Platforms as t };
