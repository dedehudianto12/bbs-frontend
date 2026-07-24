import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate } from '@vue/server-renderer';

//#region components/product/ProductFilter.vue?vue&type=script&setup=true&lang.ts
var ProductFilter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "ProductFilter",
	__ssrInlineRender: true,
	props: {
		options: {},
		modelValue: {}
	},
	emits: ["update:modelValue"],
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(vueExports.mergeProps({ class: "flex flex-wrap gap-2" }, _attrs))}><!--[-->`);
			ssrRenderList(__props.options, (opt) => {
				_push(`<button class="${ssrRenderClass([__props.modelValue === opt.value ? "border-accent bg-accent text-white" : "border-line bg-white text-muted hover:border-ink/30 hover:text-ink", "rounded-md border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors"])}">${ssrInterpolate(opt.label)}</button>`);
			});
			_push(`<!--]--></div>`);
		};
	}
});
//#endregion
//#region components/product/ProductFilter.vue
var _sfc_setup = ProductFilter_vue_vue_type_script_setup_true_lang_default.setup;
ProductFilter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductFilter.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProductFilter_default = Object.assign(ProductFilter_vue_vue_type_script_setup_true_lang_default, { __name: "ProductFilter" });

export { ProductFilter_default as P };
//# sourceMappingURL=ProductFilter-C0-JgnjB.mjs.map
