import type { Industry } from '~/types/industry'
import { mockIndustries } from '~/data/mock/industries'

export async function useIndustries() {
  // ponytail: return mock data directly; swap to $fetch when backend is ready
  return { data: mockIndustries as Industry[], error: null }
}
