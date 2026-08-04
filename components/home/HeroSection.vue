<script setup lang="ts">
import { contactInfo } from '~/data/contact'
import { prettyPhone } from '~/utils/whatsapp'

const props = withDefaults(
  defineProps<{
    /** Newlines are honoured as hard line breaks — see `headlineLines`. */
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
    /** Datasheet rows under the CTAs. */
    facts?: { key: string; value: string }[]
    /** The job, stop by stop — rendered as the rail across the hero's foot. */
    timeline?: { mark: string; label: string }[]
    photo: { src: string; alt: string; caption: string }
    /** Small overlaid plate: the detail the wide shot cannot show. */
    detail?: { src: string; alt: string }
  }>(),
  {
    highlights: () => [],
    primaryWhatsApp: false,
    facts: () => [],
    timeline: () => [],
    detail: undefined,
  },
)

const phone = prettyPhone(contactInfo.waSales1)

// Where the headline breaks is a design decision, not a consequence of the
// viewport. Left to wrap on its own at display size it produced a one-word
// first line with the question split across two — the hook broken in half by
// the box it happened to be in. The copy now carries its own breaks (`\n` in
// data/homepage.ts) so the last line lands on the number.
//
// text-balance is deliberately NOT used: it exists to fix wrapping nobody
// chose, and here someone did.
const headlineLines = computed(() => props.headline.split('\n'))

// Split each line so chosen words render in logo gold (partial-word highlight).
// Case-insensitive, applied per line so a highlight can never span a break.
//
// The phrases used to be a HIGHLIGHTS const in this file, hardcoded to
// ['Bisnis Anda', 'Conveyor'] — so editing the headline in data/homepage.ts
// silently dropped the gold with nothing to warn you. They now travel with the
// copy they annotate.
function splitHighlights(line: string) {
  let parts: { text: string; hl: boolean }[] = [{ text: line, hl: false }]
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
}
</script>

