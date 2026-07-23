<script setup lang="ts">
const props = defineProps<{
  slug: string
  title: string
  category: string
  description?: string | null
  image?: string | null
}>()

const themeIndex = computed(() => {
  let h = 0
  for (const ch of props.slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
})
</script>

<template>
  <NuxtLink
    :to="`/produk/${slug}`"
    class="group block overflow-hidden rounded-xl border border-line bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-md hover:shadow-ink/5"
  >
    <div class="p-2 pb-0">
      <GradientPanel :index="themeIndex" rounded="rounded-lg" class="aspect-[4/3]" />
    </div>
    <div class="p-4">
      <p class="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
        <span class="h-2.5 w-2.5 shrink-0 border-l-2 border-t-2 border-accent" aria-hidden="true" />
        {{ category }}
      </p>
      <h3 class="mt-2.5 text-[15px] font-semibold leading-snug text-ink transition-colors line-clamp-2 group-hover:text-accent">
        {{ title }}
      </h3>
      <p v-if="description" class="mt-2 text-sm leading-relaxed text-muted line-clamp-2">{{ description }}</p>
      <span class="mt-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/45 transition-colors group-hover:text-accent">
        Lihat datasheet
        <svg class="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
    </div>
  </NuxtLink>
</template>
