<script setup lang="ts">
import { SERVICE_DOSSIERS, SERVICE_ORDER } from '~/data/services'
import { isHtml, parseBlocks } from '~/utils/richtext'
import { waLink } from '~/utils/whatsapp'

// The service sheet: the listing row opened out.
//
// What was here was a centred max-w-4xl column — breadcrumb, eyebrow, h1, the
// whole body dumped through v-html, one button. Two things were wrong with it
// beyond the plainness. The body is plain text in the database, so `v-html`
// rendered every list and every numbered method as one run-on paragraph (see
// utils/richtext.ts). And the page carried no photograph and no specs, so the
// reader who clicked through from a listing row that had both arrived at less
// information than he left.
//
// Now it opens with the same plate and the same complaint the listing row
// showed him, keeps the ask in the margin where it stays reachable through a
// long body, and ends by naming the three services he did not click.

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const { get } = useApi()

const { data: serviceRes, error: serviceErr } = await useAsyncData(
  () => `jasa-${slug.value}`,
  () => get<any>(`/jasa/${slug.value}`),
  { watch: [slug] },
)

// Shares its key with the listing page, so arriving from /jasa costs nothing.
const { data: listRes } = await useAsyncData('jasa-listing', () => get<any[]>('/jasa'))

const service = computed(() => serviceRes.value?.data ?? null)
const dossier = computed(() => SERVICE_DOSSIERS[slug.value])

/** Sequence number, matching the listing. Unknown slugs get no number rather than a wrong one. */
const num = computed(() => {
  const i = (SERVICE_ORDER as readonly string[]).indexOf(slug.value)
  return i === -1 ? null : String(i + 1).padStart(2, '0')
})

const body = computed(() => service.value?.fullDescription ?? '')
const bodyIsHtml = computed(() => isHtml(body.value))
const bodyBlocks = computed(() => (bodyIsHtml.value ? [] : parseBlocks(body.value)))

const others = computed(() =>
  (listRes.value?.data ?? [])
    .filter((s: any) => s.slug !== slug.value)
    .map((s: any) => ({
      slug: s.slug as string,
      title: s.name as string,
      description: (s.shortDescription ?? null) as string | null,
      dossier: SERVICE_DOSSIERS[s.slug],
    })),
)

const { root: bodyRoot } = useRevealOnScroll({ stagger: 60 })

useSeoMeta({
  title: () =>
    service.value
      ? `${service.value.name} — Jasa Belt Conveyor — BBS Conveyor`
      : 'Jasa Tidak Ditemukan — BBS Conveyor',
  description: () => service.value?.shortDescription ?? '',
})
</script>

