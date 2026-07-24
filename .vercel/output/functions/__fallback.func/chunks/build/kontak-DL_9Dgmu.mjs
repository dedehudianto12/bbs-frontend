import { c as useHead$1 } from '../virtual/entry.mjs';
import { B as Button_default } from './Button-fRm7tXm0.mjs';
import { G as GradientPanel_default } from './GradientPanel-CteABoXV.mjs';
import { P as PageHero_default } from './PageHero-DA3ar5hD.mjs';
import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from '@vue/server-renderer';
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

//#region pages/kontak.vue?vue&type=script&setup=true&lang.ts
var waSales1 = "6281234567890";
var waSales2 = "6281234567891";
var email = "info@bbsconveyor.com";
var alamat = "Jl. Industri Raya No. 123\nKawasan Industri Pulogadung\nJakarta Timur 13930";
var jamOperasional = "Senin – Jumat, 08:00 – 17:00 WIB\nSabtu by appointment";
var kontak_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "kontak",
	__ssrInlineRender: true,
	setup(__props) {
		const alamatLines = alamat.split("\n").filter(Boolean);
		const jamLines = jamOperasional.split("\n").filter(Boolean);
		useHead$1({
			title: "Hubungi Kami — BBS Conveyor",
			meta: [{
				name: "description",
				content: "Hubungi BBS Conveyor untuk konsultasi belt conveyor, roller, dan komponen industri. Tersedia via WhatsApp, email, atau kunjungi kantor kami."
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHero = PageHero_default;
			const _component_Button = Button_default;
			const _component_GradientPanel = GradientPanel_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_PageHero, {
				eyebrow: "Kontak",
				title: "Hubungi Kami",
				description: "Konsultasikan kebutuhan belt conveyor Anda dengan tim kami."
			}, null, _parent));
			_push(`<div class="container-tech py-16 md:py-24"><div class="grid grid-cols-1 gap-12 md:grid-cols-2"><div class="space-y-10"><div><p class="eyebrow mb-4 text-muted">WhatsApp</p><div class="flex flex-wrap gap-3">`);
			_push(ssrRenderComponent(_component_Button, {
				href: `https://wa.me/${waSales1}`,
				variant: "accent",
				external: "",
				size: "sm"
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"${_scopeId}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"${_scopeId}></path></svg> Chat Sales 1 `);
					else return [(vueExports.openBlock(), vueExports.createBlock("svg", {
						class: "h-4 w-4",
						viewBox: "0 0 24 24",
						fill: "currentColor"
					}, [vueExports.createVNode("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" })])), vueExports.createTextVNode(" Chat Sales 1 ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_Button, {
				href: `https://wa.me/${waSales2}`,
				variant: "ghost",
				external: "",
				size: "sm"
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"${_scopeId}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"${_scopeId}></path></svg> Chat Sales 2 `);
					else return [(vueExports.openBlock(), vueExports.createBlock("svg", {
						class: "h-4 w-4",
						viewBox: "0 0 24 24",
						fill: "currentColor"
					}, [vueExports.createVNode("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" })])), vueExports.createTextVNode(" Chat Sales 2 ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div><p class="eyebrow mb-2 text-muted">Email</p><a${ssrRenderAttr("href", `mailto:${email}`)} class="text-ink transition-colors hover:text-accent">${ssrInterpolate(email)}</a></div><div><p class="eyebrow mb-2 text-muted">Jam Operasional</p><!--[-->`);
			ssrRenderList(vueExports.unref(jamLines), (line) => {
				_push(`<p class="text-muted">${ssrInterpolate(line)}</p>`);
			});
			_push(`<!--]--></div><div><p class="eyebrow mb-2 text-muted">Alamat Kantor</p><!--[-->`);
			ssrRenderList(vueExports.unref(alamatLines), (line) => {
				_push(`<p class="text-muted">${ssrInterpolate(line)}</p>`);
			});
			_push(`<!--]--></div></div>`);
			_push(ssrRenderComponent(_component_GradientPanel, {
				index: 3,
				class: "aspect-[4/3] w-full"
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink/45"${_scopeId}><svg class="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"${_scopeId}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"${_scopeId}></path><circle cx="12" cy="10" r="3"${_scopeId}></circle></svg><span class="text-xs font-semibold uppercase tracking-[0.14em]"${_scopeId}>Jakarta Timur</span></div>`);
					else return [vueExports.createVNode("div", { class: "absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink/45" }, [(vueExports.openBlock(), vueExports.createBlock("svg", {
						class: "h-10 w-10",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "1.25",
						"aria-hidden": "true"
					}, [vueExports.createVNode("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }), vueExports.createVNode("circle", {
						cx: "12",
						cy: "10",
						r: "3"
					})])), vueExports.createVNode("span", { class: "text-xs font-semibold uppercase tracking-[0.14em]" }, "Jakarta Timur")])];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div>`);
		};
	}
});
//#endregion
//#region pages/kontak.vue
var _sfc_setup = kontak_vue_vue_type_script_setup_true_lang_default.setup;
kontak_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/kontak.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var kontak_default = kontak_vue_vue_type_script_setup_true_lang_default;

export { kontak_default as default };
//# sourceMappingURL=kontak-DL_9Dgmu.mjs.map
