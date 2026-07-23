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
  <div v-if="service" class="max-w-4xl mx-auto px-4 py-12">
    <Breadcrumb
      :items="[
        { label: 'Beranda', href: '/' },
        { label: 'Jasa', href: '/jasa' },
        { label: service.title },
      ]"
    />

    <h1 class="text-3xl font-bold text-ink tracking-tight mb-6">{{ service.title }}</h1>

    <div class="prose prose-neutral max-w-none mb-8">
      <ContentRenderer :value="service" />
    </div>

    <div class="border-t border-border pt-8 mt-8">
      <Button to="/kontak">
        Konsultasi Jasa Ini
      </Button>
    </div>
  </div>

  <div v-else class="max-w-6xl mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-bold text-ink mb-4">Jasa Tidak Ditemukan</h1>
    <Button to="/jasa" variant="outline">
      &larr; Kembali ke Jasa
    </Button>
  </div>
</template>
