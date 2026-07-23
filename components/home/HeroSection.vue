<script setup lang="ts">
defineProps<{
  headline: string
  subheadline: string
  primaryCTA: string
  primaryLink: string
  secondaryCTA?: string
  secondaryLink?: string
}>()
</script>

<template>
  <section class="relative bg-bg-soft overflow-hidden">
    <!-- Subtle geometric pattern -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, var(--color-ink) 1px, transparent 0); background-size: 40px 40px;" />
    </div>

    <div class="relative mx-auto max-w-4xl px-4 py-20 md:py-32 text-center">
      <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.08] tracking-tight">
        {{ headline }}
      </h1>
      <p v-if="subheadline" class="mt-6 text-base md:text-lg text-neutral leading-relaxed max-w-2xl mx-auto">
        {{ subheadline }}
      </p>
      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button :to="primaryLink" variant="primary" size="lg">
          {{ primaryCTA }}
        </Button>
        <Button
          v-if="secondaryCTA && secondaryLink"
          :to="secondaryLink"
          variant="outline"
          size="lg"
        >
          {{ secondaryCTA }}
        </Button>
      </div>
    </div>
  </section>
</template>
