import { b as useAsyncData, c as useHead$1, N as NuxtLink } from '../virtual/entry.mjs';
import { q as queryCollection } from './client-DOm3OzYp.mjs';
import { G as GradientPanel_default } from './GradientPanel-CteABoXV.mjs';
import { P as PageHero_default } from './PageHero-DA3ar5hD.mjs';
import { C as CTASection_default } from './CTASection-D_iyyglj.mjs';
import { defineComponent, withAsyncContext, computed, unref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import '../nitro/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'consola';
import 'minimatch';
import 'node:fs/promises';
import 'nuxtseo-shared/utils';
import 'fast-xml-parser';
import 'better-sqlite3';
import 'fnv1a-64';
import 'object-identity';
import '@vue/shared';
import 'vue-router';
import 'perfect-debounce';
import 'unhead/plugins';
import 'unhead/utils';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import './Button-fRm7tXm0.mjs';

//#region components/service/ServiceCard.vue?vue&type=script&setup=true&lang.ts
var ServiceCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ServiceCard",
	__ssrInlineRender: true,
	props: {
		slug: {},
		title: {},
		description: {}
	},
	setup(__props) {
		const props = __props;
		const themeIndex = computed(() => {
			let h = 3;
			for (const ch of props.slug) h = h * 31 + ch.charCodeAt(0) >>> 0;
			return h;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_GradientPanel = GradientPanel_default;
			_push(ssrRenderComponent(_component_NuxtLink, mergeProps({
				to: `/jasa/${__props.slug}`,
				class: "group block overflow-hidden rounded-xl border border-line bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-md hover:shadow-ink/5"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="p-2 pb-0"${_scopeId}>`);
						_push(ssrRenderComponent(_component_GradientPanel, {
							index: unref(themeIndex),
							rounded: "rounded-lg",
							class: "aspect-[4/3]"
						}, null, _parent, _scopeId));
						_push(`</div><div class="p-4"${_scopeId}><p class="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted"${_scopeId}><span class="h-2.5 w-2.5 shrink-0 border-l-2 border-t-2 border-accent" aria-hidden="true"${_scopeId}></span> Jasa </p><h3 class="mt-2.5 text-[15px] font-semibold leading-snug text-ink transition-colors line-clamp-2 group-hover:text-accent"${_scopeId}>${ssrInterpolate(__props.title)}</h3>`);
						if (__props.description) _push(`<p class="mt-2 text-sm leading-relaxed text-muted line-clamp-3"${_scopeId}>${ssrInterpolate(__props.description)}</p>`);
						else _push(`<!---->`);
						_push(`</div>`);
					} else return [createVNode("div", { class: "p-2 pb-0" }, [createVNode(_component_GradientPanel, {
						index: unref(themeIndex),
						rounded: "rounded-lg",
						class: "aspect-[4/3]"
					}, null, 8, ["index"])]), createVNode("div", { class: "p-4" }, [
						createVNode("p", { class: "flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted" }, [createVNode("span", {
							class: "h-2.5 w-2.5 shrink-0 border-l-2 border-t-2 border-accent",
							"aria-hidden": "true"
						}), createTextVNode(" Jasa ")]),
						createVNode("h3", { class: "mt-2.5 text-[15px] font-semibold leading-snug text-ink transition-colors line-clamp-2 group-hover:text-accent" }, toDisplayString(__props.title), 1),
						__props.description ? (openBlock(), createBlock("p", {
							key: 0,
							class: "mt-2 text-sm leading-relaxed text-muted line-clamp-3"
						}, toDisplayString(__props.description), 1)) : createCommentVNode("", true)
					])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region components/service/ServiceCard.vue
var _sfc_setup$1 = ServiceCard_vue_vue_type_script_setup_true_lang_default.setup;
ServiceCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/service/ServiceCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ServiceCard_default = Object.assign(ServiceCard_vue_vue_type_script_setup_true_lang_default, { __name: "ServiceCard" });
//#endregion
//#region pages/jasa/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { data: services } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("jasa-listing", () => queryCollection("services").all())), __temp = await __temp, __restore(), __temp);
		const serviceList = computed(() => (Array.isArray(services.value) ? services.value : []).map((s) => ({
			slug: s.slug,
			title: s.title,
			description: s.excerpt
		})));
		useHead$1({
			title: "Jasa — BBS Conveyor",
			meta: [{
				name: "description",
				content: "Layanan pembuatan, pemasangan, dan perbaikan belt conveyor oleh BBS Conveyor."
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHero = PageHero_default;
			const _component_ServiceCard = ServiceCard_default;
			const _component_CTASection = CTASection_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_PageHero, {
				eyebrow: "Layanan",
				title: "Jasa Kami",
				description: "Layanan profesional untuk kebutuhan belt conveyor industri Anda."
			}, null, _parent));
			_push(`<div class="container-tech py-16 md:py-24">`);
			if (unref(serviceList).length) {
				_push(`<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
				ssrRenderList(unref(serviceList), (s) => {
					_push(ssrRenderComponent(_component_ServiceCard, mergeProps({ key: s.slug }, { ref_for: true }, s), null, _parent));
				});
				_push(`<!--]--></div>`);
			} else _push(`<p class="rounded-2xl border border-dashed border-line py-16 text-center text-sm text-muted">Belum ada layanan tersedia.</p>`);
			_push(`</div>`);
			_push(ssrRenderComponent(_component_CTASection, {
				headline: "Butuh Layanan Khusus?",
				description: "Konsultasikan kebutuhan conveyor Anda dengan tim engineer kami.",
				"button-text": "Hubungi Kami",
				"button-link": "/kontak"
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/jasa/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/jasa/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var jasa_default = index_vue_vue_type_script_setup_true_lang_default;

export { jasa_default as default };
//# sourceMappingURL=jasa-fqm0hG51.mjs.map
