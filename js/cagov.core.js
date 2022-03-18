/**
 * CA State Template v5.6 -  @version v5.6.2 -  3/18/2022 
  STYLES COMPILED FROM SOURCE (source/js) DO NOT MODIFY */
/*! modernizr (Custom Build) | MIT *
 * https://modernizr.com/download/?-flexbox-setclasses !*/
!function (e, n, t) { function r(e, n) { return typeof e === n } function o() { var e, n, t, o, s, i, l; for (var a in S) if (S.hasOwnProperty(a)) { if (e = [], n = S[a], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++)e.push(n.options.aliases[t].toLowerCase()); for (o = r(n.fn, "function") ? n.fn() : n.fn, s = 0; s < e.length; s++)i = e[s], l = i.split("."), 1 === l.length ? Modernizr[l[0]] = o : (!Modernizr[l[0]] || Modernizr[l[0]] instanceof Boolean || (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])), Modernizr[l[0]][l[1]] = o), C.push((o ? "" : "no-") + l.join("-")) } } function s(e) { var n = x.className, t = Modernizr._config.classPrefix || ""; if (_ && (n = n.baseVal), Modernizr._config.enableJSClass) { var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)"); n = n.replace(r, "$1" + t + "js$2") } Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), _ ? x.className.baseVal = n : x.className = n) } function i(e, n) { return !!~("" + e).indexOf(n) } function l() { return "function" != typeof n.createElement ? n.createElement(arguments[0]) : _ ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments) } function a(e) { return e.replace(/([a-z])-([a-z])/g, function (e, n, t) { return n + t.toUpperCase() }).replace(/^-/, "") } function f(e, n) { return function () { return e.apply(n, arguments) } } function u(e, n, t) { var o; for (var s in e) if (e[s] in n) return t === !1 ? e[s] : (o = n[e[s]], r(o, "function") ? f(o, t || n) : o); return !1 } function c(e) { return e.replace(/([A-Z])/g, function (e, n) { return "-" + n.toLowerCase() }).replace(/^ms-/, "-ms-") } function p(n, t, r) { var o; if ("getComputedStyle" in e) { o = getComputedStyle.call(e, n, t); var s = e.console; if (null !== o) r && (o = o.getPropertyValue(r)); else if (s) { var i = s.error ? "error" : "log"; s[i].call(s, "getComputedStyle returning null, its possible modernizr test results are inaccurate") } } else o = !t && n.currentStyle && n.currentStyle[r]; return o } function d() { var e = n.body; return e || (e = l(_ ? "svg" : "body"), e.fake = !0), e } function m(e, t, r, o) { var s, i, a, f, u = "modernizr", c = l("div"), p = d(); if (parseInt(r, 10)) for (; r--;)a = l("div"), a.id = o ? o[r] : u + (r + 1), c.appendChild(a); return s = l("style"), s.type = "text/css", s.id = "s" + u, (p.fake ? p : c).appendChild(s), p.appendChild(c), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(n.createTextNode(e)), c.id = u, p.fake && (p.style.background = "", p.style.overflow = "hidden", f = x.style.overflow, x.style.overflow = "hidden", x.appendChild(p)), i = t(c, e), p.fake ? (p.parentNode.removeChild(p), x.style.overflow = f, x.offsetHeight) : c.parentNode.removeChild(c), !!i } function y(n, r) { var o = n.length; if ("CSS" in e && "supports" in e.CSS) { for (; o--;)if (e.CSS.supports(c(n[o]), r)) return !0; return !1 } if ("CSSSupportsRule" in e) { for (var s = []; o--;)s.push("(" + c(n[o]) + ":" + r + ")"); return s = s.join(" or "), m("@supports (" + s + ") { #modernizr { position: absolute; } }", function (e) { return "absolute" == p(e, null, "position") }) } return t } function v(e, n, o, s) { function f() { c && (delete N.style, delete N.modElem) } if (s = r(s, "undefined") ? !1 : s, !r(o, "undefined")) { var u = y(e, o); if (!r(u, "undefined")) return u } for (var c, p, d, m, v, g = ["modernizr", "tspan", "samp"]; !N.style && g.length;)c = !0, N.modElem = l(g.shift()), N.style = N.modElem.style; for (d = e.length, p = 0; d > p; p++)if (m = e[p], v = N.style[m], i(m, "-") && (m = a(m)), N.style[m] !== t) { if (s || r(o, "undefined")) return f(), "pfx" == n ? m : !0; try { N.style[m] = o } catch (h) { } if (N.style[m] != v) return f(), "pfx" == n ? m : !0 } return f(), !1 } function g(e, n, t, o, s) { var i = e.charAt(0).toUpperCase() + e.slice(1), l = (e + " " + P.join(i + " ") + i).split(" "); return r(n, "string") || r(n, "undefined") ? v(l, n, o, s) : (l = (e + " " + z.join(i + " ") + i).split(" "), u(l, n, t)) } function h(e, n, r) { return g(e, t, t, n, r) } var C = [], S = [], w = { _version: "3.6.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function (e, n) { var t = this; setTimeout(function () { n(t[e]) }, 0) }, addTest: function (e, n, t) { S.push({ name: e, fn: n, options: t }) }, addAsyncTest: function (e) { S.push({ name: null, fn: e }) } }, Modernizr = function () { }; Modernizr.prototype = w, Modernizr = new Modernizr; var x = n.documentElement, _ = "svg" === x.nodeName.toLowerCase(), b = "Moz O ms Webkit", P = w._config.usePrefixes ? b.split(" ") : []; w._cssomPrefixes = P; var z = w._config.usePrefixes ? b.toLowerCase().split(" ") : []; w._domPrefixes = z; var E = { elem: l("modernizr") }; Modernizr._q.push(function () { delete E.elem }); var N = { style: E.elem.style }; Modernizr._q.unshift(function () { delete N.style }), w.testAllProps = g, w.testAllProps = h, Modernizr.addTest("flexbox", h("flexBasis", "1px", !0)), o(), s(C), delete w.addTest, delete w.addAsyncTest; for (var T = 0; T < Modernizr._q.length; T++)Modernizr._q[T](); e.Modernizr = Modernizr }(window, document);
/*!
  * Bootstrap v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).bootstrap=e()}(this,(function(){"use strict";const t="transitionend",e=t=>{let e=t.getAttribute("data-bs-target");if(!e||"#"===e){let i=t.getAttribute("href");if(!i||!i.includes("#")&&!i.startsWith("."))return null;i.includes("#")&&!i.startsWith("#")&&(i=`#${i.split("#")[1]}`),e=i&&"#"!==i?i.trim():null}return e},i=t=>{const i=e(t);return i&&document.querySelector(i)?i:null},n=t=>{const i=e(t);return i?document.querySelector(i):null},s=e=>{e.dispatchEvent(new Event(t))},o=t=>!(!t||"object"!=typeof t)&&(void 0!==t.jquery&&(t=t[0]),void 0!==t.nodeType),r=t=>o(t)?t.jquery?t[0]:t:"string"==typeof t&&t.length>0?document.querySelector(t):null,a=(t,e,i)=>{Object.keys(i).forEach((n=>{const s=i[n],r=e[n],a=r&&o(r)?"element":null==(l=r)?`${l}`:{}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase();var l;if(!new RegExp(s).test(a))throw new TypeError(`${t.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${s}".`)}))},l=t=>!(!o(t)||0===t.getClientRects().length)&&"visible"===getComputedStyle(t).getPropertyValue("visibility"),c=t=>!t||t.nodeType!==Node.ELEMENT_NODE||!!t.classList.contains("disabled")||(void 0!==t.disabled?t.disabled:t.hasAttribute("disabled")&&"false"!==t.getAttribute("disabled")),h=t=>{if(!document.documentElement.attachShadow)return null;if("function"==typeof t.getRootNode){const e=t.getRootNode();return e instanceof ShadowRoot?e:null}return t instanceof ShadowRoot?t:t.parentNode?h(t.parentNode):null},d=()=>{},u=t=>{t.offsetHeight},f=()=>{const{jQuery:t}=window;return t&&!document.body.hasAttribute("data-bs-no-jquery")?t:null},p=[],m=()=>"rtl"===document.documentElement.dir,g=t=>{var e;e=()=>{const e=f();if(e){const i=t.NAME,n=e.fn[i];e.fn[i]=t.jQueryInterface,e.fn[i].Constructor=t,e.fn[i].noConflict=()=>(e.fn[i]=n,t.jQueryInterface)}},"loading"===document.readyState?(p.length||document.addEventListener("DOMContentLoaded",(()=>{p.forEach((t=>t()))})),p.push(e)):e()},_=t=>{"function"==typeof t&&t()},b=(e,i,n=!0)=>{if(!n)return void _(e);const o=(t=>{if(!t)return 0;let{transitionDuration:e,transitionDelay:i}=window.getComputedStyle(t);const n=Number.parseFloat(e),s=Number.parseFloat(i);return n||s?(e=e.split(",")[0],i=i.split(",")[0],1e3*(Number.parseFloat(e)+Number.parseFloat(i))):0})(i)+5;let r=!1;const a=({target:n})=>{n===i&&(r=!0,i.removeEventListener(t,a),_(e))};i.addEventListener(t,a),setTimeout((()=>{r||s(i)}),o)},v=(t,e,i,n)=>{let s=t.indexOf(e);if(-1===s)return t[!i&&n?t.length-1:0];const o=t.length;return s+=i?1:-1,n&&(s=(s+o)%o),t[Math.max(0,Math.min(s,o-1))]},y=/[^.]*(?=\..*)\.|.*/,w=/\..*/,E=/::\d+$/,A={};let T=1;const O={mouseenter:"mouseover",mouseleave:"mouseout"},C=/^(mouseenter|mouseleave)/i,k=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function L(t,e){return e&&`${e}::${T++}`||t.uidEvent||T++}function x(t){const e=L(t);return t.uidEvent=e,A[e]=A[e]||{},A[e]}function D(t,e,i=null){const n=Object.keys(t);for(let s=0,o=n.length;s<o;s++){const o=t[n[s]];if(o.originalHandler===e&&o.delegationSelector===i)return o}return null}function S(t,e,i){const n="string"==typeof e,s=n?i:e;let o=P(t);return k.has(o)||(o=t),[n,s,o]}function N(t,e,i,n,s){if("string"!=typeof e||!t)return;if(i||(i=n,n=null),C.test(e)){const t=t=>function(e){if(!e.relatedTarget||e.relatedTarget!==e.delegateTarget&&!e.delegateTarget.contains(e.relatedTarget))return t.call(this,e)};n?n=t(n):i=t(i)}const[o,r,a]=S(e,i,n),l=x(t),c=l[a]||(l[a]={}),h=D(c,r,o?i:null);if(h)return void(h.oneOff=h.oneOff&&s);const d=L(r,e.replace(y,"")),u=o?function(t,e,i){return function n(s){const o=t.querySelectorAll(e);for(let{target:r}=s;r&&r!==this;r=r.parentNode)for(let a=o.length;a--;)if(o[a]===r)return s.delegateTarget=r,n.oneOff&&j.off(t,s.type,e,i),i.apply(r,[s]);return null}}(t,i,n):function(t,e){return function i(n){return n.delegateTarget=t,i.oneOff&&j.off(t,n.type,e),e.apply(t,[n])}}(t,i);u.delegationSelector=o?i:null,u.originalHandler=r,u.oneOff=s,u.uidEvent=d,c[d]=u,t.addEventListener(a,u,o)}function I(t,e,i,n,s){const o=D(e[i],n,s);o&&(t.removeEventListener(i,o,Boolean(s)),delete e[i][o.uidEvent])}function P(t){return t=t.replace(w,""),O[t]||t}const j={on(t,e,i,n){N(t,e,i,n,!1)},one(t,e,i,n){N(t,e,i,n,!0)},off(t,e,i,n){if("string"!=typeof e||!t)return;const[s,o,r]=S(e,i,n),a=r!==e,l=x(t),c=e.startsWith(".");if(void 0!==o){if(!l||!l[r])return;return void I(t,l,r,o,s?i:null)}c&&Object.keys(l).forEach((i=>{!function(t,e,i,n){const s=e[i]||{};Object.keys(s).forEach((o=>{if(o.includes(n)){const n=s[o];I(t,e,i,n.originalHandler,n.delegationSelector)}}))}(t,l,i,e.slice(1))}));const h=l[r]||{};Object.keys(h).forEach((i=>{const n=i.replace(E,"");if(!a||e.includes(n)){const e=h[i];I(t,l,r,e.originalHandler,e.delegationSelector)}}))},trigger(t,e,i){if("string"!=typeof e||!t)return null;const n=f(),s=P(e),o=e!==s,r=k.has(s);let a,l=!0,c=!0,h=!1,d=null;return o&&n&&(a=n.Event(e,i),n(t).trigger(a),l=!a.isPropagationStopped(),c=!a.isImmediatePropagationStopped(),h=a.isDefaultPrevented()),r?(d=document.createEvent("HTMLEvents"),d.initEvent(s,l,!0)):d=new CustomEvent(e,{bubbles:l,cancelable:!0}),void 0!==i&&Object.keys(i).forEach((t=>{Object.defineProperty(d,t,{get:()=>i[t]})})),h&&d.preventDefault(),c&&t.dispatchEvent(d),d.defaultPrevented&&void 0!==a&&a.preventDefault(),d}},M=new Map,H={set(t,e,i){M.has(t)||M.set(t,new Map);const n=M.get(t);n.has(e)||0===n.size?n.set(e,i):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`)},get:(t,e)=>M.has(t)&&M.get(t).get(e)||null,remove(t,e){if(!M.has(t))return;const i=M.get(t);i.delete(e),0===i.size&&M.delete(t)}};class B{constructor(t){(t=r(t))&&(this._element=t,H.set(this._element,this.constructor.DATA_KEY,this))}dispose(){H.remove(this._element,this.constructor.DATA_KEY),j.off(this._element,this.constructor.EVENT_KEY),Object.getOwnPropertyNames(this).forEach((t=>{this[t]=null}))}_queueCallback(t,e,i=!0){b(t,e,i)}static getInstance(t){return H.get(r(t),this.DATA_KEY)}static getOrCreateInstance(t,e={}){return this.getInstance(t)||new this(t,"object"==typeof e?e:null)}static get VERSION(){return"5.1.3"}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}}const R=(t,e="hide")=>{const i=`click.dismiss${t.EVENT_KEY}`,s=t.NAME;j.on(document,i,`[data-bs-dismiss="${s}"]`,(function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),c(this))return;const o=n(this)||this.closest(`.${s}`);t.getOrCreateInstance(o)[e]()}))};class W extends B{static get NAME(){return"alert"}close(){if(j.trigger(this._element,"close.bs.alert").defaultPrevented)return;this._element.classList.remove("show");const t=this._element.classList.contains("fade");this._queueCallback((()=>this._destroyElement()),this._element,t)}_destroyElement(){this._element.remove(),j.trigger(this._element,"closed.bs.alert"),this.dispose()}static jQueryInterface(t){return this.each((function(){const e=W.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}R(W,"close"),g(W);const $='[data-bs-toggle="button"]';class z extends B{static get NAME(){return"button"}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle("active"))}static jQueryInterface(t){return this.each((function(){const e=z.getOrCreateInstance(this);"toggle"===t&&e[t]()}))}}function q(t){return"true"===t||"false"!==t&&(t===Number(t).toString()?Number(t):""===t||"null"===t?null:t)}function F(t){return t.replace(/[A-Z]/g,(t=>`-${t.toLowerCase()}`))}j.on(document,"click.bs.button.data-api",$,(t=>{t.preventDefault();const e=t.target.closest($);z.getOrCreateInstance(e).toggle()})),g(z);const U={setDataAttribute(t,e,i){t.setAttribute(`data-bs-${F(e)}`,i)},removeDataAttribute(t,e){t.removeAttribute(`data-bs-${F(e)}`)},getDataAttributes(t){if(!t)return{};const e={};return Object.keys(t.dataset).filter((t=>t.startsWith("bs"))).forEach((i=>{let n=i.replace(/^bs/,"");n=n.charAt(0).toLowerCase()+n.slice(1,n.length),e[n]=q(t.dataset[i])})),e},getDataAttribute:(t,e)=>q(t.getAttribute(`data-bs-${F(e)}`)),offset(t){const e=t.getBoundingClientRect();return{top:e.top+window.pageYOffset,left:e.left+window.pageXOffset}},position:t=>({top:t.offsetTop,left:t.offsetLeft})},V={find:(t,e=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(e,t)),findOne:(t,e=document.documentElement)=>Element.prototype.querySelector.call(e,t),children:(t,e)=>[].concat(...t.children).filter((t=>t.matches(e))),parents(t,e){const i=[];let n=t.parentNode;for(;n&&n.nodeType===Node.ELEMENT_NODE&&3!==n.nodeType;)n.matches(e)&&i.push(n),n=n.parentNode;return i},prev(t,e){let i=t.previousElementSibling;for(;i;){if(i.matches(e))return[i];i=i.previousElementSibling}return[]},next(t,e){let i=t.nextElementSibling;for(;i;){if(i.matches(e))return[i];i=i.nextElementSibling}return[]},focusableChildren(t){const e=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map((t=>`${t}:not([tabindex^="-"])`)).join(", ");return this.find(e,t).filter((t=>!c(t)&&l(t)))}},K="carousel",X={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},Y={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},Q="next",G="prev",Z="left",J="right",tt={ArrowLeft:J,ArrowRight:Z},et="slid.bs.carousel",it="active",nt=".active.carousel-item";class st extends B{constructor(t,e){super(t),this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(e),this._indicatorsElement=V.findOne(".carousel-indicators",this._element),this._touchSupported="ontouchstart"in document.documentElement||navigator.maxTouchPoints>0,this._pointerEvent=Boolean(window.PointerEvent),this._addEventListeners()}static get Default(){return X}static get NAME(){return K}next(){this._slide(Q)}nextWhenVisible(){!document.hidden&&l(this._element)&&this.next()}prev(){this._slide(G)}pause(t){t||(this._isPaused=!0),V.findOne(".carousel-item-next, .carousel-item-prev",this._element)&&(s(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null}cycle(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config&&this._config.interval&&!this._isPaused&&(this._updateInterval(),this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))}to(t){this._activeElement=V.findOne(nt,this._element);const e=this._getItemIndex(this._activeElement);if(t>this._items.length-1||t<0)return;if(this._isSliding)return void j.one(this._element,et,(()=>this.to(t)));if(e===t)return this.pause(),void this.cycle();const i=t>e?Q:G;this._slide(i,this._items[t])}_getConfig(t){return t={...X,...U.getDataAttributes(this._element),..."object"==typeof t?t:{}},a(K,t,Y),t}_handleSwipe(){const t=Math.abs(this.touchDeltaX);if(t<=40)return;const e=t/this.touchDeltaX;this.touchDeltaX=0,e&&this._slide(e>0?J:Z)}_addEventListeners(){this._config.keyboard&&j.on(this._element,"keydown.bs.carousel",(t=>this._keydown(t))),"hover"===this._config.pause&&(j.on(this._element,"mouseenter.bs.carousel",(t=>this.pause(t))),j.on(this._element,"mouseleave.bs.carousel",(t=>this.cycle(t)))),this._config.touch&&this._touchSupported&&this._addTouchEventListeners()}_addTouchEventListeners(){const t=t=>this._pointerEvent&&("pen"===t.pointerType||"touch"===t.pointerType),e=e=>{t(e)?this.touchStartX=e.clientX:this._pointerEvent||(this.touchStartX=e.touches[0].clientX)},i=t=>{this.touchDeltaX=t.touches&&t.touches.length>1?0:t.touches[0].clientX-this.touchStartX},n=e=>{t(e)&&(this.touchDeltaX=e.clientX-this.touchStartX),this._handleSwipe(),"hover"===this._config.pause&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout((t=>this.cycle(t)),500+this._config.interval))};V.find(".carousel-item img",this._element).forEach((t=>{j.on(t,"dragstart.bs.carousel",(t=>t.preventDefault()))})),this._pointerEvent?(j.on(this._element,"pointerdown.bs.carousel",(t=>e(t))),j.on(this._element,"pointerup.bs.carousel",(t=>n(t))),this._element.classList.add("pointer-event")):(j.on(this._element,"touchstart.bs.carousel",(t=>e(t))),j.on(this._element,"touchmove.bs.carousel",(t=>i(t))),j.on(this._element,"touchend.bs.carousel",(t=>n(t))))}_keydown(t){if(/input|textarea/i.test(t.target.tagName))return;const e=tt[t.key];e&&(t.preventDefault(),this._slide(e))}_getItemIndex(t){return this._items=t&&t.parentNode?V.find(".carousel-item",t.parentNode):[],this._items.indexOf(t)}_getItemByOrder(t,e){const i=t===Q;return v(this._items,e,i,this._config.wrap)}_triggerSlideEvent(t,e){const i=this._getItemIndex(t),n=this._getItemIndex(V.findOne(nt,this._element));return j.trigger(this._element,"slide.bs.carousel",{relatedTarget:t,direction:e,from:n,to:i})}_setActiveIndicatorElement(t){if(this._indicatorsElement){const e=V.findOne(".active",this._indicatorsElement);e.classList.remove(it),e.removeAttribute("aria-current");const i=V.find("[data-bs-target]",this._indicatorsElement);for(let e=0;e<i.length;e++)if(Number.parseInt(i[e].getAttribute("data-bs-slide-to"),10)===this._getItemIndex(t)){i[e].classList.add(it),i[e].setAttribute("aria-current","true");break}}}_updateInterval(){const t=this._activeElement||V.findOne(nt,this._element);if(!t)return;const e=Number.parseInt(t.getAttribute("data-bs-interval"),10);e?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=e):this._config.interval=this._config.defaultInterval||this._config.interval}_slide(t,e){const i=this._directionToOrder(t),n=V.findOne(nt,this._element),s=this._getItemIndex(n),o=e||this._getItemByOrder(i,n),r=this._getItemIndex(o),a=Boolean(this._interval),l=i===Q,c=l?"carousel-item-start":"carousel-item-end",h=l?"carousel-item-next":"carousel-item-prev",d=this._orderToDirection(i);if(o&&o.classList.contains(it))return void(this._isSliding=!1);if(this._isSliding)return;if(this._triggerSlideEvent(o,d).defaultPrevented)return;if(!n||!o)return;this._isSliding=!0,a&&this.pause(),this._setActiveIndicatorElement(o),this._activeElement=o;const f=()=>{j.trigger(this._element,et,{relatedTarget:o,direction:d,from:s,to:r})};if(this._element.classList.contains("slide")){o.classList.add(h),u(o),n.classList.add(c),o.classList.add(c);const t=()=>{o.classList.remove(c,h),o.classList.add(it),n.classList.remove(it,h,c),this._isSliding=!1,setTimeout(f,0)};this._queueCallback(t,n,!0)}else n.classList.remove(it),o.classList.add(it),this._isSliding=!1,f();a&&this.cycle()}_directionToOrder(t){return[J,Z].includes(t)?m()?t===Z?G:Q:t===Z?Q:G:t}_orderToDirection(t){return[Q,G].includes(t)?m()?t===G?Z:J:t===G?J:Z:t}static carouselInterface(t,e){const i=st.getOrCreateInstance(t,e);let{_config:n}=i;"object"==typeof e&&(n={...n,...e});const s="string"==typeof e?e:n.slide;if("number"==typeof e)i.to(e);else if("string"==typeof s){if(void 0===i[s])throw new TypeError(`No method named "${s}"`);i[s]()}else n.interval&&n.ride&&(i.pause(),i.cycle())}static jQueryInterface(t){return this.each((function(){st.carouselInterface(this,t)}))}static dataApiClickHandler(t){const e=n(this);if(!e||!e.classList.contains("carousel"))return;const i={...U.getDataAttributes(e),...U.getDataAttributes(this)},s=this.getAttribute("data-bs-slide-to");s&&(i.interval=!1),st.carouselInterface(e,i),s&&st.getInstance(e).to(s),t.preventDefault()}}j.on(document,"click.bs.carousel.data-api","[data-bs-slide], [data-bs-slide-to]",st.dataApiClickHandler),j.on(window,"load.bs.carousel.data-api",(()=>{const t=V.find('[data-bs-ride="carousel"]');for(let e=0,i=t.length;e<i;e++)st.carouselInterface(t[e],st.getInstance(t[e]))})),g(st);const ot="collapse",rt={toggle:!0,parent:null},at={toggle:"boolean",parent:"(null|element)"},lt="show",ct="collapse",ht="collapsing",dt="collapsed",ut=":scope .collapse .collapse",ft='[data-bs-toggle="collapse"]';class pt extends B{constructor(t,e){super(t),this._isTransitioning=!1,this._config=this._getConfig(e),this._triggerArray=[];const n=V.find(ft);for(let t=0,e=n.length;t<e;t++){const e=n[t],s=i(e),o=V.find(s).filter((t=>t===this._element));null!==s&&o.length&&(this._selector=s,this._triggerArray.push(e))}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return rt}static get NAME(){return ot}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let t,e=[];if(this._config.parent){const t=V.find(ut,this._config.parent);e=V.find(".collapse.show, .collapse.collapsing",this._config.parent).filter((e=>!t.includes(e)))}const i=V.findOne(this._selector);if(e.length){const n=e.find((t=>i!==t));if(t=n?pt.getInstance(n):null,t&&t._isTransitioning)return}if(j.trigger(this._element,"show.bs.collapse").defaultPrevented)return;e.forEach((e=>{i!==e&&pt.getOrCreateInstance(e,{toggle:!1}).hide(),t||H.set(e,"bs.collapse",null)}));const n=this._getDimension();this._element.classList.remove(ct),this._element.classList.add(ht),this._element.style[n]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const s=`scroll${n[0].toUpperCase()+n.slice(1)}`;this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(ht),this._element.classList.add(ct,lt),this._element.style[n]="",j.trigger(this._element,"shown.bs.collapse")}),this._element,!0),this._element.style[n]=`${this._element[s]}px`}hide(){if(this._isTransitioning||!this._isShown())return;if(j.trigger(this._element,"hide.bs.collapse").defaultPrevented)return;const t=this._getDimension();this._element.style[t]=`${this._element.getBoundingClientRect()[t]}px`,u(this._element),this._element.classList.add(ht),this._element.classList.remove(ct,lt);const e=this._triggerArray.length;for(let t=0;t<e;t++){const e=this._triggerArray[t],i=n(e);i&&!this._isShown(i)&&this._addAriaAndCollapsedClass([e],!1)}this._isTransitioning=!0,this._element.style[t]="",this._queueCallback((()=>{this._isTransitioning=!1,this._element.classList.remove(ht),this._element.classList.add(ct),j.trigger(this._element,"hidden.bs.collapse")}),this._element,!0)}_isShown(t=this._element){return t.classList.contains(lt)}_getConfig(t){return(t={...rt,...U.getDataAttributes(this._element),...t}).toggle=Boolean(t.toggle),t.parent=r(t.parent),a(ot,t,at),t}_getDimension(){return this._element.classList.contains("collapse-horizontal")?"width":"height"}_initializeChildren(){if(!this._config.parent)return;const t=V.find(ut,this._config.parent);V.find(ft,this._config.parent).filter((e=>!t.includes(e))).forEach((t=>{const e=n(t);e&&this._addAriaAndCollapsedClass([t],this._isShown(e))}))}_addAriaAndCollapsedClass(t,e){t.length&&t.forEach((t=>{e?t.classList.remove(dt):t.classList.add(dt),t.setAttribute("aria-expanded",e)}))}static jQueryInterface(t){return this.each((function(){const e={};"string"==typeof t&&/show|hide/.test(t)&&(e.toggle=!1);const i=pt.getOrCreateInstance(this,e);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t]()}}))}}j.on(document,"click.bs.collapse.data-api",ft,(function(t){("A"===t.target.tagName||t.delegateTarget&&"A"===t.delegateTarget.tagName)&&t.preventDefault();const e=i(this);V.find(e).forEach((t=>{pt.getOrCreateInstance(t,{toggle:!1}).toggle()}))})),g(pt);var mt="top",gt="bottom",_t="right",bt="left",vt="auto",yt=[mt,gt,_t,bt],wt="start",Et="end",At="clippingParents",Tt="viewport",Ot="popper",Ct="reference",kt=yt.reduce((function(t,e){return t.concat([e+"-"+wt,e+"-"+Et])}),[]),Lt=[].concat(yt,[vt]).reduce((function(t,e){return t.concat([e,e+"-"+wt,e+"-"+Et])}),[]),xt="beforeRead",Dt="read",St="afterRead",Nt="beforeMain",It="main",Pt="afterMain",jt="beforeWrite",Mt="write",Ht="afterWrite",Bt=[xt,Dt,St,Nt,It,Pt,jt,Mt,Ht];function Rt(t){return t?(t.nodeName||"").toLowerCase():null}function Wt(t){if(null==t)return window;if("[object Window]"!==t.toString()){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function $t(t){return t instanceof Wt(t).Element||t instanceof Element}function zt(t){return t instanceof Wt(t).HTMLElement||t instanceof HTMLElement}function qt(t){return"undefined"!=typeof ShadowRoot&&(t instanceof Wt(t).ShadowRoot||t instanceof ShadowRoot)}const Ft={name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var e=t.state;Object.keys(e.elements).forEach((function(t){var i=e.styles[t]||{},n=e.attributes[t]||{},s=e.elements[t];zt(s)&&Rt(s)&&(Object.assign(s.style,i),Object.keys(n).forEach((function(t){var e=n[t];!1===e?s.removeAttribute(t):s.setAttribute(t,!0===e?"":e)})))}))},effect:function(t){var e=t.state,i={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,i.popper),e.styles=i,e.elements.arrow&&Object.assign(e.elements.arrow.style,i.arrow),function(){Object.keys(e.elements).forEach((function(t){var n=e.elements[t],s=e.attributes[t]||{},o=Object.keys(e.styles.hasOwnProperty(t)?e.styles[t]:i[t]).reduce((function(t,e){return t[e]="",t}),{});zt(n)&&Rt(n)&&(Object.assign(n.style,o),Object.keys(s).forEach((function(t){n.removeAttribute(t)})))}))}},requires:["computeStyles"]};function Ut(t){return t.split("-")[0]}function Vt(t,e){var i=t.getBoundingClientRect();return{width:i.width/1,height:i.height/1,top:i.top/1,right:i.right/1,bottom:i.bottom/1,left:i.left/1,x:i.left/1,y:i.top/1}}function Kt(t){var e=Vt(t),i=t.offsetWidth,n=t.offsetHeight;return Math.abs(e.width-i)<=1&&(i=e.width),Math.abs(e.height-n)<=1&&(n=e.height),{x:t.offsetLeft,y:t.offsetTop,width:i,height:n}}function Xt(t,e){var i=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(i&&qt(i)){var n=e;do{if(n&&t.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function Yt(t){return Wt(t).getComputedStyle(t)}function Qt(t){return["table","td","th"].indexOf(Rt(t))>=0}function Gt(t){return(($t(t)?t.ownerDocument:t.document)||window.document).documentElement}function Zt(t){return"html"===Rt(t)?t:t.assignedSlot||t.parentNode||(qt(t)?t.host:null)||Gt(t)}function Jt(t){return zt(t)&&"fixed"!==Yt(t).position?t.offsetParent:null}function te(t){for(var e=Wt(t),i=Jt(t);i&&Qt(i)&&"static"===Yt(i).position;)i=Jt(i);return i&&("html"===Rt(i)||"body"===Rt(i)&&"static"===Yt(i).position)?e:i||function(t){var e=-1!==navigator.userAgent.toLowerCase().indexOf("firefox");if(-1!==navigator.userAgent.indexOf("Trident")&&zt(t)&&"fixed"===Yt(t).position)return null;for(var i=Zt(t);zt(i)&&["html","body"].indexOf(Rt(i))<0;){var n=Yt(i);if("none"!==n.transform||"none"!==n.perspective||"paint"===n.contain||-1!==["transform","perspective"].indexOf(n.willChange)||e&&"filter"===n.willChange||e&&n.filter&&"none"!==n.filter)return i;i=i.parentNode}return null}(t)||e}function ee(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}var ie=Math.max,ne=Math.min,se=Math.round;function oe(t,e,i){return ie(t,ne(e,i))}function re(t){return Object.assign({},{top:0,right:0,bottom:0,left:0},t)}function ae(t,e){return e.reduce((function(e,i){return e[i]=t,e}),{})}const le={name:"arrow",enabled:!0,phase:"main",fn:function(t){var e,i=t.state,n=t.name,s=t.options,o=i.elements.arrow,r=i.modifiersData.popperOffsets,a=Ut(i.placement),l=ee(a),c=[bt,_t].indexOf(a)>=0?"height":"width";if(o&&r){var h=function(t,e){return re("number"!=typeof(t="function"==typeof t?t(Object.assign({},e.rects,{placement:e.placement})):t)?t:ae(t,yt))}(s.padding,i),d=Kt(o),u="y"===l?mt:bt,f="y"===l?gt:_t,p=i.rects.reference[c]+i.rects.reference[l]-r[l]-i.rects.popper[c],m=r[l]-i.rects.reference[l],g=te(o),_=g?"y"===l?g.clientHeight||0:g.clientWidth||0:0,b=p/2-m/2,v=h[u],y=_-d[c]-h[f],w=_/2-d[c]/2+b,E=oe(v,w,y),A=l;i.modifiersData[n]=((e={})[A]=E,e.centerOffset=E-w,e)}},effect:function(t){var e=t.state,i=t.options.element,n=void 0===i?"[data-popper-arrow]":i;null!=n&&("string"!=typeof n||(n=e.elements.popper.querySelector(n)))&&Xt(e.elements.popper,n)&&(e.elements.arrow=n)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ce(t){return t.split("-")[1]}var he={top:"auto",right:"auto",bottom:"auto",left:"auto"};function de(t){var e,i=t.popper,n=t.popperRect,s=t.placement,o=t.variation,r=t.offsets,a=t.position,l=t.gpuAcceleration,c=t.adaptive,h=t.roundOffsets,d=!0===h?function(t){var e=t.x,i=t.y,n=window.devicePixelRatio||1;return{x:se(se(e*n)/n)||0,y:se(se(i*n)/n)||0}}(r):"function"==typeof h?h(r):r,u=d.x,f=void 0===u?0:u,p=d.y,m=void 0===p?0:p,g=r.hasOwnProperty("x"),_=r.hasOwnProperty("y"),b=bt,v=mt,y=window;if(c){var w=te(i),E="clientHeight",A="clientWidth";w===Wt(i)&&"static"!==Yt(w=Gt(i)).position&&"absolute"===a&&(E="scrollHeight",A="scrollWidth"),w=w,s!==mt&&(s!==bt&&s!==_t||o!==Et)||(v=gt,m-=w[E]-n.height,m*=l?1:-1),s!==bt&&(s!==mt&&s!==gt||o!==Et)||(b=_t,f-=w[A]-n.width,f*=l?1:-1)}var T,O=Object.assign({position:a},c&&he);return l?Object.assign({},O,((T={})[v]=_?"0":"",T[b]=g?"0":"",T.transform=(y.devicePixelRatio||1)<=1?"translate("+f+"px, "+m+"px)":"translate3d("+f+"px, "+m+"px, 0)",T)):Object.assign({},O,((e={})[v]=_?m+"px":"",e[b]=g?f+"px":"",e.transform="",e))}const ue={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var e=t.state,i=t.options,n=i.gpuAcceleration,s=void 0===n||n,o=i.adaptive,r=void 0===o||o,a=i.roundOffsets,l=void 0===a||a,c={placement:Ut(e.placement),variation:ce(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:s};null!=e.modifiersData.popperOffsets&&(e.styles.popper=Object.assign({},e.styles.popper,de(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:r,roundOffsets:l})))),null!=e.modifiersData.arrow&&(e.styles.arrow=Object.assign({},e.styles.arrow,de(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})},data:{}};var fe={passive:!0};const pe={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var e=t.state,i=t.instance,n=t.options,s=n.scroll,o=void 0===s||s,r=n.resize,a=void 0===r||r,l=Wt(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return o&&c.forEach((function(t){t.addEventListener("scroll",i.update,fe)})),a&&l.addEventListener("resize",i.update,fe),function(){o&&c.forEach((function(t){t.removeEventListener("scroll",i.update,fe)})),a&&l.removeEventListener("resize",i.update,fe)}},data:{}};var me={left:"right",right:"left",bottom:"top",top:"bottom"};function ge(t){return t.replace(/left|right|bottom|top/g,(function(t){return me[t]}))}var _e={start:"end",end:"start"};function be(t){return t.replace(/start|end/g,(function(t){return _e[t]}))}function ve(t){var e=Wt(t);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function ye(t){return Vt(Gt(t)).left+ve(t).scrollLeft}function we(t){var e=Yt(t),i=e.overflow,n=e.overflowX,s=e.overflowY;return/auto|scroll|overlay|hidden/.test(i+s+n)}function Ee(t){return["html","body","#document"].indexOf(Rt(t))>=0?t.ownerDocument.body:zt(t)&&we(t)?t:Ee(Zt(t))}function Ae(t,e){var i;void 0===e&&(e=[]);var n=Ee(t),s=n===(null==(i=t.ownerDocument)?void 0:i.body),o=Wt(n),r=s?[o].concat(o.visualViewport||[],we(n)?n:[]):n,a=e.concat(r);return s?a:a.concat(Ae(Zt(r)))}function Te(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function Oe(t,e){return e===Tt?Te(function(t){var e=Wt(t),i=Gt(t),n=e.visualViewport,s=i.clientWidth,o=i.clientHeight,r=0,a=0;return n&&(s=n.width,o=n.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(r=n.offsetLeft,a=n.offsetTop)),{width:s,height:o,x:r+ye(t),y:a}}(t)):zt(e)?function(t){var e=Vt(t);return e.top=e.top+t.clientTop,e.left=e.left+t.clientLeft,e.bottom=e.top+t.clientHeight,e.right=e.left+t.clientWidth,e.width=t.clientWidth,e.height=t.clientHeight,e.x=e.left,e.y=e.top,e}(e):Te(function(t){var e,i=Gt(t),n=ve(t),s=null==(e=t.ownerDocument)?void 0:e.body,o=ie(i.scrollWidth,i.clientWidth,s?s.scrollWidth:0,s?s.clientWidth:0),r=ie(i.scrollHeight,i.clientHeight,s?s.scrollHeight:0,s?s.clientHeight:0),a=-n.scrollLeft+ye(t),l=-n.scrollTop;return"rtl"===Yt(s||i).direction&&(a+=ie(i.clientWidth,s?s.clientWidth:0)-o),{width:o,height:r,x:a,y:l}}(Gt(t)))}function Ce(t){var e,i=t.reference,n=t.element,s=t.placement,o=s?Ut(s):null,r=s?ce(s):null,a=i.x+i.width/2-n.width/2,l=i.y+i.height/2-n.height/2;switch(o){case mt:e={x:a,y:i.y-n.height};break;case gt:e={x:a,y:i.y+i.height};break;case _t:e={x:i.x+i.width,y:l};break;case bt:e={x:i.x-n.width,y:l};break;default:e={x:i.x,y:i.y}}var c=o?ee(o):null;if(null!=c){var h="y"===c?"height":"width";switch(r){case wt:e[c]=e[c]-(i[h]/2-n[h]/2);break;case Et:e[c]=e[c]+(i[h]/2-n[h]/2)}}return e}function ke(t,e){void 0===e&&(e={});var i=e,n=i.placement,s=void 0===n?t.placement:n,o=i.boundary,r=void 0===o?At:o,a=i.rootBoundary,l=void 0===a?Tt:a,c=i.elementContext,h=void 0===c?Ot:c,d=i.altBoundary,u=void 0!==d&&d,f=i.padding,p=void 0===f?0:f,m=re("number"!=typeof p?p:ae(p,yt)),g=h===Ot?Ct:Ot,_=t.rects.popper,b=t.elements[u?g:h],v=function(t,e,i){var n="clippingParents"===e?function(t){var e=Ae(Zt(t)),i=["absolute","fixed"].indexOf(Yt(t).position)>=0&&zt(t)?te(t):t;return $t(i)?e.filter((function(t){return $t(t)&&Xt(t,i)&&"body"!==Rt(t)})):[]}(t):[].concat(e),s=[].concat(n,[i]),o=s[0],r=s.reduce((function(e,i){var n=Oe(t,i);return e.top=ie(n.top,e.top),e.right=ne(n.right,e.right),e.bottom=ne(n.bottom,e.bottom),e.left=ie(n.left,e.left),e}),Oe(t,o));return r.width=r.right-r.left,r.height=r.bottom-r.top,r.x=r.left,r.y=r.top,r}($t(b)?b:b.contextElement||Gt(t.elements.popper),r,l),y=Vt(t.elements.reference),w=Ce({reference:y,element:_,strategy:"absolute",placement:s}),E=Te(Object.assign({},_,w)),A=h===Ot?E:y,T={top:v.top-A.top+m.top,bottom:A.bottom-v.bottom+m.bottom,left:v.left-A.left+m.left,right:A.right-v.right+m.right},O=t.modifiersData.offset;if(h===Ot&&O){var C=O[s];Object.keys(T).forEach((function(t){var e=[_t,gt].indexOf(t)>=0?1:-1,i=[mt,gt].indexOf(t)>=0?"y":"x";T[t]+=C[i]*e}))}return T}function Le(t,e){void 0===e&&(e={});var i=e,n=i.placement,s=i.boundary,o=i.rootBoundary,r=i.padding,a=i.flipVariations,l=i.allowedAutoPlacements,c=void 0===l?Lt:l,h=ce(n),d=h?a?kt:kt.filter((function(t){return ce(t)===h})):yt,u=d.filter((function(t){return c.indexOf(t)>=0}));0===u.length&&(u=d);var f=u.reduce((function(e,i){return e[i]=ke(t,{placement:i,boundary:s,rootBoundary:o,padding:r})[Ut(i)],e}),{});return Object.keys(f).sort((function(t,e){return f[t]-f[e]}))}const xe={name:"flip",enabled:!0,phase:"main",fn:function(t){var e=t.state,i=t.options,n=t.name;if(!e.modifiersData[n]._skip){for(var s=i.mainAxis,o=void 0===s||s,r=i.altAxis,a=void 0===r||r,l=i.fallbackPlacements,c=i.padding,h=i.boundary,d=i.rootBoundary,u=i.altBoundary,f=i.flipVariations,p=void 0===f||f,m=i.allowedAutoPlacements,g=e.options.placement,_=Ut(g),b=l||(_!==g&&p?function(t){if(Ut(t)===vt)return[];var e=ge(t);return[be(t),e,be(e)]}(g):[ge(g)]),v=[g].concat(b).reduce((function(t,i){return t.concat(Ut(i)===vt?Le(e,{placement:i,boundary:h,rootBoundary:d,padding:c,flipVariations:p,allowedAutoPlacements:m}):i)}),[]),y=e.rects.reference,w=e.rects.popper,E=new Map,A=!0,T=v[0],O=0;O<v.length;O++){var C=v[O],k=Ut(C),L=ce(C)===wt,x=[mt,gt].indexOf(k)>=0,D=x?"width":"height",S=ke(e,{placement:C,boundary:h,rootBoundary:d,altBoundary:u,padding:c}),N=x?L?_t:bt:L?gt:mt;y[D]>w[D]&&(N=ge(N));var I=ge(N),P=[];if(o&&P.push(S[k]<=0),a&&P.push(S[N]<=0,S[I]<=0),P.every((function(t){return t}))){T=C,A=!1;break}E.set(C,P)}if(A)for(var j=function(t){var e=v.find((function(e){var i=E.get(e);if(i)return i.slice(0,t).every((function(t){return t}))}));if(e)return T=e,"break"},M=p?3:1;M>0&&"break"!==j(M);M--);e.placement!==T&&(e.modifiersData[n]._skip=!0,e.placement=T,e.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function De(t,e,i){return void 0===i&&(i={x:0,y:0}),{top:t.top-e.height-i.y,right:t.right-e.width+i.x,bottom:t.bottom-e.height+i.y,left:t.left-e.width-i.x}}function Se(t){return[mt,_t,gt,bt].some((function(e){return t[e]>=0}))}const Ne={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(t){var e=t.state,i=t.name,n=e.rects.reference,s=e.rects.popper,o=e.modifiersData.preventOverflow,r=ke(e,{elementContext:"reference"}),a=ke(e,{altBoundary:!0}),l=De(r,n),c=De(a,s,o),h=Se(l),d=Se(c);e.modifiersData[i]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:h,hasPopperEscaped:d},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":h,"data-popper-escaped":d})}},Ie={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(t){var e=t.state,i=t.options,n=t.name,s=i.offset,o=void 0===s?[0,0]:s,r=Lt.reduce((function(t,i){return t[i]=function(t,e,i){var n=Ut(t),s=[bt,mt].indexOf(n)>=0?-1:1,o="function"==typeof i?i(Object.assign({},e,{placement:t})):i,r=o[0],a=o[1];return r=r||0,a=(a||0)*s,[bt,_t].indexOf(n)>=0?{x:a,y:r}:{x:r,y:a}}(i,e.rects,o),t}),{}),a=r[e.placement],l=a.x,c=a.y;null!=e.modifiersData.popperOffsets&&(e.modifiersData.popperOffsets.x+=l,e.modifiersData.popperOffsets.y+=c),e.modifiersData[n]=r}},Pe={name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var e=t.state,i=t.name;e.modifiersData[i]=Ce({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})},data:{}},je={name:"preventOverflow",enabled:!0,phase:"main",fn:function(t){var e=t.state,i=t.options,n=t.name,s=i.mainAxis,o=void 0===s||s,r=i.altAxis,a=void 0!==r&&r,l=i.boundary,c=i.rootBoundary,h=i.altBoundary,d=i.padding,u=i.tether,f=void 0===u||u,p=i.tetherOffset,m=void 0===p?0:p,g=ke(e,{boundary:l,rootBoundary:c,padding:d,altBoundary:h}),_=Ut(e.placement),b=ce(e.placement),v=!b,y=ee(_),w="x"===y?"y":"x",E=e.modifiersData.popperOffsets,A=e.rects.reference,T=e.rects.popper,O="function"==typeof m?m(Object.assign({},e.rects,{placement:e.placement})):m,C={x:0,y:0};if(E){if(o||a){var k="y"===y?mt:bt,L="y"===y?gt:_t,x="y"===y?"height":"width",D=E[y],S=E[y]+g[k],N=E[y]-g[L],I=f?-T[x]/2:0,P=b===wt?A[x]:T[x],j=b===wt?-T[x]:-A[x],M=e.elements.arrow,H=f&&M?Kt(M):{width:0,height:0},B=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},R=B[k],W=B[L],$=oe(0,A[x],H[x]),z=v?A[x]/2-I-$-R-O:P-$-R-O,q=v?-A[x]/2+I+$+W+O:j+$+W+O,F=e.elements.arrow&&te(e.elements.arrow),U=F?"y"===y?F.clientTop||0:F.clientLeft||0:0,V=e.modifiersData.offset?e.modifiersData.offset[e.placement][y]:0,K=E[y]+z-V-U,X=E[y]+q-V;if(o){var Y=oe(f?ne(S,K):S,D,f?ie(N,X):N);E[y]=Y,C[y]=Y-D}if(a){var Q="x"===y?mt:bt,G="x"===y?gt:_t,Z=E[w],J=Z+g[Q],tt=Z-g[G],et=oe(f?ne(J,K):J,Z,f?ie(tt,X):tt);E[w]=et,C[w]=et-Z}}e.modifiersData[n]=C}},requiresIfExists:["offset"]};function Me(t,e,i){void 0===i&&(i=!1);var n=zt(e);zt(e)&&function(t){var e=t.getBoundingClientRect();e.width,t.offsetWidth,e.height,t.offsetHeight}(e);var s,o,r=Gt(e),a=Vt(t),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(n||!n&&!i)&&(("body"!==Rt(e)||we(r))&&(l=(s=e)!==Wt(s)&&zt(s)?{scrollLeft:(o=s).scrollLeft,scrollTop:o.scrollTop}:ve(s)),zt(e)?((c=Vt(e)).x+=e.clientLeft,c.y+=e.clientTop):r&&(c.x=ye(r))),{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}function He(t){var e=new Map,i=new Set,n=[];function s(t){i.add(t.name),[].concat(t.requires||[],t.requiresIfExists||[]).forEach((function(t){if(!i.has(t)){var n=e.get(t);n&&s(n)}})),n.push(t)}return t.forEach((function(t){e.set(t.name,t)})),t.forEach((function(t){i.has(t.name)||s(t)})),n}var Be={placement:"bottom",modifiers:[],strategy:"absolute"};function Re(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return!e.some((function(t){return!(t&&"function"==typeof t.getBoundingClientRect)}))}function We(t){void 0===t&&(t={});var e=t,i=e.defaultModifiers,n=void 0===i?[]:i,s=e.defaultOptions,o=void 0===s?Be:s;return function(t,e,i){void 0===i&&(i=o);var s,r,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},Be,o),modifiersData:{},elements:{reference:t,popper:e},attributes:{},styles:{}},l=[],c=!1,h={state:a,setOptions:function(i){var s="function"==typeof i?i(a.options):i;d(),a.options=Object.assign({},o,a.options,s),a.scrollParents={reference:$t(t)?Ae(t):t.contextElement?Ae(t.contextElement):[],popper:Ae(e)};var r,c,u=function(t){var e=He(t);return Bt.reduce((function(t,i){return t.concat(e.filter((function(t){return t.phase===i})))}),[])}((r=[].concat(n,a.options.modifiers),c=r.reduce((function(t,e){var i=t[e.name];return t[e.name]=i?Object.assign({},i,e,{options:Object.assign({},i.options,e.options),data:Object.assign({},i.data,e.data)}):e,t}),{}),Object.keys(c).map((function(t){return c[t]}))));return a.orderedModifiers=u.filter((function(t){return t.enabled})),a.orderedModifiers.forEach((function(t){var e=t.name,i=t.options,n=void 0===i?{}:i,s=t.effect;if("function"==typeof s){var o=s({state:a,name:e,instance:h,options:n});l.push(o||function(){})}})),h.update()},forceUpdate:function(){if(!c){var t=a.elements,e=t.reference,i=t.popper;if(Re(e,i)){a.rects={reference:Me(e,te(i),"fixed"===a.options.strategy),popper:Kt(i)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(t){return a.modifiersData[t.name]=Object.assign({},t.data)}));for(var n=0;n<a.orderedModifiers.length;n++)if(!0!==a.reset){var s=a.orderedModifiers[n],o=s.fn,r=s.options,l=void 0===r?{}:r,d=s.name;"function"==typeof o&&(a=o({state:a,options:l,name:d,instance:h})||a)}else a.reset=!1,n=-1}}},update:(s=function(){return new Promise((function(t){h.forceUpdate(),t(a)}))},function(){return r||(r=new Promise((function(t){Promise.resolve().then((function(){r=void 0,t(s())}))}))),r}),destroy:function(){d(),c=!0}};if(!Re(t,e))return h;function d(){l.forEach((function(t){return t()})),l=[]}return h.setOptions(i).then((function(t){!c&&i.onFirstUpdate&&i.onFirstUpdate(t)})),h}}var $e=We(),ze=We({defaultModifiers:[pe,Pe,ue,Ft]}),qe=We({defaultModifiers:[pe,Pe,ue,Ft,Ie,xe,je,le,Ne]});const Fe=Object.freeze({__proto__:null,popperGenerator:We,detectOverflow:ke,createPopperBase:$e,createPopper:qe,createPopperLite:ze,top:mt,bottom:gt,right:_t,left:bt,auto:vt,basePlacements:yt,start:wt,end:Et,clippingParents:At,viewport:Tt,popper:Ot,reference:Ct,variationPlacements:kt,placements:Lt,beforeRead:xt,read:Dt,afterRead:St,beforeMain:Nt,main:It,afterMain:Pt,beforeWrite:jt,write:Mt,afterWrite:Ht,modifierPhases:Bt,applyStyles:Ft,arrow:le,computeStyles:ue,eventListeners:pe,flip:xe,hide:Ne,offset:Ie,popperOffsets:Pe,preventOverflow:je}),Ue="dropdown",Ve="Escape",Ke="Space",Xe="ArrowUp",Ye="ArrowDown",Qe=new RegExp("ArrowUp|ArrowDown|Escape"),Ge="click.bs.dropdown.data-api",Ze="keydown.bs.dropdown.data-api",Je="show",ti='[data-bs-toggle="dropdown"]',ei=".dropdown-menu",ii=m()?"top-end":"top-start",ni=m()?"top-start":"top-end",si=m()?"bottom-end":"bottom-start",oi=m()?"bottom-start":"bottom-end",ri=m()?"left-start":"right-start",ai=m()?"right-start":"left-start",li={offset:[0,2],boundary:"clippingParents",reference:"toggle",display:"dynamic",popperConfig:null,autoClose:!0},ci={offset:"(array|string|function)",boundary:"(string|element)",reference:"(string|element|object)",display:"string",popperConfig:"(null|object|function)",autoClose:"(boolean|string)"};class hi extends B{constructor(t,e){super(t),this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar()}static get Default(){return li}static get DefaultType(){return ci}static get NAME(){return Ue}toggle(){return this._isShown()?this.hide():this.show()}show(){if(c(this._element)||this._isShown(this._menu))return;const t={relatedTarget:this._element};if(j.trigger(this._element,"show.bs.dropdown",t).defaultPrevented)return;const e=hi.getParentFromElement(this._element);this._inNavbar?U.setDataAttribute(this._menu,"popper","none"):this._createPopper(e),"ontouchstart"in document.documentElement&&!e.closest(".navbar-nav")&&[].concat(...document.body.children).forEach((t=>j.on(t,"mouseover",d))),this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(Je),this._element.classList.add(Je),j.trigger(this._element,"shown.bs.dropdown",t)}hide(){if(c(this._element)||!this._isShown(this._menu))return;const t={relatedTarget:this._element};this._completeHide(t)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(t){j.trigger(this._element,"hide.bs.dropdown",t).defaultPrevented||("ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach((t=>j.off(t,"mouseover",d))),this._popper&&this._popper.destroy(),this._menu.classList.remove(Je),this._element.classList.remove(Je),this._element.setAttribute("aria-expanded","false"),U.removeDataAttribute(this._menu,"popper"),j.trigger(this._element,"hidden.bs.dropdown",t))}_getConfig(t){if(t={...this.constructor.Default,...U.getDataAttributes(this._element),...t},a(Ue,t,this.constructor.DefaultType),"object"==typeof t.reference&&!o(t.reference)&&"function"!=typeof t.reference.getBoundingClientRect)throw new TypeError(`${Ue.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return t}_createPopper(t){if(void 0===Fe)throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");let e=this._element;"parent"===this._config.reference?e=t:o(this._config.reference)?e=r(this._config.reference):"object"==typeof this._config.reference&&(e=this._config.reference);const i=this._getPopperConfig(),n=i.modifiers.find((t=>"applyStyles"===t.name&&!1===t.enabled));this._popper=qe(e,this._menu,i),n&&U.setDataAttribute(this._menu,"popper","static")}_isShown(t=this._element){return t.classList.contains(Je)}_getMenuElement(){return V.next(this._element,ei)[0]}_getPlacement(){const t=this._element.parentNode;if(t.classList.contains("dropend"))return ri;if(t.classList.contains("dropstart"))return ai;const e="end"===getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();return t.classList.contains("dropup")?e?ni:ii:e?oi:si}_detectNavbar(){return null!==this._element.closest(".navbar")}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map((t=>Number.parseInt(t,10))):"function"==typeof t?e=>t(e,this._element):t}_getPopperConfig(){const t={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return"static"===this._config.display&&(t.modifiers=[{name:"applyStyles",enabled:!1}]),{...t,..."function"==typeof this._config.popperConfig?this._config.popperConfig(t):this._config.popperConfig}}_selectMenuItem({key:t,target:e}){const i=V.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",this._menu).filter(l);i.length&&v(i,e,t===Ye,!i.includes(e)).focus()}static jQueryInterface(t){return this.each((function(){const e=hi.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}static clearMenus(t){if(t&&(2===t.button||"keyup"===t.type&&"Tab"!==t.key))return;const e=V.find(ti);for(let i=0,n=e.length;i<n;i++){const n=hi.getInstance(e[i]);if(!n||!1===n._config.autoClose)continue;if(!n._isShown())continue;const s={relatedTarget:n._element};if(t){const e=t.composedPath(),i=e.includes(n._menu);if(e.includes(n._element)||"inside"===n._config.autoClose&&!i||"outside"===n._config.autoClose&&i)continue;if(n._menu.contains(t.target)&&("keyup"===t.type&&"Tab"===t.key||/input|select|option|textarea|form/i.test(t.target.tagName)))continue;"click"===t.type&&(s.clickEvent=t)}n._completeHide(s)}}static getParentFromElement(t){return n(t)||t.parentNode}static dataApiKeydownHandler(t){if(/input|textarea/i.test(t.target.tagName)?t.key===Ke||t.key!==Ve&&(t.key!==Ye&&t.key!==Xe||t.target.closest(ei)):!Qe.test(t.key))return;const e=this.classList.contains(Je);if(!e&&t.key===Ve)return;if(t.preventDefault(),t.stopPropagation(),c(this))return;const i=this.matches(ti)?this:V.prev(this,ti)[0],n=hi.getOrCreateInstance(i);if(t.key!==Ve)return t.key===Xe||t.key===Ye?(e||n.show(),void n._selectMenuItem(t)):void(e&&t.key!==Ke||hi.clearMenus());n.hide()}}j.on(document,Ze,ti,hi.dataApiKeydownHandler),j.on(document,Ze,ei,hi.dataApiKeydownHandler),j.on(document,Ge,hi.clearMenus),j.on(document,"keyup.bs.dropdown.data-api",hi.clearMenus),j.on(document,Ge,ti,(function(t){t.preventDefault(),hi.getOrCreateInstance(this).toggle()})),g(hi);const di=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",ui=".sticky-top";class fi{constructor(){this._element=document.body}getWidth(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}hide(){const t=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,"paddingRight",(e=>e+t)),this._setElementAttributes(di,"paddingRight",(e=>e+t)),this._setElementAttributes(ui,"marginRight",(e=>e-t))}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(t,e,i){const n=this.getWidth();this._applyManipulationCallback(t,(t=>{if(t!==this._element&&window.innerWidth>t.clientWidth+n)return;this._saveInitialAttribute(t,e);const s=window.getComputedStyle(t)[e];t.style[e]=`${i(Number.parseFloat(s))}px`}))}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,"paddingRight"),this._resetElementAttributes(di,"paddingRight"),this._resetElementAttributes(ui,"marginRight")}_saveInitialAttribute(t,e){const i=t.style[e];i&&U.setDataAttribute(t,e,i)}_resetElementAttributes(t,e){this._applyManipulationCallback(t,(t=>{const i=U.getDataAttribute(t,e);void 0===i?t.style.removeProperty(e):(U.removeDataAttribute(t,e),t.style[e]=i)}))}_applyManipulationCallback(t,e){o(t)?e(t):V.find(t,this._element).forEach(e)}isOverflowing(){return this.getWidth()>0}}const pi={className:"modal-backdrop",isVisible:!0,isAnimated:!1,rootElement:"body",clickCallback:null},mi={className:"string",isVisible:"boolean",isAnimated:"boolean",rootElement:"(element|string)",clickCallback:"(function|null)"},gi="show",_i="mousedown.bs.backdrop";class bi{constructor(t){this._config=this._getConfig(t),this._isAppended=!1,this._element=null}show(t){this._config.isVisible?(this._append(),this._config.isAnimated&&u(this._getElement()),this._getElement().classList.add(gi),this._emulateAnimation((()=>{_(t)}))):_(t)}hide(t){this._config.isVisible?(this._getElement().classList.remove(gi),this._emulateAnimation((()=>{this.dispose(),_(t)}))):_(t)}_getElement(){if(!this._element){const t=document.createElement("div");t.className=this._config.className,this._config.isAnimated&&t.classList.add("fade"),this._element=t}return this._element}_getConfig(t){return(t={...pi,..."object"==typeof t?t:{}}).rootElement=r(t.rootElement),a("backdrop",t,mi),t}_append(){this._isAppended||(this._config.rootElement.append(this._getElement()),j.on(this._getElement(),_i,(()=>{_(this._config.clickCallback)})),this._isAppended=!0)}dispose(){this._isAppended&&(j.off(this._element,_i),this._element.remove(),this._isAppended=!1)}_emulateAnimation(t){b(t,this._getElement(),this._config.isAnimated)}}const vi={trapElement:null,autofocus:!0},yi={trapElement:"element",autofocus:"boolean"},wi=".bs.focustrap",Ei="backward";class Ai{constructor(t){this._config=this._getConfig(t),this._isActive=!1,this._lastTabNavDirection=null}activate(){const{trapElement:t,autofocus:e}=this._config;this._isActive||(e&&t.focus(),j.off(document,wi),j.on(document,"focusin.bs.focustrap",(t=>this._handleFocusin(t))),j.on(document,"keydown.tab.bs.focustrap",(t=>this._handleKeydown(t))),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,j.off(document,wi))}_handleFocusin(t){const{target:e}=t,{trapElement:i}=this._config;if(e===document||e===i||i.contains(e))return;const n=V.focusableChildren(i);0===n.length?i.focus():this._lastTabNavDirection===Ei?n[n.length-1].focus():n[0].focus()}_handleKeydown(t){"Tab"===t.key&&(this._lastTabNavDirection=t.shiftKey?Ei:"forward")}_getConfig(t){return t={...vi,..."object"==typeof t?t:{}},a("focustrap",t,yi),t}}const Ti="modal",Oi="Escape",Ci={backdrop:!0,keyboard:!0,focus:!0},ki={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean"},Li="hidden.bs.modal",xi="show.bs.modal",Di="resize.bs.modal",Si="click.dismiss.bs.modal",Ni="keydown.dismiss.bs.modal",Ii="mousedown.dismiss.bs.modal",Pi="modal-open",ji="show",Mi="modal-static";class Hi extends B{constructor(t,e){super(t),this._config=this._getConfig(e),this._dialog=V.findOne(".modal-dialog",this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollBar=new fi}static get Default(){return Ci}static get NAME(){return Ti}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||this._isTransitioning||j.trigger(this._element,xi,{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._isAnimated()&&(this._isTransitioning=!0),this._scrollBar.hide(),document.body.classList.add(Pi),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),j.on(this._dialog,Ii,(()=>{j.one(this._element,"mouseup.dismiss.bs.modal",(t=>{t.target===this._element&&(this._ignoreBackdropClick=!0)}))})),this._showBackdrop((()=>this._showElement(t))))}hide(){if(!this._isShown||this._isTransitioning)return;if(j.trigger(this._element,"hide.bs.modal").defaultPrevented)return;this._isShown=!1;const t=this._isAnimated();t&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),this._focustrap.deactivate(),this._element.classList.remove(ji),j.off(this._element,Si),j.off(this._dialog,Ii),this._queueCallback((()=>this._hideModal()),this._element,t)}dispose(){[window,this._dialog].forEach((t=>j.off(t,".bs.modal"))),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new bi({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new Ai({trapElement:this._element})}_getConfig(t){return t={...Ci,...U.getDataAttributes(this._element),..."object"==typeof t?t:{}},a(Ti,t,ki),t}_showElement(t){const e=this._isAnimated(),i=V.findOne(".modal-body",this._dialog);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0,i&&(i.scrollTop=0),e&&u(this._element),this._element.classList.add(ji),this._queueCallback((()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,j.trigger(this._element,"shown.bs.modal",{relatedTarget:t})}),this._dialog,e)}_setEscapeEvent(){this._isShown?j.on(this._element,Ni,(t=>{this._config.keyboard&&t.key===Oi?(t.preventDefault(),this.hide()):this._config.keyboard||t.key!==Oi||this._triggerBackdropTransition()})):j.off(this._element,Ni)}_setResizeEvent(){this._isShown?j.on(window,Di,(()=>this._adjustDialog())):j.off(window,Di)}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide((()=>{document.body.classList.remove(Pi),this._resetAdjustments(),this._scrollBar.reset(),j.trigger(this._element,Li)}))}_showBackdrop(t){j.on(this._element,Si,(t=>{this._ignoreBackdropClick?this._ignoreBackdropClick=!1:t.target===t.currentTarget&&(!0===this._config.backdrop?this.hide():"static"===this._config.backdrop&&this._triggerBackdropTransition())})),this._backdrop.show(t)}_isAnimated(){return this._element.classList.contains("fade")}_triggerBackdropTransition(){if(j.trigger(this._element,"hidePrevented.bs.modal").defaultPrevented)return;const{classList:t,scrollHeight:e,style:i}=this._element,n=e>document.documentElement.clientHeight;!n&&"hidden"===i.overflowY||t.contains(Mi)||(n||(i.overflowY="hidden"),t.add(Mi),this._queueCallback((()=>{t.remove(Mi),n||this._queueCallback((()=>{i.overflowY=""}),this._dialog)}),this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,e=this._scrollBar.getWidth(),i=e>0;(!i&&t&&!m()||i&&!t&&m())&&(this._element.style.paddingLeft=`${e}px`),(i&&!t&&!m()||!i&&t&&m())&&(this._element.style.paddingRight=`${e}px`)}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(t,e){return this.each((function(){const i=Hi.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===i[t])throw new TypeError(`No method named "${t}"`);i[t](e)}}))}}j.on(document,"click.bs.modal.data-api",'[data-bs-toggle="modal"]',(function(t){const e=n(this);["A","AREA"].includes(this.tagName)&&t.preventDefault(),j.one(e,xi,(t=>{t.defaultPrevented||j.one(e,Li,(()=>{l(this)&&this.focus()}))}));const i=V.findOne(".modal.show");i&&Hi.getInstance(i).hide(),Hi.getOrCreateInstance(e).toggle(this)})),R(Hi),g(Hi);const Bi="offcanvas",Ri={backdrop:!0,keyboard:!0,scroll:!1},Wi={backdrop:"boolean",keyboard:"boolean",scroll:"boolean"},$i="show",zi=".offcanvas.show",qi="hidden.bs.offcanvas";class Fi extends B{constructor(t,e){super(t),this._config=this._getConfig(e),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get NAME(){return Bi}static get Default(){return Ri}toggle(t){return this._isShown?this.hide():this.show(t)}show(t){this._isShown||j.trigger(this._element,"show.bs.offcanvas",{relatedTarget:t}).defaultPrevented||(this._isShown=!0,this._element.style.visibility="visible",this._backdrop.show(),this._config.scroll||(new fi).hide(),this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add($i),this._queueCallback((()=>{this._config.scroll||this._focustrap.activate(),j.trigger(this._element,"shown.bs.offcanvas",{relatedTarget:t})}),this._element,!0))}hide(){this._isShown&&(j.trigger(this._element,"hide.bs.offcanvas").defaultPrevented||(this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.remove($i),this._backdrop.hide(),this._queueCallback((()=>{this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._element.style.visibility="hidden",this._config.scroll||(new fi).reset(),j.trigger(this._element,qi)}),this._element,!0)))}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_getConfig(t){return t={...Ri,...U.getDataAttributes(this._element),..."object"==typeof t?t:{}},a(Bi,t,Wi),t}_initializeBackDrop(){return new bi({className:"offcanvas-backdrop",isVisible:this._config.backdrop,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:()=>this.hide()})}_initializeFocusTrap(){return new Ai({trapElement:this._element})}_addEventListeners(){j.on(this._element,"keydown.dismiss.bs.offcanvas",(t=>{this._config.keyboard&&"Escape"===t.key&&this.hide()}))}static jQueryInterface(t){return this.each((function(){const e=Fi.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t]||t.startsWith("_")||"constructor"===t)throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}j.on(document,"click.bs.offcanvas.data-api",'[data-bs-toggle="offcanvas"]',(function(t){const e=n(this);if(["A","AREA"].includes(this.tagName)&&t.preventDefault(),c(this))return;j.one(e,qi,(()=>{l(this)&&this.focus()}));const i=V.findOne(zi);i&&i!==e&&Fi.getInstance(i).hide(),Fi.getOrCreateInstance(e).toggle(this)})),j.on(window,"load.bs.offcanvas.data-api",(()=>V.find(zi).forEach((t=>Fi.getOrCreateInstance(t).show())))),R(Fi),g(Fi);const Ui=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),Vi=/^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,Ki=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,Xi=(t,e)=>{const i=t.nodeName.toLowerCase();if(e.includes(i))return!Ui.has(i)||Boolean(Vi.test(t.nodeValue)||Ki.test(t.nodeValue));const n=e.filter((t=>t instanceof RegExp));for(let t=0,e=n.length;t<e;t++)if(n[t].test(i))return!0;return!1};function Yi(t,e,i){if(!t.length)return t;if(i&&"function"==typeof i)return i(t);const n=(new window.DOMParser).parseFromString(t,"text/html"),s=[].concat(...n.body.querySelectorAll("*"));for(let t=0,i=s.length;t<i;t++){const i=s[t],n=i.nodeName.toLowerCase();if(!Object.keys(e).includes(n)){i.remove();continue}const o=[].concat(...i.attributes),r=[].concat(e["*"]||[],e[n]||[]);o.forEach((t=>{Xi(t,r)||i.removeAttribute(t.nodeName)}))}return n.body.innerHTML}const Qi="tooltip",Gi=new Set(["sanitize","allowList","sanitizeFn"]),Zi={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(array|string|function)",container:"(string|element|boolean)",fallbackPlacements:"array",boundary:"(string|element)",customClass:"(string|function)",sanitize:"boolean",sanitizeFn:"(null|function)",allowList:"object",popperConfig:"(null|object|function)"},Ji={AUTO:"auto",TOP:"top",RIGHT:m()?"left":"right",BOTTOM:"bottom",LEFT:m()?"right":"left"},tn={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:[0,0],container:!1,fallbackPlacements:["top","right","bottom","left"],boundary:"clippingParents",customClass:"",sanitize:!0,sanitizeFn:null,allowList:{"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},popperConfig:null},en={HIDE:"hide.bs.tooltip",HIDDEN:"hidden.bs.tooltip",SHOW:"show.bs.tooltip",SHOWN:"shown.bs.tooltip",INSERTED:"inserted.bs.tooltip",CLICK:"click.bs.tooltip",FOCUSIN:"focusin.bs.tooltip",FOCUSOUT:"focusout.bs.tooltip",MOUSEENTER:"mouseenter.bs.tooltip",MOUSELEAVE:"mouseleave.bs.tooltip"},nn="fade",sn="show",on="show",rn="out",an=".tooltip-inner",ln=".modal",cn="hide.bs.modal",hn="hover",dn="focus";class un extends B{constructor(t,e){if(void 0===Fe)throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");super(t),this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this._config=this._getConfig(e),this.tip=null,this._setListeners()}static get Default(){return tn}static get NAME(){return Qi}static get Event(){return en}static get DefaultType(){return Zi}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(t){if(this._isEnabled)if(t){const e=this._initializeOnDelegatedTarget(t);e._activeTrigger.click=!e._activeTrigger.click,e._isWithActiveTrigger()?e._enter(null,e):e._leave(null,e)}else{if(this.getTipElement().classList.contains(sn))return void this._leave(null,this);this._enter(null,this)}}dispose(){clearTimeout(this._timeout),j.off(this._element.closest(ln),cn,this._hideModalHandler),this.tip&&this.tip.remove(),this._disposePopper(),super.dispose()}show(){if("none"===this._element.style.display)throw new Error("Please use show on visible elements");if(!this.isWithContent()||!this._isEnabled)return;const t=j.trigger(this._element,this.constructor.Event.SHOW),e=h(this._element),i=null===e?this._element.ownerDocument.documentElement.contains(this._element):e.contains(this._element);if(t.defaultPrevented||!i)return;"tooltip"===this.constructor.NAME&&this.tip&&this.getTitle()!==this.tip.querySelector(an).innerHTML&&(this._disposePopper(),this.tip.remove(),this.tip=null);const n=this.getTipElement(),s=(t=>{do{t+=Math.floor(1e6*Math.random())}while(document.getElementById(t));return t})(this.constructor.NAME);n.setAttribute("id",s),this._element.setAttribute("aria-describedby",s),this._config.animation&&n.classList.add(nn);const o="function"==typeof this._config.placement?this._config.placement.call(this,n,this._element):this._config.placement,r=this._getAttachment(o);this._addAttachmentClass(r);const{container:a}=this._config;H.set(n,this.constructor.DATA_KEY,this),this._element.ownerDocument.documentElement.contains(this.tip)||(a.append(n),j.trigger(this._element,this.constructor.Event.INSERTED)),this._popper?this._popper.update():this._popper=qe(this._element,n,this._getPopperConfig(r)),n.classList.add(sn);const l=this._resolvePossibleFunction(this._config.customClass);l&&n.classList.add(...l.split(" ")),"ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach((t=>{j.on(t,"mouseover",d)}));const c=this.tip.classList.contains(nn);this._queueCallback((()=>{const t=this._hoverState;this._hoverState=null,j.trigger(this._element,this.constructor.Event.SHOWN),t===rn&&this._leave(null,this)}),this.tip,c)}hide(){if(!this._popper)return;const t=this.getTipElement();if(j.trigger(this._element,this.constructor.Event.HIDE).defaultPrevented)return;t.classList.remove(sn),"ontouchstart"in document.documentElement&&[].concat(...document.body.children).forEach((t=>j.off(t,"mouseover",d))),this._activeTrigger.click=!1,this._activeTrigger.focus=!1,this._activeTrigger.hover=!1;const e=this.tip.classList.contains(nn);this._queueCallback((()=>{this._isWithActiveTrigger()||(this._hoverState!==on&&t.remove(),this._cleanTipClass(),this._element.removeAttribute("aria-describedby"),j.trigger(this._element,this.constructor.Event.HIDDEN),this._disposePopper())}),this.tip,e),this._hoverState=""}update(){null!==this._popper&&this._popper.update()}isWithContent(){return Boolean(this.getTitle())}getTipElement(){if(this.tip)return this.tip;const t=document.createElement("div");t.innerHTML=this._config.template;const e=t.children[0];return this.setContent(e),e.classList.remove(nn,sn),this.tip=e,this.tip}setContent(t){this._sanitizeAndSetContent(t,this.getTitle(),an)}_sanitizeAndSetContent(t,e,i){const n=V.findOne(i,t);e||!n?this.setElementContent(n,e):n.remove()}setElementContent(t,e){if(null!==t)return o(e)?(e=r(e),void(this._config.html?e.parentNode!==t&&(t.innerHTML="",t.append(e)):t.textContent=e.textContent)):void(this._config.html?(this._config.sanitize&&(e=Yi(e,this._config.allowList,this._config.sanitizeFn)),t.innerHTML=e):t.textContent=e)}getTitle(){const t=this._element.getAttribute("data-bs-original-title")||this._config.title;return this._resolvePossibleFunction(t)}updateAttachment(t){return"right"===t?"end":"left"===t?"start":t}_initializeOnDelegatedTarget(t,e){return e||this.constructor.getOrCreateInstance(t.delegateTarget,this._getDelegateConfig())}_getOffset(){const{offset:t}=this._config;return"string"==typeof t?t.split(",").map((t=>Number.parseInt(t,10))):"function"==typeof t?e=>t(e,this._element):t}_resolvePossibleFunction(t){return"function"==typeof t?t.call(this._element):t}_getPopperConfig(t){const e={placement:t,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"onChange",enabled:!0,phase:"afterWrite",fn:t=>this._handlePopperPlacementChange(t)}],onFirstUpdate:t=>{t.options.placement!==t.placement&&this._handlePopperPlacementChange(t)}};return{...e,..."function"==typeof this._config.popperConfig?this._config.popperConfig(e):this._config.popperConfig}}_addAttachmentClass(t){this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(t)}`)}_getAttachment(t){return Ji[t.toUpperCase()]}_setListeners(){this._config.trigger.split(" ").forEach((t=>{if("click"===t)j.on(this._element,this.constructor.Event.CLICK,this._config.selector,(t=>this.toggle(t)));else if("manual"!==t){const e=t===hn?this.constructor.Event.MOUSEENTER:this.constructor.Event.FOCUSIN,i=t===hn?this.constructor.Event.MOUSELEAVE:this.constructor.Event.FOCUSOUT;j.on(this._element,e,this._config.selector,(t=>this._enter(t))),j.on(this._element,i,this._config.selector,(t=>this._leave(t)))}})),this._hideModalHandler=()=>{this._element&&this.hide()},j.on(this._element.closest(ln),cn,this._hideModalHandler),this._config.selector?this._config={...this._config,trigger:"manual",selector:""}:this._fixTitle()}_fixTitle(){const t=this._element.getAttribute("title"),e=typeof this._element.getAttribute("data-bs-original-title");(t||"string"!==e)&&(this._element.setAttribute("data-bs-original-title",t||""),!t||this._element.getAttribute("aria-label")||this._element.textContent||this._element.setAttribute("aria-label",t),this._element.setAttribute("title",""))}_enter(t,e){e=this._initializeOnDelegatedTarget(t,e),t&&(e._activeTrigger["focusin"===t.type?dn:hn]=!0),e.getTipElement().classList.contains(sn)||e._hoverState===on?e._hoverState=on:(clearTimeout(e._timeout),e._hoverState=on,e._config.delay&&e._config.delay.show?e._timeout=setTimeout((()=>{e._hoverState===on&&e.show()}),e._config.delay.show):e.show())}_leave(t,e){e=this._initializeOnDelegatedTarget(t,e),t&&(e._activeTrigger["focusout"===t.type?dn:hn]=e._element.contains(t.relatedTarget)),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState=rn,e._config.delay&&e._config.delay.hide?e._timeout=setTimeout((()=>{e._hoverState===rn&&e.hide()}),e._config.delay.hide):e.hide())}_isWithActiveTrigger(){for(const t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1}_getConfig(t){const e=U.getDataAttributes(this._element);return Object.keys(e).forEach((t=>{Gi.has(t)&&delete e[t]})),(t={...this.constructor.Default,...e,..."object"==typeof t&&t?t:{}}).container=!1===t.container?document.body:r(t.container),"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),a(Qi,t,this.constructor.DefaultType),t.sanitize&&(t.template=Yi(t.template,t.allowList,t.sanitizeFn)),t}_getDelegateConfig(){const t={};for(const e in this._config)this.constructor.Default[e]!==this._config[e]&&(t[e]=this._config[e]);return t}_cleanTipClass(){const t=this.getTipElement(),e=new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`,"g"),i=t.getAttribute("class").match(e);null!==i&&i.length>0&&i.map((t=>t.trim())).forEach((e=>t.classList.remove(e)))}_getBasicClassPrefix(){return"bs-tooltip"}_handlePopperPlacementChange(t){const{state:e}=t;e&&(this.tip=e.elements.popper,this._cleanTipClass(),this._addAttachmentClass(this._getAttachment(e.placement)))}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null)}static jQueryInterface(t){return this.each((function(){const e=un.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}g(un);const fn={...un.Default,placement:"right",offset:[0,8],trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'},pn={...un.DefaultType,content:"(string|element|function)"},mn={HIDE:"hide.bs.popover",HIDDEN:"hidden.bs.popover",SHOW:"show.bs.popover",SHOWN:"shown.bs.popover",INSERTED:"inserted.bs.popover",CLICK:"click.bs.popover",FOCUSIN:"focusin.bs.popover",FOCUSOUT:"focusout.bs.popover",MOUSEENTER:"mouseenter.bs.popover",MOUSELEAVE:"mouseleave.bs.popover"};class gn extends un{static get Default(){return fn}static get NAME(){return"popover"}static get Event(){return mn}static get DefaultType(){return pn}isWithContent(){return this.getTitle()||this._getContent()}setContent(t){this._sanitizeAndSetContent(t,this.getTitle(),".popover-header"),this._sanitizeAndSetContent(t,this._getContent(),".popover-body")}_getContent(){return this._resolvePossibleFunction(this._config.content)}_getBasicClassPrefix(){return"bs-popover"}static jQueryInterface(t){return this.each((function(){const e=gn.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}g(gn);const _n="scrollspy",bn={offset:10,method:"auto",target:""},vn={offset:"number",method:"string",target:"(string|element)"},yn="active",wn=".nav-link, .list-group-item, .dropdown-item",En="position";class An extends B{constructor(t,e){super(t),this._scrollElement="BODY"===this._element.tagName?window:this._element,this._config=this._getConfig(e),this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,j.on(this._scrollElement,"scroll.bs.scrollspy",(()=>this._process())),this.refresh(),this._process()}static get Default(){return bn}static get NAME(){return _n}refresh(){const t=this._scrollElement===this._scrollElement.window?"offset":En,e="auto"===this._config.method?t:this._config.method,n=e===En?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),V.find(wn,this._config.target).map((t=>{const s=i(t),o=s?V.findOne(s):null;if(o){const t=o.getBoundingClientRect();if(t.width||t.height)return[U[e](o).top+n,s]}return null})).filter((t=>t)).sort(((t,e)=>t[0]-e[0])).forEach((t=>{this._offsets.push(t[0]),this._targets.push(t[1])}))}dispose(){j.off(this._scrollElement,".bs.scrollspy"),super.dispose()}_getConfig(t){return(t={...bn,...U.getDataAttributes(this._element),..."object"==typeof t&&t?t:{}}).target=r(t.target)||document.documentElement,a(_n,t,vn),t}_getScrollTop(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop}_getScrollHeight(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}_getOffsetHeight(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height}_process(){const t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),i=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=i){const t=this._targets[this._targets.length-1];this._activeTarget!==t&&this._activate(t)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(let e=this._offsets.length;e--;)this._activeTarget!==this._targets[e]&&t>=this._offsets[e]&&(void 0===this._offsets[e+1]||t<this._offsets[e+1])&&this._activate(this._targets[e])}}_activate(t){this._activeTarget=t,this._clear();const e=wn.split(",").map((e=>`${e}[data-bs-target="${t}"],${e}[href="${t}"]`)),i=V.findOne(e.join(","),this._config.target);i.classList.add(yn),i.classList.contains("dropdown-item")?V.findOne(".dropdown-toggle",i.closest(".dropdown")).classList.add(yn):V.parents(i,".nav, .list-group").forEach((t=>{V.prev(t,".nav-link, .list-group-item").forEach((t=>t.classList.add(yn))),V.prev(t,".nav-item").forEach((t=>{V.children(t,".nav-link").forEach((t=>t.classList.add(yn)))}))})),j.trigger(this._scrollElement,"activate.bs.scrollspy",{relatedTarget:t})}_clear(){V.find(wn,this._config.target).filter((t=>t.classList.contains(yn))).forEach((t=>t.classList.remove(yn)))}static jQueryInterface(t){return this.each((function(){const e=An.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}j.on(window,"load.bs.scrollspy.data-api",(()=>{V.find('[data-bs-spy="scroll"]').forEach((t=>new An(t)))})),g(An);const Tn="active",On="fade",Cn="show",kn=".active",Ln=":scope > li > .active";class xn extends B{static get NAME(){return"tab"}show(){if(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&this._element.classList.contains(Tn))return;let t;const e=n(this._element),i=this._element.closest(".nav, .list-group");if(i){const e="UL"===i.nodeName||"OL"===i.nodeName?Ln:kn;t=V.find(e,i),t=t[t.length-1]}const s=t?j.trigger(t,"hide.bs.tab",{relatedTarget:this._element}):null;if(j.trigger(this._element,"show.bs.tab",{relatedTarget:t}).defaultPrevented||null!==s&&s.defaultPrevented)return;this._activate(this._element,i);const o=()=>{j.trigger(t,"hidden.bs.tab",{relatedTarget:this._element}),j.trigger(this._element,"shown.bs.tab",{relatedTarget:t})};e?this._activate(e,e.parentNode,o):o()}_activate(t,e,i){const n=(!e||"UL"!==e.nodeName&&"OL"!==e.nodeName?V.children(e,kn):V.find(Ln,e))[0],s=i&&n&&n.classList.contains(On),o=()=>this._transitionComplete(t,n,i);n&&s?(n.classList.remove(Cn),this._queueCallback(o,t,!0)):o()}_transitionComplete(t,e,i){if(e){e.classList.remove(Tn);const t=V.findOne(":scope > .dropdown-menu .active",e.parentNode);t&&t.classList.remove(Tn),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!1)}t.classList.add(Tn),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),u(t),t.classList.contains(On)&&t.classList.add(Cn);let n=t.parentNode;if(n&&"LI"===n.nodeName&&(n=n.parentNode),n&&n.classList.contains("dropdown-menu")){const e=t.closest(".dropdown");e&&V.find(".dropdown-toggle",e).forEach((t=>t.classList.add(Tn))),t.setAttribute("aria-expanded",!0)}i&&i()}static jQueryInterface(t){return this.each((function(){const e=xn.getOrCreateInstance(this);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t]()}}))}}j.on(document,"click.bs.tab.data-api",'[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',(function(t){["A","AREA"].includes(this.tagName)&&t.preventDefault(),c(this)||xn.getOrCreateInstance(this).show()})),g(xn);const Dn="toast",Sn="hide",Nn="show",In="showing",Pn={animation:"boolean",autohide:"boolean",delay:"number"},jn={animation:!0,autohide:!0,delay:5e3};class Mn extends B{constructor(t,e){super(t),this._config=this._getConfig(e),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get DefaultType(){return Pn}static get Default(){return jn}static get NAME(){return Dn}show(){j.trigger(this._element,"show.bs.toast").defaultPrevented||(this._clearTimeout(),this._config.animation&&this._element.classList.add("fade"),this._element.classList.remove(Sn),u(this._element),this._element.classList.add(Nn),this._element.classList.add(In),this._queueCallback((()=>{this._element.classList.remove(In),j.trigger(this._element,"shown.bs.toast"),this._maybeScheduleHide()}),this._element,this._config.animation))}hide(){this._element.classList.contains(Nn)&&(j.trigger(this._element,"hide.bs.toast").defaultPrevented||(this._element.classList.add(In),this._queueCallback((()=>{this._element.classList.add(Sn),this._element.classList.remove(In),this._element.classList.remove(Nn),j.trigger(this._element,"hidden.bs.toast")}),this._element,this._config.animation)))}dispose(){this._clearTimeout(),this._element.classList.contains(Nn)&&this._element.classList.remove(Nn),super.dispose()}_getConfig(t){return t={...jn,...U.getDataAttributes(this._element),..."object"==typeof t&&t?t:{}},a(Dn,t,this.constructor.DefaultType),t}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout((()=>{this.hide()}),this._config.delay)))}_onInteraction(t,e){switch(t.type){case"mouseover":case"mouseout":this._hasMouseInteraction=e;break;case"focusin":case"focusout":this._hasKeyboardInteraction=e}if(e)return void this._clearTimeout();const i=t.relatedTarget;this._element===i||this._element.contains(i)||this._maybeScheduleHide()}_setListeners(){j.on(this._element,"mouseover.bs.toast",(t=>this._onInteraction(t,!0))),j.on(this._element,"mouseout.bs.toast",(t=>this._onInteraction(t,!1))),j.on(this._element,"focusin.bs.toast",(t=>this._onInteraction(t,!0))),j.on(this._element,"focusout.bs.toast",(t=>this._onInteraction(t,!1)))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(t){return this.each((function(){const e=Mn.getOrCreateInstance(this,t);if("string"==typeof t){if(void 0===e[t])throw new TypeError(`No method named "${t}"`);e[t](this)}}))}}return R(Mn),g(Mn),{Alert:W,Button:z,Carousel:st,Collapse:pt,Dropdown:hi,Modal:Hi,Offcanvas:Fi,Popover:gn,ScrollSpy:An,Tab:xn,Toast:Mn,Tooltip:un}}));
//# sourceMappingURL=bootstrap.bundle.min.js.map
/* sticky header / highding official header on scroll */
(function(){

    var doc = document.documentElement;
    var w = window;
  
    var prevScroll = w.scrollY || doc.scrollTop;
    var curScroll;
    var direction = 0;
    var prevDirection = 0;
  
    var header = document.querySelector('.utility-header');
    var mainheader = document.querySelector('header');
  
    var checkScroll = function() {
  
      /*
      ** Find the direction of scroll
      ** 0 - initial, 1 - up, 2 - down
      */
  
      curScroll = w.scrollY || doc.scrollTop;
      if (curScroll > prevScroll) { 
        //scrolled up
        direction = 2;
      }
      else if (curScroll < prevScroll) { 
        //scrolled down
        direction = 1;
      }
  
      if (direction !== prevDirection) {
        toggleHeader(direction, curScroll);
      }
  
      prevScroll = curScroll;
    };
  
    var toggleHeader = function(direction, curScroll) {
      if (direction === 2 && curScroll > 40) { 
  
        mainheader.classList.add('scrolled');
        header.classList.add('is-hidden');
        prevDirection = direction;
      }
      else if (direction === 1) {
        mainheader.classList.remove('scrolled');
        header.classList.remove('is-hidden');
        prevDirection = direction;
      }
    };
  
    window.addEventListener('scroll', checkScroll);
  
  })();
(function (exports) {
  'use strict';


  /**
   * Accordion web component that collapses and expands content inside itself on click.
   * 
   * @element cagov-accordion
   * 
   * @prop {class string} prog-enhanced - The element is open before any javascript executes so content can be read if an error occurs that prevents js execution. The prog-enhanced class is added to the element once javascript begins to execute. This triggers default collabsed state.
   * 
   * @fires click - Default value, will be defined by this.dataset.eventType.
   * 
   * @attr {string} [data-event-type=click] - dataset defined value for event type fired on click.
   * @attr {string} aria=expanded=true - set on the internal element .accordion-card-header. If this is true the accordion will be open before any user interaction.
   * 
   * @cssprop --primary-color - Default value of #1f2574, used for all colors of borders and fills
   * @cssprop --hover-color - Default value of #F9F9FA, used for background on hover
   * 
   */

  class CaGovAccordion extends window.HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.classList.add('prog-enhanced');
      // console.log(this.classList)
      // console.log(this.querySelector('.prog-enhanced'))
      this.expandTarget = this.querySelector('.accordion-card-container');
      this.expandButton = this.querySelector('.accordion-card-header');


      if (this.expandButton) {
        this.expandButton.addEventListener('click', this.listen.bind(this));
      } else {
        // console.log('could not attach expan dlistener')
      }

      this.activateButton = this.querySelector('.accordion-card-header');
      // console.log(this)
      // console.log(document.querySelector('.accordion-card-header'))
      this.eventType = this.dataset.eventType ? this.dataset.eventType : 'click'; // Detect if accordion should open by default

      let expanded = (this.activateButton) ? this.activateButton.getAttribute('aria-expanded') : false;

      if (expanded === "true") {
        this.triggerAccordionClick(); // Open the accordion.

        let allLinks = this.querySelectorAll(".accordion-card-container a");
        let allbuttons = this.querySelectorAll(".accordion-card-container button");

        for (var i = 0; i < allLinks.length; i++) {
          allLinks[i].removeAttribute("tabindex"); // remove tabindex from all the links
        }

        for (var i = 0; i < allbuttons.length; i++) {
          allbuttons[i].removeAttribute("tabindex"); // remove tabindex from all the buttons
        }
      } // making sure that all links inside of the accordion container are having tabindex -1
      else {
        // console.log('doing something else')
        let allLinks = this.querySelectorAll(".accordion-card-container a");
        let allbuttons = this.querySelectorAll(".accordion-card-container button");

        for (var i = 0; i < allLinks.length; i++) {
          allLinks[i].setAttribute('tabindex', '-1');
        }

        for (var i = 0; i < allbuttons.length; i++) {
          allbuttons[i].setAttribute('tabindex', '-1');
        }
      }
    }

    listen() {
      if (!this.cardBodyHeight) {
        this.cardBodyHeight = this.querySelector('.card-body').clientHeight + 24;
      }

      if (this.expandTarget.clientHeight > 0) {
        this.closeAccordion();
      } else {
        this.expandAccordion();
      }
    }

    triggerAccordionClick() {
      const event = new MouseEvent(this.eventType, {
        view: window,
        bubbles: true,
        cancelable: true
      });
      this.expandButton.dispatchEvent(event);
    }

    closeAccordion() {
      this.expandTarget.style.height = '0px';
      this.expandTarget.setAttribute('aria-hidden', 'true');
      this.querySelector('.accordion-card-header').classList.remove('accordion-alpha-open');
      this.activateButton.setAttribute('aria-expanded', 'false');
      let allLinks = this.querySelectorAll(".accordion-card-container a");
      let allbuttons = this.querySelectorAll(".accordion-card-container button");

      for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].setAttribute('tabindex', '-1'); // tabindex to all links
      }

      for (var i = 0; i < allbuttons.length; i++) {
        allbuttons[i].setAttribute('tabindex', '-1'); // tabindex to all buttons
      }
    }

    expandAccordion() {
      this.expandTarget.style.height = this.cardBodyHeight + 'px';
      this.expandTarget.setAttribute('aria-hidden', 'false');
      this.querySelector('.accordion-card-header').classList.add('accordion-alpha-open');
      this.querySelector('.accordion-card-container').classList.remove('collapsed');
      this.activateButton.setAttribute('aria-expanded', 'true');
      let allLinks = this.querySelectorAll(".accordion-card-container a");
      let allbuttons = this.querySelectorAll(".accordion-card-container button");

      for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].removeAttribute("tabindex"); // remove tabindex from all the links
      }

      for (var i = 0; i < allbuttons.length; i++) {
        allbuttons[i].removeAttribute("tabindex"); // remove tabindex from all the buttons
      }
    }

  }
  window.customElements.define('cagov-accordion', CaGovAccordion);

  exports.CaGovAccordion = CaGovAccordion;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
! function (t, e, a) {
  "use strict";
  var r = {};
  t.ARIAaccordion = r, r.NS = "ARIAaccordion", r.AUTHOR = "Scott O'Hara", r.VERSION = "3.2.1", r.LICENSE = "https://github.com/scottaohara/accessible_accordions/blob/master/LICENSE";
  var i = "accordion",
    l = i + "__trigger",
    n = i + "__panel",
    o = "[data-aria-accordion-heading]",
    d = "[data-aria-accordion-panel]",
    c = 0;
  r.create = function () {
    var t, a, s, u, A, g, h = "none",
      b = e.querySelectorAll("[data-aria-accordion]");
    for (c += 1, g = 0; g < b.length; g++) {
      var f;
      if ((t = b[g]).hasAttribute("id") || (t.id = "acc_" + c + "-" + g), t.classList.add(i), e.querySelectorAll("#" + t.id + "> li").length ? (a = e.querySelectorAll("#" + t.id + " li > " + d), s = e.querySelectorAll("#" + t.id + " li > " + o)) : (a = e.querySelectorAll("#" + t.id + " > " + d), s = e.querySelectorAll("#" + t.id + " > " + o)), t.hasAttribute("data-default") && (h = t.getAttribute("data-default")), A = t.hasAttribute("data-constant"), t.hasAttribute("data-multi"), t.hasAttribute("data-transition")) {
        var y = t.querySelectorAll(d);
        for (f = 0; f < y.length; f++) y[f].classList.add(n + "--transition")
      }
      for (r.setupPanels(t.id, a, h, A), r.setupHeadingButton(s, A), u = e.querySelectorAll("#" + t.id + "> li").length ? e.querySelectorAll("#" + t.id + " li > " + o + " ." + l) : e.querySelectorAll("#" + t.id + " > " + o + " ." + l), f = 0; f < u.length; f++) u[f].addEventListener("click", r.actions), u[f].addEventListener("keydown", r.keytrolls)
    }
  }, r.setupPanels = function (t, e, a, r) {
    var i, l, o, d, c;
    for (i = 0; i < e.length; i++) o = t + "_panel_" + (i + 1), d = a, c = r, (l = e[i]).setAttribute("id", o), s(e[0], !0), l.classList.add(n), "none" !== d && NaN !== parseInt(d) && (d <= 1 ? s(e[0], !1) : d - 1 >= e.length ? s(e[e.length - 1], !1) : s(e[d - 1], !1)), (c && "none" === d || NaN === parseInt(d)) && s(e[0], !1)
  }, r.setupHeadingButton = function (t, a) {
    var r, i, n, o, d, c;
    for (c = 0; c < t.length; c++) i = (r = t[c]).nextElementSibling.id, n = e.getElementById(i).getAttribute("aria-hidden"), o = e.createElement("button"), d = r.textContent, r.innerHTML = "", r.classList.add("accordion__heading"), o.setAttribute("type", "button"), o.setAttribute("aria-controls", i), o.setAttribute("id", i + "_trigger"), o.classList.add(l), "false" === n ? (u(o, !0), g(o, !0), a && o.setAttribute("aria-disabled", "true")) : (u(o, !1), g(o, !1)), r.appendChild(o), o.appendChild(e.createTextNode(d))
  }, r.actions = function (t) {
    var a, i = this.id.replace(/_panel.*$/g, ""),
      n = e.getElementById(this.getAttribute("aria-controls"));
    a = e.querySelectorAll("#" + i + "> li").length ? e.querySelectorAll("#" + i + " li > " + o + " ." + l) : e.querySelectorAll("#" + i + " > " + o + " ." + l), t.preventDefault(), r.togglePanel(t, i, n, a)
  }, r.togglePanel = function (t, a, r, i) {
    var l, n, o = t.target;
    if ("true" !== o.getAttribute("aria-disabled") && (l = o.getAttribute("aria-controls"), g(o, "true"), "true" === o.getAttribute("aria-expanded") ? (u(o, "false"), s(r, "true")) : (u(o, "true"), s(r, "false"), e.getElementById(a).hasAttribute("data-constant") && A(o, "true")), e.getElementById(a).hasAttribute("data-constant") || !e.getElementById(a).hasAttribute("data-multi")))
      for (n = 0; n < i.length; n++) o !== i[n] && (g(i[n], "false"), l = i[n].getAttribute("aria-controls"), A(i[n], "false"), u(i[n], "false"), s(e.getElementById(l), "true"))
  }, r.keytrolls = function (t) {
    if (t.target.classList.contains(l)) {
      var a, r = t.keyCode || t.which,
        i = this.id.replace(/_panel.*$/g, "");
      switch (a = e.querySelectorAll("#" + i + "> li").length ? e.querySelectorAll("#" + i + " li > " + o + " ." + l) : e.querySelectorAll("#" + i + " > " + o + " ." + l), r) {
        case 35:
          t.preventDefault(), a[a.length - 1].focus();
          break;
        case 36:
          t.preventDefault(), a[0].focus()
      }
    }
  }, r.init = function () {
    r.create()
  };
  var s = function (t, e) {
    t.setAttribute("aria-hidden", e)
  },
    u = function (t, e) {
      t.setAttribute("aria-expanded", e)
    },
    A = function (t, e) {
      t.setAttribute("aria-disabled", e)
    },
    g = function (t, e) {
      t.setAttribute("data-current", e)
    };
  r.init()
}(window, document);
/* -----------------------------------------
   NAVIGATION - /source/js/cagov/navigation.js
----------------------------------------- */


/*
 * ES2015 accessible accordion system, using ARIA
 * Website: https://van11y.net/accessible-accordion/
 * License MIT: https://github.com/nico3333fr/van11y-accessible-accordion-aria/blob/master/LICENSE
 */
"use strict";

//JQUERY replacement helpers
//var matches = function(el, selector) {
//    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
//};
//var defaultActiveLink = "About";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var loadConfig = function loadConfig() {

    var CACHE = {};

    var set = function set(id, config) {

        CACHE[id] = config;
    };
    var get = function get(id) {
        return CACHE[id];
    };
    var remove = function remove(id) {
        return CACHE[id];
    };

    return {
        set: set,
        get: get,
        remove: remove
    };
};

