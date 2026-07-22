<script setup lang="ts">
import { productSchema, type Product } from '~/types/product'
import type { Kategori } from '~/types/category'

const props = defineProps<{
  mode: 'create' | 'edit'
  initialData?: Product
}>()

const emit = defineEmits<{
  submit: [data: Omit<Product, 'id' | 'slug' | 'category'>]
}>()

const { getByGroup: getKategoriByGroup } = useKategori()

const name = ref(props.initialData?.name ?? '')
const group = ref<'belt-conveyor' | 'lainnya'>(props.initialData?.group ?? 'belt-conveyor')
const selectedKategori = ref(props.initialData?.kategori ?? '')
const description = ref(props.initialData?.description ?? '')
const detail = ref(props.initialData?.detail ?? '')
const image = ref(props.initialData?.image ?? '')
const specs = ref<Record<string, string>>(props.initialData?.specs ? { ...props.initialData.specs } : {})

const errors = ref<Record<string, string>>({})

// Dependent dropdown: kategori di-filter berdasarkan group terpilih
const kategoriOptions = computed<Kategori[]>(() => getKategoriByGroup(group.value))

// Reset kategori saat group berubah
watch(group, () => {
  selectedKategori.value = ''
})

function validate(): boolean {
  errors.value = {}

  const result = productSchema.safeParse({
    id: props.mode === 'edit' ? props.initialData?.id : 'new',
    slug: 'temp',
    name: name.value,
    group: group.value,
    kategori: selectedKategori.value,
    category: 'temp', // auto-resolved dari kategori di composable
    description: description.value,
    detail: detail.value,
    image: image.value,
    specs: specs.value,
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
    group: group.value,
    kategori: selectedKategori.value,
    description: description.value,
    detail: detail.value,
    image: image.value,
    specs: specs.value,
  })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <div class="space-y-2">
      <Label for="prod-name">Nama Produk</Label>
      <Input id="prod-name" v-model="name" placeholder="PVC Belt 2-Ply" />
      <p v-if="errors.name" class="text-sm text-red-600">{{ errors.name }}</p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="prod-group">Grup</Label>
        <select
          id="prod-group"
          v-model="group"
          class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="belt-conveyor">Belt Conveyor</option>
          <option value="lainnya">Produk Lainnya</option>
        </select>
        <p v-if="errors.group" class="text-sm text-red-600">{{ errors.group }}</p>
      </div>

      <div class="space-y-2">
        <Label for="prod-kategori">Kategori</Label>
        <select
          id="prod-kategori"
          v-model="selectedKategori"
          class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="" disabled>Pilih kategori...</option>
          <option v-for="kat in kategoriOptions" :key="kat.slug" :value="kat.slug">
            {{ kat.label }}
          </option>
        </select>
        <p v-if="errors.kategori" class="text-sm text-red-600">{{ errors.kategori }}</p>
      </div>
    </div>

    <div class="space-y-2">
      <Label for="prod-desc">Deskripsi Singkat</Label>
      <textarea
        id="prod-desc"
        v-model="description"
        rows="2"
        placeholder="Ringkasan produk dalam 1–2 kalimat..."
        class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      <p v-if="errors.description" class="text-sm text-red-600">{{ errors.description }}</p>
    </div>

    <div class="space-y-2">
      <Label for="prod-detail">Detail Produk</Label>
      <textarea
        id="prod-detail"
        v-model="detail"
        rows="4"
        placeholder="Penjelasan lengkap produk..."
        class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
      <p v-if="errors.detail" class="text-sm text-red-600">{{ errors.detail }}</p>
    </div>

    <div class="space-y-2">
      <Label for="prod-image">URL Gambar</Label>
      <Input id="prod-image" v-model="image" placeholder="/images/products/contoh.jpg" />
      <p v-if="errors.image" class="text-sm text-red-600">{{ errors.image }}</p>
      <p class="text-xs text-neutral-400">Sementara input URL — upload file akan tersedia setelah backend siap.</p>
    </div>

    <div class="space-y-2">
      <Label>Spesifikasi</Label>
      <p class="text-xs text-neutral-400">Isi key-value untuk spesifikasi produk (contoh: Material: PVC, Lebar: 600mm).</p>
      <div v-for="(_, key) in specs" :key="key" class="flex gap-2 items-start">
        <Input
          :model-value="key"
          readonly
          disabled
          class="w-1/3 bg-neutral-50 text-neutral-400 cursor-not-allowed"
        />
        <Input
          :model-value="specs[key]"
          @update:model-value="(v: string) => specs[key] = v"
          class="flex-1"
        />
        <button
          type="button"
          class="p-1.5 rounded text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0"
          @click="delete specs[key]"
        >
          ✕
        </button>
      </div>
      <Button type="button" variant="outline" class="text-xs" @click="specs[''] = ''">
        + Tambah Spesifikasi
      </Button>
      <p v-if="errors.specs" class="text-sm text-red-600">{{ errors.specs }}</p>
    </div>

    <div class="flex justify-end gap-3 pt-2">
      <Button type="submit">
        {{ mode === 'create' ? 'Simpan' : 'Perbarui' }}
      </Button>
    </div>
  </form>
</template>
