<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { IMAGE_ACCEPT } from '~/composables/useImageUpload'
import { productSchema } from '~/utils/validation'
import { watchDebounced } from '@vueuse/core'
import { sanitizeHtml } from '~/utils/richtext'
import { timeAgo, formatDateTime } from '~/utils/date'
const { get, del, post, put } = useAdminApi()
const { imageFile, imagePreview, existingUrl, error: uploadError, onFileChange, reset } = useImageUpload()

const { data: catRes } = await useAsyncData('admin-cats', () => get<any[]>('/admin/kategori'), { server: false })
const allCategories = computed(() => (catRes.value?.data ?? []) as { slug:string; label:string; group:string }[])

const search = ref(''); const filterGroup = ref(''); const sort = ref('desc'); const sortBy = ref<'created'|'updated'>('created'); const page = ref(1); const limit = 10
const params = computed(() => { const p = new URLSearchParams({ page: String(page.value), limit: String(limit), sort: sort.value, sortBy: sortBy.value }); if (search.value) p.set('search', search.value); if (filterGroup.value) p.set('group', filterGroup.value); return p.toString() })
const { data: res, refresh, status, error: fetchErr } = await useAsyncData('admin-produk', () => get<any>(`/admin/produk?${params.value}`), { server: false })

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
watch([filterGroup, sort, sortBy, page], () => refresh())

const loading = computed(() => status.value === 'pending')
const failed = computed(() => !!fetchErr.value || res.value?.error != null)
const items = computed(() => res.value?.data?.items ?? []); const total = computed(() => res.value?.data?.total ?? 0); const totalPages = computed(() => Math.ceil(total.value / limit))
function goTo(p: number) { page.value = Math.max(1, Math.min(p, totalPages.value)) }
function toggleSort() { sort.value = sort.value === 'desc' ? 'asc' : 'desc'; page.value = 1 }
// Direction labels read differently per field: newest-first on "dibuat" is
// "Terbaru", on "diubah" it is "Terakhir diubah".
const sortLabel = computed(() => sortBy.value === 'updated'
  ? (sort.value === 'desc' ? '↓ Terakhir diubah' : '↑ Terlama diubah')
  : (sort.value === 'desc' ? '↓ Terbaru' : '↑ Terlama'))
const { open: confirm } = useConfirm()
const toast = useToast()
async function handleDelete(id: string, name: string) { if (!await confirm({ title: `Hapus "${name}"?`, message: 'Produk yang dihapus tidak dapat dikembalikan.' })) return; try { await del(`/admin/produk/${id}`); toast.success(`"${name}" berhasil dihapus`); refresh() } catch { toast.error('Gagal menghapus produk') } }

const modalOpen = ref(false); const modalTitle = ref(''); const editId = ref<string|null>(null)
const form = reactive({ name:'',group:'belt-conveyor',kategori:'',description:'',detail:'',specs:'{}' })
// The live preview is sanitised with exactly the same allow-list the public
// pages use, so what the editor shows here is what a visitor will actually
// get — a preview that renders markup the site then strips is a lie.
const detailPreview = computed(() => sanitizeHtml(form.detail || ''))
const saving = ref(false); const error = ref(''); const fieldErrors = ref<Record<string,string>>({})

const categoryOptions = computed(() => allCategories.value.filter(c => c.group === form.group))

const specsPreview = computed<Record<string, string>>(() => {
  try { const obj = JSON.parse(form.specs); if (obj && typeof obj === 'object' && !Array.isArray(obj)) return obj } catch {}
  return {}
})

