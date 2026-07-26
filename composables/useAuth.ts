// ponytail: admin auth — token-based, stores token from login, sends Bearer header
import type { Admin } from '~/types/admin'

export function useAuth() {
  const admin = useState<Admin | null>('admin', () => null)
  const token = useState<string | null>('admin-token', () => null)
  const loading = useState('admin-loading', () => true)

  function authHeaders(): Record<string, string> {
    const h: Record<string, string> = {}
    if (token.value) h['Authorization'] = `Bearer ${token.value}`
    return h
  }

  async function check() {
    loading.value = true
    try {
      const res = await $fetch<{ data: Admin }>('/admin/me', {
        baseURL: useRuntimeConfig().public.apiBase as string,
        headers: authHeaders(),
        credentials: 'include',
        signal: AbortSignal.timeout(8000),
      })
      admin.value = res.data
    } catch {
      admin.value = null
    } finally {
      loading.value = false
    }
  }

  async function login(email: string, password: string) {
    const res = await $fetch<{ data: { token: string; admin: Admin } }>('/admin/login', {
      baseURL: useRuntimeConfig().public.apiBase as string,
      method: 'POST',
      body: { email, password },
      credentials: 'include',
      signal: AbortSignal.timeout(10000),
    })
    token.value = res.data.token
    admin.value = res.data.admin
  }

  async function logout() {
    try {
      await $fetch('/admin/logout', {
        baseURL: useRuntimeConfig().public.apiBase as string,
        method: 'POST',
        headers: authHeaders(),
        credentials: 'include',
      })
    } catch { /* ponytail: always clear local state, server cleanup is best-effort */ }
    token.value = null
    admin.value = null
    await navigateTo('/admin/login')
  }

  return { admin, token, loading, check, login, logout }
}
