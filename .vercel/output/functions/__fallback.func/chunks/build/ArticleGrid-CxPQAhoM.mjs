import { A as ArticleCard_default } from './ArticleCard-Dne63jEl.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';

//#region components/article/ArticleGrid.vue?vue&type=script&setup=true&lang.ts
var ArticleGrid_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ArticleGrid",
	__ssrInlineRender: true,
	props: { articles: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ArticleCard = ArticleCard_default;
			if (__props.articles.length) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, _attrs))}><!--[-->`);
				ssrRenderList(__props.articles, (article, i) => {
					_push(`<div class="animate-fade-up-fast motion-reduce:animate-none" style="${ssrRenderStyle({ animationDelay: `${Math.min(i, 8) * 40}ms` })}">`);
					_push(ssrRenderComponent(_component_ArticleCard, mergeProps({ ref_for: true }, article), null, _parent));
					_push(`</div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<p${ssrRenderAttrs(mergeProps({ class: "rounded-2xl border border-dashed border-line py-16 text-center text-sm text-muted" }, _attrs))}>Belum ada artikel.</p>`);
		};
	}
});
//#endregion
//#region components/article/ArticleGrid.vue
var _sfc_setup = ArticleGrid_vue_vue_type_script_setup_true_lang_default.setup;
ArticleGrid_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/article/ArticleGrid.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ArticleGrid_default = Object.assign(ArticleGrid_vue_vue_type_script_setup_true_lang_default, { __name: "ArticleGrid" });

export { ArticleGrid_default as A };
//# sourceMappingURL=ArticleGrid-CxPQAhoM.mjs.map
