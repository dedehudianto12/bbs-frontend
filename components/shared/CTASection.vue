<script setup lang="ts">
defineProps<{
  headline: string
  description: string
  buttonText: string
  buttonLink: string
}>()
</script>

<template>
  <section class="py-16 md:py-24 bg-bg-soft">
    <div class="max-w-2xl mx-auto px-4 text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-ink tracking-tight">{{ headline }}</h2>
      <p class="mt-4 text-neutral leading-relaxed">{{ description }}</p>
      <div class="mt-8">
        <Button :to="buttonLink" variant="primary" size="lg">
          {{ buttonText }}
        </Button>
      </div>
    </div>
  </section>
</template>
