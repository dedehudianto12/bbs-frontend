<script setup lang="ts">
import { serviceSchema, type Service } from '~/types/service'

const props = defineProps<{
  mode: 'create' | 'edit'
  initialData?: Service
}>()

const emit = defineEmits<{
  submit: [data: Omit<Service, 'id' | 'slug'>]
}>()

const name = ref(props.initialData?.name ?? '')
const shortDescription = ref(props.initialData?.shortDescription ?? '')
const fullDescription = ref(props.initialData?.fullDescription ?? '')
const image = ref(props.initialData?.images?.[0] ?? '')

const errors = ref<Record<string, string>>({})

function validate(): boolean {
  errors.value = {}

  const result = serviceSchema.safeParse({
    id: props.mode === 'edit' ? props.initialData?.id : 'new',
    slug: 'temp',
    name: name.value,
    shortDescription: shortDescription.value,
    fullDescription: fullDescription.value,
    images: image.value.trim() ? [image.value.trim()] : [],
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

  emit('submit', {
    name: name.value,
    shortDescription: shortDescription.value,
    fullDescription: fullDescription.value,
    images: image.value.trim() ? [image.value.trim()] : [],
  })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <div class="space-y-2">
      <Label for="svc-name">Nama Jasa</Label>
      <Input id="svc-name" v-model="name" placeholder="Incline Cleated Belt" />
      <p v-if="errors.name" class="text-sm text-red-600">{{ errors.name }}</p>
    </div>

    <div class="space-y-2">
      <Label for="svc-short">Deskripsi Singkat</Label>
      <textarea
        id="svc-short"
        v-model="shortDescription"
        rows="2"
        placeholder="Ringkasan layanan dalam 1–2 kalimat..."
        class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      <p v-if="errors.shortDescription" class="text-sm text-red-600">{{ errors.shortDescription }}</p>
    </div>

    <div class="space-y-2">
      <Label for="svc-full">Deskripsi Lengkap</Label>
      <textarea
        id="svc-full"
        v-model="fullDescription"
        rows="6"
        placeholder="Penjelasan detail layanan..."
        class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      <p v-if="errors.fullDescription" class="text-sm text-red-600">{{ errors.fullDescription }}</p>
    </div>

    <div class="space-y-2">
      <Label for="svc-image">URL Gambar</Label>
      <Input id="svc-image" v-model="image" placeholder="/images/services/contoh.jpg" />
      <p v-if="errors.images" class="text-sm text-red-600">{{ errors.images }}</p>
      <p class="text-xs text-neutral-400">Sementara input URL — upload file akan tersedia setelah backend siap.</p>
    </div>

    <div class="flex justify-end gap-3 pt-2">
      <Button type="submit">
        {{ mode === 'create' ? 'Simpan' : 'Perbarui' }}
      </Button>
    </div>
  </form>
</template>
