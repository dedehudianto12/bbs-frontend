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
  <section class="py-16 md:py-24">
    <div class="mx-auto max-w-6xl px-4">
      <SectionTitle
        eyebrow="Artikel Terbaru"
        title="Tips & Informasi Seputar Conveyor"
        description="Pelajari cara merawat dan mengoptimalkan sistem conveyor Anda."
      />

      <div class="mt-12">
        <ArticleGrid :articles="articles" />
      </div>
    </div>
  </section>
</template>
