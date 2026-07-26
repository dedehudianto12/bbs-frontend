// ponytail: admin API — adds Bearer token header from stored auth state
export function useAdminApi() {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase as string
  const token = useState<string | null>('admin-token', () => null)

  function headers(): Record<string, string> {
    const h: Record<string, string> = {}
    if (token.value) h['Authorization'] = `Bearer ${token.value}`
    return h
  }

  function get<T>(path: string) {
    return $fetch<{ data: T; error: string | null }>(`${baseURL}${path}`, {
      headers: headers(),
      credentials: 'include',
    })
  }

  function post<T>(path: string, body: any) {
    return $fetch<{ data: T; error: string | null }>(`${baseURL}${path}`, {
      method: 'POST',
      body,
      headers: headers(),
      credentials: 'include',
    })
  }

  function put<T>(path: string, body: any) {
    return $fetch<{ data: T; error: string | null }>(`${baseURL}${path}`, {
      method: 'PUT',
      body,
      headers: headers(),
      credentials: 'include',
    })
  }

  function del(path: string) {
    return $fetch<{ data: null; error: string | null }>(`${baseURL}${path}`, {
      method: 'DELETE',
      headers: headers(),
      credentials: 'include',
    })
  }

  function upload(path: string, formData: FormData) {
    return $fetch<{ data: { url: string }; error: string | null }>(`${baseURL}${path}`, {
      method: 'POST',
      body: formData,
      headers: headers(),
      credentials: 'include',
    })
  }

  return { get, post, put, del, upload }
}
