import type { Industry } from '~/types/industry'

export function useIndustries() {
  const { api } = useApi()
  // ponytail: useState for SSR-safe shared state
  const industries = useState<Industry[]>('bbs-industries', () => [])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      const data = await api<Industry[]>('/api/industri')
      industries.value = data
    } catch (e: any) {
      error.value = e.statusMessage ?? 'Gagal memuat industri'
    } finally {
      loading.value = false
    }
  }

  if (import.meta.client && industries.value.length === 0) {
    fetch()
  }

  return { industries, loading, error, fetch }
}
