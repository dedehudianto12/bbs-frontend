<script setup lang="ts">
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
      <button @click="() => refreshNuxtData(`jasa-${slug}`)" class="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white cursor-pointer border-none">Coba Lagi</button>
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
      <NuxtLink to="/kontak" class="inline-flex items-center gap-2 rounded-md bg-[rgb(var(--accent))] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[rgb(var(--accent-glow))]">Konsultasi Jasa Ini <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></NuxtLink>
    </div>
  </div>

  <div v-else class="container-tech py-24 md:py-32 text-center">
    <h1 class="display text-3xl text-ink md:text-4xl">Jasa Tidak Ditemukan</h1>
    <div class="mt-8 flex justify-center">
      <NuxtLink to="/jasa" class="inline-flex items-center gap-2 rounded-md px-6 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition-colors hover:bg-[rgb(var(--paper-soft))]">Kembali ke Jasa <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></NuxtLink>
    </div>
  </div>
</template>
