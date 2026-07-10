import type { Industry } from '~/types/industry'

export const mockIndustries: Industry[] = [
  {
    id: '1',
    slug: 'makanan-dan-minuman',
    name: 'Makanan & Minuman',
    description: 'Sistem conveyor food-grade untuk jalur produksi, pengemasan, dan distribusi produk makanan dan minuman.',
    image: '/images/industries/food-beverage.jpg',
    productSlugs: ['belt-conveyor-pvc-hijau', 'belt-conveyor-pu-putih', 'roller-conveyor-stainless']
  },
  {
    id: '2',
    slug: 'tambang-dan-semen',
    name: 'Tambang & Semen',
    description: 'Belt conveyor heavy-duty untuk material curah seperti batu bara, pasir, batu kapur, dan semen.',
    image: '/images/industries/mining-cement.jpg',
    productSlugs: ['belt-conveyor-rubber-hitam', 'pulley-drive-conveyor']
  },
  {
    id: '3',
    slug: 'manufaktur-dan-pergudangan',
    name: 'Manufaktur & Pergudangan',
    description: 'Sistem material handling terintegrasi untuk pabrik dan pusat distribusi, dari roller hingga belt conveyor.',
    image: '/images/industries/manufacturing.jpg',
    productSlugs: ['roller-conveyor-baja', 'roller-conveyor-stainless', 'belt-conveyor-pvc-hijau']
  },
  {
    id: '4',
    slug: 'farmasi-dan-kimia',
    name: 'Farmasi & Kimia',
    description: 'Peralatan conveyor anti korosi dan mudah disanitasi untuk produksi obat dan bahan kimia.',
    image: '/images/industries/pharma-chemical.jpg',
    productSlugs: ['belt-conveyor-pu-putih', 'roller-conveyor-stainless']
  }
]
