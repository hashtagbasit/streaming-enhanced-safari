import { D as createVNode, E as createTextVNode, On as unref, _ as createBaseVNode, b as createElementBlock, g as computed, k as defineComponent, mt as openBlock, o as Fragment, tr as toDisplayString, un as isRef } from "./runtime-core.esm-bundler.js";
import { i as useOptionsStore, l as storeToRefs } from "./options.store.js";
import { t as Switch_default } from "./Switch.js";
import { t as OptionalPermission_default } from "./OptionalPermission.js";
import { t as LocaleSwitch_default } from "./LocaleSwitch.js";
//#region src/ui/options-page/pages/install.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "w-full h-full flex flex-col justify-center items-center text-center md:my-12" };
var _hoisted_2 = { class: "flex flex-row justify-center items-center" };
var _hoisted_3 = { class: "py-1 m-0 flex" };
var _hoisted_4 = { class: "description" };
var _hoisted_5 = { class: "py-1 m-0 flex" };
var _hoisted_6 = { class: "description" };
var _hoisted_7 = { class: "py-1 m-0 flex" };
var _hoisted_8 = { class: "description" };
//#endregion
//#region src/ui/options-page/pages/install.vue
var install_default = /* @__PURE__ */ defineComponent({
	__name: "install",
	setup(__props) {
		const optionsStore = useOptionsStore();
		const { settings } = storeToRefs(optionsStore);
		const optionalSettings = computed({
			get: () => settings.value.Amazon.filterPaid && settings.value.Video.showYear,
			set: (value) => {
				settings.value.Amazon.filterPaid = value;
				settings.value.Video.showYear = value;
			}
		});
		return (_ctx, _cache) => {
			const _component_Switch = Switch_default;
			const _component_LocaleSwitch = LocaleSwitch_default;
			const _component_OptionalPermission = OptionalPermission_default;
			return openBlock(), createElementBlock(Fragment, null, [
				createBaseVNode("div", _hoisted_1, [createBaseVNode("h1", null, toDisplayString(_ctx.$t("installPageTitle")), 1), createBaseVNode("p", null, [
					createTextVNode(toDisplayString(_ctx.$t("installThanks")) + " ", 1),
					_cache[4] || (_cache[4] = createBaseVNode("br", null, null, -1)),
					createTextVNode(" " + toDisplayString(_ctx.$t("installTurnOnOptional")) + " ", 1),
					createVNode(_component_Switch, {
						modelValue: unref(optionalSettings),
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(optionalSettings) ? optionalSettings.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"]),
					_cache[5] || (_cache[5] = createBaseVNode("br", null, null, -1)),
					createBaseVNode("span", _hoisted_2, [createTextVNode(toDisplayString(_ctx.$t("switchLanguage")) + " ", 1), createVNode(_component_LocaleSwitch)])
				])]),
				createVNode(_component_OptionalPermission),
				createBaseVNode("div", _hoisted_3, [createBaseVNode("p", null, toDisplayString(_ctx.$t("filterPaidSwitch")), 1), createVNode(_component_Switch, {
					modelValue: unref(settings).Amazon.filterPaid,
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(settings).Amazon.filterPaid = $event),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("p", _hoisted_4, toDisplayString(_ctx.$t("defaultfilterPaidDescription")), 1),
				_cache[6] || (_cache[6] = createBaseVNode("hr", null, null, -1)),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", null, toDisplayString(_ctx.$t("showYearSwitch")), 1), createVNode(_component_Switch, {
					modelValue: unref(settings).Video.showYear,
					"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(settings).Video.showYear = $event),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("showYearDescription")), 1),
				_cache[7] || (_cache[7] = createBaseVNode("hr", null, null, -1)),
				createBaseVNode("div", _hoisted_7, [createBaseVNode("p", null, toDisplayString(_ctx.$t("epilepsySwitch")), 1), createVNode(_component_Switch, {
					modelValue: unref(settings).Video.epilepsy,
					"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(settings).Video.epilepsy = $event),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("p", _hoisted_8, toDisplayString(_ctx.$t("epilepsyDescription")), 1),
				_cache[8] || (_cache[8] = createBaseVNode("hr", null, null, -1))
			], 64);
		};
	}
});
//#endregion
export { install_default as default };
