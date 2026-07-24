import { u as useRoute$1, b as useAsyncData, c as useHead$1 } from '../virtual/entry.mjs';
import { B as Button_default } from './Button-fRm7tXm0.mjs';
import { q as queryCollection } from './client-DOm3OzYp.mjs';
import { B as Breadcrumb_default } from './Breadcrumb-Cajep9qD.mjs';
import { _ as _sfc_main } from './ContentRenderer-BgHzvWg1.mjs';
import { G as GradientPanel_default } from './GradientPanel-CteABoXV.mjs';
import { S as SectionTitle_default } from './SectionTitle-BXJanOjs.mjs';
import { P as ProductGrid_default } from './ProductGrid-U2mAnU68.mjs';
import { defineComponent, withAsyncContext, computed, unref, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import 'minimark/hast';
import 'property-information';

//#region pages/produk/[slug].vue?vue&type=script&setup=true&lang.ts
var waSales1 = "6281234567890";
var _slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[slug]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const slug = useRoute$1().params.slug;
		const { data: allProducts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`product-${slug}`, () => queryCollection("products").all())), __temp = await __temp, __restore(), __temp);
		const product = computed(() => (Array.isArray(allProducts.value) ? allProducts.value : []).find((p) => p.slug === slug));
		const categoryLink = computed(() => {
			if (!product.value) return "/produk/belt-conveyor";
			return product.value.group === "belt-conveyor" ? "/produk/belt-conveyor" : "/produk/lainnya";
		});
		const waMessage = computed(() => {
			if (!product.value) return "";
			return `Halo, saya ingin menanyakan ketersediaan ${product.value.title}`;
		});
		const heroTheme = computed(() => {
			let h = 0;
			for (const ch of slug) h = h * 31 + ch.charCodeAt(0) >>> 0;
			return h;
		});
		const relatedProducts = computed(() => {
			if (!product.value) return [];
			const cat = product.value.category;
			return (Array.isArray(allProducts.value) ? allProducts.value : []).filter((p) => p.category === cat && p.slug !== slug).slice(0, 3).map((p) => ({
				slug: p.slug,
				title: p.title,
				category: p.category,
				description: p.excerpt
			}));
		});
		const breadcrumbItems = computed(() => {
			const p = product.value;
			if (!p) return [];
			return [
				{
					label: "Beranda",
					href: "/"
				},
				{
					label: "Produk",
					href: "/produk/belt-conveyor"
				},
				{
					label: p.group === "belt-conveyor" ? "Belt Conveyor" : "Produk Lainnya",
					href: p.group === "belt-conveyor" ? "/produk/belt-conveyor" : "/produk/lainnya"
				},
				{ label: p.title }
			];
		});
		useHead$1({
			title: product.value ? `${product.value.title} — BBS Conveyor` : "Produk Tidak Ditemukan — BBS Conveyor",
			meta: [{
				name: "description",
				content: product.value?.excerpt ?? ""
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Breadcrumb = Breadcrumb_default;
			const _component_GradientPanel = GradientPanel_default;
			const _component_Button = Button_default;
			const _component_ContentRenderer = _sfc_main;
			const _component_SectionTitle = SectionTitle_default;
			const _component_ProductGrid = ProductGrid_default;
			if (unref(product)) {
				_push(`<article${ssrRenderAttrs(mergeProps({ class: "container-tech py-12 md:py-16" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_Breadcrumb, {
					items: unref(breadcrumbItems),
					class: "mb-10"
				}, null, _parent));
				_push(`<div class="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">`);
				_push(ssrRenderComponent(_component_GradientPanel, {
					index: unref(heroTheme),
					class: "aspect-[4/3] w-full"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<div class="absolute inset-0 flex flex-col justify-between p-7"${_scopeId}><span class="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55"${_scopeId}>BBS Conveyor</span><span class="font-display text-3xl leading-tight text-ink"${_scopeId}>${ssrInterpolate(unref(product).title)}</span></div>`);
						else return [createVNode("div", { class: "absolute inset-0 flex flex-col justify-between p-7" }, [createVNode("span", { class: "text-xs font-semibold uppercase tracking-[0.16em] text-ink/55" }, "BBS Conveyor"), createVNode("span", { class: "font-display text-3xl leading-tight text-ink" }, toDisplayString(unref(product).title), 1)])];
					}),
					_: 1
				}, _parent));
				_push(`<div class="flex flex-col justify-center"><span class="inline-block w-fit rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent">${ssrInterpolate(unref(product).category)}</span><h1 class="display mt-4 text-3xl text-ink md:text-4xl">${ssrInterpolate(unref(product).title)}</h1><p class="mt-5 leading-relaxed text-muted">${ssrInterpolate(unref(product).excerpt)}</p><div class="mt-8 flex flex-wrap gap-3">`);
				_push(ssrRenderComponent(_component_Button, {
					href: `https://wa.me/${waSales1}?text=${encodeURIComponent(unref(waMessage))}`,
					variant: "accent",
					external: ""
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"${_scopeId}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"${_scopeId}></path></svg> Tanya via WhatsApp `);
						else return [(openBlock(), createBlock("svg", {
							class: "h-4 w-4",
							viewBox: "0 0 24 24",
							fill: "currentColor"
						}, [createVNode("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" })])), createTextVNode(" Tanya via WhatsApp ")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_Button, {
					to: unref(categoryLink),
					variant: "ghost"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Lihat Produk Lain `);
						else return [createTextVNode(" Lihat Produk Lain ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div></div><div class="mt-20 border-t border-line pt-12"><h2 class="display text-2xl text-ink md:text-3xl">Detail Produk</h2><div class="prose-tech mt-6 max-w-3xl">`);
				_push(ssrRenderComponent(_component_ContentRenderer, { value: unref(product) }, null, _parent));
				_push(`</div></div>`);
				if (unref(relatedProducts).length) {
					_push(`<div class="mt-20">`);
					_push(ssrRenderComponent(_component_SectionTitle, {
						eyebrow: "Terkait",
						title: "Produk Terkait",
						description: "Produk lain dalam kategori yang sama."
					}, null, _parent));
					_push(`<div class="mt-10">`);
					_push(ssrRenderComponent(_component_ProductGrid, { products: unref(relatedProducts) }, null, _parent));
					_push(`</div></div>`);
				} else _push(`<!---->`);
				_push(`</article>`);
			} else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "container-tech py-24 md:py-32 text-center" }, _attrs))}><h1 class="display text-3xl text-ink md:text-4xl">Produk Tidak Ditemukan</h1><p class="mt-4 text-muted">Produk yang Anda cari tidak tersedia.</p><div class="mt-8 flex justify-center">`);
				_push(ssrRenderComponent(_component_Button, {
					to: "/produk/belt-conveyor",
					variant: "ghost",
					arrow: ""
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Kembali ke Produk`);
						else return [createTextVNode("Kembali ke Produk")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div>`);
			}
		};
	}
});
//#endregion
//#region pages/produk/[slug].vue
var _sfc_setup = _slug__vue_vue_type_script_setup_true_lang_default.setup;
_slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/produk/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _slug__default = _slug__vue_vue_type_script_setup_true_lang_default;

export { _slug__default as default };
//# sourceMappingURL=_slug_-ClLqQRf7.mjs.map
