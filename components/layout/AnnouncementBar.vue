<script setup lang="ts">
// Dismissible gradient announcement strip above the navbar.
const visible = ref(true)

onMounted(() => {
  if (localStorage.getItem('bbs-announce-dismissed') === '1') visible.value = false
})

function dismiss() {
  visible.value = false
  localStorage.setItem('bbs-announce-dismissed', '1')
}
</script>

<template>
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
        <span class="grid h-4 w-5 shrink-0 place-items-center rounded-sm bg-accent/15 text-[10px] text-accent transition-transform group-hover:translate-x-0.5">→</span>
      </NuxtLink>
      <button
        class="ml-auto shrink-0 p-1 text-ink/50 transition-colors hover:text-ink"
        aria-label="Tutup pengumuman"
        @click="dismiss"
      >
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>
  </div>
</template>
