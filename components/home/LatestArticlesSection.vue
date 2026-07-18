<script setup lang="ts">
const { getLatest } = useArticles()

const latest = computed(() => getLatest().slice(0, 3))
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="mx-auto max-w-6xl px-4">
      <span class="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
        Artikel Terbaru
      </span>

      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCard
          v-for="article in latest"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </section>
</template>
