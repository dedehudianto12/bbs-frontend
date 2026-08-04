<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { IMAGE_ACCEPT } from '~/composables/useImageUpload'
import { watchDebounced } from '@vueuse/core'
import { industrySchema } from '~/utils/validation'
const { get, del, post, put } = useAdminApi()
const { imageFile, imagePreview, existingUrl, error: uploadError, onFileChange, reset } = useImageUpload()

const search = ref(''); const sort = ref('desc'); const page = ref(1); const limit = 10
const params = computed(() => { const p = new URLSearchParams({ page: String(page.value), limit: String(limit), sort: sort.value }); if (search.value) p.set('search', search.value); return p.toString() })
const { data: res, refresh, status, error: fetchErr } = await useAsyncData('admin-industri', () => get<any>(`/admin/industri?${params.value}`), { server: false })
if (import.meta.client && !res.value) await refresh()
// Search is debounced: the watcher used to fire a request on every keystroke,
// so typing "conveyor" queued eight of them and the last response to arrive won
// — not necessarily the last one sent. The other controls are discrete clicks
// and still apply immediately.
watchDebounced(search, () => {
  // Resetting the page already triggers the watcher below; refreshing here too
  // would issue the same request twice.
  if (page.value !== 1) page.value = 1
  else refresh()
}, { debounce: 350 })
watch([sort, page], () => refresh())

const loading = computed(() => status.value === 'pending')
const failed = computed(() => !!fetchErr.value || res.value?.error != null)
const items = computed(() => res.value?.data?.items ?? []); const total = computed(() => res.value?.data?.total ?? 0); const totalPages = computed(() => Math.ceil(total.value / limit))
function goTo(p: number) { page.value = Math.max(1, Math.min(p, totalPages.value)) }
function toggleSort() { sort.value = sort.value === 'desc' ? 'asc' : 'desc'; page.value = 1 }
const { open: confirm } = useConfirm()
const toast = useToast()
async function handleDelete(id: string, name: string) { if (!await confirm({ title: `Hapus "${name}"?`, message: 'Industri yang dihapus tidak dapat dikembalikan.' })) return; try { await del(`/admin/industri/${id}`); toast.success(`"${name}" berhasil dihapus`); refresh() } catch { toast.error('Gagal menghapus industri') } }

const modalOpen = ref(false); const modalTitle = ref(''); const editId = ref<string|null>(null)
const form = reactive({ name:'',description:'',productSlugs:'' })
const saving = ref(false); const error = ref(''); const fieldErrors = ref<Record<string,string>>({})

function openCreate(){modalTitle.value='Industri Baru';editId.value=null;Object.assign(form,{name:'',description:'',productSlugs:''});reset();fieldErrors.value={};error.value='';modalOpen.value=true}
async function openEdit(id:string){const r=await get<any>(`/admin/industri/${id}`);if(r?.data){const i=r.data;editId.value=id;modalTitle.value='Edit Industri';Object.assign(form,{name:i.name,description:i.description,productSlugs:(i.productSlugs??[]).join(', ')});reset(i.image??'');fieldErrors.value={};error.value='';modalOpen.value=true}}
async function save(){
  saving.value=true;error.value='';fieldErrors.value={}
  try{
    industrySchema.parse({...form,image:existingUrl.value||null})
    const fd = new FormData()
    fd.append('name',form.name);fd.append('description',form.description)
    fd.append('productSlugs',form.productSlugs)
    if(imageFile.value) fd.append('file',imageFile.value)
    if(editId.value)await put(`/admin/industri/${editId.value}`,fd);else await post('/admin/industri',fd)
    modalOpen.value=false;refresh()
    toast.success(editId.value ? 'Industri berhasil diperbarui' : 'Industri berhasil ditambahkan')
  }catch(e:any){if(e?.issues){for(const i of e.issues)fieldErrors.value[i.path[0]as string]=i.message;error.value='Mohon perbaiki error di bawah.'}else error.value=e?.data?.error||'Gagal menyimpan.'}finally{saving.value=false}
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between"><h1 class="m-0 text-2xl font-bold tracking-[-0.02em] text-ink">Industri</h1><button @click="openCreate" class="cursor-pointer rounded-md border-none bg-accent px-5 py-2.5 text-[13px] font-semibold tracking-[0.01em] text-white">+ Industri Baru</button></div>

    <div class="mb-4 flex gap-2.5"><input v-model="search" placeholder="Cari nama..." @keyup.enter="page=1" class="flex-1 rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] font-sans outline-none" /><button @click="toggleSort" class="cursor-pointer whitespace-nowrap rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] font-sans text-muted">{{ sort==='desc'?'↓ Terbaru':'↑ Terlama' }}</button></div>

    <div class="overflow-x-auto rounded-lg border border-line bg-white"><table class="table-admin"><thead><tr><th>Nama</th><th>Deskripsi</th><th>Aksi</th></tr></thead>
    <tbody><tr v-for="i in items" :key="i.id"><td class="font-semibold text-ink">{{ i.name }}</td><td class="max-w-[200px] overflow-hidden truncate px-4 py-3.5 text-muted">{{ i.description }}</td><td><button @click="openEdit(i.id)" title="Edit" aria-label="Edit" class="mr-2 cursor-pointer rounded border-none bg-transparent p-1 text-muted"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button title="Hapus" aria-label="Hapus" class="cursor-pointer rounded border-none bg-transparent p-1 text-muted" @click="handleDelete(i.id,i.name)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button></td></tr>
    <AdminTableState :colspan="3" :loading="loading" :failed="failed" :empty="!items.length" empty-text="Belum ada industri." @retry="refresh()" /></tbody></table></div>

    <div v-if="totalPages>1" class="mt-5 flex items-center justify-center gap-2.5"><button :disabled="page<=1" @click="goTo(page-1)" class="cursor-pointer rounded-md border border-line bg-white px-4 py-2 text-xs font-sans text-muted">Prev</button><span class="text-xs text-muted">{{ page }} / {{ totalPages }} ({{ total }})</span><button :disabled="page>=totalPages" @click="goTo(page+1)" class="cursor-pointer rounded-md border border-line bg-white px-4 py-2 text-xs font-sans text-muted">Next</button></div>

    <ModalForm :open="modalOpen" :title="modalTitle" @close="modalOpen=false">
      <div v-if="error" class="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">{{ error }}</div>
      <form class="flex flex-col gap-[18px]" @submit.prevent="save">
        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Nama</span><input v-model="form.name" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /><span v-if="fieldErrors.name" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.name }}</span></label>
        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Deskripsi</span><textarea v-model="form.description" rows="3" class="mt-1.5 block w-full resize-y rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /></label>
        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Gambar</span><input type="file" :accept="IMAGE_ACCEPT" @change="onFileChange" class="mt-1.5 block w-full text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-accent file:px-3.5 file:py-2 file:text-[13px] file:font-semibold file:text-white" /><img v-if="imagePreview" :src="imagePreview" alt="Pratinjau gambar yang dipilih" class="mt-2 h-[120px] rounded border border-line object-cover" /><span v-if="uploadError" class="mt-1 block text-[11px] text-red-600">{{ uploadError }}</span></label>
        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Product Slugs (pisahkan koma)</span><input v-model="form.productSlugs" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /></label>
        <button type="submit" :disabled="saving" class="mt-2 cursor-pointer rounded-md border-none bg-accent px-6 py-3 text-sm font-semibold tracking-[0.01em] text-white">{{ saving?'Menyimpan...':'Simpan' }}</button>
      </form>
    </ModalForm>
  </div>
</template>
