import { industrySchema, type Industry } from '~/types/industry'
import { mockIndustries } from '~/data/mock/industries'

export function useIndustries() {
  // ponytail: return mock data directly; swap to $fetch when backend is ready
  const result = industrySchema.array().safeParse(mockIndustries)
  if (!result.success) {
    console.error('Invalid mock industry data:', result.error.format())
  }
  const industries: Industry[] = result.success ? result.data : mockIndustries

  return { industries }
}
