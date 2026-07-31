<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    headline: string
    /** Substrings of `headline` to render in logo gold. */
    highlights?: string[]
    subheadline: string
    primaryCTA: string
    primaryLink: string
    /** Renders the WhatsApp glyph inside the primary CTA. */
    primaryWhatsApp?: boolean
    secondaryCTA?: string
    secondaryLink?: string
  }>(),
  { highlights: () => [], primaryWhatsApp: false },
)

// Split the headline so chosen words render in logo gold (partial-word
// highlight). Case-insensitive, longest phrases first.
//
// The phrases used to be a HIGHLIGHTS const right here, hardcoded to
// ['Bisnis Anda', 'Conveyor'] — so editing the headline in data/homepage.ts
// silently dropped the gold with nothing to warn you. They now travel with the
// copy they annotate.
const headlineParts = computed(() => {
  let parts: { text: string; hl: boolean }[] = [{ text: props.headline, hl: false }]
  for (const phrase of props.highlights) {
    const re = new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i')
    parts = parts.flatMap((p) => {
      if (p.hl) return [p]
      return p.text
        .split(re)
        .filter(Boolean)
        .map((s) => ({ text: s, hl: re.test(s) && s.toLowerCase() === phrase.toLowerCase() }))
    })
  }
  return parts
})
</script>

<template>
  <section class="relative bg-paper">
    <!-- faint blueprint grid backing the hero -->
    <div class="pointer-events-none absolute inset-0 blueprint-grid opacity-60" aria-hidden="true" />
    <div class="frame relative border-b border-line">
      <div class="flex flex-col items-center px-5 pb-10 pt-16 text-center md:px-8 md:pb-14 md:pt-24">
        <!-- status pill — plain tracked sans, operational signal dot -->
        <span class="inline-flex items-center gap-2 rounded-none border border-line bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/70">
          <span class="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-glow" />
          Workshop &amp; tim teknisi
          <span class="text-signal">— siap</span>
        </span>

        <!-- headline with logo-gold highlights -->
        <h1
          class="display mt-8 max-w-3xl text-ink"
          style="font-size: clamp(2.4rem, 5.4vw, 4.25rem)"
        >
          <template v-for="(part, i) in headlineParts" :key="i">
            <span :class="part.hl ? 'text-accent' : ''">{{ part.text }}</span>
          </template>
        </h1>

        <p v-if="subheadline" class="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {{ subheadline }}
        </p>

        <!-- On a 360px phone these stack, and the first one gets the thumb.
             That slot belongs to WhatsApp: the buyer arriving here has a line
             down and wants a person, not a catalog. `block` on mobile so the
             tap target spans the column instead of sitting centred and narrow. -->
        <div class="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <UiButton :href="primaryLink" :block="true" class="sm:!w-auto">
            <UiWhatsAppIcon v-if="primaryWhatsApp" class="h-4 w-4" />
            {{ primaryCTA }}
          </UiButton>
          <UiButton
            v-if="secondaryCTA && secondaryLink"
            :href="secondaryLink"
            variant="outline"
            :block="true"
            class="sm:!w-auto"
          >
            {{ secondaryCTA }}
          </UiButton>
        </div>

        <!-- product-forward technical blueprint -->
        <div class="mt-12 w-full md:mt-16">
          <HeroBlueprint />
        </div>
      </div>
    </div>
  </section>
</template>
