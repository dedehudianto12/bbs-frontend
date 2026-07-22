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
import type { Product } from '~/types/product'

definePageMeta({ middleware: ['admin-auth'] })

const { products, add, update, remove } = useProducts()
const { getByGroup: getKategoriByGroup } = useKategori()

// ── CRUD dialog state ──
const formOpen = ref(false)
const formMode = ref<'create' | 'edit'>('create')
const editingItem = ref<Product | undefined>(undefined)
const deleteOpen = ref(false)
const deletingItem = ref<Product | undefined>(undefined)
const toast = ref('')

const groupLabels: Record<string, string> = {
  'belt-conveyor': 'Belt Conveyor',
  lainnya: 'Produk Lainnya',
}

function kategoriLabel(item: Product): string {
  const kat = getKategoriByGroup(item.group).find((k) => k.slug === item.kategori)
  return kat?.label ?? item.kategori
}

function openCreate() { formMode.value = 'create'; editingItem.value = undefined; formOpen.value = true }
function openEdit(item: Product) { formMode.value = 'edit'; editingItem.value = item; formOpen.value = true }
function openDelete(item: Product) { deletingItem.value = item; deleteOpen.value = true }

function onFormSubmit(data: Omit<Product, 'id' | 'slug' | 'category'>) {
  const label = getKategoriByGroup(data.group).find((k) => k.slug === data.kategori)?.label ?? data.kategori
  if (formMode.value === 'create') {
    add({ ...data, category: label })
    toast.value = `Produk "${data.name}" berhasil ditambahkan.`
  } else if (editingItem.value) {
    update(editingItem.value.id, { ...data, category: label })
    toast.value = `Produk "${data.name}" berhasil diperbarui.`
  }
  formOpen.value = false
  setTimeout(() => (toast.value = ''), 3000)
}

function onDeleteConfirm() {
  if (deletingItem.value) {
    remove(deletingItem.value.id)
    toast.value = `Produk "${deletingItem.value.name}" berhasil dihapus.`
  }
  deleteOpen.value = false
  setTimeout(() => (toast.value = ''), 3000)
}

// ── TanStack Table ──
const columnHelper = createColumnHelper<Product>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Nama',
    enableSorting: true,
    filterFn: 'includesString',
  }),
  columnHelper.accessor('group', {
    header: 'Grup',
    enableSorting: true,
    filterFn: (row, columnId, filterValue: string) => {
      if (!filterValue) return true
      return row.getValue(columnId) === filterValue
    },
    cell: (info) => groupLabels[info.getValue()] ?? info.getValue(),
  }),
  columnHelper.accessor('kategori', {
    header: 'Kategori',
    enableSorting: true,
    filterFn: (row, columnId, filterValue: string) => {
      if (!filterValue) return true
      return row.getValue(columnId) === filterValue
    },
    cell: (info) => {
      const product = info.row.original
      return kategoriLabel(product)
    },
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
const sorting = ref<SortingState>([])
const globalFilter = ref('')
const columnFilters = ref<ColumnFiltersState>([])
const pagination = ref({ pageIndex: 0, pageSize: 10 })
const pageSizeOptions = [10, 25, 50]

const table = useVueTable({
  get data() { return products.value },
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

// Filter dropdown state
const filterGroup = ref('')
const filterKategori = ref('')

// Sync dropdowns → TanStack column filters
watch(filterGroup, (val) => {
  columnFilters.value = columnFilters.value
    .filter((f) => f.id !== 'group')
    .concat(val ? [{ id: 'group', value: val }] : [])
  // Reset kategori saat group berubah
  filterKategori.value = ''
})

watch(filterKategori, (val) => {
  columnFilters.value = columnFilters.value
    .filter((f) => f.id !== 'kategori')
    .concat(val ? [{ id: 'kategori', value: val }] : [])
})

// Kategori dropdown options — filtered by selected group
const kategoriFilterOptions = computed(() => {
  if (filterGroup.value) return getKategoriByGroup(filterGroup.value as 'belt-conveyor' | 'lainnya')
  // "Semua" group — tampilkan semua kategori dari kedua group
  return [...getKategoriByGroup('belt-conveyor'), ...getKategoriByGroup('lainnya')]
})

// Sort indicator helper
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
      <h1 class="text-xl font-semibold text-neutral-900">Produk</h1>
      <Button @click="openCreate">Tambah Produk</Button>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-col sm:flex-row gap-3 mb-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          v-model="globalFilter"
          type="text"
          placeholder="Cari produk..."
          class="w-full h-9 pl-9 pr-3 rounded-md border border-neutral-200 bg-white text-sm placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
        />
      </div>
      <select
        v-model="filterGroup"
        class="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
      >
        <option value="">Semua Grup</option>
        <option value="belt-conveyor">Belt Conveyor</option>
        <option value="lainnya">Produk Lainnya</option>
      </select>
      <select
        v-model="filterKategori"
        class="h-9 rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
      >
        <option value="">Semua Kategori</option>
        <option v-for="kat in kategoriFilterOptions" :key="kat.slug" :value="kat.slug">
          {{ kat.label }}
        </option>
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
                header.id === 'group' || header.id === 'kategori' ? 'hidden sm:table-cell' : '',
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
                cell.column.id === 'name' ? 'font-medium text-neutral-900' : '',
                cell.column.id === 'group' || cell.column.id === 'kategori' ? 'hidden sm:table-cell' : '',
              ]"
            >
              <template v-if="cell.column.id === 'group'">
                <span
                  class="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                  :class="row.original.group === 'belt-conveyor'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-amber-50 text-amber-700'"
                >
                  {{ groupLabels[row.original.group] }}
                </span>
              </template>
              <template v-else-if="cell.column.id === 'kategori'">
                <span class="text-neutral-500">{{ kategoriLabel(row.original) }}</span>
              </template>
              <FlexRender v-else :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="table.getRowModel().rows.length === 0" class="px-4 py-12 text-center text-neutral-400">
        Tidak ada produk yang cocok.
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
      :title="formMode === 'create' ? 'Tambah Produk' : 'Edit Produk'"
      @update:open="formOpen = $event"
    >
      <ProductForm :mode="formMode" :initial-data="editingItem" @submit="onFormSubmit" />
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog
      :open="deleteOpen"
      title="Hapus Produk"
      description="Produk yang dihapus tidak dapat dikembalikan."
      @update:open="deleteOpen = $event"
    >
      <div class="flex justify-end gap-3">
        <Button variant="outline" @click="deleteOpen = false">Batal</Button>
        <Button variant="destructive" @click="onDeleteConfirm">Hapus</Button>
      </div>
    </Dialog>
  </div>
</template>
