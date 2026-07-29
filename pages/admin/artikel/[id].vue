<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { articleSchema } from '~/utils/validation'
const route = useRoute(); const router = useRouter(); const { get, post, put } = useAdminApi()
const toast = useToast()
const { imageFile, imagePreview, existingUrl, onFileChange, reset } = useImageUpload()
const isEdit = computed(() => route.params.id !== 'baru')
const form = reactive({ title:'',excerpt:'',content:'',tag:'',author:'',publishedAt:new Date().toISOString().slice(0,10) })
const saving = ref(false); const error = ref(''); const fieldErrors = ref<Record<string,string>>({}); const loading = ref(isEdit.value)

onMounted(async () => {
  if (!isEdit.value) return
  try {
    const res = await get<any>(`/admin/artikel/${route.params.id}`)
    if (res?.data) {
      const a = res.data
      Object.assign(form, {
        title: a.title,
        excerpt: a.excerpt || '',
        content: a.content ?? '',
        tag: a.tag ?? '',
        author: a.author || '',
        publishedAt: a.publishedAt || form.publishedAt,
      })
      if (a.image) reset(a.image)
    }
  } catch {
    error.value = 'Gagal memuat data artikel.'
  } finally {
    loading.value = false
  }
})

async function save(){
  saving.value=true;error.value='';fieldErrors.value={}
  try{
    articleSchema.parse({...form,image:existingUrl.value||null})
    const fd = new FormData()
    fd.append('title',form.title);fd.append('excerpt',form.excerpt);fd.append('content',form.content)
    fd.append('tag',form.tag);fd.append('author',form.author);fd.append('publishedAt',form.publishedAt)
    if(imageFile.value) fd.append('file',imageFile.value)
    if(isEdit.value)await put(`/admin/artikel/${route.params.id}`,fd);else await post('/admin/artikel',fd)
    toast.success(isEdit.value ? 'Artikel berhasil diperbarui' : 'Artikel berhasil ditambahkan')
    router.push('/admin/artikel')
  }catch(e:any){if(e?.issues){for(const i of e.issues)fieldErrors.value[i.path[0]as string]=i.message;error.value='Mohon perbaiki error di bawah.'}else error.value=e?.data?.error||'Gagal menyimpan.'}finally{saving.value=false}
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-9rem)] flex-col">
    <!-- Header -->
    <div class="mb-6 flex items-center gap-4">
      <NuxtLink to="/admin/artikel" class="text-[13px] text-muted no-underline">&larr; Kembali</NuxtLink>
      <h1 class="m-0 text-2xl font-bold tracking-[-0.02em] text-ink">{{ isEdit?'Edit Artikel':'Artikel Baru' }}</h1>
    </div>

    <div v-if="error" class="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">{{ error }}</div>

    <!-- Loading -->
    <div v-if="loading" class="flex flex-1 items-center justify-center">
      <p class="text-sm text-muted">Memuat data artikel...</p>
    </div>

    <!-- Split pane -->
    <div v-else class="grid flex-1 gap-6 lg:grid-cols-2">
      <!-- Left: Form -->
      <div class="min-w-0">
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

      <!-- Right: Preview -->
      <div class="hidden min-w-0 lg:block">
        <div class="sticky top-[5.5rem] rounded-[10px] border border-line bg-white">
          <!-- Preview header -->
          <div class="border-b border-line px-4 py-2.5">
            <p class="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted/60">Pratinjau</p>
          </div>

          <div class="p-6 md:p-8">
            <!-- Featured image -->
            <div v-if="imagePreview || existingUrl" class="mb-5 overflow-hidden rounded-lg border border-line">
              <img :src="imagePreview || existingUrl" class="aspect-[2/1] w-full object-cover" alt="" />
            </div>

            <!-- Tag badge -->
            <span v-if="form.tag" class="mb-3 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent">{{ form.tag }}</span>

            <!-- Title -->
            <h2 class="text-xl font-bold leading-snug tracking-[-0.01em] text-ink" :class="{ 'text-muted/40': !form.title }">
              {{ form.title || 'Judul artikel...' }}
            </h2>

            <!-- Meta -->
            <div class="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-muted/60">
              <span v-if="form.author"><span class="font-medium text-muted">{{ form.author }}</span></span>
              <span v-if="form.author && form.publishedAt" class="text-line">·</span>
              <span v-if="form.publishedAt">{{ new Date(form.publishedAt).toLocaleDateString('id-ID', { year:'numeric', month:'long', day:'numeric' }) }}</span>
            </div>

            <!-- Excerpt -->
            <p v-if="form.excerpt" class="mt-4 text-[15px] leading-relaxed text-muted/80">{{ form.excerpt }}</p>

            <!-- Content -->
            <div class="prose-tech mt-5">
              <div v-if="form.content" v-html="form.content" />
              <p v-else class="text-muted/30 italic">Konten artikel akan tampil di sini...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
