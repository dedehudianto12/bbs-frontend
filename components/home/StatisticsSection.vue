<script setup lang="ts">
defineProps<{
  items: { label: string; value: string }[]
}>()
</script>

<template>
  <section class="py-16 md:py-24 bg-ink text-white">
    <div class="mx-auto max-w-6xl px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div v-for="item in items" :key="item.label" class="group">
          <p class="text-3xl md:text-4xl font-bold text-gold tracking-tight">{{ item.value }}</p>
          <p class="mt-2 text-sm text-white/60">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
