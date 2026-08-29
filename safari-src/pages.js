import { i as __toESM, t as require_browser_polyfill } from "./browser-polyfill.js";
import { D as createVNode, E as createTextVNode, On as unref, St as resolveComponent, _ as createBaseVNode, b as createElementBlock, k as defineComponent, mt as openBlock, o as Fragment, qt as withCtx, tr as toDisplayString } from "./runtime-core.esm-bundler.js";
import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.js";
import { t as gift_default } from "./gift.js";
import { a as github_default, i as eye_off_outline_default, n as netflix_default, r as chart_bar_default, t as transit_connection_variant_default } from "./transit-connection-variant.js";
//#region src/ui/action-popup/pages/index.vue?vue&type=script&setup=true&lang.ts
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
var _hoisted_1 = { class: "grid grid-cols-3 gap-4" };
var _hoisted_2 = { class: "tooltip" };
var _hoisted_3 = {
	class: "tooltip-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_4 = { class: "text-2xl font-black" };
var _hoisted_5 = { class: "tooltip" };
var _hoisted_6 = { class: "tooltip" };
var _hoisted_7 = { class: "tooltip" };
var _hoisted_8 = { class: "tooltip" };
var _hoisted_9 = { class: "tooltip-content" };
var _hoisted_10 = { class: "text-2xl font-black" };
var _hoisted_11 = { class: "tooltip" };
var _hoisted_12 = { class: "tooltip-content" };
var _hoisted_13 = { class: "text-2xl font-black" };
var _hoisted_14 = { class: "grid grid-cols-2 gap-2 pt-2" };
var _hoisted_15 = ["href"];
var _hoisted_16 = {
	class: "btn btn-secondary rounded-2xl",
	href: "https://github.com/sponsors/Dreamlinerm",
	target: "_blank"
};
//#endregion
//#region src/ui/action-popup/pages/index.vue
var pages_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "index",
	setup(__props) {
		const githubUrl = "https://github.com/Dreamlinerm/Netflix-Prime-Auto-Skip.git";
		function openHiddenTitles() {
			import_browser_polyfill.tabs.create({ url: import_browser_polyfill.runtime.getURL("src/ui/options-page/index.html#/options-page/HiddenTitles") });
		}
		return (_ctx, _cache) => {
			const _component_i_mdi_transit_connection_variant = transit_connection_variant_default;
			const _component_RouterLink = resolveComponent("RouterLink");
			const _component_i_mdi_netflix = netflix_default;
			const _component_i_mdi_chart_bar = chart_bar_default;
			const _component_i_mdi_eye_off_outline = eye_off_outline_default;
			const _component_i_mdi_github = github_default;
			const _component_i_mdi_gift = gift_default;
			return openBlock(), createElementBlock(Fragment, null, [createBaseVNode("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("div", _hoisted_3, [createBaseVNode("div", _hoisted_4, toDisplayString(_ctx.$t("sharedSettings")), 1)]), createVNode(_component_RouterLink, {
					to: "/action-popup/SharedOptions",
					class: "popupMenuButton flex",
					draggable: "false"
				}, {
					default: withCtx(() => [createVNode(_component_i_mdi_transit_connection_variant, {
						width: "100%",
						height: "100%"
					})]),
					_: 1
				})]),
				createBaseVNode("div", _hoisted_5, [_cache[1] || (_cache[1] = createBaseVNode("div", { class: "tooltip-content" }, [createBaseVNode("div", { class: "text-2xl font-black" }, "Amazon Prime Video")], -1)), createVNode(_component_RouterLink, {
					to: "/action-popup/Amazon",
					class: "popupMenuButton flex",
					draggable: "false"
				}, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("svg", {
						xmlns: "http://www.w3.org/2000/svg",
						viewBox: "0 0 24 24",
						class: "icon"
					}, [createBaseVNode("path", {
						fill: "currentColor",
						d: "M13.2,11H10V7H13.2A2,2 0 0,1 15.2,9A2,2 0 0,1 13.2,11M13,3H6V21H10V15H13A6,6 0 0,0 19,9C19,5.68 16.31,3 13,3Z"
					})], -1)])]),
					_: 1
				})]),
				createBaseVNode("div", _hoisted_6, [_cache[2] || (_cache[2] = createBaseVNode("div", { class: "tooltip-content" }, [createBaseVNode("div", { class: "text-2xl font-black" }, "Netflix")], -1)), createVNode(_component_RouterLink, {
					to: "/action-popup/Netflix",
					class: "popupMenuButton flex",
					draggable: "false"
				}, {
					default: withCtx(() => [createVNode(_component_i_mdi_netflix, { class: "icon" })]),
					_: 1
				})]),
				createBaseVNode("div", _hoisted_7, [_cache[4] || (_cache[4] = createBaseVNode("div", { class: "tooltip-content" }, [createBaseVNode("div", { class: "text-2xl font-black" }, "Crunchyroll")], -1)), createVNode(_component_RouterLink, {
					to: "/action-popup/Crunchyroll",
					class: "popupMenuButton flex",
					draggable: "false"
				}, {
					default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("svg", {
						viewBox: "1.8 1.581 247.263 220",
						xmlns: "http://www.w3.org/2000/svg",
						class: "icon"
					}, [createBaseVNode("g", null, [createBaseVNode("path", {
						fill: "currentColor",
						d: "m115.377 209.8c-3.54-.33-12.852-1.943-16.306-2.825-29.863-7.625-55.154-28.074-68.537-55.418-7.337-14.99-10.395-28.396-10.383-45.52.012-17.144 3.117-30.818 10.335-45.52 5.406-11.01 11.625-19.636 20.453-28.37 16.513-16.336 37.43-26.45 61.124-29.552 7.746-1.014 24.143-.684 31.377.631 15.045 2.737 28.553 8.112 40.658 16.178 25.149 16.76 41.461 42.39 45.714 71.828.91 6.303 1.437 19.42.824 20.515-.335.598-.508-.028-.727-2.62-1.086-12.843-6.642-28.373-14.307-39.991-23.298-35.313-66.767-50.295-107.013-36.883-31.064 10.352-54.41 36.615-60.818 68.416-3.169 15.725-2.218 31.139 2.86 46.355 8.953 26.836 30.382 48.274 57.558 57.584 6.41 2.196 14.64 4.026 20.068 4.461 6.5.522 4.861 1.018-3.157.956-4.376-.033-8.75-.135-9.723-.225z"
					}), createBaseVNode("path", {
						fill: "currentColor",
						d: "m137.695 196.826c-33.594-2.447-61.427-27.495-67.236-60.507-1.057-6.008-1.261-17.24-.413-22.769 5.036-32.827 30.288-57.733 63.23-62.362 6.676-.938 18.574-.61 24.969.69 5.562 1.13 11.728 3.138 16.572 5.394l3.757 1.75-3.536 1.669c-12.758 6.025-20.633 20.118-18.784 33.619 1.851 13.52 11.2 24.13 24.622 27.945 4.832 1.374 12.22 1.373 17.054 0 6.25-1.777 11.152-4.682 15.613-9.254 1.506-1.544 2.835-2.648 2.954-2.455.119.194.463 2.322.765 4.73.745 5.939.308 17.238-.886 22.88-3.803 17.967-13.386 33.049-28.08 44.192-13.907 10.546-32.305 15.81-50.601 14.478z"
					})])], -1)])]),
					_: 1
				})]),
				createBaseVNode("div", _hoisted_8, [createBaseVNode("div", _hoisted_9, [createBaseVNode("div", _hoisted_10, toDisplayString(_ctx.$t("statisticPageTitle")), 1)]), createVNode(_component_RouterLink, {
					to: "/action-popup/Statistics",
					class: "popupMenuButton flex",
					draggable: "false"
				}, {
					default: withCtx(() => [createVNode(_component_i_mdi_chart_bar, {
						width: "100%",
						height: "100%"
					})]),
					_: 1
				})]),
				createBaseVNode("div", _hoisted_11, [createBaseVNode("div", _hoisted_12, [createBaseVNode("div", _hoisted_13, toDisplayString(_ctx.$t("hiddenTitlesNav")), 1)]), createBaseVNode("div", {
					class: "popupMenuButton flex",
					onClick: openHiddenTitles
				}, [createVNode(_component_i_mdi_eye_off_outline, {
					width: "100%",
					height: "100%"
				})])])
			]), createBaseVNode("div", _hoisted_14, [createBaseVNode("a", {
				class: "btn btn-secondary rounded-2xl",
				href: unref(githubUrl),
				target: "_blank"
			}, [createVNode(_component_i_mdi_github, { class: "icon" }), _cache[5] || (_cache[5] = createTextVNode(" Github ", -1))], 8, _hoisted_15), createBaseVNode("a", _hoisted_16, [createVNode(_component_i_mdi_gift, {
				height: "2rem",
				width: "2rem"
			}), createTextVNode(" " + toDisplayString(_ctx.$t("donate")), 1)])])], 64);
		};
	}
}), [["__scopeId", "data-v-85e24842"]]);
//#endregion
export { pages_default as default };
