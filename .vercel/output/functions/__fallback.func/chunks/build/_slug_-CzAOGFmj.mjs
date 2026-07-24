import { u as useRoute$1, b as useAsyncData, c as useHead$1 } from '../virtual/entry.mjs';
import { B as Button_default } from './Button-fRm7tXm0.mjs';
import { q as queryCollection } from './client-DOm3OzYp.mjs';
import { B as Breadcrumb_default } from './Breadcrumb-Cajep9qD.mjs';
import { _ as _sfc_main } from './ContentRenderer-BgHzvWg1.mjs';
import { A as ArticleGrid_default } from './ArticleGrid-CxPQAhoM.mjs';
import { defineComponent, withAsyncContext, computed, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
import './ArticleCard-Dne63jEl.mjs';
import './GradientPanel-CteABoXV.mjs';

//#region pages/artikel/[slug].vue?vue&type=script&setup=true&lang.ts
var _slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[slug]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const slug = useRoute$1().params.slug;
		const { data: allArticles } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`artikel-${slug}`, () => queryCollection("blog").all())), __temp = await __temp, __restore(), __temp);
		const article = computed(() => (Array.isArray(allArticles.value) ? allArticles.value : []).find((a) => a.slug === slug));
		const relatedArticles = computed(() => {
			if (!article.value) return [];
			const tags = article.value.tags ?? [];
			return (Array.isArray(allArticles.value) ? allArticles.value : []).filter((a) => a.slug !== slug && a.tags?.some((t) => tags.includes(t))).slice(0, 3).map((a) => ({
				slug: a.slug,
				title: a.title,
				excerpt: a.excerpt,
				tag: a.tags?.[0] ?? "",
				publishedAt: a.publishedAt,
				author: a.author ?? ""
			}));
		});
		useHead$1({
			title: article.value ? `${article.value.title} — BBS Conveyor` : "Artikel Tidak Ditemukan — BBS Conveyor",
			meta: [{
				name: "description",
				content: article.value?.excerpt ?? ""
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Breadcrumb = Breadcrumb_default;
			const _component_ContentRenderer = _sfc_main;
			const _component_ArticleGrid = ArticleGrid_default;
			const _component_Button = Button_default;
			if (unref(article)) {
				_push(`<article${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16" }, _attrs))}>`);
				_push(ssrRenderComponent(_component_Breadcrumb, {
					class: "mb-8",
					items: [
						{
							label: "Beranda",
							href: "/"
						},
						{
							label: "Artikel",
							href: "/artikel"
						},
						{ label: unref(article).title }
					]
				}, null, _parent));
				if (unref(article).tags?.[0]) _push(`<div class="mb-5"><span class="inline-block rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent">${ssrInterpolate(unref(article).tags[0])}</span></div>`);
				else _push(`<!---->`);
				_push(`<h1 class="display text-4xl text-ink md:text-5xl">${ssrInterpolate(unref(article).title)}</h1><div class="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted"><span>${ssrInterpolate(unref(article).author)}</span><span class="text-muted/40">/</span><time${ssrRenderAttr("datetime", unref(article).publishedAt)}>${ssrInterpolate(new Date(unref(article).publishedAt).toLocaleDateString("id-ID", {
					year: "numeric",
					month: "long",
					day: "numeric"
				}))}</time></div><div class="prose-tech mt-10 max-w-none">`);
				_push(ssrRenderComponent(_component_ContentRenderer, { value: unref(article) }, null, _parent));
				_push(`</div>`);
				if (unref(relatedArticles).length) {
					_push(`<div class="mt-20 border-t border-line pt-12"><h2 class="display text-2xl text-ink md:text-3xl">Artikel Terkait</h2><div class="mt-8">`);
					_push(ssrRenderComponent(_component_ArticleGrid, { articles: unref(relatedArticles) }, null, _parent));
					_push(`</div></div>`);
				} else _push(`<!---->`);
				_push(`</article>`);
			} else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "container-tech py-24 md:py-32 text-center" }, _attrs))}><h1 class="display text-3xl text-ink md:text-4xl">Artikel Tidak Ditemukan</h1><div class="mt-8 flex justify-center">`);
				_push(ssrRenderComponent(_component_Button, {
					to: "/artikel",
					variant: "ghost",
					arrow: ""
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Kembali ke Artikel`);
						else return [createTextVNode("Kembali ke Artikel")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div>`);
			}
		};
	}
});
//#endregion
//#region pages/artikel/[slug].vue
var _sfc_setup = _slug__vue_vue_type_script_setup_true_lang_default.setup;
_slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/artikel/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _slug__default = _slug__vue_vue_type_script_setup_true_lang_default;

export { _slug__default as default };
//# sourceMappingURL=_slug_-CzAOGFmj.mjs.map
