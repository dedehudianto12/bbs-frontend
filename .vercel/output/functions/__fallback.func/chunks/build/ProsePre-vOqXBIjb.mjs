import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderAttrs, ssrRenderSlot } from '@vue/server-renderer';
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

//#region node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue
var _sfc_main = {
	__name: "ProsePre",
	__ssrInlineRender: true,
	props: {
		code: {
			type: String,
			default: ""
		},
		language: {
			type: String,
			default: null
		},
		filename: {
			type: String,
			default: null
		},
		highlights: {
			type: Array,
			default: () => []
		},
		meta: {
			type: String,
			default: null
		},
		class: {
			type: String,
			default: null
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<pre${ssrRenderAttrs(vueExports.mergeProps({ class: _ctx.$props.class }, _attrs))}>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</pre>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProsePre-vOqXBIjb.mjs.map
