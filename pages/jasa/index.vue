<script setup lang="ts">
import { contactInfo } from '~/data/contact'
import { JOINT_METHODS, SERVICE_DOSSIERS, SERVICE_ORDER, WORK_PLACES } from '~/data/services'
import { prettyPhone, waLink } from '~/utils/whatsapp'

// ── Why this page is built as a job sheet ───────────────────────────────────
//
// The three public registers on this site now: the home page is a cover (dark,
// photographic, one claim), Tentang Kami is a document (paper, numbered
// sections, marginalia), and this is a work order. Same tokens, third voice.
//
// What it replaces was PageHero → three-up ServiceCard grid → shared
// CTASection: the same four components /produk and /artikel already use, and
// with `services.images` empty in the database, four grey gradient placeholders
// where the photographs should be. The page sold nothing because it showed
// nothing — a buyer could not tell from it whether we had ever touched a
// conveyor.
//
// The rework is built on one observation: a reader arrives here with a symptom,
// not a product name. He does not know he wants "Profile Guide Belt"; he knows
// his belt keeps walking off the pulley. So every row opens with the complaint
// and only then names the service, each row carries a real photograph of that
// work being done, and the two questions the old page never answered — where do
// you do it, and hot or cold — get a band each.
//
// Photographs are the client's own site-activity set, cropped in _jasa_img.mjs.

const { get } = useApi()

const { data: serviceRes, error: serviceErr } = await useAsyncData('jasa-listing', () =>
  get<any[]>('/jasa'),
)

// The API is the source of truth for which services exist and what they are
// called; data/services.ts supplies the plate and the datasheet. A row the
// dossier does not recognise still renders — it just has no photograph — so
// adding a service in admin never blanks this page.
const services = computed(() => {
  const rows = (serviceRes.value?.data ?? []).map((s: any) => ({
    slug: s.slug as string,
    title: s.name as string,
    description: (s.shortDescription ?? null) as string | null,
    dossier: SERVICE_DOSSIERS[s.slug],
  }))

  // Most urgent first. Anything not in SERVICE_ORDER falls to the end in the
  // order the API returned it, which is insert order.
  const rank = (slug: string) => {
    const i = (SERVICE_ORDER as readonly string[]).indexOf(slug)
    return i === -1 ? Number.MAX_SAFE_INTEGER : i
  }
  return [...rows].sort((a, b) => rank(a.slug) - rank(b.slug))
})

const { root: placeRoot } = useRevealOnScroll({ stagger: 90 })
const { root: listRoot } = useRevealOnScroll({ stagger: 60 })
const { root: jointRoot } = useRevealOnScroll({ stagger: 90 })

const phone1 = prettyPhone(contactInfo.waSales1)
const phone2 = prettyPhone(contactInfo.waSales2)

// The masthead datasheet. Every line is quotable from the service descriptions
// in the database or from the company profile — none of it is a promise this
// page invented.
const SCOPE = [
  { key: 'Penyambungan', value: 'Hot joint dan cold joint' },
  { key: 'Lokasi kerja', value: 'Pabrik Anda atau workshop kami' },
  { key: 'Jangkauan', value: 'Seluruh Indonesia' },
  { key: 'Garansi', value: 'Setiap penyambungan' },
]

// What to send so the first reply can be useful instead of a list of questions.
const BRIEF = [
  {
    key: '01',
    label: 'Foto belt',
    note: 'Bagian sambungan yang rusak atau permukaan yang aus, diambil dari jarak dekat.',
  },
  {
    key: '02',
    label: 'Dimensi belt',
    note: 'Lebar, panjang, dan ketebalan bila tersedia. Bila belum diketahui, tim kami yang melakukan pengukuran.',
  },
  {
    key: '03',
    label: 'Lokasi pabrik',
    note: 'Menentukan apakah pekerjaan dilakukan di lokasi Anda atau di workshop kami.',
  },
]

useSeoMeta({
  title: 'Jasa Belt Conveyor — Onsite Joint, Reparasi, Cleat dan Guide — BBS Conveyor',
  description:
    'Penyambungan belt conveyor hot joint dan cold joint di pabrik Anda atau di workshop kami di Pulo Gebang. Melayani reparasi, pemasangan profile guide, dan incline cleated belt. CV Bintang Berjaya Satu.',
})
</script>

