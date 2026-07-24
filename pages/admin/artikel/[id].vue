<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { articleSchema } from '~/utils/validation'
const route = useRoute(); const router = useRouter(); const { get, post, put } = useAdminApi()
const isEdit = computed(() => route.params.id !== 'baru')
const form = reactive({ title:'',excerpt:'',content:'',tag:'',image:'',author:'',publishedAt:new Date().toISOString().slice(0,10) })
const saving = ref(false); const error = ref(''); const fieldErrors = ref<Record<string,string>>({})
if(isEdit.value){const{data:res}=await useAsyncData(`admin-artikel-${route.params.id}`,()=>get<any>(`/admin/artikel/${route.params.id}`));if(res.value?.data){const a=res.value.data;Object.assign(form,{title:a.title,excerpt:a.excerpt,content:a.content??'',tag:a.tag??'',image:a.image??'',author:a.author,publishedAt:a.publishedAt})}}
async function save(){saving.value=true;error.value='';fieldErrors.value={};try{const data=articleSchema.parse({...form,image:form.image||null});if(isEdit.value)await put(`/admin/artikel/${route.params.id}`,data);else await post('/admin/artikel',data);router.push('/admin/artikel')}catch(e:any){if(e?.issues){for(const i of e.issues)fieldErrors.value[i.path[0]as string]=i.message;error.value='Mohon perbaiki error di bawah.'}else error.value=e?.data?.error||'Gagal menyimpan.'}finally{saving.value=false}}
const L='font-size:11px;font-weight:600;color:rgb(var(--muted));text-transform:uppercase;letter-spacing:0.08em'
const I='display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:inherit;box-sizing:border-box;outline:none'
</script>

<template>
  <div style="max-width:680px">
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:28px"><NuxtLink to="/admin/artikel" style="font-size:13px;color:rgb(var(--muted));text-decoration:none">&larr; Kembali</NuxtLink><h1 style="font-size:24px;font-weight:700;color:rgb(var(--ink));margin:0;letter-spacing:-0.02em">{{ isEdit?'Edit Artikel':'Artikel Baru' }}</h1></div>
    <div v-if="error" style="background:#fef2f2;color:#dc2626;padding:12px 16px;border-radius:8px;font-size:13px;margin-bottom:20px;border:1px solid #fecaca">{{ error }}</div>
    <div style="background:#fff;border:1px solid rgb(var(--line));border-radius:10px;padding:28px"><form style="display:flex;flex-direction:column;gap:18px" @submit.prevent="save">
      <label style="display:block"><span :style="L">Judul</span><input v-model="form.title" :style="I" /><span v-if="fieldErrors.title" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.title }}</span></label>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <label style="display:block"><span :style="L">Author</span><input v-model="form.author" :style="I" /><span v-if="fieldErrors.author" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.author }}</span></label>
        <label style="display:block"><span :style="L">Tag</span><input v-model="form.tag" :style="I" /></label>
      </div>
      <label style="display:block"><span :style="L">Tanggal Publikasi</span><input v-model="form.publishedAt" type="date" :style="I" /><span v-if="fieldErrors.publishedAt" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.publishedAt }}</span></label>
      <label style="display:block"><span :style="L">Excerpt</span><textarea v-model="form.excerpt" rows="2" :style="[I,'resize:vertical']" /><span v-if="fieldErrors.excerpt" style="font-size:11px;color:#dc2626;margin-top:4px;display:block">{{ fieldErrors.excerpt }}</span></label>
      <label style="display:block"><span :style="L">Konten</span><TiptapEditor v-model="form.content" /></label>
      <label style="display:block"><span :style="L">URL Gambar</span><input v-model="form.image" :style="I" /></label>
      <button type="submit" :disabled="saving" style="padding:12px 24px;background:rgb(var(--accent));color:#fff;border:none;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:0.01em;margin-top:8px">{{ saving?'Menyimpan...':'Simpan' }}</button>
    </form></div>
  </div>
</template>
