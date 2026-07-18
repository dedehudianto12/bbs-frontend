<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{ product: Product }>()
</script>

<template>
  <NuxtLink :to="`/produk/${product.slug}`" class="group block bg-white border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
    <div class="aspect-[4/3] bg-bg-soft flex items-center justify-center text-neutral text-sm">
      {{ product.name }}
    </div>
    <div class="p-4">
      <span class="text-xs text-gold-dark font-medium uppercase tracking-wide">{{ product.category }}</span>
      <h3 class="mt-1 font-semibold text-ink group-hover:text-gold-dark transition-colors line-clamp-2">{{ product.name }}</h3>
      <p class="mt-2 text-sm text-neutral line-clamp-2">{{ product.description }}</p>
    </div>
  </NuxtLink>
</template>
