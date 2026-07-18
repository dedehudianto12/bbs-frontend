<script setup lang="ts">
import type { Product } from '~/types/product'

definePageMeta({ middleware: ['admin-auth'] })

const { add } = useProducts()
const { getByGroup: getKategoriByGroup } = useKategori()
const router = useRouter()
const toast = ref('')

function onSubmit(data: Omit<Product, 'id' | 'slug' | 'category'>) {
  const kategoriLabel = getKategoriByGroup(data.group).find((k) => k.slug === data.kategori)?.label ?? data.kategori

  add({ ...data, category: kategoriLabel })
  toast.value = `Produk "${data.name}" berhasil ditambahkan.`
  setTimeout(() => router.push('/admin/produk'), 1000)
}
</script>

<template>
  <div>
    <div
      v-if="toast"
      class="mb-4 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800"
    >
      {{ toast }}
    </div>

    <h1 class="text-xl font-semibold text-neutral-900 mb-6">Tambah Produk</h1>

    <div class="max-w-2xl">
      <ProductForm mode="create" @submit="onSubmit" />
    </div>
  </div>
</template>
