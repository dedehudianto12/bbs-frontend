<script setup lang="ts">
import { CheckCircle, XCircle, Info, X } from '@lucide/vue'

const { toasts, dismiss } = useToast()

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
} as const

const barMap = {
  success: 'bg-signal',
  error: 'bg-accent',
  info: 'bg-steel',
} as const
</script>

<template>
  <Teleport to="body">
    <div
      v-if="toasts.length"
      class="pointer-events-none fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-2.5"
    >
      <TransitionGroup
        enter-from-class="translate-x-full opacity-0"
        enter-active-class="transition-all duration-300 ease-out"
        leave-to-class="translate-x-full opacity-0"
        leave-active-class="transition-all duration-250 ease-in"
      >
        <div
          v-for="t in toasts"
          :key="t.id"
          :class="t.leaving ? 'pointer-events-none' : 'pointer-events-auto'"
          class="relative flex w-[360px] items-start gap-3 overflow-hidden rounded-lg border border-line bg-white p-4 shadow-lg"
        >
          <!-- Left accent bar -->
          <div class="absolute inset-y-0 left-0 w-1" :class="barMap[t.type]" />

          <!-- Icon -->
          <component
            :is="iconMap[t.type]"
            :size="18"
            class="mt-0.5 shrink-0"
            :class="{
              'text-signal': t.type === 'success',
              'text-accent': t.type === 'error',
              'text-steel': t.type === 'info',
            }"
          />

          <!-- Message -->
          <p class="flex-1 text-[13px] font-medium leading-snug text-ink">
            {{ t.message }}
          </p>

          <!-- Close -->
          <button
            class="cursor-pointer -mr-0.5 -mt-0.5 rounded p-0.5 text-muted transition-colors hover:text-ink"
            @click="dismiss(t.id)"
          >
            <X :size="14" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
