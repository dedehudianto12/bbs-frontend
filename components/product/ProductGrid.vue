<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{ products: Product[] }>()
</script>

<template>
  <div v-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
  <p v-else class="text-neutral text-center py-12">Tidak ada produk ditemukan.</p>
</template>
