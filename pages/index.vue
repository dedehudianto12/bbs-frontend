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
const { data: productRes } = await useAsyncData('homepage-products', () =>
  get<any[]>('/produk')
)
const { data: industryRes } = await useAsyncData('homepage-industries', () =>
  get<any[]>('/industri')
)
const { data: articleRes } = await useAsyncData('homepage-articles', () =>
  get<any[]>('/artikel')
)

const products = computed(() => productRes.value?.data ?? [])
const industries = computed(() => industryRes.value?.data ?? [])
const allArticles = computed(() => articleRes.value?.data ?? [])

// Unique categories with group + product count, in first-seen order
const catItems = computed(() => {
  const map = new Map<string, { cat: string; group: string; count: number }>()
  for (const p of products.value) {
    const entry = map.get(p.category) ?? { cat: p.category, group: p.group, count: 0 }
    entry.count++
    map.set(p.category, entry)
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
