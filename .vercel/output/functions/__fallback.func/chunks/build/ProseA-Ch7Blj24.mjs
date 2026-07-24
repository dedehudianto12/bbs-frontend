import { N as NuxtLink } from '../virtual/entry.mjs';
import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderComponent, ssrRenderSlot } from '@vue/server-renderer';
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

//#region node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue
var _sfc_main = {
	__name: "ProseA",
	__ssrInlineRender: true,
	props: {
		href: {
			type: String,
			default: ""
		},
		target: {
			type: String,
			default: void 0,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(NuxtLink, vueExports.mergeProps({
				href: props.href,
				target: props.target
			}, _attrs), {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
					else return [vueExports.renderSlot(_ctx.$slots, "default")];
				}),
				_: 3
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProseA-Ch7Blj24.mjs.map
