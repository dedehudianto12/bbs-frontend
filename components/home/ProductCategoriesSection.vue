<script setup lang="ts">
import { computed } from 'vue'
import { useRevealOnScroll } from '~/composables/useRevealOnScroll'

// The catalog band — the home page's single dark tonal anchor before the
// footer. A 3-column grid of hard cells, one per real category.
//
// This used to be a 304-line sticky-scrollspy layout whose SpecCards rendered
// a hardcoded META map of invented figures ("karkas EP100–EP500 · 2–5 ply",
// "tahan abrasi, panas & benturan") *above* the real backend specs, separated
// by a ─────── rule, in a datasheet frame, with no admin able to correct any
// of it. A datasheet that mixes invented and real numbers poisons both, so the
// spec bullets are gone. What remains per category is one positioning line,
// which makes no numeric claim, plus metadata that is true by construction:
// the product count and the group, both derived from the backend response.

const props = defineProps<{
  items: { cat: string; group: string; count: number; specs?: Record<string, string> }[]
}>()

// One positioning line per category. Deliberately claim-free — no dimensions,
// no grades, no certifications. Anything numeric must come from the backend.
const BLURB: Record<string, string> = {
  'pvc belt': 'Belt serbaguna untuk lini produksi',
  'pu': 'Higienis & tahan minyak untuk proses presisi',
  'flat belt': 'Transmisi daya & transport yang mulus',
  'rubber belt': 'Tenaga besar untuk beban berat',
  'timing belt': 'Gerak sinkron tanpa slip',
  'fastener': 'Sambungan belt cepat & kuat',
  'cleat': 'Bawa material menanjak tanpa tumpah',
  'gravity roll': 'Handling efisien tanpa daya',
}

const FALLBACK_BLURB = 'Komponen conveyor industri'

const GROUP_LABEL: Record<string, string> = {
  'belt-conveyor': 'Belt Conveyor',
  lainnya: 'Lainnya',
}

function slugOf(cat: string): string {
  return cat.toLowerCase().replace(/\s+/g, '-')
}

const cards = computed(() =>
  // Sorted so the two real groups cluster, which lets the grid read as grouped
  // without subhead rows breaking the 3-column tiling.
  [...props.items]
    .sort((a, b) => (a.group === b.group ? 0 : a.group === 'belt-conveyor' ? -1 : 1))
    .map((item) => ({
      cat: item.cat,
      count: item.count,
      icon: slugOf(item.cat),
      blurb: BLURB[item.cat.toLowerCase()] ?? FALLBACK_BLURB,
      groupLabel: GROUP_LABEL[item.group] ?? item.group,
      href:
        item.group === 'belt-conveyor'
          ? `/produk/belt-conveyor/${slugOf(item.cat)}`
          : `/produk/lainnya/${slugOf(item.cat)}`,
    })),
)

// Keep the 3-column grid rectangular whatever the backend returns. With the
// 8 seeded categories this is 8 + 1 CTA = exactly 9 cells and no fillers are
// needed; the guard is for when a category has no products and drops out.
// Same technique WhyChooseUsSection already uses.
const fillerCount = computed(() => {
  const cells = cards.value.length + 1
  return (3 - (cells % 3)) % 3
})

const { root } = useRevealOnScroll({ stagger: 45 })
</script>

