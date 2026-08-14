/**
 * An `@id` reference to the site's identity node — the LocalBusiness declared
 * in nuxt.config.ts `schemaOrg.identity`.
 *
 * Why this is not just `{ '@id': '#identity' }`:
 *
 * nuxt-schema-org absolutises graph keys only for the relations it has a
 * resolver for — `publisher` and `author` on Article, `brand` on Service. Pass
 * `#identity` to a field it does not resolve (Product.brand, Service.provider)
 * and the bare fragment survives into the emitted JSON-LD. A relative IRI in
 * JSON-LD resolves against the document base, so on /produk/pu-hijau/ it points
 * at `…/produk/pu-hijau/#identity` — a node that does not exist. The reference
 * dangles, silently, and only a strict validator notices.
 *
 * Building the absolute id from site config gives the same string the library
 * produces for the relations it does resolve, so every reference lands on the
 * one identity node.
 *
 * Must be called in setup — it reads useSiteConfig().
 */
export function useIdentityRef(): { '@id': string } {
  const site = useSiteConfig()
  const origin = String(site.url ?? '').replace(/\/$/, '')
  return { '@id': `${origin}/#identity` }
}
