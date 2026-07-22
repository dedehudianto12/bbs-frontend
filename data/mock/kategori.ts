import type { Kategori } from '~/types/category'

export const mockKategori: Kategori[] = [
  { slug: 'pvc-belt', label: 'PVC Belt', group: 'belt-conveyor', sortOrder: 1 },
  { slug: 'pu', label: 'PU', group: 'belt-conveyor', sortOrder: 2 },
  { slug: 'flat-belt', label: 'Flat Belt', group: 'belt-conveyor', sortOrder: 3 },
  { slug: 'rubber-belt', label: 'Rubber Belt', group: 'belt-conveyor', sortOrder: 4 },
  { slug: 'timing-belt', label: 'Timing Belt', group: 'lainnya', sortOrder: 1 },
  { slug: 'fastener', label: 'Fastener', group: 'lainnya', sortOrder: 2 },
  { slug: 'cleat', label: 'Cleat', group: 'lainnya', sortOrder: 3 },
  { slug: 'gravity-roll', label: 'Gravity Roll', group: 'lainnya', sortOrder: 4 },
]
