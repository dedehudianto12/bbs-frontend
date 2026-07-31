<script setup lang="ts">
import { useRevealOnScroll } from '~/composables/useRevealOnScroll'

defineProps<{
  industries: { name: string; description: string; slug: string }[]
}>()

// Cells are deliberately not links: industries have no detail route, and
// linking them would 404. See server/routes/__sitemap__/urls.ts.
const { root } = useRevealOnScroll({ stagger: 45 })
</script>

<template>
  <section ref="root" class="bg-paper">
    <div class="frame border-b border-line">
      <!-- Section title -->
      <div class="border-b border-line px-6 py-14 md:px-10 md:py-16">
        <SectionTitle
          eyebrow="Sektor Industri"
          title="Solusi conveyor untuk berbagai industri"
          description="Dari makanan & minuman hingga tambang & semen — kami memahami kebutuhan spesifik setiap sektor."
        />
      </div>

      <!-- Industry strip -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="industry in industries"
          :key="industry.slug"
          data-reveal-item
          class="group flex items-center gap-4 border-b border-line px-6 py-8 transition-colors duration-150 hover:bg-paper-soft sm:border-l lg:border-b-0"
          :title="industry.description"
        >
          <span class="grid h-9 w-9 shrink-0 place-items-center rounded-none bg-accent/10 text-accent transition-colors duration-150 group-hover:bg-accent group-hover:text-white">
            <svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M3 21h18M4 21V8l6-4v17M14 21V4l6 4v13M8 9h.01M8 13h.01M8 17h.01M17 9h.01M17 13h.01" stroke-linecap="round" />
            </svg>
          </span>
          <span class="text-[15px] font-semibold tracking-tight text-ink/80 transition-colors group-hover:text-ink">
            {{ industry.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
