import type { GalleryItem } from '~/types/gallery'

export function useGallery() {
  const { api } = useApi()
  const items = useState<GalleryItem[]>('bbs-gallery', () => [])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      const data = await api<GalleryItem[]>('/api/galeri')
      items.value = data
    } catch (e: any) {
      error.value = e.statusMessage ?? 'Gagal memuat galeri'
    } finally {
      loading.value = false
    }
  }

  async function add(item: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>) {
    error.value = null
    const created = await api<GalleryItem>('/api/admin/galeri', { method: 'POST', body: item })
    items.value.push(created)
    return created
  }

  async function update(id: string, data: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>) {
    error.value = null
    const updated = await api<GalleryItem>(`/api/admin/galeri/${id}`, { method: 'PUT', body: data })
    const idx = items.value.findIndex((i) => i.id === id)
    if (idx !== -1) items.value[idx] = updated
    return updated
  }

  async function remove(id: string) {
    error.value = null
    await api<null>(`/api/admin/galeri/${id}`, { method: 'DELETE' })
    items.value = items.value.filter((i) => i.id !== id)
  }

  if (import.meta.client && items.value.length === 0) {
    fetch()
  }

  return { items, loading, error, fetch, add, update, remove }
}
