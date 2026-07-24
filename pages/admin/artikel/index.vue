<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const { get, del } = useAdminApi()
const search = ref(''); const filterTag = ref(''); const sort = ref('desc'); const page = ref(1); const limit = 10
const { data: tagRes } = await useAsyncData('admin-tags', () => get<any[]>('/artikel'))
const tags = computed(() => [...new Set(((tagRes.value?.data ?? []) as any[]).map((a:any)=>a.tag).filter(Boolean))])
const params = computed(() => { const p = new URLSearchParams({ page: String(page.value), limit: String(limit), sort: sort.value }); if (search.value) p.set('search', search.value); if (filterTag.value) p.set('tag', filterTag.value); return p.toString() })
const { data: res, refresh } = await useAsyncData('admin-artikel', () => get<any>(`/admin/artikel?${params.value}`))
watch([search, filterTag, sort, page], () => refresh())
const items = computed(() => res.value?.data?.items ?? []); const total = computed(() => res.value?.data?.total ?? 0); const totalPages = computed(() => Math.ceil(total.value / limit))
function goTo(p: number) { page.value = Math.max(1, Math.min(p, totalPages.value)) }
function toggleSort() { sort.value = sort.value === 'desc' ? 'asc' : 'desc'; page.value = 1 }
async function handleDelete(id: string, title: string) { if (!confirm(`Hapus "${title}"?`)) return; await del(`/admin/artikel/${id}`); refresh() }
const s = { header:'font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em;text-align:left;padding:12px 16px', cell:'padding:14px 16px', row:'border-bottom:1px solid rgb(var(--line))' }
</script>

<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
      <h1 style="font-size:24px;font-weight:700;color:rgb(var(--ink));margin:0;letter-spacing:-0.02em">Artikel</h1>
      <NuxtLink to="/admin/artikel/baru" style="background:rgb(var(--accent));color:#fff;padding:10px 20px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;letter-spacing:0.01em">+ Artikel Baru</NuxtLink>
    </div>
    <div style="display:flex;gap:10px;margin-bottom:16px">
      <input v-model="search" placeholder="Cari judul atau slug..." @keyup.enter="page=1" style="flex:1;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:13px;font-family:inherit;outline:none;background:#fff" />
      <select v-model="filterTag" @change="page=1" style="padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:13px;font-family:inherit;background:#fff;outline:none"><option value="">Semua Tag</option><option v-for="t in tags" :key="t" :value="t">{{ t }}</option></select>
      <button @click="toggleSort" style="padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;background:#fff;font-size:13px;font-family:inherit;cursor:pointer;white-space:nowrap;color:rgb(var(--muted))">{{ sort==='desc'?'↓ Terbaru':'↑ Terlama' }}</button>
    </div>
    <div style="overflow-x:auto;border-radius:8px;border:1px solid rgb(var(--line));background:#fff"><table style="width:100%;font-size:13px;border-collapse:collapse">
      <thead><tr style="background:rgb(var(--paper-soft));border-bottom:1px solid rgb(var(--line))"><th :style="s.header">Judul</th><th :style="s.header">Tag</th><th :style="s.header">Author</th><th :style="s.header">Aksi</th></tr></thead>
      <tbody><tr v-for="a in items" :key="a.id" :style="s.row"><td :style="[s.cell,'font-weight:600;color:rgb(var(--ink))']">{{ a.title }}</td><td :style="[s.cell,'color:rgb(var(--muted))']"><span v-if="a.tag" style="background:rgb(var(--paper-soft));padding:2px 8px;border-radius:4px;font-size:11px;font-weight:500">#{{ a.tag }}</span></td><td :style="[s.cell,'color:rgb(var(--muted))']">{{ a.author }}</td>
      <td :style="s.cell"><NuxtLink :to="`/admin/artikel/${a.id}`" title="Edit" style="color:rgb(var(--muted));margin-right:8px;text-decoration:none;display:inline-block"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></NuxtLink><button title="Hapus" style="color:rgb(var(--muted));background:none;border:none;cursor:pointer;font-family:inherit;padding:4px;border-radius:4px" @click="handleDelete(a.id,a.title)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button></td></tr>
      <tr v-if="!items.length"><td colspan="4" style="padding:60px 16px;text-align:center;color:rgb(var(--muted))">Belum ada artikel.</td></tr></tbody>
    </table></div>
    <div v-if="totalPages>1" style="display:flex;justify-content:center;align-items:center;gap:10px;margin-top:20px"><button :disabled="page<=1" @click="goTo(page-1)" style="padding:8px 16px;border:1px solid rgb(var(--line));border-radius:6px;background:#fff;font-size:12px;font-family:inherit;cursor:pointer;color:rgb(var(--muted))">Prev</button><span style="font-size:12px;color:rgb(var(--muted))">{{ page }} / {{ totalPages }} ({{ total }})</span><button :disabled="page>=totalPages" @click="goTo(page+1)" style="padding:8px 16px;border:1px solid rgb(var(--line));border-radius:6px;background:#fff;font-size:12px;font-family:inherit;cursor:pointer;color:rgb(var(--muted))">Next</button></div>
  </div>
</template>
