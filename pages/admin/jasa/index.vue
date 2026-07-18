<script setup lang="ts">
import { Trash2, Pencil } from '@lucide/vue'
import type { Service } from '~/types/service'

definePageMeta({ middleware: ['admin-auth'] })

const { services, add, update, remove } = useServices()

const formOpen = ref(false)
const formMode = ref<'create' | 'edit'>('create')
const editingItem = ref<Service | undefined>(undefined)

const deleteOpen = ref(false)
const deletingItem = ref<Service | undefined>(undefined)

const toast = ref('')

function openCreate() {
  formMode.value = 'create'
  editingItem.value = undefined
  formOpen.value = true
}

function openEdit(item: Service) {
  formMode.value = 'edit'
  editingItem.value = item
  formOpen.value = true
}

function openDelete(item: Service) {
  deletingItem.value = item
  deleteOpen.value = true
}

function onFormSubmit(data: Omit<Service, 'id' | 'slug'>) {
  if (formMode.value === 'create') {
    add(data)
    toast.value = 'Jasa berhasil ditambahkan.'
  } else if (editingItem.value) {
    update(editingItem.value.id, data)
    toast.value = 'Jasa berhasil diperbarui.'
  }
  formOpen.value = false
  setTimeout(() => (toast.value = ''), 3000)
}

function onDeleteConfirm() {
  if (deletingItem.value) {
    remove(deletingItem.value.id)
    toast.value = 'Jasa berhasil dihapus.'
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
      <h1 class="text-xl font-semibold text-neutral-900">Jasa</h1>
      <Button @click="openCreate">Tambah Jasa</Button>
    </div>

    <div class="overflow-x-auto rounded-lg border border-neutral-200">
      <table class="w-full text-sm">
        <thead class="bg-neutral-50 text-neutral-500">
          <tr>
            <th class="px-4 py-3 text-left font-medium">Nama</th>
            <th class="px-4 py-3 text-left font-medium hidden sm:table-cell">Deskripsi Singkat</th>
            <th class="px-4 py-3 text-right font-medium w-24">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-100">
          <tr v-for="item in services" :key="item.id" class="hover:bg-neutral-50/50">
            <td class="px-4 py-3 font-medium text-neutral-900">{{ item.name }}</td>
            <td class="px-4 py-3 hidden sm:table-cell text-neutral-500 max-w-md truncate">
              {{ item.shortDescription }}
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

      <p v-if="services.length === 0" class="px-4 py-12 text-center text-neutral-400">
        Belum ada data jasa.
      </p>
    </div>

    <Dialog
      :open="formOpen"
      :title="formMode === 'create' ? 'Tambah Jasa' : 'Edit Jasa'"
      @update:open="formOpen = $event"
    >
      <JasaForm
        :mode="formMode"
        :initial-data="editingItem"
        @submit="onFormSubmit"
      />
    </Dialog>

    <Dialog
      :open="deleteOpen"
      title="Hapus Jasa"
      description="Data jasa yang dihapus tidak dapat dikembalikan."
      @update:open="deleteOpen = $event"
    >
      <div class="flex justify-end gap-3">
        <Button variant="outline" @click="deleteOpen = false">Batal</Button>
        <Button variant="destructive" @click="onDeleteConfirm">Hapus</Button>
      </div>
    </Dialog>
  </div>
</template>
