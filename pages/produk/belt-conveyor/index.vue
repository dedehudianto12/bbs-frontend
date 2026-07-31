<script setup lang="ts">
const router = useRouter()
const { get } = useApi()

const { data: productRes, error: productErr } = await useAsyncData('produk-belt-conveyor', () =>
  get<any[]>('/produk', { group: 'belt-conveyor' })
)

const products = computed(() =>
  (productRes.value?.data ?? []).map((p: any) => ({
    slug: p.slug,
    title: p.name,
    category: p.category,
    description: p.description,
    image: p.image ?? null,
  }))
)

// Client-side refetch if SSR payload is empty
if (import.meta.client) {
  onMounted(() => {
    if (!productRes.value?.data?.length) refreshNuxtData('produk-belt-conveyor')
  })
}

const subCategories = computed(() => {
  const cats = [...new Set(products.value.map((p) => p.category))]
  return cats.map((c) => ({ label: c, value: c.toLowerCase().replace(/\s+/g, '-') }))
})

function onFilterChange(subcat: string) {
  router.push(`/produk/belt-conveyor/${subcat}`)
}

useSeoMeta({
  title: 'Belt Conveyor — BBS Conveyor',
  description: 'PVC Belt, PU, Flat Belt, dan Rubber Belt berkualitas untuk kebutuhan industri Anda.'
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Katalog Produk"
      title="Belt Conveyor"
      description="Pilih dari berbagai jenis belt conveyor untuk aplikasi industri Anda."
    />

    <!-- HeroBlueprint's new home. It held the homepage hero until a real
         product photograph existed; now that one does, a labelled side
         elevation of a belt conveyor — pulleys, idlers, A-frame, carried load —
         earns its place here instead, at the head of the catalog it describes.
         Better here than on the homepage anyway: this is where someone is
         actually trying to work out which part they need. -->
    <section class="bg-paper">
      <div class="frame border-b border-line px-5 py-10 md:px-8 md:py-12">
        <HeroBlueprint class="!max-w-3xl" />
      </div>
    </section>

    <div v-if="productErr" class="container-tech py-12">
      <div class="rounded-none border border-red-200 bg-red-50 px-6 py-8 text-center">
        <p class="text-sm font-semibold text-red-700">Gagal memuat produk.</p>
        <p class="mt-1 text-[13px] text-red-600">Tidak dapat menghubungi server.</p>
        <button @click="() => refreshNuxtData('produk-belt-conveyor')" class="mt-4 cursor-pointer rounded-none bg-accent px-5 py-2 text-[13px] font-semibold text-white border-none">Coba Lagi</button>
      </div>
    </div>

    <div v-else class="container-tech py-16 md:py-24">
      <ProductFilter
        model-value=""
        :options="subCategories"
        class="mb-10"
        @update:model-value="onFilterChange"
      />

      <ProductGrid :products="products" />
    </div>

    <CTASection
      headline="Tidak Menemukan yang Anda Cari?"
      description="Tim kami siap membantu merekomendasikan belt conveyor yang sesuai dengan kebutuhan spesifik Anda."
      button-text="Konsultasi Gratis"
      button-link="/kontak"
    />
  </div>
</template>