<template>
  <!-- ── The cover ──────────────────────────────────────────────────────
       This section is the one dark field on the public surface besides the
       footer, and that is on purpose: a document with a dark cover and a dark
       colophon around a paper body is an editorial structure, not a violation
       of the "single steel anchor" rule. The previous hero was paper on paper —
       a headline, some grey text and two small buttons floating in an empty
       half-screen — which gave the most important screen on the site the least
       visual weight of any band on it.
       The ground is a gradient between two tokens that already exist (ink →
       steel, top-left to bottom-right) rather than a new colour, with the
       blueprint grid at low opacity for tooth. No new palette. -->
  <section class="hero">
    <div class="frame frame-dark">
      <div class="hero-grid lg:grid lg:grid-cols-12">
        <!-- ── Left: the claim ── -->
        <div class="hero-copy lg:col-span-7">
          <span class="eyebrow reveal text-white/45" style="--d: 60ms">
            CV Bintang Berjaya Satu
            <span class="text-white/20" aria-hidden="true">/</span>
            Jakarta Timur
          </span>

          <!-- Leading is pulled to 0.95 here rather than in the .display token:
               1.08 is right for a 2rem section heading and much too airy at
               56px, where the lines have to lock into one mass. Most of what
               makes large type read as deliberate rather than merely big is
               that it sets as a block. -->
          <h1 class="display hero-h1 text-white">
            <span
              v-for="(line, i) in headlineLines"
              :key="i"
              class="reveal block"
              :style="{ '--d': `${140 + i * 70}ms` }"
            >
              <template v-for="(part, j) in splitHighlights(line)" :key="j">
                <span :class="part.hl ? 'text-accent' : ''">{{ part.text }}</span>
              </template>
            </span>
          </h1>

          <p
            v-if="subheadline"
            class="reveal mt-6 max-w-[46ch] text-base leading-relaxed text-white/60 md:text-lg"
            style="--d: 380ms"
          >
            {{ subheadline }}
          </p>

          <!-- On a 360px phone these stack, and the first one gets the thumb.
               That slot belongs to WhatsApp: the buyer arriving here has a line
               down and wants a person, not a catalog. -->
          <div
            class="reveal mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
            style="--d: 460ms"
          >
            <UiButton :href="primaryLink" :block="true" class="sm:!w-auto">
              <UiWhatsAppIcon v-if="primaryWhatsApp" class="h-4 w-4" />
              {{ primaryCTA }}
            </UiButton>
            <UiButton
              v-if="secondaryCTA && secondaryLink"
              :href="secondaryLink"
              variant="outline-invert"
              :block="true"
              class="sm:!w-auto"
            >
              {{ secondaryCTA }}
            </UiButton>
          </div>

          <!-- The three facts the timeline below does not already answer.
               "Lead time" is deliberately absent — the rail across the foot of
               this section *is* the lead time, and printing it twice would be
               the claim arguing with itself. -->
          <dl
            v-if="facts.length"
            class="reveal mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-7 sm:grid-cols-3"
            style="--d: 540ms"
          >
            <div v-for="fact in facts" :key="fact.key">
              <dt class="spec-key !text-white/40">{{ fact.key }}</dt>
              <dd class="mt-1.5 text-[13px] leading-snug text-white/80">{{ fact.value }}</dd>
            </div>
          </dl>
        </div>

        <!-- ── Right: the evidence ──
             The counterweight is now a photograph of the work, not a picture of
             the product. The headline poses a problem — your line stopped — so
             the image opposite it has to be the answer, and a belt segment
             folded on a white sweep answers nothing. This is an on-site joint
             inside a food-grade line: two technicians, a portable press, a blue
             PVC belt. It is also the argument for the whole business in one
             frame, which no studio cutout was ever going to make.
             It fills its cell edge to edge — top of the section to the rail,
             hard against the frame's right rule. The old plate had the photo
             floating inside a bordered box with a white halo on all four sides,
             occupying about 60% of the cell's width; a small object centred in
             a large box is the exact arrangement that reads unfinished. -->
        <figure class="hero-figure lg:col-span-5">
          <img
            :src="photo.src"
            :alt="photo.alt"
            width="1120"
            height="1829"
            fetchpriority="high"
            decoding="async"
            class="hero-photo"
          />

          <!-- The detail the wide shot cannot carry: the finger splice itself,
               clipped and squared up before it goes under heat. Overlapping the
               plate's bottom-left rather than sitting below it — the corner it
               covers is a flat white coverall, and the straddle is what stops
               the two columns reading as two documents that happen to share a
               row. The gap around it is drawn with a border in the ground
               colour, so it reads as cut into the photograph. -->
          <img
            v-if="detail"
            :src="detail.src"
            :alt="detail.alt"
            width="1000"
            height="666"
            loading="lazy"
            decoding="async"
            class="hero-detail"
          />

          <figcaption class="hero-caption spec-key">{{ photo.caption }}</figcaption>
        </figure>
      </div>

      <!-- ── The rail ───────────────────────────────────────────────────
           The headline promises 2–3 days. Previously a datasheet row restated
           that promise in smaller type, which is assertion twice over, not
           evidence. Here the promise is drawn: four stops on a line, each one a
           thing the buyer can picture happening, the last one gold because it
           is the one he actually wants.
           Square nodes, not dots — this system has no rounded corners, and a
           circle on the rail would be the one radius on the page. -->
      <div v-if="timeline.length" class="hero-rail">
        <ol class="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-4">
          <li
            v-for="(step, i) in timeline"
            :key="step.mark"
            class="hero-step"
            :style="{ '--d': `${700 + i * 90}ms` }"
          >
            <span class="hero-node" aria-hidden="true" />
            <span class="hero-mark spec-key block !text-white/40">{{ step.mark }}</span>
            <span class="hero-step-label mt-1.5 block text-[13px] leading-snug text-white/75">
              {{ step.label }}
            </span>
          </li>
        </ol>

        <!-- A number printed on the page is a fact; a button that opens
             WhatsApp is a promise. For an Indonesian B2B buyer the former is a
             trust signal in its own right, and it costs one line. The hours are
             there because someone whose line stopped at 07:00 wants to know
             whether anyone will actually answer. -->
        <div class="hero-contact">
          <a :href="`tel:+${contactInfo.waSales1}`" class="hero-tel num text-[15px] font-semibold text-white">
            {{ phone }}
          </a>
          <span class="spec-key mt-1 block !text-white/40">{{ contactInfo.jamSingkat }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Ground ─────────────────────────────────────────────────────────── */
.hero {
  background:
    linear-gradient(152deg, rgb(var(--ink)) 0%, rgb(var(--steel)) 100%);
  position: relative;
  isolation: isolate;
}
/* Blueprint tooth. Kept faint enough to be felt rather than seen, and faded
   out down the page so it never fights the photograph's edge. */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 32px 32px;
  -webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 78%);
  mask-image: linear-gradient(180deg, #000 0%, transparent 78%);
}

