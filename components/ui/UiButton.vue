<script setup lang="ts">
import { computed } from 'vue'

// The single pressable primitive for the public surface.
//
// This exists because the gold CTA class string was duplicated verbatim across
// HeroSection, CTASection, AppNavbar, produk/[slug] and jasa/[slug] (and the
// outline variant just as often), which meant :active press feedback could
// never land consistently — five of six CTAs shipped with transition-colors
// alone and gave no physical response to a click.

const props = withDefaults(
  defineProps<{
    /** Omit for a <button>. Internal path → NuxtLink. http/mailto/tel → <a target=_blank>. */
    href?: string
    variant?: 'accent' | 'ink' | 'outline' | 'ghost'
    size?: 'sm' | 'md'
    block?: boolean
    /** Force an external <a> for a path that doesn't look external. */
    external?: boolean
  }>(),
  { variant: 'accent', size: 'md', block: false, external: false },
)

const isExternal = computed(
  () => props.external || /^(https?:|mailto:|tel:)/.test(props.href ?? ''),
)

const VARIANTS = {
  accent: 'bg-accent text-white hover:bg-accent-glow',
  // For use on the gold band, where `accent` would be invisible
  ink: 'bg-ink text-white hover:bg-steel',
  outline:
    'border border-line bg-white text-ink hover:border-ink hover:bg-paper-soft',
  ghost: 'text-ink hover:bg-ink/5',
} as const

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-6 py-2.5 text-sm',
} as const

const classes = computed(() => [
  'ui-btn inline-flex select-none items-center justify-center gap-2 rounded-none font-semibold',
  VARIANTS[props.variant],
  SIZES[props.size],
  props.block ? 'w-full' : '',
])
</script>

<template>
  <a
    v-if="href && isExternal"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="classes"
  >
    <slot />
  </a>

  <NuxtLink v-else-if="href" :to="href" :class="classes">
    <slot />
  </NuxtLink>

  <button v-else type="button" :class="classes">
    <slot />
  </button>
</template>

<style scoped>
/* Explicit properties only — never `transition: all`. 140ms sits inside the
   100–160ms band for press feedback, and --ease-out is the system's single
   curve (mirrors EASE_OUT_CSS in utils/motion.ts). */
.ui-btn {
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    border-color 140ms ease,
    color 140ms ease;
}

/* Physical feedback: the interface confirms it heard the press. */
.ui-btn:active {
  transform: scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .ui-btn {
    transition:
      background-color 140ms ease,
      border-color 140ms ease,
      color 140ms ease;
  }
  .ui-btn:active {
    transform: none;
  }
}
</style>