<template>
  <!-- ══ ERROR ═══════════════════════════════════════════════════════════ -->
  <div v-if="serviceErr" class="bg-paper">
    <section class="frame border-b border-line px-5 py-24 text-center md:px-8 md:py-32">
      <p class="spec-key !text-accent">Gagal memuat</p>
      <h1 class="display mt-5 text-3xl text-ink md:text-4xl">Tidak dapat menghubungi server</h1>
      <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <UiButton variant="outline" @click="refreshNuxtData(`jasa-${slug}`)">Coba lagi</UiButton>
        <UiButton :href="waLink({ halaman: 'Jasa — detail gagal dimuat' })">
          <UiWhatsAppIcon class="h-4 w-4" />
          Tanya langsung
        </UiButton>
      </div>
    </section>
  </div>

  <!-- ══ SERVICE ═════════════════════════════════════════════════════════ -->
  <div v-else-if="service" class="bg-paper">
    <!-- ── Masthead ──────────────────────────────────────────────────────
         The number and the name on the left, the plate on the right, and the
         complaint set between them at the largest size on the page after the
         title — because it is the sentence that tells the reader within two
         seconds whether he is on the right page. -->
    <section class="frame border-b border-line">
      <div class="grid lg:grid-cols-12">
        <div class="px-5 pb-12 pt-8 md:px-8 md:pb-14 md:pt-10 lg:col-span-6 lg:pr-10">
          <Breadcrumb
            :items="[
              { label: 'Beranda', href: '/' },
              { label: 'Jasa', href: '/jasa' },
              { label: service.name },
            ]"
          />

          <div class="mt-10 flex items-center gap-4 md:gap-6">
            <span v-if="num" class="num shrink-0 text-[13px] font-semibold text-accent">{{ num }}</span>
            <span class="h-px flex-1 bg-ink/[0.18]" aria-hidden="true" />
            <span class="spec-key shrink-0">Layanan</span>
          </div>

          <h1 class="display jasa-h1 mt-6 text-ink">{{ service.name }}</h1>

          <p
            v-if="dossier"
            class="mt-6 border-l-2 border-accent pl-5 text-[17px] leading-snug text-ink"
          >
            {{ dossier.keluhan }}
          </p>

          <p v-if="service.shortDescription" class="mt-6 max-w-md leading-relaxed text-muted">
            {{ service.shortDescription }}
          </p>

          <div class="mt-9">
            <UiButton :href="waLink({ layanan: service.name, halaman: 'Jasa — detail' })">
              <UiWhatsAppIcon class="h-4 w-4" />
              Konsultasi layanan ini
            </UiButton>
          </div>
        </div>

        <figure
          v-if="dossier"
          class="relative border-t border-line lg:col-span-6 lg:border-l lg:border-t-0"
        >
          <img
            :src="dossier.photo"
            :alt="dossier.alt"
            width="1200"
            height="900"
            fetchpriority="high"
            decoding="async"
            class="aspect-[4/3] h-full w-full object-cover lg:aspect-auto lg:min-h-[26rem]"
          />
          <figcaption class="jasa-cap spec-key">{{ dossier.caption }}</figcaption>
        </figure>
      </div>

      <dl v-if="dossier" class="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="row in dossier.specs" :key="row.key" class="bg-paper px-5 py-6 md:px-8">
          <dt class="spec-key">{{ row.key }}</dt>
          <dd class="mt-2.5 text-[14px] leading-snug text-ink">{{ row.value }}</dd>
        </div>
        <!-- The guarantee is the same on all four and is not in any dossier
             row for that reason; here, where the reader is deciding, it earns
             the fourth cell. -->
        <div class="bg-paper px-5 py-6 md:px-8">
          <dt class="spec-key">Garansi</dt>
          <dd class="mt-2.5 text-[14px] leading-snug text-ink">Setiap penyambungan</dd>
        </div>
      </dl>
    </section>

    <!-- ── Body ──────────────────────────────────────────────────────────
         Prose on a proper measure with the ask parked in the right margin,
         sticky. The old page put its one button below the whole body, which on
         a phone is four screens past the moment the reader decided. -->
    <section ref="bodyRoot" class="frame border-b border-line">
      <div class="grid gap-y-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-12 lg:gap-x-12">
        <div class="lg:col-span-7">
          <h2 data-reveal-item class="spec-key !text-ink">Uraian pekerjaan</h2>

          <!-- Rendered as elements, not v-html, whenever the source is plain
               text — which is what every seeded row still is. -->
          <div v-if="!bodyIsHtml" class="jasa-prose mt-7">
            <template v-for="(block, i) in bodyBlocks" :key="i">
              <p v-if="block.type === 'p'" data-reveal-item>{{ block.text }}</p>
              <ul v-else-if="block.type === 'ul'" data-reveal-item>
                <li v-for="item in block.items" :key="item">{{ item }}</li>
              </ul>
              <ol v-else data-reveal-item>
                <li v-for="item in block.items" :key="item">{{ item }}</li>
              </ol>
            </template>
          </div>

          <!-- Rows edited through the Tiptap admin arrive as real HTML. -->
          <div v-else class="prose-tech mt-7 max-w-none" v-html="body" />
        </div>

        <aside class="lg:col-span-4 lg:col-start-9">
          <div class="jasa-ask border-t-2 border-ink pt-6">
            <p class="spec-key !text-ink">Membutuhkan layanan ini?</p>
            <p class="mt-4 text-[15px] leading-relaxed text-muted">
              Kirim foto belt dan ukurannya lewat WhatsApp. Survei dan konsultasi
              gratis — kami balas dengan rencana kerja, bukan dengan brosur.
            </p>
            <div class="mt-6 flex flex-col gap-3">
              <UiButton
                :href="waLink({ layanan: service.name, halaman: 'Jasa — detail sidebar' })"
                :block="true"
              >
                <UiWhatsAppIcon class="h-4 w-4" />
                Chat WhatsApp
              </UiButton>
              <UiButton href="/kontak" variant="outline" :block="true">Halaman Kontak</UiButton>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- ── Other services ────────────────────────────────────────────────
         Named, with their plates. A reader who opened the wrong one of four
         should be able to correct himself without going back to the listing. -->
    <section v-if="others.length" class="frame">
      <div class="px-5 pt-14 md:px-8 md:pt-20">
        <div class="flex items-center gap-4 md:gap-6">
          <span class="spec-key shrink-0 !text-ink">Layanan lain</span>
          <span class="h-px flex-1 bg-ink/[0.18]" aria-hidden="true" />
        </div>
      </div>

      <!-- border-b as well as border-t: this is the last band on the page, and
           without it the frame's column runs into the footer unclosed. -->
      <div class="mt-10 grid gap-px border-y border-line bg-line sm:grid-cols-3">
        <NuxtLink
          v-for="other in others"
          :key="other.slug"
          :to="`/jasa/${other.slug}`"
          class="jasa-other bg-paper p-5 md:p-6"
        >
          <img
            v-if="other.dossier"
            :src="other.dossier.photo"
            :alt="other.dossier.alt"
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
            class="aspect-[4/3] w-full object-cover"
          />
          <h3 class="jasa-other-title mt-5 text-[15px] font-semibold leading-snug text-ink">
            {{ other.title }}
          </h3>
          <p v-if="other.description" class="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
            {{ other.description }}
          </p>
        </NuxtLink>
      </div>
    </section>
  </div>

  <!-- ══ NOT FOUND ═══════════════════════════════════════════════════════ -->
  <div v-else class="bg-paper">
    <section class="frame border-b border-line px-5 py-24 text-center md:px-8 md:py-32">
      <p class="spec-key !text-accent">404</p>
      <h1 class="display mt-5 text-3xl text-ink md:text-4xl">Jasa tidak ditemukan</h1>
      <p class="mt-4 text-muted">Layanan ini mungkin telah diganti nama atau dihapus.</p>
      <div class="mt-9 flex justify-center">
        <UiButton href="/jasa" variant="outline">Kembali ke daftar jasa</UiButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.jasa-h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
}

