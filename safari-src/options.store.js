import { i as __toESM, r as __exportAll, t as require_browser_polyfill } from "./browser-polyfill.js";
import { $ as mergeModels, $n as normalizeProps, $t as ReactiveEffect, A as defineEmits, An as NOOP, At as ssrUtils, B as h, Bn as isModelListener, Bt as version, C as createRenderer, Cn as toRaw, Ct as resolveDirective, D as createVNode, Dn as triggerRef, Dt as setDevtoolsHook, E as createTextVNode, En as toValue, Et as setBlockTracking, F as defineSlots, Fn as hyphenate, Ft as useModel, G as hydrateOnMediaQuery, Gn as isSpecialBooleanAttr, Gt as watchSyncEffect, H as hasInjectionContext, Hn as isOn, Ht as watch, I as devtools$1, In as includeBooleanAttr, It as useSSRContext, J as inject, Jn as looseEqual, Jt as withDefaults, K as hydrateOnVisible, Kn as isString$1, Kt as withAsyncContext, L as getCurrentInstance$1, Ln as invokeArrayFns, Lt as useSlots, M as defineModel, Mn as capitalize$1, Mt as transformVNodeArgs, N as defineOptions, Nn as extend, Nt as useAttrs, O as defineAsyncComponent, On as unref, Ot as setTransitionHooks, P as defineProps, Pn as hasOwn$1, Pt as useId, Q as mergeDefaults, Qn as normalizeCssVarValue, Qt as EffectScope, R as getTransitionRawChildren, Rn as isArray$1, Rt as useTemplateRef, S as createPropsRestProxy, Sn as stop, St as resolveComponent, T as createStaticVNode, Tn as toRefs, Tt as resolveTransitionHooks, U as hydrateOnIdle, Un as isPlainObject$2, Ut as watchEffect, V as handleError, Vn as isObject$2, Vt as warn$1, W as hydrateOnInteraction, Wn as isSet, Wt as watchPostEffect, X as isRuntimeOnly, Xn as looseToNumber, Xt as withMemo, Y as isMemoSame, Yn as looseIndexOf, Yt as withDirectives, Z as isVNode$1, Zn as normalizeClass, Zt as withScopeId, _ as createBaseVNode, _n as readonly, _t as pushScopeId, a as ErrorTypeStrings, an as getCurrentScope, at as onBeforeUpdate, b as createElementBlock, bn as shallowReadonly, bt as renderList, c as Static, cn as isReactive, ct as onMounted, d as Text, dn as isShallow, dt as onServerPrefetch, en as TrackOpTypes, er as normalizeStyle, et as mergeProps, f as assertNumber, fn as markRaw, ft as onUnmounted, g as computed, gn as reactive, gt as provide, h as cloneVNode, hn as proxyRefs, ht as popScopeId, i as ErrorCodes, in as effectScope, it as onBeforeUnmount, j as defineExpose, jn as camelize, jt as toHandlers, k as defineComponent, kn as EMPTY_OBJ, kt as ssrContextKey, l as Suspense, ln as isReadonly, lt as onRenderTracked, m as callWithErrorHandling, mn as onWatcherCleanup, mt as openBlock, n as BaseTransitionPropsValidators, nn as customRef, nr as toHandlerKey, nt as onActivated, o as Fragment, on as getCurrentWatcher, ot as onDeactivated, p as callWithAsyncErrorHandling, pn as onScopeDispose, pt as onUpdated, q as initCustomFormatter, qn as isSymbol, qt as withCtx, r as Comment, rn as effect, rr as toNumber, rt as onBeforeMount, s as KeepAlive, sn as isProxy, st as onErrorCaptured, t as BaseTransition, tn as TriggerOpTypes, tr as toDisplayString$1, tt as nextTick, u as Teleport, un as isRef, ut as onRenderTriggered, v as createBlock, vn as ref, vt as queuePostFlushCb, w as createSlots, wn as toRef, wt as resolveDynamicComponent, x as createHydrationRenderer, xn as shallowRef, xt as renderSlot, y as createCommentVNode, yn as shallowReactive, yt as registerRuntimeCompiler, z as guardReactiveProps, zn as isFunction$1, zt as useTransitionState } from "./runtime-core.esm-bundler.js";
import { n as useBrowserLocalStorage, r as useBrowserSyncStorage, t as defaultSettings } from "./storeTypes.js";
//#region node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
/**
* @vue/runtime-dom v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var policy = void 0;
var tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) try {
	policy = /* @__PURE__ */ tt.createPolicy("vue", { createHTML: (val) => val });
} catch (e) {}
var unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
var svgNS = "http://www.w3.org/2000/svg";
var mathmlNS = "http://www.w3.org/1998/Math/MathML";
var doc = typeof document !== "undefined" ? document : null;
var templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
var nodeOps = {
	insert: (child, parent, anchor) => {
		parent.insertBefore(child, anchor || null);
	},
	remove: (child) => {
		const parent = child.parentNode;
		if (parent) parent.removeChild(child);
	},
	createElement: (tag, namespace, is, props) => {
		const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
		if (tag === "select" && props && props.multiple != null) el.setAttribute("multiple", props.multiple);
		return el;
	},
	createText: (text) => doc.createTextNode(text),
	createComment: (text) => doc.createComment(text),
	setText: (node, text) => {
		node.nodeValue = text;
	},
	setElementText: (el, text) => {
		el.textContent = text;
	},
	parentNode: (node) => node.parentNode,
	nextSibling: (node) => node.nextSibling,
	querySelector: (selector) => doc.querySelector(selector),
	setScopeId(el, id) {
		el.setAttribute(id, "");
	},
	insertStaticContent(content, parent, anchor, namespace, start, end) {
		const before = anchor ? anchor.previousSibling : parent.lastChild;
		if (start && (start === end || start.nextSibling)) while (true) {
			parent.insertBefore(start.cloneNode(true), anchor);
			if (start === end || !(start = start.nextSibling)) break;
		}
		else {
			templateContainer.innerHTML = unsafeToTrustedHTML(namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content);
			const template = templateContainer.content;
			if (namespace === "svg" || namespace === "mathml") {
				const wrapper = template.firstChild;
				while (wrapper.firstChild) template.appendChild(wrapper.firstChild);
				template.removeChild(wrapper);
			}
			parent.insertBefore(template, anchor);
		}
		return [before ? before.nextSibling : parent.firstChild, anchor ? anchor.previousSibling : parent.lastChild];
	}
};
var TRANSITION = "transition";
var ANIMATION = "animation";
var vtcKey = /* @__PURE__ */ Symbol("_vtc");
var DOMTransitionPropsValidators = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: true
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
};
var TransitionPropsValidators = /* @__PURE__ */ extend({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators);
var decorate$1 = (t) => {
	t.displayName = "Transition";
	t.props = TransitionPropsValidators;
	return t;
};
var Transition = /* @__PURE__ */ decorate$1((props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots));
var callHook = (hook, args = []) => {
	if (isArray$1(hook)) hook.forEach((h2) => h2(...args));
	else if (hook) hook(...args);
};
var hasExplicitCallback = (hook) => {
	return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
	const baseProps = {};
	for (const key in rawProps) if (!(key in DOMTransitionPropsValidators)) baseProps[key] = rawProps[key];
	if (rawProps.css === false) return baseProps;
	const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
	const durations = normalizeDuration(duration);
	const enterDuration = durations && durations[0];
	const leaveDuration = durations && durations[1];
	const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
	const finishEnter = (el, isAppear, done, isCancelled) => {
		el._enterCancelled = isCancelled;
		removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
		removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
		done && done();
	};
	const finishLeave = (el, done) => {
		el._isLeaving = false;
		removeTransitionClass(el, leaveFromClass);
		removeTransitionClass(el, leaveToClass);
		removeTransitionClass(el, leaveActiveClass);
		done && done();
	};
	const makeEnterHook = (isAppear) => {
		return (el, done) => {
			const hook = isAppear ? onAppear : onEnter;
			const resolve = () => finishEnter(el, isAppear, done);
			callHook(hook, [el, resolve]);
			nextFrame(() => {
				removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
				addTransitionClass(el, isAppear ? appearToClass : enterToClass);
				if (!hasExplicitCallback(hook)) whenTransitionEnds(el, type, enterDuration, resolve);
			});
		};
	};
	return extend(baseProps, {
		onBeforeEnter(el) {
			callHook(onBeforeEnter, [el]);
			addTransitionClass(el, enterFromClass);
			addTransitionClass(el, enterActiveClass);
		},
		onBeforeAppear(el) {
			callHook(onBeforeAppear, [el]);
			addTransitionClass(el, appearFromClass);
			addTransitionClass(el, appearActiveClass);
		},
		onEnter: makeEnterHook(false),
		onAppear: makeEnterHook(true),
		onLeave(el, done) {
			el._isLeaving = true;
			const resolve = () => finishLeave(el, done);
			addTransitionClass(el, leaveFromClass);
			if (!el._enterCancelled) {
				forceReflow(el);
				addTransitionClass(el, leaveActiveClass);
			} else {
				addTransitionClass(el, leaveActiveClass);
				forceReflow(el);
			}
			nextFrame(() => {
				if (!el._isLeaving) return;
				removeTransitionClass(el, leaveFromClass);
				addTransitionClass(el, leaveToClass);
				if (!hasExplicitCallback(onLeave)) whenTransitionEnds(el, type, leaveDuration, resolve);
			});
			callHook(onLeave, [el, resolve]);
		},
		onEnterCancelled(el) {
			finishEnter(el, false, void 0, true);
			callHook(onEnterCancelled, [el]);
		},
		onAppearCancelled(el) {
			finishEnter(el, true, void 0, true);
			callHook(onAppearCancelled, [el]);
		},
		onLeaveCancelled(el) {
			finishLeave(el);
			callHook(onLeaveCancelled, [el]);
		}
	});
}
function normalizeDuration(duration) {
	if (duration == null) return null;
	else if (isObject$2(duration)) return [NumberOf(duration.enter), NumberOf(duration.leave)];
	else {
		const n = NumberOf(duration);
		return [n, n];
	}
}
function NumberOf(val) {
	return toNumber(val);
}
function addTransitionClass(el, cls) {
	cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
	(el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
	cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
	const _vtc = el[vtcKey];
	if (_vtc) {
		_vtc.delete(cls);
		if (!_vtc.size) el[vtcKey] = void 0;
	}
}
function nextFrame(cb) {
	requestAnimationFrame(() => {
		requestAnimationFrame(cb);
	});
}
var endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
	const id = el._endId = ++endId;
	const resolveIfNotStale = () => {
		if (id === el._endId) resolve();
	};
	if (explicitTimeout != null) return setTimeout(resolveIfNotStale, explicitTimeout);
	const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
	if (!type) return resolve();
	const endEvent = type + "end";
	let ended = 0;
	const end = () => {
		el.removeEventListener(endEvent, onEnd);
		resolveIfNotStale();
	};
	const onEnd = (e) => {
		if (e.target === el && ++ended >= propCount) end();
	};
	setTimeout(() => {
		if (ended < propCount) end();
	}, timeout + 1);
	el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
	const styles = window.getComputedStyle(el);
	const getStyleProperties = (key) => (styles[key] || "").split(", ");
	const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
	const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
	const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
	const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
	const animationTimeout = getTimeout(animationDelays, animationDurations);
	let type = null;
	let timeout = 0;
	let propCount = 0;
	if (expectedType === TRANSITION) {
		if (transitionTimeout > 0) {
			type = TRANSITION;
			timeout = transitionTimeout;
			propCount = transitionDurations.length;
		}
	} else if (expectedType === ANIMATION) {
		if (animationTimeout > 0) {
			type = ANIMATION;
			timeout = animationTimeout;
			propCount = animationDurations.length;
		}
	} else {
		timeout = Math.max(transitionTimeout, animationTimeout);
		type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
		propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
	}
	const hasTransform = type === TRANSITION && /\b(?:transform|all)(?:,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
	return {
		type,
		timeout,
		propCount,
		hasTransform
	};
}
function getTimeout(delays, durations) {
	while (delays.length < durations.length) delays = delays.concat(delays);
	return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
	if (s === "auto") return 0;
	return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow(el) {
	return (el ? el.ownerDocument : document).body.offsetHeight;
}
function patchClass(el, value, isSVG) {
	const transitionClasses = el[vtcKey];
	if (transitionClasses) value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
	if (value == null) el.removeAttribute("class");
	else if (isSVG) el.setAttribute("class", value);
	else el.className = value;
}
var vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
var vShowHidden = /* @__PURE__ */ Symbol("_vsh");
var vShow = {
	name: "show",
	beforeMount(el, { value }, { transition }) {
		el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
		if (transition && value) transition.beforeEnter(el);
		else setDisplay(el, value);
	},
	mounted(el, { value }, { transition }) {
		if (transition && value) transition.enter(el);
	},
	updated(el, { value, oldValue }, { transition }) {
		if (!value === !oldValue) return;
		if (transition) {
			if (value) {
				transition.beforeEnter(el);
				setDisplay(el, true);
				transition.enter(el);
			} else transition.leave(el, () => {
				setDisplay(el, false);
			});
		} else setDisplay(el, value);
	},
	beforeUnmount(el, { value }) {
		setDisplay(el, value);
	}
};
function setDisplay(el, value) {
	el.style.display = value ? el[vShowOriginalDisplay] : "none";
	el[vShowHidden] = !value;
}
function initVShowForSSR() {
	vShow.getSSRProps = ({ value }) => {
		if (!value) return { style: { display: "none" } };
	};
}
var CSS_VAR_TEXT = /* @__PURE__ */ Symbol("");
function useCssVars(getter) {
	const instance = getCurrentInstance$1();
	if (!instance) return;
	const updateTeleports = instance.ut = (vars = getter(instance.proxy)) => {
		Array.from(document.querySelectorAll(`[data-v-owner="${instance.uid}"]`)).forEach((node) => setVarsOnNode(node, vars));
	};
	const setVars = () => {
		const vars = getter(instance.proxy);
		if (instance.ce) setVarsOnNode(instance.ce, vars);
		else setVarsOnVNode(instance.subTree, vars);
		updateTeleports(vars);
	};
	onBeforeUpdate(() => {
		queuePostFlushCb(setVars);
	});
	onMounted(() => {
		watch(setVars, NOOP, { flush: "post" });
		const ob = new MutationObserver(setVars);
		ob.observe(instance.subTree.el.parentNode, { childList: true });
		onUnmounted(() => ob.disconnect());
	});
}
function setVarsOnVNode(vnode, vars) {
	if (vnode.shapeFlag & 128) {
		const suspense = vnode.suspense;
		vnode = suspense.activeBranch;
		if (suspense.pendingBranch && !suspense.isHydrating) suspense.effects.push(() => {
			setVarsOnVNode(suspense.activeBranch, vars);
		});
	}
	while (vnode.component) vnode = vnode.component.subTree;
	if (vnode.shapeFlag & 1 && vnode.el) setVarsOnNode(vnode.el, vars);
	else if (vnode.type === Fragment) vnode.children.forEach((c) => setVarsOnVNode(c, vars));
	else if (vnode.type === Static) {
		let { el, anchor } = vnode;
		while (el) {
			setVarsOnNode(el, vars);
			if (el === anchor) break;
			el = el.nextSibling;
		}
	}
}
function setVarsOnNode(el, vars) {
	if (el.nodeType === 1) {
		const style = el.style;
		let cssText = "";
		for (const key in vars) {
			const value = normalizeCssVarValue(vars[key]);
			style.setProperty(`--${key}`, value);
			cssText += `--${key}: ${value};`;
		}
		style[CSS_VAR_TEXT] = cssText;
	}
}
var displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
	const style = el.style;
	const isCssString = isString$1(next);
	let hasControlledDisplay = false;
	if (next && !isCssString) {
		if (prev) {
			if (!isString$1(prev)) {
				for (const key in prev) if (next[key] == null) setStyle(style, key, "");
			} else for (const prevStyle of prev.split(";")) {
				const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
				if (next[key] == null) setStyle(style, key, "");
			}
		}
		for (const key in next) {
			if (key === "display") hasControlledDisplay = true;
			const value = next[key];
			if (value != null) {
				if (!shouldPreserveTextareaResizeStyle(el, key, !isString$1(prev) && prev ? prev[key] : void 0, value)) setStyle(style, key, value);
			} else setStyle(style, key, "");
		}
	} else if (isCssString) {
		if (prev !== next) {
			const cssVarText = style[CSS_VAR_TEXT];
			if (cssVarText) next += ";" + cssVarText;
			style.cssText = next;
			hasControlledDisplay = displayRE.test(next);
		}
	} else if (prev) el.removeAttribute("style");
	if (vShowOriginalDisplay in el) {
		el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
		if (el[vShowHidden]) style.display = "none";
	}
}
var importantRE = /\s*!important$/;
function setStyle(style, name, val) {
	if (isArray$1(val)) val.forEach((v) => setStyle(style, name, v));
	else {
		if (val == null) val = "";
		if (name.startsWith("--")) style.setProperty(name, val);
		else {
			const prefixed = autoPrefix(style, name);
			if (importantRE.test(val)) style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
			else style[prefixed] = val;
		}
	}
}
var prefixes = [
	"Webkit",
	"Moz",
	"ms"
];
var prefixCache = {};
function autoPrefix(style, rawName) {
	const cached = prefixCache[rawName];
	if (cached) return cached;
	let name = camelize(rawName);
	if (name !== "filter" && name in style) return prefixCache[rawName] = name;
	name = capitalize$1(name);
	for (let i = 0; i < prefixes.length; i++) {
		const prefixed = prefixes[i] + name;
		if (prefixed in style) return prefixCache[rawName] = prefixed;
	}
	return rawName;
}
function shouldPreserveTextareaResizeStyle(el, key, prev, next) {
	return el.tagName === "TEXTAREA" && (key === "width" || key === "height") && isString$1(next) && prev === next;
}
var xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
	if (isSVG && key.startsWith("xlink:")) {
		if (value == null) el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
		else el.setAttributeNS(xlinkNS, key, value);
	} else if (value == null || isBoolean && !includeBooleanAttr(value)) el.removeAttribute(key);
	else el.setAttribute(key, isBoolean ? "" : isSymbol(value) ? String(value) : value);
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
	if (key === "innerHTML" || key === "textContent") {
		if (value != null) el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
		return;
	}
	const tag = el.tagName;
	if (key === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
		const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
		const newValue = value == null ? el.type === "checkbox" ? "on" : "" : String(value);
		if (oldValue !== newValue || !("_value" in el)) el.value = newValue;
		if (value == null) el.removeAttribute(key);
		el._value = value;
		return;
	}
	let needRemove = false;
	if (value === "" || value == null) {
		const type = typeof el[key];
		if (type === "boolean") value = includeBooleanAttr(value);
		else if (value == null && type === "string") {
			value = "";
			needRemove = true;
		} else if (type === "number") {
			value = 0;
			needRemove = true;
		}
	}
	try {
		el[key] = value;
	} catch (e) {}
	needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
	el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
	el.removeEventListener(event, handler, options);
}
var veiKey = /* @__PURE__ */ Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
	const invokers = el[veiKey] || (el[veiKey] = {});
	const existingInvoker = invokers[rawName];
	if (nextValue && existingInvoker) existingInvoker.value = nextValue;
	else {
		const [name, options] = parseName(rawName);
		if (nextValue) addEventListener(el, name, invokers[rawName] = createInvoker(nextValue, instance), options);
		else if (existingInvoker) {
			removeEventListener(el, name, existingInvoker, options);
			invokers[rawName] = void 0;
		}
	}
}
var optionsModifierRE = /(Once|Passive|Capture)$/;
var optionsModifierEventRE = /^on:?(?:Once|Passive|Capture)$/;
function parseName(name) {
	let options;
	let m;
	while ((m = name.match(optionsModifierRE)) && !optionsModifierEventRE.test(name)) {
		if (!options) options = {};
		name = name.slice(0, name.length - m[1].length);
		options[m[1].toLowerCase()] = true;
	}
	return [name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2)), options];
}
var cachedNow = 0;
var p = /* @__PURE__ */ Promise.resolve();
var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
	const invoker = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= invoker.attached) return;
		const value = invoker.value;
		if (isArray$1(value)) {
			const originalStop = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				originalStop.call(e);
				e._stopped = true;
			};
			const handlers = value.slice();
			const args = [e];
			for (let i = 0; i < handlers.length; i++) {
				if (e._stopped) break;
				const handler = handlers[i];
				if (handler) callWithAsyncErrorHandling(handler, instance, 5, args);
			}
		} else callWithAsyncErrorHandling(value, instance, 5, [e]);
	};
	invoker.value = initialValue;
	invoker.attached = getNow();
	return invoker;
}
var isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
var patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
	const isSVG = namespace === "svg";
	if (key === "class") patchClass(el, nextValue, isSVG);
	else if (key === "style") patchStyle(el, prevValue, nextValue);
	else if (isOn(key)) {
		if (!isModelListener(key)) patchEvent(el, key, prevValue, nextValue, parentComponent);
	} else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
		patchDOMProp(el, key, nextValue);
		if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
	} else if (el._isVueCE && (shouldSetAsPropForVueCE(el, key) || el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString$1(nextValue)))) patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
	else {
		if (key === "true-value") el._trueValue = nextValue;
		else if (key === "false-value") el._falseValue = nextValue;
		patchAttr(el, key, nextValue, isSVG);
	}
};
function shouldSetAsProp(el, key, value, isSVG) {
	if (isSVG) {
		if (key === "innerHTML" || key === "textContent") return true;
		if (key in el && isNativeOn(key) && isFunction$1(value)) return true;
		return false;
	}
	if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") return false;
	if (key === "sandbox" && el.tagName === "IFRAME") return false;
	if (key === "form") return false;
	if (key === "list" && el.tagName === "INPUT") return false;
	if (key === "type" && el.tagName === "TEXTAREA") return false;
	if (key === "width" || key === "height") {
		const tag = el.tagName;
		if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") return false;
	}
	if (isNativeOn(key) && isString$1(value)) return false;
	return key in el;
}
function shouldSetAsPropForVueCE(el, key) {
	const props = el._def.props;
	if (!props) return false;
	const camelKey = camelize(key);
	return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
}
var REMOVAL = {};
// @__NO_SIDE_EFFECTS__
function defineCustomElement(options, extraOptions, _createApp) {
	let Comp = defineComponent(options, extraOptions);
	if (isPlainObject$2(Comp)) Comp = extend({}, Comp, extraOptions);
	class VueCustomElement extends VueElement {
		constructor(initialProps) {
			super(Comp, initialProps, _createApp);
		}
	}
	VueCustomElement.def = Comp;
	return VueCustomElement;
}
var defineSSRCustomElement = /* @__NO_SIDE_EFFECTS__ */ ((options, extraOptions) => {
	return /* @__PURE__ */ defineCustomElement(options, extraOptions, createSSRApp);
});
var BaseClass = typeof HTMLElement !== "undefined" ? HTMLElement : class {};
var VueElement = class VueElement extends BaseClass {
	constructor(_def, _props = {}, _createApp = createApp) {
		super();
		this._def = _def;
		this._props = _props;
		this._createApp = _createApp;
		this._isVueCE = true;
		/**
		* @internal
		*/
		this._instance = null;
		/**
		* @internal
		*/
		this._app = null;
		/**
		* @internal
		*/
		this._nonce = this._def.nonce;
		this._connected = false;
		this._resolved = false;
		this._patching = false;
		this._dirty = false;
		this._numberProps = null;
		this._styleChildren = /* @__PURE__ */ new WeakSet();
		this._styleAnchors = /* @__PURE__ */ new WeakMap();
		this._ob = null;
		if (this.shadowRoot && _createApp !== createApp) this._root = this.shadowRoot;
		else if (_def.shadowRoot !== false) {
			this.attachShadow(extend({}, _def.shadowRootOptions, { mode: "open" }));
			this._root = this.shadowRoot;
		} else this._root = this;
	}
	connectedCallback() {
		if (!this.isConnected) return;
		if (!this.shadowRoot && !this._resolved) this._parseSlots();
		this._connected = true;
		let parent = this;
		while (parent = parent && (parent.assignedSlot || parent.parentNode || parent.host)) if (parent instanceof VueElement) {
			this._parent = parent;
			break;
		}
		if (!this._instance) {
			if (this._resolved) this._mount(this._def);
			else if (parent && parent._pendingResolve) this._pendingResolve = parent._pendingResolve.then(() => {
				this._pendingResolve = void 0;
				if (this.isConnected) return this._resolveDef();
			});
			else this._resolveDef();
		}
	}
	_setParent(parent = this._parent) {
		if (parent) {
			this._instance.parent = parent._instance;
			this._inheritParentContext(parent);
		}
	}
	_inheritParentContext(parent = this._parent) {
		if (parent && this._app) Object.setPrototypeOf(this._app._context.provides, parent._instance.provides);
	}
	disconnectedCallback() {
		this._connected = false;
		nextTick(() => {
			if (!this._connected) {
				if (this._ob) {
					this._ob.disconnect();
					this._ob = null;
				}
				this._app && this._app.unmount();
				if (this._instance) this._instance.ce = void 0;
				this._app = this._instance = null;
				if (this._teleportTargets) {
					this._teleportTargets.clear();
					this._teleportTargets = void 0;
				}
			}
		});
	}
	_processMutations(mutations) {
		for (const m of mutations) this._setAttr(m.attributeName);
	}
	/**
	* resolve inner component definition (handle possible async component)
	*/
	_resolveDef() {
		if (this._pendingResolve) return this._pendingResolve;
		for (let i = 0; i < this.attributes.length; i++) this._setAttr(this.attributes[i].name);
		this._ob = new MutationObserver(this._processMutations.bind(this));
		this._ob.observe(this, { attributes: true });
		const resolve = (def, isAsync = false) => {
			this._resolved = true;
			this._pendingResolve = void 0;
			const { props, styles } = def;
			let numberProps;
			if (props && !isArray$1(props)) for (const key in props) {
				const opt = props[key];
				if (opt === Number || opt && opt.type === Number) {
					if (key in this._props) this._props[key] = toNumber(this._props[key]);
					(numberProps || (numberProps = /* @__PURE__ */ Object.create(null)))[camelize(key)] = true;
				}
			}
			this._numberProps = numberProps;
			this._resolveProps(def);
			if (this.shadowRoot) this._applyStyles(styles);
			this._mount(def);
		};
		const asyncDef = this._def.__asyncLoader;
		if (asyncDef) {
			this._pendingResolve = asyncDef().then((def) => {
				def.configureApp = this._def.configureApp;
				resolve(this._def = def, true);
			});
			return this._pendingResolve;
		} else resolve(this._def);
	}
	_mount(def) {
		this._app = this._createApp(def);
		this._inheritParentContext();
		if (def.configureApp) def.configureApp(this._app);
		this._app._ceVNode = this._createVNode();
		this._app.mount(this._root);
		const exposed = this._instance && this._instance.exposed;
		if (!exposed) return;
		for (const key in exposed) if (!hasOwn$1(this, key)) Object.defineProperty(this, key, { get: () => unref(exposed[key]) });
	}
	_resolveProps(def) {
		const { props } = def;
		const declaredPropKeys = isArray$1(props) ? props : Object.keys(props || {});
		for (const key of Object.keys(this)) if (key[0] !== "_" && declaredPropKeys.includes(key)) this._setProp(key, this[key]);
		for (const key of declaredPropKeys.map(camelize)) Object.defineProperty(this, key, {
			get() {
				return this._getProp(key);
			},
			set(val) {
				this._setProp(key, val, true, !this._patching);
			}
		});
	}
	_setAttr(key) {
		if (key.startsWith("data-v-")) return;
		const has = this.hasAttribute(key);
		let value = has ? this.getAttribute(key) : REMOVAL;
		const camelKey = camelize(key);
		if (has && this._numberProps && this._numberProps[camelKey]) value = toNumber(value);
		this._setProp(camelKey, value, false, true);
	}
	/**
	* @internal
	*/
	_getProp(key) {
		return this._props[key];
	}
	/**
	* @internal
	*/
	_setProp(key, val, shouldReflect = true, shouldUpdate = false) {
		if (val !== this._props[key]) {
			this._dirty = true;
			if (val === REMOVAL) delete this._props[key];
			else {
				this._props[key] = val;
				if (key === "key" && this._app) this._app._ceVNode.key = val;
			}
			if (shouldUpdate && this._instance) this._update();
			if (shouldReflect) {
				const ob = this._ob;
				if (ob) {
					this._processMutations(ob.takeRecords());
					ob.disconnect();
				}
				if (val === true) this.setAttribute(hyphenate(key), "");
				else if (typeof val === "string" || typeof val === "number") this.setAttribute(hyphenate(key), val + "");
				else if (!val) this.removeAttribute(hyphenate(key));
				ob && ob.observe(this, { attributes: true });
			}
		}
	}
	_update() {
		const vnode = this._createVNode();
		if (this._app) vnode.appContext = this._app._context;
		render(vnode, this._root);
	}
	_createVNode() {
		const baseProps = {};
		if (!this.shadowRoot) baseProps.onVnodeMounted = baseProps.onVnodeUpdated = this._renderSlots.bind(this);
		const vnode = createVNode(this._def, extend(baseProps, this._props));
		if (!this._instance) vnode.ce = (instance) => {
			this._instance = instance;
			instance.ce = this;
			instance.isCE = true;
			const dispatch = (event, args) => {
				this.dispatchEvent(new CustomEvent(event, isPlainObject$2(args[0]) ? extend({ detail: args }, args[0]) : { detail: args }));
			};
			instance.emit = (event, ...args) => {
				dispatch(event, args);
				if (hyphenate(event) !== event) dispatch(hyphenate(event), args);
			};
			this._setParent();
		};
		return vnode;
	}
	_applyStyles(styles, owner, parentComp) {
		if (!styles) return;
		if (owner) {
			if (owner === this._def || this._styleChildren.has(owner)) return;
			this._styleChildren.add(owner);
		}
		const nonce = this._nonce;
		const root = this.shadowRoot;
		const insertionAnchor = parentComp ? this._getStyleAnchor(parentComp) || this._getStyleAnchor(this._def) : this._getRootStyleInsertionAnchor(root);
		let last = null;
		for (let i = styles.length - 1; i >= 0; i--) {
			const s = document.createElement("style");
			if (nonce) s.setAttribute("nonce", nonce);
			s.textContent = styles[i];
			root.insertBefore(s, last || insertionAnchor);
			last = s;
			if (i === 0) {
				if (!parentComp) this._styleAnchors.set(this._def, s);
				if (owner) this._styleAnchors.set(owner, s);
			}
		}
	}
	_getStyleAnchor(comp) {
		if (!comp) return null;
		const anchor = this._styleAnchors.get(comp);
		if (anchor && anchor.parentNode === this.shadowRoot) return anchor;
		if (anchor) this._styleAnchors.delete(comp);
		return null;
	}
	_getRootStyleInsertionAnchor(root) {
		for (let i = 0; i < root.childNodes.length; i++) {
			const node = root.childNodes[i];
			if (!(node instanceof HTMLStyleElement)) return node;
		}
		return null;
	}
	/**
	* Only called when shadowRoot is false
	*/
	_parseSlots() {
		const slots = this._slots = {};
		let n;
		while (n = this.firstChild) {
			const slotName = n.nodeType === 1 && n.getAttribute("slot") || "default";
			(slots[slotName] || (slots[slotName] = [])).push(n);
			this.removeChild(n);
		}
	}
	/**
	* Only called when shadowRoot is false
	*/
	_renderSlots() {
		const outlets = this._getSlots();
		const scopeId = this._instance.type.__scopeId;
		for (let i = 0; i < outlets.length; i++) {
			const o = outlets[i];
			const slotName = o.getAttribute("name") || "default";
			const content = this._slots[slotName];
			const parent = o.parentNode;
			if (content) for (const n of content) {
				if (scopeId && n.nodeType === 1) {
					const id = scopeId + "-s";
					const walker = document.createTreeWalker(n, 1);
					n.setAttribute(id, "");
					let child;
					while (child = walker.nextNode()) child.setAttribute(id, "");
				}
				parent.insertBefore(n, o);
			}
			else while (o.firstChild) parent.insertBefore(o.firstChild, o);
			parent.removeChild(o);
		}
	}
	/**
	* @internal
	*/
	_getSlots() {
		const roots = [this];
		if (this._teleportTargets) roots.push(...this._teleportTargets);
		const slots = /* @__PURE__ */ new Set();
		for (const root of roots) {
			const found = root.querySelectorAll("slot");
			for (let i = 0; i < found.length; i++) slots.add(found[i]);
		}
		return Array.from(slots);
	}
	/**
	* @internal
	*/
	_injectChildStyle(comp, parentComp) {
		this._applyStyles(comp.styles, comp, parentComp);
	}
	/**
	* @internal
	*/
	_beginPatch() {
		this._patching = true;
		this._dirty = false;
	}
	/**
	* @internal
	*/
	_endPatch() {
		this._patching = false;
		if (this._dirty && this._instance) this._update();
	}
	/**
	* @internal
	*/
	_hasShadowRoot() {
		return this._def.shadowRoot !== false;
	}
	/**
	* @internal
	*/
	_removeChildStyle(comp) {}
};
function useHost(caller) {
	const instance = getCurrentInstance$1();
	const el = instance && instance.ce;
	if (el) return el;
	return null;
}
function useShadowRoot() {
	const el = useHost();
	return el && el.shadowRoot;
}
function useCssModule(name = "$style") {
	{
		const instance = getCurrentInstance$1();
		if (!instance) return EMPTY_OBJ;
		const modules = instance.type.__cssModules;
		if (!modules) return EMPTY_OBJ;
		const mod = modules[name];
		if (!mod) return EMPTY_OBJ;
		return mod;
	}
}
var positionMap = /* @__PURE__ */ new WeakMap();
var newPositionMap = /* @__PURE__ */ new WeakMap();
var moveCbKey = /* @__PURE__ */ Symbol("_moveCb");
var enterCbKey = /* @__PURE__ */ Symbol("_enterCb");
var decorate = (t) => {
	delete t.props.mode;
	return t;
};
var TransitionGroup = /* @__PURE__ */ decorate({
	name: "TransitionGroup",
	props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
		tag: String,
		moveClass: String
	}),
	setup(props, { slots }) {
		const instance = getCurrentInstance$1();
		const state = useTransitionState();
		let prevChildren;
		let children;
		onUpdated(() => {
			if (!prevChildren.length) return;
			const moveClass = props.moveClass || `${props.name || "v"}-move`;
			if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
				prevChildren = [];
				return;
			}
			prevChildren.forEach(callPendingCbs);
			prevChildren.forEach(recordPosition);
			const movedChildren = prevChildren.filter(applyTranslation);
			forceReflow(instance.vnode.el);
			movedChildren.forEach((c) => {
				const el = c.el;
				const style = el.style;
				addTransitionClass(el, moveClass);
				style.transform = style.webkitTransform = style.transitionDuration = "";
				const cb = el[moveCbKey] = (e) => {
					if (e && e.target !== el) return;
					if (!e || e.propertyName.endsWith("transform")) {
						el.removeEventListener("transitionend", cb);
						el[moveCbKey] = null;
						removeTransitionClass(el, moveClass);
					}
				};
				el.addEventListener("transitionend", cb);
			});
			prevChildren = [];
		});
		return () => {
			const rawProps = toRaw(props);
			const cssTransitionProps = resolveTransitionProps(rawProps);
			let tag = rawProps.tag || Fragment;
			prevChildren = [];
			if (children) for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (child.el && child.el instanceof Element && !child.el[vShowHidden]) {
					prevChildren.push(child);
					setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
					positionMap.set(child, getPosition(child.el));
				}
			}
			children = slots.default ? getTransitionRawChildren(slots.default()) : [];
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (child.key != null) setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
			}
			return createVNode(tag, null, children);
		};
	}
});
function callPendingCbs(c) {
	const el = c.el;
	if (el[moveCbKey]) el[moveCbKey]();
	if (el[enterCbKey]) el[enterCbKey]();
}
function recordPosition(c) {
	newPositionMap.set(c, getPosition(c.el));
}
function applyTranslation(c) {
	const oldPos = positionMap.get(c);
	const newPos = newPositionMap.get(c);
	const dx = oldPos.left - newPos.left;
	const dy = oldPos.top - newPos.top;
	if (dx || dy) {
		const el = c.el;
		const s = el.style;
		const rect = el.getBoundingClientRect();
		let scaleX = 1;
		let scaleY = 1;
		if (el.offsetWidth) scaleX = rect.width / el.offsetWidth;
		if (el.offsetHeight) scaleY = rect.height / el.offsetHeight;
		if (!Number.isFinite(scaleX) || scaleX === 0) scaleX = 1;
		if (!Number.isFinite(scaleY) || scaleY === 0) scaleY = 1;
		if (Math.abs(scaleX - 1) < .01) scaleX = 1;
		if (Math.abs(scaleY - 1) < .01) scaleY = 1;
		s.transform = s.webkitTransform = `translate(${dx / scaleX}px,${dy / scaleY}px)`;
		s.transitionDuration = "0s";
		return c;
	}
}
function getPosition(el) {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left,
		top: rect.top
	};
}
function hasCSSTransform(el, root, moveClass) {
	const clone = el.cloneNode();
	const _vtc = el[vtcKey];
	if (_vtc) _vtc.forEach((cls) => {
		cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
	});
	moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
	clone.style.display = "none";
	const container = root.nodeType === 1 ? root : root.parentNode;
	container.appendChild(clone);
	const { hasTransform } = getTransitionInfo(clone);
	container.removeChild(clone);
	return hasTransform;
}
var getModelAssigner = (vnode) => {
	const fn = vnode.props["onUpdate:modelValue"] || false;
	return isArray$1(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
	e.target.composing = true;
}
function onCompositionEnd(e) {
	const target = e.target;
	if (target.composing) {
		target.composing = false;
		target.dispatchEvent(new Event("input"));
	}
}
var assignKey = /* @__PURE__ */ Symbol("_assign");
var initialValueKey = /* @__PURE__ */ Symbol("_initialValue");
function castValue(value, trim, number) {
	if (trim) value = value.trim();
	if (number) value = looseToNumber(value);
	return value;
}
var vModelText = {
	created(el, { modifiers: { lazy, trim, number } }, vnode) {
		if (el.parentNode) {
			if (el.type === "text") el[initialValueKey] = el.defaultValue.replace(/[\r\n]/g, "");
			else if (el.type === "textarea") el[initialValueKey] = el.defaultValue.replace(/\r\n?/g, "\n");
		}
		el[assignKey] = getModelAssigner(vnode);
		const castToNumber = number || vnode.props && vnode.props.type === "number";
		addEventListener(el, lazy ? "change" : "input", (e) => {
			if (e.target.composing) return;
			el[assignKey](castValue(el.value, trim, castToNumber));
		});
		if (trim || castToNumber) addEventListener(el, "change", () => {
			el.value = castValue(el.value, trim, castToNumber);
		});
		if (!lazy) {
			addEventListener(el, "compositionstart", onCompositionStart);
			addEventListener(el, "compositionend", onCompositionEnd);
			addEventListener(el, "change", onCompositionEnd);
		}
	},
	mounted(el, { value, modifiers: { trim, number } }) {
		const newValue = value == null ? "" : value;
		const initialValue = el[initialValueKey];
		delete el[initialValueKey];
		if (initialValue !== void 0 && (el.type === "text" || el.type === "textarea") && el.value !== initialValue) el[assignKey](castValue(el.value, trim, number));
		else el.value = newValue;
	},
	beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
		el[assignKey] = getModelAssigner(vnode);
		if (el.composing) return;
		const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
		const newValue = value == null ? "" : value;
		if (elValue === newValue) return;
		const rootNode = el.getRootNode();
		if ((rootNode instanceof Document || rootNode instanceof ShadowRoot) && rootNode.activeElement === el && el.type !== "range") {
			if (lazy && value === oldValue) return;
			if (trim && el.value.trim() === newValue) return;
		}
		el.value = newValue;
	}
};
var vModelCheckbox = {
	deep: true,
	created(el, _, vnode) {
		el[assignKey] = getModelAssigner(vnode);
		addEventListener(el, "change", () => {
			const modelValue = el._modelValue;
			const elementValue = getValue(el);
			const checked = el.checked;
			const assign = el[assignKey];
			if (isArray$1(modelValue)) {
				const index = looseIndexOf(modelValue, elementValue);
				const found = index !== -1;
				if (checked && !found) assign(modelValue.concat(elementValue));
				else if (!checked && found) {
					const filtered = [...modelValue];
					filtered.splice(index, 1);
					assign(filtered);
				}
			} else if (isSet(modelValue)) {
				const cloned = new Set(modelValue);
				if (checked) cloned.add(elementValue);
				else cloned.delete(elementValue);
				assign(cloned);
			} else assign(getCheckboxValue(el, checked));
		});
	},
	mounted: setChecked,
	beforeUpdate(el, binding, vnode) {
		el[assignKey] = getModelAssigner(vnode);
		setChecked(el, binding, vnode);
	}
};
function setChecked(el, { value, oldValue }, vnode) {
	el._modelValue = value;
	let checked;
	if (isArray$1(value)) checked = looseIndexOf(value, vnode.props.value) > -1;
	else if (isSet(value)) checked = value.has(vnode.props.value);
	else {
		if (value === oldValue) return;
		checked = looseEqual(value, getCheckboxValue(el, true));
	}
	if (el.checked !== checked) el.checked = checked;
}
var vModelRadio = {
	created(el, { value }, vnode) {
		el.checked = looseEqual(value, vnode.props.value);
		el[assignKey] = getModelAssigner(vnode);
		addEventListener(el, "change", () => {
			el[assignKey](getValue(el));
		});
	},
	beforeUpdate(el, { value, oldValue }, vnode) {
		el[assignKey] = getModelAssigner(vnode);
		if (value !== oldValue) el.checked = looseEqual(value, vnode.props.value);
	}
};
var vModelSelect = {
	deep: true,
	created(el, { value, modifiers: { number } }, vnode) {
		el._modelValue = value;
		addEventListener(el, "change", () => {
			const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map((o) => number ? looseToNumber(getValue(o)) : getValue(o));
			el[assignKey](el.multiple ? isSet(el._modelValue) ? new Set(selectedVal) : selectedVal : selectedVal[0]);
			el._assigning = true;
			nextTick(() => {
				el._assigning = false;
			});
		});
		el[assignKey] = getModelAssigner(vnode);
	},
	mounted(el, { value }) {
		setSelected(el, value);
	},
	beforeUpdate(el, { value }, vnode) {
		el._modelValue = value;
		el[assignKey] = getModelAssigner(vnode);
	},
	updated(el, { value }) {
		if (!el._assigning) setSelected(el, value);
	}
};
function setSelected(el, value) {
	const isMultiple = el.multiple;
	const isArrayValue = isArray$1(value);
	if (isMultiple && !isArrayValue && !isSet(value)) return;
	for (let i = 0, l = el.options.length; i < l; i++) {
		const option = el.options[i];
		const optionValue = getValue(option);
		if (isMultiple) {
			if (isArrayValue) {
				const optionType = typeof optionValue;
				if (optionType === "string" || optionType === "number") option.selected = value.some((v) => String(v) === String(optionValue));
				else option.selected = looseIndexOf(value, optionValue) > -1;
			} else option.selected = value.has(optionValue);
		} else if (looseEqual(getValue(option), value)) {
			if (el.selectedIndex !== i) el.selectedIndex = i;
			return;
		}
	}
	if (!isMultiple && el.selectedIndex !== -1) el.selectedIndex = -1;
}
function getValue(el) {
	return "_value" in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
	const key = checked ? "_trueValue" : "_falseValue";
	return key in el ? el[key] : checked;
}
var vModelDynamic = {
	created(el, binding, vnode) {
		callModelHook(el, binding, vnode, null, "created");
	},
	mounted(el, binding, vnode) {
		callModelHook(el, binding, vnode, null, "mounted");
	},
	beforeUpdate(el, binding, vnode, prevVNode) {
		callModelHook(el, binding, vnode, prevVNode, "beforeUpdate");
	},
	updated(el, binding, vnode, prevVNode) {
		callModelHook(el, binding, vnode, prevVNode, "updated");
	}
};
function resolveDynamicModel(tagName, type) {
	switch (tagName) {
		case "SELECT": return vModelSelect;
		case "TEXTAREA": return vModelText;
		default: switch (type) {
			case "checkbox": return vModelCheckbox;
			case "radio": return vModelRadio;
			default: return vModelText;
		}
	}
}
function callModelHook(el, binding, vnode, prevVNode, hook) {
	const fn = resolveDynamicModel(el.tagName, vnode.props && vnode.props.type)[hook];
	fn && fn(el, binding, vnode, prevVNode);
}
function initVModelForSSR() {
	vModelText.getSSRProps = ({ value }) => ({ value });
	vModelRadio.getSSRProps = ({ value }, vnode) => {
		if (vnode.props && looseEqual(vnode.props.value, value)) return { checked: true };
	};
	vModelCheckbox.getSSRProps = ({ value }, vnode) => {
		if (isArray$1(value)) {
			if (vnode.props && looseIndexOf(value, vnode.props.value) > -1) return { checked: true };
		} else if (isSet(value)) {
			if (vnode.props && value.has(vnode.props.value)) return { checked: true };
		} else if (value) return { checked: true };
	};
	vModelDynamic.getSSRProps = (binding, vnode) => {
		if (typeof vnode.type !== "string") return;
		const modelToUse = resolveDynamicModel(vnode.type.toUpperCase(), vnode.props && vnode.props.type);
		if (modelToUse.getSSRProps) return modelToUse.getSSRProps(binding, vnode);
	};
}
var systemModifiers = [
	"ctrl",
	"shift",
	"alt",
	"meta"
];
var modifierGuards = {
	stop: (e) => e.stopPropagation(),
	prevent: (e) => e.preventDefault(),
	self: (e) => e.target !== e.currentTarget,
	ctrl: (e) => !e.ctrlKey,
	shift: (e) => !e.shiftKey,
	alt: (e) => !e.altKey,
	meta: (e) => !e.metaKey,
	left: (e) => "button" in e && e.button !== 0,
	middle: (e) => "button" in e && e.button !== 1,
	right: (e) => "button" in e && e.button !== 2,
	exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
var withModifiers = (fn, modifiers) => {
	if (!fn) return fn;
	const cache = fn._withMods || (fn._withMods = {});
	const cacheKey = modifiers.join(".");
	return cache[cacheKey] || (cache[cacheKey] = ((event, ...args) => {
		for (let i = 0; i < modifiers.length; i++) {
			const guard = modifierGuards[modifiers[i]];
			if (guard && guard(event, modifiers)) return;
		}
		return fn(event, ...args);
	}));
};
var keyNames = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
};
var withKeys = (fn, modifiers) => {
	const cache = fn._withKeys || (fn._withKeys = {});
	const cacheKey = modifiers.join(".");
	return cache[cacheKey] || (cache[cacheKey] = ((event) => {
		if (!("key" in event)) return;
		const eventKey = hyphenate(event.key);
		if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) return fn(event);
	}));
};
var rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
var renderer;
var enabledHydration = false;
function ensureRenderer() {
	return renderer || (renderer = createRenderer(rendererOptions));
}
function ensureHydrationRenderer() {
	renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
	enabledHydration = true;
	return renderer;
}
var render = ((...args) => {
	ensureRenderer().render(...args);
});
var hydrate = ((...args) => {
	ensureHydrationRenderer().hydrate(...args);
});
var createApp = ((...args) => {
	const app = ensureRenderer().createApp(...args);
	const { mount } = app;
	app.mount = (containerOrSelector) => {
		const container = normalizeContainer(containerOrSelector);
		if (!container) return;
		const component = app._component;
		if (!isFunction$1(component) && !component.render && !component.template) component.template = container.innerHTML;
		if (container.nodeType === 1) container.textContent = "";
		const proxy = mount(container, false, resolveRootNamespace(container));
		if (container instanceof Element) {
			container.removeAttribute("v-cloak");
			container.setAttribute("data-v-app", "");
		}
		return proxy;
	};
	return app;
});
var createSSRApp = ((...args) => {
	const app = ensureHydrationRenderer().createApp(...args);
	const { mount } = app;
	app.mount = (containerOrSelector) => {
		const container = normalizeContainer(containerOrSelector);
		if (container) return mount(container, true, resolveRootNamespace(container));
	};
	return app;
});
function resolveRootNamespace(container) {
	if (container instanceof SVGElement) return "svg";
	if (typeof MathMLElement === "function" && container instanceof MathMLElement) return "mathml";
}
function normalizeContainer(container) {
	if (isString$1(container)) return document.querySelector(container);
	return container;
}
var ssrDirectiveInitialized = false;
var initDirectivesForSSR = () => {
	if (!ssrDirectiveInitialized) {
		ssrDirectiveInitialized = true;
		initVModelForSSR();
		initVShowForSSR();
	}
};
//#endregion
//#region node_modules/vue/dist/vue.runtime.esm-bundler.js
var vue_runtime_esm_bundler_exports = /* @__PURE__ */ __exportAll({
	BaseTransition: () => BaseTransition,
	BaseTransitionPropsValidators: () => BaseTransitionPropsValidators,
	Comment: () => Comment,
	DeprecationTypes: () => null,
	EffectScope: () => EffectScope,
	ErrorCodes: () => ErrorCodes,
	ErrorTypeStrings: () => ErrorTypeStrings,
	Fragment: () => Fragment,
	KeepAlive: () => KeepAlive,
	ReactiveEffect: () => ReactiveEffect,
	Static: () => Static,
	Suspense: () => Suspense,
	Teleport: () => Teleport,
	Text: () => Text,
	TrackOpTypes: () => TrackOpTypes,
	Transition: () => Transition,
	TransitionGroup: () => TransitionGroup,
	TriggerOpTypes: () => TriggerOpTypes,
	VueElement: () => VueElement,
	assertNumber: () => assertNumber,
	callWithAsyncErrorHandling: () => callWithAsyncErrorHandling,
	callWithErrorHandling: () => callWithErrorHandling,
	camelize: () => camelize,
	capitalize: () => capitalize$1,
	cloneVNode: () => cloneVNode,
	compatUtils: () => null,
	compile: () => compile$1,
	computed: () => computed,
	createApp: () => createApp,
	createBlock: () => createBlock,
	createCommentVNode: () => createCommentVNode,
	createElementBlock: () => createElementBlock,
	createElementVNode: () => createBaseVNode,
	createHydrationRenderer: () => createHydrationRenderer,
	createPropsRestProxy: () => createPropsRestProxy,
	createRenderer: () => createRenderer,
	createSSRApp: () => createSSRApp,
	createSlots: () => createSlots,
	createStaticVNode: () => createStaticVNode,
	createTextVNode: () => createTextVNode,
	createVNode: () => createVNode,
	customRef: () => customRef,
	defineAsyncComponent: () => defineAsyncComponent,
	defineComponent: () => defineComponent,
	defineCustomElement: () => defineCustomElement,
	defineEmits: () => defineEmits,
	defineExpose: () => defineExpose,
	defineModel: () => defineModel,
	defineOptions: () => defineOptions,
	defineProps: () => defineProps,
	defineSSRCustomElement: () => defineSSRCustomElement,
	defineSlots: () => defineSlots,
	devtools: () => devtools$1,
	effect: () => effect,
	effectScope: () => effectScope,
	getCurrentInstance: () => getCurrentInstance$1,
	getCurrentScope: () => getCurrentScope,
	getCurrentWatcher: () => getCurrentWatcher,
	getTransitionRawChildren: () => getTransitionRawChildren,
	guardReactiveProps: () => guardReactiveProps,
	h: () => h,
	handleError: () => handleError,
	hasInjectionContext: () => hasInjectionContext,
	hydrate: () => hydrate,
	hydrateOnIdle: () => hydrateOnIdle,
	hydrateOnInteraction: () => hydrateOnInteraction,
	hydrateOnMediaQuery: () => hydrateOnMediaQuery,
	hydrateOnVisible: () => hydrateOnVisible,
	initCustomFormatter: () => initCustomFormatter,
	initDirectivesForSSR: () => initDirectivesForSSR,
	inject: () => inject,
	isMemoSame: () => isMemoSame,
	isProxy: () => isProxy,
	isReactive: () => isReactive,
	isReadonly: () => isReadonly,
	isRef: () => isRef,
	isRuntimeOnly: () => isRuntimeOnly,
	isShallow: () => isShallow,
	isVNode: () => isVNode$1,
	markRaw: () => markRaw,
	mergeDefaults: () => mergeDefaults,
	mergeModels: () => mergeModels,
	mergeProps: () => mergeProps,
	nextTick: () => nextTick,
	nodeOps: () => nodeOps,
	normalizeClass: () => normalizeClass,
	normalizeProps: () => normalizeProps,
	normalizeStyle: () => normalizeStyle,
	onActivated: () => onActivated,
	onBeforeMount: () => onBeforeMount,
	onBeforeUnmount: () => onBeforeUnmount,
	onBeforeUpdate: () => onBeforeUpdate,
	onDeactivated: () => onDeactivated,
	onErrorCaptured: () => onErrorCaptured,
	onMounted: () => onMounted,
	onRenderTracked: () => onRenderTracked,
	onRenderTriggered: () => onRenderTriggered,
	onScopeDispose: () => onScopeDispose,
	onServerPrefetch: () => onServerPrefetch,
	onUnmounted: () => onUnmounted,
	onUpdated: () => onUpdated,
	onWatcherCleanup: () => onWatcherCleanup,
	openBlock: () => openBlock,
	patchProp: () => patchProp,
	popScopeId: () => popScopeId,
	provide: () => provide,
	proxyRefs: () => proxyRefs,
	pushScopeId: () => pushScopeId,
	queuePostFlushCb: () => queuePostFlushCb,
	reactive: () => reactive,
	readonly: () => readonly,
	ref: () => ref,
	registerRuntimeCompiler: () => registerRuntimeCompiler,
	render: () => render,
	renderList: () => renderList,
	renderSlot: () => renderSlot,
	resolveComponent: () => resolveComponent,
	resolveDirective: () => resolveDirective,
	resolveDynamicComponent: () => resolveDynamicComponent,
	resolveFilter: () => null,
	resolveTransitionHooks: () => resolveTransitionHooks,
	setBlockTracking: () => setBlockTracking,
	setDevtoolsHook: () => setDevtoolsHook,
	setTransitionHooks: () => setTransitionHooks,
	shallowReactive: () => shallowReactive,
	shallowReadonly: () => shallowReadonly,
	shallowRef: () => shallowRef,
	ssrContextKey: () => ssrContextKey,
	ssrUtils: () => ssrUtils,
	stop: () => stop,
	toDisplayString: () => toDisplayString$1,
	toHandlerKey: () => toHandlerKey,
	toHandlers: () => toHandlers,
	toRaw: () => toRaw,
	toRef: () => toRef,
	toRefs: () => toRefs,
	toValue: () => toValue,
	transformVNodeArgs: () => transformVNodeArgs,
	triggerRef: () => triggerRef,
	unref: () => unref,
	useAttrs: () => useAttrs,
	useCssModule: () => useCssModule,
	useCssVars: () => useCssVars,
	useHost: () => useHost,
	useId: () => useId,
	useModel: () => useModel,
	useSSRContext: () => useSSRContext,
	useShadowRoot: () => useShadowRoot,
	useSlots: () => useSlots,
	useTemplateRef: () => useTemplateRef,
	useTransitionState: () => useTransitionState,
	vModelCheckbox: () => vModelCheckbox,
	vModelDynamic: () => vModelDynamic,
	vModelRadio: () => vModelRadio,
	vModelSelect: () => vModelSelect,
	vModelText: () => vModelText,
	vShow: () => vShow,
	version: () => version,
	warn: () => warn$1,
	watch: () => watch,
	watchEffect: () => watchEffect,
	watchPostEffect: () => watchPostEffect,
	watchSyncEffect: () => watchSyncEffect,
	withAsyncContext: () => withAsyncContext,
	withCtx: () => withCtx,
	withDefaults: () => withDefaults,
	withDirectives: () => withDirectives,
	withKeys: () => withKeys,
	withMemo: () => withMemo,
	withModifiers: () => withModifiers,
	withScopeId: () => withScopeId
});
/**
* vue v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var compile$1 = () => {};
//#endregion
//#region node_modules/pinia/dist/pinia.js
/*!
* pinia v4.0.2
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
var IS_CLIENT = typeof window !== "undefined";
/**
* setActivePinia must be called to handle SSR at the top of functions like
* `fetch`, `setup`, `serverPrefetch` and others
*/
var activePinia;
/**
* Sets or unsets the active pinia. Used in SSR and internally when calling
* actions and getters
*
* @param pinia - Pinia instance
*/
var setActivePinia = (pinia) => activePinia = pinia;
/**
* Symbol used to provide/inject the pinia instance in the app. Used internally
* and exposed for testing purposes and edge cases like storybook. Could break
* in a minor, **USE AT YOUR OWN RISK**.
*
* For context, see:
* - https://github.com/vuejs/pinia/issues/870
* - https://github.com/vuejs/pinia/pull/2973
*
* @internal
*/
var piniaSymbol = Symbol();
function isPlainObject$1(o) {
	return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var _global = /*#__PURE__*/ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
function bom(blob, { autoBom = false } = {}) {
	if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
	return blob;
}
function download(url, name, opts) {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.responseType = "blob";
	xhr.onload = function() {
		saveAs(xhr.response, name, opts);
	};
	xhr.onerror = function() {
		console.error("could not download file");
	};
	xhr.send();
}
function corsEnabled(url) {
	const xhr = new XMLHttpRequest();
	xhr.open("HEAD", url, false);
	try {
		xhr.send();
	} catch (e) {}
	return xhr.status >= 200 && xhr.status <= 299;
}
function click(node) {
	try {
		node.dispatchEvent(new MouseEvent("click"));
	} catch (e) {
		const evt = new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
			view: window,
			detail: 0,
			screenX: 80,
			screenY: 20,
			clientX: 80,
			clientY: 20,
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			metaKey: false,
			button: 0,
			relatedTarget: null
		});
		node.dispatchEvent(evt);
	}
}
var _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
var isMacOSWebView = /*#__PURE__*/ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
var saveAs = !IS_CLIENT ? () => {} : typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : "msSaveOrOpenBlob" in _navigator ? msSaveAs : fileSaverSaveAs;
function downloadSaveAs(blob, name = "download", opts) {
	const a = document.createElement("a");
	a.download = name;
	a.rel = "noopener";
	if (typeof blob === "string") {
		a.href = blob;
		if (a.origin !== location.origin) if (corsEnabled(a.href)) download(blob, name, opts);
		else {
			a.target = "_blank";
			click(a);
		}
		else click(a);
	} else {
		a.href = URL.createObjectURL(blob);
		setTimeout(function() {
			URL.revokeObjectURL(a.href);
		}, 4e4);
		setTimeout(function() {
			click(a);
		}, 0);
	}
}
function msSaveAs(blob, name = "download", opts) {
	if (typeof blob === "string") if (corsEnabled(blob)) download(blob, name, opts);
	else {
		const a = document.createElement("a");
		a.href = blob;
		a.target = "_blank";
		setTimeout(function() {
			click(a);
		});
	}
	else navigator.msSaveOrOpenBlob(bom(blob, opts), name);
}
function fileSaverSaveAs(blob, name, opts, popup) {
	popup = popup || open("", "_blank");
	if (popup) popup.document.title = popup.document.body.innerText = "downloading...";
	if (typeof blob === "string") return download(blob, name, opts);
	const force = blob.type === "application/octet-stream";
	const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
	const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
	if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
		const reader = new FileReader();
		reader.onloadend = function() {
			let url = reader.result;
			if (typeof url !== "string") {
				popup = null;
				throw new Error("Wrong reader.result type");
			}
			url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
			if (popup) popup.location.href = url;
			else location.assign(url);
			popup = null;
		};
		reader.readAsDataURL(blob);
	} else {
		const url = URL.createObjectURL(blob);
		if (popup) popup.location.assign(url);
		else location.href = url;
		popup = null;
		setTimeout(function() {
			URL.revokeObjectURL(url);
		}, 4e4);
	}
}
var { assign: assign$1 } = Object;
/**
* Creates a Pinia instance to be used by the application
*/
function createPinia() {
	const scope = effectScope(true);
	const state = scope.run(() => ref({}));
	let _p = [];
	let toBeInstalled = [];
	const pinia = markRaw({
		install(app) {
			setActivePinia(pinia);
			pinia._a = app;
			app.provide(piniaSymbol, pinia);
			app.config.globalProperties.$pinia = pinia;
			toBeInstalled.forEach((plugin) => _p.push(plugin));
			toBeInstalled = [];
		},
		use(plugin) {
			if (!this._a) toBeInstalled.push(plugin);
			else _p.push(plugin);
			return this;
		},
		_p,
		_a: null,
		_e: scope,
		_s: /* @__PURE__ */ new Map(),
		state
	});
	return pinia;
}
var noop = () => {};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
	subscriptions.add(callback);
	const removeSubscription = () => {
		subscriptions.delete(callback) && onCleanup();
	};
	if (!detached && getCurrentScope()) onScopeDispose(removeSubscription);
	return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
	subscriptions.forEach((callback) => {
		callback(...args);
	});
}
var fallbackRunWithContext = (fn) => fn();
/**
* Marks a function as an action for `$onAction`
* @internal
*/
var ACTION_MARKER = Symbol();
/**
* Action name symbol. Allows to add a name to an action after defining it
* @internal
*/
var ACTION_NAME = Symbol();
function mergeReactiveObjects(target, patchToApply) {
	if (target instanceof Map && patchToApply instanceof Map) patchToApply.forEach((value, key) => target.set(key, value));
	else if (target instanceof Set && patchToApply instanceof Set) patchToApply.forEach(target.add, target);
	for (const key in patchToApply) {
		if (!Object.hasOwn(patchToApply, key)) continue;
		const subPatch = patchToApply[key];
		const targetValue = target[key];
		if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && Object.hasOwn(target, key) && !isRef(subPatch) && !isReactive(subPatch)) target[key] = mergeReactiveObjects(targetValue, subPatch);
		else target[key] = subPatch;
	}
	return target;
}
var skipHydrateSymbol = Symbol();
/**
* Returns whether a value should be hydrated
*
* @param obj - target variable
* @returns true if `obj` should be hydrated
*/
function shouldHydrate(obj) {
	return !obj || typeof obj !== "object" || !Object.hasOwn(obj, skipHydrateSymbol);
}
var { assign: assign$2 } = Object;
function isComputed(o) {
	return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
	const { state, actions, getters } = options;
	const initialState = pinia.state.value[id];
	let store;
	function setup() {
		if (!initialState && true)
 /* istanbul ignore if */
		pinia.state.value[id] = state ? state() : {};
		return assign$2(toRefs(pinia.state.value[id]), actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
			computedGetters[name] = markRaw(computed(() => {
				setActivePinia(pinia);
				const store = pinia._s.get(id);
				return getters[name].call(store, store);
			}));
			return computedGetters;
		}, {}));
	}
	store = createSetupStore(id, setup, options, pinia, hot, true);
	return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
	let scope;
	const optionsForPlugin = assign$2({ actions: {} }, options);
	const $subscribeOptions = { deep: true };
	let isListening;
	let isSyncListening;
	let subscriptions = /* @__PURE__ */ new Set();
	let actionSubscriptions = /* @__PURE__ */ new Set();
	let debuggerEvents;
	const initialState = pinia.state.value[$id];
	if (!isOptionsStore && !initialState && true)
 /* istanbul ignore if */
	pinia.state.value[$id] = {};
	let activeListener;
	function $patch(partialStateOrMutator) {
		let subscriptionMutation;
		isListening = isSyncListening = false;
		if (typeof partialStateOrMutator === "function") {
			partialStateOrMutator(pinia.state.value[$id]);
			subscriptionMutation = {
				type: "patch function",
				storeId: $id,
				events: debuggerEvents
			};
		} else {
			mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
			subscriptionMutation = {
				type: "patch object",
				payload: partialStateOrMutator,
				storeId: $id,
				events: debuggerEvents
			};
		}
		const myListenerId = activeListener = Symbol();
		nextTick().then(() => {
			if (activeListener === myListenerId) isListening = true;
		});
		isSyncListening = true;
		triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
	}
	const $reset = isOptionsStore ? function $reset() {
		const { state } = options;
		const newState = state ? state() : {};
		this.$patch(($state) => {
			assign$2($state, newState);
		});
	} : noop;
	function $dispose() {
		scope.stop();
		subscriptions.clear();
		actionSubscriptions.clear();
		pinia._s.delete($id);
	}
	/**
	* Helper that wraps function so it can be tracked with $onAction
	* @param fn - action to wrap
	* @param name - name of the action
	*/
	const action = (fn, name = "") => {
		if (ACTION_MARKER in fn) {
			fn[ACTION_NAME] = name;
			return fn;
		}
		const wrappedAction = function() {
			setActivePinia(pinia);
			const args = Array.from(arguments);
			const afterCallbackSet = /* @__PURE__ */ new Set();
			const onErrorCallbackSet = /* @__PURE__ */ new Set();
			function after(callback) {
				afterCallbackSet.add(callback);
			}
			function onError(callback) {
				onErrorCallbackSet.add(callback);
			}
			triggerSubscriptions(actionSubscriptions, {
				args,
				name: wrappedAction[ACTION_NAME],
				store,
				after,
				onError
			});
			let ret;
			try {
				ret = fn.apply(this && this.$id === $id ? this : store, args);
			} catch (error) {
				triggerSubscriptions(onErrorCallbackSet, error);
				throw error;
			}
			if (ret instanceof Promise) return ret.then((value) => {
				triggerSubscriptions(afterCallbackSet, value);
				return value;
			}).catch((error) => {
				triggerSubscriptions(onErrorCallbackSet, error);
				return Promise.reject(error);
			});
			triggerSubscriptions(afterCallbackSet, ret);
			return ret;
		};
		wrappedAction[ACTION_MARKER] = true;
		wrappedAction[ACTION_NAME] = name;
		return wrappedAction;
	};
	const partialStore = {
		_p: pinia,
		$id,
		$onAction: addSubscription.bind(null, actionSubscriptions),
		$patch,
		$reset,
		$subscribe(callback, options = {}) {
			if (subscriptions.has(callback)) return noop;
			const removeSubscription = addSubscription(subscriptions, callback, options.detached, () => stopWatcher());
			const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
				if (options.flush === "sync" ? isSyncListening : isListening) callback({
					storeId: $id,
					type: "direct",
					events: debuggerEvents
				}, state);
			}, assign$2({}, $subscribeOptions, options)));
			return removeSubscription;
		},
		$dispose
	};
	const store = reactive(partialStore);
	pinia._s.set($id, store);
	const setupStore = (pinia._a && pinia._a.runWithContext || fallbackRunWithContext)(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
	for (const key in setupStore) {
		const prop = setupStore[key];
		if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
			if (!isOptionsStore) {
				if (initialState && shouldHydrate(prop)) if (isRef(prop)) prop.value = initialState[key];
				else mergeReactiveObjects(prop, initialState[key]);
				pinia.state.value[$id][key] = prop;
			}
		} else if (typeof prop === "function") {
			setupStore[key] = action(prop, key);
			optionsForPlugin.actions[key] = prop;
		}
	}
	/* istanbul ignore if */
	assign$2(store, setupStore);
	assign$2(toRaw(store), setupStore);
	Object.defineProperty(store, "$state", {
		get: () => pinia.state.value[$id],
		set: (state) => {
			$patch(($state) => {
				assign$2($state, state);
			});
		}
	});
	pinia._p.forEach((extender) => {
		const extensions = scope.run(() => extender({
			store,
			app: pinia._a,
			pinia,
			options: optionsForPlugin
		}));
		assign$2(store, extensions);
	});
	if (initialState && isOptionsStore && options.hydrate) options.hydrate(store.$state, initialState);
	isListening = true;
	isSyncListening = true;
	return store;
}
/*! #__NO_SIDE_EFFECTS__ */
function defineStore(id, setup, setupOptions) {
	let options;
	const isSetupStore = typeof setup === "function";
	options = isSetupStore ? setupOptions : setup;
	function useStore(pinia, hot) {
		const hasContext = hasInjectionContext();
		pinia = pinia || (hasContext ? inject(piniaSymbol, null) : null);
		if (pinia) setActivePinia(pinia);
		pinia = activePinia;
		if (!pinia._s.has(id)) {
			if (isSetupStore) createSetupStore(id, setup, options, pinia);
			else createOptionsStore(id, options, pinia);
		}
		return pinia._s.get(id);
	}
	useStore.$id = id;
	return useStore;
}
/**
* Creates an object of references with all the state, getters, and plugin-added
* state properties of the store. Similar to `toRefs()` but specifically
* designed for Pinia stores so methods and non reactive properties are
* completely ignored.
*
* @param store - store to extract the refs from
*/
function storeToRefs(store) {
	const rawStore = toRaw(store);
	const refs = {};
	for (const key in rawStore) {
		const value = rawStore[key];
		if (value?.effect) refs[key] = computed({
			get: () => store[key],
			set(value) {
				store[key] = value;
			}
		});
		else if (isRef(value) || isReactive(value)) refs[key] = toRef(store, key);
	}
	return refs;
}
//#endregion
//#region src/composables/useTheme.ts
function useTheme() {
	const { data: colorSchema } = useBrowserLocalStorage("mode", "dark", false);
	const isDark = computed(() => colorSchema.value === "dark");
	document.body.setAttribute("data-theme", colorSchema.value);
	watch(colorSchema, (newValue) => {
		document.body.setAttribute("data-theme", newValue);
	});
	const toggleDark = () => {
		colorSchema.value = colorSchema.value === "dark" ? "light" : "dark";
	};
	return {
		isDark,
		toggleDark
	};
}
//#endregion
//#region virtual:@intlify/unplugin-vue-i18n/messages
var isObject$1 = (item) => item && typeof item === "object" && !Array.isArray(item);
var mergeDeep = (target, ...sources) => {
	if (!sources.length) return target;
	const source = sources.shift();
	if (isObject$1(target) && isObject$1(source)) for (const key in source) if (isObject$1(source[key])) {
		if (!target[key]) Object.assign(target, { [key]: {} });
		mergeDeep(target[key], source[key]);
	} else Object.assign(target, { [key]: source[key] });
	return mergeDeep(target, ...sources);
};
var messages_default = mergeDeep({}, { "de": {
	"extensionName": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced: Netflix Disney+ Prime Video"
		}
	},
	"extensionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Werbung, Intros, Rückblicke, Abspanne usw. auf Netflix, Prime video, Disney+, Crunchyroll und HBO max überspringen."
		}
	},
	"settingsTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Einstellungen - Streaming enhanced"
		}
	},
	"pageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced"
		}
	},
	"rateNow": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Jetzt bewerten!"
		}
	},
	"sharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Gemeinsame Einstellungen"
		}
	},
	"sharedSettingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Mit diesen Optionen wird nur der "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": "-Teil der gemeinsamen Einstellung aktiviert/deaktiviert"
				}
			]
		}
	},
	"backup": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sichern"
		}
	},
	"statistics": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Statistik"
		}
	},
	"changelog": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Changelog"
		}
	},
	"donate": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Spende"
		}
	},
	"pageSpecificTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " spezifisch"
			}]
		}
	},
	"defaultfilterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Entfernen aller kostenpflichtigen Filme/Serien Kategorien von Amazon Prime"
		}
	},
	"sharedPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Gemeinsame Videofunktionen"
		}
	},
	"sharedPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Diese Optionen aktivieren/deaktivieren die Einstellungen für alle Streaming-Dienste. In der folgenden Tabelle können Sie die gemeinsamen Einstellungen für einen bestimmten Dienst deaktivieren."
		}
	},
	"skipIntroSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Intros überspringen:"
		}
	},
	"skipIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Überspringen Sie die Intros aller Serien, mit Ausnahme der ersten Folge einer jeden Serie."
		}
	},
	"skipCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Abspann überspringen:"
		}
	},
	"skipCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Springt so schnell wie möglich zur nächsten Episode jeder Serie"
		}
	},
	"skipAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Werbung überspringen:"
		}
	},
	"skipAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Überspringen der Freevee-Werbung für Amazon und Werbung in der Netflix-Basisstufe"
		}
	},
	"speedSliderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Geschwindigkeitsregler:"
		}
	},
	"speedSliderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Geschwindigkeitsregler hinzufügen."
		}
	},
	"sliderOptions": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slider-Optionen: Geschwindigkeit = Schrittgröße /10"
		}
	},
	"sliderStepSize": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slider Schrittgröße:"
		}
	},
	"sliderMin": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slider minimum:"
		}
	},
	"sliderMax": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slider maximum:"
		}
	},
	"sliderPreview": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slider Vorschau:"
		}
	},
	"playOnFullScreenSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Im Vollbildmodus abspielen:"
		}
	},
	"playOnFullScreenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wenn ein Video auf Vollbild umgeschaltet wird, wird das Video automatisch abgespielt"
		}
	},
	"selfAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Eigenwerbung überspringen:"
		}
	},
	"selfAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Überspringen der Prime-Show-Vorschauen, die vor jedem Video angezeigt werden"
		}
	},
	"filterPaidSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Bezahlte Inhalte entfernen:"
		}
	},
	"filterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Entfernen aller bezahlten Serien/Filmkategorien"
		}
	},
	"continuePositionSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Kategorie \"Fortsetzen\" verschieben:"
		}
	},
	"continuePositionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Kategorie \"Fortsetzen\" an den Seitenanfang verschieben"
		}
	},
	"freeveeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Freevee-Werbungen überspringen:"
		}
	},
	"skipRecapSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rückblicke überspringen:"
		}
	},
	"skipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Überspringt Rückblicke jeder Sendung"
		}
	},
	"skipBlockedSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Inaktivitätswarnung blocken:"
		}
	},
	"skipBlockedDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Setzt das Video fort, wenn die Aufforderung 'Sehen Sie noch zu' angezeigt wird"
		}
	},
	"profileSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Automatisch das letztes Profil auswählen:"
		}
	},
	"profileDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Das zuletzt verwendete Profil wird direkt beim Start der Seite ausgewählt"
		}
	},
	"user": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Benutzer:"
		}
	},
	"statisticPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Statistik"
		}
	},
	"skippedTime": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Übersprungene Zeit:"
		}
	},
	"amazonAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zeit der übersprungenen FreeVee Werbung + Prime Video Eigenwerbung"
		}
	},
	"statisticAd": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " Werbung:"
			}]
		}
	},
	"netflixAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zeit der übersprungenen Netflix-Werbung"
		}
	},
	"statisticIntro": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Intro:"
		}
	},
	"statisticIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zeit der übersprungenen Intros auf Netflix, Amazon und Disney+"
		}
	},
	"statisticRecap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rückblicke:"
		}
	},
	"statisticskipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zeit der übersprungenen Rückblicke auf Netflix, Amazon und Disney+"
		}
	},
	"statisticSegments": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Übersprungene Segmente:"
		}
	},
	"statisticSegmentsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Anzahl der übersprungenen einzelnen Segmente wie ein Intro oder eine Werbung für Netflix, Amazon und Disney+"
		}
	},
	"importSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alle Einstellungen importieren/exportieren"
		}
	},
	"saveSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Einstellungen als Datei speichern"
		}
	},
	"uploadSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Einstellungen hochladen:"
		}
	},
	"resetAddon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Addon auf Standard zurücksetzen"
		}
	},
	"noWrap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "unset"
		}
	},
	"watchCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Immer Abspann ansehen:"
		}
	},
	"watchCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sich immer den Abspann jeder Serie ansehen"
		}
	},
	"conflictingTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alle widersprüchlichen Funktionen"
		}
	},
	"showRatingSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "TMDB Bewertung:"
		}
	},
	"showRatingDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zeigt die TMDB Bewertung für jeden Film/Serie an"
		}
	},
	"releaseCalendarSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Release-Kalender Optionen hinzufügen:"
		}
	},
	"releaseCalendarDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Fügt dem Veröffentlichungskalender die Kontrollkästchen 'Nur Playlists anzeigen' und 'DUB filtern' hinzu"
		}
	},
	"epilepsySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Epilepsy option"
		}
	},
	"epilepsyDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Beim überspringen der Werbung den Bildschirm verdunkeln"
		}
	},
	"userAgentSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zu Desktop-Webseiten wechseln"
		}
	},
	"userAgentDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Für prime video und disney+ auf die Desktop-Website wechseln und für amazon die Website mobilfreundlich machen"
		}
	},
	"xraySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Xray ausblenden:"
		}
	},
	"xrayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ausblenden der Xray-Schnellansicht über einem video"
		}
	},
	"feature": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Funktion"
		}
	},
	"shared": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alle"
		}
	},
	"openSharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Gemeinsame Einstellungen öffnen"
		}
	},
	"autoOpenSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Öffnen Sie automatisch die richtigen Einstellungen:"
		}
	},
	"autoOpenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wenn auf der Streaming-Seite öffnet sich die entsprechenden Einstellungen im popup automatisch"
		}
	},
	"duplicateSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Entfernt doppelte Shows:"
		}
	},
	"duplicateDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Entfernt jede doppelte Show, die bereits vorher auf Disney sichtbar war. Sichtbar bedeutet, dass die Show unter den ersten 5 Shows in jeder Reihe war"
		}
	},
	"watchSkippedButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zurückspulen?"
		}
	},
	"homeButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Startseite"
		}
	},
	"bigPlayerSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Video vergrößern:"
		}
	},
	"bigPlayerDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Erweitert die größe des Videos zum gesamten Browserfenster ohne Vollbild."
		}
	},
	"doubleClickSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vollbildmodus mit Doppelklick:"
		}
	},
	"doubleClickDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wenn Sie auf das Video doppelklicken, wird es im Vollbildmodus angezeigt."
		}
	},
	"scrollVolumeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Scrollen für Lautstärke:"
		}
	},
	"scrollVolumeDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wenn Sie auf dem Tonsymbol nach oben oder unten scrollen, wird die Lautstärke geändert."
		}
	},
	"disneyAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zeit der übersprungenen Disney-Werbung."
		}
	},
	"showYearSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Erscheinungsjahr anzeigen:"
		}
	},
	"showYearDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zeigt das Erscheinungsjahr neben der Bewertung an."
		}
	},
	"installPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "🎉 Installiert! 🚀"
		}
	},
	"installThanks": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vielen Dank für die Installation von Streaming Enhanced! ❤️"
		}
	},
	"installTurnOnOptional": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alle optionalen Funktionen einschalten:"
		}
	},
	"tabsPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "die für das automatische Öffnen der richtigen Einstellungen erforderlich sind"
		}
	},
	"missingPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Fehlende Berechtigungen erkannt"
		}
	},
	"addPermissionButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "hinzufügen"
		}
	},
	"removeGamesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Spiele entfernen:"
		}
	},
	"removeGamesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Entfernt alle Spiele von der Seite."
		}
	},
	"hideTitlesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Film ausblenden button"
		}
	},
	"hideTitlesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Automatisches Ausblenden von Sendungen, die vom Benutzer manuell ausgeblendet wurden."
		}
	},
	"hiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Versteckte Titel:"
		}
	},
	"removeAllHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alle ausgeblendeten Titel entfernen"
		}
	},
	"crunchyrollDelay": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Überspringungsverzögerung in ms:"
		}
	},
	"crunchyrollDelayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Einige Sprachen brauchen länger als andere. Mit dieser Einstellung können Sie das Intro und den Abspann mit einer Verzögerung überspringen, so dass bei einigen Synchronisationen die Sprache nicht abgeschnitten wird."
		}
	},
	"switchLanguage": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sprache wechseln:"
		}
	},
	"resetConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sie möchten die Einstellungen zurücksetzen.\n\nSind Sie sicher, dass Sie das tun wollen?"
		}
	},
	"invalidJson": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Die von Ihnen hochgeladene Datei ist keine gültige JSON-Datei."
		}
	},
	"improveUISwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Verbessern der Video-UI"
		}
	},
	"improveUIDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Die Benutzeroberfläche des Video-Players wurde auf verschiedene Weise verbessert."
		}
	},
	"skipAfterCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zur nächsten Episode springen:"
		}
	},
	"skipAfterCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Überspringen Sie automatisch die Nachspannszene und springen Sie direkt zur nächsten Folge."
		}
	},
	"editRatings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Bearbeiten Sie Bewertungsschwellen und Farben:"
		}
	},
	"pickColor": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Farbe auswählen"
		}
	},
	"pickRating": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pick-Rating-Schwelle"
		}
	},
	"reset": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zurücksetzen"
		}
	},
	"dimLowRatingsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dimm Low Ratings"
		}
	},
	"dimLowRatingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dimm-Shows mit der niedrigsten Bewertung."
		}
	},
	"primeVideo": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Prime Video"
		}
	},
	"disabledSettingsOverviewTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Übersicht der deaktivierten Einstellungen"
		}
	},
	"disabledSettingsOverviewDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " Einstellungen in "
				},
				{
					"t": 5,
					"i": 1
				},
				{
					"t": 3,
					"v": " Kategorien deaktiviert."
				}
			]
		}
	},
	"hideHeaderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Kopfzeile im Player ausblenden"
		}
	},
	"hideHeaderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Blendet auch die Kopfzeile der Website im Videoplayer aus."
		}
	},
	"hiddenTitlesNav": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Versteckte Titel"
		}
	},
	"hiddenTitlesPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Versteckte Titel"
		}
	},
	"hiddenTitlesPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Verwalten Sie die Titel, deren Anzeige Sie in den Suchergebnissen bei Netflix, Prime Video und Disney+ ausgeblendet haben."
		}
	},
	"searchPlaceholder": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Titel suchen..."
		}
	},
	"platformFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Plattform"
		}
	},
	"mediaTypeFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Typ"
		}
	},
	"allPlatforms": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alle Plattformen"
		}
	},
	"allTypes": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alle Typen"
		}
	},
	"unknownPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Unbekannt"
		}
	},
	"sortDateAdded": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Datum der Aufnahme"
		}
	},
	"sortTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Titel"
		}
	},
	"sortPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Plattform"
		}
	},
	"viewIcon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Symbolansicht"
		}
	},
	"viewList": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Detailansicht"
		}
	},
	"selectAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alles auswählen"
		}
	},
	"unhide": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zeigen"
		}
	},
	"unhideSelected": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Ausgewählte anzeigen ("
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ")"
				}
			]
		}
	},
	"unhideAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alle anzeigen"
		}
	},
	"unhideAllConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alle Titel auf allen Plattformen anzeigen? Dieser Vorgang kann nicht rückgängig gemacht werden."
		}
	},
	"noHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Bisher gibt es noch keine versteckten Titel."
		}
	},
	"movieType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Film"
		}
	},
	"tvType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Fernsehserie"
		}
	}
} }, { "en": {
	"extensionName": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced: Netflix Disney+ Prime Video"
		}
	},
	"extensionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip ads, intros, credits and add adjust speed, etc. on Netflix, Prime video, Disney+, Crunchyroll and HBO max."
		}
	},
	"settingsTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Settings - Streaming enhanced"
		}
	},
	"pageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced"
		}
	},
	"rateNow": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rate now!"
		}
	},
	"sharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Shared Settings"
		}
	},
	"sharedSettingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "These options will only enable/disable the "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " part of the shared setting"
				}
			]
		}
	},
	"backup": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Backup"
		}
	},
	"statistics": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Statistics"
		}
	},
	"changelog": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Changelog"
		}
	},
	"hiddenTitlesNav": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hidden Titles"
		}
	},
	"hiddenTitlesPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hidden Titles"
		}
	},
	"hiddenTitlesPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Manage the titles you've hidden from showing up in browse rows, across Netflix, Prime Video and Disney+."
		}
	},
	"searchPlaceholder": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Search titles..."
		}
	},
	"platformFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Platform"
		}
	},
	"mediaTypeFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Type"
		}
	},
	"allPlatforms": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "All platforms"
		}
	},
	"allTypes": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "All types"
		}
	},
	"unknownPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Unknown"
		}
	},
	"sortDateAdded": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Date added"
		}
	},
	"sortTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Title"
		}
	},
	"sortPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Platform"
		}
	},
	"viewIcon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Icon view"
		}
	},
	"viewList": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Detail view"
		}
	},
	"selectAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Select all"
		}
	},
	"unhide": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Show"
		}
	},
	"unhideSelected": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Show selected ("
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ")"
				}
			]
		}
	},
	"unhideAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Show all"
		}
	},
	"unhideAllConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Show every title on every platform? This cannot be undone."
		}
	},
	"noHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "No hidden titles yet."
		}
	},
	"movieType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Movie"
		}
	},
	"tvType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "TV Show"
		}
	},
	"donate": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Donate"
		}
	},
	"pageSpecificTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " specific"
			}]
		}
	},
	"defaultfilterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Removing every paid movie/series category from Amazon prime"
		}
	},
	"sharedPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Shared Video features"
		}
	},
	"sharedPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "These options will only enable/disable the settings for all streaming services. In the below table you can disable the shared settings for a specific service"
		}
	},
	"skipIntroSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip Intro:"
		}
	},
	"skipIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip intros for all series, except the first episode of each series."
		}
	},
	"skipCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip Credits:"
		}
	},
	"skipCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skipping to the next episode of every series as fast as possible"
		}
	},
	"skipAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip Ads:"
		}
	},
	"skipAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skipping freevee ads for amazon and all of the ads in the basic Netflix tier"
		}
	},
	"speedSliderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Add Speed control:"
		}
	},
	"speedSliderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adding a speed adjustment slider"
		}
	},
	"sliderOptions": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slider options: speed = stepsize /10"
		}
	},
	"sliderStepSize": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slider stepsize:"
		}
	},
	"sliderMin": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slider minimum:"
		}
	},
	"sliderMax": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slider maximum:"
		}
	},
	"sliderPreview": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slider preview:"
		}
	},
	"playOnFullScreenSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Play on fullscreen:"
		}
	},
	"playOnFullScreenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "If a video is put on fullscreen, the video will play automatically"
		}
	},
	"selfAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip Self Ads:"
		}
	},
	"selfAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skipping the prime show previews which are shown before any video"
		}
	},
	"filterPaidSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remove paid content:"
		}
	},
	"filterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Removing every paid movie/series category"
		}
	},
	"continuePositionSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Move category \"Continue\":"
		}
	},
	"continuePositionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Move category \"Continue\" to the top of the page"
		}
	},
	"freeveeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip Freevee Ads:"
		}
	},
	"skipRecapSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip Recaps:"
		}
	},
	"skipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skips recapitulations of every show"
		}
	},
	"skipBlockedSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Resume inactivity warning:"
		}
	},
	"skipBlockedDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Resumes the video if the 'Are you still watching' prompt is shown"
		}
	},
	"profileSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Auto pick last profile:"
		}
	},
	"profileDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "The last used profile is directly chosen when the page is launched"
		}
	},
	"user": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "User:"
		}
	},
	"statisticPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Statistics"
		}
	},
	"skippedTime": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skipped time:"
		}
	},
	"amazonAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Time of skipped FreeVee Ads + Prime Video Self Ads"
		}
	},
	"statisticAd": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " Ad:"
			}]
		}
	},
	"netflixAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Time of skipped Netflix Ads"
		}
	},
	"statisticIntro": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Intro:"
		}
	},
	"statisticIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Time of skipped Intros on Netflix, Amazon and Disney+"
		}
	},
	"statisticRecap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Recap:"
		}
	},
	"statisticskipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Time of skipped Recaps on Netflix, Amazon and Disney+"
		}
	},
	"statisticSegments": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Segments Skipped:"
		}
	},
	"statisticSegmentsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Amount of Individual Segments Skipped like an Intro or an Ad for Netflix, Amazon and Disney+"
		}
	},
	"importSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Import/Export all Settings"
		}
	},
	"saveSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Save Settings as file"
		}
	},
	"uploadSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Upload settings:"
		}
	},
	"resetAddon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Reset addon to default"
		}
	},
	"noWrap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "nowrap"
		}
	},
	"watchCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Always watch credits:"
		}
	},
	"watchCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Always watch the credits of every series"
		}
	},
	"conflictingTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "All conflicting Features"
		}
	},
	"showRatingSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "TMDB Rating:"
		}
	},
	"showRatingDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adding the TMDB rating to every movie and series"
		}
	},
	"releaseCalendarSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Add Release Calendar options:"
		}
	},
	"releaseCalendarDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adds the checkboxes 'Show Playlists only' and 'Filter DUB' to the release calendar"
		}
	},
	"epilepsySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Epilepsy option"
		}
	},
	"epilepsyDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Darken the screen when skipping the ad"
		}
	},
	"userAgentSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Switch to desktop websites"
		}
	},
	"userAgentDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "For prime video and disney+ change to the Desktop website and for amazon make the site mobile friendly"
		}
	},
	"xraySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hide Xray:"
		}
	},
	"xrayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hide the Xray Quick View over a video"
		}
	},
	"feature": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Feature"
		}
	},
	"shared": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "All"
		}
	},
	"openSharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Open Shared Settings"
		}
	},
	"autoOpenSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Automatically open correct Settings:"
		}
	},
	"autoOpenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "If on streaming site open the according settings in popup automatically"
		}
	},
	"duplicateSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remove duplicate Shows:"
		}
	},
	"duplicateDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remove every duplicate show, which was already visible on Disney before. Visible means that the show is in the first 5 shows in every row"
		}
	},
	"watchSkippedButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rewind?"
		}
	},
	"homeButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Home"
		}
	},
	"bigPlayerSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Video bigger:"
		}
	},
	"bigPlayerDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Extends the video size to the entire browser window without full screen."
		}
	},
	"doubleClickSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Fullscreen by double clicking:"
		}
	},
	"doubleClickDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "If you double click on the video it will go to fullscreen."
		}
	},
	"scrollVolumeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Scroll for volume:"
		}
	},
	"scrollVolumeDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Scrolling up or down on the Sound Icon will change the volume."
		}
	},
	"disneyAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Time of skipped Disney Ads."
		}
	},
	"showYearSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Show release year:"
		}
	},
	"showYearDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Shows the release year next to the rating."
		}
	},
	"installPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "🎉 Installed! 🚀"
		}
	},
	"installThanks": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Thank you for installing Streaming enhanced! ❤️"
		}
	},
	"installTurnOnOptional": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Turn on all optional features:"
		}
	},
	"tabsPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "necessary for the automatic opening of the correct settings"
		}
	},
	"missingPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Missing permissions detected"
		}
	},
	"addPermissionButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Add"
		}
	},
	"removeGamesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remove Games:"
		}
	},
	"removeGamesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Removes all games from the page."
		}
	},
	"hideTitlesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hide Movie button"
		}
	},
	"hideTitlesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Automatically hide shows, which were hidden by the user manually."
		}
	},
	"hiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hidden Titles:"
		}
	},
	"removeAllHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remove all hidden titles"
		}
	},
	"crunchyrollDelay": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip delay in ms:"
		}
	},
	"crunchyrollDelayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Some languages take longer than others. This setting allows you to skip the intro and credits with a delay such that in some dubs the speech is not cut off."
		}
	},
	"switchLanguage": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Switch Language:"
		}
	},
	"resetConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "You want to reset the Settings.\n\nAre you sure you want to do this?"
		}
	},
	"invalidJson": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "The file you uploaded is not a valid JSON file."
		}
	},
	"improveUISwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Improve Video UI"
		}
	},
	"improveUIDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Enhanced Video Player UI in various ways."
		}
	},
	"skipAfterCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip to next episode:"
		}
	},
	"skipAfterCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Automatically skip the after credits scene and go directly to the next episode."
		}
	},
	"editRatings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Edit Rating thresholds and colors:"
		}
	},
	"pickColor": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pick color"
		}
	},
	"pickRating": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pick Rating threshold"
		}
	},
	"reset": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Reset"
		}
	},
	"dimLowRatingsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dimm Low Ratings"
		}
	},
	"dimLowRatingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dimm Shows with the lowest Rating."
		}
	},
	"primeVideo": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Prime Video"
		}
	},
	"disabledSettingsOverviewTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Disabled settings overview"
		}
	},
	"disabledSettingsOverviewDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " settings disabled in "
				},
				{
					"t": 5,
					"i": 1
				},
				{
					"t": 3,
					"v": " categories."
				}
			]
		}
	},
	"hideHeaderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hide Header on Player"
		}
	},
	"hideHeaderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Also hides the Website header on the video player."
		}
	}
} }, { "es": {
	"extensionName": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced: Netflix Disney+ Prime Video"
		}
	},
	"extensionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Omite anuncios, intros, créditos y añade ajustar velocidad, etc. en Netflix, Prime video, Disney+, Crunchyroll y HBO max."
		}
	},
	"settingsTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ajustes - Streaming enhanced"
		}
	},
	"pageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced"
		}
	},
	"rateNow": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "¡Califique ahora!"
		}
	},
	"sharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ajustes compartidos"
		}
	},
	"sharedSettingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Estas opciones sólo activarán/desactivarán la parte "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " de la configuración compartida"
				}
			]
		}
	},
	"backup": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Copia de seguridad"
		}
	},
	"statistics": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Estadísticas"
		}
	},
	"changelog": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Registro de cambios"
		}
	},
	"donate": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Donar"
		}
	},
	"pageSpecificTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " específico"
			}]
		}
	},
	"defaultfilterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Eliminación de todas las categorías de películas/series de pago de Amazon prime"
		}
	},
	"sharedPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Funciones de vídeo compartido"
		}
	},
	"sharedPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Estas opciones sólo activarán/desactivarán los ajustes para todos los servicios de streaming. En la siguiente tabla puede desactivar los ajustes compartidos para un servicio específico"
		}
	},
	"skipIntroSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip Intro:"
		}
	},
	"skipIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Omite las intros de todas las series, excepto la del primer episodio de cada serie."
		}
	},
	"skipCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar créditos:"
		}
	},
	"skipCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar al siguiente episodio de cada serie lo más rápido posible"
		}
	},
	"skipAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar anuncios:"
		}
	},
	"skipAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar los anuncios de freevee para amazon y todos los anuncios en el nivel básico de Netflix"
		}
	},
	"speedSliderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Añadir control de velocidad:"
		}
	},
	"speedSliderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Añadir un control deslizante de ajuste de la velocidad"
		}
	},
	"sliderOptions": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Opciones del control deslizante: velocidad = tamaño del paso /10"
		}
	},
	"sliderStepSize": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tamaño de paso del deslizador:"
		}
	},
	"sliderMin": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Deslizador mínimo:"
		}
	},
	"sliderMax": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Deslizador máximo:"
		}
	},
	"sliderPreview": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vista previa del deslizador:"
		}
	},
	"playOnFullScreenSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Juega a pantalla completa:"
		}
	},
	"playOnFullScreenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Si un vídeo se pone en pantalla completa, se reproducirá automáticamente"
		}
	},
	"selfAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar anuncios propios:"
		}
	},
	"selfAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar los avances de los programas de máxima audiencia que se muestran antes de cualquier vídeo"
		}
	},
	"filterPaidSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Elimine los contenidos de pago:"
		}
	},
	"filterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Eliminación de todas las categorías de películas/series de pago"
		}
	},
	"continuePositionSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mover categoría \"Continuar\":"
		}
	},
	"continuePositionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mover la categoría \"Continuar\" a la parte superior de la página"
		}
	},
	"freeveeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar anuncios de Freevee:"
		}
	},
	"skipRecapSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip Recaps:"
		}
	},
	"skipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Se salta las recapitulaciones de cada programa"
		}
	},
	"skipBlockedSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Reanudar aviso de inactividad:"
		}
	},
	"skipBlockedDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Reanuda el vídeo si se muestra el mensaje \"¿Sigue viendo el vídeo?"
		}
	},
	"profileSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Elección automática del último perfil:"
		}
	},
	"profileDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Al abrir la página, se selecciona directamente el último perfil utilizado."
		}
	},
	"user": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Usuario:"
		}
	},
	"statisticPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Estadísticas"
		}
	},
	"skippedTime": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tiempo perdido:"
		}
	},
	"amazonAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tiempo de anuncios de FreeVee omitidos + anuncios propios de Prime Video"
		}
	},
	"statisticAd": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " Ad:"
			}]
		}
	},
	"netflixAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tiempo de anuncios de Netflix omitidos"
		}
	},
	"statisticIntro": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Intro:"
		}
	},
	"statisticIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tiempo de Intros saltadas en Netflix, Amazon y Disney+."
		}
	},
	"statisticRecap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Recapitulemos:"
		}
	},
	"statisticskipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tiempo de recapitulaciones omitidas en Netflix, Amazon y Disney+."
		}
	},
	"statisticSegments": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Segmentos saltados:"
		}
	},
	"statisticSegmentsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Cantidad de segmentos individuales omitidos como una introducción o un anuncio para Netflix, Amazon y Disney+."
		}
	},
	"importSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Importar/exportar todos los ajustes"
		}
	},
	"saveSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Guardar configuración como archivo"
		}
	},
	"uploadSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Cargar configuración:"
		}
	},
	"resetAddon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Restablecer la extension por defecto"
		}
	},
	"noWrap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "nowrap"
		}
	},
	"watchCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mira siempre los créditos:"
		}
	},
	"watchCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ver siempre los créditos de cada serie"
		}
	},
	"conflictingTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Todas las características en conflicto"
		}
	},
	"showRatingSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Clasificación TMDB:"
		}
	},
	"showRatingDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Añadir la clasificación TMDB a todas las películas y series"
		}
	},
	"releaseCalendarSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Añadir opciones de calendario de publicación:"
		}
	},
	"releaseCalendarDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Añade las casillas \"Mostrar sólo listas de reproducción\" y \"Filtrar DUB\" al calendario de lanzamientos."
		}
	},
	"epilepsySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Opción epilepsia"
		}
	},
	"epilepsyDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Oscurecer la pantalla al saltar el anuncio"
		}
	},
	"userAgentSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Cambiar a sitios web de escritorio"
		}
	},
	"userAgentDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Para prime video y disney+ cambiar a la web de escritorio y para amazon hacer el sitio móvil amigable"
		}
	},
	"xraySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ocultar Rayos X:"
		}
	},
	"xrayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ocultar la vista rápida de rayos X sobre un vídeo"
		}
	},
	"feature": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Función"
		}
	},
	"shared": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Todos"
		}
	},
	"openSharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Abrir la configuración compartida"
		}
	},
	"autoOpenSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Abrir automáticamente la configuración correcta:"
		}
	},
	"autoOpenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Si en el sitio de streaming de abrir la configuración de acuerdo en la ventana emergente de forma automática"
		}
	},
	"duplicateSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Eliminar duplicados Espectáculos:"
		}
	},
	"duplicateDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Elimina todos los programas duplicados que ya estaban visibles en Disney. Visible significa que el programa está entre los 5 primeros programas de cada fila."
		}
	},
	"watchSkippedButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "¿Rebobinar?"
		}
	},
	"homeButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Inicio"
		}
	},
	"bigPlayerSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Un vídeo más grande:"
		}
	},
	"bigPlayerDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Amplía el tamaño del vídeo a toda la ventana del navegador sin pantalla completa."
		}
	},
	"doubleClickSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pantalla completa haciendo doble clic:"
		}
	},
	"doubleClickDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Si haces doble clic en el vídeo, pasará a pantalla completa."
		}
	},
	"scrollVolumeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Desplácese para el volumen:"
		}
	},
	"scrollVolumeDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Si se desplaza hacia arriba o hacia abajo en el icono de sonido, cambiará el volumen."
		}
	},
	"disneyAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tiempo de anuncios Disney saltados."
		}
	},
	"showYearSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostrar año de lanzamiento:"
		}
	},
	"showYearDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Muestra el año de publicación junto a la clasificación."
		}
	},
	"installPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "🎉 ¡Instalado! 🚀"
		}
	},
	"installThanks": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "¡Gracias por instalar Streaming enhanced! ❤️"
		}
	},
	"installTurnOnOptional": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Activa todas las funciones opcionales:"
		}
	},
	"tabsPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "necesarios para la apertura automática de los ajustes correctos"
		}
	},
	"missingPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Permisos detectados"
		}
	},
	"addPermissionButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Añadir"
		}
	},
	"removeGamesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Quitar Juegos:"
		}
	},
	"removeGamesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Elimina todos los juegos de la página."
		}
	},
	"hideTitlesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Botón Ocultar película"
		}
	},
	"hideTitlesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ocultar automáticamente los programas ocultados manualmente por el usuario."
		}
	},
	"hiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Títulos ocultos:"
		}
	},
	"removeAllHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Eliminar todos los títulos ocultos"
		}
	},
	"crunchyrollDelay": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Retardo de salto en ms:"
		}
	},
	"crunchyrollDelayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Algunos idiomas tardan más que otros. Este ajuste permite saltarse la introducción y los créditos con un retardo tal que en algunos doblajes el discurso no se corta."
		}
	},
	"switchLanguage": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Cambiar de idioma:"
		}
	},
	"resetConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Desea restablecer la configuración.\n\nEstás seguro de que quieres hacerlo?"
		}
	},
	"invalidJson": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "El archivo que ha cargado no es un archivo JSON válido."
		}
	},
	"improveUISwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mejorar la interfaz de vídeo"
		}
	},
	"improveUIDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mejoras en la interfaz de usuario del reproductor de vídeo."
		}
	},
	"skipAfterCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar al siguiente episodio:"
		}
	},
	"skipAfterCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta automáticamente la escena de después de los créditos y pasa directamente al siguiente episodio."
		}
	},
	"editRatings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Editar umbrales y colores de clasificación:"
		}
	},
	"pickColor": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Elige el color"
		}
	},
	"pickRating": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Umbral de puntuación"
		}
	},
	"reset": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Restablecer"
		}
	},
	"dimLowRatingsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dimm baja clasificación"
		}
	},
	"dimLowRatingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dimm Shows con la calificación más baja."
		}
	},
	"disabledSettingsOverviewTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Resumen de ajustes desactivados"
		}
	},
	"disabledSettingsOverviewDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " ajustes desactivados en "
				},
				{
					"t": 5,
					"i": 1
				},
				{
					"t": 3,
					"v": " categorías."
				}
			]
		}
	},
	"hideHeaderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ocultar cabecera en reproductor"
		}
	},
	"hideHeaderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "También oculta la cabecera del sitio web en el reproductor de vídeo."
		}
	},
	"hiddenTitlesNav": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Títulos ocultos"
		}
	},
	"hiddenTitlesPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Títulos ocultos"
		}
	},
	"hiddenTitlesPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Gestiona los títulos que has ocultado para que no aparezcan en las filas de exploración de Netflix, Prime Video y Disney+."
		}
	},
	"searchPlaceholder": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Buscar títulos..."
		}
	},
	"platformFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Plataforma"
		}
	},
	"mediaTypeFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tipo"
		}
	},
	"allPlatforms": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Todas las plataformas"
		}
	},
	"allTypes": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Todos los tipos"
		}
	},
	"unknownPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Desconocido"
		}
	},
	"sortDateAdded": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Fecha de incorporación"
		}
	},
	"sortTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Título"
		}
	},
	"sortPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Plataforma"
		}
	},
	"viewIcon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vista de iconos"
		}
	},
	"viewList": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vista detallada"
		}
	},
	"selectAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Seleccionar todo"
		}
	},
	"unhide": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Espectáculo"
		}
	},
	"unhideSelected": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Mostrar los seleccionados ("
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ")"
				}
			]
		}
	},
	"unhideAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostrar todo"
		}
	},
	"unhideAllConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "¿Mostrar todos los títulos en todas las plataformas? Esta acción no se puede deshacer."
		}
	},
	"noHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Aún no hay títulos ocultos."
		}
	},
	"movieType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Película"
		}
	},
	"tvType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Programa de televisión"
		}
	}
} }, { "fr": {
	"extensionName": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced: Netflix Disney+ Prime Video"
		}
	},
	"extensionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passez les publicités, intros, génériques et ajustez la vitesse, etc. sur Netflix, Prime video, Disney+, Crunchyroll et HBO max."
		}
	},
	"settingsTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Paramètres - Streaming enhanced"
		}
	},
	"pageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced"
		}
	},
	"rateNow": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Noter maintenant !"
		}
	},
	"sharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Paramètres partagés"
		}
	},
	"sharedSettingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Ces options n'activeront/désactiveront que la partie "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " du paramètre partagé"
				}
			]
		}
	},
	"backup": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sauvegarde"
		}
	},
	"statistics": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Statistiques"
		}
	},
	"changelog": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Journal des modifications"
		}
	},
	"movieType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Film"
		}
	},
	"tvType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Série télévisée"
		}
	},
	"donate": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Faire un don"
		}
	},
	"pageSpecificTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " spécifique"
			}]
		}
	},
	"defaultfilterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Suppression de toutes les catégories de films et de séries payantes sur Amazon Prime"
		}
	},
	"sharedPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Fonctionnalités de la vidéo partagée"
		}
	},
	"sharedPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ces options n'activent/désactivent les paramètres que pour tous les services de diffusion en continu. Dans le tableau ci-dessous, vous pouvez désactiver les paramètres partagés pour un service spécifique."
		}
	},
	"skipIntroSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passer intro:"
		}
	},
	"skipIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sauter les introductions de toutes les séries, à l'exception du premier épisode de chaque série."
		}
	},
	"skipCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passer les crédits :"
		}
	},
	"skipCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passer à l'épisode suivant de chaque série aussi vite que possible"
		}
	},
	"skipAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sauter les annonces :"
		}
	},
	"skipAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sauter les publicités freevee pour amazon et toutes les publicités dans le niveau de base de Netflix"
		}
	},
	"speedSliderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ajouter le contrôle de la vitesse :"
		}
	},
	"speedSliderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ajout d'un curseur de réglage de la vitesse"
		}
	},
	"sliderOptions": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Options du curseur : vitesse = taille du pas /10"
		}
	},
	"sliderStepSize": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Taille du pas :"
		}
	},
	"sliderMin": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Valeur minimale :"
		}
	},
	"sliderMax": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Valeur maximum :"
		}
	},
	"sliderPreview": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Aperçu du curseur :"
		}
	},
	"playOnFullScreenSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Jouer en plein écran :"
		}
	},
	"playOnFullScreenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Si une vidéo est mise en plein écran, la vidéo sera lue automatiquement."
		}
	},
	"selfAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passer l’auto-promotion :"
		}
	},
	"selfAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passer les aperçus des émissions de premier plan qui sont diffusés avant toute vidéo"
		}
	},
	"filterPaidSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Supprimer les contenus payants :"
		}
	},
	"filterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Suppression de toutes les catégories de films/séries payants"
		}
	},
	"continuePositionSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Déplacer la catégorie \"Continuer\" :"
		}
	},
	"continuePositionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Déplacer la catégorie \"Continuer\" en haut de la page"
		}
	},
	"freeveeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passer les annonces de Freevee :"
		}
	},
	"skipRecapSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passer les récaps :"
		}
	},
	"skipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sauter les récapitulations de chaque émission"
		}
	},
	"skipBlockedSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Avertissement d'inactivité de reprise :"
		}
	},
	"skipBlockedDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Reprend la vidéo si l'invite \"Êtes-vous toujours en train de regarder\" s'affiche."
		}
	},
	"profileSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sélection automatique du dernier profil :"
		}
	},
	"profileDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Le dernier profil utilisé est directement choisi lors du lancement de la page."
		}
	},
	"user": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Utilisateur:"
		}
	},
	"statisticPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Statistiques"
		}
	},
	"skippedTime": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Le temps passé :"
		}
	},
	"amazonAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Durée des publicités FreeVee passées + publicités Prime Video Self"
		}
	},
	"statisticAd": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " Pub:"
			}]
		}
	},
	"netflixAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Durée des publicités Netflix passées"
		}
	},
	"statisticIntro": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Intro:"
		}
	},
	"statisticIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Durée des introductions sautées sur Netflix, Amazon et Disney+"
		}
	},
	"statisticRecap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Récapitulation :"
		}
	},
	"statisticskipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Les récapitulatifs du temps passé sur Netflix, Amazon et Disney+"
		}
	},
	"statisticSegments": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Segments ignorés :"
		}
	},
	"statisticSegmentsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Nombre de segments individuels passés comme intro ou publicité pour Netflix, Amazon et Disney+"
		}
	},
	"importSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Importer/exporter tous les paramètres"
		}
	},
	"saveSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Enregistrer les paramètres dans un fichier"
		}
	},
	"uploadSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Paramètres de téléchargement:"
		}
	},
	"resetAddon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Réinitialiser l'extension"
		}
	},
	"noWrap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Nowrap"
		}
	},
	"watchCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Voir toujours les crédits :"
		}
	},
	"watchCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Toujours regarder le générique de chaque série"
		}
	},
	"conflictingTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Toutes les caractéristiques contradictoires"
		}
	},
	"showRatingSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Notation TMDB :"
		}
	},
	"showRatingDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ajouter la note TMDB à chaque film et série"
		}
	},
	"releaseCalendarSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ajouter des options de calendrier de diffusion :"
		}
	},
	"releaseCalendarDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ajoute les cases à cocher \"Afficher uniquement les listes de lecture\" et \"Filtrer DUB\" au calendrier des sorties."
		}
	},
	"epilepsySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Option épilepsie"
		}
	},
	"epilepsyDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Assombrir l'écran lorsque l'on saute la publicité"
		}
	},
	"userAgentSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passer à des sites web de bureau"
		}
	},
	"userAgentDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pour prime video et disney+, passer au site web de bureau et pour amazon, rendre le site adapté aux mobiles."
		}
	},
	"xraySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Cacher X-Ray:"
		}
	},
	"xrayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Masquer l'affichage rapide du X-Ray sur une vidéo"
		}
	},
	"feature": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Fonctionnalité"
		}
	},
	"shared": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tous"
		}
	},
	"openSharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ouvrir les paramètres partagés"
		}
	},
	"autoOpenSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ouvrir automatiquement les paramètres corrects :"
		}
	},
	"autoOpenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Si vous êtes sur un site de streaming, les paramètres correspondants s'ouvrent automatiquement dans une fenêtre contextuelle."
		}
	},
	"duplicateSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Supprime les émissions en double :"
		}
	},
	"duplicateDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Supprime toute émission en double qui était auparavant visible sur Disney. Visible signifie que l'émission était parmi les 5 premières émissions de chaque série"
		}
	},
	"watchSkippedButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Retour en arrière ?"
		}
	},
	"homeButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Accueil"
		}
	},
	"bigPlayerSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Agrandir la vidéo :"
		}
	},
	"bigPlayerDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Étend la taille de la vidéo à toute la fenêtre du navigateur sans plein écran."
		}
	},
	"doubleClickSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Plein écran en double-cliquant :"
		}
	},
	"doubleClickDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Si vous double-cliquez sur la vidéo, elle s'affichera en plein écran."
		}
	},
	"scrollVolumeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Défilement pour le volume :"
		}
	},
	"scrollVolumeDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Le défilement vers le haut ou vers le bas de l'icône du son modifie le volume."
		}
	},
	"disneyAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Durée des publicités Disney sautées."
		}
	},
	"showYearSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Afficher l'année de publication :"
		}
	},
	"showYearDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Indique l'année de publication à côté de la note."
		}
	},
	"installPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "🎉 Installé ! 🚀"
		}
	},
	"installThanks": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Merci d'avoir installé Streaming enhanced ! ❤️"
		}
	},
	"installTurnOnOptional": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Activer toutes les fonctions optionnelles :"
		}
	},
	"tabsPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "requis pour ouvrir automatiquement les paramètres corrects"
		}
	},
	"missingPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Permissions manquantes détectées"
		}
	},
	"addPermissionButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ajouter"
		}
	},
	"removeGamesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Supprimer les jeux:"
		}
	},
	"removeGamesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Supprime tous les jeux de la page."
		}
	},
	"hideTitlesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Bouton Masquer le film"
		}
	},
	"hideTitlesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Masquer automatiquement les émissions qui ont été masquées manuellement par l'utilisateur."
		}
	},
	"hiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Titres cachés :"
		}
	},
	"removeAllHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Supprimer tous les titres cachés"
		}
	},
	"crunchyrollDelay": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Délai de saut en ms\xA0:"
		}
	},
	"crunchyrollDelayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Certaines langues prennent plus de temps que d'autres. Ce paramètre vous permet de sauter l'intro et le générique avec un délai tel que dans certains doublages, la parole n'est pas coupée."
		}
	},
	"switchLanguage": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Changer de langue :"
		}
	},
	"resetConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vous souhaitez réinitialiser les paramètres.\n\nÊtes-vous sûr de vouloir le faire ?"
		}
	},
	"invalidJson": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Le fichier que vous avez téléchargé n'est pas un fichier JSON valide."
		}
	},
	"improveUISwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Améliorer l'interface utilisateur de la vidéo"
		}
	},
	"improveUIDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Amélioration de l'interface utilisateur du lecteur vidéo de diverses manières."
		}
	},
	"skipAfterCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passer à l'épisode suivant :"
		}
	},
	"skipAfterCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sauter automatiquement la scène de fin de générique et passer directement à l'épisode suivant."
		}
	},
	"editRatings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Modifier les seuils de classement et les couleurs :"
		}
	},
	"pickColor": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Choisir la couleur"
		}
	},
	"pickRating": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Seuil d'évaluation des choix"
		}
	},
	"reset": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remise à zéro"
		}
	},
	"dimLowRatingsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dimm Low Ratings"
		}
	},
	"dimLowRatingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Spectacles Dimm avec la note la plus basse."
		}
	},
	"disabledSettingsOverviewTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Aperçu des paramètres désactivés"
		}
	},
	"disabledSettingsOverviewDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " paramètres désactivés dans "
				},
				{
					"t": 5,
					"i": 1
				},
				{
					"t": 3,
					"v": " catégories."
				}
			]
		}
	},
	"hideHeaderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Masquer l'en-tête du lecteur"
		}
	},
	"hideHeaderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Masque également l'en-tête du site Web dans le lecteur vidéo."
		}
	},
	"hiddenTitlesNav": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Titres cachés"
		}
	},
	"hiddenTitlesPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Titres cachés"
		}
	},
	"hiddenTitlesPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Gérez les titres que vous avez masqués afin qu'ils n'apparaissent pas dans les listes de navigation sur Netflix, Prime Video et Disney+."
		}
	},
	"searchPlaceholder": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rechercher des titres..."
		}
	},
	"platformFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Plateforme"
		}
	},
	"mediaTypeFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Taper"
		}
	},
	"allPlatforms": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Toutes les plateformes"
		}
	},
	"allTypes": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tous les types"
		}
	},
	"unknownPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Inconnu"
		}
	},
	"sortDateAdded": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Date d'ajout"
		}
	},
	"sortTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Titre"
		}
	},
	"sortPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Plate-forme"
		}
	},
	"viewIcon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vue par icône"
		}
	},
	"viewList": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vue détaillée"
		}
	},
	"selectAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tout sélectionner"
		}
	},
	"unhide": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Montrer"
		}
	},
	"unhideSelected": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Afficher la sélection ("
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ")"
				}
			]
		}
	},
	"unhideAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tout afficher"
		}
	},
	"unhideAllConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Afficher tous les titres sur toutes les plateformes ? Cette action est irréversible."
		}
	},
	"noHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Il n'y a pas encore de titres cachés."
		}
	}
} }, { "it": {
	"extensionName": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced: Netflix Disney+ Prime Video"
		}
	},
	"extensionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta annunci, intro, titoli di coda, regola la velocità e altro su Netflix, Prime Video, Disney+, Crunchyroll e HBO Max."
		}
	},
	"settingsTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Impostazioni - Streaming enhanced"
		}
	},
	"pageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced"
		}
	},
	"rateNow": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Valuta ora!"
		}
	},
	"sharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Impostazioni Condivise"
		}
	},
	"sharedSettingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Queste opzioni abiliteranno/disabiliteranno solo la parte "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " dell'impostazione condivisa."
				}
			]
		}
	},
	"backup": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Backup"
		}
	},
	"statistics": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Statistiche"
		}
	},
	"changelog": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Changelog"
		}
	},
	"donate": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dona"
		}
	},
	"pageSpecificTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 3,
				"v": "Specifiche di "
			}, {
				"t": 5,
				"i": 0
			}]
		}
	},
	"defaultfilterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rimuove ogni categoria di film/serie a pagamento da Amazon Prime."
		}
	},
	"sharedPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Funzionalità Video Condivise"
		}
	},
	"sharedPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Queste opzioni abiliteranno/disabiliteranno le impostazioni per tutti i servizi di streaming. Nella tabella sottostante puoi disabilitare le impostazioni condivise per un servizio specifico."
		}
	},
	"skipIntroSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta Intro:"
		}
	},
	"skipIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltare le introduzioni di tutte le serie, tranne il primo episodio di ogni serie."
		}
	},
	"skipCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta Titoli di Coda:"
		}
	},
	"skipCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passa all'episodio successivo di ogni serie il più velocemente possibile."
		}
	},
	"skipAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta Annunci:"
		}
	},
	"skipAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta gli annunci Freevee di Amazon e tutti gli annunci del piano base Netflix."
		}
	},
	"speedSliderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Aggiungi controllo velocità:"
		}
	},
	"speedSliderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Aggiunge uno slider per la regolazione della velocità."
		}
	},
	"sliderOptions": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Controllo velocità: ogni tacca = incremento /10"
		}
	},
	"sliderStepSize": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Incremento velocità:"
		}
	},
	"sliderMin": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Valore minimo:"
		}
	},
	"sliderMax": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Valore massimo:"
		}
	},
	"sliderPreview": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Anteprima slider:"
		}
	},
	"playOnFullScreenSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Riproduci a schermo intero:"
		}
	},
	"playOnFullScreenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Se un video viene messo a schermo intero, la riproduzione si avvierà automaticamente."
		}
	},
	"selfAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta auto-promozioni:"
		}
	},
	"selfAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta le anteprime dei programmi Prime mostrate prima di ogni video."
		}
	},
	"filterPaidSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rimuovi contenuti a pagamento:"
		}
	},
	"filterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rimuove ogni categoria di film/serie a pagamento."
		}
	},
	"continuePositionSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sposta categoria \"Continua a guardare\":"
		}
	},
	"continuePositionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sposta la categoria \"Continua a guardare\" in cima alla pagina."
		}
	},
	"freeveeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta annunci Freevee:"
		}
	},
	"skipRecapSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta Riepiloghi:"
		}
	},
	"skipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta i riepiloghi di ogni serie."
		}
	},
	"skipBlockedSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Blocca avviso inattività:"
		}
	},
	"skipBlockedDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Blocca l'avviso 'Stai ancora guardando?' e continua la riproduzione automaticamente."
		}
	},
	"profileSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Seleziona ultimo profilo automaticamente:"
		}
	},
	"profileDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "L'ultimo profilo utilizzato viene selezionato automaticamente all'avvio della pagina."
		}
	},
	"user": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Utente:"
		}
	},
	"statisticPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Statistiche"
		}
	},
	"skippedTime": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo saltato:"
		}
	},
	"amazonAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo degli annunci Freevee e auto-promozioni Prime Video saltati."
		}
	},
	"statisticAd": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Annunci "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ":"
				}
			]
		}
	},
	"netflixAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo degli annunci Netflix saltati."
		}
	},
	"statisticIntro": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Intro:"
		}
	},
	"statisticIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo delle intro saltate su Netflix, Amazon e Disney+."
		}
	},
	"statisticRecap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Riepilogo:"
		}
	},
	"statisticskipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo dei riepiloghi saltati su Netflix, Amazon e Disney+."
		}
	},
	"statisticSegments": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Segmenti saltati:"
		}
	},
	"statisticSegmentsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Numero di segmenti individuali saltati (intro, annunci, ecc.) su Netflix, Amazon e Disney+."
		}
	},
	"importSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Importa/Esporta impostazioni"
		}
	},
	"saveSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salva impostazioni su file"
		}
	},
	"uploadSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Carica impostazioni:"
		}
	},
	"resetAddon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ripristina estensione"
		}
	},
	"noWrap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "nowrap"
		}
	},
	"watchCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Non saltare mai i titoli di coda:"
		}
	},
	"watchCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Impedisce lo skip automatico dei titoli di coda."
		}
	},
	"conflictingTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Funzionalità incompatibili"
		}
	},
	"showRatingSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Valutazione TMDB:"
		}
	},
	"showRatingDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Aggiunge la valutazione TMDB a ogni film e serie."
		}
	},
	"releaseCalendarSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Aggiungi opzioni calendario uscite:"
		}
	},
	"releaseCalendarDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Aggiunge le caselle 'Mostra solo playlist' e 'Filtra DUB' al calendario delle uscite."
		}
	},
	"epilepsySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Opzione epilessia"
		}
	},
	"epilepsyDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Scurisce lo schermo quando salta un annuncio."
		}
	},
	"userAgentSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passa alla versione desktop"
		}
	},
	"userAgentDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Per Prime Video e Disney+ passa alla versione desktop; per Amazon rende il sito ottimizzato per mobile."
		}
	},
	"xraySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Nascondi X-Ray:"
		}
	},
	"xrayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Nasconde la visualizzazione rapida X-Ray sopra un video."
		}
	},
	"feature": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Funzionalità"
		}
	},
	"shared": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tutti"
		}
	},
	"openSharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Apri Impostazioni Condivise"
		}
	},
	"autoOpenSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Apri automaticamente impostazioni del sito:"
		}
	},
	"autoOpenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Se su un sito di streaming, apre automaticamente le impostazioni del sito nel popup."
		}
	},
	"duplicateSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rimuovi titoli duplicati:"
		}
	},
	"duplicateDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rimuove ogni titolo duplicato già visibile su Disney. Visibile significa tra i primi 5 titoli in ogni riga."
		}
	},
	"watchSkippedButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Guarda comunque?"
		}
	},
	"homeButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Home"
		}
	},
	"bigPlayerSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Video ingrandito:"
		}
	},
	"bigPlayerDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Estende il video all'intera finestra del browser senza schermo intero."
		}
	},
	"doubleClickSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Schermo intero con doppio clic:"
		}
	},
	"doubleClickDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Doppio clic sul video per attivare lo schermo intero."
		}
	},
	"scrollVolumeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Scorri per il volume:"
		}
	},
	"scrollVolumeDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Scorri su/giù sull'icona audio per modificare il volume."
		}
	},
	"disneyAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo degli annunci Disney saltati."
		}
	},
	"showYearSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostra anno di uscita:"
		}
	},
	"showYearDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostra l'anno di uscita accanto alla valutazione."
		}
	},
	"installPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "🎉 Installata! 🚀"
		}
	},
	"installThanks": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Grazie per aver installato Streaming enhanced! ❤️"
		}
	},
	"installTurnOnOptional": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Attiva tutte le funzionalità opzionali:"
		}
	},
	"tabsPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "necessario per l'apertura automatica delle impostazioni del sito"
		}
	},
	"missingPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Permessi mancanti rilevati"
		}
	},
	"addPermissionButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Aggiungi"
		}
	},
	"removeGamesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rimuovi categoria giochi:"
		}
	},
	"removeGamesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rimuove la categoria giochi dall'interfaccia di Netflix."
		}
	},
	"hideTitlesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pulsante nascondi titolo"
		}
	},
	"hideTitlesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Nasconde automaticamente i titoli nascosti manualmente dall'utente."
		}
	},
	"hiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Titoli Nascosti:"
		}
	},
	"removeAllHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rimuovi tutti i titoli nascosti"
		}
	},
	"crunchyrollDelay": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ritardo di salto in ms:"
		}
	},
	"crunchyrollDelayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alcune lingue richiedono più tempo di altre. Questa impostazione consente di saltare l'introduzione e i titoli di coda con un ritardo tale da non interrompere il parlato in alcune lingue."
		}
	},
	"switchLanguage": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Cambia Lingua:"
		}
	},
	"resetConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Stai per ripristinare le impostazioni.\n\nSei sicuro di voler procedere?"
		}
	},
	"invalidJson": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Il file caricato non è un file JSON valido."
		}
	},
	"improveUISwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ottimizza interfaccia video"
		}
	},
	"improveUIDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Migliora l'interfaccia del lettore video in vari modi."
		}
	},
	"skipAfterCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passa alla prossima puntata:"
		}
	},
	"skipAfterCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta automaticamente la scena dei titoli di coda e passa direttamente all'episodio successivo."
		}
	},
	"editRatings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Modifica soglie e colori valutazioni:"
		}
	},
	"pickColor": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Scegli colore"
		}
	},
	"pickRating": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Scegli soglia valutazione"
		}
	},
	"reset": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ripristina"
		}
	},
	"dimLowRatingsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sfuma titoli con rating basso"
		}
	},
	"dimLowRatingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Spettacoli Dimm con la valutazione più bassa."
		}
	},
	"disabledSettingsOverviewTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Panoramica delle impostazioni disabilitate"
		}
	},
	"disabledSettingsOverviewDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " impostazioni disabilitate in "
				},
				{
					"t": 5,
					"i": 1
				},
				{
					"t": 3,
					"v": " categorie."
				}
			]
		}
	},
	"hideHeaderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Nascondere l'intestazione del lettore"
		}
	},
	"hideHeaderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Nasconde anche l'intestazione del sito web sul lettore video."
		}
	},
	"hiddenTitlesNav": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Titoli nascosti"
		}
	},
	"hiddenTitlesPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Titoli nascosti"
		}
	},
	"hiddenTitlesPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Gestisci i titoli che hai nascosto in modo che non compaiano nelle righe di sfogliatura su Netflix, Prime Video e Disney+."
		}
	},
	"searchPlaceholder": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Cerca tra i titoli..."
		}
	},
	"platformFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Piattaforma"
		}
	},
	"mediaTypeFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tipo"
		}
	},
	"allPlatforms": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tutte le piattaforme"
		}
	},
	"allTypes": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tutti i tipi"
		}
	},
	"unknownPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sconosciuto"
		}
	},
	"sortDateAdded": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Data di inserimento"
		}
	},
	"sortTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Titolo"
		}
	},
	"sortPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Piattaforma"
		}
	},
	"viewIcon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Visualizzazione delle icone"
		}
	},
	"viewList": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vista dettagliata"
		}
	},
	"selectAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Seleziona tutto"
		}
	},
	"unhide": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostra"
		}
	},
	"unhideSelected": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Mostra selezionati ("
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ")"
				}
			]
		}
	},
	"unhideAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostra tutto"
		}
	},
	"unhideAllConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostrare tutti i titoli su tutte le piattaforme? Questa operazione non può essere annullata."
		}
	},
	"noHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Non ci sono ancora titoli nascosti."
		}
	},
	"movieType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Film"
		}
	},
	"tvType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Programma televisivo"
		}
	}
} }, { "ja": {
	"extensionName": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced: Netflix Disney+ Prime Video"
		}
	},
	"extensionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix、Prime video、Disney+、Crunchyroll、HBO maxでは、広告、イントロ、クレジットをスキップし、速度などを調整できます。"
		}
	},
	"settingsTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "設定 - Streaming enhanced"
		}
	},
	"pageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced"
		}
	},
	"rateNow": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "今すぐレートを"
		}
	},
	"sharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "共有設定"
		}
	},
	"sharedSettingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "これらのオプションは、共有設定の"
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": "部分のみを有効/無効にします。"
				}
			]
		}
	},
	"backup": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "バックアップ"
		}
	},
	"statistics": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "統計"
		}
	},
	"changelog": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "変更履歴"
		}
	},
	"donate": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "寄付する"
		}
	},
	"pageSpecificTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " 専用"
			}]
		}
	},
	"defaultfilterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Amazonプライムからすべての有料映画／シリーズカテゴリーを削除"
		}
	},
	"sharedPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "共有ビデオ機能"
		}
	},
	"sharedPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "これらのオプションは、すべてのストリーミングサービスの設定のみを有効/無効にします。以下の表では、特定のサービスの共有設定を無効にすることができます。"
		}
	},
	"skipIntroSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "船のイントロ："
		}
	},
	"skipIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "各シリーズの第1話を除き、全シリーズのイントロをスキップする。"
		}
	},
	"skipCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "スキップ・クレジット"
		}
	},
	"skipCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "すべてのシリーズの次のエピソードにできるだけ早く飛ぶ"
		}
	},
	"skipAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "広告をスキップする："
		}
	},
	"skipAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "amazonのfreevee広告とNetflixのベーシック・ティアの広告をすべてスキップする。"
		}
	},
	"speedSliderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "スピードコントロールを追加する："
		}
	},
	"speedSliderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "スピード調整スライダーの追加"
		}
	},
	"sliderOptions": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "スライダーのオプション：スピード = ステップサイズ /10"
		}
	},
	"sliderStepSize": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "スライダーのステップサイズ："
		}
	},
	"sliderMin": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "スライダーの最小値："
		}
	},
	"sliderMax": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "スライダーの最大値："
		}
	},
	"sliderPreview": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "スライダーのプレビュー"
		}
	},
	"playOnFullScreenSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "フルスクリーンで再生する："
		}
	},
	"playOnFullScreenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ビデオをフルスクリーンにすると、自動的に再生されます。"
		}
	},
	"selfAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "自己広告をスキップする："
		}
	},
	"selfAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ビデオの前に表示されるプライムショーのプレビューをスキップする。"
		}
	},
	"filterPaidSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "有料コンテンツを削除する："
		}
	},
	"filterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "すべての有料映画／シリーズカテゴリーの削除"
		}
	},
	"continuePositionSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "カテゴリーを「続ける」に移動する："
		}
	},
	"continuePositionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "カテゴリー \"Continue \"をページのトップに移動"
		}
	},
	"freeveeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "フリービー広告をスキップする："
		}
	},
	"skipRecapSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "スキップ・リキャップ"
		}
	},
	"skipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "すべてのショーの総括を省略"
		}
	},
	"skipBlockedSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "非アクティブの警告を再開する："
		}
	},
	"skipBlockedDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "まだ見ていますか」というプロンプトが表示されたら、ビデオを再開する"
		}
	},
	"profileSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "最後のプロファイルを自動的に選択します："
		}
	},
	"profileDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "最後に使用されたプロファイルは、ページが立ち上げられたときに直接選択される"
		}
	},
	"user": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ユーザー"
		}
	},
	"statisticPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "統計"
		}
	},
	"skippedTime": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "時間を飛ばした："
		}
	},
	"amazonAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "FreeVee広告＋プライム・ビデオ自己広告のスキップ時間"
		}
	},
	"statisticAd": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " 広告："
			}]
		}
	},
	"netflixAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix広告のスキップ時間"
		}
	},
	"statisticIntro": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "イントロダクション"
		}
	},
	"statisticIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix、Amazon、Disney+のイントロがスキップされる時間"
		}
	},
	"statisticRecap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "総括する："
		}
	},
	"statisticskipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix、Amazon、Disney+で再放送をスキップした時間"
		}
	},
	"statisticSegments": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "セグメントスキップ："
		}
	},
	"statisticSegmentsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix、Amazon、Disney+のイントロや広告のようにスキップされた個別セグメントの量"
		}
	},
	"importSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "すべての設定のインポート/エクスポート"
		}
	},
	"saveSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "設定をファイルに保存"
		}
	},
	"uploadSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "設定のアップロード:"
		}
	},
	"resetAddon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "アドオンをデフォルトに戻す"
		}
	},
	"noWrap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ナウラップ"
		}
	},
	"watchCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "常にクレジットを見る："
		}
	},
	"watchCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "すべてのシリーズのクレジットを見る"
		}
	},
	"conflictingTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "相反するすべての機能"
		}
	},
	"showRatingSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "TMDBの評価"
		}
	},
	"showRatingDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "すべての映画とシリーズにTMDBの評価を加える"
		}
	},
	"releaseCalendarSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "リリースカレンダーのオプションを追加："
		}
	},
	"releaseCalendarDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "リリースカレンダーに「プレイリストのみ表示」と「DUBをフィルタリング」のチェックボックスを追加"
		}
	},
	"epilepsySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "てんかんオプション"
		}
	},
	"epilepsyDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "広告スキップ時に画面を暗くする"
		}
	},
	"userAgentSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "デスクトップウェブサイトへの切り替え"
		}
	},
	"userAgentDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "プライム・ビデオとdisney+はデスクトップ・サイトに変更し、amazonはモバイル・フレンドリー・サイトにする。"
		}
	},
	"xraySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "X線を隠す："
		}
	},
	"xrayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Xrayクイックビューをビデオの上に隠す"
		}
	},
	"feature": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "機能"
		}
	},
	"shared": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "すべて"
		}
	},
	"openSharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "共有設定を開く"
		}
	},
	"autoOpenSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "自動的に正しい設定を開きます："
		}
	},
	"autoOpenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ストリーミング・サイトの場合、ポップアップで該当する設定を自動的に開く"
		}
	},
	"duplicateSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "重複する番組を削除する："
		}
	},
	"duplicateDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "以前ディズニーで表示されていた重複ショーをすべて削除する。表示されているということは、そのショーがすべての行の最初の5つのショーに入っているということです。"
		}
	},
	"watchSkippedButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "巻き戻し？"
		}
	},
	"homeButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ホーム"
		}
	},
	"bigPlayerSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ビデオも大きくなった："
		}
	},
	"bigPlayerDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "フルスクリーンにすることなく、動画サイズをブラウザウィンドウ全体に拡大します。"
		}
	},
	"doubleClickSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ダブルクリックでフルスクリーン："
		}
	},
	"doubleClickDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ビデオをダブルクリックするとフルスクリーンになります。"
		}
	},
	"scrollVolumeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "音量をスクロールする："
		}
	},
	"scrollVolumeDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "サウンドアイコンを上下にスクロールすると音量が変わります。"
		}
	},
	"disneyAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ディズニーの広告をスキップした時間。"
		}
	},
	"showYearSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ショーのリリース年"
		}
	},
	"showYearDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "レーティングの横にリリース年を表示。"
		}
	},
	"installPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "インストールされています！🚀"
		}
	},
	"installThanks": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhancedをインストールしていただきありがとうございます！❤️"
		}
	},
	"installTurnOnOptional": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "すべてのオプション機能をオンにする："
		}
	},
	"tabsPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "正しい設定の自動オープンに必要"
		}
	},
	"missingPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "欠落したパーミッションが検出された"
		}
	},
	"addPermissionButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "追加"
		}
	},
	"removeGamesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ゲームを削除："
		}
	},
	"removeGamesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ページからすべてのゲームを削除する。"
		}
	},
	"hideTitlesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "非表示ボタン"
		}
	},
	"hideTitlesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ユーザーが手動で非表示にした番組を自動的に非表示にする。"
		}
	},
	"hiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "隠れたタイトル"
		}
	},
	"removeAllHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "すべての隠しタイトルを削除する"
		}
	},
	"crunchyrollDelay": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ms単位のスキップディレイ："
		}
	},
	"crunchyrollDelayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "言語によっては、他の言語よりも時間がかかります。この設定により、イントロとクレジットを遅延させてスキップすることができます。"
		}
	},
	"switchLanguage": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "言語切り替え："
		}
	},
	"resetConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "設定をリセットしたい。\n\n本当によろしいですか？"
		}
	},
	"invalidJson": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "アップロードされたファイルは有効なJSONファイルではありません。"
		}
	},
	"improveUISwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ビデオUIの改善"
		}
	},
	"improveUIDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ビデオプレーヤーのUIを様々な方法で強化。"
		}
	},
	"skipAfterCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "次のエピソードへ"
		}
	},
	"skipAfterCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "アフタークレジットのシーンを自動的にスキップし、次のエピソードに直接進みます。"
		}
	},
	"editRatings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "レーティングのしきい値と色を編集する："
		}
	},
	"pickColor": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ピックカラー"
		}
	},
	"pickRating": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ピック評価基準値"
		}
	},
	"reset": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "リセット"
		}
	},
	"dimLowRatingsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "ディム低格付け"
		}
	},
	"dimLowRatingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "最低視聴率のDIMMショー"
		}
	},
	"disabledSettingsOverviewTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "無効設定の概要"
		}
	},
	"disabledSettingsOverviewDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": "の設定が"
				},
				{
					"t": 5,
					"i": 1
				},
				{
					"t": 3,
					"v": "のカテゴリで無効になっている。"
				}
			]
		}
	},
	"hideHeaderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "プレーヤーのヘッダーを隠す"
		}
	},
	"hideHeaderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "また、ビデオプレーヤーのウェブサイトヘッダーを非表示にします。"
		}
	},
	"hiddenTitlesNav": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "非表示のタイトル"
		}
	},
	"hiddenTitlesPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "非表示のタイトル"
		}
	},
	"hiddenTitlesPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix、Prime Video、Disney+の各サービスにおいて、閲覧一覧に表示されないように非表示にしたタイトルを管理します。"
		}
	},
	"searchPlaceholder": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "タイトルを検索..."
		}
	},
	"platformFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "プラットフォーム"
		}
	},
	"mediaTypeFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "種類"
		}
	},
	"allPlatforms": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "すべてのプラットフォーム"
		}
	},
	"allTypes": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "全種類"
		}
	},
	"unknownPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "未知"
		}
	},
	"sortDateAdded": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "追加日"
		}
	},
	"sortTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "タイトル"
		}
	},
	"sortPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "プラットフォーム"
		}
	},
	"viewIcon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "アイコン表示"
		}
	},
	"viewList": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "詳細表示"
		}
	},
	"selectAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "すべて選択"
		}
	},
	"unhide": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "表示"
		}
	},
	"unhideSelected": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "選択したものを表示 ("
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ")"
				}
			]
		}
	},
	"unhideAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "すべて表示"
		}
	},
	"unhideAllConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "すべてのプラットフォームのすべてのタイトルを表示しますか？この操作は元に戻せません。"
		}
	},
	"noHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "まだ非表示のタイトルはありません。"
		}
	},
	"movieType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "映画"
		}
	},
	"tvType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "テレビ番組"
		}
	}
} }, { "ko": {
	"extensionName": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced: Netflix Disney+ Prime Video"
		}
	},
	"extensionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "넷플릭스, 프라임 비디오, 디즈니+, 크런치롤, HBO max에서 광고, 인트로, 크레딧을 건너뛰고 속도 조절 등을 추가할 수 있습니다."
		}
	},
	"settingsTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "설정 - Streaming enhanced"
		}
	},
	"pageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced"
		}
	},
	"rateNow": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "지금 평가하세요!"
		}
	},
	"sharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "공유 설정"
		}
	},
	"sharedSettingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "이러한 옵션은 공유 설정의 "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " 부분만 활성화/비활성화합니다."
				}
			]
		}
	},
	"backup": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "백업"
		}
	},
	"statistics": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "통계"
		}
	},
	"changelog": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "변경 로그"
		}
	},
	"donate": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "기부하기"
		}
	},
	"pageSpecificTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " 특정"
			}]
		}
	},
	"defaultfilterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Amazon Prime에서 모든 유료 영화/시리즈 카테고리 제거하기"
		}
	},
	"sharedPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "공유 비디오 기능"
		}
	},
	"sharedPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "이러한 옵션은 모든 스트리밍 서비스에 대한 설정만 활성화/비활성화합니다. 아래 표에서 특정 서비스에 대한 공유 설정을 비활성화할 수 있습니다."
		}
	},
	"skipIntroSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "인트로 건너뛰기:"
		}
	},
	"skipIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "각 시리즈의 첫 번째 에피소드를 제외한 모든 시리즈의 인트로를 건너뜁니다."
		}
	},
	"skipCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "크레딧 건너뛰기:"
		}
	},
	"skipCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모든 시리즈의 다음 에피소드로 최대한 빠르게 건너뛰기"
		}
	},
	"skipAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "광고 건너뛰기:"
		}
	},
	"skipAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "아마존 프리비 광고 건너뛰기 및 기본 넷플릭스 티어의 모든 광고 건너뛰기"
		}
	},
	"speedSliderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "속도 제어를 추가합니다:"
		}
	},
	"speedSliderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "속도 조절 슬라이더 추가"
		}
	},
	"sliderOptions": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "슬라이더 옵션: 속도 = 단계 크기 /10"
		}
	},
	"sliderStepSize": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "슬라이더 단계 크기:"
		}
	},
	"sliderMin": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "최소 슬라이더:"
		}
	},
	"sliderMax": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "슬라이더 최대:"
		}
	},
	"sliderPreview": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "슬라이더 미리 보기:"
		}
	},
	"playOnFullScreenSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "전체 화면으로 재생합니다:"
		}
	},
	"playOnFullScreenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "동영상이 전체 화면으로 표시되면 동영상이 자동으로 재생됩니다."
		}
	},
	"selfAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "셀프 광고 건너뛰기:"
		}
	},
	"selfAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "동영상 전에 표시되는 프라임 쇼 미리보기 건너뛰기"
		}
	},
	"filterPaidSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "유료 콘텐츠를 제거합니다:"
		}
	},
	"filterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모든 유료 영화/시리즈 카테고리 삭제"
		}
	},
	"continuePositionSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "카테고리 이동 \"계속\":"
		}
	},
	"continuePositionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "카테고리 '계속'을 페이지 상단으로 이동합니다."
		}
	},
	"freeveeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "프리비 광고 건너뛰기:"
		}
	},
	"skipRecapSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "요약 건너뛰기:"
		}
	},
	"skipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모든 프로그램 요약 건너뛰기"
		}
	},
	"skipBlockedSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "비활성 상태 재개 경고:"
		}
	},
	"skipBlockedDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "'아직 시청 중이십니까'라는 메시지가 표시되면 동영상을 다시 시작합니다."
		}
	},
	"profileSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "마지막 프로필 자동 선택:"
		}
	},
	"profileDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "페이지가 시작될 때 마지막으로 사용한 프로필이 바로 선택됩니다."
		}
	},
	"user": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "사용자:"
		}
	},
	"statisticPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "통계"
		}
	},
	"skippedTime": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "시간 건너뛰기:"
		}
	},
	"amazonAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "프리비 광고 + 프라임 비디오 셀프 광고 건너뛰기 시간"
		}
	},
	"statisticAd": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " 광고:"
			}]
		}
	},
	"netflixAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "넷플릭스 광고를 건너뛴 시간"
		}
	},
	"statisticIntro": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "소개:"
		}
	},
	"statisticIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "넷플릭스, 아마존, 디즈니+에서 인트로를 건너뛴 시간"
		}
	},
	"statisticRecap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "요약합니다:"
		}
	},
	"statisticskipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "넷플릭스, 아마존 및 디즈니+에서 건너뛴 요약 시간"
		}
	},
	"statisticSegments": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "세그먼트 건너뛰기:"
		}
	},
	"statisticSegmentsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "넷플릭스, 아마존 및 디즈니+의 인트로 또는 광고처럼 건너뛴 개별 세그먼트의 수"
		}
	},
	"importSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모든 설정 가져오기/내보내기"
		}
	},
	"saveSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "설정을 파일로 저장"
		}
	},
	"uploadSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "업로드 설정:"
		}
	},
	"resetAddon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "애드온을 기본값으로 재설정"
		}
	},
	"noWrap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "nowrap"
		}
	},
	"watchCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "항상 크레딧 보기:"
		}
	},
	"watchCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모든 시리즈의 크레딧을 항상 시청하세요"
		}
	},
	"conflictingTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "충돌하는 모든 기능"
		}
	},
	"showRatingSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "TMDB 등급:"
		}
	},
	"showRatingDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모든 영화 및 시리즈에 TMDB 등급 추가하기"
		}
	},
	"releaseCalendarSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "릴리즈 캘린더 옵션을 추가합니다:"
		}
	},
	"releaseCalendarDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "출시 캘린더에 '재생목록만 표시' 및 'DUB 필터링' 확인란을 추가합니다."
		}
	},
	"epilepsySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "간질 옵션"
		}
	},
	"epilepsyDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "광고 건너뛰기 시 화면 어둡게 하기"
		}
	},
	"userAgentSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "데스크톱 웹사이트로 전환"
		}
	},
	"userAgentDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "프라임 비디오 및 디즈니+의 경우 데스크톱 웹사이트로 변경하고 아마존의 경우 사이트를 모바일 친화적으로 만듭니다."
		}
	},
	"xraySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "X레이 숨기기:"
		}
	},
	"xrayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "동영상 위에 X레이 퀵뷰 숨기기"
		}
	},
	"feature": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "기능"
		}
	},
	"shared": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모두"
		}
	},
	"openSharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "공유 설정 열기"
		}
	},
	"autoOpenSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "올바른 설정이 자동으로 열립니다:"
		}
	},
	"autoOpenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "스트리밍 사이트에서 해당 설정이 자동으로 팝업으로 열리면 다음과 같이 설정합니다."
		}
	},
	"duplicateSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "중복된 쇼를 제거합니다:"
		}
	},
	"duplicateDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "이전에 Disney에서 이미 표시되었던 중복 쇼를 모두 제거합니다. 표시됨은 모든 행의 처음 5개 쇼에 해당 쇼가 있음을 의미합니다."
		}
	},
	"watchSkippedButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "되감기?"
		}
	},
	"homeButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "홈"
		}
	},
	"bigPlayerSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "동영상 크게 보기:"
		}
	},
	"bigPlayerDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "동영상 크기를 전체 화면 없이 브라우저 창 전체로 확장합니다."
		}
	},
	"doubleClickSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "두 번 클릭하면 전체 화면으로 전환됩니다:"
		}
	},
	"doubleClickDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "동영상을 두 번 클릭하면 전체 화면으로 이동합니다."
		}
	},
	"scrollVolumeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "볼륨을 찾으려면 스크롤합니다:"
		}
	},
	"scrollVolumeDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "사운드 아이콘을 위아래로 스크롤하면 볼륨이 변경됩니다."
		}
	},
	"disneyAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "디즈니 광고를 건너뛴 시간."
		}
	},
	"showYearSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "출시 연도를 표시합니다:"
		}
	},
	"showYearDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "등급 옆에 출시 연도를 표시합니다."
		}
	},
	"installPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "🎉 설치 완료! 🚀"
		}
	},
	"installThanks": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "스트리밍 기능을 설치해 주셔서 감사합니다! ❤️"
		}
	},
	"installTurnOnOptional": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모든 옵션 기능을 켭니다:"
		}
	},
	"tabsPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "올바른 설정을 자동으로 여는 데 필요합니다."
		}
	},
	"missingPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "누락된 권한이 감지됨"
		}
	},
	"addPermissionButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "추가하다"
		}
	},
	"removeGamesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "게임 제거 :"
		}
	},
	"removeGamesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "페이지에서 모든 게임을 제거합니다."
		}
	},
	"hideTitlesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "동영상 숨기기 버튼"
		}
	},
	"hideTitlesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "사용자가 수동으로 숨겼던 쇼를 자동으로 숨깁니다."
		}
	},
	"hiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "숨겨진 타이틀:"
		}
	},
	"removeAllHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모든 숨겨진 제목 제거"
		}
	},
	"crunchyrollDelay": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "건너뛰기 지연(ms)"
		}
	},
	"crunchyrollDelayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "일부 언어는 다른 언어보다 시간이 오래 걸립니다. 이 설정을 사용하면 일부 더빙에서 음성이 끊기지 않도록 인트로와 크레딧을 지연하여 건너뛸 수 있습니다."
		}
	},
	"switchLanguage": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "언어 전환:"
		}
	},
	"resetConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "설정을 재설정하려고 합니다.\n\n정말 이 작업을 수행하시겠습니까?"
		}
	},
	"invalidJson": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "업로드한 파일이 유효한 JSON 파일이 아닙니다."
		}
	},
	"improveUISwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "비디오 UI 개선"
		}
	},
	"improveUIDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "다양한 방식으로 개선된 동영상 플레이어 UI."
		}
	},
	"skipAfterCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "다음 에피소드로 건너뛰기:"
		}
	},
	"skipAfterCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "애프터 크레딧 장면을 자동으로 건너뛰고 다음 에피소드로 바로 이동합니다."
		}
	},
	"editRatings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "등급 임계값 및 색상을 편집합니다:"
		}
	},
	"pickColor": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "색상 선택"
		}
	},
	"pickRating": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "등급 선택 임계값"
		}
	},
	"reset": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "초기화"
		}
	},
	"dimLowRatingsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "디밍 낮은 등급"
		}
	},
	"dimLowRatingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "가장 낮은 등급으로 어둡게 표시합니다."
		}
	},
	"disabledSettingsOverviewTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "비활성화 설정 개요"
		}
	},
	"disabledSettingsOverviewDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 5,
					"i": 1
				},
				{
					"t": 3,
					"v": " 카테고리에서 "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " 설정을 비활성화했습니다."
				}
			]
		}
	},
	"hideHeaderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "플레이어에서 헤더 숨기기"
		}
	},
	"hideHeaderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "또한 동영상 플레이어에서 웹사이트 헤더를 숨깁니다."
		}
	},
	"hiddenTitlesNav": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "숨겨진 제목"
		}
	},
	"hiddenTitlesPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "숨겨진 제목"
		}
	},
	"hiddenTitlesPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "넷플릭스, 프라임 비디오, 디즈니+ 전반에 걸쳐 ‘탐색’ 탭에 표시되지 않도록 숨겨둔 타이틀을 관리하세요."
		}
	},
	"searchPlaceholder": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "제목 검색..."
		}
	},
	"platformFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "플랫폼"
		}
	},
	"mediaTypeFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "유형"
		}
	},
	"allPlatforms": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모든 플랫폼"
		}
	},
	"allTypes": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모든 유형"
		}
	},
	"unknownPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "알 수 없음"
		}
	},
	"sortDateAdded": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "등록일"
		}
	},
	"sortTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "제목"
		}
	},
	"sortPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "플랫폼"
		}
	},
	"viewIcon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "아이콘 보기"
		}
	},
	"viewList": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "상세 보기"
		}
	},
	"selectAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모두 선택"
		}
	},
	"unhide": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "표시"
		}
	},
	"unhideSelected": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "선택한 항목 표시 ("
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ")"
				}
			]
		}
	},
	"unhideAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모두 표시"
		}
	},
	"unhideAllConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "모든 플랫폼의 모든 제목을 표시하시겠습니까? 이 작업은 되돌릴 수 없습니다."
		}
	},
	"noHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "아직 숨겨진 제목은 없습니다."
		}
	},
	"movieType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "영화"
		}
	},
	"tvType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "TV 프로그램"
		}
	}
} }, { "pl": {
	"extensionName": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced: Netflix Disney+ Prime Video"
		}
	},
	"extensionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pomiń reklamy, wstępy, napisy końcowe i dostosuj prędkość itp. w serwisach Netflix, Prime Video, Disney+, Crunchyroll i HBO max."
		}
	},
	"settingsTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ustawienia - Streaming enhanced"
		}
	},
	"pageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced"
		}
	},
	"rateNow": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Oceń teraz!"
		}
	},
	"sharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ustawienia współdzielone"
		}
	},
	"sharedSettingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Te opcje włączą/wyłączą tylko część "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " współdzielonego ustawienia"
				}
			]
		}
	},
	"backup": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Backup"
		}
	},
	"statistics": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Statystyki"
		}
	},
	"changelog": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dziennik zmian"
		}
	},
	"donate": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Darowizna"
		}
	},
	"pageSpecificTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " Specyficzna"
			}]
		}
	},
	"defaultfilterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Usunięcie każdej płatnej kategorii filmów/seriali z Amazon Prime"
		}
	},
	"sharedPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Funkcje udostępnionego wideo"
		}
	},
	"sharedPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Opcje te włączą/wyłączą ustawienia tylko dla wszystkich usług streamingowych. W poniższej tabeli można wyłączyć współdzielone ustawienia dla określonej usługi."
		}
	},
	"skipIntroSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pomiń wprowadzenie:"
		}
	},
	"skipIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pomiń wstępy do wszystkich serii, z wyjątkiem pierwszego odcinka każdej serii."
		}
	},
	"skipCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pomiń kredyty:"
		}
	},
	"skipCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Przeskakiwanie do następnego odcinka każdej serii tak szybko, jak to możliwe."
		}
	},
	"skipAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pomiń reklamy:"
		}
	},
	"skipAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pomijanie reklam freevee dla amazon i wszystkich reklam w podstawowej warstwie Netflix."
		}
	},
	"speedSliderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dodaj kontrolę prędkości:"
		}
	},
	"speedSliderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dodanie suwaka regulacji prędkości"
		}
	},
	"sliderOptions": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Opcje suwaka: prędkość = wielkość kroku /10"
		}
	},
	"sliderStepSize": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wielkość kroku suwaka:"
		}
	},
	"sliderMin": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Suwak minimum:"
		}
	},
	"sliderMax": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Maksymalny suwak:"
		}
	},
	"sliderPreview": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Podgląd suwaka:"
		}
	},
	"playOnFullScreenSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Graj na pełnym ekranie:"
		}
	},
	"playOnFullScreenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Jeśli wideo zostanie wyświetlone na pełnym ekranie, będzie ono odtwarzane automatycznie."
		}
	},
	"selfAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pomiń reklamy własne:"
		}
	},
	"selfAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pomijanie podglądu głównego programu, który jest wyświetlany przed każdym filmem."
		}
	},
	"filterPaidSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Usuń płatne treści:"
		}
	},
	"filterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Usunięcie każdej płatnej kategorii filmów/seriali"
		}
	},
	"continuePositionSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Przenieś kategorię \"Kontynuuj\":"
		}
	},
	"continuePositionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Przeniesienie kategorii \"Kontynuuj\" na górę strony"
		}
	},
	"freeveeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pomiń reklamy Freevee:"
		}
	},
	"skipRecapSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pomiń podsumowania:"
		}
	},
	"skipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pomija podsumowania każdego programu"
		}
	},
	"skipBlockedSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ostrzeżenie o braku aktywności:"
		}
	},
	"skipBlockedDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wznawia odtwarzanie wideo, jeśli wyświetlany jest monit \"Czy nadal oglądasz\"."
		}
	},
	"profileSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Automatyczny wybór ostatniego profilu:"
		}
	},
	"profileDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ostatnio używany profil jest wybierany bezpośrednio po uruchomieniu strony"
		}
	},
	"user": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Użytkownik:"
		}
	},
	"statisticPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Statystyki"
		}
	},
	"skippedTime": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pominięty czas:"
		}
	},
	"amazonAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Czas pominiętych reklam FreeVee + reklamy własne Prime Video"
		}
	},
	"statisticAd": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " Ad:"
			}]
		}
	},
	"netflixAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Czas pominiętych reklam Netflix"
		}
	},
	"statisticIntro": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wprowadzenie:"
		}
	},
	"statisticIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Czas pominiętych intro w serwisach Netflix, Amazon i Disney+"
		}
	},
	"statisticRecap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Podsumowanie:"
		}
	},
	"statisticskipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Czas pominiętych podsumowań w serwisach Netflix, Amazon i Disney+"
		}
	},
	"statisticSegments": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pominięte segmenty:"
		}
	},
	"statisticSegmentsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Liczba pominiętych pojedynczych segmentów, takich jak intro lub reklama w serwisach Netflix, Amazon i Disney+"
		}
	},
	"importSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Import/eksport wszystkich ustawień"
		}
	},
	"saveSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zapisz ustawienia jako plik"
		}
	},
	"uploadSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ustawienia przesyłania:"
		}
	},
	"resetAddon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Przywróć domyślne ustawienia dodatku"
		}
	},
	"noWrap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "nowrap"
		}
	},
	"watchCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zawsze oglądaj końcowe:"
		}
	},
	"watchCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zawsze oglądaj napisy końcowe każdego serialu"
		}
	},
	"conflictingTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wszystkie sprzeczne funkcje"
		}
	},
	"showRatingSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ocena TMDB:"
		}
	},
	"showRatingDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dodawanie oceny TMDB do każdego filmu i serialu"
		}
	},
	"releaseCalendarSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dodaj opcje kalendarza wydań:"
		}
	},
	"releaseCalendarDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dodaje pola wyboru \"Pokaż tylko listy odtwarzania\" i \"Filtruj DUB\" do kalendarza wydań."
		}
	},
	"epilepsySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Opcja padaczki"
		}
	},
	"epilepsyDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Przyciemnianie ekranu podczas pomijania reklam"
		}
	},
	"userAgentSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Przełączanie na witryny stacjonarne"
		}
	},
	"userAgentDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dla prime video i disney+ zmień stronę na desktopową, a dla amazon zrób stronę przyjazną dla urządzeń mobilnych."
		}
	},
	"xraySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ukryj rentgen:"
		}
	},
	"xrayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ukryj szybki podgląd rentgenowski nad wideo"
		}
	},
	"feature": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Funkcja"
		}
	},
	"shared": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wszystkie"
		}
	},
	"openSharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Otwórz Ustawienia udostępnione"
		}
	},
	"autoOpenSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Automatycznie otwórz prawidłowe ustawienia:"
		}
	},
	"autoOpenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Jeśli na stronie streamingowej automatycznie otworzą się odpowiednie ustawienia w wyskakującym okienku"
		}
	},
	"duplicateSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Usuń zduplikowane pokazy:"
		}
	},
	"duplicateDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Usuń każdy zduplikowany program, który był już wcześniej widoczny w Disney. Widoczny oznacza, że program znajduje się w pierwszych 5 programach w każdym rzędzie."
		}
	},
	"watchSkippedButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Przewinąć?"
		}
	},
	"homeButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Strona główna"
		}
	},
	"bigPlayerSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wideo większe:"
		}
	},
	"bigPlayerDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rozszerza rozmiar wideo do całego okna przeglądarki bez pełnego ekranu."
		}
	},
	"doubleClickSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pełny ekran po dwukrotnym kliknięciu:"
		}
	},
	"doubleClickDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dwukrotne kliknięcie wideo spowoduje przejście do trybu pełnoekranowego."
		}
	},
	"scrollVolumeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Przewijanie głośności:"
		}
	},
	"scrollVolumeDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Przewijanie ikony dźwięku w górę lub w dół powoduje zmianę głośności."
		}
	},
	"disneyAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Czas pominiętych reklam Disneya."
		}
	},
	"showYearSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rok premiery programu:"
		}
	},
	"showYearDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pokazuje rok wydania obok oceny."
		}
	},
	"installPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "🎉 Zainstalowany! 🚀"
		}
	},
	"installThanks": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dziękujemy za zainstalowanie Streaming enhanced! ❤️"
		}
	},
	"installTurnOnOptional": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Włącz wszystkie opcjonalne funkcje:"
		}
	},
	"tabsPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "niezbędne do automatycznego otwarcia prawidłowych ustawień"
		}
	},
	"missingPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wykryto brakujące uprawnienia"
		}
	},
	"addPermissionButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dodaj"
		}
	},
	"removeGamesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Usuń gry:"
		}
	},
	"removeGamesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Usuwa wszystkie gry ze strony."
		}
	},
	"hideTitlesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Przycisk Ukryj film"
		}
	},
	"hideTitlesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Automatycznie ukrywa programy, które zostały ukryte ręcznie przez użytkownika."
		}
	},
	"hiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ukryte tytuły:"
		}
	},
	"removeAllHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Usuń wszystkie ukryte tytuły"
		}
	},
	"crunchyrollDelay": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Opóźnienie pominięcia w ms:"
		}
	},
	"crunchyrollDelayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "W niektórych językach trwa to dłużej niż w innych. To ustawienie pozwala pominąć intro i napisy końcowe z opóźnieniem, dzięki czemu w niektórych dubach mowa nie jest ucinana."
		}
	},
	"switchLanguage": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Switch Language:"
		}
	},
	"resetConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Chcesz zresetować ustawienia.\n\nCzy na pewno chcesz to zrobić?"
		}
	},
	"invalidJson": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Przesłany plik nie jest prawidłowym plikiem JSON."
		}
	},
	"improveUISwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ulepszony interfejs użytkownika wideo"
		}
	},
	"improveUIDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ulepszony interfejs odtwarzacza wideo na różne sposoby."
		}
	},
	"skipAfterCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Przejdź do następnego odcinka:"
		}
	},
	"skipAfterCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Automatycznie pomiń scenę po napisach końcowych i przejdź bezpośrednio do następnego odcinka."
		}
	},
	"editRatings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Edycja progów ocen i kolorów:"
		}
	},
	"pickColor": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wybierz kolor"
		}
	},
	"pickRating": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Próg oceny wyboru"
		}
	},
	"reset": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Reset"
		}
	},
	"dimLowRatingsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dimm Low Ratings"
		}
	},
	"dimLowRatingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Programy Dimm z najniższą oceną."
		}
	},
	"disabledSettingsOverviewTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Przegląd wyłączonych ustawień"
		}
	},
	"disabledSettingsOverviewDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " ustawień wyłączonych w "
				},
				{
					"t": 5,
					"i": 1
				},
				{
					"t": 3,
					"v": " kategoriach."
				}
			]
		}
	},
	"hideHeaderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ukryj nagłówek w odtwarzaczu"
		}
	},
	"hideHeaderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ukrywa również nagłówek witryny w odtwarzaczu wideo."
		}
	},
	"hiddenTitlesNav": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ukryte tytuły"
		}
	},
	"hiddenTitlesPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ukryte tytuły"
		}
	},
	"hiddenTitlesPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zarządzaj tytułami, których wyświetlanie w sekcji „Przeglądaj” ukryłeś w serwisach Netflix, Prime Video i Disney+."
		}
	},
	"searchPlaceholder": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wyszukaj tytuły..."
		}
	},
	"platformFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Platforma"
		}
	},
	"mediaTypeFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Typ"
		}
	},
	"allPlatforms": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wszystkie platformy"
		}
	},
	"allTypes": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wszystkie typy"
		}
	},
	"unknownPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Nieznane"
		}
	},
	"sortDateAdded": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Data dodania"
		}
	},
	"sortTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tytuł"
		}
	},
	"sortPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Platforma"
		}
	},
	"viewIcon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Widok ikon"
		}
	},
	"viewList": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Widok szczegółowy"
		}
	},
	"selectAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Zaznacz wszystko"
		}
	},
	"unhide": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pokaż"
		}
	},
	"unhideSelected": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Pokaż wybrane ("
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ")"
				}
			]
		}
	},
	"unhideAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pokaż wszystko"
		}
	},
	"unhideAllConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Wyświetlić wszystkie tytuły na wszystkich platformach? Nie można cofnąć tej czynności."
		}
	},
	"noHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Nie ma jeszcze ukrytych tytułów."
		}
	},
	"movieType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Film"
		}
	},
	"tvType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Program telewizyjny"
		}
	}
} }, { "pt": {
	"extensionName": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced: Netflix Disney+ Prime Video"
		}
	},
	"extensionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salte anúncios, introduções, créditos e ajuste a velocidade, etc. no Netflix, Prime video, Disney+, Crunchyroll e HBO max."
		}
	},
	"settingsTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Definições - Streaming enhanced"
		}
	},
	"pageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced"
		}
	},
	"rateNow": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Avaliar agora!"
		}
	},
	"sharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Definições partilhadas"
		}
	},
	"sharedSettingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Estas opções apenas activam/desactivam a parte "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " da definição partilhada"
				}
			]
		}
	},
	"backup": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Cópia de segurança"
		}
	},
	"statistics": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Estatísticas"
		}
	},
	"changelog": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Registo de alterações"
		}
	},
	"donate": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Doar"
		}
	},
	"pageSpecificTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " específico"
			}]
		}
	},
	"defaultfilterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remoção de todas as categorias de filmes/séries pagas do Amazon prime"
		}
	},
	"sharedPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Caraterísticas do vídeo partilhado"
		}
	},
	"sharedPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Estas opções só activam/desactivam as definições para todos os serviços de streaming. Na tabela abaixo, pode desativar as definições partilhadas para um serviço específico"
		}
	},
	"skipIntroSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar a introdução:"
		}
	},
	"skipIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar as introduções de todas as séries, exceto o primeiro episódio de cada série."
		}
	},
	"skipCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar Créditos:"
		}
	},
	"skipCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar para o episódio seguinte de cada série o mais rapidamente possível"
		}
	},
	"skipAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar anúncios:"
		}
	},
	"skipAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar os anúncios do freevee para a amazon e todos os anúncios do nível básico da Netflix"
		}
	},
	"speedSliderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adicionar Controlo de velocidade:"
		}
	},
	"speedSliderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adicionar um cursor de ajuste de velocidade"
		}
	},
	"sliderOptions": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Opções do seletor: velocidade = tamanho do passo /10"
		}
	},
	"sliderStepSize": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tamanho do passo do seletor:"
		}
	},
	"sliderMin": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mínimo do seletor:"
		}
	},
	"sliderMax": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Deslizador máximo:"
		}
	},
	"sliderPreview": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pré-visualização de diapositivos:"
		}
	},
	"playOnFullScreenSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Reproduzir em ecrã completo:"
		}
	},
	"playOnFullScreenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Se um vídeo for colocado em ecrã inteiro, o vídeo será reproduzido automaticamente"
		}
	},
	"selfAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar anúncios próprios:"
		}
	},
	"selfAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar as antevisões do programa principal que são apresentadas antes de qualquer vídeo"
		}
	},
	"filterPaidSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remover conteúdo pago:"
		}
	},
	"filterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remoção de todas as categorias de filmes/séries pagos"
		}
	},
	"continuePositionSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mover a categoria \"Continuar\":"
		}
	},
	"continuePositionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mover a categoria \"Continuar\" para o topo da página"
		}
	},
	"freeveeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar anúncios do Freevee:"
		}
	},
	"skipRecapSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar Recapitulações:"
		}
	},
	"skipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta as recapitulações de todos os espectáculos"
		}
	},
	"skipBlockedSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Aviso de inatividade do currículo:"
		}
	},
	"skipBlockedDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Retoma o vídeo se a mensagem \"Ainda está a ver\" for apresentada"
		}
	},
	"profileSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Seleção automática do último perfil:"
		}
	},
	"profileDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "O último perfil utilizado é escolhido diretamente quando a página é lançada"
		}
	},
	"user": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Utilizador:"
		}
	},
	"statisticPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Estatísticas"
		}
	},
	"skippedTime": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo saltado:"
		}
	},
	"amazonAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo de anúncios FreeVee ignorados + anúncios Prime Video Self"
		}
	},
	"statisticAd": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " Anúncio:"
			}]
		}
	},
	"netflixAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo de anúncios da Netflix ignorados"
		}
	},
	"statisticIntro": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Introdução:"
		}
	},
	"statisticIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo de introduções ignoradas na Netflix, Amazon e Disney+"
		}
	},
	"statisticRecap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Recapitulação:"
		}
	},
	"statisticskipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Recapitulações de Time of Skipped na Netflix, Amazon e Disney+"
		}
	},
	"statisticSegments": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Segmentos ignorados:"
		}
	},
	"statisticSegmentsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Quantidade de segmentos individuais saltados como uma introdução ou um anúncio para a Netflix, Amazon e Disney+"
		}
	},
	"importSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Importar/Exportar todas as definições"
		}
	},
	"saveSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Guardar definições como ficheiro"
		}
	},
	"uploadSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Carregar definições:"
		}
	},
	"resetAddon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Repor a predefinição da extensão"
		}
	},
	"noWrap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "nowrap"
		}
	},
	"watchCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ver sempre os créditos:"
		}
	},
	"watchCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ver sempre os créditos de todas as séries"
		}
	},
	"conflictingTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Todas as caraterísticas contraditórias"
		}
	},
	"showRatingSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Classificação TMDB:"
		}
	},
	"showRatingDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adicionar a classificação TMDB a todos os filmes e séries"
		}
	},
	"releaseCalendarSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adicionar opções de calendário de lançamento:"
		}
	},
	"releaseCalendarDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adiciona as caixas de verificação \"Mostrar apenas listas de reprodução\" e \"Filtrar DUB\" ao calendário de lançamentos"
		}
	},
	"epilepsySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Opção de epilepsia"
		}
	},
	"epilepsyDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Escurecer o ecrã quando saltar o anúncio"
		}
	},
	"userAgentSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mudar para sítios Web de secretária"
		}
	},
	"userAgentDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "No caso do Prime Video e do Disney+, mudar para o sítio Web para computador e, no caso da Amazon, tornar o sítio Web compatível com os telemóveis"
		}
	},
	"xraySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Esconder o raio X:"
		}
	},
	"xrayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ocultar a visualização rápida do raio X sobre um vídeo"
		}
	},
	"feature": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Funcionalidade"
		}
	},
	"shared": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Todos"
		}
	},
	"openSharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Abrir Definições Partilhadas"
		}
	},
	"autoOpenSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Abrir automaticamente as Definições corretas:"
		}
	},
	"autoOpenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Se estiver num sítio de transmissão, abra automaticamente as definições correspondentes na janela de contexto"
		}
	},
	"duplicateSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remover os programas duplicados:"
		}
	},
	"duplicateDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remover todos os espectáculos duplicados que já estavam visíveis na Disney anteriormente. Visível significa que o espetáculo está entre os primeiros 5 espectáculos de cada fila"
		}
	},
	"watchSkippedButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Rebobinar?"
		}
	},
	"homeButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Início"
		}
	},
	"bigPlayerSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vídeo maior:"
		}
	},
	"bigPlayerDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Aumenta o tamanho do vídeo para toda a janela do browser sem ecrã completo."
		}
	},
	"doubleClickSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ecrã completo com um duplo clique:"
		}
	},
	"doubleClickDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Se fizer duplo clique no vídeo, este passará para ecrã inteiro."
		}
	},
	"scrollVolumeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Deslocação para o volume:"
		}
	},
	"scrollVolumeDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Deslocar-se para cima ou para baixo no ícone de som altera o volume."
		}
	},
	"disneyAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo de saltar anúncios da Disney."
		}
	},
	"showYearSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ano de lançamento do espetáculo:"
		}
	},
	"showYearDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostra o ano de lançamento ao lado da classificação."
		}
	},
	"installPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "🎉 Instalado! 🚀"
		}
	},
	"installThanks": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Obrigado por instalar o Streaming enhanced! ❤️"
		}
	},
	"installTurnOnOptional": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ativar todas as caraterísticas opcionais:"
		}
	},
	"tabsPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "necessário para a abertura automática das definições corretas"
		}
	},
	"missingPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Detectadas permissões em falta"
		}
	},
	"addPermissionButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adicionar"
		}
	},
	"removeGamesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remover jogos:"
		}
	},
	"removeGamesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remove todos os jogos da página."
		}
	},
	"hideTitlesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Botão Ocultar filme"
		}
	},
	"hideTitlesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ocultar shows automaticamente, que foram ocultos pelo usuário manualmente."
		}
	},
	"hiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Títulos ocultos:"
		}
	},
	"removeAllHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remova todos os títulos ocultos"
		}
	},
	"crunchyrollDelay": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Atraso de salto em ms:"
		}
	},
	"crunchyrollDelayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Algumas línguas demoram mais tempo do que outras. Esta definição permite-lhe saltar a introdução e os créditos com um atraso de modo a que, em algumas dublagens, o discurso não seja cortado."
		}
	},
	"switchLanguage": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mudar de idioma:"
		}
	},
	"resetConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pretende repor as Definições.\n\nTem a certeza de que quer fazer isto?"
		}
	},
	"invalidJson": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "O ficheiro que carregou não é um ficheiro JSON válido."
		}
	},
	"improveUISwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Melhorar a IU de vídeo"
		}
	},
	"improveUIDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "IU do leitor de vídeo melhorada de várias formas."
		}
	},
	"skipAfterCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passar para o próximo episódio:"
		}
	},
	"skipAfterCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta automaticamente a cena após os créditos e passa diretamente para o episódio seguinte."
		}
	},
	"editRatings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Editar limiares e cores da classificação:"
		}
	},
	"pickColor": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Escolher cor"
		}
	},
	"pickRating": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Limiar de classificação da escolha"
		}
	},
	"reset": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Reiniciar"
		}
	},
	"dimLowRatingsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dimm Low Ratings"
		}
	},
	"dimLowRatingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Programas Dimm com a classificação mais baixa."
		}
	},
	"disabledSettingsOverviewTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vista geral das definições de desativação"
		}
	},
	"disabledSettingsOverviewDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " definições desactivadas em "
				},
				{
					"t": 5,
					"i": 1
				},
				{
					"t": 3,
					"v": " categorias."
				}
			]
		}
	},
	"hideHeaderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ocultar cabeçalho no jogador"
		}
	},
	"hideHeaderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Também oculta o cabeçalho do Website no leitor de vídeo."
		}
	},
	"hiddenTitlesNav": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Títulos ocultos"
		}
	},
	"hiddenTitlesPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Títulos ocultos"
		}
	},
	"hiddenTitlesPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Gestione os títulos que ocultou para que não apareçam nas listas de sugestões, na Netflix, no Prime Video e na Disney+."
		}
	},
	"searchPlaceholder": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pesquisar títulos..."
		}
	},
	"platformFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Plataforma"
		}
	},
	"mediaTypeFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tipo"
		}
	},
	"allPlatforms": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Todas as plataformas"
		}
	},
	"allTypes": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Todos os tipos"
		}
	},
	"unknownPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Desconhecido"
		}
	},
	"sortDateAdded": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Data adicionada"
		}
	},
	"sortTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Título"
		}
	},
	"sortPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Plataforma"
		}
	},
	"viewIcon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Visualização de ícones"
		}
	},
	"viewList": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Visualização detalhada"
		}
	},
	"selectAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Selecionar tudo"
		}
	},
	"unhide": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostrar"
		}
	},
	"unhideSelected": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Mostrar selecionado ("
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ")"
				}
			]
		}
	},
	"unhideAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostrar tudo"
		}
	},
	"unhideAllConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostrar todos os títulos em todas as plataformas? Isto não pode ser desfeito."
		}
	},
	"noHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ainda não há títulos ocultos."
		}
	},
	"movieType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Filme"
		}
	},
	"tvType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Programa de TV"
		}
	}
} }, { "pt_BR": {
	"extensionName": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Extensão de aprimoramento de serviços de streaming Netflix Disney Prime Video"
		}
	},
	"extensionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pule anúncios, introduções, créditos e ajuste a velocidade... na Netflix, Prime Video, Disney+, Crunchyroll e HBO Max."
		}
	},
	"settingsTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Configurações - aprimoramento de serviços de streaming"
		}
	},
	"pageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Aprimorador de transmissão"
		}
	},
	"rateNow": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Avalie agora!"
		}
	},
	"sharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Configurações compartilhadas"
		}
	},
	"sharedSettingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Essas opções só serão ativadas/desativas a partir de "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " da configuração compartilhada"
				}
			]
		}
	},
	"backup": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Cópia de segurança"
		}
	},
	"statistics": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Estatísticas"
		}
	},
	"changelog": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Registro de mudanças"
		}
	},
	"donate": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Doar"
		}
	},
	"pageSpecificTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}]
		}
	},
	"defaultfilterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remove todas as categorias de filmes/séries pagos do Amazon Prime"
		}
	},
	"sharedPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Recursos de vídeo compartilhado"
		}
	},
	"sharedPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Essas opções serão ativadas ou desativadas para todas os serviços de streaming. Na tabela abaixo, você pode desativar as configurações compartilhadas de um serviço específico."
		}
	},
	"skipIntroSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pular a introdução:"
		}
	},
	"skipIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saltar as introduções de todas as séries, exceto o primeiro episódio de cada série."
		}
	},
	"skipCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ignorar créditos:"
		}
	},
	"skipCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pular para o próximo episódio de cada série o mais rápido possível"
		}
	},
	"skipAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ignorar anúncios:"
		}
	},
	"skipAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ignorando os anúncios da Amazon e todos os anúncios no nível básico da Netflix"
		}
	},
	"speedSliderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adicionar controle de velocidade:"
		}
	},
	"speedSliderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adição de um controle deslizante de ajuste de velocidade."
		}
	},
	"sliderOptions": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Opções do controle deslizante: velocidade = quadro a quadro /10"
		}
	},
	"sliderStepSize": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Quantidade de quadros:"
		}
	},
	"sliderMin": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Controle mínimo:"
		}
	},
	"sliderMax": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Controle máximo:"
		}
	},
	"sliderPreview": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Visualização do controle deslizante:"
		}
	},
	"playOnFullScreenSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Reproduzir em tela cheia:"
		}
	},
	"playOnFullScreenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Se um vídeo for colocado em tela cheia, ele será reproduzido automaticamente"
		}
	},
	"selfAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ignorar anúncios direcionados:"
		}
	},
	"selfAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ignorar as prévias do programa principal que são exibidas antes de qualquer vídeo"
		}
	},
	"filterPaidSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remover conteúdo pago:"
		}
	},
	"filterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remoção de todas as categorias de filmes e séries pagos"
		}
	},
	"continuePositionSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mover categoria \"Continuar\":"
		}
	},
	"continuePositionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mova a categoria \"Continuar\" para o topo da página"
		}
	},
	"freeveeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ignorar anúncios:"
		}
	},
	"skipRecapSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ignorar recapitulações:"
		}
	},
	"skipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pula as recapitulações de todos os programas"
		}
	},
	"skipBlockedSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Aviso de retorno por inatividade:"
		}
	},
	"skipBlockedDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Reiniciar o vídeo se a mensagem (você ainda está assistindo) for exibida"
		}
	},
	"profileSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Seleção automática do último perfil:"
		}
	},
	"profileDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "O último perfil da usado é escolhido diretamente quando a página é iniciada"
		}
	},
	"user": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Usuário:"
		}
	},
	"statisticPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Estatísticas"
		}
	},
	"skippedTime": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo ignorado:"
		}
	},
	"amazonAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo de anúncios pulados + auto promoções do Prime Video"
		}
	},
	"statisticAd": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " Ad:"
			}]
		}
	},
	"netflixAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo de anúncios ignorados da Netflix"
		}
	},
	"statisticIntro": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Introdução:"
		}
	},
	"statisticIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo de introduções puladas na Netflix, Amazon e Disney+"
		}
	},
	"statisticRecap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Recapitulação:"
		}
	},
	"statisticskipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo de recapitulações puladas na Netflix, Amazon e Disney+"
		}
	},
	"statisticSegments": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Segmentos ignorados:"
		}
	},
	"statisticSegmentsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Quantidade de segmentos individuais ignorados como introdução ou um anúncio da Netflix, Amazon e Disney+"
		}
	},
	"importSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Importar ou exportar configurações"
		}
	},
	"saveSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salvar configurações para um arquivo"
		}
	},
	"uploadSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Carregar configurações:"
		}
	},
	"resetAddon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Redefinir a extensão para o padrão"
		}
	},
	"noWrap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "nowrap"
		}
	},
	"watchCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ver sempre os créditos:"
		}
	},
	"watchCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sempre assistir aos créditos de todas as séries"
		}
	},
	"conflictingTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Todos os recursos conflitantes"
		}
	},
	"showRatingSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Classificações TMDB:"
		}
	},
	"showRatingDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adiciona a classificação do TMDB a todos os filmes e séries"
		}
	},
	"releaseCalendarSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Incluir calendário de lançamento:"
		}
	},
	"releaseCalendarDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adiciona as caixas de seleção \"Mostrar somente listas de reprodução\" e \"Filtrar\" ao calendário de lançamentos"
		}
	},
	"epilepsySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Opção de epilepsia"
		}
	},
	"epilepsyDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Escurecer a tela ao pular o anúncio"
		}
	},
	"userAgentSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mudar para versão PC"
		}
	},
	"userAgentDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Para o Prime Video e Disney+, mude para a versão de desktop, Amazon, torne o site compatível com dispositivos móveis"
		}
	},
	"xraySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ocultar raioX:"
		}
	},
	"xrayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ocultar a visualização rápida do raio Xray da tela"
		}
	},
	"feature": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Recurso"
		}
	},
	"shared": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Todos"
		}
	},
	"openSharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Abrir configurações compartilhadas"
		}
	},
	"autoOpenSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Abrir automaticamente as configurações:"
		}
	},
	"autoOpenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Se estiver em um site de streaming, uma janela será aberta"
		}
	},
	"duplicateSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remover programas duplicados:"
		}
	},
	"duplicateDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remover todos os programas duplicados, que já estavam visíveis na Disney anteriormente. Visível significa que o programa está entre os primeiros 5 programas em cada linha"
		}
	},
	"watchSkippedButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Retroceder?"
		}
	},
	"homeButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Início"
		}
	},
	"bigPlayerSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vídeo extendido:"
		}
	},
	"bigPlayerDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Estende o tamanho do vídeo para toda a janela do navegador sem ser em modo tela cheia."
		}
	},
	"doubleClickSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Duplo clique para tela cheia:"
		}
	},
	"doubleClickDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Se você clicar duas vezes no vídeo, ele será exibido em tela cheia."
		}
	},
	"scrollVolumeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Deslocamento de volume:"
		}
	},
	"scrollVolumeDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Deslocar-se para cima ou para baixo no ícone de som altera o volume."
		}
	},
	"disneyAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tempo de saltar anúncios da Disney."
		}
	},
	"showYearSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ano de lançamento:"
		}
	},
	"showYearDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostra o ano de lançamento ao lado da classificação."
		}
	},
	"installPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "🎉 Instalado! 🚀"
		}
	},
	"installThanks": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Obrigado por instalar o Aprimorador de transmissão! ❤️"
		}
	},
	"installTurnOnOptional": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ativar todas as melhorias opcionais:"
		}
	},
	"tabsPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "necessário para a abertura automática das definições corretas"
		}
	},
	"missingPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Permissões importantes ausentes"
		}
	},
	"addPermissionButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Adicionar"
		}
	},
	"removeGamesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remover jogos:"
		}
	},
	"removeGamesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remove todos os jogos da página."
		}
	},
	"hideTitlesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Botão ocultar filme"
		}
	},
	"hideTitlesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ocultar shows automaticamente, que foram escondidos pelo usuário manualmente."
		}
	},
	"hiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Títulos ocultos:"
		}
	},
	"removeAllHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Remova todos os títulos ocultos"
		}
	},
	"crunchyrollDelay": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Atraso de salto em ms:"
		}
	},
	"crunchyrollDelayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Algumas línguas demoram mais tempo do que outras. Esta definição permite-lhe saltar a introdução e os créditos com um atraso de modo a que, em algumas dublagens, o discurso não seja cortado."
		}
	},
	"switchLanguage": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mudar de idioma:"
		}
	},
	"resetConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pretende repor as configurações.\n\nTem certeza de que deseja fazer isto?"
		}
	},
	"invalidJson": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "O arquivo que carregou não é um arquivo JSON válido."
		}
	},
	"improveUISwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Melhorar a interface de vídeo"
		}
	},
	"improveUIDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "interface do reprodutor de vídeo melhorada de várias maneiras."
		}
	},
	"skipAfterCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Passar para o próximo episódio:"
		}
	},
	"skipAfterCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Salta automaticamente a cena após os créditos e passa diretamente para o episódio seguinte."
		}
	},
	"editRatings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Editar limites de cores de classificação:"
		}
	},
	"pickColor": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Escolher cor"
		}
	},
	"pickRating": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Escolha um limite de classificação"
		}
	},
	"reset": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Reiniciar"
		}
	},
	"dimLowRatingsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Opções para classificações baixas"
		}
	},
	"dimLowRatingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Programas Dimm com a classificação mais baixa."
		}
	},
	"disabledSettingsOverviewTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vista geral das definições de desativação"
		}
	},
	"disabledSettingsOverviewDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " definições desactivadas em "
				},
				{
					"t": 5,
					"i": 1
				},
				{
					"t": 3,
					"v": " categorias."
				}
			]
		}
	},
	"hideHeaderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ocultar cabeçalho no jogador"
		}
	},
	"hideHeaderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Também oculta o cabeçalho do Website no leitor de vídeo."
		}
	},
	"hiddenTitlesNav": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Títulos ocultos"
		}
	},
	"hiddenTitlesPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Títulos ocultos"
		}
	},
	"hiddenTitlesPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Gestione os títulos que ocultou para que não apareçam nas listas de sugestões, na Netflix, no Prime Video e na Disney+."
		}
	},
	"searchPlaceholder": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Pesquisar títulos..."
		}
	},
	"platformFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Plataforma"
		}
	},
	"mediaTypeFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tipo"
		}
	},
	"allPlatforms": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Todas as plataformas"
		}
	},
	"allTypes": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Todos os tipos"
		}
	},
	"unknownPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Desconhecido"
		}
	},
	"sortDateAdded": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Data adicionada"
		}
	},
	"sortTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Título"
		}
	},
	"sortPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Plataforma"
		}
	},
	"viewIcon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Visualização de ícones"
		}
	},
	"viewList": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Visualização detalhada"
		}
	},
	"selectAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Selecionar tudo"
		}
	},
	"unhide": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostrar"
		}
	},
	"unhideSelected": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Mostrar selecionado ("
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ")"
				}
			]
		}
	},
	"unhideAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostrar tudo"
		}
	},
	"unhideAllConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mostrar todos os títulos em todas as plataformas? Isto não pode ser desfeito."
		}
	},
	"noHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ainda não há títulos ocultos."
		}
	},
	"movieType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Filme"
		}
	},
	"tvType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Programa de TV"
		}
	}
} }, { "sv": {
	"extensionName": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced: Netflix Disney+ Prime Video"
		}
	},
	"extensionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppa över annonser, intron, eftertexter och justera hastighet m.m. på Netflix, Prime video, Disney+, Crunchyroll och HBO max."
		}
	},
	"settingsTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Inställningar - Streaming enhanced"
		}
	},
	"pageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced"
		}
	},
	"rateNow": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Betygsätt nu!"
		}
	},
	"sharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Delade inställningar"
		}
	},
	"sharedSettingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Dessa alternativ aktiverar/avaktiverar endast "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": "-delen av den delade inställningen"
				}
			]
		}
	},
	"backup": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Säkerhetskopiering"
		}
	},
	"statistics": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Statistik"
		}
	},
	"changelog": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Changelog"
		}
	},
	"donate": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Donera"
		}
	},
	"pageSpecificTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " specifik"
			}]
		}
	},
	"defaultfilterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ta bort alla betalda film- och seriekategorier från Amazon Prime"
		}
	},
	"sharedPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Funktioner för delad video"
		}
	},
	"sharedPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dessa alternativ aktiverar/inaktiverar endast inställningarna för alla streamingtjänster. I tabellen nedan kan du inaktivera de delade inställningarna för en specifik tjänst"
		}
	},
	"skipIntroSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppa över intro:"
		}
	},
	"skipIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppa över intron för alla serier, utom det första avsnittet i varje serie."
		}
	},
	"skipCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppa över krediter:"
		}
	},
	"skipCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppa till nästa avsnitt i varje serie så snabbt som möjligt"
		}
	},
	"skipAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppa över annonser:"
		}
	},
	"skipAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppa över freevee-annonser för Amazon och alla annonser i den grundläggande Netflix-nivån"
		}
	},
	"speedSliderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Lägg till Speed control:"
		}
	},
	"speedSliderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Lägga till ett reglage för hastighetsjustering"
		}
	},
	"sliderOptions": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slider-alternativ: hastighet = stegstorlek /10"
		}
	},
	"sliderStepSize": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skjutreglagets stegstorlek:"
		}
	},
	"sliderMin": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slider minimum:"
		}
	},
	"sliderMax": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slider maximalt:"
		}
	},
	"sliderPreview": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Förhandsgranskning av slider:"
		}
	},
	"playOnFullScreenSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Spela på helskärm:"
		}
	},
	"playOnFullScreenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Om en video läggs i helskärmsläge spelas videon upp automatiskt"
		}
	},
	"selfAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppa över självannonser:"
		}
	},
	"selfAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppa över förhandsvisningarna av prime show som visas före varje video"
		}
	},
	"filterPaidSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ta bort betalt innehåll:"
		}
	},
	"filterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ta bort alla kategorier för betalda filmer/serier"
		}
	},
	"continuePositionSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Flytta kategori \"Fortsätt\":"
		}
	},
	"continuePositionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Flytta kategorin \"Fortsätt\" till toppen av sidan"
		}
	},
	"freeveeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppa över Freevee-annonser:"
		}
	},
	"skipRecapSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppa över sammanfattningar:"
		}
	},
	"skipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppar över sammanfattningar av varje program"
		}
	},
	"skipBlockedSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Varning för inaktivitet vid återupptagning:"
		}
	},
	"skipBlockedDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Återupptar videon om meddelandet \"Tittar du fortfarande?\" visas"
		}
	},
	"profileSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Välj automatiskt den senaste profilen:"
		}
	},
	"profileDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Den senast använda profilen väljs direkt när sidan startas"
		}
	},
	"user": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Användare:"
		}
	},
	"statisticPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Statistik"
		}
	},
	"skippedTime": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppade över tid:"
		}
	},
	"amazonAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tid för överhoppade FreeVee-annonser + Prime Video självannonser"
		}
	},
	"statisticAd": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " Annons:"
			}]
		}
	},
	"netflixAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tid för överhoppade Netflix-annonser"
		}
	},
	"statisticIntro": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Intro:"
		}
	},
	"statisticIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tid för överhoppade intron på Netflix, Amazon och Disney+"
		}
	},
	"statisticRecap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sammanställning:"
		}
	},
	"statisticskipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Time of skipped Återblickar på Netflix, Amazon och Disney+"
		}
	},
	"statisticSegments": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Överhoppade segment:"
		}
	},
	"statisticSegmentsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mängden enskilda segment som hoppats över som ett intro eller en annons för Netflix, Amazon och Disney+"
		}
	},
	"importSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Importera/exportera alla inställningar"
		}
	},
	"saveSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Spara inställningar som fil"
		}
	},
	"uploadSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ladda upp inställningar:"
		}
	},
	"resetAddon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Återställ Addon till standard"
		}
	},
	"noWrap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "nurap"
		}
	},
	"watchCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Titta alltid på eftertexterna:"
		}
	},
	"watchCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Titta alltid på eftertexterna i varje serie"
		}
	},
	"conflictingTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alla motstridiga funktioner"
		}
	},
	"showRatingSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "TMDB Betyg:"
		}
	},
	"showRatingDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Lägga till TMDB-betyg för varje film och serie"
		}
	},
	"releaseCalendarSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Lägg till alternativ för Release Calendar:"
		}
	},
	"releaseCalendarDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Lägger till kryssrutorna \"Visa endast spellistor\" och \"Filtrera DUB\" i releasekalendern"
		}
	},
	"epilepsySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alternativ för epilepsi"
		}
	},
	"epilepsyDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Mörka skärmen när du hoppar över annonsen"
		}
	},
	"userAgentSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Byt till desktop-webbplatser"
		}
	},
	"userAgentDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "För prime video och disney+ byt till Desktop-webbplatsen och för amazon gör webbplatsen mobilvänlig"
		}
	},
	"xraySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Göm röntgen:"
		}
	},
	"xrayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dölj snabbvisningen för röntgen över en video"
		}
	},
	"feature": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Funktion"
		}
	},
	"shared": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alla"
		}
	},
	"openSharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Öppna delade inställningar"
		}
	},
	"autoOpenSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Öppna automatiskt korrekta inställningar:"
		}
	},
	"autoOpenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Om du är på en streamingwebbplats öppnas motsvarande inställningar automatiskt i popup-fönstret"
		}
	},
	"duplicateSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ta bort duplicerade program:"
		}
	},
	"duplicateDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ta bort alla dubbletter av program som redan tidigare var synliga på Disney. Synlig innebär att programmet finns bland de 5 första programmen i varje rad"
		}
	},
	"watchSkippedButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Spola tillbaka?"
		}
	},
	"homeButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hem"
		}
	},
	"bigPlayerSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Video större:"
		}
	},
	"bigPlayerDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Utökar videostorleken till hela webbläsarfönstret utan helskärm."
		}
	},
	"doubleClickSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Fullskärm genom att dubbelklicka:"
		}
	},
	"doubleClickDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Om du dubbelklickar på videon kommer den att visas i helskärm."
		}
	},
	"scrollVolumeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Bläddra för volym:"
		}
	},
	"scrollVolumeDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Om du bläddrar upp eller ner på ljudikonen ändras volymen."
		}
	},
	"disneyAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tid för överhoppade Disney-annonser."
		}
	},
	"showYearSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Visa utgivningsår:"
		}
	},
	"showYearDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Visar utgivningsåret bredvid klassificeringen."
		}
	},
	"installPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "🎉 Installerad! 🚀"
		}
	},
	"installThanks": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tack för att du installerade Streaming enhanced! ❤️"
		}
	},
	"installTurnOnOptional": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Slå på alla tillvalsfunktioner:"
		}
	},
	"tabsPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "nödvändigt för automatisk öppning av rätt inställningar"
		}
	},
	"missingPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Saknade behörigheter upptäckta"
		}
	},
	"addPermissionButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Lägg till"
		}
	},
	"removeGamesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ta bort spel:"
		}
	},
	"removeGamesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tar bort alla spel från sidan."
		}
	},
	"hideTitlesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Göm film-knappen"
		}
	},
	"hideTitlesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dölj automatiskt program som användaren har dolt manuellt."
		}
	},
	"hiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dolda titlar:"
		}
	},
	"removeAllHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ta bort alla dolda titlar"
		}
	},
	"crunchyrollDelay": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Fördröjning av hopp i ms:"
		}
	},
	"crunchyrollDelayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Vissa språk tar längre tid än andra. Med den här inställningen kan du hoppa över intro och eftertexter med en fördröjning som gör att talet inte avbryts i vissa dubbningar."
		}
	},
	"switchLanguage": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Växla Språk:"
		}
	},
	"resetConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Du vill återställa inställningarna.\n\nÄr du säker på att du vill göra detta?"
		}
	},
	"invalidJson": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Den fil du laddade upp är inte en giltig JSON-fil."
		}
	},
	"improveUISwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Förbättra användargränssnittet för video"
		}
	},
	"improveUIDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Förbättrat användargränssnittet för videospelare på olika sätt."
		}
	},
	"skipAfterCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppa till nästa avsnitt:"
		}
	},
	"skipAfterCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hoppa automatiskt över eftertextscenen och gå direkt till nästa avsnitt."
		}
	},
	"editRatings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Redigera tröskelvärden och färger för Rating:"
		}
	},
	"pickColor": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Välj färg"
		}
	},
	"pickRating": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Välj betygsgräns"
		}
	},
	"reset": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Återställning"
		}
	},
	"dimLowRatingsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dimm låg betyg"
		}
	},
	"dimLowRatingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dimm-program med lägst betyg."
		}
	},
	"disabledSettingsOverviewTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Översikt över inaktiverade inställningar"
		}
	},
	"disabledSettingsOverviewDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " inställningar inaktiverade i "
				},
				{
					"t": 5,
					"i": 1
				},
				{
					"t": 3,
					"v": " kategorier."
				}
			]
		}
	},
	"hideHeaderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dölj sidhuvudet på spelaren"
		}
	},
	"hideHeaderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Döljer även webbplatsens rubrik på videospelaren."
		}
	},
	"hiddenTitlesNav": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dolda titlar"
		}
	},
	"hiddenTitlesPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dolda titlar"
		}
	},
	"hiddenTitlesPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hantera de titlar som du har dolt så att de inte visas i bläddringsraderna på Netflix, Prime Video och Disney+."
		}
	},
	"searchPlaceholder": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sök i titlar..."
		}
	},
	"platformFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Plattform"
		}
	},
	"mediaTypeFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Typ"
		}
	},
	"allPlatforms": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alla plattformar"
		}
	},
	"allTypes": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Alla typer"
		}
	},
	"unknownPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Okänt"
		}
	},
	"sortDateAdded": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Datum för tillägg"
		}
	},
	"sortTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Titel"
		}
	},
	"sortPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Plattform"
		}
	},
	"viewIcon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ikonvy"
		}
	},
	"viewList": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Detaljvy"
		}
	},
	"selectAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Markera allt"
		}
	},
	"unhide": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Visa"
		}
	},
	"unhideSelected": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Visa valda ("
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ")"
				}
			]
		}
	},
	"unhideAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Visa alla"
		}
	},
	"unhideAllConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Visa alla titlar på alla plattformar? Det här går inte att ångra."
		}
	},
	"noHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Inga dolda titlar ännu."
		}
	},
	"movieType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Film"
		}
	},
	"tvType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "TV-program"
		}
	}
} }, { "tr": {
	"extensionName": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced: Netflix Disney+ Prime Video"
		}
	},
	"extensionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix, Prime video, Disney+, Crunchyroll ve HBO max'te reklamları, introları, jenerikleri atlayın ve hız ayarı vb. ekleyin."
		}
	},
	"settingsTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ayarlar - Streaming enhanced"
		}
	},
	"pageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced"
		}
	},
	"rateNow": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Şimdi değerlendirin!"
		}
	},
	"sharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Paylaşılan Ayarlar"
		}
	},
	"sharedSettingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Bu seçenekler yalnızca paylaşılan ayarın "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " kısmını etkinleştirir/devre dışı bırakır"
				}
			]
		}
	},
	"backup": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Yedekleme"
		}
	},
	"statistics": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "İstatistikler"
		}
	},
	"changelog": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Değişiklik Günlüğü"
		}
	},
	"donate": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Bağış Yapın"
		}
	},
	"pageSpecificTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " özel"
			}]
		}
	},
	"defaultfilterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Amazon Prime'dan tüm ücretli film/dizi kategorilerinin kaldırılması"
		}
	},
	"sharedPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Paylaşılan Video özellikleri"
		}
	},
	"sharedPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Bu seçenekler yalnızca tüm akış hizmetleri için ayarları etkinleştirir/devre dışı bırakır. Aşağıdaki tabloda belirli bir hizmet için paylaşılan ayarları devre dışı bırakabilirsiniz"
		}
	},
	"skipIntroSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Giriş Atlayın:"
		}
	},
	"skipIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Her serinin ilk bölümü hariç tüm serilerin girişlerini atlayın."
		}
	},
	"skipCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip Credits:"
		}
	},
	"skipCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Her dizinin bir sonraki bölümüne olabildiğince hızlı atlamak"
		}
	},
	"skipAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Reklamları atla:"
		}
	},
	"skipAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Amazon için freevee reklamlarını ve temel Netflix katmanındaki tüm reklamları atlamak"
		}
	},
	"speedSliderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hız kontrolü ekleyin:"
		}
	},
	"speedSliderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hız ayarlama sürgüsü ekleme"
		}
	},
	"sliderOptions": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Kaydırıcı seçenekleri: hız = adım boyutu /10"
		}
	},
	"sliderStepSize": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Kaydırıcı adım boyutu:"
		}
	},
	"sliderMin": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Kaydırıcı minimum:"
		}
	},
	"sliderMax": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Kaydırıcı maksimum:"
		}
	},
	"sliderPreview": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Kaydırıcı önizlemesi:"
		}
	},
	"playOnFullScreenSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tam ekranda oynatın:"
		}
	},
	"playOnFullScreenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Bir video tam ekrana getirilirse, video otomatik olarak oynatılır"
		}
	},
	"selfAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Kendi Reklamlarını Atla:"
		}
	},
	"selfAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Herhangi bir videodan önce gösterilen ana program önizlemelerini atlama"
		}
	},
	"filterPaidSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ücretli içeriği kaldırın:"
		}
	},
	"filterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tüm ücretli film/dizi kategorilerinin kaldırılması"
		}
	},
	"continuePositionSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "\"Devam\" kategorisine taşıyın:"
		}
	},
	"continuePositionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "\"Devam\" kategorisini sayfanın en üstüne taşıyın"
		}
	},
	"freeveeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Freevee Reklamlarını Atla:"
		}
	},
	"skipRecapSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Skip Recaps:"
		}
	},
	"skipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Her gösterinin özetini atlar"
		}
	},
	"skipBlockedSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Hareketsizlik uyarısına devam edin:"
		}
	},
	"skipBlockedDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "'Hala izliyor musunuz' uyarısı gösterilirse videoyu devam ettirir"
		}
	},
	"profileSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Son profili otomatik seç:"
		}
	},
	"profileDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sayfa başlatıldığında en son kullanılan profil doğrudan seçilir"
		}
	},
	"user": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Kullanıcı:"
		}
	},
	"statisticPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "İstatistikler"
		}
	},
	"skippedTime": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Atlanan zaman:"
		}
	},
	"amazonAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Atlanan FreeVee Reklamlarının Süresi + Prime Video Self Reklamları"
		}
	},
	"statisticAd": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " Reklam:"
			}]
		}
	},
	"netflixAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Atlanan Netflix Reklamlarının Süresi"
		}
	},
	"statisticIntro": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Giriş:"
		}
	},
	"statisticIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix, Amazon ve Disney+'ta atlanan tanıtımların zamanı"
		}
	},
	"statisticRecap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Özet:"
		}
	},
	"statisticskipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix, Amazon ve Disney+'ta Atlanan Özetler Zamanı"
		}
	},
	"statisticSegments": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Atlanan bölümler:"
		}
	},
	"statisticSegmentsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix, Amazon ve Disney+ için Giriş veya Reklam Gibi Atlanan Bireysel Bölümlerin Miktarı"
		}
	},
	"importSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tüm Ayarları İçe/Dışa Aktar"
		}
	},
	"saveSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ayarları dosya olarak kaydet"
		}
	},
	"uploadSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Yükleme ayarları:"
		}
	},
	"resetAddon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Eklentiyi varsayılana sıfırla"
		}
	},
	"noWrap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "nowrap"
		}
	},
	"watchCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Her zaman jeneriği izleyin:"
		}
	},
	"watchCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Her dizinin jeneriğini mutlaka izleyin"
		}
	},
	"conflictingTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tüm çelişkili özellikler"
		}
	},
	"showRatingSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "TMDB Değerlendirmesi:"
		}
	},
	"showRatingDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Her film ve diziye TMDB derecelendirmesinin eklenmesi"
		}
	},
	"releaseCalendarSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Yayın Takvimi seçenekleri ekleyin:"
		}
	},
	"releaseCalendarDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Yayın takvimine 'Yalnızca Çalma Listelerini Göster' ve 'DUB'ı Filtrele' onay kutularını ekler"
		}
	},
	"epilepsySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Epilepsi seçeneği"
		}
	},
	"epilepsyDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Reklamı atlarken ekranı karartın"
		}
	},
	"userAgentSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Masaüstü web sitelerine geçiş yapın"
		}
	},
	"userAgentDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Prime video ve disney+ için Masaüstü web sitesine geçin ve amazon için siteyi mobil uyumlu hale getirin"
		}
	},
	"xraySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Xray'i sakla:"
		}
	},
	"xrayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Xray Hızlı Görünümünü bir video üzerinde gizleme"
		}
	},
	"feature": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Özellik"
		}
	},
	"shared": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tümü"
		}
	},
	"openSharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Paylaşılan Ayarları Açın"
		}
	},
	"autoOpenSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Doğru Ayarları otomatik olarak aç:"
		}
	},
	"autoOpenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Akış sitesindeyse, açılır pencerede otomatik olarak uygun ayarları açın"
		}
	},
	"duplicateSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Yinelenen Gösterileri kaldırın:"
		}
	},
	"duplicateDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Daha önce Disney'de zaten görünür olan her yinelenen gösteriyi kaldırın. Görünür, gösterinin her satırdaki ilk 5 gösteri içinde olduğu anlamına gelir"
		}
	},
	"watchSkippedButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Geri sarmak mı?"
		}
	},
	"homeButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ev"
		}
	},
	"bigPlayerSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Video daha büyük:"
		}
	},
	"bigPlayerDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Video boyutunu tam ekran olmadan tüm tarayıcı penceresine genişletir."
		}
	},
	"doubleClickSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Çift tıklayarak tam ekran yapın:"
		}
	},
	"doubleClickDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Videoya çift tıklarsanız tam ekrana geçecektir."
		}
	},
	"scrollVolumeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ses seviyesi için kaydırın:"
		}
	},
	"scrollVolumeDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ses Simgesi üzerinde yukarı veya aşağı kaydırma yapmak ses seviyesini değiştirecektir."
		}
	},
	"disneyAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Disney reklamlarını atlama zamanı."
		}
	},
	"showYearSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Gösterinin çıkış yılı:"
		}
	},
	"showYearDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Derecelendirmenin yanında yayın yılını gösterir."
		}
	},
	"installPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "🎉 Yüklendi! 🚀"
		}
	},
	"installThanks": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced'ı yüklediğiniz için teşekkür ederiz! ❤️"
		}
	},
	"installTurnOnOptional": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tüm isteğe bağlı özellikleri açın:"
		}
	},
	"tabsPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "doğru ayarların otomatik olarak açılması için gerekli"
		}
	},
	"missingPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Eksik izinler algılandı"
		}
	},
	"addPermissionButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ekle"
		}
	},
	"removeGamesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Oyunları kaldır:"
		}
	},
	"removeGamesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tüm oyunları sayfadan kaldırır."
		}
	},
	"hideTitlesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Filmi Gizle düğmesi"
		}
	},
	"hideTitlesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Kullanıcı tarafından manuel olarak gizlenen gösterileri otomatik olarak gizleyin."
		}
	},
	"hiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Gizli Başlıklar:"
		}
	},
	"removeAllHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tüm gizli başlıkları kaldırın"
		}
	},
	"crunchyrollDelay": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ms cinsinden atlama gecikmesi:"
		}
	},
	"crunchyrollDelayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Bazı diller diğerlerinden daha uzun sürer. Bu ayar, bazı dublajlarda konuşmanın kesilmemesi için giriş ve jeneriği gecikmeli olarak atlamanıza olanak tanır."
		}
	},
	"switchLanguage": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dil değiştir:"
		}
	},
	"resetConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ayarları sıfırlamak istiyorsunuz.\n\nBunu yapmak istediğinden emin misin?"
		}
	},
	"invalidJson": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Yüklediğiniz dosya geçerli bir JSON dosyası değil."
		}
	},
	"improveUISwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Video Kullanıcı Arayüzünü İyileştirin"
		}
	},
	"improveUIDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Video Oynatıcı Kullanıcı Arayüzü çeşitli şekillerde geliştirildi."
		}
	},
	"skipAfterCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sonraki bölüme geç:"
		}
	},
	"skipAfterCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Jenerik sonrası sahneyi otomatik olarak atlayın ve doğrudan bir sonraki bölüme geçin."
		}
	},
	"editRatings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Derecelendirme eşiklerini ve renklerini düzenleyin:"
		}
	},
	"pickColor": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Renk seç"
		}
	},
	"pickRating": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Seçim Derecelendirme eşiği"
		}
	},
	"reset": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Sıfırla"
		}
	},
	"dimLowRatingsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Dimm Düşük Değerler"
		}
	},
	"dimLowRatingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "En Düşük Puanlı Dimm Programları."
		}
	},
	"disabledSettingsOverviewTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Devre dışı ayarlara genel bakış"
		}
	},
	"disabledSettingsOverviewDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 5,
					"i": 1
				},
				{
					"t": 3,
					"v": " kategoride "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " ayar devre dışı bırakıldı."
				}
			]
		}
	},
	"hideHeaderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Oynatıcıda Başlığı Gizle"
		}
	},
	"hideHeaderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ayrıca video oynatıcıdaki Web sitesi başlığını gizler."
		}
	},
	"hiddenTitlesNav": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Gizli Başlıklar"
		}
	},
	"hiddenTitlesPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Gizli Başlıklar"
		}
	},
	"hiddenTitlesPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix, Prime Video ve Disney+ platformlarında, tarama satırlarında görünmemesi için gizlediğiniz başlıkları yönetin."
		}
	},
	"searchPlaceholder": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Başlıkları ara..."
		}
	},
	"platformFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Platform"
		}
	},
	"mediaTypeFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tür"
		}
	},
	"allPlatforms": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tüm platformlar"
		}
	},
	"allTypes": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tüm türler"
		}
	},
	"unknownPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Bilinmiyor"
		}
	},
	"sortDateAdded": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Eklenme tarihi"
		}
	},
	"sortTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Başlık"
		}
	},
	"sortPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Platform"
		}
	},
	"viewIcon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Simge görünümü"
		}
	},
	"viewList": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Ayrıntılı görünüm"
		}
	},
	"selectAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tümünü seç"
		}
	},
	"unhide": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Göster"
		}
	},
	"unhideSelected": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "Seçilenleri göster ("
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ")"
				}
			]
		}
	},
	"unhideAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Tümünü göster"
		}
	},
	"unhideAllConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Her başlık her platformda gösterilsin mi? Bu geri alınamaz."
		}
	},
	"noHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Henüz gizli başlık yok."
		}
	},
	"movieType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Film"
		}
	},
	"tvType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "TV Şovu"
		}
	}
} }, { "zh_CN": {
	"extensionName": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced: Netflix Disney+ Prime Video"
		}
	},
	"extensionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "在 Netflix、Prime video、Disney+、Crunchyroll 和 HBO max 上跳过广告、开场白、片头，并添加调整速度等功能。"
		}
	},
	"settingsTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "设置 - Streaming enhanced"
		}
	},
	"pageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Streaming enhanced"
		}
	},
	"rateNow": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "现在评分"
		}
	},
	"sharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "共享设置"
		}
	},
	"sharedSettingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "这些选项只会启用/禁用共享设置中的 "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " 部分"
				}
			]
		}
	},
	"backup": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "备份"
		}
	},
	"statistics": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "统计资料"
		}
	},
	"changelog": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "更新日志"
		}
	},
	"donate": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "捐赠"
		}
	},
	"pageSpecificTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " 专属"
			}]
		}
	},
	"defaultfilterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "从亚马逊 prime 中删除所有付费电影/连续剧类别"
		}
	},
	"sharedPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "共享视频功能"
		}
	},
	"sharedPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "这些选项只能启用/禁用所有流媒体服务的设置。在下表中，您可以禁用特定服务的共享设置"
		}
	},
	"skipIntroSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过介绍："
		}
	},
	"skipIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过所有系列的前奏，每个系列的第一集除外。"
		}
	},
	"skipCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "略过："
		}
	},
	"skipCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "以最快的速度跳到每个系列的下一集"
		}
	},
	"skipAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过广告"
		}
	},
	"skipAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过亚马逊的 freevee 广告和 Netflix 基本层的所有广告"
		}
	},
	"speedSliderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "添加速度控制："
		}
	},
	"speedSliderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "添加速度调节滑块"
		}
	},
	"sliderOptions": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "滑块选项：速度 = 步长 /10"
		}
	},
	"sliderStepSize": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "滑块步长"
		}
	},
	"sliderMin": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "滑块最小值："
		}
	},
	"sliderMax": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "滑块最大值："
		}
	},
	"sliderPreview": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "滑块预览"
		}
	},
	"playOnFullScreenSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "全屏播放"
		}
	},
	"playOnFullScreenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "如果将视频设置为全屏，视频将自动播放"
		}
	},
	"selfAdSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过自助广告："
		}
	},
	"selfAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过在任何视频之前播放的黄金节目预告"
		}
	},
	"filterPaidSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "删除付费内容："
		}
	},
	"filterPaidDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "删除所有付费电影/剧集类别"
		}
	},
	"continuePositionSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "移动类别 \"继续\"："
		}
	},
	"continuePositionDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "将类别 \"继续 \"移至页面顶部"
		}
	},
	"freeveeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过 Freevee 广告："
		}
	},
	"skipRecapSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过回顾："
		}
	},
	"skipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过每个节目的复述"
		}
	},
	"skipBlockedSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "恢复不活动警告："
		}
	},
	"skipBlockedDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "如果出现 \"您是否仍在观看 \"提示，则继续播放视频"
		}
	},
	"profileSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "自动选择最后一个配置文件："
		}
	},
	"profileDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "页面启动时直接选择上次使用的配置文件"
		}
	},
	"user": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "用户："
		}
	},
	"statisticPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "统计资料"
		}
	},
	"skippedTime": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过时间"
		}
	},
	"amazonAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过 FreeVee 广告 + Prime 视频自助广告的时间"
		}
	},
	"statisticAd": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{
				"t": 5,
				"i": 0
			}, {
				"t": 3,
				"v": " 广告："
			}]
		}
	},
	"netflixAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过 Netflix 广告的时间"
		}
	},
	"statisticIntro": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "介绍："
		}
	},
	"statisticIntroDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix、亚马逊和迪士尼+上被跳过的介绍时间"
		}
	},
	"statisticRecap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "回顾一下"
		}
	},
	"statisticskipRecapDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix、亚马逊和迪士尼+上跳过的时间回顾"
		}
	},
	"statisticSegments": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过的片段："
		}
	},
	"statisticSegmentsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "Netflix、亚马逊和迪士尼+跳过介绍或广告等个别片段的数量"
		}
	},
	"importSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "导入/导出所有设置"
		}
	},
	"saveSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "将设置保存为文件"
		}
	},
	"uploadSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "上传设置:"
		}
	},
	"resetAddon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "将插件重置为默认设置"
		}
	},
	"noWrap": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "nowrap"
		}
	},
	"watchCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "永远看片尾字幕："
		}
	},
	"watchCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "经常观看每部电视剧的片头"
		}
	},
	"conflictingTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "所有冲突功能"
		}
	},
	"showRatingSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "TMDB Rating："
		}
	},
	"showRatingDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "为每部电影和剧集添加 TMDB 评级"
		}
	},
	"releaseCalendarSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "添加发布日历选项："
		}
	},
	"releaseCalendarDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "在发布日历中添加 \"仅显示播放列表 \"和 \"过滤 DUB \"复选框"
		}
	},
	"epilepsySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "癫痫选项"
		}
	},
	"epilepsyDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过广告时使屏幕变暗"
		}
	},
	"userAgentSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "切换到桌面网站"
		}
	},
	"userAgentDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "将 prime video 和 disney+ 改为桌面网站，将亚马逊网站改为移动友好型网站"
		}
	},
	"xraySwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "隐藏 X 光"
		}
	},
	"xrayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "在视频上隐藏 X 光快速视图"
		}
	},
	"feature": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "功能"
		}
	},
	"shared": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "全部"
		}
	},
	"openSharedSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "打开共享设置"
		}
	},
	"autoOpenSettings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "自动打开正确的设置："
		}
	},
	"autoOpenDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "如果在流媒体网站上，弹出窗口会自动打开相应设置"
		}
	},
	"duplicateSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "删除重复显示："
		}
	},
	"duplicateDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "删除所有重复的节目，这些节目之前在迪斯尼上已经可见。可见表示节目位于每一行的前 5 个节目中"
		}
	},
	"watchSkippedButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "倒带？"
		}
	},
	"homeButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "首页"
		}
	},
	"bigPlayerSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "视频更大："
		}
	},
	"bigPlayerDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "将视频尺寸扩展到整个浏览器窗口，而无需全屏。"
		}
	},
	"doubleClickSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "双击全屏："
		}
	},
	"doubleClickDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "如果双击视频，它就会变成全屏。"
		}
	},
	"scrollVolumeSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "滚动音量："
		}
	},
	"scrollVolumeDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "上下滚动声音图标可改变音量。"
		}
	},
	"disneyAdDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过迪斯尼广告的时间"
		}
	},
	"showYearSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "节目发布年份："
		}
	},
	"showYearDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "显示评级旁边的发行年份。"
		}
	},
	"installPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "🎉已安装！🚀"
		}
	},
	"installThanks": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "感谢您安装 Streaming enhanced！❤️"
		}
	},
	"installTurnOnOptional": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "打开所有可选功能："
		}
	},
	"tabsPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "自动打开正确设置的必要条件"
		}
	},
	"missingPermission": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "检测到权限缺失"
		}
	},
	"addPermissionButton": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "添加"
		}
	},
	"removeGamesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "移除游戏："
		}
	},
	"removeGamesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "删除页面上的所有游戏。"
		}
	},
	"hideTitlesSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "隐藏电影按钮"
		}
	},
	"hideTitlesDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "自动隐藏用户手动隐藏的节目。"
		}
	},
	"hiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "隐藏的标题："
		}
	},
	"removeAllHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "删除所有隐藏标题"
		}
	},
	"crunchyrollDelay": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳过延迟（毫秒）："
		}
	},
	"crunchyrollDelayDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "有些语言比其他语言需要更长的时间。通过此设置，您可以跳过有延迟的开场白和片头字幕，这样在某些配音中，语音就不会被切断。"
		}
	},
	"switchLanguage": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "开关语言："
		}
	},
	"resetConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "您想重置设置。\n\n您确定要这样做吗？"
		}
	},
	"invalidJson": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "您上传的文件不是有效的 JSON 文件。"
		}
	},
	"improveUISwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "改进视频用户界面"
		}
	},
	"improveUIDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "以多种方式增强视频播放器用户界面。"
		}
	},
	"skipAfterCreditsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "跳转到下一集"
		}
	},
	"skipAfterCreditsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "自动跳过片尾场景，直接进入下一集。"
		}
	},
	"editRatings": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "编辑评级阈值和颜色："
		}
	},
	"pickColor": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "选择颜色"
		}
	},
	"pickRating": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "挑选评级阈值"
		}
	},
	"reset": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "重置"
		}
	},
	"dimLowRatingsSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "调光低评级"
		}
	},
	"dimLowRatingsDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "评分最低的 Dimm 节目。"
		}
	},
	"disabledSettingsOverviewTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "禁用设置概览"
		}
	},
	"disabledSettingsOverviewDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "在 "
				},
				{
					"t": 5,
					"i": 1
				},
				{
					"t": 3,
					"v": " 类别中禁用 "
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": " 设置。"
				}
			]
		}
	},
	"hideHeaderSwitch": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "隐藏播放器标题"
		}
	},
	"hideHeaderDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "还能隐藏视频播放器上的网站标题。"
		}
	},
	"hiddenTitlesNav": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "隐藏标题"
		}
	},
	"hiddenTitlesPageTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "隐藏标题"
		}
	},
	"hiddenTitlesPageDescription": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "管理您在 Netflix、Prime Video 和 Disney+ 上隐藏的、不会在浏览列表中显示的片名。"
		}
	},
	"searchPlaceholder": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "搜索标题..."
		}
	},
	"platformFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "平台"
		}
	},
	"mediaTypeFilter": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "类型"
		}
	},
	"allPlatforms": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "所有平台"
		}
	},
	"allTypes": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "所有类型"
		}
	},
	"unknownPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "未知"
		}
	},
	"sortDateAdded": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "添加日期"
		}
	},
	"sortTitle": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "标题"
		}
	},
	"sortPlatform": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "平台"
		}
	},
	"viewIcon": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "图标视图"
		}
	},
	"viewList": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "详细视图"
		}
	},
	"selectAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "全选"
		}
	},
	"unhide": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "显示"
		}
	},
	"unhideSelected": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [
				{
					"t": 3,
					"v": "显示所选内容 ("
				},
				{
					"t": 5,
					"i": 0
				},
				{
					"t": 3,
					"v": ")"
				}
			]
		}
	},
	"unhideAll": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "显示全部"
		}
	},
	"unhideAllConfirm": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "在每个平台上显示每个标题？此操作无法撤消。"
		}
	},
	"noHiddenTitles": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "还没有隐藏标题。"
		}
	},
	"movieType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "电影"
		}
	},
	"tvType": {
		"t": 0,
		"b": {
			"t": 2,
			"i": [{ "t": 3 }],
			"s": "电视节目"
		}
	}
} });
//#endregion
//#region node_modules/@intlify/shared/dist/shared.mjs
/*!
* shared v11.4.8
* (c) 2026 kazuya kawaguchi
* Released under the MIT License.
*/
/**
* Original Utilities
* written by kazuya kawaguchi
*/
var inBrowser = typeof window !== "undefined";
var makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
var generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({
	l: locale,
	k: key,
	s: source
});
var friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
var isNumber = (val) => typeof val === "number" && isFinite(val);
var isDate = (val) => toTypeString(val) === "[object Date]";
var isRegExp = (val) => toTypeString(val) === "[object RegExp]";
var isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
var assign = Object.assign;
var _create = Object.create;
var create = (obj = null) => _create(obj);
var _globalThis;
var getGlobalThis = () => {
	return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : create());
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
	return hasOwnProperty.call(obj, key);
}
/**
* Useful Utilities By Evan you
* Modified by kazuya kawaguchi
* MIT License
* https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
* https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
*/
var isArray = Array.isArray;
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isBoolean = (val) => typeof val === "boolean";
var isObject = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
	return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var isPlainObject = (val) => toTypeString(val) === "[object Object]";
var toDisplayString = (val) => {
	return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join(items, separator = "") {
	return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
function warn(msg, err) {
	if (typeof console !== "undefined") {
		console.warn(`[intlify] ` + msg);
		/* istanbul ignore if */
		if (err) console.warn(err.stack);
	}
}
function escapeHtml(rawText) {
	return rawText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function escapeAttributeValue(value) {
	return value.replace(/&(?![a-z0-9#]{2,6};)/gi, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
var javascriptSchemePattern = /^javascript:/i;
var urlAttributePattern = /^(?:href|src|action|formaction)$/i;
var numericCharacterReferencePattern = /&#(?:x([0-9a-f]+)|(\d+));?/gi;
var namedWhitespaceCharacterReferencePattern = /&(?:Tab|NewLine);/g;
var colonCharacterReferencePattern = /&colon;?/gi;
var controlOrWhitespacePattern = /[\u0000-\u0020\u007f-\u009f]/g;
var eventHandlerPattern = /(?:^|[\s"'<>/])on\w+\s*=\s*["']?[^"'>]+["']?/i;
var eventHandlerAttributePattern = /(^|[\s"'<>/])on(\w+\s*=)/gi;
var unquotedUrlAttributePattern = /(^|[\s"'<>/])((?:href|src|action|formaction)\s*=\s*)([^\s"'=<>`]+)/gi;
function decodeNumericCharacterReference(match, hex, decimal) {
	const digits = hex || decimal;
	if (!digits) return match;
	const codePoint = Number.parseInt(digits, hex ? 16 : 10);
	return codePoint <= 127 ? String.fromCharCode(codePoint) : match;
}
function hasJavascriptScheme(value) {
	const normalized = value.replace(numericCharacterReferencePattern, decodeNumericCharacterReference).replace(namedWhitespaceCharacterReferencePattern, "").replace(colonCharacterReferencePattern, ":").replace(controlOrWhitespacePattern, "");
	return javascriptSchemePattern.test(normalized);
}
function sanitizeStyleValue(value) {
	const urlPattern = /url\s*\(/gi;
	let sanitized = "";
	let cursor = 0;
	let match;
	while ((match = urlPattern.exec(value)) !== null) {
		const urlStart = match.index;
		const openParenIndex = urlPattern.lastIndex - 1;
		let index = openParenIndex + 1;
		let depth = 1;
		let quote = null;
		for (; index < value.length; index++) {
			const char = value[index];
			if (quote) {
				if (char === quote) quote = null;
				continue;
			}
			if (char === "\"" || char === "'") quote = char;
			else if (char === "(") depth++;
			else if (char === ")") {
				depth--;
				if (depth === 0) break;
			}
		}
		if (depth !== 0) break;
		const rawUrlValue = value.slice(openParenIndex + 1, index).trim();
		const unquotedUrlValue = rawUrlValue.startsWith("\"") && rawUrlValue.endsWith("\"") || rawUrlValue.startsWith("'") && rawUrlValue.endsWith("'") ? rawUrlValue.slice(1, -1).trim() : rawUrlValue;
		sanitized += value.slice(cursor, urlStart);
		sanitized += hasJavascriptScheme(unquotedUrlValue) ? "url(about:blank)" : value.slice(urlStart, index + 1);
		cursor = index + 1;
	}
	return sanitized + value.slice(cursor);
}
function sanitizeAttributeValue(attrName, value) {
	if (urlAttributePattern.test(attrName) && hasJavascriptScheme(value)) return "about:blank";
	return escapeAttributeValue(attrName.toLowerCase() === "style" ? sanitizeStyleValue(value) : value);
}
function sanitizeTranslatedHtml(html) {
	html = html.replace(/([\w:-]+)\s*=\s*"([^"]*)"/g, (_, attrName, attrValue) => `${attrName}="${sanitizeAttributeValue(attrName, attrValue)}"`);
	html = html.replace(/([\w:-]+)\s*=\s*'([^']*)'/g, (_, attrName, attrValue) => `${attrName}='${sanitizeAttributeValue(attrName, attrValue)}'`);
	if (eventHandlerPattern.test(html)) html = html.replace(eventHandlerAttributePattern, "$1&#111;n$2");
	html = html.replace(unquotedUrlAttributePattern, (match, boundary, prefix, attrValue) => hasJavascriptScheme(attrValue) ? `${boundary}${prefix}about:blank` : match);
	return html;
}
var isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
function deepCopy(src, des) {
	if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) throw new Error("Invalid value");
	const stack = [{
		src,
		des
	}];
	while (stack.length) {
		const { src, des } = stack.pop();
		Object.keys(src).forEach((key) => {
			if (key === "__proto__") return;
			if (isObject(src[key]) && !isObject(des[key])) des[key] = Array.isArray(src[key]) ? [] : create();
			if (isNotObjectOrIsArray(des[key]) || isNotObjectOrIsArray(src[key])) des[key] = src[key];
			else stack.push({
				src: src[key],
				des: des[key]
			});
		});
	}
}
//#endregion
//#region node_modules/@intlify/message-compiler/dist/message-compiler.mjs
/*!
* message-compiler v11.4.8
* (c) 2026 kazuya kawaguchi
* Released under the MIT License.
*/
function createPosition(line, column, offset) {
	return {
		line,
		column,
		offset
	};
}
function createLocation(start, end, source) {
	const loc = {
		start,
		end
	};
	if (source != null) loc.source = source;
	return loc;
}
var CompileErrorCodes = {
	EXPECTED_TOKEN: 1,
	INVALID_TOKEN_IN_PLACEHOLDER: 2,
	UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
	UNKNOWN_ESCAPE_SEQUENCE: 4,
	INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
	UNBALANCED_CLOSING_BRACE: 6,
	UNTERMINATED_CLOSING_BRACE: 7,
	EMPTY_PLACEHOLDER: 8,
	NOT_ALLOW_NEST_PLACEHOLDER: 9,
	INVALID_LINKED_FORMAT: 10,
	MUST_HAVE_MESSAGES_IN_PLURAL: 11,
	UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
	UNEXPECTED_EMPTY_LINKED_KEY: 13,
	UNEXPECTED_LEXICAL_ANALYSIS: 14,
	UNHANDLED_CODEGEN_NODE_TYPE: 15,
	UNHANDLED_MINIFIER_NODE_TYPE: 16
};
CompileErrorCodes.EXPECTED_TOKEN, CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, CompileErrorCodes.UNBALANCED_CLOSING_BRACE, CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, CompileErrorCodes.EMPTY_PLACEHOLDER, CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, CompileErrorCodes.INVALID_LINKED_FORMAT, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, CompileErrorCodes.UNHANDLED_CODEGEN_NODE_TYPE, CompileErrorCodes.UNHANDLED_MINIFIER_NODE_TYPE;
function createCompileError(code, loc, options = {}) {
	const { domain, messages, args } = options;
	const error = new SyntaxError(String(code));
	error.code = code;
	if (loc) error.location = loc;
	error.domain = domain;
	return error;
}
/** @internal */
function defaultOnError(error) {
	throw error;
}
var CHAR_SP = " ";
var CHAR_CR = "\r";
var CHAR_LF = "\n";
var CHAR_LS = String.fromCharCode(8232);
var CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
	const _buf = str;
	let _index = 0;
	let _line = 1;
	let _column = 1;
	let _peekOffset = 0;
	const isCRLF = (index) => _buf[index] === CHAR_CR && _buf[index + 1] === CHAR_LF;
	const isLF = (index) => _buf[index] === CHAR_LF;
	const isPS = (index) => _buf[index] === CHAR_PS;
	const isLS = (index) => _buf[index] === CHAR_LS;
	const isLineEnd = (index) => isCRLF(index) || isLF(index) || isPS(index) || isLS(index);
	const index = () => _index;
	const line = () => _line;
	const column = () => _column;
	const peekOffset = () => _peekOffset;
	const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
	const currentChar = () => charAt(_index);
	const currentPeek = () => charAt(_index + _peekOffset);
	function next() {
		_peekOffset = 0;
		if (isLineEnd(_index)) {
			_line++;
			_column = 0;
		}
		if (isCRLF(_index)) _index++;
		_index++;
		_column++;
		return _buf[_index];
	}
	function peek() {
		if (isCRLF(_index + _peekOffset)) _peekOffset++;
		_peekOffset++;
		return _buf[_index + _peekOffset];
	}
	function reset() {
		_index = 0;
		_line = 1;
		_column = 1;
		_peekOffset = 0;
	}
	function resetPeek(offset = 0) {
		_peekOffset = offset;
	}
	function skipToPeek() {
		const target = _index + _peekOffset;
		while (target !== _index) next();
		_peekOffset = 0;
	}
	return {
		index,
		line,
		column,
		peekOffset,
		charAt,
		currentChar,
		currentPeek,
		next,
		peek,
		reset,
		resetPeek,
		skipToPeek
	};
}
var EOF = void 0;
var DOT = ".";
var LITERAL_DELIMITER = "'";
var ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
	const location = options.location !== false;
	const _scnr = createScanner(source);
	const currentOffset = () => _scnr.index();
	const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
	const _initLoc = currentPosition();
	const _initOffset = currentOffset();
	const _context = {
		currentType: 13,
		offset: _initOffset,
		startLoc: _initLoc,
		endLoc: _initLoc,
		lastType: 13,
		lastOffset: _initOffset,
		lastStartLoc: _initLoc,
		lastEndLoc: _initLoc,
		braceNest: 0,
		inLinked: false,
		text: ""
	};
	const context = () => _context;
	const { onError } = options;
	function emitError(code, pos, offset, ...args) {
		const ctx = context();
		pos.column += offset;
		pos.offset += offset;
		if (onError) {
			const err = createCompileError(code, location ? createLocation(ctx.startLoc, pos) : null, {
				domain: ERROR_DOMAIN$3,
				args
			});
			onError(err);
		}
	}
	function getToken(context, type, value) {
		context.endLoc = currentPosition();
		context.currentType = type;
		const token = { type };
		if (location) token.loc = createLocation(context.startLoc, context.endLoc);
		if (value != null) token.value = value;
		return token;
	}
	const getEndToken = (context) => getToken(context, 13);
	function eat(scnr, ch) {
		if (scnr.currentChar() === ch) {
			scnr.next();
			return ch;
		} else {
			emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
			return "";
		}
	}
	function peekSpaces(scnr) {
		let buf = "";
		while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
			buf += scnr.currentPeek();
			scnr.peek();
		}
		return buf;
	}
	function skipSpaces(scnr) {
		const buf = peekSpaces(scnr);
		scnr.skipToPeek();
		return buf;
	}
	function isIdentifierStart(ch) {
		if (ch === EOF) return false;
		const cc = ch.charCodeAt(0);
		return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc === 95;
	}
	function isNumberStart(ch) {
		if (ch === EOF) return false;
		const cc = ch.charCodeAt(0);
		return cc >= 48 && cc <= 57;
	}
	function isNamedIdentifierStart(scnr, context) {
		const { currentType } = context;
		if (currentType !== 2) return false;
		peekSpaces(scnr);
		const ret = isIdentifierStart(scnr.currentPeek());
		scnr.resetPeek();
		return ret;
	}
	function isListIdentifierStart(scnr, context) {
		const { currentType } = context;
		if (currentType !== 2) return false;
		peekSpaces(scnr);
		const ret = isNumberStart(scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek());
		scnr.resetPeek();
		return ret;
	}
	function isLiteralStart(scnr, context) {
		const { currentType } = context;
		if (currentType !== 2) return false;
		peekSpaces(scnr);
		const ret = scnr.currentPeek() === LITERAL_DELIMITER;
		scnr.resetPeek();
		return ret;
	}
	function isLinkedDotStart(scnr, context) {
		const { currentType } = context;
		if (currentType !== 7) return false;
		peekSpaces(scnr);
		const ret = scnr.currentPeek() === ".";
		scnr.resetPeek();
		return ret;
	}
	function isLinkedModifierStart(scnr, context) {
		const { currentType } = context;
		if (currentType !== 8) return false;
		peekSpaces(scnr);
		const ret = isIdentifierStart(scnr.currentPeek());
		scnr.resetPeek();
		return ret;
	}
	function isLinkedDelimiterStart(scnr, context) {
		const { currentType } = context;
		if (!(currentType === 7 || currentType === 11)) return false;
		peekSpaces(scnr);
		const ret = scnr.currentPeek() === ":";
		scnr.resetPeek();
		return ret;
	}
	function isLinkedReferStart(scnr, context) {
		const { currentType } = context;
		if (currentType !== 9) return false;
		const fn = () => {
			const ch = scnr.currentPeek();
			if (ch === "{") return isIdentifierStart(scnr.peek());
			else if (ch === "@" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) return false;
			else if (ch === CHAR_LF) {
				scnr.peek();
				return fn();
			} else return isTextStart(scnr, false);
		};
		const ret = fn();
		scnr.resetPeek();
		return ret;
	}
	function isPluralStart(scnr) {
		peekSpaces(scnr);
		const ret = scnr.currentPeek() === "|";
		scnr.resetPeek();
		return ret;
	}
	function isTextStart(scnr, reset = true) {
		const fn = (hasSpace = false, prev = "") => {
			const ch = scnr.currentPeek();
			if (ch === "{") return hasSpace;
			else if (ch === "@" || !ch) return hasSpace;
			else if (ch === "|") return !(prev === CHAR_SP || prev === CHAR_LF);
			else if (ch === CHAR_SP) {
				scnr.peek();
				return fn(true, CHAR_SP);
			} else if (ch === CHAR_LF) {
				scnr.peek();
				return fn(true, CHAR_LF);
			} else return true;
		};
		const ret = fn();
		reset && scnr.resetPeek();
		return ret;
	}
	function takeChar(scnr, fn) {
		const ch = scnr.currentChar();
		if (ch === EOF) return;
		if (fn(ch)) {
			scnr.next();
			return ch;
		}
		return null;
	}
	function isIdentifier(ch) {
		const cc = ch.charCodeAt(0);
		return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95 || cc === 36;
	}
	function takeIdentifierChar(scnr) {
		return takeChar(scnr, isIdentifier);
	}
	function isNamedIdentifier(ch) {
		const cc = ch.charCodeAt(0);
		return cc >= 97 && cc <= 122 || cc >= 65 && cc <= 90 || cc >= 48 && cc <= 57 || cc === 95 || cc === 36 || cc === 45;
	}
	function takeNamedIdentifierChar(scnr) {
		return takeChar(scnr, isNamedIdentifier);
	}
	function isDigit(ch) {
		const cc = ch.charCodeAt(0);
		return cc >= 48 && cc <= 57;
	}
	function takeDigit(scnr) {
		return takeChar(scnr, isDigit);
	}
	function isHexDigit(ch) {
		const cc = ch.charCodeAt(0);
		return cc >= 48 && cc <= 57 || cc >= 65 && cc <= 70 || cc >= 97 && cc <= 102;
	}
	function takeHexDigit(scnr) {
		return takeChar(scnr, isHexDigit);
	}
	function getDigits(scnr) {
		let ch = "";
		let num = "";
		while (ch = takeDigit(scnr)) num += ch;
		return num;
	}
	function readText(scnr) {
		let buf = "";
		while (true) {
			const ch = scnr.currentChar();
			if (ch === "\\") {
				const nextCh = scnr.peek();
				if (nextCh === "{" || nextCh === "}" || nextCh === "@" || nextCh === "|" || nextCh === "\\") {
					buf += ch + nextCh;
					scnr.next();
					scnr.next();
				} else {
					scnr.resetPeek();
					buf += ch;
					scnr.next();
				}
			} else if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) break;
			else if (ch === CHAR_SP || ch === CHAR_LF) {
				if (isTextStart(scnr)) {
					buf += ch;
					scnr.next();
				} else if (isPluralStart(scnr)) break;
				else {
					buf += ch;
					scnr.next();
				}
			} else {
				buf += ch;
				scnr.next();
			}
		}
		return buf;
	}
	function readNamedIdentifier(scnr) {
		skipSpaces(scnr);
		let ch = "";
		let name = "";
		while (ch = takeNamedIdentifierChar(scnr)) name += ch;
		const currentChar = scnr.currentChar();
		if (currentChar && currentChar !== "}" && currentChar !== EOF && currentChar !== CHAR_SP && currentChar !== CHAR_LF && currentChar !== "　") {
			const invalidPart = readInvalidIdentifier(scnr);
			emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, name + invalidPart);
			return name + invalidPart;
		}
		if (scnr.currentChar() === EOF) emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
		return name;
	}
	function readListIdentifier(scnr) {
		skipSpaces(scnr);
		let value = "";
		if (scnr.currentChar() === "-") {
			scnr.next();
			value += `-${getDigits(scnr)}`;
		} else value += getDigits(scnr);
		if (scnr.currentChar() === EOF) emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
		return value;
	}
	function isLiteral(ch) {
		return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
	}
	function readLiteral(scnr) {
		skipSpaces(scnr);
		eat(scnr, `\'`);
		let ch = "";
		let literal = "";
		while (ch = takeChar(scnr, isLiteral)) if (ch === "\\") literal += readEscapeSequence(scnr);
		else literal += ch;
		const current = scnr.currentChar();
		if (current === CHAR_LF || current === EOF) {
			emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
			if (current === CHAR_LF) {
				scnr.next();
				eat(scnr, `\'`);
			}
			return literal;
		}
		eat(scnr, `\'`);
		return literal;
	}
	function readEscapeSequence(scnr) {
		const ch = scnr.currentChar();
		switch (ch) {
			case "\\":
			case `\'`:
				scnr.next();
				return `\\${ch}`;
			case "u": return readUnicodeEscapeSequence(scnr, ch, 4);
			case "U": return readUnicodeEscapeSequence(scnr, ch, 6);
			default:
				emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
				return "";
		}
	}
	function readUnicodeEscapeSequence(scnr, unicode, digits) {
		eat(scnr, unicode);
		let sequence = "";
		for (let i = 0; i < digits; i++) {
			const ch = takeHexDigit(scnr);
			if (!ch) {
				emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
				break;
			}
			sequence += ch;
		}
		return `\\${unicode}${sequence}`;
	}
	function isInvalidIdentifier(ch) {
		return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
	}
	function readInvalidIdentifier(scnr) {
		skipSpaces(scnr);
		let ch = "";
		let identifiers = "";
		while (ch = takeChar(scnr, isInvalidIdentifier)) identifiers += ch;
		return identifiers;
	}
	function readLinkedModifier(scnr) {
		let ch = "";
		let name = "";
		while (ch = takeIdentifierChar(scnr)) name += ch;
		return name;
	}
	function readLinkedRefer(scnr) {
		const fn = (buf) => {
			const ch = scnr.currentChar();
			if (ch === "{" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) return buf;
			else if (ch === CHAR_SP) return buf;
			else if (ch === CHAR_LF || ch === DOT) {
				buf += ch;
				scnr.next();
				return fn(buf);
			} else {
				buf += ch;
				scnr.next();
				return fn(buf);
			}
		};
		return fn("");
	}
	function readPlural(scnr) {
		skipSpaces(scnr);
		const plural = eat(scnr, "|");
		skipSpaces(scnr);
		return plural;
	}
	function readTokenInPlaceholder(scnr, context) {
		let token = null;
		switch (scnr.currentChar()) {
			case "{":
				if (context.braceNest >= 1) emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
				scnr.next();
				token = getToken(context, 2, "{");
				skipSpaces(scnr);
				context.braceNest++;
				return token;
			case "}":
				if (context.braceNest > 0 && context.currentType === 2) emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
				scnr.next();
				token = getToken(context, 3, "}");
				context.braceNest--;
				context.braceNest > 0 && skipSpaces(scnr);
				if (context.inLinked && context.braceNest === 0) context.inLinked = false;
				return token;
			case "@":
				if (context.braceNest > 0) emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
				token = readTokenInLinked(scnr, context) || getEndToken(context);
				context.braceNest = 0;
				return token;
			default: {
				let validNamedIdentifier = true;
				let validListIdentifier = true;
				let validLiteral = true;
				if (isPluralStart(scnr)) {
					if (context.braceNest > 0) emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
					token = getToken(context, 1, readPlural(scnr));
					context.braceNest = 0;
					context.inLinked = false;
					return token;
				}
				if (context.braceNest > 0 && (context.currentType === 4 || context.currentType === 5 || context.currentType === 6)) {
					emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
					context.braceNest = 0;
					return readToken(scnr, context);
				}
				if (validNamedIdentifier = isNamedIdentifierStart(scnr, context)) {
					token = getToken(context, 4, readNamedIdentifier(scnr));
					skipSpaces(scnr);
					return token;
				}
				if (validListIdentifier = isListIdentifierStart(scnr, context)) {
					token = getToken(context, 5, readListIdentifier(scnr));
					skipSpaces(scnr);
					return token;
				}
				if (validLiteral = isLiteralStart(scnr, context)) {
					token = getToken(context, 6, readLiteral(scnr));
					skipSpaces(scnr);
					return token;
				}
				if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
					token = getToken(context, 12, readInvalidIdentifier(scnr));
					emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
					skipSpaces(scnr);
					return token;
				}
				break;
			}
		}
		return token;
	}
	function readTokenInLinked(scnr, context) {
		const { currentType } = context;
		let token = null;
		const ch = scnr.currentChar();
		if ((currentType === 7 || currentType === 8 || currentType === 11 || currentType === 9) && (ch === CHAR_LF || ch === CHAR_SP)) emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
		switch (ch) {
			case "@":
				scnr.next();
				token = getToken(context, 7, "@");
				context.inLinked = true;
				return token;
			case ".":
				skipSpaces(scnr);
				scnr.next();
				return getToken(context, 8, ".");
			case ":":
				skipSpaces(scnr);
				scnr.next();
				return getToken(context, 9, ":");
			default:
				if (isPluralStart(scnr)) {
					token = getToken(context, 1, readPlural(scnr));
					context.braceNest = 0;
					context.inLinked = false;
					return token;
				}
				if (isLinkedDotStart(scnr, context) || isLinkedDelimiterStart(scnr, context)) {
					skipSpaces(scnr);
					return readTokenInLinked(scnr, context);
				}
				if (isLinkedModifierStart(scnr, context)) {
					skipSpaces(scnr);
					return getToken(context, 11, readLinkedModifier(scnr));
				}
				if (isLinkedReferStart(scnr, context)) {
					skipSpaces(scnr);
					if (ch === "{") return readTokenInPlaceholder(scnr, context) || token;
					else return getToken(context, 10, readLinkedRefer(scnr));
				}
				if (currentType === 7) emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
				context.braceNest = 0;
				context.inLinked = false;
				return readToken(scnr, context);
		}
	}
	function readToken(scnr, context) {
		let token = { type: 13 };
		if (context.braceNest > 0) return readTokenInPlaceholder(scnr, context) || getEndToken(context);
		if (context.inLinked) return readTokenInLinked(scnr, context) || getEndToken(context);
		switch (scnr.currentChar()) {
			case "{": return readTokenInPlaceholder(scnr, context) || getEndToken(context);
			case "}":
				emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
				scnr.next();
				return getToken(context, 3, "}");
			case "@": return readTokenInLinked(scnr, context) || getEndToken(context);
			default:
				if (isPluralStart(scnr)) {
					token = getToken(context, 1, readPlural(scnr));
					context.braceNest = 0;
					context.inLinked = false;
					return token;
				}
				if (isTextStart(scnr)) return getToken(context, 0, readText(scnr));
		}
		return token;
	}
	function nextToken() {
		const { currentType, offset, startLoc, endLoc } = _context;
		_context.lastType = currentType;
		_context.lastOffset = offset;
		_context.lastStartLoc = startLoc;
		_context.lastEndLoc = endLoc;
		_context.offset = currentOffset();
		_context.startLoc = currentPosition();
		if (_scnr.currentChar() === EOF) return getToken(_context, 13);
		return readToken(_scnr, _context);
	}
	return {
		nextToken,
		currentOffset,
		currentPosition,
		context
	};
}
var ERROR_DOMAIN$2 = "parser";
var KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
var TEXT_ESCAPES = /\\([\\@{}|])/g;
function fromTextEscapeSequence(_match, char) {
	return char;
}
function fromEscapeSequence(match, codePoint4, codePoint6) {
	switch (match) {
		case `\\\\`: return `\\`;
		case `\\\'`: return `\'`;
		default: {
			const codePoint = parseInt(codePoint4 || codePoint6, 16);
			if (codePoint <= 55295 || codePoint >= 57344) return String.fromCodePoint(codePoint);
			return "�";
		}
	}
}
function createParser(options = {}) {
	const location = options.location !== false;
	const { onError } = options;
	function emitError(tokenzer, code, start, offset, ...args) {
		const end = tokenzer.currentPosition();
		end.offset += offset;
		end.column += offset;
		if (onError) {
			const err = createCompileError(code, location ? createLocation(start, end) : null, {
				domain: ERROR_DOMAIN$2,
				args
			});
			onError(err);
		}
	}
	function startNode(type, offset, loc) {
		const node = { type };
		if (location) {
			node.start = offset;
			node.end = offset;
			node.loc = {
				start: loc,
				end: loc
			};
		}
		return node;
	}
	function endNode(node, offset, pos, type) {
		if (location) {
			node.end = offset;
			if (node.loc) node.loc.end = pos;
		}
	}
	function parseText(tokenizer, value) {
		const context = tokenizer.context();
		const node = startNode(3, context.offset, context.startLoc);
		node.value = value.replace(TEXT_ESCAPES, fromTextEscapeSequence);
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	function parseList(tokenizer, index) {
		const { lastOffset: offset, lastStartLoc: loc } = tokenizer.context();
		const node = startNode(5, offset, loc);
		node.index = parseInt(index, 10);
		tokenizer.nextToken();
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	function parseNamed(tokenizer, key) {
		const { lastOffset: offset, lastStartLoc: loc } = tokenizer.context();
		const node = startNode(4, offset, loc);
		node.key = key;
		tokenizer.nextToken();
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	function parseLiteral(tokenizer, value) {
		const { lastOffset: offset, lastStartLoc: loc } = tokenizer.context();
		const node = startNode(9, offset, loc);
		node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
		tokenizer.nextToken();
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	function parseLinkedModifier(tokenizer) {
		const token = tokenizer.nextToken();
		const context = tokenizer.context();
		const { lastOffset: offset, lastStartLoc: loc } = context;
		const node = startNode(8, offset, loc);
		if (token.type !== 11) {
			emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
			node.value = "";
			endNode(node, offset, loc);
			return {
				nextConsumeToken: token,
				node
			};
		}
		if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
		node.value = token.value || "";
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return { node };
	}
	function parseLinkedKey(tokenizer, value) {
		const context = tokenizer.context();
		const node = startNode(7, context.offset, context.startLoc);
		node.value = value;
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	function parseLinked(tokenizer) {
		const context = tokenizer.context();
		const linkedNode = startNode(6, context.offset, context.startLoc);
		let token = tokenizer.nextToken();
		if (token.type === 8) {
			const parsed = parseLinkedModifier(tokenizer);
			linkedNode.modifier = parsed.node;
			token = parsed.nextConsumeToken || tokenizer.nextToken();
		}
		if (token.type !== 9) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
		token = tokenizer.nextToken();
		if (token.type === 2) token = tokenizer.nextToken();
		switch (token.type) {
			case 10:
				if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
				linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
				break;
			case 4:
				if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
				linkedNode.key = parseNamed(tokenizer, token.value || "");
				break;
			case 5:
				if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
				linkedNode.key = parseList(tokenizer, token.value || "");
				break;
			case 6:
				if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
				linkedNode.key = parseLiteral(tokenizer, token.value || "");
				break;
			default: {
				emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
				const nextContext = tokenizer.context();
				const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
				emptyLinkedKeyNode.value = "";
				endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
				linkedNode.key = emptyLinkedKeyNode;
				endNode(linkedNode, nextContext.offset, nextContext.startLoc);
				return {
					nextConsumeToken: token,
					node: linkedNode
				};
			}
		}
		endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
		return { node: linkedNode };
	}
	function parseMessage(tokenizer) {
		const context = tokenizer.context();
		const node = startNode(2, context.currentType === 1 ? tokenizer.currentOffset() : context.offset, context.currentType === 1 ? context.endLoc : context.startLoc);
		node.items = [];
		let nextToken = null;
		do {
			const token = nextToken || tokenizer.nextToken();
			nextToken = null;
			switch (token.type) {
				case 0:
					if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
					node.items.push(parseText(tokenizer, token.value || ""));
					break;
				case 5:
					if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
					node.items.push(parseList(tokenizer, token.value || ""));
					break;
				case 4:
					if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
					node.items.push(parseNamed(tokenizer, token.value || ""));
					break;
				case 6:
					if (token.value == null) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
					node.items.push(parseLiteral(tokenizer, token.value || ""));
					break;
				case 7: {
					const parsed = parseLinked(tokenizer);
					node.items.push(parsed.node);
					nextToken = parsed.nextConsumeToken || null;
					break;
				}
			}
		} while (context.currentType !== 13 && context.currentType !== 1);
		endNode(node, context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset(), context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition());
		return node;
	}
	function parsePlural(tokenizer, offset, loc, msgNode) {
		const context = tokenizer.context();
		let hasEmptyMessage = msgNode.items.length === 0;
		const node = startNode(1, offset, loc);
		node.cases = [];
		node.cases.push(msgNode);
		do {
			const msg = parseMessage(tokenizer);
			if (!hasEmptyMessage) hasEmptyMessage = msg.items.length === 0;
			node.cases.push(msg);
		} while (context.currentType !== 13);
		if (hasEmptyMessage) emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	function parseResource(tokenizer) {
		const context = tokenizer.context();
		const { offset, startLoc } = context;
		const msgNode = parseMessage(tokenizer);
		if (context.currentType === 13) return msgNode;
		else return parsePlural(tokenizer, offset, startLoc, msgNode);
	}
	function parse(source) {
		const tokenizer = createTokenizer(source, assign({}, options));
		const context = tokenizer.context();
		const node = startNode(0, context.offset, context.startLoc);
		if (location && node.loc) node.loc.source = source;
		node.body = parseResource(tokenizer);
		if (options.onCacheKey) node.cacheKey = options.onCacheKey(source);
		if (context.currentType !== 13) emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
		endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
		return node;
	}
	return { parse };
}
function getTokenCaption(token) {
	if (token.type === 13) return "EOF";
	const name = (token.value || "").replace(/\r?\n/gu, "\\n");
	return name.length > 10 ? name.slice(0, 9) + "…" : name;
}
function createTransformer(ast, options = {}) {
	const _context = {
		ast,
		helpers: /* @__PURE__ */ new Set()
	};
	const context = () => _context;
	const helper = (name) => {
		_context.helpers.add(name);
		return name;
	};
	return {
		context,
		helper
	};
}
function traverseNodes(nodes, transformer) {
	for (let i = 0; i < nodes.length; i++) traverseNode(nodes[i], transformer);
}
function traverseNode(node, transformer) {
	switch (node.type) {
		case 1:
			traverseNodes(node.cases, transformer);
			transformer.helper("plural");
			break;
		case 2:
			traverseNodes(node.items, transformer);
			break;
		case 6:
			traverseNode(node.key, transformer);
			transformer.helper("linked");
			transformer.helper("type");
			break;
		case 5:
			transformer.helper("interpolate");
			transformer.helper("list");
			break;
		case 4:
			transformer.helper("interpolate");
			transformer.helper("named");
	}
}
function transform(ast, options = {}) {
	const transformer = createTransformer(ast);
	transformer.helper("normalize");
	ast.body && traverseNode(ast.body, transformer);
	const context = transformer.context();
	ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
	const body = ast.body;
	if (body.type === 2) optimizeMessageNode(body);
	else body.cases.forEach((c) => optimizeMessageNode(c));
	return ast;
}
function optimizeMessageNode(message) {
	if (message.items.length === 1) {
		const item = message.items[0];
		if (item.type === 3 || item.type === 9) {
			message.static = item.value;
			delete item.value;
		}
	} else {
		const values = [];
		for (let i = 0; i < message.items.length; i++) {
			const item = message.items[i];
			if (!(item.type === 3 || item.type === 9)) break;
			if (item.value == null) break;
			values.push(item.value);
		}
		if (values.length === message.items.length) {
			message.static = join(values);
			for (let i = 0; i < message.items.length; i++) {
				const item = message.items[i];
				if (item.type === 3 || item.type === 9) delete item.value;
			}
		}
	}
}
function minify(node) {
	node.t = node.type;
	switch (node.type) {
		case 0: {
			const resource = node;
			minify(resource.body);
			resource.b = resource.body;
			delete resource.body;
			break;
		}
		case 1: {
			const plural = node;
			const cases = plural.cases;
			for (let i = 0; i < cases.length; i++) minify(cases[i]);
			plural.c = cases;
			delete plural.cases;
			break;
		}
		case 2: {
			const message = node;
			const items = message.items;
			for (let i = 0; i < items.length; i++) minify(items[i]);
			message.i = items;
			delete message.items;
			if (message.static) {
				message.s = message.static;
				delete message.static;
			}
			break;
		}
		case 3:
		case 9:
		case 8:
		case 7: {
			const valueNode = node;
			if (valueNode.value) {
				valueNode.v = valueNode.value;
				delete valueNode.value;
			}
			break;
		}
		case 6: {
			const linked = node;
			minify(linked.key);
			linked.k = linked.key;
			delete linked.key;
			if (linked.modifier) {
				minify(linked.modifier);
				linked.m = linked.modifier;
				delete linked.modifier;
			}
			break;
		}
		case 5: {
			const list = node;
			list.i = list.index;
			delete list.index;
			break;
		}
		case 4: {
			const named = node;
			named.k = named.key;
			delete named.key;
			break;
		}
	}
	delete node.type;
}
function createCodeGenerator(ast, options) {
	const { filename, breakLineCode, needIndent: _needIndent } = options;
	const location = options.location !== false;
	const _context = {
		filename,
		code: "",
		column: 1,
		line: 1,
		offset: 0,
		map: void 0,
		breakLineCode,
		needIndent: _needIndent,
		indentLevel: 0
	};
	if (location && ast.loc) _context.source = ast.loc.source;
	const context = () => _context;
	function push(code, node) {
		_context.code += code;
	}
	function _newline(n, withBreakLine = true) {
		const _breakLineCode = withBreakLine ? breakLineCode : "";
		push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
	}
	function indent(withNewLine = true) {
		const level = ++_context.indentLevel;
		withNewLine && _newline(level);
	}
	function deindent(withNewLine = true) {
		const level = --_context.indentLevel;
		withNewLine && _newline(level);
	}
	function newline() {
		_newline(_context.indentLevel);
	}
	const helper = (key) => `_${key}`;
	const needIndent = () => _context.needIndent;
	return {
		context,
		push,
		indent,
		deindent,
		newline,
		helper,
		needIndent
	};
}
function generateLinkedNode(generator, node) {
	const { helper } = generator;
	generator.push(`${helper("linked")}(`);
	generateNode(generator, node.key);
	if (node.modifier) {
		generator.push(`, `);
		generateNode(generator, node.modifier);
		generator.push(`, _type`);
	} else generator.push(`, undefined, _type`);
	generator.push(`)`);
}
function generateMessageNode(generator, node) {
	const { helper, needIndent } = generator;
	generator.push(`${helper("normalize")}([`);
	generator.indent(needIndent());
	const length = node.items.length;
	for (let i = 0; i < length; i++) {
		generateNode(generator, node.items[i]);
		if (i === length - 1) break;
		generator.push(", ");
	}
	generator.deindent(needIndent());
	generator.push("])");
}
function generatePluralNode(generator, node) {
	const { helper, needIndent } = generator;
	if (node.cases.length > 1) {
		generator.push(`${helper("plural")}([`);
		generator.indent(needIndent());
		const length = node.cases.length;
		for (let i = 0; i < length; i++) {
			generateNode(generator, node.cases[i]);
			if (i === length - 1) break;
			generator.push(", ");
		}
		generator.deindent(needIndent());
		generator.push(`])`);
	}
}
function generateResource(generator, node) {
	if (node.body) generateNode(generator, node.body);
	else generator.push("null");
}
function generateNode(generator, node) {
	const { helper } = generator;
	switch (node.type) {
		case 0:
			generateResource(generator, node);
			break;
		case 1:
			generatePluralNode(generator, node);
			break;
		case 2:
			generateMessageNode(generator, node);
			break;
		case 6:
			generateLinkedNode(generator, node);
			break;
		case 8:
			generator.push(JSON.stringify(node.value), node);
			break;
		case 7:
			generator.push(JSON.stringify(node.value), node);
			break;
		case 5:
			generator.push(`${helper("interpolate")}(${helper("list")}(${node.index}))`, node);
			break;
		case 4:
			generator.push(`${helper("interpolate")}(${helper("named")}(${JSON.stringify(node.key)}))`, node);
			break;
		case 9:
			generator.push(JSON.stringify(node.value), node);
			break;
		case 3: generator.push(JSON.stringify(node.value), node);
	}
}
var generate = (ast, options = {}) => {
	const mode = isString(options.mode) ? options.mode : "normal";
	const filename = isString(options.filename) ? options.filename : "message.intl";
	options.sourceMap;
	const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
	const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
	const helpers = ast.helpers || [];
	const generator = createCodeGenerator(ast, {
		filename,
		breakLineCode,
		needIndent
	});
	generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
	generator.indent(needIndent);
	if (helpers.length > 0) {
		generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
		generator.newline();
	}
	generator.push(`return `);
	generateNode(generator, ast);
	generator.deindent(needIndent);
	generator.push(`}`);
	delete ast.helpers;
	const { code, map } = generator.context();
	return {
		ast,
		code,
		map: map ? map.toJSON() : void 0
	};
};
function baseCompile$1(source, options = {}) {
	const assignedOptions = assign({}, options);
	const jit = !!assignedOptions.jit;
	const enalbeMinify = !!assignedOptions.minify;
	const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
	const ast = createParser(assignedOptions).parse(source);
	if (!jit) {
		transform(ast, assignedOptions);
		return generate(ast, assignedOptions);
	} else {
		enambeOptimize && optimize(ast);
		enalbeMinify && minify(ast);
		return {
			ast,
			code: ""
		};
	}
}
//#endregion
//#region node_modules/@intlify/core-base/dist/core-base.mjs
/*!
* core-base v11.4.8
* (c) 2026 kazuya kawaguchi
* Released under the MIT License.
*/
/**
* This is only called in esm-bundler builds.
* istanbul-ignore-next
*/
function initFeatureFlags$1() {
	if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
}
function isMessageAST(val) {
	return isObject(val) && resolveType(val) === 0 && (hasOwn(val, "b") || hasOwn(val, "body"));
}
var PROPS_BODY = ["b", "body"];
function resolveBody(node) {
	return resolveProps(node, PROPS_BODY);
}
var PROPS_CASES = ["c", "cases"];
function resolveCases(node) {
	return resolveProps(node, PROPS_CASES, []);
}
var PROPS_STATIC = ["s", "static"];
function resolveStatic(node) {
	return resolveProps(node, PROPS_STATIC);
}
var PROPS_ITEMS = ["i", "items"];
function resolveItems(node) {
	return resolveProps(node, PROPS_ITEMS, []);
}
var PROPS_TYPE = ["t", "type"];
function resolveType(node) {
	return resolveProps(node, PROPS_TYPE);
}
var PROPS_VALUE = ["v", "value"];
function resolveValue$1(node, type) {
	const resolved = resolveProps(node, PROPS_VALUE);
	if (resolved != null) return resolved;
	else throw createUnhandleNodeError(type);
}
var PROPS_MODIFIER = ["m", "modifier"];
function resolveLinkedModifier(node) {
	return resolveProps(node, PROPS_MODIFIER);
}
var PROPS_KEY = ["k", "key"];
function resolveLinkedKey(node) {
	const resolved = resolveProps(node, PROPS_KEY);
	if (resolved) return resolved;
	else throw createUnhandleNodeError(6);
}
function resolveProps(node, props, defaultValue) {
	for (let i = 0; i < props.length; i++) {
		const prop = props[i];
		if (hasOwn(node, prop) && node[prop] != null) return node[prop];
	}
	return defaultValue;
}
var AST_NODE_PROPS_KEYS = [
	...PROPS_BODY,
	...PROPS_CASES,
	...PROPS_STATIC,
	...PROPS_ITEMS,
	...PROPS_KEY,
	...PROPS_MODIFIER,
	...PROPS_VALUE,
	...PROPS_TYPE
];
function createUnhandleNodeError(type) {
	return /* @__PURE__ */ new Error(`unhandled node type: ${type}`);
}
function format(ast) {
	const msg = (ctx) => formatParts(ctx, ast);
	return msg;
}
function formatParts(ctx, ast) {
	const body = resolveBody(ast);
	if (body == null) throw createUnhandleNodeError(0);
	if (resolveType(body) === 1) {
		const cases = resolveCases(body);
		return ctx.plural(cases.reduce((messages, c) => [...messages, formatMessageParts(ctx, c)], []));
	} else return formatMessageParts(ctx, body);
}
function formatMessageParts(ctx, node) {
	const static_ = resolveStatic(node);
	if (static_ != null) return ctx.type === "text" ? static_ : ctx.normalize([static_]);
	else {
		const messages = resolveItems(node).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
		return ctx.normalize(messages);
	}
}
function formatMessagePart(ctx, node) {
	const type = resolveType(node);
	switch (type) {
		case 3: return resolveValue$1(node, type);
		case 9: return resolveValue$1(node, type);
		case 4: {
			const named = node;
			if (hasOwn(named, "k") && named.k) return ctx.interpolate(ctx.named(named.k));
			if (hasOwn(named, "key") && named.key) return ctx.interpolate(ctx.named(named.key));
			throw createUnhandleNodeError(type);
		}
		case 5: {
			const list = node;
			if (hasOwn(list, "i") && isNumber(list.i)) return ctx.interpolate(ctx.list(list.i));
			if (hasOwn(list, "index") && isNumber(list.index)) return ctx.interpolate(ctx.list(list.index));
			throw createUnhandleNodeError(type);
		}
		case 6: {
			const linked = node;
			const modifier = resolveLinkedModifier(linked);
			const key = resolveLinkedKey(linked);
			return ctx.linked(formatMessagePart(ctx, key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
		}
		case 7: return resolveValue$1(node, type);
		case 8: return resolveValue$1(node, type);
		default: throw new Error(`unhandled node on format message part: ${type}`);
	}
}
var defaultOnCacheKey = (message) => message;
var compileCache = create();
function baseCompile(message, options = {}) {
	let detectError = false;
	const onError = options.onError || defaultOnError;
	options.onError = (err) => {
		detectError = true;
		onError(err);
	};
	return {
		...baseCompile$1(message, options),
		detectError
	};
}
/* #__NO_SIDE_EFFECTS__ */
function compile(message, context) {
	if (isString(message)) {
		isBoolean(context.warnHtmlMessage) && context.warnHtmlMessage;
		const cacheKey = (context.onCacheKey || defaultOnCacheKey)(message);
		const cached = compileCache[cacheKey];
		if (cached) return cached;
		const { ast, detectError } = baseCompile(message, {
			...context,
			location: false,
			jit: true
		});
		const msg = format(ast);
		return !detectError ? compileCache[cacheKey] = msg : msg;
	} else {
		const cacheKey = message.cacheKey;
		if (cacheKey) {
			const cached = compileCache[cacheKey];
			if (cached) return cached;
			return compileCache[cacheKey] = format(message);
		} else return format(message);
	}
}
var devtools = null;
function setDevToolsHook(hook) {
	devtools = hook;
}
function initI18nDevTools(i18n, version, meta) {
	devtools && devtools.emit("i18n:init", {
		timestamp: Date.now(),
		i18n,
		version,
		meta
	});
}
var translateDevTools = /* #__PURE__*/ createDevToolsHook("function:translate");
function createDevToolsHook(hook) {
	return (payloads) => devtools && devtools.emit(hook, payloads);
}
var CoreErrorCodes = {
	INVALID_ARGUMENT: 17,
	INVALID_DATE_ARGUMENT: 18,
	INVALID_ISO_DATE_ARGUMENT: 19,
	NOT_SUPPORT_NON_STRING_MESSAGE: 20,
	NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
	NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
	NOT_SUPPORT_LOCALE_TYPE: 23
};
function createCoreError(code) {
	return createCompileError(code, null, void 0);
}
CoreErrorCodes.INVALID_ARGUMENT, CoreErrorCodes.INVALID_DATE_ARGUMENT, CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT, CoreErrorCodes.NOT_SUPPORT_NON_STRING_MESSAGE, CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE, CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION, CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE;
/** @internal */
function getLocale(context, options) {
	return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
}
var _resolveLocale;
/** @internal */
function resolveLocale(locale) {
	if (isString(locale)) return locale;
	else if (isFunction(locale)) {
		if (locale.resolvedOnce && _resolveLocale != null) return _resolveLocale;
		else if (locale.constructor.name === "Function") {
			const resolve = locale();
			if (isPromise(resolve)) throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
			return _resolveLocale = resolve;
		} else throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
	} else throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
}
/**
* Fallback with simple implemenation
*
* @remarks
* A fallback locale function implemented with a simple fallback algorithm.
*
* Basically, it returns the value as specified in the `fallbackLocale` props, and is processed with the fallback inside intlify.
*
* @param ctx - A {@link CoreContext | context}
* @param fallback - A {@link FallbackLocale | fallback locale}
* @param start - A starting {@link Locale | locale}
*
* @returns Fallback locales
*
* @VueI18nGeneral
*/
function fallbackWithSimple(ctx, fallback, start) {
	return [.../* @__PURE__ */ new Set([start, ...isArray(fallback) ? fallback : isObject(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]])];
}
/**
* Fallback with locale chain
*
* @remarks
* A fallback locale function implemented with a fallback chain algorithm. It's used in VueI18n as default.
*
* @param ctx - A {@link CoreContext | context}
* @param fallback - A {@link FallbackLocale | fallback locale}
* @param start - A starting {@link Locale | locale}
*
* @returns Fallback locales
*
* @VueI18nSee [Fallbacking](../guide/essentials/fallback)
*
* @VueI18nGeneral
*/
function fallbackWithLocaleChain(ctx, fallback, start) {
	const startLocale = isString(start) ? start : DEFAULT_LOCALE;
	const context = ctx;
	if (!context.__localeChainCache) context.__localeChainCache = /* @__PURE__ */ new Map();
	let chain = context.__localeChainCache.get(startLocale);
	if (!chain) {
		chain = [];
		let block = [start];
		while (isArray(block)) block = appendBlockToChain(chain, block, fallback);
		const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
		block = isString(defaults) ? [defaults] : defaults;
		if (isArray(block)) appendBlockToChain(chain, block, false);
		context.__localeChainCache.set(startLocale, chain);
	}
	return chain;
}
function appendBlockToChain(chain, block, blocks) {
	let follow = true;
	for (let i = 0; i < block.length && isBoolean(follow); i++) {
		const locale = block[i];
		if (isString(locale)) follow = appendLocaleToChain(chain, block[i], blocks);
	}
	return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
	let follow;
	const tokens = locale.split("-");
	do {
		follow = appendItemToChain(chain, tokens.join("-"), blocks);
		tokens.splice(-1, 1);
	} while (tokens.length && follow === true);
	return follow;
}
function appendItemToChain(chain, target, blocks) {
	let follow = false;
	if (!chain.includes(target)) {
		follow = true;
		if (target) {
			follow = target[target.length - 1] !== "!";
			const locale = target.replace(/!/g, "");
			chain.push(locale);
			if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) follow = blocks[locale];
		}
	}
	return follow;
}
var pathStateMachine = [];
pathStateMachine[0] = {
	["w"]: [0],
	["i"]: [3, 0],
	["["]: [4],
	["o"]: [7]
};
pathStateMachine[1] = {
	["w"]: [1],
	["."]: [2],
	["["]: [4],
	["o"]: [7]
};
pathStateMachine[2] = {
	["w"]: [2],
	["i"]: [3, 0],
	["0"]: [3, 0]
};
pathStateMachine[3] = {
	["i"]: [3, 0],
	["0"]: [3, 0],
	["w"]: [1, 1],
	["."]: [2, 1],
	["["]: [4, 1],
	["o"]: [7, 1]
};
pathStateMachine[4] = {
	["'"]: [5, 0],
	["\""]: [6, 0],
	["["]: [4, 2],
	["]"]: [1, 3],
	["o"]: 8,
	["l"]: [4, 0]
};
pathStateMachine[5] = {
	["'"]: [4, 0],
	["o"]: 8,
	["l"]: [5, 0]
};
pathStateMachine[6] = {
	["\""]: [4, 0],
	["o"]: 8,
	["l"]: [6, 0]
};
/**
* Check if an expression is a literal value.
*/
var literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
	return literalValueRE.test(exp);
}
/**
* Strip quotes from a string
*/
function stripQuotes(str) {
	const a = str.charCodeAt(0);
	return a === str.charCodeAt(str.length - 1) && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
/**
* Determine the type of a character in a keypath.
*/
function getPathCharType(ch) {
	if (ch === void 0 || ch === null) return "o";
	switch (ch.charCodeAt(0)) {
		case 91:
		case 93:
		case 46:
		case 34:
		case 39: return ch;
		case 95:
		case 36:
		case 45: return "i";
		case 9:
		case 10:
		case 13:
		case 160:
		case 65279:
		case 8232:
		case 8233: return "w";
	}
	return "i";
}
/**
* Format a subPath, return its plain form if it is
* a literal string or number. Otherwise prepend the
* dynamic indicator (*).
*/
function formatSubPath(path) {
	const trimmed = path.trim();
	if (path.charAt(0) === "0" && isNaN(parseInt(path))) return false;
	return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
/**
* Parse a string path into an array of segments
*/
function parse(path) {
	const keys = [];
	let index = -1;
	let mode = 0;
	let subPathDepth = 0;
	let c;
	let key;
	let newChar;
	let type;
	let transition;
	let action;
	let typeMap;
	const actions = [];
	actions[0] = () => {
		if (key === void 0) key = newChar;
		else key += newChar;
	};
	actions[1] = () => {
		if (key !== void 0) {
			keys.push(key);
			key = void 0;
		}
	};
	actions[2] = () => {
		actions[0]();
		subPathDepth++;
	};
	actions[3] = () => {
		if (subPathDepth > 0) {
			subPathDepth--;
			mode = 4;
			actions[0]();
		} else {
			subPathDepth = 0;
			if (key === void 0) return false;
			key = formatSubPath(key);
			if (key === false) return false;
			else actions[1]();
		}
	};
	function maybeUnescapeQuote() {
		const nextChar = path[index + 1];
		if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === "\"") {
			index++;
			newChar = "\\" + nextChar;
			actions[0]();
			return true;
		}
	}
	while (mode !== null) {
		index++;
		c = path[index];
		if (c === "\\" && maybeUnescapeQuote()) continue;
		type = getPathCharType(c);
		typeMap = pathStateMachine[mode];
		transition = typeMap[type] || typeMap["l"] || 8;
		if (transition === 8) return;
		mode = transition[0];
		if (transition[1] !== void 0) {
			action = actions[transition[1]];
			if (action) {
				newChar = c;
				if (action() === false) return;
			}
		}
		if (mode === 7) return keys;
	}
}
var cache = /* @__PURE__ */ new Map();
/**
* key-value message resolver
*
* @remarks
* Resolves messages with the key-value structure. Note that messages with a hierarchical structure such as objects cannot be resolved
*
* @param obj - A target object to be resolved with path
* @param path - A {@link Path | path} to resolve the value of message
*
* @returns A resolved {@link PathValue | path value}
*
* @VueI18nGeneral
*/
function resolveWithKeyValue(obj, path) {
	return isObject(obj) ? obj[path] : null;
}
/**
* message resolver
*
* @remarks
* Resolves messages. messages with a hierarchical structure such as objects can be resolved. This resolver is used in VueI18n as default.
*
* @param obj - A target object to be resolved with path
* @param path - A {@link Path | path} to resolve the value of message
*
* @returns A resolved {@link PathValue | path value}
*
* @VueI18nGeneral
*/
function resolveValue(obj, path) {
	if (!isObject(obj)) return null;
	let hit = cache.get(path);
	if (!hit) {
		hit = parse(path);
		if (hit) cache.set(path, hit);
	}
	if (!hit) return null;
	const len = hit.length;
	let last = obj;
	let i = 0;
	while (i < len) {
		const key = hit[i];
		/**
		* NOTE:
		* if `key` is intlify message format AST node key and `last` is intlify message format AST, skip it.
		* because the AST node is not a key-value structure.
		*/
		if (AST_NODE_PROPS_KEYS.includes(key) && isMessageAST(last)) return null;
		if (!isObject(last)) return null;
		if (!hasOwn(last, key)) return null;
		const val = last[key];
		if (val === void 0) return null;
		if (isFunction(last)) return null;
		last = val;
		i++;
	}
	return last;
}
var CoreWarnCodes = {
	NOT_FOUND_KEY: 1,
	FALLBACK_TO_TRANSLATE: 2,
	CANNOT_FORMAT_NUMBER: 3,
	FALLBACK_TO_NUMBER_FORMAT: 4,
	CANNOT_FORMAT_DATE: 5,
	FALLBACK_TO_DATE_FORMAT: 6,
	EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
	INVALID_NUMBER_ARGUMENT: 8,
	INVALID_DATE_ARGUMENT: 9
};
CoreWarnCodes.NOT_FOUND_KEY, CoreWarnCodes.FALLBACK_TO_TRANSLATE, CoreWarnCodes.CANNOT_FORMAT_NUMBER, CoreWarnCodes.FALLBACK_TO_NUMBER_FORMAT, CoreWarnCodes.CANNOT_FORMAT_DATE, CoreWarnCodes.FALLBACK_TO_DATE_FORMAT, CoreWarnCodes.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER, CoreWarnCodes.INVALID_NUMBER_ARGUMENT, CoreWarnCodes.INVALID_DATE_ARGUMENT;
/**
* Intlify core-base version
* @internal
*/
var VERSION$1 = "11.4.8";
var DEFAULT_LOCALE = "en-US";
var capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
	return {
		upper: (val, type) => {
			return type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
		},
		lower: (val, type) => {
			return type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
		},
		capitalize: (val, type) => {
			return type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
		}
	};
}
var _compiler;
function registerMessageCompiler(compiler) {
	_compiler = compiler;
}
var _resolver;
/**
* Register the message resolver
*
* @param resolver - A {@link MessageResolver} function
*
* @VueI18nGeneral
*/
function registerMessageResolver(resolver) {
	_resolver = resolver;
}
var _fallbacker;
/**
* Register the locale fallbacker
*
* @param fallbacker - A {@link LocaleFallbacker} function
*
* @VueI18nGeneral
*/
function registerLocaleFallbacker(fallbacker) {
	_fallbacker = fallbacker;
}
var _additionalMeta = null;
var getAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ () => _additionalMeta;
var _fallbackContext = null;
var setFallbackContext = (context) => {
	_fallbackContext = context;
};
var getFallbackContext = () => _fallbackContext;
var _cid = 0;
function createCoreContext(options = {}) {
	const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
	const version = isString(options.version) ? options.version : VERSION$1;
	const locale = isString(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE;
	const _locale = isFunction(locale) ? DEFAULT_LOCALE : locale;
	const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
	const messages = isPlainObject(options.messages) ? options.messages : createResources(_locale);
	const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale);
	const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : createResources(_locale);
	const modifiers = assign(create(), options.modifiers, getDefaultLinkedModifiers());
	const pluralRules = options.pluralRules || create();
	const missing = isFunction(options.missing) ? options.missing : null;
	const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
	const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
	const fallbackFormat = !!options.fallbackFormat;
	const unresolving = !!options.unresolving;
	const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
	const processor = isPlainObject(options.processor) ? options.processor : null;
	const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
	const escapeParameter = !!options.escapeParameter;
	const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
	const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
	const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
	const fallbackContext = isObject(options.fallbackContext) ? options.fallbackContext : void 0;
	const internalOptions = options;
	const __datetimeFormatters = isObject(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
	const __numberFormatters = isObject(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
	const __meta = isObject(internalOptions.__meta) ? internalOptions.__meta : {};
	_cid++;
	const context = {
		version,
		cid: _cid,
		locale,
		fallbackLocale,
		messages,
		modifiers,
		pluralRules,
		missing,
		missingWarn,
		fallbackWarn,
		fallbackFormat,
		unresolving,
		postTranslation,
		processor,
		warnHtmlMessage,
		escapeParameter,
		messageCompiler,
		messageResolver,
		localeFallbacker,
		fallbackContext,
		onWarn,
		__meta
	};
	context.datetimeFormats = datetimeFormats;
	context.numberFormats = numberFormats;
	context.__datetimeFormatters = __datetimeFormatters;
	context.__numberFormatters = __numberFormatters;
	if (__INTLIFY_PROD_DEVTOOLS__) initI18nDevTools(context, version, __meta);
	return context;
}
var createResources = (locale) => ({ [locale]: create() });
/** @internal */
function handleMissing(context, key, locale, missingWarn, type) {
	const { missing, onWarn } = context;
	if (missing !== null) {
		const ret = missing(context, locale, key, type);
		return isString(ret) ? ret : key;
	} else return key;
}
/** @internal */
function updateFallbackLocale(ctx, locale, fallback) {
	const context = ctx;
	context.__localeChainCache = /* @__PURE__ */ new Map();
	ctx.localeFallbacker(ctx, fallback, locale);
}
/** @internal */
function isAlmostSameLocale(locale, compareLocale) {
	if (locale === compareLocale) return false;
	return locale.split("-")[0] === compareLocale.split("-")[0];
}
/** @internal */
function isImplicitFallback(targetLocale, locales) {
	const index = locales.indexOf(targetLocale);
	if (index === -1) return false;
	for (let i = index + 1; i < locales.length; i++) if (isAlmostSameLocale(targetLocale, locales[i])) return true;
	return false;
}
function resolveFormatLocale(context, key, locale, formats, missingWarn, fallbackWarn, type) {
	const { fallbackLocale, localeFallbacker, onWarn } = context;
	const locales = localeFallbacker(context, fallbackLocale, locale);
	for (let i = 0; i < locales.length; i++) {
		const targetLocale = locales[i];
		const format = (formats[targetLocale] || {})[key];
		if (isPlainObject(format) && isString(targetLocale)) return targetLocale;
		handleMissing(context, key, targetLocale, missingWarn, type);
	}
	return null;
}
function getFormatterCacheKey(locale, key, overrides) {
	let id = `${locale}__${key}`;
	if (isPlainObject(overrides) && !isEmptyObject(overrides)) id = `${id}__${JSON.stringify(overrides)}`;
	return id;
}
function clearFormatCache(formatters, locale, format) {
	for (const key in format) {
		const prefix = `${locale}__${key}`;
		for (const id of formatters.keys()) if (id === prefix || id.startsWith(`${prefix}__`)) formatters.delete(id);
	}
}
function parseFormatArgs(args, options, initialOverrides, optionsKeys) {
	const [, arg2, arg3, arg4] = args;
	let overrides = initialOverrides;
	if (isString(arg2)) options.key = arg2;
	else if (isPlainObject(arg2)) Object.keys(arg2).forEach((key) => {
		if (optionsKeys.includes(key)) overrides[key] = arg2[key];
		else options[key] = arg2[key];
	});
	if (isString(arg3)) options.locale = arg3;
	else if (isPlainObject(arg3)) overrides = arg3;
	if (isPlainObject(arg4)) overrides = arg4;
	return overrides;
}
var intlDefined = typeof Intl !== "undefined";
intlDefined && Intl.DateTimeFormat, intlDefined && Intl.NumberFormat;
function datetime(context, ...args) {
	const { datetimeFormats, unresolving, onWarn } = context;
	const { __datetimeFormatters } = context;
	if (!isString(args[0]) && !isDate(args[0]) && !isNumber(args[0])) return "";
	const [key, value, options, overrides] = parseDateTimeArgs(...args);
	const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
	const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
	const part = !!options.part;
	const locale = getLocale(context, options);
	if (!isString(key) || key === "") {
		const formatter = new Intl.DateTimeFormat(locale.replace(/!/g, ""), overrides);
		return !part ? formatter.format(value) : formatter.formatToParts(value);
	}
	const targetLocale = resolveFormatLocale(context, key, locale, datetimeFormats, missingWarn, fallbackWarn, "datetime format");
	if (!isString(targetLocale)) return unresolving ? -1 : key;
	const format = datetimeFormats[targetLocale][key];
	const id = getFormatterCacheKey(targetLocale, key, overrides);
	let formatter = __datetimeFormatters.get(id);
	if (!formatter) {
		formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format, overrides));
		__datetimeFormatters.set(id, formatter);
	}
	return !part ? formatter.format(value) : formatter.formatToParts(value);
}
/** @internal */
var DATETIME_FORMAT_OPTIONS_KEYS = [
	"localeMatcher",
	"weekday",
	"era",
	"year",
	"month",
	"day",
	"hour",
	"minute",
	"second",
	"timeZoneName",
	"formatMatcher",
	"hour12",
	"timeZone",
	"dateStyle",
	"timeStyle",
	"calendar",
	"dayPeriod",
	"numberingSystem",
	"hourCycle",
	"fractionalSecondDigits"
];
/** @internal */
function parseDateTimeArgs(...args) {
	const [arg1] = args;
	const options = create();
	const initialOverrides = create();
	let value;
	if (isString(arg1)) {
		const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
		if (!matches) throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
		const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
		value = new Date(dateTime);
		try {
			value.toISOString();
		} catch {
			throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
		}
	} else if (isDate(arg1)) {
		if (isNaN(arg1.getTime())) throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
		value = arg1;
	} else if (isNumber(arg1)) value = arg1;
	else throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
	const overrides = parseFormatArgs(args, options, initialOverrides, DATETIME_FORMAT_OPTIONS_KEYS);
	return [
		options.key || "",
		value,
		options,
		overrides
	];
}
/** @internal */
function clearDateTimeFormat(ctx, locale, format) {
	clearFormatCache(ctx.__datetimeFormatters, locale, format);
}
function number(context, ...args) {
	const { numberFormats, unresolving, onWarn } = context;
	const { __numberFormatters } = context;
	if (!isNumber(args[0])) return "";
	const [key, value, options, overrides] = parseNumberArgs(...args);
	const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
	const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
	const part = !!options.part;
	const locale = getLocale(context, options);
	if (!isString(key) || key === "") {
		const formatter = new Intl.NumberFormat(locale.replace(/!/g, ""), overrides);
		return !part ? formatter.format(value) : formatter.formatToParts(value);
	}
	const targetLocale = resolveFormatLocale(context, key, locale, numberFormats, missingWarn, fallbackWarn, "number format");
	if (!isString(targetLocale)) return unresolving ? -1 : key;
	const format = numberFormats[targetLocale][key];
	const id = getFormatterCacheKey(targetLocale, key, overrides);
	let formatter = __numberFormatters.get(id);
	if (!formatter) {
		formatter = new Intl.NumberFormat(targetLocale, assign({}, format, overrides));
		__numberFormatters.set(id, formatter);
	}
	return !part ? formatter.format(value) : formatter.formatToParts(value);
}
/** @internal */
var NUMBER_FORMAT_OPTIONS_KEYS = [
	"localeMatcher",
	"style",
	"currency",
	"currencyDisplay",
	"currencySign",
	"useGrouping",
	"minimumIntegerDigits",
	"minimumFractionDigits",
	"maximumFractionDigits",
	"minimumSignificantDigits",
	"maximumSignificantDigits",
	"compactDisplay",
	"notation",
	"signDisplay",
	"unit",
	"unitDisplay",
	"roundingMode",
	"roundingPriority",
	"roundingIncrement",
	"trailingZeroDisplay"
];
/** @internal */
function parseNumberArgs(...args) {
	const [arg1] = args;
	const options = create();
	const initialOverrides = create();
	if (!isNumber(arg1)) throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
	const value = arg1;
	const overrides = parseFormatArgs(args, options, initialOverrides, NUMBER_FORMAT_OPTIONS_KEYS);
	return [
		options.key || "",
		value,
		options,
		overrides
	];
}
/** @internal */
function clearNumberFormat(ctx, locale, format) {
	clearFormatCache(ctx.__numberFormatters, locale, format);
}
var DEFAULT_MODIFIER = (str) => str;
var DEFAULT_MESSAGE = (ctx) => "";
var DEFAULT_MESSAGE_DATA_TYPE = "text";
var DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join(values);
var DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
	choice = Math.abs(choice);
	if (choicesLength === 2) return choice === 1 ? 0 : 1;
	return Math.min(choice, 2);
}
function getPluralIndex(options) {
	const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
	return isNumber(options.named?.count) ? options.named.count : isNumber(options.named?.n) ? options.named.n : index;
}
function createMessageContext(options = {}) {
	const locale = options.locale;
	const pluralIndex = getPluralIndex(options);
	const pluralRule = isString(locale) && isFunction(options.pluralRules?.[locale]) ? options.pluralRules[locale] : pluralDefault;
	const orgPluralRule = pluralRule === pluralDefault ? void 0 : pluralDefault;
	const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
	const _list = options.list || [];
	const list = (index) => _list[index];
	const _named = options.named || create();
	if (isNumber(options.pluralIndex)) {
		_named.count ||= options.pluralIndex;
		_named.n ||= options.pluralIndex;
	}
	const named = (key) => _named[key];
	function message(key, useLinked) {
		const msg = isFunction(options.messages) ? options.messages(key, !!useLinked) : isObject(options.messages) ? options.messages[key] : false;
		return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
	}
	const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
	const normalize = isFunction(options.processor?.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
	const interpolate = isFunction(options.processor?.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
	const type = isString(options.processor?.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
	const linked = (key, ...args) => {
		const [arg1, arg2] = args;
		let type = "text";
		let modifier = "";
		if (args.length === 1) {
			if (isObject(arg1)) {
				modifier = arg1.modifier || modifier;
				type = arg1.type || type;
			} else if (isString(arg1)) modifier = arg1 || modifier;
		} else if (args.length === 2) {
			if (isString(arg1)) modifier = arg1 || modifier;
			if (isString(arg2)) type = arg2 || type;
		}
		const ret = message(key, true)(ctx);
		const resolved = ret === "" || ret === void 0 ? key : ret;
		const msg = type === "vnode" && isArray(resolved) && modifier ? resolved[0] : resolved;
		return modifier ? _modifier(modifier)(msg, type) : msg;
	};
	const ctx = {
		["list"]: list,
		["named"]: named,
		["plural"]: plural,
		["linked"]: linked,
		["message"]: message,
		["type"]: type,
		["interpolate"]: interpolate,
		["normalize"]: normalize,
		["values"]: assign(create(), _list, _named)
	};
	return ctx;
}
var NOOP_MESSAGE_FUNCTION = () => "";
var isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
	const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
	const [key, options] = parseTranslateArgs(...args);
	const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
	const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
	const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
	const resolvedMessage = !!options.resolvedMessage;
	const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : null;
	const enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString(defaultMsgOrKey) || isFunction(defaultMsgOrKey));
	const locale = getLocale(context, options);
	escapeParameter && escapeParams(options);
	let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
		key,
		locale,
		messages[locale] || create()
	];
	let format = formatScope;
	let cacheBaseKey = key;
	if (!resolvedMessage && !(isString(format) || isMessageAST(format) || isMessageFunction(format))) {
		if (enableDefaultMsg) {
			format = defaultMsgOrKey;
			cacheBaseKey = format;
		}
	}
	if (!resolvedMessage && (!(isString(format) || isMessageAST(format) || isMessageFunction(format)) || !isString(targetLocale))) return unresolving ? -1 : key;
	let occurred = false;
	const onError = () => {
		occurred = true;
	};
	const msg = !isMessageFunction(format) ? compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, onError) : format;
	if (occurred) return format;
	const messaged = evaluateMessage(context, msg, createMessageContext(getMessageContextOptions(context, targetLocale, message, options)));
	let ret = postTranslation ? postTranslation(messaged, key) : messaged;
	if (escapeParameter && isString(ret)) ret = sanitizeTranslatedHtml(ret);
	if (__INTLIFY_PROD_DEVTOOLS__) {
		const payloads = {
			timestamp: Date.now(),
			key: isString(key) ? key : isMessageFunction(format) ? format.key : "",
			locale: targetLocale || (isMessageFunction(format) ? format.locale : ""),
			format: isString(format) ? format : isMessageFunction(format) ? format.source : "",
			message: ret
		};
		payloads.meta = assign({}, context.__meta, /* @__PURE__ */ getAdditionalMeta() || {});
		translateDevTools(payloads);
	}
	return ret;
}
function escapeParams(options) {
	if (isArray(options.list)) options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
	else if (isObject(options.named)) Object.keys(options.named).forEach((key) => {
		if (isString(options.named[key])) options.named[key] = escapeHtml(options.named[key]);
	});
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
	const { messages, onWarn, messageResolver: resolveValue, localeFallbacker } = context;
	const locales = localeFallbacker(context, fallbackLocale, locale);
	let message = create();
	let targetLocale;
	let format = null;
	const type = "translate";
	for (let i = 0; i < locales.length; i++) {
		targetLocale = locales[i];
		message = messages[targetLocale] || create();
		if ((format = resolveValue(message, key)) === null) format = message[key];
		if (isString(format) || isMessageAST(format) || isMessageFunction(format)) break;
		if (!isImplicitFallback(targetLocale, locales)) {
			const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
			if (missingRet !== key) format = missingRet;
		}
	}
	return [
		format,
		targetLocale,
		message
	];
}
function compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, onError) {
	const { messageCompiler, warnHtmlMessage } = context;
	if (isMessageFunction(format)) {
		const msg = format;
		msg.locale = msg.locale || targetLocale;
		msg.key = msg.key || key;
		return msg;
	}
	if (messageCompiler == null) {
		const msg = (() => format);
		msg.locale = targetLocale;
		msg.key = key;
		return msg;
	}
	const msg = messageCompiler(format, getCompileContext(context, targetLocale, cacheBaseKey, format, warnHtmlMessage, onError));
	msg.locale = targetLocale;
	msg.key = key;
	msg.source = format;
	return msg;
}
function evaluateMessage(context, msg, msgCtx) {
	return msg(msgCtx);
}
/** @internal */
function parseTranslateArgs(...args) {
	const [arg1, arg2, arg3] = args;
	const options = create();
	if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
	const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
	if (isNumber(arg2)) options.plural = arg2;
	else if (isString(arg2)) options.default = arg2;
	else if (isPlainObject(arg2) && !isEmptyObject(arg2)) options.named = arg2;
	else if (isArray(arg2)) options.list = arg2;
	if (isNumber(arg3)) options.plural = arg3;
	else if (isString(arg3)) options.default = arg3;
	else if (isPlainObject(arg3)) assign(options, arg3);
	return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
	return {
		locale,
		key,
		warnHtmlMessage,
		onError: (err) => {
			onError && onError(err);
			throw err;
		},
		onCacheKey: (source) => generateFormatCacheKey(locale, key, source)
	};
}
function getMessageContextOptions(context, locale, message, options) {
	const { modifiers, pluralRules, messageResolver: resolveValue, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
	const resolveMessage = (key, useLinked) => {
		let val = resolveValue(message, key);
		if (val == null && (fallbackContext || useLinked)) {
			const [format, , message] = resolveMessageFormat(fallbackContext || context, key, locale, fallbackLocale, fallbackWarn, missingWarn);
			val = format ?? resolveValue(message, key);
		}
		if (isString(val) || isMessageAST(val)) {
			let occurred = false;
			const onError = () => {
				occurred = true;
			};
			const msg = compileMessageFormat(context, key, locale, val, key, onError);
			return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
		} else if (isMessageFunction(val)) return val;
		else return NOOP_MESSAGE_FUNCTION;
	};
	const ctxOptions = {
		locale,
		modifiers,
		pluralRules,
		messages: resolveMessage
	};
	if (context.processor) ctxOptions.processor = context.processor;
	if (options.list) ctxOptions.list = options.list;
	if (options.named) ctxOptions.named = options.named;
	if (isNumber(options.plural)) ctxOptions.pluralIndex = options.plural;
	return ctxOptions;
}
initFeatureFlags$1();
//#endregion
//#region node_modules/vue-i18n/dist/vue-i18n.runtime.mjs
/*!
* vue-i18n v11.4.8
* (c) 2026 kazuya kawaguchi
* Released under the MIT License.
*/
/**
* Vue I18n Version
*
* @remarks
* Semver format. Same format as the package.json `version` field.
*
* @VueI18nGeneral
*/
var VERSION = "11.4.8";
/**
* This is only called in esm-bundler builds.
* istanbul-ignore-next
*/
function initFeatureFlags() {
	if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
}
var I18nErrorCodes = {
	UNEXPECTED_RETURN_TYPE: 24,
	INVALID_ARGUMENT: 25,
	MUST_BE_CALL_SETUP_TOP: 26,
	NOT_INSTALLED: 27,
	REQUIRED_VALUE: 28,
	INVALID_VALUE: 29,
	CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
	NOT_INSTALLED_WITH_PROVIDE: 31,
	UNEXPECTED_ERROR: 32,
	NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
	NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function createI18nError(code, ...args) {
	return createCompileError(code, null, void 0);
}
I18nErrorCodes.UNEXPECTED_RETURN_TYPE, I18nErrorCodes.INVALID_ARGUMENT, I18nErrorCodes.MUST_BE_CALL_SETUP_TOP, I18nErrorCodes.NOT_INSTALLED, I18nErrorCodes.UNEXPECTED_ERROR, I18nErrorCodes.REQUIRED_VALUE, I18nErrorCodes.INVALID_VALUE, I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN, I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE, I18nErrorCodes.NOT_COMPATIBLE_LEGACY_VUE_I18N, I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY;
var TranslateVNodeSymbol = /* #__PURE__*/ makeSymbol("__translateVNode");
var DatetimePartsSymbol = /* #__PURE__*/ makeSymbol("__datetimeParts");
var NumberPartsSymbol = /* #__PURE__*/ makeSymbol("__numberParts");
var SetPluralRulesSymbol = makeSymbol("__setPluralRules");
makeSymbol("__intlifyMeta");
var InejctWithOptionSymbol = /* #__PURE__*/ makeSymbol("__injectWithOption");
var DisposeSymbol = /* #__PURE__*/ makeSymbol("__dispose");
var I18nWarnCodes = {
	FALLBACK_TO_ROOT: 10,
	NOT_FOUND_PARENT_SCOPE: 11,
	IGNORE_OBJ_FLATTEN: 12,
	/**
	* @deprecated will be removed at vue-i18n v12
	*/
	DEPRECATE_LEGACY_MODE: 13,
	/**
	* @deprecated will be removed at vue-i18n v12
	*/
	DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE: 14,
	DUPLICATE_USE_I18N_CALLING: 15
};
I18nWarnCodes.FALLBACK_TO_ROOT, I18nWarnCodes.NOT_FOUND_PARENT_SCOPE, I18nWarnCodes.IGNORE_OBJ_FLATTEN, I18nWarnCodes.DEPRECATE_LEGACY_MODE, I18nWarnCodes.DEPRECATE_TRANSLATE_CUSTOME_DIRECTIVE, I18nWarnCodes.DUPLICATE_USE_I18N_CALLING;
/**
* Transform flat json in obj to normal json in obj
*/
function handleFlatJson(obj) {
	if (!isObject(obj)) return obj;
	if (isMessageAST(obj)) return obj;
	for (const key in obj) {
		if (!hasOwn(obj, key)) continue;
		if (!key.includes(".")) {
			if (isObject(obj[key])) handleFlatJson(obj[key]);
		} else {
			const subKeys = key.split(".");
			const lastIndex = subKeys.length - 1;
			let currentObj = obj;
			let hasStringValue = false;
			for (let i = 0; i < lastIndex; i++) {
				if (subKeys[i] === "__proto__") throw new Error(`unsafe key: ${subKeys[i]}`);
				if (!(subKeys[i] in currentObj)) currentObj[subKeys[i]] = create();
				if (!isObject(currentObj[subKeys[i]])) {
					hasStringValue = true;
					break;
				}
				currentObj = currentObj[subKeys[i]];
			}
			if (!hasStringValue) {
				if (!isMessageAST(currentObj)) {
					currentObj[subKeys[lastIndex]] = obj[key];
					delete obj[key];
				} else if (!AST_NODE_PROPS_KEYS.includes(subKeys[lastIndex])) delete obj[key];
			}
			if (!isMessageAST(currentObj)) {
				const target = currentObj[subKeys[lastIndex]];
				if (isObject(target)) handleFlatJson(target);
			}
		}
	}
	return obj;
}
function getLocaleMessages(locale, options) {
	const { messages, __i18n, messageResolver, flatJson } = options;
	const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? create() : { [locale]: create() };
	if (isArray(__i18n)) __i18n.forEach((custom) => {
		if ("locale" in custom && "resource" in custom) {
			const { locale, resource } = custom;
			if (locale) {
				ret[locale] = ret[locale] || create();
				deepCopy(resource, ret[locale]);
			} else deepCopy(resource, ret);
		} else isString(custom) && deepCopy(JSON.parse(custom), ret);
	});
	if (messageResolver == null && flatJson) {
		for (const key in ret) if (hasOwn(ret, key)) handleFlatJson(ret[key]);
	}
	return ret;
}
function getComponentOptions(instance) {
	return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
	let messages = isObject(options.messages) ? options.messages : create();
	if ("__i18nGlobal" in componentOptions) messages = getLocaleMessages(gl.locale.value, {
		messages,
		__i18n: componentOptions.__i18nGlobal
	});
	const locales = Object.keys(messages);
	if (locales.length) locales.forEach((locale) => {
		gl.mergeLocaleMessage(locale, messages[locale]);
	});
	if (isObject(options.datetimeFormats)) {
		const locales = Object.keys(options.datetimeFormats);
		if (locales.length) locales.forEach((locale) => {
			gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
		});
	}
	if (isObject(options.numberFormats)) {
		const locales = Object.keys(options.numberFormats);
		if (locales.length) locales.forEach((locale) => {
			gl.mergeNumberFormat(locale, options.numberFormats[locale]);
		});
	}
}
function createTextNode(key) {
	return createVNode(Text, null, key, 0);
}
function getCurrentInstance() {
	const key = "currentInstance";
	if (key in vue_runtime_esm_bundler_exports) return vue_runtime_esm_bundler_exports[key];
	else return getCurrentInstance$1();
}
var NOOP_RETURN_ARRAY = () => [];
var NOOP_RETURN_FALSE = () => false;
var composerID = 0;
function defineCoreMissingHandler(missing) {
	return ((ctx, locale, key, type) => {
		return missing(locale, key, getCurrentInstance() || void 0, type);
	});
}
/**
* Create composer interface factory
*
* @internal
*/
function createComposer(options = {}) {
	const { __root, __injectWithOption } = options;
	const _isGlobal = __root === void 0;
	const flatJson = options.flatJson;
	const _ref = inBrowser ? ref : shallowRef;
	let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
	const _locale = _ref(__root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE);
	const _fallbackLocale = _ref(__root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value);
	const _messages = _ref(getLocaleMessages(_locale.value, options));
	const _datetimeFormats = _ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
	const _numberFormats = _ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
	let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
	let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
	let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
	let _fallbackFormat = !!options.fallbackFormat;
	let _missing = isFunction(options.missing) ? options.missing : null;
	let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
	let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
	let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
	let _escapeParameter = !!options.escapeParameter;
	const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
	let _pluralRules = options.pluralRules || __root && __root.pluralRules;
	let _context;
	const getCoreContext = () => {
		_isGlobal && setFallbackContext(null);
		const ctxOptions = {
			version: VERSION,
			locale: _locale.value,
			fallbackLocale: _fallbackLocale.value,
			messages: _messages.value,
			modifiers: _modifiers,
			pluralRules: _pluralRules,
			missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
			missingWarn: _missingWarn,
			fallbackWarn: _fallbackWarn,
			fallbackFormat: _fallbackFormat,
			unresolving: true,
			postTranslation: _postTranslation === null ? void 0 : _postTranslation,
			warnHtmlMessage: _warnHtmlMessage,
			escapeParameter: _escapeParameter,
			messageResolver: options.messageResolver,
			messageCompiler: options.messageCompiler,
			__meta: { framework: "vue" }
		};
		ctxOptions.datetimeFormats = _datetimeFormats.value;
		ctxOptions.numberFormats = _numberFormats.value;
		ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
		ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
		const ctx = createCoreContext(ctxOptions);
		_isGlobal && setFallbackContext(ctx);
		return ctx;
	};
	_context = getCoreContext();
	updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
	function trackReactivityValues() {
		return [
			_locale.value,
			_fallbackLocale.value,
			_messages.value,
			_datetimeFormats.value,
			_numberFormats.value
		];
	}
	const locale = computed({
		get: () => _locale.value,
		set: (val) => {
			_context.locale = val;
			_locale.value = val;
		}
	});
	const fallbackLocale = computed({
		get: () => _fallbackLocale.value,
		set: (val) => {
			_context.fallbackLocale = val;
			_fallbackLocale.value = val;
			updateFallbackLocale(_context, _locale.value, val);
		}
	});
	const messages = computed(() => _messages.value);
	const datetimeFormats = /* #__PURE__*/ computed(() => _datetimeFormats.value);
	const numberFormats = /* #__PURE__*/ computed(() => _numberFormats.value);
	function getPostTranslationHandler() {
		return isFunction(_postTranslation) ? _postTranslation : null;
	}
	function setPostTranslationHandler(handler) {
		_postTranslation = handler;
		_context.postTranslation = handler;
	}
	function getMissingHandler() {
		return _missing;
	}
	function setMissingHandler(handler) {
		if (handler !== null) _runtimeMissing = defineCoreMissingHandler(handler);
		_missing = handler;
		_context.missing = _runtimeMissing;
	}
	const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
		trackReactivityValues();
		let ret;
		try {
			if (__INTLIFY_PROD_DEVTOOLS__);
			if (!_isGlobal) _context.fallbackContext = __root ? getFallbackContext() : void 0;
			ret = fn(_context);
		} finally {
			if (__INTLIFY_PROD_DEVTOOLS__);
			if (!_isGlobal) _context.fallbackContext = void 0;
		}
		if (warnType !== "translate exists" && isNumber(ret) && ret === -1 || warnType === "translate exists" && !ret) {
			const [key, arg2] = argumentParser();
			return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
		} else if (successCondition(ret)) return ret;
		else
 /* istanbul ignore next */
		throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
	};
	function t(...args) {
		return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString(val));
	}
	function rt(...args) {
		const [arg1, arg2, arg3] = args;
		if (arg3 && !isObject(arg3)) throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
		return t(...[
			arg1,
			arg2,
			assign({ resolvedMessage: true }, arg3 || {})
		]);
	}
	function d(...args) {
		return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => "", (val) => isString(val) || isArray(val));
	}
	function n(...args) {
		return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => "", (val) => isString(val) || isArray(val));
	}
	function normalize(values) {
		return values.map((val) => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
	}
	const interpolate = (val) => val;
	const processor = {
		normalize,
		interpolate,
		type: "vnode"
	};
	function translateVNode(...args) {
		return wrapWithDeps((context) => {
			let ret;
			const _context = context;
			try {
				_context.processor = processor;
				ret = Reflect.apply(translate, null, [_context, ...args]);
			} finally {
				_context.processor = null;
			}
			return ret;
		}, () => parseTranslateArgs(...args), "translate", (root) => root[TranslateVNodeSymbol](...args), (key) => [createTextNode(key)], (val) => isArray(val));
	}
	function numberParts(...args) {
		return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString(val) || isArray(val));
	}
	function datetimeParts(...args) {
		return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString(val) || isArray(val));
	}
	function setPluralRules(rules) {
		_pluralRules = rules;
		_context.pluralRules = _pluralRules;
	}
	function te(key, locale) {
		return wrapWithDeps(() => {
			if (!key) return false;
			const targetLocale = isString(locale) ? locale : _locale.value;
			const locales = isString(locale) ? [targetLocale] : fallbackWithLocaleChain(_context, _fallbackLocale.value, targetLocale);
			for (let i = 0; i < locales.length; i++) {
				const message = getLocaleMessage(locales[i]);
				let resolved = _context.messageResolver(message, key);
				if (resolved === null) resolved = message[key];
				if (isMessageAST(resolved) || isMessageFunction(resolved) || isString(resolved)) return true;
			}
			return false;
		}, () => [key], "translate exists", (root) => {
			return Reflect.apply(root.te, root, [key, locale]);
		}, NOOP_RETURN_FALSE, (val) => isBoolean(val));
	}
	function resolveMessages(key) {
		let messages = null;
		const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
		for (let i = 0; i < locales.length; i++) {
			const targetLocaleMessages = _messages.value[locales[i]] || {};
			const messageValue = _context.messageResolver(targetLocaleMessages, key);
			if (messageValue != null) {
				messages = messageValue;
				break;
			}
		}
		return messages;
	}
	function tm(key) {
		const messages = resolveMessages(key);
		return messages != null ? messages : __root ? __root.tm(key) || {} : {};
	}
	function getLocaleMessage(locale) {
		return _messages.value[locale] || {};
	}
	function setLocaleMessage(locale, message) {
		if (flatJson) {
			const _message = { [locale]: message };
			for (const key in _message) if (hasOwn(_message, key)) handleFlatJson(_message[key]);
			message = _message[locale];
		}
		_messages.value[locale] = message;
		_context.messages = _messages.value;
	}
	function mergeLocaleMessage(locale, message) {
		_messages.value[locale] = _messages.value[locale] || {};
		const _message = { [locale]: message };
		if (flatJson) {
			for (const key in _message) if (hasOwn(_message, key)) handleFlatJson(_message[key]);
		}
		message = _message[locale];
		deepCopy(message, _messages.value[locale]);
		_context.messages = _messages.value;
	}
	function getDateTimeFormat(locale) {
		return _datetimeFormats.value[locale] || {};
	}
	function setDateTimeFormat(locale, format) {
		_datetimeFormats.value[locale] = format;
		_context.datetimeFormats = _datetimeFormats.value;
		clearDateTimeFormat(_context, locale, format);
	}
	function mergeDateTimeFormat(locale, format) {
		_datetimeFormats.value[locale] = assign(_datetimeFormats.value[locale] || {}, format);
		_context.datetimeFormats = _datetimeFormats.value;
		clearDateTimeFormat(_context, locale, format);
	}
	function getNumberFormat(locale) {
		return _numberFormats.value[locale] || {};
	}
	function setNumberFormat(locale, format) {
		_numberFormats.value[locale] = format;
		_context.numberFormats = _numberFormats.value;
		clearNumberFormat(_context, locale, format);
	}
	function mergeNumberFormat(locale, format) {
		_numberFormats.value[locale] = assign(_numberFormats.value[locale] || {}, format);
		_context.numberFormats = _numberFormats.value;
		clearNumberFormat(_context, locale, format);
	}
	composerID++;
	if (__root && inBrowser) {
		watch(__root.locale, (val) => {
			if (_inheritLocale) {
				_locale.value = val;
				_context.locale = val;
				updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
			}
		});
		watch(__root.fallbackLocale, (val) => {
			if (_inheritLocale) {
				_fallbackLocale.value = val;
				_context.fallbackLocale = val;
				updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
			}
		});
	}
	const composer = {
		id: composerID,
		locale,
		fallbackLocale,
		get inheritLocale() {
			return _inheritLocale;
		},
		set inheritLocale(val) {
			_inheritLocale = val;
			if (val && __root) {
				_locale.value = __root.locale.value;
				_fallbackLocale.value = __root.fallbackLocale.value;
				updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
			}
		},
		get availableLocales() {
			return Object.keys(_messages.value).sort();
		},
		messages,
		get modifiers() {
			return _modifiers;
		},
		get pluralRules() {
			return _pluralRules || {};
		},
		get isGlobal() {
			return _isGlobal;
		},
		get missingWarn() {
			return _missingWarn;
		},
		set missingWarn(val) {
			_missingWarn = val;
			_context.missingWarn = _missingWarn;
		},
		get fallbackWarn() {
			return _fallbackWarn;
		},
		set fallbackWarn(val) {
			_fallbackWarn = val;
			_context.fallbackWarn = _fallbackWarn;
		},
		get fallbackRoot() {
			return _fallbackRoot;
		},
		set fallbackRoot(val) {
			_fallbackRoot = val;
		},
		get fallbackFormat() {
			return _fallbackFormat;
		},
		set fallbackFormat(val) {
			_fallbackFormat = val;
			_context.fallbackFormat = _fallbackFormat;
		},
		get warnHtmlMessage() {
			return _warnHtmlMessage;
		},
		set warnHtmlMessage(val) {
			_warnHtmlMessage = val;
			_context.warnHtmlMessage = val;
		},
		get escapeParameter() {
			return _escapeParameter;
		},
		set escapeParameter(val) {
			_escapeParameter = val;
			_context.escapeParameter = val;
		},
		t,
		getLocaleMessage,
		setLocaleMessage,
		mergeLocaleMessage,
		getPostTranslationHandler,
		setPostTranslationHandler,
		getMissingHandler,
		setMissingHandler,
		[SetPluralRulesSymbol]: setPluralRules
	};
	composer.datetimeFormats = datetimeFormats;
	composer.numberFormats = numberFormats;
	composer.rt = rt;
	composer.te = te;
	composer.tm = tm;
	composer.d = d;
	composer.n = n;
	composer.getDateTimeFormat = getDateTimeFormat;
	composer.setDateTimeFormat = setDateTimeFormat;
	composer.mergeDateTimeFormat = mergeDateTimeFormat;
	composer.getNumberFormat = getNumberFormat;
	composer.setNumberFormat = setNumberFormat;
	composer.mergeNumberFormat = mergeNumberFormat;
	composer[InejctWithOptionSymbol] = __injectWithOption;
	composer[TranslateVNodeSymbol] = translateVNode;
	composer[DatetimePartsSymbol] = datetimeParts;
	composer[NumberPartsSymbol] = numberParts;
	return composer;
}
var baseFormatProps = {
	tag: { type: [String, Object] },
	locale: { type: String },
	scope: {
		type: String,
		validator: (val) => val === "parent" || val === "global",
		default: "parent"
	},
	i18n: { type: Object }
};
function getInterpolateArg({ slots }, keys) {
	if (keys.length === 1 && keys[0] === "default") return (slots.default ? slots.default() : []).reduce((slot, current) => {
		return [...slot, ...current.type === Fragment ? current.children : [current]];
	}, []);
	else return keys.reduce((arg, key) => {
		const slot = slots[key];
		if (slot) arg[key] = slot();
		return arg;
	}, create());
}
function getFragmentableTag() {
	return Fragment;
}
/**
* export the public type for h/tsx inference
* also to avoid inline import() in generated d.ts files
*/
/**
* Translation Component
*
* @remarks
* See the following items for property about details
*
* @VueI18nSee [TranslationProps](component#translationprops)
* @VueI18nSee [BaseFormatProps](component#baseformatprops)
* @VueI18nSee [Component Interpolation](../guide/advanced/component)
*
* @example
* ```html
* <div id="app">
*   <!-- ... -->
*   <i18n keypath="term" tag="label" for="tos">
*     <a :href="url" target="_blank">{{ $t('tos') }}</a>
*   </i18n>
*   <!-- ... -->
* </div>
* ```
* ```js
* import { createApp } from 'vue'
* import { createI18n } from 'vue-i18n'
*
* const messages = {
*   en: {
*     tos: 'Term of Service',
*     term: 'I accept xxx {0}.'
*   },
*   ja: {
*     tos: '利用規約',
*     term: '私は xxx の{0}に同意します。'
*   }
* }
*
* const i18n = createI18n({
*   locale: 'en',
*   messages
* })
*
* const app = createApp({
*   data: {
*     url: '/term'
*   }
* }).use(i18n).mount('#app')
* ```
*
* @VueI18nComponent
*/
var Translation = /* @__PURE__ */ defineComponent({
	name: "i18n-t",
	props: assign({
		keypath: {
			type: String,
			required: true
		},
		plural: {
			type: [Number, String],
			validator: (val) => isNumber(val) || !isNaN(val)
		}
	}, baseFormatProps),
	setup(props, context) {
		const { slots, attrs } = context;
		const i18n = props.i18n || useI18n({
			useScope: props.scope,
			__useComponent: true
		});
		return () => {
			const renderChildren = () => {
				const keys = Object.keys(slots).filter((key) => key[0] !== "_");
				const options = create();
				if (props.locale) options.locale = props.locale;
				if (props.plural !== void 0) options.plural = isString(props.plural) ? +props.plural : props.plural;
				const arg = getInterpolateArg(context, keys);
				return i18n[TranslateVNodeSymbol](props.keypath, arg, options);
			};
			const assignedAttrs = assign(create(), attrs);
			const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
			return isObject(tag) ? h(tag, assignedAttrs, { default: renderChildren }) : h(tag, assignedAttrs, renderChildren());
		};
	}
});
function isVNode(target) {
	return isArray(target) && !isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
	const { slots, attrs } = context;
	return () => {
		const renderChildren = () => {
			const options = { part: true };
			let overrides = create();
			if (props.locale) options.locale = props.locale;
			if (isString(props.format)) options.key = props.format;
			else if (isObject(props.format)) {
				if (isString(props.format.key)) options.key = props.format.key;
				overrides = Object.keys(props.format).reduce((options, prop) => {
					return slotKeys.includes(prop) ? assign(create(), options, { [prop]: props.format[prop] }) : options;
				}, create());
			}
			const parts = partFormatter(...[
				props.value,
				options,
				overrides
			]);
			let children = [options.key];
			if (isArray(parts)) children = parts.map((part, index) => {
				const slot = slots[part.type];
				const node = slot ? slot({
					[part.type]: part.value,
					index,
					parts
				}) : [part.value];
				if (isVNode(node)) node[0].key = `${part.type}-${index}`;
				return node;
			});
			else if (isString(parts)) children = [parts];
			return children;
		};
		const assignedAttrs = assign(create(), attrs);
		const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
		return isObject(tag) ? h(tag, assignedAttrs, { default: renderChildren }) : h(tag, assignedAttrs, renderChildren());
	};
}
/**
* export the public type for h/tsx inference
* also to avoid inline import() in generated d.ts files
*/
/**
* Number Format Component
*
* @remarks
* See the following items for property about details
*
* @VueI18nSee [FormattableProps](component#formattableprops)
* @VueI18nSee [BaseFormatProps](component#baseformatprops)
* @VueI18nSee [Custom Formatting](../guide/essentials/number#custom-formatting)
*
* @VueI18nDanger
* Not supported IE, due to no support `Intl.NumberFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
*
* If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-numberformat)
*
* @VueI18nComponent
*/
var NumberFormat = /* @__PURE__ */ defineComponent({
	name: "i18n-n",
	props: assign({
		value: {
			type: Number,
			required: true
		},
		format: { type: [String, Object] }
	}, baseFormatProps),
	setup(props, context) {
		const i18n = props.i18n || useI18n({
			useScope: props.scope,
			__useComponent: true
		});
		return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => i18n[NumberPartsSymbol](...args));
	}
});
function getComposer$1(i18n, instance) {
	const i18nInternal = i18n;
	if (i18n.mode === "composition") return i18nInternal.__getInstance(instance) || i18n.global;
	else {
		const vueI18n = i18nInternal.__getInstance(instance);
		return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
	}
}
/**
* @deprecated will be removed at vue-i18n v12
*/
function vTDirective(i18n) {
	const _process = (binding) => {
		const { instance, value } = binding;
		/* istanbul ignore if */
		if (!instance || !instance.$) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
		const composer = getComposer$1(i18n, instance.$);
		const parsedValue = parseValue(value);
		return [Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]), composer];
	};
	const register = (el, binding) => {
		const [textContent, composer] = _process(binding);
		if (inBrowser) el.__i18nWatcher = watch(composer.locale, () => {
			binding.instance && binding.instance.$forceUpdate();
		});
		el.__composer = composer;
		el.textContent = textContent;
	};
	const unregister = (el) => {
		if (inBrowser && el.__i18nWatcher) {
			el.__i18nWatcher();
			el.__i18nWatcher = void 0;
			delete el.__i18nWatcher;
		}
		if (el.__composer) {
			el.__composer = void 0;
			delete el.__composer;
		}
	};
	const update = (el, { value }) => {
		if (el.__composer) {
			const composer = el.__composer;
			const parsedValue = parseValue(value);
			el.textContent = Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]);
		}
	};
	const getSSRProps = (binding) => {
		const [textContent] = _process(binding);
		return { textContent };
	};
	return {
		created: register,
		unmounted: unregister,
		beforeUpdate: update,
		getSSRProps
	};
}
function parseValue(value) {
	if (isString(value)) return { path: value };
	else if (isPlainObject(value)) {
		if (!("path" in value)) throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
		return value;
	} else throw createI18nError(I18nErrorCodes.INVALID_VALUE);
}
function makeParams(value) {
	const { path, locale, args, choice, plural } = value;
	const options = {};
	const named = args || {};
	if (isString(locale)) options.locale = locale;
	if (isNumber(choice)) options.plural = choice;
	if (isNumber(plural)) options.plural = plural;
	return [
		path,
		named,
		options
	];
}
function apply(app, i18n, ...options) {
	const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
	if (isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true) {
		[Translation.name, "I18nT"].forEach((name) => app.component(name, Translation));
		[NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
		[DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
	}
	app.directive("t", vTDirective(i18n));
}
/**
* Injection key for {@link useI18n}
*
* @remarks
* The global injection key for I18n instances with `useI18n`. this injection key is used in Web Components.
* Specify the i18n instance created by {@link createI18n} together with `provide` function.
*
* @VueI18nGeneral
*/
var I18nInjectionKey = /* #__PURE__*/ makeSymbol("global-vue-i18n");
function createI18n(options = {}) {
	const __legacyMode = false;
	const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
	const __instances = /* @__PURE__ */ new Map();
	const [globalScope, __global] = createGlobal(options, __legacyMode);
	const symbol = /* #__PURE__*/ makeSymbol("");
	function __getInstance(component) {
		return __instances.get(component) || null;
	}
	function __setInstance(component, instance) {
		__instances.set(component, instance);
	}
	function __deleteInstance(component) {
		__instances.delete(component);
	}
	const i18n = {
		get mode() {
			return "composition";
		},
		async install(app, ...options) {
			app.__VUE_I18N_SYMBOL__ = symbol;
			app.provide(app.__VUE_I18N_SYMBOL__, i18n);
			if (isPlainObject(options[0])) {
				const opts = options[0];
				i18n.__composerExtend = opts.__composerExtend;
				i18n.__vueI18nExtend = opts.__vueI18nExtend;
			}
			let globalReleaseHandler = null;
			if (__globalInjection) globalReleaseHandler = injectGlobalFields(app, i18n.global);
			apply(app, i18n, ...options);
			const unmountApp = app.unmount;
			app.unmount = () => {
				globalReleaseHandler && globalReleaseHandler();
				i18n.dispose();
				unmountApp();
			};
		},
		get global() {
			return __global;
		},
		dispose() {
			globalScope.stop();
		},
		__instances,
		__getInstance,
		__setInstance,
		__deleteInstance
	};
	return i18n;
}
function useI18n(options = {}) {
	const instance = getCurrentInstance();
	if (instance == null) throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
	if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
	const i18n = getI18nInstance(instance);
	const gl = getGlobalComposer(i18n);
	const componentOptions = getComponentOptions(instance);
	const scope = getScope(options, componentOptions);
	if (scope === "global") {
		adjustI18nResources(gl, options, componentOptions);
		return gl;
	}
	if (scope === "parent") {
		let composer = getComposer(i18n, instance, options.__useComponent);
		if (composer == null) composer = gl;
		return composer;
	}
	if (scope === "isolated") {
		if (i18n.mode !== "composition") throw createI18nError(I18nErrorCodes.NOT_AVAILABLE_COMPOSITION_IN_LEGACY);
		const i18nInternalIso = i18n;
		const composerOptions = assign({}, options);
		composerOptions.__root = getComposer(i18n, instance) || gl;
		const composer = createComposer(composerOptions);
		if (i18nInternalIso.__composerExtend) composer[DisposeSymbol] = i18nInternalIso.__composerExtend(composer);
		if (getCurrentScope()) onScopeDispose(() => {
			const dispose = composer[DisposeSymbol];
			if (dispose) {
				dispose();
				delete composer[DisposeSymbol];
			}
		});
		return composer;
	}
	const i18nInternal = i18n;
	let composer = i18nInternal.__getInstance(instance);
	if (composer == null) {
		const composerOptions = assign({}, options);
		if ("__i18n" in componentOptions) composerOptions.__i18n = componentOptions.__i18n;
		if (gl) composerOptions.__root = gl;
		composer = createComposer(composerOptions);
		if (i18nInternal.__composerExtend) composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
		setupLifeCycle(i18nInternal, instance, composer);
		i18nInternal.__setInstance(instance, composer);
	}
	return composer;
}
function createGlobal(options, legacyMode) {
	const scope = effectScope();
	const obj = scope.run(() => createComposer(options));
	if (obj == null) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
	return [scope, obj];
}
function getI18nInstance(instance) {
	const i18n = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
	/* istanbul ignore if */
	if (!i18n) throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
	return i18n;
}
function getScope(options, componentOptions) {
	return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
	return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer(i18n, target, useComponent = false) {
	let composer = null;
	const root = target.root;
	let current = getParentComponentInstance(target, useComponent);
	while (current != null) {
		const i18nInternal = i18n;
		if (i18n.mode === "composition") composer = i18nInternal.__getInstance(current);
		if (composer != null) break;
		if (root === current) break;
		current = current.parent;
	}
	return composer;
}
function getParentComponentInstance(target, useComponent = false) {
	if (target == null) return null;
	return !useComponent ? target.parent : target.vnode.ctx || target.parent;
}
function setupLifeCycle(i18n, target, composer) {
	onMounted(() => {}, target);
	onUnmounted(() => {
		const _composer = composer;
		i18n.__deleteInstance(target);
		const dispose = _composer[DisposeSymbol];
		if (dispose) {
			dispose();
			delete _composer[DisposeSymbol];
		}
	}, target);
}
var globalExportProps = [
	"locale",
	"fallbackLocale",
	"availableLocales"
];
var globalExportMethods = [
	"t",
	"rt",
	"d",
	"n",
	"tm",
	"te"
];
function injectGlobalFields(app, composer) {
	const i18n = Object.create(null);
	globalExportProps.forEach((prop) => {
		const desc = Object.getOwnPropertyDescriptor(composer, prop);
		if (!desc) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
		const wrap = isRef(desc.value) ? {
			get() {
				return desc.value.value;
			},
			set(val) {
				desc.value.value = val;
			}
		} : { get() {
			return desc.get && desc.get();
		} };
		Object.defineProperty(i18n, prop, wrap);
	});
	app.config.globalProperties.$i18n = i18n;
	globalExportMethods.forEach((method) => {
		const desc = Object.getOwnPropertyDescriptor(composer, method);
		if (!desc || !desc.value) throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
		Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
	});
	const dispose = () => {
		delete app.config.globalProperties.$i18n;
		globalExportMethods.forEach((method) => {
			delete app.config.globalProperties[`$${method}`];
		});
	};
	return dispose;
}
/**
* Datetime Format Component
*
* @remarks
* See the following items for property about details
*
* @VueI18nSee [FormattableProps](component#formattableprops)
* @VueI18nSee [BaseFormatProps](component#baseformatprops)
* @VueI18nSee [Custom Formatting](../guide/essentials/datetime#custom-formatting)
*
* @VueI18nDanger
* Not supported IE, due to no support `Intl.DateTimeFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
*
* If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-datetimeformat)
*
* @VueI18nComponent
*/
var DatetimeFormat = /* @__PURE__ */ defineComponent({
	name: "i18n-d",
	props: assign({
		value: {
			type: [Number, Date],
			required: true
		},
		format: { type: [String, Object] }
	}, baseFormatProps),
	setup(props, context) {
		const i18n = props.i18n || useI18n({
			useScope: props.scope,
			__useComponent: true
		});
		return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => i18n[DatetimePartsSymbol](...args));
	}
});
initFeatureFlags();
registerMessageCompiler(compile);
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
if (__INTLIFY_PROD_DEVTOOLS__) {
	const target = getGlobalThis();
	target.__INTLIFY__ = true;
	setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
//#endregion
//#region src/utils/i18n.ts
var i18n = createI18n({
	globalInjection: true,
	legacy: false,
	locale: "en",
	fallbackLocale: "en",
	messages: messages_default
});
var { data: currentLocale } = useBrowserLocalStorage("user-locale", "en");
i18n.global.locale.value = currentLocale.value;
//#endregion
//#region src/composables/useLocale.ts
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
function useLocale() {
	let defaultLocale = "en";
	const localeKey = "user-locale";
	import_browser_polyfill.storage.local.get(localeKey).then(async (result) => {
		if (result?.[localeKey] == void 0) {
			const lang = navigator.language.split("-")[0];
			defaultLocale = i18n?.global?.availableLocales?.includes(lang) ? lang : defaultLocale;
			i18n.global.locale.value = defaultLocale;
		}
	});
	const { data: currentLocale } = useBrowserLocalStorage(localeKey, defaultLocale, false);
	watch(currentLocale, (newLocale) => {
		i18n.global.locale.value = newLocale;
	});
	return currentLocale;
}
//#endregion
//#region src/stores/options.store.ts
var { data: settings, promise } = useBrowserSyncStorage("settings", defaultSettings);
var useOptionsStore = defineStore("options", () => {
	return { settings };
});
var SettingsPromise = promise;
var { data: crunchyList, promise: crunchyListPromise } = useBrowserSyncStorage("crunchyList", [], false);
defineStore("crunchyList", () => {
	return { crunchyList };
});
var useFrontendStore = defineStore("frontend", () => {
	const { isDark, toggleDark } = useTheme();
	return {
		isDark,
		toggleDark,
		currentLocale: useLocale()
	};
});
var { data: hiddenTitles, promise: hiddenTitlesPromise } = useBrowserLocalStorage("hiddenTitles", {}, false);
var useHiddenTitlesStore = defineStore("hiddenTitles", () => {
	return { hiddenTitles };
});
//#endregion
export { i18n as a, createPinia as c, vModelSelect as d, vModelText as f, useOptionsStore as i, storeToRefs as l, useFrontendStore as n, useI18n as o, useHiddenTitlesStore as r, useTheme as s, SettingsPromise as t, createApp as u };
