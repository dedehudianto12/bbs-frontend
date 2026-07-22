<script setup lang="ts">
const router = useRouter()

const { data: allProducts } = await useAsyncData('produk-belt-conveyor', () =>
  queryCollection('products').all()
)

const products = computed(() =>
  (Array.isArray(allProducts.value) ? allProducts.value : [])
    .filter((p: any) => p.group === 'belt-conveyor')
    .map((p: any) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      description: p.excerpt,
    }))
)

// ponytail: unique categories from filtered products for filter buttons
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
  <div class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-ink mb-2">Belt Conveyor</h1>
    <p class="text-neutral mb-8">Pilih dari berbagai jenis belt conveyor untuk aplikasi industri Anda.</p>

    <ProductFilter
      model-value=""
      :options="subCategories"
      class="mb-8"
      @update:model-value="onFilterChange"
    />

    <ProductGrid :products="products" />
  </div>
</template>
