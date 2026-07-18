import type { Kategori } from '~/types/category'

export const mockKategori: Kategori[] = [
  { id: 'kat-01', slug: 'pvc-belt', label: 'PVC Belt', group: 'belt-conveyor', order: 1 },
  { id: 'kat-02', slug: 'pu', label: 'PU', group: 'belt-conveyor', order: 2 },
  { id: 'kat-03', slug: 'flat-belt', label: 'Flat Belt', group: 'belt-conveyor', order: 3 },
  { id: 'kat-04', slug: 'rubber-belt', label: 'Rubber Belt', group: 'belt-conveyor', order: 4 },
  { id: 'kat-05', slug: 'timing-belt', label: 'Timing Belt', group: 'lainnya', order: 1 },
  { id: 'kat-06', slug: 'fastener', label: 'Fastener', group: 'lainnya', order: 2 },
  { id: 'kat-07', slug: 'cleat', label: 'Cleat', group: 'lainnya', order: 3 },
  { id: 'kat-08', slug: 'gravity-roll', label: 'Gravity Roll', group: 'lainnya', order: 4 },
]
