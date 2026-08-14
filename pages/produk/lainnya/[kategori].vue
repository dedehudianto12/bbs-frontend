<script setup lang="ts">
import { categorySlug } from '~/utils/slug'

const route = useRoute()
const router = useRouter()
const subcat = route.params.kategori as string
const { get } = useApi()

const { data: productRes, error: productErr } = await useAsyncData(`produk-lainnya-${subcat}`, () =>
  get<any[]>('/produk', { group: 'lainnya' })
)

const otherProducts = computed(() =>
  (productRes.value?.data ?? []).map((p: any) => ({
    slug: p.slug,
    title: p.name,
    category: p.category,
    description: p.description,
    image: p.image ?? null,
    _categoryClean: categorySlug(p.category),
  }))
)

if (import.meta.client) {
  onMounted(() => {
    if (!productRes.value?.data?.length) refreshNuxtData(`produk-lainnya-${subcat}`)
  })
}

const products = computed(() =>
  otherProducts.value.filter((p) => p._categoryClean === subcat)
)

const isValid = computed(() => products.value.length > 0)

const subCategories = computed(() => {
  const cats = [...new Set(otherProducts.value.map((p) => p.category))]
  return cats.map((c) => ({ label: c, value: categorySlug(c) }))
})

const currentLabel = computed(() => {
  const match = subCategories.value.find((s) => s.value === subcat)
  return match?.label ?? subcat
})

function onFilterChange(newSubcat: string) {
  router.push(`/produk/lainnya/${newSubcat}/`)
}

useSeo({
  title: () => `${currentLabel.value} — Produk Lainnya`,
  description: () =>
    `${currentLabel.value} berkualitas untuk kebutuhan industri. Tersedia dari BBS Conveyor.`,
})
</script>

<template>
  <div v-if="productErr" class="container-tech py-12">
    <div class="rounded-none border border-red-200 bg-red-50 px-6 py-8 text-center">
      <p class="text-sm font-semibold text-red-700">Gagal memuat produk.</p>
      <p class="mt-1 text-[13px] text-red-600">Tidak dapat menghubungi server.</p>
      <button @click="() => refreshNuxtData(`produk-lainnya-${subcat}`)" class="mt-4 cursor-pointer rounded-none bg-accent px-5 py-2 text-[13px] font-semibold text-white border-none">Coba Lagi</button>
    </div>
  </div>

  <div v-else-if="isValid">
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
      <UiButton href="/produk/lainnya" variant="ghost">Kembali ke Produk Lainnya <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></UiButton>
    </div>
  </div>
</template>
