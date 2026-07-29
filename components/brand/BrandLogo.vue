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
    <img
      src="/bbs-logo.svg"
      alt="BBS Conveyor"
      class="h-8 w-auto"
    />
  </NuxtLink>
</template>
