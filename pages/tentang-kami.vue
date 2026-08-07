<script setup lang="ts">
import { contactInfo } from '~/data/contact'
import { prettyPhone, waLink } from '~/utils/whatsapp'

// ── Why this page is built as a document ────────────────────────────────────
//
// The home page is a cover: dark, photographic, one large claim, and every band
// on it is trying to sell. An About page that repeats that grammar has nothing
// left to say — it just sells again, quieter. So this one is its opposite. It
// is set as a technical document: paper throughout, six numbered sections on a
// running rule, marginal notes in the datasheet register, a ruled index of
// scope, and a colophon instead of a call-to-action band. Same tokens, opposite
// register.
//
// Nothing on this page is shared with the home page. PageHero is gone too — it
// is the standard inner-page band and would have made this look like every
// other subpage rather than like a redesign.
//
// ── What is NOT here, and why ───────────────────────────────────────────────
//
// No founding year, no project count, no client count, no headcount, no
// milestone timeline, no service-area map. The client's company profile states
// none of them. Every one of those numbers on the previous version of this page
// was invented by us and presented as the company's own — the single worst
// thing a supplier's About page can do, because it is the page a buyer reads
// specifically to decide whether to believe the rest. What is left is what the
// client has actually published: founded by three siblings, the scope they
// list, the guarantees they make, and two documents they can show.

// Scroll reveal is the house pattern — IntersectionObserver to trigger, CSS to
// animate, and no attribute at all under reduced motion or without JS, so
// content is never trapped at opacity 0. GSAP + ScrollTrigger drove the old
// version of this page and is no longer imported here: four scroll-linked
// tweens is a lot of library for four fades.
const { root: storyRoot } = useRevealOnScroll({ stagger: 70 })
const { root: spineRoot } = useRevealOnScroll({ stagger: 90 })
const { root: scopeRoot } = useRevealOnScroll({ stagger: 40 })
const { root: placeRoot } = useRevealOnScroll({ stagger: 80 })
const { root: docsRoot } = useRevealOnScroll({ stagger: 90 })

const phone = prettyPhone(contactInfo.waUtama)

// The masthead registry. Straight from the company profile — no field here is
// an inference, which is the whole point of setting it as a registry: the form
// promises that every line is a matter of record.
const REGISTRY = [
  { key: 'Bidang', value: 'Conveyor System and Parts Solution' },
  { key: 'Dikenal sebagai', value: 'BBS Conveyor' },
  { key: 'Kantor dan workshop', value: 'Pulo Gebang, Cakung, Jakarta Timur' },
]

// Marginal notes for §01. Each one is a claim the prose beside it makes in
// passing; pulling them into the margin is what a technical document does with
// a figure the reader will want twice.
const MARGINALIA = [
  { key: 'Lead time', value: '2–3 hari', note: 'Dijaga sejak perusahaan berdiri.' },
  { key: 'Garansi', value: 'Setiap penyambungan', note: 'Hot joint maupun cold joint.' },
  { key: 'Lokasi kerja', value: 'Pabrik Anda / workshop kami', note: 'Tim datang ke lokasi, atau belt dikerjakan di workshop.' },
]

// The mission, as the company's own initials. The client's profile expands
// B-B-S into three principles; that acronym is the strongest piece of
// typographic material on this site and the old version spent it on three 44px
// chips. Here the letters are set at display scale and the page is built around
// them.
const SPINE = [
  {
    letter: 'B',
    word: 'Bintang',
    text: 'Menjadi bintang dalam industri conveyor dengan memegang teguh prinsip integritas dan transparansi.',
  },
  {
    letter: 'B',
    word: 'Berjaya',
    text: 'Mencapai kejayaan melalui efisiensi operasional, kepuasan pelanggan, dan pengembangan berkelanjutan di setiap aspek bisnis.',
  },
  {
    letter: 'S',
    word: 'Satu',
    text: 'Menjadi satu kesatuan yang solid dan terpercaya dalam menyediakan solusi conveyor.',
  },
]

