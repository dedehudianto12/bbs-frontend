// TODO: Ganti dengan fetch ke backend Go saat API sudah tersedia.
// Saat ini menggunakan mock data in-memory untuk development.
import { productSchema, type Product } from '~/types/product'
import { mockProducts } from '~/data/mock/products'

let nextId = 99

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function useProducts() {
  const products = ref<Product[]>(
    mockProducts.map((p) => ({ ...p, specs: { ...p.specs } })),
  )

  // Validate mock data on first load
  const result = productSchema.array().safeParse(mockProducts)
  if (!result.success) {
    console.error('Invalid mock product data:', result.error.format())
  }

  function add(item: Omit<Product, 'id' | 'slug'>) {
    const prefix = item.group === 'belt-conveyor' ? 'bc' : 'ln'
    const id = `${prefix}-${String(++nextId).padStart(2, '0')}`
    const slug = slugify(item.name)
    products.value.push({ ...item, id, slug })
  }

  function update(id: string, data: Omit<Product, 'id' | 'slug'>) {
    const idx = products.value.findIndex((p) => p.id === id)
    if (idx !== -1) {
      const slug = slugify(data.name)
      products.value[idx] = { ...data, id, slug }
    }
  }

  function remove(id: string) {
    products.value = products.value.filter((p) => p.id !== id)
  }

  function getByGroup(group: Product['group']): Product[] {
    return products.value.filter((p) => p.group === group)
  }

  function getByKategori(group: Product['group'], kategori: string): Product[] {
    return products.value.filter((p) => p.group === group && p.kategori === kategori)
  }

  function getBySlug(slug: string): Product | undefined {
    return products.value.find((p) => p.slug === slug)
  }

  return { products, add, update, remove, getByGroup, getByKategori, getBySlug }
}
