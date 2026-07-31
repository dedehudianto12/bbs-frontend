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
  /** Human-readable page/section the click came from */
  halaman?: string
}

const OPENING = 'Halo BBS Conveyor, saya ingin minta penawaran.'
const CLOSING = 'Mohon informasi ketersediaan dan harganya. Terima kasih.'

/** Composes the prefilled Indonesian message body. */
export function waMessage(ctx: WaContext = {}): string {
  const lines = [OPENING]

  if (ctx.produk) lines.push(`Produk: ${ctx.produk}`)
  if (ctx.kategori) lines.push(`Kategori: ${ctx.kategori}`)
  if (ctx.layanan) lines.push(`Layanan: ${ctx.layanan}`)
  if (ctx.halaman) lines.push(`Halaman: ${ctx.halaman}`)

  lines.push(CLOSING)
  return lines.join('\n')
}

/**
 * Builds a wa.me deep link with the message prefilled.
 * Numbers come from data/contact.ts, which stays the single source.
 */
export function waLink(ctx: WaContext = {}, sales: 1 | 2 = 1): string {
  const number = sales === 2 ? contactInfo.waSales2 : contactInfo.waSales1
  return `https://wa.me/${number}?text=${encodeURIComponent(waMessage(ctx))}`
}
