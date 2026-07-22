<script setup lang="ts">
defineProps<{
  items: { title: string; description: string }[]
}>()
</script>

<template>
  <section class="py-16 md:py-24 bg-bg-soft">
    <div class="mx-auto max-w-6xl px-4">
      <span class="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
        Kenapa Pilih BBS Conveyor
      </span>

      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div
          v-for="(v, i) in items"
          :key="v.title"
          class="text-center"
        >
          <div class="mx-auto w-10 h-10 rounded-full bg-gold flex items-center justify-center text-ink font-bold text-sm">
            {{ i + 1 }}
          </div>
          <p class="mt-3 text-ink font-bold text-sm">{{ v.title }}</p>
          <p class="mt-2 text-neutral text-sm leading-relaxed">{{ v.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
