// Shared image-upload state: the selected file, a preview URL, and cleanup of
// the object URLs the preview creates.
//
// Validation was added because there was none: the input accepted anything the
// file picker would hand it, at any size. A 40 MB RAW file or a .zip renamed to
// .jpg was uploaded in full and only rejected — if at all — by the API, after
// the admin had waited out the transfer. Checking locally fails in a
// millisecond and says why.
//
// This is a usability guard, not a security control. The API must do its own
// checking; anything enforced in the browser can be bypassed by not using the
// browser.
// GIF is kept because the inputs already accepted it and dropping a format
// silently would break whatever is relying on it; AVIF is added because the
// public site already serves modern formats.
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
const MAX_BYTES = 5 * 1024 * 1024

/** The `accept` attribute for file inputs, kept in step with ACCEPTED. */
export const IMAGE_ACCEPT = ACCEPTED.join(',')

export function useImageUpload() {
  const imageFile = ref<File | null>(null)
  const imagePreview = ref('')
  const existingUrl = ref('')
  const error = ref('')

  function revoke() {
    if (imagePreview.value && imagePreview.value.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview.value)
    }
  }

  function setPreview(file: File | null, url = '') {
    revoke()
    imagePreview.value = file ? URL.createObjectURL(file) : url
  }

  function validate(file: File): string {
    if (!ACCEPTED.includes(file.type)) {
      return 'Format tidak didukung. Gunakan JPG, PNG, WebP, atau AVIF.'
    }
    if (file.size > MAX_BYTES) {
      const mb = (file.size / 1024 / 1024).toFixed(1)
      return `Ukuran file ${mb} MB melebihi batas 5 MB.`
    }
    return ''
  }

  function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    error.value = ''
    if (!file) return

    const message = validate(file)
    if (message) {
      error.value = message
      // Clearing the input matters: without it the rejected filename stays on
      // screen and re-picking the same file fires no change event, so the admin
      // is stuck looking at a file the form will not send.
      input.value = ''
      return
    }

    imageFile.value = file
    setPreview(file)
  }

  function reset(url = '') {
    imageFile.value = null
    existingUrl.value = url
    error.value = ''
    setPreview(null, url)
  }

  onBeforeUnmount(() => revoke())

  return { imageFile, imagePreview, existingUrl, error, onFileChange, reset }
}
