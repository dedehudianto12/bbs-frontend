<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { contactInfo } from '~/data/contact'
import { prettyPhone, waLink } from '~/utils/whatsapp'

const isOpen = ref(false)
const panelRef = ref<HTMLElement | null>(null)
const fabRef = ref<HTMLElement | null>(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

// Close when clicking outside. panelRef was previously declared and never
// used, so only Escape closed the panel. The FAB is excluded — without that,
// clicking it would fire close() and toggle() in the same tick and the panel
// would never open.
onClickOutside(panelRef, close, { ignore: [fabRef] })

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

const salesLinks = [
  { href: waLink({ halaman: 'Tombol WhatsApp mengapung' }, 1), label: contactInfo.waLabel1, number: contactInfo.waSales1 },
  { href: waLink({ halaman: 'Tombol WhatsApp mengapung' }, 2), label: contactInfo.waLabel2, number: contactInfo.waSales2 },
]

</script>

<template>
  <div class="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
    <!-- Options panel -->
    <!-- Origin-aware: the panel is anchored to the FAB at its bottom-right, so
         it scales out of the trigger rather than out of its own centre. Exit is
         faster than enter — the system responding vs. the user deciding. -->
    <Transition
      enter-active-class="transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
      enter-from-class="translate-y-3 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-3 opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        ref="panelRef"
        class="w-[260px] origin-bottom-right overflow-hidden rounded-none border border-line bg-white"
      >
        <!-- Header -->
        <div class="flex items-center gap-3 border-b border-line bg-[#075e54] px-4 py-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-none bg-white/20">
            <UiWhatsAppIcon class="h-5 w-5 text-white" />
          </div>
          <div>
            <p class="text-[13px] font-semibold text-white">BBS Conveyor</p>
            <p class="text-[11px] text-white/70">Balas dalam hitungan menit</p>
          </div>
        </div>

        <!-- Contact options -->
        <div class="p-3">
          <a
            v-for="sales in salesLinks"
            :key="sales.number"
            :href="sales.href"
            target="_blank"
            rel="noopener noreferrer"
            class="wa-row flex items-center gap-3 rounded-none p-3"
            @click="close"
          >
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-[#25D366]/10 text-[#128c7e]">
              <UiWhatsAppIcon class="h-[18px] w-[18px]" />
            </span>
            <div class="min-w-0">
              <p class="text-[13px] font-semibold text-ink">{{ sales.label }}</p>
              <p class="num text-[12px] text-muted">{{ prettyPhone(sales.number) }}</p>
            </div>
          </a>
        </div>
      </div>
    </Transition>

    <!-- Toggle button -->
    <button
      ref="fabRef"
      type="button"
      class="wa-fab flex h-14 w-14 items-center justify-center rounded-none"
      :class="isOpen ? 'rotate-45 bg-[#075e54]' : 'bg-[#25D366]'"
      :aria-expanded="isOpen"
      aria-label="Chat via WhatsApp"
      @click="toggle"
    >
      <UiWhatsAppIcon v-if="!isOpen" class="h-7 w-7 text-white" />
      <svg v-else class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* Explicit properties only — this previously used `transition-all` plus
   hover:scale-105, and growing on hover is consumer-SaaS vocabulary. */
.wa-fab {
  /* Hard drop with zero blur: a physical key sitting above the page, not a
     soft floating card. Pressing pushes it down into its own shadow. */
  box-shadow: 0 3px 0 0 rgb(var(--ink) / 0.3);
  transition:
    transform 140ms var(--ease-out),
    background-color 140ms ease,
    box-shadow 140ms var(--ease-out);
}
.wa-fab:active {
  box-shadow: 0 0 0 0 rgb(var(--ink) / 0.3);
}
/* The open state already carries rotate-45, so the press travel is composed
   as a translate on top of it rather than replacing the transform. */
.wa-fab:active:not(.rotate-45) {
  transform: translateY(3px);
}

.wa-row {
  transition: background-color 140ms ease;
}
.wa-row:active {
  background-color: rgb(var(--paper));
}
@media (hover: hover) and (pointer: fine) {
  .wa-row:hover {
    background-color: rgb(var(--paper-soft));
  }
}

@media (prefers-reduced-motion: reduce) {
  .wa-fab {
    transition: background-color 140ms ease;
  }
  .wa-fab:active:not(.rotate-45) {
    transform: none;
  }
}
</style>
