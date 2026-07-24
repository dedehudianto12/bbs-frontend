import { a as useRouter, b as useAsyncData, c as useHead$1 } from '../virtual/entry.mjs';
import { q as queryCollection } from './client-DOm3OzYp.mjs';
import { P as PageHero_default } from './PageHero-DA3ar5hD.mjs';
import { C as CTASection_default } from './CTASection-D_iyyglj.mjs';
import { P as ProductGrid_default } from './ProductGrid-U2mAnU68.mjs';
import { P as ProductFilter_default } from './ProductFilter-C0-JgnjB.mjs';
import { defineComponent, withAsyncContext, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
import './GradientPanel-CteABoXV.mjs';

//#region pages/produk/belt-conveyor/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const router = useRouter();
		const { data: allProducts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("produk-belt-conveyor", () => queryCollection("products").all())), __temp = await __temp, __restore(), __temp);
		const products = computed(() => (Array.isArray(allProducts.value) ? allProducts.value : []).filter((p) => p.group === "belt-conveyor").map((p) => ({
			slug: p.slug,
			title: p.title,
			category: p.category,
			description: p.excerpt
		})));
		const subCategories = computed(() => {
			return [...new Set(products.value.map((p) => p.category))].map((c) => ({
				label: c,
				value: c.toLowerCase().replace(/\s+/g, "-")
			}));
		});
		function onFilterChange(subcat) {
			router.push(`/produk/belt-conveyor/${subcat}`);
		}
		useHead$1({
			title: "Belt Conveyor — BBS Conveyor",
			meta: [{
				name: "description",
				content: "PVC Belt, PU, Flat Belt, dan Rubber Belt berkualitas untuk kebutuhan industri Anda."
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHero = PageHero_default;
			const _component_ProductFilter = ProductFilter_default;
			const _component_ProductGrid = ProductGrid_default;
			const _component_CTASection = CTASection_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_PageHero, {
				eyebrow: "Katalog Produk",
				title: "Belt Conveyor",
				description: "Pilih dari berbagai jenis belt conveyor untuk aplikasi industri Anda."
			}, null, _parent));
			_push(`<div class="container-tech py-16 md:py-24">`);
			_push(ssrRenderComponent(_component_ProductFilter, {
				"model-value": "",
				options: unref(subCategories),
				class: "mb-10",
				"onUpdate:modelValue": onFilterChange
			}, null, _parent));
			_push(ssrRenderComponent(_component_ProductGrid, { products: unref(products) }, null, _parent));
			_push(`</div>`);
			_push(ssrRenderComponent(_component_CTASection, {
				headline: "Tidak Menemukan yang Anda Cari?",
				description: "Tim kami siap membantu merekomendasikan belt conveyor yang sesuai dengan kebutuhan spesifik Anda.",
				"button-text": "Konsultasi Gratis",
				"button-link": "/kontak"
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/produk/belt-conveyor/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/produk/belt-conveyor/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var belt_conveyor_default = index_vue_vue_type_script_setup_true_lang_default;

export { belt_conveyor_default as default };
//# sourceMappingURL=belt-conveyor-BiSgT36E.mjs.map
