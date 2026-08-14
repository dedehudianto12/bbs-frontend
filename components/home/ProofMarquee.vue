<script setup lang="ts">
import { computed } from 'vue'

// A running log of real installations, fed by the backend gallery.
//
// The site is illustration-only — there is no photography and every product
// row has image = NULL — so trust has to be carried by record instead. These
// are actual completed jobs with actual cities, which had been sitting unused
// in the backend while pages/galeri.vue rendered a hardcoded placeholder set.

const props = defineProps<{
  items: { caption: string; location?: string | null }[]
}>()

// Captions are shaped "<work> — <site>, <city>". The city is already carried
// separately in `location`, so the caption is trimmed at the em dash to avoid
// printing the place twice.
function workOf(caption: string): string {
  const [work] = caption.split('—')
  return (work ?? caption).trim()
}

const entries = computed(() =>
  props.items
    .filter((item) => item.caption?.trim())
    .map((item) => ({
      work: workOf(item.caption),
      location: item.location?.trim() || null,
    })),
)
</script>

<template>
  <section v-if="entries.length" class="bg-paper-soft">
    <div class="frame border-b border-line">
      <div class="flex items-stretch">
        <!-- Static label. Never moves, so it stays readable. -->
        <div class="hidden shrink-0 items-center border-r border-line px-5 md:flex">
          <span class="eyebrow text-muted">Proyek Terbaru</span>
        </div>

        <!-- min-w-0 is required for overflow to clip inside a flex child -->
        <div class="marquee-viewport marquee-mask min-w-0 flex-1 overflow-hidden py-4">
          <!-- Track holds the list exactly twice, so translateX(-50%) is one
               seam-free cycle regardless of how many rows the API returns. -->
          <div class="marquee-track flex w-max animate-marquee motion-reduce:animate-none">
            <ul class="flex shrink-0 items-center">
              <li
                v-for="entry in entries"
                :key="entry.work + entry.location"
                class="flex items-center gap-3 whitespace-nowrap px-5"
              >
                <span class="text-accent" aria-hidden="true">◇</span>
                <span class="text-[13px] text-muted">{{ entry.work }}</span>
                <span v-if="entry.location" class="spec-key !text-accent">
                  {{ entry.location }}
                </span>
              </li>
            </ul>

            <!-- Visual duplicate only — hidden so it isn't announced twice. -->
            <ul class="flex shrink-0 items-center" aria-hidden="true">
              <li
                v-for="entry in entries"
                :key="`dup-${entry.work}-${entry.location}`"
                class="flex items-center gap-3 whitespace-nowrap px-5"
              >
                <span class="text-accent">◇</span>
                <span class="text-[13px] text-muted">{{ entry.work }}</span>
                <span v-if="entry.location" class="spec-key !text-accent">
                  {{ entry.location }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Static link. Deliberately outside the track: a click target that
             slides away under the cursor is a bad hit target. -->
        <NuxtLink
          to="/galeri/"
          class="marquee-link flex shrink-0 items-center gap-1.5 border-l border-line px-5 text-[12px] font-semibold text-ink"
        >
          Semua
          <svg
            class="marquee-arrow h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee-link {
  transition: background-color 140ms ease;
}
.marquee-arrow {
  transition: transform 140ms var(--ease-out);
}
.marquee-link:active {
  background-color: rgb(var(--paper));
}

@media (hover: hover) and (pointer: fine) {
  .marquee-link:hover {
    background-color: rgb(var(--paper));
  }
  .marquee-link:hover .marquee-arrow {
    transform: translateX(2px);
  }
  /* Pause on hover so a reader can actually finish a line. */
  .marquee-viewport:hover .marquee-track {
    animation-play-state: paused;
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-arrow {
    transition: none;
  }
}
</style>
