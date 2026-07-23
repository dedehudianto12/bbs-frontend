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

const mission = computed(() =>
  hpData.value?.company?.description ??
  'BBS Conveyor adalah supplier conveyor terpercaya di Indonesia yang menyediakan belt conveyor, roller, dan komponen industri berkualitas tinggi.'
)

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

// Unique categories with group + product count, in first-seen order
const catItems = computed(() => {
  const list = Array.isArray(products.value) ? products.value : []
  const map = new Map<string, { cat: string; group: string; count: number }>()
  for (const p of list as any[]) {
    const entry = map.get(p.category) ?? { cat: p.category, group: p.group, count: 0 }
    entry.count++
    map.set(p.category, entry)
  }
  return [...map.values()]
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
    ? [...articles.value].sort((a: any, b: any) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 6)
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
  ogImage: hpData.value?.seo?.ogImage ?? '/images/og-home.webp',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <HeroSection v-bind="heroProps" />
  <ProductCategoriesSection :items="catItems" />
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
          <Button to="/tentang-kami" variant="white">Selengkapnya</Button>
        </div>
      </div>
    </div>
  </section>

  <IndustriesSection :industries="industryItems" />
  <LatestArticlesSection :articles="latestArticles" />
  <CTASection v-bind="ctaProps" />
</template>
