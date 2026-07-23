<script setup lang="ts">
// voidzero-style buttons: compact, rounded-lg, quiet. `invert` adapts to dark bands.
// Legacy variant names (primary/secondary/outline/accent) stay as aliases so
// existing call-sites keep working.
const props = withDefaults(defineProps<{
  variant?: 'solid' | 'white' | 'ghost' | 'link' | 'accent' | 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  to?: string
  external?: boolean
  invert?: boolean
  arrow?: boolean
}>(), {
  variant: 'solid',
  size: 'md',
  invert: false,
  arrow: false,
})

const resolvedVariant = computed(() => {
  switch (props.variant) {
    case 'primary': return 'solid'
    case 'accent': return 'solid'
    case 'secondary': return 'white'
    case 'outline': return 'white'
    default: return props.variant
  }
})

const isLink = computed(() => resolvedVariant.value === 'link')
const showArrow = computed(() => props.arrow || isLink.value)

const base = 'group inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap'

const sizeClasses = computed(() => {
  if (isLink.value) return 'text-sm'
  return {
    sm: 'text-[13px] px-3.5 py-1.5 rounded-lg',
    md: 'text-sm px-4 py-2 rounded-lg',
    lg: 'text-[15px] px-5 py-2.5 rounded-lg',
  }[props.size]
})

const variantClasses = computed(() => {
  const inv = props.invert
  switch (resolvedVariant.value) {
    case 'solid':
      // primary action = safety orange on light; white on the steel anchor
      return inv
        ? 'bg-white text-ink hover:bg-white/85'
        : 'bg-accent text-white shadow-sm shadow-accent/20 hover:bg-accent-glow'
    case 'white':
      // the signature voidzero button: white, hairline border
      return inv
        ? 'bg-white text-ink border border-transparent hover:bg-white/85'
        : 'bg-white text-ink border border-line shadow-sm hover:border-ink/25'
    case 'ghost':
      return inv
        ? 'border border-white/20 text-white hover:bg-white/10 hover:border-white/35'
        : 'border border-line text-ink hover:bg-ink/[0.04] hover:border-ink/25'
    case 'link':
      return inv
        ? 'text-white/70 hover:text-white'
        : 'text-ink hover:text-accent'
    default:
      return ''
  }
})

const classes = computed(() => [base, sizeClasses.value, variantClasses.value])

const NuxtLink = resolveComponent('NuxtLink')
const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    :to="to || undefined"
    :href="href || undefined"
    :target="href && external ? '_blank' : undefined"
    :rel="href && external ? 'noopener noreferrer' : undefined"
    :class="classes"
  >
    <slot />
    <svg
      v-if="showArrow"
      class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </component>
</template>
