<script setup lang="ts">
// Wordmark: BBS(⚙) — bold sans + gear glyph in parens, voidzero VOID(0) style.
withDefaults(defineProps<{ to?: string; invert?: boolean }>(), { to: '/', invert: false })
</script>

<template>
  <NuxtLink
    :to="to"
    class="flex shrink-0 items-baseline font-semibold tracking-tight"
    :class="invert ? 'text-white' : 'text-ink'"
    aria-label="BBS Conveyor — Beranda"
  >
    <span class="text-[17px]">BBS</span>
    <span class="text-[17px]">(</span>
    <svg
      viewBox="0 0 24 24"
      class="h-[13px] w-[13px] self-center"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <path d="M12 1.8v3M12 19.2v3M1.8 12h3M19.2 12h3M4.8 4.8l2.1 2.1M17.1 17.1l2.1 2.1M19.2 4.8l-2.1 2.1M6.9 17.1l-2.1 2.1" stroke-linecap="round" />
    </svg>
    <span class="text-[17px]">)</span>
  </NuxtLink>
</template>
