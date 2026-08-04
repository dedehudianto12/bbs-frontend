// Admin authentication.
//
// ── Why the token is stored in a cookie ─────────────────────────────────────
//
// The Go API authenticates two ways at once: it sets a `token` cookie
// (HttpOnly, SameSite=Lax) *and* returns the same token in the login response
// body for use as an `Authorization: Bearer` header. This client used to keep
// that token in `useState`, which is per-request memory — it does not survive a
// page reload. Session persistence therefore rested entirely on the API's own
// cookie, and that cookie only reaches the API when the two are same-site.
//
// In development they always are: nuxt.config proxies /api to localhost:8080,
// so every call is same-origin and the flaw is invisible. In production it
// depends on where the API lives. A subdomain (api.bbsconveyor.com) is still
// same-site and Lax is fine. A different registrable domain — any of the usual
// PaaS hostnames — is cross-site, Lax withholds the cookie on XHR, and the
// in-memory token is already gone after the first reload. The result would be
// an admin who is logged out by every refresh, with no error to explain it.
//
// Persisting the token in a first-party cookie of our own closes that gap: the
// Bearer header now works on its own, whichever domain the API is on, and the
// API's cookie becomes a redundant second path rather than the only one.
//
// The trade-off is that this cookie is readable by JavaScript — it has to be,
// because we read it to build the header. That is the standard exposure for any
// bearer-token SPA, and the defence that actually carries the weight is the
// sanitising of every `v-html` sink in utils/richtext.ts.
//
// Be precise about what the CSP does and does not add here: script-src still
// carries 'unsafe-inline' (Nuxt inlines its hydration payload as a script
// block), so the CSP does not stop an injected inline script from running and
// reading this cookie. It raises the cost of exfiltration via connect-src, and
// nothing more. Removing 'unsafe-inline' in favour of a nonce is the change
// that would make the CSP a real second line of defence for this token.
import type { Admin } from '~/types/admin'

const TOKEN_COOKIE = 'bbs_admin_token'
/** Matches the API's own cookie MaxAge (86400s) so both expire together. */
const TOKEN_MAX_AGE = 60 * 60 * 24

export function useAuth() {
  const admin = useState<Admin | null>('admin', () => null)
  const loading = useState('admin-loading', () => true)
  /** True when the last check failed for transport reasons rather than auth. */
  const unreachable = useState('admin-unreachable', () => false)

  const token = useCookie<string | null>(TOKEN_COOKIE, {
    default: () => null,
    maxAge: TOKEN_MAX_AGE,
    sameSite: 'strict',
    // Cloudflare Pages is HTTPS-only; `secure` would stop the cookie being set
    // over plain http on localhost, so it follows the environment.
    secure: !import.meta.dev,
    // Scoped to /admin, not /. The token is only ever *read* by JS to build an
    // Authorization header — it never needs to be sent anywhere. At path '/' the
    // browser attached it to every request to the public site, including static
    // assets, putting an admin bearer token in the edge request log of pages
    // that have nothing to do with the panel. Every caller (check, login,
    // logout, the guard, useAdminApi) runs from under /admin, so narrowing the
    // path costs nothing.
    path: '/admin',
  })

  function authHeaders(): Record<string, string> {
    const h: Record<string, string> = {}
    if (token.value) h['Authorization'] = `Bearer ${token.value}`
    return h
  }

  const apiBase = () => useRuntimeConfig().public.apiBase as string

  /**
   * Confirms the stored token still identifies someone.
   *
   * `force` re-validates even when an admin is already loaded. The route guard
   * passes false, so moving between admin pages in one session no longer fires
   * a /admin/me request per navigation the way it used to.
   */
  async function check(force = false) {
    if (admin.value && !force) {
      loading.value = false
      return
    }
    // The round trip runs even with no token of our own: the API's HttpOnly
    // cookie is a second, independent credential, and it is invisible to JS, so
    // "no token here" is not evidence of "no session there".
    loading.value = true
    unreachable.value = false
    try {
      const res = await $fetch<{ data: Admin }>('/admin/me', {
        baseURL: apiBase(),
        headers: authHeaders(),
        credentials: 'include',
        signal: AbortSignal.timeout(5000),
      })
      admin.value = res.data
    } catch (e: unknown) {
      admin.value = null
      // Only an authentication verdict destroys the token. This catch used to
      // fire unconditionally, which meant the 5s timeout above was enough to
      // delete a perfectly valid session: a slow connection, a Railway cold
      // start or a 502 mid-deploy logged the admin out and forced them to type
      // their password again. Anything that is not a 401/403 leaves the token
      // in place, so once the API answers again the next check signs them
      // straight back in.
      const status = errorStatus(e)
      if (status === 401 || status === 403) {
        token.value = null
      } else {
        unreachable.value = true
      }
    } finally {
      loading.value = false
    }
  }

  async function login(email: string, password: string) {
    const res = await $fetch<{ data: { token: string; admin: Admin } }>('/admin/login', {
      baseURL: apiBase(),
      method: 'POST',
      body: { email, password },
      credentials: 'include',
      signal: AbortSignal.timeout(10000),
    })
    token.value = res.data.token
    admin.value = res.data.admin
  }

  async function logout() {
    try {
      await $fetch('/admin/logout', {
        baseURL: apiBase(),
        method: 'POST',
        headers: authHeaders(),
        credentials: 'include',
        signal: AbortSignal.timeout(5000),
      })
    } catch {
      /* Server-side cleanup is best effort; local state is cleared regardless
         so a failed request can never leave someone apparently signed in. */
    }
    token.value = null
    admin.value = null
    await navigateTo('/admin/login')
  }

  return { admin, token, loading, unreachable, check, login, logout }
}
