<script setup lang="ts">
defineProps<{
  slug: string
  title: string
  excerpt?: string | null
  tag: string
  image?: string | null
  publishedAt?: string
  author?: string
}>()
</script>

<template>
  <NuxtLink :to="`/artikel/${slug}`" class="group block bg-white border border-border rounded-xl overflow-hidden hover:shadow-sm hover:border-gold/30 transition-all duration-200">
    <div class="aspect-[16/9] bg-bg-soft flex items-center justify-center text-neutral text-sm">
      <!-- ponytail: placeholder until real images wired up -->
      <svg class="w-10 h-10 text-neutral/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
    </div>
    <div class="p-5">
      <div v-if="tag" class="flex items-center gap-2 mb-2">
        <span class="text-xs font-medium text-gold-dark bg-gold/10 px-2 py-0.5 rounded-full">{{ tag }}</span>
      </div>
      <h3 class="font-semibold text-ink group-hover:text-gold-dark transition-colors line-clamp-2 leading-snug">{{ title }}</h3>
      <p v-if="excerpt" class="mt-2 text-sm text-neutral line-clamp-2">{{ excerpt }}</p>
      <div v-if="publishedAt" class="mt-3 flex items-center gap-2 text-xs text-neutral/60">
        <span v-if="author">{{ author }}</span>
        <span v-if="author && publishedAt">&middot;</span>
        <time v-if="publishedAt" :datetime="publishedAt">{{ new Date(publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </div>
    </div>
  </NuxtLink>
</template>
