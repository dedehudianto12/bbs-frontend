import type { Service } from '~/types/service'

export function useServices() {
  const { api } = useApi()
  const services = useState<Service[]>('bbs-services', () => [])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      const data = await api<Service[]>('/api/jasa')
      services.value = data
    } catch (e: any) {
      error.value = e.statusMessage ?? 'Gagal memuat jasa'
    } finally {
      loading.value = false
    }
  }

  async function add(item: Omit<Service, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) {
    error.value = null
    const created = await api<Service>('/api/admin/jasa', { method: 'POST', body: item })
    services.value.push(created)
    return created
  }

  async function update(id: string, data: Omit<Service, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) {
    error.value = null
    const updated = await api<Service>(`/api/admin/jasa/${id}`, { method: 'PUT', body: data })
    const idx = services.value.findIndex((s) => s.id === id)
    if (idx !== -1) services.value[idx] = updated
    return updated
  }

  async function remove(id: string) {
    error.value = null
    await api<null>(`/api/admin/jasa/${id}`, { method: 'DELETE' })
    services.value = services.value.filter((s) => s.id !== id)
  }

  async function getBySlug(slug: string): Promise<Service | undefined> {
    const cached = services.value.find((s) => s.slug === slug)
    if (cached) return cached
    try {
      return await api<Service>(`/api/jasa/${slug}`)
    } catch {
      return undefined
    }
  }

  if (import.meta.client && services.value.length === 0) {
    fetch()
  }

  return { services, loading, error, fetch, add, update, remove, getBySlug }
}
