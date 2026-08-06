<script setup lang="ts">
// Imported by name rather than auto-imported: @vueuse/nuxt is not among this
// project's modules, so @vueuse/core composables are ordinary imports here.
import { useDocumentVisibility, usePreferredReducedMotion } from '@vueuse/core'
import { contactInfo } from '~/data/contact'
import { prettyPhone } from '~/utils/whatsapp'

/** One frame of the plate. Ordered to match `timeline` stop for stop. */
type Frame = { src: string; alt: string; caption: string; focus?: string }

const props = withDefaults(
  defineProps<{
    /** Newlines are honoured as hard line breaks — see `headlineLines`. */
    headline: string
    /** Substrings of `headline` to render in logo gold. */
    highlights?: string[]
    subheadline: string
    primaryCTA: string
    primaryLink: string
    /** Renders the WhatsApp glyph inside the primary CTA. */
    primaryWhatsApp?: boolean
    secondaryCTA?: string
    secondaryLink?: string
    /** Datasheet rows under the CTAs. */
    facts?: { key: string; value: string }[]
    /** The job, stop by stop — rendered as the rail across the hero's foot. */
    timeline?: { mark: string; label: string }[]
    /**
     * The plate, one frame per timeline stop. Frames beyond `timeline.length`
     * still play; stops beyond `frames.length` simply never light. Keeping the
     * two the same length is the intended use and is asserted in dev below.
     */
    frames: Frame[]
    /** Small overlaid plate: the detail the wide shots cannot show. */
    detail?: { src: string; alt: string }
  }>(),
  {
    highlights: () => [],
    primaryWhatsApp: false,
    facts: () => [],
    timeline: () => [],
    detail: undefined,
  },
)

// The rail is the sequence's progress indicator, so a mismatch means the gold
// node stops tracking the photograph and the whole device quietly stops
// working — visible only to someone watching the hero for eight seconds.
// Cheap to state, expensive to notice.
if (import.meta.dev && props.timeline.length && props.frames.length !== props.timeline.length) {
  console.warn(
    `[HeroSection] ${props.frames.length} frames against ${props.timeline.length} timeline stops — ` +
      'the rail can only track the plate while the two match.',
  )
}

const phone = prettyPhone(contactInfo.waUtama)

// Where the headline breaks is a design decision, not a consequence of the
// viewport. Left to wrap on its own at display size it produced a one-word
// first line with the question split across two — the hook broken in half by
// the box it happened to be in. The copy now carries its own breaks (`\n` in
// data/homepage.ts) so the last line lands on the number.
//
// text-balance is deliberately NOT used: it exists to fix wrapping nobody
// chose, and here someone did.
const headlineLines = computed(() => props.headline.split('\n'))

// Split each line so chosen words render in logo gold (partial-word highlight).
// Case-insensitive, applied per line so a highlight can never span a break.
//
// The phrases used to be a HIGHLIGHTS const in this file, hardcoded to
// ['Bisnis Anda', 'Conveyor'] — so editing the headline in data/homepage.ts
// silently dropped the gold with nothing to warn you. They now travel with the
// copy they annotate.
function splitHighlights(line: string) {
  let parts: { text: string; hl: boolean }[] = [{ text: line, hl: false }]
  for (const phrase of props.highlights) {
    const re = new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'i')
    parts = parts.flatMap((p) => {
      if (p.hl) return [p]
      return p.text
        .split(re)
        .filter(Boolean)
        .map((s) => ({ text: s, hl: re.test(s) && s.toLowerCase() === phrase.toLowerCase() }))
    })
  }
  return parts
}

// ── The sequence ──────────────────────────────────────────────────────────
//
// Four photographs on the plate, one per stop on the rail, advancing in the
// order the job runs. The rail is not a caption for the sequence — it is the
// sequence's transport: the gold node marks which frame is showing, the line
// under the active stop fills as its hold runs down, and clicking a stop jumps
// to that frame.
//
// 4.2s per frame. Under about 3s a viewer who starts reading the headline
// misses two frames entirely; over about 6s the rail's fill stops reading as
// progress and starts reading as a stuck animation. The whole loop is 16.8s,
// which is roughly how long the hero holds attention before the first scroll.
const HOLD_MS = 4200
const HOLD_S = HOLD_MS / 1000
// The same curve as --ease-out in main.css. Motion takes it as coefficients;
// the token is a CSS string, and there is no way to hand one to the other, so
// this is the one place the two representations have to be kept in step.
const EASE_OUT = [0.22, 1, 0.36, 1] as const
const CROSSFADE_S = 0.9

