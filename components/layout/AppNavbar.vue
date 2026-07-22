<script setup lang="ts">
interface NavChild { label: string; href: string }
interface NavItem { label: string; href: string; children?: NavChild[] }

defineProps<{
  navItems: NavItem[]
  ctaLabel: string
  ctaHref: string
}>()

const route = useRoute()
const isOpen = ref(false)

function isActive(item: NavItem): boolean {
  if (route.path === item.href) return true
  if (item.children?.some((c) => route.path.startsWith(c.href))) return true
  return false
}
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white border-b border-border">
    <div class="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="text-lg font-bold shrink-0">
        <span class="text-ink">BBS</span>
        <span class="text-gold">Conveyor</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-1">
        <template v-for="item in navItems" :key="item.label">
          <!-- Dropdown -->
          <NavigationDropdown
            v-if="item.children"
            :label="item.label"
            :href="item.href"
            :items="item.children"
          />
          <!-- Simple link -->
          <NuxtLink
            v-else
            :to="item.href"
            class="text-sm font-medium px-3 py-2 rounded transition-colors"
            :class="isActive(item) ? 'text-gold' : 'text-neutral hover:text-ink'"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </div>

      <!-- Desktop CTA -->
      <div class="hidden md:block shrink-0">
        <a
          :href="ctaHref"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-ink text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gold hover:text-ink transition-colors"
        >
          {{ ctaLabel }}
        </a>
      </div>

      <!-- Hamburger -->
      <button
        class="md:hidden flex flex-col gap-1.5 p-2"
        @click="isOpen = !isOpen"
        aria-label="Toggle menu"
      >
        <span class="block w-5 h-0.5 bg-ink transition-transform" :class="isOpen ? 'rotate-45 translate-y-2' : ''" />
        <span class="block w-5 h-0.5 bg-ink" :class="isOpen ? 'opacity-0' : ''" />
        <span class="block w-5 h-0.5 bg-ink transition-transform" :class="isOpen ? '-rotate-45 -translate-y-2' : ''" />
      </button>
    </div>

    <!-- Mobile panel -->
    <div v-show="isOpen" class="md:hidden border-t border-border bg-white px-4 pb-4 pt-2 flex flex-col gap-3">
      <template v-for="item in navItems" :key="item.label">
        <NavigationDropdown
          v-if="item.children"
          :label="item.label"
          :href="item.href"
          :items="item.children"
        />
        <NuxtLink
          v-else
          :to="item.href"
          class="text-neutral hover:text-ink transition-colors"
          @click="isOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
      </template>
      <a
        :href="ctaHref"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-ink text-white px-4 py-2 rounded-lg font-medium text-center hover:bg-gold hover:text-ink transition-colors"
        @click="isOpen = false"
      >
        {{ ctaLabel }}
      </a>
    </div>
  </nav>
</template>
