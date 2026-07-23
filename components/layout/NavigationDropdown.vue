<script setup lang="ts">
const props = defineProps<{
  label: string
  href: string
  items: { label: string; href: string }[]
}>()

const isOpen = ref(false)
const closeTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const dropdownRef = ref<HTMLDivElement | null>(null)
const activeIndex = ref(-1)

const route = useRoute()

const isActive = computed(() =>
  props.items.some((item) => route.path.startsWith(item.href))
)

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
  if (e.key === 'Escape') { isOpen.value = false; activeIndex.value = -1; return }
  if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex.value = Math.min(activeIndex.value + 1, props.items.length - 1); return }
  if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex.value = Math.max(activeIndex.value - 1, 0); return }
  if (e.key === 'Enter' && activeIndex.value >= 0) {
    e.preventDefault()
    const item = props.items[activeIndex.value]
    if (item) navigateTo(item.href)
    isOpen.value = false
    activeIndex.value = -1
  }
}

watch(() => route.path, () => { isOpen.value = false; activeIndex.value = -1 })
</script>

<template>
  <!-- Desktop: hover dropdown -->
  <div class="relative hidden lg:block" @mouseenter="open" @mouseleave="close">
    <NuxtLink
      :to="href"
      class="relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors"
      :class="isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'"
    >
      {{ label }}
      <svg class="h-3 w-3 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" />
      </svg>
      <span v-if="isActive" class="absolute -bottom-[3px] left-3 right-3 h-px bg-accent" />
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
        class="absolute left-0 top-full z-50 mt-2 w-[230px] rounded-xl border border-line bg-white p-1.5 shadow-xl shadow-ink/5"
        @keydown="onKeydown"
      >
        <NuxtLink
          v-for="(item, i) in items"
          :key="item.label"
          :to="item.href"
          class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors"
          :class="i === activeIndex || route.path.startsWith(item.href)
            ? 'bg-paper-soft text-ink'
            : 'text-ink/60 hover:bg-paper-soft hover:text-ink'"
        >
          <span class="text-[10px] font-semibold tabular-nums text-accent/70">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ item.label }}
        </NuxtLink>
      </div>
    </Transition>
  </div>

  <!-- Mobile: accordion -->
  <div class="border-b border-line py-1 lg:hidden">
    <div class="flex items-center justify-between">
      <NuxtLink
        :to="href"
        class="py-2 text-[15px] font-medium transition-colors"
        :class="isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'"
      >
        {{ label }}
      </NuxtLink>
      <button
        class="p-2 text-ink/40 transition-colors hover:text-ink"
        @click="isOpen = !isOpen"
        aria-label="Toggle submenu"
      >
        <svg class="h-3.5 w-3.5 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </button>
    </div>
    <div v-show="isOpen" class="mb-2 ml-1 flex flex-col border-l border-line pl-4">
      <NuxtLink
        v-for="item in items"
        :key="item.label"
        :to="item.href"
        class="py-2 text-sm text-ink/55 transition-colors hover:text-ink"
        @click="isOpen = false"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </div>
</template>