<template>
  <!-- White, not steel, and no blueprint grid.
       This band used to be the page's dark anchor with a graph-paper texture
       behind it. Two things were wrong with that. The grid is decoration
       competing with the cards for the same attention, and graph paper on
       charcoal is developer-tool vocabulary — it signals sophistication to
       someone who reads Hacker News and nothing at all to a maintenance manager
       in Cakung. More practically, product photography lands in these cards:
       a photo on a dark textured field reads as a dashboard widget, and the
       same photo on white reads as a catalog page. Interroll, Habasit and
       Ammeraal are all white for exactly this reason.
       White also buys the gold cell back. On steel it was a muted note; on a
       clean field it is the one piece of colour in the section. -->
  <section ref="root" class="bg-white">
    <div class="frame">
      <!-- Section tag row. The "Semua produk" link lives here rather than
           relying on the gold CTA cell at the end of the rail: below lg the
           cells are a horizontal track, and a buyer who never swipes to the end
           would otherwise have no way out of this band. Same pattern as
           ProofMarquee — a static link that never moves under the thumb. -->
      <div class="flex items-center justify-between gap-4 border-b border-line px-6 py-3 md:px-10">
        <span class="eyebrow text-accent">Katalog</span>
        <NuxtLink
          to="/produk/belt-conveyor"
          class="cat-all inline-flex items-center gap-1.5 text-[12px] font-semibold text-muted lg:hidden"
        >
          Semua produk
          <svg
            class="cat-arrow h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Section header, roughly a third shorter than it was (py-16/24 → 12/16).
           A catalog earns attention with the goods, not with an empty field
           above them; the old header pushed the first row of cards most of a
           screen down. The gold rule is the section's only ornament and does
           the job the blueprint grid was failing to do — marking where the band
           starts. -->
      <div class="border-b border-line px-6 py-12 md:px-10 md:py-16">
        <div class="h-1 w-14 bg-accent" aria-hidden="true" />
        <h2 class="display mt-6 text-4xl text-ink md:text-[3.25rem]">Katalog Produk</h2>
        <p class="mt-5 max-w-md leading-relaxed text-muted">
          Belt conveyor dan komponen material handling untuk lini produksi yang
          kritis — dipilih dan diuji untuk kebutuhan industri Indonesia.
        </p>
      </div>

      <!-- Two layouts, one DOM.
           At lg+ this is the 3-column grid it has always been; gap-px over
           bg-line makes the gutters read as 1px structural hairlines rather
           than empty space.
           Below lg it becomes a swipeable rail. That grid never existed on a
           phone — it collapsed to one column, so the section was nine
           full-width stacked cells and well over 1500px of scrolling on the
           360px Android that is the primary device here. The rail costs nothing
           structurally, because gap-px keeps producing hairlines horizontally.
           Native overflow + scroll-snap, no JavaScript: it runs on the
           compositor, survives a dead JS bundle, and every card stays in the
           DOM for crawlers and keyboard users. No auto-advance — nothing moves
           that the user did not move.
           data-reveal-item sits on this container rather than on each card. Per
           card it would break the rail: cards scrolled off to the right are
           clipped, so IntersectionObserver never fires for them and they would
           sit at opacity 0 until swiped to, fading in under the thumb. -->
      <div
        data-reveal-item
        class="cat-rail flex snap-x snap-mandatory gap-px overflow-x-auto overscroll-x-contain bg-line lg:grid lg:snap-none lg:grid-cols-3 lg:overflow-visible"
      >
        <NuxtLink
          v-for="card in cards"
          :key="card.cat"
          :to="card.href"
          class="cat-cell group relative flex w-[78%] shrink-0 snap-start flex-col bg-white px-6 py-8 sm:w-[46%] md:w-[38%] md:px-8 md:py-10 lg:w-auto"
        >
          <!-- The pictogram is the card's identity, so it is drawn at 40px
               instead of 20 and in ink rather than muted grey. At the old size
               eight cards were eight near-identical blocks of text and nothing
               helped the eye pick one; at this size each has a distinct
               silhouette, which is exactly the job an industrial catalog gives
               its icons.
               The arrow moves up here to pair with it. It used to sit on its
               own line at the bottom next to the word "Lihat" — a redundant
               affordance, since the whole cell is already a link, costing a
               line of vertical space and a line of reading. -->
          <div class="flex items-start justify-between gap-4">
            <ProductIcon
              :name="card.icon"
              class="cat-icon h-10 w-10 shrink-0 text-ink"
            />
            <svg
              class="cat-arrow mt-1 h-4 w-4 shrink-0 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <h3 class="display mt-7 text-[1.4rem] text-ink md:text-[1.55rem]">
            {{ card.cat }}
          </h3>
          <p class="mt-2.5 text-[14px] leading-relaxed text-muted">
            {{ card.blurb }}
          </p>

          <!-- mt-auto pins this to the floor of the cell, so every card in the
               row shares one metadata baseline however long its blurb runs.
               Previously a fixed mt-8 let the rule float at a different height
               in each card, which is what made the grid look loose.
               The values themselves are true by construction — group and count
               both come straight off the API response. -->
          <dl class="mt-auto flex items-center gap-3 border-t border-line pt-4 md:pt-5">
            <dt class="sr-only">Grup</dt>
            <dd class="spec-key">{{ card.groupLabel }}</dd>
            <span class="text-line" aria-hidden="true">·</span>
            <dt class="sr-only">Jumlah produk</dt>
            <dd class="spec-val">
              {{ String(card.count).padStart(2, '0') }} produk
            </dd>
          </dl>

          <!-- Hover rule: 2px of gold along the floor of the cell, scaling out
               from the left. Transform only, so it runs on the compositor. -->
          <span class="cat-rule" aria-hidden="true" />
        </NuxtLink>

        <!-- 9th cell: closes the 3×3 grid at lg+ and is the only accent on the
             band. Kept last in the DOM at every width — reordering it to the
             front of the rail with CSS `order` would put it first visually but
             still last in tab order, and a focus ring jumping to the far end of
             a track is worse than a swipe. The header link covers the early
             exit on mobile instead. -->
        <NuxtLink
          to="/produk/belt-conveyor"
          class="cat-cell cat-cell--cta group relative flex w-[78%] shrink-0 snap-start flex-col bg-accent px-6 py-8 sm:w-[46%] md:w-[38%] md:px-8 md:py-10 lg:w-auto"
        >
          <!-- Same skeleton as the category cells: mark top-left, arrow
               top-right, heading, then metadata on the floor. It reads as one
               of the set rather than a bolted-on button, and the gold does the
               work of telling you it is different. -->
          <div class="flex items-start justify-between gap-4">
            <span class="eyebrow text-ink/60">Semua kategori</span>
            <svg
              class="cat-arrow h-4 w-4 shrink-0 text-ink/60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <span class="display mt-7 text-[1.4rem] text-ink md:text-[1.55rem]">
            Lihat Semua Produk
          </span>

          <span class="mt-auto border-t border-ink/20 pt-4 md:pt-5">
            <span class="spec-key !text-ink/60">Belt conveyor &amp; lainnya</span>
          </span>
        </NuxtLink>

        <!-- keeps the final row rectangular if a category dropped out -->
        <div
          v-for="n in fillerCount"
          :key="`filler-${n}`"
          class="hidden bg-white lg:block"
          aria-hidden="true"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* The rail's affordance is the peeking next card, not a scrollbar: cards are
   78% wide below sm so roughly a fifth of the following one is always visible,
   which tells the thumb to swipe far more reliably than an arrow does. The
   native bar is hidden because in this range the device is overwhelmingly
   touch, where the bar is an overlay that never appears anyway, and on a narrow
   desktop window a chunky bar under the steel band reads as a rendering fault.
   Scrolling itself is untouched — wheel, trackpad, keyboard and screen-reader
   navigation all still work. */