var DATA_HASH_ID = 'data-nav-id';

var pluginConfig = loadConfig();

/** Find an element based on an Id
 * @param  {String} id Id to find
 * @param  {String} hash hash id (not mandatory)
 * @return {Node} the element with the specified id
 */
var findById = function findById(id, hash) {
    return document.querySelector('#' + id + '[' + DATA_HASH_ID + '="' + hash + '"]');
};

/** add a class to a node
 * @param  {Node} el node to attach class
 * @param  {String} className the class to add
 */
var addClass = function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className); // IE 10+
    } else {
        el.className += ' ' + className; // IE 8+
    }
};

/** remove class from node
 * @param  {Node} el node to remove class
 * @param  {String} className the class to remove
 */
var removeClass = function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className); // IE 10+
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '); // IE 8+
    }
};

// check if node has specified class
// @param  {Node} el node to check
// @param  {String} className the class

var hasClass = function hasClass(el, className) {
    if (el.classList) {
        return el.classList.contains(className); // IE 10+
    } else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className); // IE 8+ ?
    }
};

var setAttributes = function setAttributes(node, attrs) {
    Object.keys(attrs).forEach(function (attribute) {
        node.setAttribute(attribute, attrs[attribute]);
    });
};

/** search if element is or is contained in another element with attribute data-nav-id
 * @param  {Node} el element (node)
 * @param  {String} hashId the attribute data-hashtooltip-id
 * @return {String} the value of attribute data-hashtooltip-id
 */