<template>
  <div class="bg-paper">
    <!-- ══ MASTHEAD ══════════════════════════════════════════════════════
         The title block against one photograph of a job starting: an engineer
         with a clipboard, under the customer's own conveyor gallery, talking to
         the customer's own crew. It is the only frame in the set with both
         sides of the transaction in it, which is exactly what a services page
         has to establish before it lists anything. -->
    <section class="frame border-b border-line">
      <div class="grid lg:grid-cols-12">
        <div class="px-5 pb-12 pt-12 md:px-8 md:pb-14 md:pt-16 lg:col-span-6 lg:pr-10">
          <p class="eyebrow text-accent">Layanan</p>
          <h1 class="display jasa-h1 mt-6 text-ink">
            Layanan teknis untuk<br class="hidden sm:inline" />
            conveyor Anda
          </h1>
          <p class="mt-7 max-w-md text-lg leading-relaxed text-muted">
            Penyambungan, perbaikan, pemasangan profile guide, dan penanganan jalur
            miring. Seluruh pekerjaan dilakukan di pabrik Anda atau di workshop kami di
            Pulo Gebang, dan setiap penyambungan bergaransi.
          </p>

          <div class="mt-9 flex flex-col gap-3 sm:flex-row">
            <UiButton :href="waLink({ halaman: 'Jasa — masthead' })">
              <UiWhatsAppIcon class="h-4 w-4" />
              Konsultasi Gratis
            </UiButton>
            <UiButton href="#layanan" variant="outline">Lihat 4 Layanan</UiButton>
          </div>
        </div>

        <!-- Runs to the frame's edge and to the full height of the title block:
             a photograph inside the same padding as the text would read as an
             illustration of the copy rather than as the page's ground. -->
        <figure class="relative border-t border-line lg:col-span-6 lg:border-l lg:border-t-0">
          <img
            src="/images/jasa-site-splice.webp"
            alt="Dua teknisi BBS Conveyor menyambung belt biru dengan mesin press portabel di lantai produksi pelanggan"
            width="900"
            height="1200"
            fetchpriority="high"
            decoding="async"
            class="aspect-[3/2] h-full w-full object-cover lg:aspect-auto lg:min-h-[26rem]"
          />
          <!-- Short enough to set on one line at 360px: a caption that wraps
               inside its own scrim reads as a caption that overflowed. -->
          <figcaption class="jasa-cap spec-key">Penyambungan di lokasi pelanggan</figcaption>
        </figure>
      </div>

      <!-- The scope, as a datasheet across the foot of the masthead. Four cells
           on one hairline grid — the same register the home hero and the About
           masthead use for facts, so a reader who has seen either knows to
           trust this row the same way. -->
      <dl class="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="row in SCOPE" :key="row.key" class="bg-paper px-5 py-6 md:px-8">
          <dt class="spec-key">{{ row.key }}</dt>
          <dd class="mt-2.5 text-[14px] leading-snug text-ink">{{ row.value }}</dd>
        </div>
      </dl>
    </section>

    <!-- ══ DI MANA ═══════════════════════════════════════════════════════
         The first question a buyer has about any of the four, and the one the
         old page left him to guess. Two panels, two photographs, no ranking
         between them — which one applies is decided by his belt, not by us. -->
    <section ref="placeRoot" class="frame border-b border-line">
      <div class="px-5 pt-14 md:px-8 md:pt-20">
        <div class="flex items-center gap-4 md:gap-6">
          <span class="spec-key shrink-0 !text-ink">Lokasi Pengerjaan</span>
          <span class="h-px flex-1 bg-ink/[0.18]" aria-hidden="true" />
        </div>
        <p class="mt-8 max-w-xl text-base leading-relaxed text-muted">
          Tersedia dua pilihan lokasi pengerjaan. Penentuannya didasarkan pada kondisi
          belt dan jalur produksi Anda.
        </p>
      </div>

      <div class="mt-10 grid gap-px bg-line md:grid-cols-2">
        <article v-for="place in WORK_PLACES" :key="place.key" data-reveal-item class="bg-paper">
          <figure class="relative">
            <img
              :src="place.photo"
              :alt="place.alt"
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
              class="aspect-[3/2] w-full object-cover"
            />
            <figcaption class="jasa-cap spec-key">{{ place.caption }}</figcaption>
          </figure>
          <div class="px-5 py-8 md:px-8">
            <p class="spec-key !text-accent">{{ place.key }}</p>
            <h3 class="display mt-3 text-xl text-ink md:text-2xl">{{ place.title }}</h3>
            <p class="mt-4 max-w-md leading-relaxed text-muted">{{ place.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- ══ LAYANAN ═══════════════════════════════════════════════════════ -->
    <section id="layanan" ref="listRoot" class="frame border-b border-line scroll-mt-24">
      <div class="px-5 pb-2 pt-14 md:px-8 md:pt-20">
        <div class="flex items-center gap-4 md:gap-6">
          <span class="spec-key shrink-0 !text-ink">Layanan</span>
          <span class="h-px flex-1 bg-ink/[0.18]" aria-hidden="true" />
          <span class="num shrink-0 text-[13px] font-semibold text-ink">
            {{ String(services.length).padStart(2, '0') }}
          </span>
        </div>
        <p class="mt-8 max-w-xl text-base leading-relaxed text-muted">
          Setiap layanan diuraikan mulai dari kendala yang paling sering ditemui di
          lapangan, beserta metode penanganan dan lokasi pengerjaannya.
        </p>
      </div>

      <!-- The API being down is worth saying plainly and worth offering a way
           out of — a retry, and the WhatsApp number, which works whether or not
           our server does. -->
      <div v-if="serviceErr" class="mt-10 border-t border-line px-5 py-16 text-center md:px-8">
        <p class="spec-key !text-accent">Gagal Memuat</p>
        <p class="mt-4 text-base text-ink">Daftar layanan tidak dapat dimuat dari server.</p>
        <div class="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <UiButton variant="outline" @click="() => refreshNuxtData('jasa-listing')">Muat Ulang</UiButton>
          <UiButton :href="waLink({ halaman: 'Jasa — daftar gagal dimuat' })">
            <UiWhatsAppIcon class="h-4 w-4" />
            Hubungi Kami
          </UiButton>
        </div>
      </div>

      <div v-else-if="services.length" class="mt-10">
        <ServiceDossier
          v-for="(s, i) in services"
          :key="s.slug"
          :index="i + 1"
          :slug="s.slug"
          :title="s.title"
          :description="s.description"
          :dossier="s.dossier"
          :flip="i % 2 === 1"
        />
      </div>

      <p v-else class="mt-10 border-t border-line px-5 py-16 text-center text-sm text-muted md:px-8">
        Belum ada layanan yang tersedia saat ini.
      </p>
    </section>

    <!-- ══ HOT / COLD ════════════════════════════════════════════════════
         The page's one dark band, spent on the one technical decision the
         buyer is entitled to understand before he agrees to anything. Set as a
         pair, deliberately without a recommendation: which method is right is
         decided by the belt's material and the plant's tolerance for downtime,
         and a page that picks for him is selling, not advising. -->
    <section class="jasa-joint">
      <div class="frame frame-dark">
        <div class="px-5 pt-16 md:px-8 md:pt-20">
          <div class="flex items-center gap-4 md:gap-6">
            <span class="spec-key shrink-0 !text-white">Metode Penyambungan</span>
            <span class="h-px flex-1 bg-white/20" aria-hidden="true" />
          </div>
          <p class="mt-8 max-w-xl text-base leading-relaxed text-white/60">
            Kedua metode berbeda dalam kekuatan sambungan dan durasi pengerjaan.
            Pemilihannya ditentukan oleh material belt dan kebutuhan operasional Anda.
          </p>
        </div>

        <div ref="jointRoot" class="mt-10 grid gap-px bg-white/10 md:grid-cols-2">
          <article
            v-for="method in JOINT_METHODS"
            :key="method.name"
            data-reveal-item
            class="jasa-joint-cell"
          >
            <img
              :src="method.photo"
              :alt="method.alt"
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
              class="aspect-[4/3] w-full object-cover"
            />
            <div class="px-5 py-8 md:px-8 md:py-10">
              <h3 class="display text-xl text-white md:text-2xl">{{ method.name }}</h3>
              <p class="spec-key mt-2 !text-accent">{{ method.sub }}</p>
              <p class="mt-5 max-w-md leading-relaxed text-white/65">{{ method.text }}</p>

              <dl class="mt-7 max-w-md">
                <div
                  v-for="row in method.specs"
                  :key="row.key"
                  class="flex flex-col gap-1 border-t border-white/[0.12] py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <dt class="spec-key shrink-0 !text-white/45">{{ row.key }}</dt>
                  <dd class="text-[13px] leading-snug text-white sm:text-right">{{ row.value }}</dd>
                </div>
              </dl>
            </div>
          </article>
        </div>

        <p class="border-t border-white/10 px-5 py-6 text-[13px] leading-relaxed text-white/45 md:px-8">
          Belum dapat memastikan metode yang sesuai? Kirimkan foto belt Anda dan tim
          kami akan memberikan rekomendasinya.
        </p>
      </div>
    </section>

    <!-- ══ BRIEF ═════════════════════════════════════════════════════════
         The closing band, and not the shared CTASection: that component is a
         centred headline over two buttons and it ends /produk, /artikel and
         /galeri identically. What actually shortens the distance between this
         page and a quote is telling the reader the three things to put in the
         first message, then handing him the two sales lines by name. -->
    <section class="frame">
      <div class="border-t-2 border-ink px-5 py-14 md:px-8 md:py-16">
        <div class="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <div class="lg:col-span-6">
            <p class="eyebrow text-accent">Langkah awal</p>
            <h2 class="display mt-5 max-w-md text-2xl leading-tight text-ink md:text-[2rem]">
              Sampaikan tiga informasi berikut untuk kami tindak lanjuti
            </h2>

            <ol class="mt-9 max-w-md">
              <li
                v-for="step in BRIEF"
                :key="step.key"
                class="flex gap-5 border-t border-line py-4"
              >
                <span class="num shrink-0 pt-0.5 text-[13px] font-semibold text-accent">{{ step.key }}</span>
                <span>
                  <span class="block text-[15px] font-semibold text-ink">{{ step.label }}</span>
                  <span class="mt-1 block text-[13px] leading-snug text-muted">{{ step.note }}</span>
                </span>
              </li>
            </ol>
          </div>

          <!-- Two named lines rather than one anonymous button, matching the
               About page's colophon: Sales 1 and Sales 2 are different people. -->
          <dl class="lg:col-span-5 lg:col-start-8">
            <div class="flex items-baseline justify-between gap-6 border-t border-line py-4">
              <dt class="spec-key">{{ contactInfo.waLabel1 }}</dt>
              <dd>
                <a
                  :href="waLink({ halaman: 'Jasa — brief' }, 1)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="jasa-link num text-[15px] font-semibold text-ink"
                >{{ phone1 }}</a>
              </dd>
            </div>
            <div class="flex items-baseline justify-between gap-6 border-t border-line py-4">
              <dt class="spec-key">{{ contactInfo.waLabel2 }}</dt>
              <dd>
                <a
                  :href="waLink({ halaman: 'Jasa — brief' }, 2)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="jasa-link num text-[15px] font-semibold text-ink"
                >{{ phone2 }}</a>
              </dd>
            </div>
            <div class="flex items-baseline justify-between gap-6 border-y border-line py-4">
              <dt class="spec-key">Jam operasional</dt>
              <dd class="text-[13px] leading-snug text-ink sm:text-right">{{ contactInfo.jamSingkat }}</dd>
            </div>

            <div class="mt-7 flex flex-col gap-3 sm:flex-row">
              <UiButton :href="waLink({ halaman: 'Jasa — brief' }, 1)" :block="true" class="sm:!w-auto">
                <UiWhatsAppIcon class="h-4 w-4" />
                Hubungi via WhatsApp
              </UiButton>
              <UiButton href="/kontak" variant="outline" :block="true" class="sm:!w-auto">
                Halaman Kontak
              </UiButton>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Sized off the viewport so the two lines hold their shape from 360px up. The
   hard break in the template keeps "pada conveyor Anda" whole — left to wrap,
   "Anda" orphaned onto a third line at several common widths. */
.jasa-h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
}

/* Plate captions — same treatment as the About page's, so a photograph is
   captioned identically wherever it appears on the site. */
.jasa-cap {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.7rem 1rem;
  color: rgba(255, 255, 255, 0.85) !important;
  background: linear-gradient(to top right, rgb(var(--ink) / 0.8), rgb(var(--ink) / 0) 78%);
}

/* The single dark band. Same ink → steel diagonal as the home cover and the
   About page's Visi band — three dark grounds on the site, one material. */
.jasa-joint {
  background: linear-gradient(152deg, rgb(var(--ink)) 0%, rgb(var(--steel)) 100%);
}
/* The gap-px grid paints the divider; each cell needs its own ground or the
   gradient shows through as a seam of a different value. */
.jasa-joint-cell {
  background: rgb(var(--ink) / 0.35);
}

.jasa-link {
  transition: color 140ms ease;
}
.jasa-link:active {
  color: rgb(var(--accent));
}
@media (hover: hover) and (pointer: fine) {
  .jasa-link:hover {
    color: rgb(var(--accent));
  }
}
</style>
