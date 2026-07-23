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
      class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      :class="modelValue === opt.value
        ? 'bg-ink text-white'
        : 'bg-bg-soft text-neutral hover:bg-border'"
      @click="$emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>
