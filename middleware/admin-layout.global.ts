export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    setPageLayout('admin')
  }
})
