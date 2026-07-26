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
            <NuxtLink :to="buttonLink" class="inline-flex items-center gap-2 rounded-md bg-[rgb(var(--accent))] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[rgb(var(--accent-glow))]">
              {{ buttonText }}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </NuxtLink>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-md border border-[rgb(var(--line))] bg-white px-6 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition-colors hover:bg-[rgb(var(--paper))]">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
