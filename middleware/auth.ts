// Admin route guard.
//
// Client-only by necessity: the session is carried by a cookie the API sets for
// its own origin, and during SSR we have neither that cookie nor a way to
// forward it. The pages themselves are now `ssr: false` (see routeRules in
// nuxt.config), so there is no server render for this to miss — previously the
// full dashboard shell was streamed to the browser and only then replaced by a
// redirect, which flashed admin UI at signed-out visitors.
export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  // The login page is under /admin but must stay reachable while signed out.
  if (to.path.startsWith('/admin/login')) return

  const { admin, check } = useAuth()
  // Not forced: a session already validated this visit is not re-checked on
  // every navigation between admin pages.
  await check()

  if (!admin.value) {
    // Carries where they were going, so signing in returns them there instead
    // of always dumping them on the dashboard.
    return navigateTo({ path: '/admin/login', query: { redirect: to.fullPath } })
  }
})
