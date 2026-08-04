// Google Analytics, loaded at run time.
//
// This used to be two entries in `app.head.script` in nuxt.config, built from
// `import.meta.env.NUXT_PUBLIC_GA_ID`. That expression is resolved when the
// bundle is compiled, so the measurement ID was frozen at build time: a
// Cloudflare Pages project that sets NUXT_PUBLIC_GA_ID as a runtime variable
// got a bundle with the tag stripped out entirely, and there was nothing in the
// output to say why analytics were missing.
//
// Reading runtimeConfig here instead means the ID is resolved on the client,
// from whatever the deployment actually has configured.
//
// `.client` suffix: gtag touches window and document, and there is no reason to
// run any of it during SSR.
export default defineNuxtPlugin(() => {
  const gaId = useRuntimeConfig().public.gaId as string
  if (!gaId) return

  // Appended rather than written through head.script so the snippet is not part
  // of the server-rendered HTML — one less inline script on every page for
  // visitors who never trigger it.
  const tag = document.createElement('script')
  tag.async = true
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
  document.head.appendChild(tag)

  const w = window as any
  w.dataLayer = w.dataLayer || []
  function gtag(...args: any[]) {
    w.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', gaId)
})
