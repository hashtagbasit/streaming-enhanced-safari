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
