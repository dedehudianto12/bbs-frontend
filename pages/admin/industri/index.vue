<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { industrySchema } from '~/utils/validation'
const { get, del, post, put } = useAdminApi()

const search = ref(''); const sort = ref('desc'); const page = ref(1); const limit = 10
const params = computed(() => { const p = new URLSearchParams({ page: String(page.value), limit: String(limit), sort: sort.value }); if (search.value) p.set('search', search.value); return p.toString() })
const { data: res, refresh } = await useAsyncData('admin-industri', () => get<any>(`/admin/industri?${params.value}`))
watch([search, sort, page], () => refresh())
const items = computed(() => res.value?.data?.items ?? []); const total = computed(() => res.value?.data?.total ?? 0); const totalPages = computed(() => Math.ceil(total.value / limit))
function goTo(p: number) { page.value = Math.max(1, Math.min(p, totalPages.value)) }
function toggleSort() { sort.value = sort.value === 'desc' ? 'asc' : 'desc'; page.value = 1 }
async function handleDelete(id: string, name: string) { if (!confirm(`Hapus "${name}"?`)) return; await del(`/admin/industri/${id}`); refresh() }

const modalOpen = ref(false); const modalTitle = ref(''); const editId = ref<string|null>(null)
const form = reactive({ name:'',description:'',image:'',productSlugs:'' })
const saving = ref(false); const error = ref(''); const fieldErrors = ref<Record<string,string>>({})
function openCreate(){modalTitle.value='Industri Baru';editId.value=null;Object.assign(form,{name:'',description:'',image:'',productSlugs:''});fieldErrors.value={};error.value='';modalOpen.value=true}
async function openEdit(id:string){const r=await get<any>(`/admin/industri/${id}`);if(r?.data){const i=r.data;editId.value=id;modalTitle.value='Edit Industri';Object.assign(form,{name:i.name,description:i.description,image:i.image??'',productSlugs:(i.productSlugs??[]).join(', ')});fieldErrors.value={};error.value='';modalOpen.value=true}}
async function save(){saving.value=true;error.value='';fieldErrors.value={};try{const data=industrySchema.parse({...form,image:form.image||null});const body={...data,productSlugs:data.productSlugs.split(',').map((s:string)=>s.trim()).filter(Boolean)};if(editId.value)await put(`/admin/industri/${editId.value}`,body);else await post('/admin/industri',body);modalOpen.value=false;refresh()}catch(e:any){if(e?.issues){for(const i of e.issues)fieldErrors.value[i.path[0]as string]=i.message;error.value='Mohon perbaiki error di bawah.'}else error.value=e?.data?.error||'Gagal menyimpan.'}finally{saving.value=false}}
const L='font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em'
const I='display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:inherit;box-sizing:border-box;outline:none'
</script>
<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px"><h1 style="font-size:24px;font-weight:700;color:rgb(var(--ink));margin:0;letter-spacing:-0.02em">Industri</h1><button @click="openCreate" style="background:rgb(var(--accent));color:#fff;padding:10px 20px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;border:none;letter-spacing:0.01em">+ Industri Baru</button></div>
    <div style="display:flex;gap:10px;margin-bottom:16px"><input v-model="search" placeholder="Cari nama..." @keyup.enter="page=1" style="flex:1;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:13px;font-family:inherit;outline:none;background:#fff" /><button @click="toggleSort" style="padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;background:#fff;font-size:13px;font-family:inherit;cursor:pointer;white-space:nowrap;color:rgb(var(--muted))">{{ sort==='desc'?'↓ Terbaru':'↑ Terlama' }}</button></div>
    <div style="overflow-x:auto;border-radius:8px;border:1px solid rgb(var(--line));background:#fff"><table style="width:100%;font-size:13px;border-collapse:collapse"><thead><tr style="background:rgb(var(--paper-soft));border-bottom:1px solid rgb(var(--line))"><th style="padding:12px 16px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;font-size:11px;letter-spacing:0.08em;text-align:left">Nama</th><th style="padding:12px 16px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;font-size:11px;letter-spacing:0.08em;text-align:left">Deskripsi</th><th style="padding:12px 16px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;font-size:11px;letter-spacing:0.08em;text-align:left">Aksi</th></tr></thead>
    <tbody><tr v-for="i in items" :key="i.id" style="border-bottom:1px solid rgb(var(--line))"><td style="padding:14px 16px;font-weight:600;color:rgb(var(--ink))">{{ i.name }}</td><td style="padding:14px 16px;color:rgb(var(--muted));max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ i.description }}</td><td style="padding:14px 16px"><button @click="openEdit(i.id)" title="Edit" style="color:rgb(var(--muted));margin-right:8px;background:none;border:none;cursor:pointer;padding:4px;border-radius:4px"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button title="Hapus" style="color:rgb(var(--muted));background:none;border:none;cursor:pointer;padding:4px;border-radius:4px" @click="handleDelete(i.id,i.name)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button></td></tr>
    <tr v-if="!items.length"><td colspan="3" style="padding:60px 16px;text-align:center;color:rgb(var(--muted))">Belum ada industri.</td></tr></tbody></table></div>
    <div v-if="totalPages>1" style="display:flex;justify-content:center;align-items:center;gap:10px;margin-top:20px"><button :disabled="page<=1" @click="goTo(page-1)" style="padding:8px 16px;border:1px solid rgb(var(--line));border-radius:6px;background:#fff;font-size:12px;font-family:inherit;cursor:pointer;color:rgb(var(--muted))">Prev</button><span style="font-size:12px;color:rgb(var(--muted))">{{ page }} / {{ totalPages }} ({{ total }})</span><button :disabled="page>=totalPages" @click="goTo(page+1)" style="padding:8px 16px;border:1px solid rgb(var(--line));border-radius:6px;background:#fff;font-size:12px;font-family:inherit;cursor:pointer;color:rgb(var(--muted))">Next</button></div>

    <ModalForm :open="modalOpen" :title="modalTitle" @close="modalOpen=false">
      <div v-if="error" style="background:#fef2f2;color:#dc2626;padding:12px 16px;border-radius:8px;font-size:13px;margin-bottom:20px;border:1px solid #fecaca">{{ error }}</div>
      <form style="display:flex;flex-direction:column;gap:18px" @submit.prevent="save">
        <label style="display:block"><span :style="L">Nama</span><input v-model="form.name" :style="I" /><span v-if="fieldErrors.name" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.name }}</span></label>
        <label style="display:block"><span :style="L">Deskripsi</span><textarea v-model="form.description" rows="3" :style="[I,'resize:vertical']" /></label>
        <label style="display:block"><span :style="L">URL Gambar</span><input v-model="form.image" :style="I" /></label>
        <label style="display:block"><span :style="L">Product Slugs (pisahkan koma)</span><input v-model="form.productSlugs" :style="I" /></label>
        <button type="submit" :disabled="saving" style="padding:12px 24px;background:rgb(var(--accent));color:#fff;border:none;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:0.01em;margin-top:8px">{{ saving?'Menyimpan...':'Simpan' }}</button>
      </form>
    </ModalForm>
  </div>
</template>
