import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from '@vue/server-renderer';

//#region components/shared/SectionTitle.vue?vue&type=script&setup=true&lang.ts
var SectionTitle_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "SectionTitle",
	__ssrInlineRender: true,
	props: {
		eyebrow: {},
		title: {},
		description: {},
		align: { default: "left" },
		invert: { type: Boolean }
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(vueExports.mergeProps({ class: ["max-w-2xl", __props.align === "center" ? "mx-auto text-center" : ""] }, _attrs))}>`);
			if (__props.eyebrow) _push(`<p class="${ssrRenderClass([[__props.invert ? "text-white/40" : "text-muted", __props.align === "center" ? "justify-center" : ""], "eyebrow mb-4"])}">${ssrInterpolate(__props.eyebrow)}</p>`);
			else _push(`<!---->`);
			_push(`<h2 class="${ssrRenderClass([__props.invert ? "text-white" : "text-ink", "display text-3xl md:text-[2.5rem]"])}">${ssrInterpolate(__props.title)}</h2>`);
			if (__props.description) _push(`<p class="${ssrRenderClass([__props.invert ? "text-white/55" : "text-muted", "mt-4 text-base leading-relaxed"])}">${ssrInterpolate(__props.description)}</p>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/shared/SectionTitle.vue
var _sfc_setup = SectionTitle_vue_vue_type_script_setup_true_lang_default.setup;
SectionTitle_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SectionTitle.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var SectionTitle_default = Object.assign(SectionTitle_vue_vue_type_script_setup_true_lang_default, { __name: "SectionTitle" });

export { SectionTitle_default as S };
//# sourceMappingURL=SectionTitle-BXJanOjs.mjs.map
