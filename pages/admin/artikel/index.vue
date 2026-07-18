<script setup lang="ts">
import {
  useVueTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  FlexRender,
  createColumnHelper,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/vue-table'
import { Trash2, Pencil, Search, ArrowUpDown, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from '@lucide/vue'
import type { Article } from '~/types/article'

definePageMeta({ middleware: ['admin-auth'] })

const { articles, add, update, remove } = useArticles()

// ── CRUD dialog state ──
const formOpen = ref(false)
const formMode = ref<'create' | 'edit'>('create')
const editingItem = ref<Article | undefined>(undefined)
const deleteOpen = ref(false)
const deletingItem = ref<Article | undefined>(undefined)
const toast = ref('')

function openCreate() { formMode.value = 'create'; editingItem.value = undefined; formOpen.value = true }
function openEdit(item: Article) { formMode.value = 'edit'; editingItem.value = item; formOpen.value = true }
function openDelete(item: Article) { deletingItem.value = item; deleteOpen.value = true }

function onFormSubmit(data: Omit<Article, 'id' | 'slug'>) {
  if (formMode.value === 'create') {
    add(data)
    toast.value = `Artikel "${data.title}" berhasil ditambahkan.`
  } else if (editingItem.value) {
    update(editingItem.value.id, data)
    toast.value = `Artikel "${data.title}" berhasil diperbarui.`
  }
  formOpen.value = false
  setTimeout(() => (toast.value = ''), 3000)
}

function onDeleteConfirm() {
  if (deletingItem.value) {
    remove(deletingItem.value.id)
    toast.value = `Artikel "${deletingItem.value.title}" berhasil dihapus.`
  }
  deleteOpen.value = false
  setTimeout(() => (toast.value = ''), 3000)
}

// ── TanStack Table ──
const columnHelper = createColumnHelper<Article>()

const tagLabels: Record<string, string> = {
  Tips: 'Tips',
  Panduan: 'Panduan',
  Proyek: 'Proyek',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
}

const columns = [
  columnHelper.accessor('title', {
    header: 'Judul',
    enableSorting: true,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('tag', {
    header: 'Tag',
    enableSorting: true,
    filterFn: (row, columnId, filterValue: string) => {
      if (!filterValue) return true
      return row.getValue(columnId) === filterValue
    },
    cell: (info) => {
      const tag = info.getValue()
      const colors: Record<string, string> = {
        Tips: 'bg-green-50 text-green-700',
        Panduan: 'bg-blue-50 text-blue-700',
        Proyek: 'bg-amber-50 text-amber-700',
      }
      return h('span', {
        class: `inline-block rounded-full px-2 py-0.5 text-xs font-medium ${colors[tag] ?? 'bg-neutral-50 text-neutral-600'}`,
      }, tagLabels[tag] ?? tag)
    },
  }),
  columnHelper.accessor('publishedAt', {
    header: 'Tanggal',
    enableSorting: true,
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: (info) => {
      const item = info.row.original
      return h('div', { class: 'flex justify-end gap-1' }, [
        h('button', {
          class: 'p-1.5 rounded text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors',
          title: 'Edit',
          onClick: () => openEdit(item),
        }, [h(Pencil, { class: 'h-4 w-4' })]),
        h('button', {
          class: 'p-1.5 rounded text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-colors',
          title: 'Hapus',
          onClick: () => openDelete(item),
        }, [h(Trash2, { class: 'h-4 w-4' })]),
      ])
    },
  }),
]

// Table state
const sorting = ref<SortingState>([{ id: 'publishedAt', desc: true }])
const globalFilter = ref('')
const columnFilters = ref<ColumnFiltersState>([])
const pagination = ref({ pageIndex: 0, pageSize: 10 })
const pageSizeOptions = [10, 25, 50]

const table = useVueTable({
  get data() { return articles.value },
  columns,
  state: {
    get sorting() { return sorting.value },
    get globalFilter() { return globalFilter.value },
    get columnFilters() { return columnFilters.value },
    get pagination() { return pagination.value },
  },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
  },
  onGlobalFilterChange: (updater) => {
    globalFilter.value = typeof updater === 'function' ? updater(globalFilter.value) : updater
  },
  onColumnFiltersChange: (updater) => {
    columnFilters.value = typeof updater === 'function' ? updater(columnFilters.value) : updater
  },
  onPaginationChange: (updater) => {
    pagination.value = typeof updater === 'function' ? updater(pagination.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  globalFilterFn: 'includesString',
})

// Tag filter dropdown
const filterTag = ref('')

watch(filterTag, (val) => {
  columnFilters.value = columnFilters.value
    .filter((f) => f.id !== 'tag')
    .concat(val ? [{ id: 'tag', value: val }] : [])
})

// Sort indicator
function sortIcon(colId: string) {
  const sort = sorting.value.find((s) => s.id === colId)
  if (!sort) return ArrowUpDown
  return sort.desc ? ChevronDown : ChevronUp
}

function sortDir(colId: string): 'asc' | 'desc' | false {
  const sort = sorting.value.find((s) => s.id === colId)
  return sort ? (sort.desc ? 'desc' : 'asc') : false
}
</script>

<template>
  <div>
    <!-- Toast -->
    <div v-if="toast" class="mb-4 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
      {{ toast }}
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-neutral-900">Artikel</h1>
      <Button @click="openCreate">Tambah Artikel</Button>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-col sm:flex-row gap-3 mb-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          v-model="globalFilter"
          type="text"
          placeholder="Cari artikel..."
          class="w-full h-9 pl-9 pr-3 rounded-md border border-neutral-200 bg-white text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
        />
      </div>
      <select
        v-model="filterTag"
        class="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
      >
        <option value="">Semua Tag</option>
        <option value="Tips">Tips</option>
        <option value="Panduan">Panduan</option>
        <option value="Proyek">Proyek</option>
      </select>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-lg border border-neutral-200">
      <table class="w-full text-sm">
        <thead class="bg-neutral-50 text-neutral-500">
          <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :class="[
                'px-4 py-3 font-medium',
                header.column.getCanSort() ? 'cursor-pointer select-none hover:text-neutral-700' : '',
                header.id === 'actions' ? 'text-right w-24' : 'text-left',
                header.id === 'tag' ? 'hidden sm:table-cell' : '',
              ]"
              @click="header.column.getCanSort() && header.column.toggleSorting()"
            >
              <span v-if="header.id !== 'actions'" class="inline-flex items-center gap-1">
                {{ typeof header.column.columnDef.header === 'function'
                  ? (header.column.columnDef.header as Function)(header.getContext())
                  : header.column.columnDef.header }}
                <component
                  :is="sortIcon(header.id)"
                  class="h-3.5 w-3.5"
                  :class="sortDir(header.id) ? 'text-neutral-700' : 'text-neutral-300'"
                />
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-100">
          <tr v-for="row in table.getRowModel().rows" :key="row.id" class="hover:bg-neutral-50/50">
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              :class="[
                'px-4 py-3',
                cell.column.id === 'title' ? 'font-medium text-neutral-900' : '',
                cell.column.id === 'tag' ? 'hidden sm:table-cell' : '',
              ]"
            >
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="table.getRowModel().rows.length === 0" class="px-4 py-12 text-center text-neutral-400">
        Tidak ada artikel yang cocok.
      </p>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 text-sm text-neutral-500">
      <div class="flex items-center gap-2">
        <span>Tampilkan</span>
        <select
          :value="pagination.pageSize"
          class="h-8 rounded border border-neutral-200 bg-white px-2 text-sm focus-visible:outline-none"
          @change="table.setPageSize(Number(($event.target as HTMLSelectElement).value))"
        >
          <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>per halaman</span>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-neutral-400">
          {{ table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1 }}
          –
          {{ Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          ) }}
          dari {{ table.getFilteredRowModel().rows.length }}
        </span>

        <button
          class="p-1.5 rounded hover:bg-neutral-100 disabled:opacity-30 transition-colors"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <ChevronLeft class="h-4 w-4" />
        </button>
        <span class="min-w-[4rem] text-center">
          Halaman {{ table.getState().pagination.pageIndex + 1 }}
        </span>
        <button
          class="p-1.5 rounded hover:bg-neutral-100 disabled:opacity-30 transition-colors"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- Create / Edit Dialog -->
    <Dialog
      :open="formOpen"
      :title="formMode === 'create' ? 'Tambah Artikel' : 'Edit Artikel'"
      size="lg"
      @update:open="formOpen = $event"
    >
      <ArtikelForm :mode="formMode" :initial-data="editingItem" @submit="onFormSubmit" />
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog
      :open="deleteOpen"
      title="Hapus Artikel"
      description="Artikel yang dihapus tidak dapat dikembalikan."
      @update:open="deleteOpen = $event"
    >
      <div class="flex justify-end gap-3">
        <Button variant="outline" @click="deleteOpen = false">Batal</Button>
        <Button variant="destructive" @click="onDeleteConfirm">Hapus</Button>
      </div>
    </Dialog>
  </div>
</template>
