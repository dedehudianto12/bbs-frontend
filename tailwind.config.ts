import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Steel: the single dark anchor (footer) ──
        steel: {
          DEFAULT: 'rgb(var(--steel) / <alpha-value>)',
          soft: 'rgb(var(--steel-soft) / <alpha-value>)',
        },
        // Back-compat alias — retired "void" band name now maps to steel
        void: {
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
        // ── Safety-orange accent ──
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          glow: 'rgb(var(--accent-glow) / <alpha-value>)',
        },
        // ── Operational signal green (status only) ──
        signal: {
          DEFAULT: 'rgb(var(--signal) / <alpha-value>)',
          glow: 'rgb(var(--signal-glow) / <alpha-value>)',
        },
        // Back-compat alias — old "jade" status green
        jade: {
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
        // mono retained for code samples only — never for UI labels
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 3px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 10px)',
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
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-up-fast': 'fade-up 0.22s cubic-bezier(0.22, 1, 0.36, 1) both',
        rise: 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        'belt-travel': 'belt-travel 4.5s linear infinite',
      },
    }
  },
  plugins: []
}
