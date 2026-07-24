import { defineComponent, useSlots, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';

//#region components/shared/GradientPanel.vue?vue&type=script&setup=true&lang.ts
var GradientPanel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "GradientPanel",
	__ssrInlineRender: true,
	props: {
		index: { default: 0 },
		rounded: { default: "rounded-lg" },
		grain: {
			type: Boolean,
			default: true
		}
	},
	setup(__props) {
		const props = __props;
		const slots = useSlots();
		const MOTIFS = [
			"belt",
			"roller",
			"joint"
		];
		const motif = computed(() => {
			const n = (props.index % MOTIFS.length + MOTIFS.length) % MOTIFS.length;
			return MOTIFS[n];
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["relative isolate overflow-hidden border border-line bg-paper-soft", __props.rounded] }, _attrs))}><div class="absolute inset-0" style="${ssrRenderStyle({ "background-image": "linear-gradient(135deg, rgb(var(--paper-soft)) 0%, rgb(var(--paper)) 100%)" })}" aria-hidden="true"></div><div class="blueprint-grid absolute inset-0 opacity-70" aria-hidden="true"></div>`);
			if (!unref(slots).default) {
				_push(`<svg viewBox="0 0 400 300" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" preserveAspectRatio="xMidYMid meet" class="absolute inset-0 h-full w-full p-7 text-ink/20" aria-hidden="true">`);
				if (unref(motif) === "belt") _push(`<!--[--><rect x="60" y="118" width="280" height="66" rx="33"></rect><circle cx="93" cy="151" r="20"></circle><circle cx="307" cy="151" r="20"></circle><circle cx="93" cy="151" r="3" fill="currentColor" stroke="none"></circle><circle cx="307" cy="151" r="3" fill="currentColor" stroke="none"></circle><path d="M150 118v-14h28v14M232 118v-20h22v20" opacity="0.65"></path><path d="M60 208v10M340 208v10M60 213h280" class="text-accent" stroke="currentColor" stroke-dasharray="4 5"></path><!--]-->`);
				else if (unref(motif) === "roller") _push(`<!--[--><rect x="104" y="104" width="192" height="52" rx="26"></rect><path d="M104 130h-26M296 130h26"></path><path d="M132 156v66M268 156v66M98 222h204"></path><path d="M132 194h136" opacity="0.6"></path><path d="M74 130h252" class="text-accent" stroke="currentColor" stroke-dasharray="3 6"></path><!--]-->`);
				else _push(`<!--[--><path d="M46 130h128v40H46M354 130H232v40h122"></path><path d="M188 120v60M212 120v60" opacity="0.7"></path><circle cx="200" cy="142" r="4" fill="currentColor" stroke="none"></circle><circle cx="200" cy="158" r="4" fill="currentColor" stroke="none"></circle><path d="M46 210h308" class="text-accent" stroke="currentColor" stroke-dasharray="4 6"></path><!--]-->`);
				_push(`</svg>`);
			} else _push(`<!---->`);
			if (!unref(slots).default) _push(`<span class="absolute left-3 top-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/70" aria-hidden="true"><span class="h-2 w-2 border-l-2 border-t-2 border-accent"></span> REF </span>`);
			else _push(`<!---->`);
			if (__props.grain) _push(`<div class="pointer-events-none absolute inset-0 bg-grain opacity-[0.18] mix-blend-multiply" aria-hidden="true"></div>`);
			else _push(`<!---->`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/shared/GradientPanel.vue
var _sfc_setup = GradientPanel_vue_vue_type_script_setup_true_lang_default.setup;
GradientPanel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/GradientPanel.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var GradientPanel_default = Object.assign(GradientPanel_vue_vue_type_script_setup_true_lang_default, { __name: "GradientPanel" });

export { GradientPanel_default as G };
//# sourceMappingURL=GradientPanel-CteABoXV.mjs.map
