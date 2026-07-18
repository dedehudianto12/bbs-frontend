// TODO: Ganti dengan fetch ke backend Go saat API sudah tersedia.
// Saat ini menggunakan mock data in-memory untuk development.
import { kategoriSchema, slugify, type Kategori } from '~/types/category'
import { mockKategori } from '~/data/mock/kategori'

let nextId = 99

export function useKategori() {
  const items = ref<Kategori[]>([...mockKategori.map((k) => ({ ...k }))])

  // Validate mock data on first load
  const result = kategoriSchema.array().safeParse(mockKategori)
  if (!result.success) {
    console.error('Invalid mock kategori data:', result.error.format())
  }

  function getByGroup(group: 'belt-conveyor' | 'lainnya'): Kategori[] {
    return items.value
      .filter((k) => k.group === group)
      .sort((a, b) => a.order - b.order)
  }

  function getAll(): Kategori[] {
    return [...items.value].sort((a, b) => {
      if (a.group !== b.group) return a.group === 'belt-conveyor' ? -1 : 1
      return a.order - b.order
    })
  }

  function add(item: Omit<Kategori, 'id' | 'slug'>) {
    const id = `kat-${String(++nextId).padStart(2, '0')}`
    const slug = slugify(item.label)
    items.value.push({ ...item, id, slug })
  }

  function update(id: string, data: Omit<Kategori, 'id' | 'slug'>) {
    const idx = items.value.findIndex((k) => k.id === id)
    if (idx !== -1) {
      // slug tidak pernah berubah setelah dibuat
      items.value[idx] = { ...data, id, slug: items.value[idx].slug }
    }
  }

  function remove(id: string) {
    items.value = items.value.filter((k) => k.id !== id)
  }

  return { items: getAll(), getByGroup, add, update, remove }
}
