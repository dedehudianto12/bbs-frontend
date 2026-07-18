<script setup lang="ts">
import { Trash2, Pencil } from '@lucide/vue'
import type { Kategori } from '~/types/category'

definePageMeta({ middleware: ['admin-auth'] })

const { items, add, update, remove } = useKategori()

const formOpen = ref(false)
const formMode = ref<'create' | 'edit'>('create')
const editingItem = ref<Kategori | undefined>(undefined)

const deleteOpen = ref(false)
const deletingItem = ref<Kategori | undefined>(undefined)

const toast = ref('')

const groupLabels: Record<string, string> = {
  'belt-conveyor': 'Belt Conveyor',
  lainnya: 'Produk Lainnya',
}

function openCreate() {
  formMode.value = 'create'
  editingItem.value = undefined
  formOpen.value = true
}

function openEdit(item: Kategori) {
  formMode.value = 'edit'
  editingItem.value = item
  formOpen.value = true
}

function openDelete(item: Kategori) {
  deletingItem.value = item
  deleteOpen.value = true
}

function onFormSubmit(data: Omit<Kategori, 'id' | 'slug'>) {
  if (formMode.value === 'create') {
    add(data)
    toast.value = 'Kategori berhasil ditambahkan.'
  } else if (editingItem.value) {
    update(editingItem.value.id, data)
    toast.value = 'Kategori berhasil diperbarui.'
  }
  formOpen.value = false
  setTimeout(() => (toast.value = ''), 3000)
}

function onDeleteConfirm() {
  if (deletingItem.value) {
    remove(deletingItem.value.id)
    toast.value = 'Kategori berhasil dihapus.'
  }
  deleteOpen.value = false
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
      <Button @click="openCreate">Tambah Kategori</Button>
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
          <tr v-for="item in items" :key="item.id" class="hover:bg-neutral-50/50">
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
            <td class="px-4 py-3 hidden sm:table-cell text-neutral-500">{{ item.order }}</td>
            <td class="px-4 py-3">
              <div class="flex justify-end gap-1">
                <button
                  class="p-1.5 rounded text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
                  title="Edit"
                  @click="openEdit(item)"
                >
                  <Pencil class="h-4 w-4" />
                </button>
                <button
                  class="p-1.5 rounded text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Hapus"
                  @click="openDelete(item)"
                >
                  <Trash2 class="h-4 w-4" />
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
      :title="formMode === 'create' ? 'Tambah Kategori' : 'Edit Kategori'"
      @update:open="formOpen = $event"
    >
      <KategoriForm
        :mode="formMode"
        :initial-data="editingItem"
        @submit="onFormSubmit"
      />
    </Dialog>

    <Dialog
      :open="deleteOpen"
      title="Hapus Kategori"
      description="Kategori yang dihapus tidak dapat dikembalikan."
      @update:open="deleteOpen = $event"
    >
      <div class="flex justify-end gap-3">
        <Button variant="outline" @click="deleteOpen = false">Batal</Button>
        <Button variant="destructive" @click="onDeleteConfirm">Hapus</Button>
      </div>
    </Dialog>
  </div>
</template>
