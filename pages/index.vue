<script setup lang="ts">
import { homepageConfig, whyChooseUsItems } from '~/data/homepage'

const { get } = useApi()

const hpData = homepageConfig

const heroProps = computed(() => ({
  headline: hpData.hero.headline,
  subheadline: hpData.hero.subheadline,
  primaryCTA: hpData.hero.primaryCTA,
  primaryLink: hpData.hero.primaryLink,
  secondaryCTA: hpData.hero.secondaryCTA,
  secondaryLink: hpData.hero.secondaryLink,
}))

const stats = computed(() => {
  const s = hpData.statistics
  return [
    { label: 'Tahun Pengalaman', value: `${s.years}+` },
    { label: 'Proyek Selesai', value: `${s.projects}+` },
    { label: 'Klien Aktif', value: `${s.clients}+` },
    { label: 'Tenaga Teknisi', value: `${s.engineers}+` },
  ]
})

const ctaProps = computed(() => ({
  headline: hpData.cta.headline,
  description: hpData.cta.description,
  buttonText: hpData.cta.buttonText,
  buttonLink: hpData.cta.buttonLink,
}))

const mission = computed(() => hpData.company.description)

// Product categories, industries, articles — from backend
const { data: productRes, error: productErr } = await useAsyncData('homepage-products', () =>
  get<any[]>('/produk')
)
const { data: industryRes, error: industryErr } = await useAsyncData('homepage-industries', () =>
  get<any[]>('/industri')
)
const { data: articleRes, error: articleErr } = await useAsyncData('homepage-articles', () =>
  get<any[]>('/artikel')
)

const products = computed(() => productRes.value?.data ?? [])
const industries = computed(() => industryRes.value?.data ?? [])
const allArticles = computed(() => articleRes.value?.data ?? [])

const hasApiError = computed(() => productErr.value || industryErr.value || articleErr.value)

// If SSR payload is empty (backend unreachable), show skeleton while client
// re-fetches. Set isLoading on server too so the SSR HTML already has skeleton
// instead of a brief error flash before hydration.
const emptyPayload = !productRes.value?.data?.length && !industryRes.value?.data?.length && !articleRes.value?.data?.length
const isLoading = ref(hasApiError.value && emptyPayload)

if (import.meta.client) {
  onMounted(async () => {
    if (!emptyPayload) return

    isLoading.value = true
    await Promise.allSettled([
      refreshNuxtData('homepage-products'),
      refreshNuxtData('homepage-industries'),
      refreshNuxtData('homepage-articles'),
    ])
    isLoading.value = false
  })
}

// Unique categories with group + product count, in first-seen order.
// Also picks up the first product's specs for the SpecCard.
const catItems = computed(() => {
  const map = new Map<string, { cat: string; group: string; count: number; specs: Record<string, string> }>()
  for (const p of products.value) {
    const existing = map.get(p.category)
    if (!existing) {
      let specs: Record<string, string> = {}
      try {
        const raw = p.specs
        const obj = typeof raw === 'string' ? JSON.parse(raw) : (raw ?? {})
        if (obj && typeof obj === 'object' && !Array.isArray(obj)) specs = obj
      } catch { /* keep empty */ }
      map.set(p.category, { cat: p.category, group: p.group, count: 1, specs })
    } else {
      existing.count++
    }
  }
  return [...map.values()]
})

const industryItems = computed(() =>
  industries.value.map((i: any) => ({
    name: i.name,
    description: i.description,
    slug: i.slug,
  }))
)

const latestArticles = computed(() =>
  [...allArticles.value]
    .sort((a: any, b: any) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 6)
    .map((a: any) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      tag: a.tag ?? '',
      image: a.image ?? null,
      publishedAt: a.publishedAt,
      author: a.author ?? '',
    }))
)

useSeoMeta({
  title: hpData.seo.title,
  description: hpData.seo.description,
  ogImage: hpData.seo.ogImage,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <HeroSection v-bind="heroProps" />

  <!-- Skeleton while client-side refetch is in flight -->
  <ContentSkeleton v-if="isLoading" :sections="3" />

  <!-- Error banner — only shown when refetch also failed -->
  <div v-else-if="hasApiError" class="container-tech py-12">
    <div class="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center">
      <p class="text-sm font-semibold text-red-700">Gagal memuat konten.</p>
      <p class="mt-1 text-[13px] text-red-600">Tidak dapat menghubungi server. Periksa koneksi Anda dan coba lagi.</p>
      <button
        @click="async () => { isLoading = true; await Promise.allSettled([refreshNuxtData('homepage-products'), refreshNuxtData('homepage-industries'), refreshNuxtData('homepage-articles')]); isLoading = false; }"
        class="mt-4 cursor-pointer rounded-md bg-accent px-5 py-2 text-[13px] font-semibold text-white border-none hover:bg-accent-glow"
      >
        Coba Lagi
      </button>
    </div>
  </div>

  <!-- Content -->
  <template v-else>
    <ProductCategoriesSection v-if="catItems.length" :items="catItems" />
    <StatisticsSection v-if="stats.length" :items="stats" />
    <WhyChooseUsSection :items="whyChooseUsItems" />

    <!-- Mission band (cream cell) -->
    <section class="bg-paper">
      <div class="frame border-b border-line">
        <div class="bg-paper-soft px-6 py-20 text-center md:py-28">
          <p class="display mx-auto max-w-3xl text-2xl leading-snug text-ink md:text-[2.4rem]">
            {{ mission }}
          </p>
          <div class="mt-10 flex justify-center">
            <NuxtLink to="/tentang-kami" class="inline-flex items-center gap-2 rounded-md border border-[rgb(var(--line))] bg-white px-6 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition-colors hover:bg-[rgb(var(--paper))]">Selengkapnya</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <IndustriesSection v-if="industryItems.length" :industries="industryItems" />
    <LatestArticlesSection v-if="latestArticles.length" :articles="latestArticles" />
  </template>

  <CTASection v-bind="ctaProps" />
</template>