var searchParentHashId = function searchParentHashId(el, hashId) {
    var found = false;

    var parentElement = el;
    while (parentElement.nodeType === 1 && parentElement && found === false) {

        if (parentElement.hasAttribute(hashId) === true) {
            found = true;
        } else {
            parentElement = parentElement.parentNode;
        }
    }
    if (found === true) {
        return parentElement.getAttribute(hashId);
    } else {
        return '';
    }
};
var searchParent = function searchParent(el, parentClass, hashId) {
    var found = false;

    var parentElement = el;
    while (parentElement && found === false) {
        if (hasClass(parentElement, parentClass) === true && parentElement.getAttribute(DATA_HASH_ID) === hashId) {
            found = true;
        } else {
            parentElement = parentElement.parentNode;
        }
    }
    if (found === true) {
        return parentElement.getAttribute('id');
    } else {
        return '';
    }
};

//var unSelectHeaders = function unSelectHeaders(elts, attrSelected) {
//    elts.forEach(function (header_node) {
//        setAttributes(header_node, _defineProperty({}, attrSelected, 'false'));
//    });
//};
/*
var selectHeader = function selectHeader(el, attrSelected) {
    el.setAttribute(attrSelected, true);
};

var selectHeaderInList = function selectHeaderInList(elts, param, attrSelected) {
    var indice_trouve = undefined;
    elts.forEach(function (header_node, index) {

        if (header_node.getAttribute(attrSelected) === 'true') {
            indice_trouve = index;
        }
    });

    if (param === 'next') {
        selectHeader(elts[indice_trouve + 1]);
        setTimeout(function () {
            elts[indice_trouve + 1].focus();
        }, 0);
    }
    if (param === 'prev') {
        selectHeader(elts[indice_trouve - 1]);
        setTimeout(function () {
            elts[indice_trouve - 1].focus();
        }, 0);
    }
};
*/
var plugin = function plugin() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    // Findig if first-level-link has sub-nav then changing its clasee to first-level-btn
    //JQuery
    //var $navItemsWithSubs = $('.main-navigation').find('.sub-nav').siblings('.first-level-link');
    var className = "first-level-btn";

    //Change all the links next to sub-navs to first-level-btn
    document.querySelectorAll('.main-navigation .sub-nav').forEach(function (node) {
        node.parentElement.querySelector('a').className=className;
    });

    var CONFIG = _extends({
        ACCORDION_JS: 'main-navigation',
        ACCORDION_JS_HEADER: className, // Assigning button class to link that has sub-nav
        ACCORDION_JS_PANEL: 'nav-panel',

        ACCORDION_DATA_PREFIX_CLASS: 'data-nav-prefix-classes',
        ACCORDION_DATA_OPENED: 'data-nav-opened',
        ACCORDION_DATA_MULTISELECTABLE: 'data-nav-multiselectable',
        ACCORDION_DATA_COOL_SELECTORS: true,

        ACCORDION_PREFIX_IDS: 'nav',
        ACCORDION_BUTTON_ID: '_tab',
        ACCORDION_PANEL_ID: '_panel',

        ACCORDION_STYLE: 'nav',
        ACCORDION_TITLE_STYLE: 'has-sub-btn',
        ACCORDION_HEADER_STYLE: 'nav-header',
        ACCORDION_PANEL_STYLE: 'sub-nav',

        ACCORDION_ROLE_TABLIST: 'tablist',
        ACCORDION_ROLE_TAB: 'tab',
        ACCORDION_ROLE_TABPANEL: 'tabpanel',

        ATTR_ROLE: 'role',
        ATTR_MULTISELECTABLE: 'data-multiselectable',
        ATTR_EXPANDED: 'aria-expanded',
        ATTR_LABELLEDBY: 'aria-labelledby',
        ATTR_HIDDEN: 'aria-hidden',
        ATTR_CONTROLS: 'aria-controls',
        ATTR_SELECTED: 'aria-selected'
    }, config);

    var HASH_ID = Math.random().toString(32).slice(2, 12);

    pluginConfig.set(HASH_ID, CONFIG);
    // Find all accordions inside a container
    // @param  {Node} node Default document
    // @return {Array}
    var listAccordions = function listAccordions() {
        var node = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
        return [].slice.call(node.querySelectorAll('.' + CONFIG.ACCORDION_JS));
    };

    // Build accordions for a container
    // @param  {Node} node
    // @param  {addListeners} boolean
    var attach = function attach(node) {

        listAccordions(node).forEach(function (accordion_node) {
            var iLisible = 'z' + Math.random().toString(32).slice(2, 12); // avoid selector exception when starting by a number
            var prefixClassName = accordion_node.hasAttribute(CONFIG.ACCORDION_DATA_PREFIX_CLASS) === true ? accordion_node.getAttribute(CONFIG.ACCORDION_DATA_PREFIX_CLASS) + '-' : '';
            var coolSelectors = CONFIG.ACCORDION_DATA_COOL_SELECTORS === true;
            var childClassName = 'first-level-btn';
            
            // Init attributes accordion
            if (!mobileView()) {
                accordion_node.setAttribute(CONFIG.ATTR_MULTISELECTABLE, 'false');
            } else {
                accordion_node.setAttribute(CONFIG.ATTR_MULTISELECTABLE, 'true');
            }
           // accordion_node.setAttribute(CONFIG.ATTR_ROLE, CONFIG.ACCORDION_ROLE_TABLIST);
            // We already have main navigation id
            // accordion_node.setAttribute('id', iLisible);
            accordion_node.setAttribute(DATA_HASH_ID, HASH_ID);

            addClass(accordion_node, prefixClassName + CONFIG.ACCORDION_STYLE);

            var listAccordionsHeader = [].slice.call(accordion_node.querySelectorAll('.' + childClassName));
            listAccordionsHeader.forEach(function (header_node, index_header) {
                var _setAttributes2, _setAttributes3;

                // if we do not have cool selectors enabled,
                // it is not a direct child, we ignore it
                if (header_node.parentNode !== accordion_node && coolSelectors === false) {
                    return;
                }

                var indexHeaderLisible = index_header + 1;
                var accordionPanel = header_node.nextElementSibling;
                var accordionHeaderText = header_node.innerHTML;
                var accordionButton = document.createElement("BUTTON");
                var accordionOpenedAttribute = header_node.hasAttribute(CONFIG.ACCORDION_DATA_OPENED) === true ? header_node.getAttribute(CONFIG.ACCORDION_DATA_OPENED) : '';

                // set button with attributes
                accordionButton.innerHTML = accordionHeaderText;
                addClass(accordionButton, childClassName);
                addClass(accordionButton, prefixClassName + CONFIG.ACCORDION_HEADER_STYLE);
                setAttributes(accordionButton, (_setAttributes2 = {}, _defineProperty(_setAttributes2, 'id', CONFIG.ACCORDION_PREFIX_IDS + iLisible + CONFIG.ACCORDION_BUTTON_ID + indexHeaderLisible), _defineProperty(_setAttributes2, CONFIG.ATTR_CONTROLS, CONFIG.ACCORDION_PREFIX_IDS + iLisible + CONFIG.ACCORDION_PANEL_ID + indexHeaderLisible), _defineProperty(_setAttributes2, DATA_HASH_ID, HASH_ID), _setAttributes2));

                // place button
                header_node.innerHTML = '';
                header_node.appendChild(accordionButton);

                // move title into panel
                //accordionPanel.insertBefore(header_node, accordionPanel.firstChild);
                // set title with attributes
                addClass(header_node, prefixClassName + CONFIG.ACCORDION_TITLE_STYLE);
                removeClass(header_node, childClassName);

                // set attributes to panels
                addClass(accordionPanel, prefixClassName + CONFIG.ACCORDION_PANEL_STYLE);
                setAttributes(accordionPanel, (_setAttributes3 = {}, _defineProperty(_setAttributes3, CONFIG.ATTR_ROLE, CONFIG.ACCORDION_ROLE_TABPANEL), _defineProperty(_setAttributes3, CONFIG.ATTR_LABELLEDBY, CONFIG.ACCORDION_PREFIX_IDS + iLisible + CONFIG.ACCORDION_BUTTON_ID + indexHeaderLisible), _defineProperty(_setAttributes3, 'id', CONFIG.ACCORDION_PREFIX_IDS + iLisible + CONFIG.ACCORDION_PANEL_ID + indexHeaderLisible), _defineProperty(_setAttributes3, DATA_HASH_ID, HASH_ID), _setAttributes3));

                if (accordionOpenedAttribute === 'true') {
                    accordionButton.setAttribute(CONFIG.ATTR_EXPANDED, 'true');
                    header_node.removeAttribute(CONFIG.ACCORDION_DATA_OPENED);
                    accordionPanel.setAttribute(CONFIG.ATTR_HIDDEN, 'false');
                    
                    //$(accordionPanel).find(".second-level-link").removeAttr("tabindex"); //JQ
                    accordionPanel.querySelectorAll(".second-level-link").forEach(function(item) {item.removeAttribute('tabindex');}); //JS
                } else {
                    accordionButton.setAttribute(CONFIG.ATTR_EXPANDED, 'false');
                    accordionPanel.setAttribute(CONFIG.ATTR_HIDDEN, 'true');
                    // making sure all second level links are not tabable
                    
                    //$(accordionPanel).find(".second-level-link").attr("tabindex", "-1"); //JQ
                    accordionPanel.querySelectorAll(".second-level-link").forEach(function(item) {item.setAttribute('tabindex', '-1');}); //JS

                }
            });
        });
    };

    return {
        attach: attach
        /*,
                destroy*/
    };
};

