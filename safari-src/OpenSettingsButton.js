import { b as createElementBlock, k as defineComponent, mt as openBlock, tr as toDisplayString } from "./runtime-core.esm-bundler.js";
import { h as useRouter } from "./useApi-CROJJdhE.js";
//#endregion
//#region src/components/OpenSettingsButton.vue
var OpenSettingsButton_default = /* @__PURE__ */ defineComponent({
	__name: "OpenSettingsButton",
	setup(__props) {
		const router = useRouter();
		const gotoSettings = () => {
			router.push("/action-popup/SharedOptions");
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("button", {
				class: "btn btn-secondary rounded-2xl w-full mt-auto",
				onClick: gotoSettings
			}, toDisplayString(_ctx.$t("openSharedSettings")), 1);
		};
	}
});
//#endregion
export { OpenSettingsButton_default as t };
