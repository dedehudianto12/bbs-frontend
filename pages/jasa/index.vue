<script setup lang="ts">
const { get } = useApi()

const { data: serviceRes, error: serviceErr } = await useAsyncData('jasa-listing', () =>
  get<any[]>('/jasa')
)

const serviceList = computed(() =>
  (serviceRes.value?.data ?? []).map((s: any) => ({
    slug: s.slug,
    title: s.name,
    description: s.shortDescription,
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
      <div v-if="serviceErr" class="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
        <p class="text-sm font-semibold text-red-700">Gagal memuat jasa.</p>
        <p class="mt-1 text-[13px] text-red-600">Tidak dapat menghubungi server.</p>
        <button @click="() => refreshNuxtData('jasa-listing')" class="mt-4 cursor-pointer rounded-md bg-accent px-5 py-2 text-[13px] font-semibold text-white border-none">Coba Lagi</button>
      </div>

      <div v-else-if="serviceList.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