var main = function main() {

    /* listeners for all configs */
    ['click', 'keydown', 'focus'].forEach(function (eventName) {

        document.body.addEventListener(eventName, function (e) {

            var hashId = searchParentHashId(e.target, DATA_HASH_ID); //e.target.dataset.hashId;
            // search if click on button or on element in a button contains data-hash-id (it is needed to load config and know which class to search)


            if (hashId !== '') {
                (function () {

                    // loading config from element
                    var CONFIG = pluginConfig.get(hashId);
/*
                    // focus on button
                    if (hasClass(e.target, 'first-level-btn') === true && eventName === 'focus') {
                        (function () {
                            var buttonTag = e.target;
                            var accordionContainer = findById(searchParent(buttonTag, CONFIG.ACCORDION_JS, hashId), hashId);
                            var coolSelectors = CONFIG.ACCORDION_DATA_COOL_SELECTORS === true;
                            var accordionAllHeaders = [].slice.call(accordionContainer.querySelectorAll('.first-level-btn'));

                            if (coolSelectors === false) {
                                accordionAllHeaders = accordionAllHeaders.filter(function (element) {
                                    return element.parentNode.parentNode === accordionContainer;
                                });
                            }

                           // unSelectHeaders(accordionAllHeaders, CONFIG.ATTR_SELECTED);

                           // selectHeader(buttonTag, CONFIG.ATTR_SELECTED);
                        })();
                    }
*/
                    // click on button
                    if (hasClass(e.target, 'first-level-btn') === true && eventName === 'click') {
                        (function () {
                            var buttonTag = e.target;
                            var accordionContainer = findById(searchParent(buttonTag, CONFIG.ACCORDION_JS, hashId), hashId);
                            var coolSelectors = CONFIG.ACCORDION_DATA_COOL_SELECTORS === true;
                            var accordionAllHeaders = [].slice.call(accordionContainer.querySelectorAll('.first-level-btn'));
                            //var accordionMultiSelectable = accordionContainer.getAttribute(CONFIG.ATTR_MULTISELECTABLE);
                            var destination = findById(buttonTag.getAttribute(CONFIG.ATTR_CONTROLS), hashId);
                            var stateButton = buttonTag.getAttribute(CONFIG.ATTR_EXPANDED);


                            if (coolSelectors === false) {
                                accordionAllHeaders = accordionAllHeaders.filter(function (element) {
                                    return element.parentNode.parentNode === accordionContainer;
                                });
                            }

                            // if closed
                            if (stateButton === 'false') {
                                buttonTag.setAttribute(CONFIG.ATTR_EXPANDED, true);
                                destination.removeAttribute(CONFIG.ATTR_HIDDEN);
                                //$(destination).addClass("open"); //JQ
                                addClass(destination,"open"); //JS
                                // making second level links tabbable if sub nav panel is opened
                                //$(destination).find(".second-level-link").removeAttr("tabindex"); //JQ
                                destination.querySelectorAll(".second-level-link").forEach(function(item) {item.removeAttribute('tabindex');}); //JS
                            } else {
                                buttonTag.setAttribute(CONFIG.ATTR_EXPANDED, false);
                                destination.setAttribute(CONFIG.ATTR_HIDDEN, true);
                                removeClass(destination,"open"); //JS
                                //$(destination).removeClass("open"); //JQ
                                // adding tabindex to links to make sure they are not tabable if sub nav panel is closed
                                //$(destination).find(".second-level-link").attr("tabindex", "-1");
                                destination.querySelectorAll(".second-level-link").forEach(function(item) {item.setAttribute('tabindex', '-1');}); //JS
                            }

                            if (!mobileView()) {
                                accordionAllHeaders.forEach(function (header_node) {
                                    //Close all the other panels

                                    var destinationPanel = findById(header_node.getAttribute(CONFIG.ATTR_CONTROLS), hashId);

                                    if (header_node !== buttonTag) {
                                       // header_node.setAttribute(CONFIG.ATTR_SELECTED, false);
                                        header_node.setAttribute(CONFIG.ATTR_EXPANDED, false);
                                        //$(destinationPanel).removeClass("open"); //JQ

                                        removeClass(destinationPanel,"open"); //JS
                                        //destinationPanel.setAttribute(CONFIG.ATTR_HIDDEN, true);

                                       //Added fix to make closed panels non-tabbable
                                       destinationPanel.querySelectorAll(".second-level-link").forEach(function(item) {item.setAttribute('tabindex', '-1');}); //JS
                                    } 
                                });
                            }

                            setTimeout(function () {
                                buttonTag.focus();
                            }, 0);
                            e.stopPropagation(); // making icons and other buttons elements clickable  https://css-tricks.com/slightly-careful-sub-elements-clickable-things/
                            e.preventDefault();
                        })();
                    }

                    // keyboard management for headers
                    //if (hasClass(e.target, 'first-level-btn') === true && eventName === 'keydown') {
                    //    (function () {
                    //        var buttonTag = e.target;
                    //        var idAccordionContainer = searchParent(buttonTag, CONFIG.ACCORDION_JS, hashId);
                    //        var accordionContainer = findById(idAccordionContainer, hashId);

                    //        var coolSelectors = CONFIG.ACCORDION_DATA_COOL_SELECTORS === true;
                    //        var accordionAllHeaders = [].slice.call(accordionContainer.querySelectorAll('.first-level-btn'));

                    //        if (coolSelectors === false) {
                    //            accordionAllHeaders = accordionAllHeaders.filter(function (element) {
                    //                return element.parentNode.parentNode === accordionContainer;
                    //            });
                    //        }

                    //        // strike home on a tab => 1st tab
                    //        if (e.keyCode === 36) {
                    //            unSelectHeaders(accordionAllHeaders, CONFIG.ATTR_SELECTED);
                    //            selectHeader(accordionAllHeaders[0], CONFIG.ATTR_SELECTED);
                    //            setTimeout(function () {
                    //                accordionAllHeaders[0].focus();
                    //            }, 0);
                    //            e.preventDefault();
                    //        }
                    //        // strike end on the tab => last tab
                    //        else if (e.keyCode === 35) {
                    //            unSelectHeaders(accordionAllHeaders, CONFIG.ATTR_SELECTED);
                    //            selectHeader(accordionAllHeaders[accordionAllHeaders.length - 1], CONFIG.ATTR_SELECTED);
                    //            setTimeout(function () {
                    //                accordionAllHeaders[accordionAllHeaders.length - 1].focus();
                    //            }, 0);
                    //            e.preventDefault();
                    //        }
                    //        // strike up or left on the tab => previous tab
                    //        else if ((e.keyCode === 37 || e.keyCode === 38) && !e.ctrlKey) {

                    //            // if first selected = select last
                    //            if (accordionAllHeaders[0].getAttribute(CONFIG.ATTR_SELECTED) === 'true') {
                    //                unSelectHeaders(accordionAllHeaders, CONFIG.ATTR_SELECTED);
                    //                selectHeader(accordionAllHeaders[accordionAllHeaders.length - 1], CONFIG.ATTR_SELECTED);
                    //                setTimeout(function () {
                    //                    accordionAllHeaders[accordionAllHeaders.length - 1].focus();
                    //                }, 0);
                    //                e.preventDefault();
                    //            } else {
                    //                selectHeaderInList(accordionAllHeaders, 'prev', CONFIG.ATTR_SELECTED);
                    //                e.preventDefault();
                    //            }
                    //        }
                    //        // strike down or right in the tab => next tab
                    //        else if ((e.keyCode === 40 || e.keyCode === 39) && !e.ctrlKey) {

                    //            // if last selected = select first
                    //            if (accordionAllHeaders[accordionAllHeaders.length - 1].getAttribute(CONFIG.ATTR_SELECTED) === 'true') {
                    //                unSelectHeaders(accordionAllHeaders, CONFIG.ATTR_SELECTED);
                    //                selectHeader(accordionAllHeaders[0], CONFIG.ATTR_SELECTED);
                    //                setTimeout(function () {
                    //                    accordionAllHeaders[0].focus();
                    //                }, 0);
                    //                e.preventDefault();
                    //            } else {
                    //                selectHeaderInList(accordionAllHeaders, 'next', CONFIG.ATTR_SELECTED);
                    //                e.preventDefault();
                    //            }
                    //        }
                    //    })();
                    //}
                })();
            }
        }, true);
    });

    return plugin;
};

