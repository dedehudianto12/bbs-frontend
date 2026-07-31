<script setup lang="ts">
// Pictograms for the four company values, drawn on the same 24px grid and the
// same 1.8 stroke as ProductIcon and BrandMark. Deliberately hand-drawn rather
// than pulled from an icon set: @lucide/vue is already a dependency, but its
// rounded 2px house style is a different drawing language, and mixing two
// languages in one page is exactly the kind of 1px inconsistency that compounds.
//
// Keyed by value slug; an unknown name renders nothing rather than a wrong
// picture, since a placeholder icon is worse than no icon.
type Triple = [number, number, number]
interface Icon {
  paths?: string[]
  rings?: Triple[]
  dots?: Triple[]
}

const props = withDefaults(defineProps<{ name?: string }>(), { name: '' })

const ICONS: Record<string, Icon> = {
  // shield with a check — branded, quality-assured stock
  mutu: {
    paths: [
      'M12 3.2 19 6v5.6c0 4.1-2.8 7.2-7 8.2-4.2-1-7-4.1-7-8.2V6l7-2.8Z',
      'M9.1 12.1l2.1 2.1 3.8-4.1',
    ],
  },
  // price tag — competitive pricing
  harga: {
    paths: [
      'M3.9 12.4 12.3 4h7.4v7.4l-8.4 8.4a1.3 1.3 0 0 1-1.9 0l-5.5-5.5a1.3 1.3 0 0 1 0-1.9Z',
    ],
    dots: [[16.1, 7.9, 1.15]],
  },
  // certificate with a check — guaranteed splicing and installation
  garansi: {
    paths: [
      'M6.2 3.4h8.2l4.2 4.1v13.1H6.2Z',
      'M14.2 3.6v4h4',
      'M9.3 13.6l2 2 3.8-4',
    ],
  },
  // stopwatch — response measured in hours
  respons: {
    paths: ['M12 6.6V3.7', 'M9.7 3.5h4.6', 'M12 13.6V10'],
    rings: [[12, 13.6, 6.6]],
  },
}

const icon = computed<Icon | null>(() => ICONS[props.name] ?? null)
</script>

<template>
  <svg
    v-if="icon"
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
