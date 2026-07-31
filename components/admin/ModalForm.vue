<script setup lang="ts">
import { X } from '@lucide/vue'

defineProps<{ open: boolean; title: string; wide?: boolean }>()
defineEmits<{ close: [] }>()
</script>

<template>
  <Teleport to="body">
    <!-- This previously mounted and unmounted with no transition at all — the
         panel simply popped in and out, which reads as broken. Admin keeps its
         rounded geometry (exempt from the 0px sweep), but the missing
         transition is a defect either way. -->
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-ink/40 backdrop-blur-sm" @click="$emit('close')" />
        <!-- Panel -->
        <div class="modal-panel relative mx-4 w-full max-h-[85vh] overflow-y-auto rounded-xl border border-line bg-white shadow-2xl" :class="wide ? 'max-w-5xl' : 'max-w-[680px]'">
          <!-- Header -->
          <div class="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white px-6 py-4">
            <h2 class="m-0 text-[17px] font-bold tracking-[-0.01em] text-ink">{{ title }}</h2>
            <button
              type="button"
              @click="$emit('close')"
              class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-line bg-white text-muted transition-colors hover:bg-paper-soft hover:text-ink active:bg-paper"
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
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Backdrop fades, panel scales from 0.96 — nothing real appears from nothing.
   transform-origin stays centred: a modal is not anchored to a trigger.
   Exit is faster than enter. */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 200ms var(--ease-out);
}
.modal-leave-active {
  transition-duration: 150ms;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: transform 200ms var(--ease-out);
}
.modal-leave-active .modal-panel {
  transition-duration: 150ms;
}
.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  transform: scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .modal-enter-from .modal-panel,
  .modal-leave-to .modal-panel {
    transform: none;
  }
}
</style>