.cat-rail {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.cat-rail::-webkit-scrollbar {
  display: none;
}

.cat-all {
  transition: color 140ms ease;
}
.cat-all:active {
  color: rgb(var(--ink));
}
@media (hover: hover) and (pointer: fine) {
  .cat-all:hover {
    color: rgb(var(--ink));
  }
  .cat-all:hover .cat-arrow {
    transform: translateX(2px);
  }
}

/* Explicit properties only, never `transition: all`. Sheet metal does not
   lift or cast soft shadows, so hover shifts the surface and tightens the
   hairline instead of translating the cell. On white the move is the inverse of
   the old steel behaviour: the cell settles toward paper rather than lifting
   toward a lighter grey. */
.cat-cell {
  transition: background-color 140ms ease;
}

.cat-icon,
.cat-arrow {
  transition:
    color 140ms ease,
    transform 140ms var(--ease-out);
}

/* Replaces the inset ring the steel version used. A ring plus a background
   shift plus a moving arrow was three things answering one hover; a rule
   growing along the floor is one, and it points the same way the arrow does.
   scaleX from the left edge — transform only, so it composites. */
.cat-rule {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: rgb(var(--accent));
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 180ms var(--ease-out);
}

/* Gated: touch devices fire :hover on tap and leave cells stuck in the
   hovered state until the next tap elsewhere. */
@media (hover: hover) and (pointer: fine) {
  .cat-cell:hover {
    background-color: rgb(var(--paper-soft));
  }
  .cat-cell:hover .cat-icon {
    color: rgb(var(--accent));
  }
  .cat-cell:hover .cat-arrow {
    color: rgb(var(--ink));
    transform: translateX(3px);
  }
  .cat-cell:hover .cat-rule {
    transform: scaleX(1);
  }
  .cat-cell--cta:hover {
    background-color: rgb(var(--accent-glow));
  }
}

/* Press feedback on the whole cell — it is a link, so it must acknowledge. */
.cat-cell:active {
  background-color: rgb(var(--paper-soft));
}
.cat-cell--cta:active {
  background-color: rgb(var(--accent-glow));
}

/* Reduced motion keeps the colour and background changes — they carry the
   meaning — and drops only the movement. The gold rule stays as a state, it
   just appears instead of growing. */
@media (prefers-reduced-motion: reduce) {
  .cat-cell,
  .cat-icon,
  .cat-arrow {
    transition: background-color 140ms ease, color 140ms ease;
  }
  .cat-rule {
    transition: none;
  }
  .cat-cell:hover .cat-arrow {
    transform: none;
  }
}
</style>
