<script setup lang="ts">
import { galleryItemSchema, type GalleryItem } from '~/types/gallery'

const props = defineProps<{
  mode: 'create' | 'edit'
  initialData?: GalleryItem
}>()

const emit = defineEmits<{
  submit: [data: Omit<GalleryItem, 'id'>]
}>()

const caption = ref(props.initialData?.caption ?? '')
const location = ref(props.initialData?.location ?? '')
const image = ref(props.initialData?.image ?? '')

const errors = ref<Record<string, string>>({})

function validate(): boolean {
  errors.value = {}

  const result = galleryItemSchema.safeParse({
    id: props.mode === 'edit' ? props.initialData?.id : 'new',
    caption: caption.value,
    location: location.value || undefined,
    image: image.value,
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
    caption: caption.value,
    location: location.value || undefined,
    image: image.value,
  })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <div class="space-y-2">
      <Label for="gallery-image">URL Gambar</Label>
      <Input id="gallery-image" v-model="image" placeholder="/images/gallery/contoh.jpg" />
      <p v-if="errors.image" class="text-sm text-red-600">{{ errors.image }}</p>
      <p class="text-xs text-neutral-400">Sementara input URL — upload file akan tersedia setelah backend siap.</p>
    </div>

    <div class="space-y-2">
      <Label for="gallery-caption">Caption</Label>
      <Input id="gallery-caption" v-model="caption" placeholder="Instalasi Belt Conveyor — Pabrik Makanan, Semarang" />
      <p v-if="errors.caption" class="text-sm text-red-600">{{ errors.caption }}</p>
    </div>

    <div class="space-y-2">
      <Label for="gallery-location">Lokasi <span class="text-neutral-400 font-normal">(opsional)</span></Label>
      <Input id="gallery-location" v-model="location" placeholder="Semarang" />
      <p v-if="errors.location" class="text-sm text-red-600">{{ errors.location }}</p>
    </div>

    <div class="flex justify-end gap-3 pt-2">
      <slot name="actions" />
      <Button type="submit">
        {{ mode === 'create' ? 'Simpan' : 'Perbarui' }}
      </Button>
    </div>
  </form>
</template>
