import type { Service } from '~/types/service'
import { mockServices } from '~/data/mock/services'

export async function useServices() {
  // ponytail: return mock data directly; swap to $fetch when backend is ready
  return { data: mockServices as Service[], error: null }
}
