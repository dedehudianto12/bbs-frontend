<script setup lang="ts">
import { getSlugs } from '~/types/category'

const route = useRoute()
const router = useRouter()
const kategori = route.params.kategori as string

const { getByKategori } = useProducts()
const { getByGroup: getKategoriByGroup } = useKategori()

const kategoriList = getKategoriByGroup('lainnya')
const validKategoris = getSlugs(kategoriList)
const isValid = validKategoris.includes(kategori)

const products = computed(() => (isValid ? getByKategori('lainnya', kategori) : []))

function onFilterChange(newKategori: string) {
  router.push(`/produk/lainnya/${newKategori}`)
}

const filterOptions = kategoriList.map((k) => ({ label: k.label, value: k.slug }))

const currentLabel = computed(() => {
  const match = kategoriList.find((k) => k.slug === kategori)
  return match?.label ?? kategori
})

useSeoMeta({
  title: `${currentLabel.value} — Produk Lainnya — BBS Conveyor`,
  description: `${currentLabel.value} berkualitas untuk kebutuhan industri. Tersedia berbagai spesifikasi dari BBS Conveyor.`
})
</script>

<template>
  <div v-if="isValid" class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-ink mb-2">{{ currentLabel }}</h1>
    <p class="text-neutral mb-8">Produk Lainnya kategori {{ currentLabel }}.</p>

    <ProductFilter
      :model-value="kategori"
      :options="filterOptions"
      class="mb-8"
      @update:model-value="onFilterChange"
    />

    <ProductGrid :products="products" />
  </div>

  <div v-else class="max-w-6xl mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-bold text-ink mb-4">Kategori Tidak Ditemukan</h1>
    <p class="text-neutral mb-8">Kategori produk lainnya "{{ kategori }}" tidak tersedia.</p>
    <NuxtLink to="/produk/lainnya" class="text-gold-dark hover:text-gold font-medium transition-colors">
      ← Kembali ke Produk Lainnya
    </NuxtLink>
  </div>
</template>
