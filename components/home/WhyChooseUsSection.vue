<script setup lang="ts">
import { useRevealOnScroll } from '~/composables/useRevealOnScroll'

defineProps<{
  items: { title: string; description: string }[]
}>()

// Four items across four columns, so the row closes on its own.
//
// This used to be a 3-column grid holding the four values plus a "Butuh bantuan
// memilih?" CTA cell plus up to two invisible filler cells, purely to keep the
// hairline grid rectangular. The CTA was doing no work — CTASection sits two
// screens below saying the same thing, the navbar and the floating button both
// offer WhatsApp, and it displaced a value the client actually published. With
// the filler machinery gone the section is one clean strip.

const { root } = useRevealOnScroll({ stagger: 45 })
</script>

<template>
  <section ref="root" class="bg-paper">
    <div class="frame border-b border-line">
      <div class="border-b border-line px-6 py-14 md:px-10 md:py-16">
        <SectionTitle
          eyebrow="Kenapa BBS Conveyor"
          title="Mitra terpercaya untuk conveyor industri"
          description="Empat alasan perusahaan di seluruh Indonesia mempercayakan kebutuhan conveyor mereka kepada kami."
        />
      </div>

      <div class="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(item, i) in items"
          :key="item.title"
          data-reveal-item
          class="bg-paper p-6 md:p-7"
        >
          <span class="num text-sm font-semibold text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="mt-5 text-[17px] font-semibold leading-snug text-ink">{{ item.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
