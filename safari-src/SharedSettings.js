import { D as createVNode, On as unref, St as resolveComponent, Yt as withDirectives, Zn as normalizeClass, _ as createBaseVNode, b as createElementBlock, bt as renderList, er as normalizeStyle, g as computed, k as defineComponent, mt as openBlock, o as Fragment, tr as toDisplayString, un as isRef, v as createBlock, vn as ref, y as createCommentVNode } from "./runtime-core.esm-bundler.js";
import { d as vModelSelect, f as vModelText, i as useOptionsStore, l as storeToRefs } from "./options.store.js";
import { t as Switch_default } from "./Switch.js";
import { t as _plugin_vue_export_helper_default } from "./plugin-vue_export-helper.js";
import { t as help_circle_default } from "./help-circle.js";
import { t as defaultSettings } from "./storeTypes.js";
import { t as streamingServices } from "./streamingServices.js";
import { t as OptionalPermission_default } from "./OptionalPermission.js";
//#region node_modules/@ckpack/vue-color/libs/style-inject.es-746bb8ed.js
function styleInject(css, ref) {
	if (ref === void 0) ref = {};
	var insertAt = ref.insertAt;
	if (!css || typeof document === "undefined") return;
	var head = document.head || document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	style.type = "text/css";
	if (insertAt === "top") {
		if (head.firstChild) head.insertBefore(style, head.firstChild);
		else head.appendChild(style);
	} else head.appendChild(style);
	if (style.styleSheet) style.styleSheet.cssText = css;
	else style.appendChild(document.createTextNode(css));
}
//#endregion
//#region node_modules/@ckpack/vue-color/libs/utils/compoent.js
var install = function(app, options) {
	const { componentPrefix = "" } = options || {};
	app.component(`${componentPrefix}${this.name}`, this);
};
//#endregion
//#region node_modules/@ckpack/vue-color/libs/components/checkboard/index.js
var _checkboardCache = {};
var script$5 = {
	name: "Checkboard",
	props: {
		size: {
			type: [Number, String],
			default: 8
		},
		white: {
			type: String,
			default: "#fff"
		},
		grey: {
			type: String,
			default: "#e6e6e6"
		}
	},
	computed: { bgStyle() {
		return { "background-image": `url(${getCheckboard(this.white, this.grey, this.size)})` };
	} }
};
/**
* get base 64 data by canvas
*
* @param {String} c1 hex color
* @param {String} c2 hex color
* @param {Number} size
*/
function renderCheckboard(c1, c2, size) {
	if (typeof document === "undefined") return null;
	const canvas = document.createElement("canvas");
	canvas.width = canvas.height = size * 2;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	ctx.fillStyle = c1;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = c2;
	ctx.fillRect(0, 0, size, size);
	ctx.translate(size, size);
	ctx.fillRect(0, 0, size, size);
	return canvas.toDataURL();
}
/**
* get checkboard base data and cache
*
* @param {String} c1 hex color
* @param {String} c2 hex color
* @param {Number} size
*/
function getCheckboard(c1, c2, size) {
	const key = `${c1},${c2},${size}`;
	if (_checkboardCache[key]) return _checkboardCache[key];
	const checkboard = renderCheckboard(c1, c2, size);
	_checkboardCache[key] = checkboard;
	return checkboard;
}
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", {
		class: "vc-checkerboard",
		style: normalizeStyle($options.bgStyle)
	}, null, 4);
}
styleInject(".vc-checkerboard{background-size:contain;bottom:0;left:0;position:absolute;right:0;top:0}");
script$5.render = render$5;
script$5.__file = "src/components/checkboard/checkboard.vue";
script$5.install = install;
//#endregion
//#region node_modules/@ckpack/vue-color/libs/components/alpha/index.js
var script$4 = {
	name: "Alpha",
	components: { Checkboard: script$5 },
	props: {
		value: Object,
		onChange: Function
	},
	computed: {
		colors() {
			return this.value;
		},
		gradientColor() {
			const { rgba } = this.colors;
			const rgbStr = [
				rgba.r,
				rgba.g,
				rgba.b
			].join(",");
			return `linear-gradient(to right, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`;
		}
	},
	methods: {
		handleChange(e, skip) {
			!skip && e.preventDefault();
			const { container } = this.$refs;
			if (!container) return;
			const containerWidth = container.clientWidth;
			const xOffset = container.getBoundingClientRect().left + window.pageXOffset;
			const left = (e.pageX || (e.touches ? e.touches[0].pageX : 0)) - xOffset;
			let a;
			if (left < 0) a = 0;
			else if (left > containerWidth) a = 1;
			else a = Math.round(left * 100 / containerWidth) / 100;
			if (this.colors.a !== a) this.$emit("change", {
				h: this.colors.hsl.h,
				s: this.colors.hsl.s,
				l: this.colors.hsl.l,
				a,
				source: "rgba"
			});
		},
		handleMouseDown(e) {
			this.handleChange(e, true);
			window.addEventListener("mousemove", this.handleChange);
			window.addEventListener("mouseup", this.handleMouseUp);
		},
		handleMouseUp() {
			this.unbindEventListeners();
		},
		unbindEventListeners() {
			window.removeEventListener("mousemove", this.handleChange);
			window.removeEventListener("mouseup", this.handleMouseUp);
		}
	}
};
var _hoisted_1$6 = { class: "vc-alpha" };
var _hoisted_2$5 = { class: "vc-alpha-checkboard-wrap" };
var _hoisted_4$5 = [/* @__PURE__ */ createBaseVNode("div", { class: "vc-alpha-picker" }, null, -1)];
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_Checkboard = resolveComponent("Checkboard");
	return openBlock(), createElementBlock("div", _hoisted_1$6, [
		createBaseVNode("div", _hoisted_2$5, [createVNode(_component_Checkboard)]),
		createBaseVNode("div", {
			class: "vc-alpha-gradient",
			style: normalizeStyle({ background: $options.gradientColor })
		}, null, 4),
		createBaseVNode("div", {
			ref: "container",
			class: "vc-alpha-container",
			onMousedown: _cache[0] || (_cache[0] = (...args) => $options.handleMouseDown && $options.handleMouseDown(...args)),
			onTouchmove: _cache[1] || (_cache[1] = (...args) => $options.handleChange && $options.handleChange(...args)),
			onTouchstart: _cache[2] || (_cache[2] = (...args) => $options.handleChange && $options.handleChange(...args))
		}, [createBaseVNode("div", {
			class: "vc-alpha-pointer",
			style: normalizeStyle({ left: `${$options.colors.a * 100}%` })
		}, _hoisted_4$5, 4)], 544)
	]);
}
styleInject(".vc-alpha,.vc-alpha-checkboard-wrap{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-checkboard-wrap{overflow:hidden}.vc-alpha-gradient{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-container{cursor:pointer;height:100%;margin:0 3px;position:relative;z-index:2}.vc-alpha-pointer{position:absolute;z-index:2}.vc-alpha-picker{background:#fff;border-radius:1px;box-shadow:0 0 2px rgba(0,0,0,.6);cursor:pointer;height:8px;margin-top:1px;transform:translateX(-2px);width:4px}");
script$4.render = render$4;
script$4.__file = "src/components/alpha/alpha.vue";
script$4.install = install;
//#endregion
//#region node_modules/@ctrl/tinycolor/dist/module/util.js
/**
* Take input from [0, n] and return it as [0, 1]
* @hidden
*/
function bound01(n, max) {
	if (isOnePointZero(n)) n = "100%";
	var isPercent = isPercentage(n);
	n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
	if (isPercent) n = parseInt(String(n * max), 10) / 100;
	if (Math.abs(n - max) < 1e-6) return 1;
	if (max === 360) n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
	else n = n % max / parseFloat(String(max));
	return n;
}
/**
* Force a number between 0 and 1
* @hidden
*/
function clamp01(val) {
	return Math.min(1, Math.max(0, val));
}
/**
* Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
* <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
* @hidden
*/
function isOnePointZero(n) {
	return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
}
/**
* Check to see if string passed in is a percentage
* @hidden
*/
function isPercentage(n) {
	return typeof n === "string" && n.indexOf("%") !== -1;
}
/**
* Return a valid alpha value [0,1] with all invalid values being set to 1
* @hidden
*/
function boundAlpha(a) {
	a = parseFloat(a);
	if (isNaN(a) || a < 0 || a > 1) a = 1;
	return a;
}
/**
* Replace a decimal with it's percentage value
* @hidden
*/
function convertToPercentage(n) {
	if (n <= 1) return "".concat(Number(n) * 100, "%");
	return n;
}
/**
* Force a hex value to have 2 characters
* @hidden
*/
function pad2(c) {
	return c.length === 1 ? "0" + c : String(c);
}
//#endregion
//#region node_modules/@ctrl/tinycolor/dist/module/conversion.js
/**
* Handle bounds / percentage checking to conform to CSS color spec
* <http://www.w3.org/TR/css3-color/>
* *Assumes:* r, g, b in [0, 255] or [0, 1]
* *Returns:* { r, g, b } in [0, 255]
*/
function rgbToRgb(r, g, b) {
	return {
		r: bound01(r, 255) * 255,
		g: bound01(g, 255) * 255,
		b: bound01(b, 255) * 255
	};
}
/**
* Converts an RGB color value to HSL.
* *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
* *Returns:* { h, s, l } in [0,1]
*/
function rgbToHsl(r, g, b) {
	r = bound01(r, 255);
	g = bound01(g, 255);
	b = bound01(b, 255);
	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);
	var h = 0;
	var s = 0;
	var l = (max + min) / 2;
	if (max === min) {
		s = 0;
		h = 0;
	} else {
		var d = max - min;
		s = l > .5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b: h = (r - g) / d + 4;
		}
		h /= 6;
	}
	return {
		h,
		s,
		l
	};
}
function hue2rgb(p, q, t) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * (6 * t);
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
}
/**
* Converts an HSL color value to RGB.
*
* *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
* *Returns:* { r, g, b } in the set [0, 255]
*/
function hslToRgb(h, s, l) {
	var r;
	var g;
	var b;
	h = bound01(h, 360);
	s = bound01(s, 100);
	l = bound01(l, 100);
	if (s === 0) {
		g = l;
		b = l;
		r = l;
	} else {
		var q = l < .5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	return {
		r: r * 255,
		g: g * 255,
		b: b * 255
	};
}
/**
* Converts an RGB color value to HSV
*
* *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
* *Returns:* { h, s, v } in [0,1]
*/
function rgbToHsv(r, g, b) {
	r = bound01(r, 255);
	g = bound01(g, 255);
	b = bound01(b, 255);
	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);
	var h = 0;
	var v = max;
	var d = max - min;
	var s = max === 0 ? 0 : d / max;
	if (max === min) h = 0;
	else {
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b: h = (r - g) / d + 4;
		}
		h /= 6;
	}
	return {
		h,
		s,
		v
	};
}
/**
* Converts an HSV color value to RGB.
*
* *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
* *Returns:* { r, g, b } in the set [0, 255]
*/
function hsvToRgb(h, s, v) {
	h = bound01(h, 360) * 6;
	s = bound01(s, 100);
	v = bound01(v, 100);
	var i = Math.floor(h);
	var f = h - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);
	var mod = i % 6;
	var r = [
		v,
		q,
		p,
		p,
		t,
		v
	][mod];
	var g = [
		t,
		v,
		v,
		q,
		p,
		p
	][mod];
	var b = [
		p,
		p,
		t,
		v,
		v,
		q
	][mod];
	return {
		r: r * 255,
		g: g * 255,
		b: b * 255
	};
}
/**
* Converts an RGB color to hex
*
* Assumes r, g, and b are contained in the set [0, 255]
* Returns a 3 or 6 character hex
*/
function rgbToHex(r, g, b, allow3Char) {
	var hex = [
		pad2(Math.round(r).toString(16)),
		pad2(Math.round(g).toString(16)),
		pad2(Math.round(b).toString(16))
	];
	if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
	return hex.join("");
}
/**
* Converts an RGBA color plus alpha transparency to hex
*
* Assumes r, g, b are contained in the set [0, 255] and
* a in [0, 1]. Returns a 4 or 8 character rgba hex
*/
function rgbaToHex(r, g, b, a, allow4Char) {
	var hex = [
		pad2(Math.round(r).toString(16)),
		pad2(Math.round(g).toString(16)),
		pad2(Math.round(b).toString(16)),
		pad2(convertDecimalToHex(a))
	];
	if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
	return hex.join("");
}
/** Converts a decimal to a hex value */
function convertDecimalToHex(d) {
	return Math.round(parseFloat(d) * 255).toString(16);
}
/** Converts a hex value to a decimal */
function convertHexToDecimal(h) {
	return parseIntFromHex(h) / 255;
}
/** Parse a base-16 hex value into a base-10 integer */
function parseIntFromHex(val) {
	return parseInt(val, 16);
}
function numberInputToObject(color) {
	return {
		r: color >> 16,
		g: (color & 65280) >> 8,
		b: color & 255
	};
}
//#endregion
//#region node_modules/@ctrl/tinycolor/dist/module/css-color-names.js
/**
* @hidden
*/
var names = {
	aliceblue: "#f0f8ff",
	antiquewhite: "#faebd7",
	aqua: "#00ffff",
	aquamarine: "#7fffd4",
	azure: "#f0ffff",
	beige: "#f5f5dc",
	bisque: "#ffe4c4",
	black: "#000000",
	blanchedalmond: "#ffebcd",
	blue: "#0000ff",
	blueviolet: "#8a2be2",
	brown: "#a52a2a",
	burlywood: "#deb887",
	cadetblue: "#5f9ea0",
	chartreuse: "#7fff00",
	chocolate: "#d2691e",
	coral: "#ff7f50",
	cornflowerblue: "#6495ed",
	cornsilk: "#fff8dc",
	crimson: "#dc143c",
	cyan: "#00ffff",
	darkblue: "#00008b",
	darkcyan: "#008b8b",
	darkgoldenrod: "#b8860b",
	darkgray: "#a9a9a9",
	darkgreen: "#006400",
	darkgrey: "#a9a9a9",
	darkkhaki: "#bdb76b",
	darkmagenta: "#8b008b",
	darkolivegreen: "#556b2f",
	darkorange: "#ff8c00",
	darkorchid: "#9932cc",
	darkred: "#8b0000",
	darksalmon: "#e9967a",
	darkseagreen: "#8fbc8f",
	darkslateblue: "#483d8b",
	darkslategray: "#2f4f4f",
	darkslategrey: "#2f4f4f",
	darkturquoise: "#00ced1",
	darkviolet: "#9400d3",
	deeppink: "#ff1493",
	deepskyblue: "#00bfff",
	dimgray: "#696969",
	dimgrey: "#696969",
	dodgerblue: "#1e90ff",
	firebrick: "#b22222",
	floralwhite: "#fffaf0",
	forestgreen: "#228b22",
	fuchsia: "#ff00ff",
	gainsboro: "#dcdcdc",
	ghostwhite: "#f8f8ff",
	goldenrod: "#daa520",
	gold: "#ffd700",
	gray: "#808080",
	green: "#008000",
	greenyellow: "#adff2f",
	grey: "#808080",
	honeydew: "#f0fff0",
	hotpink: "#ff69b4",
	indianred: "#cd5c5c",
	indigo: "#4b0082",
	ivory: "#fffff0",
	khaki: "#f0e68c",
	lavenderblush: "#fff0f5",
	lavender: "#e6e6fa",
	lawngreen: "#7cfc00",
	lemonchiffon: "#fffacd",
	lightblue: "#add8e6",
	lightcoral: "#f08080",
	lightcyan: "#e0ffff",
	lightgoldenrodyellow: "#fafad2",
	lightgray: "#d3d3d3",
	lightgreen: "#90ee90",
	lightgrey: "#d3d3d3",
	lightpink: "#ffb6c1",
	lightsalmon: "#ffa07a",
	lightseagreen: "#20b2aa",
	lightskyblue: "#87cefa",
	lightslategray: "#778899",
	lightslategrey: "#778899",
	lightsteelblue: "#b0c4de",
	lightyellow: "#ffffe0",
	lime: "#00ff00",
	limegreen: "#32cd32",
	linen: "#faf0e6",
	magenta: "#ff00ff",
	maroon: "#800000",
	mediumaquamarine: "#66cdaa",
	mediumblue: "#0000cd",
	mediumorchid: "#ba55d3",
	mediumpurple: "#9370db",
	mediumseagreen: "#3cb371",
	mediumslateblue: "#7b68ee",
	mediumspringgreen: "#00fa9a",
	mediumturquoise: "#48d1cc",
	mediumvioletred: "#c71585",
	midnightblue: "#191970",
	mintcream: "#f5fffa",
	mistyrose: "#ffe4e1",
	moccasin: "#ffe4b5",
	navajowhite: "#ffdead",
	navy: "#000080",
	oldlace: "#fdf5e6",
	olive: "#808000",
	olivedrab: "#6b8e23",
	orange: "#ffa500",
	orangered: "#ff4500",
	orchid: "#da70d6",
	palegoldenrod: "#eee8aa",
	palegreen: "#98fb98",
	paleturquoise: "#afeeee",
	palevioletred: "#db7093",
	papayawhip: "#ffefd5",
	peachpuff: "#ffdab9",
	peru: "#cd853f",
	pink: "#ffc0cb",
	plum: "#dda0dd",
	powderblue: "#b0e0e6",
	purple: "#800080",
	rebeccapurple: "#663399",
	red: "#ff0000",
	rosybrown: "#bc8f8f",
	royalblue: "#4169e1",
	saddlebrown: "#8b4513",
	salmon: "#fa8072",
	sandybrown: "#f4a460",
	seagreen: "#2e8b57",
	seashell: "#fff5ee",
	sienna: "#a0522d",
	silver: "#c0c0c0",
	skyblue: "#87ceeb",
	slateblue: "#6a5acd",
	slategray: "#708090",
	slategrey: "#708090",
	snow: "#fffafa",
	springgreen: "#00ff7f",
	steelblue: "#4682b4",
	tan: "#d2b48c",
	teal: "#008080",
	thistle: "#d8bfd8",
	tomato: "#ff6347",
	turquoise: "#40e0d0",
	violet: "#ee82ee",
	wheat: "#f5deb3",
	white: "#ffffff",
	whitesmoke: "#f5f5f5",
	yellow: "#ffff00",
	yellowgreen: "#9acd32"
};
//#endregion
//#region node_modules/@ctrl/tinycolor/dist/module/format-input.js
/**
* Given a string or object, convert that input to RGB
*
* Possible string inputs:
* ```
* "red"
* "#f00" or "f00"
* "#ff0000" or "ff0000"
* "#ff000000" or "ff000000"
* "rgb 255 0 0" or "rgb (255, 0, 0)"
* "rgb 1.0 0 0" or "rgb (1, 0, 0)"
* "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
* "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
* "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
* "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
* "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
* ```
*/
function inputToRGB(color) {
	var rgb = {
		r: 0,
		g: 0,
		b: 0
	};
	var a = 1;
	var s = null;
	var v = null;
	var l = null;
	var ok = false;
	var format = false;
	if (typeof color === "string") color = stringInputToObject(color);
	if (typeof color === "object") {
		if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
			rgb = rgbToRgb(color.r, color.g, color.b);
			ok = true;
			format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
		} else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
			s = convertToPercentage(color.s);
			v = convertToPercentage(color.v);
			rgb = hsvToRgb(color.h, s, v);
			ok = true;
			format = "hsv";
		} else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
			s = convertToPercentage(color.s);
			l = convertToPercentage(color.l);
			rgb = hslToRgb(color.h, s, l);
			ok = true;
			format = "hsl";
		}
		if (Object.prototype.hasOwnProperty.call(color, "a")) a = color.a;
	}
	a = boundAlpha(a);
	return {
		ok,
		format: color.format || format,
		r: Math.min(255, Math.max(rgb.r, 0)),
		g: Math.min(255, Math.max(rgb.g, 0)),
		b: Math.min(255, Math.max(rgb.b, 0)),
		a
	};
}
var CSS_UNIT = "(?:".concat("[-\\+]?\\d*\\.\\d+%?", ")|(?:").concat("[-\\+]?\\d+%?", ")");
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
	CSS_UNIT: new RegExp(CSS_UNIT),
	rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
	rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
	hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
	hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
	hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
	hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
	hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
	hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
