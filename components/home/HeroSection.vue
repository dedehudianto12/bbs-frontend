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
  <section class="bg-bg-soft py-20 md:py-28">
    <div class="mx-auto max-w-3xl px-4 text-center">
      <h1 class="text-ink text-3xl md:text-5xl font-bold leading-tight">
        {{ headline }}
      </h1>
      <p class="mt-6 text-neutral text-base md:text-lg leading-relaxed max-w-xl mx-auto">
        {{ subheadline }}
      </p>
      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink
          :to="primaryLink"
          class="inline-block bg-gold text-ink font-semibold px-6 py-3 rounded hover:bg-gold-dark transition-colors"
        >
          {{ primaryCTA }}
        </NuxtLink>
        <NuxtLink
          v-if="secondaryCTA && secondaryLink"
          :to="secondaryLink"
          class="inline-block border border-neutral text-neutral font-semibold px-6 py-3 rounded hover:border-ink hover:text-ink transition-colors"
        >
          {{ secondaryCTA }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
