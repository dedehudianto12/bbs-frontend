<script setup lang="ts">
// App-icon badge: black rounded square with the BBS gear-belt glyph.
// Sits centered on the footer gradient banner (voidzero footer-logo analog).
withDefaults(defineProps<{
  size?: number
}>(), {
  size: 64,
})
</script>

<template>
  <div
    class="grid place-items-center rounded-[22%] bg-[#26282c] shadow-2xl shadow-black/40 ring-1 ring-white/25"
    :style="{ width: `${size}px`, height: `${size}px` }"
    aria-label="BBS Conveyor"
    role="img"
  >
    <svg viewBox="0 0 24 24" class="h-[52%] w-[52%]" fill="none" aria-hidden="true">
      <!-- belt loop -->
      <rect x="2.5" y="8" width="19" height="8" rx="4" stroke="#fff" stroke-width="1.6" />
      <!-- #6 — ambient belt travel: jade dash segments crawl the loop
           (perimeter 47.1 = 6 × dash period 7.85, so the cycle tiles
           cleanly); static under prefers-reduced-motion -->
      <rect
        x="2.5" y="8" width="19" height="8" rx="4"
        stroke="rgb(228 87 27)" stroke-width="1.6" stroke-dasharray="2 5.85"
        opacity="0.9" class="animate-belt-travel motion-reduce:animate-none"
      />
      <!-- rollers -->
      <circle cx="7.5" cy="12" r="1.6" fill="rgb(228 87 27)" />
      <circle cx="16.5" cy="12" r="1.6" fill="rgb(228 87 27)" />
      <!-- motion ticks -->
      <path d="M10.6 12h2.8" stroke="#fff" stroke-width="1.3" stroke-linecap="round" />
    </svg>
  </div>
</template>
