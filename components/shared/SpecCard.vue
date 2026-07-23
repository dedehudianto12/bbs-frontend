<script setup lang="ts">
// Datasheet spec plate — a white cut-sheet with a hairline border overlaid on
// the blueprint product panel. Each line = prefix glyph + text, both with
// optional color classes. Sans + tabular figures; no monospace.
defineProps<{
  lines: { pre: string; preClass?: string; text: string; textClass?: string }[]
}>()
</script>

<template>
  <div class="rounded-lg border border-line bg-white/95 p-5 text-[12.5px] leading-[2] tabular-nums shadow-xl shadow-ink/10 backdrop-blur-sm">
    <div
      v-for="(line, i) in lines"
      :key="i"
      class="flex items-baseline gap-2.5 overflow-hidden whitespace-nowrap"
    >
      <span class="w-3 shrink-0 text-center" :class="line.preClass ?? 'text-muted'">{{ line.pre }}</span>
      <span :class="line.textClass ?? 'text-ink/75'">{{ line.text }}</span>
    </div>
  </div>
</template>
