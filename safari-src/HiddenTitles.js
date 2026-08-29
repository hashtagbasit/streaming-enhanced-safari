import { D as createVNode, E as createTextVNode, Ht as watch, On as unref, Yt as withDirectives, Zn as normalizeClass, _ as createBaseVNode, b as createElementBlock, bt as renderList, fn as markRaw, g as computed, k as defineComponent, mt as openBlock, o as Fragment, tr as toDisplayString, un as isRef, v as createBlock, vn as ref } from "./runtime-core.esm-bundler.js";
import { d as vModelSelect, f as vModelText, l as storeToRefs, o as useI18n, r as useHiddenTitlesStore } from "./options.store.js";
import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.js";
//#region ~icons/mdi/close
var _hoisted_1$5 = {
	viewBox: "0 0 24 24",
	width: "1.5em",
	height: "1.5em"
};
function render$4(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$5, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		fill: "currentColor",
		d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
	}, null, -1)])]);
}
var close_default = markRaw({
	name: "mdi-close",
	render: render$4
});
//#endregion
//#region ~icons/mdi/view-list
var _hoisted_1$4 = {
	viewBox: "0 0 24 24",
	width: "1.5em",
	height: "1.5em"
};
function render$3(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$4, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		fill: "currentColor",
		d: "M9 5v4h12V5M9 19h12v-4H9m0-1h12v-4H9M4 9h4V5H4m0 14h4v-4H4m0-1h4v-4H4z"
	}, null, -1)])]);
}
var view_list_default = markRaw({
	name: "mdi-view-list",
	render: render$3
});
//#endregion
//#region ~icons/mdi/view-grid
var _hoisted_1$3 = {
	viewBox: "0 0 24 24",
	width: "1.5em",
	height: "1.5em"
};
function render$2(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$3, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		fill: "currentColor",
		d: "M3 11h8V3H3m0 18h8v-8H3m10 8h8v-8h-8m0-10v8h8V3"
	}, null, -1)])]);
}
var view_grid_default = markRaw({
	name: "mdi-view-grid",
	render: render$2
});
//#endregion
//#region ~icons/mdi/sort-descending
var _hoisted_1$2 = {
	viewBox: "0 0 24 24",
	width: "1.5em",
	height: "1.5em"
};
function render$1(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$2, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		fill: "currentColor",
		d: "M19 7h3l-4-4l-4 4h3v14h2M2 17h10v2H2M6 5v2H2V5m0 6h7v2H2z"
	}, null, -1)])]);
}
var sort_descending_default = markRaw({
	name: "mdi-sort-descending",
	render: render$1
});
//#endregion
//#region ~icons/mdi/sort-ascending
var _hoisted_1$1 = {
	viewBox: "0 0 24 24",
	width: "1.5em",
	height: "1.5em"
};
function render(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		fill: "currentColor",
		d: "M19 17h3l-4 4l-4-4h3V3h2M2 17h10v2H2M6 5v2H2V5m0 6h7v2H2z"
	}, null, -1)])]);
}
var sort_ascending_default = markRaw({
	name: "mdi-sort-ascending",
	render
});
//#endregion
//#region src/utils/tmdb.ts
async function fetchPosterInfo(title, mediaType) {
	const locale = navigator?.language || "en-US";
	const url = `https://api.themoviedb.org/3/search/${mediaType ?? "multi"}?query=${encodeURIComponent(title)}&include_adult=false&language=${locale}&page=1`;
	try {
		const movie = (await (await fetch(url, {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWQyMWUxMmYzNjU1MjM4NzdhNTAwODVhMmVjYThiZiIsInN1YiI6IjY1M2E3Mjg3MjgxMWExMDBlYTA4NjI5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x_EaVXQkg1_plk0NVSBnoNUl4QlGytdeO613nXIsP3w`
			}
		})).json())?.results?.filter((item) => item.media_type?.toLowerCase() !== "person")?.[0];
		if (!movie) return null;
		return {
			posterPath: movie.poster_path ?? null,
			mediaType: mediaType ?? movie.media_type ?? null
		};
	} catch (error) {
		console.error("fetchPosterInfo failed", title, error);
		return null;
	}
}
//#endregion
//#region src/ui/options-page/pages/HiddenTitles.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "description" };
var _hoisted_2 = { class: "toolbar flex flex-wrap items-center gap-2 my-2" };
var _hoisted_3 = ["placeholder"];
var _hoisted_4 = { value: "all" };
var _hoisted_5 = { value: "Unknown" };
var _hoisted_6 = { value: "all" };
var _hoisted_7 = { value: "movie" };
var _hoisted_8 = { value: "tv" };
var _hoisted_9 = { value: "dateAdded" };
var _hoisted_10 = { value: "title" };
var _hoisted_11 = { value: "platform" };
var _hoisted_12 = ["title"];
var _hoisted_13 = { class: "join" };
var _hoisted_14 = ["title"];
var _hoisted_15 = ["title"];
var _hoisted_16 = { class: "flex items-center gap-1 cursor-pointer ml-auto" };
var _hoisted_17 = ["checked"];
var _hoisted_18 = ["disabled"];
var _hoisted_19 = ["disabled"];
var _hoisted_20 = {
	key: 0,
	class: "description"
};
var _hoisted_21 = {
	key: 1,
	class: "grid-container"
};
var _hoisted_22 = ["checked", "onChange"];
var _hoisted_23 = ["title", "onClick"];
var _hoisted_24 = ["src", "alt"];
var _hoisted_25 = {
	key: 1,
	class: "poster poster-placeholder"
};
var _hoisted_26 = ["title"];
var _hoisted_27 = { class: "platform-badge" };
var _hoisted_28 = {
	key: 2,
	class: "w-full detail-table"
};
var _hoisted_29 = ["checked", "onChange"];
var _hoisted_30 = ["src", "alt"];
var _hoisted_31 = {
	key: 1,
	class: "thumb poster-placeholder"
};
var _hoisted_32 = ["onClick"];
var POSTER_BASE = "https://image.tmdb.org/t/p/w154";
//#endregion
//#region src/ui/options-page/pages/HiddenTitles.vue
var HiddenTitles_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "HiddenTitles",
	setup(__props) {
		const { t } = useI18n();
		const hiddenTitlesStore = useHiddenTitlesStore();
		const { hiddenTitles } = storeToRefs(hiddenTitlesStore);
		const KNOWN_PLATFORM_LABELS = {
			Netflix: "Netflix",
			Amazon: "Prime Video",
			Disney: "Disney+"
		};
		function platformLabel(platform) {
			return KNOWN_PLATFORM_LABELS[platform] ?? t("unknownPlatform");
		}
		const search = ref("");
		const platformFilter = ref("all");
		const typeFilter = ref("all");
		const sortKey = ref("dateAdded");
		const sortDir = ref("desc");
		const viewMode = ref("icon");
		const selected = ref({});
		const rows = computed(() => Object.entries(hiddenTitles.value).map(([title, entry]) => ({
			title,
			...entry
		})));
		const filteredRows = computed(() => {
			let list = rows.value;
			const query = search.value.trim().toLowerCase();
			if (query) list = list.filter((row) => row.title.toLowerCase().includes(query));
			if (platformFilter.value !== "all") list = list.filter((row) => row.platform === platformFilter.value);
			if (typeFilter.value !== "all") list = list.filter((row) => row.mediaType === typeFilter.value);
			return [...list].sort((a, b) => {
				let cmp;
				if (sortKey.value === "title") cmp = a.title.localeCompare(b.title);
				else if (sortKey.value === "platform") cmp = a.platform.localeCompare(b.platform);
				else cmp = a.dateAdded.localeCompare(b.dateAdded);
				return sortDir.value === "asc" ? cmp : -cmp;
			});
		});
		function setSort(key) {
			if (sortKey.value === key) sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
			else {
				sortKey.value = key;
				sortDir.value = key === "dateAdded" ? "desc" : "asc";
			}
		}
		const selectedCount = computed(() => Object.values(selected.value).filter(Boolean).length);
		const allVisibleSelected = computed(() => filteredRows.value.length > 0 && filteredRows.value.every((row) => selected.value[row.title]));
		function toggleSelectAll() {
			const newValue = !allVisibleSelected.value;
			filteredRows.value.forEach((row) => {
				selected.value[row.title] = newValue;
			});
		}
		function show(title) {
			delete hiddenTitles.value[title];
			delete selected.value[title];
		}
		function unblockSelected() {
			Object.keys(selected.value).filter((title) => selected.value[title]).forEach(show);
		}
		function showAll() {
			if (!confirm(t("unhideAllConfirm"))) return;
			hiddenTitles.value = {};
			selected.value = {};
		}
		const fetchingTitles = /* @__PURE__ */ new Set();
		async function ensurePosters() {
			const missing = filteredRows.value.filter((row) => row.posterPath === null && !fetchingTitles.has(row.title)).slice(0, 60);
			for (const row of missing) {
				fetchingTitles.add(row.title);
				fetchPosterInfo(row.title, row.mediaType).then((info) => {
					fetchingTitles.delete(row.title);
					const current = hiddenTitles.value[row.title];
					if (!current) return;
					hiddenTitles.value[row.title] = {
						...current,
						posterPath: info?.posterPath ?? "",
						mediaType: current.mediaType ?? info?.mediaType ?? null
					};
				});
			}
		}
		watch(filteredRows, ensurePosters, { immediate: true });
		return (_ctx, _cache) => {
			const _component_i_mdi_sort_ascending = sort_ascending_default;
			const _component_i_mdi_sort_descending = sort_descending_default;
			const _component_i_mdi_view_grid = view_grid_default;
			const _component_i_mdi_view_list = view_list_default;
			const _component_i_mdi_close = close_default;
			return openBlock(), createElementBlock(Fragment, null, [
				createBaseVNode("h1", null, toDisplayString(_ctx.$t("hiddenTitlesPageTitle")), 1),
				createBaseVNode("p", _hoisted_1, toDisplayString(_ctx.$t("hiddenTitlesPageDescription")), 1),
				createBaseVNode("div", _hoisted_2, [
					withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(search) ? search.value = $event : null),
						type: "text",
						placeholder: _ctx.$t("searchPlaceholder"),
						class: "input input-bordered input-sm"
					}, null, 8, _hoisted_3), [[vModelText, unref(search)]]),
					withDirectives(createBaseVNode("select", {
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(platformFilter) ? platformFilter.value = $event : null),
						class: "select select-bordered select-sm"
					}, [
						createBaseVNode("option", _hoisted_4, toDisplayString(_ctx.$t("allPlatforms")), 1),
						_cache[10] || (_cache[10] = createBaseVNode("option", { value: "Netflix" }, "Netflix", -1)),
						_cache[11] || (_cache[11] = createBaseVNode("option", { value: "Amazon" }, "Prime Video", -1)),
						_cache[12] || (_cache[12] = createBaseVNode("option", { value: "Disney" }, "Disney+", -1)),
						createBaseVNode("option", _hoisted_5, toDisplayString(_ctx.$t("unknownPlatform")), 1)
					], 512), [[vModelSelect, unref(platformFilter)]]),
					withDirectives(createBaseVNode("select", {
						"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(typeFilter) ? typeFilter.value = $event : null),
						class: "select select-bordered select-sm"
					}, [
						createBaseVNode("option", _hoisted_6, toDisplayString(_ctx.$t("allTypes")), 1),
						createBaseVNode("option", _hoisted_7, toDisplayString(_ctx.$t("movieType")), 1),
						createBaseVNode("option", _hoisted_8, toDisplayString(_ctx.$t("tvType")), 1)
					], 512), [[vModelSelect, unref(typeFilter)]]),
					withDirectives(createBaseVNode("select", {
						"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(sortKey) ? sortKey.value = $event : null),
						class: "select select-bordered select-sm"
					}, [
						createBaseVNode("option", _hoisted_9, toDisplayString(_ctx.$t("sortDateAdded")), 1),
						createBaseVNode("option", _hoisted_10, toDisplayString(_ctx.$t("sortTitle")), 1),
						createBaseVNode("option", _hoisted_11, toDisplayString(_ctx.$t("sortPlatform")), 1)
					], 512), [[vModelSelect, unref(sortKey)]]),
					createBaseVNode("button", {
						class: "btn btn-sm",
						title: unref(sortDir) === "asc" ? "A-Z" : "Z-A",
						onClick: _cache[4] || (_cache[4] = ($event) => sortDir.value = unref(sortDir) === "asc" ? "desc" : "asc")
					}, [unref(sortDir) === "asc" ? (openBlock(), createBlock(_component_i_mdi_sort_ascending, { key: 0 })) : (openBlock(), createBlock(_component_i_mdi_sort_descending, { key: 1 }))], 8, _hoisted_12),
					createBaseVNode("div", _hoisted_13, [createBaseVNode("button", {
						class: normalizeClass(["btn btn-sm join-item", unref(viewMode) === "icon" ? "btn-active" : ""]),
						title: _ctx.$t("viewIcon"),
						onClick: _cache[5] || (_cache[5] = ($event) => viewMode.value = "icon")
					}, [createVNode(_component_i_mdi_view_grid)], 10, _hoisted_14), createBaseVNode("button", {
						class: normalizeClass(["btn btn-sm join-item", unref(viewMode) === "list" ? "btn-active" : ""]),
						title: _ctx.$t("viewList"),
						onClick: _cache[6] || (_cache[6] = ($event) => viewMode.value = "list")
					}, [createVNode(_component_i_mdi_view_list)], 10, _hoisted_15)]),
					createBaseVNode("label", _hoisted_16, [createBaseVNode("input", {
						type: "checkbox",
						class: "checkbox checkbox-sm",
						checked: unref(allVisibleSelected),
						onChange: toggleSelectAll
					}, null, 40, _hoisted_17), createTextVNode(" " + toDisplayString(_ctx.$t("selectAll")), 1)]),
					createBaseVNode("button", {
						class: "btn btn-sm btn-error",
						disabled: unref(selectedCount) === 0,
						onClick: unblockSelected
					}, toDisplayString(_ctx.$t("unhideSelected", [unref(selectedCount)])), 9, _hoisted_18),
					createBaseVNode("button", {
						class: "btn btn-sm btn-outline btn-error",
						disabled: unref(rows).length === 0,
						onClick: showAll
					}, toDisplayString(_ctx.$t("unhideAll")), 9, _hoisted_19)
				]),
				unref(filteredRows).length === 0 ? (openBlock(), createElementBlock("p", _hoisted_20, toDisplayString(_ctx.$t("noHiddenTitles")), 1)) : unref(viewMode) === "icon" ? (openBlock(), createElementBlock("div", _hoisted_21, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(filteredRows), (row) => {
					return openBlock(), createElementBlock("div", {
						key: row.title,
						class: "block-card"
					}, [
						createBaseVNode("input", {
							type: "checkbox",
							class: "checkbox checkbox-sm select-checkbox",
							checked: !!unref(selected)[row.title],
							onChange: ($event) => unref(selected)[row.title] = !unref(selected)[row.title]
						}, null, 40, _hoisted_22),
						createBaseVNode("button", {
							class: "unblock-btn",
							title: _ctx.$t("unhide"),
							onClick: ($event) => show(row.title)
						}, [createVNode(_component_i_mdi_close)], 8, _hoisted_23),
						row.posterPath ? (openBlock(), createElementBlock("img", {
							key: 0,
							src: POSTER_BASE + row.posterPath,
							alt: row.title,
							class: "poster"
						}, null, 8, _hoisted_24)) : (openBlock(), createElementBlock("div", _hoisted_25, toDisplayString(row.title.slice(0, 1)), 1)),
						createBaseVNode("p", {
							class: "card-title",
							title: row.title
						}, toDisplayString(row.title), 9, _hoisted_26),
						createBaseVNode("span", _hoisted_27, toDisplayString(platformLabel(row.platform)), 1)
					]);
				}), 128))])) : (openBlock(), createElementBlock("table", _hoisted_28, [createBaseVNode("thead", null, [createBaseVNode("tr", null, [
					_cache[13] || (_cache[13] = createBaseVNode("th", null, null, -1)),
					_cache[14] || (_cache[14] = createBaseVNode("th", null, null, -1)),
					createBaseVNode("th", {
						class: "cursor-pointer",
						onClick: _cache[7] || (_cache[7] = ($event) => setSort("title"))
					}, toDisplayString(_ctx.$t("sortTitle")), 1),
					createBaseVNode("th", {
						class: "cursor-pointer",
						onClick: _cache[8] || (_cache[8] = ($event) => setSort("platform"))
					}, toDisplayString(_ctx.$t("platformFilter")), 1),
					createBaseVNode("th", null, toDisplayString(_ctx.$t("mediaTypeFilter")), 1),
					createBaseVNode("th", {
						class: "cursor-pointer",
						onClick: _cache[9] || (_cache[9] = ($event) => setSort("dateAdded"))
					}, toDisplayString(_ctx.$t("sortDateAdded")), 1),
					_cache[15] || (_cache[15] = createBaseVNode("th", null, null, -1))
				])]), createBaseVNode("tbody", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(filteredRows), (row) => {
					return openBlock(), createElementBlock("tr", { key: row.title }, [
						createBaseVNode("td", null, [createBaseVNode("input", {
							type: "checkbox",
							class: "checkbox checkbox-sm",
							checked: !!unref(selected)[row.title],
							onChange: ($event) => unref(selected)[row.title] = !unref(selected)[row.title]
						}, null, 40, _hoisted_29)]),
						createBaseVNode("td", null, [row.posterPath ? (openBlock(), createElementBlock("img", {
							key: 0,
							src: POSTER_BASE + row.posterPath,
							alt: row.title,
							class: "thumb"
						}, null, 8, _hoisted_30)) : (openBlock(), createElementBlock("div", _hoisted_31, toDisplayString(row.title.slice(0, 1)), 1))]),
						createBaseVNode("td", null, toDisplayString(row.title), 1),
						createBaseVNode("td", null, toDisplayString(platformLabel(row.platform)), 1),
						createBaseVNode("td", null, toDisplayString(row.mediaType === "movie" ? _ctx.$t("movieType") : row.mediaType === "tv" ? _ctx.$t("tvType") : "—"), 1),
						createBaseVNode("td", null, toDisplayString(row.dateAdded), 1),
						createBaseVNode("td", null, [createBaseVNode("button", {
							class: "btn btn-xs btn-error",
							onClick: ($event) => show(row.title)
						}, toDisplayString(_ctx.$t("unhide")), 9, _hoisted_32)])
					]);
				}), 128))])]))
			], 64);
		};
	}
}), [["__scopeId", "data-v-74b11e28"]]);
//#endregion
export { HiddenTitles_default as default };
