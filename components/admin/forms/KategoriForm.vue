<script setup lang="ts">
import { kategoriSchema, type Kategori } from '~/types/category'

const props = defineProps<{
  mode: 'create' | 'edit'
  initialData?: Kategori
}>()

const emit = defineEmits<{
  submit: [data: { label: string; sortOrder: number }]
}>()

const label = ref(props.initialData?.label ?? '')
const sortOrder = ref(props.initialData?.sortOrder ?? 1)
const group = ref<'belt-conveyor' | 'lainnya'>(props.initialData?.group ?? 'belt-conveyor')

// Slug: readonly (backend seed), locked di edit mode
const isEdit = props.mode === 'edit'
const slug = computed(() => props.initialData?.slug ?? '')

const errors = ref<Record<string, string>>({})

function validate(): boolean {
  errors.value = {}

  const result = kategoriSchema.safeParse({
    slug: slug.value || 'temp',
    label: label.value,
    group: group.value,
    sortOrder: sortOrder.value,
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
    label: label.value,
    sortOrder: sortOrder.value,
  })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <div class="space-y-2">
      <Label for="kat-label">Label</Label>
      <Input id="kat-label" v-model="label" placeholder="PVC Belt" />
      <p v-if="errors.label" class="text-sm text-red-600">{{ errors.label }}</p>
    </div>

    <div class="space-y-2">
      <Label for="kat-slug">Slug</Label>
      <Input
        id="kat-slug"
        :model-value="slug"
        disabled
        class="bg-neutral-50 text-neutral-400 cursor-not-allowed"
      />
      <p class="text-xs text-neutral-400">Slug tidak bisa diubah (dibuat via migration backend).</p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="kat-group">Grup</Label>
        <select
          id="kat-group"
          v-model="group"
          disabled
          class="flex h-9 w-full rounded-md border border-input bg-neutral-50 text-neutral-400 cursor-not-allowed px-3 py-1 text-sm shadow-sm"
        >
          <option value="belt-conveyor">Belt Conveyor</option>
          <option value="lainnya">Produk Lainnya</option>
        </select>
      </div>

      <div class="space-y-2">
        <Label for="kat-order">Urutan</Label>
        <Input id="kat-order" v-model.number="sortOrder" type="number" min="0" />
        <p v-if="errors.sortOrder" class="text-sm text-red-600">{{ errors.sortOrder }}</p>
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-2">
      <Button type="submit">Perbarui</Button>
    </div>
  </form>
</template>
