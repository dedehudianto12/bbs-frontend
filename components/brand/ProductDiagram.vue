<script setup lang="ts">
// Line-drawn technical diagrams overlaid on GradientPanel art — a belt side
// view, a roller-on-frame front view, or a fastener joint close-up. Draws in
// currentColor; the parent sets intensity with a text-white/N class.
withDefaults(defineProps<{ family?: 'belt' | 'roller' | 'joint' }>(), { family: 'belt' })
</script>

<template>
  <svg
    viewBox="0 0 400 300"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <template v-if="family === 'belt'">
      <!-- belt loop over head + tail pulley, side view -->
      <rect x="60" y="112" width="280" height="76" rx="38" />
      <circle cx="98" cy="150" r="22" />
      <circle cx="302" cy="150" r="22" />
      <circle cx="98" cy="150" r="3" fill="currentColor" stroke="none" />
      <circle cx="302" cy="150" r="3" fill="currentColor" stroke="none" />
      <!-- travel direction -->
      <path d="M172 84h56m0 0-8-6m8 6-8 6" />
      <!-- carried load -->
      <path d="M150 112v-14h28v14M236 112v-20h22v20" opacity="0.7" />
      <!-- dimension line -->
      <path d="M60 216v10M340 216v10M60 221h280" stroke-dasharray="4 5" opacity="0.6" />
    </template>

    <template v-else-if="family === 'roller'">
      <!-- roller on frame, front view -->
      <rect x="104" y="96" width="192" height="56" rx="28" />
      <path d="M104 124h-24M296 124h24" />
      <path d="M74 124h252" stroke-dasharray="3 6" opacity="0.5" />
      <path d="M132 152v70M268 152v70M96 222h208" />
      <path d="M132 192h136" opacity="0.6" />
    </template>

    <template v-else>
      <!-- belt joint / fastener close-up -->
      <path d="M40 128h130v44H40M360 128H230v44h130" />
      <path d="M186 116v68M214 116v68" opacity="0.7" />
      <path d="M186 116h28M186 184h28" />
      <circle cx="200" cy="140" r="4" fill="currentColor" stroke="none" />
      <circle cx="200" cy="160" r="4" fill="currentColor" stroke="none" />
      <path d="M40 214h320" stroke-dasharray="4 6" opacity="0.4" />
    </template>
  </svg>
</template>
