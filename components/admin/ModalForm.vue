<script setup lang="ts">
import { X } from '@lucide/vue'

defineProps<{ open: boolean; title: string; wide?: boolean }>()
defineEmits<{ close: [] }>()
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-ink/40 backdrop-blur-sm" @click="$emit('close')" />
      <!-- Panel -->
      <div class="relative mx-4 w-full max-h-[85vh] overflow-y-auto rounded-xl border border-line bg-white shadow-2xl" :class="wide ? 'max-w-5xl' : 'max-w-[680px]'">
        <!-- Header -->
        <div class="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white px-6 py-4">
          <h2 class="m-0 text-[17px] font-bold tracking-[-0.01em] text-ink">{{ title }}</h2>
          <button
            @click="$emit('close')"
            class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-line bg-white text-muted transition-colors hover:bg-paper-soft hover:text-ink"
          >
            <X :size="15" :stroke-width="2" />
          </button>
        </div>
        <!-- Body -->
        <div class="px-6 py-6">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
