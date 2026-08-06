import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  darkMode: 'class',
  future: {
    // Gates every hover: / group-hover: utility behind
    // @media (hover: hover) and (pointer: fine). Touch devices fire :hover on
    // tap and leave elements stuck in the hovered state until the user taps
    // somewhere else — this fixes all of them at once.
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // ── Steel: the single dark anchor (footer) ──
        steel: {
          DEFAULT: 'rgb(var(--steel) / <alpha-value>)',
          soft: 'rgb(var(--steel-soft) / <alpha-value>)',
        },
        // ── Light surfaces ──
        paper: {
          DEFAULT: 'rgb(var(--paper) / <alpha-value>)',
          soft: 'rgb(var(--paper-soft) / <alpha-value>)',
        },
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        // ── Logo-gold accent (CTAs + status only, ~5% of canvas) ──
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          glow: 'rgb(var(--accent-glow) / <alpha-value>)',
        },
        // ── Operational signal green (status only) ──
        signal: {
          DEFAULT: 'rgb(var(--signal) / <alpha-value>)',
          glow: 'rgb(var(--signal-glow) / <alpha-value>)',
        },
        // ── Base-layer aliases (used by @apply in main.css) ──
        background: 'rgb(var(--paper) / <alpha-value>)',
        foreground: 'rgb(var(--ink) / <alpha-value>)',
        border: 'rgb(var(--line) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        // mono: datasheet keys/values, numerals, and code samples.
        // Never prose, never eyebrows (.eyebrow is tracked sans by design).
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      // Hard 0px geometry across the public surface. Pinned explicitly rather
      // than derived from --radius: calc(0rem - 3px) is invalid CSS and would
      // silently drop the declaration. `full` is retained because status dots
      // and signal indicators are circles by nature, not rounded UI corners.
      borderRadius: {
        none: '0',
        DEFAULT: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '9999px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        // one dash-period of the BrandMark belt overlay (pattern length 7.85)
        'belt-travel': {
          to: { strokeDashoffset: '-7.85' },
        },
        // One horizontal period of .hazard-stripe (main.css). That stripe is a
        // repeating-linear-gradient at -45deg with a 16px period measured along
        // its own axis; a purely horizontal shift only advances the phase by
        // cos(45°) of the distance travelled, so a seamless loop needs
        // 16 / cos(45°) = 22.627px, not 16px. Translating by anything else
        // leaves a visible jump at the loop point.
        //
        // Moved with transform rather than background-position so the strip is
        // composited instead of repainting a full-width band every frame for
        // the life of the page.
        'hazard-travel': {
          to: { transform: 'translateX(22.627px)' },
        },
        // Track is duplicated exactly once, so -50% is one full seam-free cycle
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-up-fast': 'fade-up 0.22s cubic-bezier(0.22, 1, 0.36, 1) both',
        rise: 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        // 2.2s, not the 4.5s this ran at originally. The glyph draws in a
        // 24-unit viewBox at 52% of the badge, so at the old 60px badge one
        // unit was ~1.3px and the dashes advanced 7.85 units in 4.5s — about
        // 2.3px per second, which is under the speed at which motion reads as
        // motion at all. The badge is now ~2x bigger and the period half as
        // long, which puts it near 10px/s: a deliberate crawl rather than a
        // logo that appears static until you stare at it.
        'belt-travel': 'belt-travel 2.2s linear infinite',
        // linear is required — constant motion with any easing visibly pulses
        'hazard-travel': 'hazard-travel 2.6s linear infinite',
        marquee: 'marquee 42s linear infinite',
      },
    }
  },
  plugins: []
}
