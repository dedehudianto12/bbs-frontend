<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const subcat = route.params.kategori as string

const { data: allProducts } = await useAsyncData(`produk-lainnya-${subcat}`, () =>
  queryCollection('products').all()
)

const otherProducts = computed(() =>
  (Array.isArray(allProducts.value) ? allProducts.value : [])
    .filter((p: any) => p.group !== 'belt-conveyor')
    .map((p: any) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      description: p.excerpt,
      _categoryClean: p.category.toLowerCase().replace(/\s+/g, '-'),
    }))
)

const products = computed(() =>
  otherProducts.value.filter((p) => p._categoryClean === subcat)
)

const isValid = computed(() => products.value.length > 0)

const subCategories = computed(() => {
  const cats = [...new Set(otherProducts.value.map((p) => p.category))]
  return cats.map((c) => ({ label: c, value: c.toLowerCase().replace(/\s+/g, '-') }))
})

const currentLabel = computed(() => {
  const match = subCategories.value.find((s) => s.value === subcat)
  return match?.label ?? subcat
})

function onFilterChange(newSubcat: string) {
  router.push(`/produk/lainnya/${newSubcat}`)
}

useSeoMeta({
  title: `${currentLabel.value} — Produk Lainnya — BBS Conveyor`,
  description: `${currentLabel.value} berkualitas untuk kebutuhan industri. Tersedia dari BBS Conveyor.`
})
</script>

<template>
  <div v-if="isValid" class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-ink mb-2">{{ currentLabel }}</h1>
    <p class="text-neutral mb-8">Produk Lainnya kategori {{ currentLabel }}.</p>

    <ProductFilter
      :model-value="subcat"
      :options="subCategories"
      class="mb-8"
      @update:model-value="onFilterChange"
    />

    <ProductGrid :products="products" />
  </div>

  <div v-else class="max-w-6xl mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-bold text-ink mb-4">Kategori Tidak Ditemukan</h1>
    <NuxtLink to="/produk/lainnya" class="text-gold-dark hover:text-gold font-medium transition-colors">
      &larr; Kembali ke Produk Lainnya
    </NuxtLink>
  </div>
</template>
