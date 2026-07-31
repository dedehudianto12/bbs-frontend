<script setup lang="ts">
// Dismissible announcement strip above the navbar.
const visible = ref(true)

// Gates the collapse transition. Without this, a returning visitor who already
// dismissed the bar would watch it animate away on every page load, because the
// localStorage check can only run after mount. Vue skips CSS transition
// detection entirely while :css is false.
const animate = ref(false)

onMounted(async () => {
  if (localStorage.getItem('bbs-announce-dismissed') === '1') visible.value = false
  await nextTick()
  animate.value = true
})

function dismiss() {
  visible.value = false
  localStorage.setItem('bbs-announce-dismissed', '1')
}
</script>

<template>
  <!-- Collapses rather than vanishing: an element that pops out of the layout
       with no transition reads as broken. Exit only (it is present on first
       paint), and fast — this is the system responding, not the user deciding. -->
  <Transition
    :css="animate"
    leave-active-class="overflow-hidden transition-[max-height,opacity] duration-150 ease-out"
    leave-from-class="max-h-20 opacity-100"
    leave-to-class="max-h-0 opacity-0"
  >
    <div
      v-if="visible"
      class="relative isolate border-b border-line bg-paper-soft text-ink"
    >
      <div class="flex items-center gap-3 px-4 py-2 md:px-6">
        <NuxtLink
          to="/kontak"
          class="group flex min-w-0 items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/75"
        >
          <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span class="truncate">Konsultasi &amp; survei lokasi gratis — hubungi tim kami</span>
          <span class="grid h-4 w-5 shrink-0 place-items-center rounded-none bg-accent/15 text-[10px] text-accent transition-transform duration-150 group-hover:translate-x-0.5">→</span>
        </NuxtLink>
        <button
          class="ml-auto shrink-0 p-1 text-ink/50 transition-colors duration-150 hover:text-ink active:text-ink"
          aria-label="Tutup pengumuman"
          @click="dismiss"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </div>
  </Transition>
</template>
