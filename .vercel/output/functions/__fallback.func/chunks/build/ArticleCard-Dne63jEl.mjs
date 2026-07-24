import { N as NuxtLink } from '../virtual/entry.mjs';
import { G as GradientPanel_default } from './GradientPanel-CteABoXV.mjs';
import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from '@vue/server-renderer';

//#region components/article/ArticleCard.vue?vue&type=script&setup=true&lang.ts
var ArticleCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "ArticleCard",
	__ssrInlineRender: true,
	props: {
		slug: {},
		title: {},
		excerpt: {},
		tag: {},
		image: {},
		publishedAt: {},
		author: {}
	},
	setup(__props) {
		const props = __props;
		const themeIndex = vueExports.computed(() => {
			let h = 0;
			for (const ch of props.slug) h = h * 31 + ch.charCodeAt(0) >>> 0;
			return h;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_GradientPanel = GradientPanel_default;
			_push(ssrRenderComponent(_component_NuxtLink, vueExports.mergeProps({
				to: `/artikel/${__props.slug}`,
				class: "group block overflow-hidden rounded-xl border border-line bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-md hover:shadow-ink/5"
			}, _attrs), {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="p-2 pb-0"${_scopeId}>`);
						_push(ssrRenderComponent(_component_GradientPanel, {
							index: vueExports.unref(themeIndex),
							rounded: "rounded-lg",
							class: "aspect-[16/9]"
						}, null, _parent, _scopeId));
						_push(`</div><div class="p-4"${_scopeId}><p class="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted"${_scopeId}><span class="h-2.5 w-2.5 shrink-0 border-l-2 border-t-2 border-accent" aria-hidden="true"${_scopeId}></span> ${ssrInterpolate(__props.tag || "Artikel")}</p><h3 class="mt-2.5 text-[15px] font-semibold leading-snug text-ink transition-colors line-clamp-2 group-hover:text-accent"${_scopeId}>${ssrInterpolate(__props.title)}</h3>`);
						if (__props.publishedAt) _push(`<div class="mt-3 text-[10.5px] font-medium uppercase tracking-[0.1em] tabular-nums text-muted/70"${_scopeId}><time${ssrRenderAttr("datetime", __props.publishedAt)}${_scopeId}>${ssrInterpolate(new Date(__props.publishedAt).toLocaleDateString("id-ID", {
							year: "numeric",
							month: "short",
							day: "numeric"
						}))}</time></div>`);
						else _push(`<!---->`);
						_push(`</div>`);
					} else return [vueExports.createVNode("div", { class: "p-2 pb-0" }, [vueExports.createVNode(_component_GradientPanel, {
						index: vueExports.unref(themeIndex),
						rounded: "rounded-lg",
						class: "aspect-[16/9]"
					}, null, 8, ["index"])]), vueExports.createVNode("div", { class: "p-4" }, [
						vueExports.createVNode("p", { class: "flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted" }, [vueExports.createVNode("span", {
							class: "h-2.5 w-2.5 shrink-0 border-l-2 border-t-2 border-accent",
							"aria-hidden": "true"
						}), vueExports.createTextVNode(" " + vueExports.toDisplayString(__props.tag || "Artikel"), 1)]),
						vueExports.createVNode("h3", { class: "mt-2.5 text-[15px] font-semibold leading-snug text-ink transition-colors line-clamp-2 group-hover:text-accent" }, vueExports.toDisplayString(__props.title), 1),
						__props.publishedAt ? (vueExports.openBlock(), vueExports.createBlock("div", {
							key: 0,
							class: "mt-3 text-[10.5px] font-medium uppercase tracking-[0.1em] tabular-nums text-muted/70"
						}, [vueExports.createVNode("time", { datetime: __props.publishedAt }, vueExports.toDisplayString(new Date(__props.publishedAt).toLocaleDateString("id-ID", {
							year: "numeric",
							month: "short",
							day: "numeric"
						})), 9, ["datetime"])])) : vueExports.createCommentVNode("", true)
					])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region components/article/ArticleCard.vue
var _sfc_setup = ArticleCard_vue_vue_type_script_setup_true_lang_default.setup;
ArticleCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/article/ArticleCard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ArticleCard_default = Object.assign(ArticleCard_vue_vue_type_script_setup_true_lang_default, { __name: "ArticleCard" });

export { ArticleCard_default as A };
//# sourceMappingURL=ArticleCard-Dne63jEl.mjs.map
