import { c as useHead$1 } from '../virtual/entry.mjs';
import { G as GradientPanel_default } from './GradientPanel-CteABoXV.mjs';
import { P as PageHero_default } from './PageHero-DA3ar5hD.mjs';
import { C as CTASection_default } from './CTASection-D_iyyglj.mjs';
import { defineComponent, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
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

//#region pages/galeri.vue?vue&type=script&setup=true&lang.ts
var galeri_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "galeri",
	__ssrInlineRender: true,
	setup(__props) {
		const galleryItems = [
			{ caption: "Instalasi Belt Conveyor di Pabrik Manufaktur — Jakarta" },
			{ caption: "Onsite Joint Rubber Belt di Tambang — Kalimantan" },
			{ caption: "Penggantian Roller Conveyor — Surabaya" },
			{ caption: "Proyek Conveyor System — Semarang" },
			{ caption: "PVC Belt Food Grade — Pabrik Makanan" },
			{ caption: "Maintenance Conveyor — Kawasan Industri" }
		];
		useHead$1({
			title: "Galeri Proyek — BBS Conveyor",
			meta: [{
				name: "description",
				content: "Dokumentasi proyek instalasi belt conveyor, roller, dan jasa onsite joint oleh BBS Conveyor."
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHero = PageHero_default;
			const _component_GradientPanel = GradientPanel_default;
			const _component_CTASection = CTASection_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_PageHero, {
				eyebrow: "Galeri",
				title: "Galeri Proyek Kami",
				description: "Dokumentasi hasil kerja kami di berbagai proyek dan lokasi di Indonesia."
			}, null, _parent));
			_push(`<div class="container-tech py-16 md:py-24"><div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
			ssrRenderList(galleryItems, (item, i) => {
				_push(`<div class="group">`);
				_push(ssrRenderComponent(_component_GradientPanel, {
					index: i * 2 + 1,
					class: "aspect-[4/3] w-full transition-transform duration-300 group-hover:-translate-y-1"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<div class="absolute inset-0 flex items-end p-5"${_scopeId}><span class="text-xs font-semibold uppercase tracking-[0.14em] text-ink/55"${_scopeId}>Proyek ${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span></div>`);
						else return [createVNode("div", { class: "absolute inset-0 flex items-end p-5" }, [createVNode("span", { class: "text-xs font-semibold uppercase tracking-[0.14em] text-ink/55" }, "Proyek " + toDisplayString(String(i + 1).padStart(2, "0")), 1)])];
					}),
					_: 2
				}, _parent));
				_push(`<p class="mt-3 text-sm leading-snug text-muted">${ssrInterpolate(item.caption)}</p></div>`);
			});
			_push(`<!--]--></div></div>`);
			_push(ssrRenderComponent(_component_CTASection, {
				headline: "Punya Proyek Serupa?",
				description: "Kami siap membantu kebutuhan conveyor di lokasi Anda.",
				"button-text": "Hubungi Kami",
				"button-link": "/kontak"
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/galeri.vue
var _sfc_setup = galeri_vue_vue_type_script_setup_true_lang_default.setup;
galeri_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/galeri.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var galeri_default = galeri_vue_vue_type_script_setup_true_lang_default;

export { galeri_default as default };
//# sourceMappingURL=galeri-4TlEMtue.mjs.map
