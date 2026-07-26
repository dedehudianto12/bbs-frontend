<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const { get, del } = useAdminApi()
const search = ref(''); const filterTag = ref(''); const sort = ref('desc'); const page = ref(1); const limit = 10
const { data: tagRes } = await useAsyncData('admin-tags', () => get<any[]>('/artikel'), { server: false })
const tags = computed(() => [...new Set(((tagRes.value?.data ?? []) as any[]).map((a:any)=>a.tag).filter(Boolean))])
const params = computed(() => { const p = new URLSearchParams({ page: String(page.value), limit: String(limit), sort: sort.value }); if (search.value) p.set('search', search.value); if (filterTag.value) p.set('tag', filterTag.value); return p.toString() })
const { data: res, refresh } = await useAsyncData('admin-artikel', () => get<any>(`/admin/artikel?${params.value}`), { server: false })
watch([search, filterTag, sort, page], () => refresh(), { immediate: true })
const items = computed(() => res.value?.data?.items ?? []); const total = computed(() => res.value?.data?.total ?? 0); const totalPages = computed(() => Math.ceil(total.value / limit))
function goTo(p: number) { page.value = Math.max(1, Math.min(p, totalPages.value)) }
function toggleSort() { sort.value = sort.value === 'desc' ? 'asc' : 'desc'; page.value = 1 }
async function handleDelete(id: string, title: string) { if (!confirm(`Hapus "${title}"?`)) return; await del(`/admin/artikel/${id}`); refresh() }
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="m-0 text-2xl font-bold tracking-[-0.02em] text-ink">Artikel</h1>
      <NuxtLink to="/admin/artikel/baru" class="rounded-md bg-accent px-5 py-2.5 text-[13px] font-semibold tracking-[0.01em] text-white no-underline">+ Artikel Baru</NuxtLink>
    </div>

    <div class="mb-4 flex gap-2.5">
      <input v-model="search" placeholder="Cari judul atau slug..." @keyup.enter="page=1" class="flex-1 rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] font-sans outline-none" />
      <select v-model="filterTag" @change="page=1" class="rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] font-sans outline-none"><option value="">Semua Tag</option><option v-for="t in tags" :key="t" :value="t">{{ t }}</option></select>
      <button @click="toggleSort" class="cursor-pointer whitespace-nowrap rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] font-sans text-muted">{{ sort==='desc'?'↓ Terbaru':'↑ Terlama' }}</button>
    </div>

    <div class="overflow-x-auto rounded-lg border border-line bg-white">
      <table class="w-full border-collapse text-[13px]">
        <thead><tr class="border-b border-line bg-paper-soft"><th class="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Judul</th><th class="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Tag</th><th class="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Author</th><th class="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Aksi</th></tr></thead>
        <tbody>
          <tr v-for="a in items" :key="a.id" class="border-b border-line">
            <td class="px-4 py-3.5 font-semibold text-ink">{{ a.title }}</td>
            <td class="px-4 py-3.5 text-muted"><span v-if="a.tag" class="rounded bg-paper-soft px-2 py-0.5 text-[11px] font-medium">#{{ a.tag }}</span></td>
            <td class="px-4 py-3.5 text-muted">{{ a.author }}</td>
            <td class="px-4 py-3.5">
              <NuxtLink :to="`/admin/artikel/${a.id}`" title="Edit" class="mr-2 inline-block cursor-pointer rounded border-none bg-transparent p-1 text-muted"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></NuxtLink>
              <button title="Hapus" class="cursor-pointer rounded border-none bg-transparent p-1 text-muted" @click="handleDelete(a.id,a.title)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button>
            </td>
          </tr>
          <tr v-if="!items.length"><td colspan="4" class="px-4 py-[60px] text-center text-muted">Belum ada artikel.</td></tr>
        </tbody>
      </table>
    </div>

    <div v-if="totalPages>1" class="mt-5 flex items-center justify-center gap-2.5">
      <button :disabled="page<=1" @click="goTo(page-1)" class="cursor-pointer rounded-md border border-line bg-white px-4 py-2 text-xs font-sans text-muted">Prev</button>
      <span class="text-xs text-muted">{{ page }} / {{ totalPages }} ({{ total }})</span>
      <button :disabled="page>=totalPages" @click="goTo(page+1)" class="cursor-pointer rounded-md border border-line bg-white px-4 py-2 text-xs font-sans text-muted">Next</button>
    </div>
  </div>
</template>
