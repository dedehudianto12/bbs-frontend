<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { industrySchema } from '~/utils/validation'
const route = useRoute(); const router = useRouter(); const { get, post, put } = useAdminApi()
const isEdit = computed(() => route.params.id !== 'baru')
const form = reactive({ name:'',slug:'',description:'',image:'',productSlugs:'' })
const saving = ref(false); const error = ref(''); const fieldErrors = ref<Record<string,string>>({})
if(isEdit.value){const{data:res}=await useAsyncData(`admin-industri-${route.params.id}`,()=>get<any>(`/admin/industri/${route.params.id}`));if(res.value?.data){const i=res.value.data;Object.assign(form,{name:i.name,slug:i.slug,description:i.description,image:i.image??'',productSlugs:(i.productSlugs??[]).join(', ')})}}
async function save(){saving.value=true;error.value='';fieldErrors.value={};try{const data=industrySchema.parse({...form,image:form.image||null});const body={...data,productSlugs:data.productSlugs.split(',').map((s:string)=>s.trim()).filter(Boolean)};if(isEdit.value)await put(`/admin/industri/${route.params.id}`,body);else await post('/admin/industri',body);router.push('/admin/industri')}catch(e:any){if(e?.issues){for(const i of e.issues)fieldErrors.value[i.path[0]as string]=i.message;error.value='Mohon perbaiki error di bawah.'}else error.value=e?.data?.error||'Gagal menyimpan.'}finally{saving.value=false}}
function generateSlug(){form.slug=form.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}
const L='font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em'; const I='display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:inherit;box-sizing:border-box;outline:none'
</script>
<template>
  <div style="max-width:680px">
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:28px"><NuxtLink to="/admin/industri" style="font-size:13px;color:rgb(var(--muted));text-decoration:none">&larr; Kembali</NuxtLink><h1 style="font-size:24px;font-weight:700;color:rgb(var(--ink));margin:0;letter-spacing:-0.02em">{{ isEdit?'Edit Industri':'Industri Baru' }}</h1></div>
    <div v-if="error" style="background:#fef2f2;color:#dc2626;padding:12px 16px;border-radius:8px;font-size:13px;margin-bottom:20px;border:1px solid #fecaca">{{ error }}</div>
    <div style="background:#fff;border:1px solid rgb(var(--line));border-radius:10px;padding:28px"><form style="display:flex;flex-direction:column;gap:18px" @submit.prevent="save">
      <label style="display:block"><span :style="L">Nama</span><input v-model="form.name" @blur="!isEdit&&!form.slug&&generateSlug()" :style="I" /><span v-if="fieldErrors.name" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.name }}</span></label>
      <label style="display:block"><span :style="L">Slug</span><input v-model="form.slug" :style="[I,'font-family:monospace']" /><span v-if="fieldErrors.slug" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.slug }}</span></label>
      <label style="display:block"><span :style="L">Deskripsi</span><textarea v-model="form.description" rows="3" :style="[I,'resize:vertical']" /></label>
      <label style="display:block"><span :style="L">URL Gambar</span><input v-model="form.image" :style="I" /></label>
      <label style="display:block"><span :style="L">Product Slugs (pisahkan koma)</span><input v-model="form.productSlugs" :style="I" /></label>
      <button type="submit" :disabled="saving" style="padding:12px 24px;background:rgb(var(--accent));color:#fff;border:none;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:0.01em;margin-top:8px">{{ saving?'Menyimpan...':'Simpan' }}</button>
    </form></div>
  </div>
</template>
