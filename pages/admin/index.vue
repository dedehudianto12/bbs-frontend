<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const { admin } = useAuth(); const { get } = useApi(); const displayName = ref('')
const { data: produkRes } = await useAsyncData('admin-stats-produk', () => get<any[]>('/produk'))
const { data: artikelRes } = await useAsyncData('admin-stats-artikel', () => get<any[]>('/artikel'))
const { data: jasaRes } = await useAsyncData('admin-stats-jasa', () => get<any[]>('/jasa'))
const stats = computed(() => [
  { label: 'Produk', count: produkRes.value?.data?.length ?? 0, href: '/admin/produk' },
  { label: 'Artikel', count: artikelRes.value?.data?.length ?? 0, href: '/admin/artikel' },
  { label: 'Jasa', count: jasaRes.value?.data?.length ?? 0, href: '/admin/jasa' },
])
onMounted(() => { displayName.value = admin.value?.name ?? '' })
</script>

<template>
  <div>
    <div style="margin-bottom:28px">
      <h1 style="font-size:24px;font-weight:700;color:rgb(var(--ink));margin:0;letter-spacing:-0.02em">Dashboard</h1>
      <p style="font-size:13px;color:rgb(var(--muted));margin:4px 0 0">Selamat datang{{ displayName ? ', ' + displayName : '' }}.</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
      <NuxtLink v-for="s in stats" :key="s.label" :to="s.href"
        style="background:#fff;border:1px solid rgb(var(--line));border-radius:8px;padding:24px;text-decoration:none;color:inherit;transition:border-color .15s"
        onmouseover="this.style.borderColor='rgb(var(--accent))'"
        onmouseout="this.style.borderColor='rgb(var(--line))'">
        <div style="font-size:36px;font-weight:800;color:rgb(var(--accent));letter-spacing:-0.02em">{{ s.count }}</div>
        <div style="font-size:12px;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.1em;margin-top:6px">{{ s.label }}</div>
      </NuxtLink>
    </div>
  </div>
</template>
