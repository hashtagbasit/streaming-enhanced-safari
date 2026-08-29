import { D as createVNode, On as unref, Yt as withDirectives, _ as createBaseVNode, b as createElementBlock, bt as renderList, k as defineComponent, mt as openBlock, o as Fragment, tr as toDisplayString, v as createBlock, y as createCommentVNode } from "./runtime-core.esm-bundler.js";
import { f as vModelText, i as useOptionsStore, l as storeToRefs } from "./options.store.js";
import { t as Switch_default } from "./Switch.js";
import { t as help_circle_default } from "./help-circle.js";
import { t as RouterLinkUp_default } from "./RouterLinkUp.js";
//#region src/components/shared-pages/Crunchyroll.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex items-center" };
var _hoisted_2 = { class: "text-crunchyroll" };
var _hoisted_3 = { class: "p-1 m-0 flex" };
var _hoisted_4 = { class: "tooltip flex" };
var _hoisted_5 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_6 = { class: "description" };
var _hoisted_7 = { class: "py-1 m-0 flex" };
var _hoisted_8 = ["src"];
var _hoisted_9 = { key: 0 };
var _hoisted_10 = { class: "p-1 m-0 flex" };
var _hoisted_11 = { class: "tooltip flex" };
var _hoisted_12 = { class: "whitespace-nowrap mr-2" };
var _hoisted_13 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_14 = { class: "description" };
//#endregion
//#region src/components/shared-pages/Crunchyroll.vue
var Crunchyroll_default = /* @__PURE__ */ defineComponent({
	__name: "Crunchyroll",
	props: { advancedSettings: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		const optionsStore = useOptionsStore();
		const { settings } = storeToRefs(optionsStore);
		const settingsList = [
			"skipAfterCredits",
			"releaseCalendar",
			"bigPlayer",
			"profile"
		];
		function setTimeout(num) {
			const parsed = Number.parseInt(num || "0");
			if (parsed > 0) settings.value.General.Crunchyroll_skipTimeout = parsed;
			else settings.value.General.Crunchyroll_skipTimeout = 0;
		}
		return (_ctx, _cache) => {
			const _component_RouterLinkUp = RouterLinkUp_default;
			const _component_i_mdi_help_circle = help_circle_default;
			const _component_Switch = Switch_default;
			return openBlock(), createElementBlock(Fragment, null, [
				createBaseVNode("div", _hoisted_1, [!__props.advancedSettings ? (openBlock(), createBlock(_component_RouterLinkUp, { key: 0 })) : createCommentVNode("", true), createBaseVNode("h1", _hoisted_2, toDisplayString(_ctx.$t("pageSpecificTitle", ["Crunchyroll"])), 1)]),
				(openBlock(), createElementBlock(Fragment, null, renderList(settingsList, (setting) => {
					return openBlock(), createElementBlock(Fragment, { key: setting }, [createBaseVNode("div", _hoisted_3, [createBaseVNode("div", _hoisted_4, [createBaseVNode("p", null, toDisplayString(_ctx.$t(setting + "Switch")), 1), !__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(_component_i_mdi_help_circle, { height: "1rem" }), createBaseVNode("div", _hoisted_5, toDisplayString(_ctx.$t(setting + "Description")), 1)], 64)) : createCommentVNode("", true)]), createVNode(_component_Switch, {
						modelValue: unref(settings).Crunchyroll[setting],
						"onUpdate:modelValue": ($event) => unref(settings).Crunchyroll[setting] = $event,
						class: "ml-auto"
					}, null, 8, ["modelValue", "onUpdate:modelValue"])]), __props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t(setting + "Description")), 1), _cache[2] || (_cache[2] = createBaseVNode("hr", null, null, -1))], 64)) : createCommentVNode("", true)], 64);
				}), 64)),
				createBaseVNode("div", _hoisted_7, [createBaseVNode("p", null, toDisplayString(_ctx.$t("user") + " "), 1), createBaseVNode("img", {
					style: {
						"margin-left": "auto",
						"height": "40px",
						"border-radius": "4px",
						"margin-right": "8px"
					},
					alt: "profile",
					src: unref(settings).General.Crunchyroll_profilePicture ? unref(settings).General.Crunchyroll_profilePicture : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
				}, null, 8, _hoisted_8)]),
				__props.advancedSettings ? (openBlock(), createElementBlock("hr", _hoisted_9)) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_10, [createBaseVNode("div", _hoisted_11, [createBaseVNode("p", _hoisted_12, toDisplayString(_ctx.$t("crunchyrollDelay")), 1), !__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(_component_i_mdi_help_circle, { height: "1rem" }), createBaseVNode("div", _hoisted_13, toDisplayString(_ctx.$t("crunchyrollDelayDescription")), 1)], 64)) : createCommentVNode("", true)]), withDirectives(createBaseVNode("input", {
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(settings).General.Crunchyroll_skipTimeout = $event),
					type: "number",
					class: "w-full p-1 m-0 input border-inherit",
					min: "0",
					onChange: _cache[1] || (_cache[1] = ($event) => setTimeout($event.target.value))
				}, null, 544), [[vModelText, unref(settings).General.Crunchyroll_skipTimeout]])]),
				__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [createBaseVNode("p", _hoisted_14, toDisplayString(_ctx.$t("crunchyrollDelayDescription")), 1), _cache[3] || (_cache[3] = createBaseVNode("hr", null, null, -1))], 64)) : createCommentVNode("", true)
			], 64);
		};
	}
});
//#endregion
export { Crunchyroll_default as t };
