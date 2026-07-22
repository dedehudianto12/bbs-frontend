<script setup lang="ts">
// Fetch homepage content from Nuxt Content collections
const { data: hero } = await useAsyncData('homepage-hero', () =>
  queryCollection('homepage').where('section', '=', 'hero').first()
)

const { data: whyChooseUs } = await useAsyncData('homepage-why-choose-us', () =>
  queryCollection('homepage').where('section', '=', 'why-choose-us').first()
)

const { data: products } = await useAsyncData('homepage-products', () =>
  queryCollection('products').all()
)

const { data: industries } = await useAsyncData('homepage-industries', () =>
  queryCollection('industries').all()
)

const { data: articles } = await useAsyncData('homepage-articles', () =>
  queryCollection('blog').all()
)

// Derive unique product categories
const productCategories = computed(() => {
  const cats = (Array.isArray(products.value) ? products.value : []).map((p: any) => p.category)
  return [...new Set(cats)]
})

// Map content data to section props
const heroProps = computed(() => ({
  headline: (hero.value as any)?.headline ?? 'Solusi Belt & Roller Conveyor untuk Bisnis Anda',
  subheadline: (hero.value as any)?.subheadline ?? 'CV Bintang Berjaya Satu menyediakan belt conveyor, roller, dan komponen industri berkualitas untuk manufaktur, tambang, dan pengolahan di seluruh Indonesia.',
  primaryCTA: (hero.value as any)?.primaryCTA ?? 'Lihat Produk',
  primaryLink: (hero.value as any)?.primaryLink ?? '/produk/belt-conveyor',
  secondaryCTA: (hero.value as any)?.secondaryCTA,
  secondaryLink: (hero.value as any)?.secondaryLink,
}))

const whyChooseUsItems = computed(() =>
  (whyChooseUs.value as any)?.items ?? []
)

const industryItems = computed(() =>
  (Array.isArray(industries.value) ? industries.value : []).map((i: any) => ({
    name: i.title,
    description: i.excerpt,
    slug: i.slug,
  })) ?? []
)

const latestArticles = computed(() =>
  (Array.isArray(articles.value)
    ? [...articles.value].sort((a: any, b: any) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3)
    : []
  ).map((a: any) => ({
    id: a.slug,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    image: a.thumbnail ?? null,
    tag: a.tags?.[0] ?? '',
    publishedAt: a.publishedAt,
    author: (a as any).author ?? '',
  })) ?? []
)

useSeoMeta({
  title: 'BBS Conveyor — Solusi Belt & Roller Conveyor Industri',
  description: 'CV Bintang Berjaya Satu menyediakan belt conveyor, roller, dan komponen industri berkualitas untuk manufaktur, tambang, dan pengolahan di Indonesia.'
})
</script>

<template>
  <HeroSection v-bind="heroProps" />
  <ProductCategoriesSection :categories="productCategories" />
  <WhyChooseUsSection :items="whyChooseUsItems" />
  <IndustriesSection :industries="industryItems" />
  <LatestArticlesSection :articles="latestArticles" />
</template>
