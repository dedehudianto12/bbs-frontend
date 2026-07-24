import { u as useRoute$1, a as useRouter, b as useAsyncData, c as useHead$1 } from '../virtual/entry.mjs';
import { B as Button_default } from './Button-fRm7tXm0.mjs';
import { q as queryCollection } from './client-DOm3OzYp.mjs';
import { B as Breadcrumb_default } from './Breadcrumb-Cajep9qD.mjs';
import { P as PageHero_default } from './PageHero-DA3ar5hD.mjs';
import { P as ProductGrid_default } from './ProductGrid-U2mAnU68.mjs';
import { P as ProductFilter_default } from './ProductFilter-C0-JgnjB.mjs';
import { defineComponent, withAsyncContext, computed, unref, withCtx, createVNode, mergeProps, createTextVNode, useSSRContext } from 'vue';
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
import './GradientPanel-CteABoXV.mjs';

//#region pages/produk/belt-conveyor/[kategori].vue?vue&type=script&setup=true&lang.ts
var _kategori__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[kategori]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute$1();
		const router = useRouter();
		const subcat = route.params.kategori;
		const { data: allProducts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`produk-belt-conveyor-${subcat}`, () => queryCollection("products").all())), __temp = await __temp, __restore(), __temp);
		const beltProducts = computed(() => (Array.isArray(allProducts.value) ? allProducts.value : []).filter((p) => p.group === "belt-conveyor").map((p) => ({
			slug: p.slug,
			title: p.title,
			category: p.category,
			description: p.excerpt,
			_categoryClean: p.category.toLowerCase().replace(/\s+/g, "-")
		})));
		const products = computed(() => beltProducts.value.filter((p) => p._categoryClean === subcat));
		const isValid = computed(() => products.value.length > 0);
		const subCategories = computed(() => {
			return [...new Set(beltProducts.value.map((p) => p.category))].map((c) => ({
				label: c,
				value: c.toLowerCase().replace(/\s+/g, "-")
			}));
		});
		const currentLabel = computed(() => {
			return subCategories.value.find((s) => s.value === subcat)?.label ?? subcat;
		});
		function onFilterChange(newSubcat) {
			router.push(`/produk/belt-conveyor/${newSubcat}`);
		}
		useHead$1({
			title: `${currentLabel.value} — Belt Conveyor — BBS Conveyor`,
			meta: [{
				name: "description",
				content: `Belt conveyor ${currentLabel.value} berkualitas untuk kebutuhan industri. Tersedia dari BBS Conveyor.`
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHero = PageHero_default;
			const _component_Breadcrumb = Breadcrumb_default;
			const _component_ProductFilter = ProductFilter_default;
			const _component_ProductGrid = ProductGrid_default;
			const _component_Button = Button_default;
			if (unref(isValid)) {
				_push(`<div${ssrRenderAttrs(_attrs)}>`);
				_push(ssrRenderComponent(_component_PageHero, {
					eyebrow: "Belt Conveyor",
					title: unref(currentLabel),
					description: `Belt Conveyor kategori ${unref(currentLabel)}.`
				}, {
					breadcrumb: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(ssrRenderComponent(_component_Breadcrumb, { items: [
							{
								label: "Beranda",
								href: "/"
							},
							{
								label: "Belt Conveyor",
								href: "/produk/belt-conveyor"
							},
							{ label: unref(currentLabel) }
						] }, null, _parent, _scopeId));
						else return [createVNode(_component_Breadcrumb, { items: [
							{
								label: "Beranda",
								href: "/"
							},
							{
								label: "Belt Conveyor",
								href: "/produk/belt-conveyor"
							},
							{ label: unref(currentLabel) }
						] }, null, 8, ["items"])];
					}),
					_: 1
				}, _parent));
				_push(`<div class="container-tech py-16 md:py-24">`);
				_push(ssrRenderComponent(_component_ProductFilter, {
					"model-value": unref(subcat),
					options: unref(subCategories),
					class: "mb-10",
					"onUpdate:modelValue": onFilterChange
				}, null, _parent));
				_push(ssrRenderComponent(_component_ProductGrid, { products: unref(products) }, null, _parent));
				_push(`</div></div>`);
			} else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "container-tech py-24 md:py-32 text-center" }, _attrs))}><h1 class="display text-3xl text-ink md:text-4xl">Kategori Tidak Ditemukan</h1><div class="mt-8 flex justify-center">`);
				_push(ssrRenderComponent(_component_Button, {
					to: "/produk/belt-conveyor",
					variant: "ghost",
					arrow: ""
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Kembali ke Belt Conveyor`);
						else return [createTextVNode("Kembali ke Belt Conveyor")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div>`);
			}
		};
	}
});
//#endregion
//#region pages/produk/belt-conveyor/[kategori].vue
var _sfc_setup = _kategori__vue_vue_type_script_setup_true_lang_default.setup;
_kategori__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/produk/belt-conveyor/[kategori].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _kategori__default = _kategori__vue_vue_type_script_setup_true_lang_default;

export { _kategori__default as default };
//# sourceMappingURL=_kategori_-CylXc2kf.mjs.map