window.van11yAccessibleAccordionAria = main();

var onLoad = function onLoad() {
    var expand_default = window.van11yAccessibleAccordionAria();
    expand_default.attach();

    document.removeEventListener('DOMContentLoaded', onLoad);
};

document.addEventListener('DOMContentLoaded', onLoad);
//window.addEventListener("resize", navreset);


function NavReset() {
    
    //RESET
    //JS
    document.querySelectorAll(".first-level-btn").forEach(function(el) {el.setAttribute("aria-expanded", "false");});
    document.querySelectorAll(".sub-nav").forEach(function(el) {
        el.setAttribute("aria-hidden", "true");
        removeClass(el,"open");
    });
    document.querySelectorAll(".second-level-link").forEach(function(el) {el.setAttribute("tabindex", "-1");});

    if (window.innerWidth <= 991) {
        document.querySelectorAll(".rotate").forEach(function(el) {el.style.display="block";});
     } else {
        document.querySelectorAll(".rotate").forEach(function(el) {el.style.display="none";});
        var nav = document.querySelector("#navigation");
        removeClass(nav,"collapse");
        nav.removeAttribute("aria-hidden");
    }

    //JQ
    //$(".first-level-btn").attr("aria-expanded", "false");
    // // $(".first-level-btn").attr("aria-selected", "false");
    //$(".sub-nav").attr("aria-hidden", "true").removeClass("open");
    //$(".second-level-link").attr("tabindex", "-1");
    //var toggleSubNav = $('<div class="ca-gov-icon-caret-right rotate" aria-hidden="true"></div>');
    
    //if (window.innerWidth <= 991) {
    //    //$('.has-sub').append(toggleSubNav);
    //    $(".rotate").css("display", "block");
    // }
    //else {
    //    $("#navigation").removeClass("collapse").removeAttr("aria-hidden");
    //    $(".rotate").css("display", "none");
   // }

}

