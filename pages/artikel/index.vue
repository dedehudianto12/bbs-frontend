<script setup lang="ts">
const tag = ref('')

const { data: allArticles } = await useAsyncData('artikel-listing', () =>
  queryCollection('blog').all()
)

const articleList = computed(() =>
  (Array.isArray(allArticles.value)
    ? [...allArticles.value].sort((a: any, b: any) => b.publishedAt.localeCompare(a.publishedAt))
    : []
  ).map((a: any) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    tag: a.tags?.[0] ?? '',
    image: a.thumbnail ?? null,
    publishedAt: a.publishedAt,
    author: a.author ?? '',
    _tags: a.tags ?? [],
  }))
)

const featuredArticle = computed(() => articleList.value[0] ?? null)

const filteredArticles = computed(() => {
  const list = tag.value
    ? articleList.value.filter((a) => a._tags.includes(tag.value))
    : articleList.value
  // Remove featured from grid if showing all
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
    <!-- Hero -->
    <section class="bg-bg-soft py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-5xl font-bold text-ink tracking-tight">Artikel</h1>
        <p class="mt-4 text-neutral text-lg">Tips, panduan, dan informasi seputar belt conveyor dan komponen industri.</p>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-4 py-12">
      <!-- Featured Article -->
      <div v-if="featuredArticle && !tag" class="mb-16">
        <span class="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Artikel Unggulan</span>
        <ArticleCard v-bind="featuredArticle" />
      </div>

      <!-- Tag filter -->
      <div v-if="allTags.length" class="flex flex-wrap gap-2 mb-10">
        <button
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="tag === '' ? 'bg-ink text-white' : 'bg-bg-soft text-neutral hover:bg-border'"
          @click="tag = ''"
        >
          Semua
        </button>
        <button
          v-for="t in allTags"
          :key="t"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="tag === t ? 'bg-ink text-white' : 'bg-bg-soft text-neutral hover:bg-border'"
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
