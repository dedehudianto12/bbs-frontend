// Authenticated API client for the admin panel.
//
// The token comes from useAuth() rather than a second `useState('admin-token')`
// of its own. Those two were separate handles on the same key, and when the
// token moved into a cookie this file would have silently kept reading an
// always-empty state — every admin request would have gone out unauthenticated.
// One owner, one source.
//
// A 401 here means the session died mid-visit (expiry, or the admin was removed
// server-side). Previously each call site caught that as a generic "Gagal
// menyimpan", leaving someone typing into a form that could never save. It now
// clears local state and returns them to the login page once, centrally.
export function useAdminApi() {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase as string
  const { token, admin } = useAuth()

  function headers(): Record<string, string> {
    const h: Record<string, string> = {}
    if (token.value) h['Authorization'] = `Bearer ${token.value}`
    return h
  }

  async function request<T>(path: string, opts: Record<string, any> = {}) {
    try {
      return await $fetch<{ data: T; error: string | null }>(`${baseURL}${path}`, {
        headers: headers(),
        credentials: 'include',
        ...opts,
      })
    } catch (e: any) {
      if (e?.status === 401 || e?.statusCode === 401 || e?.response?.status === 401) {
        token.value = null
        admin.value = null
        // Guard against redirect loops if a 401 arrives while already on login.
        if (import.meta.client && !useRoute().path.startsWith('/admin/login')) {
          await navigateTo('/admin/login')
        }
      }
      throw e
    }
  }

  const get = <T>(path: string) => request<T>(path)
  const post = <T>(path: string, body: any) => request<T>(path, { method: 'POST', body })
  const put = <T>(path: string, body: any) => request<T>(path, { method: 'PUT', body })
  const del = (path: string) => request<null>(path, { method: 'DELETE' })
  const upload = (path: string, formData: FormData) =>
    request<{ url: string }>(path, { method: 'POST', body: formData })

  return { get, post, put, del, upload }
}
