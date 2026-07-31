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
      <!-- Left-aligned, not centred.
           Centred pill over centred headline over centred subhead over centred
           buttons is the arrangement a page has when nobody chose one — it is
           the default of every SaaS template since about 2019, and it is the
           single loudest signal that a layout was not designed. Premium
           industrial sites are left-aligned on an asymmetric grid without
           exception: Interroll, Trumpf, Festo, Vitsoe. Moving the axis left
           costs nothing and buys more perceived care than any amount of
           decoration. -->
      <div class="flex flex-col items-start px-5 pb-10 pt-14 text-left md:px-8 md:pb-14 md:pt-20">
        <!-- The status pill is gone. A bordered capsule with a pulsing green
             dot is status-page vocabulary — Vercel, Linear, "all systems
             operational" — and on a conveyor supplier it reads as a startup in
             borrowed costume. It was also first in the visual hierarchy, which
             is a great deal of prominence for a claim nobody arrived asking
             about. The fact survives as a plain tracked label. -->
        <span class="eyebrow text-muted">
          CV Bintang Berjaya Satu
          <span class="text-line" aria-hidden="true">/</span>
          Jakarta Timur
        </span>

        <!-- text-balance stops "2–3" landing at the end of one line with "hari."
             orphaned alone on the next, which is what the old centred setting
             did. Leading is pulled to 0.98 here rather than in the .display
             token: 1.08 is correct for a 2rem section heading and much too airy
             at 68px, where the lines need to lock into a block. -->
        <h1
          class="display hero-h1 mt-7 max-w-[19ch] text-balance text-ink"
          style="font-size: clamp(2.5rem, 6vw, 4.5rem)"
        >
          <template v-for="(part, i) in headlineParts" :key="i">
            <span :class="part.hl ? 'text-accent' : ''">{{ part.text }}</span>
          </template>
        </h1>

        <p v-if="subheadline" class="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
          {{ subheadline }}
        </p>

        <!-- On a 360px phone these stack, and the first one gets the thumb.
             That slot belongs to WhatsApp: the buyer arriving here has a line
             down and wants a person, not a catalog. `block` on mobile so the
             tap target spans the column instead of sitting centred and narrow. -->
        <div class="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
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

        <!-- Still the drawing, not a photograph.
             The client's photo set was reviewed for this slot and none of it
             survives at hero scale: they are workshop documentation shot on a
             phone — a safety vest, an office chair, parked motorbikes and a
             grubby wall in frame — and a watermark sits dead centre of every
             frame, so only narrow horizontal bands crop clean. Enlarged across
             the first screen they would make the site look worse, not more
             credible. The drawing is controlled, on-brand and sharp at any
             size, so it holds this position until real product photography
             lands. The best of the photos is used further down, at a size it
             can carry. -->
        <div class="mt-12 w-full md:mt-16">
          <HeroBlueprint />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* At clamp() sizes above ~2.5rem the token's 1.08 leaves the lines floating
   apart; 0.98 locks them into a single mass, which is most of what makes large
   type read as deliberate rather than merely big. */
.hero-h1 {
  line-height: 0.98;
  letter-spacing: -0.03em;
}
</style>
