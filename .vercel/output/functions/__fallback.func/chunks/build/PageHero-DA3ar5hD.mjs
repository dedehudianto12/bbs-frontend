import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';

//#region components/shared/PageHero.vue?vue&type=script&setup=true&lang.ts
var PageHero_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PageHero",
	__ssrInlineRender: true,
	props: {
		eyebrow: {},
		title: {},
		description: {},
		size: { default: "md" },
		align: { default: "left" }
	},
	setup(__props) {
		const padding = {
			sm: "py-12 md:py-16",
			md: "py-14 md:py-20",
			lg: "py-16 md:py-24"
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-paper" }, _attrs))}><div class="frame border-b border-line"><div class="${ssrRenderClass([[padding[__props.size], __props.align === "center" ? "text-center" : ""], "px-5 md:px-10"])}">`);
			if (_ctx.$slots.breadcrumb) {
				_push(`<div class="mb-6">`);
				ssrRenderSlot(_ctx.$slots, "breadcrumb", {}, null, _push, _parent);
				_push(`</div>`);
			} else _push(`<!---->`);
			if (__props.eyebrow) _push(`<p class="${ssrRenderClass([__props.align === "center" ? "justify-center" : "", "eyebrow mb-4 text-muted"])}">${ssrInterpolate(__props.eyebrow)}</p>`);
			else _push(`<!---->`);
			_push(`<h1 class="${ssrRenderClass([__props.align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl", "display text-4xl text-ink md:text-5xl"])}">${ssrInterpolate(__props.title)}</h1>`);
			if (__props.description) _push(`<p class="${ssrRenderClass([__props.align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl", "mt-5 text-lg leading-relaxed text-muted"])}">${ssrInterpolate(__props.description)}</p>`);
			else _push(`<!---->`);
			if (_ctx.$slots.default) {
				_push(`<div class="${ssrRenderClass([__props.align === "center" ? "flex justify-center" : "", "mt-8"])}">`);
				ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div></div></section>`);
		};
	}
});
//#endregion
//#region components/shared/PageHero.vue
var _sfc_setup = PageHero_vue_vue_type_script_setup_true_lang_default.setup;
PageHero_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/PageHero.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var PageHero_default = Object.assign(PageHero_vue_vue_type_script_setup_true_lang_default, { __name: "PageHero" });

export { PageHero_default as P };
//# sourceMappingURL=PageHero-DA3ar5hD.mjs.map