function openCreate(){modalTitle.value='Produk Baru';editId.value=null;Object.assign(form,{name:'',group:'belt-conveyor',kategori:'',description:'',detail:'',specs:'{}'});reset();fieldErrors.value={};error.value='';modalOpen.value=true}
async function openEdit(id: string){const r=await get<any>(`/admin/produk/${id}`);if(r?.data){const p=r.data;editId.value=id;modalTitle.value='Edit Produk';Object.assign(form,{name:p.name,group:p.group,kategori:p.kategori,description:p.description,detail:p.detail??'',specs:typeof p.specs==='string'?p.specs:JSON.stringify(p.specs,null,2)});reset(p.image??'');fieldErrors.value={};error.value='';modalOpen.value=true}}
async function save(){
  saving.value=true;error.value='';fieldErrors.value={}
  try{
    const cat = allCategories.value.find(c => c.slug === form.kategori)
    productSchema.parse({...form, image: existingUrl.value || null})
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('group', form.group)
    fd.append('kategori', form.kategori)
    fd.append('category', cat?.label ?? form.kategori)
    if(form.description) fd.append('description', form.description)
    if(form.detail) fd.append('detail', form.detail)
    fd.append('specs', form.specs)
    if(imageFile.value) fd.append('file', imageFile.value)
    if(editId.value)await put(`/admin/produk/${editId.value}`,fd);else await post('/admin/produk',fd)
    modalOpen.value=false;refresh()
    toast.success(editId.value ? 'Produk berhasil diperbarui' : 'Produk berhasil ditambahkan')
  }catch(e:any){if(e?.issues){for(const i of e.issues)fieldErrors.value[i.path[0]as string]=i.message;error.value='Mohon perbaiki error di bawah.'}else{error.value=e?.data?.error||e?.message||'Gagal menyimpan.'}}finally{saving.value=false}
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <h1 class="m-0 text-2xl font-bold tracking-[-0.02em] text-ink">Produk</h1>
      <button @click="openCreate" class="cursor-pointer rounded-md border-none bg-accent px-5 py-2.5 text-[13px] font-semibold tracking-[0.01em] text-white">+ Produk Baru</button>
    </div>

    <!-- Filters -->
    <div class="mb-4 flex gap-2.5">
      <input v-model="search" placeholder="Cari nama..." @keyup.enter="page=1" class="flex-1 rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] font-sans outline-none" />
      <select v-model="filterGroup" @change="page=1" class="rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] font-sans outline-none"><option value="">Semua Group</option><option value="belt-conveyor">Belt Conveyor</option><option value="lainnya">Lainnya</option></select>
      <select v-model="sortBy" @change="page=1" class="rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] font-sans outline-none"><option value="created">Tgl Dibuat</option><option value="updated">Tgl Diubah</option></select>
      <button @click="toggleSort" class="cursor-pointer whitespace-nowrap rounded-md border border-line bg-white px-3.5 py-2.5 text-[13px] font-sans text-muted">{{ sortLabel }}</button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-lg border border-line bg-white">
      <table class="table-admin">
        <thead><tr><th>Nama</th><th>Group</th><th>Category</th><th>Terakhir Diubah</th><th>Aksi</th></tr></thead>
        <tbody>
          <tr v-for="p in items" :key="p.id">
            <td class="font-semibold text-ink">{{ p.name }}</td>
            <td class="text-muted">{{ p.group }}</td>
            <td class="text-muted">{{ p.category }}</td>
            <td class="whitespace-nowrap text-muted" :title="formatDateTime(p.updatedAt)">{{ timeAgo(p.updatedAt) }}</td>
            <td>
              <button @click="openEdit(p.id)" title="Edit" aria-label="Edit" class="mr-2 cursor-pointer rounded border-none bg-transparent p-1 text-muted"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
              <button title="Hapus" aria-label="Hapus" class="cursor-pointer rounded border-none bg-transparent p-1 text-muted" @click="handleDelete(p.id,p.name)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button>
            </td>
          </tr>
          <AdminTableState :colspan="5" :loading="loading" :failed="failed" :empty="!items.length" empty-text="Belum ada produk." @retry="refresh()" />
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages>1" class="mt-5 flex items-center justify-center gap-2.5">
      <button :disabled="page<=1" @click="goTo(page-1)" class="cursor-pointer rounded-md border border-line bg-white px-4 py-2 text-xs font-sans text-muted">Prev</button>
      <span class="text-xs text-muted">{{ page }} / {{ totalPages }} ({{ total }})</span>
      <button :disabled="page>=totalPages" @click="goTo(page+1)" class="cursor-pointer rounded-md border border-line bg-white px-4 py-2 text-xs font-sans text-muted">Next</button>
    </div>

    <!-- Modal -->
    <ModalForm :open="modalOpen" :title="modalTitle" wide @close="modalOpen=false">
      <div v-if="error" class="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">{{ error }}</div>
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Left: Form -->
        <div class="min-w-0">
          <form class="flex flex-col gap-[18px]" @submit.prevent="save">
        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Nama</span><input v-model="form.name" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /><span v-if="fieldErrors.name" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.name }}</span></label>
        <div class="grid grid-cols-2 gap-3.5">
          <label class="block">
            <span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Group</span>
            <select v-model="form.group" @change="form.kategori=''" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border">
              <option value="belt-conveyor">Belt Conveyor</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </label>
          <label class="block">
            <span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Kategori</span>
            <select v-model="form.kategori" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border">
              <option value="">— Pilih —</option>
              <option v-for="c in categoryOptions" :key="c.slug" :value="c.slug">{{ c.label }}</option>
            </select>
            <span v-if="fieldErrors.kategori" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.kategori }}</span>
          </label>
        </div>
        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Deskripsi Singkat</span><textarea v-model="form.description" rows="2" class="mt-1.5 block w-full resize-y rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /></label>
        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Detail</span><TiptapEditor v-model="form.detail" /></label>
        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Gambar</span><input type="file" :accept="IMAGE_ACCEPT" @change="onFileChange" class="mt-1.5 block w-full text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-accent file:px-3.5 file:py-2 file:text-[13px] file:font-semibold file:text-white" /><img v-if="imagePreview" :src="imagePreview" alt="Pratinjau gambar yang dipilih" class="mt-2 h-[120px] rounded border border-line object-cover" /><span v-if="uploadError" class="mt-1 block text-[11px] text-red-600">{{ uploadError }}</span></label>
        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Spesifikasi Teknis</span><SpecsEditor v-model="form.specs" class="mt-1.5" /></label>
        <button type="submit" :disabled="saving" class="mt-2 cursor-pointer rounded-md border-none bg-accent px-6 py-3 text-sm font-semibold tracking-[0.01em] text-white">{{ saving?'Menyimpan...':'Simpan' }}</button>
      </form>
        </div>

        <!-- Right: Preview -->
        <div class="hidden min-w-0 lg:block">
          <div class="rounded-[10px] border border-line bg-white">
            <div class="border-b border-line px-4 py-2.5">
              <p class="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted/60">Pratinjau Produk</p>
            </div>
            <div class="p-5">
              <!-- Product image -->
              <div v-if="imagePreview || existingUrl" class="mb-4 overflow-hidden rounded-lg border border-line">
                <img :src="imagePreview || existingUrl" class="aspect-[2/1] w-full object-cover" alt="" />
              </div>

              <!-- Name -->
              <h3 class="text-base font-bold leading-snug text-ink" :class="{ 'text-muted/40': !form.name }">
                {{ form.name || 'Nama produk...' }}
              </h3>

              <!-- Description -->
              <p v-if="form.description" class="mt-2 text-[13px] leading-relaxed text-muted">{{ form.description }}</p>

              <!-- Specs table -->
              <div v-if="Object.keys(specsPreview).length" class="mt-4">
                <div class="overflow-hidden rounded-lg border border-line">
                  <table class="w-full text-[12px]">
                    <tbody>
                      <tr v-for="(value, key) in specsPreview" :key="key" class="border-b border-line last:border-b-0">
                        <td class="w-[40%] bg-paper-soft px-3 py-2 font-medium text-ink">{{ key }}</td>
                        <td class="px-3 py-2 text-muted">{{ value }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Detail content -->
              <div v-if="form.detail" class="prose-tech mt-4">
                <div v-html="detailPreview" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalForm>
  </div>
</template>
