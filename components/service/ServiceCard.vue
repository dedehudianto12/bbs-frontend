<script setup lang="ts">
defineProps<{
  slug: string
  title: string
  description?: string | null
}>()
</script>

<template>
  <NuxtLink
    :to="`/jasa/${slug}`"
    class="group block bg-white border border-border rounded-xl overflow-hidden hover:shadow-sm hover:border-gold/30 transition-all duration-200"
  >
    <div class="aspect-[4/3] bg-bg-soft flex items-center justify-center overflow-hidden">
      <div class="text-center text-neutral/30">
        <svg class="w-10 h-10 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      </div>
    </div>
    <div class="p-5">
      <span class="text-xs font-medium text-gold-dark bg-gold/10 px-2 py-0.5 rounded-full">Jasa</span>
      <h3 class="mt-2 font-semibold text-ink group-hover:text-gold-dark transition-colors line-clamp-2 leading-snug">
        {{ title }}
      </h3>
      <p v-if="description" class="mt-2 text-sm text-neutral line-clamp-3">{{ description }}</p>
    </div>
  </NuxtLink>
</template>
