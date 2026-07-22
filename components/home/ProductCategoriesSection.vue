<script setup lang="ts">
defineProps<{
  categories: string[]
}>()
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="mx-auto max-w-6xl px-4">
      <span class="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
        Kategori Produk
      </span>

      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="cat in categories"
          :key="cat"
          class="group cursor-pointer"
        >
          <div class="aspect-[4/3] bg-bg-soft rounded-lg" />
          <p class="mt-3 text-ink font-medium text-center">{{ cat }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
