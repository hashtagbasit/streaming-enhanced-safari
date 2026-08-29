// Stands in for the WebExtension APIs the bundled extension expects.
// Runs before browser-polyfill.js, which passes a plain-object `browser`
// straight through when runtime.id is present rather than wrapping `chrome`.
(function () {
	if (globalThis.__seShimInstalled) return;
	globalThis.__seShimInstalled = true;

	const bridge = globalThis.webkit && globalThis.webkit.messageHandlers && globalThis.webkit.messageHandlers.se;
	const call = (name, payload) =>
		bridge ? bridge.postMessage({ name, payload }) : Promise.reject(new Error("native bridge missing"));

	const changeListeners = [];

	function normalizeKeys(keys) {
		if (keys == null) return null;
		if (typeof keys === "string") return [keys];
		if (Array.isArray(keys)) return keys;
		return Object.keys(keys);          // object form supplies defaults
	}

	function area(name) {
		return {
			async get(keys) {
				const wanted = normalizeKeys(keys);
				const stored = await call("storage.get", { area: name, keys: wanted });
				// The object form of get() carries defaults for missing keys.
				if (keys && typeof keys === "object" && !Array.isArray(keys)) {
					for (const k of Object.keys(keys)) if (stored[k] === undefined) stored[k] = keys[k];
				}
				return stored;
			},
			async set(items) {
				await call("storage.set", { area: name, items });
				const changes = {};
				for (const k of Object.keys(items)) changes[k] = { newValue: items[k] };
				for (const fn of changeListeners) { try { fn(changes, name); } catch (e) { console.error(e); } }
			},
			async remove(keys) { await call("storage.remove", { area: name, keys: normalizeKeys(keys) }); },
			async clear() { await call("storage.clear", { area: name }); },
		};
	}

	const noopEvent = { addListener() {}, removeListener() {}, hasListener: () => false };

	const port = {
		name: "",
		onMessage: noopEvent,
		onDisconnect: noopEvent,
		postMessage() {},
		disconnect() {},
	};

	const browserShim = {
		runtime: {
			id: "notch-cinema",
			getURL: (path) => path,
			getManifest: () => ({ version: "1.1.105", manifest_version: 3 }),
			connect: () => port,
			sendMessage: async () => undefined,
			onMessage: noopEvent,
			onConnect: noopEvent,
			onInstalled: noopEvent,
			lastError: null,
		},
		storage: {
			sync: area("sync"),
			local: area("local"),
			onChanged: {
				addListener(fn) { changeListeners.push(fn); },
				removeListener(fn) {
					const i = changeListeners.indexOf(fn);
					if (i >= 0) changeListeners.splice(i, 1);
				},
				hasListener: (fn) => changeListeners.includes(fn),
			},
		},
		// Badges have nowhere to go in this host.
		action: { setBadgeText: async () => {}, setBadgeBackgroundColor: async () => {} },
		permissions: { contains: async () => true, request: async () => true },
		tabs: { create: async () => ({}), query: async () => [] },
	};

	globalThis.browser = browserShim;
	globalThis.chrome = browserShim;

	globalThis.__seLog = function (msg) {
		try { call("log", { msg: String(msg) }); } catch (e) {}
		console.log("[notch-cinema]", msg);
	};

	// position:fixed cannot be trusted here - these players have transformed
	// ancestors, which makes a fixed element resolve against that ancestor
	// rather than the viewport (the video lands in a corner). Use the real
	// Fullscreen API instead, which needs a genuine user gesture, hence the
	// keydown path rather than a menu item.
	globalThis.__seVideoFullscreen = function (fit) {
		const v = document.querySelector("video");
		if (!v) { globalThis.__seLog("fullscreen: no video element found"); return "no video"; }
		if (fit) v.style.setProperty("object-fit", fit, "important");
		const req = v.requestFullscreen || v.webkitRequestFullscreen;
		if (!req) { globalThis.__seLog("fullscreen: API unavailable on video"); return "unsupported"; }
		try {
			req.call(v);
			globalThis.__seLog("fullscreen: requested (object-fit " + fit + ")");
			return "requested";
		} catch (e) {
			globalThis.__seLog("fullscreen: threw " + e);
			return String(e);
		}
	};

	// Cinema mode: fill OUR window rather than going through element fullscreen.
	// WebKit's fullscreen window applies the display safe area no matter what our
	// Info.plist says, so it can never use the notch band. Our own window can.
	//
	// The earlier attempt put the video in a corner because an ancestor with
	// transform/filter/perspective/contain becomes the containing block for a
	// position:fixed descendant. Those are cleared on the way up first.
	const CONTAINING_BLOCK_PROPS = ["transform", "perspective", "filter", "backdrop-filter", "will-change", "contain"];
	let cinemaState = null;

	function enterCinema(fit) {
		const v = document.querySelector("video");
		if (!v) { globalThis.__seLog("cinema: no video element"); return "no video"; }

		const touched = [];
		for (let el = v.parentElement; el && el !== document.documentElement; el = el.parentElement) {
			const cs = getComputedStyle(el);
			const needs = CONTAINING_BLOCK_PROPS.some(function (prop) {
				const value = cs.getPropertyValue(prop);
				return value && value !== "none" && value !== "auto" && value !== "normal";
			});
			if (!needs) continue;
			touched.push([el, el.getAttribute("style")]);
			for (const prop of CONTAINING_BLOCK_PROPS) el.style.setProperty(prop, "none", "important");
		}

		const style = document.createElement("style");
		style.id = "__se_cinema__";
		style.textContent =
			"video{position:fixed!important;inset:0!important;width:100vw!important;" +
			"height:100vh!important;max-width:none!important;max-height:none!important;" +
			"z-index:2147483647!important;background:#000!important;object-fit:" + fit + "!important}" +
			"html,body{overflow:hidden!important;background:#000!important}";
		document.documentElement.appendChild(style);

		cinemaState = { touched: touched, style: style };
		call("windowFullscreen", { on: true });
		globalThis.__seLog("cinema: on, cleared " + touched.length + " containing-block ancestors, fit " + fit);
		return "on";
	}

	function exitCinema() {
		if (!cinemaState) return "already off";
		cinemaState.style.remove();
		for (const pair of cinemaState.touched) {
			if (pair[1] === null) pair[0].removeAttribute("style");
			else pair[0].setAttribute("style", pair[1]);
		}
		cinemaState = null;
		call("windowFullscreen", { on: false });
		globalThis.__seLog("cinema: off");
		return "off";
	}

	globalThis.__seCinema = function (fit) {
		return cinemaState ? exitCinema() : enterCinema(fit);
	};

	// Capture phase, because these players stop propagation on keydown.
	globalThis.addEventListener("keydown", function (e) {
		if (!e.ctrlKey || !e.shiftKey) return;
		const k = (e.key || "").toLowerCase();
		if (k !== "f" && k !== "g") return;
		e.preventDefault();
		e.stopPropagation();
		globalThis.__seCinema(k === "g" ? "cover" : "contain");
	}, true);

	globalThis.__seLog("shim installed on " + location.hostname + " (bridge " + (bridge ? "present" : "MISSING") + ")");

	// Replaces webext-bridge's port messaging. Only "fetch" needs to do real
	// work - the ratings lookups, which go through native to sidestep CORS.
	globalThis.__seSendMessage = async function (messageID, data) {
		if (messageID !== "fetch") return undefined;
		try {
			return await call("fetch", data);
		} catch (e) {
			console.error("[notch-cinema] fetch bridge failed", e);
			return { error: String(e) };
		}
	};
})();
