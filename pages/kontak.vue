<script setup lang="ts">
import { contactInfo } from '~/data/contact'
import { prettyPhone, waLink } from '~/utils/whatsapp'

// ── Why this page is built as a switchboard ─────────────────────────────────
//
// Four public registers now, same tokens: the home page is a cover (dark,
// photographic, one claim), Tentang Kami is a document (numbered sections,
// marginalia, a colophon), Jasa is a work order, and this is the panel you read
// to decide which line to pull.
//
// What it replaces was PageHero → a two-column stack of four `eyebrow + text`
// blocks → a 4:3 map. Every fact the client has was on it, which is why the
// brief was to make it better-looking rather than more complete. But the shape
// gave a reader nothing to act on: two WhatsApp buttons the size of tags, an
// email set as body copy, and opening hours printed as two flat sentences that
// cannot answer the only question anyone actually brings to a contact page at
// 19:40 on a Friday — is anybody there right now?
//
// So the information is unchanged and the form does the work:
//   · the hours become a live status and a week strip, not two sentences
//   · the three channels become three pressable cells, not two chips and a link
//   · the address keeps the map but gains a route out to Google Maps
//
// No colophon band at the end. Tentang Kami and Jasa both close by handing over
// the two sales lines, because on those pages that is a change of subject. Here
// it is the subject, and repeating it would be the page ending twice.

const { root: channelRoot } = useRevealOnScroll({ stagger: 70 })
const { root: placeRoot } = useRevealOnScroll({ stagger: 80 })

// The masthead button is a generic "start a chat", not a named person — the
// choice of staff is the Saluran section's job, further down.
const waHref1 = waLink()
const week = contactInfo.jamMingguan

// The masthead datasheet. Every line is already published elsewhere on this
// site — the free consultation and site survey from the announcement bar, the
// response time from the Tentang Kami colophon, the coverage and the workshop
// location from the company profile. Nothing here is a promise this page
// invented, which on a contact page matters more than anywhere else: it is the
// page a buyer reads at the moment he decides whether to make contact at all.
const DESK = [
  { key: 'Waktu respons', value: 'Ditanggapi dalam hitungan jam' },
  { key: 'Konsultasi', value: 'Tanpa biaya, termasuk survei lokasi' },
  { key: 'Jangkauan', value: 'Seluruh Indonesia' },
  { key: 'Kantor dan workshop', value: 'Pulo Gebang, Jakarta Timur' },
]

// ── The channels ────────────────────────────────────────────────────────────
//
// The four sales lines are four different people, not a primary and three
// fallbacks — so they are set as equals, and the note that explains the choice
// sits above the row rather than being guessed at four times inside it. We do
// not know how they split their work and will not imply a split we cannot
// support.
//
// They are a row of their own and the email is the cell beneath, rather than
// all five flowed through one grid: five cells in a three-up would leave a hole
// in the second row, and the email is a different kind of channel anyway —
// slower, written, and the one you use when there is a drawing to attach.
const SALES = contactInfo.salesNumbers.map((s, i) => ({
  key: s.label,
  value: prettyPhone(s.number),
  note: 'WhatsApp',
  href: waLink({}, (i + 1) as 1 | 2 | 3 | 4),
}))

const EMAIL = {
  key: 'Email',
  value: contactInfo.email,
  note: 'Untuk penawaran tertulis dan lampiran dokumen',
  href: `mailto:${contactInfo.email}`,
}

// ── Live status ─────────────────────────────────────────────────────────────
//
// Read in Asia/Jakarta, never in the visitor's own zone: the hours are printed
// WIB and a buyer opening this from Singapore or from a phone left on UTC would
// otherwise be told the office is shut while someone is sitting at the desk.
//
// Null until mounted, and the template falls back to the plain hours until it
// resolves. That is not just hydration safety — the server has no way to know
// what time it is for this reader without leaking its own clock into the HTML,
// and a cached page that says "Sedang buka" at 03:00 is worse than one that
// says nothing.
const WIB = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Jakarta',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  // h23 rather than hour12:false — the latter reports midnight as "24" on some
  // engines, which would put the reader an entire day out at exactly the hour
  // the answer flips.
  hourCycle: 'h23',
})

