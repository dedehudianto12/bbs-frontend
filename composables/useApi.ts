type ApiResponse<T> = { data: T; error: null } | { data: null; error: string };

export function useApi() {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase as string;

  async function api<T>(
    path: string,
    options?: Parameters<typeof $fetch>[1],
  ): Promise<T> {
    // ponytail: $fetch handles SSR + client; credentials:'include' forwards HttpOnly JWT cookie
    const res = await $fetch<ApiResponse<T>>(path, {
      baseURL,
      credentials: "include",
      ...options,
    });

    if (res.error) {
      throw createError({ statusMessage: res.error });
    }

    return res.data as T;
  }

  return { api, baseURL };
}
