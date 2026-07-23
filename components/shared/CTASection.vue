<script setup lang="ts">
defineProps<{
  headline: string
  description: string
  buttonText: string
  buttonLink: string
}>()
</script>

<template>
  <section class="bg-paper">
    <div class="frame border-b border-line">
      <div class="relative isolate overflow-hidden bg-paper-soft px-6 py-20 text-center md:px-10 md:py-28">
        <div class="pointer-events-none absolute inset-0 blueprint-grid opacity-70" aria-hidden="true" />
        <!-- restrained hazard cue -->
        <div class="hazard-stripe pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80" aria-hidden="true" />
        <div class="relative">
          <p class="eyebrow justify-center text-accent">
            Mulai sekarang
          </p>
          <h2 class="display mx-auto mt-5 max-w-2xl text-3xl text-ink md:text-[2.75rem]">
            {{ headline }}
          </h2>
          <p class="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
            {{ description }}
          </p>
          <div class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button :to="buttonLink" variant="solid" arrow>
              {{ buttonText }}
            </Button>
            <Button href="https://wa.me/6281234567890" external variant="white">
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
