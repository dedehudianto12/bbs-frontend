<script setup lang="ts">
// "Backed by"-style strip: label cell + one bordered cell per sector.
defineProps<{
  industries: { name: string; description: string; slug: string }[]
}>()
</script>

<template>
  <section class="bg-paper">
    <div class="frame border-b border-line">
      <div class="grid sm:grid-cols-2 lg:grid-cols-5">
        <div class="flex items-center border-b border-line px-6 py-6 lg:border-b-0">
          <p class="text-sm leading-snug text-muted">
            Melayani sektor industri utama di Indonesia.
          </p>
        </div>
        <div
          v-for="(industry, i) in industries"
          :key="industry.slug"
          class="flex min-h-[86px] items-center justify-center border-b border-line px-4 py-6 text-center sm:border-l lg:border-b-0"
          :title="industry.description"
        >
          <span class="text-[15px] font-semibold tracking-tight text-ink/70 transition-colors hover:text-ink">
            {{ industry.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
