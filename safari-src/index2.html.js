import { i as __toESM, t as require_browser_polyfill } from "./browser-polyfill.js";
import { D as createVNode, E as createTextVNode, Ht as watch, On as unref, St as resolveComponent, Zn as normalizeClass, _ as createBaseVNode, b as createElementBlock, fn as markRaw, k as defineComponent, mt as openBlock, qt as withCtx, tr as toDisplayString, vn as ref } from "./runtime-core.esm-bundler.js";
import { a as i18n, n as useFrontendStore, u as createApp } from "./options.store.js";
import { h as useRouter } from "./useApi-CROJJdhE.js";
import { n as pinia, t as appRouter } from "./router.js";
import { t as gift_default } from "./gift.js";
import { a as github_default, i as eye_off_outline_default, n as netflix_default, r as chart_bar_default, t as transit_connection_variant_default } from "./transit-connection-variant.js";
//#region ~icons/mdi/format-list-bulleted
var _hoisted_1$2 = {
	viewBox: "0 0 24 24",
	width: "1.5em",
	height: "1.5em"
};
function render$1(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$2, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		fill: "currentColor",
		d: "M7 5h14v2H7zm0 8v-2h14v2zM4 4.5A1.5 1.5 0 0 1 5.5 6A1.5 1.5 0 0 1 4 7.5A1.5 1.5 0 0 1 2.5 6A1.5 1.5 0 0 1 4 4.5m0 6A1.5 1.5 0 0 1 5.5 12A1.5 1.5 0 0 1 4 13.5A1.5 1.5 0 0 1 2.5 12A1.5 1.5 0 0 1 4 10.5M7 19v-2h14v2zm-3-2.5A1.5 1.5 0 0 1 5.5 18A1.5 1.5 0 0 1 4 19.5A1.5 1.5 0 0 1 2.5 18A1.5 1.5 0 0 1 4 16.5"
	}, null, -1)])]);
}
var format_list_bulleted_default = markRaw({
	name: "mdi-format-list-bulleted",
	render: render$1
});
//#endregion
//#region ~icons/mdi/dots-horizontal
var _hoisted_1$1 = {
	viewBox: "0 0 24 24",
	width: "1.5em",
	height: "1.5em"
};
function render(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		fill: "currentColor",
		d: "M16 12a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"
	}, null, -1)])]);
}
var dots_horizontal_default = markRaw({
	name: "mdi-dots-horizontal",
	render
});
//#endregion
//#region src/ui/options-page/app.vue?vue&type=script&setup=true&lang.ts
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
var _hoisted_1 = {
	class: "wrapper",
	style: { "height": "calc(min(100vh, 1800px))" }
};
var _hoisted_2 = { class: "sidenav flex flex-col" };
var _hoisted_3 = { class: "flex justify-center items-center flex-col IconBox" };
var _hoisted_4 = { class: "flex justify-center items-center flex-row" };
var _hoisted_5 = { class: "flex justify-center items-center flex-col" };
var _hoisted_6 = { class: "title" };
var _hoisted_7 = { class: "font text-base text-white" };
var _hoisted_8 = { class: "flex flex-col MenuButtons flex-wrap" };
var _hoisted_9 = { class: "mt-auto" };
var _hoisted_10 = { class: "flex flex-col mb-2 MenuButtons" };
var _hoisted_11 = ["href"];
var _hoisted_12 = { class: "text-base text-white" };
var _hoisted_13 = ["src"];
var _hoisted_14 = ["href"];
var _hoisted_15 = {
	class: "btn btn-secondary rounded-2xl blueButtons m-[5px_15px]",
	href: "https://github.com/sponsors/Dreamlinerm",
	target: "_blank"
};
var _hoisted_16 = { class: "content flex flex-col overflow-y-auto w-full" };
var _hoisted_17 = { class: "page" };
var _hoisted_18 = { class: "p-4 prose" };
//#endregion
//#region src/ui/options-page/app.vue
var app_default = /* @__PURE__ */ defineComponent({
	__name: "app",
	setup(__props) {
		const isFirefox = typeof import_browser_polyfill !== "undefined";
		const version = "1.1.105";
		const githubUrl = "https://github.com/Dreamlinerm/Netflix-Prime-Auto-Skip.git";
		useFrontendStore();
		const router = useRouter();
		const hash = ref(router.currentRoute.value.path);
		watch(() => router.currentRoute.value.path, (newHash) => {
			console.log(newHash);
			hash.value = newHash;
		}, {
			immediate: true,
			deep: true
		});
		return (_ctx, _cache) => {
			const _component_i_mdi_transit_connection_variant = transit_connection_variant_default;
			const _component_RouterLink = resolveComponent("RouterLink");
			const _component_i_mdi_netflix = netflix_default;
			const _component_i_mdi_eye_off_outline = eye_off_outline_default;
			const _component_i_mdi_dots_horizontal = dots_horizontal_default;
			const _component_i_mdi_chart_bar = chart_bar_default;
			const _component_i_mdi_format_list_bulleted = format_list_bulleted_default;
			const _component_i_mdi_github = github_default;
			const _component_i_mdi_gift = gift_default;
			const _component_RouterView = resolveComponent("RouterView");
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [
				createBaseVNode("div", _hoisted_3, [createBaseVNode("div", _hoisted_4, [_cache[0] || (_cache[0] = createBaseVNode("img", {
					class: "Logo",
					src: "/NetflixAmazon%20Auto-Skip.svg",
					alt: "Logo"
				}, null, -1)), createBaseVNode("div", _hoisted_5, [createBaseVNode("h2", _hoisted_6, toDisplayString(_ctx.$t("pageTitle")), 1), createBaseVNode("p", _hoisted_7, toDisplayString(unref(version)), 1)])])]),
				createBaseVNode("div", _hoisted_8, [
					createVNode(_component_RouterLink, {
						to: "/options-page/SharedSettings",
						class: normalizeClass(["menuButton flex", unref(hash).endsWith("SharedSettings") ? "bg-netflix" : "bg-primary"]),
						draggable: "false"
					}, {
						default: withCtx(() => [createVNode(_component_i_mdi_transit_connection_variant, { class: "icon" }), createBaseVNode("div", null, toDisplayString(_ctx.$t("sharedSettings")), 1)]),
						_: 1
					}, 8, ["class"]),
					createVNode(_component_RouterLink, {
						to: "/options-page/Amazon",
						class: normalizeClass(["menuButton flex", unref(hash).endsWith("Amazon") ? "bg-netflix" : "bg-primary"]),
						draggable: "false"
					}, {
						default: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("svg", {
							xmlns: "http://www.w3.org/2000/svg",
							viewBox: "0 0 24 24",
							class: "icon text-primary-content"
						}, [createBaseVNode("path", {
							fill: "currentColor",
							d: "M13.2,11H10V7H13.2A2,2 0 0,1 15.2,9A2,2 0 0,1 13.2,11M13,3H6V21H10V15H13A6,6 0 0,0 19,9C19,5.68 16.31,3 13,3Z"
						})], -1), createBaseVNode("div", null, "Prime Video", -1)])]),
						_: 1
					}, 8, ["class"]),
					createVNode(_component_RouterLink, {
						to: "/options-page/Netflix",
						class: normalizeClass(["menuButton flex", unref(hash).endsWith("Netflix") ? "bg-netflix" : "bg-primary"]),
						draggable: "false"
					}, {
						default: withCtx(() => [createVNode(_component_i_mdi_netflix, { class: "icon" }), _cache[2] || (_cache[2] = createBaseVNode("div", null, "Netflix", -1))]),
						_: 1
					}, 8, ["class"]),
					createVNode(_component_RouterLink, {
						to: "/options-page/Crunchyroll",
						class: normalizeClass(["menuButton flex", unref(hash).endsWith("Crunchyroll") ? "bg-netflix" : "bg-primary"]),
						draggable: "false"
					}, {
						default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("svg", {
							viewBox: "1.8 1.581 247.263 220",
							xmlns: "http://www.w3.org/2000/svg",
							class: "icon text-primary-content"
						}, [createBaseVNode("g", null, [createBaseVNode("path", {
							fill: "currentColor",
							d: "m115.377 209.8c-3.54-.33-12.852-1.943-16.306-2.825-29.863-7.625-55.154-28.074-68.537-55.418-7.337-14.99-10.395-28.396-10.383-45.52.012-17.144 3.117-30.818 10.335-45.52 5.406-11.01 11.625-19.636 20.453-28.37 16.513-16.336 37.43-26.45 61.124-29.552 7.746-1.014 24.143-.684 31.377.631 15.045 2.737 28.553 8.112 40.658 16.178 25.149 16.76 41.461 42.39 45.714 71.828.91 6.303 1.437 19.42.824 20.515-.335.598-.508-.028-.727-2.62-1.086-12.843-6.642-28.373-14.307-39.991-23.298-35.313-66.767-50.295-107.013-36.883-31.064 10.352-54.41 36.615-60.818 68.416-3.169 15.725-2.218 31.139 2.86 46.355 8.953 26.836 30.382 48.274 57.558 57.584 6.41 2.196 14.64 4.026 20.068 4.461 6.5.522 4.861 1.018-3.157.956-4.376-.033-8.75-.135-9.723-.225z"
						}), createBaseVNode("path", {
							fill: "currentColor",
							d: "m137.695 196.826c-33.594-2.447-61.427-27.495-67.236-60.507-1.057-6.008-1.261-17.24-.413-22.769 5.036-32.827 30.288-57.733 63.23-62.362 6.676-.938 18.574-.61 24.969.69 5.562 1.13 11.728 3.138 16.572 5.394l3.757 1.75-3.536 1.669c-12.758 6.025-20.633 20.118-18.784 33.619 1.851 13.52 11.2 24.13 24.622 27.945 4.832 1.374 12.22 1.373 17.054 0 6.25-1.777 11.152-4.682 15.613-9.254 1.506-1.544 2.835-2.648 2.954-2.455.119.194.463 2.322.765 4.73.745 5.939.308 17.238-.886 22.88-3.803 17.967-13.386 33.049-28.08 44.192-13.907 10.546-32.305 15.81-50.601 14.478z"
						})])], -1), createBaseVNode("div", null, "Crunchyroll", -1)])]),
						_: 1
					}, 8, ["class"]),
					createVNode(_component_RouterLink, {
						to: "/options-page/HiddenTitles",
						class: normalizeClass(["menuButton flex", unref(hash).endsWith("HiddenTitles") ? "bg-netflix" : "bg-primary"]),
						draggable: "false"
					}, {
						default: withCtx(() => [createVNode(_component_i_mdi_eye_off_outline, { class: "icon" }), createBaseVNode("p", null, toDisplayString(_ctx.$t("hiddenTitlesNav")), 1)]),
						_: 1
					}, 8, ["class"]),
					createVNode(_component_RouterLink, {
						to: "/options-page/Backup",
						class: normalizeClass(["menuButton flex", unref(hash).endsWith("Backup") ? "bg-netflix" : "bg-primary"]),
						draggable: "false"
					}, {
						default: withCtx(() => [createVNode(_component_i_mdi_dots_horizontal, { class: "icon" }), createBaseVNode("p", null, toDisplayString(_ctx.$t("backup")), 1)]),
						_: 1
					}, 8, ["class"]),
					createVNode(_component_RouterLink, {
						to: "/options-page/Statistics",
						class: normalizeClass(["menuButton flex", unref(hash).endsWith("Statistics") ? "bg-netflix" : "bg-primary"]),
						draggable: "false"
					}, {
						default: withCtx(() => [createVNode(_component_i_mdi_chart_bar, { class: "icon" }), createBaseVNode("p", null, toDisplayString(_ctx.$t("statistics")), 1)]),
						_: 1
					}, 8, ["class"]),
					createVNode(_component_RouterLink, {
						to: "/options-page/Changelog",
						class: normalizeClass(["menuButton flex", unref(hash).endsWith("Changelog") ? "bg-netflix" : "bg-primary"]),
						draggable: "false"
					}, {
						default: withCtx(() => [createVNode(_component_i_mdi_format_list_bulleted, { class: "icon" }), createBaseVNode("p", null, toDisplayString(_ctx.$t("changelog")), 1)]),
						_: 1
					}, 8, ["class"])
				]),
				createBaseVNode("div", _hoisted_9, [createBaseVNode("div", _hoisted_10, [
					createBaseVNode("a", {
						target: "_blank",
						class: "flex justify-center items-center flex-col text-center no-underline",
						href: isFirefox ? "https://addons.mozilla.org/firefox/addon/netflix-prime-auto-skip/" : "https://chromewebstore.google.com/detail/netflixprime-auto-skip/akaimhgappllmlkadblbdknhbfghdgle"
					}, [createBaseVNode("p", _hoisted_12, toDisplayString(_ctx.$t("rateNow")), 1), createBaseVNode("img", {
						src: isFirefox ? "https://img.shields.io/amo/stars/NetflixPrime@Autoskip.io?color=e60010" : "https://img.shields.io/chrome-web-store/stars/akaimhgappllmlkadblbdknhbfghdgle?color=e60010",
						alt: "rating",
						class: "w-24"
					}, null, 8, _hoisted_13)], 8, _hoisted_11),
					createBaseVNode("a", {
						class: "btn btn-secondary rounded-2xl blueButtons m-[5px_15px]",
						href: unref(githubUrl),
						target: "_blank"
					}, [createVNode(_component_i_mdi_github, { class: "icon" }), _cache[4] || (_cache[4] = createTextVNode(" Github ", -1))], 8, _hoisted_14),
					createBaseVNode("a", _hoisted_15, [createVNode(_component_i_mdi_gift, {
						height: "2rem",
						width: "2rem"
					}), createTextVNode(" " + toDisplayString(_ctx.$t("donate")), 1)])
				])])
			]), createBaseVNode("div", _hoisted_16, [createBaseVNode("div", _hoisted_17, [createBaseVNode("div", _hoisted_18, [createVNode(_component_RouterView)])])])]);
		};
	}
});
//#endregion
//#region src/ui/options-page/index.ts
appRouter.addRoute({
	path: "/",
	redirect: "/options-page"
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
