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
    <!-- #4 — cards fade up with a short stagger when the grid (re)mounts -->
    <div
      v-for="(article, i) in articles"
      :key="article.slug"
      class="animate-fade-up-fast motion-reduce:animate-none"
      :style="{ animationDelay: `${Math.min(i, 8) * 40}ms` }"
    >
      <ArticleCard v-bind="article" />
    </div>
  </div>
  <p v-else class="rounded-2xl border border-dashed border-line py-16 text-center text-sm text-muted">Belum ada artikel.</p>
</template>
