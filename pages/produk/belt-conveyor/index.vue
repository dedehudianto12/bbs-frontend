<script setup lang="ts">
const router = useRouter()
const { get } = useApi()

const { data: productRes } = await useAsyncData('produk-belt-conveyor', () =>
  get<any[]>('/produk', { group: 'belt-conveyor' })
)

const products = computed(() =>
  (productRes.value?.data ?? []).map((p: any) => ({
    slug: p.slug,
    title: p.name,
    category: p.category,
    description: p.description,
  }))
)

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

    <div class="container-tech py-16 md:py-24">
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
