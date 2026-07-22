<script setup lang="ts">
import { JASA_SLUGS } from '~/types/category'

const route = useRoute()
const slug = route.params.slug as string

const { getBySlug } = useServices()
const { data: service } = await useAsyncData(`service-${slug}`, () => getBySlug(slug))

const currentLabel = computed(() => {
  const match = JASA_SLUGS.find((j) => j.slug === slug)
  return match?.label ?? slug
})

useSeoMeta({
  title: service.value ? `${service.value.name} — Jasa — BBS Conveyor` : 'Jasa Tidak Ditemukan — BBS Conveyor',
  description: service.value?.shortDescription ?? ''
})
</script>

<template>
  <div v-if="service" class="max-w-4xl mx-auto px-4 py-12">
    <NuxtLink to="/jasa" class="text-sm text-gold-dark hover:text-gold transition-colors mb-4 inline-block">
      &larr; Kembali ke Jasa
    </NuxtLink>

    <h1 class="text-3xl font-bold text-ink mb-6">{{ service.name }}</h1>

    <!-- Image gallery -->
    <div v-if="service.images.length" class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <div
        v-for="(img, i) in service.images"
        :key="i"
        class="aspect-[4/3] bg-bg-soft rounded-lg flex items-center justify-center text-neutral text-sm"
      >
        {{ service.name }} {{ i + 1 }}
      </div>
    </div>

    <!-- Full description -->
    <div class="prose prose-neutral max-w-none mb-8">
      <p v-for="(para, i) in service.fullDescription.split('\n\n')" :key="i" class="mb-4 text-neutral leading-relaxed">
        {{ para }}
      </p>
    </div>

    <!-- CTA -->
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
    <p class="text-neutral mb-8">Layanan "{{ slug }}" tidak tersedia.</p>
    <NuxtLink to="/jasa" class="text-gold-dark hover:text-gold font-medium transition-colors">
      &larr; Kembali ke Jasa
    </NuxtLink>
  </div>
</template>
