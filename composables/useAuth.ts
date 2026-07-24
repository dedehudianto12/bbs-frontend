// ponytail: admin auth — cookie-based via backend, uses $fetch with credentials
import type { Admin } from '~/types/admin'

export function useAuth() {
  const admin = useState<Admin | null>('admin', () => null)
  const loading = useState('admin-loading', () => true)

  async function check() {
    loading.value = true
    try {
      const res = await $fetch<{ data: Admin }>('/admin/me', {
        baseURL: useRuntimeConfig().public.apiBase as string,
        credentials: 'include',
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
    })
    admin.value = res.data.admin
  }

  async function logout() {
    await $fetch('/admin/logout', {
      baseURL: useRuntimeConfig().public.apiBase as string,
      method: 'POST',
      credentials: 'include',
    })
    admin.value = null
    await navigateTo('/admin/login')
  }

  return { admin, loading, check, login, logout }
}
