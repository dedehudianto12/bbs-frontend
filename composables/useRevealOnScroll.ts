import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Scroll-triggered entrance reveal.
 *
 * IntersectionObserver only *triggers* (cheap, not per-frame); the animation
 * itself is CSS — see the `[data-reveal]` block in assets/css/main.css. That
 * split matters here: the home page fires four parallel fetches on mount, and
 * rAF-driven motion drops frames while the main thread is busy, whereas CSS
 * animations run off it.
 *
 * Degradation is deliberate. An element only ever gets `data-reveal="out"`
 * (opacity 0) if it is below the fold *and* JS ran *and* motion is allowed.
 * SSR output, no-JS, no-IO, and prefers-reduced-motion all leave the element
 * with no attribute at all, which means fully visible. Content is never
 * trapped at opacity 0, and anything already painted in the first viewport is
 * left untouched so there is no hide-then-reveal flash.
 *
 * Usage:
 *   const { root } = useRevealOnScroll()
 *   <section ref="root"> <div data-reveal-item /> ... </section>
 *
 * With no `[data-reveal-item]` descendants the root element reveals as one.
 */
export function useRevealOnScroll(options: { stagger?: number } = {}) {
  const stagger = options.stagger ?? 50 // inside the 30–80ms band
  const root = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const el = root.value
    if (!el) return

    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const found = Array.from(
      el.querySelectorAll<HTMLElement>('[data-reveal-item]'),
    )
    const items = found.length ? found : [el]

    observer = new IntersectionObserver(
      (entries) => {
        // Stagger is computed per entering batch, not per document index — a
        // grid that enters together cascades, but a lone element further down
        // the page animates immediately instead of waiting out its index.
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, i) => {
            const target = entry.target as HTMLElement
            target.style.animationDelay = `${Math.min(i, 8) * stagger}ms`
            target.setAttribute('data-reveal', 'in')
            observer?.unobserve(target)
          })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    )

    for (const item of items) {
      // Already visible in the server-rendered paint — leave it alone.
      if (item.getBoundingClientRect().top < window.innerHeight * 0.9) continue
      item.setAttribute('data-reveal', 'out')
      observer.observe(item)
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return { root }
}