const active = ref(0)
const frameCount = computed(() => props.frames.length)
const activeFrame = computed(() => props.frames[active.value] ?? props.frames[0])

// Autoplay is off on the server and stays off until hydration, so the SSR HTML
// is a single still frame — the thing the crawler indexes and the thing the
// LCP measurement lands on.
const mounted = ref(false)
const paused = ref(false)
const hovering = ref(false)
const reducedMotion = usePreferredReducedMotion()
const visibility = useDocumentVisibility()

// How far the active frame drifts across its hold. Motion honours a reduced-
// motion preference by collapsing a transition's *duration*, not by dropping
// its target — so with the drift left at 1.055 unconditionally, a reduced-
// motion visitor got the frame snapped straight to the end of the movement and
// held there: a permanently 5.5%-tighter, slightly softer crop than the one
// everyone else starts from. The preference has to be spent on the target.
const drift = computed(() => (reducedMotion.value === 'reduce' ? 1 : 1.055))

const playing = computed(
  () =>
    mounted.value &&
    frameCount.value > 1 &&
    reducedMotion.value !== 'reduce' &&
    !paused.value &&
    !hovering.value &&
    // A hero cycling in a background tab is four image decodes a minute on a
    // phone that is doing something else.
    visibility.value === 'visible',
)

// Frames are added to the DOM one ahead of the one showing rather than all at
// once. Mounting all four at hydration queues ~600KB of decode on a mid-range
// Android before it has finished laying out the page; this way the browser
// fetches the next frame during the current one's 4.2s hold, which is far more
// time than it needs. After one full loop everything is mounted.
//
// The bound is a high-water mark rather than `active + 1` directly, and that
// distinction is the whole point: read straight off `active`, jumping back to
// an earlier stop drops the later frames' `src` again, and an <img> that loses
// its src is torn down and re-decoded when it comes back. Clicking backwards
// along the rail made the sequence stutter for exactly as long as it took to
// re-decode a frame the browser already had.
const loadedTo = ref(1)
watch(active, (i) => {
  loadedTo.value = Math.max(loadedTo.value, i + 1)
})

function isMounted(i: number) {
  return i === 0 || (mounted.value && i <= loadedTo.value)
}

let timer: ReturnType<typeof setTimeout> | undefined
function stopTimer() {
  if (timer) clearTimeout(timer)
  timer = undefined
}

// Watching `active` as well as `playing` is what makes a manual jump restart
// the hold rather than inheriting the remainder of the previous frame's — a
// click that gives you 300ms of the photograph you asked for is a bug.
watch([playing, active], () => {
  stopTimer()
  if (!playing.value) return
  timer = setTimeout(() => {
    active.value = (active.value + 1) % frameCount.value
  }, HOLD_MS)
})

onMounted(() => {
  mounted.value = true
})
onBeforeUnmount(stopTimer)

function go(i: number) {
  active.value = i
}
</script>

