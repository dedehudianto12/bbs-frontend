<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { gallerySchema } from '~/utils/validation'
const route = useRoute(); const router = useRouter(); const { get, post, put } = useAdminApi()
const isEdit = computed(() => route.params.id !== 'baru')
const form = reactive({ image:'',caption:'',location:'' })
const saving = ref(false); const error = ref(''); const fieldErrors = ref<Record<string,string>>({})
if(isEdit.value){const{data:res}=await useAsyncData(`admin-galeri-${route.params.id}`,()=>get<any>(`/admin/galeri/${route.params.id}`),{server:false});if(res.value?.data){const g=res.value.data;Object.assign(form,{image:g.image,caption:g.caption,location:g.location??''})}}
async function save(){saving.value=true;error.value='';fieldErrors.value={};try{const data=gallerySchema.parse({...form,location:form.location||null});if(isEdit.value)await put(`/admin/galeri/${route.params.id}`,data);else await post('/admin/galeri',data);router.push('/admin/galeri')}catch(e:any){if(e?.issues){for(const i of e.issues)fieldErrors.value[i.path[0]as string]=i.message;error.value='Mohon perbaiki error di bawah.'}else error.value=e?.data?.error||'Gagal menyimpan.'}finally{saving.value=false}}
</script>
<template>
  <div class="max-w-[680px]">
    <div class="mb-7 flex items-center gap-4"><NuxtLink to="/admin/galeri" class="text-[13px] text-muted no-underline">&larr; Kembali</NuxtLink><h1 class="m-0 text-2xl font-bold tracking-[-0.02em] text-ink">{{ isEdit?'Edit Galeri':'Galeri Baru' }}</h1></div>
    <div v-if="error" class="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">{{ error }}</div>
    <div class="rounded-[10px] border border-line bg-white p-7"><form class="flex flex-col gap-[18px]" @submit.prevent="save">
      <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Gambar</span><ImageUpload v-model="form.image" folder="galeri" class="mt-1.5 block" /><span v-if="fieldErrors.image" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.image }}</span></label>
      <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Caption</span><input v-model="form.caption" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /><span v-if="fieldErrors.caption" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.caption }}</span></label>
      <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Lokasi</span><input v-model="form.location" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /></label>
      <button type="submit" :disabled="saving" class="mt-2 cursor-pointer rounded-md border-none bg-accent px-6 py-3 text-sm font-semibold tracking-[0.01em] text-white">{{ saving?'Menyimpan...':'Simpan' }}</button>
    </form></div>
  </div>
</template>
