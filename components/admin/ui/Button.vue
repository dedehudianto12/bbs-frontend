<script setup lang="ts">
import { cn } from '@/lib/utils'

withDefaults(defineProps<{
  variant?: 'default' | 'outline' | 'destructive'
  class?: string
}>(), {
  variant: 'default',
})

const variantClasses: Record<string, string> = {
  default: 'bg-neutral-800 text-white hover:bg-neutral-700 shadow-sm',
  outline: 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 shadow-sm',
  destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
}
</script>

<template>
  <button
    :class="cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2',
      variantClasses[variant],
      $props.class,
    )"
  >
    <slot />
  </button>
</template>
