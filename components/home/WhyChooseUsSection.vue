<script setup lang="ts">
import { useRevealOnScroll } from '~/composables/useRevealOnScroll'

defineProps<{
  items: { icon?: string; title: string; description: string }[]
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
      <!-- Header trimmed to eyebrow and title. The standfirst under it read
           "Empat alasan perusahaan di seluruh Indonesia mempercayakan kebutuhan
           conveyor mereka kepada kami" — which said nothing the four cells below
           do not say better, and asserted a nationwide client base we have no
           source for. -->
      <div class="border-b border-line px-6 py-12 md:px-10 md:py-14">
        <SectionTitle
          eyebrow="Mengapa BBS Conveyor"
          title="Mitra terpercaya untuk conveyor industri"
        />
      </div>

      <div class="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        <!-- Icon replaces the 01–04 numeral. The numbers implied a ranking or a
             sequence and these four values are neither; a pictogram is read at
             a glance where a number has to be counted. The index stays visible
             as a small ordinal beside it, because losing it entirely made the
             four cells harder to scan as a set. -->
        <div
          v-for="(item, i) in items"
          :key="item.title"
          data-reveal-item
          class="bg-paper p-6 md:p-7"
        >
          <div class="flex items-center gap-3">
            <ValueIcon :name="item.icon" class="h-[22px] w-[22px] shrink-0 text-accent" />
            <span class="num text-[11px] font-semibold text-muted/70">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
          </div>
          <h3 class="mt-5 text-[17px] font-semibold leading-snug text-ink">{{ item.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