/* ── Grid ───────────────────────────────────────────────────────────── */
.hero-grid {
  align-items: stretch;
}
.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3.5rem 1.25rem 3rem;
}
@media (min-width: 768px) {
  .hero-copy {
    padding: 4.5rem 2rem 4rem;
  }
}
@media (min-width: 1024px) {
  .hero-copy {
    /* Bottom padding only large enough to clear the rail; the column is
       justified to centre so the block sits against the photograph's mass
       rather than hanging from the top rule. */
    padding: 5.5rem 3rem 5rem 2rem;
    justify-content: center;
  }
}

.hero-h1 {
  /* The vw term is doing real work here, not decoration. Because the headline
     carries hard breaks, its longest line cannot reflow to escape a narrow
     screen — so the type has to shrink to fit instead. 8.4vw keeps the longest
     line ("Sambung lagi dalam", 18 characters) inside the column at every width
     from 320px up, and the 3.375rem ceiling keeps it inside the 7-column cell
     at the point the desktop grid engages. Raising either end re-introduces
     horizontal overflow on small phones. */
  font-size: clamp(1.85rem, 8.4vw, 3.375rem);
  line-height: 0.95;
  letter-spacing: -0.032em;
  margin-top: 1.75rem;
}

/* ── Figure ─────────────────────────────────────────────────────────── */
.hero-figure {
  position: relative;
  margin: 0;
  overflow: hidden;
  /* On mobile the photo is a band under the copy, tall enough to read but not
     so tall it pushes the rail off a 667px screen. */
  aspect-ratio: 4 / 3;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
@media (min-width: 640px) {
  .hero-figure {
    aspect-ratio: 16 / 9;
  }
}
@media (min-width: 1024px) {
  .hero-figure {
    /* Fills the row instead of dictating it — the copy column sets the height
       and the photograph runs the full span of it, edge to edge. */
    aspect-ratio: auto;
    min-height: 34rem;
    border-top: 0;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
}
.hero-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* The two technicians and the press bar sit in the middle third; anchoring
     there keeps them in frame at every aspect the cell takes. */
  object-position: 50% 42%;
}

.hero-detail {
  position: absolute;
  bottom: 0;
  left: 0;
  /* Sized to leave the caption a clear run along the bottom edge, and small
     enough to read as a callout rather than a second photograph competing with
     the first — at half the width it supports the wide shot instead of
     arguing with it. */
  width: 46%;
  max-width: 12rem;
  object-fit: cover;
  aspect-ratio: 3 / 2;
  /* The border is the ground colour, so the plate reads as cut into the
     photograph rather than laid on top of it. No shadow — sheet metal does not
     float, and this system has never once used one. */
  border: 6px solid rgb(var(--ink));
  border-left: 0;
  border-bottom: 0;
}
@media (min-width: 1024px) {
  .hero-detail {
    width: 52%;
    max-width: 13.5rem;
  }
}

.hero-caption {
  position: absolute;
  right: 0;
  bottom: 0;
  /* left is set so the caption can never run underneath the detail plate —
     it ran straight across it on the first pass, which read as one caption
     for two pictures. */
  left: 50%;
  padding: 0.75rem 1rem;
  text-align: right;
  /* One line or nothing. Wrapped, a 11px tracked mono caption stops reading as
     a caption and starts reading as a second paragraph. */
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.7) !important;
  /* Scrim rather than a solid plate: the caption has to stay legible over a
     photograph whose bottom-right corner is a bright blue belt, without
     stamping a rectangle onto it. */
  background: linear-gradient(
    to top left,
    rgb(var(--ink) / 0.88),
    rgb(var(--ink) / 0) 72%
  );
}

