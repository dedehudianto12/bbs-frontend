<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: allArticles } = await useAsyncData(`artikel-${slug}`, () =>
  queryCollection('blog').all()
)

const article = computed(() =>
  (Array.isArray(allArticles.value) ? allArticles.value : []).find((a: any) => a.slug === slug)
)

// Related articles — same tags, exclude current
const relatedArticles = computed(() => {
  if (!article.value) return []
  const tags = (article.value as any).tags ?? []
  return (Array.isArray(allArticles.value) ? allArticles.value : [])
    .filter((a: any) => a.slug !== slug && a.tags?.some((t: string) => tags.includes(t)))
    .slice(0, 3)
    .map((a: any) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      tag: a.tags?.[0] ?? '',
      publishedAt: a.publishedAt,
      author: a.author ?? '',
    }))
})

useSeoMeta({
  title: article.value ? `${(article.value as any).title} — BBS Conveyor` : 'Artikel Tidak Ditemukan — BBS Conveyor',
  description: (article.value as any)?.excerpt ?? ''
})
</script>

<template>
  <article v-if="article" class="max-w-3xl mx-auto px-4 py-12">
    <Breadcrumb
      :items="[
        { label: 'Beranda', href: '/' },
        { label: 'Artikel', href: '/artikel' },
        { label: article.title },
      ]"
    />

    <div class="flex flex-wrap items-center gap-3 mb-4">
      <span v-if="article.tags?.[0]" class="text-xs font-medium text-gold-dark bg-gold/10 px-2.5 py-1 rounded-full">
        {{ article.tags[0] }}
      </span>
    </div>

    <h1 class="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">{{ article.title }}</h1>

    <div class="flex items-center gap-3 text-sm text-neutral mb-10">
      <span>{{ article.author }}</span>
      <span>&middot;</span>
      <time :datetime="article.publishedAt">
        {{ new Date(article.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}
      </time>
    </div>

    <div class="prose prose-neutral max-w-none">
      <ContentRenderer :value="article" />
    </div>

    <!-- Related articles -->
    <div v-if="relatedArticles.length" class="mt-20 border-t border-border pt-12">
      <h2 class="text-xl font-bold text-ink mb-6">Artikel Terkait</h2>
      <ArticleGrid :articles="relatedArticles" />
    </div>
  </article>

  <div v-else class="max-w-6xl mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-bold text-ink mb-4">Artikel Tidak Ditemukan</h1>
    <Button to="/artikel" variant="outline">
      &larr; Kembali ke Artikel
    </Button>
  </div>
</template>
