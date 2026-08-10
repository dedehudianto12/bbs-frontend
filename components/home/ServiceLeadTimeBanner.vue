<script setup lang="ts">
import { waLink } from '~/utils/whatsapp'
import { useRevealOnScroll } from '~/composables/useRevealOnScroll'

// LeadTimeBanner and ServiceBanner merged.
//
// They were one thought printed twice: "we are fast" and "we come to you".
// Both opened on the same sentence — LeadTimeBanner's description and
// ServiceBanner's body copy each began "Conveyor yang berhenti berarti produksi
// yang terhenti" — and back to back they cost two full sections and a tonal
// switch from paper to gold to say it.
//
// Everything asserted here is in the client's own company profile: the 2–3 day
// lead time and hot/cold joint from its values and services pages, and the
// onsite-or-workshop split verbatim ("JASA PENYAMBUNGAN : SITE DI PABRIK/ DI
// WORKSHOP KAMI"). Deliberately still not "24/7" — data/contact.ts puts
// jamOperasional at Mon–Fri 08:00–17:00 and Sat 08:00–12:00.
//
// Gold fills a field here rather than accenting an element, which is why this
// stays the only band that does it. The header is one short block and the
// detail sits in a hairline row beneath, so the accent buys density instead of
// two screens of scrolling.

defineProps<{
  days: string
  steps: { label: string; detail: string }[]
}>()

const consultHref = waLink()

const { root } = useRevealOnScroll({ stagger: 45 })
</script>

<template>
  <section ref="root" class="bg-accent">
    <div class="frame border-b border-ink/20 border-x-ink/20">
      <div class="px-6 py-12 md:px-10 md:py-16">
        <span class="eyebrow text-ink/55">Layanan dan Lead Time</span>

        <h2 class="display mt-5 max-w-3xl text-[1.75rem] text-ink md:text-[2.4rem]">
          Penyambungan dan reparasi di lokasi Anda, menjangkau seluruh
          Indonesia.
        </h2>

        <p class="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/70">
          Conveyor yang berhenti berarti produksi yang terhenti. Tim teknisi kami
          melaksanakan inspeksi dan penyambungan langsung di lokasi, meliputi hot
          joint, cold joint, dan perbaikan struktur, atau mengerjakannya di workshop
          kami.
        </p>

        <div class="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <UiButton href="/jasa/jasa-onsite-joint" variant="ink" :block="true" class="sm:!w-auto">
            Lihat Jasa Onsite Joint
          </UiButton>
          <UiButton :href="consultHref" variant="outline" :block="true" class="sm:!w-auto">
            <UiWhatsAppIcon class="h-4 w-4" />
            Konsultasi via WhatsApp
          </UiButton>
        </div>
      </div>

      <!-- Two photographs, because this band makes two claims and each one
           answers a different half.
           Left is a cleated incline belt climbing to a bagging hopper in a
           customer's shed, shot from the floor so the belt runs corner to
           corner through the strip. It is the plant itself answering "tim kami
           datang ke lokasi Anda" — a working line in a working building, not a
           product on a sweep.
           It is cut from a frame that has people in it, and deliberately does
           not show them: the crop is the band between the fitter at the head
           pulley and the operator in the foreground, which is where the belt
           is and where nobody's face is. See scripts/images/home-band.mjs.
           It replaced onsite-line.webp, a hard-hatted technician on the
           walkway of an installed line. That frame's argument was PPE and a
           tidy plant; this one's is the equipment, and the two people already
           in the hero carry the crew.
           Right is the same cleated belt, but installed and running on an
           incline in the customer's bay rather than coiled in our workshop.
           It replaced the coil shot, which had itself replaced rolls
           shrink-wrapped on a pallet — that one read at 576px as a tangle of
           plastic film rather than as belt, legible only at full size, which is
           not the size anyone sees it at. What carried the coil forward was the
           rhythm of the repeated cleats, and this frame keeps it exactly: the
           cleats march away into perspective and hold their shape all the way
           down to the 200px band on a phone.
           What it adds is the topic. This band's last step is "Pengiriman dan
           Instalasi" and the coil could not show it — a product photographed in
           our own workshop is inventory, and the claim being made here is
           service. Both photographs are now on a customer's site.
           The pairing is now belt on both sides — installed and climbing on the
           left, installed and running on the right — with the copy's two halves
           divided between them.
           Only the first shows below sm. At 360px a two-up would give each
           image about 180px of width, and at that size neither reads; one
           legible photograph beats two illegible ones.
           object-cover because these are bands that should fill their box, and
           empty alt because the copy above already says what they show. -->
      <div class="grid grid-cols-1 gap-px border-t border-ink/20 bg-ink/20 sm:grid-cols-2">
        <img
          src="/images/onsite-incline.webp"
          alt=""
          width="720"
          height="260"
          loading="lazy"
          decoding="async"
          class="h-[200px] w-full object-cover md:h-[280px]"
        />
        <img
          src="/images/onsite-instalasi.webp"
          alt=""
          width="1400"
          height="700"
          loading="lazy"
          decoding="async"
          class="hidden h-[200px] w-full object-cover sm:block md:h-[280px]"
        />
      </div>

      <!-- Lead time and the three process steps, as one hairline row. The 2–3
           used to be a 9rem numeral owning half a section of its own; at this
           size it still anchors the row while the steps that explain it stay on
           the same screen. gap-px over ink/20 keeps the gutters reading as
           hairlines, the same way the katalog band does on white/10. -->
      <div class="grid gap-px border-t border-ink/20 bg-ink/20 sm:grid-cols-2 lg:grid-cols-4">
        <div data-reveal-item class="flex flex-col justify-between bg-accent px-6 py-8 md:px-8">
          <span class="spec-key !text-ink/55">Lead time pengerjaan</span>
          <p class="mt-6 flex items-baseline gap-2">
            <span class="display text-[3.75rem] leading-none tabular-nums text-ink md:text-[4.5rem]">
              {{ days }}
            </span>
            <span class="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink/60">
              Hari
            </span>
          </p>
        </div>

        <div
          v-for="(step, i) in steps"
          :key="step.label"
          data-reveal-item
          class="flex flex-col bg-accent px-6 py-8 md:px-8"
        >
          <span class="num text-[12px] font-bold text-ink/45">
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <h3 class="mt-5 text-[15px] font-semibold text-ink">{{ step.label }}</h3>
          <p class="mt-2 text-[13px] leading-relaxed text-ink/65">{{ step.detail }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
