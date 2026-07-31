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
      <!-- Explicit properties, never transition-all. Toasts are added rapidly,
           and CSS transitions retarget mid-flight where keyframes would restart
           from zero. Enters and exits from the same edge so swipe-to-dismiss
           would feel spatially consistent. -->
      <TransitionGroup
        enter-from-class="translate-x-full opacity-0"
        enter-active-class="transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        leave-to-class="translate-x-full opacity-0"
        leave-active-class="transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
        move-class="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <div
          v-for="t in toasts"
          :key="t.id"
          :class="t.leaving ? 'pointer-events-none' : 'pointer-events-auto'"
          class="relative flex w-[360px] items-start gap-3 overflow-hidden rounded-none border border-line bg-white"
        >
          <!-- Left accent bar. Padding moved off the container so the bar sits
               flush against the hairline border. -->
          <div class="absolute inset-y-0 left-0 w-1" :class="barMap[t.type]" />
          <div class="flex flex-1 items-start gap-3 p-4">

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
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
