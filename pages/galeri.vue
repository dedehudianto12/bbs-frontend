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
    <PageHero
      eyebrow="Galeri"
      title="Galeri Proyek Kami"
      description="Dokumentasi hasil kerja kami di berbagai proyek dan lokasi di Indonesia."
    />

    <div class="container-tech py-16 md:py-24">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="(item, i) in galleryItems" :key="i" class="group">
          <GradientPanel :index="i * 2 + 1" class="aspect-[4/3] w-full transition-transform duration-300 group-hover:-translate-y-1">
            <div class="absolute inset-0 flex items-end p-5">
              <span class="text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">Proyek {{ String(i + 1).padStart(2, '0') }}</span>
            </div>
          </GradientPanel>
          <p class="mt-3 text-sm leading-snug text-muted">{{ item.caption }}</p>
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
