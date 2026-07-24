<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { serviceSchema } from '~/utils/validation'
const route = useRoute(); const router = useRouter(); const { get, post, put } = useAdminApi()
const isEdit = computed(() => route.params.id !== 'baru')
const form = reactive({ name:'',slug:'',shortDescription:'',fullDescription:'' })
const saving = ref(false); const error = ref(''); const fieldErrors = ref<Record<string,string>>({})
if(isEdit.value){const{data:res}=await useAsyncData(`admin-jasa-${route.params.id}`,()=>get<any>(`/admin/jasa/${route.params.id}`));if(res.value?.data){const s=res.value.data;Object.assign(form,{name:s.name,slug:s.slug,shortDescription:s.shortDescription,fullDescription:s.fullDescription??''})}}
async function save(){saving.value=true;error.value='';fieldErrors.value={};try{const data=serviceSchema.parse(form);if(isEdit.value)await put(`/admin/jasa/${route.params.id}`,{...data,images:[]});else await post('/admin/jasa',{...data,images:[]});router.push('/admin/jasa')}catch(e:any){if(e?.issues){for(const i of e.issues)fieldErrors.value[i.path[0]as string]=i.message;error.value='Mohon perbaiki error di bawah.'}else error.value=e?.data?.error||'Gagal menyimpan.'}finally{saving.value=false}}
function generateSlug(){form.slug=form.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}
const L='font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em'
const I='display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:inherit;box-sizing:border-box;outline:none'
</script>
<template>
  <div style="max-width:680px">
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:28px"><NuxtLink to="/admin/jasa" style="font-size:13px;color:rgb(var(--muted));text-decoration:none">&larr; Kembali</NuxtLink><h1 style="font-size:24px;font-weight:700;color:rgb(var(--ink));margin:0;letter-spacing:-0.02em">{{ isEdit?'Edit Jasa':'Jasa Baru' }}</h1></div>
    <div v-if="error" style="background:#fef2f2;color:#dc2626;padding:12px 16px;border-radius:8px;font-size:13px;margin-bottom:20px;border:1px solid #fecaca">{{ error }}</div>
    <div style="background:#fff;border:1px solid rgb(var(--line));border-radius:10px;padding:28px"><form style="display:flex;flex-direction:column;gap:18px" @submit.prevent="save">
      <label style="display:block"><span :style="L">Nama</span><input v-model="form.name" @blur="!isEdit&&!form.slug&&generateSlug()" :style="I" /><span v-if="fieldErrors.name" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.name }}</span></label>
      <label style="display:block"><span :style="L">Slug</span><input v-model="form.slug" :style="[I,'font-family:monospace']" /><span v-if="fieldErrors.slug" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.slug }}</span></label>
      <label style="display:block"><span :style="L">Deskripsi Singkat</span><textarea v-model="form.shortDescription" rows="2" :style="[I,'resize:vertical']" /><span v-if="fieldErrors.shortDescription" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.shortDescription }}</span></label>
      <label style="display:block"><span :style="L">Deskripsi Lengkap (HTML)</span><textarea v-model="form.fullDescription" rows="6" :style="[I,'font-family:monospace;resize:vertical']" /></label>
      <button type="submit" :disabled="saving" style="padding:12px 24px;background:rgb(var(--accent));color:#fff;border:none;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:0.01em;margin-top:8px">{{ saving?'Menyimpan...':'Simpan' }}</button>
    </form></div>
  </div>
</template>
