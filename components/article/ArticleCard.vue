<script setup lang="ts">
import type { Article } from '~/types/article'

defineProps<{
  article: Article
}>()
</script>

<template>
  <NuxtLink :to="`/artikel/${article.slug}`" class="group block">
    <div class="aspect-video bg-bg-soft rounded-lg" />
    <span class="mt-3 inline-block text-gold text-xs font-medium tracking-wide uppercase">
      {{ article.tag }}
    </span>
    <h3 class="mt-1 text-ink font-medium leading-snug line-clamp-2">
      {{ article.title }}
    </h3>
  </NuxtLink>
</template>
