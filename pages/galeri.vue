<script setup lang="ts">
// Wired to the backend gallery. This page previously rendered a hardcoded
// 6-item placeholder array while the backend held real captioned rows with
// locations and a full admin CRUD behind it — two competing sets of captions.
// ProofMarquee on the home page now surfaces the real records, so a gallery
// page showing a different invented set would contradict it outright.
const { get } = useApi()

const { data: galleryRes, error: galleryErr } = await useAsyncData('galeri-list', () =>
  get<any[]>('/galeri')
)

const galleryItems = computed(() =>
  (galleryRes.value?.data ?? []).map((g: any) => ({
    id: g.id,
    image: g.image || null,
    caption: g.caption ?? '',
    location: g.location || null,
  }))
)

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
      <div v-if="galleryErr" class="border border-red-200 bg-red-50 px-6 py-8 text-center">
        <p class="text-sm font-semibold text-red-700">Gagal Memuat</p>
        <p class="mt-1 text-[13px] text-red-600">Tidak dapat menghubungi server.</p>
        <div class="mt-4 flex justify-center">
          <UiButton size="sm" @click="refreshNuxtData('galeri-list')">Coba Lagi</UiButton>
        </div>
      </div>

      <p v-else-if="!galleryItems.length" class="text-center text-muted">
        Belum ada dokumentasi proyek.
      </p>

      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <figure
          v-for="(item, i) in galleryItems"
          :key="item.id ?? i"
          class="card-shell"
        >
          <ImageOrSkeleton
            :src="item.image"
            :alt="item.caption"
            aspect="aspect-[4/3]"
            rounded="rounded-none"
            :fallback-index="i * 2 + 1"
          />
          <figcaption class="flex flex-1 flex-col gap-2 border-t border-line p-4">
            <p class="text-sm leading-snug text-ink/80">{{ item.caption }}</p>
            <span v-if="item.location" class="spec-key mt-auto !text-accent">
              {{ item.location }}
            </span>
          </figcaption>
        </figure>
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