var mobileView = function() {
    //JQ
    //return $('.global-header .mobile-controls').css('display') !== "none"; // mobile view uses arrow to show subnav instead of first touch
    //JS
    return getComputedStyle(document.querySelector('.global-header .mobile-controls'))['display'] !== 'none';
};

function AlmostJQueryDocumentReady(callbackFunction){
    if(document.readyState != 'loading')
        callbackFunction();
    else
        document.addEventListener("DOMContentLoaded", callbackFunction);
}

// Remove href if <a> has a link
AlmostJQueryDocumentReady(function () { //JS
//$(document).ready(function () { //JQ
    var navigationJS = document.querySelector(".main-navigation");

    var subnavbtnJS = document.querySelectorAll(".main-navigation .nav-item a.has-sub-btn");
    subnavbtnJS.forEach(function (item) {
        // Change <a> tag to div since you can't place button into <a> tag
        var newDiv = document.createElement("div");
        newDiv.innerHTML = item.innerHTML;
        newDiv.classList.add('has-sub-btn');
        item.replaceWith(newDiv);
    });

    // Change <a> tag to div since you can't place button into <a> tag
    /*
     //JQ//
    var subnavbtn = $(".nav-item .has-sub-btn");
    $(".has-sub-btn").removeAttr("href");
    subnavbtn.replaceWith(function () {
        
        return $('<div/>', {
            class: 'has-sub-btn',
            html: this.innerHTML
        });
    });
    */

    if (mobileView()) {
        //JS
        navigationJS.classList.add('collapse');
        /*
        JQ
        $('#navigation').addClass('collapse');
        $('#navigation').addClass('collapse');
        */
    }

    // Variables JQ
    //var $navigation = $('.main-navigation'),
        //$navItems = $navigation.find('.nav-item'), // JQ first level link containers'
        //$navItemsWithSubs = $navItems.has('.sub-nav'), //JQ
        //$subNavs = $navigation.find('.sub-nav'),//JQ
        //megamenu = $navigation.hasClass('megadropdown'),//JQ
        //dropdown = $navigation.hasClass('dropdown'),//JQ
     //   singleLevel = $navigation.hasClass('singleLevel'),
     //   setActiveLinkByFolder = $navigation.hasClass('auto-highlight'); // Use new folder matching method to highlight the current navigation tab

    // Variables JS

    var singleLevel = navigationJS.classList.contains('singleLevel');
    var setActiveLinkByFolder = navigationJS.classList.contains('auto-highlight');

    var navItemsJS = document.querySelectorAll(".main-navigation .nav-item");
    var navItemsWithSubsJS = [].slice.call(document.querySelectorAll(".main-navigation .nav-item")).filter(function (x) {return x.querySelector('.sub-nav');});

    // HIGHLIGHT APPROPRIATE NAV ITEM
    var reMainNav = "";
    if (typeof defaultActiveLink !== "undefined") { //Globally set var
        // eslint-disable-next-line no-undef
        reMainNav = new RegExp("^" + defaultActiveLink + "$", "i"); // Regex for finding the index of the default main list item
    }

    navItemsJS.forEach(function (navItem) {
        var link = navItem.querySelector(".first-level-btn, .first-level-link");

        if (reMainNav) {
            if (link.textContent.match(reMainNav)) {
                navItem.classList.add('active');
            }
        } else if (setActiveLinkByFolder && link.getAttribute('href')) {
            var arrNavLink = link.getAttribute('href').split("/");
            var arrCurrentURL = location.href.split("/");

            if (arrNavLink.length > 4 && arrCurrentURL[3] === arrNavLink[3]) { // folder of current URL matches this nav link
            //if (arrNavLink.length > 1 && arrNavLink[arrNavLink.length - 1].trim().toLowerCase() === arrCurrentURL[arrCurrentURL.length - 1].trim().toLowerCase() ) { 
                // folder of current URL matches this nav link
                navItem.classList.add('active');
            }
        }
    });
    
    /* JQ
    $navItems.each(function () { // loop through top level links
        var $this = $(this),
            $a = $this.find('.first-level-btn, .first-level-link');

        if (reMainNav) {
            if ($a.text().match(reMainNav)) {
                $this.addClass('active');
            }
        } else if (setActiveLinkByFolder && $a.attr('href')) {
            var arrNavLink = $a[0].href.split("/");
            if (arrNavLink.length > 4 && arrCurrentURL[3] === arrNavLink[3]) { // folder of current URL matches this nav link
                $this.addClass('active');
            }
        }
    });
*/

    // Reset if click outside of nav
    document.addEventListener("mouseup", function (e) { //JS
    //$(document).mouseup(function (e) { //JQ

        //var navContainer = $(".main-navigation"); //JQ
        var navContainer = document.querySelector(".main-navigation"); //JS

        // if the target of the click isn't the navigation container nor a descendant of the navigation
        //if (!navContainer.is(e.target) && navContainer.has(e.target).length === 0) { //JQ
        if (navContainer !== e.target && !navContainer.contains(e.target)) { //JS
            NavReset();
        }
    //}); //JQ
    }); //JS


    // Nav items with subs
    //JQ
    //$navItemsWithSubs.each(function () {
    //    var itemCount = $(this).find('.second-level-nav > li').length;
    //    if (itemCount <= 2) {
    //        $(this).find('.sub-nav').addClass('with-few-items');
    //    }
    //});
    //JS
    navItemsWithSubsJS.forEach(function(el) {
        var itemCount = el.querySelectorAll('.second-level-nav > li').length;
        if (itemCount <= 2) {
            var subnav = el.querySelector('.sub-nav');
            addClass(subnav,'with-few-items');
        }
    });


    // Add class has-sub, then add carrots
    if (!singleLevel) {
        //$navItemsWithSubs.each(function () { //JQ
        
            //$(this).find('.first-level-btn').addClass('has-sub'); //JQ
            document.querySelectorAll(".first-level-btn").forEach(function(el) { //JS
                addClass(el,"has-sub"); //JS

                //JQ
                //var carrot = $('<span class="ca-gov-icon-triangle-down carrot" aria-hidden="true"></span>');
                //var toggleSubNav = $('<div class="ca-gov-icon-caret-right rotate" aria-hidden="true"></div>');
                
                //if (mobileView()) {
                //    toggleSubNav.css("display", "block");
                //  } else {
                //    toggleSubNav.css("display", "none");
                //}
                //$(this).find('.has-sub').append(toggleSubNav);
                //$(this).find('.has-sub').append(carrot);


                //JS
                var carrot = document.createElement("span");
                addClass(carrot,"ca-gov-icon-triangle-down");
                addClass(carrot,"carrot");
                carrot.setAttribute("aria-hidden","true");

                var toggleSubNav = document.createElement("div");
                addClass(toggleSubNav,"ca-gov-icon-caret-right");
                addClass(toggleSubNav,"rotate");
                toggleSubNav.setAttribute("aria-hidden","true");

                if (mobileView()) {
                    toggleSubNav.style.display="block";
                } else {
                    toggleSubNav.style.display="none";
                }

                el.appendChild(toggleSubNav);
                el.appendChild(carrot);
            });
        //}); //JQ
    }

    // Addig class first-level-btn to first-level-link to make sure left and right keyboard keys work for all navigation links
  //$(".first-level-link").addClass("first-level-btn");

});

