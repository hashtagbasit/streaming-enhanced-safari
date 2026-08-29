import { D as createVNode, On as unref, _ as createBaseVNode, b as createElementBlock, bt as renderList, k as defineComponent, mt as openBlock, o as Fragment, tr as toDisplayString, v as createBlock, y as createCommentVNode } from "./runtime-core.esm-bundler.js";
import { i as useOptionsStore, l as storeToRefs } from "./options.store.js";
import { t as Switch_default } from "./Switch.js";
import { t as help_circle_default } from "./help-circle.js";
import { t as RouterLinkUp_default } from "./RouterLinkUp.js";
//#region src/components/shared-pages/Amazon.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex items-center" };
var _hoisted_2 = { class: "text-amazon" };
var _hoisted_3 = { class: "py-1 m-0 flex" };
var _hoisted_4 = { class: "tooltip flex" };
var _hoisted_5 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_6 = { class: "description" };
//#endregion
//#region src/components/shared-pages/Amazon.vue
var Amazon_default = /* @__PURE__ */ defineComponent({
	__name: "Amazon",
	props: { advancedSettings: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		const optionsStore = useOptionsStore();
		const { settings } = storeToRefs(optionsStore);
		const settingsList = [
			"selfAd",
			"filterPaid",
			"xray",
			"improveUI"
		];
		return (_ctx, _cache) => {
			const _component_RouterLinkUp = RouterLinkUp_default;
			const _component_i_mdi_help_circle = help_circle_default;
			const _component_Switch = Switch_default;
			return openBlock(), createElementBlock(Fragment, null, [createBaseVNode("div", _hoisted_1, [!__props.advancedSettings ? (openBlock(), createBlock(_component_RouterLinkUp, { key: 0 })) : createCommentVNode("", true), createBaseVNode("h1", _hoisted_2, toDisplayString(_ctx.$t("pageSpecificTitle", ["Prime Video"])), 1)]), (openBlock(), createElementBlock(Fragment, null, renderList(settingsList, (setting) => {
				return openBlock(), createElementBlock(Fragment, { key: setting }, [createBaseVNode("div", _hoisted_3, [createBaseVNode("div", _hoisted_4, [createBaseVNode("p", null, toDisplayString(_ctx.$t(setting + "Switch")), 1), !__props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(_component_i_mdi_help_circle, { height: "1rem" }), createBaseVNode("div", _hoisted_5, toDisplayString(_ctx.$t(setting + "Description")), 1)], 64)) : createCommentVNode("", true)]), createVNode(_component_Switch, {
					modelValue: unref(settings).Amazon[setting],
					"onUpdate:modelValue": ($event) => unref(settings).Amazon[setting] = $event,
					class: "ml-auto"
				}, null, 8, ["modelValue", "onUpdate:modelValue"])]), __props.advancedSettings ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t(setting + "Description")), 1), _cache[0] || (_cache[0] = createBaseVNode("hr", null, null, -1))], 64)) : createCommentVNode("", true)], 64);
			}), 64))], 64);
		};
	}
});
//#endregion
export { Amazon_default as t };
