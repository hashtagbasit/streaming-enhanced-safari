import { D as createVNode, Ht as watch, On as unref, Zn as normalizeClass, _ as createBaseVNode, b as createElementBlock, bt as renderList, g as computed, k as defineComponent, mt as openBlock, o as Fragment, tr as toDisplayString, y as createCommentVNode } from "./runtime-core.esm-bundler.js";
import { i as useOptionsStore, l as storeToRefs, o as useI18n } from "./options.store.js";
import { h as useRouter } from "./useApi-CROJJdhE.js";
import { t as Switch_default } from "./Switch.js";
import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.js";
//#region src/ui/options-page/pages/disabledSettings.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "overview-header" };
var _hoisted_2 = { class: "description" };
var _hoisted_3 = { class: "category-grid" };
var _hoisted_4 = {
	key: 0,
	class: "category-card"
};
var _hoisted_5 = { class: "category-card-header" };
var _hoisted_6 = { class: "count-badge" };
var _hoisted_7 = { class: "line flex" };
var _hoisted_8 = { class: "description setting-description" };
var _hoisted_9 = { class: "category-card-header" };
var _hoisted_10 = { class: "count-badge" };
var _hoisted_11 = { class: "line flex" };
var _hoisted_12 = { class: "description setting-description" };
//#endregion
//#region src/ui/options-page/pages/disabledSettings.vue
var disabledSettings_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "disabledSettings",
	setup(__props) {
		const { t } = useI18n();
		const optionsStore = useOptionsStore();
		const { settings } = storeToRefs(optionsStore);
		const settingsCategories = [
			"Video",
			"Amazon",
			"Netflix",
			"Disney",
			"Crunchyroll",
			"HBO",
			"Paramount"
		];
		const serviceCategories = [
			"Amazon",
			"Netflix",
			"Disney",
			"Crunchyroll",
			"HBO",
			"Paramount"
		];
		const excludedSettings = /* @__PURE__ */ new Set(["watchCredits", "epilepsy"]);
		const sharedServiceSettings = /* @__PURE__ */ new Set([
			"skipIntro",
			"skipCredits",
			"skipAd",
			"showRating",
			"speedSlider",
			"hideTitles"
		]);
		function isDisabledSetting(category, setting) {
			if (category !== "Video" && sharedServiceSettings.has(setting)) return false;
			const value = settings.value[category][setting];
			return !excludedSettings.has(setting) && typeof value === "boolean" && !value;
		}
		function isSharedSettingDisabled(setting) {
			if (!sharedServiceSettings.has(setting)) return false;
			return serviceCategories.some((category) => {
				const value = settings.value[category][setting];
				return typeof value === "boolean" && !value;
			});
		}
		function getSharedSettingValue(setting) {
			return serviceCategories.every((category) => {
				const value = settings.value[category][setting];
				if (typeof value !== "boolean") return true;
				return value;
			});
		}
		function setSharedSettingValue(setting, value) {
			serviceCategories.forEach((category) => {
				if (typeof settings.value[category][setting] === "boolean") settings.value[category][setting] = value;
			});
		}
		function getCategoryTitle(category) {
			if (category === "Video") return t("sharedSettings");
			if (category === "Amazon") return "Prime Video";
			if (category === "Disney") return "Disney+";
			return category;
		}
		function getCategoryTitleClass(category) {
			if (category === "Amazon") return "text-amazon";
			if (category === "Netflix") return "text-netflix";
			if (category === "Disney") return "text-disney";
			if (category === "Crunchyroll") return "text-crunchyroll";
			return "";
		}
		const disabledSettingsByCategory = computed(() => {
			return settingsCategories.map((category) => {
				return {
					category,
					disabledSettings: Object.keys(settings.value[category]).filter((setting) => isDisabledSetting(category, setting))
				};
			}).filter((group) => group.disabledSettings.length > 0);
		});
		const disabledSharedSettings = computed(() => {
			return Array.from(sharedServiceSettings).filter((setting) => isSharedSettingDisabled(setting));
		});
		const totalDisabledSettings = computed(() => {
			return disabledSettingsByCategory.value.reduce((sum, group) => sum + group.disabledSettings.length, 0) + disabledSharedSettings.value.length;
		});
		const hasDisabledSetting = computed(() => disabledSettingsByCategory.value.length > 0 || disabledSharedSettings.value.length > 0);
		const router = useRouter();
		watch(hasDisabledSetting, (value) => {
			if (!value) router.push("/options-page/SharedSettings");
		});
		return (_ctx, _cache) => {
			const _component_Switch = Switch_default;
			return openBlock(), createElementBlock(Fragment, null, [createBaseVNode("div", _hoisted_1, [createBaseVNode("h1", null, toDisplayString(_ctx.$t("disabledSettingsOverviewTitle")), 1), createBaseVNode("p", _hoisted_2, toDisplayString(_ctx.$t("disabledSettingsOverviewDescription", [unref(totalDisabledSettings), unref(disabledSettingsByCategory).length + (unref(disabledSharedSettings).length ? 1 : 0)])), 1)]), createBaseVNode("div", _hoisted_3, [unref(disabledSharedSettings).length ? (openBlock(), createElementBlock("section", _hoisted_4, [createBaseVNode("div", _hoisted_5, [createBaseVNode("h2", null, toDisplayString(_ctx.$t("sharedSettings")), 1), createBaseVNode("span", _hoisted_6, toDisplayString(unref(disabledSharedSettings).length), 1)]), (openBlock(true), createElementBlock(Fragment, null, renderList(unref(disabledSharedSettings), (setting) => {
				return openBlock(), createElementBlock("div", {
					key: setting,
					class: "setting-row"
				}, [createBaseVNode("div", _hoisted_7, [createBaseVNode("p", null, toDisplayString(_ctx.$t(setting + "Switch")), 1), createVNode(_component_Switch, {
					"model-value": getSharedSettingValue(setting),
					class: "ml-auto",
					"onUpdate:modelValue": ($event) => setSharedSettingValue(setting, $event)
				}, null, 8, ["model-value", "onUpdate:modelValue"])]), createBaseVNode("p", _hoisted_8, toDisplayString(_ctx.$t(setting + "Description")), 1)]);
			}), 128))])) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(unref(disabledSettingsByCategory), (group) => {
				return openBlock(), createElementBlock("section", {
					key: group.category,
					class: "category-card"
				}, [createBaseVNode("div", _hoisted_9, [createBaseVNode("h2", { class: normalizeClass(getCategoryTitleClass(group.category)) }, toDisplayString(getCategoryTitle(group.category)), 3), createBaseVNode("span", _hoisted_10, toDisplayString(group.disabledSettings.length), 1)]), (openBlock(true), createElementBlock(Fragment, null, renderList(group.disabledSettings, (setting) => {
					return openBlock(), createElementBlock("div", {
						key: setting,
						class: "setting-row"
					}, [createBaseVNode("div", _hoisted_11, [createBaseVNode("p", null, toDisplayString(_ctx.$t(setting + "Switch")), 1), createVNode(_component_Switch, {
						modelValue: unref(settings)[group.category][setting],
						"onUpdate:modelValue": ($event) => unref(settings)[group.category][setting] = $event,
						class: "ml-auto"
					}, null, 8, ["modelValue", "onUpdate:modelValue"])]), createBaseVNode("p", _hoisted_12, toDisplayString(_ctx.$t(setting + "Description")), 1)]);
				}), 128))]);
			}), 128))])], 64);
		};
	}
}), [["__scopeId", "data-v-5cfe36e6"]]);
//#endregion
export { disabledSettings_default as default };
