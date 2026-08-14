# SEO Content Brief

**Status:** open. **Owner:** whoever writes the copy — not a code task.

The technical SEO work is done (product hub, structured data, meta, sitemap,
internal linking). None of it moves rankings on its own. The remaining
constraint is that the pages are too thin to compete, and that is a writing
problem.

All of this content lives in the **Go API database** and is edited through the
**admin panel** at `/admin`. Nothing here is a file in this repo.

## The numbers

| Page type | Now | Target | Competitors |
|---|---|---|---|
| `/jasa/*` | ~370 words | 800–1,200 | 1,000–2,000 |
| `/produk/*` | ~291 words | 600–800 | 1,000+ |
| `/artikel/*` | ~253 words | 800+ | 1,000–2,000 |

---

## 1. Service pages — highest priority

Four pages: `jasa-onsite-joint`, `jasa-reparasi`, `profile-guide-belt`,
`incline-cleated-belt`. These are the money pages and they are the shortest
thing on the site relative to what they are competing against.

**The single biggest miss: "selesai dalam 2–3 hari" appears only on the
homepage.** It is the strongest commercial asset the company has. Someone
searching for conveyor repair is searching because a line is down and is losing
money by the hour — turnaround is the entire decision. It should be the spine of
every service page: in the H1 or the opening paragraph, in a spec block, and in
the closing CTA.

Structure per page:

1. **Keluhan** — the symptom that brings someone here, in their words
   (`data/services.ts` `SERVICE_DOSSIERS[slug].keluhan` already has a starting line)
2. **Metode** — hot joint vs cold joint, when each applies, why it matters
3. **Spesifikasi** — a real table (`SERVICE_DOSSIERS[slug].specs` has the scaffold)
4. **Industri yang dilayani** — named sectors, with what is different about each
5. **Lead time & jangkauan** — the 2–3 day claim, plus honest coverage and travel time
6. **FAQ** — 4–6 real questions (see "Unblocks" below)
7. **CTA** — WhatsApp, with the turnaround restated

## 2. Product categories

Start with the highest-traffic categories rather than all 26 products.

- **Full spec tables** — thickness, tensile strength, temperature range,
  food-grade certification, available widths. The `specs` JSON already renders
  as a table *and* is now emitted as `additionalProperty` structured data, so
  every row added here is a row Google can read.
- **Application by industry** — which belt for which line
- **Comparison guidance** — PU vs PVC vs rubber, and when to choose which. This
  is what people actually search and almost nobody writes.

## 3. The seven city/industry articles — deepen, do not delete

`supplier-belt-conveyor-{medan,semarang,surabaya}`,
`{coklat-makassar, fmcg-banten, gula-probolinggo, tembakau-blitar}`.

**Flagging this plainly: as written, these match the doorway-page pattern.**
Seven near-identical ~250-word pages differing mainly by a swapped city and
industry name is the shape Google's spam policy names directly, and the risk is
not theoretical — it is a manual action that would affect the whole domain.

The decision was to keep and deepen them, which is defensible, but only if each
one becomes genuinely distinct. Each needs:

- A **real project in that city** — what was installed or repaired, when
- **Named kawasan industri** the company actually serves there
- **Actual delivery lead time from Jakarta** to that city
- **Site photographs** from that region
- Local specifics: the dominant industry there, and what it demands of a belt

An article that could have its city find-and-replaced and still read correctly
has not been deepened. That is the test.

## 4. Case studies — currently absent

The strongest E-E-A-T asset available, and there are none. Format: "belt X
diganti di pabrik Y, downtime turun Z jam." Real numbers, named industry (the
client's name can stay anonymous), photographs. Two or three of these outrank a
dozen generic articles.

## 5. Named authors

Articles currently have no visible author, and `author` is a **required** field
for `Article` structured data — the code now falls back to attributing unnamed
articles to the company. Attributing them to a named technician or engineer
instead is a real E-E-A-T signal for a technical trade. Not "Admin".

---

## What this unblocks

**FAQ rich data.** `FAQPage` structured data is deliberately not implemented,
because there is no FAQ content anywhere on the site and JSON-LD describing
Q&A that is not visible on the page violates Google's policy. Once section 6 of
the service pages exists, the implementation is small: `data/faq.ts`, a visible
accordion component, and `useSchemaOrg([defineQuestion(...)])` inside that
component — the same component-owns-its-schema pattern as
`components/shared/Breadcrumb.vue`.

Worth setting expectations: since 2023 Google restricts FAQ *rich results* to
government and health sites, so this is worth doing for the on-page content and
for LLM extraction, not for a snippet.

**Product rich results.** Product structured data ships without an `offers`
node, deliberately — there are no published prices and fabricating one risks a
manual action. Google's Product rich result needs price or rating to fire, so it
will not. If published prices or genuine collected reviews ever exist, that
becomes available; until then the markup is doing its real job of feeding the
Knowledge Graph and LLM extraction.
