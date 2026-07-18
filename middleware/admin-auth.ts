export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated.value && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  if (isAuthenticated.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})
