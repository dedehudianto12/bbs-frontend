<script setup lang="ts">
// Industrial blueprint tile — a light concrete/paper panel with a faint
// graph-paper grid, a technical conveyor line-drawing, and a single orange
// dimension accent. Replaces the old violet "light ray" glow panel and stands
// in for product photography across the site. When a slot is provided
// (e.g. a ProductDiagram), the default motif steps aside for it.
const props = withDefaults(defineProps<{
  index?: number
  rounded?: string
  grain?: boolean
}>(), {
  index: 0,
  rounded: 'rounded-lg',
  grain: true,
})

const slots = useSlots()

// index selects the technical motif drawn behind the panel
const MOTIFS = ['belt', 'roller', 'joint'] as const
const motif = computed(() => {
  const n = ((props.index % MOTIFS.length) + MOTIFS.length) % MOTIFS.length
  return MOTIFS[n]
})
</script>

<template>
  <div
    class="relative isolate overflow-hidden border border-line bg-paper-soft"
    :class="rounded"
  >
    <!-- concrete base wash -->
    <div
      class="absolute inset-0"
      style="background-image: linear-gradient(135deg, rgb(var(--paper-soft)) 0%, rgb(var(--paper)) 100%)"
      aria-hidden="true"
    />
    <!-- blueprint grid -->
    <div class="blueprint-grid absolute inset-0 opacity-70" aria-hidden="true" />

    <!-- default technical line-drawing (hidden when a slot overrides) -->
    <svg
      v-if="!slots.default"
      viewBox="0 0 400 300"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      preserveAspectRatio="xMidYMid meet"
      class="absolute inset-0 h-full w-full p-7 text-ink/20"
      aria-hidden="true"
    >
      <template v-if="motif === 'belt'">
        <!-- belt loop over head + tail pulley, side view -->
        <rect x="60" y="118" width="280" height="66" rx="33" />
        <circle cx="93" cy="151" r="20" />
        <circle cx="307" cy="151" r="20" />
        <circle cx="93" cy="151" r="3" fill="currentColor" stroke="none" />
        <circle cx="307" cy="151" r="3" fill="currentColor" stroke="none" />
        <path d="M150 118v-14h28v14M232 118v-20h22v20" opacity="0.65" />
        <!-- orange dimension line -->
        <path d="M60 208v10M340 208v10M60 213h280" class="text-accent" stroke="currentColor" stroke-dasharray="4 5" />
      </template>
      <template v-else-if="motif === 'roller'">
        <!-- idler roller on frame, front view -->
        <rect x="104" y="104" width="192" height="52" rx="26" />
        <path d="M104 130h-26M296 130h26" />
        <path d="M132 156v66M268 156v66M98 222h204" />
        <path d="M132 194h136" opacity="0.6" />
        <path d="M74 130h252" class="text-accent" stroke="currentColor" stroke-dasharray="3 6" />
      </template>
      <template v-else>
        <!-- belt joint / fastener close-up -->
        <path d="M46 130h128v40H46M354 130H232v40h122" />
        <path d="M188 120v60M212 120v60" opacity="0.7" />
        <circle cx="200" cy="142" r="4" fill="currentColor" stroke="none" />
        <circle cx="200" cy="158" r="4" fill="currentColor" stroke="none" />
        <path d="M46 210h308" class="text-accent" stroke="currentColor" stroke-dasharray="4 6" />
      </template>
    </svg>

    <!-- corner spec tick -->
    <span
      v-if="!slots.default"
      class="absolute left-3 top-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/70"
      aria-hidden="true"
    >
      <span class="h-2 w-2 border-l-2 border-t-2 border-accent" />
      REF
    </span>

    <!-- optional concrete grain -->
    <div
      v-if="grain"
      class="pointer-events-none absolute inset-0 bg-grain opacity-[0.18] mix-blend-multiply"
      aria-hidden="true"
    />

    <slot />
  </div>
</template>
