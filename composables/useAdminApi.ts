// ponytail: admin API — includes credentials for cookie auth
export function useAdminApi() {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase as string

  function get<T>(path: string) {
    return $fetch<{ data: T; error: string | null }>(`${baseURL}${path}`, { credentials: 'include' })
  }

  function post<T>(path: string, body: any) {
    return $fetch<{ data: T; error: string | null }>(`${baseURL}${path}`, {
      method: 'POST',
      body,
      credentials: 'include',
    })
  }

  function put<T>(path: string, body: any) {
    return $fetch<{ data: T; error: string | null }>(`${baseURL}${path}`, {
      method: 'PUT',
      body,
      credentials: 'include',
    })
  }

  function del(path: string) {
    return $fetch<{ data: null; error: string | null }>(`${baseURL}${path}`, {
      method: 'DELETE',
      credentials: 'include',
    })
  }

  return { get, post, put, del }
}
