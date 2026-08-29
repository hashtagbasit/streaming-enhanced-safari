import { _ as createBaseVNode, b as createElementBlock, k as defineComponent, mt as openBlock } from "./runtime-core.esm-bundler.js";
import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.js";
//#region src/components/Switch.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "switch" };
var _hoisted_2 = ["checked"];
//#endregion
//#region src/components/Switch.vue
var Switch_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "Switch",
	props: ["modelValue"],
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("label", _hoisted_1, [createBaseVNode("input", {
				checked: props.modelValue,
				type: "checkbox",
				onInput: _cache[0] || (_cache[0] = ($event) => emit("update:modelValue", $event.target.checked))
			}, null, 40, _hoisted_2), _cache[1] || (_cache[1] = createBaseVNode("span", { class: "slider round" }, null, -1))]);
		};
	}
}), [["__scopeId", "data-v-2fe60799"]]);
//#endregion
export { Switch_default as t };
