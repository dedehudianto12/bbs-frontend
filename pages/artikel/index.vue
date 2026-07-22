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
    _tags: a.tags ?? [],
  }))
)

const filteredArticles = computed(() => {
  if (!tag.value) return articleList.value
  return articleList.value.filter((a) => a._tags.includes(tag.value))
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
  <div class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-ink mb-2">Artikel</h1>
    <p class="text-neutral mb-8">Tips, panduan, dan informasi seputar belt conveyor dan komponen industri.</p>

    <div v-if="allTags.length" class="flex flex-wrap gap-2 mb-8">
      <button
        class="px-4 py-2 rounded text-sm font-medium transition-colors"
        :class="tag === '' ? 'bg-gold text-ink' : 'bg-bg-soft text-neutral hover:bg-border'"
        @click="tag = ''"
      >
        Semua
      </button>
      <button
        v-for="t in allTags"
        :key="t"
        class="px-4 py-2 rounded text-sm font-medium transition-colors"
        :class="tag === t ? 'bg-gold text-ink' : 'bg-bg-soft text-neutral hover:bg-border'"
        @click="tag = t"
      >
        {{ t }}
      </button>
    </div>

    <ArticleGrid :articles="filteredArticles" />
  </div>
</template>
