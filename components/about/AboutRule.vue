<script setup lang="ts">
// The section rule that runs the length of the Tentang Kami page.
//
// A number on the left, a hairline across the gap, a label on the right —
// the header a technical document gives its sections. It exists because this
// page is built as a document rather than as a stack of marketing bands, and a
// document needs one repeating structural mark to hold it together. Six of
// these are the page's spine.
//
// Deliberately not SectionTitle: that component centres an eyebrow over a
// heading over a description, which is the shape every other page on the site
// already uses. Reusing it here would have made the redesign a reshuffle.
defineProps<{
  /** Two digits, mono. Sequence position, not a count of anything. */
  num: string
  label: string
}>()
</script>

<template>
  <div class="flex items-center gap-4 md:gap-6">
    <span class="num shrink-0 text-[13px] font-semibold text-ink">{{ num }}</span>
    <!-- The rule carries the eye from the number to the label. Ink at 18%
         rather than --line: this mark is structural and has to read as
         deliberate at a glance, where the border hairline is meant to
         disappear. -->
    <span class="h-px flex-1 bg-ink/[0.18]" aria-hidden="true" />
    <span class="spec-key shrink-0">{{ label }}</span>
  </div>
</template>
