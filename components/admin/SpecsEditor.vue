<script setup lang="ts">
// Key-value row editor for product specs. Binds to a JSON string via v-model.
// Internally manages an ordered [{key, value}] array; serializes back to
// flat {key: value} JSON on every change so form.specs stays in sync.

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

interface Row { key: string; value: string }

function parse(val: string): Row[] {
  try {
    const obj = JSON.parse(val)
    if (typeof obj !== 'object' || Array.isArray(obj) || !obj) return []
    return Object.entries(obj).map(([k, v]) => ({ key: k, value: String(v ?? '') }))
  } catch {
    return []
  }
}

const rows = ref<Row[]>(parse(props.modelValue))

function sync() {
  const obj: Record<string, string> = {}
  for (const r of rows.value) {
    const k = r.key.trim()
    if (k) obj[k] = r.value
  }
  emit('update:modelValue', JSON.stringify(obj))
}

function addRow() {
  rows.value.push({ key: '', value: '' })
}

function removeRow(i: number) {
  rows.value.splice(i, 1)
  sync()
}

watch(() => props.modelValue, (val) => {
  // external reset (e.g. form re-initialized) — re-parse
  const parsed = parse(val)
  if (JSON.stringify(parsed) !== JSON.stringify(rows.value)) {
    rows.value = parsed
  }
})
</script>

<template>
  <div class="space-y-2">
    <div v-if="rows.length === 0" class="py-2 text-[13px] text-muted italic">
      Belum ada spesifikasi.
    </div>

    <div v-for="(row, i) in rows" :key="i" class="flex gap-2">
      <input
        v-model="row.key"
        placeholder="Label"
        @input="sync"
        class="flex-1 rounded-md border border-line px-3 py-2 text-sm outline-none box-border focus:border-accent/40"
      />
      <input
        v-model="row.value"
        placeholder="Nilai"
        @input="sync"
        class="flex-[2] rounded-md border border-line px-3 py-2 text-sm outline-none box-border focus:border-accent/40"
      />
      <button
        type="button"
        @click="removeRow(i)"
        class="shrink-0 flex items-center justify-center w-9 h-9 rounded-md border border-line bg-white text-sm text-muted hover:text-red-600 hover:border-red-200 cursor-pointer transition-colors"
        aria-label="Hapus baris"
      >
        ✕
      </button>
    </div>

    <button
      type="button"
      @click="addRow"
      class="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-glow cursor-pointer border-none bg-transparent mt-1"
    >
      <span class="text-base leading-none">+</span> Tambah Baris
    </button>
  </div>
</template>
