// ponytail: thin wrapper around $fetch w/ base URL from runtimeConfig
export function useApi() {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase as string

  function get<T>(path: string, params?: Record<string, string>) {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return $fetch<{ data: T; error: string | null }>(`${baseURL}${path}${query}`)
  }

  return { get }
}
