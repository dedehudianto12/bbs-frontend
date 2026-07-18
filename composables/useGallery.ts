// TODO: Ganti dengan fetch ke backend Go + R2 upload saat API sudah tersedia.
// Saat ini menggunakan mock data in-memory untuk development.
import type { GalleryItem } from '~/types/gallery'
import { mockGallery } from '~/data/mock/gallery'

let nextId = 99

export function useGallery() {
  const items = ref<GalleryItem[]>([...mockGallery.map((g) => ({ ...g }))])

  function add(item: Omit<GalleryItem, 'id'>) {
    const newItem: GalleryItem = { ...item, id: `gal-${String(++nextId).padStart(2, '0')}` }
    items.value.push(newItem)
  }

  function update(id: string, data: Omit<GalleryItem, 'id'>) {
    const idx = items.value.findIndex((i) => i.id === id)
    if (idx !== -1) {
      items.value[idx] = { ...data, id }
    }
  }

  function remove(id: string) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  return { items, add, update, remove }
}
