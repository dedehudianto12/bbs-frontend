// Admin auth middleware: redirect ke login jika belum terautentikasi.
// JWT dicek via GET /api/admin/me (HttpOnly cookie dikirim otomatis).

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip check entirely on login page — login page handles its own redirect
  if (to.path === '/admin/login') return

  const { isAuthenticated, checkAuth } = useAuth()

  // Already authenticated from previous check
  if (isAuthenticated.value) return

  // Verify with backend
  const ok = await checkAuth()
  if (!ok) return navigateTo('/admin/login')
})
