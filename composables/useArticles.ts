import type { Article } from '~/types/article'
import { mockArticles } from '~/data/mock/articles'

export async function useArticles() {
  // ponytail: return mock data directly; swap to $fetch when backend is ready
  return { data: mockArticles as Article[], error: null }
}
