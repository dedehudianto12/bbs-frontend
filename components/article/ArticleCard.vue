<script setup lang="ts">
defineProps<{
  slug: string
  title: string
  excerpt?: string | null
  tag: string
}>()
</script>

<template>
  <NuxtLink :to="`/artikel/${slug}`" class="group block">
    <div class="aspect-video bg-bg-soft rounded-lg" />
    <span class="mt-3 inline-block text-gold text-xs font-medium tracking-wide uppercase">
      {{ tag }}
    </span>
    <p v-if="excerpt" class="mt-2 text-sm text-neutral line-clamp-2">{{ excerpt }}</p>
    <h3 class="mt-1 text-ink font-medium leading-snug line-clamp-2">
      {{ title }}
    </h3>
  </NuxtLink>
</template>
