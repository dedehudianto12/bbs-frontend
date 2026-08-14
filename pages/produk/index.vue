<script setup lang="ts">
import { categorySlug } from '~/utils/slug'

// The catalog hub. /produk was a hard 404 until this page existed, while being
// the highest-commercial-intent path on the domain — both the header dropdown
// and the footer pointed at /produk/belt-conveyor instead, so the one URL a
// buyer is most likely to type or link to returned nothing.
//
// Deliberately not a third listing page: it fetches once, unfiltered, and
// splits into the two groups, each carrying its category links and a short
// featured grid. That makes hub → product detail a single hop where it used
// to be two, which is what actually gets the long tail crawled.
const { get } = useApi()

const { data: productRes, error: productErr } = await useAsyncData('produk-hub', () =>
  get<any[]>('/produk')
)

// Client-side refetch if SSR payload is empty
if (import.meta.client) {
  onMounted(() => {
    if (!productRes.value?.data?.length) refreshNuxtData('produk-hub')
  })
}

// ProductGrid takes `title`, not `name` — same mapping as the two group
// index pages.
function toCards(rows: any[]) {
  return rows.map((p: any) => ({
    slug: p.slug,
    title: p.name,
    category: p.category,
    description: p.description,
    image: p.image ?? null,
  }))
}

const GROUPS = [
  {
    key: 'belt-conveyor',
    label: 'Belt Conveyor',
    href: '/produk/belt-conveyor',
    blurb: 'PVC Belt, PU, Flat Belt, dan Rubber Belt untuk kebutuhan aplikasi industri.',
  },
  {
    key: 'lainnya',
    label: 'Produk Lainnya',
    href: '/produk/lainnya',
    blurb: 'Timing Belt, Fastener, Cleat, Gravity Roll, dan komponen conveyor pendukung.',
  },
] as const

const groups = computed(() => {
  const all = productRes.value?.data ?? []

  return GROUPS.map((g) => {
    // Anything not explicitly belt-conveyor falls into lainnya — the same
    // rule the sitemap handler and produk/[slug].vue already apply.
    const rows = all.filter((p: any) =>
      g.key === 'belt-conveyor' ? p.group === 'belt-conveyor' : p.group !== 'belt-conveyor',
    )

    const categories = [...new Set(rows.map((p: any) => p.category as string))].map((label) => ({
      label,
      href: `${g.href}/${categorySlug(label)}/`,
    }))

    return { ...g, count: rows.length, categories, featured: toCards(rows.slice(0, 6)) }
  }).filter((g) => g.count > 0)
})

const breadcrumbItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Produk' },
]

useSeo({
  title: 'Katalog Produk',
  description:
    'Katalog lengkap belt conveyor dan komponen industri: PVC Belt, PU, Rubber Belt, Flat Belt, Timing Belt, Fastener, Cleat, dan Gravity Roll.',
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Katalog"
      title="Produk"
      description="Belt conveyor dan komponen pendukung untuk sistem material handling industri, tersedia dalam berbagai material dan spesifikasi."
    >
      <template #breadcrumb>
        <Breadcrumb :items="breadcrumbItems" />
      </template>
    </PageHero>

    <div v-if="productErr" class="container-tech py-12">
      <div class="rounded-none border border-red-200 bg-red-50 px-6 py-8 text-center">
        <p class="text-sm font-semibold text-red-700">Gagal memuat produk.</p>
        <p class="mt-1 text-[13px] text-red-600">Tidak dapat menghubungi server.</p>
        <button @click="() => refreshNuxtData('produk-hub')" class="mt-4 cursor-pointer rounded-none bg-accent px-5 py-2 text-[13px] font-semibold text-white border-none">Coba Lagi</button>
      </div>
    </div>

    <template v-else>
      <section
        v-for="(group, i) in groups"
        :key="group.key"
        class="bg-paper"
        :class="i > 0 ? 'border-t border-line' : ''"
      >
        <div class="container-tech py-16 md:py-24">
          <SectionTitle :eyebrow="`${group.count} produk`" :title="group.label" :description="group.blurb" />

          <!-- Plain links, not ProductFilter: that component is a controlled
               filter that router.push()es on change, which is the wrong
               semantics for a hub whose whole job is to hand out crawlable
               anchors to the category pages. -->
          <nav v-if="group.categories.length" class="mt-8 flex flex-wrap gap-2" :aria-label="`Kategori ${group.label}`">
            <NuxtLink
              v-for="cat in group.categories"
              :key="cat.href"
              :to="cat.href"
              class="rounded-none border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-ink hover:bg-paper-soft"
            >
              {{ cat.label }}
            </NuxtLink>
          </nav>

          <ProductGrid :products="group.featured" class="mt-10" />

          <div class="mt-10">
            <UiButton :href="group.href" variant="outline">
              Lihat semua {{ group.label }}
            </UiButton>
          </div>
        </div>
      </section>
    </template>

    <CTASection
      headline="Tidak Menemukan yang Anda Cari?"
      description="Tim kami siap membantu merekomendasikan produk yang sesuai dengan kebutuhan spesifik Anda."
      button-text="Konsultasi Gratis"
      button-link="/kontak"
    />
  </div>
</template>
