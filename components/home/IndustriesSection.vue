<script setup lang="ts">
defineProps<{
  industries: { name: string; description: string; slug: string }[]
}>()
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="mx-auto max-w-6xl px-4">
      <SectionTitle
        eyebrow="Industri yang Dilayani"
        title="Solusi Conveyor untuk Berbagai Sektor"
        description="Kami melayani beragam industri dengan solusi yang disesuaikan."
        align="center"
      />

      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="industry in industries"
          :key="industry.slug"
          class="group flex flex-col p-6 rounded-xl bg-white border border-border"
        >
          <div class="w-10 h-10 rounded-lg bg-bg-soft flex items-center justify-center text-gold mb-4">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
          </div>
          <h3 class="text-ink font-bold">{{ industry.name }}</h3>
          <p class="mt-2 text-neutral text-sm leading-relaxed flex-1">{{ industry.description }}</p>
        </div>
      </div>

      <div class="mt-12 text-center">
        <p class="text-neutral text-sm mb-4">Tidak melihat industri Anda?</p>
        <Button to="/kontak" variant="outline">
          Hubungi Kami
        </Button>
      </div>
    </div>
  </section>
</template>
