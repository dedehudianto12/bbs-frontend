import { contactInfo } from '~/data/contact'

// Every conversion on this site terminates in WhatsApp — there is no form and
// no lead endpoint. Message construction used to live in exactly one place
// (pages/produk/[slug].vue) and was missing from the other seven wa.me call
// sites, so most links opened an empty chat and sales had to ask for context
// from scratch. This is the single builder for all of them.

export interface WaContext {
  /** Product name, e.g. "PVC Belt PB-300" */
  produk?: string
  /** Category label, e.g. "Rubber Belt" */
  kategori?: string
  /** Service name, e.g. "Jasa Onsite Joint" */
  layanan?: string
}

const OPENING = 'Halo BBS Conveyor, saya ingin minta penawaran.'
const CLOSING = 'Mohon informasi ketersediaan dan harganya. Terima kasih.'

/** Composes the prefilled Indonesian message body. */
export function waMessage(ctx: WaContext = {}): string {
  const lines = [OPENING]

  if (ctx.produk) lines.push(`Produk: ${ctx.produk}`)
  if (ctx.kategori) lines.push(`Kategori: ${ctx.kategori}`)
  if (ctx.layanan) lines.push(`Layanan: ${ctx.layanan}`)

  lines.push(CLOSING)
  return lines.join('\n')
}

/**
 * Formats a stored 62-prefixed number for display: 6287758161166 →
 * "+62 877-581-611-66". Lived as a local helper inside WhatsAppFloat; the hero
 * now prints a number too, and two copies would be two formats the first time
 * either was touched.
 */
export function prettyPhone(n: string): string {
  return `+62 ${n.replace(/^62/, '').replace(/(\d{3})(?=\d)/g, '$1-')}`
}

/**
 * Builds a wa.me deep link with the message prefilled.
 * Numbers come from data/contact.ts, which stays the single source.
 *
 * `sales` picks one of the four lines by position and is only for the Kontak
 * page, the one place that publishes all four. Everywhere else omits it and
 * gets contactInfo.waUtama — leaving it out is the correct default, not an
 * oversight.
 */
export function waLink(ctx: WaContext = {}, sales?: 1 | 2 | 3 | 4): string {
  // Falls back to the main line rather than to undefined, so a call site that
  // asks for a sales index the client has since removed still opens a chat.
  const number =
    (sales === undefined ? undefined : contactInfo.salesNumbers[sales - 1]?.number)
    ?? contactInfo.waUtama
  return `https://wa.me/${number}?text=${encodeURIComponent(waMessage(ctx))}`
}
