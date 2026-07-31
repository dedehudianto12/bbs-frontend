<script setup lang="ts">
import { waLink } from '~/utils/whatsapp'

const route = useRoute()
const slug = route.params.slug as string
const { get } = useApi()

const { data: serviceRes, error: serviceErr } = await useAsyncData(`jasa-${slug}`, () =>
  get<any>(`/jasa/${slug}`)
)

const service = computed(() => serviceRes.value?.data ?? null)

useSeoMeta({
  title: service.value ? `${service.value.name} — Jasa — BBS Conveyor` : 'Jasa Tidak Ditemukan — BBS Conveyor',
  description: service.value?.shortDescription ?? ''
})
</script>

<template>
  <div v-if="serviceErr" class="container-tech py-24 md:py-32 text-center">
    <h1 class="display text-3xl text-ink md:text-4xl">Gagal Memuat</h1>
    <p class="mt-4 text-muted">Tidak dapat menghubungi server.</p>
    <div class="mt-8 flex justify-center">
      <UiButton @click="refreshNuxtData(`jasa-${slug}`)">Coba Lagi</UiButton>
    </div>
  </div>

  <div v-else-if="service" class="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
    <Breadcrumb
      class="mb-8"
      :items="[
        { label: 'Beranda', href: '/' },
        { label: 'Jasa', href: '/jasa' },
        { label: service.name },
      ]"
    />

    <p class="eyebrow mb-4 text-accent">
      <span class="inline-block h-1 w-1 rounded-full bg-accent" />
      Layanan
    </p>
    <h1 class="display text-4xl text-ink md:text-5xl">{{ service.name }}</h1>

    <div class="prose-tech mt-10 max-w-none" v-html="service.fullDescription" />

    <div class="mt-12 border-t border-line pt-8">
      <!-- Straight to WhatsApp with the service named, rather than dumping the
           visitor on /kontak to re-explain what they were reading about. -->
      <UiButton :href="waLink({ layanan: service.name })">Konsultasi Jasa Ini <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></UiButton>
    </div>
  </div>

  <div v-else class="container-tech py-24 md:py-32 text-center">
    <h1 class="display text-3xl text-ink md:text-4xl">Jasa Tidak Ditemukan</h1>
    <div class="mt-8 flex justify-center">
      <UiButton href="/jasa" variant="ghost">Kembali ke Jasa <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></UiButton>
    </div>
  </div>
</template>
