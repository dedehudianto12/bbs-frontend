<script setup lang="ts">
// Generic content skeleton — pulsing placeholder blocks for API-driven sections.
// Used while client-side refetch resolves after a failed SSR payload.
defineProps<{ sections?: number }>()
</script>

<template>
  <div class="container-tech py-16 animate-pulse" aria-busy="true" aria-label="Memuat konten...">
    <div v-for="i in (sections ?? 1)" :key="i" class="mb-16 last:mb-0">
      <!-- section eyebrow -->
      <div class="mb-3 h-3 w-20 rounded-none bg-ink/10" />
      <!-- section heading -->
      <div class="mb-2 h-7 w-56 rounded-none bg-ink/10" />
      <!-- section description -->
      <div class="mb-8 h-4 w-80 rounded-none bg-ink/10" />
      <!-- card grid -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="j in 3" :key="j" class="h-44 rounded-none bg-ink/5" />
      </div>
    </div>
  </div>
</template>
