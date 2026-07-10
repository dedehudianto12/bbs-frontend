<script setup lang="ts">
const { data } = await useAsyncData('industries', useIndustries)
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="mx-auto max-w-6xl px-4">
      <span class="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
        Industri yang Dilayani
      </span>

      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="industry in data?.data"
          :key="industry.id"
          class="border border-border rounded-lg p-6"
        >
          <p class="text-ink font-bold">{{ industry.name }}</p>
          <p class="mt-2 text-neutral text-sm">{{ industry.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
