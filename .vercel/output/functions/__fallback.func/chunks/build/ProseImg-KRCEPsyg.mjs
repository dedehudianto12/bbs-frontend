import { d as useRuntimeConfig } from '../virtual/entry.mjs';
import { v as vueExports, w as withLeadingSlash, z as withTrailingSlash, j as joinURL } from '../nitro/nitro.mjs';
import { ssrRenderVNode } from '@vue/server-renderer';
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

//#region node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue
var _sfc_main = {
	__name: "ProseImg",
	__ssrInlineRender: true,
	props: {
		src: {
			type: String,
			default: ""
		},
		alt: {
			type: String,
			default: ""
		},
		width: {
			type: [String, Number],
			default: void 0
		},
		height: {
			type: [String, Number],
			default: void 0
		}
	},
	setup(__props) {
		const props = __props;
		const refinedSrc = vueExports.computed(() => {
			if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
				const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL));
				if (_base !== "/" && !props.src.startsWith(_base)) return joinURL(_base, props.src);
			}
			return props.src;
		});
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderVNode(_push, vueExports.createVNode(vueExports.resolveDynamicComponent(vueExports.unref("img")), vueExports.mergeProps({
				src: vueExports.unref(refinedSrc),
				alt: props.alt,
				width: props.width,
				height: props.height
			}, _attrs), null), _parent);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProseImg-KRCEPsyg.mjs.map