/* ── Rail ───────────────────────────────────────────────────────────── */
.hero-rail {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2.25rem 1.25rem 2.5rem;
}
@media (min-width: 768px) {
  .hero-rail {
    padding: 2.25rem 2rem 2.5rem;
  }
}
@media (min-width: 1024px) {
  .hero-rail {
    flex-direction: row;
    align-items: flex-start;
    gap: 3rem;
  }
}

.hero-step {
  position: relative;
  padding-top: 1.375rem;
}
/* The line itself. Drawn per-step rather than as one rule behind the row, so
   each segment can arrive in sequence and so the last one can stop at the
   final node instead of running off into the contact block. */
.hero-step::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.16);
  transform-origin: left center;
}
.hero-node {
  position: absolute;
  top: -3px;
  left: 0;
  width: 7px;
  height: 7px;
  background: rgba(255, 255, 255, 0.4);
}
/* The stop the buyer actually came for. Gold on the node and full white on the
   label — the only two places on the rail that get either. */
.hero-step:last-child .hero-node {
  background: rgb(var(--accent));
  width: 9px;
  height: 9px;
  top: -4px;
}
.hero-step:last-child .hero-step-label {
  color: #fff;
  font-weight: 500;
}

.hero-contact {
  flex-shrink: 0;
  padding-top: 1.375rem;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}
@media (min-width: 1024px) {
  .hero-contact {
    text-align: right;
    min-width: 12rem;
  }
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

/* ── Entrance ───────────────────────────────────────────────────────────
   Declared only inside `no-preference`, so a reduced-motion visitor gets no
   animation at all and — critically — no `animation-fill-mode: both` holding
   content at opacity 0. Content is visible by default and the motion is the
   opt-in, which is the only ordering that cannot strand text invisible if
   anything goes wrong.
   Delays are carried on --d per element so the sequence reads in the template
   as a running time rather than being scattered across a dozen classes. Order:
   photograph, then the claim top to bottom, then the rail drawing left to
   right — the same order a reader takes it in. */
@media (prefers-reduced-motion: no-preference) {
  .reveal {
    animation: hero-in 560ms var(--ease-out) both;
    animation-delay: var(--d, 0ms);
  }

  .hero-photo {
    animation: hero-plate 900ms var(--ease-out) both;
  }

  .hero-detail {
    animation: hero-in 560ms var(--ease-out) both;
    animation-delay: 620ms;
  }

  .hero-step::before {
    animation: hero-rail 420ms var(--ease-out) both;
    animation-delay: var(--d);
  }
  .hero-mark,
  .hero-step-label,
  .hero-node {
    animation: hero-in 420ms var(--ease-out) both;
    animation-delay: calc(var(--d) + 160ms);
  }
}

@keyframes hero-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* The photograph settles rather than slides: a plate this size moving
   laterally would drag the whole composition with it. */
@keyframes hero-plate {
  from {
    opacity: 0;
    transform: scale(1.06);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes hero-rail {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
</style>
