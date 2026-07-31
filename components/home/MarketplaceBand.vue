<script setup lang="ts">
import { computed } from 'vue'
import { contactInfo } from '~/data/contact'
import { useRevealOnScroll } from '~/composables/useRevealOnScroll'

// Where the coverage map was going to go.
//
// That idea — pinning a map of Indonesia from the `location` values on gallery
// rows — is deferred, not dropped: every gallery row in the database today is
// seed data from a single fixture transaction, so the map would have plotted
// six invented cities and looked far more like evidence than the fabricated
// growth chart it was meant to replace. It comes back when real project rows
// with real cities exist.
//
// This is the honest substitute. A Tokopedia or Shopee storefront carries
// public ratings and a public transaction count — proof the site does not have
// to assert, because the buyer can go and check it. That is worth more to an
// Indonesian procurement officer than "500+ proyek" ever was.
//
// Self-hides until the URLs are filled in, so it can ship wired but dark.

const stores = computed(() =>
  contactInfo.marketplaces.filter((m) => m.url.trim().length > 0),
)

const { root } = useRevealOnScroll({ stagger: 45 })
</script>

<template>
  <section v-if="stores.length" ref="root" class="bg-paper">
    <div class="frame border-b border-line">
      <div class="border-b border-line px-6 py-12 md:px-10 md:py-14">
        <span class="eyebrow text-accent">Belanja Online</span>
        <h2 class="display mt-4 max-w-2xl text-2xl text-ink md:text-[2rem]">
          Tersedia juga di marketplace
        </h2>
        <p class="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
          Untuk pembelian satuan dan pesanan kecil, produk kami tersedia di toko
          resmi kami — lengkap dengan rating dan riwayat transaksi.
        </p>
      </div>

      <div class="grid gap-px bg-line sm:grid-cols-2">
        <a
          v-for="store in stores"
          :key="store.platform"
          :href="store.url"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal-item
          class="mp-cell group flex items-center justify-between gap-4 bg-paper px-6 py-7 md:px-8 md:py-8"
        >
          <span class="min-w-0">
            <span class="spec-key block">{{ store.platform }}</span>
            <span class="mt-1.5 block truncate text-[15px] font-semibold text-ink">
              {{ store.store }}
            </span>
          </span>
          <svg
            class="mp-arrow h-4 w-4 shrink-0 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M7 17 17 7M8 7h9v9" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Explicit properties only — never `transition: all`. */
.mp-cell {
  transition: background-color 140ms ease;
}
.mp-arrow {
  transition:
    color 140ms ease,
    transform 140ms var(--ease-out);
}

.mp-cell:active {
  background-color: rgb(var(--paper-soft));
}

/* Gated: touch devices fire :hover on tap and leave the cell stuck. */
@media (hover: hover) and (pointer: fine) {
  .mp-cell:hover {
    background-color: rgb(var(--paper-soft));
  }
  .mp-cell:hover .mp-arrow {
    color: rgb(var(--accent));
    /* Leaves the page, so the arrow leaves the corner. */
    transform: translate(2px, -2px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mp-arrow {
    transition: color 140ms ease;
  }
  .mp-cell:hover .mp-arrow {
    transform: none;
  }
}
</style>
