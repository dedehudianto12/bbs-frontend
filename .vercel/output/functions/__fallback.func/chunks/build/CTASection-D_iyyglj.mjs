import { B as Button_default } from './Button-fRm7tXm0.mjs';
import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from '@vue/server-renderer';

//#region components/shared/CTASection.vue?vue&type=script&setup=true&lang.ts
var CTASection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "CTASection",
	__ssrInlineRender: true,
	props: {
		headline: {},
		description: {},
		buttonText: {},
		buttonLink: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Button = Button_default;
			_push(`<section${ssrRenderAttrs(vueExports.mergeProps({ class: "bg-paper" }, _attrs))}><div class="frame border-b border-line"><div class="relative isolate overflow-hidden bg-paper-soft px-6 py-20 text-center md:px-10 md:py-28"><div class="pointer-events-none absolute inset-0 blueprint-grid opacity-70" aria-hidden="true"></div><div class="hazard-stripe pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80" aria-hidden="true"></div><div class="relative"><p class="eyebrow justify-center text-accent"> Mulai sekarang </p><h2 class="display mx-auto mt-5 max-w-2xl text-3xl text-ink md:text-[2.75rem]">${ssrInterpolate(__props.headline)}</h2><p class="mx-auto mt-5 max-w-xl leading-relaxed text-muted">${ssrInterpolate(__props.description)}</p><div class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">`);
			_push(ssrRenderComponent(_component_Button, {
				to: __props.buttonLink,
				variant: "solid",
				arrow: ""
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(__props.buttonText)}`);
					else return [vueExports.createTextVNode(vueExports.toDisplayString(__props.buttonText), 1)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_Button, {
				href: "https://wa.me/6281234567890",
				external: "",
				variant: "white"
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` WhatsApp `);
					else return [vueExports.createTextVNode(" WhatsApp ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></div></section>`);
		};
	}
});
//#endregion
//#region components/shared/CTASection.vue
var _sfc_setup = CTASection_vue_vue_type_script_setup_true_lang_default.setup;
CTASection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/CTASection.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var CTASection_default = Object.assign(CTASection_vue_vue_type_script_setup_true_lang_default, { __name: "CTASection" });

export { CTASection_default as C };
//# sourceMappingURL=CTASection-D_iyyglj.mjs.map
