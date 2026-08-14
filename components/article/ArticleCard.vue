<script setup lang="ts">
const props = defineProps<{
  slug: string
  title: string
  excerpt?: string | null
  tag: string
  image?: string | null
  publishedAt?: string
  author?: string
}>()

const themeIndex = computed(() => {
  let h = 0
  for (const ch of props.slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
})
</script>

<template>
  <NuxtLink :to="`/artikel/${slug}/`" class="card-shell h-full">
    <div class="p-2 pb-0">
      <ImageOrSkeleton :src="image" :alt="title" aspect="aspect-[16/9]" rounded="rounded-none" :fallback-index="themeIndex" />
    </div>
    <div class="p-4">
      <p class="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
        <span class="h-2.5 w-2.5 shrink-0 border-l-2 border-t-2 border-accent" aria-hidden="true" />
        {{ tag || 'Artikel' }}
      </p>
      <h3 class="card-title mt-2.5 text-[15px] font-semibold leading-snug text-ink line-clamp-2">
        {{ title }}
      </h3>
      <div v-if="publishedAt" class="num mt-3 text-[10.5px] font-medium uppercase tracking-[0.1em] text-muted/70">
        <time :datetime="publishedAt">{{ new Date(publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </div>
    </div>
  </NuxtLink>
</template>
