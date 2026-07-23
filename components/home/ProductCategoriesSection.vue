<script setup lang="ts">
// Light framed section — sticky sidebar of product lines, one row per
// category: kicker / heading / copy / button / count, with a blueprint art
// panel + datasheet-style spec card on the right.
const props = defineProps<{
  items: { cat: string; group: string; count: number }[]
}>()

interface Meta {
  family?: 'belt' | 'roller' | 'joint'
  title: string
  desc: string
  theme: number
  specs: { pre: string; preClass?: string; text: string; textClass?: string }[]
}

const orange = 'text-accent'
const steel = 'text-muted'
const green = 'text-signal'
const dim = 'text-ink/40'

// Datasheet header — the top line of a product cut-sheet.
function specHeader(label: string) {
  return { pre: '▣', preClass: 'text-accent', text: `SPEC — ${label}`, textClass: 'text-ink font-semibold tracking-[0.08em]' }
}

const META: Record<string, Meta> = {
  'pvc belt': {
    family: 'belt',
    title: 'Belt serbaguna untuk lini produksi',
    desc: 'Permukaan bersih, tahan aus, dan mudah dibersihkan — pilihan utama untuk lini makanan, packaging, dan logistik ringan.',
    theme: 0,
    specs: [
      specHeader('PVC BELT'),
      { pre: '◇', preClass: steel, text: 'ketebalan 1–5 mm · lebar s/d 3000 mm' },
      { pre: '·', text: 'permukaan: glossy / matte / grip', textClass: dim },
      { pre: '✓', preClass: green, text: 'varian food-grade tersedia', textClass: green },
      { pre: '→', preClass: orange, text: 'aplikasi: F&B · packaging · logistik' },
    ],
  },
  // canonical slug is 'pu' (content/config/site.yml) — the old 'pu belt'
  // duplicate was drift and has been reconciled into this one entry
  'pu': {
    family: 'belt',
    title: 'Higienis & tahan minyak untuk proses presisi',
    desc: 'Belt polyurethane yang elastis, food-safe, dan tahan minyak — untuk industri pangan dan farmasi dengan standar tinggi.',
    theme: 2,
    specs: [
      specHeader('PU'),
      { pre: '◇', preClass: steel, text: 'ketebalan 0.9–3 mm · anti-statis' },
      { pre: '·', text: 'tahan minyak & lemak hewani', textClass: dim },
      { pre: '✓', preClass: green, text: 'sertifikasi food-grade (FDA)', textClass: green },
      { pre: '→', preClass: orange, text: 'aplikasi: pangan · farmasi · tembakau' },
    ],
  },
  'flat belt': {
    family: 'belt',
    title: 'Transmisi daya & transport yang mulus',
    desc: 'Flat belt nylon, polyester, dan rubber cover untuk transmisi daya berkecepatan tinggi dan konveyor datar.',
    theme: 1,
    specs: [
      specHeader('FLAT BELT'),
      { pre: '◇', preClass: steel, text: 'material: nylon · polyester · rubber' },
      { pre: '·', text: 'kecepatan tinggi, slip rendah', textClass: dim },
      { pre: '✓', preClass: green, text: 'sambungan endless tersedia', textClass: green },
      { pre: '→', preClass: orange, text: 'aplikasi: tekstil · percetakan · kayu' },
    ],
  },
  'rubber belt': {
    family: 'belt',
    title: 'Tenaga besar untuk beban berat',
    desc: 'Rubber belt EP dengan kekuatan tarik tinggi dan tahan abrasi — andalan tambang, semen, dan material curah.',
    theme: 3,
    specs: [
      specHeader('RUBBER BELT'),
      { pre: '◇', preClass: steel, text: 'karkas EP100–EP500 · 2–5 ply' },
      { pre: '·', text: 'tahan abrasi, panas & benturan', textClass: dim },
      { pre: '✓', preClass: green, text: 'onsite joint: hot / cold splicing', textClass: green },
      { pre: '→', preClass: orange, text: 'aplikasi: tambang · semen · smelter' },
    ],
  },
  'timing belt': {
    family: 'belt',
    title: 'Gerak sinkron tanpa slip',
    desc: 'Timing belt bergigi untuk transmisi presisi dan positioning yang akurat pada mesin produksi.',
    theme: 4,
    specs: [
      specHeader('TIMING BELT'),
      { pre: '◇', preClass: steel, text: 'profil: T · AT · HTD · STD' },
      { pre: '·', text: 'penguat steel / kevlar cord', textClass: dim },
      { pre: '✓', preClass: green, text: 'custom cleat & coating', textClass: green },
      { pre: '→', preClass: orange, text: 'aplikasi: otomasi · packaging' },
    ],
  },
  'fastener': {
    family: 'joint',
    title: 'Sambungan belt cepat & kuat',
    desc: 'Alligator, clipper, dan bolt fastener untuk penyambungan belt yang cepat tanpa vulkanisir.',
    theme: 5,
    specs: [
      specHeader('FASTENER'),
      { pre: '◇', preClass: steel, text: 'tipe: alligator · clipper · bolt plate' },
      { pre: '·', text: 'material steel & stainless', textClass: dim },
      { pre: '✓', preClass: green, text: 'pemasangan di lokasi tersedia', textClass: green },
      { pre: '→', preClass: orange, text: 'aplikasi: perbaikan darurat · MRO' },
    ],
  },
  'cleat': {
    family: 'joint',
    title: 'Bawa material menanjak tanpa tumpah',
    desc: 'Cleat PU/PVC dan profile guide untuk konveyor miring dan pengarah jalur belt.',
    theme: 1,
    specs: [
      specHeader('CLEAT'),
      { pre: '◇', preClass: steel, text: 'tipe A · C · profil custom' },
      { pre: '·', text: 'las frekuensi tinggi (HF welding)', textClass: dim },
      { pre: '✓', preClass: green, text: 'desain sesuai sudut incline', textClass: green },
      { pre: '→', preClass: orange, text: 'aplikasi: incline · unit dosing' },
    ],
  },
  'gravity roll': {
    family: 'roller',
    title: 'Handling efisien tanpa daya',
    desc: 'Gravity roller conveyor baja dan stainless untuk transport ringan hingga berat di gudang dan lini kemasan.',
    theme: 4,
    specs: [
      specHeader('GRAVITY ROLL'),
      { pre: '◇', preClass: steel, text: 'roller Ø25–Ø76 mm · baja / SS' },
      { pre: '·', text: 'rangka statis / adjustable', textClass: dim },
      { pre: '✓', preClass: green, text: 'bearing presisi, putaran ringan', textClass: green },
      { pre: '→', preClass: orange, text: 'aplikasi: gudang · loading dock' },
    ],
  },
}

