// TODO: Ganti dengan fetch ke backend Go saat API sudah tersedia.
// Saat ini menggunakan mock data in-memory untuk development.
import type { Service } from '~/types/service'
import { mockServices } from '~/data/mock/services'

let nextId = 99

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function useServices() {
  const services = ref<Service[]>([...mockServices.map((s) => ({ ...s, images: [...s.images] }))])

  function add(item: Omit<Service, 'id' | 'slug'>) {
    const id = `svc-${String(++nextId).padStart(2, '0')}`
    const slug = slugify(item.name)
    services.value.push({ ...item, id, slug })
  }

  function update(id: string, data: Omit<Service, 'id' | 'slug'>) {
    const idx = services.value.findIndex((s) => s.id === id)
    if (idx !== -1) {
      services.value[idx] = { ...data, id, slug: slugify(data.name) }
    }
  }

  function remove(id: string) {
    services.value = services.value.filter((s) => s.id !== id)
  }

  function getBySlug(slug: string): Service | undefined {
    return services.value.find((s) => s.slug === slug)
  }

  return { services, add, update, remove, getBySlug }
}
