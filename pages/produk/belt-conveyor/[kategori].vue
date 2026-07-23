<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const subcat = route.params.kategori as string

const { data: allProducts } = await useAsyncData(`produk-belt-conveyor-${subcat}`, () =>
  queryCollection('products').all()
)

const beltProducts = computed(() =>
  (Array.isArray(allProducts.value) ? allProducts.value : [])
    .filter((p: any) => p.group === 'belt-conveyor')
    .map((p: any) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      description: p.excerpt,
      _categoryClean: p.category.toLowerCase().replace(/\s+/g, '-'),
    }))
)

const products = computed(() =>
  beltProducts.value.filter((p) => p._categoryClean === subcat)
)

const isValid = computed(() => products.value.length > 0)

const subCategories = computed(() => {
  const cats = [...new Set(beltProducts.value.map((p) => p.category))]
  return cats.map((c) => ({ label: c, value: c.toLowerCase().replace(/\s+/g, '-') }))
})

const currentLabel = computed(() => {
  const match = subCategories.value.find((s) => s.value === subcat)
  return match?.label ?? subcat
})

function onFilterChange(newSubcat: string) {
  router.push(`/produk/belt-conveyor/${newSubcat}`)
}

useSeoMeta({
  title: `${currentLabel.value} — Belt Conveyor — BBS Conveyor`,
  description: `Belt conveyor ${currentLabel.value} berkualitas untuk kebutuhan industri. Tersedia dari BBS Conveyor.`
})
</script>

<template>
  <div v-if="isValid">
    <section class="bg-bg-soft py-14">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <Breadcrumb
          :items="[
            { label: 'Beranda', href: '/' },
            { label: 'Belt Conveyor', href: '/produk/belt-conveyor' },
            { label: currentLabel },
          ]"
        />
        <h1 class="text-3xl font-bold text-ink tracking-tight">{{ currentLabel }}</h1>
        <p class="mt-3 text-neutral">Belt Conveyor kategori {{ currentLabel }}.</p>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-4 py-12">
      <ProductFilter
        :model-value="subcat"
        :options="subCategories"
        class="mb-8"
        @update:model-value="onFilterChange"
      />
      <ProductGrid :products="products" />
    </div>
  </div>

  <div v-else class="max-w-6xl mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-bold text-ink mb-4">Kategori Tidak Ditemukan</h1>
    <Button to="/produk/belt-conveyor" variant="outline">
      &larr; Kembali ke Belt Conveyor
    </Button>
  </div>
</template>
