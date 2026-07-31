<script setup lang="ts">
import { homepageConfig, whyChooseUsItems } from '~/data/homepage'
import { useRevealOnScroll } from '~/composables/useRevealOnScroll'
import { waLink } from '~/utils/whatsapp'

const { get } = useApi()

// Mission band is inline in this page rather than a component, so it needs its
// own reveal root.
const { root: missionRoot } = useRevealOnScroll()

const hpData = homepageConfig

const heroProps = computed(() => ({
  headline: hpData.hero.headline,
  highlights: hpData.hero.headlineHighlights,
  subheadline: hpData.hero.subheadline,
  primaryCTA: hpData.hero.primaryCTA,
  // Built here rather than stored as a static path so the prefilled message
  // tells sales the lead came from the hero, not one of the eight other wa.me
  // links on this page.
  primaryLink: waLink({ halaman: 'Hero — Beranda' }),
  primaryWhatsApp: true,
  secondaryCTA: hpData.hero.secondaryCTA,
  secondaryLink: hpData.hero.secondaryLink,
}))

const ctaProps = computed(() => ({
  headline: hpData.cta.headline,
  description: hpData.cta.description,
  buttonText: hpData.cta.buttonText,
  buttonLink: hpData.cta.buttonLink,
}))

const mission = computed(() => hpData.company.description)

// Product categories, industries, articles, gallery — from backend
const { data: productRes, error: productErr } = await useAsyncData('homepage-products', () =>
  get<any[]>('/produk')
)
const { data: industryRes, error: industryErr } = await useAsyncData('homepage-industries', () =>
  get<any[]>('/industri')
)
const { data: articleRes, error: articleErr } = await useAsyncData('homepage-articles', () =>
  get<any[]>('/artikel')
)
const { data: galleryRes } = await useAsyncData('homepage-gallery', () =>
  get<any[]>('/galeri')
)

const products = computed(() => productRes.value?.data ?? [])
const industries = computed(() => industryRes.value?.data ?? [])
const allArticles = computed(() => articleRes.value?.data ?? [])
const galleries = computed(() => galleryRes.value?.data ?? [])

// Gallery drives a decorative proof strip only, so its failure must not
// escalate to the page-level error state — ProofMarquee self-hides when empty.
const hasApiError = computed(() => productErr.value || industryErr.value || articleErr.value)

// If SSR payload is empty (backend unreachable), show skeleton while client
// re-fetches. Set isLoading on server too so the SSR HTML already has skeleton
// instead of a brief error flash before hydration.
const emptyPayload = !productRes.value?.data?.length && !industryRes.value?.data?.length && !articleRes.value?.data?.length
const isLoading = ref(hasApiError.value && emptyPayload)

const REFRESH_KEYS = [
  'homepage-products',
  'homepage-industries',
  'homepage-articles',
  'homepage-gallery',
] as const

async function retry() {
  isLoading.value = true
  await Promise.allSettled(REFRESH_KEYS.map((key) => refreshNuxtData(key)))
  isLoading.value = false
}

if (import.meta.client) {
  onMounted(async () => {
    if (!emptyPayload) return
    await retry()
  })
}

// Unique categories with group + product count, in first-seen order.
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

const galleryItems = computed(() =>
  galleries.value.map((g: any) => ({
    caption: g.caption ?? '',
    location: g.location ?? null,
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
    <div class="border border-red-200 bg-red-50 px-6 py-8 text-center">
      <p class="text-sm font-semibold text-red-700">Gagal memuat konten.</p>
      <p class="mt-1 text-[13px] text-red-600">Tidak dapat menghubungi server. Periksa koneksi Anda dan coba lagi.</p>
      <div class="mt-4 flex justify-center">
        <UiButton size="sm" @click="retry">Coba Lagi</UiButton>
      </div>
    </div>
  </div>

  <!-- Content — tonal rhythm is deliberate: steel at ~25%, gold at ~55%,
       steel again at the footer. Six consecutive paper sections inside the
       .frame rails read as monotonous without those two anchors. -->
  <template v-else>
    <ProofMarquee :items="galleryItems" />
    <ProofStrip />

    <ProductCategoriesSection v-if="catItems.length" :items="catItems" />

    <LeadTimeBanner
      v-if="hpData.leadTime"
      :days="hpData.leadTime.days"
      :headline="hpData.leadTime.headline"
      :description="hpData.leadTime.description"
      :steps="hpData.leadTime.steps"
    />

    <!-- Directly after LeadTimeBanner: "2–3 days" and "we come to you
         nationwide" are the same thought, and the gold band closes it before
         the page pivots to trust. -->
    <ServiceBanner />

    <WhyChooseUsSection :items="whyChooseUsItems" />

    <!-- Mission band (cream cell) -->
    <section ref="missionRoot" class="bg-paper">
      <div class="frame border-b border-line">
        <div data-reveal-item class="bg-paper-soft px-6 py-20 text-center md:py-28">
          <p class="display mx-auto max-w-3xl text-2xl leading-snug text-ink md:text-[2.4rem]">
            {{ mission }}
          </p>
          <div class="mt-10 flex justify-center">
            <UiButton href="/tentang-kami" variant="outline">Selengkapnya</UiButton>
          </div>
        </div>
      </div>
    </section>

    <IndustriesSection v-if="industryItems.length" :industries="industryItems" />
    <LatestArticlesSection v-if="latestArticles.length" :articles="latestArticles" />
  </template>

  <CTASection v-bind="ctaProps" />
</template>
