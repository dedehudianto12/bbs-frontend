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
  <NuxtLink :to="`/produk/${slug}`" class="card-shell h-full">
    <div class="p-2 pb-0">
      <ImageOrSkeleton :src="image" :alt="title" aspect="aspect-[4/3]" fit="object-contain" rounded="rounded-none" :fallback-index="themeIndex" />
    </div>
    <div class="flex flex-col flex-1 p-4">
      <p class="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
        <span class="h-2.5 w-2.5 shrink-0 border-l-2 border-t-2 border-accent" aria-hidden="true" />
        {{ category }}
      </p>
      <h3 class="card-title mt-2.5 text-[15px] font-semibold leading-snug text-ink line-clamp-2">
        {{ title }}
      </h3>
      <p v-if="description" class="mt-2 text-sm leading-relaxed text-muted line-clamp-2">{{ description }}</p>
      <span class="card-meta mt-auto flex items-center gap-1.5 pt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/45">
        Lihat datasheet
        <svg class="card-arrow h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
    </div>
  </NuxtLink>
</template>
