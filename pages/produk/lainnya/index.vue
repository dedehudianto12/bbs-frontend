<script setup lang="ts">
const router = useRouter()
const { get } = useApi()

const { data: productRes } = await useAsyncData('produk-lainnya', () =>
  get<any[]>('/produk', { group: 'lainnya' })
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
  router.push(`/produk/lainnya/${subcat}`)
}

useSeoMeta({
  title: 'Produk Lainnya — BBS Conveyor',
  description: 'Timing Belt, Fastener, Cleat, Gravity Roll, dan komponen conveyor pendukung berkualitas.'
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Katalog Produk"
      title="Produk Lainnya"
      description="Komponen conveyor pendukung untuk melengkapi sistem material handling Anda."
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
      headline="Butuh Komponen Khusus?"
      description="Kami menyediakan berbagai komponen conveyor sesuai spesifikasi Anda."
      button-text="Hubungi Kami"
      button-link="/kontak"
    />
  </div>
</template>
