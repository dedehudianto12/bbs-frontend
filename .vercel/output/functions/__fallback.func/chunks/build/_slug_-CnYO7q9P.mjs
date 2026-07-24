import { u as useRoute$1, b as useAsyncData, c as useHead$1 } from '../virtual/entry.mjs';
import { B as Button_default } from './Button-fRm7tXm0.mjs';
import { q as queryCollection } from './client-DOm3OzYp.mjs';
import { B as Breadcrumb_default } from './Breadcrumb-Cajep9qD.mjs';
import { _ as _sfc_main } from './ContentRenderer-BgHzvWg1.mjs';
import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from '@vue/server-renderer';
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
import 'minimark/hast';
import 'property-information';
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

//#region pages/jasa/[slug].vue?vue&type=script&setup=true&lang.ts
var _slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "[slug]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const slug = useRoute$1().params.slug;
		const { data: allServices } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData(`jasa-${slug}`, () => queryCollection("services").all())), __temp = await __temp, __restore(), __temp);
		const service = vueExports.computed(() => (Array.isArray(allServices.value) ? allServices.value : []).find((s) => s.slug === slug));
		useHead$1({
			title: service.value ? `${service.value.title} — Jasa — BBS Conveyor` : "Jasa Tidak Ditemukan — BBS Conveyor",
			meta: [{
				name: "description",
				content: service.value?.excerpt ?? ""
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Breadcrumb = Breadcrumb_default;
			const _component_ContentRenderer = _sfc_main;
			const _component_Button = Button_default;
			if (vueExports.unref(service)) {
				_push(`<div${ssrRenderAttrs(vueExports.mergeProps({ class: "mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_Breadcrumb, {
					class: "mb-8",
					items: [
						{
							label: "Beranda",
							href: "/"
						},
						{
							label: "Jasa",
							href: "/jasa"
						},
						{ label: vueExports.unref(service).title }
					]
				}, null, _parent));
				_push(`<p class="eyebrow mb-4 text-accent"><span class="inline-block h-1 w-1 rounded-full bg-accent"></span> Layanan </p><h1 class="display text-4xl text-ink md:text-5xl">${ssrInterpolate(vueExports.unref(service).title)}</h1><div class="prose-tech mt-10 max-w-none">`);
				_push(ssrRenderComponent(_component_ContentRenderer, { value: vueExports.unref(service) }, null, _parent));
				_push(`</div><div class="mt-12 border-t border-line pt-8">`);
				_push(ssrRenderComponent(_component_Button, {
					to: "/kontak",
					variant: "accent",
					arrow: ""
				}, {
					default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Konsultasi Jasa Ini `);
						else return [vueExports.createTextVNode(" Konsultasi Jasa Ini ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div>`);
			} else {
				_push(`<div${ssrRenderAttrs(vueExports.mergeProps({ class: "container-tech py-24 md:py-32 text-center" }, _attrs))}><h1 class="display text-3xl text-ink md:text-4xl">Jasa Tidak Ditemukan</h1><div class="mt-8 flex justify-center">`);
				_push(ssrRenderComponent(_component_Button, {
					to: "/jasa",
					variant: "ghost",
					arrow: ""
				}, {
					default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Kembali ke Jasa`);
						else return [vueExports.createTextVNode("Kembali ke Jasa")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div>`);
			}
		};
	}
});
//#endregion
//#region pages/jasa/[slug].vue
var _sfc_setup = _slug__vue_vue_type_script_setup_true_lang_default.setup;
_slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/jasa/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _slug__default = _slug__vue_vue_type_script_setup_true_lang_default;

export { _slug__default as default };
//# sourceMappingURL=_slug_-CnYO7q9P.mjs.map
