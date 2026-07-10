<script setup lang="ts">
defineProps<{
  label: string
  link: string
  subItems: { label: string; link: string }[]
}>()

const isOpen = ref(false)
</script>

<template>
  <!-- Desktop: hover dropdown -->
  <div class="hidden md:block relative group">
    <NuxtLink
      :to="link"
      class="text-neutral hover:text-ink transition-colors flex items-center gap-1"
    >
      {{ label }}
      <svg class="w-3 h-3" viewBox="0 0 12 12"><path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
    </NuxtLink>
    <div class="absolute top-full left-0 mt-1 bg-white border border-border rounded shadow-sm py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
      <NuxtLink
        v-for="item in subItems"
        :key="item.label"
        :to="item.link"
        class="block px-4 py-2 text-sm text-neutral hover:text-ink hover:bg-bg-soft transition-colors"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </div>

  <!-- Mobile: accordion -->
  <div class="md:hidden">
    <div class="flex items-center justify-between">
      <NuxtLink :to="link" class="text-neutral hover:text-ink transition-colors">
        {{ label }}
      </NuxtLink>
      <button
        class="p-1 text-neutral hover:text-ink transition-colors"
        @click="isOpen = !isOpen"
        aria-label="Toggle submenu"
      >
        <svg
          class="w-3 h-3 transition-transform"
          :class="isOpen ? 'rotate-180' : ''"
          viewBox="0 0 12 12"
        ><path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
      </button>
    </div>
    <div v-show="isOpen" class="ml-4 mt-1 flex flex-col gap-1">
      <NuxtLink
        v-for="item in subItems"
        :key="item.label"
        :to="item.link"
        class="text-sm text-neutral hover:text-ink transition-colors py-1"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </div>
</template>
