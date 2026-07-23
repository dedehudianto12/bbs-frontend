<script setup lang="ts">
const props = defineProps<{
  headline: string
  subheadline: string
  primaryCTA: string
  primaryLink: string
  secondaryCTA?: string
  secondaryLink?: string
}>()

// Split the headline so chosen words render in safety orange (partial-word
// highlight). Case-insensitive, longest phrases first.
const HIGHLIGHTS = ['Bisnis Anda', 'Conveyor']

const headlineParts = computed(() => {
  let parts: { text: string; hl: boolean }[] = [{ text: props.headline, hl: false }]
  for (const phrase of HIGHLIGHTS) {
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
        <span class="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/70 shadow-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-glow" />
          Workshop &amp; tim teknisi
          <span class="text-signal">— siap</span>
        </span>

        <!-- headline with safety-orange highlights -->
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

        <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button :to="primaryLink" variant="solid">
            {{ primaryCTA }}
          </Button>
          <Button
            v-if="secondaryCTA && secondaryLink"
            :to="secondaryLink"
            variant="white"
          >
            {{ secondaryCTA }}
          </Button>
        </div>

        <!-- product-forward technical blueprint -->
        <div class="mt-12 w-full md:mt-16">
          <HeroBlueprint />
        </div>
      </div>
    </div>
  </section>
</template>