const FALLBACK: Meta = {
  title: 'Komponen conveyor industri',
  desc: 'Komponen berkualitas untuk menjaga sistem material handling Anda tetap berjalan.',
  theme: 0,
  specs: [
    specHeader('PRODUK'),
    { pre: '◇', preClass: steel, text: 'spesifikasi sesuai kebutuhan' },
    { pre: '✓', preClass: green, text: 'stok ready & indent', textClass: green },
    { pre: '→', preClass: orange, text: 'konsultasi teknis gratis' },
  ],
}

function metaOf(cat: string): Meta {
  return META[cat.toLowerCase()] ?? FALLBACK
}

function hrefOf(item: { cat: string; group: string }): string {
  const slug = item.cat.toLowerCase().replace(/\s+/g, '-')
  return item.group === 'belt-conveyor'
    ? `/produk/belt-conveyor/${slug}`
    : `/produk/lainnya/${slug}`
}

const rows = computed(() =>
  props.items.map((item, i) => ({
    ...item,
    i,
    ...metaOf(item.cat),
    href: hrefOf(item),
    icon: item.cat.toLowerCase().replace(/\s+/g, '-'),
  }))
)

// #3 — row entrance on scroll; pairs with the scrollspy below (which stays
// IntersectionObserver-based). Collapses under prefers-reduced-motion.
const reduced = usePrefersReducedMotion()
const rowFrom = computed(() =>
  reduced.value
    ? { duration: 0.001 }
    : { scale: 0.97, opacity: 0, duration: DUR.base, ease: EASE_OUT_GSAP }
)

