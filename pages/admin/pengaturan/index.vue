<script setup lang="ts">
import { settingsSchema } from '~/types/settings'

definePageMeta({ middleware: ['admin-auth'] })

const { settings, update } = useSettings()

// ── form fields ──
const waSales1 = ref(settings.value.waSales1)
const waSales2 = ref(settings.value.waSales2)
const email = ref(settings.value.email)
const jamOperasional = ref(settings.value.jamOperasional)
const alamat = ref(settings.value.alamat)
const companyProfilePdfUrl = ref(settings.value.companyProfilePdfUrl)

const errors = ref<Record<string, string>>({})
const saved = ref(false)

// Sync form if underlying settings change (unlikely in single-user admin, but correct)
watch(settings, (s) => {
  waSales1.value = s.waSales1
  waSales2.value = s.waSales2
  email.value = s.email
  jamOperasional.value = s.jamOperasional
  alamat.value = s.alamat
  companyProfilePdfUrl.value = s.companyProfilePdfUrl
}, { deep: true })

function validate(): boolean {
  errors.value = {}

  const result = settingsSchema.safeParse({
    waSales1: waSales1.value,
    waSales2: waSales2.value,
    email: email.value,
    jamOperasional: jamOperasional.value,
    alamat: alamat.value,
    companyProfilePdfUrl: companyProfilePdfUrl.value,
  })

  if (result.success) return true

  for (const [field, issue] of Object.entries(result.error.format())) {
    if (field === '_errors') continue
    const fieldErrors = (issue as { _errors: string[] })._errors
    if (fieldErrors?.length) {
      errors.value[field] = fieldErrors[0]
    }
  }

  return false
}

function onSubmit() {
  if (!validate()) return

  update({
    waSales1: waSales1.value,
    waSales2: waSales2.value,
    email: email.value,
    jamOperasional: jamOperasional.value,
    alamat: alamat.value,
    companyProfilePdfUrl: companyProfilePdfUrl.value,
  })

  saved.value = true
  setTimeout(() => (saved.value = false), 3000)
}

// ponytail: simulate PDF file upload — show filename, store placeholder path
function onPdfChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    // TODO: ganti dengan upload ke R2 via backend
    companyProfilePdfUrl.value = `/uploads/${file.name}`
  }
}
</script>

<template>
  <div>
    <!-- Toast -->
    <div v-if="saved" class="mb-4 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
      Pengaturan berhasil disimpan.
    </div>

    <h1 class="text-xl font-semibold text-neutral-900 mb-6">Pengaturan Umum</h1>

    <div class="max-w-xl">
      <form class="space-y-5" @submit.prevent="onSubmit">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="wa1">WA Sales 1</Label>
            <Input id="wa1" v-model="waSales1" placeholder="6281234567890" />
            <p v-if="errors.waSales1" class="text-sm text-red-600">{{ errors.waSales1 }}</p>
          </div>

          <div class="space-y-2">
            <Label for="wa2">WA Sales 2</Label>
            <Input id="wa2" v-model="waSales2" placeholder="6281234567891" />
            <p v-if="errors.waSales2" class="text-sm text-red-600">{{ errors.waSales2 }}</p>
          </div>
        </div>

        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" type="email" placeholder="info@bbsconveyor.com" />
          <p v-if="errors.email" class="text-sm text-red-600">{{ errors.email }}</p>
        </div>

        <div class="space-y-2">
          <Label for="jam">Jam Operasional</Label>
          <Input id="jam" v-model="jamOperasional" placeholder="Senin – Jumat, 08:00 – 17:00 WIB" />
          <p v-if="errors.jamOperasional" class="text-sm text-red-600">{{ errors.jamOperasional }}</p>
        </div>

        <div class="space-y-2">
          <Label for="alamat">Alamat Kantor</Label>
          <textarea
            id="alamat"
            v-model="alamat"
            rows="3"
            placeholder="Alamat lengkap..."
            class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <p v-if="errors.alamat" class="text-sm text-red-600">{{ errors.alamat }}</p>
        </div>

        <!-- Company Profile PDF -->
        <div class="space-y-2">
          <Label for="pdf">Company Profile PDF</Label>
          <div class="flex items-center gap-3">
            <input
              id="pdf"
              type="file"
              accept="application/pdf"
              class="text-sm text-neutral-600 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200"
              @change="onPdfChange"
            />
          </div>
          <p v-if="companyProfilePdfUrl" class="text-xs text-neutral-400">
            File saat ini: {{ companyProfilePdfUrl }}
          </p>
          <p class="text-xs text-neutral-400">
            Upload via backend akan tersedia setelah API siap — saat ini path disimpan sebagai placeholder.
          </p>
        </div>

        <div class="pt-2">
          <Button type="submit">Simpan Perubahan</Button>
        </div>
      </form>
    </div>
  </div>
</template>
