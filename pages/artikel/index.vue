<script setup lang="ts">
const { get } = useApi()
const tag = ref('')

const { data: articleRes } = await useAsyncData('artikel-listing', () =>
  get<any[]>('/artikel')
)

const articles = computed(() => articleRes.value?.data ?? [])

const articleList = computed(() =>
  [...articles.value]
    .sort((a: any, b: any) => b.publishedAt.localeCompare(a.publishedAt))
    .map((a: any) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      tag: a.tag ?? '',
      image: a.image ?? null,
      publishedAt: a.publishedAt,
      author: a.author ?? '',
      _tags: (a.tag ?? '').split(',').map((t: string) => t.trim()).filter(Boolean),
    }))
)

const featuredArticle = computed(() => articleList.value[0] ?? null)

const filteredArticles = computed(() => {
  const list = tag.value
    ? articleList.value.filter((a) => a._tags.includes(tag.value))
    : articleList.value
  if (!tag.value && featuredArticle.value) {
    return list.slice(1)
  }
  return list
})

const allTags = computed(() => {
  const tags = articleList.value.flatMap((a) => a._tags)
  return [...new Set(tags)]
})

useSeoMeta({
  title: 'Artikel — BBS Conveyor',
  description: 'Tips, panduan, dan informasi seputar belt conveyor, roller, dan komponen industri dari BBS Conveyor.'
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Blog"
      title="Artikel"
      description="Tips, panduan, dan informasi seputar belt conveyor dan komponen industri."
    />

    <div class="container-tech py-16 md:py-24">
      <!-- Featured Article -->
      <div v-if="featuredArticle && !tag" class="mb-16">
        <p class="eyebrow mb-5 text-accent">
          <span class="inline-block h-1 w-1 rounded-full bg-accent" />
          Artikel Unggulan
        </p>
        <ArticleCard v-bind="featuredArticle" />
      </div>

      <!-- Tag filter -->
      <div v-if="allTags.length" class="mb-10 flex flex-wrap gap-2">
        <button
          class="rounded-md border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors"
          :class="tag === '' ? 'border-accent bg-accent text-white' : 'border-line bg-white text-muted hover:border-ink/30 hover:text-ink'"
          @click="tag = ''"
        >
          Semua
        </button>
        <button
          v-for="t in allTags"
          :key="t"
          class="rounded-md border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors"
          :class="tag === t ? 'border-accent bg-accent text-white' : 'border-line bg-white text-muted hover:border-ink/30 hover:text-ink'"
          @click="tag = t"
        >
          {{ t }}
        </button>
      </div>

      <ArticleGrid :articles="filteredArticles" />
    </div>

    <CTASection
      headline="Butuh Konsultasi Conveyor?"
      description="Tim engineer kami siap membantu Anda menemukan solusi terbaik."
      button-text="Hubungi Kami"
      button-link="/kontak"
    />
  </div>
</template>
