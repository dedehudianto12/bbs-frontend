<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: allArticles } = await useAsyncData(`artikel-${slug}`, () =>
  queryCollection('blog').all()
)

const article = computed(() =>
  (Array.isArray(allArticles.value) ? allArticles.value : []).find((a: any) => a.slug === slug)
)

useSeoMeta({
  title: article.value ? `${(article.value as any).title} — BBS Conveyor` : 'Artikel Tidak Ditemukan — BBS Conveyor',
  description: (article.value as any)?.excerpt ?? ''
})
</script>

<template>
  <article v-if="article" class="max-w-3xl mx-auto px-4 py-12">
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/artikel" class="text-sm text-gold-dark hover:text-gold transition-colors">
        &larr; Kembali ke Artikel
      </NuxtLink>
      <span v-if="article.tags?.[0]" class="text-xs text-gold-dark font-medium uppercase tracking-wide">{{ article.tags[0] }}</span>
    </div>

    <h1 class="text-3xl font-bold text-ink mb-2">{{ article.title }}</h1>

    <div class="flex items-center gap-3 text-sm text-neutral mb-8">
      <span>{{ article.author }}</span>
      <span>&middot;</span>
      <time :datetime="article.publishedAt">{{ new Date(article.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>
    </div>

    <div class="prose prose-neutral max-w-none">
      <ContentRenderer :value="article" />
    </div>
  </article>

  <div v-else class="max-w-6xl mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-bold text-ink mb-4">Artikel Tidak Ditemukan</h1>
    <NuxtLink to="/artikel" class="text-gold-dark hover:text-gold font-medium transition-colors">
      &larr; Kembali ke Artikel
    </NuxtLink>
  </div>
</template>
