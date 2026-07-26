<script setup lang="ts">
const model = defineModel<string>({ default: '' })
const props = defineProps<{ folder?: string }>()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase as string

const uploading = ref(false)
const uploadError = ref('')
const fileInput = ref<HTMLInputElement>()

async function handleFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (file.size > 10 * 1024 * 1024) { uploadError.value = 'File maksimal 10 MB'; return }
  if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) { uploadError.value = 'Format tidak didukung (jpg, png, webp, gif)'; return }

  uploadError.value = ''
  uploading.value = true

  const fd = new FormData()
  fd.append('file', file)
  if (props.folder) fd.append('folder', props.folder)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 30_000)

  try {
    const res = await fetch(`${apiBase}/upload/image`, {
      method: 'POST',
      credentials: 'include',
      body: fd,
      signal: controller.signal,
    })
    const json = await res.json()
    if (!res.ok || json.error) { uploadError.value = json.error || `HTTP ${res.status}`; return }
    model.value = json.data!.url
  } catch (e: any) {
    if (e.name === 'AbortError') uploadError.value = 'Upload timeout (30s)'
    else uploadError.value = e?.message || 'Upload gagal'
  } finally {
    clearTimeout(timer)
    uploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}
</script>

<template>
  <div>
    <div style="display:flex;gap:10px;align-items:start">
      <input
        v-model="model"
        type="text"
        placeholder="https://..."
        style="display:block;flex:1;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:inherit;box-sizing:border-box;outline:none"
      />
      <label
        :style="{
          display:'inline-flex',alignItems:'center',gap:6,padding:'10px 16px',
          background: uploading?'rgb(var(--muted))':'rgb(var(--accent))',
          color:'#fff',borderRadius:6,fontSize:13,fontWeight:600,cursor: uploading?'not-allowed':'pointer',
          whiteSpace:'nowrap',fontFamily:'inherit',opacity: uploading?0.7:1
        }"
      >
        <span v-if="uploading" style="display:inline-block;width:14px;height:14px;border:2px solid #fff;border-top-color:transparent;border-radius:50%;animation:spin .6s linear infinite"></span>
        {{ uploading ? 'Upload...' : 'Upload' }}
        <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden @change="handleFile" :disabled="uploading" />
      </label>
    </div>
    <div v-if="uploadError" style="font-size:11px;color:#dc2626;margin-top:6px">{{ uploadError }}</div>
    <div v-if="model" style="border:1px solid rgb(var(--line));border-radius:6px;padding:8px;margin-top:8px">
      <img :src="model" style="height:120px;border-radius:4px;object-fit:cover" />
    </div>
  </div>
</template>

<style scoped>
@keyframes spin { to { transform: rotate(360deg) } }
</style>
