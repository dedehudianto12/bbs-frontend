<script setup lang="ts">
// Literal product pictograms — 24px grid, currentColor stroke, same line
// weight as BrandMark. Keyed by category slug ('pvc-belt', 'pu', …); unknown
// names fall back to the generic part icon.
type Triple = [number, number, number]
interface Icon {
  paths?: string[]
  rings?: Triple[] // stroked circles [cx, cy, r]
  dots?: Triple[] // filled circles [cx, cy, r]
}

const props = withDefaults(defineProps<{ name?: string }>(), { name: 'generic' })

const ICONS: Record<string, Icon> = {
  // wavy top + bottom cover — flexible PVC belt
  'pvc-belt': { paths: ['M3 8.5c3-3 6 3 9 0s6-3 9 0', 'M3 15.5c3-3 6 3 9 0s6-3 9 0'] },
  // wave over a smooth base — PU hygienic surface
  pu: { paths: ['M3 9c3-3 6 3 9 0s6-3 9 0', 'M3 15.5h18'] },
  // two parallel runs — flat transmission belt
  'flat-belt': { paths: ['M3 9h18', 'M3 15h18'] },
  // carcass with ply line — heavy rubber belt
  'rubber-belt': {
    paths: [
      'M4.5 6.5h15a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z',
      'M2.5 12h19',
    ],
  },
  // toothed profile — timing belt
  'timing-belt': { paths: ['M3 8.5h18M3 16.5h18', 'M6 8.5v4M10 8.5v4M14 8.5v4M18 8.5v4'] },
  // two belt ends bridged by a clip plate
  fastener: { paths: ['M2.5 12h6M15.5 12h6', 'M9.5 15.5v-7h5v7'], dots: [[12, 12, 1.2]] },
  // incline with cleat stubs
  cleat: {
    paths: ['M2.5 18.5h19', 'M4 17.5 19.5 8.5', 'M10.2 13.9l-1.7-2.9', 'M14.9 11.2l-1.7-2.9'],
  },
  // roller over a frame line
  'gravity-roll': { paths: ['M4 20.5h16'], rings: [[12, 11, 7]], dots: [[12, 11, 1.6]] },
  // generic component
  generic: { paths: ['M4.5 4.5h15v15h-15Z'], dots: [[12, 12, 2]] },
}

const icon = computed(() => ICONS[props.name] ?? ICONS.generic)
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(d, i) in icon.paths ?? []" :key="`p${i}`" :d="d" />
    <circle v-for="([cx, cy, r], i) in icon.rings ?? []" :key="`r${i}`" :cx="cx" :cy="cy" :r="r" />
    <circle
      v-for="([cx, cy, r], i) in icon.dots ?? []"
      :key="`d${i}`"
      :cx="cx"
      :cy="cy"
      :r="r"
      fill="currentColor"
      stroke="none"
    />
  </svg>
</template>
