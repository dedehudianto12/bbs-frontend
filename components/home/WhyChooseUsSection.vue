<script setup lang="ts">
defineProps<{
  items: { title: string; description: string }[]
}>()

// ponytail: simple icon map, match by title keyword
function iconFor(title: string): string {
  const t = title.toLowerCase()
  if (/pengalaman|tahun/i.test(t)) return 'clock'
  if (/kualitas|standar|mutu/i.test(t)) return 'shield-check'
  if (/teknis|engineer|ahli/i.test(t)) return 'wrench'
  if (/harga|terjangkau|kompetitif/i.test(t)) return 'tag'
  if (/dukung|support|layanan/i.test(t)) return 'headset'
  if (/cepat|pengiriman|logistik/i.test(t)) return 'truck'
  if (/garansi|jaminan/i.test(t)) return 'badge-check'
  return 'check-circle'
}
</script>

<template>
  <section class="py-16 md:py-24 bg-bg-soft">
    <div class="mx-auto max-w-6xl px-4">
      <SectionTitle
        eyebrow="Kenapa Pilih BBS Conveyor"
        title="Mitra Terpercaya untuk Solusi Conveyor Industri"
        align="center"
      />

      <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div
          v-for="(item, i) in items"
          :key="item.title"
          class="text-center group"
        >
          <div class="mx-auto w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center text-gold group-hover:border-gold/30 group-hover:shadow-sm transition-all duration-200 mb-4">
            <!-- Simple icon shapes -->
            <svg v-if="iconFor(item.title) === 'clock'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            <svg v-else-if="iconFor(item.title) === 'shield-check'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
            <svg v-else-if="iconFor(item.title) === 'wrench'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
            <svg v-else-if="iconFor(item.title) === 'tag'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
            <svg v-else-if="iconFor(item.title) === 'headset'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>
            <svg v-else-if="iconFor(item.title) === 'truck'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
            <svg v-else-if="iconFor(item.title) === 'badge-check'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          </div>
          <p class="text-ink font-semibold text-sm mb-1">{{ item.title }}</p>
          <p class="text-neutral text-sm leading-relaxed">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
