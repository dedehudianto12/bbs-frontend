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
        'belt-travel': 'belt-travel 4.5s linear infinite',
        // linear is required — constant motion with any easing visibly pulses
        marquee: 'marquee 42s linear infinite',
      },
    }
  },
  plugins: []
}
