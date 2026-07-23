<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  to?: string
  external?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
})
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
      variant === 'primary' && 'bg-ink text-white hover:bg-gold hover:text-ink',
      variant === 'secondary' && 'bg-bg-soft text-ink hover:bg-border',
      variant === 'outline' && 'border border-neutral text-ink hover:border-ink',
      size === 'sm' && 'text-xs px-3 py-1.5 rounded',
      size === 'lg' && 'text-base px-8 py-3.5 rounded-lg gap-2',
      size === 'md' && 'text-sm px-6 py-2.5 rounded-lg gap-2',
    ]"
  >
    <slot />
  </NuxtLink>

  <a
    v-else-if="href"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
      variant === 'primary' && 'bg-ink text-white hover:bg-gold hover:text-ink',
      variant === 'secondary' && 'bg-bg-soft text-ink hover:bg-border',
      variant === 'outline' && 'border border-neutral text-ink hover:border-ink',
      size === 'sm' && 'text-xs px-3 py-1.5 rounded',
      size === 'lg' && 'text-base px-8 py-3.5 rounded-lg gap-2',
      size === 'md' && 'text-sm px-6 py-2.5 rounded-lg gap-2',
    ]"
  >
    <slot />
  </a>

  <button
    v-else
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
      variant === 'primary' && 'bg-ink text-white hover:bg-gold hover:text-ink',
      variant === 'secondary' && 'bg-bg-soft text-ink hover:bg-border',
      variant === 'outline' && 'border border-neutral text-ink hover:border-ink',
      size === 'sm' && 'text-xs px-3 py-1.5 rounded',
      size === 'lg' && 'text-base px-8 py-3.5 rounded-lg gap-2',
      size === 'md' && 'text-sm px-6 py-2.5 rounded-lg gap-2',
    ]"
  >
    <slot />
  </button>
</template>
