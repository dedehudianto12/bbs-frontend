<script setup lang="ts">
defineProps<{
  slug: string
  title: string
  category: string
  description?: string | null
  image?: string | null
}>()
</script>

<template>
  <NuxtLink
    :to="`/produk/${slug}`"
    class="group block bg-white border border-border rounded-xl overflow-hidden hover:shadow-sm hover:border-gold/30 transition-all duration-200"
  >
    <div class="aspect-[4/3] bg-bg-soft flex items-center justify-center overflow-hidden">
      <div class="text-center text-neutral/30">
        <svg class="w-10 h-10 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
    </div>
    <div class="p-5">
      <span class="text-xs font-medium text-gold-dark bg-gold/10 px-2 py-0.5 rounded-full">{{ category }}</span>
      <h3 class="mt-2 font-semibold text-ink group-hover:text-gold-dark transition-colors line-clamp-2 leading-snug">
        {{ title }}
      </h3>
      <p v-if="description" class="mt-2 text-sm text-neutral line-clamp-2">{{ description }}</p>
    </div>
  </NuxtLink>
</template>
