import { ref, onMounted, onBeforeUnmount } from 'vue'

// Shared motion tokens — the single source for durations/easing across CSS
// keyframes (tailwind.config.ts), motion-v calls, and v-gsap tweens. New
// animations should pull from here instead of inventing inline values.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const // = tailwind 'fade-up' curve
export const EASE_OUT_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)'
export const EASE_OUT_GSAP = 'power2.out' // closest GSAP named equivalent

export const DUR = {
  fast: 0.22, // occasional micro-transitions (grid/filter entrances)
  base: 0.45, // scroll-triggered section entrances
  hero: 0.5, // hero assembly stagger
  draw: 0.9, // SVG line draw-in
  ticker: 1.4, // stat number count-up
} as const

// Reactive prefers-reduced-motion flag. Every JS-driven animation must
// collapse to its end state when this is true.
export function usePrefersReducedMotion() {
  const reduced = ref(false)
  onMounted(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = mq.matches
    const onChange = (e: MediaQueryListEvent) => {
      reduced.value = e.matches
    }
    mq.addEventListener('change', onChange)
    onBeforeUnmount(() => mq.removeEventListener('change', onChange))
  })
  return reduced
}
