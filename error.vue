<script setup lang="ts">
const props = defineProps<{ error: any }>()

const message = computed(() => {
  if (!props.error) return 'Terjadi kesalahan yang tidak diketahui.'
  if (props.error.statusCode === 404) return 'Halaman tidak ditemukan.'
  if (props.error.statusCode === 500) return 'Terjadi kesalahan pada server.'
  return props.error.message || props.error.statusMessage || 'Terjadi kesalahan.'
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-paper p-6 font-sans">
    <div class="text-center">
      <div class="text-[80px] font-extrabold leading-none tracking-[-0.04em] text-accent">
        {{ error?.statusCode || 500 }}
      </div>
      <p class="mt-4 text-lg font-semibold text-ink">{{ message }}</p>
      <p class="mt-2 text-[13px] text-muted">
        {{ error?.statusCode === 404 ? 'Periksa kembali alamat halaman.' : 'Silakan coba beberapa saat lagi atau hubungi kami.' }}
      </p>
      <div class="mt-8 flex items-center justify-center gap-3">
        <button
          class="cursor-pointer rounded-md border border-line bg-white px-5 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:bg-paper-soft"
          @click="() => clearError({ redirect: '/' })"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  </div>
</template>
