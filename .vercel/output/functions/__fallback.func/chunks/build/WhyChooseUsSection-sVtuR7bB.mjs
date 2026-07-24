import { N as NuxtLink } from '../virtual/entry.mjs';
import { S as SectionTitle_default } from './SectionTitle-BXJanOjs.mjs';
import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrGetDirectiveProps, ssrRenderClass } from '@vue/server-renderer';

//#region utils/motion.ts
var EASE_OUT_GSAP = "power2.out";
var DUR = {
	base: .45,
	draw: .9};
function usePrefersReducedMotion() {
	return vueExports.ref(false);
}
//#endregion
//#region components/home/StatisticsSection.vue?vue&type=script&setup=true&lang.ts
var StatisticsSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "StatisticsSection",
	__ssrInlineRender: true,
	props: { items: {} },
	setup(__props) {
		const props = __props;
		function num(v) {
			return parseInt(v.replace(/[^\d]/g, ""), 10) || 0;
		}
		const hero = vueExports.computed(() => [...props.items].sort((a, b) => num(b.value) - num(a.value))[0]);
		const rest = vueExports.computed(() => props.items.filter((it) => it !== hero.value));
		const reduced = usePrefersReducedMotion();
		vueExports.ref(null);
		const ticked = vueExports.ref(null);
		const heroTarget = vueExports.computed(() => num(hero.value?.value ?? ""));
		const heroSuffix = vueExports.computed(() => (hero.value?.value ?? "").replace(/[\d.,\s]/g, ""));
		const heroDisplay = vueExports.computed(() => ticked.value === null ? String(heroTarget.value) : String(ticked.value));
		const sparkFrom = vueExports.computed(() => reduced.value ? { duration: .001 } : {
			strokeDashoffset: 460,
			duration: DUR.draw,
			ease: EASE_OUT_GSAP
		});
		const sparkFillFrom = vueExports.computed(() => reduced.value ? { duration: .001 } : {
			opacity: 0,
			duration: .6,
			delay: .45,
			ease: EASE_OUT_GSAP
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _directive_gsap = vueExports.resolveDirective("gsap");
			let _temp0, _temp1;
			_push(`<section${ssrRenderAttrs(vueExports.mergeProps({ class: "bg-paper" }, _attrs))}><div class="frame border-b border-line"><div class="border-b border-line px-6 py-14 md:px-10 md:py-16"><h2 class="display max-w-xl text-3xl text-ink md:text-[2.6rem]"> Dipercaya oleh ratusan industri di seluruh Indonesia </h2></div>`);
			if (vueExports.unref(hero)) _push(`<div class="grid border-b border-line md:grid-cols-2"><div class="flex min-h-[280px] flex-col justify-between px-6 py-8 md:min-h-[340px] md:px-10 md:py-10"><p class="text-sm font-medium text-muted">Total ${ssrInterpolate(vueExports.unref(hero).label.toLowerCase())}</p><p class="display text-6xl tabular-nums text-ink md:text-8xl">${ssrInterpolate(vueExports.unref(heroDisplay))}${ssrInterpolate(vueExports.unref(heroSuffix))}</p></div><div class="flex flex-col border-t border-line px-6 py-8 md:border-l md:border-t-0 md:px-8"><span class="inline-flex w-fit items-center gap-2 rounded-md border border-line bg-white px-3 py-1.5 text-[13px] font-medium text-ink/80 shadow-sm"><span class="h-1.5 w-1.5 rounded-full bg-accent"></span> Pertumbuhan proyek <svg class="h-3 w-3 text-ink/40" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path></svg></span><svg class="mt-6 h-40 w-full flex-1 md:h-auto" viewBox="0 0 400 150" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="stat-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgb(228 87 27)" stop-opacity="0.22"></stop><stop offset="1" stop-color="rgb(228 87 27)" stop-opacity="0"></stop></linearGradient></defs><path${ssrRenderAttrs(_temp0 = vueExports.mergeProps({
				d: "M0 138 L40 132 L80 134 L120 122 L160 126 L200 104 L240 110 L280 78 L320 84 L360 40 L400 14 L400 150 L0 150 Z",
				fill: "url(#stat-fill)"
			}, ssrGetDirectiveProps(_ctx, _directive_gsap, vueExports.unref(sparkFillFrom), void 0, {
				whenVisible: true,
				once: true,
				from: true
			})))}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : _temp0.innerHTML ?? ""}</path><path${ssrRenderAttrs(_temp1 = vueExports.mergeProps({
				d: "M0 138 L40 132 L80 134 L120 122 L160 126 L200 104 L240 110 L280 78 L320 84 L360 40 L400 14",
				fill: "none",
				stroke: "rgb(228 87 27)",
				"stroke-width": "1.8",
				"stroke-linejoin": "round",
				"stroke-linecap": "round",
				"stroke-dasharray": "460"
			}, ssrGetDirectiveProps(_ctx, _directive_gsap, vueExports.unref(sparkFrom), void 0, {
				whenVisible: true,
				once: true,
				from: true
			})))}>${"textContent" in _temp1 ? ssrInterpolate(_temp1.textContent) : _temp1.innerHTML ?? ""}</path></svg><div class="mt-3 flex justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-muted/80"><span>2010</span><span>Hari ini</span></div></div></div>`);
			else _push(`<!---->`);
			_push(`<div class="grid sm:grid-cols-3"><!--[-->`);
			ssrRenderList(vueExports.unref(rest), (item, i) => {
				_push(`<div class="${ssrRenderClass([i > 0 ? "sm:border-l sm:border-line" : "", "border-b border-line px-6 py-8 last:border-b-0 sm:border-b-0 md:px-10 md:py-10"])}"><p class="display text-4xl tabular-nums text-ink md:text-5xl">${ssrInterpolate(item.value)}</p><p class="mt-3 text-sm text-muted">${ssrInterpolate(item.label)}</p></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region components/home/StatisticsSection.vue
var _sfc_setup$1 = StatisticsSection_vue_vue_type_script_setup_true_lang_default.setup;
StatisticsSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/StatisticsSection.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var StatisticsSection_default = Object.assign(StatisticsSection_vue_vue_type_script_setup_true_lang_default, { __name: "StatisticsSection" });
//#endregion
//#region components/home/WhyChooseUsSection.vue?vue&type=script&setup=true&lang.ts
var WhyChooseUsSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "WhyChooseUsSection",
	__ssrInlineRender: true,
	props: { items: {} },
	setup(__props) {
		const props = __props;
		const fillerCount = vueExports.computed(() => {
			return (3 - (props.items.length + 1) % 3) % 3;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_SectionTitle = SectionTitle_default;
			const _component_NuxtLink = NuxtLink;
			_push(`<section${ssrRenderAttrs(vueExports.mergeProps({ class: "bg-paper" }, _attrs))}><div class="frame border-b border-line"><div class="border-b border-line px-6 py-14 md:px-10 md:py-16">`);
			_push(ssrRenderComponent(_component_SectionTitle, {
				eyebrow: "Kenapa BBS Conveyor",
				title: "Mitra terpercaya untuk conveyor industri",
				description: "Lima alasan perusahaan di seluruh Indonesia mempercayakan kebutuhan conveyor mereka kepada kami."
			}, null, _parent));
			_push(`</div><div class="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
			ssrRenderList(__props.items, (item, i) => {
				_push(`<div class="bg-paper p-7 md:p-9"><span class="text-sm font-semibold tabular-nums text-accent">${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span><h3 class="mt-5 text-lg font-semibold text-ink">${ssrInterpolate(item.title)}</h3><p class="mt-2 text-sm leading-relaxed text-muted">${ssrInterpolate(item.description)}</p></div>`);
			});
			_push(`<!--]-->`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/kontak",
				class: "group flex flex-col justify-between bg-paper p-7 transition-colors hover:bg-paper-soft md:p-9"
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="text-lg leading-none text-accent"${_scopeId}>→</span><div${_scopeId}><h3 class="text-lg font-semibold text-ink"${_scopeId}>Butuh bantuan memilih?</h3><p class="mt-2 text-sm text-muted transition-colors group-hover:text-accent"${_scopeId}> Konsultasi gratis dengan tim kami </p></div>`);
					else return [vueExports.createVNode("span", { class: "text-lg leading-none text-accent" }, "→"), vueExports.createVNode("div", null, [vueExports.createVNode("h3", { class: "text-lg font-semibold text-ink" }, "Butuh bantuan memilih?"), vueExports.createVNode("p", { class: "mt-2 text-sm text-muted transition-colors group-hover:text-accent" }, " Konsultasi gratis dengan tim kami ")])];
				}),
				_: 1
			}, _parent));
			_push(`<!--[-->`);
			ssrRenderList(vueExports.unref(fillerCount), (n) => {
				_push(`<div class="hidden bg-paper lg:block" aria-hidden="true"></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region components/home/WhyChooseUsSection.vue
var _sfc_setup = WhyChooseUsSection_vue_vue_type_script_setup_true_lang_default.setup;
WhyChooseUsSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/WhyChooseUsSection.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var WhyChooseUsSection_default = Object.assign(WhyChooseUsSection_vue_vue_type_script_setup_true_lang_default, { __name: "WhyChooseUsSection" });

export { DUR as D, EASE_OUT_GSAP as E, StatisticsSection_default as S, WhyChooseUsSection_default as W, usePrefersReducedMotion as u };
//# sourceMappingURL=WhyChooseUsSection-sVtuR7bB.mjs.map
