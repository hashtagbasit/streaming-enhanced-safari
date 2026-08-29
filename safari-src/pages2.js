import { g as computed, k as defineComponent } from "./runtime-core.esm-bundler.js";
import { i as useOptionsStore, l as storeToRefs, t as SettingsPromise } from "./options.store.js";
import { h as useRouter } from "./useApi-CROJJdhE.js";
//#endregion
//#region src/ui/options-page/pages/index.vue
var pages_default = /* @__PURE__ */ defineComponent({
	__name: "index",
	setup(__props) {
		const optionsStore = useOptionsStore();
		const { settings } = storeToRefs(optionsStore);
		const settingsCategories = [
			"Video",
			"Amazon",
			"Netflix",
			"Disney",
			"Crunchyroll",
			"HBO"
		];
		const hasDisabledSetting = computed(() => {
			return settingsCategories.some((category) => {
				return Object.keys(settings.value[category]).some((setting) => {
					return !settings.value[category][setting] && setting != "watchCredits" && setting != "epilepsy" && typeof settings.value[category][setting] === "boolean";
				});
			});
		});
		const router = useRouter();
		openSettings();
		async function openSettings() {
			await SettingsPromise;
			if (hasDisabledSetting.value) router.push("/options-page/disabledSettings");
			else router.push("/options-page/SharedSettings");
		}
		return (_ctx, _cache) => {
			return "You found my easter egg! 🐣";
		};
	}
});
//#endregion
export { pages_default as default };
