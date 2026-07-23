<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: allServices } = await useAsyncData(`jasa-${slug}`, () =>
  queryCollection('services').all()
)

const service = computed(() =>
  (Array.isArray(allServices.value) ? allServices.value : []).find((s: any) => s.slug === slug)
)

useSeoMeta({
  title: service.value ? `${(service.value as any).title} — Jasa — BBS Conveyor` : 'Jasa Tidak Ditemukan — BBS Conveyor',
  description: (service.value as any)?.excerpt ?? ''
})
</script>

<template>
  <div v-if="service" class="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
    <Breadcrumb
      class="mb-8"
      :items="[
        { label: 'Beranda', href: '/' },
        { label: 'Jasa', href: '/jasa' },
        { label: service.title },
      ]"
    />

    <p class="eyebrow mb-4 text-accent">
      <span class="inline-block h-1 w-1 rounded-full bg-accent" />
      Layanan
    </p>
    <h1 class="display text-4xl text-ink md:text-5xl">{{ service.title }}</h1>

    <div class="prose-tech mt-10 max-w-none">
      <ContentRenderer :value="service" />
    </div>

    <div class="mt-12 border-t border-line pt-8">
      <Button to="/kontak" variant="accent" arrow>
        Konsultasi Jasa Ini
      </Button>
    </div>
  </div>

  <div v-else class="container-tech py-24 md:py-32 text-center">
    <h1 class="display text-3xl text-ink md:text-4xl">Jasa Tidak Ditemukan</h1>
    <div class="mt-8 flex justify-center">
      <Button to="/jasa" variant="ghost" arrow>Kembali ke Jasa</Button>
    </div>
  </div>
</template>
