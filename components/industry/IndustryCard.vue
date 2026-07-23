<script setup lang="ts">
defineProps<{
  slug: string
  title: string
  description?: string | null
  icon?: string | null
}>()
</script>

<template>
  <div class="flex flex-col p-6 rounded-xl bg-white border border-border">
    <div class="w-10 h-10 rounded-lg bg-bg-soft flex items-center justify-center text-gold mb-4">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    </div>
    <h3 class="text-ink font-bold">{{ title }}</h3>
    <p v-if="description" class="mt-2 text-neutral text-sm leading-relaxed">{{ description }}</p>
  </div>
</template>
