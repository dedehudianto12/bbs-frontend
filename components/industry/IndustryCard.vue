<script setup lang="ts">
defineProps<{
  slug: string
  title: string
  description?: string | null
  icon?: string | null
}>()
</script>

<template>
  <div class="group flex flex-col rounded-2xl border border-line bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-ink/5">
    <span class="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path d="M3 21h18M4 21V8l6-4v17M14 21V4l6 4v13M8 9h.01M8 13h.01M8 17h.01M17 9h.01M17 13h.01" stroke-linecap="round" />
      </svg>
    </span>
    <h3 class="mt-5 font-semibold text-ink">{{ title }}</h3>
    <p v-if="description" class="mt-2 text-sm leading-relaxed text-muted">{{ description }}</p>
  </div>
</template>
