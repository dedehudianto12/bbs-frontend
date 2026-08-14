// site.trailingSlash is true, so every canonical, og:url and sitemap <loc> ends
// in a slash — but every internal link in the app was written without one.
//
// Both forms answer 200. They have to: the pages that matter here are all
// routeRules `prerender: false`, so they are rendered by the Worker rather than
// served as static assets, and Cloudflare Pages' automatic bare→slash 308 is a
// behaviour of its *static* asset server. (The comment on site.trailingSlash in
// nuxt.config.ts claims otherwise; it describes the two genuinely prerendered
// pages and was over-generalised to the whole site.)
//
// The canonical tag stops that becoming a duplicate-content problem, but Google
// discovers URLs from links — so every crawl still started at the non-canonical
// form of every page. Normalising at the point where links are built is what
// actually stops the bare form being seen at all.
//
// Left alone: external URLs, mailto/tel, bare fragments, query strings, and
// anything with a file extension.
export function internalPath(href: string): string {
  if (!href) return href
  if (/^(https?:|mailto:|tel:|wa\.me|\/\/)/.test(href)) return href
  if (href.startsWith('#')) return href
  if (href === '/') return href

  const [path, rest] = href.split(/(?=[?#])/, 2) as [string, string | undefined]
  // A path segment with an extension is a file, not a page route.
  if (/\.[a-z0-9]+$/i.test(path)) return href

  return `${path.replace(/\/?$/, '/')}${rest ?? ''}`
}
