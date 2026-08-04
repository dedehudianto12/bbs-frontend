<script setup lang="ts">
withDefaults(defineProps<{ to?: string; invert?: boolean }>(), { to: '/', invert: false })
</script>

<template>
  <NuxtLink
    :to="to"
    class="flex shrink-0 items-center"
    :class="invert ? 'brightness-0 invert' : ''"
    aria-label="BBS Conveyor — Beranda"
  >
    <!-- Intrinsic size reserves the box before the SVG arrives; without it the
         navbar reflowed on first paint. The link already carries the accessible
         name, so the image itself is decorative here. -->
    <img
      src="/bbs-logo.svg"
      alt=""
      width="120"
      height="32"
      class="h-8 w-auto"
    />
  </NuxtLink>
</template>
