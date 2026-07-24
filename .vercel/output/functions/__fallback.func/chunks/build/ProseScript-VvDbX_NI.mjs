import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderAttrs } from '@vue/server-renderer';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import '@vue/compiler-dom';
import '@vue/runtime-dom';
import '@vue/shared';
import 'consola';
import 'minimatch';
import 'node:fs/promises';
import 'nuxtseo-shared/utils';
import 'fast-xml-parser';
import 'better-sqlite3';

//#region node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue
var _sfc_main = {
	__name: "ProseScript",
	__ssrInlineRender: true,
	props: { src: {
		type: String,
		default: ""
	} },
	setup(__props) {
		const isDev = false;
		return (_ctx, _push, _parent, _attrs) => {
			if (vueExports.unref(isDev)) _push(`<div${ssrRenderAttrs(_attrs)}> Rendering the <code>script</code> element is dangerous and is disabled by default. Consider implementing your own <code>ProseScript</code> element to have control over script rendering. </div>`);
			else _push(`<!---->`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProseScript-VvDbX_NI.mjs.map
