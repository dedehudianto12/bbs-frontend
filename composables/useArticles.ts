// TODO: Ganti dengan fetch ke backend Go saat API sudah tersedia.
import { articleSchema, type Article } from '~/types/article'
import { mockArticles } from '~/data/mock/articles'

let nextId = 99

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function useArticles() {
  const articles = ref<Article[]>(
    mockArticles.map((a) => ({ ...a })),
  )

  // Validate mock data on first load
  const result = articleSchema.array().safeParse(mockArticles)
  if (!result.success) {
    console.error('Invalid mock article data:', result.error.format())
  }

  function add(item: Omit<Article, 'id' | 'slug'>) {
    const id = `art-${String(++nextId).padStart(2, '0')}`
    const slug = slugify(item.title)
    articles.value.push({ ...item, id, slug })
  }

  function update(id: string, data: Omit<Article, 'id' | 'slug'>) {
    const idx = articles.value.findIndex((a) => a.id === id)
    if (idx !== -1) {
      const slug = slugify(data.title)
      articles.value[idx] = { ...data, id, slug }
    }
  }

  function remove(id: string) {
    articles.value = articles.value.filter((a) => a.id !== id)
  }

  function getBySlug(slug: string): Article | undefined {
    return articles.value.find((a) => a.slug === slug)
  }

  function getByTag(tag: string): Article[] {
    return articles.value
      .filter((a) => a.tag === tag)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  }

  function getTags(): string[] {
    return [...new Set(articles.value.map((a) => a.tag))]
  }

  function getLatest(): Article[] {
    return [...articles.value].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  }

  return { articles, add, update, remove, getBySlug, getByTag, getTags, getLatest }
}
