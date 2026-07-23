<script setup lang="ts">
defineProps<{
  articles: {
    slug: string
    title: string
    excerpt?: string | null
    tag: string
    image?: string | null
    publishedAt?: string
    author?: string
  }[]
}>()
</script>

<template>
  <div v-if="articles.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <ArticleCard v-for="article in articles" :key="article.slug" v-bind="article" />
  </div>
  <p v-else class="text-neutral text-center py-12">Belum ada artikel.</p>
</template>