<template>
  <!-- ── The cover ──────────────────────────────────────────────────────
       This section is the one dark field on the public surface besides the
       footer, and that is on purpose: a document with a dark cover and a dark
       colophon around a paper body is an editorial structure, not a violation
       of the "single steel anchor" rule. The previous hero was paper on paper —
       a headline, some grey text and two small buttons floating in an empty
       half-screen — which gave the most important screen on the site the least
       visual weight of any band on it.
       The ground is a gradient between two tokens that already exist (ink →
       steel, top-left to bottom-right) rather than a new colour, with the
       blueprint grid at low opacity for tooth. No new palette. -->
  <section class="hero">
    <div class="frame frame-dark">
      <div class="hero-grid lg:grid lg:grid-cols-12">
        <!-- ── Left: the claim ── -->
        <div class="hero-copy lg:col-span-7">
          <span class="eyebrow reveal text-white/45" style="--d: 60ms">
            CV Bintang Berjaya Satu
            <span class="text-white/20" aria-hidden="true">/</span>
            Jakarta Timur
          </span>

          <!-- Leading is pulled to 0.95 here rather than in the .display token:
               1.08 is right for a 2rem section heading and much too airy at
               56px, where the lines have to lock into one mass. Most of what
               makes large type read as deliberate rather than merely big is
               that it sets as a block. -->
          <h1 class="display hero-h1 text-white">
            <span
              v-for="(line, i) in headlineLines"
              :key="i"
              class="reveal block"
              :style="{ '--d': `${140 + i * 70}ms` }"
            >
              <template v-for="(part, j) in splitHighlights(line)" :key="j">
                <span :class="part.hl ? 'text-accent' : ''">{{ part.text }}</span>
              </template>
            </span>
          </h1>

          <p
            v-if="subheadline"
            class="reveal mt-6 max-w-[46ch] text-base leading-relaxed text-white/60 md:text-lg"
            style="--d: 380ms"
          >
            {{ subheadline }}
          </p>

          <!-- On a 360px phone these stack, and the first one gets the thumb.
               That slot belongs to WhatsApp: the buyer arriving here has a line
               down and wants a person, not a catalog. -->
          <div
            class="reveal mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
            style="--d: 460ms"
          >
            <UiButton :href="primaryLink" :block="true" class="sm:!w-auto">
              <UiWhatsAppIcon v-if="primaryWhatsApp" class="h-4 w-4" />
              {{ primaryCTA }}
            </UiButton>
            <UiButton
              v-if="secondaryCTA && secondaryLink"
              :href="secondaryLink"
              variant="outline-invert"
              :block="true"
              class="sm:!w-auto"
            >
              {{ secondaryCTA }}
            </UiButton>
          </div>

          <!-- The three facts the timeline below does not already answer.
               "Lead time" is deliberately absent — the rail across the foot of
               this section *is* the lead time, and printing it twice would be
               the claim arguing with itself. -->
          <dl
            v-if="facts.length"
            class="reveal mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-7 sm:grid-cols-3"
            style="--d: 540ms"
          >
            <div v-for="fact in facts" :key="fact.key">
              <dt class="spec-key !text-white/40">{{ fact.key }}</dt>
              <dd class="mt-1.5 text-[13px] leading-snug text-white/80">{{ fact.value }}</dd>
            </div>
          </dl>
        </div>

        <!-- ── Right: the evidence ──
             The counterweight is now a photograph of the work, not a picture of
             the product. The headline poses a problem — your line stopped — so
             the image opposite it has to be the answer, and a belt segment
             folded on a white sweep answers nothing. This is an on-site joint
             inside a food-grade line: two technicians, a portable press, a blue
             PVC belt. It is also the argument for the whole business in one
             frame, which no studio cutout was ever going to make.
             It fills its cell edge to edge — top of the section to the rail,
             hard against the frame's right rule. The old plate had the photo
             floating inside a bordered box with a white halo on all four sides,
             occupying about 60% of the cell's width; a small object centred in
             a large box is the exact arrangement that reads unfinished. -->
        <figure
          class="hero-figure lg:col-span-5"
          @mouseenter="hovering = true"
          @mouseleave="hovering = false"
        >
          <!-- The frames are stacked and cross-faded rather than swapped,
               because a swap on a plate this size is a flash: at 34rem tall
               there is no amount of easing that hides one photograph being
               replaced by another in a single frame. Each one also drifts a
               little wider across its hold, so the still that is showing is
               never quite still — the movement is under 6% over four seconds,
               which reads as the camera breathing rather than as a zoom. -->
          <Motion
            v-for="(frame, i) in frames"
            v-show="isMounted(i)"
            :key="frame.src"
            as="img"
            :src="isMounted(i) ? frame.src : undefined"
            :alt="frame.alt"
            width="1120"
            height="1829"
            :fetchpriority="i === 0 ? 'high' : 'auto'"
            decoding="async"
            class="hero-photo"
            :style="{ objectPosition: frame.focus ?? '50% 42%' }"
            :initial="{ opacity: i === 0 ? 1 : 0, scale: 1 }"
            :animate="i === active ? { opacity: 1, scale: drift } : { opacity: 0, scale: 1 }"
            :transition="
              i === active
                ? {
                    opacity: { duration: CROSSFADE_S, ease: EASE_OUT },
                    scale: { duration: HOLD_S + CROSSFADE_S, ease: 'linear' },
                  }
                : {
                    opacity: { duration: CROSSFADE_S, ease: EASE_OUT },
                    // The outgoing frame's drift is not eased back — it is
                    // reset instantly, but only once the fade has finished
                    // hiding it. Animating it back would pull the whole plate
                    // sideways underneath the incoming photograph.
                    scale: { duration: 0, delay: CROSSFADE_S },
                  }
            "
          />

          <!-- WCAG 2.2.2: content that updates on its own needs a way to stop
               it, and hover is not one — it does not exist on the phone this
               site is mostly read on. Square, because nothing in this system
               has a radius. -->
          <button
            v-if="frames.length > 1"
            type="button"
            class="hero-toggle"
            :aria-label="paused ? 'Lanjutkan pergantian foto' : 'Hentikan pergantian foto'"
            @click="paused = !paused"
          >
            <span v-if="paused" class="hero-toggle-play" aria-hidden="true" />
            <span v-else class="hero-toggle-pause" aria-hidden="true" />
          </button>

          <!-- The detail the wide shot cannot carry: the mechanical fastener
               itself, seated and locked on the belt edge. Overlapping the
               plate's bottom-left rather than sitting below it — the corner it
               covers is a flat white coverall, and the straddle is what stops
               the two columns reading as two documents that happen to share a
               row. The gap around it is drawn with a border in the ground
               colour, so it reads as cut into the photograph. -->
          <img
            v-if="detail"
            :src="detail.src"
            :alt="detail.alt"
            width="1000"
            height="666"
            loading="lazy"
            decoding="async"
            class="hero-detail"
          />

          <!-- The caption names the frame, so it has to change with it. It is
               keyed on the caption text rather than the index so Vue replaces
               the node — a text swap in place would read as a typo correcting
               itself. `aria-live` is deliberately absent: a screen reader
               announcing a new caption every four seconds while the user is
               trying to read the headline is an interruption, and the same
               information is already in each frame's alt text and on the
               rail's stops. -->
          <Transition name="cap">
            <figcaption
              v-if="activeFrame"
              :key="activeFrame.caption"
              class="hero-caption spec-key"
            >
              {{ activeFrame.caption }}
            </figcaption>
          </Transition>
        </figure>
      </div>

      <!-- ── The rail ───────────────────────────────────────────────────
           The headline promises 2–3 days. Previously a datasheet row restated
           that promise in smaller type, which is assertion twice over, not
           evidence. Here the promise is drawn: a stop on a line for each thing
           the buyer can picture happening, the last one gold because it is the
           one he actually wants.
           Square nodes, not dots — this system has no rounded corners, and a
           circle on the rail would be the one radius on the page. -->
      <div v-if="timeline.length" class="hero-rail">
        <!-- The column count at sm+ is the stop count: a count that does not
             match leaves a dead cell and stops the rail short of the plate's
             edge, which reads as a layout bug rather than as a sequence. It has
             to move whenever `timeline` changes length. Below sm it stays at 2
             — three stacked rows would push the rail off a 667px screen, and
             four stops fill exactly two. -->
        <ol class="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-4">
          <!-- Each stop is a button, not because the hero needed controls but
               because the rail is now the only thing that says which
               photograph you are looking at — and a state indicator you cannot
               operate is a worse deal than one you can. It also gives the
               sequence keyboard access, which hover-to-pause alone never
               would. -->
          <li
            v-for="(step, i) in timeline"
            :key="step.mark"
            class="hero-step"
            :class="{ 'is-active': i === active, 'is-done': i < active }"
            :style="{ '--d': `${700 + i * 90}ms` }"
          >
            <span class="hero-node" aria-hidden="true" />
            <!-- The fill runs the length of the active stop's rule over that
                 frame's hold, so the rail reads as a progress bar for the
                 photograph above it. Keyed on `active` and `playing` together:
                 without the remount Motion sees the same target value and
                 leaves the previous run in place, and the bar stops tracking
                 the moment anyone pauses. -->
            <Motion
              :key="`${active}-${playing}`"
              class="hero-step-fill"
              aria-hidden="true"
              :initial="{ scaleX: i < active ? 1 : 0 }"
              :animate="{ scaleX: i <= active ? 1 : 0 }"
              :transition="
                i === active && playing
                  ? { duration: HOLD_S, ease: 'linear' }
                  : { duration: 0.32, ease: EASE_OUT }
              "
            />
            <button
              type="button"
              class="hero-step-btn"
              :aria-current="i === active ? 'true' : undefined"
              @click="go(i)"
            >
              <span class="hero-mark spec-key block !text-white/40">{{ step.mark }}</span>
              <span class="hero-step-label mt-1.5 block text-[13px] leading-snug text-white/75">
                {{ step.label }}
              </span>
              <span class="sr-only">— tampilkan foto tahap ini</span>
            </button>
          </li>
        </ol>

        <!-- A number printed on the page is a fact; a button that opens
             WhatsApp is a promise. For an Indonesian B2B buyer the former is a
             trust signal in its own right, and it costs one line. The hours are
             there because someone whose line stopped at 07:00 wants to know
             whether anyone will actually answer. -->
        <div class="hero-contact">
          <a :href="`tel:+${contactInfo.waUtama}`" class="hero-tel num text-[15px] font-semibold text-white">
            {{ phone }}
          </a>
          <span class="spec-key mt-1 block !text-white/40">{{ contactInfo.jamSingkat }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Ground ─────────────────────────────────────────────────────────── */
.hero {
  background:
    linear-gradient(152deg, rgb(var(--ink)) 0%, rgb(var(--steel)) 100%);
  position: relative;
  isolation: isolate;
}
/* Blueprint tooth. Kept faint enough to be felt rather than seen, and faded
   out down the page so it never fights the photograph's edge. */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 32px 32px;
  -webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 78%);
  mask-image: linear-gradient(180deg, #000 0%, transparent 78%);
}

