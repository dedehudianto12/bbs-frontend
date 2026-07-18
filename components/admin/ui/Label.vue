<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Label as RekaLabel } from 'reka-ui'

defineProps<{ class?: string }>()
</script>

<template>
  <RekaLabel
    :class="cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', $props.class)"
  >
    <slot />
  </RekaLabel>
</template>
