<script setup lang="ts">
defineProps<{
  categories: string[]
}>()

// ponytail: category icons — expand when more categories added
const iconMap: Record<string, string> = {
  'PVC Belt': 'i-lucide-arrow-right-left',
  'PU Belt': 'i-lucide-arrow-right-left',
  'Rubber Belt': 'i-lucide-arrow-right-left',
  'Flat Belt': 'i-lucide-minus',
  'Timing Belt': 'i-lucide-cog',
  'Roller': 'i-lucide-rotate-cw',
  'Fastener': 'i-lucide-link-2',
  'Cleat': 'i-lucide-grip',
}

function catSlug(cat: string): string {
  const slug = cat.toLowerCase().replace(/\s+/g, '-')
  // ponytail: guess group from category name
  const isBelt = /belt/i.test(cat) || /pvc|pu|rubber|flat/i.test(cat)
  return isBelt ? `/produk/belt-conveyor/${slug}` : `/produk/lainnya/${slug}`
}
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="mx-auto max-w-6xl px-4">
      <SectionTitle
        eyebrow="Kategori Produk"
        title="Solusi Conveyor untuk Setiap Kebutuhan"
        description="Temukan produk yang tepat untuk aplikasi industri Anda."
        align="center"
      />

      <div class="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <NuxtLink
          v-for="cat in categories"
          :key="cat"
          :to="catSlug(cat)"
          class="group flex flex-col items-center text-center p-6 rounded-xl bg-white border border-border hover:border-gold/30 hover:shadow-sm transition-all duration-200"
        >
          <div class="w-14 h-14 rounded-full bg-bg-soft flex items-center justify-center text-ink group-hover:bg-gold/10 group-hover:text-gold-dark transition-colors mb-4">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <template v-if="/belt/i.test(cat) || /pvc|pu|rubber|flat/i.test(cat)">
                <path d="M4 6h16M4 12h16M4 18h16" />
                <circle cx="8" cy="6" r="2" />
                <circle cx="16" cy="12" r="2" />
                <circle cx="8" cy="18" r="2" />
              </template>
              <template v-else-if="/roller/i.test(cat)">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
              </template>
              <template v-else>
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 12h6M12 9v6" />
              </template>
            </svg>
          </div>
          <span class="text-sm font-medium text-ink group-hover:text-gold-dark transition-colors">{{ cat }}</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
