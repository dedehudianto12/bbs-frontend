import { b as useAsyncData, e as useSeoMeta$1 } from '../virtual/entry.mjs';
import { B as Button_default } from './Button-fRm7tXm0.mjs';
import { q as queryCollection } from './client-DOm3OzYp.mjs';
import { G as GradientPanel_default } from './GradientPanel-CteABoXV.mjs';
import { A as ArticleCard_default } from './ArticleCard-Dne63jEl.mjs';
import { C as CTASection_default } from './CTASection-D_iyyglj.mjs';
import { S as StatisticsSection_default, W as WhyChooseUsSection_default, u as usePrefersReducedMotion, E as EASE_OUT_GSAP, D as DUR } from './WhyChooseUsSection-sVtuR7bB.mjs';
import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrGetDirectiveProps } from '@vue/server-renderer';
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

//#region components/home/HeroBlueprint.vue?vue&type=script&setup=true&lang.ts
var HeroBlueprint_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "HeroBlueprint",
	__ssrInlineRender: true,
	setup(__props) {
		const RISE = [
			0,
			80,
			150,
			220,
			300,
			360
		];
		const callouts = [
			{
				label: "PVC · PU",
				sub: "FOOD-GRADE",
				x: 250,
				y: 96,
				tx: 250,
				ty: 132,
				delay: 380
			},
			{
				label: "LEBAR s/d 3000 mm",
				sub: "",
				x: 470,
				y: 96,
				tx: 470,
				ty: 132,
				delay: 440
			},
			{
				label: "ROLLER Ø25–76",
				sub: "",
				x: 560,
				y: 268,
				tx: 540,
				ty: 232,
				delay: 500
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(vueExports.mergeProps({ class: "relative mx-auto w-full max-w-4xl" }, _attrs))}><svg viewBox="0 0 760 340" class="h-auto w-full" fill="none" role="img" aria-label="Diagram teknis belt conveyor: pulley, belt, roller, dan rangka penyangga"><g class="animate-rise motion-reduce:animate-none" style="${ssrRenderStyle({ animationDelay: `${RISE[0]}ms` })}"><path d="M40 286h680" stroke="rgb(var(--ink) / 0.28)" stroke-width="1.5"></path><path d="M40 292l14-6M80 292l14-6M120 292l14-6M160 292l14-6M200 292l14-6M240 292l14-6M280 292l14-6M320 292l14-6M360 292l14-6M400 292l14-6M440 292l14-6M480 292l14-6M520 292l14-6M560 292l14-6M600 292l14-6M640 292l14-6M680 292l14-6" stroke="rgb(var(--ink) / 0.18)" stroke-width="1"></path></g><g class="animate-rise motion-reduce:animate-none" style="${ssrRenderStyle({ animationDelay: `${RISE[1]}ms` })}" stroke="rgb(var(--ink) / 0.55)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M140 200v86M620 200v86"></path><path d="M250 210 224 286M250 210 276 286M250 250h-16M250 250h16"></path><path d="M510 210 484 286M510 210 536 286M510 250h-16M510 250h16"></path></g><g class="animate-rise motion-reduce:animate-none" style="${ssrRenderStyle({ animationDelay: `${RISE[4]}ms` })}" stroke="rgb(var(--ink) / 0.5)" stroke-width="2" stroke-linejoin="round"><rect x="232" y="112" width="46" height="30" rx="2" fill="rgb(var(--paper-soft))"></rect><rect x="452" y="108" width="52" height="34" rx="2" fill="rgb(var(--paper-soft))"></rect><path d="M245 112v30M491 108v34" stroke="rgb(var(--ink) / 0.2)" stroke-width="1.4"></path></g><g class="animate-rise motion-reduce:animate-none" style="${ssrRenderStyle({ animationDelay: `${RISE[2]}ms` })}"><rect x="106" y="142" width="548" height="68" rx="34" fill="rgb(var(--steel) / 0.04)" stroke="rgb(var(--ink) / 0.7)" stroke-width="2.4"></rect><path d="M140 148h480" stroke="rgb(var(--ink) / 0.28)" stroke-width="1.4"></path><path d="M150 148h460" stroke="rgb(var(--accent))" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="2 12" class="animate-belt-travel motion-reduce:animate-none"></path><circle cx="140" cy="176" r="22" fill="rgb(var(--paper-soft))" stroke="rgb(var(--ink) / 0.7)" stroke-width="2.4"></circle><circle cx="620" cy="176" r="22" fill="rgb(var(--paper-soft))" stroke="rgb(var(--ink) / 0.7)" stroke-width="2.4"></circle><circle cx="140" cy="176" r="4" fill="rgb(var(--ink) / 0.8)"></circle><circle cx="620" cy="176" r="4" fill="rgb(var(--ink) / 0.8)"></circle></g><g class="animate-rise motion-reduce:animate-none" style="${ssrRenderStyle({ animationDelay: `${RISE[3]}ms` })}"><!--[-->`);
			ssrRenderList([
				250,
				340,
				430,
				510
			], (cx) => {
				_push(`<circle${ssrRenderAttr("cx", cx)} cy="204" r="8" fill="rgb(var(--paper-soft))" stroke="rgb(var(--ink) / 0.45)" stroke-width="1.8"></circle>`);
			});
			_push(`<!--]--></g><g class="animate-rise motion-reduce:animate-none" style="${ssrRenderStyle({ animationDelay: `${RISE[3]}ms` })}" stroke="rgb(var(--accent))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M300 128h150m0 0-10-7m10 7-10 7"></path></g><g class="animate-rise motion-reduce:animate-none" style="${ssrRenderStyle({ animationDelay: `${RISE[5]}ms` })}"><path d="M106 232v34M654 232v34" stroke="rgb(var(--accent) / 0.55)" stroke-width="1.2" stroke-dasharray="3 4"></path><path d="M106 258h548" stroke="rgb(var(--accent))" stroke-width="1.4"></path><path d="M106 258l10-5m-10 5 10 5M654 258l-10-5m10 5-10 5" stroke="rgb(var(--accent))" stroke-width="1.4" stroke-linecap="round"></path><rect x="342" y="248" width="76" height="20" rx="3" fill="rgb(var(--paper))"></rect><text x="380" y="262" text-anchor="middle" font-size="12" font-weight="600" letter-spacing="0.08em" fill="rgb(var(--accent))" class="tabular-nums">MODULAR</text></g><g class="animate-rise motion-reduce:animate-none" style="${ssrRenderStyle({ animationDelay: `${RISE[5]}ms` })}" stroke="rgb(var(--ink) / 0.4)" stroke-width="1.2"><path d="M70 142v68"></path><path d="M70 142l-5 10m5-10 5 10M70 210l-5-10m5 10 5-10" stroke-linecap="round"></path><path d="M64 142h12M64 210h12"></path></g><!--[-->`);
			ssrRenderList(callouts, (c) => {
				_push(`<g class="animate-rise motion-reduce:animate-none" style="${ssrRenderStyle({ animationDelay: `${c.delay}ms` })}"><circle${ssrRenderAttr("cx", c.tx)}${ssrRenderAttr("cy", c.ty)} r="2.5" fill="rgb(var(--accent))"></circle><path${ssrRenderAttr("d", `M${c.tx} ${c.ty}L${c.x} ${c.y}`)} stroke="rgb(var(--ink) / 0.25)" stroke-width="1" stroke-dasharray="3 3"></path><text${ssrRenderAttr("x", c.x)}${ssrRenderAttr("y", c.y - 4)} text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.12em" fill="rgb(var(--ink) / 0.72)">${ssrInterpolate(c.label)}</text>`);
				if (c.sub) _push(`<text${ssrRenderAttr("x", c.x)}${ssrRenderAttr("y", c.y + 9)} text-anchor="middle" font-size="10" font-weight="600" letter-spacing="0.1em" fill="rgb(var(--accent))">${ssrInterpolate(c.sub)}</text>`);
				else _push(`<!---->`);
				_push(`</g>`);
			});
			_push(`<!--]--></svg></div>`);
		};
	}
});
//#endregion
//#region components/home/HeroBlueprint.vue
var _sfc_setup$8 = HeroBlueprint_vue_vue_type_script_setup_true_lang_default.setup;
HeroBlueprint_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HeroBlueprint.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var HeroBlueprint_default = Object.assign(HeroBlueprint_vue_vue_type_script_setup_true_lang_default, { __name: "HeroBlueprint" });
//#endregion
//#region components/home/HeroSection.vue?vue&type=script&setup=true&lang.ts
var HeroSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "HeroSection",
	__ssrInlineRender: true,
	props: {
		headline: {},
		subheadline: {},
		primaryCTA: {},
		primaryLink: {},
		secondaryCTA: {},
		secondaryLink: {}
	},
	setup(__props) {
		const props = __props;
		const HIGHLIGHTS = ["Bisnis Anda", "Conveyor"];
		const headlineParts = vueExports.computed(() => {
			let parts = [{
				text: props.headline,
				hl: false
			}];
			for (const phrase of HIGHLIGHTS) {
				const re = new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "i");
				parts = parts.flatMap((p) => {
					if (p.hl) return [p];
					return p.text.split(re).filter(Boolean).map((s) => ({
						text: s,
						hl: re.test(s) && s.toLowerCase() === phrase.toLowerCase()
					}));
				});
			}
			return parts;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Button = Button_default;
			const _component_HeroBlueprint = HeroBlueprint_default;
			_push(`<section${ssrRenderAttrs(vueExports.mergeProps({ class: "relative bg-paper" }, _attrs))}><div class="pointer-events-none absolute inset-0 blueprint-grid opacity-60" aria-hidden="true"></div><div class="frame relative border-b border-line"><div class="flex flex-col items-center px-5 pb-10 pt-16 text-center md:px-8 md:pb-14 md:pt-24"><span class="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/70 shadow-sm"><span class="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-glow"></span> Workshop &amp; tim teknisi <span class="text-signal">— siap</span></span><h1 class="display mt-8 max-w-3xl text-ink" style="${ssrRenderStyle({ "font-size": "clamp(2.4rem, 5.4vw, 4.25rem)" })}"><!--[-->`);
			ssrRenderList(vueExports.unref(headlineParts), (part, i) => {
				_push(`<span class="${ssrRenderClass(part.hl ? "text-accent" : "")}">${ssrInterpolate(part.text)}</span>`);
			});
			_push(`<!--]--></h1>`);
			if (__props.subheadline) _push(`<p class="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">${ssrInterpolate(__props.subheadline)}</p>`);
			else _push(`<!---->`);
			_push(`<div class="mt-8 flex flex-col items-center gap-3 sm:flex-row">`);
			_push(ssrRenderComponent(_component_Button, {
				to: __props.primaryLink,
				variant: "solid"
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(__props.primaryCTA)}`);
					else return [vueExports.createTextVNode(vueExports.toDisplayString(__props.primaryCTA), 1)];
				}),
				_: 1
			}, _parent));
			if (__props.secondaryCTA && __props.secondaryLink) _push(ssrRenderComponent(_component_Button, {
				to: __props.secondaryLink,
				variant: "white"
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(__props.secondaryCTA)}`);
					else return [vueExports.createTextVNode(vueExports.toDisplayString(__props.secondaryCTA), 1)];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</div><div class="mt-12 w-full md:mt-16">`);
			_push(ssrRenderComponent(_component_HeroBlueprint, null, null, _parent));
			_push(`</div></div></div></section>`);
		};
	}
});
//#endregion
//#region components/home/HeroSection.vue
var _sfc_setup$7 = HeroSection_vue_vue_type_script_setup_true_lang_default.setup;
HeroSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HeroSection.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var HeroSection_default = Object.assign(HeroSection_vue_vue_type_script_setup_true_lang_default, { __name: "HeroSection" });
//#endregion
//#region components/brand/ProductIcon.vue?vue&type=script&setup=true&lang.ts
var ProductIcon_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "ProductIcon",
	__ssrInlineRender: true,
	props: { name: { default: "generic" } },
	setup(__props) {
		const props = __props;
		const ICONS = {
			"pvc-belt": { paths: ["M3 8.5c3-3 6 3 9 0s6-3 9 0", "M3 15.5c3-3 6 3 9 0s6-3 9 0"] },
			pu: { paths: ["M3 9c3-3 6 3 9 0s6-3 9 0", "M3 15.5h18"] },
			"flat-belt": { paths: ["M3 9h18", "M3 15h18"] },
			"rubber-belt": { paths: ["M4.5 6.5h15a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z", "M2.5 12h19"] },
			"timing-belt": { paths: ["M3 8.5h18M3 16.5h18", "M6 8.5v4M10 8.5v4M14 8.5v4M18 8.5v4"] },
			fastener: {
				paths: ["M2.5 12h6M15.5 12h6", "M9.5 15.5v-7h5v7"],
				dots: [[
					12,
					12,
					1.2
				]]
			},
			cleat: { paths: [
				"M2.5 18.5h19",
				"M4 17.5 19.5 8.5",
				"M10.2 13.9l-1.7-2.9",
				"M14.9 11.2l-1.7-2.9"
			] },
			"gravity-roll": {
				paths: ["M4 20.5h16"],
				rings: [[
					12,
					11,
					7
				]],
				dots: [[
					12,
					11,
					1.6
				]]
			},
			generic: {
				paths: ["M4.5 4.5h15v15h-15Z"],
				dots: [[
					12,
					12,
					2
				]]
			}
		};
		const icon = vueExports.computed(() => ICONS[props.name] ?? ICONS.generic);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<svg${ssrRenderAttrs(vueExports.mergeProps({
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "1.8",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				"aria-hidden": "true"
			}, _attrs))}><!--[-->`);
			ssrRenderList(vueExports.unref(icon).paths ?? [], (d, i) => {
				_push(`<path${ssrRenderAttr("d", d)}></path>`);
			});
			_push(`<!--]--><!--[-->`);
			ssrRenderList(vueExports.unref(icon).rings ?? [], ([cx, cy, r], i) => {
				_push(`<circle${ssrRenderAttr("cx", cx)}${ssrRenderAttr("cy", cy)}${ssrRenderAttr("r", r)}></circle>`);
			});
			_push(`<!--]--><!--[-->`);
			ssrRenderList(vueExports.unref(icon).dots ?? [], ([cx, cy, r], i) => {
				_push(`<circle${ssrRenderAttr("cx", cx)}${ssrRenderAttr("cy", cy)}${ssrRenderAttr("r", r)} fill="currentColor" stroke="none"></circle>`);
			});
			_push(`<!--]--></svg>`);
		};
	}
});
//#endregion
//#region components/brand/ProductIcon.vue
var _sfc_setup$6 = ProductIcon_vue_vue_type_script_setup_true_lang_default.setup;
ProductIcon_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/brand/ProductIcon.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var ProductIcon_default = Object.assign(ProductIcon_vue_vue_type_script_setup_true_lang_default, { __name: "ProductIcon" });
//#endregion
//#region components/brand/ProductDiagram.vue?vue&type=script&setup=true&lang.ts
var ProductDiagram_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "ProductDiagram",
	__ssrInlineRender: true,
	props: { family: { default: "belt" } },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<svg${ssrRenderAttrs(vueExports.mergeProps({
				viewBox: "0 0 400 300",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "1.5",
				"stroke-linecap": "round",
				"stroke-linejoin": "round",
				preserveAspectRatio: "xMidYMid meet",
				"aria-hidden": "true"
			}, _attrs))}>`);
			if (__props.family === "belt") _push(`<!--[--><rect x="60" y="112" width="280" height="76" rx="38"></rect><circle cx="98" cy="150" r="22"></circle><circle cx="302" cy="150" r="22"></circle><circle cx="98" cy="150" r="3" fill="currentColor" stroke="none"></circle><circle cx="302" cy="150" r="3" fill="currentColor" stroke="none"></circle><path d="M172 84h56m0 0-8-6m8 6-8 6"></path><path d="M150 112v-14h28v14M236 112v-20h22v20" opacity="0.7"></path><path d="M60 216v10M340 216v10M60 221h280" stroke-dasharray="4 5" opacity="0.6"></path><!--]-->`);
			else if (__props.family === "roller") _push(`<!--[--><rect x="104" y="96" width="192" height="56" rx="28"></rect><path d="M104 124h-24M296 124h24"></path><path d="M74 124h252" stroke-dasharray="3 6" opacity="0.5"></path><path d="M132 152v70M268 152v70M96 222h208"></path><path d="M132 192h136" opacity="0.6"></path><!--]-->`);
			else _push(`<!--[--><path d="M40 128h130v44H40M360 128H230v44h130"></path><path d="M186 116v68M214 116v68" opacity="0.7"></path><path d="M186 116h28M186 184h28"></path><circle cx="200" cy="140" r="4" fill="currentColor" stroke="none"></circle><circle cx="200" cy="160" r="4" fill="currentColor" stroke="none"></circle><path d="M40 214h320" stroke-dasharray="4 6" opacity="0.4"></path><!--]-->`);
			_push(`</svg>`);
		};
	}
});
//#endregion
//#region components/brand/ProductDiagram.vue
var _sfc_setup$5 = ProductDiagram_vue_vue_type_script_setup_true_lang_default.setup;
ProductDiagram_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/brand/ProductDiagram.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var ProductDiagram_default = Object.assign(ProductDiagram_vue_vue_type_script_setup_true_lang_default, { __name: "ProductDiagram" });
//#endregion
//#region components/shared/SpecCard.vue?vue&type=script&setup=true&lang.ts
var SpecCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "SpecCard",
	__ssrInlineRender: true,
	props: { lines: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(vueExports.mergeProps({ class: "rounded-lg border border-line bg-white/95 p-5 text-[12.5px] leading-[2] tabular-nums shadow-xl shadow-ink/10 backdrop-blur-sm" }, _attrs))}><!--[-->`);
			ssrRenderList(__props.lines, (line, i) => {
				_push(`<div class="flex items-baseline gap-2.5 overflow-hidden whitespace-nowrap"><span class="${ssrRenderClass([line.preClass ?? "text-muted", "w-3 shrink-0 text-center"])}">${ssrInterpolate(line.pre)}</span><span class="${ssrRenderClass(line.textClass ?? "text-ink/75")}">${ssrInterpolate(line.text)}</span></div>`);
			});
			_push(`<!--]--></div>`);
		};
	}
});
//#endregion
//#region components/shared/SpecCard.vue
var _sfc_setup$4 = SpecCard_vue_vue_type_script_setup_true_lang_default.setup;
SpecCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/SpecCard.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var SpecCard_default = Object.assign(SpecCard_vue_vue_type_script_setup_true_lang_default, { __name: "SpecCard" });
//#endregion
//#region components/home/ProductCategoriesSection.vue?vue&type=script&setup=true&lang.ts
var orange = "text-accent";
var steel = "text-muted";
var green = "text-signal";
var dim = "text-ink/40";
var ProductCategoriesSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "ProductCategoriesSection",
	__ssrInlineRender: true,
	props: { items: {} },
	setup(__props) {
		const props = __props;
		function specHeader(label) {
			return {
				pre: "▣",
				preClass: "text-accent",
				text: `SPEC — ${label}`,
				textClass: "text-ink font-semibold tracking-[0.08em]"
			};
		}
		const META = {
			"pvc belt": {
				family: "belt",
				title: "Belt serbaguna untuk lini produksi",
				desc: "Permukaan bersih, tahan aus, dan mudah dibersihkan — pilihan utama untuk lini makanan, packaging, dan logistik ringan.",
				theme: 0,
				specs: [
					specHeader("PVC BELT"),
					{
						pre: "◇",
						preClass: steel,
						text: "ketebalan 1–5 mm · lebar s/d 3000 mm"
					},
					{
						pre: "·",
						text: "permukaan: glossy / matte / grip",
						textClass: dim
					},
					{
						pre: "✓",
						preClass: green,
						text: "varian food-grade tersedia",
						textClass: green
					},
					{
						pre: "→",
						preClass: orange,
						text: "aplikasi: F&B · packaging · logistik"
					}
				]
			},
			"pu": {
				family: "belt",
				title: "Higienis & tahan minyak untuk proses presisi",
				desc: "Belt polyurethane yang elastis, food-safe, dan tahan minyak — untuk industri pangan dan farmasi dengan standar tinggi.",
				theme: 2,
				specs: [
					specHeader("PU"),
					{
						pre: "◇",
						preClass: steel,
						text: "ketebalan 0.9–3 mm · anti-statis"
					},
					{
						pre: "·",
						text: "tahan minyak & lemak hewani",
						textClass: dim
					},
					{
						pre: "✓",
						preClass: green,
						text: "sertifikasi food-grade (FDA)",
						textClass: green
					},
					{
						pre: "→",
						preClass: orange,
						text: "aplikasi: pangan · farmasi · tembakau"
					}
				]
			},
			"flat belt": {
				family: "belt",
				title: "Transmisi daya & transport yang mulus",
				desc: "Flat belt nylon, polyester, dan rubber cover untuk transmisi daya berkecepatan tinggi dan konveyor datar.",
				theme: 1,
				specs: [
					specHeader("FLAT BELT"),
					{
						pre: "◇",
						preClass: steel,
						text: "material: nylon · polyester · rubber"
					},
					{
						pre: "·",
						text: "kecepatan tinggi, slip rendah",
						textClass: dim
					},
					{
						pre: "✓",
						preClass: green,
						text: "sambungan endless tersedia",
						textClass: green
					},
					{
						pre: "→",
						preClass: orange,
						text: "aplikasi: tekstil · percetakan · kayu"
					}
				]
			},
			"rubber belt": {
				family: "belt",
				title: "Tenaga besar untuk beban berat",
				desc: "Rubber belt EP dengan kekuatan tarik tinggi dan tahan abrasi — andalan tambang, semen, dan material curah.",
				theme: 3,
				specs: [
					specHeader("RUBBER BELT"),
					{
						pre: "◇",
						preClass: steel,
						text: "karkas EP100–EP500 · 2–5 ply"
					},
					{
						pre: "·",
						text: "tahan abrasi, panas & benturan",
						textClass: dim
					},
					{
						pre: "✓",
						preClass: green,
						text: "onsite joint: hot / cold splicing",
						textClass: green
					},
					{
						pre: "→",
						preClass: orange,
						text: "aplikasi: tambang · semen · smelter"
					}
				]
			},
			"timing belt": {
				family: "belt",
				title: "Gerak sinkron tanpa slip",
				desc: "Timing belt bergigi untuk transmisi presisi dan positioning yang akurat pada mesin produksi.",
				theme: 4,
				specs: [
					specHeader("TIMING BELT"),
					{
						pre: "◇",
						preClass: steel,
						text: "profil: T · AT · HTD · STD"
					},
					{
						pre: "·",
						text: "penguat steel / kevlar cord",
						textClass: dim
					},
					{
						pre: "✓",
						preClass: green,
						text: "custom cleat & coating",
						textClass: green
					},
					{
						pre: "→",
						preClass: orange,
						text: "aplikasi: otomasi · packaging"
					}
				]
			},
			"fastener": {
				family: "joint",
				title: "Sambungan belt cepat & kuat",
				desc: "Alligator, clipper, dan bolt fastener untuk penyambungan belt yang cepat tanpa vulkanisir.",
				theme: 5,
				specs: [
					specHeader("FASTENER"),
					{
						pre: "◇",
						preClass: steel,
						text: "tipe: alligator · clipper · bolt plate"
					},
					{
						pre: "·",
						text: "material steel & stainless",
						textClass: dim
					},
					{
						pre: "✓",
						preClass: green,
						text: "pemasangan di lokasi tersedia",
						textClass: green
					},
					{
						pre: "→",
						preClass: orange,
						text: "aplikasi: perbaikan darurat · MRO"
					}
				]
			},
			"cleat": {
				family: "joint",
				title: "Bawa material menanjak tanpa tumpah",
				desc: "Cleat PU/PVC dan profile guide untuk konveyor miring dan pengarah jalur belt.",
				theme: 1,
				specs: [
					specHeader("CLEAT"),
					{
						pre: "◇",
						preClass: steel,
						text: "tipe A · C · profil custom"
					},
					{
						pre: "·",
						text: "las frekuensi tinggi (HF welding)",
						textClass: dim
					},
					{
						pre: "✓",
						preClass: green,
						text: "desain sesuai sudut incline",
						textClass: green
					},
					{
						pre: "→",
						preClass: orange,
						text: "aplikasi: incline · unit dosing"
					}
				]
			},
			"gravity roll": {
				family: "roller",
				title: "Handling efisien tanpa daya",
				desc: "Gravity roller conveyor baja dan stainless untuk transport ringan hingga berat di gudang dan lini kemasan.",
				theme: 4,
				specs: [
					specHeader("GRAVITY ROLL"),
					{
						pre: "◇",
						preClass: steel,
						text: "roller Ø25–Ø76 mm · baja / SS"
					},
					{
						pre: "·",
						text: "rangka statis / adjustable",
						textClass: dim
					},
					{
						pre: "✓",
						preClass: green,
						text: "bearing presisi, putaran ringan",
						textClass: green
					},
					{
						pre: "→",
						preClass: orange,
						text: "aplikasi: gudang · loading dock"
					}
				]
			}
		};
		const FALLBACK = {
			title: "Komponen conveyor industri",
			desc: "Komponen berkualitas untuk menjaga sistem material handling Anda tetap berjalan.",
			theme: 0,
			specs: [
				specHeader("PRODUK"),
				{
					pre: "◇",
					preClass: steel,
					text: "spesifikasi sesuai kebutuhan"
				},
				{
					pre: "✓",
					preClass: green,
					text: "stok ready & indent",
					textClass: green
				},
				{
					pre: "→",
					preClass: orange,
					text: "konsultasi teknis gratis"
				}
			]
		};
		function metaOf(cat) {
			return META[cat.toLowerCase()] ?? FALLBACK;
		}
		function hrefOf(item) {
			const slug = item.cat.toLowerCase().replace(/\s+/g, "-");
			return item.group === "belt-conveyor" ? `/produk/belt-conveyor/${slug}` : `/produk/lainnya/${slug}`;
		}
		const rows = vueExports.computed(() => props.items.map((item, i) => ({
			...item,
			i,
			...metaOf(item.cat),
			href: hrefOf(item),
			icon: item.cat.toLowerCase().replace(/\s+/g, "-")
		})));
		const reduced = usePrefersReducedMotion();
		const rowFrom = vueExports.computed(() => reduced.value ? { duration: .001 } : {
			scale: .97,
			opacity: 0,
			duration: DUR.base,
			ease: EASE_OUT_GSAP
		});
		const activeIdx = vueExports.ref(0);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ProductIcon = ProductIcon_default;
			const _component_Button = Button_default;
			const _component_GradientPanel = GradientPanel_default;
			const _component_ProductDiagram = ProductDiagram_default;
			const _component_SpecCard = SpecCard_default;
			const _directive_gsap = vueExports.resolveDirective("gsap");
			_push(`<section${ssrRenderAttrs(vueExports.mergeProps({ class: "bg-paper text-ink" }, _attrs))}><div class="frame"><div class="blueprint-grid border-b border-line px-6 py-3 md:px-10"><span class="eyebrow text-accent">Katalog</span></div><div class="border-b border-line px-6 py-16 md:px-10 md:py-24"><h2 class="display text-4xl md:text-6xl">Katalog Produk</h2><p class="mt-6 max-w-md leading-relaxed text-muted"> Belt conveyor dan komponen material handling untuk lini produksi yang kritis — dipilih dan diuji untuk kebutuhan industri Indonesia. </p></div><div class="grid lg:grid-cols-[230px_1fr]"><aside class="hidden border-r border-line lg:block"><nav class="sticky top-24 flex flex-col gap-1 p-6"><!--[-->`);
			ssrRenderList(vueExports.unref(rows), (row) => {
				_push(`<a${ssrRenderAttr("href", `#produk-${row.i}`)} class="${ssrRenderClass([vueExports.unref(activeIdx) === row.i ? "text-ink" : "text-muted hover:text-ink", "flex items-center gap-2.5 rounded-md px-2 py-2 text-sm font-medium transition-colors"])}">`);
				_push(ssrRenderComponent(_component_ProductIcon, {
					name: row.icon,
					class: ["h-3.5 w-3.5 shrink-0", vueExports.unref(activeIdx) === row.i ? "text-accent" : "text-ink/30"]
				}, null, _parent));
				_push(` ${ssrInterpolate(row.cat)}</a>`);
			});
			_push(`<!--]--></nav></aside><div><!--[-->`);
			ssrRenderList(vueExports.unref(rows), (row) => {
				_push(`<article${ssrRenderAttrs(vueExports.mergeProps({
					id: `produk-${row.i}`,
					key: row.cat,
					"data-idx": row.i,
					"data-produk-row": "",
					class: "grid border-b border-line last:border-b-0 md:grid-cols-2"
				}, ssrGetDirectiveProps(_ctx, _directive_gsap, vueExports.unref(rowFrom), void 0, {
					whenVisible: true,
					once: true,
					from: true
				})))}><div class="px-6 py-12 md:px-10 md:py-16"><p class="eyebrow text-muted">${ssrInterpolate(row.cat)}</p><h3 class="display mt-4 max-w-xs text-2xl text-ink md:text-[1.9rem]">${ssrInterpolate(row.title)}</h3><p class="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">${ssrInterpolate(row.desc)}</p><div class="mt-8">`);
				_push(ssrRenderComponent(_component_Button, {
					to: row.href,
					variant: "white"
				}, {
					default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Lihat ${ssrInterpolate(row.cat)}`);
						else return [vueExports.createTextVNode("Lihat " + vueExports.toDisplayString(row.cat), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</div><div class="mt-10 flex items-center gap-2 text-sm text-muted"><svg class="h-4 w-4 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="font-semibold tabular-nums text-ink">${ssrInterpolate(row.count)}</span><span class="text-muted">produk</span><span class="text-line">·</span><span class="inline-flex items-center gap-1.5 text-muted"><span class="h-1.5 w-1.5 rounded-full bg-signal"></span>siap kirim </span></div></div><div class="relative min-h-[300px] border-t border-line md:min-h-0 md:border-l md:border-t-0">`);
				_push(ssrRenderComponent(_component_GradientPanel, {
					index: row.theme,
					rounded: "rounded-none",
					grain: false,
					class: "absolute inset-0 border-0"
				}, {
					default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
						if (_push) if (row.family) _push(ssrRenderComponent(_component_ProductDiagram, {
							family: row.family,
							class: "absolute inset-0 h-full w-full p-6 text-ink/25"
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						else return [row.family ? (vueExports.openBlock(), vueExports.createBlock(_component_ProductDiagram, {
							key: 0,
							family: row.family,
							class: "absolute inset-0 h-full w-full p-6 text-ink/25"
						}, null, 8, ["family"])) : vueExports.createCommentVNode("", true)];
					}),
					_: 2
				}, _parent));
				_push(`<div class="absolute inset-x-5 top-1/2 -translate-y-1/2 md:inset-x-8 lg:left-12 lg:right-8">`);
				_push(ssrRenderComponent(_component_SpecCard, { lines: row.specs }, null, _parent));
				_push(`</div></div></article>`);
			});
			_push(`<!--]--></div></div></div></section>`);
		};
	}
});
//#endregion
//#region components/home/ProductCategoriesSection.vue
var _sfc_setup$3 = ProductCategoriesSection_vue_vue_type_script_setup_true_lang_default.setup;
ProductCategoriesSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ProductCategoriesSection.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var ProductCategoriesSection_default = Object.assign(ProductCategoriesSection_vue_vue_type_script_setup_true_lang_default, { __name: "ProductCategoriesSection" });
//#endregion
//#region components/home/IndustriesSection.vue?vue&type=script&setup=true&lang.ts
var IndustriesSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "IndustriesSection",
	__ssrInlineRender: true,
	props: { industries: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(vueExports.mergeProps({ class: "bg-paper" }, _attrs))}><div class="frame border-b border-line"><div class="grid sm:grid-cols-2 lg:grid-cols-5"><div class="flex items-center border-b border-line px-6 py-6 lg:border-b-0"><p class="text-sm leading-snug text-muted"> Melayani sektor industri utama di Indonesia. </p></div><!--[-->`);
			ssrRenderList(__props.industries, (industry, i) => {
				_push(`<div class="flex min-h-[86px] items-center justify-center border-b border-line px-4 py-6 text-center sm:border-l lg:border-b-0"${ssrRenderAttr("title", industry.description)}><span class="text-[15px] font-semibold tracking-tight text-ink/70 transition-colors hover:text-ink">${ssrInterpolate(industry.name)}</span></div>`);
			});
			_push(`<!--]--></div></div></section>`);
		};
	}
});
//#endregion
//#region components/home/IndustriesSection.vue
var _sfc_setup$2 = IndustriesSection_vue_vue_type_script_setup_true_lang_default.setup;
IndustriesSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/IndustriesSection.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var IndustriesSection_default = Object.assign(IndustriesSection_vue_vue_type_script_setup_true_lang_default, { __name: "IndustriesSection" });
//#endregion
//#region components/home/LatestArticlesSection.vue?vue&type=script&setup=true&lang.ts
var LatestArticlesSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "LatestArticlesSection",
	__ssrInlineRender: true,
	props: { articles: {} },
	setup(__props) {
		vueExports.ref(null);
		const activeDot = vueExports.ref(0);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_Button = Button_default;
			const _component_ArticleCard = ArticleCard_default;
			_push(`<section${ssrRenderAttrs(vueExports.mergeProps({ class: "bg-paper" }, _attrs))}><div class="frame border-b border-line"><div class="grid lg:grid-cols-[360px_1fr]"><div class="flex flex-col border-b border-line px-6 py-12 md:px-10 lg:border-b-0 lg:border-r lg:py-16"><h2 class="display text-3xl text-ink md:text-4xl">Artikel &amp; update terbaru</h2><div class="mt-8">`);
			_push(ssrRenderComponent(_component_Button, {
				to: "/artikel",
				variant: "white"
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Semua Artikel`);
					else return [vueExports.createTextVNode("Semua Artikel")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="mt-auto hidden pt-14 lg:block"><div class="rounded-lg border border-line bg-white p-4 shadow-sm"><span class="inline-flex items-center gap-1.5 rounded bg-paper-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted"><span class="h-2 w-2 border-l-2 border-t-2 border-accent"></span>Work Order </span><dl class="mt-3 space-y-1.5 text-[12.5px] tabular-nums"><div class="flex justify-between gap-4 border-b border-line/70 pb-1.5"><dt class="text-muted">No.</dt><dd class="font-semibold text-ink">WO-2026-118</dd></div><div class="flex justify-between gap-4"><dt class="text-muted">Item</dt><dd class="font-semibold text-accent">PU Belt Food Grade</dd></div><div class="flex justify-between gap-4"><dt class="text-muted">Qty</dt><dd class="text-ink">40 m</dd></div><div class="flex justify-between gap-4"><dt class="text-muted">Status</dt><dd class="inline-flex items-center gap-1.5 font-semibold text-signal"><span class="h-1.5 w-1.5 rounded-full bg-signal"></span>Siap kirim</dd></div></dl></div></div></div><div class="min-w-0 px-6 py-12 md:px-8 lg:py-16">`);
			if (__props.articles.length) {
				_push(`<div class="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]"><!--[-->`);
				ssrRenderList(__props.articles, (article) => {
					_push(`<div class="w-[280px] shrink-0 snap-start md:w-[300px]">`);
					_push(ssrRenderComponent(_component_ArticleCard, vueExports.mergeProps({ ref_for: true }, article), null, _parent));
					_push(`</div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<p class="rounded-xl border border-dashed border-line py-16 text-center text-sm text-muted"> Belum ada artikel. </p>`);
			if (__props.articles.length > 1) {
				_push(`<div class="mt-4 flex justify-center gap-1.5"><!--[-->`);
				ssrRenderList(__props.articles, (a, i) => {
					_push(`<span class="${ssrRenderClass([i === vueExports.unref(activeDot) ? "bg-ink/60" : "bg-ink/15", "h-1.5 w-1.5 rounded-full transition-colors"])}"></span>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`</div></div></div></section>`);
		};
	}
});
//#endregion
//#region components/home/LatestArticlesSection.vue
var _sfc_setup$1 = LatestArticlesSection_vue_vue_type_script_setup_true_lang_default.setup;
LatestArticlesSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/LatestArticlesSection.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var LatestArticlesSection_default = Object.assign(LatestArticlesSection_vue_vue_type_script_setup_true_lang_default, { __name: "LatestArticlesSection" });
//#endregion
//#region pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { data: hp } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData("homepage-config", () => queryCollection("homepageConfig").first())), __temp = await __temp, __restore(), __temp);
		const hpData = vueExports.computed(() => hp.value ?? {});
		const heroProps = vueExports.computed(() => ({
			headline: hpData.value?.hero?.headline ?? "Solusi Belt & Roller Conveyor untuk Bisnis Anda",
			subheadline: hpData.value?.hero?.subheadline ?? "",
			primaryCTA: hpData.value?.hero?.primaryCTA ?? "Lihat Produk",
			primaryLink: hpData.value?.hero?.primaryLink ?? "/produk/belt-conveyor",
			secondaryCTA: hpData.value?.hero?.secondaryCTA,
			secondaryLink: hpData.value?.hero?.secondaryLink
		}));
		const whyChooseUsItems = vueExports.computed(() => hpData.value?.whyChooseUs?.items ?? []);
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
		const ctaProps = vueExports.computed(() => ({
			headline: hpData.value?.cta?.headline ?? "Butuh Solusi Conveyor?",
			description: hpData.value?.cta?.description ?? "Konsultasikan kebutuhan industri Anda dengan tim kami.",
			buttonText: hpData.value?.cta?.buttonText ?? "Hubungi Kami",
			buttonLink: hpData.value?.cta?.buttonLink ?? "/kontak"
		}));
		const mission = vueExports.computed(() => hpData.value?.company?.description ?? "BBS Conveyor adalah supplier conveyor terpercaya di Indonesia yang menyediakan belt conveyor, roller, dan komponen industri berkualitas tinggi.");
		const { data: products } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData("homepage-products", () => queryCollection("products").all())), __temp = await __temp, __restore(), __temp);
		const { data: industries } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData("homepage-industries", () => queryCollection("industries").all())), __temp = await __temp, __restore(), __temp);
		const { data: articles } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData("homepage-articles", () => queryCollection("blog").all())), __temp = await __temp, __restore(), __temp);
		const catItems = vueExports.computed(() => {
			const list = Array.isArray(products.value) ? products.value : [];
			const map = /* @__PURE__ */ new Map();
			for (const p of list) {
				const entry = map.get(p.category) ?? {
					cat: p.category,
					group: p.group,
					count: 0
				};
				entry.count++;
				map.set(p.category, entry);
			}
			return [...map.values()];
		});
		const industryItems = vueExports.computed(() => (Array.isArray(industries.value) ? industries.value : []).map((i) => ({
			name: i.title,
			description: i.excerpt,
			slug: i.slug
		})));
		const latestArticles = vueExports.computed(() => (Array.isArray(articles.value) ? [...articles.value].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 6) : []).map((a) => ({
			slug: a.slug,
			title: a.title,
			excerpt: a.excerpt,
			tag: a.tags?.[0] ?? "",
			image: a.thumbnail ?? null,
			publishedAt: a.publishedAt,
			author: a.author ?? ""
		})));
		useSeoMeta$1({
			title: hpData.value?.seo?.title ?? "BBS Conveyor — Solusi Belt & Roller Conveyor Industri",
			description: hpData.value?.seo?.description ?? "",
			ogImage: hpData.value?.seo?.ogImage ?? "/images/og-home.webp",
			twitterCard: "summary_large_image"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_HeroSection = HeroSection_default;
			const _component_ProductCategoriesSection = ProductCategoriesSection_default;
			const _component_StatisticsSection = StatisticsSection_default;
			const _component_WhyChooseUsSection = WhyChooseUsSection_default;
			const _component_Button = Button_default;
			const _component_IndustriesSection = IndustriesSection_default;
			const _component_LatestArticlesSection = LatestArticlesSection_default;
			const _component_CTASection = CTASection_default;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_HeroSection, vueExports.unref(heroProps), null, _parent));
			_push(ssrRenderComponent(_component_ProductCategoriesSection, { items: vueExports.unref(catItems) }, null, _parent));
			if (vueExports.unref(stats).length) _push(ssrRenderComponent(_component_StatisticsSection, { items: vueExports.unref(stats) }, null, _parent));
			else _push(`<!---->`);
			_push(ssrRenderComponent(_component_WhyChooseUsSection, { items: vueExports.unref(whyChooseUsItems) }, null, _parent));
			_push(`<section class="bg-paper"><div class="frame border-b border-line"><div class="bg-paper-soft px-6 py-20 text-center md:py-28"><p class="display mx-auto max-w-3xl text-2xl leading-snug text-ink md:text-[2.4rem]">${ssrInterpolate(vueExports.unref(mission))}</p><div class="mt-10 flex justify-center">`);
			_push(ssrRenderComponent(_component_Button, {
				to: "/tentang-kami",
				variant: "white"
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Selengkapnya`);
					else return [vueExports.createTextVNode("Selengkapnya")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></section>`);
			_push(ssrRenderComponent(_component_IndustriesSection, { industries: vueExports.unref(industryItems) }, null, _parent));
			_push(ssrRenderComponent(_component_LatestArticlesSection, { articles: vueExports.unref(latestArticles) }, null, _parent));
			_push(ssrRenderComponent(_component_CTASection, vueExports.unref(ctaProps), null, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-WF1q6GxV.mjs.map
