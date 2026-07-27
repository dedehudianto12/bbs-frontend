<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { articleSchema } from '~/utils/validation'
const route = useRoute(); const router = useRouter(); const { get, post, put } = useAdminApi()
const { imageFile, imagePreview, existingUrl, onFileChange, reset } = useImageUpload()
const isEdit = computed(() => route.params.id !== 'baru')
const form = reactive({ title:'',excerpt:'',content:'',tag:'',author:'',publishedAt:new Date().toISOString().slice(0,10) })
const saving = ref(false); const error = ref(''); const fieldErrors = ref<Record<string,string>>({})

if(isEdit.value){const{data:res}=await useAsyncData(`admin-artikel-${route.params.id}`,()=>get<any>(`/admin/artikel/${route.params.id}`),{server:false});if(res.value?.data){const a=res.value.data;Object.assign(form,{title:a.title,excerpt:a.excerpt,content:a.content??'',tag:a.tag??'',author:a.author,publishedAt:a.publishedAt});reset(a.image??'')}}

async function save(){
  saving.value=true;error.value='';fieldErrors.value={}
  try{
    articleSchema.parse({...form,image:existingUrl.value||null})
    const fd = new FormData()
    fd.append('title',form.title);fd.append('excerpt',form.excerpt);fd.append('content',form.content)
    fd.append('tag',form.tag);fd.append('author',form.author);fd.append('publishedAt',form.publishedAt)
    if(imageFile.value) fd.append('file',imageFile.value)
    if(isEdit.value)await put(`/admin/artikel/${route.params.id}`,fd);else await post('/admin/artikel',fd)
    router.push('/admin/artikel')
  }catch(e:any){if(e?.issues){for(const i of e.issues)fieldErrors.value[i.path[0]as string]=i.message;error.value='Mohon perbaiki error di bawah.'}else error.value=e?.data?.error||'Gagal menyimpan.'}finally{saving.value=false}
}
</script>

<template>
  <div class="max-w-[680px]">
    <div class="mb-7 flex items-center gap-4">
      <NuxtLink to="/admin/artikel" class="text-[13px] text-muted no-underline">&larr; Kembali</NuxtLink>
      <h1 class="m-0 text-2xl font-bold tracking-[-0.02em] text-ink">{{ isEdit?'Edit Artikel':'Artikel Baru' }}</h1>
    </div>

    <div v-if="error" class="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">{{ error }}</div>

    <div class="rounded-[10px] border border-line bg-white p-7">
      <form class="flex flex-col gap-[18px]" @submit.prevent="save">
        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Judul</span><input v-model="form.title" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /><span v-if="fieldErrors.title" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.title }}</span></label>

        <div class="grid grid-cols-2 gap-3.5">
          <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Author</span><input v-model="form.author" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /><span v-if="fieldErrors.author" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.author }}</span></label>
          <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Tag</span><input v-model="form.tag" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /></label>
        </div>

        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Tanggal Publikasi</span><input v-model="form.publishedAt" type="date" class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /><span v-if="fieldErrors.publishedAt" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.publishedAt }}</span></label>

        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Excerpt</span><textarea v-model="form.excerpt" rows="2" class="mt-1.5 block w-full resize-y rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border" /><span v-if="fieldErrors.excerpt" class="mt-1 block text-[11px] text-red-600">{{ fieldErrors.excerpt }}</span></label>

        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Konten</span><TiptapEditor v-model="form.content" /></label>

        <label class="block"><span class="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Gambar</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" @change="onFileChange" class="mt-1.5 block w-full text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-accent file:px-3.5 file:py-2 file:text-[13px] file:font-semibold file:text-white" /><img v-if="imagePreview" :src="imagePreview" class="mt-2 h-[120px] rounded border border-line object-cover" /></label>

        <button type="submit" :disabled="saving" class="mt-2 cursor-pointer rounded-md border-none bg-accent px-6 py-3 text-sm font-semibold tracking-[0.01em] text-white">{{ saving?'Menyimpan...':'Simpan' }}</button>
      </form>
    </div>
  </div>
</template>
