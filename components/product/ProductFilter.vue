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
  <!-- Hard tabs, not pills. Borders collapse into shared 1px hairlines via
       -ml-px so the row reads as one machined control strip rather than a set
       of floating capsules. Category switching is a frequent action, so the
       colour change is fast (120ms) and there is no entrance animation. -->
  <div class="flex flex-wrap">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="filter-tab relative -ml-px border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] first:ml-0"
      :class="modelValue === opt.value
        ? 'z-10 border-accent bg-accent text-white'
        : 'border-line bg-white text-muted hover:border-ink/40 hover:text-ink'"
      :aria-pressed="modelValue === opt.value"
      @click="$emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<style scoped>
.filter-tab {
  transition:
    background-color 120ms ease,
    border-color 120ms ease,
    color 120ms ease;
}
/* Hard 1px inset shift on press — a physical key travel rather than a scale,
   which would break the shared-hairline alignment of the strip. */
.filter-tab:active {
  background-color: rgb(var(--paper-soft));
}
</style>
