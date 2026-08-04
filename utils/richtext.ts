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

export type TextBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }

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
