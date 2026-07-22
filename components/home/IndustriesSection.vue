<script setup lang="ts">
defineProps<{
  industries: { name: string; description: string; slug: string }[]
}>()
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="mx-auto max-w-6xl px-4">
      <span class="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
        Industri yang Dilayani
      </span>

      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="industry in industries"
          :key="industry.slug"
          class="border border-border rounded-lg p-6"
        >
          <p class="text-ink font-bold">{{ industry.name }}</p>
          <p class="mt-2 text-neutral text-sm">{{ industry.description }}</p>
        </div>
      </div>

      <div class="mt-10 text-center">
        <p class="text-neutral text-sm mb-3">Tidak melihat industri Anda?</p>
        <NuxtLink
          to="/kontak"
          class="inline-block bg-ink text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-gold hover:text-ink transition-colors"
        >
          Hubungi Kami
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
