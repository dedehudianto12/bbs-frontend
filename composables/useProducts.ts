import type { Product } from '~/types/product'
import { mockProducts } from '~/data/mock/products'

export async function useProducts() {
  // ponytail: return mock data directly; swap to $fetch when backend is ready
  return { data: mockProducts as Product[], error: null }
}
