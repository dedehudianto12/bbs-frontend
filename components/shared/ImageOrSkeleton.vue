<script setup lang="ts">
// Image with GradientPanel fallback (retains original design when no image).
defineProps<{
  src?: string | null
  alt?: string
  aspect?: string
  rounded?: string
  fallbackIndex?: number
}>()
</script>

<template>
  <img
    v-if="src"
    :src="src"
    :alt="alt ?? ''"
    :class="[aspect ?? 'aspect-[4/3]', rounded ?? 'rounded-lg', 'w-full object-cover']"
  />
  <GradientPanel
    v-else
    :index="fallbackIndex ?? 0"
    :rounded="rounded ?? 'rounded-lg'"
    :class="aspect ?? 'aspect-[4/3]'"
    class="w-full"
  />
</template>
