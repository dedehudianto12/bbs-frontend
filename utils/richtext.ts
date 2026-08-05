// Body copy that arrives as plain text, rendered as structure.
//
// `services.full_description` in the database is plain text — blank-line
// paragraphs, "- " bullets, and "1. " numbered items — but pages/jasa/[slug]
// was piping it through `v-html`. HTML collapses newlines, so all of it landed
// as one unbroken block: the four-item list in Jasa Reparasi and the two
// numbered methods in Onsite Joint both read as a single run-on sentence.
//
// The admin editor is Tiptap and emits real HTML, so both forms exist in the
// same column depending on whether a row was seeded or edited since. `isHtml`
// tells them apart; `parseBlocks` handles the plain case and returns structure
// the template renders with ordinary elements — no v-html, so nothing from the
// database is ever interpreted as markup on this path.

// `xss` is CommonJS with no `exports` map, so the bundler cannot statically see
// its named exports — importing them directly builds fine and then fails at
// prerender with "Named export 'friendlyAttrValue' not found". They have to be
// read off the default export, which at runtime is the whole `module.exports`.
import xssPkg from 'xss'

/** Opaque — js-xss hands this to `safeAttrValue` and we only pass it back. */
type CssFilter = unknown

const { FilterXSS, friendlyAttrValue, safeAttrValue } = xssPkg as unknown as {
  FilterXSS: new (options: Record<string, unknown>) => { process(html: string): string }
  friendlyAttrValue: (value: string) => string
  safeAttrValue: (tag: string, name: string, value: string, cssFilter: CssFilter) => string
}

export type TextBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }

// Tags the Tiptap editor in the admin panel can produce. Anything outside this
// set was never authored through the app, so discarding it costs nothing.
const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'code', 'pre',
  'ul', 'ol', 'li', 'blockquote', 'hr',
  'h2', 'h3', 'h4', 'a', 'span',
]

// `style` is load-bearing: @tiptap/extension-color writes colours as inline
// styles on <span>. js-xss runs its own CSS allow-list over the value.
const GLOBAL_ATTRS = ['class', 'style']

// Blocks javascript:/data: in href, which the tag allow-list alone would let
// through on an <a>.
const SAFE_URI = /^(?:https?:|mailto:|tel:|#|\/)/i

// Why js-xss and not DOMPurify. DOMPurify needs a DOM to parse against, and
// `isomorphic-dompurify` resolved to its *browser* build inside the Cloudflare
// Workers bundle — a build that binds its methods to `window` at import time.
// workerd has no `window`, so the module threw "Cannot read properties of
// undefined (reading 'bind')" during init and every route that imported this
// file returned a 500 in production: all 24 product pages, 9 articles and 4
// service pages. Crucially the failure was at module scope, not call time, so
// no try/catch at the call site could have contained it, and `nuxt build` still
// exited 0 because prerendering runs under Node where the DOM shim works.
//
// js-xss is a string tokeniser with no DOM dependency, so it behaves the same
// under Node, workerd and the browser. Verify any replacement with
// `wrangler pages dev dist`, not `nuxt build` alone.
const filter = new FilterXSS({
  whiteList: {
    ...Object.fromEntries(ALLOWED_TAGS.map((tag) => [tag, [...GLOBAL_ATTRS]])),
    a: ['href', 'target', 'rel', ...GLOBAL_ATTRS],
  },
  // Drop disallowed tags rather than escaping them into visible text, which is
  // what DOMPurify did and what the prose styles expect.
  stripIgnoreTag: true,
  // ...and drop the *contents* of these two as well, so a stripped <script>
  // does not leave its payload behind as body text.
  stripIgnoreTagBody: ['script', 'style'],
  safeAttrValue(tag: string, name: string, value: string, cssFilter: CssFilter) {
    if (name === 'href') {
      // Decode entities before testing: `java&#115;cript:` reaches the browser
      // as `javascript:` and would slip past a check on the raw value.
      if (!SAFE_URI.test(friendlyAttrValue(value).trim())) return ''
    }
    return safeAttrValue(tag, name, value, cssFilter)
  },
})

/**
 * Cleans API-sourced HTML before it reaches a `v-html` binding.
 *
 * Four templates rendered `product.detail`, `article.content` and the service
 * body straight from the API. Only an authenticated admin can write those
 * fields, so this was never open XSS — but "only an admin can reach the sink"
 * is one API bug or one stolen session away from being wrong, and the payload
 * would then execute on every visitor's page view, not just the author's.
 */
export function sanitizeHtml(value: string): string {
  return filter.process(value ?? '')
}

/** True when the value already carries markup and should be rendered as HTML. */
export function isHtml(value: string): boolean {
  return /<(p|div|ul|ol|li|h[1-6]|br|strong|em|a)\b[^>]*>/i.test(value)
}

const BULLET = /^[-•*]\s+/
const NUMBERED = /^\d+[.)]\s+/

/**
 * Splits plain text into paragraphs and lists.
 *
 * Blank lines separate blocks. Inside a block, consecutive "- " lines become
 * one list and everything else becomes a paragraph, so a lead-in line followed
 * by bullets ("Layanan yang kami tawarkan meliputi:") keeps its lead-in.
 * Numbered items that were each written as their own block — which is how the
 * Onsite Joint copy is written — are merged back into a single list.
 */
export function parseBlocks(value: string): TextBlock[] {
  const blocks: TextBlock[] = []

  const push = (block: TextBlock) => {
    const last = blocks[blocks.length - 1]
    // Merge a run of single-item lists of the same kind into one list.
    if (
      last &&
      (block.type === 'ul' || block.type === 'ol') &&
      last.type === block.type
    ) {
      last.items.push(...block.items)
      return
    }
    blocks.push(block)
  }

  for (const chunk of value.split(/\n\s*\n/)) {
    const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean)
    if (!lines.length) continue

    let paragraph: string[] = []
    const flush = () => {
      if (paragraph.length) {
        push({ type: 'p', text: paragraph.join(' ') })
        paragraph = []
      }
    }

    for (const line of lines) {
      if (BULLET.test(line)) {
        flush()
        push({ type: 'ul', items: [line.replace(BULLET, '')] })
      } else if (NUMBERED.test(line)) {
        flush()
        push({ type: 'ol', items: [line.replace(NUMBERED, '')] })
      } else {
        paragraph.push(line)
      }
    }
    flush()
  }

  return blocks
}