/* ── Grid ───────────────────────────────────────────────────────────── */
.hero-grid {
  align-items: stretch;
}
.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3.5rem 1.25rem 3rem;
}
@media (min-width: 768px) {
  .hero-copy {
    padding: 4.5rem 2rem 4rem;
  }
}
@media (min-width: 1024px) {
  .hero-copy {
    /* Bottom padding only large enough to clear the rail; the column is
       justified to centre so the block sits against the photograph's mass
       rather than hanging from the top rule. */
    padding: 5.5rem 3rem 5rem 2rem;
    justify-content: center;
  }
}

.hero-h1 {
  /* The vw term is doing real work here, not decoration. Because the headline
     carries hard breaks, its longest line cannot reflow to escape a narrow
     screen — so the type has to shrink to fit instead. 8.4vw keeps the longest
     line ("Sambung lagi dalam", 18 characters) inside the column at every width
     from 320px up, and the 3.375rem ceiling keeps it inside the 7-column cell
     at the point the desktop grid engages. Raising either end re-introduces
     horizontal overflow on small phones. */
  font-size: clamp(1.85rem, 8.4vw, 3.375rem);
  line-height: 0.95;
  letter-spacing: -0.032em;
  margin-top: 1.75rem;
}

/* ── Figure ─────────────────────────────────────────────────────────── */
.hero-figure {
  position: relative;
  margin: 0;
  overflow: hidden;
  /* On mobile the photo is a band under the copy, tall enough to read but not
     so tall it pushes the rail off a 667px screen. */
  aspect-ratio: 4 / 3;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
@media (min-width: 640px) {
  .hero-figure {
    aspect-ratio: 16 / 9;
  }
}
@media (min-width: 1024px) {
  .hero-figure {
    /* Fills the row instead of dictating it — the copy column sets the height
       and the photograph runs the full span of it, edge to edge. */
    aspect-ratio: auto;
    min-height: 34rem;
    border-top: 0;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
}
/* The four frames occupy the same cell, stacked. `position: absolute` rather
   than a grid stack because the figure is already the positioning context for
   the inset and the caption, and one mechanism holding all three is easier to
   reason about than two.
   Each frame's object-position is set inline from its own `focus` — see the
   note in data/homepage.ts for why a shared anchor does not work across four
   photographs that were not composed alike.
   `will-change` is stated because these are large plates being scaled
   continuously; without it Safari re-rasterises the layer on every frame. */
.hero-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform, opacity;
}

/* ── Sequence control ───────────────────────────────────────────────────
   Deliberately quiet — it is a legal requirement and an escape hatch, not a
   feature anyone came here for. It lifts to full contrast on hover and focus,
   and its hit area is 44px even though the glyph inside is 10px. */
.hero-toggle {
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  color: rgba(255, 255, 255, 0.55);
  background: rgb(var(--ink) / 0.35);
  transition:
    color 140ms var(--ease-out),
    background-color 140ms var(--ease-out);
}
.hero-toggle:focus-visible {
  color: #fff;
  background: rgb(var(--ink) / 0.75);
}
@media (hover: hover) and (pointer: fine) {
  .hero-toggle:hover {
    color: #fff;
    background: rgb(var(--ink) / 0.75);
  }
}
.hero-toggle-pause {
  width: 9px;
  height: 11px;
  border-left: 3px solid currentColor;
  border-right: 3px solid currentColor;
}
.hero-toggle-play {
  width: 0;
  height: 0;
  border-left: 10px solid currentColor;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
}

/* ── Caption ──
   Cross-faded rather than swapped: at 11px the text is small enough that a
   hard replace registers as a glitch instead of a change. */
.cap-enter-active,
.cap-leave-active {
  transition: opacity 320ms var(--ease-out);
}
.cap-enter-from,
.cap-leave-to {
  opacity: 0;
}
.cap-leave-active {
  position: absolute;
}

.hero-detail {
  position: absolute;
  bottom: 0;
  left: 0;
  /* Sized to leave the caption a clear run along the bottom edge, and small
     enough to read as a callout rather than a second photograph competing with
     the first — at half the width it supports the wide shot instead of
     arguing with it. */
  width: 46%;
  max-width: 12rem;
  object-fit: cover;
  aspect-ratio: 3 / 2;
  /* The border is the ground colour, so the plate reads as cut into the
     photograph rather than laid on top of it. No shadow — sheet metal does not
     float, and this system has never once used one. */
  border: 6px solid rgb(var(--ink));
  border-left: 0;
  border-bottom: 0;
}
@media (min-width: 1024px) {
  .hero-detail {
    width: 52%;
    max-width: 13.5rem;
  }
}

.hero-caption {
  position: absolute;
  right: 0;
  bottom: 0;
  /* left is set so the caption can never run underneath the detail plate —
     it ran straight across it on the first pass, which read as one caption
     for two pictures. */
  left: 50%;
  padding: 0.75rem 1rem;
  text-align: right;
  color: rgba(255, 255, 255, 0.7) !important;
  /* Scrim rather than a solid plate: the caption has to stay legible over a
     photograph whose bottom-right corner is a bright blue belt, without
     stamping a rectangle onto it. */
  background: linear-gradient(
    to top left,
    rgb(var(--ink) / 0.88),
    rgb(var(--ink) / 0) 72%
  );
}

/* One line or nothing — wrapped, an 11px tracked mono caption stops reading as
   a caption and starts reading as a second paragraph.

   But only from 640px up. `white-space: nowrap` applied at every width, and at
   360px the caption box is half the figure minus padding (~147px): anything
   longer than about 19 characters overflowed leftward under `text-align: right`
   and was silently clipped by the figure's `overflow: hidden` — across the
   detail plate that `left: 50%` above exists to avoid. Below sm the caption is
   allowed to wrap, so a caption that outgrows the box degrades to two lines
   instead of losing its end. */
@media (min-width: 640px) {
  .hero-caption {
    white-space: nowrap;
  }
}

/* ── Rail ───────────────────────────────────────────────────────────── */
.hero-rail {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2.25rem 1.25rem 2.5rem;
}
@media (min-width: 768px) {
  .hero-rail {
    padding: 2.25rem 2rem 2.5rem;
  }
}
@media (min-width: 1024px) {
  .hero-rail {
    flex-direction: row;
    align-items: flex-start;
    gap: 3rem;
  }
}

.hero-step {
  position: relative;
  padding-top: 1.375rem;
}
/* The line itself. Drawn per-step rather than as one rule behind the row, so
   each segment can arrive in sequence and so the last one can stop at the
   final node instead of running off into the contact block. */
.hero-step::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.16);
  transform-origin: left center;
}
/* The gold running over the grey. Drawn as a second rule on top of the one
   above rather than by animating that one's colour, so a stop already passed
   can stay filled while the current one is still drawing. */
