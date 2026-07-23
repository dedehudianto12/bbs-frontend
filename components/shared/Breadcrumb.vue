<script setup lang="ts">
withDefaults(defineProps<{
  items: { label: string; href?: string }[]
  invert?: boolean
}>(), {
  invert: false,
})
</script>

<template>
  <nav
    aria-label="Breadcrumb"
    class="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em]"
    :class="invert ? 'text-white/45' : 'text-muted'"
  >
    <template v-for="(item, i) in items" :key="item.label">
      <span v-if="i > 0" class="shrink-0" :class="invert ? 'text-white/25' : 'text-muted/40'">/</span>
      <NuxtLink
        v-if="item.href"
        :to="item.href"
        class="transition-colors"
        :class="invert ? 'hover:text-white' : 'hover:text-ink'"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else :class="invert ? 'text-white' : 'text-ink'">{{ item.label }}</span>
    </template>
  </nav>
</template>