// Do Navigation Reset function on window resize uless it's mobile device.
window.addEventListener('resize', function() { //JS
//$(window).on('resize', function () { //JQ
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        return false;
    }
    else {
//JS
        document.querySelector(".toggle-menu").setAttribute("aria-expanded","false");

        //Collapse the nav when narrow
        var nav = document.querySelector("#navigation");
        addClass(nav,"collapse");
        removeClass(nav,"show");
        nav.setAttribute("aria-hidden", "true");

//JQ
        //$("#navigation").addClass("collapse").removeClass("show").attr("aria-hidden", "true");
        //$(".toggle-menu").attr('aria-expanded', 'false');

        NavReset();
    }

});

// Reset on escape
//JQ
//$(document).keyup(function (e) {
//    if (e.keyCode === 27) {
//        NavReset();
//    }
//});
//JS
document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
        NavReset();
    }
});

/* Mobile Controls fix */
//Doesn't appear to do anything
//$(document).ready(function () {
    //$("#navigation .mobile-controls").removeClass("nav-menu");
    //$("#navigation .mobile-control a").removeAttr("aria-hidden aria-expanded role id").removeClass("sub-nav with-few-items subnav-closed");
    //$("#navigation .mobile-control .sr-only").removeAttr("aria-hidden aria-expanded role id").removeClass("sub-nav with-few-items subnav-closed");
//});

/* -----------------------------------------
   SEARCH - /source/js/cagov/search.js
----------------------------------------- */

