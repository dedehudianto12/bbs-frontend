<script setup lang="ts">
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'reka-ui'
import { X } from '@lucide/vue'

defineProps<{
  open?: boolean
  title?: string
  description?: string
  size?: 'md' | 'lg'
}>()

const sizeClasses: Record<string, string> = {
  md: 'max-w-md',
  lg: 'max-w-2xl',
}

defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <DialogRoot :open="open" @update:open="$emit('update:open', $event)">
    <DialogTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      />
      <DialogContent
        :class="[
          'fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          sizeClasses[size ?? 'md'],
        ]"
      >
        <div class="flex items-start justify-between">
          <div class="space-y-1">
            <DialogTitle v-if="title" class="text-lg font-semibold text-neutral-900">
              {{ title }}
            </DialogTitle>
            <DialogDescription v-if="description" class="text-sm text-neutral-500">
              {{ description }}
            </DialogDescription>
          </div>
          <DialogClose
            class="ml-auto rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
          >
            <X class="h-4 w-4" />
          </DialogClose>
        </div>

        <div v-if="$slots.default" class="mt-4">
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
