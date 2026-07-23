<script setup lang="ts">
const props = defineProps<{
  articles: {
    slug: string
    title: string
    excerpt?: string | null
    tag: string
    image?: string | null
    publishedAt?: string
    author?: string
  }[]
}>()

// carousel dot state
const scroller = ref<HTMLDivElement | null>(null)
const activeDot = ref(0)

function onScroll() {
  const el = scroller.value
  if (!el || props.articles.length === 0) return
  const max = el.scrollWidth - el.clientWidth
  const ratio = max > 0 ? el.scrollLeft / max : 0
  activeDot.value = Math.round(ratio * (props.articles.length - 1))
}
</script>

<template>
  <section class="bg-paper">
    <div class="frame border-b border-line">
      <div class="grid lg:grid-cols-[360px_1fr]">
        <!-- intro cell -->
        <div class="flex flex-col border-b border-line px-6 py-12 md:px-10 lg:border-b-0 lg:border-r lg:py-16">
          <h2 class="display text-3xl text-ink md:text-4xl">Artikel &amp; update terbaru</h2>
          <div class="mt-8">
            <Button to="/artikel" variant="white">Semua Artikel</Button>
          </div>

          <!-- decorative work-order docket -->
          <div class="mt-auto hidden pt-14 lg:block">
            <div class="rounded-lg border border-line bg-white p-4 shadow-sm">
              <span class="inline-flex items-center gap-1.5 rounded bg-paper-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                <span class="h-2 w-2 border-l-2 border-t-2 border-accent" />Work Order
              </span>
              <dl class="mt-3 space-y-1.5 text-[12.5px] tabular-nums">
                <div class="flex justify-between gap-4 border-b border-line/70 pb-1.5"><dt class="text-muted">No.</dt><dd class="font-semibold text-ink">WO-2026-118</dd></div>
                <div class="flex justify-between gap-4"><dt class="text-muted">Item</dt><dd class="font-semibold text-accent">PU Belt Food Grade</dd></div>
                <div class="flex justify-between gap-4"><dt class="text-muted">Qty</dt><dd class="text-ink">40 m</dd></div>
                <div class="flex justify-between gap-4"><dt class="text-muted">Status</dt><dd class="inline-flex items-center gap-1.5 font-semibold text-signal"><span class="h-1.5 w-1.5 rounded-full bg-signal" />Siap kirim</dd></div>
              </dl>
            </div>
          </div>
        </div>

        <!-- carousel cell — min-w-0 lets the grid track shrink so the inner
             overflow-x-auto scroller scrolls instead of widening the page -->
        <div class="min-w-0 px-6 py-12 md:px-8 lg:py-16">
          <div
            v-if="articles.length"
            ref="scroller"
            class="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]"
            @scroll.passive="onScroll"
          >
            <div
              v-for="article in articles"
              :key="article.slug"
              class="w-[280px] shrink-0 snap-start md:w-[300px]"
            >
              <ArticleCard v-bind="article" />
            </div>
          </div>
          <p v-else class="rounded-xl border border-dashed border-line py-16 text-center text-sm text-muted">
            Belum ada artikel.
          </p>

          <!-- dots -->
          <div v-if="articles.length > 1" class="mt-4 flex justify-center gap-1.5">
            <span
              v-for="(a, i) in articles"
              :key="a.slug"
              class="h-1.5 w-1.5 rounded-full transition-colors"
              :class="i === activeDot ? 'bg-ink/60' : 'bg-ink/15'"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
