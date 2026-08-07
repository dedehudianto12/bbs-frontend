<script setup lang="ts">
import { useRevealOnScroll } from '~/composables/useRevealOnScroll'

defineProps<{
  eyebrow: string
  note: string
  items: { name: string; sector: string; src: string; w: number; h: number }[]
}>()

// Six cells, not five. The section label is the first cell rather than a header
// strip above the grid, which is the shape WhyChooseUsSection uses — because
// five is a hostile number for a hairline grid. At 2 and 3 columns five logos
// leave a trailing empty grid area, and with the house `gap-px bg-line` idiom
// an empty area is not blank, it paints the parent's line colour as a solid
// block. Counting the label in makes it six, which divides cleanly at 2, 3 and
// 6, and it echoes ProofMarquee's static-label-then-content anatomy so the two
// proof elements read as a family instead of two unrelated bands.
//
// The reveal item is the grid itself, not each cell. Per-cell entrance is
// handled in CSS below and keyed to the scanner's position rather than to DOM
// order, which the composable's index-based stagger cannot express.
const { root } = useRevealOnScroll()
</script>

<template>
  <section ref="root" class="bg-paper">
    <div class="frame border-b border-line">
      <div
        data-reveal-item
        class="logo-band relative grid grid-cols-2 gap-px overflow-hidden bg-line sm:grid-cols-3 lg:grid-cols-6"
      >
        <div class="band-cell flex flex-col justify-center bg-white px-5 py-7">
          <h2 class="eyebrow text-ink">{{ eyebrow }}</h2>
          <p class="mt-2 text-[12px] leading-snug text-muted">{{ note }}</p>
        </div>

        <!-- Cells are white, not paper. Four of the five source files are opaque
             white-backed, and two of those use white as an interior colour —
             Indah Kiat's spiral inside the red square, Sari Roti's lower panel.
             Keying white to transparent so they could float on the #F4F2EE
             canvas repaints those interiors in cream, which is altering another
             company's trademark; on Sari Roti it also dissolves the badge's
             white border and turns its baked drop-shadow into a grey smudge.
             Every mark is shown on the surface it was drawn for instead. -->
        <figure
          v-for="item in items"
          :key="item.name"
          class="band-cell logo-cell flex flex-col items-center justify-center gap-3 bg-white px-4 py-7"
        >
          <!-- w/h are the 1x display size from scripts/images/client-logos.mjs;
               the file itself is 2x. No two logos share a height — they are
               scaled to equal optical *area*, because a shared height would put
               Polytron's 7.7:1 next to J&T's 4.75:1 at triple the visual
               weight. See the script for the arithmetic. -->
          <img
            :src="item.src"
            :alt="item.name"
            :width="item.w"
            :height="item.h"
            loading="lazy"
            decoding="async"
            class="client-logo block h-auto max-w-full"
          >
          <!-- The industry, not the company name — the name is already legible
               in the mark above it. Visible by default and hidden only where a
               real pointer exists, so touch users read it outright and no
               content is trapped behind a hover that can never fire. -->
          <figcaption class="sector spec-key text-center leading-none">
            {{ item.sector }}
          </figcaption>
        </figure>

        <!-- Last in the DOM on purpose: it is absolutely positioned, so it does
             not take a grid track, but it does count for :nth-child. Keeping it
             after the cells leaves them at children 1-6 and the column maths
             below readable. -->
        <div class="scanner pointer-events-none absolute inset-0 z-10" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── The scanner ────────────────────────────────────────────
   A single pass of a gold inspection head across the band, which is the one
   piece of motion this section gets. It runs once on entry, never loops.

   The overlay spans the full band and paints the head at 50% of its own width,
   so travelling from translateX(-50%) to translateX(50%) walks the head from
   the band's left edge to its right edge exactly — no wasted travel at either
   end, which a -100%/100% sweep would spend half the duration on. The soft
   ramp behind the hard leading edge is the trail; the edge itself is where the
   colour lands.

   Transform only. The gradient is painted once and the layer is composited,
   so the sweep costs no repaints for the length of its run. */
.logo-band {
  /* Hoisted because the colour timing below is derived from both, and the two
     drifting apart is not a visible bug so much as a subtly wrong one — the
     head ends up somewhere other than where the schedule thinks it is. */
  --sweep-start: 100ms;
  --sweep-dur: 900ms;
}

.scanner {
  opacity: 0;
  transform: translateX(-50%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    transparent 38%,
    rgb(var(--accent) / 0.04) 45%,
    rgb(var(--accent) / 0.16) 49%,
    rgb(var(--accent) / 0.9) 49.9%,
    rgb(var(--accent) / 0.9) 50%,
    transparent 50.4%,
    transparent 100%
  );
}

