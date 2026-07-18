<script setup lang="ts">
const router = useRouter()
const { getByGroup: getProductsByGroup } = useProducts()
const { getByGroup: getKategoriByGroup } = useKategori()

const kategoriList = getKategoriByGroup('lainnya')
const filterOptions = kategoriList.map((k) => ({ label: k.label, value: k.slug }))
const products = getProductsByGroup('lainnya')

function onFilterChange(kategori: string) {
  router.push(`/produk/lainnya/${kategori}`)
}

useSeoMeta({
  title: 'Produk Lainnya — BBS Conveyor',
  description: 'Timing Belt, Fastener, Cleat, Gravity Roll, dan komponen conveyor pendukung berkualitas untuk industri Anda.'
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-ink mb-2">Produk Lainnya</h1>
    <p class="text-neutral mb-8">Komponen conveyor pendukung untuk melengkapi sistem material handling Anda.</p>

    <ProductFilter
      model-value=""
      :options="filterOptions"
      class="mb-8"
      @update:model-value="onFilterChange"
    />

    <ProductGrid :products="products" />
  </div>
</template>
