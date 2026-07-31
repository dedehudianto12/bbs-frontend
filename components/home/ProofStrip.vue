<script setup lang="ts">
import { useRevealOnScroll } from '~/composables/useRevealOnScroll'

// What replaced StatisticsSection.
//
// That section presented four invented figures (14 tahun / 500 proyek /
// 120 klien / 25 teknisi) above a hardcoded SVG path animated as a real growth
// series. None of it came from the client — their own company profile
// (bbsconveyor.com, Dec 2024) states no founding year and no figures at all.
//
// Every line below is quotable from that document: the 2–3 day lead time and
// the splicing guarantee from the values page, the hot/cold joint methods and
// the onsite-or-workshop split from the services page, the industries from its
// numbered list. No count is asserted that the client has not published — the
// industries cell names sectors rather than counting them, because the source
// lists eight and then adds "industri lainnya", so any total would be a guess.
//
// It also answers better questions. A maintenance manager whose line stopped
// this morning wants to know how fast, what method, and whether anyone comes
// to him. He does not want to know how many clients we have.
const FACTS = [
  { key: 'Lead time', value: '2–3 hari' },
  { key: 'Penyambungan', value: 'Hot & cold joint' },
  { key: 'Lokasi pengerjaan', value: 'Di pabrik Anda atau workshop kami' },
  { key: 'Industri', value: 'Manufaktur, food, farmasi, hingga tambang' },
]

const { root } = useRevealOnScroll({ stagger: 45 })
</script>

<template>
  <!-- Shares paper-soft with ProofMarquee directly above it, so the marquee and
       these four cells read as one proof band rather than two stacked sections. -->
  <section ref="root" class="bg-paper-soft">
    <div class="frame border-b border-line">
      <!-- gap-px on the hairline colour: the gutters are the borders. Two-up on
           a 360px phone rather than four, so no value is squeezed to one word
           per line. -->
      <dl class="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
        <div
          v-for="fact in FACTS"
          :key="fact.key"
          data-reveal-item
          class="bg-paper-soft px-5 py-7 md:px-6 md:py-9"
        >
          <dt class="spec-key">{{ fact.key }}</dt>
          <dd class="display mt-2.5 text-[1.05rem] leading-snug text-ink md:text-[1.2rem]">
            {{ fact.value }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
