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
  <NuxtLink :to="`/produk/${slug}`" class="group block bg-white border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
    <div class="aspect-[4/3] bg-bg-soft flex items-center justify-center text-neutral text-sm">
      {{ title }}
    </div>
    <div class="p-4">
      <span class="text-xs text-gold-dark font-medium uppercase tracking-wide">{{ category }}</span>
      <h3 class="mt-1 font-semibold text-ink group-hover:text-gold-dark transition-colors line-clamp-2">{{ title }}</h3>
      <p v-if="description" class="mt-2 text-sm text-neutral line-clamp-2">{{ description }}</p>
    </div>
  </NuxtLink>
</template>
