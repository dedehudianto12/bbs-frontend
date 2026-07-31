<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { get } = useApi()

const { data: articleRes, error: articleErr } = await useAsyncData(`artikel-${slug}`, () =>
  get<any[]>(`/artikel/${slug}`)
)

const article = computed(() => articleRes.value?.data ?? null)

// Related articles — same tag, exclude current
const { data: allArticleRes } = await useAsyncData('artikel-related', () =>
  get<any[]>('/artikel')
)

const relatedArticles = computed(() => {
  if (!article.value) return []
  const articleTag = (article.value as any).tag ?? ''
  return (allArticleRes.value?.data ?? [])
    .filter((a: any) => a.slug !== slug && a.tag === articleTag)
    .slice(0, 3)
    .map((a: any) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      tag: a.tag ?? '',
      image: a.image ?? null,
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
  <div v-if="articleErr" class="container-tech py-24 md:py-32 text-center">
    <h1 class="display text-3xl text-ink md:text-4xl">Gagal Memuat</h1>
    <p class="mt-4 text-muted">Tidak dapat menghubungi server. Periksa koneksi Anda.</p>
    <div class="mt-8 flex justify-center">
      <UiButton @click="refreshNuxtData(`artikel-${slug}`)">Coba Lagi</UiButton>
    </div>
  </div>

  <article v-else-if="article" class="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
    <Breadcrumb
      class="mb-8"
      :items="[
        { label: 'Beranda', href: '/' },
        { label: 'Artikel', href: '/artikel' },
        { label: article.title },
      ]"
    />

    <div v-if="article.tag" class="mb-5">
      <span class="inline-block rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent">
        {{ article.tag }}
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

    <div class="prose-tech mt-10 max-w-none" v-html="article.content" />

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
    <p class="mt-4 text-muted">Artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
    <div class="mt-8 flex justify-center">
      <UiButton href="/artikel" variant="ghost">Kembali ke Artikel <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></UiButton>
    </div>
  </div>
</template>
