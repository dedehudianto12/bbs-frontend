// ponytail: shared image upload state — file ref, preview with blob URL cleanup, file change handler
export function useImageUpload() {
  const imageFile = ref<File | null>(null)
  const imagePreview = ref('')
  const existingUrl = ref('')

  function revoke() {
    if (imagePreview.value && imagePreview.value.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview.value)
    }
  }

  function setPreview(file: File | null, url = '') {
    revoke()
    imagePreview.value = file ? URL.createObjectURL(file) : url
  }

  function onFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      imageFile.value = file
      setPreview(file)
    }
  }

  function reset(url = '') {
    imageFile.value = null
    existingUrl.value = url
    setPreview(null, url)
  }

  onBeforeUnmount(() => revoke())

  return { imageFile, imagePreview, existingUrl, onFileChange, reset }
}
