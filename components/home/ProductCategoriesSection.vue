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
  <section ref="root" class="bg-steel">
    <div class="frame frame-dark blueprint-grid-steel">
      <!-- section tag row -->
      <div class="border-b border-white/10 px-6 py-3 md:px-10">
        <span class="eyebrow text-accent">Katalog</span>
      </div>

      <!-- section header -->
      <div class="border-b border-white/10 px-6 py-16 md:px-10 md:py-24">
        <h2 class="display text-4xl text-white md:text-6xl">Katalog Produk</h2>
        <p class="mt-6 max-w-md leading-relaxed text-white/50">
          Belt conveyor dan komponen material handling untuk lini produksi yang
          kritis — dipilih dan diuji untuk kebutuhan industri Indonesia.
        </p>
      </div>

      <!-- 3-column card grid; gap-px + bg-white/10 makes the gutters read as
           1px structural hairlines rather than empty space -->
      <div class="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="card in cards"
          :key="card.cat"
          :to="card.href"
          data-reveal-item
          class="cat-cell group flex flex-col bg-steel px-6 py-8 md:px-8 md:py-10"
        >
          <ProductIcon
            :name="card.icon"
            class="cat-icon h-5 w-5 shrink-0 text-white/30"
          />

          <h3 class="display mt-6 text-xl text-white md:text-[1.4rem]">
            {{ card.cat }}
          </h3>
          <p class="mt-2.5 text-[14px] leading-relaxed text-white/45">
            {{ card.blurb }}
          </p>

          <!-- metadata: true by construction, straight off the API response -->
          <dl class="mt-8 flex items-center gap-3 border-t border-white/10 pt-4">
            <dt class="sr-only">Grup</dt>
            <dd class="spec-key text-white/35">{{ card.groupLabel }}</dd>
            <span class="text-white/15" aria-hidden="true">·</span>
            <dt class="sr-only">Jumlah produk</dt>
            <dd class="spec-val text-white/70">
              {{ String(card.count).padStart(2, '0') }} produk
            </dd>
          </dl>

          <span
            class="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/70"
          >
            Lihat
            <svg
              class="cat-arrow h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </NuxtLink>

        <!-- 9th cell: closes the 3×3 grid and is the only accent on the band -->
        <NuxtLink
          to="/produk/belt-conveyor"
          data-reveal-item
          class="cat-cell cat-cell--cta group flex flex-col justify-between bg-accent px-6 py-8 md:px-8 md:py-10"
        >
          <span class="eyebrow text-ink/60">Semua kategori</span>
          <span class="display mt-6 text-xl text-ink md:text-[1.4rem]">
            Lihat Semua Produk
          </span>
          <span class="mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink">
            Buka katalog
            <svg
              class="cat-arrow h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </NuxtLink>

        <!-- keeps the final row rectangular if a category dropped out -->
        <div
          v-for="n in fillerCount"
          :key="`filler-${n}`"
          class="hidden bg-steel lg:block"
          aria-hidden="true"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Explicit properties only, never `transition: all`. Sheet metal does not
   lift or cast soft shadows, so hover darkens/lifts the surface and the
   hairline instead of translating the cell. */
.cat-cell {
  transition:
    background-color 140ms ease,
    box-shadow 140ms ease;
}

.cat-icon,
.cat-arrow {
  transition:
    color 140ms ease,
    transform 140ms var(--ease-out);
}

/* Gated: touch devices fire :hover on tap and leave cells stuck in the
   hovered state until the next tap elsewhere. */
@media (hover: hover) and (pointer: fine) {
  .cat-cell:hover {
    background-color: rgb(var(--steel-soft));
    /* inset ring rather than an outer shadow — reads as a machined edge */
    box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.18);
  }
  .cat-cell:hover .cat-icon {
    color: rgb(var(--accent));
  }
  .cat-cell:hover .cat-arrow {
    transform: translateX(2px);
  }
  .cat-cell--cta:hover {
    background-color: rgb(var(--accent-glow));
    box-shadow: inset 0 0 0 1px rgb(var(--ink) / 0.18);
  }
}

/* Press feedback on the whole cell — it is a link, so it must acknowledge. */
.cat-cell:active {
  background-color: rgb(var(--steel-soft));
}

@media (prefers-reduced-motion: reduce) {
  .cat-cell,
  .cat-icon,
  .cat-arrow {
    transition: background-color 140ms ease, color 140ms ease;
  }
  .cat-cell:hover .cat-arrow {
    transform: none;
  }
}
</style>
