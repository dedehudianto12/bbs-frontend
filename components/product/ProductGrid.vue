<script setup lang="ts">
defineProps<{
  products: { slug: string; title: string; category: string; description: string; image?: string | null }[]
}>()
</script>

<template>
  <div v-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- #4 — cards fade up with a short stagger when the grid (re)mounts,
         which covers both first paint and filter-driven list changes -->
    <div
      v-for="(product, i) in products"
      :key="product.slug"
      class="animate-fade-up-fast motion-reduce:animate-none"
      :style="{ animationDelay: `${Math.min(i, 8) * 40}ms` }"
    >
      <ProductCard v-bind="product" />
    </div>
  </div>
  <p v-else class="rounded-xl border border-dashed border-line py-16 text-center text-sm text-muted">Tidak ada produk ditemukan.</p>
</template>
