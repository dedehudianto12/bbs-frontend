import { N as NuxtLink } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

//#region components/shared/Breadcrumb.vue?vue&type=script&setup=true&lang.ts
var Breadcrumb_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Breadcrumb",
	__ssrInlineRender: true,
	props: {
		items: {},
		invert: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<nav${ssrRenderAttrs(mergeProps({
				"aria-label": "Breadcrumb",
				class: ["flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em]", __props.invert ? "text-white/45" : "text-muted"]
			}, _attrs))}><!--[-->`);
			ssrRenderList(__props.items, (item, i) => {
				_push(`<!--[-->`);
				if (i > 0) _push(`<span class="${ssrRenderClass([__props.invert ? "text-white/25" : "text-muted/40", "shrink-0"])}">/</span>`);
				else _push(`<!---->`);
				if (item.href) _push(ssrRenderComponent(_component_NuxtLink, {
					to: item.href,
					class: ["transition-colors", __props.invert ? "hover:text-white" : "hover:text-ink"]
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(item.label)}`);
						else return [createTextVNode(toDisplayString(item.label), 1)];
					}),
					_: 2
				}, _parent));
				else _push(`<span class="${ssrRenderClass(__props.invert ? "text-white" : "text-ink")}">${ssrInterpolate(item.label)}</span>`);
				_push(`<!--]-->`);
			});
			_push(`<!--]--></nav>`);
		};
	}
});
//#endregion
//#region components/shared/Breadcrumb.vue
var _sfc_setup = Breadcrumb_vue_vue_type_script_setup_true_lang_default.setup;
Breadcrumb_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/Breadcrumb.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Breadcrumb_default = Object.assign(Breadcrumb_vue_vue_type_script_setup_true_lang_default, { __name: "Breadcrumb" });

export { Breadcrumb_default as B };
//# sourceMappingURL=Breadcrumb-Cajep9qD.mjs.map
