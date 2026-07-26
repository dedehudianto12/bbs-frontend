<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const { admin } = useAuth(); const { get } = useApi(); const displayName = ref('')
const { data: produkRes } = await useAsyncData('admin-stats-produk', () => get<any[]>('/produk'), { server: false })
const { data: artikelRes } = await useAsyncData('admin-stats-artikel', () => get<any[]>('/artikel'), { server: false })
const { data: jasaRes } = await useAsyncData('admin-stats-jasa', () => get<any[]>('/jasa'), { server: false })
const stats = computed(() => [
  { label: 'Produk', count: produkRes.value?.data?.length ?? 0, href: '/admin/produk' },
  { label: 'Artikel', count: artikelRes.value?.data?.length ?? 0, href: '/admin/artikel' },
  { label: 'Jasa', count: jasaRes.value?.data?.length ?? 0, href: '/admin/jasa' },
])
onMounted(() => { displayName.value = admin.value?.name ?? '' })
</script>

<template>
  <div>
    <div class="mb-7">
      <h1 class="m-0 text-2xl font-bold tracking-[-0.02em] text-ink">Dashboard</h1>
      <p class="mt-1 text-[13px] text-muted">Selamat datang{{ displayName ? ', ' + displayName : '' }}.</p>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <NuxtLink v-for="s in stats" :key="s.label" :to="s.href"
        class="rounded-lg border border-line bg-white p-6 text-inherit no-underline transition-colors duration-150 hover:border-accent">
        <div class="text-[36px] font-extrabold tracking-[-0.02em] text-accent">{{ s.count }}</div>
        <div class="mt-1.5 text-xs uppercase tracking-[0.1em] text-muted">{{ s.label }}</div>
      </NuxtLink>
    </div>
  </div>
</template>
