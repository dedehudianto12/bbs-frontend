<script setup lang="ts">
import type { ServiceDossier } from '~/data/services'
import { waLink } from '~/utils/whatsapp'

// One service, set as a job sheet rather than as a card.
//
// The old ServiceCard is a 4:3 thumbnail over two lines of clamped text in a
// three-up grid — the same cell the site uses for products and for articles.
// That shape is right when the reader is comparing many like things at a
// glance. There are four services and they are not alternatives to each other:
// a buyer needs exactly one of them and arrives knowing his symptom, not our
// product names. So each one gets a full row, opens with the complaint it
// answers, and prints its method as a datasheet — the register of a work order.
//
// ServiceCard was deleted when this landed — /jasa was its only consumer, and a
// generic card component with no call sites is just a second answer to a
// question the codebase has already answered.

const props = defineProps<{
  /** 1-based, printed. Sequence on the page, not a ranking. */
  index: number
  slug: string
  title: string
  description?: string | null
  dossier?: ServiceDossier
  /** Mirrors the row so consecutive rows do not stack into two columns. */
  flip?: boolean
}>()

const num = computed(() => String(props.index).padStart(2, '0'))
const href = computed(() => `/jasa/${props.slug}/`)
</script>

<template>
  <article class="jasa-row border-t border-line px-5 py-12 md:px-8 md:py-16">
    <div class="grid items-center gap-y-8 lg:grid-cols-2 lg:gap-x-14">
      <!-- ── The plate ──────────────────────────────────────────────────
           A link in its own right: on a row with two buttons, the photograph
           is the largest thing a reader will aim at, and a photograph that
           does nothing when clicked reads as a dead end. -->
      <NuxtLink
        v-if="dossier"
        :to="href"
        data-reveal-item
        class="jasa-plate group relative block border border-line bg-paper-soft"
        :class="flip ? 'lg:order-2' : ''"
      >
        <img
          :src="dossier.photo"
          :alt="dossier.alt"
          width="1200"
          height="900"
          loading="lazy"
          decoding="async"
          class="aspect-[4/3] w-full object-cover"
        />
        <!-- A <span>, not a <figcaption>: the caption belongs inside the link
             so the whole plate is one target, and a figcaption outside a
             <figure> is invalid. -->
        <span class="jasa-plate-cap spec-key">{{ dossier.caption }}</span>
        <span class="jasa-plate-hint spec-key" aria-hidden="true">Lihat detail →</span>
      </NuxtLink>

      <!-- No plate for a service the dossier does not know about — the row
           still renders, just without a photograph. A grey placeholder panel
           in its place would be four-fifths of the row spent on nothing. -->
      <div
        v-else
        aria-hidden="true"
        class="blueprint-grid hidden aspect-[4/3] border border-line bg-paper-soft lg:block"
        :class="flip ? 'lg:order-2' : ''"
      />

      <!-- ── The sheet ──────────────────────────────────────────────────── -->
      <div :class="flip ? 'lg:order-1' : ''">
        <div data-reveal-item class="flex items-center gap-4">
          <span class="num shrink-0 text-[13px] font-semibold text-accent">{{ num }}</span>
          <span class="h-px flex-1 bg-ink/[0.18]" aria-hidden="true" />
          <span class="spec-key shrink-0">Layanan</span>
        </div>

        <h2 data-reveal-item class="display mt-6 text-2xl leading-tight text-ink md:text-[2rem]">
          {{ title }}
        </h2>

        <!-- The symptom, in the buyer's words, above our name for it. Gold
             hairline on the left edge — the same mark the About page uses for
             a figure pulled into the margin, which is what this is. -->
        <p
          v-if="dossier"
          data-reveal-item
          class="mt-5 border-l-2 border-accent pl-5 text-[17px] leading-snug text-ink"
        >
          {{ dossier.keluhan }}
        </p>

        <p v-if="description" data-reveal-item class="mt-6 max-w-lg leading-relaxed text-muted">
          {{ description }}
        </p>

        <dl v-if="dossier" data-reveal-item class="mt-8 max-w-lg">
          <div
            v-for="row in dossier.specs"
            :key="row.key"
            class="flex flex-col gap-1 border-t border-line py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <dt class="spec-key shrink-0">{{ row.key }}</dt>
            <dd class="text-[13px] leading-snug text-ink sm:text-right">{{ row.value }}</dd>
          </div>
        </dl>

        <div data-reveal-item class="mt-8 flex flex-col gap-3 sm:flex-row">
          <!-- WhatsApp leads: this page exists to start a conversation, and the
               link already carries the service name so sales does not have to
               ask which one. "Detail layanan" is the secondary action — it is
               for the reader who is not ready to talk yet. -->
          <!-- "Konsultasi layanan ini", not "Tanya soal {{ title }}": the
               service names run to three words and the interpolated label
               wrapped to two lines inside the button on every row but one. The
               link already carries the name in its message. -->
          <UiButton :href="waLink({ layanan: title })">
            <UiWhatsAppIcon class="h-4 w-4" />
            Konsultasi layanan ini
          </UiButton>
          <UiButton :href="href" variant="outline">Detail layanan</UiButton>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* ── Plate captions ─────────────────────────────────────────────────────
   Bottom-left on a scrim, matching the About page's plates so the two pages
   caption a photograph the same way. */
.jasa-plate-cap {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.7rem 1rem;
  color: rgba(255, 255, 255, 0.85) !important;
  background: linear-gradient(to top right, rgb(var(--ink) / 0.8), rgb(var(--ink) / 0) 78%);
}

/* The affordance. Border colour and a hint, not a lift or a zoom: nothing on
   this site floats, and a photograph that scales under the cursor would be the
   only thing on the page that moves when it is not asked to. */
.jasa-plate {
  transition: border-color 140ms ease;
}
.jasa-plate-hint {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.5rem 0.85rem;
  color: #fff !important;
  background: rgb(var(--ink) / 0.85);
  opacity: 0;
  transition: opacity 140ms ease;
}
@media (hover: hover) and (pointer: fine) {
  .jasa-plate:hover {
    border-color: rgb(var(--ink));
  }
  .jasa-plate:hover .jasa-plate-hint {
    opacity: 1;
  }
}
/* Touch never hovers, and a tappable photograph with no visible affordance is
   worse than a permanent label. */
@media (hover: none) {
  .jasa-plate-hint {
    opacity: 1;
  }
}
</style>
