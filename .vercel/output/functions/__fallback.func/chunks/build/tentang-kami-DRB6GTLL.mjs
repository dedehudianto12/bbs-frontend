import { b as useAsyncData, c as useHead$1 } from '../virtual/entry.mjs';
import { q as queryCollection } from './client-DOm3OzYp.mjs';
import { P as PageHero_default } from './PageHero-DA3ar5hD.mjs';
import { C as CTASection_default } from './CTASection-D_iyyglj.mjs';
import { W as WhyChooseUsSection_default, S as StatisticsSection_default } from './WhyChooseUsSection-sVtuR7bB.mjs';
import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from '@vue/server-renderer';
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
import './Button-fRm7tXm0.mjs';
import './SectionTitle-BXJanOjs.mjs';
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

//#region pages/tentang-kami.vue?vue&type=script&setup=true&lang.ts
var tentang_kami_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "tentang-kami",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { data: whyChooseUs } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData("about-why-choose-us", () => queryCollection("homepage").where("section", "=", "why-choose-us").first())), __temp = await __temp, __restore(), __temp);
		const whyChooseUsItems = vueExports.computed(() => whyChooseUs.value?.items ?? []);
		const { data: hp } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData("about-hp", () => queryCollection("homepageConfig").first())), __temp = await __temp, __restore(), __temp);
		const hpData = vueExports.computed(() => hp.value ?? {});
		const stats = vueExports.computed(() => {
			const s = hpData.value?.statistics;
			if (!s) return [];
			return [
				{
					label: "Tahun Pengalaman",
					value: `${s.years}+`
				},
				{
					label: "Proyek Selesai",
					value: `${s.projects}+`
				},
				{
					label: "Klien Aktif",
					value: `${s.clients}+`
				},
				{
					label: "Tenaga Teknisi",
					value: `${s.engineers}+`
				}
			].filter((item) => !item.value.startsWith("undefined"));
		});
		useHead$1({
			title: "Tentang Kami — BBS Conveyor",
			meta: [{
				name: "description",
				content: "CV Bintang Berjaya Satu (BBS Conveyor) — supplier belt conveyor, roller, dan komponen industri terpercaya."
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHero = PageHero_default;
			const _component_WhyChooseUsSection = WhyChooseUsSection_default;
			const _component_StatisticsSection = StatisticsSection_default;
			const _component_CTASection = CTASection_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_PageHero, {
				size: "lg",
				eyebrow: "Tentang Kami",
				title: "CV Bintang Berjaya Satu",
				description: "Connecting Power and Motion to Drive Industrial Excellence"
			}, null, _parent));
			_push(`<section class="container-tech py-16 md:py-24"><div class="max-w-3xl space-y-6 text-lg leading-relaxed text-muted"><p> CV Bintang Berjaya Satu — dikenal luas sebagai <strong class="text-ink">BBS Conveyor</strong> — adalah perusahaan yang bergerak di bidang penyediaan belt conveyor, roller, dan komponen industri sejak 2010. Berawal dari bengkel kecil di kawasan industri Jakarta Timur, kami telah berkembang menjadi mitra terpercaya bagi ratusan pabrik manufaktur, fasilitas tambang, dan instalasi pengolahan di seluruh Indonesia. </p><p> Kami menyediakan berbagai jenis belt conveyor: PVC, PU, Rubber, hingga Flat Belt, serta komponen pendukung seperti roller, pulley, fastener, dan cleat. Tidak hanya menjual produk, BBS Conveyor juga memberikan layanan teknis lengkap — mulai dari konsultasi pemilihan produk, instalasi di lokasi, perbaikan dan perawatan, hingga penyambungan belt (onsite joint) dengan metode hot splicing maupun cold splicing. </p><p> Dengan tim teknisi berpengalaman dan jaringan logistik yang menjangkau Sumatera, Jawa, Kalimantan, hingga Indonesia Timur, kami berkomitmen menghadirkan solusi material handling yang andal, tepat waktu, dan sesuai anggaran. Kepuasan pelanggan adalah prioritas kami — setiap proyek kami tangani dengan standar kualitas tinggi dan dukungan purna jual yang responsif. </p></div></section>`);
			_push(ssrRenderComponent(_component_WhyChooseUsSection, { items: vueExports.unref(whyChooseUsItems) }, null, _parent));
			if (vueExports.unref(stats).length) _push(ssrRenderComponent(_component_StatisticsSection, { items: vueExports.unref(stats) }, null, _parent));
			else _push(`<!---->`);
			_push(ssrRenderComponent(_component_CTASection, {
				headline: "Tertarik Bekerja Sama?",
				description: "Konsultasikan kebutuhan belt conveyor dan komponen industri Anda dengan tim kami.",
				"button-text": "Hubungi Kami",
				"button-link": "/kontak"
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/tentang-kami.vue
var _sfc_setup = tentang_kami_vue_vue_type_script_setup_true_lang_default.setup;
tentang_kami_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tentang-kami.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var tentang_kami_default = tentang_kami_vue_vue_type_script_setup_true_lang_default;

export { tentang_kami_default as default };
//# sourceMappingURL=tentang-kami-DRB6GTLL.mjs.map
