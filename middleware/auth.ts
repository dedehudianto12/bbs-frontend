// ponytail: admin route guard — checks auth on client only (SSR has no cookies)
export default defineNuxtRouteMiddleware(async () => {
  // Skip on server — cookies aren't available during SSR
  if (import.meta.server) return

  const { admin, check } = useAuth()
  await check()

  if (!admin.value) {
    return navigateTo('/admin/login')
  }
})
