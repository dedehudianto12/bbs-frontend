<script setup lang="ts">
import { animate } from 'motion-v'

const props = defineProps<{
  items: { label: string; value: string }[]
}>()

function num(v: string): number {
  return parseInt(v.replace(/[^\d]/g, ''), 10) || 0
}

// Feature the largest stat as the hero number; the rest become tiles.
const hero = computed(() =>
  [...props.items].sort((a, b) => num(b.value) - num(a.value))[0]
)
const rest = computed(() => props.items.filter((it) => it !== hero.value))

// #2 — count-up ticker on the hero number, once, when scrolled into view.
// SSR renders the final value; the ticker only takes over client-side.
const reduced = usePrefersReducedMotion()
const heroNumEl = ref<HTMLElement | null>(null)
const ticked = ref<number | null>(null)
const heroTarget = computed(() => num(hero.value?.value ?? ''))
const heroSuffix = computed(() => (hero.value?.value ?? '').replace(/[\d.,\s]/g, ''))
const heroDisplay = computed(() =>
  ticked.value === null ? String(heroTarget.value) : String(ticked.value)
)

let io: IntersectionObserver | null = null
onMounted(() => {
  if (!heroNumEl.value || heroTarget.value <= 0) return
  io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return
      io?.disconnect()
      if (reduced.value) return
      animate(0, heroTarget.value, {
        duration: DUR.ticker,
        ease: [...EASE_OUT],
        onUpdate: (v) => {
          ticked.value = Math.round(v)
        },
      })
    },
    { threshold: 0.4 }
  )
  io.observe(heroNumEl.value)
})
onBeforeUnmount(() => io?.disconnect())

// #5 — sparkline draw-in (purely illustrative path), once on scroll-into-view.
const sparkFrom = computed(() =>
  reduced.value
    ? { duration: 0.001 }
    : { strokeDashoffset: 460, duration: DUR.draw, ease: EASE_OUT_GSAP }
)
const sparkFillFrom = computed(() =>
  reduced.value
    ? { duration: 0.001 }
    : { opacity: 0, duration: 0.6, delay: 0.45, ease: EASE_OUT_GSAP }
)
</script>

<template>
  <section class="bg-paper">
    <div class="frame border-b border-line">
      <!-- heading cell -->
      <div class="border-b border-line px-6 py-14 md:px-10 md:py-16">
        <h2 class="display max-w-xl text-3xl text-ink md:text-[2.6rem]">
          Dipercaya oleh ratusan industri di seluruh Indonesia
        </h2>
      </div>

      <!-- hero number + chart -->
      <div v-if="hero" class="grid border-b border-line md:grid-cols-2">
        <div class="flex min-h-[280px] flex-col justify-between px-6 py-8 md:min-h-[340px] md:px-10 md:py-10">
          <p class="text-sm font-medium text-muted">Total {{ hero.label.toLowerCase() }}</p>
          <p ref="heroNumEl" class="display text-6xl tabular-nums text-ink md:text-8xl">{{ heroDisplay }}{{ heroSuffix }}</p>
        </div>
        <div class="flex flex-col border-t border-line px-6 py-8 md:border-l md:border-t-0 md:px-8">
          <span class="inline-flex w-fit items-center gap-2 rounded-md border border-line bg-white px-3 py-1.5 text-[13px] font-medium text-ink/80 shadow-sm">
            <span class="h-1.5 w-1.5 rounded-full bg-accent" />
            Pertumbuhan proyek
            <svg class="h-3 w-3 text-ink/40" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>
          </span>
          <svg class="mt-6 h-40 w-full flex-1 md:h-auto" viewBox="0 0 400 150" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="stat-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="rgb(228 87 27)" stop-opacity="0.22" />
                <stop offset="1" stop-color="rgb(228 87 27)" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path
              v-gsap.whenVisible.once.from="sparkFillFrom"
              d="M0 138 L40 132 L80 134 L120 122 L160 126 L200 104 L240 110 L280 78 L320 84 L360 40 L400 14 L400 150 L0 150 Z"
              fill="url(#stat-fill)"
            />
            <path
              v-gsap.whenVisible.once.from="sparkFrom"
              d="M0 138 L40 132 L80 134 L120 122 L160 126 L200 104 L240 110 L280 78 L320 84 L360 40 L400 14"
              fill="none"
              stroke="rgb(228 87 27)"
              stroke-width="1.8"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-dasharray="460"
            />
          </svg>
          <div class="mt-3 flex justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-muted/80">
            <span>2010</span>
            <span>Hari ini</span>
          </div>
        </div>
      </div>

      <!-- stat tiles -->
      <div class="grid sm:grid-cols-3">
        <div
          v-for="(item, i) in rest"
          :key="item.label"
          class="border-b border-line px-6 py-8 last:border-b-0 sm:border-b-0 md:px-10 md:py-10"
          :class="i > 0 ? 'sm:border-l sm:border-line' : ''"
        >
          <p class="display text-4xl tabular-nums text-ink md:text-5xl">{{ item.value }}</p>
          <p class="mt-3 text-sm text-muted">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
