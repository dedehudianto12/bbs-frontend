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
    <section class="bg-bg-soft py-14 md:py-20">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-ink tracking-tight">Jasa Kami</h1>
        <p class="mt-4 text-neutral text-lg">Layanan profesional untuk kebutuhan belt conveyor industri Anda.</p>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-4 py-12">
      <div v-if="serviceList.length" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ServiceCard v-for="s in serviceList" :key="s.slug" v-bind="s" />
      </div>
      <p v-else class="text-neutral text-center py-12">Belum ada layanan tersedia.</p>
    </div>

    <CTASection
      headline="Butuh Layanan Khusus?"
      description="Konsultasikan kebutuhan conveyor Anda dengan tim engineer kami."
      button-text="Hubungi Kami"
      button-link="/kontak"
    />
  </div>
</template>
