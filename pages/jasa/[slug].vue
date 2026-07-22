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
    <NuxtLink to="/jasa" class="text-sm text-gold-dark hover:text-gold transition-colors mb-4 inline-block">
      &larr; Kembali ke Jasa
    </NuxtLink>

    <h1 class="text-3xl font-bold text-ink mb-6">{{ service.title }}</h1>

    <div class="prose prose-neutral max-w-none mb-8">
      <ContentRenderer :value="service" />
    </div>

    <div class="border-t border-border pt-8 mt-8">
      <NuxtLink
        to="/kontak"
        class="inline-block bg-ink text-white px-6 py-3 rounded font-medium hover:bg-gold hover:text-ink transition-colors"
      >
        Konsultasi Jasa Ini
      </NuxtLink>
    </div>
  </div>

  <div v-else class="max-w-6xl mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-bold text-ink mb-4">Jasa Tidak Ditemukan</h1>
    <NuxtLink to="/jasa" class="text-gold-dark hover:text-gold font-medium transition-colors">
      &larr; Kembali ke Jasa
    </NuxtLink>
  </div>
</template>
