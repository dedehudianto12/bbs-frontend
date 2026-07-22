type Admin = { id: string; email: string; name: string }

export function useAuth() {
  const { api } = useApi()

  // ponytail: cek autentikasi dengan GET /api/admin/me (cookie JWT otomatis dikirim via credentials:'include')
  const user = useState<Admin | null>('bbs-admin-user', () => null)
  const loading = ref(false)

  const isAuthenticated = computed(() => user.value !== null)

  async function checkAuth(): Promise<boolean> {
    loading.value = true
    try {
      const admin = await api<Admin>('/api/admin/me')
      user.value = admin
      return true
    } catch {
      user.value = null
      return false
    } finally {
      loading.value = false
    }
  }

  async function login(email: string, password: string): Promise<boolean> {
    loading.value = true
    try {
      const res = await api<{ token: string; admin: Admin }>('/api/admin/login', {
        method: 'POST',
        body: { email, password },
      })
      user.value = res.admin
      return true
    } catch {
      user.value = null
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    await api<null>('/api/admin/logout', { method: 'POST' }).catch(() => {})
    user.value = null
  }

  return { user, loading, isAuthenticated, login, logout, checkAuth }
}
