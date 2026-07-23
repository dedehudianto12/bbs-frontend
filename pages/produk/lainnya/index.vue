<script setup lang="ts">
const router = useRouter()

const { data: allProducts } = await useAsyncData('produk-lainnya', () =>
  queryCollection('products').all()
)

const products = computed(() =>
  (Array.isArray(allProducts.value) ? allProducts.value : [])
    .filter((p: any) => p.group !== 'belt-conveyor')
    .map((p: any) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      description: p.excerpt,
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
    <section class="bg-bg-soft py-14 md:py-20">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-ink tracking-tight">Produk Lainnya</h1>
        <p class="mt-4 text-neutral text-lg">Komponen conveyor pendukung untuk melengkapi sistem material handling Anda.</p>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-4 py-12">
      <ProductFilter
        model-value=""
        :options="subCategories"
        class="mb-8"
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
