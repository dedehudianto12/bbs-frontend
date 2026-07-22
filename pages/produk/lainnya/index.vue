<script setup lang="ts">
const router = useRouter()

const { data: allProducts } = await useAsyncData('produk-lainnya', () =>
  queryCollection('products').all()
)

// ponytail: non-belt products → lainnya group
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
  <div class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-ink mb-2">Produk Lainnya</h1>
    <p class="text-neutral mb-8">Komponen conveyor pendukung untuk melengkapi sistem material handling Anda.</p>

    <ProductFilter
      model-value=""
      :options="subCategories"
      class="mb-8"
      @update:model-value="onFilterChange"
    />

    <ProductGrid :products="products" />
  </div>
</template>