.hero-step-fill {
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: rgb(var(--accent) / 0.7);
  transform-origin: left center;
}

.hero-node {
  position: absolute;
  top: -3px;
  left: 0;
  width: 7px;
  height: 7px;
  background: rgba(255, 255, 255, 0.28);
  transition:
    background-color 240ms var(--ease-out),
    width 240ms var(--ease-out),
    height 240ms var(--ease-out),
    top 240ms var(--ease-out);
}
/* A stop the sequence has already been through. Brighter than pending, but
   still not gold — gold on the rail means "this is what you are looking at",
   and it can only mean one thing at a time. */
.hero-step.is-done .hero-node {
  background: rgba(255, 255, 255, 0.55);
}
/* The stop showing on the plate above. The only gold on the rail. */
.hero-step.is-active .hero-node {
  background: rgb(var(--accent));
  width: 9px;
  height: 9px;
  top: -4px;
}
.hero-step .hero-step-label {
  transition:
    color 240ms var(--ease-out),
    font-weight 240ms var(--ease-out);
}
.hero-step.is-active .hero-step-label {
  color: #fff;
  font-weight: 500;
}
/* The last stop keeps a brighter label at all times — it is the one the buyer
   actually came for, and it should not go dim just because the sequence has
   moved on. */
.hero-step:last-child .hero-step-label {
  color: rgba(255, 255, 255, 0.9);
}

