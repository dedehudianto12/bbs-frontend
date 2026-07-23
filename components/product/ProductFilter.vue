<script setup lang="ts">
defineProps<{
  options: { label: string; value: string }[]
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="opt in options"
      :key="opt.value"
      class="rounded-md border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors"
      :class="modelValue === opt.value
        ? 'border-accent bg-accent text-white'
        : 'border-line bg-white text-muted hover:border-ink/30 hover:text-ink'"
      @click="$emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>
