<script setup lang="ts">
const tag = ref('')

const { getByTag, getTags, getLatest } = useArticles()
const tags = getTags()
const allArticles = getLatest()

const filteredArticles = computed(() => {
  if (!tag.value) return allArticles
  return getByTag(tag.value)
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

    <div v-if="tags.length" class="flex flex-wrap gap-2 mb-8">
      <button
        class="px-4 py-2 rounded text-sm font-medium transition-colors"
        :class="tag === '' ? 'bg-gold text-ink' : 'bg-bg-soft text-neutral hover:bg-border'"
        @click="tag = ''"
      >
        Semua
      </button>
      <button
        v-for="t in tags"
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
