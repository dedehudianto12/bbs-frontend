import { N as NuxtLink } from '../virtual/entry.mjs';
import { G as GradientPanel_default } from './GradientPanel-CteABoXV.mjs';
import { defineComponent, mergeProps, computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

//#region components/product/ProductCard.vue?vue&type=script&setup=true&lang.ts
var ProductCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProductCard",
	__ssrInlineRender: true,
	props: {
		slug: {},
		title: {},
		category: {},
		description: {},
		image: {}
	},
	setup(__props) {
		const props = __props;
		const themeIndex = computed(() => {
			let h = 0;
			for (const ch of props.slug) h = h * 31 + ch.charCodeAt(0) >>> 0;
			return h;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_GradientPanel = GradientPanel_default;
			_push(ssrRenderComponent(_component_NuxtLink, mergeProps({
				to: `/produk/${__props.slug}`,
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
						_push(`</div><div class="p-4"${_scopeId}><p class="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted"${_scopeId}><span class="h-2.5 w-2.5 shrink-0 border-l-2 border-t-2 border-accent" aria-hidden="true"${_scopeId}></span> ${ssrInterpolate(__props.category)}</p><h3 class="mt-2.5 text-[15px] font-semibold leading-snug text-ink transition-colors line-clamp-2 group-hover:text-accent"${_scopeId}>${ssrInterpolate(__props.title)}</h3>`);
						if (__props.description) _push(`<p class="mt-2 text-sm leading-relaxed text-muted line-clamp-2"${_scopeId}>${ssrInterpolate(__props.description)}</p>`);
						else _push(`<!---->`);
						_push(`<span class="mt-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/45 transition-colors group-hover:text-accent"${_scopeId}> Lihat datasheet <svg class="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${_scopeId}><path d="M5 12h14M13 6l6 6-6 6"${_scopeId}></path></svg></span></div>`);
					} else return [createVNode("div", { class: "p-2 pb-0" }, [createVNode(_component_GradientPanel, {
						index: unref(themeIndex),
						rounded: "rounded-lg",
						class: "aspect-[4/3]"
					}, null, 8, ["index"])]), createVNode("div", { class: "p-4" }, [
						createVNode("p", { class: "flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted" }, [createVNode("span", {
							class: "h-2.5 w-2.5 shrink-0 border-l-2 border-t-2 border-accent",
							"aria-hidden": "true"
						}), createTextVNode(" " + toDisplayString(__props.category), 1)]),
						createVNode("h3", { class: "mt-2.5 text-[15px] font-semibold leading-snug text-ink transition-colors line-clamp-2 group-hover:text-accent" }, toDisplayString(__props.title), 1),
						__props.description ? (openBlock(), createBlock("p", {
							key: 0,
							class: "mt-2 text-sm leading-relaxed text-muted line-clamp-2"
						}, toDisplayString(__props.description), 1)) : createCommentVNode("", true),
						createVNode("span", { class: "mt-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/45 transition-colors group-hover:text-accent" }, [createTextVNode(" Lihat datasheet "), (openBlock(), createBlock("svg", {
							class: "h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "1.75",
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"aria-hidden": "true"
						}, [createVNode("path", { d: "M5 12h14M13 6l6 6-6 6" })]))])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region components/product/ProductCard.vue
var _sfc_setup$1 = ProductCard_vue_vue_type_script_setup_true_lang_default.setup;
ProductCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductCard.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ProductCard_default = Object.assign(ProductCard_vue_vue_type_script_setup_true_lang_default, { __name: "ProductCard" });
//#endregion
//#region components/product/ProductGrid.vue?vue&type=script&setup=true&lang.ts
var ProductGrid_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProductGrid",
	__ssrInlineRender: true,
	props: { products: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ProductCard = ProductCard_default;
			if (__props.products.length) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, _attrs))}><!--[-->`);
				ssrRenderList(__props.products, (product, i) => {
					_push(`<div class="animate-fade-up-fast motion-reduce:animate-none" style="${ssrRenderStyle({ animationDelay: `${Math.min(i, 8) * 40}ms` })}">`);
					_push(ssrRenderComponent(_component_ProductCard, mergeProps({ ref_for: true }, product), null, _parent));
					_push(`</div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<p${ssrRenderAttrs(mergeProps({ class: "rounded-xl border border-dashed border-line py-16 text-center text-sm text-muted" }, _attrs))}>Tidak ada produk ditemukan.</p>`);
		};
	}
});
//#endregion
//#region components/product/ProductGrid.vue
var _sfc_setup = ProductGrid_vue_vue_type_script_setup_true_lang_default.setup;
ProductGrid_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductGrid.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProductGrid_default = Object.assign(ProductGrid_vue_vue_type_script_setup_true_lang_default, { __name: "ProductGrid" });

export { ProductGrid_default as P };
//# sourceMappingURL=ProductGrid-U2mAnU68.mjs.map
