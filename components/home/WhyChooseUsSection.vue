<script setup lang="ts">
const props = defineProps<{
  items: { title: string; description: string }[]
}>()

// items + one CTA cell, padded so the hairline grid fills evenly at 3 cols.
const fillerCount = computed(() => {
  const cells = props.items.length + 1
  return (3 - (cells % 3)) % 3
})
</script>

<template>
  <section class="bg-paper">
    <div class="frame border-b border-line">
      <div class="border-b border-line px-6 py-14 md:px-10 md:py-16">
        <SectionTitle
          eyebrow="Kenapa BBS Conveyor"
          title="Mitra terpercaya untuk conveyor industri"
          description="Lima alasan perusahaan di seluruh Indonesia mempercayakan kebutuhan conveyor mereka kepada kami."
        />
      </div>

      <div class="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(item, i) in items"
          :key="item.title"
          class="bg-paper p-7 md:p-9"
        >
          <span class="text-sm font-semibold tabular-nums text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="mt-5 text-lg font-semibold text-ink">{{ item.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ item.description }}</p>
        </div>

        <!-- CTA cell -->
        <NuxtLink
          to="/kontak"
          class="group flex flex-col justify-between bg-paper p-7 transition-colors hover:bg-paper-soft md:p-9"
        >
          <span class="text-lg leading-none text-accent">→</span>
          <div>
            <h3 class="text-lg font-semibold text-ink">Butuh bantuan memilih?</h3>
            <p class="mt-2 text-sm text-muted transition-colors group-hover:text-accent">
              Konsultasi gratis dengan tim kami
            </p>
          </div>
        </NuxtLink>

        <!-- fillers to keep the hairline grid even -->
        <div v-for="n in fillerCount" :key="`f-${n}`" class="hidden bg-paper lg:block" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>
