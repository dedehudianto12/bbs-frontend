<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { getBySlug } = useArticles()
const article = getBySlug(slug)

useSeoMeta({
  title: article ? `${article.title} — BBS Conveyor` : 'Artikel Tidak Ditemukan — BBS Conveyor',
  description: article?.excerpt ?? ''
})
</script>

<template>
  <article v-if="article" class="max-w-3xl mx-auto px-4 py-12">
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/artikel" class="text-sm text-gold-dark hover:text-gold transition-colors">
        ← Kembali ke Artikel
      </NuxtLink>
      <span class="text-xs text-gold-dark font-medium uppercase tracking-wide">{{ article.tag }}</span>
    </div>

    <h1 class="text-3xl font-bold text-ink mb-2">{{ article.title }}</h1>

    <div class="flex items-center gap-3 text-sm text-neutral mb-8">
      <span>{{ article.author }}</span>
      <span>·</span>
      <time :datetime="article.publishedAt">{{ new Date(article.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>
    </div>

    <div class="aspect-video bg-bg-soft rounded-lg flex items-center justify-center text-neutral text-sm mb-8">
      {{ article.title }}
    </div>

    <div class="prose prose-neutral max-w-none" v-html="article.content" />
  </article>

  <div v-else class="max-w-6xl mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-bold text-ink mb-4">Artikel Tidak Ditemukan</h1>
    <p class="text-neutral mb-8">Artikel yang Anda cari tidak tersedia.</p>
    <NuxtLink to="/artikel" class="text-gold-dark hover:text-gold font-medium transition-colors">
      ← Kembali ke Artikel
    </NuxtLink>
  </div>
</template>
