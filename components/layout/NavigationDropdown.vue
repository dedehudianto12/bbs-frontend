<script setup lang="ts">
defineProps<{
  label: string
  href: string
  items: { label: string; href: string }[]
}>()

const isOpen = ref(false)
const closeTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const dropdownRef = ref<HTMLDivElement | null>(null)
const activeIndex = ref(-1)

function open() {
  if (closeTimer.value) {
    clearTimeout(closeTimer.value)
    closeTimer.value = null
  }
  isOpen.value = true
}

function close() {
  closeTimer.value = setTimeout(() => {
    isOpen.value = false
    activeIndex.value = -1
  }, 150)
}

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return

  if (e.key === 'Escape') {
    isOpen.value = false
    activeIndex.value = -1
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, items.length - 1)
    return
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
    return
  }

  if (e.key === 'Enter' && activeIndex.value >= 0) {
    e.preventDefault()
    const item = items[activeIndex.value]
    if (item) navigateTo(item.href)
    isOpen.value = false
    activeIndex.value = -1
  }
}

// ponytail: close on route change
const route = useRoute()
watch(() => route.path, () => { isOpen.value = false; activeIndex.value = -1 })
</script>

<template>
  <!-- Desktop: hover dropdown -->
  <div
    class="hidden md:block relative"
    @mouseenter="open"
    @mouseleave="close"
  >
    <NuxtLink
      :to="href"
      class="text-sm font-medium text-neutral hover:text-ink transition-colors flex items-center gap-1 py-2"
    >
      {{ label }}
      <svg
        class="w-3 h-3 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 12 12"
      >
        <path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" />
      </svg>
    </NuxtLink>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="isOpen"
        ref="dropdownRef"
        class="absolute top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-md py-2 w-[220px] z-50"
        @keydown="onKeydown"
      >
        <NuxtLink
          v-for="(item, i) in items"
          :key="item.label"
          :to="item.href"
          class="block px-4 py-2.5 text-sm text-neutral hover:text-ink hover:bg-[#F5F5F5] transition-colors cursor-pointer"
          :class="{ 'bg-[#F5F5F5] text-ink': i === activeIndex }"
        >
          {{ item.label }}
        </NuxtLink>
      </div>
    </Transition>
  </div>

  <!-- Mobile: accordion -->
  <div class="md:hidden">
    <div class="flex items-center justify-between">
      <NuxtLink :to="href" class="text-neutral hover:text-ink transition-colors py-1">
        {{ label }}
      </NuxtLink>
      <button
        class="p-1 text-neutral hover:text-ink transition-colors"
        @click="isOpen = !isOpen"
        aria-label="Toggle submenu"
      >
        <svg
          class="w-3 h-3 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
          viewBox="0 0 12 12"
        >
          <path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </button>
    </div>
    <div v-show="isOpen" class="ml-4 mt-1 flex flex-col gap-1">
      <NuxtLink
        v-for="item in items"
        :key="item.label"
        :to="item.href"
        class="text-sm text-neutral hover:text-ink transition-colors py-1"
        @click="isOpen = false"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </div>
</template>
