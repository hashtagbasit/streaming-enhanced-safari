import { D as createVNode, On as unref, _ as createBaseVNode, b as createElementBlock, k as defineComponent, mt as openBlock, o as Fragment, tr as toDisplayString, v as createBlock, y as createCommentVNode } from "./runtime-core.esm-bundler.js";
import { i as useOptionsStore, l as storeToRefs } from "./options.store.js";
import { t as help_circle_default } from "./help-circle.js";
import { t as RouterLinkUp_default } from "./RouterLinkUp.js";
//#region src/components/shared-pages/Statistics.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex items-center" };
var _hoisted_2 = { class: "py-1 m-0 flex justify-between" };
var _hoisted_3 = { class: "tooltip flex" };
var _hoisted_4 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_5 = { class: "description" };
var _hoisted_6 = { class: "py-1 m-0 flex justify-between" };
var _hoisted_7 = { class: "tooltip flex" };
var _hoisted_8 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_9 = { class: "description" };
var _hoisted_10 = { class: "py-1 m-0 flex justify-between" };
var _hoisted_11 = { class: "tooltip flex" };
var _hoisted_12 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_13 = { class: "description" };
var _hoisted_14 = { class: "py-1 m-0 flex justify-between" };
var _hoisted_15 = { class: "tooltip flex" };
var _hoisted_16 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_17 = { class: "description" };
var _hoisted_18 = { class: "py-1 m-0 flex justify-between" };
var _hoisted_19 = { class: "tooltip flex" };
var _hoisted_20 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_21 = { class: "description" };
var _hoisted_22 = { class: "py-1 m-0 flex justify-between" };
var _hoisted_23 = { class: "tooltip flex" };
var _hoisted_24 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_25 = { class: "description" };
//#endregion
//#region src/components/shared-pages/Statistics.vue
var Statistics_default = /* @__PURE__ */ defineComponent({
	__name: "Statistics",
	props: { advancedSettings: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		const optionsStore = useOptionsStore();
		const { settings } = storeToRefs(optionsStore);
		function getTimeFormatted(sec = 0) {
			if (typeof sec !== "number") return "0s";
			let days = Math.floor(sec / 86400);
			let hours = Math.floor(sec % 86400 / 3600);
			let minutes = Math.floor(sec % 86400 % 3600 / 60);
			let seconds = Math.floor(sec % 86400 % 3600 % 60);
			let text;
			if (days > 0) text = `${days}d ${hours}h ${minutes}m`;
			else if (hours > 0) text = `${hours}h ${minutes}m ${seconds}s`;
			else if (minutes > 0) text = `${minutes}m ${seconds}s`;
			else text = `${seconds}s`;
			return text;
		}
		return (_ctx, _cache) => {
			const _component_RouterLinkUp = RouterLinkUp_default;
			const _component_i_mdi_help_circle = help_circle_default;
			return openBlock(), createElementBlock(Fragment, null, [
				createBaseVNode("div", _hoisted_1, [!__props.advancedSettings ? (openBlock(), createBlock(_component_RouterLinkUp, { key: 0 })) : createCommentVNode("", true), createBaseVNode("h1", null, toDisplayString(_ctx.$t("skippedTime")), 1)]),
				createBaseVNode("div", _hoisted_2, [createBaseVNode("div", _hoisted_3, [createBaseVNode("p", null, toDisplayString(_ctx.$t("statisticAd", ["Amazon"])), 1), !__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(_component_i_mdi_help_circle, { height: "1rem" }), createBaseVNode("div", _hoisted_4, toDisplayString(_ctx.$t("amazonAdDescription")), 1)], 64)) : createCommentVNode("", true)]), createBaseVNode("p", null, toDisplayString(getTimeFormatted(unref(settings).Statistics.AmazonAdTimeSkipped)), 1)]),
				__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("p", _hoisted_5, toDisplayString(_ctx.$t("amazonAdDescription")), 1), _cache[0] || (_cache[0] = createBaseVNode("hr", null, null, -1))], 64)) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_6, [createBaseVNode("div", _hoisted_7, [createBaseVNode("p", null, toDisplayString(_ctx.$t("statisticAd", ["Netflix"])), 1), !__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(_component_i_mdi_help_circle, { height: "1rem" }), createBaseVNode("div", _hoisted_8, toDisplayString(_ctx.$t("netflixAdDescription")), 1)], 64)) : createCommentVNode("", true)]), createBaseVNode("p", null, toDisplayString(getTimeFormatted(unref(settings).Statistics.NetflixAdTimeSkipped)), 1)]),
				__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [createBaseVNode("p", _hoisted_9, toDisplayString(_ctx.$t("netflixAdDescription")), 1), _cache[1] || (_cache[1] = createBaseVNode("hr", null, null, -1))], 64)) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_10, [createBaseVNode("div", _hoisted_11, [createBaseVNode("p", null, toDisplayString(_ctx.$t("statisticAd", ["Disney"])), 1), !__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(_component_i_mdi_help_circle, { height: "1rem" }), createBaseVNode("div", _hoisted_12, toDisplayString(_ctx.$t("disneyAdDescription")), 1)], 64)) : createCommentVNode("", true)]), createBaseVNode("p", null, toDisplayString(getTimeFormatted(unref(settings).Statistics.DisneyAdTimeSkipped)), 1)]),
				__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [createBaseVNode("p", _hoisted_13, toDisplayString(_ctx.$t("disneyAdDescription")), 1), _cache[2] || (_cache[2] = createBaseVNode("hr", null, null, -1))], 64)) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_14, [createBaseVNode("div", _hoisted_15, [createBaseVNode("p", null, toDisplayString(_ctx.$t("statisticIntro")), 1), !__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(_component_i_mdi_help_circle, { height: "1rem" }), createBaseVNode("div", _hoisted_16, toDisplayString(_ctx.$t("statisticIntroDescription")), 1)], 64)) : createCommentVNode("", true)]), createBaseVNode("p", null, toDisplayString(getTimeFormatted(unref(settings).Statistics.IntroTimeSkipped)), 1)]),
				__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [createBaseVNode("p", _hoisted_17, toDisplayString(_ctx.$t("statisticIntroDescription")), 1), _cache[3] || (_cache[3] = createBaseVNode("hr", null, null, -1))], 64)) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_18, [createBaseVNode("div", _hoisted_19, [createBaseVNode("p", null, toDisplayString(_ctx.$t("statisticRecap")), 1), !__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(_component_i_mdi_help_circle, { height: "1rem" }), createBaseVNode("div", _hoisted_20, toDisplayString(_ctx.$t("statisticskipRecapDescription")), 1)], 64)) : createCommentVNode("", true)]), createBaseVNode("p", null, toDisplayString(getTimeFormatted(unref(settings).Statistics.RecapTimeSkipped)), 1)]),
				__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [createBaseVNode("p", _hoisted_21, toDisplayString(_ctx.$t("statisticskipRecapDescription")), 1), _cache[4] || (_cache[4] = createBaseVNode("hr", null, null, -1))], 64)) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_22, [createBaseVNode("div", _hoisted_23, [createBaseVNode("p", null, toDisplayString(_ctx.$t("statisticSegments")), 1), !__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(_component_i_mdi_help_circle, { height: "1rem" }), createBaseVNode("div", _hoisted_24, toDisplayString(_ctx.$t("statisticSegmentsDescription")), 1)], 64)) : createCommentVNode("", true)]), createBaseVNode("p", null, toDisplayString(unref(settings).Statistics.SegmentsSkipped), 1)]),
				__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [createBaseVNode("p", _hoisted_25, toDisplayString(_ctx.$t("statisticSegmentsDescription")), 1), _cache[5] || (_cache[5] = createBaseVNode("hr", null, null, -1))], 64)) : createCommentVNode("", true)
			], 64);
		};
	}
});
//#endregion
export { Statistics_default as t };