// Intl's weekday index is Sunday-first; jamMingguan is Monday-first, the way an
// Indonesian week is written.
// Typed as possibly-undefined so the guard below is a real check rather than a
// comparison TS considers impossible: a locale or engine that hands back an
// unexpected weekday token should leave the panel on its fallback, not index
// the week with NaN.
const WD_INDEX: Record<string, number | undefined> = {
  Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6,
}

const now = ref<{ day: number; minutes: number } | null>(null)

function readClock() {
  const parts = WIB.formatToParts(new Date())
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const day = WD_INDEX[get('weekday')]
  if (day === undefined) return
  now.value = { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

let tick: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  readClock()
  // A minute is the resolution the answer actually changes at, and this is one
  // arithmetic call — no observers, no rAF.
  tick = setInterval(readClock, 60_000)
})
onBeforeUnmount(() => {
  if (tick) clearInterval(tick)
})

const pad = (n: number) => String(n).padStart(2, '0')
const clockText = (m: number) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`

const status = computed(() => {
  if (!now.value) return null
  const { day, minutes } = now.value
  // Indexed access is `T | undefined` under the strict tsconfig, and `day` came
  // from an external formatter rather than a literal — so it is checked rather
  // than asserted.
  const today = week[day]
  if (!today) return null

  if (
    today.buka !== null &&
    today.tutup !== null &&
    minutes >= today.buka &&
    minutes < today.tutup
  ) {
    return {
      open: true,
      label: 'Sedang buka',
      detail: `Tutup pukul ${clockText(today.tutup)} WIB`,
    }
  }

  // Walk forward for the next opening, starting with the rest of today. Seven
  // steps covers the week; the eighth would be today again.
  for (let i = 0; i < 7; i++) {
    const d = week[(day + i) % 7]
    if (!d || d.buka === null) continue
    if (i === 0 && minutes >= d.buka) continue // already past today's window
    // "Buka" rather than "Buka lagi": before 08:00 on a working day it has not
    // opened yet, and "lagi" would be describing a reopening that never happened.
    const when = i === 0 ? 'hari ini' : i === 1 ? 'besok' : d.hari
    return {
      open: false,
      label: 'Di luar jam kerja',
      detail: `Buka ${when} pukul ${clockText(d.buka)} WIB`,
    }
  }
  return { open: false, label: 'Di luar jam kerja', detail: '' }
})

const nowText = computed(() => (now.value ? clockText(now.value.minutes) : null))

// ── Week strip geometry ─────────────────────────────────────────────────────
//
// One 06:00–19:00 axis for all seven rows. Fixed rather than fitted to the
// data: a strip that rescaled itself to the widest open day would make Saturday
// look the same length as Monday, which is the one thing the drawing exists to
// disprove.
const AXIS_START = 6 * 60
const AXIS_END = 19 * 60
const AXIS_SPAN = AXIS_END - AXIS_START
const AXIS_TICKS = [6, 9, 12, 15, 18]

const pct = (m: number) => ((m - AXIS_START) / AXIS_SPAN) * 100

// Resolved once rather than called from the template, so the bar geometry is
// computed a single time per row instead of once for `v-if` and again for
// `:style` — and so the template never needs a non-null assertion.
const rows = week.map((d) => ({
  hari: d.hari,
  ringkas: d.ringkas,
  closed: d.buka === null || d.tutup === null,
  range:
    d.buka === null || d.tutup === null
      ? 'Tutup'
      : `${clockText(d.buka)} – ${clockText(d.tutup)}`,
  bar:
    d.buka === null || d.tutup === null
      ? null
      : { left: `${pct(d.buka)}%`, width: `${pct(d.tutup) - pct(d.buka)}%` },
}))

// Only drawn while the clock is inside the axis — a marker pinned to 0% at
// 02:00 would claim a precision the drawing does not have.
const nowMark = computed(() => {
  if (!now.value) return null
  const { minutes } = now.value
  if (minutes < AXIS_START || minutes > AXIS_END) return null
  return `${pct(minutes)}%`
})

// Searched by address rather than routed to the pin. The coordinates below are
// district-level (see the map comment), and a "Rute ke sini" button that drives
// someone to the middle of Pulo Gebang is worse than a search that lands them
// on the street the letterhead prints.
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${contactInfo.alamat.replace(/\n/g, ', ')}`,
)}`

useSeo({
  title: 'Hubungi Kami',
  description:
    'Hubungi BBS Conveyor untuk konsultasi belt conveyor, roller, dan komponen industri. Dua nomor WhatsApp, email, dan alamat kantor dan workshop di Pulo Gebang, Cakung, Jakarta Timur.',
})
</script>

<template>
  <div class="bg-paper">
    <!-- ══ MASTHEAD ══════════════════════════════════════════════════════
         Title block on the left, and opposite it the one thing this page can
         say that no other page can: whether there is anybody at the desk at the
         moment you are reading it. PageHero is deliberately absent — it is the
         standard inner-page band, and keeping it would have made this look like
         a subpage that had been tidied rather than rethought. -->
    <section class="frame border-b border-line">
      <div class="grid lg:grid-cols-12">
        <div class="px-5 pb-12 pt-12 md:px-8 md:pb-14 md:pt-16 lg:col-span-7 lg:pr-12">
          <p class="eyebrow text-accent">Kontak</p>
          <h1 class="display kontak-h1 mt-6 text-ink">
            Terhubung langsung<br class="hidden sm:inline" />
            dengan tim teknis kami
          </h1>
          <p class="mt-7 max-w-md text-lg leading-relaxed text-muted">
            Dua nomor WhatsApp, satu alamat email, dan satu lokasi kantor. Konsultasi
            dan survei lokasi tidak dipungut biaya, dan permintaan Anda ditangani
            langsung oleh tim yang mengerjakannya.
          </p>
        </div>

        <!-- The status panel. Gold is the system's CTA colour and is spent
             elsewhere on this page, so the live state uses --signal, the token
             the design system reserves for exactly this and which nothing on
             the public surface had yet spent. -->
        <aside class="border-t border-line lg:col-span-5 lg:border-l lg:border-t-0">
          <div class="flex h-full flex-col justify-between gap-8 px-5 py-10 md:px-8">
            <div>
              <div class="flex items-center gap-4 md:gap-6">
                <span class="spec-key shrink-0 !text-ink">Status</span>
                <span class="h-px flex-1 bg-ink/[0.18]" aria-hidden="true" />
                <span v-if="nowText" class="num shrink-0 text-[13px] font-semibold text-ink">
                  {{ nowText }}
                </span>
              </div>

              <!-- aria-live so a screen reader that is on the page when the
                   minute rolls over is told, rather than being left with a
                   status that silently stopped being true. -->
              <div class="mt-7" aria-live="polite">
                <p v-if="status" class="flex items-center gap-3">
                  <span
                    class="kontak-dot"
                    :class="status.open ? 'kontak-dot-on' : 'kontak-dot-off'"
                    aria-hidden="true"
                  />
                  <span class="display text-2xl leading-none text-ink md:text-[1.75rem]">
                    {{ status.label }}
                  </span>
                </p>
                <p v-else class="display text-2xl leading-none text-ink md:text-[1.75rem]">
                  Jam kerja
                </p>

                <p class="mt-4 text-[14px] leading-relaxed text-muted">
                  <template v-if="status">{{ status.detail }}</template>
                  <template v-else>{{ contactInfo.jamSingkat }}</template>
                </p>
              </div>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row">
              <UiButton :href="waHref1" :block="true" class="sm:!w-auto">
                <UiWhatsAppIcon class="h-4 w-4" />
                Hubungi via WhatsApp
              </UiButton>
              <UiButton href="#alamat" variant="outline" :block="true" class="sm:!w-auto">
                Lihat Alamat
              </UiButton>
            </div>
          </div>
        </aside>
      </div>

      <!-- The desk, as a datasheet across the foot of the masthead — the same
           hairline row the home hero, the About masthead and the Jasa masthead
           use for facts, so a reader who has seen any of them knows to read
           this one the same way. -->
      <dl class="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="row in DESK" :key="row.key" class="bg-paper px-5 py-6 md:px-8">
          <dt class="spec-key">{{ row.key }}</dt>
          <dd class="mt-2.5 text-[14px] leading-snug text-ink">{{ row.value }}</dd>
        </div>
      </dl>
    </section>

    <!-- ══ SALURAN ═══════════════════════════════════════════════════════
         Five cells, each one entirely pressable: four sales lines in a row of
         their own, the email full-width beneath. The numbers are set at a size
         where they can be read off a screen and dialled from another phone,
         because that is what half of these readers will do with them. -->
    <section ref="channelRoot" class="frame border-b border-line">
      <div class="px-5 pt-14 md:px-8 md:pt-20">
        <div class="flex items-center gap-4 md:gap-6">
          <span class="spec-key shrink-0 !text-ink">Saluran</span>
          <span class="h-px flex-1 bg-ink/[0.18]" aria-hidden="true" />
          <span class="num shrink-0 text-[13px] font-semibold text-ink">03</span>
        </div>
        <p class="mt-8 max-w-xl text-base leading-relaxed text-muted">
          Keempat nomor di bawah ditangani oleh staf yang berbeda, bukan nomor
          cadangan. Anda dapat menghubungi salah satunya, atau melanjutkan ke nomor
          yang sebelumnya sudah Anda hubungi.
        </p>
      </div>

      <div class="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        <a
          v-for="ch in SALES"
          :key="ch.key"
          :href="ch.href"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal-item
          class="kontak-cell group flex flex-col justify-between gap-8 bg-paper px-5 py-8 md:px-8 md:py-10"
        >
          <div>
            <p class="spec-key !text-accent">{{ ch.key }}</p>
            <p class="kontak-value num mt-4 font-semibold text-ink">{{ ch.value }}</p>
          </div>
          <p class="flex items-center gap-2 text-[13px] text-muted">
            <UiWhatsAppIcon class="h-4 w-4 shrink-0" />
            <span>{{ ch.note }}</span>
            <span class="kontak-arrow ml-auto shrink-0 text-ink" aria-hidden="true">→</span>
          </p>
        </a>
      </div>

      <div class="grid gap-px border-t border-line bg-line">
        <a
          :href="EMAIL.href"
          data-reveal-item
          class="kontak-cell group flex flex-col justify-between gap-8 bg-paper px-5 py-8 md:px-8 md:py-10"
        >
          <div>
            <p class="spec-key !text-accent">{{ EMAIL.key }}</p>
            <p class="kontak-value num mt-4 font-semibold text-ink">{{ EMAIL.value }}</p>
          </div>
          <p class="flex items-center gap-2 text-[13px] text-muted">
            <span>{{ EMAIL.note }}</span>
            <span class="kontak-arrow ml-auto shrink-0 text-ink" aria-hidden="true">→</span>
          </p>
        </a>
      </div>
    </section>

    <!-- ══ JAM KERJA ═════════════════════════════════════════════════════
         The page's one dark band, and the hours drawn instead of stated. Two
         sentences of prose cannot show that Saturday is a half day at a glance,
         and cannot show you where in the week you currently are. It sits in the
         middle rather than at the end: the footer below is the steel anchor,
         and two dark blocks in a row read as one. -->
    <section class="kontak-band">
      <div class="frame frame-dark">
        <div class="px-5 pt-16 md:px-8 md:pt-20">
          <div class="flex items-center gap-4 md:gap-6">
            <span class="spec-key shrink-0 !text-white">Jam Operasional</span>
            <span class="h-px flex-1 bg-white/20" aria-hidden="true" />
            <span class="spec-key shrink-0 !text-white/45">WIB</span>
          </div>
          <p class="mt-8 max-w-xl text-base leading-relaxed text-white/60">
            Kami beroperasi enam hari dalam seminggu, dengan hari Sabtu setengah hari.
            Di luar jam tersebut, pesan WhatsApp tetap dapat dikirimkan.
          </p>
        </div>

        <div class="px-5 pb-14 pt-10 md:px-8 md:pb-16">
          <!-- The axis. Hidden from assistive tech: the <dl> below already
               states every range in words, and reading out five bare hour
               labels first would only get in the way of it. -->
          <div class="kontak-axis" aria-hidden="true">
            <span />
            <span class="kontak-axis-line">
              <span
                v-for="t in AXIS_TICKS"
                :key="t"
                class="kontak-tick num"
                :style="{ left: `${pct(t * 60)}%` }"
              >{{ pad(t) }}</span>
            </span>
            <span />
          </div>

          <dl class="mt-2">
            <div
              v-for="(d, i) in rows"
              :key="d.hari"
              class="kontak-row"
              :class="{ 'kontak-row-today': now && now.day === i }"
            >
              <dt class="kontak-day spec-key">
                <span
                  v-if="now && now.day === i"
                  class="kontak-dot kontak-dot-today"
                  aria-hidden="true"
                />
                <span class="sm:hidden">{{ d.ringkas }}</span>
                <span class="hidden sm:inline">{{ d.hari }}</span>
              </dt>

              <!-- The drawing of the range the next cell states in words. -->
              <dd aria-hidden="true">
                <span class="kontak-track">
                  <span
                    v-if="d.bar"
                    class="kontak-bar"
                    :style="{ left: d.bar.left, width: d.bar.width }"
                  />
                  <span
                    v-if="nowMark && now && now.day === i"
                    class="kontak-now"
                    :style="{ left: nowMark }"
                  />
                </span>
              </dd>

              <dd class="kontak-range num" :class="d.closed ? 'text-white/35' : 'text-white'">
                {{ d.range }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- ══ ALAMAT ════════════════════════════════════════════════════════
         The map given real estate instead of a 4:3 thumbnail, and a way out of
         it. A supplier that prints a street but leaves you to retype it into
         your own maps app has stopped one step short. Closing on paper: the
         footer directly below is the steel anchor. -->
    <section id="alamat" ref="placeRoot" class="frame scroll-mt-24">
      <div class="px-5 pt-14 md:px-8 md:pt-20">
        <div class="flex items-center gap-4 md:gap-6">
          <span class="spec-key shrink-0 !text-ink">Alamat</span>
          <span class="h-px flex-1 bg-ink/[0.18]" aria-hidden="true" />
        </div>
        <p class="mt-8 max-w-xl text-base leading-relaxed text-muted">
          Kantor dan workshop kami berada di satu lokasi. Belt yang tidak dapat
          dikerjakan di tempat Anda akan ditangani di sini.
        </p>
      </div>

      <div class="mt-10 grid gap-px border-t border-line bg-line lg:grid-cols-12">
        <!-- Map — district-level pin for Pulo Gebang, Cakung, matching
             contactInfo.alamat. The previous coordinates (-6.195, 106.895) sat
             in Pulogadung, a different district several km away, and the label
             contradicted the address printed directly beside it.
             TODO: replace with the exact Jl. Pulo Bangka pin once confirmed. -->
        <div data-reveal-item class="bg-paper lg:col-span-7">
          <ClientOnly>
            <MapLocation
              :lat="-6.1856"
              :lng="106.9464"
              label="CV Bintang Berjaya Satu — Pulo Gebang, Cakung, Jakarta Timur"
              ratio-class="aspect-[4/3] lg:aspect-[16/11]"
              :bordered="false"
            />
            <!-- Reserves the same box before Leaflet lands, so the datasheet
                 beside it does not jump a screen-height on hydration. -->
            <template #fallback>
              <div class="aspect-[4/3] w-full bg-paper-soft lg:aspect-[16/11]" />
            </template>
          </ClientOnly>
        </div>

        <div data-reveal-item class="flex flex-col justify-between gap-8 bg-paper px-5 py-8 md:px-8 md:py-10 lg:col-span-5">
          <dl>
            <div class="border-t border-line py-4 first:border-t-0 first:pt-0">
              <dt class="spec-key">Kantor dan workshop</dt>
              <dd class="mt-2.5 whitespace-pre-line text-[14px] leading-relaxed text-ink">
                {{ contactInfo.alamat }}
              </dd>
            </div>
            <div class="border-t border-line py-4">
              <dt class="spec-key">Jam operasional</dt>
              <dd class="mt-2.5 whitespace-pre-line text-[14px] leading-relaxed text-ink">
                {{ contactInfo.jamOperasional }}
              </dd>
            </div>
            <div class="border-t border-line py-4">
              <dt class="spec-key">Telepon</dt>
              <dd class="mt-2.5 text-[14px] leading-relaxed">
                <!-- tel: off teleponTel, not off the display string — see the
                     note on both fields in data/contact.ts. -->
                <a :href="`tel:${contactInfo.teleponTel}`" class="kontak-link text-ink">
                  {{ contactInfo.telepon }}
                </a>
              </dd>
            </div>
            <div class="border-y border-line py-4">
              <dt class="spec-key">Email</dt>
              <dd class="mt-2.5 text-[14px] leading-relaxed">
                <a :href="`mailto:${contactInfo.email}`" class="kontak-link text-ink">
                  {{ contactInfo.email }}
                </a>
              </dd>
            </div>
          </dl>

          <div class="flex flex-col gap-3 sm:flex-row">
            <UiButton :href="mapsHref" variant="outline" :block="true" class="sm:!w-auto">
              Buka di Google Maps
            </UiButton>
            <UiButton
              :href="waLink()"
              :block="true"
              class="sm:!w-auto"
            >
              <UiWhatsAppIcon class="h-4 w-4" />
              Tanya Lokasi
            </UiButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Sized off the viewport so the two lines hold their shape from 360px up —
   same treatment as the Jasa masthead. */
.kontak-h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
}

/* ── Status dot ─────────────────────────────────────────────────────────
   Square, not round. This carried `border-radius: 9999px` on the argument that
   the one circle on a page of hard 0px geometry reads as an indicator — but the
   geometry rule is pinned to 0 across the whole public surface, focus rings
   included, and HeroSection's own rail comment rejects exactly this exception
   for exactly this reason. A square marker in --signal reads as an indicator
   *because* everything around it is square; it does not need a radius to be
   legible, and the system does not survive one-off exemptions. */
.kontak-dot {
  position: relative;
  width: 0.625rem;
  height: 0.625rem;
  flex-shrink: 0;
}
.kontak-dot-on {
  background: rgb(var(--signal));
}
/* The halo is its own element on transform + opacity rather than an animated
   box-shadow, which would relayout-paint every frame. Declared locally because
   the config's `pulse-glow` keyframes are only emitted if some template uses
   `animate-pulse-glow`, and none does — relying on it would have shipped an
   animation that silently never ran. */
.kontak-dot-on::after {
  content: '';
  position: absolute;
  inset: -0.3rem;
  background: rgb(var(--signal) / 0.25);
  animation: kontak-halo 2.6s var(--ease-out) infinite;
}
@keyframes kontak-halo {
  0% {
    transform: scale(0.7);
    opacity: 0.9;
  }
  70%,
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
.kontak-dot-off {
  background: rgb(var(--muted) / 0.45);
}
.kontak-dot-today {
  background: rgb(var(--accent));
  width: 0.5rem;
  height: 0.5rem;
}
@media (prefers-reduced-motion: reduce) {
  .kontak-dot-on::after {
    animation: none;
    opacity: 0;
  }
}

/* ── Channel cells ──────────────────────────────────────────────────────
   The card-shell vocabulary (hairline darkens, surface lifts, arrow steps)
   without card-shell itself: these sit in a `gap-px bg-line` grid, where a
   per-cell border would double the seam it already paints. */
.kontak-cell {
  transition: background-color 140ms ease;
}
.kontak-arrow {
  transition: transform 140ms var(--ease-out);
}
.kontak-value {
  font-size: clamp(1.05rem, 2.4vw, 1.25rem);
  letter-spacing: -0.01em;
  /* An email address is one unbreakable token at 360px and will push the grid
     wider than the viewport unless it is allowed to break anywhere. */
  overflow-wrap: anywhere;
}
@media (hover: hover) and (pointer: fine) {
  .kontak-cell:hover {
    background-color: rgb(var(--paper-soft));
  }
  .kontak-cell:hover .kontak-value {
    color: rgb(var(--accent));
  }
  .kontak-cell:hover .kontak-arrow {
    transform: translateX(3px);
  }
}
.kontak-cell:active {
  background-color: rgb(var(--paper-soft));
}
@media (prefers-reduced-motion: reduce) {
  .kontak-arrow {
    transition: none;
  }
  .kontak-cell:hover .kontak-arrow {
    transform: none;
  }
}

/* ── The dark band ──────────────────────────────────────────────────────
   Same ink → steel diagonal as the home cover, the About Visi band and the
   Jasa hot/cold band. Four dark grounds on the site, one material. */
.kontak-band {
  background: linear-gradient(152deg, rgb(var(--ink)) 0%, rgb(var(--steel)) 100%);
}

/* ── Week strip ─────────────────────────────────────────────────────────
   One grid template shared by the axis and every row, so the hour ticks stay
   registered to the bars they label. */
.kontak-axis,
.kontak-row {
  display: grid;
  grid-template-columns: 3.25rem 1fr 5.75rem;
  align-items: center;
  gap: 0.75rem;
}
@media (min-width: 640px) {
  .kontak-axis,
  .kontak-row {
    grid-template-columns: 5.5rem 1fr 7.5rem;
    gap: 1.25rem;
  }
}

/* Needs its own height: the ticks inside are absolutely positioned, so the
   track would otherwise collapse to 0 and drop them onto the first row. */
.kontak-axis-line {
  position: relative;
  display: block;
  height: 0.85rem;
}
.kontak-tick {
  position: absolute;
  top: 0;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.35);
  /* Centred on the minute it names, so a tick sits directly above the point in
     the bar it labels. */
  transform: translateX(-50%);
}
/* 06:00 is the axis origin — centring it would hang half the label off the
   left edge. The 18:00 end needs no such correction: it lands at 92.3%, not
   100%, so its right half still has track under it. */
.kontak-tick:first-child {
  transform: none;
}

.kontak-row {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.6rem 0;
}
.kontak-row:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.kontak-row-today .kontak-day {
  color: #fff !important;
}

.kontak-day {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: rgba(255, 255, 255, 0.45) !important;
}

/* The closed-day ground. A day with no bar still gets its track, because an
   empty row and a missing row look identical and only one of them is true. */
.kontak-track {
  position: relative;
  display: block;
  height: 0.5rem;
  background: rgba(255, 255, 255, 0.07);
}
.kontak-bar {
  position: absolute;
  top: 0;
  bottom: 0;
  background: rgb(var(--accent));
}
.kontak-row-today .kontak-bar {
  background: rgb(var(--accent-glow));
}
/* The live minute. White against gold so it stays visible inside the bar and
   against the empty track outside it. */
.kontak-now {
  position: absolute;
  top: -0.25rem;
  bottom: -0.25rem;
  width: 2px;
  margin-left: -1px;
  background: #fff;
}

.kontak-range {
  font-size: 11px;
  text-align: right;
  white-space: nowrap;
}
@media (min-width: 640px) {
  .kontak-range {
    font-size: 12px;
  }
}

/* ── Links ──────────────────────────────────────────────────────────────
   Underline-on-hover rather than a colour swap, matching .about-link. */
.kontak-link {
  text-decoration: underline;
  text-decoration-color: rgb(var(--ink) / 0.25);
  text-underline-offset: 4px;
  transition: text-decoration-color 140ms ease, color 140ms ease;
}
/* Gated, like every other hover rule in this file. Ungated, a tap on the email
   address on Android leaves it stuck gold — touch fires :hover and never clears
   it. The .about-link this claims to match is gated too; this rule was the one
   that missed. */
@media (hover: hover) and (pointer: fine) {
  .kontak-link:hover {
    color: rgb(var(--accent));
    text-decoration-color: rgb(var(--accent));
  }
}
/* Touch gets its feedback here instead. */
.kontak-link:active {
  color: rgb(var(--accent));
  text-decoration-color: rgb(var(--accent));
}
</style>
