<script setup lang="ts">
import { contactInfo } from '~/data/contact'

const isOpen = ref(false)
const panelRef = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

// Close when clicking outside
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
    <!-- Options panel -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-3 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-3 opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        ref="panelRef"
        class="w-[260px] overflow-hidden rounded-xl border border-line bg-white shadow-lg"
      >
        <!-- Header -->
        <div class="flex items-center gap-3 border-b border-line bg-[#075e54] px-4 py-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
            </svg>
          </div>
          <div>
            <p class="text-[13px] font-semibold text-white">BBS Conveyor</p>
            <p class="text-[11px] text-white/70">Balas dalam hitungan menit</p>
          </div>
        </div>

        <!-- Contact options -->
        <div class="p-3">
          <a
            :href="`https://wa.me/${contactInfo.waSales1}?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20BBS%20Conveyor.%20Bisakah%20dibantu%3F`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-paper-soft"
            @click="close"
          >
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#128c7e]">
              <svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
            </span>
            <div class="min-w-0">
              <p class="text-[13px] font-semibold text-ink">{{ contactInfo.waLabel1 }}</p>
              <p class="text-[12px] text-muted">+62 {{ contactInfo.waSales1.replace(/^62/, '').replace(/(\d{3})(?=\d)/g, '$1-') }}</p>
            </div>
          </a>

          <a
            :href="`https://wa.me/${contactInfo.waSales2}?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20BBS%20Conveyor.%20Bisakah%20dibantu%3F`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-paper-soft"
            @click="close"
          >
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#128c7e]">
              <svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
            </span>
            <div class="min-w-0">
              <p class="text-[13px] font-semibold text-ink">{{ contactInfo.waLabel2 }}</p>
              <p class="text-[12px] text-muted">+62 {{ contactInfo.waSales2.replace(/^62/, '').replace(/(\d{3})(?=\d)/g, '$1-') }}</p>
            </div>
          </a>
        </div>
      </div>
    </Transition>

    <!-- Toggle button -->
    <button
      class="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
      :class="isOpen ? 'rotate-45 bg-[#075e54]' : 'bg-[#25D366]'"
      aria-label="Chat via WhatsApp"
      @click="toggle"
    >
      <svg v-if="!isOpen" class="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
      </svg>
      <svg v-else class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  </div>
</template>
