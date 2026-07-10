import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        gold: 'var(--color-gold)',
        'gold-dark': 'var(--color-gold-dark)',
        neutral: 'var(--color-neutral)',
        'bg-soft': 'var(--color-bg-soft)',
        border: 'var(--color-border)'
      }
    }
  },
  plugins: []
}
