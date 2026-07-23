<script setup lang="ts">
defineProps<{
  items: { label: string; href?: string }[]
}>()
</script>

<template>
  <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm text-neutral mb-8">
    <template v-for="(item, i) in items" :key="item.label">
      <svg v-if="i > 0" class="w-3 h-3 shrink-0 text-neutral/50" viewBox="0 0 12 12">
        <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" />
      </svg>
      <NuxtLink
        v-if="item.href"
        :to="item.href"
        class="hover:text-ink transition-colors"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else class="text-ink font-medium">{{ item.label }}</span>
    </template>
  </nav>
</template>
