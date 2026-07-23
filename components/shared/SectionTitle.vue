<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div :class="['max-w-2xl', align === 'center' ? 'mx-auto text-center' : '']">
    <span v-if="eyebrow" class="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">
      {{ eyebrow }}
    </span>
    <h2 class="text-2xl md:text-3xl font-bold text-ink tracking-tight">{{ title }}</h2>
    <p v-if="description" class="mt-4 text-neutral leading-relaxed">{{ description }}</p>
  </div>
</template>