window.addEventListener('load', function () {
    var searchContainer = document.querySelector("#head-search");		// contains the search form
    var searchText = document.querySelector(".search-textfield"); // search textfield, unique
    var resultsContainer = document.querySelector('.search-results-container'); // /sample/featured-search.html -- maybe not used?
    var searchInput = document.querySelector("#head-search #Search .search-textfield");		// search textfield -- same as searchText ?
    var searchSubmit = document.querySelector("#head-search #Search .gsc-search-button");		// search button, unique
    var searchReset = document.querySelector("#head-search #Search .close-search");		// hide search form on subpages, unique
    var featuredsearch = searchContainer.classList.contains("featured-search");		// only exists on the home page (featured search) layout, and /sample/navigation-full-width-utility.html
    var searchactive = searchContainer.classList.contains("active");		// "active" is applied on subpages when search form is visible
    var searchlabel = document.querySelector("#SearchInput");		// label for textfield
    var globalHeader = document.querySelector('.global-header');		// header, contains nav, search form, etc, unique
    var searchbox = document.querySelector(".search-container:not(.featured-search)");		// only on subpages, unique, same as #head-search
    var headerHeight = globalHeader.innerHeight;		// header height
    var utility = document.querySelector(".utility-header");		// utility header, unique
    if (utility) {
        var utilityHeight = utility.innerHeight;
    }
    else {
        var utilityHeight = 0;
    }
    // utility header height
    var alertBanner = document.querySelectorAll(".alert-banner");		// page can have multiple
    var alertClose = document.querySelectorAll(".alert-banner .close");
    var alertbannerHeight = 0;
    var navigationHeight = 0;
    var fullnav = document.querySelector(".top-level-nav");		// navigation ul tag, unique
    var navsearch = document.querySelector(".navigation-search");		// contains navigation and search form, unique

    var body = document.querySelector("body");

    //		not used:
    //    var $specialIcon =
    //        // setup the tabs
    //        $('.search-tabs button').on("click", function (e) {
    //            $(this).siblings().removeClass('active');
    //            $(this).tab('show').addClass('active');
    //            e.preventDefault();
    //        });

    if (searchText) {
        // Unfreeze search width when blured.
        var unfreezeSearchWidth = function (event) {
            searchContainer.classList.remove('focus');
            document.querySelector(".search-container").classList.add('focus'); // search-container is unique
        };
        searchText.addEventListener('blur', unfreezeSearchWidth, false);
        searchText.addEventListener('focus', unfreezeSearchWidth, false);
        var chgHandler = function (event) {
            if (this.value) {
                addSearchResults();
            }
        }
        searchText.addEventListener('change', chgHandler, false);
        searchText.addEventListener('keyup', chgHandler, false);
        searchText.addEventListener('paste', chgHandler, false);
    }






    if (!featuredsearch) {
        // added aria expaned attr for accessibility
        var firstLevelBtn = document.querySelector("button.first-level-link");
        if (firstLevelBtn) {
            document.querySelector("button.first-level-link").setAttribute("aria-expanded", "false");
        }
    }

    //  search box top position
    if (!mobileView()) {
        // taking into account multiple alert banners
        alertBanner.forEach((oneBanner) => {
            alertbannerHeight += oneBanner.innerHeight;
        });
        //fullwidth navigation
        if (navsearch.classList.contains("full-width-nav")) {
            navigationHeight = 82;
        }
        // calulation search box top position
        var searchtop = headerHeight - utilityHeight - alertbannerHeight - navigationHeight;
        if (!mobileView() && searchbox) {
            searchbox.style.top = Math.max(searchtop, 82);
        }
    }

    // have the close button remove search results and the applied classes
    //resultsContainer.find('.close').on('click', removeSearchResults);
    var resContainClose = document.querySelector(".search-results-container .close");
    if (resContainClose) {
        resContainClose.addEventListener('click', removeSearchResults, false);
    }

    //searchContainer.find('.close').on('click', removeSearchResults);
    var hsClose = document.querySelector("#head-search .close");
    if (hsClose) {
        hsClose.addEventListener('click', removeSearchResults, false);
    }

    // Our special nav icon which we need to hook into for starting the search
    // $('#nav-item-search')

    // so instead we are binding to what I'm assuming will aslways be the search
    var searchButton = document.querySelector('#nav-item-search');
    if (searchButton) {
        document.querySelector('#nav-item-search').addEventListener("click", function (e) {
            e.preventDefault();
            searchText.focus();

            // mobile
            if (mobileView() && !searchContainer.classList.contains('active')) {
                window.scrollTo({
                    top: searchContainer.getBoundingClientRect().top,
                    left: 0,
                    behavior: 'smooth'
                });
            }

            if (!featuredsearch && document.querySelector('.search-container:not(.featured-search)')) {
                document.querySelector('.search-container:not(.featured-search)').classList.toggle('active');
            }

            var featuredsearch = searchContainer.classList.contains("featured-search");
            var searchactive = searchContainer.classList.contains("active");
            // hide Search form if it's not active
            if (searchactive) {
                // added aria expanded attr for accessibility
                this.querySelector("button").setAttribute("aria-expanded", "true");
                removeSearchAttr();
            }
            else {
                // added aria expaned attr for accessibility
                this.querySelector("button").setAttribute("aria-expanded", "false");
                setSearchAttr();
            }

            if (featuredsearch) {
                removeSearchAttr();
            }

            if (mobileView() && featuredsearch) {
                searchContainer.classList.toggle('active');
                ariaHidden();
            }
            // Reset the nav
            NavReset();

            // let the user know the input box is where they should search
            searchContainer.classList.add('play-animation');
            searchContainer.addEventListener('animationend', function () {
                this.classList.remove('play-animation');

            });

        }, false);
    }



    // SEE navitgation.js for mobile click handlers

    // Close search when close icon is clicked
    if (searchReset) {
        searchReset.addEventListener('click', function () {
            removeSearchResults();
        });
    }

    // Helpers
    function addSearchResults() {
        body.classList.add("active-search");
        //searchContainer.addClass('active');
        //resultsContainer.addClass('visible');
        // close the the menu when we are search
        //$('#navigation').addClass('mobile-closed');
        // hide the ask group as well
        // $('.ask-group').addClass('fade-out');

        // fire a scroll event to help update headers if need be
        // $(window).scroll();

        // $.event.trigger('cagov.searchresults.show');
    }

    function removeSearchResults() {
        body.classList.remove("active-search");
        searchText.value = "";
        searchContainer.classList.remove('active');
        searchContainer.setAttribute("aria-hidden", "true");
        if (resultsContainer) { resultsContainer.classList.remove('visible') };
        if (document.querySelector('.ask-group')) { document.querySelector('.ask-group').classList.remove('fade-out') };

        if (!featuredsearch) {
            // added aria expaned attr for accessibility
            document.querySelector("button.first-level-link").setAttribute("aria-expanded", "false");
            setSearchAttr();
        }
        // fire a scroll event to help update headers if need be
        window.dispatchEvent(new CustomEvent('scroll'));

        //        document.dispatchEvent('cagov.searchresults.hide'); // ???

        if (mobileView()) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            ariaHidden();
        }
    }

    function removeSearchAttr() {
        if (searchInput) {
            searchInput.removeAttribute('tabindex');
            searchInput.removeAttribute('aria-hidden');
        }
        if (searchSubmit) {
            searchSubmit.removeAttribute('tabindex');
            searchSubmit.removeAttribute('aria-hidden');
        }
        if (searchReset) {
            searchReset.removeAttribute('tabindex');
            searchReset.removeAttribute('aria-hidden');
        }
        if (searchlabel) searchlabel.removeAttribute('aria-hidden');

        if (searchContainer) searchContainer.removeAttribute('aria-hidden');
    }

    function setSearchAttr() {
        if (searchInput) {
            searchInput.setAttribute("tabindex", '-1');
            searchInput.setAttribute("aria-hidden", 'true');
        }
        if (searchSubmit) {
            searchSubmit.setAttribute("tabindex", '-1');
            searchSubmit.setAttribute("aria-hidden", 'true');
        }
        if (searchReset) {
            searchReset.setAttribute("tabindex", '-1');
            searchReset.setAttribute("aria-hidden", 'true');
        }
        if (searchlabel) searchlabel.setAttribute("aria-hidden", 'true');

        if (searchContainer) searchContainer.setAttribute("aria-hidden", "true");
    }


    // Mobile Search toggle
    document.querySelector('.toggle-search').addEventListener('click', function () {
        document.querySelector('.search-container').classList.toggle('active');
        var searchactive = searchContainer.classList.contains("active");
        if (searchactive) {
            removeSearchAttr();

            searchText.focus();
            window.scrollTo({
                top: searchContainer.getBoundingClientRect().top,
                left: 0,
                behavior: 'smooth'
            });
        }
        else {
            setSearchAttr();
        }
    });



    // Make Search form tabable if it's featured
    if (searchContainer.classList.contains('featured-search')) {
        removeSearchAttr();

    } else {
        setSearchAttr();
    }



    // on alert close event
    alertClose.forEach((oneClose) => {
        oneClose.addEventListener("click", function () {
            searchTop();
        });
    });


    ariaHidden();

});


// Calculation search box top property on the scroll for the fixed nav
window.addEventListener('scroll', function () {

    if (!mobileView()) {

        // setting timeout before calculating the search box top property otherwise it can take into account transitional values.
        setTimeout(function () {
            searchTop();
        }, 400);

    }

});



//  search box top position if browser window is resized
window.addEventListener('resize', function () {
    searchTop();
    ariaHidden();
});


function searchTop() {
    var globalHeader = document.querySelector('.global-header');
    var searchbox = document.querySelector(".search-container:not(.featured-search)");
    var headerHeight = globalHeader.innerHeight;
    var utility = document.querySelector(".utility-header");
    var utilityHeight = utility.innerHeight;
    var alertBanner = document.querySelectorAll(".alert-banner");

    var alertbannerHeight = 0;

    var navsearch = document.querySelector(".navigation-search");
    // taking into account multiple alert banners
    alertBanner.forEach((oneBanner) => {
        alertbannerHeight += oneBanner.innerHeight;
    });
    // Full width navigation
    if (navsearch.classList.contains("full-width-nav")) {
        navigationHeight = 82;
    }
    else { navigationHeight = 0; }
    // calulation search box top position
    var searchtop = headerHeight - utilityHeight - alertbannerHeight - navigationHeight;
    if (!mobileView() && searchbox) {
        searchbox.style.top = Math.max(searchtop, 55);
    }
}

function ariaHidden() {
    var searchContainer = document.querySelector("#head-search");
    var featuredsearch = searchContainer.classList.contains("featured-search");
    if (featuredsearch) {
        if (mobileView()) {
            searchContainer.setAttribute("aria-hidden", "true");
            document.querySelector("[name='q']").setAttribute("tabindex", "-1");
            document.querySelector(".gsc-search-button").setAttribute("tabindex", "-1");
        }

        else {
            searchContainer.removeAttribute('aria-hidden');
            document.querySelector("[name='q']").removeAttribute("tabindex");
            document.querySelector(".gsc-search-button").removeAttribute("tabindex");
        }
    }
    else {
        searchContainer.setAttribute("aria-hidden", "true");
    }

}





var mobileView = function () {
    var mobileElement = document.querySelector('.global-header .mobile-controls');

    if (mobileElement) {
        return getComputedStyle(mobileElement)['display'] !== 'none';

    } else {
        return false; // or whatever is supposed to be returned when there is no header

    }
};


// Displaying HTML Source code in HTML Page

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'/]/g, function (s) {
        return entityMap[s];
    });
}


window.onload = function init() {
    var codeblock = document.querySelectorAll("pre code");

    if (codeblock.length) {
        for (var i = 0, len = codeblock.length; i < len; i++) {
            var dom = codeblock[i];
            var html = dom.innerHTML;
            html = escapeHtml(html);
            dom.innerHTML = html;
        }
    }
};
/* -----------------------------------------
   TABS -- custom accessible tabs
----------------------------------------- */

(function () {
    // Get relevant elements and collections
    var tabbed = document.querySelector('.tabs');
    if (tabbed !== null) {
        var tablist = tabbed.querySelector('ul');
        var tabs = tablist.querySelectorAll('a');
        var panels = tabbed.querySelectorAll('[id^="section"]');


        // The tab switching function
        var switchTab = function (oldTab, newTab) {
            newTab.focus();
            // Make the active tab focusable by the user (Tab key)
            newTab.removeAttribute('tabindex');
            // Set the selected state
            newTab.setAttribute('aria-selected', 'true');
            oldTab.removeAttribute('aria-selected');
            oldTab.setAttribute('tabindex', '-1');
            // Get the indices of the new and old tabs to find the correct
            // tab panels to show and hide
            var index = Array.prototype.indexOf.call(tabs, newTab);
            var oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
            panels[oldIndex].hidden = true;
            panels[index].hidden = false;
        };

        // Add the tablist role to the first <ul> in the .tabbed container
        tablist.setAttribute('role', 'tablist');

        // Add semantics are remove user focusability for each tab
        Array.prototype.forEach.call(tabs, function (tab, i) {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('id', 'tab' + (i + 1));
            tab.setAttribute('tabindex', '-1');
            tab.parentNode.setAttribute('role', 'presentation');

            // Handle clicking of tabs for mouse users
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                var currentTab = tablist.querySelector('[aria-selected]');
                if (e.currentTarget !== currentTab) {
                    switchTab(currentTab, e.currentTarget);
                }
            });

            // Handle keydown events for keyboard users
            tab.addEventListener('keydown', function (e) {
                // Get the index of the current tab in the tabs node list
                var index = Array.prototype.indexOf.call(tabs, e.currentTarget);
                // Work out which key the user is pressing and
                // Calculate the new tab's index where appropriate
                var dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
                if (dir !== null) {
                    e.preventDefault();
                    // If the down key is pressed, move focus to the open panel,
                    // otherwise switch to the adjacent tab
                    dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
                }
            });
        });

        // Add tab panel semantics and hide them all
        Array.prototype.forEach.call(panels, function (panel, i) {
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('tabindex', '-1');
            var id = panel.getAttribute('id');
            panel.setAttribute('aria-labelledby', tabs[i].id);
            panel.hidden = true;
        });

        // Initially activate the first tab and reveal the first tab panel
        tabs[0].removeAttribute('tabindex');
        tabs[0].setAttribute('aria-selected', 'true');
        panels[0].hidden = false;
    }
})();

"use strict"

document.addEventListener("DOMContentLoaded", function () {
    // You can change this class to specify which elements are going to behave as counters.
    var elements = document.querySelectorAll(".scroll-counter")

    elements.forEach(function (item) {
        // Add new attributes to the elements with the '.scroll-counter' HTML class
        item.counterAlreadyFired = false
        item.counterSpeed = item.getAttribute("data-counter-time") / 45
        item.counterTarget = +item.innerText
        item.counterCount = 0
        item.counterStep = item.counterTarget / item.counterSpeed

        item.updateCounter = function () {
            item.counterCount = item.counterCount + item.counterStep
            item.innerText = Math.ceil(item.counterCount)

            if (item.counterCount < item.counterTarget) {
                setTimeout(item.updateCounter, item.counterSpeed)
            } else {
                item.innerText = item.counterTarget
            }
        }
    })

    // Function to determine if an element is visible in the web page
    var isElementVisible = function isElementVisible(el) {
        var scroll = window.scrollY || window.pageYOffset
        var boundsTop = el.getBoundingClientRect().top + scroll
        var viewport = {
            top: scroll,
            bottom: scroll + window.innerHeight,
        }
        var bounds = {
            top: boundsTop,
            bottom: boundsTop + el.clientHeight,
        }
        return (
            (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
            (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
        )
    }

    // Funciton that will get fired uppon scrolling
    var handleScroll = function handleScroll() {
        elements.forEach(function (item, id) {
            if (true === item.counterAlreadyFired) return;
            if (!isElementVisible(item)) return;
            item.updateCounter();
            item.counterAlreadyFired = true;
        });
    }

    // Fire the function on load and scroll
    window.addEventListener("load", function () {
        handleScroll();
    });
    window.addEventListener("scroll", function () {
        handleScroll();
    });
});
/* -----------------------------------------
   SETTINGS OPTIONS
   /source/js/cagov/settings.js
----------------------------------------- */


//
// HIGH CONTRAST MODE
// --------------------------------------------------
window.addEventListener('load', function () {
   var enableHighContrastButton = document.querySelector('.enableHighContrastMode');
   var disableHighContrastButton = document.querySelector('.disableHighContrastMode');
   var theHTML = document.querySelector('html');

   var isHighContrast = localStorage.getItem('high-contrast');
   var isDyslexic = localStorage.getItem('dyslexic');

   function onContrast() {
      enableHighContrastButton.classList.add('active');
      disableHighContrastButton.classList.remove('active');
      theHTML.classList.add('high-contrast');
      localStorage.setItem('high-contrast', 'true');
   }

   function OffContrast() {
      disableHighContrastButton.classList.add('active');
      enableHighContrastButton.classList.remove('active');
      theHTML.classList.remove('high-contrast');
      // disable
      localStorage.removeItem('high-contrast');
   }


   if (isHighContrast) {
      onContrast();
   }

   // Enable High Contrast
   enableHighContrastButton.addEventListener('click', onContrast, false);

   // Disable High Contrast
   disableHighContrastButton.addEventListener('click', OffContrast, false);



   //
   // INCREASE FONT SIZE
   // --------------------------------------------------  TODO: Evaluate the

   //accessibility duplication vs using inbuilt browser
   //controls

   var incFontSize = document.querySelector('.increaseTextSize');
   var decFontSize = document.querySelector('.decreaseTextSize');
   var resetFontSize = document.querySelector('.resetTextSize');
   var dyslexicFontBtn = document.querySelector('.dyslexicFont');

   // in rems's
   var MAXFONTSIZE = 1.5;
   var MINFONTSIZE = 1;
   var STEPVALUE = .1;

   // Read in previous settings and convert to number
   var fontSize = +localStorage.getItem('font-size');
   if (fontSize) {
      document.querySelector('html').style.fontSize = fontSize + 'rem';
   } else {
      fontSize = 1;
      document.querySelector('html').style.fontSize = fontSize + 'rem';
   }

   // init button styles for fonts
   updateFontBtns(fontSize);

   // utility functions
   function updateFont(f) {
      var updatedSize = Math.min(MAXFONTSIZE, Math.max(f, MINFONTSIZE));
      localStorage.setItem('font-size', updatedSize);
      document.querySelector('html').style.fontSize = updatedSize + "rem";
      updateFontBtns(updatedSize);
      return updatedSize;
   }

   function updateFontBtns(f) {
      if (f >= MAXFONTSIZE) {
         // incFontSize.addClass('disabled')
         // decFontSize.removeClass('disabled');
      } else if (f <= MINFONTSIZE) {
         // decFontSize.addClass('disabled')
         // incFontSize.removeClass('disabled');
      } else {
         // incFontSize.removeClass('disabled');
         // decFontSize.removeClass('disabled')
      }
   }

   incFontSize.addEventListener('click', function () {
      fontSize += STEPVALUE;
      fontSize = updateFont(fontSize);
   }, false);

   decFontSize.addEventListener('click', function () {
      fontSize -= STEPVALUE;
      fontSize = updateFont(fontSize);
   }, false);

   resetFontSize.addEventListener('click', function () {
      document.querySelector('html').removeAttribute("style");
      document.querySelector('body, h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .first-level-link, .slide-text, .slide-text .title, .stat-counter, .explore-invite .explore-title').removeAttribute("style");
      localStorage.removeItem('dyslexic');
      localStorage.removeItem('font-size');
   }, false);


   if (isDyslexic) {
      dyslexicFont();
   }

   dyslexicFontBtn.addEventListener('click', function () {
      dyslexicFont();
   }, false);

   function dyslexicFont() {
      document.querySelector('body, h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .first-level-link, .slide-text, .slide-text .title, .stat-counter, .explore-invite .explore-title').setAttribute("style", "font-family: 'OpenDyslexicAlta Regular', sans serif !important");
      localStorage.setItem('dyslexic', 'true');
   }
});

const returnTop = document.querySelector(".return-top");


// Add on-click event
returnTop.addEventListener("click", goToTopFunction);

function goToTopFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}




// If an user scrolls down the page for more than 400px activate back to top button
// othervise keep it invisible
var timer;

var lastScrollTop = 0;

window.addEventListener("scroll", function () {
	var returnTopButton = document.querySelector(".return-top");
	var st = window.pageYOffset || document.documentElement.scrollTop;
	if (st > lastScrollTop) {
		// downscroll code
		returnTopButton.classList.remove("is-visible");

	} else {
		// upscroll code
		if (document.body.scrollTop >= 400 || document.documentElement.scrollTop >= 400) {
			if (timer != "undefined") {
				clearTimeout(timer);
			}
			returnTopButton.classList.add("is-visible");

			timer = setTimeout(function () {

				returnTopButton.classList.remove("is-visible");

			}, 2000) //Back to top removes itself after 2 sec of inactivity
		}
		// bottom of the page 

		else {
			returnTopButton.classList.remove("is-visible");
		}
	}
	lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);


// Hittin' rock bottom
window.onscroll = function (ev) {
	var returnTopButton = document.querySelector(".return-top");
	if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
		returnTopButton.classList.add("is-visible");
	}
};


// Back to top link in the global footer
const backToTop = document.querySelector("a[href='#skip-to-content']");
backToTop.addEventListener("click", backToTopFunction);

function backToTopFunction(event) {
	event.preventDefault();
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}