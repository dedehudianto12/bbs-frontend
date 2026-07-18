<script setup lang="ts">
const { items } = useGallery()

useSeoMeta({
  title: 'Galeri Proyek — BBS Conveyor',
  description: 'Dokumentasi proyek instalasi belt conveyor, roller, dan jasa onsite joint oleh BBS Conveyor di berbagai kota di Indonesia.'
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-ink mb-2">Galeri Proyek Kami</h1>
    <p class="text-neutral mb-8">Dokumentasi hasil kerja kami di berbagai proyek dan lokasi di Indonesia.</p>

    <div v-if="items.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in items" :key="item.id" class="group">
        <div class="aspect-[4/3] bg-bg-soft rounded-lg" />
        <p class="mt-2 text-sm text-neutral leading-snug">{{ item.caption }}</p>
      </div>
    </div>

    <p v-else class="text-neutral text-center py-12">Belum ada foto proyek.</p>
  </div>
</template>
