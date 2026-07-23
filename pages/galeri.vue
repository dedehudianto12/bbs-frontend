<script setup lang="ts">
// ponytail: gallery is static placeholder — content/ galleries collection TBD
const galleryItems = [
  { caption: 'Instalasi Belt Conveyor di Pabrik Manufaktur — Jakarta' },
  { caption: 'Onsite Joint Rubber Belt di Tambang — Kalimantan' },
  { caption: 'Penggantian Roller Conveyor — Surabaya' },
  { caption: 'Proyek Conveyor System — Semarang' },
  { caption: 'PVC Belt Food Grade — Pabrik Makanan' },
  { caption: 'Maintenance Conveyor — Kawasan Industri' },
]

useSeoMeta({
  title: 'Galeri Proyek — BBS Conveyor',
  description: 'Dokumentasi proyek instalasi belt conveyor, roller, dan jasa onsite joint oleh BBS Conveyor.'
})
</script>

<template>
  <div>
    <section class="bg-bg-soft py-14 md:py-20">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-ink tracking-tight">Galeri Proyek Kami</h1>
        <p class="mt-4 text-neutral text-lg">Dokumentasi hasil kerja kami di berbagai proyek dan lokasi di Indonesia.</p>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(item, i) in galleryItems" :key="i" class="group">
          <div class="aspect-[4/3] bg-bg-soft rounded-xl flex items-center justify-center overflow-hidden">
            <div class="text-center text-neutral/30">
              <svg class="w-10 h-10 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          </div>
          <p class="mt-3 text-sm text-neutral leading-snug">{{ item.caption }}</p>
        </div>
      </div>
    </div>

    <CTASection
      headline="Punya Proyek Serupa?"
      description="Kami siap membantu kebutuhan conveyor di lokasi Anda."
      button-text="Hubungi Kami"
      button-link="/kontak"
    />
  </div>
</template>
