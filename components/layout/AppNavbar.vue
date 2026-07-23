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
  <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
    <div class="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="text-lg font-bold shrink-0 tracking-tight">
        <span class="text-ink">BBS</span>
        <span class="text-gold">Conveyor</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-0.5">
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
            class="relative text-sm font-medium px-3 py-2 transition-colors"
            :class="isActive(item) ? 'text-ink' : 'text-neutral hover:text-ink'"
          >
            {{ item.label }}
            <span
              v-if="isActive(item)"
              class="absolute bottom-0 left-3 right-3 h-0.5 bg-gold rounded-full"
            />
          </NuxtLink>
        </template>
      </div>

      <!-- Desktop CTA -->
      <div class="hidden md:block shrink-0">
        <Button :href="ctaHref" variant="primary" size="sm" external>
          {{ ctaLabel }}
        </Button>
      </div>

      <!-- Hamburger -->
      <button
        class="md:hidden flex flex-col gap-1.5 p-2"
        @click="isOpen = !isOpen"
        aria-label="Toggle menu"
      >
        <span class="block w-5 h-0.5 bg-ink transition-transform duration-200" :class="isOpen ? 'rotate-45 translate-y-2' : ''" />
        <span class="block w-5 h-0.5 bg-ink transition-opacity duration-200" :class="isOpen ? 'opacity-0' : ''" />
        <span class="block w-5 h-0.5 bg-ink transition-transform duration-200" :class="isOpen ? '-rotate-45 -translate-y-2' : ''" />
      </button>
    </div>

    <!-- Mobile panel -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
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
            class="text-neutral hover:text-ink transition-colors py-1"
            :class="isActive(item) ? 'text-ink font-medium' : ''"
            @click="isOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
        <Button
          :href="ctaHref"
          variant="primary"
          class="mt-2 text-center"
          external
          @click="isOpen = false"
        >
          {{ ctaLabel }}
        </Button>
      </div>
    </Transition>
  </nav>
</template>
