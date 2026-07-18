// TODO: Ganti dengan fetch ke backend Go saat API sudah tersedia.
// Saat ini menggunakan kredensial dummy untuk development.

const DUMMY_EMAIL = 'admin@bbsconveyor.com'
const DUMMY_PASSWORD = 'admin123'

export function useAuth() {
  const authToken = useCookie<string | null>('bbs_admin_auth', {
    maxAge: 60 * 60 * 24, // 1 hari
    sameSite: 'lax',
  })

  const isAuthenticated = computed(() => authToken.value === 'authenticated')

  async function login(email: string, password: string): Promise<boolean> {
    // Simulasi network delay — nanti diganti fetch ke backend
    await new Promise((r) => setTimeout(r, 300))

    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      authToken.value = 'authenticated'
      return true
    }

    return false
  }

  function logout() {
    authToken.value = null
  }

  return { login, logout, isAuthenticated }
}
