import { i as __toESM, t as require_browser_polyfill } from "./browser-polyfill.js";
import { r as useBrowserSyncStorage, t as defaultSettings } from "./storeTypes.js";
import { a as __spreadValues, c as PortMessage, d as decodeConnectionArgs, i as __spreadProps, l as createDeliveryLogger, n as createEndpointRuntime, o as formatEndpoint, r as createStreamWirings, s as parseEndpoint, t as require_browser_polyfill$1, u as createFingerprint } from "./browser-polyfill2.js";
//#region node_modules/webext-bridge/dist/background.js
var import_browser_polyfill$1 = /* @__PURE__ */ __toESM(require_browser_polyfill$1(), 1);
var pendingResponses = createDeliveryLogger();
var connMap = /* @__PURE__ */ new Map();
var oncePortConnectedCbs = /* @__PURE__ */ new Map();
var onceSessionEndCbs = /* @__PURE__ */ new Map();
var oncePortConnected = (endpointName, cb) => {
	oncePortConnectedCbs.set(endpointName, (oncePortConnectedCbs.get(endpointName) || /* @__PURE__ */ new Set()).add(cb));
	return () => {
		const su = oncePortConnectedCbs.get(endpointName);
		if ((su == null ? void 0 : su.delete(cb)) && (su == null ? void 0 : su.size) === 0) oncePortConnectedCbs.delete(endpointName);
	};
};
var onceSessionEnded = (sessionFingerprint, cb) => {
	onceSessionEndCbs.set(sessionFingerprint, (onceSessionEndCbs.get(sessionFingerprint) || /* @__PURE__ */ new Set()).add(cb));
};
var notifyEndpoint = (endpoint) => ({ withFingerprint: (fingerprint) => {
	const nextChain = (v) => ({ and: () => v });
	const notifications = {
		aboutIncomingMessage: (message) => {
			const recipient = connMap.get(endpoint);
			PortMessage.toExtensionContext(recipient.port, {
				status: "incoming",
				message
			});
			return nextChain(notifications);
		},
		aboutSuccessfulDelivery: (receipt) => {
			const sender = connMap.get(endpoint);
			PortMessage.toExtensionContext(sender.port, {
				status: "delivered",
				receipt
			});
			return nextChain(notifications);
		},
		aboutMessageUndeliverability: (resolvedDestination, message) => {
			const sender = connMap.get(endpoint);
			if ((sender == null ? void 0 : sender.fingerprint) === fingerprint) PortMessage.toExtensionContext(sender.port, {
				status: "undeliverable",
				resolvedDestination,
				message
			});
			return nextChain(notifications);
		},
		whenDeliverableTo: (targetEndpoint) => {
			const notifyDeliverability = () => {
				const origin = connMap.get(endpoint);
				if ((origin == null ? void 0 : origin.fingerprint) === fingerprint && connMap.has(targetEndpoint)) {
					PortMessage.toExtensionContext(origin.port, {
						status: "deliverable",
						deliverableTo: targetEndpoint
					});
					return true;
				}
			};
			if (!notifyDeliverability()) onceSessionEnded(fingerprint, oncePortConnected(targetEndpoint, notifyDeliverability));
			return nextChain(notifications);
		},
		aboutSessionEnded: (endedSessionFingerprint) => {
			const conn = connMap.get(endpoint);
			if ((conn == null ? void 0 : conn.fingerprint) === fingerprint) PortMessage.toExtensionContext(conn.port, {
				status: "terminated",
				fingerprint: endedSessionFingerprint
			});
			return nextChain(notifications);
		}
	};
	return notifications;
} });
var sessFingerprint = createFingerprint();
var endpointRuntime = createEndpointRuntime("background", (message) => {
	var _a;
	if (message.origin.context === "background" && ["content-script", "devtools "].includes(message.destination.context) && !message.destination.tabId) throw new TypeError("When sending messages from background page, use @tabId syntax to target specific tab");
	const resolvedSender = formatEndpoint(__spreadValues(__spreadValues({}, message.origin), message.origin.context === "window" && { context: "content-script" }));
	const resolvedDestination = formatEndpoint(__spreadProps(__spreadValues(__spreadValues({}, message.destination), message.destination.context === "window" && { context: "content-script" }), { tabId: message.destination.tabId || message.origin.tabId }));
	message.destination.tabId = null;
	message.destination.frameId = null;
	const dest = () => connMap.get(resolvedDestination);
	const sender = () => connMap.get(resolvedSender);
	const deliver = () => {
		var _a2;
		notifyEndpoint(resolvedDestination).withFingerprint(dest().fingerprint).aboutIncomingMessage(message);
		const receipt = {
			message,
			to: dest().fingerprint,
			from: {
				endpointId: resolvedSender,
				fingerprint: (_a2 = sender()) == null ? void 0 : _a2.fingerprint
			}
		};
		if (message.messageType === "message") pendingResponses.add(receipt);
		if (message.messageType === "reply") pendingResponses.remove(message.messageID);
		if (sender()) notifyEndpoint(resolvedSender).withFingerprint(sender().fingerprint).aboutSuccessfulDelivery(receipt);
	};
	if ((_a = dest()) == null ? void 0 : _a.port) deliver();
	else if (message.messageType === "message") {
		if (message.origin.context === "background") oncePortConnected(resolvedDestination, deliver);
		else if (sender()) notifyEndpoint(resolvedSender).withFingerprint(sender().fingerprint).aboutMessageUndeliverability(resolvedDestination, message).and().whenDeliverableTo(resolvedDestination);
	}
}, (message) => {
	const resolvedSender = formatEndpoint(__spreadValues(__spreadValues({}, message.origin), message.origin.context === "window" && { context: "content-script" }));
	const sender = connMap.get(resolvedSender);
	const receipt = {
		message,
		to: sessFingerprint,
		from: {
			endpointId: resolvedSender,
			fingerprint: sender.fingerprint
		}
	};
	notifyEndpoint(resolvedSender).withFingerprint(sender.fingerprint).aboutSuccessfulDelivery(receipt);
});
import_browser_polyfill$1.default.runtime.onConnect.addListener((incomingPort) => {
	var _a;
	const connArgs = decodeConnectionArgs(incomingPort.name);
	if (!connArgs) return;
	connArgs.endpointName || (connArgs.endpointName = formatEndpoint({
		context: "content-script",
		tabId: incomingPort.sender.tab.id,
		frameId: incomingPort.sender.frameId
	}));
	const { tabId: linkedTabId, frameId: linkedFrameId } = parseEndpoint(connArgs.endpointName);
	connMap.set(connArgs.endpointName, {
		fingerprint: connArgs.fingerprint,
		port: incomingPort
	});
	(_a = oncePortConnectedCbs.get(connArgs.endpointName)) == null || _a.forEach((cb) => cb());
	oncePortConnectedCbs.delete(connArgs.endpointName);
	onceSessionEnded(connArgs.fingerprint, () => {
		const rogueMsgs = pendingResponses.entries().filter((pendingMessage) => pendingMessage.to === connArgs.fingerprint);
		pendingResponses.remove(rogueMsgs);
		rogueMsgs.forEach((rogueMessage) => {
			if (rogueMessage.from.endpointId === "background") endpointRuntime.endTransaction(rogueMessage.message.transactionId);
			else notifyEndpoint(rogueMessage.from.endpointId).withFingerprint(rogueMessage.from.fingerprint).aboutSessionEnded(connArgs.fingerprint);
		});
	});
	incomingPort.onDisconnect.addListener(() => {
		var _a2, _b;
		if (((_a2 = connMap.get(connArgs.endpointName)) == null ? void 0 : _a2.fingerprint) === connArgs.fingerprint) connMap.delete(connArgs.endpointName);
		(_b = onceSessionEndCbs.get(connArgs.fingerprint)) == null || _b.forEach((cb) => cb());
		onceSessionEndCbs.delete(connArgs.fingerprint);
	});
	incomingPort.onMessage.addListener((msg) => {
		var _a2, _b;
		if (msg.type === "sync") {
			const allActiveSessions = [...connMap.values()].map((conn) => conn.fingerprint);
			const stillPending = msg.pendingResponses.filter((fp) => allActiveSessions.includes(fp.to));
			pendingResponses.add(...stillPending);
			msg.pendingResponses.filter((deliveryReceipt) => !allActiveSessions.includes(deliveryReceipt.to)).forEach((deliveryReceipt) => notifyEndpoint(connArgs.endpointName).withFingerprint(connArgs.fingerprint).aboutSessionEnded(deliveryReceipt.to));
			msg.pendingDeliveries.forEach((intendedDestination) => notifyEndpoint(connArgs.endpointName).withFingerprint(connArgs.fingerprint).whenDeliverableTo(intendedDestination));
			return;
		}
		if (msg.type === "deliver" && ((_b = (_a2 = msg.message) == null ? void 0 : _a2.origin) == null ? void 0 : _b.context)) {
			msg.message.origin.tabId = linkedTabId;
			msg.message.origin.frameId = linkedFrameId;
			endpointRuntime.handleMessage(msg.message);
		}
	});
});
var { sendMessage, onMessage } = endpointRuntime;
var { openStream, onOpenStreamChannel } = createStreamWirings(endpointRuntime);
//#endregion
//#region src/background/index.ts
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
var is_DEV = false;
async function migrateHideTitlesToHiddenTitles() {
	const { hideTitles } = await import_browser_polyfill.storage.sync.get("hideTitles");
	if (!hideTitles || typeof hideTitles !== "object" || Object.keys(hideTitles).length === 0) return;
	const { hiddenTitles } = await import_browser_polyfill.storage.local.get("hiddenTitles");
	const migrated = { ...hiddenTitles ?? {} };
	const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	for (const title of Object.keys(hideTitles)) if (!migrated[title]) migrated[title] = {
		platform: "Unknown",
		mediaType: null,
		posterPath: null,
		dateAdded: today
	};
	await import_browser_polyfill.storage.local.set({ hiddenTitles: migrated });
	await import_browser_polyfill.storage.sync.remove("hideTitles");
	console.log("migrated hideTitles to hiddenTitles", migrated);
}
import_browser_polyfill.runtime.onInstalled.addListener(async (opt) => {
	if (opt.reason === "install" && true) {
		await import_browser_polyfill.storage.local.clear();
		import_browser_polyfill.tabs.create({
			active: true,
			url: import_browser_polyfill.runtime.getURL("src/ui/options-page/index.html#/options-page/install")
		});
	}
	if (opt.reason === "update") await migrateHideTitlesToHiddenTitles();
	if (opt.reason === "update" && is_DEV);
});
self.onerror = function(message, source, lineno, colno, error) {
	console.info("Error: " + message);
	console.info("Source: " + source);
	console.info("Line: " + lineno);
	console.info("Column: " + colno);
	console.info("Error object: " + error);
};
console.log("background loaded");
var Badges = {};
var isMobile = /Android/i.test(navigator.userAgent);
var isFirefox = /Firefox/i.test(navigator.userAgent) && !!import_browser_polyfill?.webRequest?.onBeforeSendHeaders;
var action = import_browser_polyfill.action || import_browser_polyfill.browserAction;
action.setBadgeBackgroundColor({ color: "#e60010" });
async function increaseBadge(tabId) {
	if (Badges?.[tabId] === void 0 || typeof Badges[tabId] !== "number") Badges[tabId] = 0;
	Badges[tabId]++;
	console.log("increaseBadge");
	action.setBadgeText({
		text: Badges[tabId].toString(),
		tabId
	});
}
async function setBadgeText(text, tabId) {
	Badges[tabId] = text;
	action.setBadgeText({
		text,
		tabId
	});
}
onMessage("fetch", async (message) => {
	const { data } = message;
	try {
		let headers;
		if (data.type === "noAuth") headers = { accept: "application/json" };
		else if (data.type === "mal") headers = {
			accept: "application/json",
			"X-MAL-CLIENT-ID": "75ee4314348f04a8eebde73db852b136"
		};
		else if (data.type === "tmdb") headers = {
			accept: "application/json",
			Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWQyMWUxMmYzNjU1MjM4NzdhNTAwODVhMmVjYThiZiIsInN1YiI6IjY1M2E3Mjg3MjgxMWExMDBlYTA4NjI5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x_EaVXQkg1_plk0NVSBnoNUl4QlGytdeO613nXIsP3w`
		};
		else throw new Error(`Unknown fetch type: ${data.type}`);
		return await (await fetch(data.url, {
			method: "GET",
			headers
		})).json();
	} catch (error) {
		console.error(error);
		return { error: error.message };
	}
});
onMessage("setBadgeText", async (message) => {
	const { sender, data } = message;
	if (sender?.tabId) setBadgeText(data.text, sender.tabId);
});
onMessage("increaseBadge", async (message) => {
	const { sender } = message;
	if (sender?.tabId) increaseBadge(sender.tabId);
});
onMessage("resetBadge", async (message) => {
	const { sender } = message;
	if (sender?.tabId) {
		if (Badges[sender.tabId]) delete Badges[sender.tabId];
		action.setBadgeText({
			text: "",
			tabId: sender.tabId
		});
	}
});
if (isFirefox && isMobile) {
	const { data: settings, promise } = useBrowserSyncStorage("settings", defaultSettings);
	ChangeUserAgent();
	const newUa = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0 streamingEnhanced";
	function ReplaceUserAgent(details) {
		if (settings.value.Video.userAgent) {
			for (const header of details.requestHeaders) if (header.name === "User-Agent") {
				header.value = newUa;
				break;
			}
		}
		return { requestHeaders: details.requestHeaders };
	}
	async function ChangeUserAgent() {
		await promise;
		import_browser_polyfill.webRequest.onBeforeSendHeaders.addListener(ReplaceUserAgent, { urls: [
			"*://*.disneyplus.com/*",
			"*://*.starplus.com/*",
			"*://*.max.com/*",
			"*://*.hbomax.com/*",
			"*://*.primevideo.com/*",
			"*://*.amazon.com/gp/video/*",
			"*://*.amazon.co.jp/gp/video/*",
			"*://*.amazon.de/gp/video/*",
			"*://*.amazon.co.uk/gp/video/*"
		] }, ["blocking", "requestHeaders"]);
	}
}
//#endregion
