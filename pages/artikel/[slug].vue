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
  <article v-if="article" class="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
    <Breadcrumb
      class="mb-8"
      :items="[
        { label: 'Beranda', href: '/' },
        { label: 'Artikel', href: '/artikel' },
        { label: article.title },
      ]"
    />

    <div v-if="article.tags?.[0]" class="mb-5">
      <span class="inline-block rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent">
        {{ article.tags[0] }}
      </span>
    </div>

    <h1 class="display text-4xl text-ink md:text-5xl">{{ article.title }}</h1>

    <div class="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
      <span>{{ article.author }}</span>
      <span class="text-muted/40">/</span>
      <time :datetime="article.publishedAt">
        {{ new Date(article.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}
      </time>
    </div>

    <div class="prose-tech mt-10 max-w-none">
      <ContentRenderer :value="article" />
    </div>

    <!-- Related articles -->
    <div v-if="relatedArticles.length" class="mt-20 border-t border-line pt-12">
      <h2 class="display text-2xl text-ink md:text-3xl">Artikel Terkait</h2>
      <div class="mt-8">
        <ArticleGrid :articles="relatedArticles" />
      </div>
    </div>
  </article>

  <div v-else class="container-tech py-24 md:py-32 text-center">
    <h1 class="display text-3xl text-ink md:text-4xl">Artikel Tidak Ditemukan</h1>
    <div class="mt-8 flex justify-center">
      <Button to="/artikel" variant="ghost" arrow>Kembali ke Artikel</Button>
    </div>
  </div>
</template>