// §04 as a two-column ruled index rather than a grid of cards. An index is what
// you print when the list itself is the information and no single entry needs
// selling — which is exactly true of a scope-of-work list.
const PRODUK = [
  'Belt conveyor PVC',
  'Belt conveyor PU',
  'Belt conveyor rubber',
  'Flat belt',
  'Roller',
  'Pulley',
  'Fastener',
  'Cleat',
]
const LAYANAN = [
  'Konsultasi pemilihan produk',
  'Instalasi di lokasi',
  'Perbaikan dan perawatan',
  'Penyambungan hot joint',
  'Penyambungan cold joint',
  'Pengerjaan di workshop kami',
]

const DOKUMEN = [
  {
    title: 'Letter of Authorization',
    desc: 'Dokumen otorisasi resmi dari mitra industri.',
    href: '/documents/authorization_1.pdf',
    preview: '/documents/authorization_1-1.jpg',
  },
  {
    title: 'Sertifikasi',
    desc: 'Sertifikasi resmi pendukung kredibilitas perusahaan.',
    href: '/documents/authorization_2.pdf',
    preview: '/documents/authorization_2-1.jpg',
  },
]

useSeoMeta({
  title: 'Tentang Kami',
  description:
    'CV Bintang Berjaya Satu (BBS Conveyor) — supplier belt conveyor, roller, dan komponen industri terpercaya. Kantor dan workshop di Pulo Gebang, Cakung, Jakarta Timur.',
})
</script>

