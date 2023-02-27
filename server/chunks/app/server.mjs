import { version, reactive, computed, shallowReactive, useSSRContext, getCurrentInstance, shallowRef, isReadonly, defineComponent, toRefs, useCssVars, watchEffect, ref, createSlots, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, watch, withAsyncContext, mergeProps, resolveDynamicComponent, isRef, Fragment as Fragment$1, renderList, createApp, defineAsyncComponent, toRef, nextTick, shallowReadonly, h, Suspense, Transition, provide, onErrorCaptured, onServerPrefetch, inject as inject$1, renderSlot, createElementBlock, resolveComponent, withDirectives, createElementVNode, normalizeClass, normalizeStyle, vShow, withModifiers, withKeys, normalizeProps, guardReactiveProps, Teleport, toHandlers, render } from 'vue';
import { $fetch } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { useHead as useHead$1, createHead as createHead$1 } from '@unhead/vue';
import { renderDOMHead, debouncedRenderDOMHead } from '@unhead/dom';
import { renderSSRHead } from '@unhead/ssr';
import { createMemoryHistory, createRouter, RouterView } from 'vue-router';
import { createError as createError$1, sendRedirect } from 'h3';
import { hasProtocol, parseURL, joinURL, isEqual, encodeParam, withLeadingSlash, encodePath } from 'ufo';
import { defu } from 'defu';
import { ColorTranslator } from 'colortranslator';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderVNode, ssrRenderList, ssrRenderClass, ssrRenderSuspense } from 'vue/server-renderer';
import { Icon as Icon$1 } from '@iconify/vue/dist/offline';
import { loadIcon } from '@iconify/vue';
import { a as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      if (prop === "public") {
        return target.public;
      }
      return target[prop] ?? target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const components = {
  Icon: /* @__PURE__ */ defineAsyncComponent(() => Promise.resolve().then(function() {
    return Icon;
  }).then((c) => c.default || c)),
  IconCSS: /* @__PURE__ */ defineAsyncComponent(() => import(
    './_nuxt/IconCSS-7fb25531.mjs'
    /* webpackChunkName: "components/icon-css" */
  ).then((c) => c.default || c))
};
const components_plugin_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
function createHead(initHeadObject) {
  const unhead = createHead$1();
  const legacyHead = {
    unhead,
    install(app2) {
      if (version.startsWith("3")) {
        app2.config.globalProperties.$head = unhead;
        app2.provide("usehead", unhead);
      }
    },
    use(plugin) {
      unhead.use(plugin);
    },
    resolveTags() {
      return unhead.resolveTags();
    },
    headEntries() {
      return unhead.headEntries();
    },
    headTags() {
      return unhead.resolveTags();
    },
    push(input, options) {
      return unhead.push(input, options);
    },
    addEntry(input, options) {
      return unhead.push(input, options);
    },
    addHeadObjs(input, options) {
      return unhead.push(input, options);
    },
    addReactiveEntry(input, options) {
      const api = useHead$1(input, options);
      if (typeof api !== "undefined")
        return api.dispose;
      return () => {
      };
    },
    removeHeadObjs() {
    },
    updateDOM(document2, force) {
      if (force)
        renderDOMHead(unhead, { document: document2 });
      else
        debouncedRenderDOMHead(unhead, { delayFn: (fn) => setTimeout(() => fn(), 50), document: document2 });
    },
    internalHooks: unhead.hooks,
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    }
  };
  unhead.addHeadObjs = legacyHead.addHeadObjs;
  unhead.updateDOM = legacyHead.updateDOM;
  unhead.hooks.hook("dom:beforeRender", (ctx) => {
    for (const hook of legacyHead.hooks["before:dom"]) {
      if (hook() === false)
        ctx.shouldRender = false;
    }
  });
  if (initHeadObject)
    legacyHead.addHeadObjs(initHeadObject);
  return legacyHead;
}
version.startsWith("2.");
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [{ "rel": "stylesheet", "href": "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap" }, { "rel": "stylesheet", "href": "https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" }], "style": [], "script": [], "noscript": [], "htmlAttrs": { "lang": "en", "style": "min-height: 100vh; min-width: 100vw" }, "title": "MaguroNetwork" };
const appPageTransition = false;
const appKeepalive = false;
const vueuse_head_plugin_hJ5ut56rKX = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  head.push(appHead);
  nuxtApp.vueApp.use(head);
  nuxtApp._useHead = useHead$1;
  {
    nuxtApp.ssrContext.renderMeta = async () => {
      const meta = await renderSSRHead(head.unhead);
      return {
        ...meta,
        bodyScriptsPrepend: meta.bodyTagsOpen,
        // resolves naming difference with NuxtMeta and @vueuse/head
        bodyScripts: meta.bodyTags
      };
    };
  }
});
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function useRequestHeaders(include) {
  var _a;
  const headers = ((_a = useNuxtApp().ssrContext) == null ? void 0 : _a.event.node.req.headers) ?? {};
  if (!include) {
    return headers;
  }
  return Object.fromEntries(include.map((key) => key.toLowerCase()).filter((key) => headers[key]).map((key) => [key, headers[key]]));
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function setResponseStatus(code, message) {
  const event = useRequestEvent();
  if (event) {
    event.node.res.statusCode = code;
    if (message) {
      event.node.res.statusMessage = message;
    }
  }
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject$1("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      if (isProcessingMiddleware() && !isExternal) {
        setResponseStatus((options == null ? void 0 : options.redirectCode) || 302);
        return to;
      }
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const _routes = [
  {
    name: "Akela",
    path: "/Akela",
    children: [],
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-aaf3208e.mjs').then((m) => m.default || m)
  },
  {
    name: "EnergyDrinkWiki",
    path: "/EnergyDrinkWiki",
    children: [],
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-a93410e2.mjs').then((m) => m.default || m)
  },
  {
    name: "RandomMemes",
    path: "/RandomMemes",
    children: [],
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-53d89fa3.mjs').then((m) => m.default || m)
  },
  {
    name: "Vegalou",
    path: "/Vegalou",
    children: [],
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-5d5ca8bb.mjs').then((m) => m.default || m)
  },
  {
    name: "Weebsite",
    path: "/Weebsite",
    children: [],
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-0065a1d5.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    children: [],
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-5d3c187a.mjs').then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  useNuxtApp();
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
function useHead(input, options) {
  return useNuxtApp()._useHead(input, options);
}
function isObject$5(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject$5(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject$5(value) && isObject$5(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defuFn = createDefu((object, key, currentValue) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
const inlineConfig = {};
const __appConfig = defuFn(inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = reactive(__appConfig);
  }
  return nuxtApp._appConfig;
}
const MaguroNetwork = {
  icon: "",
  active: false,
  to: "index"
};
const Akela = {
  icon: "twemoji:dog-face",
  active: false,
  to: "Akela"
};
const EnergyDrinkWiki = {
  icon: "pepicons:can",
  active: false,
  to: "EnergyDrinkWiki"
};
const RandomMemes = {
  image: "/fuckboi.png",
  active: false,
  to: "RandomMemes"
};
const Vegalou = {
  icon: "twemoji:llama",
  active: false,
  to: "Vegalou"
};
const Razer4Ever = {
  icon: "simple-icons:razer",
  href: "https://oldr4e.littlebitgay.de"
};
const Rocketgame = {
  icon: "twemoji:rocket",
  href: "https://rg.littlebitgay.de"
};
const sidebarJson = {
  MaguroNetwork,
  Akela,
  EnergyDrinkWiki,
  RandomMemes,
  Vegalou,
  "Nölz' Weebsite": {
    images: true,
    active: false,
    to: "Weebsite"
  },
  Razer4Ever,
  Rocketgame
};
function useSidebarItems() {
  return useState("sidebarItems", () => sidebarJson);
}
function useSidebarEnable() {
  return useState("sidebarEnabled", () => false);
}
class tabArray extends Array {
  constructor(...items2) {
    super(...items2);
    __publicField(this, "current", 0);
    Object.setPrototypeOf(this, tabArray.prototype);
  }
  next() {
    if (this.current === this.length - 1) {
      this.current = -1;
      return this[++this.current];
    }
    return this[this.current++];
  }
}
const items = new tabArray(
  "/evangelion/asuka_smug.png",
  "/evangelion/cupoftea.PNG",
  "/evangelion/misato_smug.png",
  "/evangelion/misato_toast.PNG"
);
const weebsiteImages = reactive(items);
function useWeebsiteImages() {
  return weebsiteImages;
}
function useToggleWeebsiteImage() {
  const weebsiteImages2 = useWeebsiteImages();
  return () => {
    weebsiteImages2.next();
  };
}
function useToggleSidebar() {
  const sidebarEnabled = useSidebarEnable();
  const toggleWeebsiteImage = useToggleWeebsiteImage();
  return (to) => {
    sidebarEnabled.value = typeof to === "boolean" ? to : !sidebarEnabled.value;
    if (to === true) {
      toggleWeebsiteImage();
    }
  };
}
function useCurrentSidebarItem() {
  return useState("currentSidebarItem", () => "MaguroNetwork");
}
const set_45active_45site_45global = defineNuxtRouteMiddleware((to) => {
  const sidebarItems = useSidebarItems();
  const toggleSidebar = useToggleSidebar();
  const currentSidebarItem = useCurrentSidebarItem();
  for (const [itemname, item] of Object.entries(sidebarItems.value)) {
    if (item.to) {
      if (item.to === to.name) {
        item.active = true;
        currentSidebarItem.value = itemname;
      } else {
        item.active = false;
      }
    }
  }
  toggleSidebar(false);
});
const globalMiddleware = [
  validate,
  set_45active_45site_45global
];
const namedMiddleware = {};
const router_JCP0YfzX4Y = defineNuxtPlugin(async (nuxtApp) => {
  var _a, _b;
  let __temp, __restore;
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
  const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a2, _b2, _c, _d;
    if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    [__temp, __restore] = executeAsync(() => callWithNuxt(nuxtApp, showError, [error2])), await __temp, __restore();
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    var _a2;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
      to.meta.layout = initialLayout.value;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a2 = namedMiddleware[entry2]) == null ? void 0 : _a2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusCode: 404,
            statusMessage: `Page Not Found: ${initialURL}`
          });
          await callWithNuxt(nuxtApp, showError, [error2]);
          return false;
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      await callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL, { trailingSlash: true })) {
        const event = await callWithNuxt(nuxtApp, useRequestEvent);
        const options = { redirectCode: event.node.res.statusCode !== 200 ? event.node.res.statusCode || 302 : 302 };
        await callWithNuxt(nuxtApp, navigateTo, [currentURL, options]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        // #4920, #$4982
        force: true
      });
    } catch (error2) {
      await callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('image-meta').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return parseInt(input, 10);
    }
  }
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a, _b;
  if (typeof input !== "string" || input === "") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        input = joinURL(ctx.options.alias[base], input.substr(base.length));
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  var _a, _b;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
  const hwRatio = width && height ? height / width : 0;
  const variants = [];
  const sizes = {};
  if (typeof opts.sizes === "string") {
    for (const entry2 of opts.sizes.split(/[\s,]+/).filter((e) => e)) {
      const s = entry2.split(":");
      if (s.length !== 2) {
        continue;
      }
      sizes[s[0].trim()] = s[1].trim();
    }
  } else {
    Object.assign(sizes, opts.sizes);
  }
  for (const key in sizes) {
    const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || parseInt(key);
    let size = String(sizes[key]);
    const isFluid = size.endsWith("vw");
    if (!isFluid && /^\d+$/.test(size)) {
      size = size + "px";
    }
    if (!isFluid && !size.endsWith("px")) {
      continue;
    }
    let _cWidth = parseInt(size);
    if (!screenMaxWidth || !_cWidth) {
      continue;
    }
    if (isFluid) {
      _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
    }
    const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
    variants.push({
      width: _cWidth,
      size,
      screenMaxWidth,
      media: `(max-width: ${screenMaxWidth}px)`,
      src: ctx.$img(input, { ...opts.modifiers, width: _cWidth, height: _cHeight }, opts)
    });
  }
  variants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  const defaultVar = variants[variants.length - 1];
  if (defaultVar) {
    defaultVar.media = "";
  }
  return {
    sizes: variants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", "),
    srcset: variants.map((v) => `${v.src} ${v.width}w`).join(", "),
    src: defaultVar == null ? void 0 : defaultVar.src
  };
}
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: "&",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL: baseURL2 } = {}, _ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL2) {
    baseURL2 = joinURL("/", "/_ipx");
  }
  return {
    url: joinURL(baseURL2, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$Y1z1Dlqgoy = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getImage,
  supportsAlias,
  validateDomains
});
const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536
  },
  "presets": {},
  "provider": "ipx",
  "domains": [],
  "alias": {}
};
imageOptions.providers = {
  ["ipx"]: { provider: ipxRuntime$Y1z1Dlqgoy, defaults: {} }
};
const plugin_a5X8iEkX19 = defineNuxtPlugin(() => {
  const img = createImage(imageOptions);
  return {
    provide: {
      img
    }
  };
});
const REGEX_MOBILE1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|FBAN|FBAV|fennec|hiptop|iemobile|ip(hone|od)|Instagram|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
const REGEX_MOBILE2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
function isMobile(a) {
  return REGEX_MOBILE1.test(a) || REGEX_MOBILE2.test(a.slice(0, 4));
}
const REGEX_MOBILE_OR_TABLET1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|FBAN|FBAV|fennec|hiptop|iemobile|ip(hone|od)|Instagram|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
const REGEX_MOBILE_OR_TABLET2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
const REGEX_CRAWLER = /Googlebot\/|Googlebot-Mobile|Googlebot-Image|Googlebot-News|Googlebot-Video|AdsBot-Google([^-]|$)|AdsBot-Google-Mobile|Feedfetcher-Google|Mediapartners-Google|Mediapartners \(Googlebot\)|APIs-Google|bingbot|Slurp|[wW]get|LinkedInBot|Python-urllib|python-requests|aiohttp|httpx|libwww-perl|httpunit|nutch|Go-http-client|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|BIGLOTRON|Teoma|convera|seekbot|Gigabot|Gigablast|exabot|ia_archiver|GingerCrawler|webmon |HTTrack|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|findlink|msrbot|panscient|yacybot|AISearchBot|ips-agent|tagoobot|MJ12bot|woriobot|yanga|buzzbot|mlbot|YandexBot|YandexImages|YandexAccessibilityBot|YandexMobileBot|YandexMetrika|YandexTurbo|YandexImageResizer|YandexVideo|YandexAdNet|YandexBlogs|YandexCalendar|YandexDirect|YandexFavicons|YaDirectFetcher|YandexForDomain|YandexMarket|YandexMedia|YandexMobileScreenShotBot|YandexNews|YandexOntoDB|YandexPagechecker|YandexPartner|YandexRCA|YandexSearchShop|YandexSitelinks|YandexSpravBot|YandexTracker|YandexVertis|YandexVerticals|YandexWebmaster|YandexScreenshotBot|purebot|Linguee Bot|CyberPatrol|voilabot|Baiduspider|citeseerxbot|spbot|twengabot|postrank|TurnitinBot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|Ahrefs(Bot|SiteAudit)|fuelbot|CrunchBot|IndeedBot|mappydata|woobot|ZoominfoBot|PrivacyAwareBot|Multiviewbot|SWIMGBot|Grobbot|eright|Apercite|semanticbot|Aboundex|domaincrawler|wbsearchbot|summify|CCBot|edisterbot|seznambot|ec2linkfinder|gslfbot|aiHitBot|intelium_bot|facebookexternalhit|Yeti|RetrevoPageAnalyzer|lb-spider|Sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|OrangeBot\/|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|S[eE][mM]rushBot|yoozBot|lipperhey|Y!J|Domain Re-Animator Bot|AddThis|Screaming Frog SEO Spider|MetaURI|Scrapy|Livelap[bB]ot|OpenHoseBot|CapsuleChecker|collection@infegy.com|IstellaBot|DeuSu\/|betaBot|Cliqzbot\/|MojeekBot\/|netEstate NE Crawler|SafeSearch microdata crawler|Gluten Free Crawler\/|Sonic|Sysomos|Trove|deadlinkchecker|Slack-ImgProxy|Embedly|RankActiveLinkBot|iskanie|SafeDNSBot|SkypeUriPreview|Veoozbot|Slackbot|redditbot|datagnionbot|Google-Adwords-Instant|adbeat_bot|WhatsApp|contxbot|pinterest.com.bot|electricmonk|GarlikCrawler|BingPreview\/|vebidoobot|FemtosearchBot|Yahoo Link Preview|MetaJobBot|DomainStatsBot|mindUpBot|Daum\/|Jugendschutzprogramm-Crawler|Xenu Link Sleuth|Pcore-HTTP|moatbot|KosmioBot|pingdom|AppInsights|PhantomJS|Gowikibot|PiplBot|Discordbot|TelegramBot|Jetslide|newsharecounts|James BOT|Bark[rR]owler|TinEye|SocialRankIOBot|trendictionbot|Ocarinabot|epicbot|Primalbot|DuckDuckGo-Favicons-Bot|GnowitNewsbot|Leikibot|LinkArchiver|YaK\/|PaperLiBot|Digg Deeper|dcrawl|Snacktory|AndersPinkBot|Fyrebot|EveryoneSocialBot|Mediatoolkitbot|Luminator-robots|ExtLinksBot|SurveyBot|NING\/|okhttp|Nuzzel|omgili|PocketParser|YisouSpider|um-LN|ToutiaoSpider|MuckRack|Jamie's Spider|AHC\/|NetcraftSurveyAgent|Laserlikebot|^Apache-HttpClient|AppEngine-Google|Jetty|Upflow|Thinklab|Traackr.com|Twurly|Mastodon|http_get|DnyzBot|botify|007ac9 Crawler|BehloolBot|BrandVerity|check_http|BDCbot|ZumBot|EZID|ICC-Crawler|ArchiveBot|^LCC |filterdb.iss.net\/crawler|BLP_bbot|BomboraBot|Buck\/|Companybook-Crawler|Genieo|magpie-crawler|MeltwaterNews|Moreover|newspaper\/|ScoutJet|(^| )sentry\/|StorygizeBot|UptimeRobot|OutclicksBot|seoscanners|Hatena|Google Web Preview|MauiBot|AlphaBot|SBL-BOT|IAS crawler|adscanner|Netvibes|acapbot|Baidu-YunGuanCe|bitlybot|blogmuraBot|Bot.AraTurka.com|bot-pge.chlooe.com|BoxcarBot|BTWebClient|ContextAd Bot|Digincore bot|Disqus|Feedly|Fetch\/|Fever|Flamingo_SearchEngine|FlipboardProxy|g2reader-bot|G2 Web Services|imrbot|K7MLWCBot|Kemvibot|Landau-Media-Spider|linkapediabot|vkShare|Siteimprove.com|BLEXBot\/|DareBoost|ZuperlistBot\/|Miniflux\/|Feedspot|Diffbot\/|SEOkicks|tracemyfile|Nimbostratus-Bot|zgrab|PR-CY.RU|AdsTxtCrawler|Datafeedwatch|Zabbix|TangibleeBot|google-xrawler|axios|Amazon CloudFront|Pulsepoint|CloudFlare-AlwaysOnline|Google-Structured-Data-Testing-Tool|WordupInfoSearch|WebDataStats|HttpUrlConnection|Seekport Crawler|ZoomBot|VelenPublicWebCrawler|MoodleBot|jpg-newsbot|outbrain|W3C_Validator|Validator\.nu|W3C-checklink|W3C-mobileOK|W3C_I18n-Checker|FeedValidator|W3C_CSS_Validator|W3C_Unicorn|Google-PhysicalWeb|Blackboard|ICBot\/|BazQux|Twingly|Rivva|Experibot|awesomecrawler|Dataprovider.com|GroupHigh\/|theoldreader.com|AnyEvent|Uptimebot\.org|Nmap Scripting Engine|2ip.ru|Clickagy|Caliperbot|MBCrawler|online-webceo-bot|B2B Bot|AddSearchBot|Google Favicon|HubSpot|Chrome-Lighthouse|HeadlessChrome|CheckMarkNetwork\/|www\.uptime\.com|Streamline3Bot\/|serpstatbot\/|MixnodeCache\/|^curl|SimpleScraper|RSSingBot|Jooblebot|fedoraplanet|Friendica|NextCloud|Tiny Tiny RSS|RegionStuttgartBot|Bytespider|Datanyze|Google-Site-Verification|TrendsmapResolver|tweetedtimes|NTENTbot|Gwene|SimplePie|SearchAtlas|Superfeedr|feedbot|UT-Dorkbot|Amazonbot|SerendeputyBot|Eyeotabot|officestorebot|Neticle Crawler|SurdotlyBot|LinkisBot|AwarioSmartBot|AwarioRssBot|RyteBot|FreeWebMonitoring SiteChecker|AspiegelBot|NAVER Blog Rssbot|zenback bot|SentiBot|Domains Project\/|Pandalytics|VKRobot|bidswitchbot|tigerbot|NIXStatsbot|Atom Feed Robot|Curebot|PagePeeker\/|Vigil\/|rssbot\/|startmebot\/|JobboerseBot|seewithkids|NINJA bot|Cutbot|BublupBot|BrandONbot|RidderBot|Taboolabot|Dubbotbot|FindITAnswersbot|infoobot|Refindbot|BlogTraffic\/\d\.\d+ Feed-Fetcher|SeobilityBot|Cincraw|Dragonbot|VoluumDSP-content-bot|FreshRSS|BitBot|^PHP-Curl-Class|Google-Certificates-Bridge/;
function isMobileOrTablet(a) {
  return REGEX_MOBILE_OR_TABLET1.test(a) || REGEX_MOBILE_OR_TABLET2.test(a.slice(0, 4));
}
function isIos(a) {
  return /iPad|iPhone|iPod/.test(a);
}
function isAndroid(a) {
  return /android/i.test(a);
}
function isWindows(a) {
  return /Windows/.test(a);
}
function isMacOS(a) {
  return /Mac OS X/.test(a);
}
const browsers = [
  { name: "Samsung", test: /SamsungBrowser/i },
  { name: "Edge", test: /edg([ea]|ios|)\//i },
  { name: "Firefox", test: /firefox|iceweasel|fxios/i },
  { name: "Chrome", test: /chrome|crios|crmo/i },
  { name: "Safari", test: /safari|applewebkit/i }
];
function getBrowserName(a) {
  for (const b of browsers) {
    if (b.test.test(a)) {
      return b.name;
    }
  }
  return "";
}
function generateFlags(headers, userAgent) {
  let mobile = false;
  let mobileOrTablet = false;
  let ios = false;
  let android = false;
  if (userAgent === "Amazon CloudFront") {
    if (headers["cloudfront-is-mobile-viewer"] === "true") {
      mobile = true;
      mobileOrTablet = true;
    }
    if (headers["cloudfront-is-tablet-viewer"] === "true") {
      mobile = false;
      mobileOrTablet = true;
    }
    if (headers["cloudfront-is-desktop-viewer"] === "true") {
      mobile = false;
      mobileOrTablet = false;
    }
    if (headers["cloudfront-is-ios-viewer"] === "true") {
      ios = true;
    }
    if (headers["cloudfront-is-android-viewer"] === "true") {
      android = true;
    }
  } else if (headers && headers["cf-device-type"]) {
    switch (headers["cf-device-type"]) {
      case "mobile":
        mobile = true;
        mobileOrTablet = true;
        break;
      case "tablet":
        mobile = false;
        mobileOrTablet = true;
        break;
      case "desktop":
        mobile = false;
        mobileOrTablet = false;
        break;
    }
  } else {
    mobile = isMobile(userAgent);
    mobileOrTablet = isMobileOrTablet(userAgent);
    ios = isIos(userAgent);
    android = isAndroid(userAgent);
  }
  const windows = isWindows(userAgent);
  const macOS = isMacOS(userAgent);
  const browserName = getBrowserName(userAgent);
  const isSafari = browserName === "Safari";
  const isFirefox = browserName === "Firefox";
  const isEdge = browserName === "Edge";
  const isChrome = browserName === "Chrome";
  const isSamsung = browserName === "Samsung";
  const isCrawler = REGEX_CRAWLER.test(userAgent);
  return {
    userAgent,
    isMobile: mobile,
    isMobileOrTablet: mobileOrTablet,
    isTablet: !mobile && mobileOrTablet,
    isDesktop: !mobileOrTablet,
    isIos: ios,
    isAndroid: android,
    isWindows: windows,
    isMacOS: macOS,
    isApple: macOS || ios,
    isDesktopOrTablet: !mobile,
    isSafari,
    isFirefox,
    isEdge,
    isChrome,
    isSamsung,
    isCrawler
  };
}
const plugin_SjrWhxHRlu = defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const DEFAULT_USER_AGENT = config.public.device.defaultUserAgent;
  const REFRESH_ON_RESIZE = config.public.device.refreshOnResize;
  if (nuxtApp.ssrContext) {
    const headers = useRequestHeaders();
    const userAgent2 = headers["user-agent"] || DEFAULT_USER_AGENT;
    const flags2 = reactive(generateFlags(headers, userAgent2));
    return {
      provide: {
        device: flags2
      }
    };
  }
  const userAgent = navigator.userAgent || DEFAULT_USER_AGENT;
  const flags = reactive(generateFlags({}, userAgent));
  if (REFRESH_ON_RESIZE) {
    window.addEventListener("resize", () => {
      setTimeout(() => {
        const newFlags = generateFlags({}, navigator.userAgent || DEFAULT_USER_AGENT);
        Object.entries(newFlags).forEach((entry2) => {
          const [key, value] = entry2;
          flags[key] = value;
        });
      }, 50);
    });
  }
  return {
    provide: {
      device: flags
    }
  };
});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$1;
function eq$4(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$4;
var eq$3 = eq_1;
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$3(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$4;
var assocIndexOf$3 = _assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete$1(key) {
  var data = this.__data__, index2 = assocIndexOf$3(data, key);
  if (index2 < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index2 == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index2, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete$1;
var assocIndexOf$2 = _assocIndexOf;
function listCacheGet$1(key) {
  var data = this.__data__, index2 = assocIndexOf$2(data, key);
  return index2 < 0 ? void 0 : data[index2][1];
}
var _listCacheGet = listCacheGet$1;
var assocIndexOf$1 = _assocIndexOf;
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$1;
var assocIndexOf = _assocIndexOf;
function listCacheSet$1(key, value) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index2][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$1;
var listCacheClear = _listCacheClear, listCacheDelete = _listCacheDelete, listCacheGet = _listCacheGet, listCacheHas = _listCacheHas, listCacheSet = _listCacheSet;
function ListCache$4(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry2 = entries[index2];
    this.set(entry2[0], entry2[1]);
  }
}
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype["delete"] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;
var _ListCache = ListCache$4;
var ListCache$3 = _ListCache;
function stackClear$1() {
  this.__data__ = new ListCache$3();
  this.size = 0;
}
var _stackClear = stackClear$1;
function stackDelete$1(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete$1;
function stackGet$1(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet$1;
function stackHas$1(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas$1;
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$9 = freeGlobal || freeSelf || Function("return this")();
var _root = root$9;
var root$8 = _root;
var Symbol$6 = root$8.Symbol;
var _Symbol = Symbol$6;
var Symbol$5 = _Symbol;
var objectProto$d = Object.prototype;
var hasOwnProperty$a = objectProto$d.hasOwnProperty;
var nativeObjectToString$1 = objectProto$d.toString;
var symToStringTag$1 = Symbol$5 ? Symbol$5.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag$1;
var objectProto$c = Object.prototype;
var nativeObjectToString = objectProto$c.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$1;
var Symbol$4 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$4 ? Symbol$4.toStringTag : void 0;
function baseGetTag$9(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var _baseGetTag = baseGetTag$9;
function isObject$c(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$c;
var baseGetTag$8 = _baseGetTag, isObject$b = isObject_1;
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$3(value) {
  if (!isObject$b(value)) {
    return false;
  }
  var tag = baseGetTag$8(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction$3;
var root$7 = _root;
var coreJsData$1 = root$7["__core-js_shared__"];
var _coreJsData = coreJsData$1;
var coreJsData = _coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked$1(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked$1;
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var _toSource = toSource$2;
var isFunction$2 = isFunction_1, isMasked = _isMasked, isObject$a = isObject_1, toSource$1 = _toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$b = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$9).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative$1(value) {
  if (!isObject$a(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$2(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}
var _baseIsNative = baseIsNative$1;
function getValue$1(object, key) {
  return object == null ? void 0 : object[key];
}
var _getValue = getValue$1;
var baseIsNative = _baseIsNative, getValue = _getValue;
function getNative$7(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var _getNative = getNative$7;
var getNative$6 = _getNative, root$6 = _root;
var Map$3 = getNative$6(root$6, "Map");
var _Map = Map$3;
var getNative$5 = _getNative;
var nativeCreate$4 = getNative$5(Object, "create");
var _nativeCreate = nativeCreate$4;
var nativeCreate$3 = _nativeCreate;
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$1;
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete$1;
var nativeCreate$2 = _nativeCreate;
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$a = Object.prototype;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$8.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet$1;
var nativeCreate$1 = _nativeCreate;
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$7.call(data, key);
}
var _hashHas = hashHas$1;
var nativeCreate = _nativeCreate;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
var _hashSet = hashSet$1;
var hashClear = _hashClear, hashDelete = _hashDelete, hashGet = _hashGet, hashHas = _hashHas, hashSet = _hashSet;
function Hash$1(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry2 = entries[index2];
    this.set(entry2[0], entry2[1]);
  }
}
Hash$1.prototype.clear = hashClear;
Hash$1.prototype["delete"] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;
var _Hash = Hash$1;
var Hash = _Hash, ListCache$2 = _ListCache, Map$2 = _Map;
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache$2)(),
    "string": new Hash()
  };
}
var _mapCacheClear = mapCacheClear$1;
function isKeyable$1(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable$1;
var isKeyable = _isKeyable;
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData$4;
var getMapData$3 = _getMapData;
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete$1;
var getMapData$2 = _getMapData;
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$1;
var getMapData$1 = _getMapData;
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$1;
var getMapData = _getMapData;
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$1;
var mapCacheClear = _mapCacheClear, mapCacheDelete = _mapCacheDelete, mapCacheGet = _mapCacheGet, mapCacheHas = _mapCacheHas, mapCacheSet = _mapCacheSet;
function MapCache$2(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry2 = entries[index2];
    this.set(entry2[0], entry2[1]);
  }
}
MapCache$2.prototype.clear = mapCacheClear;
MapCache$2.prototype["delete"] = mapCacheDelete;
MapCache$2.prototype.get = mapCacheGet;
MapCache$2.prototype.has = mapCacheHas;
MapCache$2.prototype.set = mapCacheSet;
var _MapCache = MapCache$2;
var ListCache$1 = _ListCache, Map$1 = _Map, MapCache$1 = _MapCache;
var LARGE_ARRAY_SIZE = 200;
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$1(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet$1;
var ListCache = _ListCache, stackClear = _stackClear, stackDelete = _stackDelete, stackGet = _stackGet, stackHas = _stackHas, stackSet = _stackSet;
function Stack$2(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack$2.prototype.clear = stackClear;
Stack$2.prototype["delete"] = stackDelete;
Stack$2.prototype.get = stackGet;
Stack$2.prototype.has = stackHas;
Stack$2.prototype.set = stackSet;
var _Stack = Stack$2;
function arrayEach$1(array, iteratee) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    if (iteratee(array[index2], index2, array) === false) {
      break;
    }
  }
  return array;
}
var _arrayEach = arrayEach$1;
var getNative$4 = _getNative;
var defineProperty$2 = function() {
  try {
    var func = getNative$4(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var _defineProperty = defineProperty$2;
var defineProperty$1 = _defineProperty;
function baseAssignValue$3(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue$3;
var baseAssignValue$2 = _baseAssignValue, eq$2 = eq_1;
var objectProto$8 = Object.prototype;
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
function assignValue$3(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$6.call(object, key) && eq$2(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue$2(object, key, value);
  }
}
var _assignValue = assignValue$3;
var assignValue$2 = _assignValue, baseAssignValue$1 = _baseAssignValue;
function copyObject$6(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index2 = -1, length = props.length;
  while (++index2 < length) {
    var key = props[index2];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue$1(object, key, newValue);
    } else {
      assignValue$2(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject$6;
function baseTimes$1(n, iteratee) {
  var index2 = -1, result = Array(n);
  while (++index2 < n) {
    result[index2] = iteratee(index2);
  }
  return result;
}
var _baseTimes = baseTimes$1;
function isObjectLike$b(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$b;
var baseGetTag$7 = _baseGetTag, isObjectLike$a = isObjectLike_1;
var argsTag$2 = "[object Arguments]";
function baseIsArguments$1(value) {
  return isObjectLike$a(value) && baseGetTag$7(value) == argsTag$2;
}
var _baseIsArguments = baseIsArguments$1;
var baseIsArguments = _baseIsArguments, isObjectLike$9 = isObjectLike_1;
var objectProto$7 = Object.prototype;
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;
var isArguments$4 = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike$9(value) && hasOwnProperty$5.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArguments_1 = isArguments$4;
var isArray$a = Array.isArray;
var isArray_1 = isArray$a;
var isBuffer$3 = { exports: {} };
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
(function(module, exports) {
  var root2 = _root, stubFalse2 = stubFalse_1;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root2.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer2 = nativeIsBuffer || stubFalse2;
  module.exports = isBuffer2;
})(isBuffer$3, isBuffer$3.exports);
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex$4(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex$4;
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength$3(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var isLength_1 = isLength$3;
var baseGetTag$6 = _baseGetTag, isLength$2 = isLength_1, isObjectLike$8 = isObjectLike_1;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$3 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray$1(value) {
  return isObjectLike$8(value) && isLength$2(value.length) && !!typedArrayTags[baseGetTag$6(value)];
}
var _baseIsTypedArray = baseIsTypedArray$1;
function baseUnary$4(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary$4;
var _nodeUtil = { exports: {} };
(function(module, exports) {
  var freeGlobal2 = _freeGlobal;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal2.process;
  var nodeUtil2 = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  module.exports = nodeUtil2;
})(_nodeUtil, _nodeUtil.exports);
var baseIsTypedArray = _baseIsTypedArray, baseUnary$3 = _baseUnary, nodeUtil$3 = _nodeUtil.exports;
var nodeIsTypedArray = nodeUtil$3 && nodeUtil$3.isTypedArray;
var isTypedArray$2 = nodeIsTypedArray ? baseUnary$3(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray_1 = isTypedArray$2;
var baseTimes = _baseTimes, isArguments$3 = isArguments_1, isArray$9 = isArray_1, isBuffer$2 = isBuffer$3.exports, isIndex$3 = _isIndex, isTypedArray$1 = isTypedArray_1;
var objectProto$6 = Object.prototype;
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
function arrayLikeKeys$2(value, inherited) {
  var isArr = isArray$9(value), isArg = !isArr && isArguments$3(value), isBuff = !isArr && !isArg && isBuffer$2(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$4.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex$3(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys$2;
var objectProto$5 = Object.prototype;
function isPrototype$3(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$5;
  return value === proto;
}
var _isPrototype = isPrototype$3;
function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$2;
var overArg$1 = _overArg;
var nativeKeys$1 = overArg$1(Object.keys, Object);
var _nativeKeys = nativeKeys$1;
var isPrototype$2 = _isPrototype, nativeKeys = _nativeKeys;
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function baseKeys$1(object) {
  if (!isPrototype$2(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$3.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys$1;
var isFunction$1 = isFunction_1, isLength$1 = isLength_1;
function isArrayLike$4(value) {
  return value != null && isLength$1(value.length) && !isFunction$1(value);
}
var isArrayLike_1 = isArrayLike$4;
var arrayLikeKeys$1 = _arrayLikeKeys, baseKeys = _baseKeys, isArrayLike$3 = isArrayLike_1;
function keys$3(object) {
  return isArrayLike$3(object) ? arrayLikeKeys$1(object) : baseKeys(object);
}
var keys_1 = keys$3;
var copyObject$5 = _copyObject, keys$2 = keys_1;
function baseAssign$1(object, source) {
  return object && copyObject$5(source, keys$2(source), object);
}
var _baseAssign = baseAssign$1;
function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn$1;
var isObject$9 = isObject_1, isPrototype$1 = _isPrototype, nativeKeysIn = _nativeKeysIn;
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function baseKeysIn$1(object) {
  if (!isObject$9(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype$1(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$2.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn$1;
var arrayLikeKeys = _arrayLikeKeys, baseKeysIn = _baseKeysIn, isArrayLike$2 = isArrayLike_1;
function keysIn$5(object) {
  return isArrayLike$2(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var keysIn_1 = keysIn$5;
var copyObject$4 = _copyObject, keysIn$4 = keysIn_1;
function baseAssignIn$1(object, source) {
  return object && copyObject$4(source, keysIn$4(source), object);
}
var _baseAssignIn = baseAssignIn$1;
var _cloneBuffer = { exports: {} };
(function(module, exports) {
  var root2 = _root;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root2.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
  function cloneBuffer2(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  module.exports = cloneBuffer2;
})(_cloneBuffer, _cloneBuffer.exports);
function copyArray$2(source, array) {
  var index2 = -1, length = source.length;
  array || (array = Array(length));
  while (++index2 < length) {
    array[index2] = source[index2];
  }
  return array;
}
var _copyArray = copyArray$2;
function arrayFilter$1(array, predicate) {
  var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index2 < length) {
    var value = array[index2];
    if (predicate(value, index2, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var _arrayFilter = arrayFilter$1;
function stubArray$2() {
  return [];
}
var stubArray_1 = stubArray$2;
var arrayFilter = _arrayFilter, stubArray$1 = stubArray_1;
var objectProto$2 = Object.prototype;
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var _getSymbols = getSymbols$3;
var copyObject$3 = _copyObject, getSymbols$2 = _getSymbols;
function copySymbols$1(source, object) {
  return copyObject$3(source, getSymbols$2(source), object);
}
var _copySymbols = copySymbols$1;
function arrayPush$3(array, values) {
  var index2 = -1, length = values.length, offset = array.length;
  while (++index2 < length) {
    array[offset + index2] = values[index2];
  }
  return array;
}
var _arrayPush = arrayPush$3;
var overArg = _overArg;
var getPrototype$3 = overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype$3;
var arrayPush$2 = _arrayPush, getPrototype$2 = _getPrototype, getSymbols$1 = _getSymbols, stubArray = stubArray_1;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush$2(result, getSymbols$1(object));
    object = getPrototype$2(object);
  }
  return result;
};
var _getSymbolsIn = getSymbolsIn$2;
var copyObject$2 = _copyObject, getSymbolsIn$1 = _getSymbolsIn;
function copySymbolsIn$1(source, object) {
  return copyObject$2(source, getSymbolsIn$1(source), object);
}
var _copySymbolsIn = copySymbolsIn$1;
var arrayPush$1 = _arrayPush, isArray$8 = isArray_1;
function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$8(object) ? result : arrayPush$1(result, symbolsFunc(object));
}
var _baseGetAllKeys = baseGetAllKeys$2;
var baseGetAllKeys$1 = _baseGetAllKeys, getSymbols = _getSymbols, keys$1 = keys_1;
function getAllKeys$1(object) {
  return baseGetAllKeys$1(object, keys$1, getSymbols);
}
var _getAllKeys = getAllKeys$1;
var baseGetAllKeys = _baseGetAllKeys, getSymbolsIn = _getSymbolsIn, keysIn$3 = keysIn_1;
function getAllKeysIn$2(object) {
  return baseGetAllKeys(object, keysIn$3, getSymbolsIn);
}
var _getAllKeysIn = getAllKeysIn$2;
var getNative$3 = _getNative, root$5 = _root;
var DataView$1 = getNative$3(root$5, "DataView");
var _DataView = DataView$1;
var getNative$2 = _getNative, root$4 = _root;
var Promise$2 = getNative$2(root$4, "Promise");
var _Promise = Promise$2;
var getNative$1 = _getNative, root$3 = _root;
var Set$1 = getNative$1(root$3, "Set");
var _Set = Set$1;
var getNative = _getNative, root$2 = _root;
var WeakMap$1 = getNative(root$2, "WeakMap");
var _WeakMap = WeakMap$1;
var DataView = _DataView, Map = _Map, Promise$1 = _Promise, Set$2 = _Set, WeakMap = _WeakMap, baseGetTag$5 = _baseGetTag, toSource = _toSource;
var mapTag$3 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap);
var getTag$3 = baseGetTag$5;
if (DataView && getTag$3(new DataView(new ArrayBuffer(1))) != dataViewTag$2 || Map && getTag$3(new Map()) != mapTag$3 || Promise$1 && getTag$3(Promise$1.resolve()) != promiseTag || Set$2 && getTag$3(new Set$2()) != setTag$3 || WeakMap && getTag$3(new WeakMap()) != weakMapTag$1) {
  getTag$3 = function(value) {
    var result = baseGetTag$5(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var _getTag = getTag$3;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function initCloneArray$1(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty$1.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var _initCloneArray = initCloneArray$1;
var root$1 = _root;
var Uint8Array$1 = root$1.Uint8Array;
var _Uint8Array = Uint8Array$1;
var Uint8Array2 = _Uint8Array;
function cloneArrayBuffer$3(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
  return result;
}
var _cloneArrayBuffer = cloneArrayBuffer$3;
var cloneArrayBuffer$2 = _cloneArrayBuffer;
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var _cloneDataView = cloneDataView$1;
var reFlags = /\w*$/;
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var _cloneRegExp = cloneRegExp$1;
var Symbol$3 = _Symbol;
var symbolProto$1 = Symbol$3 ? Symbol$3.prototype : void 0, symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function cloneSymbol$1(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var _cloneSymbol = cloneSymbol$1;
var cloneArrayBuffer$1 = _cloneArrayBuffer;
function cloneTypedArray$2(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray$2;
var cloneArrayBuffer = _cloneArrayBuffer, cloneDataView = _cloneDataView, cloneRegExp = _cloneRegExp, cloneSymbol = _cloneSymbol, cloneTypedArray$1 = _cloneTypedArray;
var boolTag$1 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$2 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag$1(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$2:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray$1(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$2:
    case stringTag$2:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$2:
      return cloneSymbol(object);
  }
}
var _initCloneByTag = initCloneByTag$1;
var isObject$8 = isObject_1;
var objectCreate = Object.create;
var baseCreate$1 = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$8(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var _baseCreate = baseCreate$1;
var baseCreate = _baseCreate, getPrototype$1 = _getPrototype, isPrototype = _isPrototype;
function initCloneObject$2(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype$1(object)) : {};
}
var _initCloneObject = initCloneObject$2;
var getTag$2 = _getTag, isObjectLike$7 = isObjectLike_1;
var mapTag$1 = "[object Map]";
function baseIsMap$1(value) {
  return isObjectLike$7(value) && getTag$2(value) == mapTag$1;
}
var _baseIsMap = baseIsMap$1;
var baseIsMap = _baseIsMap, baseUnary$2 = _baseUnary, nodeUtil$2 = _nodeUtil.exports;
var nodeIsMap = nodeUtil$2 && nodeUtil$2.isMap;
var isMap$1 = nodeIsMap ? baseUnary$2(nodeIsMap) : baseIsMap;
var isMap_1 = isMap$1;
var getTag$1 = _getTag, isObjectLike$6 = isObjectLike_1;
var setTag$1 = "[object Set]";
function baseIsSet$1(value) {
  return isObjectLike$6(value) && getTag$1(value) == setTag$1;
}
var _baseIsSet = baseIsSet$1;
var baseIsSet = _baseIsSet, baseUnary$1 = _baseUnary, nodeUtil$1 = _nodeUtil.exports;
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet$1 = nodeIsSet ? baseUnary$1(nodeIsSet) : baseIsSet;
var isSet_1 = isSet$1;
var Stack$1 = _Stack, arrayEach = _arrayEach, assignValue$1 = _assignValue, baseAssign = _baseAssign, baseAssignIn = _baseAssignIn, cloneBuffer$1 = _cloneBuffer.exports, copyArray$1 = _copyArray, copySymbols = _copySymbols, copySymbolsIn = _copySymbolsIn, getAllKeys = _getAllKeys, getAllKeysIn$1 = _getAllKeysIn, getTag = _getTag, initCloneArray = _initCloneArray, initCloneByTag = _initCloneByTag, initCloneObject$1 = _initCloneObject, isArray$7 = isArray_1, isBuffer$1 = isBuffer$3.exports, isMap = isMap_1, isObject$7 = isObject_1, isSet = isSet_1, keys = keys_1, keysIn$2 = keysIn_1;
var CLONE_DEEP_FLAG$2 = 1, CLONE_FLAT_FLAG$1 = 2, CLONE_SYMBOLS_FLAG$2 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag$1 = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag$1 = "[object Number]", objectTag$1 = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone$2(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$2, isFlat = bitmask & CLONE_FLAT_FLAG$1, isFull = bitmask & CLONE_SYMBOLS_FLAG$2;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject$7(value)) {
    return value;
  }
  var isArr = isArray$7(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray$1(value, result);
    }
  } else {
    var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer$1(value, isDeep);
    }
    if (tag == objectTag$1 || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject$1(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack$1());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone$2(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone$2(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn$1 : getAllKeys : isFlat ? keysIn$2 : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue$1(result, key2, baseClone$2(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var _baseClone = baseClone$2;
var baseClone$1 = _baseClone;
var CLONE_DEEP_FLAG$1 = 1, CLONE_SYMBOLS_FLAG$1 = 4;
function cloneDeep(value) {
  return baseClone$1(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
}
var cloneDeep_1 = cloneDeep;
function arrayReduce$1(array, iteratee, accumulator, initAccum) {
  var index2 = -1, length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[++index2];
  }
  while (++index2 < length) {
    accumulator = iteratee(accumulator, array[index2], index2, array);
  }
  return accumulator;
}
var _arrayReduce = arrayReduce$1;
function basePropertyOf$1(object) {
  return function(key) {
    return object == null ? void 0 : object[key];
  };
}
var _basePropertyOf = basePropertyOf$1;
var basePropertyOf = _basePropertyOf;
var deburredLetters = {
  "À": "A",
  "Á": "A",
  "Â": "A",
  "Ã": "A",
  "Ä": "A",
  "Å": "A",
  "à": "a",
  "á": "a",
  "â": "a",
  "ã": "a",
  "ä": "a",
  "å": "a",
  "Ç": "C",
  "ç": "c",
  "Ð": "D",
  "ð": "d",
  "È": "E",
  "É": "E",
  "Ê": "E",
  "Ë": "E",
  "è": "e",
  "é": "e",
  "ê": "e",
  "ë": "e",
  "Ì": "I",
  "Í": "I",
  "Î": "I",
  "Ï": "I",
  "ì": "i",
  "í": "i",
  "î": "i",
  "ï": "i",
  "Ñ": "N",
  "ñ": "n",
  "Ò": "O",
  "Ó": "O",
  "Ô": "O",
  "Õ": "O",
  "Ö": "O",
  "Ø": "O",
  "ò": "o",
  "ó": "o",
  "ô": "o",
  "õ": "o",
  "ö": "o",
  "ø": "o",
  "Ù": "U",
  "Ú": "U",
  "Û": "U",
  "Ü": "U",
  "ù": "u",
  "ú": "u",
  "û": "u",
  "ü": "u",
  "Ý": "Y",
  "ý": "y",
  "ÿ": "y",
  "Æ": "Ae",
  "æ": "ae",
  "Þ": "Th",
  "þ": "th",
  "ß": "ss",
  "Ā": "A",
  "Ă": "A",
  "Ą": "A",
  "ā": "a",
  "ă": "a",
  "ą": "a",
  "Ć": "C",
  "Ĉ": "C",
  "Ċ": "C",
  "Č": "C",
  "ć": "c",
  "ĉ": "c",
  "ċ": "c",
  "č": "c",
  "Ď": "D",
  "Đ": "D",
  "ď": "d",
  "đ": "d",
  "Ē": "E",
  "Ĕ": "E",
  "Ė": "E",
  "Ę": "E",
  "Ě": "E",
  "ē": "e",
  "ĕ": "e",
  "ė": "e",
  "ę": "e",
  "ě": "e",
  "Ĝ": "G",
  "Ğ": "G",
  "Ġ": "G",
  "Ģ": "G",
  "ĝ": "g",
  "ğ": "g",
  "ġ": "g",
  "ģ": "g",
  "Ĥ": "H",
  "Ħ": "H",
  "ĥ": "h",
  "ħ": "h",
  "Ĩ": "I",
  "Ī": "I",
  "Ĭ": "I",
  "Į": "I",
  "İ": "I",
  "ĩ": "i",
  "ī": "i",
  "ĭ": "i",
  "į": "i",
  "ı": "i",
  "Ĵ": "J",
  "ĵ": "j",
  "Ķ": "K",
  "ķ": "k",
  "ĸ": "k",
  "Ĺ": "L",
  "Ļ": "L",
  "Ľ": "L",
  "Ŀ": "L",
  "Ł": "L",
  "ĺ": "l",
  "ļ": "l",
  "ľ": "l",
  "ŀ": "l",
  "ł": "l",
  "Ń": "N",
  "Ņ": "N",
  "Ň": "N",
  "Ŋ": "N",
  "ń": "n",
  "ņ": "n",
  "ň": "n",
  "ŋ": "n",
  "Ō": "O",
  "Ŏ": "O",
  "Ő": "O",
  "ō": "o",
  "ŏ": "o",
  "ő": "o",
  "Ŕ": "R",
  "Ŗ": "R",
  "Ř": "R",
  "ŕ": "r",
  "ŗ": "r",
  "ř": "r",
  "Ś": "S",
  "Ŝ": "S",
  "Ş": "S",
  "Š": "S",
  "ś": "s",
  "ŝ": "s",
  "ş": "s",
  "š": "s",
  "Ţ": "T",
  "Ť": "T",
  "Ŧ": "T",
  "ţ": "t",
  "ť": "t",
  "ŧ": "t",
  "Ũ": "U",
  "Ū": "U",
  "Ŭ": "U",
  "Ů": "U",
  "Ű": "U",
  "Ų": "U",
  "ũ": "u",
  "ū": "u",
  "ŭ": "u",
  "ů": "u",
  "ű": "u",
  "ų": "u",
  "Ŵ": "W",
  "ŵ": "w",
  "Ŷ": "Y",
  "ŷ": "y",
  "Ÿ": "Y",
  "Ź": "Z",
  "Ż": "Z",
  "Ž": "Z",
  "ź": "z",
  "ż": "z",
  "ž": "z",
  "Ĳ": "IJ",
  "ĳ": "ij",
  "Œ": "Oe",
  "œ": "oe",
  "ŉ": "'n",
  "ſ": "s"
};
var deburrLetter$1 = basePropertyOf(deburredLetters);
var _deburrLetter = deburrLetter$1;
function arrayMap$2(array, iteratee) {
  var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index2 < length) {
    result[index2] = iteratee(array[index2], index2, array);
  }
  return result;
}
var _arrayMap = arrayMap$2;
var baseGetTag$4 = _baseGetTag, isObjectLike$5 = isObjectLike_1;
var symbolTag = "[object Symbol]";
function isSymbol$4(value) {
  return typeof value == "symbol" || isObjectLike$5(value) && baseGetTag$4(value) == symbolTag;
}
var isSymbol_1 = isSymbol$4;
var Symbol$2 = _Symbol, arrayMap$1 = _arrayMap, isArray$6 = isArray_1, isSymbol$3 = isSymbol_1;
var INFINITY$1 = 1 / 0;
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString$1(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$6(value)) {
    return arrayMap$1(value, baseToString$1) + "";
  }
  if (isSymbol$3(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
var _baseToString = baseToString$1;
var baseToString = _baseToString;
function toString$6(value) {
  return value == null ? "" : baseToString(value);
}
var toString_1 = toString$6;
var deburrLetter = _deburrLetter, toString$5 = toString_1;
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange$3 = "\\u0300-\\u036f", reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$3 = "\\u20d0-\\u20ff", rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3;
var rsCombo$2 = "[" + rsComboRange$3 + "]";
var reComboMark = RegExp(rsCombo$2, "g");
function deburr$1(string) {
  string = toString$5(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
}
var deburr_1 = deburr$1;
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords$1(string) {
  return string.match(reAsciiWord) || [];
}
var _asciiWords = asciiWords$1;
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord$1(string) {
  return reHasUnicodeWord.test(string);
}
var _hasUnicodeWord = hasUnicodeWord$1;
var rsAstralRange$2 = "\\ud800-\\udfff", rsComboMarksRange$2 = "\\u0300-\\u036f", reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$2 = "\\u20d0-\\u20ff", rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange$2 = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos$1 = "['’]", rsBreak = "[" + rsBreakRange + "]", rsCombo$1 = "[" + rsComboRange$2 + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange$2 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz$1 = "\\ud83c[\\udffb-\\udfff]", rsModifier$1 = "(?:" + rsCombo$1 + "|" + rsFitz$1 + ")", rsNonAstral$1 = "[^" + rsAstralRange$2 + "]", rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ$2 = "\\u200d";
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos$1 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos$1 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod$1 = rsModifier$1 + "?", rsOptVar$1 = "[" + rsVarRange$2 + "]?", rsOptJoin$1 = "(?:" + rsZWJ$2 + "(?:" + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsOptVar$1 + reOptMod$1 + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1, rsEmoji = "(?:" + [rsDingbat, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsSeq$1;
var reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
  rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
  rsUpper + "+" + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join("|"), "g");
function unicodeWords$1(string) {
  return string.match(reUnicodeWord) || [];
}
var _unicodeWords = unicodeWords$1;
var asciiWords = _asciiWords, hasUnicodeWord = _hasUnicodeWord, toString$4 = toString_1, unicodeWords = _unicodeWords;
function words$1(string, pattern, guard) {
  string = toString$4(string);
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}
var words_1 = words$1;
var arrayReduce = _arrayReduce, deburr = deburr_1, words = words_1;
var rsApos = "['’]";
var reApos = RegExp(rsApos, "g");
function createCompounder$3(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
  };
}
var _createCompounder = createCompounder$3;
var createCompounder$2 = _createCompounder;
var kebabCase = createCompounder$2(function(result, word, index2) {
  return result + (index2 ? "-" : "") + word.toLowerCase();
});
var kebabCase_1 = kebabCase;
function baseSlice$2(array, start, end) {
  var index2 = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index2 < length) {
    result[index2] = array[index2 + start];
  }
  return result;
}
var _baseSlice = baseSlice$2;
var baseSlice$1 = _baseSlice;
function castSlice$1(array, start, end) {
  var length = array.length;
  end = end === void 0 ? length : end;
  return !start && end >= length ? array : baseSlice$1(array, start, end);
}
var _castSlice = castSlice$1;
var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1, rsVarRange$1 = "\\ufe0e\\ufe0f";
var rsZWJ$1 = "\\u200d";
var reHasUnicode = RegExp("[" + rsZWJ$1 + rsAstralRange$1 + rsComboRange$1 + rsVarRange$1 + "]");
function hasUnicode$2(string) {
  return reHasUnicode.test(string);
}
var _hasUnicode = hasUnicode$2;
function asciiToArray$1(string) {
  return string.split("");
}
var _asciiToArray = asciiToArray$1;
var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d";
var reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
function unicodeToArray$1(string) {
  return string.match(reUnicode) || [];
}
var _unicodeToArray = unicodeToArray$1;
var asciiToArray = _asciiToArray, hasUnicode$1 = _hasUnicode, unicodeToArray = _unicodeToArray;
function stringToArray$1(string) {
  return hasUnicode$1(string) ? unicodeToArray(string) : asciiToArray(string);
}
var _stringToArray = stringToArray$1;
var castSlice = _castSlice, hasUnicode = _hasUnicode, stringToArray = _stringToArray, toString$3 = toString_1;
function createCaseFirst$1(methodName) {
  return function(string) {
    string = toString$3(string);
    var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
var _createCaseFirst = createCaseFirst$1;
var createCaseFirst = _createCaseFirst;
var upperFirst$2 = createCaseFirst("toUpperCase");
var upperFirst_1 = upperFirst$2;
var toString$2 = toString_1, upperFirst$1 = upperFirst_1;
function capitalize$1(string) {
  return upperFirst$1(toString$2(string).toLowerCase());
}
var capitalize_1 = capitalize$1;
var capitalize = capitalize_1, createCompounder$1 = _createCompounder;
var camelCase = createCompounder$1(function(result, word, index2) {
  word = word.toLowerCase();
  return result + (index2 ? capitalize(word) : word);
});
var camelCase_1 = camelCase;
var reWhitespace = /\s/;
function trimmedEndIndex$1(string) {
  var index2 = string.length;
  while (index2-- && reWhitespace.test(string.charAt(index2))) {
  }
  return index2;
}
var _trimmedEndIndex = trimmedEndIndex$1;
var trimmedEndIndex = _trimmedEndIndex;
var reTrimStart = /^\s+/;
function baseTrim$1(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
var _baseTrim = baseTrim$1;
var baseTrim = _baseTrim, isObject$6 = isObject_1, isSymbol$2 = isSymbol_1;
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber$2(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol$2(value)) {
    return NAN;
  }
  if (isObject$6(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject$6(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_1 = toNumber$2;
var isArray$5 = isArray_1, isSymbol$1 = isSymbol_1;
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey$1(value, object) {
  if (isArray$5(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol$1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var _isKey = isKey$1;
var MapCache = _MapCache;
var FUNC_ERROR_TEXT$1 = "Expected a function";
function memoize$1(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache)();
  return memoized;
}
memoize$1.Cache = MapCache;
var memoize_1 = memoize$1;
var memoize = memoize_1;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped$1(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var _memoizeCapped = memoizeCapped$1;
var memoizeCapped = _memoizeCapped;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath$1 = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
var _stringToPath = stringToPath$1;
var isArray$4 = isArray_1, isKey = _isKey, stringToPath = _stringToPath, toString$1 = toString_1;
function castPath$6(value, object) {
  if (isArray$4(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString$1(value));
}
var _castPath = castPath$6;
var isSymbol = isSymbol_1;
var INFINITY = 1 / 0;
function toKey$4(value) {
  if (typeof value == "string" || isSymbol(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var _toKey = toKey$4;
var castPath$5 = _castPath, toKey$3 = _toKey;
function baseGet$2(object, path) {
  path = castPath$5(path, object);
  var index2 = 0, length = path.length;
  while (object != null && index2 < length) {
    object = object[toKey$3(path[index2++])];
  }
  return index2 && index2 == length ? object : void 0;
}
var _baseGet = baseGet$2;
var assignValue = _assignValue, castPath$4 = _castPath, isIndex$2 = _isIndex, isObject$4 = isObject_1, toKey$2 = _toKey;
function baseSet$1(object, path, value, customizer) {
  if (!isObject$4(object)) {
    return object;
  }
  path = castPath$4(path, object);
  var index2 = -1, length = path.length, lastIndex = length - 1, nested = object;
  while (nested != null && ++index2 < length) {
    var key = toKey$2(path[index2]), newValue = value;
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return object;
    }
    if (index2 != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : void 0;
      if (newValue === void 0) {
        newValue = isObject$4(objValue) ? objValue : isIndex$2(path[index2 + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}
var _baseSet = baseSet$1;
var baseGet$1 = _baseGet, baseSet = _baseSet, castPath$3 = _castPath;
function basePickBy$1(object, paths, predicate) {
  var index2 = -1, length = paths.length, result = {};
  while (++index2 < length) {
    var path = paths[index2], value = baseGet$1(object, path);
    if (predicate(value, path)) {
      baseSet(result, castPath$3(path, object), value);
    }
  }
  return result;
}
var _basePickBy = basePickBy$1;
function baseHasIn$1(object, key) {
  return object != null && key in Object(object);
}
var _baseHasIn = baseHasIn$1;
var castPath$2 = _castPath, isArguments$2 = isArguments_1, isArray$3 = isArray_1, isIndex$1 = _isIndex, isLength = isLength_1, toKey$1 = _toKey;
function hasPath$1(object, path, hasFunc) {
  path = castPath$2(path, object);
  var index2 = -1, length = path.length, result = false;
  while (++index2 < length) {
    var key = toKey$1(path[index2]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index2 != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex$1(key, length) && (isArray$3(object) || isArguments$2(object));
}
var _hasPath = hasPath$1;
var baseHasIn = _baseHasIn, hasPath = _hasPath;
function hasIn$1(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}
var hasIn_1 = hasIn$1;
var basePickBy = _basePickBy, hasIn = hasIn_1;
function basePick$1(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}
var _basePick = basePick$1;
var Symbol$1 = _Symbol, isArguments$1 = isArguments_1, isArray$2 = isArray_1;
var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : void 0;
function isFlattenable$1(value) {
  return isArray$2(value) || isArguments$1(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var _isFlattenable = isFlattenable$1;
var arrayPush = _arrayPush, isFlattenable = _isFlattenable;
function baseFlatten$1(array, depth, predicate, isStrict, result) {
  var index2 = -1, length = array.length;
  predicate || (predicate = isFlattenable);
  result || (result = []);
  while (++index2 < length) {
    var value = array[index2];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten$1(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
var _baseFlatten = baseFlatten$1;
var baseFlatten = _baseFlatten;
function flatten$1(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}
var flatten_1 = flatten$1;
function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var _apply = apply$1;
var apply = _apply;
var nativeMax = Math.max;
function overRest$2(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index2 < length) {
      array[index2] = args[start + index2];
    }
    index2 = -1;
    var otherArgs = Array(start + 1);
    while (++index2 < start) {
      otherArgs[index2] = args[index2];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
var _overRest = overRest$2;
function constant$1(value) {
  return function() {
    return value;
  };
}
var constant_1 = constant$1;
function identity$2(value) {
  return value;
}
var identity_1 = identity$2;
var constant = constant_1, defineProperty = _defineProperty, identity$1 = identity_1;
var baseSetToString$1 = !defineProperty ? identity$1 : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var _baseSetToString = baseSetToString$1;
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut$1(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var _shortOut = shortOut$1;
var baseSetToString = _baseSetToString, shortOut = _shortOut;
var setToString$2 = shortOut(baseSetToString);
var _setToString = setToString$2;
var flatten = flatten_1, overRest$1 = _overRest, setToString$1 = _setToString;
function flatRest$2(func) {
  return setToString$1(overRest$1(func, void 0, flatten), func + "");
}
var _flatRest = flatRest$2;
var basePick = _basePick, flatRest$1 = _flatRest;
var pick = flatRest$1(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});
var pick_1 = pick;
var toString = toString_1;
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}
var uniqueId_1 = uniqueId;
var baseAssignValue = _baseAssignValue, eq$1 = eq_1;
function assignMergeValue$2(object, key, value) {
  if (value !== void 0 && !eq$1(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
var _assignMergeValue = assignMergeValue$2;
function createBaseFor$1(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index2];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var _createBaseFor = createBaseFor$1;
var createBaseFor = _createBaseFor;
var baseFor$1 = createBaseFor();
var _baseFor = baseFor$1;
var isArrayLike$1 = isArrayLike_1, isObjectLike$3 = isObjectLike_1;
function isArrayLikeObject$1(value) {
  return isObjectLike$3(value) && isArrayLike$1(value);
}
var isArrayLikeObject_1 = isArrayLikeObject$1;
var baseGetTag$2 = _baseGetTag, getPrototype = _getPrototype, isObjectLike$2 = isObjectLike_1;
var objectTag = "[object Object]";
var funcProto = Function.prototype, objectProto = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty = objectProto.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject$2(value) {
  if (!isObjectLike$2(value) || baseGetTag$2(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var isPlainObject_1 = isPlainObject$2;
function safeGet$2(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
var _safeGet = safeGet$2;
var copyObject$1 = _copyObject, keysIn$1 = keysIn_1;
function toPlainObject$1(value) {
  return copyObject$1(value, keysIn$1(value));
}
var toPlainObject_1 = toPlainObject$1;
var assignMergeValue$1 = _assignMergeValue, cloneBuffer = _cloneBuffer.exports, cloneTypedArray = _cloneTypedArray, copyArray = _copyArray, initCloneObject = _initCloneObject, isArguments = isArguments_1, isArray = isArray_1, isArrayLikeObject = isArrayLikeObject_1, isBuffer = isBuffer$3.exports, isFunction = isFunction_1, isObject$3 = isObject_1, isPlainObject$1 = isPlainObject_1, isTypedArray = isTypedArray_1, safeGet$1 = _safeGet, toPlainObject = toPlainObject_1;
function baseMergeDeep$1(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet$1(object, key), srcValue = safeGet$1(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue$1(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject$1(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject$3(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue$1(object, key, newValue);
}
var _baseMergeDeep = baseMergeDeep$1;
var Stack = _Stack, assignMergeValue = _assignMergeValue, baseFor = _baseFor, baseMergeDeep = _baseMergeDeep, isObject$2 = isObject_1, keysIn = keysIn_1, safeGet = _safeGet;
function baseMerge$1(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack());
    if (isObject$2(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge$1, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
var _baseMerge = baseMerge$1;
var identity = identity_1, overRest = _overRest, setToString = _setToString;
function baseRest$1(func, start) {
  return setToString(overRest(func, start, identity), func + "");
}
var _baseRest = baseRest$1;
var eq = eq_1, isArrayLike = isArrayLike_1, isIndex = _isIndex, isObject$1 = isObject_1;
function isIterateeCall$1(value, index2, object) {
  if (!isObject$1(object)) {
    return false;
  }
  var type = typeof index2;
  if (type == "number" ? isArrayLike(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
    return eq(object[index2], value);
  }
  return false;
}
var _isIterateeCall = isIterateeCall$1;
var baseRest = _baseRest, isIterateeCall = _isIterateeCall;
function createAssigner$1(assigner) {
  return baseRest(function(object, sources) {
    var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index2 < length) {
      var source = sources[index2];
      if (source) {
        assigner(object, source, index2, customizer);
      }
    }
    return object;
  });
}
var _createAssigner = createAssigner$1;
var baseMerge = _baseMerge, createAssigner = _createAssigner;
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
var merge_1 = merge;
function last$1(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : void 0;
}
var last_1 = last$1;
var baseGet = _baseGet, baseSlice = _baseSlice;
function parent$1(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}
var _parent = parent$1;
var castPath$1 = _castPath, last = last_1, parent = _parent, toKey = _toKey;
function baseUnset$1(object, path) {
  path = castPath$1(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}
var _baseUnset = baseUnset$1;
var isPlainObject = isPlainObject_1;
function customOmitClone$1(value) {
  return isPlainObject(value) ? void 0 : value;
}
var _customOmitClone = customOmitClone$1;
var arrayMap = _arrayMap, baseClone = _baseClone, baseUnset = _baseUnset, castPath = _castPath, copyObject = _copyObject, customOmitClone = _customOmitClone, flatRest = _flatRest, getAllKeysIn = _getAllKeysIn;
var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
var omit = flatRest(function(object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap(paths, function(path) {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});
var omit_1 = omit;
function baseClamp$1(number, lower, upper) {
  if (number === number) {
    if (upper !== void 0) {
      number = number <= upper ? number : upper;
    }
    if (lower !== void 0) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}
var _baseClamp = baseClamp$1;
var baseClamp = _baseClamp, toNumber = toNumber_1;
function clamp(number, lower, upper) {
  if (upper === void 0) {
    upper = lower;
    lower = void 0;
  }
  if (upper !== void 0) {
    upper = toNumber(upper);
    upper = upper === upper ? upper : 0;
  }
  if (lower !== void 0) {
    lower = toNumber(lower);
    lower = lower === lower ? lower : 0;
  }
  return baseClamp(toNumber(number), lower, upper);
}
var clamp_1 = clamp;
var nodeUtil = _nodeUtil.exports;
nodeUtil && nodeUtil.isDate;
const getComponentsDefaultConfig = () => ({
  VaIcon: {
    sizesConfig: {
      defaultSize: 24,
      sizes: {
        small: 16,
        medium: 24,
        large: 32
      }
    }
  },
  VaRating: {
    sizesConfig: {
      defaultSize: 24,
      sizes: {
        small: 16,
        medium: 24,
        large: 32
      }
    }
  },
  all: {},
  presets: {
    VaButton: {
      default: {
        backgroundOpacity: 1,
        hoverBehavior: "mask",
        hoverOpacity: 0.15,
        pressedBehavior: "mask",
        pressedOpacity: 0.13
      },
      primary: {
        backgroundOpacity: 0.1,
        hoverBehavior: "opacity",
        hoverOpacity: 0.07,
        pressedBehavior: "opacity",
        pressedOpacity: 0.13
      },
      secondary: {
        backgroundOpacity: 0,
        hoverBehavior: "opacity",
        hoverOpacity: 0.07,
        pressedBehavior: "opacity",
        pressedOpacity: 0.13
      },
      plain: {
        plain: true,
        hoverBehavior: "mask",
        hoverOpacity: 0.15,
        pressedBehavior: "mask",
        pressedOpacity: 0.13
      },
      plainOpacity: {
        plain: true,
        textOpacity: 0.6,
        hoverBehavior: "opacity",
        hoverOpacity: 1,
        pressedBehavior: "opacity",
        pressedOpacity: 0.9
      }
    }
  }
});
const VuesticIconFonts = [
  {
    name: "mi-{icon}",
    class: "material-icons",
    resolve: ({ icon }) => ({ content: icon })
  },
  {
    name: "{icon}",
    class: "material-icons",
    resolve: ({ icon }) => ({ content: icon })
  }
];
const VuesticIconAliases = [
  {
    name: "va-arrow-first",
    to: "mi-first_page"
  },
  {
    name: "va-arrow-last",
    to: "mi-last_page"
  },
  {
    name: "va-arrow-right",
    to: "mi-chevron_right"
  },
  {
    name: "va-arrow-left",
    to: "mi-chevron_left"
  },
  {
    name: "va-arrow-down",
    to: "mi-expand_more"
  },
  {
    name: "va-arrow-up",
    to: "mi-expand_less"
  },
  {
    name: "va-calendar",
    to: "mi-calendar_today"
  },
  {
    name: "va-delete",
    to: "mi-delete_outline"
  },
  {
    name: "va-check",
    to: "mi-check"
  },
  {
    name: "va-check-circle",
    to: "mi-check_circle"
  },
  {
    name: "va-warning",
    to: "mi-warning"
  },
  {
    name: "va-clear",
    to: "mi-highlight_off"
  },
  {
    name: "va-close",
    to: "mi-close"
  },
  {
    name: "va-loading",
    to: "mi-loop"
  }
];
const createIconsConfig = (config) => {
  config.aliases = config.aliases || [];
  config.fonts = config.fonts || [];
  return [
    ...config.aliases,
    ...VuesticIconAliases,
    ...config.fonts,
    ...VuesticIconFonts
  ];
};
const getIconDefaultConfig = () => createIconsConfig({});
const presets = {
  light: {
    primary: "#154EC1",
    secondary: "#767C88",
    success: "#3D9209",
    info: "#158DE3",
    danger: "#E42222",
    warning: "#FFD43A",
    backgroundPrimary: "#f6f6f6",
    backgroundSecondary: "#FFFFFF",
    backgroundElement: "#ECF0F1",
    backgroundBorder: "#DEE5F2",
    textPrimary: "#262824",
    textInverted: "#FFFFFF",
    shadow: "rgba(0, 0, 0, 0.12)",
    focus: "#49A8FF"
  },
  dark: {
    primary: "#3472F0",
    secondary: "#767C88",
    success: "#66BE33",
    info: "#3EAAF8",
    danger: "#F34030",
    warning: "#FFD952",
    backgroundPrimary: "#050A10",
    backgroundSecondary: "#1F262F",
    backgroundElement: "#131A22",
    backgroundBorder: "#3D4C58",
    textPrimary: "#F1F1F1",
    textInverted: "#0B121A",
    shadow: "rgba(255, 255, 255, 0.12)",
    focus: "#49A8FF"
  }
};
const getColorDefaultConfig = () => ({
  get variables() {
    return this.presets[this.currentPresetName];
  },
  set variables(value) {
    this.presets[this.currentPresetName] = value;
  },
  threshold: 150,
  presets: {
    light: presets.light,
    dark: presets.dark
  },
  currentPresetName: "light"
});
const getI18nConfigDefaults = () => ({
  search: "Search",
  noOptions: "Items not found",
  ok: "Ok",
  cancel: "Cancel",
  uploadFile: "Upload file",
  undo: "Undo",
  dropzone: "Drop files here to upload",
  fileDeleted: "File deleted",
  closeAlert: "close alert",
  backToTop: "back to top",
  toggleDropdown: "toggle dropdown",
  carousel: "carousel",
  goPreviousSlide: "go previous slide",
  goNextSlide: "go next slide",
  goSlide: "go slide {index}",
  slideOf: "slide {index} of {length}",
  close: "close",
  openColorPicker: "open color picker",
  colorSelection: "color selection",
  colorName: "color {color}",
  decreaseCounter: "decrease counter",
  increaseCounter: "increase counter",
  selectAllRows: "select all rows",
  sortColumnBy: "sort column by {name}",
  selectRowByIndex: "select row {index}",
  resetDate: "reset date",
  nextPeriod: "next period",
  switchView: "switch view",
  previousPeriod: "previous period",
  removeFile: "remove file",
  reset: "reset",
  pagination: "pagination",
  goToTheFirstPage: "go to the first page",
  goToPreviousPage: "go to the previous page",
  goToSpecificPage: "go to the {page} page",
  goToSpecificPageInput: "enter the page number to go",
  goNextPage: "go next page",
  goLastPage: "go last page",
  currentRating: "current rating {value} of {max}",
  voteRating: "`vote rating {value} of {max}`",
  optionsFilter: "options filter",
  splitPanels: "split panels",
  movePaginationLeft: "move pagination left",
  movePaginationRight: "move pagination right",
  resetTime: "reset time",
  closeToast: "close toast",
  selectedOption: "Selected option",
  noSelectedOption: "Option is not selected",
  breadcrumbs: "breadcrumbs",
  counterValue: "counter value",
  selectedDate: "selected date",
  selectedTime: "selected time",
  progressState: "progress state",
  color: "color",
  next: "Next",
  back: "Previous",
  finish: "Finish"
});
const vaBreakpointSymbol = Symbol("vaBreakpoint");
const defaultThresholds = {
  xs: 0,
  sm: 640,
  md: 1024,
  lg: 1440,
  xl: 1920
};
const getBreakpointDefaultConfig = () => ({
  enabled: true,
  bodyClass: true,
  thresholds: defaultThresholds
});
let app;
const setCurrentApp = (instance) => {
  app = instance;
};
const getCurrentApp = () => app;
const inject = (key, value) => {
  var _a;
  const app2 = (_a = getCurrentApp()) == null ? void 0 : _a._context.provides[key];
  return app2 || inject$1(key, value);
};
const isObject = (obj) => obj && typeof obj === "object" && !Array.isArray(obj);
const mergeDeep = (target, source) => {
  if (!isObject(target) || !isObject(source)) {
    return source;
  }
  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];
    if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });
  return target;
};
const isServer = () => true;
const isClient = () => !isServer();
const fakeGlobal = {};
const getGlobal = () => {
  {
    if (typeof globalThis === "undefined") {
      return fakeGlobal;
    }
    return globalThis;
  }
};
const extractGlobalProperties = (app2) => app2.config.globalProperties;
const defineGlobalProperty = (app2, key, v) => {
  const globalProperties = extractGlobalProperties(app2);
  globalProperties[key] = v;
};
const getGlobalProperty$1 = (app2, key) => {
  return extractGlobalProperties(app2)[key];
};
const defineVuesticPlugin = (fabric) => fabric;
const addOrUpdateStyleElement = (id, getStyles) => {
  {
    return;
  }
};
const ColorsClassesPresets = [
  {
    prefix: "bg",
    property: "background-color"
  },
  {
    prefix: "text",
    property: ["color", "fill"]
  }
];
const getColorsClassesDefaultConfig = () => ColorsClassesPresets;
const createColorHelpersPlugin = () => {
  {
    return;
  }
};
const ColorsClassesPlugin = defineVuesticPlugin(() => ({
  install(app2) {
    defineGlobalProperty(app2, "$vaColorsClasses", createColorHelpersPlugin());
  }
}));
const GLOBAL_CONFIG = Symbol("GLOBAL_CONFIG");
const createGlobalConfig = () => {
  const globalConfig = ref({
    colors: getColorDefaultConfig(),
    icons: getIconDefaultConfig(),
    components: getComponentsDefaultConfig(),
    breakpoint: getBreakpointDefaultConfig(),
    i18n: getI18nConfigDefaults(),
    colorsClasses: getColorsClassesDefaultConfig()
  });
  const getGlobalConfig = () => globalConfig.value;
  const setGlobalConfig = (updater) => {
    const config = typeof updater === "function" ? updater(globalConfig.value) : updater;
    globalConfig.value = cloneDeep_1(config);
  };
  const mergeGlobalConfig = (updater) => {
    const config = typeof updater === "function" ? updater(globalConfig.value) : updater;
    globalConfig.value = mergeDeep(cloneDeep_1(globalConfig.value), config);
  };
  return {
    getGlobalConfig,
    setGlobalConfig,
    mergeGlobalConfig,
    globalConfig
  };
};
const provideForCurrentApp = (provide2) => {
  var _a, _b;
  const provides = ((_a = getCurrentInstance()) == null ? void 0 : _a.appContext.provides) || ((_b = getCurrentApp()) == null ? void 0 : _b._context.provides);
  if (!provides) {
    throw new Error("Vue app not found for provide");
  }
  provides[GLOBAL_CONFIG] = provide2;
  return provide2;
};
function useGlobalConfig() {
  let injected = inject(GLOBAL_CONFIG);
  if (!injected) {
    injected = createGlobalConfig();
    provideForCurrentApp(injected);
  }
  return injected;
}
const __DEV__ = typeof process !== "undefined" && false;
const warn = (...attrs) => {
  if (__DEV__) {
    console.warn(...attrs);
  }
  return false;
};
const VaAppCachePluginKey = Symbol("VaAppCachePlugin");
const CachePlugin = defineVuesticPlugin(() => ({
  install(app2) {
    const cache = {
      colorContrast: {}
    };
    app2.provide(VaAppCachePluginKey, cache);
  }
}));
const useCache = () => inject(VaAppCachePluginKey, {
  colorContrast: {}
});
const useReactiveComputed = (obj) => {
  const objectRef = typeof obj === "function" ? computed(obj) : computed(obj);
  const proxy = new Proxy(objectRef, {
    get(target, p, receiver) {
      return unref(Reflect.get(objectRef.value, p, receiver));
    },
    set(target, p, value) {
      if (isRef(objectRef.value[p]) && !isRef(value)) {
        objectRef.value[p].value = value;
      } else {
        objectRef.value[p] = value;
      }
      return true;
    },
    deleteProperty(target, p) {
      return Reflect.deleteProperty(objectRef.value, p);
    },
    has(target, p) {
      return Reflect.has(objectRef.value, p);
    },
    ownKeys() {
      return Object.keys(objectRef.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    }
  });
  return reactive(proxy);
};
const isCSSVariable = (strColor) => /var\(--.+\)/.test(strColor);
const cssVariableName = (colorName) => `--va-${kebabCase_1(colorName)}`;
const normalizeColorName = (colorName) => camelCase_1(colorName);
const colorToRgba = (color, opacity) => {
  return new ColorTranslator(color).setA(opacity).RGBA;
};
const getColorLightness = (color) => {
  const { R, G, B } = new ColorTranslator(color);
  return Math.sqrt(R * R * 0.241 + G * G * 0.691 + B * B * 0.068);
};
const getBoxShadowColor = (color, opacity = 0.4) => {
  return new ColorTranslator(color).setA(opacity).RGBA;
};
const getBoxShadowColorFromBg = (background, opacity = 0.4) => {
  return new ColorTranslator(background).setA(opacity).RGBA;
};
const getHoverColor = (color, opacity = 0.2) => {
  return new ColorTranslator(color).setA(opacity).RGBA;
};
const getFocusColor = (color, opacity = 0.3) => {
  return new ColorTranslator(color).setA(opacity).RGBA;
};
const shiftHSLAColor = (color, offset) => {
  const result = new ColorTranslator(color);
  if (offset.h) {
    result.setH(result.H + offset.h);
  }
  if (offset.s) {
    result.setS(result.S + offset.s);
  }
  if (offset.l) {
    result.setL(result.L + offset.l);
  }
  if (offset.a) {
    result.setA(result.A + offset.a);
  }
  return result.HSLA;
};
const setHSLAColor = (color, newColor) => {
  const result = new ColorTranslator(color);
  if (newColor.h !== void 0) {
    result.setH(newColor.h);
  }
  if (newColor.s !== void 0) {
    result.setS(newColor.s);
  }
  if (newColor.l !== void 0) {
    result.setL(newColor.l);
  }
  if (newColor.a !== void 0) {
    result.setA(newColor.a);
  }
  return result.HSLA;
};
const shiftGradientColor = (color) => {
  const newColor = ColorTranslator.toHSLA(color, false);
  if (newColor.s < 10) {
    return shiftHSLAColor(newColor, { h: 2, s: 5, l: 10 });
  }
  if (newColor.s < 30) {
    return shiftHSLAColor(newColor, { s: -14, l: 11 });
  }
  if (newColor.h >= 0 && newColor.h < 44 || newColor.h >= 285) {
    return shiftHSLAColor(newColor, { h: 11, s: 27, l: 8 });
  }
  if (newColor.h >= 44 && newColor.h < 85) {
    return shiftHSLAColor(newColor, { h: 3, l: 9 });
  }
  if (newColor.h >= 85 && newColor.h < 165) {
    return shiftHSLAColor(newColor, { h: 16, l: 14 });
  }
  if (newColor.h >= 165 && newColor.h < 285) {
    return shiftHSLAColor(newColor, { h: -15, s: 3, l: 2 });
  }
  throw new Error("This method should handle all colors. But it didn't for some reason.");
};
const getGradientBackground = (color) => {
  const colorLeft = shiftGradientColor(color);
  const colorRight = ColorTranslator.toHSLA(color);
  return `linear-gradient(to right, ${colorLeft}, ${colorRight})`;
};
const getStateMaskGradientBackground = (color, maskColor, maskOpacity) => {
  const mask = colorToRgba(maskColor, maskOpacity);
  return `linear-gradient(0deg, ${mask}, ${mask}), ${color}`;
};
const isColor = (strColor) => {
  const cssColorRegex = /^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$|(rgb|hsl)a?\((\s*-?\d+%?\s*,){2}(\s*-?\d+%?\s*,?\s*\)?)(,\s*(0?\.\d+)?|1)?\)/;
  return cssColorRegex.test(strColor.toLocaleLowerCase());
};
const applyColors = (color1, color2) => {
  const c1 = new ColorTranslator(color1);
  const c2 = new ColorTranslator(color2);
  const weight = c2.A;
  if (weight === 1) {
    return c2.RGBA;
  }
  if (weight === 0) {
    return c1.RGBA;
  }
  c1.setR(Math.round(c1.R * (1 - weight) + c2.R * weight));
  c1.setG(Math.round(c1.G * (1 - weight) + c2.G * weight));
  c1.setB(Math.round(c1.B * (1 - weight) + c2.B * weight));
  return c1.RGBA;
};
const useColors = () => {
  const gc = useGlobalConfig();
  if (!gc) {
    throw new Error("useColors must be used in setup function or Vuestic GlobalConfigPlugin is not registered!");
  }
  const { setGlobalConfig, globalConfig } = gc;
  const colors = useReactiveComputed({
    get: () => globalConfig.value.colors.variables,
    set: (v) => {
      setColors(v);
    }
  });
  const setColors = (colors2) => {
    globalConfig.value.colors.variables = {
      ...globalConfig.value.colors.variables,
      ...colors2
    };
  };
  const getColors = () => {
    return colors;
  };
  const getColor = (prop, defaultColor, preferVariables) => {
    if (!defaultColor) {
      defaultColor = getColors().primary;
    }
    const colors2 = getColors();
    if (!prop) {
      prop = getColor(defaultColor);
    }
    const colorValue = colors2[prop] || colors2[normalizeColorName(prop)];
    if (colorValue) {
      return preferVariables ? `var(${cssVariableName(prop)})` : colorValue;
    }
    if (isColor(prop)) {
      return prop;
    }
    if (preferVariables && isCSSVariable(prop)) {
      return prop;
    }
    if (__DEV__) {
      console.warn(`'${prop}' is not a proper color! Use HEX or default color themes
      names (https://vuestic.dev/en/styles/colors#default-color-themes)`);
    }
    return getColor(defaultColor);
  };
  const getComputedColor = (color) => {
    return computed(() => getColor(color));
  };
  const colorsToCSSVariable = (colors2, prefix = "va") => {
    return Object.keys(colors2).filter((key) => colors2[key] !== void 0).reduce((acc, colorName) => {
      acc[`--${prefix}-${colorName}`] = getColor(colors2[colorName], void 0, true);
      return acc;
    }, {});
  };
  const cache = useCache();
  const getColorLightnessFromCache = (color) => {
    if (typeof color !== "string") {
      return getColorLightness(color);
    }
    if (!cache.colorContrast[color]) {
      cache.colorContrast[color] = getColorLightness(color);
    }
    return cache.colorContrast[color];
  };
  const computedDarkColor = computed(() => {
    return getColorLightnessFromCache(getColor("textPrimary")) > globalConfig.value.colors.threshold ? "textInverted" : "textPrimary";
  });
  const computedLightColor = computed(() => {
    return getColorLightnessFromCache(getColor("textPrimary")) > globalConfig.value.colors.threshold ? "textPrimary" : "textInverted";
  });
  const getTextColor = (color, darkColor, lightColor) => {
    darkColor = darkColor || computedDarkColor.value;
    lightColor = lightColor || computedLightColor.value;
    return getColorLightnessFromCache(color) > globalConfig.value.colors.threshold ? darkColor : lightColor;
  };
  const currentPresetName = computed(() => globalConfig.value.colors.currentPresetName);
  const presets2 = computed(() => globalConfig.value.colors.presets);
  const applyPreset = (presetName) => {
    globalConfig.value.colors.currentPresetName = presetName;
    if (!globalConfig.value.colors.presets[presetName]) {
      return warn(`Preset ${presetName} does not exist`);
    }
    globalConfig.value.colors.variables = { ...globalConfig.value.colors.presets[presetName] };
  };
  return {
    colors,
    currentPresetName,
    presets: presets2,
    applyPreset,
    setColors,
    getColors,
    getColor,
    getComputedColor,
    getBoxShadowColor,
    getBoxShadowColorFromBg,
    getHoverColor,
    getFocusColor,
    getGradientBackground,
    getTextColor,
    shiftHSLAColor,
    setHSLAColor,
    colorsToCSSVariable,
    colorToRgba,
    getStateMaskGradientBackground
  };
};
const isMatchRegex = (str, regex) => {
  return regex.test(str);
};
const regexGroupsValues = (str, regex) => {
  if (typeof regex !== "string" && regex.global) {
    return [...str.matchAll(regex)].map((g) => g.slice(1));
  }
  const match = str.match(regex) || [];
  if (!match) {
    return [];
  }
  if (match.length > 1) {
    return match.slice(1);
  }
  return match;
};
const dynamicSegmentRegex = /{[^}]*}/g;
const dynamicSegmentStringToRegex = (template) => {
  return template.replace(dynamicSegmentRegex, "(.*)");
};
const dynamicSegmentsNames = (template) => {
  return (template.match(dynamicSegmentRegex) || []).map((g) => g.replace(/{|}/g, ""));
};
const dynamicSegmentsValues = (str, template) => {
  return regexGroupsValues(str, dynamicSegmentStringToRegex(template));
};
const dynamicSegments = (str, template) => {
  const params = dynamicSegmentsNames(template);
  const values = dynamicSegmentsValues(str, template);
  return params.reduce((acc, paramValue, i) => ({ ...acc, [paramValue]: values[i] }), {});
};
const strictMatch = (str, regex) => {
  return (str.match(regex) || [])[0] === str;
};
const isMatchDynamicSegments = (str, template) => {
  const templateRegex = dynamicSegmentStringToRegex(template);
  return strictMatch(str, new RegExp(templateRegex));
};
const isIconConfigurationString = (config) => {
  return typeof config.name === "string";
};
const isIconConfigurationRegex = (config) => {
  return config.name instanceof RegExp;
};
const isMatchConfiguration = (iconName, iconConfiguration) => {
  if (isIconConfigurationString(iconConfiguration)) {
    return isMatchDynamicSegments(iconName, iconConfiguration.name);
  }
  if (isIconConfigurationRegex(iconConfiguration)) {
    return isMatchRegex(iconName, iconConfiguration.name);
  }
  return false;
};
const resolveIconConfigurationString = (iconName, iconConfiguration) => {
  const args = dynamicSegments(iconName, iconConfiguration.name);
  return iconConfiguration.resolve && iconConfiguration.resolve(args);
};
const resolveIconConfigurationRegex = (iconName, iconConfig) => {
  if (iconConfig.name.global) {
    throw new Error(`Bad icon config with name ${iconConfig.name}. Please, don't use global regex as name.`);
  }
  const args = regexGroupsValues(iconName, iconConfig.name);
  return iconConfig.resolveFromRegex && iconConfig.resolveFromRegex(...args);
};
const resolveIconConfiguration = (iconName, iconConfiguration) => {
  if (isIconConfigurationString(iconConfiguration)) {
    return resolveIconConfigurationString(iconName, iconConfiguration);
  }
  if (isIconConfigurationRegex(iconConfiguration)) {
    return resolveIconConfigurationRegex(iconName, iconConfiguration);
  }
  throw Error("Unknown icon config");
};
const findMatchedIconConfiguration = (iconName, globalIconConfig, namesToIgnore = []) => {
  const matchedConfig = globalIconConfig.find((config) => {
    if (namesToIgnore.includes(config.name.toString())) {
      return false;
    }
    return isMatchConfiguration(iconName, config);
  });
  if (!matchedConfig) {
    throw new Error(`Can not find icon config from ${iconName}. Please provide default config.`);
  }
  return matchedConfig;
};
const findIconConfiguration = (iconName, globalIconConfig, namesToIgnore = []) => {
  if (!iconName) {
    return;
  }
  const matchedIconConfiguration = findMatchedIconConfiguration(iconName, globalIconConfig, namesToIgnore);
  const resolvedIconConfiguration = merge_1(resolveIconConfiguration(iconName, matchedIconConfiguration), matchedIconConfiguration);
  namesToIgnore = [...namesToIgnore, matchedIconConfiguration.name.toString()];
  return merge_1(
    findIconConfiguration(resolvedIconConfiguration.to, globalIconConfig, namesToIgnore),
    resolvedIconConfiguration
  );
};
const iconPropsFromIconConfiguration = (iconConfiguration) => {
  const junkKeys = ["name", "to", "resolve", "resolveFromRegex"];
  const configuration = iconConfiguration;
  junkKeys.forEach((key) => {
    delete configuration[key];
  });
  return configuration;
};
const getIconConfiguration = (name, iconConfig) => {
  const configuration = findIconConfiguration(name, iconConfig);
  if (configuration === void 0) {
    return {};
  }
  return iconPropsFromIconConfiguration(configuration);
};
const useIcon = () => {
  const { globalConfig } = useGlobalConfig();
  return {
    getIcon: (name) => getIconConfiguration(name, globalConfig.value.icons)
  };
};
const GlobalConfigPlugin = defineVuesticPlugin((config) => ({
  install(app2) {
    const globalConfig = createGlobalConfig();
    if (config) {
      globalConfig.mergeGlobalConfig(config);
    }
    if (config == null ? void 0 : config.componentsAll) {
      console.warn("Global config -> `componentsAll` was moved to Global config -> components.all. Please replace this to make it work. More info here: https://github.com/epicmaxco/vuestic-ui/issues/1967");
    }
    app2.provide(GLOBAL_CONFIG, globalConfig);
    defineGlobalProperty(app2, "$vaConfig", globalConfig);
  }
}));
const createColorConfigPlugin = (app2, config) => {
  var _a;
  const { colors: configColors, getTextColor, getColor, currentPresetName, applyPreset } = useColors();
  const renderCSSVariables = (colors = configColors) => {
    if (!colors) {
      return;
    }
    const colorNames = Object.keys(colors);
    return colorNames.map((key) => `${cssVariableName(key)}: ${colors[key]}`).join(";");
  };
  const updateColors = (newValue) => {
    if (!newValue) {
      return;
    }
    {
      return;
    }
  };
  watch(configColors, (newValue) => {
  }, { immediate: true, deep: true });
  if ((_a = config == null ? void 0 : config.colors) == null ? void 0 : _a.currentPresetName) {
    applyPreset(config.colors.currentPresetName);
  }
  return {
    renderCSSVariables,
    updateColors
  };
};
const ColorConfigPlugin = defineVuesticPlugin((config) => ({
  install(app2) {
    defineGlobalProperty(app2, "$vaColorConfig", createColorConfigPlugin(app2, config));
  }
}));
const useClientOnly = (cb) => {
  const isMounted = computed(isClient);
  const result = ref(null);
  watch(isMounted, () => {
    if (isMounted.value) {
      result.value = cb();
    }
  }, { immediate: true });
  return result;
};
const useDocument = () => useClientOnly(() => document);
const useWindow = () => useClientOnly(() => window);
const useEvent = (event, listener, target) => {
  const source = target && typeof target !== "boolean" ? target : useWindow();
  const capture = typeof target === "boolean" ? target : false;
  watch(source, (newValue, oldValue) => {
    var _a, _b;
    if (!Array.isArray(event)) {
      (_a = unref(newValue)) == null ? void 0 : _a.addEventListener(event, listener, capture);
      (_b = unref(oldValue)) == null ? void 0 : _b.removeEventListener(event, listener, capture);
    } else {
      event.forEach((e) => {
        var _a2, _b2;
        (_a2 = unref(newValue)) == null ? void 0 : _a2.addEventListener(e, listener, capture);
        (_b2 = unref(oldValue)) == null ? void 0 : _b2.removeEventListener(e, listener, capture);
      });
    }
  }, { immediate: true });
};
function useWindowSize() {
  const windowSizes = reactive({
    width: void 0,
    height: void 0
  });
  const setCurrentWindowSizes = () => {
    windowSizes.width = window == null ? void 0 : window.innerWidth;
    windowSizes.height = window == null ? void 0 : window.innerHeight;
  };
  const isMounted = computed(isClient);
  watch(isMounted, (newValue) => {
    if (!newValue) {
      return;
    }
    setCurrentWindowSizes();
  }, { immediate: true });
  useEvent("resize", setCurrentWindowSizes, true);
  return { windowSizes };
}
const getRandomString = (stringLength = 4) => {
  return Math.random().toString(36).substring(2, stringLength + 2);
};
const generateUniqueId = () => {
  return `${getRandomString(8)}-${getRandomString(4)}-${getRandomString(4)}`;
};
const createBreakpointConfigPlugin = (app2) => {
  var _a;
  const globalConfig = (_a = getGlobalProperty$1(app2, "$vaConfig")) == null ? void 0 : _a.globalConfig;
  if (!globalConfig) {
    warn("createBreakpointConfigPlugin: globalConfig is not defined!");
    return {};
  }
  const breakpointConfig = computed(() => {
    const breakpoint = globalConfig.value.breakpoint;
    if (!breakpoint) {
      warn("createBreakpointConfigPlugin: breakpointConfig is not defined!");
    }
    return breakpoint != null ? breakpoint : {};
  });
  if (!breakpointConfig.value.enabled) {
    return {};
  }
  if (!breakpointConfig.value.thresholds || !Object.values(breakpointConfig.value.thresholds).length) {
    warn("createBreakpointConfigPlugin: there are no defined thresholds!");
    return {};
  }
  const { windowSizes } = useWindowSize();
  const isMounted = computed(isClient);
  const currentBreakpoint = computed(() => {
    if (!isMounted.value || !windowSizes.width) {
      return;
    }
    return Object.entries(breakpointConfig.value.thresholds).reduce((acc, [key, value]) => {
      if (windowSizes.width >= value) {
        acc = key;
      }
      return acc;
    }, "xs");
  });
  const screenClasses = computed(() => Object.keys(breakpointConfig.value.thresholds).reduce((acc, threshold) => {
    acc[threshold] = `va-screen-${threshold}`;
    return acc;
  }, {}));
  const uniqueId2 = computed(generateUniqueId);
  addOrUpdateStyleElement(`va-helpers-media-${uniqueId2.value}`);
  const getDocument = useDocument();
  watch(currentBreakpoint, (newValue) => {
    if (!newValue || !breakpointConfig.value.bodyClass || !getDocument.value) {
      return;
    }
    getDocument.value.body.classList.forEach((className) => {
      if (Object.values(screenClasses.value).includes(className)) {
        getDocument.value.body.classList.remove(className);
      }
    });
    getDocument.value.body.classList.add(screenClasses.value[newValue]);
  }, { immediate: true });
  const breakpointHelpers = computed(() => {
    const isXs = currentBreakpoint.value === "xs";
    const isSm = currentBreakpoint.value === "sm";
    const isMd = currentBreakpoint.value === "md";
    const isLg = currentBreakpoint.value === "lg";
    const isXl = currentBreakpoint.value === "xl";
    return {
      xs: isXs,
      sm: isSm,
      md: isMd,
      lg: isLg,
      xl: isXl,
      smUp: isSm || isMd || isLg || isXl,
      mdUp: isMd || isLg || isXl,
      lgUp: isLg || isXl,
      smDown: isXs || isSm,
      mdDown: isXs || isSm || isMd,
      lgDown: isXs || isSm || isMd || isLg
    };
  });
  return useReactiveComputed(() => ({
    width: windowSizes.width,
    height: windowSizes.height,
    current: currentBreakpoint.value,
    thresholds: breakpointConfig.value.thresholds,
    ...breakpointHelpers.value
  }));
};
const BreakpointConfigPlugin = defineVuesticPlugin(() => ({
  install(app2) {
    const breakpointConfig = createBreakpointConfigPlugin(app2);
    app2.provide(vaBreakpointSymbol, breakpointConfig);
    defineGlobalProperty(app2, "$vaBreakpoint", breakpointConfig);
  }
}));
const LocalConfigKey = "VaLocalConfig";
const CONFIGS_DEFAULT = computed(() => []);
function useLocalConfig() {
  return inject$1(LocalConfigKey, CONFIGS_DEFAULT);
}
function provideLocalConfig(config) {
  provide(LocalConfigKey, config);
}
const useComponentConfigProps = (component, originalProps) => {
  const localConfig = useLocalConfig();
  const { globalConfig } = useGlobalConfig();
  const instancePreset = computed(() => originalProps.preset);
  const getPresetProps = (presetName) => {
    var _a, _b, _c;
    return (_c = (_b = (_a = globalConfig.value.components) == null ? void 0 : _a.presets) == null ? void 0 : _b[component.name]) == null ? void 0 : _c[presetName];
  };
  return computed(() => {
    var _a, _b;
    const globalConfigProps = {
      ...(_a = globalConfig.value.components) == null ? void 0 : _a.all,
      ...(_b = globalConfig.value.components) == null ? void 0 : _b[component.name]
    };
    const localConfigProps = localConfig.value.reduce(
      (finalConfig, config) => config[component.name] ? { ...finalConfig, ...config[component.name] } : finalConfig,
      {}
    );
    const presetName = instancePreset.value || localConfigProps.preset || globalConfigProps.preset;
    const presetProps = presetName && getPresetProps(presetName);
    return { ...globalConfigProps, ...localConfigProps, ...presetProps };
  });
};
const toCamelCase = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
const findCamelCased = (obj, key) => {
  const found = Object.keys(obj).find((k) => toCamelCase(k) === key);
  return found && obj[found];
};
const createPropsWithCustomConfig = (instance, propsFromConfig) => {
  const instanceProps = instance.props;
  return new Proxy(instanceProps, {
    get: (target, key) => {
      var _a;
      if (typeof key !== "string") {
        return target[key];
      }
      const incomingProps = instance.vnode.props || {};
      const originalProp = target[key];
      const propFromConfig = (_a = propsFromConfig.value) == null ? void 0 : _a[key];
      const incomingProp = findCamelCased(incomingProps, key);
      if (incomingProp !== void 0) {
        return originalProp;
      }
      if (propFromConfig !== void 0) {
        return propFromConfig;
      }
      return originalProp;
    }
  });
};
const patchInstanceProps = (instance, props) => {
  instance.props = props;
};
const createProxyComponent = (component) => {
  const customSetup = (originalProps, ctx) => {
    var _a;
    const instance = getCurrentInstance();
    const propsFromConfig = useComponentConfigProps(component, originalProps);
    const props = createPropsWithCustomConfig(instance, propsFromConfig);
    patchInstanceProps(instance, props);
    return (_a = component.setup) == null ? void 0 : _a.call(component, shallowReadonly(props), ctx);
  };
  return new Proxy(component, {
    get(target, key) {
      if (key === "setup") {
        return customSetup;
      }
      return target[key];
    }
  });
};
const CLASS_COMPONENT_KEY = "__c";
const patchClassComponent = (component) => {
  component[CLASS_COMPONENT_KEY] = createProxyComponent(component[CLASS_COMPONENT_KEY]);
  return component;
};
const withConfigTransport = (component) => {
  if ("setup" in component) {
    return createProxyComponent(component);
  } else if (CLASS_COMPONENT_KEY in component) {
    return patchClassComponent(component);
  } else {
    component.setup = () => ({});
    return createProxyComponent(component);
  }
};
const useComponentPresetProp = {
  preset: {
    type: String,
    default: void 0
  }
};
const useTextColor = (componentColor, isTransparent = false) => {
  const { props } = getCurrentInstance();
  const { getColor, getTextColor } = useColors();
  const textColorComputed = computed(() => {
    if (props.textColor) {
      return getColor(props.textColor);
    }
    const componentColorHex = getColor(unref(componentColor) || props.color);
    return unref(isTransparent) ? componentColorHex : getColor(getTextColor(componentColorHex));
  });
  return { textColorComputed };
};
const useTimer = () => {
  let timer;
  const start = (...args) => {
    timer = window.setTimeout(...args);
    return timer;
  };
  const clear = () => timer && window.clearTimeout(timer);
  return {
    start,
    clear
  };
};
const applyI18nTemplate = (key, values) => {
  if (!values) {
    return key;
  }
  Object.keys(values).forEach((valueKey) => {
    key = key.replace(`{${valueKey}}`, String(values[valueKey]));
  });
  return key;
};
const useTranslation = () => {
  const { globalConfig } = useGlobalConfig();
  const config = computed(() => globalConfig.value.i18n);
  return {
    tp: (key) => {
      if (!key) {
        return void 0;
      }
      if (key.startsWith("$t:")) {
        return config.value[key.slice(3)] || key;
      }
      return key;
    },
    t(key, values) {
      const translated = config.value[key];
      if (!translated) {
        warn(`${key} not found in VuesticUI i18n config`);
        return key;
      }
      return applyI18nTemplate(translated, values) || key;
    }
  };
};
const sizesConfig = {
  defaultSize: 48,
  sizes: {
    small: 32,
    medium: 48,
    large: 64
  }
};
const fontSizesConfig = {
  defaultSize: 1,
  sizes: {
    small: 0.75,
    medium: 1,
    large: 1.25
  }
};
const useSizeProps = {
  size: {
    type: [String, Number],
    default: "",
    validator: (size) => {
      return typeof size === "string" || typeof size === "number";
    }
  },
  sizesConfig: {
    type: Object,
    default: () => sizesConfig
  },
  fontSizesConfig: {
    type: Object,
    default: () => fontSizesConfig
  }
};
const fontRegex = /(?<fontSize>\d+)(?<extension>px|rem)/i;
const convertToRem = (px) => px / 16 - 0.5;
const useSize = (props, componentName = ((_a) => (_a = getCurrentInstance()) == null ? void 0 : _a.type.name)()) => {
  const { getGlobalConfig } = useGlobalConfig();
  const sizesConfigGlobal = computed(() => {
    var _a2, _b;
    return componentName ? (_b = (_a2 = getGlobalConfig().components) == null ? void 0 : _a2[componentName]) == null ? void 0 : _b.sizesConfig : void 0;
  });
  const sizeComputed = computed(() => {
    var _a2, _b, _c;
    const { defaultSize, sizes } = props.sizesConfig;
    const defaultSizeGlobal = (_a2 = sizesConfigGlobal.value) == null ? void 0 : _a2.defaultSize;
    if (!props.size) {
      return `${defaultSizeGlobal || defaultSize}px`;
    }
    if (typeof props.size === "string") {
      const sizeFromGlobalConfig = (_c = (_b = sizesConfigGlobal.value) == null ? void 0 : _b.sizes) == null ? void 0 : _c[props.size];
      const sizeFromProps = sizes[props.size];
      if (sizeFromGlobalConfig) {
        return `${sizeFromGlobalConfig}px`;
      }
      if (sizeFromProps) {
        return `${sizeFromProps}px`;
      }
      return props.size;
    }
    return `${props.size}px`;
  });
  const fontSizeInRem = computed(() => {
    const { defaultSize, sizes } = props.fontSizesConfig;
    if (!props.size) {
      return defaultSize;
    }
    if (typeof props.size === "string") {
      if (props.size in sizes) {
        return sizes[props.size];
      }
      const fontSizeParsed = props.size.match(fontRegex);
      if (!fontSizeParsed || !fontSizeParsed.groups) {
        throw new Error("Size prop should be either valid string or number");
      }
      const { extension, fontSize } = fontSizeParsed.groups;
      return extension === "rem" ? +fontSize : convertToRem(+fontSize);
    }
    return convertToRem(props.size);
  });
  const fontSizeComputed = computed(() => `${fontSizeInRem.value}rem`);
  return {
    sizeComputed,
    fontSizeComputed,
    fontSizeInRem
  };
};
var _export_sfc$1 = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  name: "VaIcon",
  props: {
    ...useSizeProps,
    ...useComponentPresetProp,
    name: { type: String, default: "" },
    tag: { type: String },
    component: { type: Object },
    color: { type: String },
    rotation: { type: [String, Number] },
    spin: { type: [String, Boolean] },
    flip: {
      type: String,
      default: "off",
      validator: (value) => ["off", "horizontal", "vertical", "both"].includes(value)
    }
  },
  setup(props, { attrs }) {
    const { getColor } = useColors();
    const { sizeComputed } = useSize(props);
    const { getIcon } = useIcon();
    const iconConfig = computed(() => getIcon(props.name));
    const computedTag = computed(() => props.component || props.tag || iconConfig.value.component || iconConfig.value.tag || "i");
    const computedAttrs = computed(() => ({ ...iconConfig.value.attrs, ...omit_1(attrs, ["class"]) }));
    const getSpinClass = (spin) => {
      if (spin === void 0 || spin === false) {
        return;
      }
      return spin === "counter-clockwise" ? "va-icon--spin-reverse" : "va-icon--spin";
    };
    const computedClass = computed(() => {
      var _a;
      return [
        iconConfig.value.class,
        getSpinClass((_a = props.spin) != null ? _a : iconConfig.value.spin)
      ];
    });
    const transformStyle = computed(() => {
      const rotation = props.rotation ? `rotate(${props.rotation}deg)` : "";
      const flipY = props.flip === "vertical" || props.flip === "both" ? -1 : 1;
      const flipX = props.flip === "horizontal" || props.flip === "both" ? -1 : 1;
      const scale = props.flip === "off" ? "" : `scale(${flipY}, ${flipX})`;
      return `${scale} ${rotation}`.trim();
    });
    const computedStyle = computed(() => ({
      transform: transformStyle.value,
      cursor: attrs.onClick ? "pointer" : null,
      color: props.color ? getColor(props.color, void 0, true) : iconConfig.value.color,
      fontSize: sizeComputed.value,
      height: sizeComputed.value,
      lineHeight: sizeComputed.value
    }));
    const tabindexComputed = computed(() => {
      var _a;
      return (_a = attrs.tabindex) != null ? _a : -1;
    });
    const ariaHiddenComputed = computed(() => attrs.role !== "button" || tabindexComputed.value < 0);
    return {
      iconConfig,
      computedTag,
      computedAttrs,
      computedClass,
      computedStyle,
      ariaHiddenComputed
    };
  }
});
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.computedTag), mergeProps({
    class: ["va-icon", _ctx.computedClass],
    style: _ctx.computedStyle,
    "aria-hidden": _ctx.ariaHiddenComputed,
    notranslate: ""
  }, _ctx.computedAttrs), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default", {}, () => [
        _ctx.iconConfig.content ? (openBlock(), createElementBlock(Fragment$1, { key: 0 }, [
          createTextVNode(toDisplayString(_ctx.iconConfig.content), 1)
        ], 64)) : createCommentVNode("", true)
      ])
    ]),
    _: 3
  }, 16, ["class", "style", "aria-hidden"]);
}
var VaIcon$1 = /* @__PURE__ */ _export_sfc$1(_sfc_main$g, [["render", _sfc_render$b]]);
const VaToastRenderer = /* @__PURE__ */ defineComponent({
  name: "VaToastRenderer",
  props: {
    render: { type: Function, required: true }
  },
  setup: (props) => () => props.render()
});
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  name: "VaToast",
  components: { VaIcon: VaIcon$1, VaToastRenderer },
  emits: ["on-click", "on-close"],
  props: {
    ...useComponentPresetProp,
    title: { type: String, default: "" },
    offsetY: { type: Number, default: 16 },
    offsetX: { type: Number, default: 16 },
    message: { type: [String, Function], default: "" },
    dangerouslyUseHtmlString: { type: Boolean, default: false },
    icon: { type: String, default: "close" },
    customClass: { type: String, default: "" },
    duration: { type: Number, default: 5e3 },
    color: { type: String, default: "" },
    closeable: { type: Boolean, default: true },
    onClose: { type: Function },
    onClick: { type: Function },
    multiLine: { type: Boolean, default: false },
    position: {
      type: String,
      default: "top-right",
      validator: (value) => ["top-right", "top-left", "bottom-right", "bottom-left"].includes(value)
    },
    render: { type: Function }
  },
  setup(props, { emit }) {
    const rootElement = shallowRef();
    const { getColor } = useColors();
    const { textColorComputed } = useTextColor();
    const visible = ref(false);
    const positionX = computed(() => {
      return props.position.includes("right") ? "right" : "left";
    });
    const positionY = computed(() => {
      return props.position.includes("top") ? "top" : "bottom";
    });
    const toastClasses = computed(() => [
      props.customClass,
      props.multiLine ? "va-toast--multiline" : ""
    ]);
    const toastStyles = computed(() => ({
      [positionY.value]: `${props.offsetY}px`,
      [positionX.value]: `${props.offsetX}px`,
      backgroundColor: getColor(props.color),
      color: textColorComputed.value
    }));
    const computedMessage = computed(() => typeof props.message === "function" ? props.message() : props.message);
    const destroyElement = () => {
      var _a, _b;
      (_a = rootElement.value) == null ? void 0 : _a.removeEventListener("transitionend", destroyElement);
      (_b = rootElement.value) == null ? void 0 : _b.remove();
    };
    const onToastClick = () => {
      if (typeof props.onClick === "function") {
        props.onClick();
      } else {
        emit("on-click");
      }
    };
    const onToastClose = () => {
      var _a;
      visible.value = false;
      (_a = rootElement.value) == null ? void 0 : _a.addEventListener("transitionend", destroyElement);
      if (typeof props.onClose === "function") {
        props.onClose();
      } else {
        emit("on-close");
      }
    };
    const timer = useTimer();
    const clearTimer = timer.clear;
    const startTimer = () => {
      if (props.duration > 0) {
        timer.start(() => visible.value && onToastClose(), props.duration);
      }
    };
    return {
      ...useTranslation(),
      visible,
      toastClasses,
      toastStyles,
      computedMessage,
      onToastClick,
      onToastClose,
      startTimer,
      clearTimer
    };
  }
});
const _hoisted_1$6 = ["role"];
const _hoisted_2$3 = { class: "va-toast__group" };
const _hoisted_3$2 = ["textContent"];
const _hoisted_4$1 = { class: "va-toast__content" };
const _hoisted_5$1 = ["innerHTML"];
const _hoisted_6$1 = ["textContent"];
const _hoisted_7$1 = {
  key: 1,
  class: "va-toast__content"
};
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VaToastRenderer = resolveComponent("VaToastRenderer");
  const _component_va_icon = resolveComponent("va-icon");
  return openBlock(), createBlock(Transition, { name: "va-toast-fade" }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        ref: "rootElement",
        role: _ctx.$props.closeable ? "alertdialog" : "alert",
        class: normalizeClass(["va-toast", _ctx.toastClasses]),
        style: normalizeStyle(_ctx.toastStyles),
        onMouseenter: _cache[0] || (_cache[0] = (...args) => _ctx.clearTimer && _ctx.clearTimer(...args)),
        onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.startTimer && _ctx.startTimer(...args)),
        onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onToastClick && _ctx.onToastClick(...args))
      }, [
        createElementVNode("div", _hoisted_2$3, [
          _ctx.$props.title ? (openBlock(), createElementBlock("h2", {
            key: 0,
            class: "va-toast__title",
            textContent: toDisplayString(_ctx.$props.title)
          }, null, 8, _hoisted_3$2)) : createCommentVNode("", true),
          withDirectives(createElementVNode("div", _hoisted_4$1, [
            _ctx.$props.dangerouslyUseHtmlString ? (openBlock(), createElementBlock("div", {
              key: 0,
              innerHTML: _ctx.computedMessage
            }, null, 8, _hoisted_5$1)) : (openBlock(), createElementBlock("p", {
              key: 1,
              textContent: toDisplayString(_ctx.computedMessage)
            }, null, 8, _hoisted_6$1))
          ], 512), [
            [vShow, _ctx.$props.message]
          ]),
          _ctx.$props.render ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
            createVNode(_component_VaToastRenderer, {
              render: _ctx.$props.render
            }, null, 8, ["render"])
          ])) : createCommentVNode("", true),
          _ctx.$props.closeable ? (openBlock(), createBlock(_component_va_icon, {
            key: 2,
            class: "va-toast__close-icon",
            role: "button",
            "aria-label": _ctx.t("closeToast"),
            tabindex: "0",
            size: "small",
            name: _ctx.$props.icon,
            onClick: withModifiers(_ctx.onToastClose, ["stop"]),
            onKeydown: withKeys(withModifiers(_ctx.onToastClose, ["stop"]), ["enter"])
          }, null, 8, ["aria-label", "name", "onClick", "onKeydown"])) : createCommentVNode("", true)
        ])
      ], 46, _hoisted_1$6), [
        [vShow, _ctx.visible]
      ])
    ]),
    _: 1
  });
}
var _VaToast = /* @__PURE__ */ _export_sfc$1(_sfc_main$f, [["render", _sfc_render$a]]);
const VaToast = withConfigTransport(_VaToast);
const GAP = 5;
let seed = 1;
getGlobal().vaToastInstances = [];
const getTranslateValue = (item, position) => {
  if (item.el) {
    const direction = position.includes("bottom") ? -1 : 1;
    return (item.el.offsetHeight + GAP) * direction;
  }
  return 0;
};
const getNewTranslateValue = (transformY, redundantHeight, position) => {
  const direction = position.includes("bottom") ? -1 : 1;
  return parseInt(transformY, 10) - (redundantHeight + GAP) * direction;
};
const getNodeProps$1 = (vNode) => {
  var _a;
  return ((_a = vNode.component) == null ? void 0 : _a.props) || {};
};
const closeNotification = (targetInstance, destroyElementFn) => {
  var _a;
  if (!targetInstance) {
    return;
  }
  if (!getGlobal().vaToastInstances.length) {
    seed = 1;
    return;
  }
  const targetInstanceIndex = getGlobal().vaToastInstances.findIndex((instance) => instance === targetInstance);
  if (targetInstanceIndex < 0) {
    return;
  }
  const nodeProps = getNodeProps$1(targetInstance);
  const {
    offsetX: targetOffsetX,
    offsetY: targetOffsetY,
    position: targetPosition
  } = nodeProps;
  const redundantHeight = (_a = targetInstance.el) == null ? void 0 : _a.offsetHeight;
  destroyElementFn();
  getGlobal().vaToastInstances = getGlobal().vaToastInstances.reduce((acc, instance, index2) => {
    if (instance === targetInstance) {
      return acc;
    }
    if (instance.component) {
      const { offsetX, offsetY, position } = getNodeProps$1(instance);
      const isNextInstance = index2 > targetInstanceIndex && targetOffsetX === offsetX && targetOffsetY === offsetY && targetPosition === position;
      if (isNextInstance && instance.el && redundantHeight) {
        const [_, transformY] = instance.el.style.transform.match(/[\d-]+(?=px)/g);
        const transformYNew = getNewTranslateValue(transformY, redundantHeight, position);
        instance.el.style.transform = `translate(0, ${transformYNew}px)`;
      }
    }
    return [...acc, instance];
  }, []);
  if (!getGlobal().vaToastInstances.length) {
    seed = 1;
  }
};
const destroy$1 = (el, node) => {
  if (el) {
    render(null, el);
    el.remove();
  }
  el = null;
};
const mount$1 = (component, {
  props,
  children,
  element,
  appContext
} = {}) => {
  let el = element;
  let vNode;
  const onClose = () => {
    closeNotification(vNode, () => destroy$1(el));
    if (props == null ? void 0 : props.onClose) {
      props.onClose();
    }
  };
  vNode = createVNode(component, { ...props, onClose }, children);
  if (appContext) {
    vNode.appContext = appContext;
  }
  if (el) {
    render(vNode, el);
  }
  return { vNode, el };
};
const closeAllNotifications = (appContext) => {
  if (!getGlobal().vaToastInstances.length) {
    seed = 1;
    return;
  }
  getGlobal().vaToastInstances.forEach((instance) => {
    if (appContext && instance.appContext !== appContext) {
      return;
    }
    getNodeProps$1(instance).onClose();
  });
};
const closeById = (id) => {
  const targetInstance = getGlobal().vaToastInstances.find((instance) => {
    var _a;
    return ((_a = instance.el) == null ? void 0 : _a.id) === id;
  });
  if (targetInstance) {
    const nodeProps = getNodeProps$1(targetInstance);
    nodeProps.onClose();
  }
};
const getToastOptions = (options) => {
  if (typeof options === "string") {
    return {
      message: options
    };
  }
  return options;
};
const createToastInstance = (customProps, appContext) => {
  const { vNode, el } = mount$1(VaToast, { appContext, props: getToastOptions(customProps) });
  const nodeProps = getNodeProps$1(vNode);
  if (el && vNode.el && nodeProps) {
    document.body.appendChild(el.childNodes[0]);
    const { offsetX, offsetY, position } = nodeProps;
    vNode.el.style.display = "flex";
    vNode.el.id = "notification_" + seed;
    let transformY = 0;
    getGlobal().vaToastInstances.filter((item) => {
      const {
        offsetX: itemOffsetX,
        offsetY: itemOffsetY,
        position: itemPosition
      } = getNodeProps$1(item);
      return itemOffsetX === offsetX && itemOffsetY === offsetY && position === itemPosition;
    }).forEach((item) => {
      transformY += getTranslateValue(item, position);
    });
    vNode.el.style.transform = `translate(0, ${transformY}px)`;
    seed += 1;
    getGlobal().vaToastInstances.push(vNode);
    return vNode.el.id;
  }
  return null;
};
const createVaToastPlugin = (app2) => ({
  init(options) {
    return createToastInstance(options, app2 == null ? void 0 : app2._context);
  },
  close(id) {
    closeById(id);
  },
  closeAll(allApps = false) {
    closeAllNotifications(allApps ? void 0 : app2 == null ? void 0 : app2._context);
  }
});
const VaToastPlugin = defineVuesticPlugin(() => ({
  install(app2) {
    defineGlobalProperty(app2, "$vaToast", createVaToastPlugin(app2));
  }
}));
const vaDropdownPlugin = {
  closeDropdown() {
    let vm = this;
    while (vm = vm.$parent) {
      const name = vm.$options.name;
      if (name === "VaDropdown") {
        vm.hide();
        break;
      }
    }
  }
};
const VaDropdownPlugin = defineVuesticPlugin(() => ({
  install(app2) {
    defineGlobalProperty(app2, "$closeDropdown", vaDropdownPlugin.closeDropdown);
    defineGlobalProperty(app2, "$vaDropdown", vaDropdownPlugin);
  }
}));
const modalsStack = shallowReactive([]);
const useModalLevel = () => {
  const modalId = uniqueId_1();
  const modalLevel = computed(
    () => modalsStack.findIndex(({ id }) => id === modalId)
  );
  const registerModal = () => {
    if (modalLevel.value !== -1) {
      return;
    }
    modalsStack.push({
      id: modalId
    });
  };
  const unregisterModal = () => {
    if (modalLevel.value === -1) {
      return;
    }
    modalsStack.splice(modalLevel.value, 1);
  };
  const isTopLevelModal = computed(
    () => modalLevel.value !== -1 && modalLevel.value === modalsStack.length - 1
  );
  const isLowestLevelModal = computed(
    () => modalLevel.value === 0
  );
  const isMoreThenOneModalOpen = computed(() => modalsStack.length > 1);
  return {
    modalId,
    modalLevel,
    registerModal,
    unregisterModal,
    isTopLevelModal,
    isLowestLevelModal,
    isMoreThenOneModalOpen
  };
};
const useStatefulProps = {
  stateful: { type: Boolean, default: false },
  modelValue: { type: void 0 }
};
const useStatefulEmits = ["update:modelValue"];
const useStateful = (props, emit, key = "modelValue", options = {}) => {
  const { defaultValue, eventName } = options;
  const event = eventName || `update:${key.toString()}`;
  const valueState = ref(defaultValue === void 0 ? props[key] : defaultValue);
  let unwatchModelValue;
  const watchModelValue = () => {
    unwatchModelValue = watch(() => props[key], (modelValue) => {
      valueState.value = modelValue;
    });
  };
  watch(() => props.stateful, (stateful) => {
    stateful ? watchModelValue() : unwatchModelValue == null ? void 0 : unwatchModelValue();
  }, { immediate: true });
  const valueComputed = computed({
    get: () => {
      if (props.stateful) {
        return valueState.value;
      }
      return props[key];
    },
    set: (value) => {
      if (props.stateful) {
        valueState.value = value;
      }
      emit(event, value);
    }
  });
  return { valueComputed };
};
const FOCUSABLE_ELEMENTS_SELECTOR = ":where(a, button, input, textarea, select):not([disabled]), *[tabindex]";
let trapInEl = null;
const useTrapFocus = () => {
  const document2 = useDocument();
  const window2 = useWindow();
  let focusableElements = [];
  let firstFocusableElement = null;
  let lastFocusableElement = null;
  let isFocusTrapped = false;
  const focusFirstElement = () => {
    firstFocusableElement == null ? void 0 : firstFocusableElement.focus();
  };
  const focusLastElement = () => {
    lastFocusableElement == null ? void 0 : lastFocusableElement.focus();
  };
  const onKeydown = (evt) => {
    var _a, _b;
    const isTabPressed = evt.code === "Tab";
    const isShiftPressed = evt.shiftKey;
    if (!isTabPressed) {
      return;
    }
    if (!isFocusTrapped) {
      isFocusTrapped = true;
      evt.preventDefault();
      isShiftPressed ? focusLastElement() : focusFirstElement();
      return;
    }
    if (((_a = document2.value) == null ? void 0 : _a.activeElement) === lastFocusableElement && !isShiftPressed) {
      evt.preventDefault();
      focusFirstElement();
      return;
    }
    if (((_b = document2.value) == null ? void 0 : _b.activeElement) === firstFocusableElement && isShiftPressed) {
      evt.preventDefault();
      focusLastElement();
    }
  };
  const trapFocusIn = (el) => {
    trapInEl = el;
    freeFocus();
    trapFocus();
  };
  const trapFocus = () => {
    var _a;
    if (!trapInEl) {
      return;
    }
    focusableElements = Array.from(trapInEl.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR));
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
    (_a = window2.value) == null ? void 0 : _a.addEventListener("keydown", onKeydown);
  };
  const freeFocus = () => {
    var _a;
    focusableElements = [];
    firstFocusableElement = null;
    lastFocusableElement = null;
    isFocusTrapped = false;
    (_a = window2.value) == null ? void 0 : _a.removeEventListener("keydown", onKeydown);
  };
  return {
    trapFocus,
    freeFocus,
    trapFocusIn
  };
};
const useBem = (prefix, modifiers) => {
  if (__DEV__ && !prefix) {
    console.warn('You must pass the @param "prefix" to the useBem hook!');
  }
  const modifiersList = computed(() => isFunction_1(modifiers) ? modifiers() : unref(modifiers));
  const computedBemClassesObject = computed(() => {
    return Object.entries(unref(modifiersList)).reduce((classesObj, [modifierName, value]) => {
      if (value) {
        classesObj[`${prefix}--${kebabCase_1(modifierName)}`] = true;
      }
      return classesObj;
    }, {});
  });
  const computedBemClassesArray = computed(() => Object.keys(computedBemClassesObject.value));
  const computedBemClassesString = computed(() => computedBemClassesArray.value.join(" "));
  return new Proxy({}, {
    ownKeys() {
      return Reflect.ownKeys(computedBemClassesObject.value);
    },
    getOwnPropertyDescriptor(_, key) {
      return Reflect.getOwnPropertyDescriptor(computedBemClassesObject.value, key);
    },
    get(_, key, receiver) {
      switch (key) {
        case "asArray":
          return computedBemClassesArray;
        case "asString":
          return computedBemClassesString;
        case "asObject":
          return computedBemClassesObject;
        default:
          return Reflect.get(computedBemClassesObject.value, key, receiver);
      }
    }
  });
};
const unwrapEl = (el) => {
  if (!el) {
    return;
  }
  if ("$el" in el) {
    return el.$el;
  }
  return el;
};
const focusElement = (el) => {
  if (!el) {
    return;
  }
  el.focus();
  el.dispatchEvent(new Event("focus", { bubbles: true }));
};
const blurElement = (el) => {
  if (!el) {
    return;
  }
  el.blur();
  el.dispatchEvent(new Event("blur", { bubbles: true }));
};
function useFocus(el, emit) {
  const isFocused = ref(false);
  const onFocus = (e) => {
    isFocused.value = true;
    emit == null ? void 0 : emit("focus", e);
  };
  const onBlur = (e) => {
    isFocused.value = false;
    emit == null ? void 0 : emit("blur", e);
  };
  const focus = () => {
    if (!(el == null ? void 0 : el.value)) {
      return;
    }
    focusElement(unwrapEl(el == null ? void 0 : el.value));
  };
  const blur = () => {
    if (!(el == null ? void 0 : el.value)) {
      return;
    }
    blurElement(unwrapEl(el == null ? void 0 : el.value));
  };
  return {
    isFocused,
    onFocus,
    onBlur,
    focus,
    blur
  };
}
function useHover(el, disabled) {
  const isHovered = ref(false);
  const onMouseEnter = () => {
    isHovered.value = true;
  };
  const onMouseLeave = () => {
    isHovered.value = false;
  };
  disabled && watch(disabled, (v) => {
    if (v) {
      isHovered.value = false;
    }
  });
  return { isHovered, onMouseEnter, onMouseLeave };
}
const useHoverStyleProps = {
  hoverBehavior: {
    type: String,
    default: "mask",
    validator: (value) => ["opacity", "mask"].includes(value)
  },
  hoverOpacity: { type: Number, default: 0.15 },
  hoverMaskColor: { type: String, default: "textInverted" }
};
const useLoadingProps = {
  loading: { type: Boolean, default: false }
};
function usePressed(el) {
  const isPressed = ref(false);
  const onMouseDown = () => {
    isPressed.value = true;
  };
  const onMouseUp = () => {
    isPressed.value = false;
  };
  return { isPressed, onMouseDown, onMouseUp };
}
const usePressedStyleProps = {
  pressedBehavior: {
    type: String,
    default: "mask",
    validator: (value) => ["opacity", "mask"].includes(value)
  },
  pressedOpacity: { type: Number, default: 0.13 },
  pressedMaskColor: { type: String, default: "textPrimary" }
};
const useRouterLinkProps = {
  tag: { type: String, default: "span" },
  to: { type: [String, Object], default: "" },
  replace: { type: Boolean, default: false },
  append: { type: Boolean, default: false },
  exact: { type: Boolean, default: false },
  activeClass: { type: String, default: "" },
  exactActiveClass: { type: String, default: "" },
  href: { type: String, default: "" },
  target: { type: String, default: "" },
  disabled: { type: Boolean, default: false }
};
const useRouterLink = (props) => {
  const globalProperties = computed(() => {
    var _a;
    return (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.config.globalProperties;
  });
  computed(() => {
    var _a;
    return !!((_a = globalProperties.value) == null ? void 0 : _a.$nuxt);
  });
  const vueRouter = computed(() => {
    var _a;
    return (_a = globalProperties.value) == null ? void 0 : _a.$router;
  });
  const vueRoute = computed(() => {
    var _a;
    return (_a = globalProperties.value) == null ? void 0 : _a.$route;
  });
  const tagComputed = computed(() => {
    if (props.disabled) {
      return props.tag;
    }
    if (props.href && !props.to) {
      return "a";
    }
    if (props.to) {
      return "router-link";
    }
    return props.tag || "div";
  });
  const isLinkTag = computed(() => ["a", "router-link", "nuxt-link"].includes(tagComputed.value));
  const linkAttributesComputed = computed(() => {
    if (!isLinkTag.value) {
      return {};
    }
    return tagComputed.value === "a" ? {
      target: props.target,
      href: hrefComputed.value
    } : {
      target: props.target,
      to: props.to,
      replace: props.replace,
      append: props.append,
      activeClass: props.activeClass,
      exact: props.exact,
      exactActiveClass: props.exactActiveClass
    };
  });
  const isActiveRouterLink = computed(() => {
    if (!vueRouter.value || !props.to) {
      return false;
    }
    const to = vueRouter.value.resolve(props.to).href;
    const currentHref = vueRouter.value.currentRoute.value.path;
    return to.replace("#", "") === currentHref.replace("#", "");
  });
  const hrefComputed = computed(() => {
    var _a;
    return props.href || (props.to ? (_a = vueRouter.value) == null ? void 0 : _a.resolve(props.to, vueRoute.value).href : "");
  });
  return {
    isLinkTag,
    tagComputed,
    hrefComputed,
    isActiveRouterLink,
    linkAttributesComputed
  };
};
const checkSlotChildrenDeep = (v, initial = true) => {
  var _a;
  if (!v || initial && (!isFunction_1(v) || !((_a = v()) == null ? void 0 : _a.length))) {
    return false;
  }
  const slotData = initial ? v() : v;
  if (Array.isArray(slotData)) {
    return slotData.some((el) => {
      return Array.isArray(el.children) ? checkSlotChildrenDeep(el.children, false) : el.children || el.props;
    });
  }
  return !!slotData.children;
};
const useSlotPassed = (name = "default") => {
  const { slots } = getCurrentInstance();
  return computed(() => checkSlotChildrenDeep(slots[name]));
};
const useButtonBackground = (colorComputed, isPressed, isHovered) => {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("`useButtonBackground` hook must be used only inside of setup function!");
  }
  const props = instance.props;
  const { getColor, getGradientBackground: getGradientBackground2 } = useColors();
  const backgroundColor = computed(() => {
    if (props.plain) {
      return "transparent";
    }
    return props.gradient ? getGradientBackground2(colorComputed.value) : colorComputed.value;
  });
  const hoveredBgState = computed(() => !props.plain && isHovered.value);
  const pressedBgState = computed(() => !props.plain && isPressed.value);
  const backgroundColorOpacity = computed(() => {
    if (pressedBgState.value && props.pressedBehavior === "opacity") {
      return props.pressedOpacity;
    }
    if (hoveredBgState.value && props.hoverBehavior === "opacity") {
      return props.hoverOpacity;
    }
    return props.backgroundOpacity;
  });
  const hoveredMaskState = computed(() => hoveredBgState.value && props.hoverBehavior === "mask");
  const pressedMaskState = computed(() => pressedBgState.value && props.pressedBehavior === "mask");
  const backgroundMaskOpacity = computed(() => {
    if (pressedMaskState.value) {
      return props.pressedOpacity;
    }
    if (hoveredMaskState.value) {
      return props.hoverOpacity;
    }
    return 0;
  });
  const backgroundMaskColor = computed(() => {
    if (pressedMaskState.value) {
      return getColor(props.pressedMaskColor);
    }
    if (hoveredMaskState.value) {
      return getColor(props.hoverMaskColor);
    }
    return "transparent";
  });
  return {
    backgroundColor,
    backgroundColorOpacity,
    backgroundMaskOpacity,
    backgroundMaskColor
  };
};
const useButtonAttributes = (props) => {
  const { linkAttributesComputed, isLinkTag } = useRouterLink(props);
  const typeComputed = computed(() => isLinkTag.value ? void 0 : props.type);
  const buttonAttributesComputed = computed(() => {
    const disabledAttributes = {
      "aria-disabled": !!props.disabled,
      disabled: !!props.disabled
    };
    if (isLinkTag.value) {
      return disabledAttributes;
    }
    return {
      type: typeComputed.value,
      tabindex: props.loading || props.disabled ? -1 : 0,
      ...disabledAttributes
    };
  });
  return computed(() => ({ ...linkAttributesComputed.value, ...buttonAttributesComputed.value }));
};
const getOpacity = (opacity) => {
  {
    return opacity;
  }
};
const useButtonTextColor = (textColorComputed, colorComputed, isPressed, isHovered) => {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("`useButtonTextColor` hook must be used only inside of setup function!");
  }
  const props = instance.props;
  const { getColor, colorToRgba: colorToRgba2, getStateMaskGradientBackground: getStateMaskGradientBackground2 } = useColors();
  const plainColorStyles = computed(() => ({
    background: "transparent",
    color: textColorComputed.value,
    "-webkit-background-clip": "text",
    "background-clip": "text",
    opacity: getPlainTextOpacity.value
  }));
  const getStateColor = (maskColor, stateOpacity, stateBehavior) => {
    const maskStateColor = getColor(maskColor);
    let stateStyles;
    if (stateBehavior === "opacity") {
      stateStyles = { color: colorToRgba2(textColorComputed.value, stateOpacity) };
    } else {
      stateStyles = {
        background: getStateMaskGradientBackground2(colorComputed.value, maskStateColor, stateOpacity),
        color: stateOpacity < 1 ? colorToRgba2(textColorComputed.value, getOpacity(stateOpacity)) : maskStateColor
      };
    }
    return { ...plainColorStyles.value, ...stateStyles };
  };
  const hoverTextColorComputed = computed(() => {
    return getStateColor(props.hoverMaskColor, props.hoverOpacity, props.hoverBehavior);
  });
  const pressedTextColorComputed = computed(() => {
    return getStateColor(props.pressedMaskColor, props.pressedOpacity, props.pressedBehavior);
  });
  const getPlainTextOpacity = computed(() => {
    if (props.disabled) {
      return void 0;
    }
    if (props.textOpacity === 1 || isHovered.value && !isPressed.value) {
      return 1;
    }
    return isPressed.value ? 0.9 : props.textOpacity;
  });
  return computed(() => {
    const defaultColorStyles = {
      color: textColorComputed.value,
      background: "transparent"
    };
    props.plain && Object.assign(defaultColorStyles, plainColorStyles.value, { background: textColorComputed.value });
    if (!props.plain) {
      return defaultColorStyles;
    }
    if (isPressed.value) {
      return pressedTextColorComputed.value;
    }
    if (isHovered.value) {
      return hoverTextColorComputed.value;
    }
    return defaultColorStyles;
  });
};
const VaIcon = withConfigTransport(VaIcon$1);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  name: "VaProgressCircle",
  props: {
    ...useSizeProps,
    ...useComponentPresetProp,
    modelValue: { type: Number, default: 0 },
    indeterminate: { type: Boolean, default: false },
    thickness: { type: Number, default: 0.06 },
    color: { type: String, default: "primary" }
  },
  setup(props) {
    const { getColor } = useColors();
    const { sizeComputed } = useSize(props);
    const cappedThickness = computed(() => clamp_1(props.thickness, 0, 1) / 2 * 100);
    const radius = computed(() => 20 - 20 * cappedThickness.value / 100);
    const dasharray = computed(() => 2 * Math.PI * radius.value);
    const dashoffset = computed(() => dasharray.value * (1 - clamp_1(props.modelValue, 0, 100) / 100));
    const colorComputed = computed(() => getColor(props.color, void 0, true));
    const { t } = useTranslation();
    return {
      infoStyle: computed(() => ({ color: colorComputed.value })),
      rootStyle: computed(() => ({
        width: sizeComputed.value,
        height: sizeComputed.value
      })),
      rootClass: computed(() => ({
        "va-progress-circle--indeterminate": props.indeterminate
      })),
      ariaAttributesComputed: computed(() => ({
        role: "progressbar",
        "aria-label": t("progressState"),
        "aria-valuenow": !props.indeterminate ? props.modelValue : void 0
      })),
      colorComputed,
      radius,
      dasharray,
      dashoffset,
      cappedThickness
    };
  }
});
const _hoisted_1$5 = {
  class: "va-progress-circle__wrapper",
  viewBox: "0 0 40 40"
};
const _hoisted_2$2 = ["r", "stroke", "stroke-width", "stroke-dasharray", "stroke-dashoffset"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    class: ["va-progress-circle", _ctx.rootClass],
    style: _ctx.rootStyle
  }, _ctx.ariaAttributesComputed), [
    (openBlock(), createElementBlock("svg", _hoisted_1$5, [
      createElementVNode("circle", {
        class: "va-progress-circle__overlay",
        cx: "50%",
        cy: "50%",
        r: _ctx.radius,
        fill: "none",
        stroke: _ctx.colorComputed,
        "stroke-width": _ctx.cappedThickness + "%",
        "stroke-dasharray": _ctx.dasharray,
        "stroke-dashoffset": _ctx.dashoffset
      }, null, 8, _hoisted_2$2)
    ])),
    _ctx.$slots.default ? (openBlock(), createElementBlock("div", {
      key: 0,
      style: normalizeStyle(_ctx.infoStyle),
      class: "va-progress-circle__info"
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 4)) : createCommentVNode("", true)
  ], 16);
}
var _VaProgressCircle = /* @__PURE__ */ _export_sfc$1(_sfc_main$e, [["render", _sfc_render$9]]);
const VaProgressCircle = withConfigTransport(_VaProgressCircle);
const __default__ = /* @__PURE__ */ defineComponent({
  name: "VaButton",
  components: { VaIcon, VaProgressCircle },
  props: {
    ...useComponentPresetProp,
    ...useSizeProps,
    ...useHoverStyleProps,
    ...usePressedStyleProps,
    ...useLoadingProps,
    ...useRouterLinkProps,
    tag: { type: String, default: "button" },
    type: { type: String, default: "button" },
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    color: { type: String, default: "primary" },
    textColor: { type: String, default: "" },
    textOpacity: { type: Number, default: 1 },
    backgroundOpacity: { type: Number, default: 1 },
    borderColor: { type: String, default: "" },
    gradient: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    size: {
      type: String,
      default: "medium",
      validator: (v) => ["small", "medium", "large"].includes(v)
    },
    icon: { type: String, default: "" },
    iconRight: { type: String, default: "" },
    iconColor: { type: String, default: "" }
  },
  setup(props) {
    const { getColor } = useColors();
    const colorComputed = computed(() => getColor(props.color));
    const { sizeComputed } = useSize(props);
    const loaderSizeComputed = computed(() => {
      const size = /([0-9]*)(px)/.exec(sizeComputed.value);
      return size ? `${+size[1] / 2}${size[2]}` : sizeComputed.value;
    });
    const { tagComputed } = useRouterLink(props);
    const attributesComputed = useButtonAttributes(props);
    const { disabled } = toRefs(props);
    const button = shallowRef();
    const { focus, blur } = useFocus(button);
    const { isHovered } = useHover(button, disabled);
    const { isPressed } = usePressed();
    const iconColorComputed = computed(() => props.iconColor ? getColor(props.iconColor) : textColorComputed.value);
    const iconAttributesComputed = computed(() => ({
      size: props.size,
      color: iconColorComputed.value
    }));
    const wrapperClassComputed = computed(() => ({ "va-button__content--loading": props.loading }));
    const isSlotContentPassed = useSlotPassed();
    const isOneIcon = computed(() => !!(props.iconRight && !props.icon || !props.iconRight && props.icon));
    const isOnlyIcon = computed(() => !isSlotContentPassed.value && isOneIcon.value);
    const computedClass = useBem("va-button", () => ({
      ...pick_1(props, ["disabled", "block", "loading", "round", "plain"]),
      small: props.size === "small",
      normal: !props.size || props.size === "medium",
      large: props.size === "large",
      opacity: props.textOpacity < 1,
      bordered: !!props.borderColor,
      iconOnly: isOnlyIcon.value,
      leftIcon: !isOnlyIcon.value && !!props.icon && !props.iconRight,
      rightIcon: !isOnlyIcon.value && !props.icon && !!props.iconRight
    }));
    const isTransparentBg = computed(() => props.plain || props.backgroundOpacity < 0.5);
    const { textColorComputed } = useTextColor(colorComputed, isTransparentBg);
    const {
      backgroundColor,
      backgroundColorOpacity,
      backgroundMaskOpacity,
      backgroundMaskColor
    } = useButtonBackground(colorComputed, isPressed, isHovered);
    const contentColorComputed = useButtonTextColor(textColorComputed, colorComputed, isPressed, isHovered);
    const computedStyle = computed(() => ({
      borderColor: props.borderColor ? getColor(props.borderColor) : "transparent",
      ...contentColorComputed.value
    }));
    const publicMethods = { focus, blur };
    return {
      button,
      tagComputed,
      computedClass,
      computedStyle,
      textColorComputed,
      loaderSizeComputed,
      attributesComputed,
      wrapperClassComputed,
      iconAttributesComputed,
      backgroundColor,
      backgroundMaskColor,
      backgroundMaskOpacity,
      backgroundColorOpacity,
      ...publicMethods
    };
  }
});
const __injectCSSVars__ = () => {
  useCssVars((_ctx) => ({
    "6057e024": _ctx.backgroundColor,
    "cb320172": _ctx.backgroundColorOpacity,
    "38d51418": _ctx.backgroundMaskColor,
    "5880f900": _ctx.backgroundMaskOpacity
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main$d = __default__;
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_va_icon = resolveComponent("va-icon");
  const _component_va_progress_circle = resolveComponent("va-progress-circle");
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tagComputed), mergeProps({
    ref: "button",
    class: ["va-button", _ctx.computedClass],
    style: _ctx.computedStyle
  }, _ctx.attributesComputed), {
    default: withCtx(() => [
      createElementVNode("span", {
        class: normalizeClass(["va-button__content", _ctx.wrapperClassComputed])
      }, [
        renderSlot(_ctx.$slots, "prepend", normalizeProps(guardReactiveProps({ icon: _ctx.icon, iconAttributes: _ctx.iconAttributesComputed })), () => [
          _ctx.icon ? (openBlock(), createBlock(_component_va_icon, mergeProps({
            key: 0,
            class: "va-button__left-icon",
            name: _ctx.icon
          }, _ctx.iconAttributesComputed), null, 16, ["name"])) : createCommentVNode("", true)
        ]),
        renderSlot(_ctx.$slots, "default"),
        renderSlot(_ctx.$slots, "append", normalizeProps(guardReactiveProps({ icon: _ctx.iconRight, iconAttributes: _ctx.iconAttributesComputed })), () => [
          _ctx.iconRight ? (openBlock(), createBlock(_component_va_icon, mergeProps({
            key: 0,
            class: "va-button__right-icon",
            name: _ctx.iconRight
          }, _ctx.iconAttributesComputed), null, 16, ["name"])) : createCommentVNode("", true)
        ])
      ], 2),
      _ctx.loading ? renderSlot(_ctx.$slots, "loading", normalizeProps(mergeProps({ key: 0 }, {
        size: _ctx.loaderSizeComputed,
        color: _ctx.textColorComputed
      })), () => [
        createVNode(_component_va_progress_circle, {
          class: "va-button__loader",
          size: _ctx.loaderSizeComputed,
          color: _ctx.textColorComputed,
          thickness: 0.15,
          indeterminate: ""
        }, null, 8, ["size", "color", "thickness"])
      ]) : createCommentVNode("", true)
    ]),
    _: 3
  }, 16, ["class", "style"]);
}
var VaButton$1 = /* @__PURE__ */ _export_sfc$1(_sfc_main$d, [["render", _sfc_render$8]]);
const VaButton = withConfigTransport(VaButton$1);
const useCurrentComponentId = () => {
  const instance = getCurrentInstance();
  return `${instance.appContext.app._uid}_${instance.uid}`;
};
const openedModals = [];
const useBlur = (shouldBlur, isModalShown) => {
  const id = useCurrentComponentId();
  const document2 = useDocument();
  const blur = () => {
    var _a;
    if (openedModals.includes(id)) {
      return;
    }
    openedModals.push(id);
    (_a = document2.value) == null ? void 0 : _a.body.classList.add("va-modal-overlay-background--blurred");
  };
  const removeBlur = () => {
    var _a;
    const modalIndex = openedModals.indexOf(id);
    if (modalIndex === -1) {
      return;
    }
    openedModals.splice(modalIndex, 1);
    if (openedModals.length === 0) {
      (_a = document2.value) == null ? void 0 : _a.body.classList.remove("va-modal-overlay-background--blurred");
    }
  };
  watchEffect(() => {
    if (!shouldBlur.value) {
      return;
    }
    if (isModalShown.value) {
      blur();
    } else {
      removeBlur();
    }
  });
};
const ModalElement = /* @__PURE__ */ defineComponent({
  name: "ModalElement",
  inheritAttrs: false,
  props: {
    ...useComponentPresetProp,
    isTransition: { type: Boolean, default: true }
  },
  setup: (props, { slots, attrs }) => () => {
    var _a;
    return props.isTransition ? h(Transition, { ...attrs }, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots, attrs);
  }
});
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  name: "VaModal",
  inheritAttrs: false,
  components: { VaButton, VaIcon, ModalElement },
  emits: [
    ...useStatefulEmits,
    "cancel",
    "ok",
    "before-open",
    "open",
    "before-close",
    "close",
    "click-outside"
  ],
  props: {
    ...useStatefulProps,
    modelValue: { type: Boolean, default: false },
    attachElement: { type: String, default: "body" },
    allowBodyScroll: { type: Boolean, default: false },
    disableAttachment: { type: Boolean, default: false },
    title: { type: String, default: "" },
    message: { type: String, default: "" },
    okText: { type: String, default: "$t:ok" },
    cancelText: { type: String, default: "$t:cancel" },
    hideDefaultActions: { type: Boolean, default: false },
    fullscreen: { type: Boolean, default: false },
    mobileFullscreen: { type: Boolean, default: true },
    noDismiss: { type: Boolean, default: false },
    noOutsideDismiss: { type: Boolean, default: false },
    noEscDismiss: { type: Boolean, default: false },
    maxWidth: { type: String, default: "" },
    maxHeight: { type: String, default: "" },
    anchorClass: { type: String },
    size: {
      type: String,
      default: "medium",
      validator: (value) => ["medium", "small", "large"].includes(value)
    },
    fixedLayout: { type: Boolean, default: false },
    withoutTransitions: { type: Boolean, default: false },
    overlay: { type: Boolean, default: true },
    overlayOpacity: { type: [Number, String], default: 0.6 },
    blur: { type: Boolean, default: false },
    zIndex: { type: [Number, String], default: void 0 },
    backgroundColor: { type: String, default: "background-secondary" },
    noPadding: { type: Boolean, default: false },
    beforeClose: { type: Function }
  },
  setup(props, { emit }) {
    const rootElement = shallowRef();
    const modalDialog = shallowRef();
    const { trapFocusIn, freeFocus } = useTrapFocus();
    const {
      registerModal,
      unregisterModal,
      isTopLevelModal,
      isLowestLevelModal
    } = useModalLevel();
    const { getColor } = useColors();
    const { textColorComputed } = useTextColor(toRef(props, "backgroundColor"));
    const { valueComputed } = useStateful(props, emit);
    const computedClass = computed(() => ({
      "va-modal--fullscreen": props.fullscreen,
      "va-modal--mobile-fullscreen": props.mobileFullscreen,
      "va-modal--fixed-layout": props.fixedLayout,
      "va-modal--no-padding": props.noPadding,
      [`va-modal--size-${props.size}`]: props.size !== "medium"
    }));
    const computedModalContainerStyle = computed(() => ({ "z-index": props.zIndex }));
    const computedDialogStyle = computed(() => ({
      maxWidth: props.maxWidth,
      maxHeight: props.maxHeight,
      color: textColorComputed.value,
      background: getColor(props.backgroundColor)
    }));
    const computedOverlayStyles = computed(() => {
      if (!props.overlay || !isLowestLevelModal.value) {
        return;
      }
      return {
        "background-color": `rgba(0, 0, 0, ${props.overlayOpacity})`,
        "z-index": props.zIndex && Number(props.zIndex) - 1
      };
    });
    const show = () => {
      valueComputed.value = true;
    };
    const hide = (cb) => {
      const _hide = () => {
        valueComputed.value = false;
        cb == null ? void 0 : cb();
      };
      props.beforeClose ? props.beforeClose(_hide) : _hide();
    };
    const toggle = () => {
      valueComputed.value = !valueComputed.value;
    };
    const cancel = () => {
      hide(() => emit("cancel"));
    };
    const ok = () => {
      hide(() => emit("ok"));
    };
    const trapFocusInModal = () => {
      nextTick(() => {
        if (modalDialog.value) {
          trapFocusIn(modalDialog.value);
        }
      });
    };
    const onBeforeEnterTransition = (el) => emit("before-open", el);
    const onAfterEnterTransition = (el) => emit("open", el);
    const onBeforeLeaveTransition = (el) => emit("before-close", el);
    const onAfterLeaveTransition = (el) => emit("close", el);
    const listenKeyUp = (e) => {
      const hideModal = () => {
        if (e.code === "Escape" && !props.noEscDismiss && !props.noDismiss && isTopLevelModal.value) {
          cancel();
        }
      };
      setTimeout(hideModal);
    };
    const window2 = useWindow();
    watchEffect(() => {
      var _a, _b;
      if (valueComputed.value) {
        (_a = window2.value) == null ? void 0 : _a.addEventListener("keyup", listenKeyUp);
      } else {
        (_b = window2.value) == null ? void 0 : _b.removeEventListener("keyup", listenKeyUp);
      }
    });
    useBlur(toRef(props, "blur"), valueComputed);
    const documentRef = useDocument();
    const setBodyOverflow = (overflow) => {
      if (!documentRef.value || props.allowBodyScroll) {
        return;
      }
      documentRef.value.body.style.overflow = overflow;
    };
    watch(valueComputed, (newValueComputed) => {
      if (newValueComputed) {
        registerModal();
        setBodyOverflow("scroll hidden");
        return;
      }
      if (isLowestLevelModal.value) {
        freeFocus();
        setBodyOverflow("");
      }
      unregisterModal();
    });
    watch(isTopLevelModal, (newIsTopLevelModal) => {
      if (newIsTopLevelModal) {
        trapFocusInModal();
      }
    });
    const publicMethods = {
      ...useTranslation(),
      show,
      hide,
      toggle,
      cancel,
      ok,
      onBeforeEnterTransition,
      onAfterEnterTransition,
      onBeforeLeaveTransition,
      onAfterLeaveTransition,
      listenKeyUp
    };
    return {
      getColor,
      rootElement,
      modalDialog,
      valueComputed,
      computedClass,
      computedDialogStyle,
      computedModalContainerStyle,
      computedOverlayStyles,
      ...publicMethods
    };
  }
});
const _hoisted_1$4 = ["aria-labelledby"];
const _hoisted_2$1 = {
  key: 0,
  class: "va-modal__anchor"
};
const _hoisted_3$1 = {
  key: 0,
  class: "va-modal"
};
const _hoisted_4 = { key: 0 };
const _hoisted_5 = {
  key: 1,
  class: "va-modal__header"
};
const _hoisted_6 = {
  key: 2,
  class: "va-modal__message"
};
const _hoisted_7 = {
  key: 3,
  class: "va-modal__message"
};
const _hoisted_8 = {
  key: 4,
  class: "va-modal__footer"
};
const _hoisted_9 = {
  key: 5,
  class: "va-modal__footer"
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_va_icon = resolveComponent("va-icon");
  const _component_va_button = resolveComponent("va-button");
  const _component_modal_element = resolveComponent("modal-element");
  return openBlock(), createElementBlock("div", {
    ref: "rootElement",
    class: normalizeClass(["va-modal-entry", _ctx.$props.anchorClass]),
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": _ctx.title
  }, [
    _ctx.$slots.anchor ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
      renderSlot(_ctx.$slots, "anchor", normalizeProps(guardReactiveProps({ show: _ctx.show, hide: _ctx.hide, toggle: _ctx.toggle })))
    ])) : createCommentVNode("", true),
    (openBlock(), createBlock(Teleport, {
      to: _ctx.attachElement,
      disabled: _ctx.$props.disableAttachment
    }, [
      createVNode(_component_modal_element, mergeProps({
        name: "va-modal",
        isTransition: !_ctx.$props.withoutTransitions,
        appear: "",
        duration: 300
      }, _ctx.$attrs, {
        onBeforeEnter: _ctx.onBeforeEnterTransition,
        onAfterEnter: _ctx.onAfterEnterTransition,
        onBeforeLeave: _ctx.onBeforeLeaveTransition,
        onAfterLeave: _ctx.onAfterLeaveTransition
      }), {
        default: withCtx(() => [
          _ctx.valueComputed ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
            _ctx.$props.overlay ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "va-modal__overlay",
              style: normalizeStyle(_ctx.computedOverlayStyles)
            }, null, 4)) : createCommentVNode("", true),
            createElementVNode("div", {
              class: "va-modal__container",
              style: normalizeStyle(_ctx.computedModalContainerStyle)
            }, [
              createElementVNode("div", {
                ref: "modalDialog",
                class: normalizeClass(["va-modal__dialog", _ctx.computedClass]),
                style: normalizeStyle(_ctx.computedDialogStyle)
              }, [
                _ctx.$props.fullscreen ? (openBlock(), createBlock(_component_va_icon, {
                  key: 0,
                  name: "va-close",
                  class: "va-modal__close",
                  role: "button",
                  "aria-label": _ctx.t("close"),
                  tabindex: "0",
                  onClick: _ctx.cancel,
                  onKeydown: [
                    withKeys(_ctx.cancel, ["space"]),
                    withKeys(_ctx.cancel, ["enter"])
                  ]
                }, null, 8, ["aria-label", "onClick", "onKeydown"])) : createCommentVNode("", true),
                createElementVNode("div", {
                  class: "va-modal__inner",
                  style: normalizeStyle({ maxWidth: _ctx.$props.maxWidth, maxHeight: _ctx.$props.maxHeight })
                }, [
                  _ctx.$slots.content ? (openBlock(), createElementBlock("div", _hoisted_4, [
                    renderSlot(_ctx.$slots, "content", normalizeProps(guardReactiveProps({ cancel: _ctx.cancel, ok: _ctx.ok })))
                  ])) : createCommentVNode("", true),
                  !_ctx.$slots.content ? (openBlock(), createElementBlock(Fragment$1, { key: 1 }, [
                    _ctx.title ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: "va-modal__title",
                      style: normalizeStyle({ color: _ctx.getColor("primary") })
                    }, toDisplayString(_ctx.$props.title), 5)) : createCommentVNode("", true),
                    _ctx.$slots.header ? (openBlock(), createElementBlock("div", _hoisted_5, [
                      renderSlot(_ctx.$slots, "header")
                    ])) : createCommentVNode("", true),
                    _ctx.$props.message ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(_ctx.$props.message), 1)) : createCommentVNode("", true),
                    _ctx.$slots.default ? (openBlock(), createElementBlock("div", _hoisted_7, [
                      renderSlot(_ctx.$slots, "default")
                    ])) : createCommentVNode("", true),
                    (_ctx.$props.cancelText || _ctx.$props.okText) && !_ctx.$props.hideDefaultActions ? (openBlock(), createElementBlock("div", _hoisted_8, [
                      _ctx.$props.cancelText ? (openBlock(), createBlock(_component_va_button, {
                        key: 0,
                        preset: "secondary",
                        color: "secondary",
                        class: "va-modal__default-cancel-button",
                        onClick: _ctx.cancel
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.tp(_ctx.$props.cancelText)), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true),
                      createVNode(_component_va_button, { onClick: _ctx.ok }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.tp(_ctx.$props.okText)), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])) : createCommentVNode("", true),
                    _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_9, [
                      renderSlot(_ctx.$slots, "footer")
                    ])) : createCommentVNode("", true)
                  ], 64)) : createCommentVNode("", true)
                ], 4)
              ], 6)
            ], 4)
          ])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["isTransition", "onBeforeEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave"])
    ], 8, ["to", "disabled"]))
  ], 10, _hoisted_1$4);
}
var _VaModal = /* @__PURE__ */ _export_sfc$1(_sfc_main$c, [["render", _sfc_render$7]]);
const VaModal = withConfigTransport(_VaModal);
const getNodeProps = (vNode) => {
  var _a;
  return ((_a = vNode.component) == null ? void 0 : _a.props) || {};
};
const destroy = (el, vNode) => {
  if (el) {
    render(null, el);
    el.remove();
  }
  el = null;
};
const mount = (component, { props, appContext } = {}) => {
  var _a;
  const el = document == null ? void 0 : document.createElement("div");
  let vNode;
  const onClose = (event) => {
    var _a2;
    (_a2 = props == null ? void 0 : props.onClose) == null ? void 0 : _a2.call(props, event);
    destroy(el);
  };
  const onUpdateModelValue = (value) => {
    var _a2;
    (_a2 = props == null ? void 0 : props["onUpdate:modelValue"]) == null ? void 0 : _a2.call(props, value);
    if ((props == null ? void 0 : props.withoutTransitions) && !value) {
      nextTick(() => {
        destroy(el);
      });
    }
  };
  vNode = h(component, {
    ...props,
    stateful: (_a = props == null ? void 0 : props.stateful) != null ? _a : true,
    modelValue: true,
    onClose,
    "onUpdate:modelValue": onUpdateModelValue
  });
  if (appContext) {
    vNode.appContext = appContext;
  }
  if (el) {
    render(vNode, el);
  }
  return { vNode, el };
};
const getModalOptions = (options) => typeof options === "string" ? { message: options } : options;
const createModalInstance = (customProps, appContext) => {
  const { vNode, el } = mount(VaModal, { appContext, props: getModalOptions(customProps) });
  if (el && vNode.el && getNodeProps(vNode)) {
    document.body.appendChild(el.childNodes[0]);
  }
  return vNode;
};
const createVaModalPlugin = (app2) => ({
  init(options) {
    return createModalInstance(options, app2 == null ? void 0 : app2._context);
  }
});
const VaModalPlugin = defineVuesticPlugin(() => ({
  install(app2) {
    defineGlobalProperty(app2, "$vaModal", createVaModalPlugin(app2));
  }
}));
const isPluginFabric = (plugin) => typeof plugin === "function";
const usePlugin = (app2, plugin, ...options) => {
  if (isPluginFabric(plugin)) {
    app2.use(plugin(...options));
  } else {
    app2.use(plugin);
  }
};
const useFixedBarProps = {
  hideOnScroll: { type: Boolean, default: false },
  fixed: { type: Boolean, default: false },
  bottom: { type: Boolean, default: false }
};
function useFixedBar(props, isScrolledDown) {
  const isHiddenComputed = computed(() => isScrolledDown.value ? !!props.hideOnScroll : false);
  const transformComputed = computed(() => {
    if (!props.bottom && !isHiddenComputed.value) {
      return;
    }
    if (props.bottom && isHiddenComputed.value) {
      return "translateY(100%)";
    }
    if (props.bottom) {
      return props.fixed ? "translateY(-100%)" : "translateY(0)";
    }
    return "translateY(-100%)";
  });
  const positionComputed = computed(() => {
    if (props.fixed) {
      return "fixed";
    }
    return isHiddenComputed.value ? "absolute" : void 0;
  });
  const fixedBarStyleComputed = computed(() => {
    const result = {
      top: props.bottom && (isHiddenComputed.value || props.fixed) ? "100%" : void 0,
      transform: props.hideOnScroll || props.fixed ? transformComputed.value : void 0
    };
    positionComputed.value && Object.assign(result, { position: positionComputed.value });
    return result;
  });
  return { fixedBarStyleComputed };
}
function setupScroll(fixed, target) {
  const scrollRoot = shallowRef();
  const isScrolledDown = ref(false);
  ref(0);
  return { scrollRoot, isScrolledDown };
}
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  name: "VaConfig",
  props: {
    ...useComponentPresetProp,
    components: { type: Object, default: () => ({}) }
  },
  setup(props) {
    const prevChain = useLocalConfig();
    const nextChain = computed(() => [...prevChain.value, props.components]);
    provideLocalConfig(nextChain);
    return {};
  }
});
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
var VaConfig = /* @__PURE__ */ _export_sfc$1(_sfc_main$b, [["render", _sfc_render$6]]);
function useKeyboardOnlyFocus() {
  const hasKeyboardFocus = ref(false);
  let previouslyClicked = false;
  const keyboardFocusListeners = {
    mousedown: () => {
      previouslyClicked = true;
    },
    focus: () => {
      if (!previouslyClicked) {
        hasKeyboardFocus.value = true;
      }
      previouslyClicked = false;
    },
    blur: () => {
      hasKeyboardFocus.value = false;
      previouslyClicked = false;
    }
  };
  return {
    hasKeyboardFocus,
    keyboardFocusListeners
  };
}
const unrefElement = (el) => {
  var _a;
  const e = unref(el);
  return (_a = e == null ? void 0 : e.$el) != null ? _a : e;
};
const useElementRef = () => {
  const el = shallowRef();
  return computed({
    get() {
      return unrefElement(el);
    },
    set(node) {
      el.value = node;
    }
  });
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  name: "VaNavbar",
  props: {
    ...useFixedBarProps,
    ...useComponentPresetProp,
    color: { type: String, default: "background-secondary" },
    textColor: { type: String },
    shape: { type: Boolean, default: false }
  },
  setup(props) {
    const { scrollRoot, isScrolledDown } = setupScroll(props.fixed);
    const { fixedBarStyleComputed } = useFixedBar(props, isScrolledDown);
    const { getColor, shiftHSLAColor: shiftHSLAColor2 } = useColors();
    const { textColorComputed } = useTextColor();
    const color = computed(() => getColor(props.color));
    const shapeStyleComputed = computed(() => ({
      borderTopColor: shiftHSLAColor2(color.value, { h: -1, s: -11, l: 10 })
    }));
    const computedStyle = computed(() => ({
      ...fixedBarStyleComputed.value,
      backgroundColor: color.value,
      color: textColorComputed.value,
      fill: textColorComputed.value
    }));
    return {
      scrollRoot,
      computedStyle,
      shapeStyleComputed
    };
  }
});
const _hoisted_1$3 = { class: "va-navbar__left" };
const _hoisted_2 = { class: "va-navbar__center" };
const _hoisted_3 = { class: "va-navbar__right" };
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("header", {
    ref: "scrollRoot",
    class: "va-navbar",
    style: normalizeStyle(_ctx.computedStyle)
  }, [
    createElementVNode("div", _hoisted_1$3, [
      renderSlot(_ctx.$slots, "left")
    ]),
    createElementVNode("div", _hoisted_2, [
      renderSlot(_ctx.$slots, "default")
    ]),
    createElementVNode("div", _hoisted_3, [
      renderSlot(_ctx.$slots, "right")
    ]),
    _ctx.shape ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "va-navbar__background-shape",
      style: normalizeStyle(_ctx.shapeStyleComputed)
    }, null, 4)) : createCommentVNode("", true)
  ], 4);
}
var _VaNavbar = /* @__PURE__ */ _export_sfc$1(_sfc_main$a, [["render", _sfc_render$5]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  name: "VaNavbarItem",
  props: {}
});
const _hoisted_1$2 = { class: "va-navbar__item" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var _VaNavbarItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$9, [["render", _sfc_render$4]]);
const VaNavbar = withConfigTransport(_VaNavbar);
const VaNavbarItem = withConfigTransport(_VaNavbarItem);
const VaSidebarKey = Symbol("VaSidebar");
const useSidebar = (props) => {
  provide(VaSidebarKey, props);
};
const useSidebarItem = () => {
  return inject$1(VaSidebarKey, {
    color: "background-element"
  });
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  name: "VaSidebar",
  props: {
    ...useComponentPresetProp,
    activeColor: { type: String, default: "primary" },
    hoverColor: { type: String, default: void 0 },
    hoverOpacity: {
      type: Number,
      default: 0.2,
      validator: (v) => v >= 0 && v <= 1
    },
    borderColor: { type: String, default: void 0 },
    color: { type: String, default: "background-element" },
    textColor: { type: String },
    gradient: { type: Boolean, default: false },
    minimized: { type: Boolean, default: false },
    hoverable: { type: Boolean, default: false },
    position: {
      type: String,
      default: "left",
      validator: (v) => ["left", "right"].includes(v)
    },
    width: { type: String, default: "16rem" },
    minimizedWidth: { type: String, default: "4rem" },
    modelValue: { type: Boolean, default: true },
    animated: { type: Boolean, default: true }
  },
  components: { VaConfig },
  setup(props) {
    const { getColor } = useColors();
    useSidebar(props);
    const isHovered = ref(false);
    const isMinimized = computed(() => props.minimized || props.hoverable && !isHovered.value);
    const computedWidth = computed(() => {
      if (!props.modelValue) {
        return 0;
      }
      return isMinimized.value ? props.minimizedWidth : props.width;
    });
    const { textColorComputed } = useTextColor();
    const computedStyle = computed(() => {
      const backgroundColor = getColor(props.color);
      const color = textColorComputed.value;
      return {
        color,
        backgroundColor,
        backgroundImage: props.gradient ? getGradientBackground(backgroundColor) : void 0
      };
    });
    const computedClass = useBem("va-sidebar", () => ({
      minimized: isMinimized.value,
      right: props.position === "right",
      animated: props.animated
    }));
    const updateHoverState = (newHoverState) => {
      isHovered.value = props.hoverable && newHoverState;
    };
    return {
      computedWidth,
      computedClass,
      computedStyle,
      updateHoverState,
      vaSidebarItemProps: computed(() => ({
        textColor: props.textColor,
        activeColor: props.activeColor,
        hoverColor: props.hoverColor,
        borderColor: props.borderColor,
        hoverOpacity: props.hoverOpacity
      }))
    };
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_va_config = resolveComponent("va-config");
  return openBlock(), createElementBlock("aside", {
    class: normalizeClass(["va-sidebar", _ctx.computedClass]),
    style: normalizeStyle(_ctx.computedStyle),
    onMouseenter: _cache[0] || (_cache[0] = ($event) => _ctx.updateHoverState(true)),
    onMouseleave: _cache[1] || (_cache[1] = ($event) => _ctx.updateHoverState(false))
  }, [
    createElementVNode("div", {
      class: "va-sidebar__menu",
      style: normalizeStyle(`width: ${_ctx.computedWidth};`)
    }, [
      createVNode(_component_va_config, {
        components: { VaSidebarItem: _ctx.vaSidebarItemProps }
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["components"])
    ], 4)
  ], 38);
}
var _VaSidebar = /* @__PURE__ */ _export_sfc$1(_sfc_main$8, [["render", _sfc_render$3]]);
const VaSidebar = withConfigTransport(_VaSidebar);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  name: "VaSidebarItem",
  props: {
    ...useRouterLinkProps,
    ...useComponentPresetProp,
    active: { type: Boolean, default: false },
    textColor: { type: String, default: void 0 },
    activeColor: { type: String, default: "primary" },
    hoverColor: { type: String, default: void 0 },
    hoverOpacity: { type: Number, default: 0.2 },
    borderColor: { type: String, default: void 0 }
  },
  setup(props) {
    const rootElement = useElementRef();
    const sidebar = useSidebarItem();
    const { isHovered } = useHover();
    const { getColor, getHoverColor: getHoverColor2, getFocusColor: getFocusColor2 } = useColors();
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus();
    const backgroundColorComputed = computed(() => {
      if (props.active && !isHovered.value && !hasKeyboardFocus.value) {
        return getColor(props.activeColor);
      }
      if (hasKeyboardFocus.value) {
        return getFocusColor2(getColor(props.hoverColor || props.activeColor));
      }
      return "#ffffff00";
    });
    const textBackground = computed(() => applyColors(getColor(sidebar == null ? void 0 : sidebar.color), backgroundColorComputed.value));
    const { textColorComputed } = useTextColor(textBackground);
    const computedStyle = computed(() => {
      const style = { color: textColorComputed.value };
      if (isHovered.value || props.active || hasKeyboardFocus.value) {
        style.backgroundColor = backgroundColorComputed.value;
      }
      if (props.active) {
        const mergedProps = { ...sidebar, ...props };
        style.borderColor = getColor(mergedProps.borderColor || mergedProps.activeColor);
      }
      if (hasKeyboardFocus.value) {
        style.backgroundColor = getFocusColor2(getColor(props.hoverColor || props.activeColor));
      }
      if (isHovered.value) {
        style.backgroundColor = getHoverColor2(
          getColor(props.hoverColor || props.activeColor),
          props.hoverOpacity
        );
      }
      return style;
    });
    const { tagComputed, hrefComputed } = useRouterLink(props);
    return {
      rootElement,
      computedStyle,
      keyboardFocusListeners,
      tagComputed,
      hrefComputed,
      isHovered,
      backgroundColorComputed,
      bg: getColor(sidebar == null ? void 0 : sidebar.color),
      textBackground
    };
  }
});
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(resolveDynamicComponent(_ctx.tagComputed), mergeProps({
    ref: "rootElement",
    class: ["va-sidebar__item va-sidebar-item", { "va-sidebar-item--active": _ctx.$props.active }],
    tabindex: "0",
    style: _ctx.computedStyle,
    href: _ctx.hrefComputed,
    to: _ctx.$props.to
  }, toHandlers(_ctx.keyboardFocusListeners)), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16, ["class", "style", "href", "to"]);
}
var _VaSidebarItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$7, [["render", _sfc_render$2]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  name: "VaSidebarItemContent"
});
const _hoisted_1$1 = { class: "va-sidebar__item__content va-sidebar-item-content" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var _VaSidebarItemContent = /* @__PURE__ */ _export_sfc$1(_sfc_main$6, [["render", _sfc_render$1]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  name: "VaSidebarItemTitle"
});
const _hoisted_1 = { class: "va-sidebar__title va-sidebar-item-title" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var _VaSidebarItemTitle = /* @__PURE__ */ _export_sfc$1(_sfc_main$5, [["render", _sfc_render]]);
const VaSidebarItemContent = withConfigTransport(_VaSidebarItemContent);
const VaSidebarItemTitle = withConfigTransport(_VaSidebarItemTitle);
const VaSidebarItem = withConfigTransport(_VaSidebarItem);
const ESSENTIAL_PLUGIN_NAMES = ["GlobalConfigPlugin", "ColorConfigPlugin"];
const createVuesticEssential = defineVuesticPlugin((options = {}) => ({
  install(app2) {
    const { config, components: components2, plugins: plugins2 } = options;
    setCurrentApp(app2);
    usePlugin(app2, (plugins2 == null ? void 0 : plugins2.GlobalConfigPlugin) || GlobalConfigPlugin, config);
    usePlugin(app2, (plugins2 == null ? void 0 : plugins2.CachePlugin) || CachePlugin);
    usePlugin(app2, (plugins2 == null ? void 0 : plugins2.ColorConfigPlugin) || ColorConfigPlugin, config);
    if (plugins2) {
      Object.entries(plugins2).forEach(([name, plugin]) => {
        if (ESSENTIAL_PLUGIN_NAMES.includes(name)) {
          return;
        }
        usePlugin(app2, plugin);
      });
    }
    if (components2) {
      Object.entries(components2).forEach(([name, component]) => {
        app2.component(name, component);
      });
    }
    setCurrentApp(null);
  }
}));
function getGlobalProperty(app2, key) {
  return app2.config.globalProperties[key];
}
const plugin_FRmGFsEaPh = defineNuxtPlugin((nuxtApp) => {
  const { vueApp: app2 } = nuxtApp;
  const { config } = JSON.parse(`{"config":{"colors":{"currentPresetName":"dark"}},"css":true,"fonts":true}`);
  app2.use(createVuesticEssential({
    config,
    // TODO: Would be nice to tree-shake plugins, but they're small so we don't cant for now.
    // Should be synced with create-vuestic.ts
    plugins: {
      BreakpointConfigPlugin,
      VaDropdownPlugin,
      VaToastPlugin,
      VaModalPlugin,
      ColorsClassesPlugin
    },
    /** Do not import any components. Nuxt will import them automatically */
    components: {}
  }));
  const head = getGlobalProperty(app2, "$head");
  if (head) {
    watchEffect(() => {
      const colorConfig = getGlobalProperty(app2, "$vaColorConfig");
      if (colorConfig) {
        const renderCSSVariables = colorConfig.renderCSSVariables;
        head.addHeadObjs(ref({
          htmlAttrs: {
            style: renderCSSVariables()
          }
        }));
      }
    }, { flush: "pre" });
    watchEffect(() => {
      const colorsClasses = getGlobalProperty(app2, "$vaColorsClasses");
      if (colorsClasses) {
        head.addHeadObjs(ref({
          htmlAttrs: {
            style: colorsClasses.renderColorHelpers()
          }
        }));
      }
    }, { flush: "pre" });
  }
});
const _plugins = [
  components_plugin_KR1HBZs4kY,
  vueuse_head_plugin_hJ5ut56rKX,
  router_JCP0YfzX4Y,
  plugin_a5X8iEkX19,
  plugin_SjrWhxHRlu,
  plugin_FRmGFsEaPh
];
function useDevice() {
  return useNuxtApp().$device;
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "MaguroNavbar",
  __ssrInlineRender: true,
  setup(__props) {
    var toggleSidebar = useToggleSidebar();
    var currentDevice = useDevice();
    var currentSidebarItem = useCurrentSidebarItem();
    return (_ctx, _push, _parent2, _attrs) => {
      const _component_VaNavbar = VaNavbar;
      const _component_VaNavbarItem = VaNavbarItem;
      const _component_VaButton = VaButton;
      _push(ssrRenderComponent(_component_VaNavbar, _attrs, createSlots({
        left: withCtx((_, _push2, _parent22, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_VaNavbarItem, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_VaButton, {
                    icon: "va-arrow-right",
                    onClick: ($event) => unref(toggleSidebar)(true)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_VaButton, {
                      icon: "va-arrow-right",
                      onClick: ($event) => unref(toggleSidebar)(true)
                    }, null, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent22, _scopeId));
            if (unref(currentDevice).isMobile) {
              _push2(ssrRenderComponent(_component_VaNavbarItem, { class: "logo" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(currentSidebarItem).toUpperCase())}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(currentSidebarItem).toUpperCase()), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent22, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_VaNavbarItem, null, {
                default: withCtx(() => [
                  createVNode(_component_VaButton, {
                    icon: "va-arrow-right",
                    onClick: ($event) => unref(toggleSidebar)(true)
                  }, null, 8, ["onClick"])
                ]),
                _: 1
              }),
              unref(currentDevice).isMobile ? (openBlock(), createBlock(_component_VaNavbarItem, {
                key: 0,
                class: "logo"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(currentSidebarItem).toUpperCase()), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 2
      }, [
        !unref(currentDevice).isMobile ? {
          name: "default",
          fn: withCtx((_, _push2, _parent22, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_VaNavbarItem, { class: "logo" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(currentSidebarItem).toUpperCase())}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(currentSidebarItem).toUpperCase()), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent22, _scopeId));
            } else {
              return [
                createVNode(_component_VaNavbarItem, { class: "logo" }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(currentSidebarItem).toUpperCase()), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent2));
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MaguroNavbar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-5ec407a6"]]);
const __nuxt_component_1 = /* @__PURE__ */ defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    }
  },
  setup(props, { slots }) {
    const indicator = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle
    });
    const nuxtApp = useNuxtApp();
    nuxtApp.hook("page:start", indicator.start);
    nuxtApp.hook("page:finish", indicator.finish);
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: indicator.isLoading.value ? 1 : 0,
        background: props.color || void 0,
        backgroundSize: `${100 / indicator.progress.value * 100}% auto`,
        transform: `scaleX(${indicator.progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
function useLoadingIndicator(opts) {
  const progress = ref(0);
  const isLoading = ref(false);
  computed(() => 1e4 / opts.duration);
  let _timer = null;
  let _throttle = null;
  function start() {
    clear();
    progress.value = 0;
    if (opts.throttle && false) {
      _throttle = setTimeout(() => {
        isLoading.value = true;
      }, opts.throttle);
    } else {
      isLoading.value = true;
    }
  }
  function finish() {
    progress.value = 100;
    _hide();
  }
  function clear() {
    clearInterval(_timer);
    clearTimeout(_throttle);
    _timer = null;
    _throttle = null;
  }
  function _hide() {
    clear();
  }
  return {
    progress,
    isLoading,
    start,
    finish,
    clear
  };
}
const useImage = () => {
  return useNuxtApp().$img;
};
const baseImageProps = {
  src: { type: String, required: true },
  format: { type: String, default: void 0 },
  quality: { type: [Number, String], default: void 0 },
  background: { type: String, default: void 0 },
  fit: { type: String, default: void 0 },
  modifiers: { type: Object, default: void 0 },
  preset: { type: String, default: void 0 },
  provider: { type: String, default: void 0 },
  sizes: { type: [Object, String], default: void 0 },
  preload: { type: Boolean, default: void 0 },
  width: { type: [String, Number], default: void 0 },
  height: { type: [String, Number], default: void 0 },
  alt: { type: String, default: void 0 },
  referrerpolicy: { type: String, default: void 0 },
  usemap: { type: String, default: void 0 },
  longdesc: { type: String, default: void 0 },
  ismap: { type: Boolean, default: void 0 },
  loading: { type: String, default: void 0 },
  crossorigin: {
    type: [Boolean, String],
    default: void 0,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    default: void 0,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding
    };
  });
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], default: void 0 }
};
const __nuxt_component_5 = /* @__PURE__ */ defineComponent({
  name: "NuxtImg",
  props: imgProps,
  emits: ["load"],
  setup: (props, ctx) => {
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const attrs = computed(() => {
      const attrs2 = _base.attrs.value;
      if (props.sizes) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          }
        }]
      });
    }
    const imgEl = ref();
    return () => h("img", {
      ref: imgEl,
      key: src.value,
      src: src.value,
      ...attrs.value,
      ...ctx.attrs
    });
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Icon",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ""
    }
  },
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const props = __props;
    const nuxtApp = useNuxtApp();
    const appConfig2 = useAppConfig();
    ((_a = appConfig2 == null ? void 0 : appConfig2.nuxtIcon) == null ? void 0 : _a.aliases) || {};
    const state = useState("icons", () => ({}));
    const isFetching = ref(false);
    const iconName = computed(() => {
      var _a2;
      return (((_a2 = appConfig2 == null ? void 0 : appConfig2.nuxtIcon) == null ? void 0 : _a2.aliases) || {})[props.name] || props.name;
    });
    const icon = computed(() => {
      var _a2;
      return (_a2 = state.value) == null ? void 0 : _a2[iconName.value];
    });
    const component = computed(() => nuxtApp.vueApp.component(iconName.value));
    const sSize = computed(() => {
      var _a2, _b, _c;
      if (!props.size && typeof ((_a2 = appConfig2.nuxtIcon) == null ? void 0 : _a2.size) === "boolean" && !((_b = appConfig2.nuxtIcon) == null ? void 0 : _b.size)) {
        return void 0;
      }
      const size = props.size || ((_c = appConfig2.nuxtIcon) == null ? void 0 : _c.size) || "1em";
      if (String(Number(size)) === size) {
        return `${size}px`;
      }
      return size;
    });
    const className = computed(() => {
      var _a2;
      return ((_a2 = appConfig2 == null ? void 0 : appConfig2.nuxtIcon) == null ? void 0 : _a2.class) ?? "icon";
    });
    async function loadIconComponent() {
      var _a2;
      if (component.value) {
        return;
      }
      if (!((_a2 = state.value) == null ? void 0 : _a2[iconName.value])) {
        isFetching.value = true;
        state.value[iconName.value] = await loadIcon(iconName.value).catch(() => void 0);
        isFetching.value = false;
      }
    }
    watch(() => iconName.value, loadIconComponent);
    !component.value && ([__temp, __restore] = withAsyncContext(() => loadIconComponent()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent2, _attrs) => {
      if (unref(isFetching)) {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: unref(className),
          width: unref(sSize),
          height: unref(sSize)
        }, _attrs))} data-v-19e788b9></span>`);
      } else if (unref(icon)) {
        _push(ssrRenderComponent(unref(Icon$1), mergeProps({
          icon: unref(icon),
          class: unref(className),
          width: unref(sSize),
          height: unref(sSize)
        }, _attrs), null, _parent2));
      } else if (unref(component)) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(component)), mergeProps({
          class: unref(className),
          width: unref(sSize),
          height: unref(sSize)
        }, _attrs), null), _parent2);
      } else {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: unref(className),
          style: { fontSize: unref(sSize), lineHeight: unref(sSize), width: unref(sSize), height: unref(sSize) }
        }, _attrs))} data-v-19e788b9>${ssrInterpolate(__props.name)}</span>`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt-icon@0.3.2_vue@3.2.47/node_modules/nuxt-icon/dist/runtime/Icon.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-19e788b9"]]);
const Icon = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: __nuxt_component_6
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MaguroSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarEnabled = useSidebarEnable();
    const toggleSidebar = useToggleSidebar();
    const sidebarItems = useSidebarItems();
    const weebsiteImages2 = useWeebsiteImages();
    return (_ctx, _push, _parent2, _attrs) => {
      const _component_VaSidebar = VaSidebar;
      const _component_VaSidebarItem = VaSidebarItem;
      const _component_VaSidebarItemContent = VaSidebarItemContent;
      const _component_VaSidebarItemTitle = VaSidebarItemTitle;
      const _component_VaButton = VaButton;
      const _component_NuxtImg = __nuxt_component_5;
      const _component_Icon = __nuxt_component_6;
      const _component_VaIcon = VaIcon;
      _push(ssrRenderComponent(_component_VaSidebar, mergeProps({
        position: "left",
        modelValue: unref(sidebarEnabled),
        "onUpdate:modelValue": ($event) => isRef(sidebarEnabled) ? sidebarEnabled.value = $event : null,
        style: { "position": "absolute", "z-index": "3" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent22, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_VaSidebarItem, {
              onClick: ($event) => unref(toggleSidebar)(false)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_VaSidebarItemContent, { style: { "text-align": "center" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_VaSidebarItemTitle, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_VaButton, { icon: "va-arrow-left" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_VaSidebarItemTitle),
                          createVNode(_component_VaButton, { icon: "va-arrow-left" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_VaSidebarItemContent, { style: { "text-align": "center" } }, {
                      default: withCtx(() => [
                        createVNode(_component_VaSidebarItemTitle),
                        createVNode(_component_VaButton, { icon: "va-arrow-left" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent22, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(Object.entries(unref(sidebarItems)), ([itemname, item]) => {
              _push2(`<!--[-->`);
              if (!item.href) {
                _push2(ssrRenderComponent(_component_VaSidebarItem, {
                  active: item.active,
                  to: { name: item.to }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_VaSidebarItemContent, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            if (itemname === "RandomMemes") {
                              _push4(ssrRenderComponent(_component_NuxtImg, {
                                src: item.image,
                                style: { "width": "2em", "height": "2em" }
                              }, null, _parent4, _scopeId3));
                            } else if (itemname === "Nölz' Weebsite") {
                              _push4(ssrRenderComponent(_component_NuxtImg, {
                                src: unref(weebsiteImages2)[unref(weebsiteImages2).current],
                                style: { "width": "2em", "height": "2em" },
                                loading: "lazy"
                              }, null, _parent4, _scopeId3));
                            } else {
                              _push4(ssrRenderComponent(_component_Icon, {
                                name: item.icon,
                                size: "2em"
                              }, null, _parent4, _scopeId3));
                            }
                            _push4(ssrRenderComponent(_component_VaSidebarItemTitle, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(itemname)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(itemname), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              itemname === "RandomMemes" ? (openBlock(), createBlock(_component_NuxtImg, {
                                key: 0,
                                src: item.image,
                                style: { "width": "2em", "height": "2em" }
                              }, null, 8, ["src"])) : itemname === "Nölz' Weebsite" ? (openBlock(), createBlock(_component_NuxtImg, {
                                key: 1,
                                src: unref(weebsiteImages2)[unref(weebsiteImages2).current],
                                style: { "width": "2em", "height": "2em" },
                                loading: "lazy"
                              }, null, 8, ["src"])) : (openBlock(), createBlock(_component_Icon, {
                                key: 2,
                                name: item.icon,
                                size: "2em"
                              }, null, 8, ["name"])),
                              createVNode(_component_VaSidebarItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(itemname), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_VaSidebarItemContent, null, {
                          default: withCtx(() => [
                            itemname === "RandomMemes" ? (openBlock(), createBlock(_component_NuxtImg, {
                              key: 0,
                              src: item.image,
                              style: { "width": "2em", "height": "2em" }
                            }, null, 8, ["src"])) : itemname === "Nölz' Weebsite" ? (openBlock(), createBlock(_component_NuxtImg, {
                              key: 1,
                              src: unref(weebsiteImages2)[unref(weebsiteImages2).current],
                              style: { "width": "2em", "height": "2em" },
                              loading: "lazy"
                            }, null, 8, ["src"])) : (openBlock(), createBlock(_component_Icon, {
                              key: 2,
                              name: item.icon,
                              size: "2em"
                            }, null, 8, ["name"])),
                            createVNode(_component_VaSidebarItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(itemname), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent22, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_VaSidebarItem, {
                  active: item.active,
                  href: item.href.toString()
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_VaSidebarItemContent, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_Icon, {
                              name: item.icon,
                              size: "2em"
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_VaSidebarItemTitle, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(itemname)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(itemname), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            if (item.href) {
                              _push4(ssrRenderComponent(_component_VaIcon, { name: "open_in_new" }, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          } else {
                            return [
                              createVNode(_component_Icon, {
                                name: item.icon,
                                size: "2em"
                              }, null, 8, ["name"]),
                              createVNode(_component_VaSidebarItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(itemname), 1)
                                ]),
                                _: 2
                              }, 1024),
                              item.href ? (openBlock(), createBlock(_component_VaIcon, {
                                key: 0,
                                name: "open_in_new"
                              })) : createCommentVNode("", true)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_VaSidebarItemContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_Icon, {
                              name: item.icon,
                              size: "2em"
                            }, null, 8, ["name"]),
                            createVNode(_component_VaSidebarItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(itemname), 1)
                              ]),
                              _: 2
                            }, 1024),
                            item.href ? (openBlock(), createBlock(_component_VaIcon, {
                              key: 0,
                              name: "open_in_new"
                            })) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent22, _scopeId));
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode(_component_VaSidebarItem, {
                onClick: ($event) => unref(toggleSidebar)(false)
              }, {
                default: withCtx(() => [
                  createVNode(_component_VaSidebarItemContent, { style: { "text-align": "center" } }, {
                    default: withCtx(() => [
                      createVNode(_component_VaSidebarItemTitle),
                      createVNode(_component_VaButton, { icon: "va-arrow-left" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["onClick"]),
              (openBlock(true), createBlock(Fragment$1, null, renderList(Object.entries(unref(sidebarItems)), ([itemname, item]) => {
                return openBlock(), createBlock(Fragment$1, { key: itemname }, [
                  !item.href ? (openBlock(), createBlock(_component_VaSidebarItem, {
                    key: 0,
                    active: item.active,
                    to: { name: item.to }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_VaSidebarItemContent, null, {
                        default: withCtx(() => [
                          itemname === "RandomMemes" ? (openBlock(), createBlock(_component_NuxtImg, {
                            key: 0,
                            src: item.image,
                            style: { "width": "2em", "height": "2em" }
                          }, null, 8, ["src"])) : itemname === "Nölz' Weebsite" ? (openBlock(), createBlock(_component_NuxtImg, {
                            key: 1,
                            src: unref(weebsiteImages2)[unref(weebsiteImages2).current],
                            style: { "width": "2em", "height": "2em" },
                            loading: "lazy"
                          }, null, 8, ["src"])) : (openBlock(), createBlock(_component_Icon, {
                            key: 2,
                            name: item.icon,
                            size: "2em"
                          }, null, 8, ["name"])),
                          createVNode(_component_VaSidebarItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(itemname), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["active", "to"])) : (openBlock(), createBlock(_component_VaSidebarItem, {
                    key: 1,
                    active: item.active,
                    href: item.href.toString()
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_VaSidebarItemContent, null, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: item.icon,
                            size: "2em"
                          }, null, 8, ["name"]),
                          createVNode(_component_VaSidebarItemTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(itemname), 1)
                            ]),
                            _: 2
                          }, 1024),
                          item.href ? (openBlock(), createBlock(_component_VaIcon, {
                            key: 0,
                            name: "open_in_new"
                          })) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["active", "href"]))
                ], 64);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent2));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MaguroSidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = /* @__PURE__ */ defineComponent({
  name: "FragmentWrapper",
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const __nuxt_component_3 = /* @__PURE__ */ defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(RouteProvider, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const RouteProvider = /* @__PURE__ */ defineComponent({
  name: "RouteProvider",
  // TODO: Type props
  // eslint-disable-next-line vue/require-prop-types
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarEnabled = useSidebarEnable();
    useToggleSidebar();
    return (_ctx, _push, _parent2, _attrs) => {
      const _component_MaguroNavbar = __nuxt_component_0;
      const _component_NuxtLoadingIndicator = __nuxt_component_1;
      const _component_MaguroSidebar = _sfc_main$2;
      const _component_NuxtPage = __nuxt_component_3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_MaguroNavbar, null, null, _parent2));
      _push(ssrRenderComponent(_component_NuxtLoadingIndicator, null, null, _parent2));
      _push(ssrRenderComponent(_component_MaguroSidebar, null, null, _parent2));
      _push(`<div class="${ssrRenderClass([{ "sidebar-open": unref(sidebarEnabled) }, "sidebar-mask"])}"></div>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent2));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/error-component-edf14d9f.mjs').then((r) => r.default || r));
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/island-renderer-4b293e4d.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = callWithNuxt(nuxtApp, showError, [err]);
        onServerPrefetch(() => p);
      }
    });
    const { islandContext } = nuxtApp.ssrContext;
    return (_ctx, _push, _parent2, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent2));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent2));
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$1), null, null, _parent2));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.2.2_sass@1.58.3/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _export_sfc as _, useRouter as a, useHead as b, createError as c, entry$1 as default, navigateTo as n, useAppConfig as u };
//# sourceMappingURL=server.mjs.map
