<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { serviceSchema } from '~/utils/validation'
const { get, del, post, put } = useAdminApi()

const search = ref(''); const sort = ref('desc'); const page = ref(1); const limit = 10
const params = computed(() => { const p = new URLSearchParams({ page: String(page.value), limit: String(limit), sort: sort.value }); if (search.value) p.set('search', search.value); return p.toString() })
const { data: res, refresh } = await useAsyncData('admin-jasa', () => get<any>(`/admin/jasa?${params.value}`), { server: false })
watch([search, sort, page], () => refresh(), { immediate: true })
const items = computed(() => res.value?.data?.items ?? []); const total = computed(() => res.value?.data?.total ?? 0); const totalPages = computed(() => Math.ceil(total.value / limit))
function goTo(p: number) { page.value = Math.max(1, Math.min(p, totalPages.value)) }
function toggleSort() { sort.value = sort.value === 'desc' ? 'asc' : 'desc'; page.value = 1 }
async function handleDelete(id: string, name: string) { if (!confirm(`Hapus "${name}"?`)) return; await del(`/admin/jasa/${id}`); refresh() }

const modalOpen = ref(false); const modalTitle = ref(''); const editId = ref<string|null>(null)
const form = reactive({ name:'',shortDescription:'',fullDescription:'' })
const saving = ref(false); const error = ref(''); const fieldErrors = ref<Record<string,string>>({})
function openCreate(){modalTitle.value='Jasa Baru';editId.value=null;Object.assign(form,{name:'',shortDescription:'',fullDescription:''});fieldErrors.value={};error.value='';modalOpen.value=true}
async function openEdit(id:string){const r=await get<any>(`/admin/jasa/${id}`);if(r?.data){const s=r.data;editId.value=id;modalTitle.value='Edit Jasa';Object.assign(form,{name:s.name,shortDescription:s.shortDescription,fullDescription:s.fullDescription??''});fieldErrors.value={};error.value='';modalOpen.value=true}}
async function save(){saving.value=true;error.value='';fieldErrors.value={};try{const data=serviceSchema.parse(form);if(editId.value)await put(`/admin/jasa/${editId.value}`,{...data,images:[]});else await post('/admin/jasa',{...data,images:[]});modalOpen.value=false;refresh()}catch(e:any){if(e?.issues){for(const i of e.issues)fieldErrors.value[i.path[0]as string]=i.message;error.value='Mohon perbaiki error di bawah.'}else error.value=e?.data?.error||'Gagal menyimpan.'}finally{saving.value=false}}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between"><h1 class="m-0 text-2xl font-bold tracking-[-0.02em] text-ink">Jasa</h1><button @click="openCreate" class="cursor-pointer rounded-md border-none bg-accent px-5 py-2.5 text-[13px] font-semibold tracking-[0.01em] text-white">+ Jasa Baru</button></div>

    <div class="mb-4 flex gap-2.5"><input v-model="search" placeholder="Cari nama..." @keyup.enter="page=1" class="flex-1 rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] font-sans outline-none" /><button @click="toggleSort" class="cursor-pointer whitespace-nowrap rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] font-sans text-muted">{{ sort==='desc'?'↓ Terbaru':'↑ Terlama' }}</button></div>

    <div class="overflow-x-auto rounded-lg border border-line bg-white"><table class="w-full border-collapse text-[13px]"><thead><tr class="border-b border-line bg-paper-soft"><th class="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Nama</th><th class="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Deskripsi</th><th class="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Aksi</th></tr></thead>
    <tbody><tr v-for="s in items" :key="s.id" class="border-b border-line"><td class="px-4 py-3.5 font-semibold text-ink">{{ s.name }}</td><td class="max-w-[200px] overflow-hidden truncate px-4 py-3.5 text-muted">{{ s.shortDescription }}</td><td class="px-4 py-3.5"><button @click="openEdit(s.id)" title="Edit" class="mr-2 cursor-pointer rounded border-none bg-transparent p-1 text-muted"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button title="Hapus" class="cursor-pointer rounded border-none bg-transparent p-1 text-muted" @click="handleDelete(s.id,s.name)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button></td></tr>
    <tr v-if="!items.length"><td colspan="3" class="px-4 py-[60px] text-center text-muted">Belum ada jasa.</td></tr></tbody></table></div>

    <div v-if="totalPages>1" class="mt-5 flex items-center justify-center gap-2.5"><button :disabled="page<=1" @click="goTo(page-1)" class="cursor-pointer rounded-md border border-line bg-white px-4 py-2 text-xs font-sans text-muted">Prev</button><span class="text-xs text-muted">{{ page }} / {{ totalPages }} ({{ total }})</span><button :disabled="page>=totalPages" @click="goTo(page+1)" class="cursor-pointer rounded-md border border-line bg-white px-4 py-2 text-xs font-sans text-muted">Next</button></div>

    <ModalForm :open="modalOpen" :title="modalTitle" @close="modalOpen=false">
      <div v-if="error" class="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">{{ error }}</div>
      <form class="flex flex-col gap-[18px]" @submit.prevent="save">
        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Nama</span><input v-model="form.name" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /><span v-if="fieldErrors.name" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.name }}</span></label>
        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Deskripsi Singkat</span><textarea v-model="form.shortDescription" rows="2" class="mt-1.5 block w-full resize-y rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /></label>
        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Deskripsi Lengkap</span><TiptapEditor v-model="form.fullDescription" /></label>
        <button type="submit" :disabled="saving" class="mt-2 cursor-pointer rounded-md border-none bg-accent px-6 py-3 text-sm font-semibold tracking-[0.01em] text-white">{{ saving?'Menyimpan...':'Simpan' }}</button>
      </form>
    </ModalForm>
  </div>
</template>
