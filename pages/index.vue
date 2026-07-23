<script setup lang="ts">
// Fetch homepage config from content/config/homepage.yml
const { data: hp } = await useAsyncData('homepage-config', () =>
  queryCollection('homepageConfig').first()
)

const hpData = computed(() => (hp.value as any) ?? {})

const heroProps = computed(() => ({
  headline: hpData.value?.hero?.headline ?? 'Solusi Belt & Roller Conveyor untuk Bisnis Anda',
  subheadline: hpData.value?.hero?.subheadline ?? '',
  primaryCTA: hpData.value?.hero?.primaryCTA ?? 'Lihat Produk',
  primaryLink: hpData.value?.hero?.primaryLink ?? '/produk/belt-conveyor',
  secondaryCTA: hpData.value?.hero?.secondaryCTA,
  secondaryLink: hpData.value?.hero?.secondaryLink,
}))

const whyChooseUsItems = computed(() =>
  hpData.value?.whyChooseUs?.items ?? []
)

const stats = computed(() => {
  const s = hpData.value?.statistics
  if (!s) return []
  return [
    { label: 'Tahun Pengalaman', value: `${s.years}+` },
    { label: 'Proyek Selesai', value: `${s.projects}+` },
    { label: 'Klien Aktif', value: `${s.clients}+` },
    { label: 'Tenaga Teknisi', value: `${s.engineers}+` },
  ].filter((item) => !item.value.startsWith('undefined'))
})

const ctaProps = computed(() => ({
  headline: hpData.value?.cta?.headline ?? 'Butuh Solusi Conveyor?',
  description: hpData.value?.cta?.description ?? 'Konsultasikan kebutuhan industri Anda dengan tim kami.',
  buttonText: hpData.value?.cta?.buttonText ?? 'Hubungi Kami',
  buttonLink: hpData.value?.cta?.buttonLink ?? '/kontak',
}))

// Product categories, industries, articles — from their own collections
const { data: products } = await useAsyncData('homepage-products', () =>
  queryCollection('products').all()
)

const { data: industries } = await useAsyncData('homepage-industries', () =>
  queryCollection('industries').all()
)

const { data: articles } = await useAsyncData('homepage-articles', () =>
  queryCollection('blog').all()
)

const productCategories = computed(() => {
  const cats = (Array.isArray(products.value) ? products.value : []).map((p: any) => p.category)
  return [...new Set(cats)]
})

const industryItems = computed(() =>
  (Array.isArray(industries.value) ? industries.value : []).map((i: any) => ({
    name: i.title,
    description: i.excerpt,
    slug: i.slug,
  }))
)

const latestArticles = computed(() =>
  (Array.isArray(articles.value)
    ? [...articles.value].sort((a: any, b: any) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3)
    : []
  ).map((a: any) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    tag: a.tags?.[0] ?? '',
    image: a.thumbnail ?? null,
    publishedAt: a.publishedAt,
    author: a.author ?? '',
  }))
)

useSeoMeta({
  title: hpData.value?.seo?.title ?? 'BBS Conveyor — Solusi Belt & Roller Conveyor Industri',
  description: hpData.value?.seo?.description ?? '',
})
</script>

<template>
  <HeroSection v-bind="heroProps" />
  <ProductCategoriesSection :categories="productCategories" />
  <WhyChooseUsSection :items="whyChooseUsItems" />
  <IndustriesSection :industries="industryItems" />
  <StatisticsSection v-if="stats.length" :items="stats" />
  <LatestArticlesSection :articles="latestArticles" />
  <CTASection v-bind="ctaProps" />
</template>
