<script setup lang="ts">
import { homepageConfig, whyChooseUsItems } from '~/data/homepage'
import { waLink } from '~/utils/whatsapp'

const { get } = useApi()

const hpData = homepageConfig

const heroProps = computed(() => ({
  headline: hpData.hero.headline,
  highlights: hpData.hero.headlineHighlights,
  subheadline: hpData.hero.subheadline,
  primaryCTA: hpData.hero.primaryCTA,
  // Built here rather than stored as a static path so the prefilled message
  // tells sales the lead came from the hero, not one of the other wa.me links
  // on this page.
  primaryLink: waLink({ halaman: 'Hero — Beranda' }),
  primaryWhatsApp: true,
  secondaryCTA: hpData.hero.secondaryCTA,
  secondaryLink: hpData.hero.secondaryLink,
  facts: hpData.hero.facts,
}))

const ctaProps = computed(() => ({
  headline: hpData.cta.headline,
  description: hpData.cta.description,
  buttonText: hpData.cta.buttonText,
  buttonLink: hpData.cta.buttonLink,
}))

// Two fetches, down from four.
//
// /industri and /artikel were both fetched on every homepage load to feed
// IndustriesSection and LatestArticlesSection, which are gone — see the
// template for why. Dropping them halves the requests this page makes on a
// mid-range Android, which is the device that matters here.
const { data: productRes, error: productErr } = await useAsyncData('homepage-products', () =>
  get<any[]>('/produk')
)
const { data: galleryRes } = await useAsyncData('homepage-gallery', () =>
  get<any[]>('/galeri')
)

const products = computed(() => productRes.value?.data ?? [])
const galleries = computed(() => galleryRes.value?.data ?? [])

// Gallery drives a decorative proof strip only, so its failure must not
// escalate to the page-level error state — ProofMarquee self-hides when empty.
const hasApiError = computed(() => !!productErr.value)

// If SSR payload is empty (backend unreachable), show skeleton while client
// re-fetches. Set isLoading on server too so the SSR HTML already has skeleton
// instead of a brief error flash before hydration.
const emptyPayload = !productRes.value?.data?.length
const isLoading = ref(hasApiError.value && emptyPayload)

const REFRESH_KEYS = ['homepage-products', 'homepage-gallery'] as const

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

const galleryItems = computed(() =>
  galleries.value.map((g: any) => ({
    caption: g.caption ?? '',
    location: g.location ?? null,
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

  <!-- Eleven sections down to six.
       Cut, and why:
       - IndustriesSection: its cells linked nowhere and hid their descriptions
         in a `title` tooltip, which is invisible on touch and unreachable by
         keyboard. There is no /industri/:slug route to link them to. The data
         deserves better than deletion — every industri row already carries a
         curated productSlugs list that nothing on the site reads — so this is
         deferred to a real industry route, not a verdict on the content.
       - The inline Mission band: generic copy that restated tentang-kami and
         linked to it, occupying a full cream cell to do so.
       - LatestArticlesSection: a genuine SEO asset sitting in conversion space.
         The articles keep /artikel and stay in the sitemap; they just stop
         competing with the catalog for a buyer whose line is down.

       - ProofStrip: not cut but promoted. Its four facts are now the datasheet
         beside the headline, where they sit next to the claim they support
         rather than a screen below it.

       Tonal rhythm is deliberate, and it brightens toward the products
       rather than darkening: paper through the hero and marquee, white at
       the katalog — the cleanest surface on the page, where the photography
       goes — gold at the service band, back to paper, then steel at the footer.
       The katalog used to be a steel anchor with a blueprint grid; see that
       component for why it is not any more. -->
  <template v-else>
    <!-- ProofStrip is gone: its four facts moved into the hero as the datasheet
         beside the headline, where they sit next to the claim they support
         instead of a screen below it. -->
    <ProofMarquee :items="galleryItems" />

    <ProductCategoriesSection v-if="catItems.length" :items="catItems" />

    <!-- "2–3 days" and "we come to you nationwide" are one thought, and used to
         be two consecutive sections opening on the same sentence. -->
    <ServiceLeadTimeBanner
      v-if="hpData.leadTime"
      :days="hpData.leadTime.days"
      :steps="hpData.leadTime.steps"
    />

    <WhyChooseUsSection :items="whyChooseUsItems" />

    <!-- Hidden until the marketplace URLs are filled in; see data/contact.ts. -->
    <MarketplaceBand />
  </template>

  <CTASection v-bind="ctaProps" />
</template>
