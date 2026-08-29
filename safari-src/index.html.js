import { i as __toESM, t as require_browser_polyfill } from "./browser-polyfill.js";
import { D as createVNode, On as unref, St as resolveComponent, Zn as normalizeClass, _ as createBaseVNode, b as createElementBlock, fn as markRaw, k as defineComponent, mt as openBlock, qt as withCtx, tr as toDisplayString, v as createBlock } from "./runtime-core.esm-bundler.js";
import { a as i18n, i as useOptionsStore, l as storeToRefs, s as useTheme, u as createApp } from "./options.store.js";
import { h as useRouter } from "./useApi-CROJJdhE.js";
import { n as pinia, t as appRouter } from "./router.js";
import { t as Switch_default } from "./Switch.js";
import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.js";
import { t as gift_default } from "./gift.js";
import { t as LocaleSwitch_default } from "./LocaleSwitch.js";
//#region ~icons/ph/sun
var _hoisted_1$4 = {
	viewBox: "0 0 256 256",
	width: "1.5em",
	height: "1.5em"
};
function render$2(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$4, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		fill: "currentColor",
		d: "M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0m72 88a64 64 0 1 1-64-64a64.07 64.07 0 0 1 64 64m-16 0a48 48 0 1 0-48 48a48.05 48.05 0 0 0 48-48M58.34 69.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68l-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32M192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72m5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8m80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8m112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16"
	}, null, -1)])]);
}
var sun_default = markRaw({
	name: "ph-sun",
	render: render$2
});
//#endregion
//#region ~icons/ph/moon
var _hoisted_1$3 = {
	viewBox: "0 0 256 256",
	width: "1.5em",
	height: "1.5em"
};
function render$1(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$3, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		fill: "currentColor",
		d: "M233.54 142.23a8 8 0 0 0-8-2a88.08 88.08 0 0 1-109.8-109.8a8 8 0 0 0-10-10a104.84 104.84 0 0 0-52.91 37A104 104 0 0 0 136 224a103.1 103.1 0 0 0 62.52-20.88a104.84 104.84 0 0 0 37-52.91a8 8 0 0 0-1.98-7.98m-44.64 48.11A88 88 0 0 1 65.66 67.11a89 89 0 0 1 31.4-26A106 106 0 0 0 96 56a104.11 104.11 0 0 0 104 104a106 106 0 0 0 14.92-1.06a89 89 0 0 1-26.02 31.4"
	}, null, -1)])]);
}
var moon_default = markRaw({
	name: "ph-moon",
	render: render$1
});
//#endregion
//#region src/components/ThemeSwitch.vue
var ThemeSwitch_default = /* @__PURE__ */ defineComponent({
	__name: "ThemeSwitch",
	setup(__props) {
		const { isDark, toggleDark } = useTheme();
		return (_ctx, _cache) => {
			const _component_i_ph_moon = moon_default;
			const _component_i_ph_sun = sun_default;
			return openBlock(), createElementBlock("a", {
				class: "h-fit min-h-1",
				onClick: _cache[0] || (_cache[0] = ($event) => unref(toggleDark)())
			}, [unref(isDark) ? (openBlock(), createBlock(_component_i_ph_moon, { key: 0 })) : (openBlock(), createBlock(_component_i_ph_sun, { key: 1 }))]);
		};
	}
});
//#endregion
//#region ~icons/mdi/cog
var _hoisted_1$2 = {
	viewBox: "0 0 24 24",
	width: "1.5em",
	height: "1.5em"
};
function render(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$2, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		fill: "currentColor",
		d: "M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"
	}, null, -1)])]);
}
var cog_default = markRaw({
	name: "mdi-cog",
	render
});
//#endregion
//#region src/components/AppHeader.vue?vue&type=script&setup=true&lang.ts
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
var _hoisted_1$1 = { class: "navbar text-primary-content justify-between" };
var _hoisted_2$1 = { class: "flex" };
var _hoisted_3 = { class: "text-wrap w-24 p-0" };
var _hoisted_4 = ["href"];
var _hoisted_5 = { class: "text-nowrap text-base p-0" };
var _hoisted_6 = ["src"];
var _hoisted_7 = { class: "flex h-full items-center" };
var _hoisted_8 = ["href"];
var _hoisted_9 = {
	class: "flex flex-center",
	href: "https://github.com/sponsors/Dreamlinerm",
	target: "_blank"
};
var _hoisted_10 = { class: "menu menu-xs p-0" };
var _hoisted_11 = { class: "flex flex-row" };
//#endregion
//#region src/components/AppHeader.vue
var AppHeader_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "AppHeader",
	setup(__props) {
		const isFirefox = typeof import_browser_polyfill !== "undefined";
		const githubUrl = "https://github.com/Dreamlinerm/Netflix-Prime-Auto-Skip.git";
		function openSettings() {
			import_browser_polyfill.tabs.create({
				active: true,
				url: import_browser_polyfill.runtime.getURL("src/ui/options-page/index.html#")
			});
		}
		return (_ctx, _cache) => {
			const _component_RouterLink = resolveComponent("RouterLink");
			const _component_i_mdi_gift = gift_default;
			const _component_i_mdi_cog = cog_default;
			const _component_LocaleSwitch = LocaleSwitch_default;
			const _component_ThemeSwitch = ThemeSwitch_default;
			return openBlock(), createElementBlock("div", _hoisted_1$1, [createBaseVNode("div", _hoisted_2$1, [createVNode(_component_RouterLink, {
				to: "/",
				class: "flex gap-2 items-center"
			}, {
				default: withCtx(() => [_cache[0] || (_cache[0] = createBaseVNode("img", {
					src: "/logo.png",
					alt: "logo",
					class: "h-12 w-auto"
				}, null, -1)), createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("pageTitle")), 1)]),
				_: 1
			}), createBaseVNode("a", {
				target: "_blank",
				class: "flex flex-col text-center items-center justify-center",
				href: isFirefox ? "https://addons.mozilla.org/firefox/addon/netflix-prime-auto-skip/" : "https://chromewebstore.google.com/detail/netflixprime-auto-skip/akaimhgappllmlkadblbdknhbfghdgle"
			}, [createBaseVNode("p", _hoisted_5, toDisplayString(_ctx.$t("rateNow")), 1), createBaseVNode("img", {
				src: isFirefox ? "https://img.shields.io/amo/stars/NetflixPrime@Autoskip.io?color=e60010" : "https://img.shields.io/chrome-web-store/stars/akaimhgappllmlkadblbdknhbfghdgle?color=e60010",
				alt: "rating"
			}, null, 8, _hoisted_6)], 8, _hoisted_4)]), createBaseVNode("div", _hoisted_7, [
				createBaseVNode("a", {
					class: "flex flex-center",
					style: { "font-size": "1.5rem" },
					href: unref(githubUrl),
					target: "_blank"
				}, [..._cache[1] || (_cache[1] = [createBaseVNode("svg", {
					xmlns: "http://www.w3.org/2000/svg",
					viewBox: "0 0 24 24",
					class: "w-8 h-8 bg-transparent fill-primary-content text-primary-content flex justify-center items-center cursor-pointer mx-1.5"
				}, [createBaseVNode("path", { d: "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" })], -1)])], 8, _hoisted_8),
				createBaseVNode("a", _hoisted_9, [createVNode(_component_i_mdi_gift, {
					height: "2rem",
					width: "2rem"
				})]),
				createBaseVNode("a", {
					class: "flex gap-2 items-center cursor-pointer",
					onClick: openSettings
				}, [createVNode(_component_i_mdi_cog, {
					height: "2.5rem",
					width: "2.5rem",
					class: "ml-1.5"
				})]),
				createBaseVNode("ul", _hoisted_10, [createBaseVNode("li", null, [createVNode(_component_LocaleSwitch)]), createBaseVNode("li", _hoisted_11, [createVNode(_component_ThemeSwitch)])])
			])]);
		};
	}
}), [["__scopeId", "data-v-8fd568df"]]);
//#endregion
//#region src/ui/action-popup/app.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "w-[470px] max-w-[470px] h-fit max-h-[700px]" };
var _hoisted_2 = { class: "p-4 pt-0 flex-1" };
//#endregion
//#region src/ui/action-popup/app.vue
var app_default = /* @__PURE__ */ defineComponent({
	__name: "app",
	setup(__props) {
		const router = useRouter();
		const query = {
			active: true,
			currentWindow: true
		};
		function callback(tabs) {
			const currentUrl = tabs?.[0]?.url || "";
			const isPrimeVideo = /.amazon.|.primevideo./i.test(currentUrl);
			const isNetflix = /.netflix./i.test(currentUrl);
			const isCrunchyroll = /.crunchyroll./i.test(currentUrl);
			if (isPrimeVideo) router.push("/action-popup/Amazon");
			else if (isNetflix) router.push("/action-popup/Netflix");
			else if (isCrunchyroll) router.push("/action-popup/Crunchyroll");
			else router.push("/action-popup/SharedOptions");
		}
		const isMobile = /mobile|streamingEnhanced/i.test(navigator.userAgent);
		const optionsStore = useOptionsStore();
		const { settings } = storeToRefs(optionsStore);
		import_browser_polyfill.tabs.query(query).then(callback);
		return (_ctx, _cache) => {
			const _component_AppHeader = AppHeader_default;
			const _component_Switch = Switch_default;
			const _component_RouterView = resolveComponent("RouterView");
			return openBlock(), createElementBlock("div", _hoisted_1, [createVNode(_component_AppHeader), createBaseVNode("div", _hoisted_2, [createBaseVNode("div", { class: normalizeClass(["line flex", unref(isMobile) ? "" : "hidden"]) }, [createBaseVNode("p", null, toDisplayString(_ctx.$t("userAgentSwitch")), 1), createVNode(_component_Switch, {
				modelValue: unref(settings).Video.userAgent,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(settings).Video.userAgent = $event),
				class: "ml-auto"
			}, null, 8, ["modelValue"])], 2), createVNode(_component_RouterView)])]);
		};
	}
});
//#endregion
//#region src/ui/action-popup/index.ts
appRouter.addRoute({
	path: "/",
	redirect: "/action-popup"
});
createApp(app_default).use(i18n).use(pinia).use(appRouter).mount("#app");
self.onerror = function(message, source, lineno, colno, error) {
	console.info("Error: " + message);
	console.info("Source: " + source);
	console.info("Line: " + lineno);
	console.info("Column: " + colno);
	console.info("Error object: " + error);
};
//#endregion
