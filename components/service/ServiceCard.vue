<script setup lang="ts">
import type { Service } from '~/types/service'

defineProps<{ service: Service }>()
</script>

<template>
  <NuxtLink :to="`/jasa/${service.slug}`" class="group block bg-white border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
    <div class="aspect-[4/3] bg-bg-soft flex items-center justify-center text-neutral text-sm">
      {{ service.name }}
    </div>
    <div class="p-4">
      <span class="text-xs text-gold-dark font-medium uppercase tracking-wide">Jasa</span>
      <h3 class="mt-1 font-semibold text-ink group-hover:text-gold-dark transition-colors">{{ service.name }}</h3>
      <p class="mt-2 text-sm text-neutral line-clamp-3">{{ service.shortDescription }}</p>
    </div>
  </NuxtLink>
</template>
