<script setup lang="ts">
const router = useRouter()
const { getByGroup: getProductsByGroup } = useProducts()
const { getByGroup: getKategoriByGroup } = useKategori()

const kategoriList = getKategoriByGroup('belt-conveyor')
const filterOptions = kategoriList.map((k) => ({ label: k.label, value: k.slug }))
const products = getProductsByGroup('belt-conveyor')

function onFilterChange(kategori: string) {
  router.push(`/produk/belt-conveyor/${kategori}`)
}

useSeoMeta({
  title: 'Belt Conveyor — BBS Conveyor',
  description: 'PVC Belt, PU, Flat Belt, dan Rubber Belt berkualitas untuk kebutuhan industri Anda. Tersedia berbagai ukuran dan spesifikasi.'
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-ink mb-2">Belt Conveyor</h1>
    <p class="text-neutral mb-8">Pilih dari berbagai jenis belt conveyor untuk aplikasi industri Anda.</p>

    <ProductFilter
      model-value=""
      :options="filterOptions"
      class="mb-8"
      @update:model-value="onFilterChange"
    />

    <ProductGrid :products="products" />
  </div>
</template>
