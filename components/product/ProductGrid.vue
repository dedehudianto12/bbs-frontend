<script setup lang="ts">
defineProps<{
  products: { slug: string; title: string; category: string; description: string; image?: string | null }[]
}>()
</script>

<template>
  <div v-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProductCard v-for="product in products" :key="product.slug" v-bind="product" />
  </div>
  <p v-else class="text-neutral text-center py-12">Tidak ada produk ditemukan.</p>
</template>