/**
* Permissive string parsing.  Take in a number of formats, and output an object
* based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
*/
function stringInputToObject(color) {
	color = color.trim().toLowerCase();
	if (color.length === 0) return false;
	var named = false;
	if (names[color]) {
		color = names[color];
		named = true;
	} else if (color === "transparent") return {
		r: 0,
		g: 0,
		b: 0,
		a: 0,
		format: "name"
	};
	var match = matchers.rgb.exec(color);
	if (match) return {
		r: match[1],
		g: match[2],
		b: match[3]
	};
	match = matchers.rgba.exec(color);
	if (match) return {
		r: match[1],
		g: match[2],
		b: match[3],
		a: match[4]
	};
	match = matchers.hsl.exec(color);
	if (match) return {
		h: match[1],
		s: match[2],
		l: match[3]
	};
	match = matchers.hsla.exec(color);
	if (match) return {
		h: match[1],
		s: match[2],
		l: match[3],
		a: match[4]
	};
	match = matchers.hsv.exec(color);
	if (match) return {
		h: match[1],
		s: match[2],
		v: match[3]
	};
	match = matchers.hsva.exec(color);
	if (match) return {
		h: match[1],
		s: match[2],
		v: match[3],
		a: match[4]
	};
	match = matchers.hex8.exec(color);
	if (match) return {
		r: parseIntFromHex(match[1]),
		g: parseIntFromHex(match[2]),
		b: parseIntFromHex(match[3]),
		a: convertHexToDecimal(match[4]),
		format: named ? "name" : "hex8"
	};
	match = matchers.hex6.exec(color);
	if (match) return {
		r: parseIntFromHex(match[1]),
		g: parseIntFromHex(match[2]),
		b: parseIntFromHex(match[3]),
		format: named ? "name" : "hex"
	};
	match = matchers.hex4.exec(color);
	if (match) return {
		r: parseIntFromHex(match[1] + match[1]),
		g: parseIntFromHex(match[2] + match[2]),
		b: parseIntFromHex(match[3] + match[3]),
		a: convertHexToDecimal(match[4] + match[4]),
		format: named ? "name" : "hex8"
	};
	match = matchers.hex3.exec(color);
	if (match) return {
		r: parseIntFromHex(match[1] + match[1]),
		g: parseIntFromHex(match[2] + match[2]),
		b: parseIntFromHex(match[3] + match[3]),
		format: named ? "name" : "hex"
	};
	return false;
}
/**
* Check to see if it looks like a CSS unit
* (see `matchers` above for definition).
*/
function isValidCSSUnit(color) {
	return Boolean(matchers.CSS_UNIT.exec(String(color)));
}
//#endregion
//#region node_modules/@ctrl/tinycolor/dist/module/index.js
var TinyColor = function() {
	function TinyColor(color, opts) {
		if (color === void 0) color = "";
		if (opts === void 0) opts = {};
		var _a;
		if (color instanceof TinyColor) return color;
		if (typeof color === "number") color = numberInputToObject(color);
		this.originalInput = color;
		var rgb = inputToRGB(color);
		this.originalInput = color;
		this.r = rgb.r;
		this.g = rgb.g;
		this.b = rgb.b;
		this.a = rgb.a;
		this.roundA = Math.round(100 * this.a) / 100;
		this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
		this.gradientType = opts.gradientType;
		if (this.r < 1) this.r = Math.round(this.r);
		if (this.g < 1) this.g = Math.round(this.g);
		if (this.b < 1) this.b = Math.round(this.b);
		this.isValid = rgb.ok;
	}
	TinyColor.prototype.isDark = function() {
		return this.getBrightness() < 128;
	};
	TinyColor.prototype.isLight = function() {
		return !this.isDark();
	};
	/**
	* Returns the perceived brightness of the color, from 0-255.
	*/
	TinyColor.prototype.getBrightness = function() {
		var rgb = this.toRgb();
		return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
	};
	/**
	* Returns the perceived luminance of a color, from 0-1.
	*/
	TinyColor.prototype.getLuminance = function() {
		var rgb = this.toRgb();
		var R;
		var G;
		var B;
		var RsRGB = rgb.r / 255;
		var GsRGB = rgb.g / 255;
		var BsRGB = rgb.b / 255;
		if (RsRGB <= .03928) R = RsRGB / 12.92;
		else R = Math.pow((RsRGB + .055) / 1.055, 2.4);
		if (GsRGB <= .03928) G = GsRGB / 12.92;
		else G = Math.pow((GsRGB + .055) / 1.055, 2.4);
		if (BsRGB <= .03928) B = BsRGB / 12.92;
		else B = Math.pow((BsRGB + .055) / 1.055, 2.4);
		return .2126 * R + .7152 * G + .0722 * B;
	};
	/**
	* Returns the alpha value of a color, from 0-1.
	*/
	TinyColor.prototype.getAlpha = function() {
		return this.a;
	};
	/**
	* Sets the alpha value on the current color.
	*
	* @param alpha - The new alpha value. The accepted range is 0-1.
	*/
	TinyColor.prototype.setAlpha = function(alpha) {
		this.a = boundAlpha(alpha);
		this.roundA = Math.round(100 * this.a) / 100;
		return this;
	};
	/**
	* Returns whether the color is monochrome.
	*/
	TinyColor.prototype.isMonochrome = function() {
		return this.toHsl().s === 0;
	};
	/**
	* Returns the object as a HSVA object.
	*/
	TinyColor.prototype.toHsv = function() {
		var hsv = rgbToHsv(this.r, this.g, this.b);
		return {
			h: hsv.h * 360,
			s: hsv.s,
			v: hsv.v,
			a: this.a
		};
	};
	/**
	* Returns the hsva values interpolated into a string with the following format:
	* "hsva(xxx, xxx, xxx, xx)".
	*/
	TinyColor.prototype.toHsvString = function() {
		var hsv = rgbToHsv(this.r, this.g, this.b);
		var h = Math.round(hsv.h * 360);
		var s = Math.round(hsv.s * 100);
		var v = Math.round(hsv.v * 100);
		return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
	};
	/**
	* Returns the object as a HSLA object.
	*/
	TinyColor.prototype.toHsl = function() {
		var hsl = rgbToHsl(this.r, this.g, this.b);
		return {
			h: hsl.h * 360,
			s: hsl.s,
			l: hsl.l,
			a: this.a
		};
	};
	/**
	* Returns the hsla values interpolated into a string with the following format:
	* "hsla(xxx, xxx, xxx, xx)".
	*/
	TinyColor.prototype.toHslString = function() {
		var hsl = rgbToHsl(this.r, this.g, this.b);
		var h = Math.round(hsl.h * 360);
		var s = Math.round(hsl.s * 100);
		var l = Math.round(hsl.l * 100);
		return this.a === 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
	};
	/**
	* Returns the hex value of the color.
	* @param allow3Char will shorten hex value to 3 char if possible
	*/
	TinyColor.prototype.toHex = function(allow3Char) {
		if (allow3Char === void 0) allow3Char = false;
		return rgbToHex(this.r, this.g, this.b, allow3Char);
	};
	/**
	* Returns the hex value of the color -with a # prefixed.
	* @param allow3Char will shorten hex value to 3 char if possible
	*/
	TinyColor.prototype.toHexString = function(allow3Char) {
		if (allow3Char === void 0) allow3Char = false;
		return "#" + this.toHex(allow3Char);
	};
	/**
	* Returns the hex 8 value of the color.
	* @param allow4Char will shorten hex value to 4 char if possible
	*/
	TinyColor.prototype.toHex8 = function(allow4Char) {
		if (allow4Char === void 0) allow4Char = false;
		return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
	};
	/**
	* Returns the hex 8 value of the color -with a # prefixed.
	* @param allow4Char will shorten hex value to 4 char if possible
	*/
	TinyColor.prototype.toHex8String = function(allow4Char) {
		if (allow4Char === void 0) allow4Char = false;
		return "#" + this.toHex8(allow4Char);
	};
	/**
	* Returns the shorter hex value of the color depends on its alpha -with a # prefixed.
	* @param allowShortChar will shorten hex value to 3 or 4 char if possible
	*/
	TinyColor.prototype.toHexShortString = function(allowShortChar) {
		if (allowShortChar === void 0) allowShortChar = false;
		return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
	};
	/**
	* Returns the object as a RGBA object.
	*/
	TinyColor.prototype.toRgb = function() {
		return {
			r: Math.round(this.r),
			g: Math.round(this.g),
			b: Math.round(this.b),
			a: this.a
		};
	};
	/**
	* Returns the RGBA values interpolated into a string with the following format:
	* "RGBA(xxx, xxx, xxx, xx)".
	*/
	TinyColor.prototype.toRgbString = function() {
		var r = Math.round(this.r);
		var g = Math.round(this.g);
		var b = Math.round(this.b);
		return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
	};
	/**
	* Returns the object as a RGBA object.
	*/
	TinyColor.prototype.toPercentageRgb = function() {
		var fmt = function(x) {
			return "".concat(Math.round(bound01(x, 255) * 100), "%");
		};
		return {
			r: fmt(this.r),
			g: fmt(this.g),
			b: fmt(this.b),
			a: this.a
		};
	};
	/**
	* Returns the RGBA relative values interpolated into a string
	*/
	TinyColor.prototype.toPercentageRgbString = function() {
		var rnd = function(x) {
			return Math.round(bound01(x, 255) * 100);
		};
		return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
	};
	/**
	* The 'real' name of the color -if there is one.
	*/
	TinyColor.prototype.toName = function() {
		if (this.a === 0) return "transparent";
		if (this.a < 1) return false;
		var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
		for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
			var _b = _a[_i], key = _b[0];
			if (hex === _b[1]) return key;
		}
		return false;
	};
	TinyColor.prototype.toString = function(format) {
		var formatSet = Boolean(format);
		format = format !== null && format !== void 0 ? format : this.format;
		var formattedString = false;
		var hasAlpha = this.a < 1 && this.a >= 0;
		if (!formatSet && hasAlpha && (format.startsWith("hex") || format === "name")) {
			if (format === "name" && this.a === 0) return this.toName();
			return this.toRgbString();
		}
		if (format === "rgb") formattedString = this.toRgbString();
		if (format === "prgb") formattedString = this.toPercentageRgbString();
		if (format === "hex" || format === "hex6") formattedString = this.toHexString();
		if (format === "hex3") formattedString = this.toHexString(true);
		if (format === "hex4") formattedString = this.toHex8String(true);
		if (format === "hex8") formattedString = this.toHex8String();
		if (format === "name") formattedString = this.toName();
		if (format === "hsl") formattedString = this.toHslString();
		if (format === "hsv") formattedString = this.toHsvString();
		return formattedString || this.toHexString();
	};
	TinyColor.prototype.toNumber = function() {
		return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
	};
	TinyColor.prototype.clone = function() {
		return new TinyColor(this.toString());
	};
	/**
	* Lighten the color a given amount. Providing 100 will always return white.
	* @param amount - valid between 1-100
	*/
	TinyColor.prototype.lighten = function(amount) {
		if (amount === void 0) amount = 10;
		var hsl = this.toHsl();
		hsl.l += amount / 100;
		hsl.l = clamp01(hsl.l);
		return new TinyColor(hsl);
	};
	/**
	* Brighten the color a given amount, from 0 to 100.
	* @param amount - valid between 1-100
	*/
	TinyColor.prototype.brighten = function(amount) {
		if (amount === void 0) amount = 10;
		var rgb = this.toRgb();
		rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
		rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
		rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
		return new TinyColor(rgb);
	};
	/**
	* Darken the color a given amount, from 0 to 100.
	* Providing 100 will always return black.
	* @param amount - valid between 1-100
	*/
	TinyColor.prototype.darken = function(amount) {
		if (amount === void 0) amount = 10;
		var hsl = this.toHsl();
		hsl.l -= amount / 100;
		hsl.l = clamp01(hsl.l);
		return new TinyColor(hsl);
	};
	/**
	* Mix the color with pure white, from 0 to 100.
	* Providing 0 will do nothing, providing 100 will always return white.
	* @param amount - valid between 1-100
	*/
	TinyColor.prototype.tint = function(amount) {
		if (amount === void 0) amount = 10;
		return this.mix("white", amount);
	};
	/**
	* Mix the color with pure black, from 0 to 100.
	* Providing 0 will do nothing, providing 100 will always return black.
	* @param amount - valid between 1-100
	*/
	TinyColor.prototype.shade = function(amount) {
		if (amount === void 0) amount = 10;
		return this.mix("black", amount);
	};
	/**
	* Desaturate the color a given amount, from 0 to 100.
	* Providing 100 will is the same as calling greyscale
	* @param amount - valid between 1-100
	*/
	TinyColor.prototype.desaturate = function(amount) {
		if (amount === void 0) amount = 10;
		var hsl = this.toHsl();
		hsl.s -= amount / 100;
		hsl.s = clamp01(hsl.s);
		return new TinyColor(hsl);
	};
	/**
	* Saturate the color a given amount, from 0 to 100.
	* @param amount - valid between 1-100
	*/
	TinyColor.prototype.saturate = function(amount) {
		if (amount === void 0) amount = 10;
		var hsl = this.toHsl();
		hsl.s += amount / 100;
		hsl.s = clamp01(hsl.s);
		return new TinyColor(hsl);
	};
	/**
	* Completely desaturates a color into greyscale.
	* Same as calling `desaturate(100)`
	*/
	TinyColor.prototype.greyscale = function() {
		return this.desaturate(100);
	};
	/**
	* Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
	* Values outside of this range will be wrapped into this range.
	*/
	TinyColor.prototype.spin = function(amount) {
		var hsl = this.toHsl();
		var hue = (hsl.h + amount) % 360;
		hsl.h = hue < 0 ? 360 + hue : hue;
		return new TinyColor(hsl);
	};
	/**
	* Mix the current color a given amount with another color, from 0 to 100.
	* 0 means no mixing (return current color).
	*/
	TinyColor.prototype.mix = function(color, amount) {
		if (amount === void 0) amount = 50;
		var rgb1 = this.toRgb();
		var rgb2 = new TinyColor(color).toRgb();
		var p = amount / 100;
		return new TinyColor({
			r: (rgb2.r - rgb1.r) * p + rgb1.r,
			g: (rgb2.g - rgb1.g) * p + rgb1.g,
			b: (rgb2.b - rgb1.b) * p + rgb1.b,
			a: (rgb2.a - rgb1.a) * p + rgb1.a
		});
	};
	TinyColor.prototype.analogous = function(results, slices) {
		if (results === void 0) results = 6;
		if (slices === void 0) slices = 30;
		var hsl = this.toHsl();
		var part = 360 / slices;
		var ret = [this];
		for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
			hsl.h = (hsl.h + part) % 360;
			ret.push(new TinyColor(hsl));
		}
		return ret;
	};
	/**
	* taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
	*/
	TinyColor.prototype.complement = function() {
		var hsl = this.toHsl();
		hsl.h = (hsl.h + 180) % 360;
		return new TinyColor(hsl);
	};
	TinyColor.prototype.monochromatic = function(results) {
		if (results === void 0) results = 6;
		var hsv = this.toHsv();
		var h = hsv.h;
		var s = hsv.s;
		var v = hsv.v;
		var res = [];
		var modification = 1 / results;
		while (results--) {
			res.push(new TinyColor({
				h,
				s,
				v
			}));
			v = (v + modification) % 1;
		}
		return res;
	};
	TinyColor.prototype.splitcomplement = function() {
		var hsl = this.toHsl();
		var h = hsl.h;
		return [
			this,
			new TinyColor({
				h: (h + 72) % 360,
				s: hsl.s,
				l: hsl.l
			}),
			new TinyColor({
				h: (h + 216) % 360,
				s: hsl.s,
				l: hsl.l
			})
		];
	};
	/**
	* Compute how the color would appear on a background
	*/
	TinyColor.prototype.onBackground = function(background) {
		var fg = this.toRgb();
		var bg = new TinyColor(background).toRgb();
		var alpha = fg.a + bg.a * (1 - fg.a);
		return new TinyColor({
			r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
			g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
			b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
			a: alpha
		});
	};
	/**
	* Alias for `polyad(3)`
	*/
	TinyColor.prototype.triad = function() {
		return this.polyad(3);
	};
	/**
	* Alias for `polyad(4)`
	*/
	TinyColor.prototype.tetrad = function() {
		return this.polyad(4);
	};
	/**
	* Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
	* monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
	*/
	TinyColor.prototype.polyad = function(n) {
		var hsl = this.toHsl();
		var h = hsl.h;
		var result = [this];
		var increment = 360 / n;
		for (var i = 1; i < n; i++) result.push(new TinyColor({
			h: (h + i * increment) % 360,
			s: hsl.s,
			l: hsl.l
		}));
		return result;
	};
	/**
	* compare color vs current color
	*/
	TinyColor.prototype.equals = function(color) {
		return this.toRgbString() === new TinyColor(color).toRgbString();
	};
	return TinyColor;
}();
//#endregion
//#region node_modules/@ckpack/vue-color/libs/mixin/color.js
function tinycolor(...args) {
	return new TinyColor(...args);
}
function _colorChange(data, oldHue) {
	const alpha = data && data.a;
	let color;
	if (data && data.hsl) color = tinycolor(data.hsl);
	else if (data && data.hex && data.hex.length > 0) color = tinycolor(data.hex);
	else if (data && data.hsv) color = tinycolor(data.hsv);
	else if (data && data.rgba) color = tinycolor(data.rgba);
	else if (data && data.rgb) color = tinycolor(data.rgb);
	else color = tinycolor(data);
	if (color && (color._a === void 0 || color._a === null)) color.setAlpha(alpha || color.getAlpha());
	const hsl = color.toHsl();
	const hsv = color.toHsv();
	if (hsl.s === 0) hsv.h = hsl.h = data.h || data.hsl && data.hsl.h || oldHue || 0;
	if (hsv.v < .0164) {
		hsv.h = data.h || data.hsv && data.hsv.h || 0;
		hsv.s = data.s || data.hsv && data.hsv.s || 0;
	}
	if (hsl.l < .01) {
		hsl.h = data.h || data.hsl && data.hsl.h || 0;
		hsl.s = data.s || data.hsl && data.hsl.s || 0;
	}
	return {
		hsl,
		hex: color.toHexString().toUpperCase(),
		hex8: color.toHex8String().toUpperCase(),
		rgba: color.toRgb(),
		hsv,
		oldHue: data.h || oldHue || hsl.h,
		source: data.source,
		a: color.getAlpha()
	};
}
var colorMixin = {
	model: {
		prop: "modelValue",
		event: "update:modelValue"
	},
	props: ["modelValue"],
	data() {
		return { val: _colorChange(this.modelValue) };
	},
	computed: { colors: {
		get() {
			return this.val;
		},
		set(newVal) {
			this.val = newVal;
			this.$emit("update:modelValue", newVal);
		}
	} },
	watch: { modelValue(newVal) {
		this.val = _colorChange(newVal);
	} },
	methods: {
		colorChange(data, oldHue) {
			this.oldHue = this.colors.hsl.h;
			this.colors = _colorChange(data, oldHue || this.oldHue);
		},
		isValidHex(hex) {
			return tinycolor(hex).isValid;
		},
		simpleCheckForValidColor(data) {
			const keysToCheck = [
				"r",
				"g",
				"b",
				"a",
				"h",
				"s",
				"l",
				"v"
			];
			let checked = 0;
			let passed = 0;
			for (let i = 0; i < keysToCheck.length; i++) {
				const letter = keysToCheck[i];
				if (data[letter]) {
					checked++;
					if (!isNaN(data[letter])) passed++;
				}
			}
			if (checked === passed) return data;
		},
		paletteUpperCase(palette) {
			return palette.map((c) => c.toUpperCase());
		},
		isTransparent(color) {
			return tinycolor(color).getAlpha() === 0;
		}
	}
};
//#endregion
//#region node_modules/@ckpack/vue-color/libs/components/editable-input/index.js
var script$3 = {
	name: "EditableInput",
	props: {
		label: String,
		labelText: String,
		desc: String,
		value: [String, Number],
		max: Number,
		min: Number,
		arrowOffset: {
			type: Number,
			default: 1
		}
	},
	computed: {
		val: {
			get() {
				return this.value;
			},
			set(v) {
				if (!(this.max === void 0) && +v > this.max) this.$refs.input.value = this.max;
				else return v;
			}
		},
		labelId() {
			return `input__label__${this.label}__${Math.random().toString().slice(2, 5)}`;
		},
		labelSpanText() {
			return this.labelText || this.label;
		}
	},
	methods: {
		update(e) {
			this.handleChange(e.target.value);
		},
		handleChange(newVal) {
			const data = {};
			data[this.label] = newVal;
			if (data.hex === void 0 && data["#"] === void 0) this.$emit("change", data);
			else if (newVal.length > 5) this.$emit("change", data);
		},
		handleKeyDown(e) {
			let { val } = this;
			const number = Number(val);
			if (number) {
				const amount = this.arrowOffset || 1;
				if (e.keyCode === 38) {
					val = number + amount;
					this.handleChange(val);
					e.preventDefault();
				}
				if (e.keyCode === 40) {
					val = number - amount;
					this.handleChange(val);
					e.preventDefault();
				}
			}
		}
	}
};
var _hoisted_1$5 = { class: "vc-editable-input" };
var _hoisted_2$4 = ["aria-labelledby"];
var _hoisted_3$4 = ["id", "for"];
var _hoisted_4$4 = { class: "vc-input__desc" };
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", _hoisted_1$5, [
		withDirectives(createBaseVNode("input", {
			ref: "input",
			"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $options.val = $event),
			"aria-labelledby": $options.labelId,
			class: "vc-input__input",
			onKeydown: _cache[1] || (_cache[1] = (...args) => $options.handleKeyDown && $options.handleKeyDown(...args)),
			onInput: _cache[2] || (_cache[2] = (...args) => $options.update && $options.update(...args))
		}, null, 40, _hoisted_2$4), [[vModelText, $options.val]]),
		createBaseVNode("span", {
			id: $options.labelId,
			for: $props.label,
			class: "vc-input__label"
		}, toDisplayString($options.labelSpanText), 9, _hoisted_3$4),
		createBaseVNode("span", _hoisted_4$4, toDisplayString($props.desc), 1)
	]);
}
styleInject(".vc-editable-input{position:relative}.vc-input__input{border:0;outline:none;padding:0}.vc-input__label{text-transform:capitalize}");
script$3.render = render$3;
script$3.__file = "src/components/editable-input/editable-input.vue";
script$3.install = install;
//#endregion
//#region node_modules/@ckpack/vue-color/libs/utils/utils.js
function clamp(value, min, max) {
	return min < max ? value < min ? min : value > max ? max : value : value < max ? max : value > min ? min : value;
}
//#endregion
//#region node_modules/@ckpack/vue-color/libs/components/saturation/index.js
var script$2 = {
	name: "Saturation",
	props: { value: Object },
	computed: {
		colors() {
			return this.value;
		},
		bgColor() {
			return `hsl(${this.colors.hsv.h}, 100%, 50%)`;
		},
		pointerTop() {
			return `${-(this.colors.hsv.v * 100) + 1 + 100}%`;
		},
		pointerLeft() {
			return `${this.colors.hsv.s * 100}%`;
		}
	},
	methods: {
		handleChange(e, skip) {
			!skip && e.preventDefault();
			const { container } = this.$refs;
			if (!container) return;
			const containerWidth = container.clientWidth;
			const containerHeight = container.clientHeight;
			const xOffset = container.getBoundingClientRect().left + window.pageXOffset;
			const yOffset = container.getBoundingClientRect().top + window.pageYOffset;
			const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
			const pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
			const left = clamp(pageX - xOffset, 0, containerWidth);
			const top = clamp(pageY - yOffset, 0, containerHeight);
			const saturation = left / containerWidth;
			const bright = clamp(-(top / containerHeight) + 1, 0, 1);
			this.onChange({
				h: this.colors.hsv.h,
				s: saturation,
				v: bright,
				a: this.colors.hsv.a,
				source: "hsva"
			});
		},
		onChange(param) {
			this.$emit("change", param);
		},
		handleMouseDown(e) {
			window.addEventListener("mousemove", this.handleChange);
			window.addEventListener("mouseup", this.handleChange);
			window.addEventListener("mouseup", this.handleMouseUp);
		},
		handleMouseUp(e) {
			this.unbindEventListeners();
		},
		unbindEventListeners() {
			window.removeEventListener("mousemove", this.handleChange);
			window.removeEventListener("mouseup", this.handleChange);
			window.removeEventListener("mouseup", this.handleMouseUp);
		}
	}
};
var _hoisted_1$4 = /*#__PURE__*/ createBaseVNode("div", { class: "vc-saturation--white" }, null, -1);
var _hoisted_2$3 = /*#__PURE__*/ createBaseVNode("div", { class: "vc-saturation--black" }, null, -1);
var _hoisted_4$3 = [/* @__PURE__ */ createBaseVNode("div", { class: "vc-saturation-circle" }, null, -1)];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", {
		ref: "container",
		class: "vc-saturation",
		style: normalizeStyle({ background: $options.bgColor }),
		onMousedown: _cache[0] || (_cache[0] = (...args) => $options.handleMouseDown && $options.handleMouseDown(...args)),
		onTouchmove: _cache[1] || (_cache[1] = (...args) => $options.handleChange && $options.handleChange(...args)),
		onTouchstart: _cache[2] || (_cache[2] = (...args) => $options.handleChange && $options.handleChange(...args))
	}, [
		_hoisted_1$4,
		_hoisted_2$3,
		createBaseVNode("div", {
			class: "vc-saturation-pointer",
			style: normalizeStyle({
				top: $options.pointerTop,
				left: $options.pointerLeft
			})
		}, _hoisted_4$3, 4)
	], 36);
}
styleInject(".vc-saturation,.vc-saturation--black,.vc-saturation--white{bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0}.vc-saturation--white{background:linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.vc-saturation--black{background:linear-gradient(0deg,#000,transparent)}.vc-saturation-pointer{cursor:pointer;position:absolute}.vc-saturation-circle{border-radius:50%;box-shadow:0 0 0 1.5px #fff,inset 0 0 1px 1px rgba(0,0,0,.3),0 0 1px 2px rgba(0,0,0,.4);cursor:head;height:4px;transform:translate(-2px,-2px);width:4px}");
script$2.render = render$2;
script$2.__file = "src/components/saturation/saturation.vue";
script$2.install = install;
//#endregion
//#region node_modules/@ckpack/vue-color/libs/components/hue/index.js
var script$1 = {
	name: "Hue",
	props: {
		value: Object,
		direction: {
			type: String,
			default: "horizontal"
		}
	},
	data() {
		return {
			oldHue: 0,
			pullDirection: ""
		};
	},
	computed: {
		colors() {
			return this.value;
		},
		directionClass() {
			return {
				"vc-hue--horizontal": this.direction === "horizontal",
				"vc-hue--vertical": this.direction === "vertical"
			};
		},
		pointerTop() {
			if (this.direction === "vertical") {
				if (this.colors.hsl.h === 0 && this.pullDirection === "right") return 0;
				return `${-(this.colors.hsl.h * 100 / 360) + 100}%`;
			}
			return 0;
		},
		pointerLeft() {
			if (this.direction === "vertical") return 0;
			if (this.colors.hsl.h === 0 && this.pullDirection === "right") return "100%";
			return `${this.colors.hsl.h * 100 / 360}%`;
		}
	},
	watch: { value: {
		handler(value, oldVal) {
			const { h } = value.hsl;
			if (h !== 0 && h - this.oldHue > 0) this.pullDirection = "right";
			if (h !== 0 && h - this.oldHue < 0) this.pullDirection = "left";
			this.oldHue = h;
		},
		deep: true,
		immediate: true
	} },
	methods: {
		handleChange(e, skip) {
			!skip && e.preventDefault();
			const { container } = this.$refs;
			if (!container) return;
			const containerWidth = container.clientWidth;
			const containerHeight = container.clientHeight;
			const xOffset = container.getBoundingClientRect().left + window.pageXOffset;
			const yOffset = container.getBoundingClientRect().top + window.pageYOffset;
			const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
			const pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);
			const left = pageX - xOffset;
			const top = pageY - yOffset;
			let h;
			let percent;
			if (this.direction === "vertical") {
				if (top < 0) h = 360;
				else if (top > containerHeight) h = 0;
				else {
					percent = -(top * 100 / containerHeight) + 100;
					h = 360 * percent / 100;
				}
				if (this.colors.hsl.h !== h) this.$emit("change", {
					h,
					s: this.colors.hsl.s,
					l: this.colors.hsl.l,
					a: this.colors.hsl.a,
					source: "hsl"
				});
			} else {
				if (left < 0) h = 0;
				else if (left > containerWidth) h = 360;
				else {
					percent = left * 100 / containerWidth;
					h = 360 * percent / 100;
				}
				if (this.colors.hsl.h !== h) this.$emit("change", {
					h,
					s: this.colors.hsl.s,
					l: this.colors.hsl.l,
					a: this.colors.hsl.a,
					source: "hsl"
				});
			}
		},
		handleMouseDown(e) {
			this.handleChange(e, true);
			window.addEventListener("mousemove", this.handleChange);
			window.addEventListener("mouseup", this.handleChange);
			window.addEventListener("mouseup", this.handleMouseUp);
		},
		handleMouseUp(e) {
			this.unbindEventListeners();
		},
		unbindEventListeners() {
			window.removeEventListener("mousemove", this.handleChange);
			window.removeEventListener("mouseup", this.handleChange);
			window.removeEventListener("mouseup", this.handleMouseUp);
		}
	}
};
var _hoisted_1$3 = ["aria-valuenow"];
var _hoisted_3$3 = [/* @__PURE__ */ createBaseVNode("div", { class: "vc-hue-picker" }, null, -1)];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", { class: normalizeClass(["vc-hue", [$options.directionClass]]) }, [createBaseVNode("div", {
		ref: "container",
		class: "vc-hue-container",
		role: "slider",
		"aria-valuenow": $options.colors.hsl.h,
		"aria-valuemin": "0",
		"aria-valuemax": "360",
		onMousedown: _cache[0] || (_cache[0] = (...args) => $options.handleMouseDown && $options.handleMouseDown(...args)),
		onTouchmove: _cache[1] || (_cache[1] = (...args) => $options.handleChange && $options.handleChange(...args)),
		onTouchstart: _cache[2] || (_cache[2] = (...args) => $options.handleChange && $options.handleChange(...args))
	}, [createBaseVNode("div", {
		class: "vc-hue-pointer",
		style: normalizeStyle({
			top: $options.pointerTop,
			left: $options.pointerLeft
		}),
		role: "presentation"
	}, _hoisted_3$3, 4)], 40, _hoisted_1$3)], 2);
}
styleInject(".vc-hue{border-radius:2px;bottom:0;left:0;position:absolute;right:0;top:0}.vc-hue--horizontal{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vc-hue--vertical{background:linear-gradient(0deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vc-hue-container{cursor:pointer;height:100%;margin:0 2px;position:relative}.vc-hue-pointer{position:absolute;z-index:2}.vc-hue-picker{background:#fff;border-radius:1px;box-shadow:0 0 2px rgba(0,0,0,.6);cursor:pointer;height:8px;margin-top:1px;transform:translateX(-2px);width:4px}");
script$1.render = render$1;
script$1.__file = "src/components/hue/hue.vue";
script$1.install = install;
//#endregion
//#region node_modules/@ckpack/vue-color/libs/components/sketch/index.js
var presetColors = [
	"#D0021B",
	"#F5A623",
	"#F8E71C",
	"#8B572A",
	"#7ED321",
	"#417505",
	"#BD10E0",
	"#9013FE",
	"#4A90E2",
	"#50E3C2",
	"#B8E986",
	"#000000",
	"#4A4A4A",
	"#9B9B9B",
	"#FFFFFF",
	"rgba(0,0,0,0)"
];
var script = {
	name: "Sketch",
	components: {
		Saturation: script$2,
		Hue: script$1,
		Alpha: script$4,
		EdIn: script$3,
		Checkboard: script$5
	},
	mixins: [colorMixin],
	props: {
		presetColors: {
			type: Array,
			default() {
				return presetColors;
			}
		},
		disableAlpha: {
			type: Boolean,
			default: false
		},
		disableFields: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		hex() {
			let hex;
			if (this.colors.a < 1) hex = this.colors.hex8;
			else hex = this.colors.hex;
			return hex.replace("#", "");
		},
		activeColor() {
			const { rgba } = this.colors;
			return `rgba(${[
				rgba.r,
				rgba.g,
				rgba.b,
				rgba.a
			].join(",")})`;
		}
	},
	methods: {
		handlePreset(c) {
			this.colorChange(c);
		},
		childChange(data) {
			this.colorChange(data);
		},
		inputChange(data) {
			if (!data) return;
			if (data.hex) this.isValidHex(data.hex) && this.colorChange({
				hex: data.hex,
				source: "hex"
			});
			else if (data.r || data.g || data.b || data.a) this.colorChange({
				r: data.r || this.colors.rgba.r,
				g: data.g || this.colors.rgba.g,
				b: data.b || this.colors.rgba.b,
				a: data.a || this.colors.rgba.a,
				source: "rgba"
			});
		}
	}
};
var _hoisted_1$2 = { class: "vc-sketch-saturation-wrap" };
var _hoisted_2$2 = { class: "vc-sketch-controls" };
var _hoisted_3$2 = { class: "vc-sketch-sliders" };
var _hoisted_4$2 = { class: "vc-sketch-hue-wrap" };
var _hoisted_5$2 = {
	key: 0,
	class: "vc-sketch-alpha-wrap"
};
var _hoisted_6$2 = { class: "vc-sketch-color-wrap" };
var _hoisted_7$2 = ["aria-label"];
var _hoisted_8$2 = {
	key: 0,
	class: "vc-sketch-field"
};
var _hoisted_9$2 = { class: "vc-sketch-field--double" };
var _hoisted_10$2 = { class: "vc-sketch-field--single" };
var _hoisted_11$2 = { class: "vc-sketch-field--single" };
var _hoisted_12$2 = { class: "vc-sketch-field--single" };
var _hoisted_13$2 = {
	key: 0,
	class: "vc-sketch-field--single"
};
var _hoisted_14$2 = {
	class: "vc-sketch-presets",
	role: "group",
	"aria-label": "A color preset, pick one to set as current color"
};
var _hoisted_15$2 = ["aria-label", "onClick"];
var _hoisted_16$2 = ["aria-label", "onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_Saturation = resolveComponent("Saturation");
	const _component_Hue = resolveComponent("Hue");
	const _component_Alpha = resolveComponent("Alpha");
	const _component_Checkboard = resolveComponent("Checkboard");
	const _component_EdIn = resolveComponent("EdIn");
	return openBlock(), createElementBlock("div", {
		role: "application",
		"aria-label": "Sketch color picker",
		class: normalizeClass(["vc-sketch", [$props.disableAlpha ? "vc-sketch__disable-alpha" : ""]])
	}, [
		createBaseVNode("div", _hoisted_1$2, [createVNode(_component_Saturation, {
			value: _ctx.colors,
			onChange: $options.childChange
		}, null, 8, ["value", "onChange"])]),
		createBaseVNode("div", _hoisted_2$2, [createBaseVNode("div", _hoisted_3$2, [createBaseVNode("div", _hoisted_4$2, [createVNode(_component_Hue, {
			value: _ctx.colors,
			onChange: $options.childChange
		}, null, 8, ["value", "onChange"])]), !$props.disableAlpha ? (openBlock(), createElementBlock("div", _hoisted_5$2, [createVNode(_component_Alpha, {
			value: _ctx.colors,
			onChange: $options.childChange
		}, null, 8, ["value", "onChange"])])) : createCommentVNode("v-if", true)]), createBaseVNode("div", _hoisted_6$2, [createBaseVNode("div", {
			"aria-label": `Current color is ${$options.activeColor}`,
			class: "vc-sketch-active-color",
			style: normalizeStyle({ background: $options.activeColor })
		}, null, 12, _hoisted_7$2), createVNode(_component_Checkboard)])]),
		!$props.disableFields ? (openBlock(), createElementBlock("div", _hoisted_8$2, [
			createCommentVNode(" rgba "),
			createBaseVNode("div", _hoisted_9$2, [createVNode(_component_EdIn, {
				label: "hex",
				value: $options.hex,
				onChange: $options.inputChange
			}, null, 8, ["value", "onChange"])]),
			createBaseVNode("div", _hoisted_10$2, [createVNode(_component_EdIn, {
				label: "r",
				value: _ctx.colors.rgba.r,
				onChange: $options.inputChange
			}, null, 8, ["value", "onChange"])]),
			createBaseVNode("div", _hoisted_11$2, [createVNode(_component_EdIn, {
				label: "g",
				value: _ctx.colors.rgba.g,
				onChange: $options.inputChange
			}, null, 8, ["value", "onChange"])]),
			createBaseVNode("div", _hoisted_12$2, [createVNode(_component_EdIn, {
				label: "b",
				value: _ctx.colors.rgba.b,
				onChange: $options.inputChange
			}, null, 8, ["value", "onChange"])]),
			!$props.disableAlpha ? (openBlock(), createElementBlock("div", _hoisted_13$2, [createVNode(_component_EdIn, {
				label: "a",
				value: _ctx.colors.a,
				"arrow-offset": .01,
				max: 1,
				onChange: $options.inputChange
			}, null, 8, [
				"value",
				"arrow-offset",
				"onChange"
			])])) : createCommentVNode("v-if", true)
		])) : createCommentVNode("v-if", true),
		createBaseVNode("div", _hoisted_14$2, [(openBlock(true), createElementBlock(Fragment, null, renderList($props.presetColors, (c) => {
			return openBlock(), createElementBlock(Fragment, null, [!_ctx.isTransparent(c) ? (openBlock(), createElementBlock("div", {
				key: `!${c}`,
				class: "vc-sketch-presets-color",
				"aria-label": `Color:${c}`,
				style: normalizeStyle({ background: c }),
				onClick: ($event) => $options.handlePreset(c)
			}, null, 12, _hoisted_15$2)) : (openBlock(), createElementBlock("div", {
				key: c,
				"aria-label": `Color:${c}`,
				class: "vc-sketch-presets-color",
				onClick: ($event) => $options.handlePreset(c)
			}, [createVNode(_component_Checkboard)], 8, _hoisted_16$2))], 64);
		}), 256))])
	], 2);
}
styleInject(".vc-sketch{background:#fff;border-radius:4px;box-shadow:0 0 0 1px rgba(0,0,0,.15),0 8px 16px rgba(0,0,0,.15);box-sizing:initial;padding:10px 10px 0;position:relative;width:200px}.vc-sketch-saturation-wrap{overflow:hidden;padding-bottom:75%;position:relative;width:100%}.vc-sketch-controls{display:flex}.vc-sketch-sliders{flex:1;padding:4px 0}.vc-sketch-sliders .vc-alpha-gradient,.vc-sketch-sliders .vc-hue{border-radius:2px}.vc-sketch-alpha-wrap,.vc-sketch-hue-wrap{height:10px;position:relative}.vc-sketch-alpha-wrap{margin-top:4px;overflow:hidden}.vc-sketch-color-wrap{border-radius:3px;height:24px;margin-left:4px;margin-top:4px;position:relative;width:24px}.vc-sketch-active-color{border-radius:2px;bottom:0;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15),inset 0 0 4px rgba(0,0,0,.25);left:0;position:absolute;right:0;top:0;z-index:2}.vc-sketch-color-wrap .vc-checkerboard{background-size:auto}.vc-sketch-field{display:flex;padding-top:4px}.vc-sketch-field .vc-input__input{border:none;box-shadow:inset 0 0 0 1px #ccc;font-size:10px;padding:4px 0 3px 10%;width:90%}.vc-sketch-field .vc-input__label{color:#222;display:block;font-size:11px;padding-bottom:4px;padding-top:3px;text-align:center;text-transform:capitalize}.vc-sketch-field--single{flex:1;padding-left:6px}.vc-sketch-field--double{flex:2}.vc-sketch-presets{border-top:1px solid #eee;margin-left:-10px;margin-right:-10px;padding-left:10px;padding-top:10px}.vc-sketch-presets-color{cursor:pointer;display:inline-block;height:16px;margin:0 10px 10px 0;overflow:hidden;position:relative;vertical-align:top;width:16px}.vc-sketch-presets-color,.vc-sketch-presets-color .vc-checkerboard{border-radius:3px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}.vc-sketch__disable-alpha .vc-sketch-color-wrap{height:10px}");
script.render = render;
script.__file = "src/components/sketch/sketch.vue";
script.install = install;
//#endregion
//#region src/components/ColorPicker.vue?vue&type=script&lang.ts
var ColorPicker_vue_vue_type_script_lang_default = {
	components: { Sketch: script },
	props: { modelValue: String },
	emits: ["update:modelValue"],
	data() {
		return { color: "#000" };
	},
	watch: { color() {
		this.$emit("update:modelValue", this.color.hex8 || this.modelValue);
	} },
	mounted() {
		this.color = this.modelValue;
	}
};
//#endregion
//#region src/components/ColorPicker.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_Sketch = resolveComponent("Sketch");
	return openBlock(), createBlock(_component_Sketch, {
		modelValue: $data.color,
		"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.color = $event)
	}, null, 8, ["modelValue"]);
}
var ColorPicker_default = /*#__PURE__*/ _plugin_vue_export_helper_default(ColorPicker_vue_vue_type_script_lang_default, [["render", _sfc_render]]);
//#endregion
//#region src/components/options-page/SettingsTable.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "featureTable" };
var _hoisted_2$1 = { class: "tooltip" };
var _hoisted_3$1 = { class: "tooltip flex" };
var _hoisted_4$1 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_5$1 = { class: "other" };
var _hoisted_6$1 = { class: "other" };
var _hoisted_7$1 = { class: "other" };
var _hoisted_8$1 = { class: "other" };
var _hoisted_9$1 = { class: "other" };
var _hoisted_10$1 = { class: "other" };
var _hoisted_11$1 = { class: "tooltip flex" };
var _hoisted_12$1 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_13$1 = { class: "other" };
var _hoisted_14$1 = { class: "other" };
var _hoisted_15$1 = { class: "other" };
var _hoisted_16$1 = { class: "other" };
var _hoisted_17$1 = { class: "other" };
var _hoisted_18$1 = { class: "other" };
var _hoisted_19$1 = { class: "tooltip flex" };
var _hoisted_20$1 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_21$1 = { class: "other" };
var _hoisted_22$1 = { class: "other" };
var _hoisted_23$1 = { class: "other" };
var _hoisted_24$1 = { class: "other" };
var _hoisted_25 = { class: "other" };
var _hoisted_26 = { class: "tooltip flex" };
var _hoisted_27 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_28 = { class: "other" };
var _hoisted_29 = { class: "other" };
var _hoisted_30 = { class: "other" };
var _hoisted_31 = { class: "other" };
var _hoisted_32 = { class: "tooltip flex" };
var _hoisted_33 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_34 = { class: "other" };
var _hoisted_35 = { class: "other" };
var _hoisted_36 = { class: "other" };
var _hoisted_37 = { class: "other" };
var _hoisted_38 = { class: "other" };
var _hoisted_39 = { class: "other" };
var _hoisted_40 = { class: "tooltip flex" };
var _hoisted_41 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_42 = { class: "other" };
var _hoisted_43 = { class: "other" };
var _hoisted_44 = { class: "other" };
var _hoisted_45 = { class: "other" };
var _hoisted_46 = { class: "other" };
var _hoisted_47 = { class: "other" };
var _hoisted_48 = { class: "tooltip flex" };
var _hoisted_49 = {
	class: "tooltip-content text-primary-content",
	style: {
		"transform": "unset",
		"inset": "auto auto var(--tt-off) 0%"
	}
};
var _hoisted_50 = { class: "other" };
var _hoisted_51 = { class: "other" };
var _hoisted_52 = { class: "other" };
//#endregion
//#region src/components/options-page/SettingsTable.vue
var SettingsTable_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "SettingsTable",
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
		const AmazonSkipCredits = computed({
			get: () => settings.value.Amazon.skipCredits,
			set: (value) => {
				settings.value.Amazon.skipCredits = value;
				if (value) settings.value.Amazon.watchCredits = false;
			}
		});
		const NetflixSkipCredits = computed({
			get: () => settings.value.Netflix.skipCredits,
			set: (value) => {
				settings.value.Netflix.skipCredits = value;
				if (value) settings.value.Netflix.watchCredits = false;
			}
		});
		const DisneySkipCredits = computed({
			get: () => settings.value.Disney.skipCredits,
			set: (value) => {
				settings.value.Disney.skipCredits = value;
				if (value) settings.value.Disney.watchCredits = false;
			}
		});
		const HBOSkipCredits = computed({
			get: () => settings.value.HBO.skipCredits,
			set: (value) => {
				settings.value.HBO.skipCredits = value;
				if (value) settings.value.HBO.watchCredits = false;
			}
		});
		const AmazonWatchCredits = computed({
			get: () => settings.value.Amazon.watchCredits,
			set: (value) => {
				settings.value.Amazon.watchCredits = value;
				if (value) settings.value.Amazon.skipCredits = false;
			}
		});
		const NetflixWatchCredits = computed({
			get: () => settings.value.Netflix.watchCredits,
			set: (value) => {
				settings.value.Netflix.watchCredits = value;
				if (value) settings.value.Netflix.skipCredits = false;
			}
		});
		const DisneyWatchCredits = computed({
			get: () => settings.value.Disney.watchCredits,
			set: (value) => {
				settings.value.Disney.watchCredits = value;
				if (value) settings.value.Disney.skipCredits = false;
			}
		});
		const HBOWatchCredits = computed({
			get: () => settings.value.HBO.watchCredits,
			set: (value) => {
				settings.value.HBO.watchCredits = value;
				if (value) settings.value.HBO.skipCredits = false;
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
		const skipAd = computed({
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
			get: () => settings.value?.Netflix.hideTitles && settings.value?.Amazon.hideTitles && settings.value?.Disney.hideTitles,
			set: (value) => {
				settings.value.Netflix.hideTitles = settings.value.Amazon.hideTitles = settings.value.Disney.hideTitles = value;
			}
		});
		return (_ctx, _cache) => {
			const _component_i_mdi_help_circle = help_circle_default;
			const _component_Switch = Switch_default;
			return openBlock(), createElementBlock("table", _hoisted_1$1, [createBaseVNode("thead", null, [createBaseVNode("tr", null, [
				createBaseVNode("th", _hoisted_2$1, toDisplayString(_ctx.$t("feature")), 1),
				createBaseVNode("th", null, toDisplayString(_ctx.$t("shared")), 1),
				_cache[43] || (_cache[43] = createBaseVNode("th", { class: "other" }, "Netflix", -1)),
				_cache[44] || (_cache[44] = createBaseVNode("th", { class: "other" }, "Prime", -1)),
				_cache[45] || (_cache[45] = createBaseVNode("th", { class: "other" }, "Disney+", -1)),
				_cache[46] || (_cache[46] = createBaseVNode("th", { class: "other" }, "Crunchyroll", -1)),
				_cache[47] || (_cache[47] = createBaseVNode("th", { class: "other" }, "HBO", -1)),
				_cache[48] || (_cache[48] = createBaseVNode("th", { class: "other" }, "Paramount+", -1))
			])]), createBaseVNode("tbody", null, [
				createBaseVNode("tr", null, [
					createBaseVNode("td", _hoisted_3$1, [
						createBaseVNode("p", null, toDisplayString(_ctx.$t("skipIntroSwitch")), 1),
						createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
						createBaseVNode("div", _hoisted_4$1, toDisplayString(_ctx.$t("skipIntroDescription")), 1)
					]),
					createBaseVNode("td", null, [createVNode(_component_Switch, {
						modelValue: unref(skipIntro),
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(skipIntro) ? skipIntro.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_5$1, [createVNode(_component_Switch, {
						modelValue: unref(settings).Netflix.skipIntro,
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(settings).Netflix.skipIntro = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_6$1, [createVNode(_component_Switch, {
						modelValue: unref(settings).Amazon.skipIntro,
						"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(settings).Amazon.skipIntro = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_7$1, [createVNode(_component_Switch, {
						modelValue: unref(settings).Disney.skipIntro,
						"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(settings).Disney.skipIntro = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_8$1, [createVNode(_component_Switch, {
						modelValue: unref(settings).Crunchyroll.skipIntro,
						"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(settings).Crunchyroll.skipIntro = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_9$1, [createVNode(_component_Switch, {
						modelValue: unref(settings).HBO.skipIntro,
						"onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => unref(settings).HBO.skipIntro = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_10$1, [createVNode(_component_Switch, {
						modelValue: unref(settings).Paramount.skipIntro,
						"onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => unref(settings).Paramount.skipIntro = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])])
				]),
				createBaseVNode("tr", null, [
					createBaseVNode("td", _hoisted_11$1, [
						createBaseVNode("p", null, toDisplayString(_ctx.$t("skipCreditsSwitch")), 1),
						createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
						createBaseVNode("div", _hoisted_12$1, toDisplayString(_ctx.$t("skipCreditsDescription")), 1)
					]),
					createBaseVNode("td", null, [createVNode(_component_Switch, {
						modelValue: unref(skipCredits),
						"onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => isRef(skipCredits) ? skipCredits.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_13$1, [createVNode(_component_Switch, {
						modelValue: unref(NetflixSkipCredits),
						"onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => isRef(NetflixSkipCredits) ? NetflixSkipCredits.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_14$1, [createVNode(_component_Switch, {
						modelValue: unref(AmazonSkipCredits),
						"onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => isRef(AmazonSkipCredits) ? AmazonSkipCredits.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_15$1, [createVNode(_component_Switch, {
						modelValue: unref(DisneySkipCredits),
						"onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => isRef(DisneySkipCredits) ? DisneySkipCredits.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_16$1, [createVNode(_component_Switch, {
						modelValue: unref(settings).Crunchyroll.skipCredits,
						"onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => unref(settings).Crunchyroll.skipCredits = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_17$1, [createVNode(_component_Switch, {
						modelValue: unref(HBOSkipCredits),
						"onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => isRef(HBOSkipCredits) ? HBOSkipCredits.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_18$1, [createVNode(_component_Switch, {
						modelValue: unref(settings).Paramount.skipCredits,
						"onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => unref(settings).Paramount.skipCredits = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])])
				]),
				createBaseVNode("tr", null, [
					createBaseVNode("td", _hoisted_19$1, [
						createBaseVNode("p", null, toDisplayString(_ctx.$t("watchCreditsSwitch")), 1),
						createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
						createBaseVNode("div", _hoisted_20$1, toDisplayString(_ctx.$t("watchCreditsDescription")), 1)
					]),
					createBaseVNode("td", null, [createVNode(_component_Switch, {
						modelValue: unref(watchCredits),
						"onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => isRef(watchCredits) ? watchCredits.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_21$1, [createVNode(_component_Switch, {
						modelValue: unref(NetflixWatchCredits),
						"onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => isRef(NetflixWatchCredits) ? NetflixWatchCredits.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_22$1, [createVNode(_component_Switch, {
						modelValue: unref(AmazonWatchCredits),
						"onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => isRef(AmazonWatchCredits) ? AmazonWatchCredits.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_23$1, [createVNode(_component_Switch, {
						modelValue: unref(DisneyWatchCredits),
						"onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => isRef(DisneyWatchCredits) ? DisneyWatchCredits.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					_cache[49] || (_cache[49] = createBaseVNode("td", { class: "other" }, "➖", -1)),
					createBaseVNode("td", _hoisted_24$1, [createVNode(_component_Switch, {
						modelValue: unref(HBOWatchCredits),
						"onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => isRef(HBOWatchCredits) ? HBOWatchCredits.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_25, [createVNode(_component_Switch, {
						modelValue: unref(settings).Paramount.watchCredits,
						"onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => unref(settings).Paramount.watchCredits = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])])
				]),
				createBaseVNode("tr", null, [
					createBaseVNode("td", _hoisted_26, [
						createBaseVNode("p", null, toDisplayString(_ctx.$t("skipAdSwitch")), 1),
						createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
						createBaseVNode("div", _hoisted_27, toDisplayString(_ctx.$t("skipAdDescription")), 1)
					]),
					createBaseVNode("td", null, [createVNode(_component_Switch, {
						modelValue: unref(skipAd),
						"onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => isRef(skipAd) ? skipAd.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_28, [createVNode(_component_Switch, {
						modelValue: unref(settings).Netflix.skipAd,
						"onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => unref(settings).Netflix.skipAd = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_29, [createVNode(_component_Switch, {
						modelValue: unref(settings).Amazon.skipAd,
						"onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => unref(settings).Amazon.skipAd = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_30, [createVNode(_component_Switch, {
						modelValue: unref(settings).Disney.skipAd,
						"onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => unref(settings).Disney.skipAd = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					_cache[50] || (_cache[50] = createBaseVNode("td", { class: "other" }, "➖", -1)),
					_cache[51] || (_cache[51] = createBaseVNode("td", { class: "other" }, "➖", -1)),
					createBaseVNode("td", _hoisted_31, [createVNode(_component_Switch, {
						modelValue: unref(settings).Paramount.skipAd,
						"onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => unref(settings).Paramount.skipAd = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])])
				]),
				createBaseVNode("tr", null, [
					createBaseVNode("td", _hoisted_32, [
						createBaseVNode("p", null, toDisplayString(_ctx.$t("showRatingSwitch")), 1),
						createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
						createBaseVNode("div", _hoisted_33, toDisplayString(_ctx.$t("showRatingDescription")), 1)
					]),
					createBaseVNode("td", null, [createVNode(_component_Switch, {
						modelValue: unref(showRating),
						"onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => isRef(showRating) ? showRating.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_34, [createVNode(_component_Switch, {
						modelValue: unref(settings).Netflix.showRating,
						"onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => unref(settings).Netflix.showRating = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_35, [createVNode(_component_Switch, {
						modelValue: unref(settings).Amazon.showRating,
						"onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => unref(settings).Amazon.showRating = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_36, [createVNode(_component_Switch, {
						modelValue: unref(settings).Disney.showRating,
						"onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => unref(settings).Disney.showRating = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_37, [createVNode(_component_Switch, {
						modelValue: unref(settings).Crunchyroll.showRating,
						"onUpdate:modelValue": _cache[29] || (_cache[29] = ($event) => unref(settings).Crunchyroll.showRating = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_38, [createVNode(_component_Switch, {
						modelValue: unref(settings).HBO.showRating,
						"onUpdate:modelValue": _cache[30] || (_cache[30] = ($event) => unref(settings).HBO.showRating = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_39, [createVNode(_component_Switch, {
						modelValue: unref(settings).Paramount.showRating,
						"onUpdate:modelValue": _cache[31] || (_cache[31] = ($event) => unref(settings).Paramount.showRating = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])])
				]),
				createBaseVNode("tr", null, [
					createBaseVNode("td", _hoisted_40, [
						createBaseVNode("p", null, toDisplayString(_ctx.$t("speedSliderSwitch")), 1),
						createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
						createBaseVNode("div", _hoisted_41, toDisplayString(_ctx.$t("speedSliderDescription")), 1)
					]),
					createBaseVNode("td", null, [createVNode(_component_Switch, {
						modelValue: unref(speedSlider),
						"onUpdate:modelValue": _cache[32] || (_cache[32] = ($event) => isRef(speedSlider) ? speedSlider.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_42, [createVNode(_component_Switch, {
						modelValue: unref(settings).Netflix.speedSlider,
						"onUpdate:modelValue": _cache[33] || (_cache[33] = ($event) => unref(settings).Netflix.speedSlider = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_43, [createVNode(_component_Switch, {
						modelValue: unref(settings).Amazon.speedSlider,
						"onUpdate:modelValue": _cache[34] || (_cache[34] = ($event) => unref(settings).Amazon.speedSlider = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_44, [createVNode(_component_Switch, {
						modelValue: unref(settings).Disney.speedSlider,
						"onUpdate:modelValue": _cache[35] || (_cache[35] = ($event) => unref(settings).Disney.speedSlider = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_45, [createVNode(_component_Switch, {
						modelValue: unref(settings).Crunchyroll.speedSlider,
						"onUpdate:modelValue": _cache[36] || (_cache[36] = ($event) => unref(settings).Crunchyroll.speedSlider = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_46, [createVNode(_component_Switch, {
						modelValue: unref(settings).HBO.speedSlider,
						"onUpdate:modelValue": _cache[37] || (_cache[37] = ($event) => unref(settings).HBO.speedSlider = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_47, [createVNode(_component_Switch, {
						modelValue: unref(settings).Paramount.speedSlider,
						"onUpdate:modelValue": _cache[38] || (_cache[38] = ($event) => unref(settings).Paramount.speedSlider = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])])
				]),
				createBaseVNode("tr", null, [
					createBaseVNode("td", _hoisted_48, [
						createBaseVNode("p", null, toDisplayString(_ctx.$t("hideTitlesSwitch")), 1),
						createVNode(_component_i_mdi_help_circle, { height: "1rem" }),
						createBaseVNode("div", _hoisted_49, toDisplayString(_ctx.$t("hideTitlesDescription")), 1)
					]),
					createBaseVNode("td", null, [createVNode(_component_Switch, {
						modelValue: unref(hideTitles),
						"onUpdate:modelValue": _cache[39] || (_cache[39] = ($event) => isRef(hideTitles) ? hideTitles.value = $event : null),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_50, [createVNode(_component_Switch, {
						modelValue: unref(settings).Netflix.hideTitles,
						"onUpdate:modelValue": _cache[40] || (_cache[40] = ($event) => unref(settings).Netflix.hideTitles = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_51, [createVNode(_component_Switch, {
						modelValue: unref(settings).Amazon.hideTitles,
						"onUpdate:modelValue": _cache[41] || (_cache[41] = ($event) => unref(settings).Amazon.hideTitles = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("td", _hoisted_52, [createVNode(_component_Switch, {
						modelValue: unref(settings).Disney.hideTitles,
						"onUpdate:modelValue": _cache[42] || (_cache[42] = ($event) => unref(settings).Disney.hideTitles = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					_cache[52] || (_cache[52] = createBaseVNode("td", { class: "other" }, "➖", -1)),
					_cache[53] || (_cache[53] = createBaseVNode("td", { class: "other" }, "➖", -1)),
					_cache[54] || (_cache[54] = createBaseVNode("td", { class: "other" }, "➖", -1))
				])
			])]);
		};
	}
}), [["__scopeId", "data-v-f364d43c"]]);
//#endregion
//#region src/ui/options-page/pages/SharedSettings.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "description" };
var _hoisted_2 = { class: "line flex" };
var _hoisted_3 = { class: "description" };
var _hoisted_4 = { class: "line flex" };
var _hoisted_5 = { class: "description" };
var _hoisted_6 = { class: "dropdown" };
var _hoisted_7 = {
	tabindex: "0",
	class: "dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm z-10"
};
var _hoisted_8 = { class: "flex" };
var _hoisted_9 = ["onUpdate:modelValue", "disabled"];
var _hoisted_10 = ["onClick"];
var _hoisted_stretchRow = { class: "line flex" };
var _hoisted_stretchDesc = { class: "description" };
var _hoisted_11 = { class: "line flex" };
var _hoisted_12 = { class: "description" };
var _hoisted_13 = { class: "line flex" };
var _hoisted_14 = { class: "description" };
var _hoisted_15 = { class: "line flex" };
var _hoisted_16 = { class: "description" };
var _hoisted_17 = { class: "line flex" };
var _hoisted_18 = { class: "description" };
var _hoisted_19 = { class: "line flex" };
var _hoisted_20 = { class: "description" };
var _hoisted_21 = { class: "line flex" };
var _hoisted_22 = { class: "description" };
var _hoisted_23 = { class: "flex" };
var _hoisted_24 = [
	"min",
	"max",
	"step"
];
//#endregion
//#region src/ui/options-page/pages/SharedSettings.vue
var SharedSettings_default = /* @__PURE__ */ defineComponent({
	__name: "SharedSettings",
	setup(__props) {
		const optionsStore = useOptionsStore();
		const { settings } = storeToRefs(optionsStore);
		const speedSlider = computed({
			get: () => streamingServices.every((service) => settings.value[service]?.speedSlider ?? true),
			set: (value) => {
				streamingServices.forEach((service) => {
					if (settings.value[service]?.speedSlider !== void 0) settings.value[service].speedSlider = value;
				});
			}
		});
		const SliderPreview = ref(10);
		const isMobile = /mobile|streamingEnhanced/i.test(navigator.userAgent);
		return (_ctx, _cache) => {
			const _component_Switch = Switch_default;
			const _component_OptionsPageSettingsTable = SettingsTable_default;
			const _component_OptionalPermission = OptionalPermission_default;
			const _component_ColorPicker = ColorPicker_default;
			return openBlock(), createElementBlock(Fragment, null, [
				createBaseVNode("h1", null, toDisplayString(_ctx.$t("sharedPageTitle")), 1),
				createBaseVNode("p", _hoisted_1, toDisplayString(_ctx.$t("sharedPageDescription")), 1),
				createBaseVNode("div", { class: normalizeClass(unref(isMobile) ? "" : "hidden") }, [
					_cache[12] || (_cache[12] = createBaseVNode("hr", null, null, -1)),
					createBaseVNode("div", _hoisted_2, [createBaseVNode("p", null, toDisplayString(_ctx.$t("userAgentSwitch")), 1), createVNode(_component_Switch, {
						modelValue: unref(settings).Video.userAgent,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(settings).Video.userAgent = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("p", _hoisted_3, toDisplayString(_ctx.$t("userAgentDescription")), 1)
				], 2),
				createVNode(_component_OptionsPageSettingsTable),
				createVNode(_component_OptionalPermission),
				_cache[15] || (_cache[15] = createBaseVNode("hr", null, null, -1)),
				createBaseVNode("div", null, [
					createBaseVNode("div", _hoisted_4, [createBaseVNode("p", null, toDisplayString(_ctx.$t("dimLowRatingsSwitch")), 1), createVNode(_component_Switch, {
						modelValue: unref(settings).Video.dimLowRatings,
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(settings).Video.dimLowRatings = $event),
						class: "ml-auto"
					}, null, 8, ["modelValue"])]),
					createBaseVNode("p", _hoisted_5, toDisplayString(_ctx.$t("dimLowRatingsDescription")), 1),
					_cache[14] || (_cache[14] = createBaseVNode("hr", null, null, -1)),
					createBaseVNode("p", null, toDisplayString(_ctx.$t("editRatings")), 1),
					createBaseVNode("table", null, [createBaseVNode("thead", null, [createBaseVNode("tr", null, [createBaseVNode("th", null, toDisplayString(_ctx.$t("pickColor")), 1), createBaseVNode("th", null, toDisplayString(_ctx.$t("pickRating")), 1)])]), createBaseVNode("tbody", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(settings).General.RatingThresholds, (threshold, index) => {
						return openBlock(), createElementBlock("tr", { key: index }, [
							createBaseVNode("td", null, [createBaseVNode("div", _hoisted_6, [createBaseVNode("div", {
								style: normalizeStyle([{
									"width": "30px",
									"height": "30px"
								}, { backgroundColor: threshold.color }]),
								tabindex: "0",
								role: "button"
							}, null, 4), createBaseVNode("div", _hoisted_7, [createVNode(_component_ColorPicker, {
								modelValue: threshold.color,
								"onUpdate:modelValue": ($event) => threshold.color = $event
							}, null, 8, ["modelValue", "onUpdate:modelValue"])])])]),
							createBaseVNode("td", _hoisted_8, [_cache[13] || (_cache[13] = createBaseVNode("p", null, "<=", -1)), withDirectives(createBaseVNode("input", {
								"onUpdate:modelValue": ($event) => threshold.value = $event,
								type: "number",
								class: "input border-inherit",
								disabled: threshold.value === 10
							}, null, 8, _hoisted_9), [[vModelText, threshold.value]])]),
							createBaseVNode("td", null, [createBaseVNode("button", {
								class: "btn btn-error",
								onClick: ($event) => unref(settings).General.RatingThresholds[index] = ("defaultSettings" in _ctx ? _ctx.defaultSettings : unref(defaultSettings)).General.RatingThresholds[index]
							}, toDisplayString(_ctx.$t("reset")), 9, _hoisted_10)])
						]);
					}), 128))])])
				]),
				_cache[16] || (_cache[16] = createBaseVNode("hr", null, null, -1)),
				createBaseVNode("div", _hoisted_11, [createBaseVNode("p", null, toDisplayString(_ctx.$t("playOnFullScreenSwitch")), 1), createVNode(_component_Switch, {
					modelValue: unref(settings).Video.playOnFullScreen,
					"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(settings).Video.playOnFullScreen = $event),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("p", _hoisted_12, toDisplayString(_ctx.$t("playOnFullScreenDescription")), 1),
				_cache[17] || (_cache[17] = createBaseVNode("hr", null, null, -1)),
				createBaseVNode("div", _hoisted_13, [createBaseVNode("p", null, toDisplayString(_ctx.$t("doubleClickSwitch")), 1), createVNode(_component_Switch, {
					modelValue: unref(settings).Video.doubleClick,
					"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(settings).Video.doubleClick = $event),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("p", _hoisted_14, toDisplayString(_ctx.$t("doubleClickDescription")), 1),
				_cache[18] || (_cache[18] = createBaseVNode("hr", null, null, -1)),
				createBaseVNode("div", _hoisted_15, [createBaseVNode("p", null, toDisplayString(_ctx.$t("scrollVolumeSwitch")), 1), createVNode(_component_Switch, {
					modelValue: unref(settings).Video.scrollVolume,
					"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(settings).Video.scrollVolume = $event),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("p", _hoisted_16, toDisplayString(_ctx.$t("scrollVolumeDescription")), 1),
				_cache[19] || (_cache[19] = createBaseVNode("hr", null, null, -1)),
				createBaseVNode("div", _hoisted_stretchRow, [createBaseVNode("p", null, toDisplayString(_ctx.$t("stretchSwitch")), 1), withDirectives(createBaseVNode("select", {
					"onUpdate:modelValue": _cache[60] || (_cache[60] = ($event) => unref(settings).Video.stretch = $event),
					class: "select select-bordered select-sm ml-auto"
				}, [
					createBaseVNode("option", { value: "off" }, toDisplayString(_ctx.$t("stretchOff")), 1),
					createBaseVNode("option", { value: "fill" }, toDisplayString(_ctx.$t("stretchFill")), 1),
					createBaseVNode("option", { value: "zoom" }, toDisplayString(_ctx.$t("stretchZoom")), 1)
				], 512), [[vModelSelect, unref(settings).Video.stretch]])]),
				createBaseVNode("p", _hoisted_stretchDesc, toDisplayString(_ctx.$t("stretchDescription")), 1),
				_cache[61] || (_cache[61] = createBaseVNode("hr", null, null, -1)),
				createBaseVNode("div", _hoisted_17, [createBaseVNode("p", null, toDisplayString(_ctx.$t("showYearSwitch")), 1), createVNode(_component_Switch, {
					modelValue: unref(settings).Video.showYear,
					"onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => unref(settings).Video.showYear = $event),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("p", _hoisted_18, toDisplayString(_ctx.$t("showYearDescription")), 1),
				_cache[20] || (_cache[20] = createBaseVNode("hr", null, null, -1)),
				createBaseVNode("div", _hoisted_19, [createBaseVNode("p", null, toDisplayString(_ctx.$t("epilepsySwitch")), 1), createVNode(_component_Switch, {
					modelValue: unref(settings).Video.epilepsy,
					"onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => unref(settings).Video.epilepsy = $event),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("p", _hoisted_20, toDisplayString(_ctx.$t("epilepsyDescription")), 1),
				_cache[21] || (_cache[21] = createBaseVNode("hr", null, null, -1)),
				createBaseVNode("div", _hoisted_21, [createBaseVNode("p", null, toDisplayString(_ctx.$t("speedSliderSwitch")), 1), createVNode(_component_Switch, {
					modelValue: unref(speedSlider),
					"onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => isRef(speedSlider) ? speedSlider.value = $event : null),
					class: "ml-auto"
				}, null, 8, ["modelValue"])]),
				createBaseVNode("p", _hoisted_22, toDisplayString(_ctx.$t("speedSliderDescription")), 1),
				createBaseVNode("p", null, toDisplayString(_ctx.$t("sliderOptions")), 1),
				createBaseVNode("table", null, [createBaseVNode("tbody", null, [
					createBaseVNode("tr", null, [createBaseVNode("td", null, [createBaseVNode("p", null, toDisplayString(_ctx.$t("sliderStepSize")), 1)]), createBaseVNode("td", null, [withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => unref(settings).General.sliderSteps = $event),
						type: "number",
						class: "input border-inherit"
					}, null, 512), [[vModelText, unref(settings).General.sliderSteps]])])]),
					createBaseVNode("tr", null, [createBaseVNode("td", null, [createBaseVNode("p", null, toDisplayString(_ctx.$t("sliderMin")), 1)]), createBaseVNode("td", null, [withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => unref(settings).General.sliderMin = $event),
						type: "number",
						class: "input border-inherit"
					}, null, 512), [[vModelText, unref(settings).General.sliderMin]])])]),
					createBaseVNode("tr", null, [createBaseVNode("td", null, [createBaseVNode("p", null, toDisplayString(_ctx.$t("sliderMax")), 1)]), createBaseVNode("td", null, [withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => unref(settings).General.sliderMax = $event),
						type: "number",
						class: "input border-inherit"
					}, null, 512), [[vModelText, unref(settings).General.sliderMax]])])]),
					createBaseVNode("tr", null, [createBaseVNode("td", null, [createBaseVNode("p", null, toDisplayString(_ctx.$t("sliderPreview")), 1)]), createBaseVNode("td", null, [createBaseVNode("div", _hoisted_23, [withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => isRef(SliderPreview) ? SliderPreview.value = $event : null),
						type: "range",
						min: unref(settings).General.sliderMin,
						max: unref(settings).General.sliderMax,
						value: "1.0",
						step: unref(settings).General.sliderSteps,
						style: {
							"background": "rgb(221, 221, 221)",
							"width": "200px"
						}
					}, null, 8, _hoisted_24), [[vModelText, unref(SliderPreview)]]), createBaseVNode("p", null, toDisplayString(unref(SliderPreview) / 10 + "x"), 1)])])])
				])])
			], 64);
		};
	}
});
//#endregion
export { SharedSettings_default as default };
