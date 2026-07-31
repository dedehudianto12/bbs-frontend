<script setup lang="ts">
import { contactInfo } from '~/data/contact'
import { prettyPhone } from '~/utils/whatsapp'

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
    /** Datasheet rows counterweighting the headline. */
    facts?: { key: string; value: string }[]
  }>(),
  { highlights: () => [], primaryWhatsApp: false, facts: () => [] },
)

const phone = prettyPhone(contactInfo.waSales1)

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
  <!-- The blueprint-grid backdrop is gone. HeroBlueprint below is itself a
       technical drawing, so graph paper behind it was the same idea said twice
       — the identical argument that took the grid off the katalog band. One
       blueprint device per screen. -->
  <section class="bg-paper">
    <div class="frame border-b border-line">
      <!-- Left-aligned, not centred, and now counterweighted.
           Centred pill over centred headline over centred subhead over centred
           buttons is the arrangement a page has when nobody chose one — the
           default of every SaaS template since about 2019, and the loudest
           signal that a layout was not designed. Premium industrial sites are
           left-aligned on an asymmetric grid without exception: Interroll,
           Trumpf, Festo, Vitsoe.
           But left-aligning alone left the entire right half of the first
           screen as empty paper, which reads as unfinished rather than as
           composed. Asymmetry only works when something small and precise sits
           opposite the mass — hence the datasheet, pinned low with self-end so
           the eye travels from the big claim down to the small evidence. -->
      <div class="grid gap-y-10 px-5 pb-12 pt-12 text-left md:px-8 md:pt-16 lg:grid-cols-12 lg:gap-x-12">
        <div class="flex flex-col items-start lg:col-span-7">
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
        </div>

        <!-- The counterweight: a product plate over its datasheet, which is the
             oldest arrangement in an industrial catalog and the one Interroll
             still uses.
             The photograph is the first real product image the site has had.
             It is a flat belt folded to show both faces — black cover over the
             pale fabric carcass — shot on white with a soft shadow, which is
             the one frame in everything the client sent that is neutral enough
             not to fight the gold and clean enough to enlarge. The plate is a
             4:3 white cell and the image sits inside it with object-contain: the
             photo's own white margin and the cell's white are the same colour,
             so the letterboxing is invisible and the belt keeps its full shape
             instead of being cropped to fit a box.
             Below it, the datasheet that used to be a standalone ProofStrip
             section under the fold — the headline asserted "2–3 hari" and
             nothing supported it until the reader scrolled. It also carries the
             type contrast: 11px mono against a 68px display face, big jumps
             between levels with nothing in the middle, and mono doing the one
             job the system reserves it for. -->
        <aside class="lg:col-span-5">
          <div class="border border-line bg-white">
            <img
              src="/images/hero-belt.webp"
              alt="Flat belt conveyor BBS — penampang cover hitam dengan lapisan kain"
              width="1150"
              height="1441"
              fetchpriority="high"
              decoding="async"
              class="aspect-[4/3] w-full object-contain"
            />
          </div>

          <dl class="mt-8 border-t border-line">
            <div
              v-for="fact in facts"
              :key="fact.key"
              class="flex items-baseline justify-between gap-5 border-b border-line py-3"
            >
              <dt class="spec-key shrink-0">{{ fact.key }}</dt>
              <dd class="spec-val text-right">{{ fact.value }}</dd>
            </div>
          </dl>

          <!-- A number printed on the page is a fact; a button that opens
               WhatsApp is a promise. For an Indonesian B2B buyer the former is
               a trust signal in its own right, and it costs one line.
               The hours are the honest version of what the deleted "● SIAP"
               pill was gesturing at: someone whose line stopped at 07:00 wants
               to know whether anyone will actually answer. -->
          <div class="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <a :href="`tel:+${contactInfo.waSales1}`" class="hero-tel num text-[15px] font-semibold text-ink">
              {{ phone }}
            </a>
            <span class="spec-key">{{ contactInfo.jamSingkat }}</span>
          </div>
        </aside>
      </div>

      <!-- HeroBlueprint used to sit here, below everything, holding the slot
           until a real product photograph existed. One does now, and a real
           belt out-argues a drawing of a generic conveyor, so the drawing moved
           to the head of /produk/belt-conveyor — the page where someone is
           actually working out which part they need. The hero is one screen
           shorter for it. -->
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

/* Explicit property, never `transition: all`. */
.hero-tel {
  transition: color 140ms ease;
}
.hero-tel:active {
  color: rgb(var(--accent));
}
@media (hover: hover) and (pointer: fine) {
  .hero-tel:hover {
    color: rgb(var(--accent));
  }
}
</style>