/* The button carries no chrome: the node, the mark and the label already draw
   the stop, and a bordered control around each would turn a timeline into a
   toolbar. The whole stop is the hit area, top rule to the foot of the label,
   which on a phone is comfortably over 44px tall. */
.hero-step-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding-bottom: 0.25rem;
  cursor: pointer;
}
.hero-step-btn:focus-visible {
  outline: 2px solid rgb(var(--accent));
  outline-offset: 4px;
}
@media (hover: hover) and (pointer: fine) {
  .hero-step-btn:hover .hero-step-label {
    color: #fff;
  }
  .hero-step-btn:hover ~ .hero-node,
  .hero-step:hover .hero-node {
    background: rgba(255, 255, 255, 0.7);
  }
  .hero-step.is-active:hover .hero-node {
    background: rgb(var(--accent));
  }
}

.hero-contact {
  flex-shrink: 0;
  padding-top: 1.375rem;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}
@media (min-width: 1024px) {
  .hero-contact {
    text-align: right;
    min-width: 12rem;
  }
}

/* Explicit property, never `transition: all`. */
.hero-tel {
  transition: color 140ms ease;
}
.hero-tel:active {
  color: rgb(var(--accent));
}
@media (hover: hover) and (pointer: fine) {
  .hero-tel:hover {
    color: rgb(var(--accent));
  }
}