[data-reveal='in'] .scanner {
  /* `backwards`, not `both`: a forwards-filled animation keeps overriding the
     element's own styles after it ends, which would freeze .client-logo's
     transform and silently kill the hover scale below. `backwards` holds the
     first keyframe through the delay and then hands control back.

     linear, and it must stay linear. The column schedule below places each
     logo's colour at ((col + 0.5) / cols) x --sweep-dur, which is only where
     the head actually is if it travels at constant velocity. An ease-in-out
     was tried here and it desynchronised the whole band: slow at the ends and
     fast through the middle, so the head trailed the colour at the edges and
     overtook it in the centre. Constant motion wants linear anyway — every
     other perpetual or constant-rate animation in this codebase uses it. */
  animation: scan-sweep var(--sweep-dur) linear var(--sweep-start) backwards;
}

@keyframes scan-sweep {
  from {
    opacity: 0;
    transform: translateX(-50%);
  }
  12%,
  88% {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateX(50%);
  }
}

/* ── Colour develops where the head passes ──────────────────
   Base state is the finished state: full colour, no offset. Nothing here is
   reachable without `[data-reveal='in']`, so SSR output, a JS failure, a
   browser without IntersectionObserver and prefers-reduced-motion all land on
   a correct, fully-coloured logo wall. The animation is the exception, not the
   content. */
[data-reveal='in'] .client-logo {
  /* --scan-delay is measured from the moment the head enters the band, so the
     sweep's own start delay has to be added back or every logo fires that much
     early — which at 900ms across 1152px is very nearly one whole cell. */
  animation: logo-develop 420ms var(--ease-out)
    calc(var(--sweep-start) + var(--scan-delay) - 50ms) backwards;
}

@keyframes logo-develop {
  from {
    opacity: 0.4;
    filter: saturate(0.12) contrast(0.94);
    transform: translateX(-5px);
  }
  to {
    opacity: 1;
    filter: none;
    transform: none;
  }
}

/* ── Column timing ──────────────────────────────────────────
   --scan-delay is when the head reaches a cell's centre, measured from the
   moment it enters the band: ((col + 0.5) / cols) x --sweep-dur, which holds
   only because the sweep is linear. It is keyed to the *column*, never to DOM
   order, because the grid reflows from 6 columns to 3 to 2 while the sweep
   stays horizontal. At 2 columns the band is three rows deep and a vertical
   line crosses all three at once, so the two left-hand logos must light
   together and the three right-hand ones after them — an index-based stagger
   would light them diagonally, out of step with the line the user is watching.

   The 50ms the develop runs ahead of the head (see the calc above) is
   deliberately small, and it was 120ms first. --ease-out is steep at the front
   — a quarter of the way in it has already covered about 70% of the distance —
   so a 120ms lead had each logo near full colour a whole cell before the edge
   reached it, and the head read as chasing the colour instead of causing it.
   At 50ms a logo is roughly a third developed as the edge crosses and settles
   just behind it. Do not widen this without re-checking it frame by frame. */

/* 2 columns */
.band-cell:nth-child(odd) {
  --scan-delay: 225ms;
}
.band-cell:nth-child(even) {
  --scan-delay: 675ms;
}

/* 3 columns */
@media (min-width: 640px) {
  .band-cell:nth-child(3n + 1) {
    --scan-delay: 150ms;
  }
  .band-cell:nth-child(3n + 2) {
    --scan-delay: 450ms;
  }
  .band-cell:nth-child(3n + 3) {
    --scan-delay: 750ms;
  }
}

/* 6 columns — one row, so column and DOM order finally coincide */
@media (min-width: 1024px) {
  .band-cell:nth-child(1) {
    --scan-delay: 75ms;
  }
  .band-cell:nth-child(2) {
    --scan-delay: 225ms;
  }
  .band-cell:nth-child(3) {
    --scan-delay: 375ms;
  }
  .band-cell:nth-child(4) {
    --scan-delay: 525ms;
  }
  .band-cell:nth-child(5) {
    --scan-delay: 675ms;
  }
  .band-cell:nth-child(6) {
    --scan-delay: 825ms;
  }
}

/* ── Resting and hover state ────────────────────────────────
   The caption is visible by default. Only a device with a real pointer gets
   the hide-then-reveal, so touch reads the sector outright. Either way the
   caption keeps its box, so nothing reflows when it appears. */
.logo-cell {
  transition: background-color 140ms ease;
}
.client-logo {
  transition: transform 160ms var(--ease-out);
}
.sector {
  transition:
    opacity 140ms ease,
    transform 140ms var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .sector {
    opacity: 0;
    transform: translateY(4px);
  }
  .logo-cell:hover {
    background-color: rgb(var(--paper-soft));
  }
  .logo-cell:hover .client-logo {
    transform: scale(1.02);
  }
  .logo-cell:hover .sector {
    opacity: 1;
    transform: none;
  }
}

/* useRevealOnScroll already bails before setting any attribute when reduced
   motion is on, so this covers the case where the setting is switched after
   the observer has run. The sweep is removed outright rather than shortened —
   a bright line travelling across the viewport is exactly the motion this
   query exists to suppress. */
@media (prefers-reduced-motion: reduce) {
  .scanner {
    display: none;
  }
  [data-reveal='in'] .client-logo {
    animation: none;
  }
  .client-logo,
  .sector,
  .logo-cell {
    transition: none;
  }
  .logo-cell:hover .client-logo {
    transform: none;
  }
}
</style>
