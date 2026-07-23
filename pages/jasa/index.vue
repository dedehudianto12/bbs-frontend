<script setup lang="ts">
const { data: services } = await useAsyncData('jasa-listing', () =>
  queryCollection('services').all()
)

const serviceList = computed(() =>
  (Array.isArray(services.value) ? services.value : []).map((s: any) => ({
    slug: s.slug,
    title: s.title,
    description: s.excerpt,
  }))
)

useSeoMeta({
  title: 'Jasa — BBS Conveyor',
  description: 'Layanan pembuatan, pemasangan, dan perbaikan belt conveyor oleh BBS Conveyor.'
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Layanan"
      title="Jasa Kami"
      description="Layanan profesional untuk kebutuhan belt conveyor industri Anda."
    />

    <div class="container-tech py-16 md:py-24">
      <div v-if="serviceList.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard v-for="s in serviceList" :key="s.slug" v-bind="s" />
      </div>
      <p v-else class="rounded-2xl border border-dashed border-line py-16 text-center text-sm text-muted">Belum ada layanan tersedia.</p>
    </div>

    <CTASection
      headline="Butuh Layanan Khusus?"
      description="Konsultasikan kebutuhan conveyor Anda dengan tim engineer kami."
      button-text="Hubungi Kami"
      button-link="/kontak"
    />
  </div>
</template>
