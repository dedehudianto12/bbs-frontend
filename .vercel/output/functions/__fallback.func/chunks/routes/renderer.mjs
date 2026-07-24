import { v as vueExports, u as useRuntimeConfig, e as encodePath, w as withLeadingSlash, b as buildAssetsURL, p as publicAssetsURL, a as defineRenderHandler, g as getQuery, c as createError, f as destr, h as getRouteRules, r as relative, j as joinURL, i as getResponseStatusText, k as getResponseStatus, l as useNitroApp } from '../nitro/nitro.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'unhead/server';
import { DeprecationsPlugin } from 'unhead/legacy';
import { PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'unhead/plugins';
import { defineDiagnostics, createConsoleReporter } from 'nostics';
import { renderToString } from '@vue/server-renderer';
import { stringify, uneval } from 'devalue';

/**
* E8xxx
* Nitro server runtime (SSR rendering / dev server) diagnostics.
*/
const docsBase = (code) => `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
const serverDiagnostics = /* #__PURE__ */ defineDiagnostics({
	docsBase,
	reporters: [/* @__PURE__ */ createConsoleReporter(void 0)],
	codes: {
		NUXT_E8001: {
			why: (p) => `\`render:html\` mutated \`body\`/\`bodyAppend\` while streaming (\`${p.path}\`). These fields are silently dropped because the body is about to stream.`,
			fix: "Use the `render:html:close` hook instead.",
			docs: false
		},
		NUXT_E8002: {
			why: (p) => `SSR streaming committed the response before render completed (\`${p.path}\`). The following mutations did not reach the client and were dropped:\n  - ${p.mutations}`,
			fix: (p) => `Move the mutation into a plugin (which runs before the shell is flushed), or opt this route out of streaming with \`routeRules: { '${p.path}': { streaming: false } }\` or the \`render:route\` hook.`,
			docs: false
		},
		NUXT_E8003: {
			why: (p) => `Failed to stringify dev server logs.${p.error ? ` Received \`${p.error}\`.` : ""}`,
			fix: "You can define your own reducer/reviver for rich types following the instructions in `https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload`.",
			docs: false
		},
		NUXT_E8004: {
			why: "The server bundle is not available.",
			fix: "Ensure the Nuxt build completed successfully and the server entry was emitted by your builder.",
			docs: false
		}
	}
});

const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;
const NUXT_SSR_STREAMING = false;

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function injectHead() {
  if (vueExports.hasInjectionContext()) {
    const instance = vueExports.inject(headSymbol);
    if (instance)
      return instance;
  }
  throw new Error("useHead() was called without provide context, ensure you call it through the setup() function.");
}
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

const VueResolver = /* @__PURE__ */ Object.assign(
  (_, value) => vueExports.isRef(value) ? vueExports.toValue(value) : value,
  // identity for plain non-reactive values, so the SSR default init entry
  // keeps its precomputed fast path (see unhead/server createHead)
  { _static: true }
);

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const legacyPlugins = [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin];

const unheadOptions = {
  disableDefaults: true,
  plugins: legacyPlugins,
};

function encodeEventPath(path) {
	const queryIndex = path.indexOf("?");
	if (queryIndex === -1) return encodePath(path);
	return encodePath(path.slice(0, queryIndex)) + path.slice(queryIndex);
}
function createSSRContext(event) {
	const url = encodeEventPath(event.path);
	const ssrContext = {
		url,
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: void 0,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: /* @__PURE__ */ new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

//#region src/runtime/utils/renderer/cache.ts
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) res = fn().catch((err) => {
			res = null;
			throw err;
		});
		return res;
	};
}

//#region src/runtime.ts
function createRendererContext({ manifest, precomputed, buildAssetsURL, dependencySetsCacheSize }) {
	if (!manifest && !precomputed) throw new Error("Either manifest or precomputed data must be provided");
	const ctx = {
		buildAssetsURL: buildAssetsURL || withLeadingSlash,
		manifest,
		precomputed,
		updateManifest,
		_dependencies: {},
		_dependencySets: /* @__PURE__ */ new Map(),
		_dependencySetsCacheSize: typeof dependencySetsCacheSize === "number" && Number.isFinite(dependencySetsCacheSize) && dependencySetsCacheSize > 0 ? Math.floor(dependencySetsCacheSize) : dependencySetsCacheSize === void 0 ? 1e3 : 0,
		_entrypoints: []
	};
	function updateManifest(manifest) {
		const manifestEntries = Object.entries(manifest);
		ctx.manifest = manifest;
		ctx._dependencies = {};
		ctx._dependencySets.clear();
		ctx._entrypoints = manifestEntries.filter((e) => e[1].isEntry).map(([module]) => module);
	}
	if (precomputed) {
		ctx._dependencies = precomputed.dependencies;
		ctx._entrypoints = precomputed.entrypoints;
	} else if (manifest) updateManifest(manifest);
	return ctx;
}
function getModuleDependencies(id, rendererContext) {
	if (rendererContext._dependencies[id]) return rendererContext._dependencies[id];
	const dependencies = rendererContext._dependencies[id] = {
		scripts: {},
		styles: {},
		preload: {},
		prefetch: {}
	};
	if (!rendererContext.manifest) return dependencies;
	const meta = rendererContext.manifest[id];
	if (!meta) return dependencies;
	if (meta.file) {
		dependencies.preload[id] = meta;
		if (meta.isEntry || meta.sideEffects) dependencies.scripts[id] = meta;
	}
	for (const css of meta.css || []) dependencies.styles[css] = dependencies.preload[css] = dependencies.prefetch[css] = rendererContext.manifest[css];
	for (const asset of meta.assets || []) dependencies.preload[asset] = dependencies.prefetch[asset] = rendererContext.manifest[asset];
	for (const depId of meta.imports || []) {
		const depDeps = getModuleDependencies(depId, rendererContext);
		for (const key in depDeps.styles) dependencies.styles[key] = depDeps.styles[key];
		for (const key in depDeps.preload) dependencies.preload[key] = depDeps.preload[key];
		for (const key in depDeps.prefetch) dependencies.prefetch[key] = depDeps.prefetch[key];
	}
	const filteredPreload = {};
	for (const id in dependencies.preload) {
		const dep = dependencies.preload[id];
		if (dep.preload) filteredPreload[id] = dep;
	}
	dependencies.preload = filteredPreload;
	return dependencies;
}
function getAllDependencies(ids, rendererContext) {
	const cacheSize = rendererContext._dependencySetsCacheSize;
	const useCache = cacheSize > 0;
	let cacheKey = "";
	if (useCache) {
		if (ids.size <= 1) for (const id of ids) cacheKey = id;
		else cacheKey = [...ids].sort().join(",");
		const cached = rendererContext._dependencySets.get(cacheKey);
		if (cached !== void 0) {
			if (rendererContext._dependencySets.size >= cacheSize) {
				rendererContext._dependencySets.delete(cacheKey);
				rendererContext._dependencySets.set(cacheKey, cached);
			}
			return cached;
		}
	}
	const allDeps = {
		scripts: {},
		styles: {},
		preload: {},
		prefetch: {}
	};
	for (const id of ids) {
		const deps = getModuleDependencies(id, rendererContext);
		for (const key in deps.scripts) allDeps.scripts[key] = deps.scripts[key];
		for (const key in deps.styles) allDeps.styles[key] = deps.styles[key];
		for (const key in deps.preload) allDeps.preload[key] = deps.preload[key];
		for (const key in deps.prefetch) allDeps.prefetch[key] = deps.prefetch[key];
		for (const dynamicDepId of rendererContext.manifest?.[id]?.dynamicImports || []) {
			const dynamicDeps = getModuleDependencies(dynamicDepId, rendererContext);
			for (const key in dynamicDeps.scripts) allDeps.prefetch[key] = dynamicDeps.scripts[key];
			for (const key in dynamicDeps.styles) allDeps.prefetch[key] = dynamicDeps.styles[key];
			for (const key in dynamicDeps.preload) allDeps.prefetch[key] = dynamicDeps.preload[key];
		}
	}
	const filteredPrefetch = {};
	for (const id in allDeps.prefetch) {
		const dep = allDeps.prefetch[id];
		if (dep.prefetch) filteredPrefetch[id] = dep;
	}
	allDeps.prefetch = filteredPrefetch;
	for (const id in allDeps.preload) delete allDeps.prefetch[id];
	for (const style in allDeps.styles) {
		delete allDeps.preload[style];
		delete allDeps.prefetch[style];
	}
	if (useCache) {
		rendererContext._dependencySets.set(cacheKey, allDeps);
		if (rendererContext._dependencySets.size > cacheSize) {
			const oldest = rendererContext._dependencySets.keys().next().value;
			if (oldest !== void 0) rendererContext._dependencySets.delete(oldest);
		}
	}
	return allDeps;
}
function getRequestDependencies(ssrContext, rendererContext, options) {
	const excluded = options?.exclude ? new Set(options.exclude) : void 0;
	const hasExcluded = excluded && excluded.size > 0;
	if (!hasExcluded && ssrContext._requestDependencies) return ssrContext._requestDependencies;
	let ids;
	const requestIds = ssrContext.modules || ssrContext._registeredComponents;
	if (hasExcluded) {
		ids = /* @__PURE__ */ new Set();
		for (const id of rendererContext._entrypoints) if (!excluded.has(id)) ids.add(id);
		if (requestIds) {
			for (const id of requestIds) if (!excluded.has(id)) ids.add(id);
		}
	} else {
		ids = new Set(rendererContext._entrypoints);
		if (requestIds) for (const id of requestIds) ids.add(id);
	}
	const deps = getAllDependencies(ids, rendererContext);
	if (!hasExcluded) ssrContext._requestDependencies = deps;
	return deps;
}
function renderStyles(ssrContext, rendererContext) {
	const { styles } = getRequestDependencies(ssrContext, rendererContext);
	let result = "";
	for (const key in styles) {
		const resource = styles[key];
		result += `<link rel="stylesheet" href="${rendererContext.buildAssetsURL(resource.file)}" crossorigin>`;
	}
	return result;
}
function renderResourceHints(ssrContext, rendererContext, options) {
	const { preload, prefetch } = getRequestDependencies(ssrContext, rendererContext, options);
	let result = "";
	for (const key in preload) {
		const resource = preload[key];
		const href = rendererContext.buildAssetsURL(resource.file);
		const rel = resource.module ? "modulepreload" : "preload";
		const crossorigin = resource.resourceType === "style" || resource.resourceType === "font" || resource.resourceType === "script" || resource.module ? " crossorigin" : "";
		if (resource.resourceType && resource.mimeType) result += `<link rel="${rel}" as="${resource.resourceType}" type="${resource.mimeType}"${crossorigin} href="${href}">`;
		else if (resource.resourceType) result += `<link rel="${rel}" as="${resource.resourceType}"${crossorigin} href="${href}">`;
		else result += `<link rel="${rel}"${crossorigin} href="${href}">`;
	}
	for (const key in prefetch) {
		const resource = prefetch[key];
		const href = rendererContext.buildAssetsURL(resource.file);
		const crossorigin = resource.resourceType === "style" || resource.resourceType === "font" || resource.resourceType === "script" || resource.module ? " crossorigin" : "";
		if (resource.resourceType && resource.mimeType) result += `<link rel="prefetch" as="${resource.resourceType}" type="${resource.mimeType}"${crossorigin} href="${href}">`;
		else if (resource.resourceType) result += `<link rel="prefetch" as="${resource.resourceType}"${crossorigin} href="${href}">`;
		else result += `<link rel="prefetch"${crossorigin} href="${href}">`;
	}
	return result;
}
function renderResourceHeaders(ssrContext, rendererContext, options) {
	const { preload, prefetch } = getRequestDependencies(ssrContext, rendererContext, options);
	const links = [];
	for (const key in preload) {
		const resource = preload[key];
		let header = `<${rendererContext.buildAssetsURL(resource.file)}>; rel="${resource.module ? "modulepreload" : "preload"}"`;
		if (resource.resourceType) header += `; as="${resource.resourceType}"`;
		if (resource.mimeType) header += `; type="${resource.mimeType}"`;
		if (resource.resourceType === "style" || resource.resourceType === "font" || resource.resourceType === "script" || resource.module) header += "; crossorigin";
		links.push(header);
	}
	for (const key in prefetch) {
		const resource = prefetch[key];
		let header = `<${rendererContext.buildAssetsURL(resource.file)}>; rel="prefetch"`;
		if (resource.resourceType) header += `; as="${resource.resourceType}"`;
		if (resource.mimeType) header += `; type="${resource.mimeType}"`;
		if (resource.resourceType === "style" || resource.resourceType === "font" || resource.resourceType === "script" || resource.module) header += "; crossorigin";
		links.push(header);
	}
	return { link: links.join(", ") };
}
function getPreloadLinks(ssrContext, rendererContext, options) {
	const { preload } = getRequestDependencies(ssrContext, rendererContext, options);
	const result = [];
	for (const key in preload) {
		const resource = preload[key];
		result.push({
			rel: resource.module ? "modulepreload" : "preload",
			as: resource.resourceType,
			type: resource.mimeType ?? null,
			crossorigin: resource.resourceType === "style" || resource.resourceType === "font" || resource.resourceType === "script" || resource.module ? "" : null,
			href: rendererContext.buildAssetsURL(resource.file)
		});
	}
	return result;
}
function getPrefetchLinks(ssrContext, rendererContext, options) {
	const { prefetch } = getRequestDependencies(ssrContext, rendererContext, options);
	const result = [];
	for (const key in prefetch) {
		const resource = prefetch[key];
		result.push({
			rel: "prefetch",
			as: resource.resourceType,
			type: resource.mimeType ?? null,
			crossorigin: resource.resourceType === "style" || resource.resourceType === "font" || resource.resourceType === "script" || resource.module ? "" : null,
			href: rendererContext.buildAssetsURL(resource.file)
		});
	}
	return result;
}
function renderScripts(ssrContext, rendererContext) {
	const { scripts } = getRequestDependencies(ssrContext, rendererContext);
	let result = "";
	for (const key in scripts) {
		const resource = scripts[key];
		if (resource.module) result += `<script type="module" src="${rendererContext.buildAssetsURL(resource.file)}" crossorigin><\/script>`;
		else result += `<script src="${rendererContext.buildAssetsURL(resource.file)}" defer crossorigin><\/script>`;
	}
	return result;
}
function createRenderer(createApp, renderOptions) {
	const rendererContext = createRendererContext(renderOptions);
	return {
		rendererContext,
		async renderToString(ssrContext) {
			ssrContext._registeredComponents = ssrContext._registeredComponents || /* @__PURE__ */ new Set();
			const app = await (await Promise.resolve(createApp).then((r) => "default" in r ? r.default : r))(ssrContext);
			const html = await renderOptions.renderToString(app, ssrContext);
			const wrap = (fn) => () => fn(ssrContext, rendererContext);
			return {
				html,
				renderResourceHeaders: wrap(renderResourceHeaders),
				renderResourceHints: wrap(renderResourceHints),
				renderStyles: wrap(renderStyles),
				renderScripts: wrap(renderScripts)
			};
		}
	};
}

const appHead = {"link":[{"rel":"preconnect","href":"https://fonts.googleapis.com"},{"rel":"preconnect","href":"https://fonts.gstatic.com","crossorigin":""},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"}],"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"},{"property":"og:type","content":"website"}],"style":[],"script":[],"noscript":[],"htmlAttrs":{}};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

//#region src/runtime/utils/renderer/build-files.ts
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('../virtual/entry.mjs').then(function (n) { return n.f; }).then((r) => r.default || r);
const getPrecomputedDependencies = () => import('../virtual/precomputed.mjs').then((r) => "default" in r ? r.default : r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) throw serverDiagnostics.NUXT_E8004();
	const renderer = createRenderer(createSSRApp, {
		precomputed: await getPrecomputedDependencies(),
		manifest: void 0,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = await getPrecomputedDependencies();
	const spaTemplate = await import('../virtual/_virtual_spa-template.mjs').then((r) => r.template).catch(() => "").then((r) => {
		{
			const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
			const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
			return APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG + (r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "");
		}
	});
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: void 0,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= /* @__PURE__ */ new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => import('../virtual/styles.mjs').then((r) => r.default || r));

//#region src/runtime/utils/renderer/inline-styles.ts
async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = /* @__PURE__ */ new Set();
	const promises = [];
	for (const mod of usedModules) if (mod in styleMap && styleMap[mod]) promises.push(styleMap[mod]());
	for (const styles of await Promise.all(promises)) for (const style of styles) inlinedStyles.add(style);
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

function renderPayloadJsonScript(opts) {
	const payload = {
		"type": "application/json",
		"innerHTML": opts.data ? encodeForwardSlashes(stringify(opts.data, opts.ssrContext["~payloadReducers"])) : "",
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	payload.id = "__NUXT_DATA__";
	if (opts.src) payload["data-src"] = opts.src;
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}
/**
* Encode forward slashes as unicode escape sequences to prevent
* Google from treating them as internal links and trying to crawl them.
* @see https://github.com/nuxt/nuxt/issues/24175
*/
function encodeForwardSlashes(str) {
	return str.replaceAll("/", "\\u002F");
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

const entryIds = [];

const entryFileName = "BAH04pRZ.js";

//#region src/runtime/handlers/renderer.ts
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
let entryPath;
const handler = defineRenderHandler((event) => {
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) throw createError({
		status: 404,
		statusText: "Page Not Found: /__nuxt_error",
		message: "Page Not Found: /__nuxt_error"
	});
	return renderRoute(event, ssrError);
});
async function renderRoute(event, ssrError) {
	const nitroApp = useNitroApp();
	const ssrContext = createSSRContext(event);
	ssrContext.head.push(appHead);
	if (ssrError) {
		const status = ssrError.status || ssrError.statusCode;
		if (status) ssrError.status = ssrError.statusCode = Number.parseInt(status);
		if (typeof ssrError.data === "string") try {
			ssrError.data = destr(ssrError.data);
		} catch {}
		setSSRError(ssrContext, ssrError);
	}
	const routeOptions = getRouteRules(event);
	if (routeOptions.ssr === false) ssrContext.noSSR = true;
	!ssrContext.noSSR && (NUXT_RUNTIME_PAYLOAD_EXTRACTION);
	const renderer = await getRenderer(ssrContext);
	for (const id of entryIds) ssrContext.modules.add(id);
	const canStream = NUXT_SSR_STREAMING;
	const renderRouteContext = {
		canStream,
		prefersStream: false
	};
	await nitroApp.hooks.callHook("render:route", renderRouteContext, { event });
	const _rendered = await (renderer.renderToString(ssrContext)).catch(async (error) => {
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") return {};
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	const inlinedStyles = !ssrContext["~renderResponse"] && !ssrContext._renderResponse && true ? await renderInlineStyles(ssrContext.modules ?? []) : [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	if (ssrContext.payload?.error && !ssrError) throw ssrContext.payload.error;
	const NO_SCRIPTS = routeOptions.noScripts;
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	if (!NO_SCRIPTS) {
		let path = entryPath;
		if (!path) {
			path = buildAssetsURL(entryFileName);
			if (ssrContext.runtimeConfig.app.cdnURL || /^(?:\/|\.+\/)/.test(path)) entryPath = path;
			else {
				path = relative(event.path.replace(/\/[^/]+$/, "/"), joinURL("/", path));
				if (!/^(?:\/|\.+\/)/.test(path)) path = `./${path}`;
			}
		}
		ssrContext.head.push({ script: [{
			type: "importmap",
			innerHTML: { imports: { "#entry": path } }
		}] });
	}
	if (inlinedStyles.length) ssrContext.head.push({ style: inlinedStyles });
	const link = [];
	for (const resource of Object.values(styles)) {
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) ssrContext.head.push({ link });
	if (!NO_SCRIPTS) {
		const dependencyOptions = ssrContext["~lazyHydratedModules"]?.size ? { exclude: ssrContext["~lazyHydratedModules"] } : void 0;
		ssrContext.head.push({ link: getPreloadLinks(ssrContext, renderer.rendererContext, dependencyOptions) });
		ssrContext.head.push({ link: getPrefetchLinks(ssrContext, renderer.rendererContext, dependencyOptions) });
		ssrContext.head.push({ script: renderPayloadJsonScript({
			ssrContext,
			data: stripInlineOnlyPayloadFields(ssrContext.payload)
		})   }, {
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			tagPosition,
			crossorigin: ""
		})) });
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [_rendered.html, APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
}
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) result.push(chunk);
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) return "";
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
function stripInlineOnlyPayloadFields(payload) {
	if (!payload.prefetchLinks) return payload;
	const { prefetchLinks: _, ...rest } = payload;
	return rest;
}

const renderer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: handler
}, Symbol.toStringTag, { value: 'Module' }));

export { VueResolver as V, headSymbol as h, injectHead as i, renderer as r };
//# sourceMappingURL=renderer.mjs.map
