import { _ as createBaseVNode, b as createElementBlock, fn as markRaw, mt as openBlock } from "./runtime-core.esm-bundler.js";
//#region ~icons/mdi/help-circle
var _hoisted_1 = {
	viewBox: "0 0 24 24",
	width: "1.5em",
	height: "1.5em"
};
function render(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		fill: "currentColor",
		d: "m15.07 11.25l-.9.92C13.45 12.89 13 13.5 13 15h-2v-.5c0-1.11.45-2.11 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41a2 2 0 0 0-2-2a2 2 0 0 0-2 2H8a4 4 0 0 1 4-4a4 4 0 0 1 4 4a3.2 3.2 0 0 1-.93 2.25M13 19h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10"
	}, null, -1)])]);
}
var help_circle_default = markRaw({
	name: "mdi-help-circle",
	render
});
//#endregion
export { help_circle_default as t };
