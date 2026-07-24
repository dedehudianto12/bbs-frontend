<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { productSchema } from '~/utils/validation'
const route = useRoute(); const router = useRouter(); const { get, post, put } = useAdminApi()
const isEdit = computed(() => route.params.id !== 'baru')
const form = reactive({ name:'',slug:'',group:'belt-conveyor',kategori:'',category:'',description:'',detail:'',image:'',specs:'{}' })
const saving = ref(false); const error = ref(''); const fieldErrors = ref<Record<string,string>>({})
if(isEdit.value){const{data:res}=await useAsyncData(`admin-produk-${route.params.id}`,()=>get<any>(`/admin/produk/${route.params.id}`));if(res.value?.data){const p=res.value.data;Object.assign(form,{name:p.name,slug:p.slug,group:p.group,kategori:p.kategori,category:p.category,description:p.description,detail:p.detail??'',image:p.image??'',specs:typeof p.specs==='string'?p.specs:JSON.stringify(p.specs,null,2)})}}
async function save(){saving.value=true;error.value='';fieldErrors.value={};try{const data=productSchema.parse({...form,image:form.image||null});if(isEdit.value)await put(`/admin/produk/${route.params.id}`,data);else await post('/admin/produk',data);router.push('/admin/produk')}catch(e:any){if(e?.issues){for(const i of e.issues)fieldErrors.value[i.path[0]as string]=i.message;error.value='Mohon perbaiki error di bawah.'}else error.value=e?.data?.error||'Gagal menyimpan.'}finally{saving.value=false}}
function generateSlug(){form.slug=form.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}
</script>

<template>
  <div style="max-width:680px">
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:28px">
      <NuxtLink to="/admin/produk" style="font-size:13px;color:rgb(var(--muted));text-decoration:none">&larr; Kembali</NuxtLink>
      <h1 style="font-size:24px;font-weight:700;color:rgb(var(--ink));margin:0;letter-spacing:-0.02em">{{ isEdit?'Edit Produk':'Produk Baru' }}</h1>
    </div>

    <div v-if="error" style="background:#fef2f2;color:#dc2626;padding:12px 16px;border-radius:8px;font-size:13px;margin-bottom:20px;border:1px solid #fecaca">{{ error }}</div>

    <div style="background:#fff;border:1px solid rgb(var(--line));border-radius:10px;padding:28px">
      <form style="display:flex;flex-direction:column;gap:18px" @submit.prevent="save">
        <label style="display:block">
          <span style="font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em">Nama</span>
          <input v-model="form.name" @blur="!isEdit&&!form.slug&&generateSlug()" style="display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:inherit;box-sizing:border-box;outline:none" />
          <span v-if="fieldErrors.name" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.name }}</span>
        </label>
        <label style="display:block">
          <span style="font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em">Slug</span>
          <input v-model="form.slug" style="display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:monospace;box-sizing:border-box;outline:none" />
          <span v-if="fieldErrors.slug" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.slug }}</span>
        </label>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px">
          <label style="display:block">
            <span style="font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em">Group</span>
            <select v-model="form.group" style="display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:inherit;background:#fff;box-sizing:border-box;outline:none"><option value="belt-conveyor">Belt Conveyor</option><option value="lainnya">Lainnya</option></select>
          </label>
          <label style="display:block">
            <span style="font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em">Kategori</span>
            <input v-model="form.kategori" style="display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:inherit;box-sizing:border-box;outline:none" />
            <span v-if="fieldErrors.kategori" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.kategori }}</span>
          </label>
          <label style="display:block">
            <span style="font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em">Category</span>
            <input v-model="form.category" style="display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:inherit;box-sizing:border-box;outline:none" />
            <span v-if="fieldErrors.category" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.category }}</span>
          </label>
        </div>
        <label style="display:block">
          <span style="font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em">Deskripsi Singkat</span>
          <textarea v-model="form.description" rows="2" style="display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:inherit;box-sizing:border-box;outline:none;resize:vertical" />
        </label>
        <label style="display:block">
          <span style="font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em">Detail (HTML)</span>
          <textarea v-model="form.detail" rows="6" style="display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:monospace;box-sizing:border-box;outline:none;resize:vertical" />
        </label>
        <label style="display:block">
          <span style="font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em">URL Gambar</span>
          <input v-model="form.image" style="display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:inherit;box-sizing:border-box;outline:none" />
        </label>
        <label style="display:block">
          <span style="font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em">Spesifikasi (JSON)</span>
          <textarea v-model="form.specs" rows="3" style="display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:monospace;box-sizing:border-box;outline:none;resize:vertical" />
        </label>
        <button type="submit" :disabled="saving" style="padding:12px 24px;background:rgb(var(--accent));color:#fff;border:none;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:0.01em;margin-top:8px">
          {{ saving?'Menyimpan...':'Simpan' }}
        </button>
      </form>
    </div>
  </div>
</template>
