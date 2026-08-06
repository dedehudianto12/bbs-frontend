<script setup lang="ts">
// App-icon badge: black rounded square with the BBS gear-belt glyph.
// Sits centered on the footer gradient banner (voidzero footer-logo analog).
//
// `size` takes a number of px or any CSS length, so the one call site can hand
// it a clamp() and let the badge scale with the viewport instead of stepping at
// a breakpoint. Kept as a prop rather than a class because the value lands on
// width/height inline, and an inline style would win against a utility anyway.
const props = withDefaults(defineProps<{
  size?: number | string
}>(), {
  size: 64,
})

const length = computed(() =>
  typeof props.size === 'number' ? `${props.size}px` : props.size,
)
</script>

<template>
  <div
    class="grid place-items-center rounded-[22%] bg-[#26282c] shadow-2xl shadow-black/40 ring-1 ring-white/25"
    :style="{ width: length, height: length }"
    aria-label="BBS Conveyor"
    role="img"
  >
    <svg viewBox="0 0 24 24" class="h-[52%] w-[52%]" fill="none" aria-hidden="true">
      <!-- belt loop -->
      <rect x="2.5" y="8" width="19" height="8" rx="4" stroke="#fff" stroke-width="1.6" />
      <!-- Ambient belt travel: gold dash segments crawl the loop (perimeter
           47.1 = 6 × dash period 7.85, so the cycle tiles cleanly); static
           under prefers-reduced-motion.
           Speed is set in tailwind.config.ts and is a function of how large
           this renders — see the note on the `belt-travel` animation there. -->
      <rect
        x="2.5" y="8" width="19" height="8" rx="4"
        stroke="rgb(var(--accent))" stroke-width="1.6" stroke-dasharray="2 5.85"
        class="animate-belt-travel motion-reduce:animate-none"
      />
      <!-- rollers -->
      <circle cx="7.5" cy="12" r="1.6" fill="rgb(var(--accent))" />
      <circle cx="16.5" cy="12" r="1.6" fill="rgb(var(--accent))" />
      <!-- motion ticks -->
      <path d="M10.6 12h2.8" stroke="#fff" stroke-width="1.3" stroke-linecap="round" />
    </svg>
  </div>
</template>
