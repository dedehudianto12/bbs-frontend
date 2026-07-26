<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const subcat = route.params.kategori as string
const { get } = useApi()

const { data: productRes } = await useAsyncData(`produk-lainnya-${subcat}`, () =>
  get<any[]>('/produk', { group: 'lainnya' })
)

const otherProducts = computed(() =>
  (productRes.value?.data ?? []).map((p: any) => ({
    slug: p.slug,
    title: p.name,
    category: p.category,
    description: p.description,
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
  <div v-if="isValid">
    <PageHero
      eyebrow="Produk Lainnya"
      :title="currentLabel"
      :description="`Produk Lainnya kategori ${currentLabel}.`"
    >
      <template #breadcrumb>
        <Breadcrumb
          :items="[
            { label: 'Beranda', href: '/' },
            { label: 'Produk Lainnya', href: '/produk/lainnya' },
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
      <NuxtLink to="/produk/lainnya" class="inline-flex items-center gap-2 rounded-md px-6 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition-colors hover:bg-[rgb(var(--paper-soft))]">Kembali ke Produk Lainnya <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></NuxtLink>
    </div>
  </div>
</template>
