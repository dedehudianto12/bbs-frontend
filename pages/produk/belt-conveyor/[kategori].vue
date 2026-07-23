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
    <PageHero
      eyebrow="Belt Conveyor"
      :title="currentLabel"
      :description="`Belt Conveyor kategori ${currentLabel}.`"
    >
      <template #breadcrumb>
        <Breadcrumb
          :items="[
            { label: 'Beranda', href: '/' },
            { label: 'Belt Conveyor', href: '/produk/belt-conveyor' },
            { label: currentLabel },
          ]"
        />
      </template>
    </PageHero>

    <div class="container-tech py-16 md:py-24">
      <ProductFilter
        :model-value="subcat"
        :options="subCategories"
        class="mb-10"
        @update:model-value="onFilterChange"
      />
      <ProductGrid :products="products" />
    </div>
  </div>

  <div v-else class="container-tech py-24 md:py-32 text-center">
    <h1 class="display text-3xl text-ink md:text-4xl">Kategori Tidak Ditemukan</h1>
    <div class="mt-8 flex justify-center">
      <Button to="/produk/belt-conveyor" variant="ghost" arrow>Kembali ke Belt Conveyor</Button>
    </div>
  </div>
</template>
