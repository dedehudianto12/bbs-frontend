<script setup lang="ts">
import { AlertTriangle } from '@lucide/vue'

const { state, close } = useConfirm()

function onCancel() { close(false) }
function onConfirm() { close(true) }
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="state?.open"
        class="fixed inset-0 z-[9998] flex items-center justify-center"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          @click="onCancel"
        />

        <!-- Dialog -->
        <div class="dialog-panel relative z-10 mx-4 w-full max-w-[400px] rounded-none border border-line bg-white p-6">
          <div class="flex items-start gap-4">
            <!-- Icon -->
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-accent/10">
              <AlertTriangle :size="20" class="text-accent" />
            </div>

            <!-- Content -->
            <div class="min-w-0 flex-1">
              <h3 class="text-[15px] font-semibold leading-snug text-ink">
                {{ state.title }}
              </h3>
              <p v-if="state.message" class="mt-1.5 text-[13px] leading-relaxed text-muted">
                {{ state.message }}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-5 flex justify-end gap-2.5">
            <UiButton size="sm" variant="outline" @click="onCancel">
              {{ state.cancelLabel }}
            </UiButton>
            <UiButton size="sm" @click="onConfirm">
              {{ state.confirmLabel }}
            </UiButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Backdrop fades; the panel scales with it. Nothing in the real world appears
   from nothing, so the panel starts at 0.96 rather than 0. transform-origin
   stays centred — a modal is not anchored to a trigger, unlike a popover.
   Exit is faster than enter: the system responding vs. the user deciding. */
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 200ms var(--ease-out);
}
.dialog-leave-active {
  transition-duration: 150ms;
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active .dialog-panel,
.dialog-leave-active .dialog-panel {
  transition: transform 200ms var(--ease-out);
}
.dialog-leave-active .dialog-panel {
  transition-duration: 150ms;
}
.dialog-enter-from .dialog-panel,
.dialog-leave-to .dialog-panel {
  transform: scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .dialog-enter-from .dialog-panel,
  .dialog-leave-to .dialog-panel {
    transform: none;
  }
}
</style>
