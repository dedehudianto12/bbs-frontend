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

// deterministic gradient theme per article
const themeIndex = computed(() => {
  let h = 0
  for (const ch of props.slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
})
</script>

<template>
  <NuxtLink
    :to="`/artikel/${slug}`"
    class="group block overflow-hidden rounded-xl border border-line bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-md hover:shadow-ink/5"
  >
    <div class="p-2 pb-0">
      <GradientPanel :index="themeIndex" rounded="rounded-lg" class="aspect-[16/9]" />
    </div>
    <div class="p-4">
      <p class="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
        <span class="h-2.5 w-2.5 shrink-0 border-l-2 border-t-2 border-accent" aria-hidden="true" />
        {{ tag || 'Artikel' }}
      </p>
      <h3 class="mt-2.5 text-[15px] font-semibold leading-snug text-ink transition-colors line-clamp-2 group-hover:text-accent">
        {{ title }}
      </h3>
      <div v-if="publishedAt" class="mt-3 text-[10.5px] font-medium uppercase tracking-[0.1em] tabular-nums text-muted/70">
        <time :datetime="publishedAt">{{ new Date(publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </div>
    </div>
  </NuxtLink>
</template>
