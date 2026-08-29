import { D as createVNode, _ as createBaseVNode, b as createElementBlock, fn as markRaw, k as defineComponent, mt as openBlock } from "./runtime-core.esm-bundler.js";
import { h as useRouter, m as useRoute } from "./useApi-CROJJdhE.js";
//#region ~icons/mdi/arrow-left
var _hoisted_1 = {
	viewBox: "0 0 24 24",
	width: "1.5em",
	height: "1.5em"
};
function render(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		fill: "currentColor",
		d: "M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11z"
	}, null, -1)])]);
}
var arrow_left_default = markRaw({
	name: "mdi-arrow-left",
	render
});
//#endregion
//#region src/components/RouterLinkUp.vue
var RouterLinkUp_default = /* @__PURE__ */ defineComponent({
	__name: "RouterLinkUp",
	setup(__props) {
		const router = useRouter();
		const route = useRoute();
		function back() {
			const currentPath = route.fullPath;
			const previousPath = router.options.history.state.back;
			if (previousPath != null && currentPath !== previousPath) router.back();
			else router.push("/action-popup");
		}
		return (_ctx, _cache) => {
			const _component_i_mdi_arrow_left = arrow_left_default;
			return openBlock(), createElementBlock("button", {
				class: "btn btn-sm my-4",
				onClick: back
			}, [createVNode(_component_i_mdi_arrow_left)]);
		};
	}
});
//#endregion
export { RouterLinkUp_default as t };
