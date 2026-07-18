<script setup lang="ts">
import { Trash2, Pencil } from '@lucide/vue'
import type { GalleryItem } from '~/types/gallery'

definePageMeta({ middleware: ['admin-auth'] })

const { items, add, update, remove } = useGallery()

// Dialog state
const formOpen = ref(false)
const formMode = ref<'create' | 'edit'>('create')
const editingItem = ref<GalleryItem | undefined>(undefined)

const deleteOpen = ref(false)
const deletingItem = ref<GalleryItem | undefined>(undefined)

const toast = ref('')

function openCreate() {
  formMode.value = 'create'
  editingItem.value = undefined
  formOpen.value = true
}

function openEdit(item: GalleryItem) {
  formMode.value = 'edit'
  editingItem.value = item
  formOpen.value = true
}

function openDelete(item: GalleryItem) {
  deletingItem.value = item
  deleteOpen.value = true
}

function onFormSubmit(data: Omit<GalleryItem, 'id'>) {
  if (formMode.value === 'create') {
    add(data)
    toast.value = 'Foto berhasil ditambahkan.'
  } else if (editingItem.value) {
    update(editingItem.value.id, data)
    toast.value = 'Foto berhasil diperbarui.'
  }
  formOpen.value = false
  setTimeout(() => (toast.value = ''), 3000)
}

function onDeleteConfirm() {
  if (deletingItem.value) {
    remove(deletingItem.value.id)
    toast.value = 'Foto berhasil dihapus.'
  }
  deleteOpen.value = false
  setTimeout(() => (toast.value = ''), 3000)
}
</script>

<template>
  <div>
    <!-- Success toast -->
    <div
      v-if="toast"
      class="mb-4 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800"
    >
      {{ toast }}
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-neutral-900">Galeri</h1>
      <Button @click="openCreate">Tambah Foto</Button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-lg border border-neutral-200">
      <table class="w-full text-sm">
        <thead class="bg-neutral-50 text-neutral-500">
          <tr>
            <th class="px-4 py-3 text-left font-medium">Thumbnail</th>
            <th class="px-4 py-3 text-left font-medium">Caption</th>
            <th class="px-4 py-3 text-left font-medium hidden sm:table-cell">Lokasi</th>
            <th class="px-4 py-3 text-right font-medium w-24">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-100">
          <tr v-for="item in items" :key="item.id" class="hover:bg-neutral-50/50">
            <td class="px-4 py-3">
              <div class="h-10 w-16 rounded bg-neutral-100 overflow-hidden">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.caption"
                  class="h-full w-full object-cover"
                  @error="($event.target as HTMLImageElement).style.display = 'none'"
                />
              </div>
            </td>
            <td class="px-4 py-3 max-w-xs truncate">{{ item.caption }}</td>
            <td class="px-4 py-3 hidden sm:table-cell text-neutral-500">
              {{ item.location || '—' }}
            </td>
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
        Belum ada foto di galeri.
      </p>
    </div>

    <!-- Create / Edit Dialog -->
    <Dialog
      :open="formOpen"
      :title="formMode === 'create' ? 'Tambah Foto' : 'Edit Foto'"
      @update:open="formOpen = $event"
    >
      <GaleriForm
        :mode="formMode"
        :initial-data="editingItem"
        @submit="onFormSubmit"
      />
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog
      :open="deleteOpen"
      title="Hapus Foto"
      description="Foto yang dihapus tidak dapat dikembalikan."
      @update:open="deleteOpen = $event"
    >
      <div class="flex justify-end gap-3">
        <Button variant="outline" @click="deleteOpen = false">Batal</Button>
        <Button variant="destructive" @click="onDeleteConfirm">Hapus</Button>
      </div>
    </Dialog>
  </div>
</template>
