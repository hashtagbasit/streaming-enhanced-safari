import { i as __toESM, t as require_browser_polyfill } from "./browser-polyfill.js";
import { E as createTextVNode, On as unref, _ as createBaseVNode, b as createElementBlock, bt as renderList, k as defineComponent, mt as openBlock, o as Fragment, tr as toDisplayString, vn as ref, y as createCommentVNode } from "./runtime-core.esm-bundler.js";
//#region src/components/OptionalPermission.vue?vue&type=script&setup=true&lang.ts
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
var _hoisted_1 = {
	key: 0,
	class: "border border-error rounded-lg bg-gray-400 p-4 flex flex-col gap-2 w-fit"
};
var _hoisted_2 = { class: "bg-gray-800 w-12 px-2 rounded text-error-content text-center" };
var _hoisted_3 = { class: "bg-gray-800 rounded text-error-content px-2" };
//#endregion
//#region src/components/OptionalPermission.vue
var OptionalPermission_default = /* @__PURE__ */ defineComponent({
	__name: "OptionalPermission",
	setup(__props) {
		const optionalPermissions = ["tabs"];
		const unsetPermissions = ref([]);
		checkOptionalPermissions();
		async function checkOptionalPermissions() {
			for (const permission of optionalPermissions) if (!await import_browser_polyfill.permissions.contains({ permissions: [permission] })) unsetPermissions.value.push(permission);
		}
		async function requestUnsetPermissions() {
			unsetPermissions.value.forEach(async (permission) => {
				if (await import_browser_polyfill.permissions.request({ permissions: [permission] })) unsetPermissions.value = unsetPermissions.value.filter((p) => p !== permission);
			});
		}
		return (_ctx, _cache) => {
			return unref(unsetPermissions).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("h1", null, toDisplayString(_ctx.$t("missingPermission")), 1),
				(openBlock(true), createElementBlock(Fragment, null, renderList(unref(unsetPermissions), (permission) => {
					return openBlock(), createElementBlock("div", {
						key: permission,
						class: "flex text-primary-content"
					}, [
						createBaseVNode("div", _hoisted_2, toDisplayString(permission), 1),
						_cache[0] || (_cache[0] = createTextVNode(" -> ", -1)),
						createBaseVNode("div", _hoisted_3, toDisplayString(_ctx.$t(permission + "Permission")), 1)
					]);
				}), 128)),
				createBaseVNode("button", {
					class: "btn btn-error w-fit",
					onClick: requestUnsetPermissions
				}, toDisplayString(_ctx.$t("addPermissionButton")), 1)
			])) : createCommentVNode("", true);
		};
	}
});
//#endregion
export { OptionalPermission_default as t };
