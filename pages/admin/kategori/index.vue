<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
const { get, put, post, del } = useAdminApi()
const { data: res, refresh, status, error: fetchErr } = await useAsyncData('admin-kategori', () => get<any[]>('/admin/kategori'), { server: false })
const items = computed(() => res.value?.data ?? [])

// Distinguishes "no categories yet" from "the request failed" — the single
// fallback row used to say the former in both cases.
const loading = computed(() => status.value === 'pending')
const failed = computed(() => !!fetchErr.value || res.value?.error != null)
const editing = ref<string|null>(null); const editLabel = ref(''); const saving = ref(false)
function startEdit(slug:string,label:string){editing.value=slug;editLabel.value=label}
function cancelEdit(){editing.value=null;editLabel.value=''}
const { open: confirm } = useConfirm()
const toast = useToast()
async function saveLabel(slug:string){saving.value=true;try{await put(`/admin/kategori/${slug}`,{label:editLabel.value});editing.value=null;refresh();toast.success('Label kategori berhasil diperbarui')}catch{toast.error('Gagal memperbarui label')}finally{saving.value=false}}
const showCreate = ref(false); const newCat = reactive({slug:'',label:'',group:'belt-conveyor'}); const createError = ref('')
async function createCategory(){createError.value='';try{await post('/admin/kategori',{...newCat});showCreate.value=false;newCat.slug='';newCat.label='';newCat.group='belt-conveyor';refresh();toast.success(`Kategori "${newCat.label}" berhasil ditambahkan`)}catch(e:any){createError.value=e?.data?.error||'Gagal membuat.'}}
async function handleDelete(slug:string,label:string){if(!await confirm({title:`Hapus "${label}"?`,message:'Kategori yang dihapus tidak dapat dikembalikan.'}))return;try{await del(`/admin/kategori/${slug}`);toast.success(`"${label}" berhasil dihapus`);refresh()}catch{toast.error('Gagal menghapus kategori')}}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="m-0 text-2xl font-bold tracking-[-0.02em] text-ink">Kategori Produk</h1>
      <button @click="showCreate=!showCreate" class="cursor-pointer rounded-md border-none bg-accent px-5 py-2.5 text-[13px] font-semibold tracking-[0.01em] text-white">{{ showCreate?'Batal':'+ Kategori Baru' }}</button>
    </div>

    <div v-if="showCreate" class="mb-5 rounded-[10px] border border-line bg-white p-5">
      <div v-if="createError" class="mb-3.5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">{{ createError }}</div>
      <div class="flex items-end gap-3">
        <label class="block flex-1"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Slug</span><input v-model="newCat.slug" placeholder="e.g. rubber-belt" class="mt-1 block w-full rounded-md border border-line px-3 py-2 text-[13px] font-sans outline-none box-border" /></label>
        <label class="block flex-1"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Label</span><input v-model="newCat.label" placeholder="e.g. Rubber Belt" class="mt-1 block w-full rounded-md border border-line px-3 py-2 text-[13px] font-sans outline-none box-border" /></label>
        <label class="block w-[150px]"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Group</span><select v-model="newCat.group" class="mt-1 block w-full rounded-md border border-line bg-white px-3 py-2 text-[13px] font-sans outline-none box-border"><option value="belt-conveyor">Belt Conveyor</option><option value="lainnya">Lainnya</option></select></label>
        <button @click="createCategory" class="cursor-pointer whitespace-nowrap rounded-md border-none bg-accent px-5 py-[9px] text-[13px] font-semibold text-white">Simpan</button>
      </div>
    </div>

    <div class="overflow-x-auto rounded-lg border border-line bg-white">
      <table class="table-admin">
        <thead><tr><th>Slug</th><th>Label</th><th>Group</th><th>Aksi</th></tr></thead>
        <tbody>
          <tr v-for="c in items" :key="c.slug">
            <td class="font-mono text-xs text-muted">{{ c.slug }}</td>
            <td>
              <input v-if="editing===c.slug" v-model="editLabel" @keyup.enter="saveLabel(c.slug)" @keyup.escape="cancelEdit()" class="w-full rounded border border-line px-2.5 py-1.5 text-[13px] font-sans outline-none box-border" />
              <span v-else class="font-semibold text-ink">{{ c.label }}</span>
            </td>
            <td class="text-muted">{{ c.group }}</td>
            <td>
              <template v-if="editing===c.slug">
                <button :disabled="saving" @click="saveLabel(c.slug)" class="mr-2.5 cursor-pointer border-none bg-transparent text-xs font-semibold text-accent">Simpan</button>
                <button @click="cancelEdit()" class="cursor-pointer border-none bg-transparent text-xs text-muted">Batal</button>
              </template>
              <template v-else>
                <button @click="startEdit(c.slug,c.label)" title="Edit" aria-label="Edit" class="mr-1 cursor-pointer rounded border-none bg-transparent p-1 text-muted"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                <button @click="handleDelete(c.slug,c.label)" title="Hapus" aria-label="Hapus" class="cursor-pointer rounded border-none bg-transparent p-1 text-muted"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button>
              </template>
            </td>
          </tr>
          <AdminTableState :colspan="4" :loading="loading" :failed="failed" :empty="!items.length" empty-text="Belum ada kategori." @retry="refresh()" />
        </tbody>
      </table>
    </div>
  </div>
</template>
