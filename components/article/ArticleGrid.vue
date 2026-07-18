<script setup lang="ts">
import type { Article } from '~/types/article'

defineProps<{ articles: Article[] }>()
</script>

<template>
  <div v-if="articles.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
  </div>
  <p v-else class="text-neutral text-center py-12">Belum ada artikel.</p>
</template>
