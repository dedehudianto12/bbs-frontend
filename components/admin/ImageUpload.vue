<script setup lang="ts">
const model = defineModel<string>({ default: '' })
const props = defineProps<{ folder?: string }>()
const token = useState<string | null>('admin-token', () => null)

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
    const res = await fetch('/api/upload/image', {
      method: 'POST',
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
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
    <div class="flex items-start gap-2.5">
      <input
        v-model="model"
        type="text"
        placeholder="https://..."
        class="block flex-1 rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none box-border"
      />
      <label
        class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-4 py-2.5 text-[13px] font-semibold text-white font-sans"
        :class="uploading ? 'cursor-not-allowed bg-muted opacity-70' : 'cursor-pointer bg-accent'"
      >
        <span v-if="uploading" class="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        {{ uploading ? 'Upload...' : 'Upload' }}
        <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden @change="handleFile" :disabled="uploading" />
      </label>
    </div>
    <div v-if="uploadError" class="mt-1.5 text-[11px] text-red-600">{{ uploadError }}</div>
    <div v-if="model" class="mt-2 rounded-md border border-line p-2">
      <img :src="model" class="h-[120px] rounded object-cover" />
    </div>
  </div>
</template>
