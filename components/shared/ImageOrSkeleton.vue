<script setup lang="ts">
// Image with GradientPanel fallback (retains original design when no image).
defineProps<{
  src?: string | null
  alt?: string
  aspect?: string
  rounded?: string
  fit?: string
  fallbackIndex?: number
}>()
</script>

<template>
  <div
    v-if="src"
    :class="[aspect ?? 'aspect-[4/3]', rounded ?? 'rounded-none', 'relative overflow-hidden bg-paper-soft w-full']"
  >
    <img
      :src="src"
      :alt="alt ?? ''"
      :class="['absolute inset-0 w-full h-full', fit ?? 'object-contain']"
    />
  </div>
  <GradientPanel
    v-else
    :index="fallbackIndex ?? 0"
    :rounded="rounded ?? 'rounded-none'"
    :class="aspect ?? 'aspect-[4/3]'"
    class="w-full"
  />
</template>
