import { b as useAsyncData, c as useHead$1 } from '../virtual/entry.mjs';
import { q as queryCollection } from './client-DOm3OzYp.mjs';
import { A as ArticleCard_default } from './ArticleCard-Dne63jEl.mjs';
import { A as ArticleGrid_default } from './ArticleGrid-CxPQAhoM.mjs';
import { P as PageHero_default } from './PageHero-DA3ar5hD.mjs';
import { C as CTASection_default } from './CTASection-D_iyyglj.mjs';
import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate } from '@vue/server-renderer';
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
import './GradientPanel-CteABoXV.mjs';
import './Button-fRm7tXm0.mjs';
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

//#region pages/artikel/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const tag = vueExports.ref("");
		const { data: allArticles } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData("artikel-listing", () => queryCollection("blog").all())), __temp = await __temp, __restore(), __temp);
		const articleList = vueExports.computed(() => (Array.isArray(allArticles.value) ? [...allArticles.value].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)) : []).map((a) => ({
			slug: a.slug,
			title: a.title,
			excerpt: a.excerpt,
			tag: a.tags?.[0] ?? "",
			image: a.thumbnail ?? null,
			publishedAt: a.publishedAt,
			author: a.author ?? "",
			_tags: a.tags ?? []
		})));
		const featuredArticle = vueExports.computed(() => articleList.value[0] ?? null);
		const filteredArticles = vueExports.computed(() => {
			const list = tag.value ? articleList.value.filter((a) => a._tags.includes(tag.value)) : articleList.value;
			if (!tag.value && featuredArticle.value) return list.slice(1);
			return list;
		});
		const allTags = vueExports.computed(() => {
			const tags = articleList.value.flatMap((a) => a._tags);
			return [...new Set(tags)];
		});
		useHead$1({
			title: "Artikel — BBS Conveyor",
			meta: [{
				name: "description",
				content: "Tips, panduan, dan informasi seputar belt conveyor, roller, dan komponen industri dari BBS Conveyor."
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_PageHero = PageHero_default;
			const _component_ArticleCard = ArticleCard_default;
			const _component_ArticleGrid = ArticleGrid_default;
			const _component_CTASection = CTASection_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_PageHero, {
				eyebrow: "Blog",
				title: "Artikel",
				description: "Tips, panduan, dan informasi seputar belt conveyor dan komponen industri."
			}, null, _parent));
			_push(`<div class="container-tech py-16 md:py-24">`);
			if (vueExports.unref(featuredArticle) && !vueExports.unref(tag)) {
				_push(`<div class="mb-16"><p class="eyebrow mb-5 text-accent"><span class="inline-block h-1 w-1 rounded-full bg-accent"></span> Artikel Unggulan </p>`);
				_push(ssrRenderComponent(_component_ArticleCard, vueExports.unref(featuredArticle), null, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			if (vueExports.unref(allTags).length) {
				_push(`<div class="mb-10 flex flex-wrap gap-2"><button class="${ssrRenderClass([vueExports.unref(tag) === "" ? "border-accent bg-accent text-white" : "border-line bg-white text-muted hover:border-ink/30 hover:text-ink", "rounded-md border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors"])}"> Semua </button><!--[-->`);
				ssrRenderList(vueExports.unref(allTags), (t) => {
					_push(`<button class="${ssrRenderClass([vueExports.unref(tag) === t ? "border-accent bg-accent text-white" : "border-line bg-white text-muted hover:border-ink/30 hover:text-ink", "rounded-md border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors"])}">${ssrInterpolate(t)}</button>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(ssrRenderComponent(_component_ArticleGrid, { articles: vueExports.unref(filteredArticles) }, null, _parent));
			_push(`</div>`);
			_push(ssrRenderComponent(_component_CTASection, {
				headline: "Butuh Konsultasi Conveyor?",
				description: "Tim engineer kami siap membantu Anda menemukan solusi terbaik.",
				"button-text": "Hubungi Kami",
				"button-link": "/kontak"
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/artikel/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/artikel/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var artikel_default = index_vue_vue_type_script_setup_true_lang_default;

export { artikel_default as default };
//# sourceMappingURL=artikel-B9S1FDQx.mjs.map
