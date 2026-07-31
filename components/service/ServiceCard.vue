<script setup lang="ts">
const props = defineProps<{
  slug: string
  title: string
  description?: string | null
  image?: string | null
}>()

const themeIndex = computed(() => {
  let h = 3
  for (const ch of props.slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
})
</script>

<template>
  <NuxtLink :to="`/jasa/${slug}`" class="card-shell h-full">
    <div class="p-2 pb-0">
      <ImageOrSkeleton :src="image" :alt="title" aspect="aspect-[4/3]" rounded="rounded-none" :fallback-index="themeIndex" />
    </div>
    <div class="p-4">
      <p class="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
        <span class="h-2.5 w-2.5 shrink-0 border-l-2 border-t-2 border-accent" aria-hidden="true" />
        Jasa
      </p>
      <h3 class="card-title mt-2.5 text-[15px] font-semibold leading-snug text-ink line-clamp-2">
        {{ title }}
      </h3>
      <p v-if="description" class="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{{ description }}</p>
    </div>
  </NuxtLink>
</template>
