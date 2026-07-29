<script setup lang="ts">
import { AlertTriangle } from '@lucide/vue'

const { state, close } = useConfirm()

function onCancel() { close(false) }
function onConfirm() { close(true) }
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-200"
      leave-to-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
    >
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
        <div class="relative z-10 mx-4 w-full max-w-[400px] rounded-xl border border-line bg-white p-6 shadow-2xl">
          <div class="flex items-start gap-4">
            <!-- Icon -->
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
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
            <button
              class="cursor-pointer rounded-md border border-line bg-white px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:bg-paper-soft hover:text-ink"
              @click="onCancel"
            >
              {{ state.cancelLabel }}
            </button>
            <button
              class="cursor-pointer rounded-md border-none bg-accent px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-accent-glow"
              @click="onConfirm"
            >
              {{ state.confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