<template>
  <div class="bg-paper">
    <!-- ══ MASTHEAD ══════════════════════════════════════════════════════
         A title page, not a hero band. The name at display scale on the left,
         and opposite it the registry: the facts of the company set as a mono
         key/value column. The form is the argument — a buyer who reads four
         rows of a datasheet has been told, without a sentence of copy, that
         this is a company that writes things down. -->
    <section class="frame border-b border-line">
      <div class="px-5 pb-14 pt-12 md:px-8 md:pb-16 md:pt-16">
        <AboutRule num="00" label="Tentang Kami" />

        <div class="mt-10 grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <div class="lg:col-span-7">
            <h1 class="display about-h1 text-ink">CV Bintang Berjaya&nbsp;Satu</h1>
            <!-- The client's own English tagline. Left as they wrote it and set
                 subordinate to the legal name, because it is a motto, not a
                 description — treating it as the page's headline (which the old
                 version did) put the least specific sentence on the page in the
                 largest type available. -->
            <p class="mt-6 max-w-md text-lg leading-snug text-muted">
              Connecting Power and Motion to Drive Industrial Excellence
            </p>
          </div>

          <dl class="lg:col-span-5 lg:pt-2">
            <div
              v-for="row in REGISTRY"
              :key="row.key"
              class="flex flex-col gap-1 border-t border-line py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <dt class="spec-key shrink-0">{{ row.key }}</dt>
              <dd class="text-[13px] leading-snug text-ink sm:text-right">{{ row.value }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- The one photograph the masthead gets: the company doing the thing it
           sells, with a customer, in its own office. It runs the full width of
           the frame under the title block the way a plate faces a title page. -->
      <figure class="relative border-t border-line">
        <img
          src="/images/about-konsultasi.webp"
          alt="Tim BBS Conveyor berdiskusi dengan pelanggan di kantor Pulo Gebang, Jakarta Timur"
          width="1400"
          height="700"
          fetchpriority="high"
          decoding="async"
          class="aspect-[2/1] w-full object-cover md:aspect-[21/9]"
        />
        <figcaption class="about-plate-cap spec-key">Konsultasi · kantor Pulo Gebang</figcaption>
      </figure>
    </section>

    <!-- ══ 01 · PERUSAHAAN ═══════════════════════════════════════════════
         Prose on a proper measure with the figures pulled into the right
         margin. Tufte's arrangement, and the correct one whenever a reader
         wants a number back without losing their line — which on a supplier
         page is every number. -->
    <section ref="storyRoot" class="frame border-b border-line">
      <div class="px-5 py-14 md:px-8 md:py-20">
        <AboutRule num="01" label="Tentang Perusahaan" />

        <div class="mt-10 grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <div class="lg:col-span-7">
            <h2 data-reveal-item class="display text-2xl leading-tight text-ink md:text-[2rem]">
              Didirikan oleh tiga bersaudara,<br class="hidden sm:inline" />
              untuk industri Indonesia
            </h2>

            <div class="about-prose mt-8 space-y-6">
              <p data-reveal-item>
                CV Bintang Berjaya Satu — dikenal luas sebagai
                <strong>BBS Conveyor</strong> — bergerak di bidang
                <strong>Conveyor System and Parts Solution</strong>, didirikan oleh tiga
                bersaudara dengan visi menjadi penyedia kebutuhan industri pabrik di
                Indonesia. Kantor dan workshop kami berada di Pulo Gebang, Cakung,
                Jakarta Timur.
              </p>
              <p data-reveal-item>
                Kami menyediakan berbagai jenis belt conveyor: PVC, PU, Rubber, hingga
                Flat Belt, serta komponen pendukung seperti roller, pulley, fastener, dan
                cleat. Tidak hanya menjual produk, BBS Conveyor juga memberikan layanan
                teknis lengkap — mulai dari konsultasi pemilihan produk, instalasi di
                lokasi, perbaikan dan perawatan, hingga penyambungan belt dengan metode
                <strong>hot joint</strong> maupun <strong>cold joint</strong>, dikerjakan
                di pabrik Anda atau di workshop kami.
              </p>
              <p data-reveal-item>
                Sejak awal berdirinya, kami membangun budaya efisiensi yang mengutamakan
                kecepatan, kualitas, dan produktivitas. Lead time pengerjaan produk kami
                jaga di <strong>2–3 hari</strong>, setiap jasa penyambungan bergaransi,
                dan harga kami jaga tetap kompetitif tanpa mengurangi mutu.
              </p>
            </div>
          </div>

          <!-- The margin. Rules on the left edge of each note rather than
               between them, so the column reads as annotation attached to the
               text rather than as a second content block competing with it. -->
          <aside class="lg:col-span-4 lg:col-start-9">
            <div
              v-for="note in MARGINALIA"
              :key="note.key"
              data-reveal-item
              class="border-l-2 border-accent/40 pl-5 [&+&]:mt-8"
            >
              <p class="spec-key">{{ note.key }}</p>
              <p class="num mt-2 text-[17px] font-semibold leading-tight text-ink">
                {{ note.value }}
              </p>
              <p class="mt-1.5 text-[13px] leading-snug text-muted">{{ note.note }}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ══ 02 · B · B · S ════════════════════════════════════════════════
         The mission set as the company's own initials at display scale. The
         letters are aria-hidden: the word they stand for is printed beside each
         one, so to a screen reader they are noise, and their contrast against
         paper is decorative rather than informational. -->
    <section ref="spineRoot" class="frame border-b border-line">
      <div class="px-5 pt-14 md:px-8 md:pt-20">
        <AboutRule num="02" label="Misi — Nama Kami" />
        <p class="mt-8 max-w-xl text-base leading-relaxed text-muted">
          Setiap langkah kami berpedoman pada prinsip yang tercermin dalam nama BBS.
        </p>
      </div>

      <ol class="mt-10">
        <li
          v-for="item in SPINE"
          :key="item.word"
          data-reveal-item
          class="about-spine grid grid-cols-12 items-baseline gap-x-4 border-t border-line px-5 py-9 md:gap-x-8 md:px-8 md:py-12"
        >
          <span class="about-letter display col-span-2 text-accent" aria-hidden="true">
            {{ item.letter }}
          </span>
          <h3 class="col-span-10 md:col-span-3">
            <span class="about-word">{{ item.word }}</span>
          </h3>
          <p class="col-span-12 mt-4 text-[15px] leading-relaxed text-muted md:col-span-7 md:mt-0">
            {{ item.text }}
          </p>
        </li>
      </ol>
    </section>

    <!-- ══ 03 · VISI ═════════════════════════════════════════════════════
         The page's one dark band and its one piece of oversized display type,
         spent on the single sentence the company wrote about itself. Placed
         here rather than at the end because a document this long needs one
         change of ground in the middle, and because it is the last thing before
         the page turns from who they are to what they do. -->
    <section class="about-visi">
      <div class="frame frame-dark px-5 py-16 md:px-8 md:py-24">
        <div class="flex items-center gap-4 md:gap-6">
          <span class="num shrink-0 text-[13px] font-semibold text-white">03</span>
          <span class="h-px flex-1 bg-white/20" aria-hidden="true" />
          <span class="spec-key shrink-0 !text-white/45">Visi</span>
        </div>

        <blockquote class="mt-10 max-w-4xl md:mt-14">
          <p class="display about-quote text-white">
            <span class="text-accent" aria-hidden="true">&ldquo;</span>Menjadi penyedia
            kebutuhan industri pabrik dalam berbagai aspek dengan cakupan secara nasional
            hingga internasional.<span class="text-accent" aria-hidden="true">&rdquo;</span>
          </p>
          <footer class="spec-key mt-8 !text-white/45">
            Visi CV Bintang Berjaya Satu
          </footer>
        </blockquote>
      </div>
    </section>

    <!-- ══ 04 · LINGKUP KERJA ════════════════════════════════════════════
         An index, not a card grid. Nothing in either column needs selling on
         this page — the reader is checking coverage, and a list he can scan in
         one pass answers that better than sixteen boxes he has to read. -->
    <section ref="scopeRoot" class="frame border-b border-line">
      <div class="px-5 pt-14 md:px-8 md:pt-20">
        <AboutRule num="04" label="Lingkup Kerja" />
      </div>

      <div class="mt-10 grid gap-px bg-line md:grid-cols-2">
        <div class="bg-paper px-5 py-8 md:px-8 md:py-10">
          <h3 class="spec-key !text-ink">Produk</h3>
          <ul class="mt-5">
            <li
              v-for="(item, i) in PRODUK"
              :key="item"
              data-reveal-item
              class="flex items-baseline gap-4 border-b border-line py-3 last:border-b-0"
            >
              <span class="num shrink-0 text-[11px] text-muted">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="text-[15px] text-ink">{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="bg-paper px-5 py-8 md:px-8 md:py-10">
          <h3 class="spec-key !text-ink">Layanan</h3>
          <ul class="mt-5">
            <li
              v-for="(item, i) in LAYANAN"
              :key="item"
              data-reveal-item
              class="flex items-baseline gap-4 border-b border-line py-3 last:border-b-0"
            >
              <span class="num shrink-0 text-[11px] text-muted">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="text-[15px] text-ink">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ══ 05 · TEMPAT & ORANGNYA ════════════════════════════════════════
         The workshop and the crew, then the address as a datasheet. A supplier
         page that names a street but never shows the building is asking for
         trust it has not offered any evidence for. -->
    <section ref="placeRoot" class="frame border-b border-line">
      <div class="px-5 pt-14 md:px-8 md:pt-20">
        <AboutRule num="05" label="Lokasi dan Tim" />
      </div>

      <div class="mt-10 grid gap-px bg-line md:grid-cols-2">
        <figure data-reveal-item class="relative bg-paper">
          <img
            src="/images/about-workshop.webp"
            alt="Mesin press penyambungan belt di workshop BBS Conveyor, Pulo Gebang"
            width="1400"
            height="934"
            loading="lazy"
            decoding="async"
            class="aspect-[3/2] w-full object-cover"
          />
          <figcaption class="about-plate-cap spec-key">Workshop · Pulo Gebang</figcaption>
        </figure>
        <figure data-reveal-item class="relative bg-paper">
          <img
            src="/images/about-tim.webp"
            alt="Tim BBS Conveyor berkumpul bersama di satu meja"
            width="1400"
            height="788"
            loading="lazy"
            decoding="async"
            class="aspect-[3/2] w-full object-cover"
          />
          <figcaption class="about-plate-cap spec-key">Tim BBS Conveyor</figcaption>
        </figure>
      </div>

      <dl class="grid gap-px border-t border-line bg-line sm:grid-cols-3">
        <div class="bg-paper px-5 py-7 md:px-8">
          <dt class="spec-key">Kantor dan workshop</dt>
          <dd class="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-ink">{{ contactInfo.alamat }}</dd>
        </div>
        <div class="bg-paper px-5 py-7 md:px-8">
          <dt class="spec-key">Jam operasional</dt>
          <dd class="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-ink">{{ contactInfo.jamOperasional }}</dd>
        </div>
        <div class="bg-paper px-5 py-7 md:px-8">
          <dt class="spec-key">Email</dt>
          <dd class="mt-3 text-[14px] leading-relaxed">
            <a :href="`mailto:${contactInfo.email}`" class="about-link text-ink">{{ contactInfo.email }}</a>
          </dd>
        </div>
      </dl>
    </section>

    <!-- ══ 06 · DOKUMEN ══════════════════════════════════════════════════
         Both plates set on white at a size where the letterhead is actually
         legible. The previous treatment centred a thumbnail about 200px wide
         inside a card — a document nobody can read is decoration, and these two
         are the only third-party evidence on the page. -->
    <section ref="docsRoot" class="frame border-b border-line">
      <div class="px-5 pt-14 md:px-8 md:pt-20">
        <AboutRule num="06" label="Dokumen Resmi" />
        <p class="mt-8 max-w-xl text-base leading-relaxed text-muted">
          Otorisasi dan sertifikasi dari mitra industri kami. Kedua dokumen dapat dibuka
          atau diunduh langsung.
        </p>
      </div>

      <div class="mt-10 grid gap-px bg-line sm:grid-cols-2">
        <article
          v-for="doc in DOKUMEN"
          :key="doc.title"
          data-reveal-item
          class="flex flex-col bg-paper p-5 md:p-8"
        >
          <a
            :href="doc.href"
            target="_blank"
            rel="noopener noreferrer"
            class="about-doc group relative block overflow-hidden border border-line bg-white"
          >
            <img
              :src="doc.preview"
              :alt="`Pratinjau ${doc.title}`"
              width="1240"
              height="1754"
              loading="lazy"
              decoding="async"
              class="aspect-[3/4] w-full object-cover object-top"
            />
            <span class="about-doc-hint spec-key">Buka PDF →</span>
          </a>

          <h3 class="mt-6 text-[15px] font-semibold text-ink">{{ doc.title }}</h3>
          <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ doc.desc }}</p>

          <div class="mt-5 flex items-center gap-3">
            <UiButton :href="doc.href" size="sm" variant="outline">Lihat</UiButton>
            <!-- A plain <a>: UiButton has no `download` passthrough and adding
                 one for two call sites is not worth the prop. -->
            <a :href="doc.href" download class="about-dl">Unduh</a>
          </div>
        </article>
      </div>
    </section>

    <!-- ══ COLOPHON ══════════════════════════════════════════════════════
         A document ends with its imprint, not with a sales band. Same job as
         the shared CTASection — get the reader onto WhatsApp — but the shape is
         the page's own, and it hands over the two sales lines by name instead
         of one anonymous button. Left on paper: the footer directly below is
         the steel anchor, and two dark blocks in a row would merge into one. -->
    <section class="frame">
      <div class="border-t-2 border-ink px-5 py-14 md:px-8 md:py-16">
        <div class="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <div class="lg:col-span-6">
            <p class="eyebrow text-accent">Hubungi Kami</p>
            <h2 class="display mt-5 max-w-md text-2xl leading-tight text-ink md:text-[2rem]">
              Conveyor Anda bermasalah, atau sedang merencanakan lini baru?
            </h2>
            <p class="mt-5 max-w-md text-base leading-relaxed text-muted">
              Konsultasi dan survei lokasi tidak dipungut biaya. Kirimkan foto belt Anda
              melalui WhatsApp, dan tim kami akan menanggapinya dalam hitungan jam.
            </p>
          </div>

          <!-- One named line rather than an anonymous button. The four sales
               staff are listed on the Kontak page and only there; a colophon is
               a place to print the number, not to make the reader choose. -->
          <dl class="lg:col-span-5 lg:col-start-8">
            <div class="flex items-baseline justify-between gap-6 border-t border-line py-4">
              <dt class="spec-key">{{ contactInfo.waLabelUtama }}</dt>
              <dd>
                <a :href="waLink({ halaman: 'Tentang Kami — colophon' })" target="_blank" rel="noopener noreferrer" class="about-link num text-[15px] font-semibold text-ink">
                  {{ phone }}
                </a>
              </dd>
            </div>
            <div class="flex items-baseline justify-between gap-6 border-y border-line py-4">
              <dt class="spec-key">Email</dt>
              <dd>
                <a :href="`mailto:${contactInfo.email}`" class="about-link text-[15px] font-semibold text-ink">
                  {{ contactInfo.email }}
                </a>
              </dd>
            </div>

            <div class="mt-7 flex flex-col gap-3 sm:flex-row">
              <UiButton :href="waLink({ halaman: 'Tentang Kami — colophon' })" :block="true" class="sm:!w-auto">
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
/* ── Masthead ───────────────────────────────────────────────────────────
   Sized off the viewport so the legal name sets on two lines at every width.
   "Berjaya Satu" is the longest unbreakable run at 12 characters, and the
   non-breaking space in the template keeps "Berjaya Satu" together so the name
   can never break as "Berjaya / Satu". */