.jasa-cap {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.7rem 1rem;
  color: rgba(255, 255, 255, 0.85) !important;
  background: linear-gradient(to top right, rgb(var(--ink) / 0.8), rgb(var(--ink) / 0) 78%);
}

/* Its own rules rather than .prose-tech, for the same reason the About page
   declines it: that class is tuned for article body copy and brings heading
   margins this two-column section has to fight. The v-html branch above still
   uses it, because HTML from the editor can contain headings. */
.jasa-prose {
  font-size: 1rem;
  line-height: 1.75;
  color: rgb(var(--muted));
}
.jasa-prose > * + * {
  margin-top: 1.25rem;
}
.jasa-prose ul,
.jasa-prose ol {
  padding-left: 1.25rem;
}
.jasa-prose ul {
  list-style: disc;
}
.jasa-prose ol {
  list-style: decimal;
}
.jasa-prose li + li {
  margin-top: 0.5rem;
}
.jasa-prose li::marker {
  color: rgb(var(--accent));
}

/* ── "Layanan lain" cells ───────────────────────────────────────────────
   Not .card-shell: that shell draws its own border, and these three sit on a
   gap-px hairline grid where a second border would double every divider. The
   feedback is the same one the shell gives — surface and title colour, no lift
   and no shadow. */
.jasa-other {
  display: block;
  transition: background-color 140ms ease;
}
.jasa-other-title {
  transition: color 140ms ease;
}
@media (hover: hover) and (pointer: fine) {
  .jasa-other:hover {
    background-color: rgb(var(--paper-soft));
  }
  .jasa-other:hover .jasa-other-title {
    color: rgb(var(--accent));
  }
}
.jasa-other:active {
  background-color: rgb(var(--paper-soft));
}

/* Sticky only where there is a column beside it to be sticky against. */
@media (min-width: 1024px) {
  .jasa-ask {
    position: sticky;
    top: 6rem;
  }
}
</style>
