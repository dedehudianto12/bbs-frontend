<script setup lang="ts">
const router = useRouter()
const { get } = useApi()

const { data: productRes, error: productErr } = await useAsyncData('produk-lainnya', () =>
  get<any[]>('/produk', { group: 'lainnya' })
)

const products = computed(() =>
  (productRes.value?.data ?? []).map((p: any) => ({
    slug: p.slug,
    title: p.name,
    category: p.category,
    description: p.description,
    image: p.image ?? null,
  }))
)

if (import.meta.client) {
  onMounted(() => {
    if (!productRes.value?.data?.length) refreshNuxtData('produk-lainnya')
  })
}

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

    <div v-if="productErr" class="container-tech py-12">
      <div class="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center">
        <p class="text-sm font-semibold text-red-700">Gagal memuat produk.</p>
        <p class="mt-1 text-[13px] text-red-600">Tidak dapat menghubungi server.</p>
        <button @click="() => refreshNuxtData('produk-lainnya')" class="mt-4 cursor-pointer rounded-md bg-accent px-5 py-2 text-[13px] font-semibold text-white border-none">Coba Lagi</button>
      </div>
    </div>

    <div v-else class="container-tech py-16 md:py-24">
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
