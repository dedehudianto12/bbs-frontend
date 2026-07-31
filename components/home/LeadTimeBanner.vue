<script setup lang="ts">
// ponytail: lead-time promise — the single strongest conversion lever for
// factory buyers who need urgent conveyor replacement parts.
// Data sourced from live site https://bbsconveyor.com/
// "Kami menjamin lead time pengerjaan produk hanya 2-3 hari"

import { useRevealOnScroll } from '~/composables/useRevealOnScroll'

defineProps<{
  days: string
  headline: string
  description: string
  steps: { label: string; detail: string }[]
}>()

const { root } = useRevealOnScroll({ stagger: 60 })
</script>

<template>
  <section ref="root" class="relative bg-paper">
    <div class="pointer-events-none absolute inset-0 blueprint-grid opacity-60" aria-hidden="true" />
    <div class="frame border-b border-line">
      <div class="grid items-center lg:grid-cols-2">
        <!-- Left: large days range -->
        <div data-reveal-item class="flex flex-col items-center justify-center gap-2 border-b border-line px-8 py-14 md:py-20 lg:border-b-0 lg:border-r lg:py-16">
          <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Lead Time Pengerjaan</p>
          <p class="display text-[7rem] leading-none tabular-nums text-ink md:text-[9rem]">
            {{ days }}
          </p>
          <p class="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink/60">Hari</p>
        </div>

        <!-- Right: context + process steps -->
        <div data-reveal-item class="flex flex-col justify-center gap-8 px-8 py-14 md:px-12 md:py-16 lg:py-16">
          <div>
            <h2 class="display text-2xl text-ink md:text-[1.75rem]">{{ headline }}</h2>
            <p class="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{{ description }}</p>
          </div>

          <!-- Process steps — vertical timeline -->
          <div class="relative">
            <div
              v-for="(step, i) in steps"
              :key="step.label"
              class="relative flex gap-5 pb-7 last:pb-0"
            >
              <!-- Timeline stem -->
              <div class="relative flex flex-col items-center">
                <div
                  class="num relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-none text-[11px] font-bold transition-colors duration-150"
                  :class="i === 0 ? 'bg-accent text-white shadow-[0_0_0_4px_rgb(var(--accent)/0.12)]' : 'bg-white text-muted ring-1 ring-inset ring-line'"
                >
                  {{ i + 1 }}
                </div>
                <div
                  v-if="i < steps.length - 1"
                  class="absolute top-6 h-[calc(100%+1.75rem)] w-px"
                  :class="i === 0 ? 'bg-accent/25' : 'bg-line'"
                />
              </div>

              <!-- Content -->
              <div class="min-w-0 pt-0.5">
                <h4 class="text-[15px] font-semibold text-ink">{{ step.label }}</h4>
                <p class="mt-1 max-w-sm text-[13px] leading-relaxed text-muted">{{ step.detail }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