/* ── Entrance ───────────────────────────────────────────────────────────
   Declared only inside `no-preference`, so a reduced-motion visitor gets no
   animation at all and — critically — no `animation-fill-mode: both` holding
   content at opacity 0. Content is visible by default and the motion is the
   opt-in, which is the only ordering that cannot strand text invisible if
   anything goes wrong.
   Delays are carried on --d per element so the sequence reads in the template
   as a running time rather than being scattered across a dozen classes. Order:
   photograph, then the claim top to bottom, then the rail drawing left to
   right — the same order a reader takes it in. */
@media (prefers-reduced-motion: no-preference) {
  .reveal {
    animation: hero-in 560ms var(--ease-out) both;
    animation-delay: var(--d, 0ms);
  }

  /* The plate's own entrance is gone from CSS. Motion writes `transform` and
     `opacity` inline on every frame to run the drift and the cross-fade, and a
     keyframe animation on the same two properties wins over the inline style
     for as long as it is running — so the settle-in played, then handed a
     visibly different scale back to Motion at the 900ms mark. The frames now
     enter through Motion's own `initial`, which is the same mechanism that
     will be moving them a second later. */

  .hero-detail {
    animation: hero-in 560ms var(--ease-out) both;
    animation-delay: 620ms;
  }

  .hero-step::before {
    animation: hero-rail 420ms var(--ease-out) both;
    animation-delay: var(--d);
  }
  .hero-mark,
  .hero-step-label,
  .hero-node {
    animation: hero-in 420ms var(--ease-out) both;
    animation-delay: calc(var(--d) + 160ms);
  }
}

@keyframes hero-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-rail {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
</style>
