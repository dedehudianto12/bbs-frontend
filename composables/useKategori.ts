import type { Kategori } from '~/types/category'

export function useKategori() {
  const { api } = useApi()
  const items = useState<Kategori[]>('bbs-kategori', () => [])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      const data = await api<Kategori[]>('/api/kategori')
      items.value = data
    } catch (e: any) {
      error.value = e.statusMessage ?? 'Gagal memuat kategori'
    } finally {
      loading.value = false
    }
  }

  // Backend hanya support update label/sortOrder, tidak ada create/delete
  async function update(slug: string, data: { label: string; sortOrder: number }) {
    error.value = null
    const updated = await api<Kategori>(`/api/admin/kategori/${slug}`, { method: 'PUT', body: data })
    const idx = items.value.findIndex((k) => k.slug === slug)
    if (idx !== -1) items.value[idx] = updated
    return updated
  }

  function getByGroup(group: 'belt-conveyor' | 'lainnya'): Kategori[] {
    return items.value
      .filter((k) => k.group === group)
      .sort((a, b) => a.sortOrder - b.sortOrder)
  }

  function getAll(): Kategori[] {
    return [...items.value].sort((a, b) => {
      if (a.group !== b.group) return a.group === 'belt-conveyor' ? -1 : 1
      return a.sortOrder - b.sortOrder
    })
  }

  if (import.meta.client && items.value.length === 0) {
    fetch()
  }

  return { items: computed(getAll), loading, error, fetch, update, getByGroup }
}
