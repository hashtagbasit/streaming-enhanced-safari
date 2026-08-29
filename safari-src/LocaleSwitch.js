import { D as createVNode, On as unref, _ as createBaseVNode, b as createElementBlock, bt as renderList, fn as markRaw, k as defineComponent, mt as openBlock, o as Fragment, tr as toDisplayString } from "./runtime-core.esm-bundler.js";
import { a as i18n, l as storeToRefs, n as useFrontendStore } from "./options.store.js";
//#region ~icons/ph/globe
var _hoisted_1$1 = {
	viewBox: "0 0 256 256",
	width: "1.5em",
	height: "1.5em"
};
function render(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		fill: "currentColor",
		d: "M128 24a104 104 0 1 0 104 104A104.12 104.12 0 0 0 128 24m88 104a87.6 87.6 0 0 1-3.33 24h-38.51a157.4 157.4 0 0 0 0-48h38.51a87.6 87.6 0 0 1 3.33 24m-114 40h52a115.1 115.1 0 0 1-26 45a115.3 115.3 0 0 1-26-45m-3.9-16a140.8 140.8 0 0 1 0-48h59.88a140.8 140.8 0 0 1 0 48ZM40 128a87.6 87.6 0 0 1 3.33-24h38.51a157.4 157.4 0 0 0 0 48H43.33A87.6 87.6 0 0 1 40 128m114-40h-52a115.1 115.1 0 0 1 26-45a115.3 115.3 0 0 1 26 45m52.33 0h-35.62a135.3 135.3 0 0 0-22.3-45.6A88.29 88.29 0 0 1 206.37 88Zm-98.74-45.6A135.3 135.3 0 0 0 85.29 88H49.63a88.29 88.29 0 0 1 57.96-45.6M49.63 168h35.66a135.3 135.3 0 0 0 22.3 45.6A88.29 88.29 0 0 1 49.63 168m98.78 45.6a135.3 135.3 0 0 0 22.3-45.6h35.66a88.29 88.29 0 0 1-57.96 45.6"
	}, null, -1)])]);
}
var globe_default = markRaw({
	name: "ph-globe",
	render
});
//#endregion
//#region src/components/LocaleSwitch.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "dropdown dropdown-end p-0 cursor-pointer" };
var _hoisted_2 = {
	tabindex: "0",
	role: "button",
	class: "flex gap-1 py-1 px-2"
};
var _hoisted_3 = {
	tabindex: "-1",
	class: "dropdown-content menu bg-base-100 rounded-box z-[1] shadow-lg -ml-4 mt-2"
};
var _hoisted_4 = ["onClick"];
//#endregion
//#region src/components/LocaleSwitch.vue
var LocaleSwitch_default = /* @__PURE__ */ defineComponent({
	__name: "LocaleSwitch",
	setup(__props) {
		const frontendStore = useFrontendStore();
		const { currentLocale } = storeToRefs(frontendStore);
		const LocaleTranslation = {
			de: "Deutsch",
			en: "English",
			es: "Español",
			fr: "Français",
			it: "Italiano",
			ja: "日本語",
			ko: "한국어",
			pl: "Polski",
			pt: "Português",
			pt_BR: "Português (Brasil)",
			sv: "Svenska",
			tr: "Türkçe",
			zh_CN: "简体中文"
		};
		return (_ctx, _cache) => {
			const _component_i_ph_globe = globe_default;
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [createBaseVNode("div", null, [createVNode(_component_i_ph_globe)])]), createBaseVNode("ul", _hoisted_3, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(i18n)?.global?.availableLocales, (locale) => {
				return openBlock(), createElementBlock("li", { key: `locale-${locale}` }, [createBaseVNode("button", {
					class: "text-primary-content px-4",
					onClick: ($event) => currentLocale.value = locale
				}, toDisplayString(LocaleTranslation[locale]), 9, _hoisted_4)]);
			}), 128))])]);
		};
	}
});
//#endregion
export { LocaleSwitch_default as t };
