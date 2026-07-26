<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { productSchema } from '~/utils/validation'
const route = useRoute(); const router = useRouter(); const { get, post, put } = useAdminApi()
const isEdit = computed(() => route.params.id !== 'baru')
const form = reactive({ name:'',slug:'',group:'belt-conveyor',kategori:'',category:'',description:'',detail:'',image:'',specs:'{}' })
const saving = ref(false); const error = ref(''); const fieldErrors = ref<Record<string,string>>({})
if(isEdit.value){const{data:res}=await useAsyncData(`admin-produk-${route.params.id}`,()=>get<any>(`/admin/produk/${route.params.id}`),{server:false});if(res.value?.data){const p=res.value.data;Object.assign(form,{name:p.name,slug:p.slug,group:p.group,kategori:p.kategori,category:p.category,description:p.description,detail:p.detail??'',image:p.image??'',specs:typeof p.specs==='string'?p.specs:JSON.stringify(p.specs,null,2)})}}
async function save(){saving.value=true;error.value='';fieldErrors.value={};try{const data=productSchema.parse({...form,image:form.image||null});if(isEdit.value)await put(`/admin/produk/${route.params.id}`,data);else await post('/admin/produk',data);router.push('/admin/produk')}catch(e:any){if(e?.issues){for(const i of e.issues)fieldErrors.value[i.path[0]as string]=i.message;error.value='Mohon perbaiki error di bawah.'}else error.value=e?.data?.error||'Gagal menyimpan.'}finally{saving.value=false}}
function generateSlug(){form.slug=form.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}
</script>

<template>
  <div class="max-w-[680px]">
    <div class="mb-7 flex items-center gap-4">
      <NuxtLink to="/admin/produk" class="text-[13px] text-muted no-underline">&larr; Kembali</NuxtLink>
      <h1 class="m-0 text-2xl font-bold tracking-[-0.02em] text-ink">{{ isEdit?'Edit Produk':'Produk Baru' }}</h1>
    </div>

    <div v-if="error" class="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">{{ error }}</div>

    <div class="rounded-[10px] border border-line bg-white p-7">
      <form class="flex flex-col gap-[18px]" @submit.prevent="save">
        <label class="block">
          <span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Nama</span>
          <input v-model="form.name" @blur="!isEdit&&!form.slug&&generateSlug()" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" />
          <span v-if="fieldErrors.name" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.name }}</span>
        </label>

        <label class="block">
          <span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Slug</span>
          <input v-model="form.slug" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 font-mono text-sm outline-none box-border" />
          <span v-if="fieldErrors.slug" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.slug }}</span>
        </label>

        <div class="grid grid-cols-3 gap-3.5">
          <label class="block">
            <span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Group</span>
            <select v-model="form.group" class="mt-1.5 block w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm font-sans outline-none box-border"><option value="belt-conveyor">Belt Conveyor</option><option value="lainnya">Lainnya</option></select>
          </label>
          <label class="block">
            <span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Kategori</span>
            <input v-model="form.kategori" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" />
            <span v-if="fieldErrors.kategori" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.kategori }}</span>
          </label>
          <label class="block">
            <span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Category</span>
            <input v-model="form.category" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" />
            <span v-if="fieldErrors.category" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.category }}</span>
          </label>
        </div>

        <label class="block">
          <span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Deskripsi Singkat</span>
          <textarea v-model="form.description" rows="2" class="mt-1.5 block w-full resize-y rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" />
        </label>

        <label class="block">
          <span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Detail (HTML)</span>
          <textarea v-model="form.detail" rows="6" class="mt-1.5 block w-full resize-y rounded-md border border-line px-3.5 py-2.5 font-mono text-sm outline-none box-border" />
        </label>

        <label class="block">
          <span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Gambar</span>
          <ImageUpload v-model="form.image" folder="produk" class="mt-1.5 block" />
        </label>

        <label class="block">
          <span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Spesifikasi (JSON)</span>
          <textarea v-model="form.specs" rows="3" class="mt-1.5 block w-full resize-y rounded-md border border-line px-3.5 py-2.5 font-mono text-sm outline-none box-border" />
        </label>

        <button type="submit" :disabled="saving" class="mt-2 cursor-pointer rounded-md border-none bg-accent px-6 py-3 text-sm font-semibold tracking-[0.01em] text-white">
          {{ saving?'Menyimpan...':'Simpan' }}
        </button>
      </form>
    </div>
  </div>
</template>
