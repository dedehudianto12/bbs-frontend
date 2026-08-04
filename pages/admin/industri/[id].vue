<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { IMAGE_ACCEPT } from '~/composables/useImageUpload'
import { industrySchema } from '~/utils/validation'
const route = useRoute(); const router = useRouter(); const { get, post, put } = useAdminApi()
const toast = useToast()
const { imageFile, imagePreview, existingUrl, error: uploadError, onFileChange, reset } = useImageUpload()
const isEdit = computed(() => route.params.id !== 'baru')
const form = reactive({ name:'',slug:'',description:'',productSlugs:'' })
const saving = ref(false); const error = ref(''); const fieldErrors = ref<Record<string,string>>({})

if(isEdit.value){const{data:res}=await useAsyncData(`admin-industri-${route.params.id}`,()=>get<any>(`/admin/industri/${route.params.id}`),{server:false});if(res.value?.data){const i=res.value.data;Object.assign(form,{name:i.name,slug:i.slug,description:i.description,productSlugs:(i.productSlugs??[]).join(', ')});reset(i.image??'')}}

async function save(){
  saving.value=true;error.value='';fieldErrors.value={}
  try{
    industrySchema.parse({...form,image:existingUrl.value||null})
    const fd = new FormData()
    fd.append('name',form.name);fd.append('description',form.description)
    fd.append('productSlugs',form.productSlugs)
    if(imageFile.value) fd.append('file',imageFile.value)
    if(isEdit.value)await put(`/admin/industri/${route.params.id}`,fd);else await post('/admin/industri',fd)
    toast.success(isEdit.value ? 'Industri berhasil diperbarui' : 'Industri berhasil ditambahkan')
    router.push('/admin/industri')
  }catch(e:any){if(e?.issues){for(const i of e.issues)fieldErrors.value[i.path[0]as string]=i.message;error.value='Mohon perbaiki error di bawah.'}else error.value=e?.data?.error||'Gagal menyimpan.'}finally{saving.value=false}
}
function generateSlug(){form.slug=form.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}
</script>

<template>
  <div class="max-w-[680px]">
    <div class="mb-7 flex items-center gap-4"><NuxtLink to="/admin/industri" class="text-[13px] text-muted no-underline">&larr; Kembali</NuxtLink><h1 class="m-0 text-2xl font-bold tracking-[-0.02em] text-ink">{{ isEdit?'Edit Industri':'Industri Baru' }}</h1></div>
    <div v-if="error" class="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">{{ error }}</div>
    <div class="rounded-[10px] border border-line bg-white p-7"><form class="flex flex-col gap-[18px]" @submit.prevent="save">
      <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Nama</span><input v-model="form.name" @blur="!isEdit&&!form.slug&&generateSlug()" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /><span v-if="fieldErrors.name" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.name }}</span></label>
      <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Slug</span><input v-model="form.slug" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 font-mono text-sm outline-none box-border" /><span v-if="fieldErrors.slug" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.slug }}</span></label>
      <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Deskripsi</span><textarea v-model="form.description" rows="3" class="mt-1.5 block w-full resize-y rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /></label>
      <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Gambar</span><input type="file" :accept="IMAGE_ACCEPT" @change="onFileChange" class="mt-1.5 block w-full text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-accent file:px-3.5 file:py-2 file:text-[13px] file:font-semibold file:text-white" /><img v-if="imagePreview" :src="imagePreview" alt="Pratinjau gambar yang dipilih" class="mt-2 h-[120px] rounded border border-line object-cover" /><span v-if="uploadError" class="mt-1 block text-[11px] text-red-600">{{ uploadError }}</span></label>
      <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Product Slugs (pisahkan koma)</span><input v-model="form.productSlugs" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /></label>
      <button type="submit" :disabled="saving" class="mt-2 cursor-pointer rounded-md border-none bg-accent px-6 py-3 text-sm font-semibold tracking-[0.01em] text-white">{{ saving?'Menyimpan...':'Simpan' }}</button>
    </form></div>
  </div>
</template>
