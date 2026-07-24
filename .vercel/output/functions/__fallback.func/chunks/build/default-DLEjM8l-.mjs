import { b as useAsyncData, N as NuxtLink, u as useRoute$1 } from '../virtual/entry.mjs';
import { B as Button_default } from './Button-fRm7tXm0.mjs';
import { q as queryCollection } from './client-DOm3OzYp.mjs';
import { v as vueExports } from '../nitro/nitro.mjs';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrRenderVNode } from '@vue/server-renderer';
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

//#region components/layout/AnnouncementBar.vue?vue&type=script&setup=true&lang.ts
var AnnouncementBar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "AnnouncementBar",
	__ssrInlineRender: true,
	setup(__props) {
		const visible = vueExports.ref(true);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			if (vueExports.unref(visible)) {
				_push(`<div${ssrRenderAttrs(vueExports.mergeProps({ class: "relative isolate border-b border-line bg-paper-soft text-ink" }, _attrs))}><div class="flex items-center gap-3 px-4 py-2 md:px-6">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/kontak",
					class: "group flex min-w-0 items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/75"
				}, {
					default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true"${_scopeId}></span><span class="truncate"${_scopeId}>Konsultasi &amp; survei lokasi gratis — hubungi tim kami</span><span class="grid h-4 w-5 shrink-0 place-items-center rounded-sm bg-accent/15 text-[10px] text-accent transition-transform group-hover:translate-x-0.5"${_scopeId}>→</span>`);
						else return [
							vueExports.createVNode("span", {
								class: "h-1.5 w-1.5 shrink-0 rounded-full bg-accent",
								"aria-hidden": "true"
							}),
							vueExports.createVNode("span", { class: "truncate" }, "Konsultasi & survei lokasi gratis — hubungi tim kami"),
							vueExports.createVNode("span", { class: "grid h-4 w-5 shrink-0 place-items-center rounded-sm bg-accent/15 text-[10px] text-accent transition-transform group-hover:translate-x-0.5" }, "→")
						];
					}),
					_: 1
				}, _parent));
				_push(`<button class="ml-auto shrink-0 p-1 text-ink/50 transition-colors hover:text-ink" aria-label="Tutup pengumuman"><svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg></button></div></div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region components/layout/AnnouncementBar.vue
var _sfc_setup$6 = AnnouncementBar_vue_vue_type_script_setup_true_lang_default.setup;
AnnouncementBar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AnnouncementBar.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var AnnouncementBar_default = Object.assign(AnnouncementBar_vue_vue_type_script_setup_true_lang_default, { __name: "AnnouncementBar" });
//#endregion
//#region components/brand/BrandLogo.vue?vue&type=script&setup=true&lang.ts
var BrandLogo_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "BrandLogo",
	__ssrInlineRender: true,
	props: {
		to: { default: "/" },
		invert: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(NuxtLink, vueExports.mergeProps({
				to: __props.to,
				class: ["flex shrink-0 items-baseline font-semibold tracking-tight", __props.invert ? "text-white" : "text-ink"],
				"aria-label": "BBS Conveyor — Beranda"
			}, _attrs), {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="text-[17px]"${_scopeId}>BBS</span><span class="text-[17px]"${_scopeId}>(</span><svg viewBox="0 0 24 24" class="h-[13px] w-[13px] self-center" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"${_scopeId}><circle cx="12" cy="12" r="7.5"${_scopeId}></circle><circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"${_scopeId}></circle><path d="M12 1.8v3M12 19.2v3M1.8 12h3M19.2 12h3M4.8 4.8l2.1 2.1M17.1 17.1l2.1 2.1M19.2 4.8l-2.1 2.1M6.9 17.1l-2.1 2.1" stroke-linecap="round"${_scopeId}></path></svg><span class="text-[17px]"${_scopeId}>)</span>`);
					else return [
						vueExports.createVNode("span", { class: "text-[17px]" }, "BBS"),
						vueExports.createVNode("span", { class: "text-[17px]" }, "("),
						(vueExports.openBlock(), vueExports.createBlock("svg", {
							viewBox: "0 0 24 24",
							class: "h-[13px] w-[13px] self-center",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2.2",
							"aria-hidden": "true"
						}, [
							vueExports.createVNode("circle", {
								cx: "12",
								cy: "12",
								r: "7.5"
							}),
							vueExports.createVNode("circle", {
								cx: "12",
								cy: "12",
								r: "2.5",
								fill: "currentColor",
								stroke: "none"
							}),
							vueExports.createVNode("path", {
								d: "M12 1.8v3M12 19.2v3M1.8 12h3M19.2 12h3M4.8 4.8l2.1 2.1M17.1 17.1l2.1 2.1M19.2 4.8l-2.1 2.1M6.9 17.1l-2.1 2.1",
								"stroke-linecap": "round"
							})
						])),
						vueExports.createVNode("span", { class: "text-[17px]" }, ")")
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region components/brand/BrandLogo.vue
var _sfc_setup$5 = BrandLogo_vue_vue_type_script_setup_true_lang_default.setup;
BrandLogo_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/brand/BrandLogo.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var BrandLogo_default = Object.assign(BrandLogo_vue_vue_type_script_setup_true_lang_default, { __name: "BrandLogo" });
//#endregion
//#region components/layout/NavigationDropdown.vue?vue&type=script&setup=true&lang.ts
var NavigationDropdown_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "NavigationDropdown",
	__ssrInlineRender: true,
	props: {
		label: {},
		href: {},
		items: {}
	},
	setup(__props) {
		const props = __props;
		const isOpen = vueExports.ref(false);
		vueExports.ref(null);
		vueExports.ref(null);
		const activeIndex = vueExports.ref(-1);
		const route = useRoute$1();
		const isActive = vueExports.computed(() => props.items.some((item) => route.path.startsWith(item.href)));
		vueExports.watch(() => route.path, () => {
			isOpen.value = false;
			activeIndex.value = -1;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<!--[--><div class="relative hidden lg:block">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: __props.href,
				class: ["relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors", vueExports.unref(isActive) ? "text-ink" : "text-ink/60 hover:text-ink"]
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`${ssrInterpolate(__props.label)} <svg class="${ssrRenderClass([{ "rotate-180": vueExports.unref(isOpen) }, "h-3 w-3 transition-transform duration-200"])}" viewBox="0 0 12 12" aria-hidden="true"${_scopeId}><path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5"${_scopeId}></path></svg>`);
						if (vueExports.unref(isActive)) _push(`<span class="absolute -bottom-[3px] left-3 right-3 h-px bg-accent"${_scopeId}></span>`);
						else _push(`<!---->`);
					} else return [
						vueExports.createTextVNode(vueExports.toDisplayString(__props.label) + " ", 1),
						(vueExports.openBlock(), vueExports.createBlock("svg", {
							class: ["h-3 w-3 transition-transform duration-200", { "rotate-180": vueExports.unref(isOpen) }],
							viewBox: "0 0 12 12",
							"aria-hidden": "true"
						}, [vueExports.createVNode("path", {
							d: "M3 5l3 3 3-3",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "1.5"
						})], 2)),
						vueExports.unref(isActive) ? (vueExports.openBlock(), vueExports.createBlock("span", {
							key: 0,
							class: "absolute -bottom-[3px] left-3 right-3 h-px bg-accent"
						})) : vueExports.createCommentVNode("", true)
					];
				}),
				_: 1
			}, _parent));
			if (vueExports.unref(isOpen)) {
				_push(`<div class="absolute left-0 top-full z-50 mt-2 w-[230px] rounded-xl border border-line bg-white p-1.5 shadow-xl shadow-ink/5"><!--[-->`);
				ssrRenderList(__props.items, (item, i) => {
					_push(ssrRenderComponent(_component_NuxtLink, {
						key: item.label,
						to: item.href,
						class: ["flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors", i === vueExports.unref(activeIndex) || vueExports.unref(route).path.startsWith(item.href) ? "bg-paper-soft text-ink" : "text-ink/60 hover:bg-paper-soft hover:text-ink"]
					}, {
						default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<span class="text-[10px] font-semibold tabular-nums text-accent/70"${_scopeId}>${ssrInterpolate(String(i + 1).padStart(2, "0"))}</span> ${ssrInterpolate(item.label)}`);
							else return [vueExports.createVNode("span", { class: "text-[10px] font-semibold tabular-nums text-accent/70" }, vueExports.toDisplayString(String(i + 1).padStart(2, "0")), 1), vueExports.createTextVNode(" " + vueExports.toDisplayString(item.label), 1)];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`</div><div class="border-b border-line py-1 lg:hidden"><div class="flex items-center justify-between">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: __props.href,
				class: ["py-2 text-[15px] font-medium transition-colors", vueExports.unref(isActive) ? "text-ink" : "text-ink/60 hover:text-ink"]
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(__props.label)}`);
					else return [vueExports.createTextVNode(vueExports.toDisplayString(__props.label), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<button class="p-2 text-ink/40 transition-colors hover:text-ink" aria-label="Toggle submenu"><svg class="${ssrRenderClass([{ "rotate-180": vueExports.unref(isOpen) }, "h-3.5 w-3.5 transition-transform duration-200"])}" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5"></path></svg></button></div><div class="mb-2 ml-1 flex flex-col border-l border-line pl-4" style="${ssrRenderStyle(vueExports.unref(isOpen) ? null : { display: "none" })}"><!--[-->`);
			ssrRenderList(__props.items, (item) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: item.label,
					to: item.href,
					class: "py-2 text-sm text-ink/55 transition-colors hover:text-ink",
					onClick: ($event) => isOpen.value = false
				}, {
					default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(item.label)}`);
						else return [vueExports.createTextVNode(vueExports.toDisplayString(item.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div></div><!--]-->`);
		};
	}
});
//#endregion
//#region components/layout/NavigationDropdown.vue
var _sfc_setup$4 = NavigationDropdown_vue_vue_type_script_setup_true_lang_default.setup;
NavigationDropdown_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/NavigationDropdown.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var NavigationDropdown_default = Object.assign(NavigationDropdown_vue_vue_type_script_setup_true_lang_default, { __name: "NavigationDropdown" });
//#endregion
//#region components/layout/AppNavbar.vue?vue&type=script&setup=true&lang.ts
var AppNavbar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "AppNavbar",
	__ssrInlineRender: true,
	props: {
		navItems: {},
		ctaLabel: {},
		ctaHref: {}
	},
	setup(__props) {
		const route = useRoute$1();
		const isOpen = vueExports.ref(false);
		function isActive(item) {
			if (route.path === item.href) return true;
			if (item.children?.some((c) => route.path.startsWith(c.href))) return true;
			return false;
		}
		vueExports.watch(() => route.path, () => {
			isOpen.value = false;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BrandLogo = BrandLogo_default;
			const _component_NavigationDropdown = NavigationDropdown_default;
			const _component_NuxtLink = NuxtLink;
			const _component_Button = Button_default;
			_push(`<nav${ssrRenderAttrs(vueExports.mergeProps({ class: "sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur-xl" }, _attrs))}><div class="frame flex h-16 items-center gap-6 px-5 md:px-8">`);
			_push(ssrRenderComponent(_component_BrandLogo, null, null, _parent));
			_push(`<div class="hidden items-center gap-1 lg:flex"><!--[-->`);
			ssrRenderList(__props.navItems, (item) => {
				_push(`<!--[-->`);
				if (item.children) _push(ssrRenderComponent(_component_NavigationDropdown, {
					label: item.label,
					href: item.href,
					items: item.children
				}, null, _parent));
				else _push(ssrRenderComponent(_component_NuxtLink, {
					to: item.href,
					class: ["relative px-3 py-2 text-sm font-medium transition-colors", isActive(item) ? "text-ink" : "text-ink/60 hover:text-ink"]
				}, {
					default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`${ssrInterpolate(item.label)} `);
							if (isActive(item)) _push(`<span class="absolute -bottom-[3px] left-3 right-3 h-px bg-accent"${_scopeId}></span>`);
							else _push(`<!---->`);
						} else return [vueExports.createTextVNode(vueExports.toDisplayString(item.label) + " ", 1), isActive(item) ? (vueExports.openBlock(), vueExports.createBlock("span", {
							key: 0,
							class: "absolute -bottom-[3px] left-3 right-3 h-px bg-accent"
						})) : vueExports.createCommentVNode("", true)];
					}),
					_: 2
				}, _parent));
				_push(`<!--]-->`);
			});
			_push(`<!--]--></div><div class="ml-auto hidden items-center gap-3 lg:flex"><a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" class="grid h-8 w-8 place-items-center rounded-lg text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink" aria-label="WhatsApp"><svg class="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg></a>`);
			_push(ssrRenderComponent(_component_Button, {
				href: __props.ctaHref,
				variant: "solid",
				size: "sm",
				external: ""
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(__props.ctaLabel)}`);
					else return [vueExports.createTextVNode(vueExports.toDisplayString(__props.ctaLabel), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div><button class="ml-auto flex flex-col gap-1.5 p-2 lg:hidden" aria-label="Buka menu"><span class="${ssrRenderClass([vueExports.unref(isOpen) ? "translate-y-2 rotate-45" : "", "block h-0.5 w-5 bg-ink transition-transform duration-200"])}"></span><span class="${ssrRenderClass([vueExports.unref(isOpen) ? "opacity-0" : "", "block h-0.5 w-5 bg-ink transition-opacity duration-200"])}"></span><span class="${ssrRenderClass([vueExports.unref(isOpen) ? "-translate-y-2 -rotate-45" : "", "block h-0.5 w-5 bg-ink transition-transform duration-200"])}"></span></button></div><div class="border-t border-line bg-white px-5 pb-6 pt-2 lg:hidden" style="${ssrRenderStyle(vueExports.unref(isOpen) ? null : { display: "none" })}"><!--[-->`);
			ssrRenderList(__props.navItems, (item) => {
				_push(`<!--[-->`);
				if (item.children) _push(ssrRenderComponent(_component_NavigationDropdown, {
					label: item.label,
					href: item.href,
					items: item.children
				}, null, _parent));
				else _push(ssrRenderComponent(_component_NuxtLink, {
					to: item.href,
					class: ["block border-b border-line py-3 text-[15px] font-medium transition-colors", isActive(item) ? "text-ink" : "text-ink/60 hover:text-ink"],
					onClick: ($event) => isOpen.value = false
				}, {
					default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(item.label)}`);
						else return [vueExports.createTextVNode(vueExports.toDisplayString(item.label), 1)];
					}),
					_: 2
				}, _parent));
				_push(`<!--]-->`);
			});
			_push(`<!--]-->`);
			_push(ssrRenderComponent(_component_Button, {
				href: __props.ctaHref,
				variant: "solid",
				external: "",
				class: "mt-5 w-full",
				onClick: ($event) => isOpen.value = false
			}, {
				default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(__props.ctaLabel)}`);
					else return [vueExports.createTextVNode(vueExports.toDisplayString(__props.ctaLabel), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></nav>`);
		};
	}
});
//#endregion
//#region components/layout/AppNavbar.vue
var _sfc_setup$3 = AppNavbar_vue_vue_type_script_setup_true_lang_default.setup;
AppNavbar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppNavbar.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var AppNavbar_default = Object.assign(AppNavbar_vue_vue_type_script_setup_true_lang_default, { __name: "AppNavbar" });
//#endregion
//#region components/brand/BrandMark.vue?vue&type=script&setup=true&lang.ts
var BrandMark_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "BrandMark",
	__ssrInlineRender: true,
	props: { size: { default: 64 } },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(vueExports.mergeProps({
				class: "grid place-items-center rounded-[22%] bg-[#26282c] shadow-2xl shadow-black/40 ring-1 ring-white/25",
				style: {
					width: `${__props.size}px`,
					height: `${__props.size}px`
				},
				"aria-label": "BBS Conveyor",
				role: "img"
			}, _attrs))}><svg viewBox="0 0 24 24" class="h-[52%] w-[52%]" fill="none" aria-hidden="true"><rect x="2.5" y="8" width="19" height="8" rx="4" stroke="#fff" stroke-width="1.6"></rect><rect x="2.5" y="8" width="19" height="8" rx="4" stroke="rgb(228 87 27)" stroke-width="1.6" stroke-dasharray="2 5.85" opacity="0.9" class="animate-belt-travel motion-reduce:animate-none"></rect><circle cx="7.5" cy="12" r="1.6" fill="rgb(228 87 27)"></circle><circle cx="16.5" cy="12" r="1.6" fill="rgb(228 87 27)"></circle><path d="M10.6 12h2.8" stroke="#fff" stroke-width="1.3" stroke-linecap="round"></path></svg></div>`);
		};
	}
});
//#endregion
//#region components/brand/BrandMark.vue
var _sfc_setup$2 = BrandMark_vue_vue_type_script_setup_true_lang_default.setup;
BrandMark_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/brand/BrandMark.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var BrandMark_default = Object.assign(BrandMark_vue_vue_type_script_setup_true_lang_default, { __name: "BrandMark" });
//#endregion
//#region components/layout/AppFooter.vue?vue&type=script&setup=true&lang.ts
var AppFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "AppFooter",
	__ssrInlineRender: true,
	props: { footerColumns: {} },
	setup(__props) {
		const year = (/* @__PURE__ */ new Date()).getFullYear();
		const socials = [
			{
				label: "WhatsApp",
				href: "https://wa.me/6281234567890",
				icon: "wa"
			},
			{
				label: "Email",
				href: "mailto:info@bbsconveyor.com",
				icon: "mail"
			},
			{
				label: "Lokasi",
				href: "/kontak",
				icon: "pin"
			}
		];
		const NuxtLink$1 = NuxtLink;
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BrandMark = BrandMark_default;
			_push(`<footer${ssrRenderAttrs(vueExports.mergeProps({ class: "bg-steel text-white" }, _attrs))}><div class="frame frame-dark border-y-0"><div class="relative border-b border-white/10 p-3 md:p-4"><div class="relative isolate grid h-36 place-items-center overflow-hidden rounded-lg bg-steel-soft md:h-44"><div class="blueprint-grid-steel absolute inset-0" aria-hidden="true"></div><div class="hazard-stripe absolute inset-x-0 bottom-0 h-1 opacity-70" aria-hidden="true"></div>`);
			_push(ssrRenderComponent(_component_BrandMark, { size: 60 }, null, _parent));
			_push(`</div></div><div class="grid grid-cols-2 gap-x-8 gap-y-12 px-6 py-14 md:grid-cols-4 md:px-10 md:py-16"><!--[-->`);
			ssrRenderList(__props.footerColumns, (col) => {
				_push(`<div><p class="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">${ssrInterpolate(col.title)}</p><ul class="space-y-3.5"><!--[-->`);
				ssrRenderList(col.links, (link) => {
					_push(`<li>`);
					if (!link.href.startsWith("http")) _push(ssrRenderComponent(vueExports.unref(NuxtLink$1), {
						to: link.href,
						class: "text-sm font-medium text-white/75 transition-colors hover:text-white"
					}, {
						default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(link.label)}`);
							else return [vueExports.createTextVNode(vueExports.toDisplayString(link.label), 1)];
						}),
						_: 2
					}, _parent));
					else _push(`<a${ssrRenderAttr("href", link.href)} target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-white/75 transition-colors hover:text-white">${ssrInterpolate(link.label)}</a>`);
					_push(`</li>`);
				});
				_push(`<!--]--></ul></div>`);
			});
			_push(`<!--]--><div><p class="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Sosial</p><ul class="space-y-3.5"><!--[-->`);
			ssrRenderList(socials, (s) => {
				_push(`<li>`);
				ssrRenderVNode(_push, vueExports.createVNode(vueExports.resolveDynamicComponent(s.href.startsWith("/") ? vueExports.unref(NuxtLink$1) : "a"), {
					to: s.href.startsWith("/") ? s.href : void 0,
					href: s.href.startsWith("/") ? void 0 : s.href,
					target: s.href.startsWith("http") ? "_blank" : void 0,
					rel: s.href.startsWith("http") ? "noopener noreferrer" : void 0,
					class: "flex items-center gap-2.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
				}, {
					default: vueExports.withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							if (s.icon === "wa") _push(`<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"${_scopeId}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"${_scopeId}></path></svg>`);
							else if (s.icon === "mail") _push(`<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"${_scopeId}><rect x="3" y="5" width="18" height="14" rx="2.5"${_scopeId}></rect><path d="M3.5 7l8.5 6 8.5-6"${_scopeId}></path></svg>`);
							else _push(`<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"${_scopeId}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"${_scopeId}></path><circle cx="12" cy="10" r="3"${_scopeId}></circle></svg>`);
							_push(` ${ssrInterpolate(s.label)}`);
						} else return [s.icon === "wa" ? (vueExports.openBlock(), vueExports.createBlock("svg", {
							key: 0,
							class: "h-4 w-4",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							"aria-hidden": "true"
						}, [vueExports.createVNode("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })])) : s.icon === "mail" ? (vueExports.openBlock(), vueExports.createBlock("svg", {
							key: 1,
							class: "h-4 w-4",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "1.7",
							"aria-hidden": "true"
						}, [vueExports.createVNode("rect", {
							x: "3",
							y: "5",
							width: "18",
							height: "14",
							rx: "2.5"
						}), vueExports.createVNode("path", { d: "M3.5 7l8.5 6 8.5-6" })])) : (vueExports.openBlock(), vueExports.createBlock("svg", {
							key: 2,
							class: "h-4 w-4",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "1.7",
							"aria-hidden": "true"
						}, [vueExports.createVNode("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }), vueExports.createVNode("circle", {
							cx: "12",
							cy: "10",
							r: "3"
						})])), vueExports.createTextVNode(" " + vueExports.toDisplayString(s.label), 1)];
					}),
					_: 2
				}), _parent);
				_push(`</li>`);
			});
			_push(`<!--]--></ul></div></div><div class="flex flex-col gap-2 border-t border-white/10 px-6 py-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between md:px-10"><span>© ${ssrInterpolate(vueExports.unref(year))} CV Bintang Berjaya Satu. All Rights Reserved.</span><span class="font-semibold uppercase tracking-[0.14em]">BBS · Jakarta Timur, Indonesia</span></div></div></footer>`);
		};
	}
});
//#endregion
//#region components/layout/AppFooter.vue
var _sfc_setup$1 = AppFooter_vue_vue_type_script_setup_true_lang_default.setup;
AppFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppFooter.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var AppFooter_default = Object.assign(AppFooter_vue_vue_type_script_setup_true_lang_default, { __name: "AppFooter" });
//#endregion
//#region layouts/default.vue?vue&type=script&setup=true&lang.ts
var default_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ vueExports.defineComponent({
	__name: "default",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { data: navData } = ([__temp, __restore] = vueExports.withAsyncContext(() => useAsyncData("site-navigation", () => queryCollection("navigation").first())), __temp = await __temp, __restore(), __temp);
		const headerNav = vueExports.computed(() => navData.value?.header ?? []);
		const cta = vueExports.computed(() => navData.value?.cta ?? {
			label: "Hubungi Kami",
			href: "#"
		});
		const footerCols = vueExports.computed(() => navData.value?.footer ?? []);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AnnouncementBar = AnnouncementBar_default;
			const _component_AppNavbar = AppNavbar_default;
			const _component_AppFooter = AppFooter_default;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_AnnouncementBar, null, null, _parent));
			_push(ssrRenderComponent(_component_AppNavbar, {
				"nav-items": vueExports.unref(headerNav),
				"cta-label": vueExports.unref(cta).label,
				"cta-href": vueExports.unref(cta).href
			}, null, _parent));
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(ssrRenderComponent(_component_AppFooter, { "footer-columns": vueExports.unref(footerCols) }, null, _parent));
			_push(`<!--]-->`);
		};
	}
});
//#endregion
//#region layouts/default.vue
var _sfc_setup = default_vue_vue_type_script_setup_true_lang_default.setup;
default_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = vueExports.useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = default_vue_vue_type_script_setup_true_lang_default;

export { default_default as default };
//# sourceMappingURL=default-DLEjM8l-.mjs.map
