<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  invert?: boolean
}>(), {
  align: 'left',
})
</script>

<template>
  <div :class="['max-w-2xl', align === 'center' ? 'mx-auto text-center' : '']">
    <p
      v-if="eyebrow"
      class="eyebrow mb-4"
      :class="[invert ? 'text-white/40' : 'text-muted', align === 'center' ? 'justify-center' : '']"
    >
      {{ eyebrow }}
    </p>
    <h2
      class="display text-3xl md:text-[2.5rem]"
      :class="invert ? 'text-white' : 'text-ink'"
    >
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="mt-4 text-base leading-relaxed"
      :class="invert ? 'text-white/55' : 'text-muted'"
    >
      {{ description }}
    </p>
  </div>
</template>