// Scrollspy for the sidebar
const activeIdx = ref(0)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const idx = Number((e.target as HTMLElement).dataset.idx ?? 0)
          activeIdx.value = idx
        }
      }
    },
    { rootMargin: '-40% 0px -55% 0px' }
  )
  document.querySelectorAll('[data-produk-row]').forEach((el) => observer!.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section class="bg-paper text-ink">
    <div class="frame">
      <!-- section tag row -->
      <div class="blueprint-grid border-b border-line px-6 py-3 md:px-10">
        <span class="eyebrow text-accent">Katalog</span>
      </div>

      <!-- section header -->
      <div class="border-b border-line px-6 py-16 md:px-10 md:py-24">
        <h2 class="display text-4xl md:text-6xl">Katalog Produk</h2>
        <p class="mt-6 max-w-md leading-relaxed text-muted">
          Belt conveyor dan komponen material handling untuk lini produksi yang
          kritis — dipilih dan diuji untuk kebutuhan industri Indonesia.
        </p>
      </div>

      <!-- sidebar + rows -->
      <div class="grid lg:grid-cols-[230px_1fr]">
        <!-- sticky sidebar -->
        <aside class="hidden border-r border-line lg:block">
          <nav class="sticky top-24 flex flex-col gap-1 p-6">
            <a
              v-for="row in rows"
              :key="row.cat"
              :href="`#produk-${row.i}`"
              class="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm font-medium transition-colors"
              :class="activeIdx === row.i ? 'text-ink' : 'text-muted hover:text-ink'"
            >
              <ProductIcon :name="row.icon" class="h-3.5 w-3.5 shrink-0" :class="activeIdx === row.i ? 'text-accent' : 'text-ink/30'" />
              {{ row.cat }}
            </a>
          </nav>
        </aside>

        <!-- rows -->
        <div>
          <article
            v-for="row in rows"
            :id="`produk-${row.i}`"
            :key="row.cat"
            :data-idx="row.i"
            data-produk-row
            v-gsap.whenVisible.once.from="rowFrom"
            class="grid border-b border-line last:border-b-0 md:grid-cols-2"
          >
            <!-- text cell -->
            <div class="px-6 py-12 md:px-10 md:py-16">
              <p class="eyebrow text-muted">{{ row.cat }}</p>
              <h3 class="display mt-4 max-w-xs text-2xl text-ink md:text-[1.9rem]">{{ row.title }}</h3>
              <p class="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">{{ row.desc }}</p>
              <div class="mt-8">
                <Button :to="row.href" variant="white">Lihat {{ row.cat }}</Button>
              </div>
              <div class="mt-10 flex items-center gap-2 text-sm text-muted">
                <svg class="h-4 w-4 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
                  <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="font-semibold tabular-nums text-ink">{{ row.count }}</span>
                <span class="text-muted">produk</span>
                <span class="text-line">·</span>
                <span class="inline-flex items-center gap-1.5 text-muted">
                  <span class="h-1.5 w-1.5 rounded-full bg-signal" />siap kirim
                </span>
              </div>
            </div>

            <!-- visual cell -->
            <div class="relative min-h-[300px] border-t border-line md:min-h-0 md:border-l md:border-t-0">
              <GradientPanel :index="row.theme" rounded="rounded-none" :grain="false" class="absolute inset-0 border-0">
                <ProductDiagram
                  v-if="row.family"
                  :family="row.family"
                  class="absolute inset-0 h-full w-full p-6 text-ink/25"
                />
              </GradientPanel>
              <div class="absolute inset-x-5 top-1/2 -translate-y-1/2 md:inset-x-8 lg:left-12 lg:right-8">
                <SpecCard :lines="row.specs" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
