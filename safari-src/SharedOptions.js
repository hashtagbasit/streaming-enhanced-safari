import { D as createVNode, On as unref, Yt as withDirectives, _ as createBaseVNode, b as createElementBlock, g as computed, k as defineComponent, mt as openBlock, o as Fragment, tr as toDisplayString, un as isRef } from "./runtime-core.esm-bundler.js";
import { d as vModelSelect, i as useOptionsStore, l as storeToRefs } from "./options.store.js";
import { t as Switch_default } from "./Switch.js";
import { t as help_circle_default } from "./help-circle.js";
import { t as RouterLinkUp_default } from "./RouterLinkUp.js";
import { t as streamingServices } from "./streamingServices.js";
//#endregion
//#region src/ui/action-popup/pages/SharedOptions.vue?vue&type=script&setup=true&lang.ts
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
var _hoisted_6 = { class: "py-1 m-0 flex" };
var _hoisted_7 = { class: "tooltip flex" };
var _hoisted_8 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_9 = { class: "py-1 m-0 flex" };
var _hoisted_10 = { class: "tooltip flex" };
var _hoisted_11 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_12 = { class: "py-1 m-0 flex" };
var _hoisted_13 = { class: "tooltip flex" };
var _hoisted_14 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_15 = { class: "py-1 m-0 flex" };
var _hoisted_16 = { class: "tooltip flex" };
var _hoisted_17 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_18 = { class: "py-1 m-0 flex" };
var _hoisted_19 = { class: "tooltip flex" };
var _hoisted_20 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_21 = { class: "py-1 m-0 flex" };
var _hoisted_22 = { class: "tooltip flex" };
var _hoisted_23 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_24 = { class: "py-1 m-0 flex" };
var _hoisted_25 = { class: "tooltip flex" };
var _hoisted_26 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_27 = { class: "py-1 m-0 flex" };
var _hoisted_28 = { class: "tooltip flex" };
var _hoisted_29 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_30 = { class: "py-1 m-0 flex" };
var _hoisted_31 = { class: "tooltip flex" };
var _hoisted_32 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_33 = { class: "py-1 m-0 flex" };
var _hoisted_34 = { class: "tooltip flex" };
var _hoisted_35 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_36 = { class: "py-1 m-0 flex" };
var _hoisted_37 = { class: "tooltip flex" };
var _hoisted_38 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
//#endregion
//#region src/ui/action-popup/pages/SharedOptions.vue
var SharedOptions_default = /* @__PURE__ */ defineComponent({
	__name: "SharedOptions",
	setup(__props) {
		const optionsStore = useOptionsStore();
		const { settings } = storeToRefs(optionsStore);
		const skipIntro = computed({
			get: () => streamingServices.every((service) => settings.value[service].skipIntro),
			set: (value) => {
				streamingServices.forEach((service) => {
					settings.value[service].skipIntro = value;
				});
			}
		});
		const skipCredits = computed({
			get: () => streamingServices.every((service) => settings.value[service]?.skipCredits ?? true),
			set: (value) => {
				streamingServices.forEach((service) => {
					if (settings.value[service]?.skipCredits !== void 0) settings.value[service].skipCredits = value;
				});
				if (value) streamingServices.forEach((service) => {
					if (settings.value[service]?.watchCredits !== void 0) settings.value[service].watchCredits = false;
				});
			}
		});
		const watchCredits = computed({
			get: () => streamingServices.every((service) => settings.value[service]?.watchCredits ?? true),
			set: (value) => {
				streamingServices.forEach((service) => {
					if (settings.value[service]?.watchCredits !== void 0) settings.value[service].watchCredits = value;
				});
				if (value) streamingServices.forEach((service) => {
					if (settings.value[service]?.skipCredits !== void 0) settings.value[service].skipCredits = false;
				});
			}
		});
		const blockAds = computed({
			get: () => settings.value?.Amazon.skipAd && settings.value?.Netflix.skipAd && settings.value?.Disney.skipAd && settings.value?.Paramount.skipAd,
			set: (value) => {
				settings.value.Amazon.skipAd = settings.value.Netflix.skipAd = settings.value.Disney.skipAd = settings.value.Paramount.skipAd = value;
			}
		});
		const speedSlider = computed({
			get: () => streamingServices.every((service) => settings.value[service].speedSlider),
			set: (value) => {
				streamingServices.forEach((service) => {
					settings.value[service].speedSlider = value;
				});
			}
		});
		const showRating = computed({
			get: () => streamingServices.every((service) => settings.value[service]?.showRating ?? true),
			set: (value) => {
				streamingServices.forEach((service) => {
					if (settings.value[service]?.showRating !== void 0) settings.value[service].showRating = value;
				});
			}
		});
		const hideTitles = computed({
			get: () => settings.value?.Netflix.hideTitles && settings.value?.Disney.hideTitles,
			set: (value) => {
				settings.value.Netflix.hideTitles = settings.value.Disney.hideTitles = value;
			}
		});
		return (_ctx, _cache) => {
			const _component_RouterLinkUp = RouterLinkUp_default;
			const _component_i_mdi_help_circle = help_circle_default;
			const _component_Switch = Switch_default;
			return openBlock(), createElementBlock(Fragment, null, [
				createBaseVNode("div", _hoisted_1, [createVNode(_component_RouterLinkUp), createBaseVNode("h1", _hoisted_2, toDisplayString(_ctx.$t("sharedPageTitle")), 1)]),
				createBaseVNode("div", _hoisted_3, [createBaseVNode("div", _hoisted_4, [
					createBaseVNode("p", null, toDisplayString(_ctx.$t("skipIntroSwitch")), 1),
					createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
					createBaseVNode("div", _hoisted_5, toDisplayString(_ctx.$t("skipIntroDescription")), 1)
				]), createVNode(_component_Switch, {
					modelValue: unref(skipIntro),
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(skipIntro) ? skipIntro.value = $event : null),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				_cache[11] || (_cache[11] = createBaseVNode("hr", null, null, -1)),
				createBaseVNode("div", _hoisted_6, [createBaseVNode("div", _hoisted_7, [
					createBaseVNode("p", null, toDisplayString(_ctx.$t("skipCreditsSwitch")), 1),
					createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
					createBaseVNode("div", _hoisted_8, toDisplayString(_ctx.$t("skipCreditsDescription")), 1)
				]), createVNode(_component_Switch, {
					modelValue: unref(skipCredits),
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(skipCredits) ? skipCredits.value = $event : null),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("div", _hoisted_9, [createBaseVNode("div", _hoisted_10, [
					createBaseVNode("p", null, toDisplayString(_ctx.$t("watchCreditsSwitch")), 1),
					createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
					createBaseVNode("div", _hoisted_11, toDisplayString(_ctx.$t("watchCreditsDescription")), 1)
				]), createVNode(_component_Switch, {
					modelValue: unref(watchCredits),
					"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(watchCredits) ? watchCredits.value = $event : null),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				_cache[12] || (_cache[12] = createBaseVNode("hr", null, null, -1)),
				createBaseVNode("div", _hoisted_12, [createBaseVNode("div", _hoisted_13, [
					createBaseVNode("p", null, toDisplayString(_ctx.$t("skipAdSwitch")), 1),
					createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
					createBaseVNode("div", _hoisted_14, toDisplayString(_ctx.$t("skipAdDescription")), 1)
				]), createVNode(_component_Switch, {
					modelValue: unref(blockAds),
					"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(blockAds) ? blockAds.value = $event : null),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("div", _hoisted_15, [createBaseVNode("div", _hoisted_16, [
					createBaseVNode("p", null, toDisplayString(_ctx.$t("speedSliderSwitch")), 1),
					createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
					createBaseVNode("div", _hoisted_17, toDisplayString(_ctx.$t("speedSliderDescription")), 1)
				]), createVNode(_component_Switch, {
					modelValue: unref(speedSlider),
					"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => isRef(speedSlider) ? speedSlider.value = $event : null),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("div", _hoisted_18, [createBaseVNode("div", _hoisted_19, [
					createBaseVNode("p", null, toDisplayString(_ctx.$t("playOnFullScreenSwitch")), 1),
					createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
					createBaseVNode("div", _hoisted_20, toDisplayString(_ctx.$t("playOnFullScreenDescription")), 1)
				]), createVNode(_component_Switch, {
					modelValue: unref(settings).Video.playOnFullScreen,
					"onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => unref(settings).Video.playOnFullScreen = $event),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("div", _hoisted_21, [createBaseVNode("div", _hoisted_22, [
					createBaseVNode("p", null, toDisplayString(_ctx.$t("doubleClickSwitch")), 1),
					createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
					createBaseVNode("div", _hoisted_23, toDisplayString(_ctx.$t("doubleClickDescription")), 1)
				]), createVNode(_component_Switch, {
					modelValue: unref(settings).Video.doubleClick,
					"onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => unref(settings).Video.doubleClick = $event),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("div", _hoisted_24, [createBaseVNode("div", _hoisted_25, [
					createBaseVNode("p", null, toDisplayString(_ctx.$t("scrollVolumeSwitch")), 1),
					createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
					createBaseVNode("div", _hoisted_26, toDisplayString(_ctx.$t("scrollVolumeDescription")), 1)
				]), createVNode(_component_Switch, {
					modelValue: unref(settings).Video.scrollVolume,
					"onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => unref(settings).Video.scrollVolume = $event),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("div", _hoisted_36, [createBaseVNode("div", _hoisted_37, [
					createBaseVNode("p", null, toDisplayString(_ctx.$t("stretchSwitch")), 1),
					createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
					createBaseVNode("div", _hoisted_38, toDisplayString(_ctx.$t("stretchDescription")), 1)
				]), withDirectives(createBaseVNode("select", {
					"onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => unref(settings).Video.stretch = $event),
					class: "select select-bordered select-sm ml-auto"
				}, [
					createBaseVNode("option", { value: "off" }, toDisplayString(_ctx.$t("stretchOff")), 1),
					createBaseVNode("option", { value: "fill" }, toDisplayString(_ctx.$t("stretchFill")), 1),
					createBaseVNode("option", { value: "zoom" }, toDisplayString(_ctx.$t("stretchZoom")), 1)
				], 512), [[vModelSelect, unref(settings).Video.stretch]])]),
				createBaseVNode("div", _hoisted_27, [createBaseVNode("div", _hoisted_28, [
					createBaseVNode("p", null, toDisplayString(_ctx.$t("hideTitlesSwitch")), 1),
					createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
					createBaseVNode("div", _hoisted_29, toDisplayString(_ctx.$t("hideTitlesDescription")), 1)
				]), createVNode(_component_Switch, {
					modelValue: unref(hideTitles),
					"onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => isRef(hideTitles) ? hideTitles.value = $event : null),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("div", _hoisted_30, [createBaseVNode("div", _hoisted_31, [
					createBaseVNode("p", null, toDisplayString(_ctx.$t("showRatingSwitch")), 1),
					createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
					createBaseVNode("div", _hoisted_32, toDisplayString(_ctx.$t("showRatingDescription")), 1)
				]), createVNode(_component_Switch, {
					modelValue: unref(showRating),
					"onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => isRef(showRating) ? showRating.value = $event : null),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("div", _hoisted_33, [createBaseVNode("div", _hoisted_34, [
					createBaseVNode("p", null, toDisplayString(_ctx.$t("showYearSwitch")), 1),
					createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
					createBaseVNode("div", _hoisted_35, toDisplayString(_ctx.$t("showYearDescription")), 1)
				]), createVNode(_component_Switch, {
					modelValue: unref(settings).Video.showYear,
					"onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => unref(settings).Video.showYear = $event),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				_cache[13] || (_cache[13] = createBaseVNode("a", {
					href: "https://www.themoviedb.org",
					target: "_blank",
					class: "py-1 m-0 flex"
				}, [createBaseVNode("img", {
					src: "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20489.04%2035.4'%3e%3cdefs%3e%3cstyle%3e%20.cls-1%20{%20fill:%20url(%23linear-gradient);%20}%20%3c/style%3e%3clinearGradient%20id='linear-gradient'%20y1='17.7'%20x2='489.04'%20y2='17.7'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%2390cea1'%20/%3e%3cstop%20offset='0.56'%20stop-color='%233cbec9'%20/%3e%3cstop%20offset='1'%20stop-color='%2300b3e5'%20/%3e%3c/linearGradient%3e%3c/defs%3e%3ctitle%3eAsset%205%3c/title%3e%3cg%20id='Layer_2'%20data-name='Layer%202'%3e%3cg%20id='Layer_1-2'%20data-name='Layer%201'%3e%3cpath%20class='cls-1'%20d='M293.5,0h8.9l8.75,23.2h.1L320.15,0h8.35L313.9,35.4h-6.25Zm46.6,0h7.8V35.4h-7.8Zm22.2,0h24.05V7.2H370.1v6.6h15.35V21H370.1v7.2h17.15v7.2H362.3Zm55,0H429a33.54,33.54,0,0,1,8.07,1A18.55,18.55,0,0,1,443.75,4a15.1,15.1,0,0,1,4.52,5.53A18.5,18.5,0,0,1,450,17.8a16.91,16.91,0,0,1-1.63,7.58,16.37,16.37,0,0,1-4.37,5.5,19.52,19.52,0,0,1-6.35,3.37A24.59,24.59,0,0,1,430,35.4H417.29Zm7.81,28.2h4a21.57,21.57,0,0,0,5-.55,10.87,10.87,0,0,0,4-1.83,8.69,8.69,0,0,0,2.67-3.34,11.92,11.92,0,0,0,1-5.08,9.87,9.87,0,0,0-1-4.52,9,9,0,0,0-2.62-3.18,11.68,11.68,0,0,0-3.88-1.88,17.43,17.43,0,0,0-4.67-.62h-4.6ZM461.24,0h13.2a34.42,34.42,0,0,1,4.63.32,12.9,12.9,0,0,1,4.17,1.3,7.88,7.88,0,0,1,3,2.73A8.34,8.34,0,0,1,487.39,9a7.42,7.42,0,0,1-1.67,5,9.28,9.28,0,0,1-4.43,2.82v.1a10,10,0,0,1,3.18,1,8.38,8.38,0,0,1,2.45,1.85,7.79,7.79,0,0,1,1.57,2.62,9.16,9.16,0,0,1,.55,3.2,8.52,8.52,0,0,1-1.2,4.68,9.42,9.42,0,0,1-3.1,3,13.38,13.38,0,0,1-4.27,1.65,23.11,23.11,0,0,1-4.73.5h-14.5ZM469,14.15h5.65a8.16,8.16,0,0,0,1.78-.2A4.78,4.78,0,0,0,478,13.3a3.34,3.34,0,0,0,1.13-1.2,3.63,3.63,0,0,0,.42-1.8,3.22,3.22,0,0,0-.47-1.82,3.33,3.33,0,0,0-1.23-1.13,5.77,5.77,0,0,0-1.7-.58,10.79,10.79,0,0,0-1.85-.17H469Zm0,14.65h7a8.91,8.91,0,0,0,1.83-.2,4.78,4.78,0,0,0,1.67-.7,4,4,0,0,0,1.23-1.3,3.71,3.71,0,0,0,.47-2,3.13,3.13,0,0,0-.62-2A4,4,0,0,0,479,21.45,7.83,7.83,0,0,0,477,20.9a15.12,15.12,0,0,0-2.05-.15H469Zm-265,6.53H271a17.66,17.66,0,0,0,17.66-17.66h0A17.67,17.67,0,0,0,271,0H204.06A17.67,17.67,0,0,0,186.4,17.67h0A17.66,17.66,0,0,0,204.06,35.33ZM10.1,6.9H0V0H28V6.9H17.9V35.4H10.1ZM39,0h7.8V13.2H61.9V0h7.8V35.4H61.9V20.1H46.75V35.4H39ZM80.2,0h24V7.2H88v6.6h15.35V21H88v7.2h17.15v7.2h-25Zm55,0H147l8.15,23.1h.1L163.45,0H175.2V35.4h-7.8V8.25h-.1L158,35.4h-5.95l-9-27.15H143V35.4h-7.8Z'%20/%3e%3c/g%3e%3c/g%3e%3c/svg%3e",
					alt: "TMDB"
				})], -1))
			], 64);
		};
	}
});
//#endregion
export { SharedOptions_default as default };
