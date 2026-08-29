import { i as __toESM, t as require_browser_polyfill } from "./browser-polyfill.js";
import { On as unref, _ as createBaseVNode, b as createElementBlock, k as defineComponent, mt as openBlock, o as Fragment, tr as toDisplayString } from "./runtime-core.esm-bundler.js";
import { i as useOptionsStore, l as storeToRefs, o as useI18n } from "./options.store.js";
//#region src/ui/options-page/pages/Backup.vue?vue&type=script&setup=true&lang.ts
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
var _hoisted_1 = { class: "flex flex-col flex-align" };
var _hoisted_2 = ["href"];
var _hoisted_3 = { class: "flex flex-row flex-align" };
//#endregion
//#region src/ui/options-page/pages/Backup.vue
var Backup_default = /* @__PURE__ */ defineComponent({
	__name: "Backup",
	setup(__props) {
		const { t } = useI18n();
		const optionsStore = useOptionsStore();
		const { settings } = storeToRefs(optionsStore);
		async function resetAddon() {
			if (confirm(t("resetConfirm"))) {
				await import_browser_polyfill.storage.local.clear();
				await import_browser_polyfill.storage.sync.clear();
				location.reload();
			}
		}
		let file = new Blob([JSON.stringify(settings.value)], { type: "text/json" });
		const href = URL.createObjectURL(file);
		function replaceSettings(event) {
			const file = event.target.files?.[0];
			if (file === void 0 || file.type !== "application/json") {
				alert(t("invalidJson"));
				return;
			} else {
				const reader = new FileReader();
				reader.addEventListener("load", (e) => {
					try {
						const data = JSON.parse(e.target?.result);
						settings.value = data;
					} catch (e) {
						alert(t("invalidJson"));
						return;
					}
				});
				reader.readAsText(file);
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createBaseVNode("div", null, [createBaseVNode("div", _hoisted_1, [
				createBaseVNode("h2", null, toDisplayString(_ctx.$t("importSettings")), 1),
				createBaseVNode("div", null, [createBaseVNode("a", {
					class: "btn btn-secondary rounded-2xl my-2",
					href: unref(href),
					download: "settings.json"
				}, toDisplayString(_ctx.$t("saveSettings")), 9, _hoisted_2)]),
				createBaseVNode("div", _hoisted_3, [createBaseVNode("p", null, toDisplayString(_ctx.$t("uploadSettings")), 1), createBaseVNode("input", {
					type: "file",
					name: "settings",
					accept: "text/json",
					class: "file-input w-full max-w-xs",
					onChange: replaceSettings
				}, null, 32)])
			])]), createBaseVNode("div", {
				class: "btn btn-secondary rounded-2xl reset my-2",
				onClick: resetAddon
			}, toDisplayString(_ctx.$t("resetAddon")), 1)], 64);
		};
	}
});
//#endregion
export { Backup_default as default };