.about-h1 {
  font-size: clamp(2.25rem, 6.4vw, 3.75rem);
  line-height: 0.98;
  letter-spacing: -0.03em;
}

/* ── Prose ──────────────────────────────────────────────────────────────
   Its own rules rather than .prose-tech: that class is tuned for article body
   copy at 17px/1.75 with generous heading spacing, and dropping it into a
   two-column page section brings margins this layout has to fight. */
.about-prose {
  font-size: 1rem;
  line-height: 1.75;
  color: rgb(var(--muted));
}
.about-prose strong {
  font-weight: 500;
  color: rgb(var(--ink));
}

/* ── Plate captions ─────────────────────────────────────────────────────
   Bottom-left on a scrim rather than below the frame, so a caption never adds
   a row of its own to a grid of photographs of differing heights. */
.about-plate-cap {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.7rem 1rem;
  color: rgba(255, 255, 255, 0.85) !important;
  background: linear-gradient(to top right, rgb(var(--ink) / 0.8), rgb(var(--ink) / 0) 78%);
}

/* ── §02 spine ──────────────────────────────────────────────────────────
   The letter is the largest thing on the page after the masthead. Line-height 1
   and a negative baseline nudge sit it on the same line as the word beside it
   rather than pushing the row open. */
.about-letter {
  font-size: clamp(3.25rem, 9vw, 5.5rem);
  line-height: 0.8;
  font-weight: 500;
  letter-spacing: -0.04em;
}
.about-word {
  font-size: clamp(1.25rem, 2.6vw, 1.75rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  color: rgb(var(--ink));
}
/* The row lifts its own hairline on hover — the only interactive-looking
   feedback on a non-interactive row would be a lie, so this is deliberately
   absent. Left as a note so it does not get "fixed" in later. */

/* ── §03 visi ───────────────────────────────────────────────────────────
   The single dark band. ink → steel on the same diagonal as the home page's
   cover, so the two read as the same material rather than as two different
   dark greys. */
.about-visi {
  background: linear-gradient(152deg, rgb(var(--ink)) 0%, rgb(var(--steel)) 100%);
}
.about-quote {
  font-size: clamp(1.5rem, 3.6vw, 2.625rem);
  line-height: 1.18;
  letter-spacing: -0.025em;
  font-weight: 500;
}

/* ── §06 documents ──────────────────────────────────────────────────────
   object-top on a 3:4 crop keeps the letterhead — the part that carries the
   authority — rather than centring on the body text. */
.about-doc {
  transition: border-color 140ms ease;
}
.about-doc-hint {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  padding: 0.4rem 0.7rem;
  color: #fff !important;
  background: rgb(var(--ink) / 0.85);
  opacity: 0;
  transition: opacity 140ms ease;
}
@media (hover: hover) and (pointer: fine) {
  .about-doc:hover {
    border-color: rgb(var(--ink));
  }
  .about-doc:hover .about-doc-hint {
    opacity: 1;
  }
}
/* Touch has no hover to reveal the hint, and a tap target with no affordance is
   worse than a permanent label. */
@media (hover: none) {
  .about-doc-hint {
    opacity: 1;
  }
}

.about-dl {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgb(var(--accent));
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease;
}
.about-dl:active {
  transform: scale(0.98);
}
@media (hover: hover) and (pointer: fine) {
  .about-dl:hover {
    background: rgb(var(--accent-glow));
  }
}

/* ── Links ──────────────────────────────────────────────────────────────
   Explicit properties only, never `transition: all`. */
.about-link {
  transition: color 140ms ease;
}
.about-link:active {
  color: rgb(var(--accent));
}
@media (hover: hover) and (pointer: fine) {
  .about-link:hover {
    color: rgb(var(--accent));
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-dl {
    transition: background-color 140ms ease;
  }
  .about-dl:active {
    transform: none;
  }
}
</style>
