<script setup lang="ts">
import { Pencil } from '@lucide/vue'
import type { Kategori } from '~/types/category'

definePageMeta({ middleware: ['admin-auth'] })

const { items, update } = useKategori()

const formOpen = ref(false)
const editingItem = ref<Kategori | undefined>(undefined)
const toast = ref('')

const groupLabels: Record<string, string> = {
  'belt-conveyor': 'Belt Conveyor',
  lainnya: 'Produk Lainnya',
}

// ponytail: kategori hanya bisa edit label + sortOrder (backend seed via migration)
function openEdit(item: Kategori) {
  editingItem.value = item
  formOpen.value = true
}

function onFormSubmit(data: { label: string; sortOrder: number }) {
  if (editingItem.value) {
    update(editingItem.value.slug, data)
    toast.value = `Kategori "${data.label}" berhasil diperbarui.`
  }
  formOpen.value = false
  setTimeout(() => (toast.value = ''), 3000)
}
</script>

<template>
  <div>
    <div
      v-if="toast"
      class="mb-4 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800"
    >
      {{ toast }}
    </div>

    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-neutral-900">Kategori Produk</h1>
    </div>

    <div class="overflow-x-auto rounded-lg border border-neutral-200">
      <table class="w-full text-sm">
        <thead class="bg-neutral-50 text-neutral-500">
          <tr>
            <th class="px-4 py-3 text-left font-medium">Label</th>
            <th class="px-4 py-3 text-left font-medium hidden sm:table-cell">Slug</th>
            <th class="px-4 py-3 text-left font-medium">Grup</th>
            <th class="px-4 py-3 text-left font-medium hidden sm:table-cell">Urutan</th>
            <th class="px-4 py-3 text-right font-medium w-24">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-100">
          <tr v-for="item in items" :key="item.slug" class="hover:bg-neutral-50/50">
            <td class="px-4 py-3 font-medium text-neutral-900">{{ item.label }}</td>
            <td class="px-4 py-3 hidden sm:table-cell text-neutral-400 font-mono text-xs">
              {{ item.slug }}
            </td>
            <td class="px-4 py-3">
              <span
                class="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                :class="item.group === 'belt-conveyor'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-amber-50 text-amber-700'"
              >
                {{ groupLabels[item.group] }}
              </span>
            </td>
            <td class="px-4 py-3 hidden sm:table-cell text-neutral-500">{{ item.sortOrder }}</td>
            <td class="px-4 py-3">
              <div class="flex justify-end gap-1">
                <button
                  class="p-1.5 rounded text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
                  title="Edit"
                  @click="openEdit(item)"
                >
                  <Pencil class="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="items.length === 0" class="px-4 py-12 text-center text-neutral-400">
        Belum ada kategori.
      </p>
    </div>

    <Dialog
      :open="formOpen"
      title="Edit Kategori"
      @update:open="formOpen = $event"
    >
      <KategoriForm
        mode="edit"
        :initial-data="editingItem"
        @submit="onFormSubmit"
      />
    </Dialog>
  </div>
</template>
