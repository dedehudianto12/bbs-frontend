import { N as NuxtLink } from '../virtual/entry.mjs';
import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderVNode, ssrRenderSlot } from '@vue/server-renderer';

//#region components/ui/Button.vue?vue&type=script&setup=true&lang.ts
var base = "group inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";
var Button_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "Button",
	__ssrInlineRender: true,
	props: {
		variant: { default: "solid" },
		size: { default: "md" },
		href: {},
		to: {},
		external: { type: Boolean },
		invert: {
			type: Boolean,
			default: false
		},
		arrow: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const resolvedVariant = vueExports.computed(() => {
			switch (props.variant) {
				case "primary": return "solid";
				case "accent": return "solid";
				case "secondary": return "white";
				case "outline": return "white";
				default: return props.variant;
			}
		});
		const isLink = vueExports.computed(() => resolvedVariant.value === "link");
		const showArrow = vueExports.computed(() => props.arrow || isLink.value);
		const sizeClasses = vueExports.computed(() => {
			if (isLink.value) return "text-sm";
			return {
				sm: "text-[13px] px-3.5 py-1.5 rounded-lg",
				md: "text-sm px-4 py-2 rounded-lg",
				lg: "text-[15px] px-5 py-2.5 rounded-lg"
			}[props.size];
		});
		const variantClasses = vueExports.computed(() => {
			const inv = props.invert;
			switch (resolvedVariant.value) {
				case "solid": return inv ? "bg-white text-ink hover:bg-white/85" : "bg-accent text-white shadow-sm shadow-accent/20 hover:bg-accent-glow";
				case "white": return inv ? "bg-white text-ink border border-transparent hover:bg-white/85" : "bg-white text-ink border border-line shadow-sm hover:border-ink/25";
				case "ghost": return inv ? "border border-white/20 text-white hover:bg-white/10 hover:border-white/35" : "border border-line text-ink hover:bg-ink/[0.04] hover:border-ink/25";
				case "link": return inv ? "text-white/70 hover:text-white" : "text-ink hover:text-accent";
				default: return "";
			}
		});
		const classes = vueExports.computed(() => [
			base,
			sizeClasses.value,
			variantClasses.value
		]);
		const NuxtLink$1 = NuxtLink;
		const tag = vueExports.computed(() => props.to ? NuxtLink$1 : props.href ? "a" : "button");
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderVNode(_push, vueExports.createVNode(vueExports.resolveDynamicComponent(vueExports.unref(tag)), vueExports.mergeProps({
				to: __props.to || void 0,
				href: __props.href || void 0,
				target: __props.href && __props.external ? "_blank" : void 0,
				rel: __props.href && __props.external ? "noopener noreferrer" : void 0,
				class: vueExports.unref(classes)
			}, _attrs), {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent, _scopeId);
						if (vueExports.unref(showArrow)) _push(`<svg class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${_scopeId}><path d="M5 12h14M13 6l6 6-6 6"${_scopeId}></path></svg>`);
						else _push(`<!---->`);
					} else return [vueExports.renderSlot(_ctx.$slots, "default"), vueExports.unref(showArrow) ? (vueExports.openBlock(), vueExports.createBlock("svg", {
						key: 0,
						class: "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "1.75",
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						"aria-hidden": "true"
					}, [vueExports.createVNode("path", { d: "M5 12h14M13 6l6 6-6 6" })])) : vueExports.createCommentVNode("", true)];
				}),
				_: 3
			}), _parent);
		};
	}
});
//#endregion
//#region components/ui/Button.vue
var _sfc_setup = Button_vue_vue_type_script_setup_true_lang_default.setup;
Button_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Button.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Button_default = Object.assign(Button_vue_vue_type_script_setup_true_lang_default, { __name: "Button" });

export { Button_default as B };
//# sourceMappingURL=Button-fRm7tXm0.mjs.map
