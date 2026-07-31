<script setup lang="ts">
import { useRevealOnScroll } from '~/composables/useRevealOnScroll'
import { waLink } from '~/utils/whatsapp'

const props = defineProps<{
  headline: string
  description: string
  buttonText: string
  buttonLink: string
}>()

// Carries the section headline through so sales can see which CTA fired —
// every page passes a different one ("Butuh Solusi Conveyor?", "Tidak
// Menemukan yang Anda Cari?", "Punya Proyek Serupa?", ...).
const waHref = computed(() => waLink({ halaman: props.headline }))

const { root } = useRevealOnScroll()
</script>

<template>
  <section ref="root" class="bg-paper">
    <div class="frame border-b border-line">
      <div class="relative isolate overflow-hidden bg-paper-soft px-6 py-20 text-center md:px-10 md:py-28">
        <div class="pointer-events-none absolute inset-0 blueprint-grid opacity-70" aria-hidden="true" />
        <!-- restrained hazard cue -->
        <div class="hazard-stripe pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80" aria-hidden="true" />
        <div data-reveal-item class="relative">
          <p class="eyebrow justify-center text-accent">
            Mulai sekarang
          </p>
          <h2 class="display mx-auto mt-5 max-w-2xl text-3xl text-ink md:text-[2.75rem]">
            {{ headline }}
          </h2>
          <p class="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
            {{ description }}
          </p>
          <div class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <UiButton :href="buttonLink">
              {{ buttonText }}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </UiButton>
            <UiButton :href="waHref" variant="outline">WhatsApp</UiButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
