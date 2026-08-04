<script setup lang="ts">
// The empty / loading / failed row for every admin table.
//
// All five list pages previously had a single fallback row reading "Belum ada
// <thing>." shown whenever `items` was empty — which is also true while the
// first request is in flight, and true when the request failed outright. An
// admin whose backend was down was told, confidently, that they had no
// products. The three states are distinct and now look it.
//
// One component rather than five copies because they were already identical,
// and the next person to add a table should not have to remember to handle all
// three by hand.
defineProps<{
  colspan: number
  loading: boolean
  failed: boolean
  /** True only once a request has succeeded and returned nothing. */
  empty: boolean
  /** Shown for the empty case, e.g. "Belum ada produk." */
  emptyText: string
}>()

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <tr v-if="loading">
    <td :colspan="colspan" class="px-4 py-[60px] text-center text-muted">
      <span class="inline-flex items-center gap-2.5">
        <span class="admin-spinner" aria-hidden="true" />
        Memuat data…
      </span>
    </td>
  </tr>

  <tr v-else-if="failed">
    <td :colspan="colspan" class="px-4 py-[60px] text-center">
      <p class="text-[13px] font-semibold text-red-700">Gagal memuat data.</p>
      <p class="mt-1 text-[12px] text-muted">
        Tidak dapat menghubungi server. Periksa koneksi, lalu coba lagi.
      </p>
      <button
        type="button"
        class="mt-4 cursor-pointer rounded-md border border-line bg-white px-4 py-2 text-[12px] font-semibold text-ink transition-colors hover:border-ink"
        @click="emit('retry')"
      >
        Coba lagi
      </button>
    </td>
  </tr>

  <tr v-else-if="empty">
    <td :colspan="colspan" class="px-4 py-[60px] text-center text-muted">{{ emptyText }}</td>
  </tr>
</template>

<style scoped>
.admin-spinner {
  width: 0.85rem;
  height: 0.85rem;
  border: 2px solid rgb(var(--line));
  border-top-color: rgb(var(--accent));
  border-radius: 9999px;
  animation: admin-spin 700ms linear infinite;
}
@keyframes admin-spin {
  to {
    transform: rotate(360deg);
  }
}
/* A spinner is the one piece of motion here that carries information — it says
   the request is still alive. Under reduced motion it holds still and the
   accompanying text does the work. */
@media (prefers-reduced-motion: reduce) {
  .admin-spinner {
    animation: none;
  }
}
</style>
