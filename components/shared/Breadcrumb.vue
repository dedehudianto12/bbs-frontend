<script setup lang="ts">
import { internalPath } from '~/utils/url'

const props = withDefaults(defineProps<{
  items: { label: string; href?: string }[]
  invert?: boolean
}>(), {
  invert: false,
})

// BreadcrumbList is emitted from here rather than from each page that renders
// a trail. The component already receives exactly the data the schema needs,
// so emitting it here makes the visible trail and the machine-readable one
// literally the same array — they cannot drift the way two hand-maintained
// copies would. Every existing call site gained valid markup with no change.
//
// itemListElement is a computed, not a snapshot: produk/[slug].vue builds its
// items from a computed that is [] until useAsyncData resolves, so reading the
// array once at setup would emit an empty BreadcrumbList. Unhead unwraps refs,
// which also keeps it correct across client-side navigation.
//
// The origin is read once, here, in setup. `withSiteUrl` is the ergonomic
// helper for this but it calls useSiteConfig() internally, and the computed
// below is evaluated lazily by unhead *after* setup has returned — outside the
// Nuxt instance, where that throws NUXT_E1001. Capturing the plain string at
// setup keeps the resolution pure, so it is safe whenever unhead reads it.
//
// Same origin the canonical tag is built from, and internalPath applies the
// same trailing slash the visible link gets, so a crumb's `item` and the
// canonical of the page it points at cannot disagree.
const site = useSiteConfig()
const origin = String(site.url ?? '').replace(/\/$/, '')

const absolute = (href: string) => `${origin}${internalPath(href)}`

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: computed(() =>
      props.items.map((item) => ({
        name: item.label,
        // The final crumb is the current page and carries no href. Omitting
        // `item` for it is the form Google documents — don't synthesise the
        // current path to fill the gap.
        ...(item.href ? { item: absolute(item.href) } : {}),
      })),
    ),
  }),
])
</script>

<template>
  <nav
    aria-label="Breadcrumb"
    class="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em]"
    :class="invert ? 'text-white/45' : 'text-muted'"
  >
    <template v-for="(item, i) in items" :key="item.label">
      <span v-if="i > 0" class="shrink-0" :class="invert ? 'text-white/25' : 'text-muted/40'">/</span>
      <NuxtLink
        v-if="item.href"
        :to="internalPath(item.href)"
        class="transition-colors"
        :class="invert ? 'hover:text-white' : 'hover:text-ink'"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else :class="invert ? 'text-white' : 'text-ink'">{{ item.label }}</span>
    </template>
  </nav>
</template>
