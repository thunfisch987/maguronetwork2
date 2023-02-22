import { getCurrentInstance, version, reactive, useSSRContext, shallowRef, computed, isReadonly, defineComponent, resolveComponent, createSlots, withCtx, unref, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, mergeProps, isRef, toDisplayString, Fragment as Fragment$1, renderList, createApp, toRef, nextTick, h, ref, Suspense, Transition, provide, onErrorCaptured, onServerPrefetch, inject, defineAsyncComponent } from 'vue';
import { $fetch } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { useHead, createHead as createHead$1 } from '@unhead/vue';
import { renderDOMHead, debouncedRenderDOMHead } from '@unhead/dom';
import { renderSSRHead } from '@unhead/ssr';
import { createMemoryHistory, createRouter, RouterView } from 'vue-router';
import { createError as createError$1, sendRedirect } from 'h3';
import { hasProtocol, parseURL, joinURL, isEqual } from 'ufo';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderSuspense } from 'vue/server-renderer';
import { defu } from 'defu';
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
const components = {};
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
    install(app) {
      if (version.startsWith("3")) {
        app.config.globalProperties.$head = unhead;
        app.provide("usehead", unhead);
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
      const api = useHead(input, options);
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
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [], "style": [], "script": [], "noscript": [] };
const appPageTransition = false;
const appKeepalive = false;
const vueuse_head_plugin_hJ5ut56rKX = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  head.push(appHead);
  nuxtApp.vueApp.use(head);
  nuxtApp._useHead = useHead;
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
    return inject("_route", useNuxtApp()._route);
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
    component: () => import('./_nuxt/index-995faf5a.mjs').then((m) => m.default || m)
  },
  {
    name: "EnergyDrinkWiki",
    path: "/EnergyDrinkWiki",
    children: [],
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-966a2e11.mjs').then((m) => m.default || m)
  },
  {
    name: "RandomMemes",
    path: "/RandomMemes",
    children: [],
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-9822aa12.mjs').then((m) => m.default || m)
  },
  {
    name: "Vegalou",
    path: "/Vegalou",
    children: [],
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-78b237d7.mjs').then((m) => m.default || m)
  },
  {
    name: "Weebsite",
    path: "/Weebsite",
    children: [],
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-938adfab.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    children: [],
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-5259fff2.mjs').then((m) => m.default || m)
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
function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
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
    } else if (isObject(value) && isObject(object[key])) {
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
defuFn(inlineConfig);
function useSidebarItems() {
  const items2 = [
    {
      title: "Main",
      icon: "",
      active: false,
      to: "index"
    },
    {
      title: "Akela",
      icon: "twemoji:dog-face",
      active: false,
      to: "Akela"
    },
    {
      title: "EnergyDrinkWiki",
      icon: "pepicons:can",
      active: false,
      to: "EnergyDrinkWiki"
    },
    {
      title: "RandomMemes",
      icon: "",
      image: "/fuckboi.png",
      active: false,
      to: "RandomMemes"
    },
    {
      title: "Vegalou",
      icon: "twemoji:llama",
      active: false,
      to: "Vegalou"
    },
    {
      title: "Nölz' Weebsite",
      icon: "",
      images: true,
      active: false,
      to: "Weebsite"
    },
    {
      title: "Razer4Ever",
      icon: "simple-icons:razer",
      href: new URL("https://oldr4e.littlebitgay.de")
    },
    {
      title: "Rocketgame",
      icon: "twemoji:rocket",
      href: new URL("https://rg.littlebitgay.de")
    }
  ];
  return useState("sidebarItems", () => items2);
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
let items = new tabArray(
  "/evangelion/asuka_smug.png",
  "/evangelion/cupoftea.PNG",
  "/evangelion/misato_smug.png",
  "/evangelion/misato_toast.PNG"
);
let weebsiteImages = reactive(items);
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
const set_45active_45site_45global = defineNuxtRouteMiddleware((to) => {
  const sidebarItems = useSidebarItems();
  const toggleSidebar = useToggleSidebar();
  sidebarItems.value.forEach(function(item) {
    if (item.to === to.name) {
      item.active = true;
    } else {
      item.active = false;
    }
  });
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
const _plugins = [
  components_plugin_KR1HBZs4kY,
  vueuse_head_plugin_hJ5ut56rKX,
  router_JCP0YfzX4Y
];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MaguroNavbar",
  __ssrInlineRender: true,
  setup(__props) {
    var toggleSidebar = useToggleSidebar();
    var currentDevice = useDevice();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VaNavbar = resolveComponent("VaNavbar");
      const _component_VaNavbarItem = resolveComponent("VaNavbarItem");
      const _component_VaButton = resolveComponent("VaButton");
      _push(ssrRenderComponent(_component_VaNavbar, _attrs, createSlots({
        left: withCtx((_, _push2, _parent2, _scopeId) => {
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
            }, _parent2, _scopeId));
            if (unref(currentDevice).isMobile) {
              _push2(ssrRenderComponent(_component_VaNavbarItem, { class: "logo" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` MAGURONETWORK `);
                  } else {
                    return [
                      createTextVNode(" MAGURONETWORK ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
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
                  createTextVNode(" MAGURONETWORK ")
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
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_VaNavbarItem, { class: "logo" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` MAGURONETWORK `);
                  } else {
                    return [
                      createTextVNode(" MAGURONETWORK ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_VaNavbarItem, { class: "logo" }, {
                  default: withCtx(() => [
                    createTextVNode(" MAGURONETWORK ")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MaguroNavbar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-df6d0a49"]]);
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
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MaguroSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarEnabled = useSidebarEnable();
    const toggleSidebar = useToggleSidebar();
    const sidebarItems = useSidebarItems();
    const weebsiteImages2 = useWeebsiteImages();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VaSidebar = resolveComponent("VaSidebar");
      const _component_VaSidebarItem = resolveComponent("VaSidebarItem");
      const _component_VaSidebarItemContent = resolveComponent("VaSidebarItemContent");
      const _component_VaSidebarItemTitle = resolveComponent("VaSidebarItemTitle");
      const _component_VaButton = resolveComponent("VaButton");
      const _component_NuxtImg = resolveComponent("NuxtImg");
      const _component_Icon = resolveComponent("Icon");
      const _component_VaIcon = resolveComponent("VaIcon");
      _push(ssrRenderComponent(_component_VaSidebar, mergeProps({
        position: "left",
        modelValue: unref(sidebarEnabled),
        "onUpdate:modelValue": ($event) => isRef(sidebarEnabled) ? sidebarEnabled.value = $event : null,
        style: { "position": "absolute", "z-index": "3" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
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
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(unref(sidebarItems), (item) => {
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
                            if (item.title === "RandomMemes") {
                              _push4(ssrRenderComponent(_component_NuxtImg, {
                                src: item.image,
                                style: { "width": "2em", "height": "2em" }
                              }, null, _parent4, _scopeId3));
                            } else if (item.title === "Nölz' Weebsite") {
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
                                  _push5(`${ssrInterpolate(item.title)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.title), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              item.title === "RandomMemes" ? (openBlock(), createBlock(_component_NuxtImg, {
                                key: 0,
                                src: item.image,
                                style: { "width": "2em", "height": "2em" }
                              }, null, 8, ["src"])) : item.title === "Nölz' Weebsite" ? (openBlock(), createBlock(_component_NuxtImg, {
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
                                  createTextVNode(toDisplayString(item.title), 1)
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
                            item.title === "RandomMemes" ? (openBlock(), createBlock(_component_NuxtImg, {
                              key: 0,
                              src: item.image,
                              style: { "width": "2em", "height": "2em" }
                            }, null, 8, ["src"])) : item.title === "Nölz' Weebsite" ? (openBlock(), createBlock(_component_NuxtImg, {
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
                                createTextVNode(toDisplayString(item.title), 1)
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
                }, _parent2, _scopeId));
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
                                  _push5(`${ssrInterpolate(item.title)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.title), 1)
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
                                  createTextVNode(toDisplayString(item.title), 1)
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
                                createTextVNode(toDisplayString(item.title), 1)
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
                }, _parent2, _scopeId));
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
              (openBlock(true), createBlock(Fragment$1, null, renderList(unref(sidebarItems), (item) => {
                return openBlock(), createBlock(Fragment$1, {
                  key: item.title
                }, [
                  !item.href ? (openBlock(), createBlock(_component_VaSidebarItem, {
                    key: 0,
                    active: item.active,
                    to: { name: item.to }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_VaSidebarItemContent, null, {
                        default: withCtx(() => [
                          item.title === "RandomMemes" ? (openBlock(), createBlock(_component_NuxtImg, {
                            key: 0,
                            src: item.image,
                            style: { "width": "2em", "height": "2em" }
                          }, null, 8, ["src"])) : item.title === "Nölz' Weebsite" ? (openBlock(), createBlock(_component_NuxtImg, {
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
                              createTextVNode(toDisplayString(item.title), 1)
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
                              createTextVNode(toDisplayString(item.title), 1)
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
      }, _parent));
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MaguroNavbar = __nuxt_component_0;
      const _component_NuxtLoadingIndicator = __nuxt_component_1;
      const _component_MaguroSidebar = _sfc_main$2;
      const _component_NuxtPage = __nuxt_component_3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_MaguroNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLoadingIndicator, null, null, _parent));
      _push(ssrRenderComponent(_component_MaguroSidebar, null, null, _parent));
      _push(`<div class="${ssrRenderClass([{ "sidebar-open": unref(sidebarEnabled) }, "sidebar-mask"])}"></div>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
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
    const ErrorComponent = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/error-component-ef89aec7.mjs').then((r) => r.default || r));
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/island-renderer-a66ba870.mjs').then((r) => r.default || r));
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
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$1), null, null, _parent));
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

export { _export_sfc as _, useNuxtApp as a, createError as c, entry$1 as default, navigateTo as n, useRouter as u };
//# sourceMappingURL=server.mjs.map
