import { d as useRuntimeConfig } from '../virtual/entry.mjs';
import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderSlot } from '@vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import 'fnv1a-64';
import 'object-identity';
import '@vue/shared';
import 'perfect-debounce';
import 'unhead/plugins';
import 'unhead/utils';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'devalue';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import '@vue/compiler-dom';
import '@vue/runtime-dom';
import 'consola';
import 'minimatch';
import 'node:fs/promises';
import 'nuxtseo-shared/utils';
import 'fast-xml-parser';
import 'better-sqlite3';

//#region node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue
var _sfc_main = {
	__name: "ProseH5",
	__ssrInlineRender: true,
	props: { id: {
		type: String,
		required: false
	} },
	setup(__props) {
		const props = __props;
		const { headings } = useRuntimeConfig().public.mdc;
		const generate = vueExports.computed(() => props.id && (typeof headings?.anchorLinks === "boolean" && headings?.anchorLinks === true || typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h5));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<h5${ssrRenderAttrs(vueExports.mergeProps({ id: props.id }, _attrs))}>`);
			if (props.id && vueExports.unref(generate)) {
				_push(`<a${ssrRenderAttr("href", `#${props.id}`)}>`);
				ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
				_push(`</a>`);
			} else ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</h5>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProseH5-Bev5GhBH.mjs.map
