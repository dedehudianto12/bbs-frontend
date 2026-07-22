import type { Article } from "~/types/article";

export function useArticles() {
  const { api } = useApi();
  const articles = useState<Article[]>("bbs-articles", () => []);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetch() {
    loading.value = true;
    error.value = null;
    try {
      const data = await api<Article[]>("/api/artikel");
      articles.value = data;
    } catch (e: any) {
      error.value = e.statusMessage ?? "Gagal memuat artikel";
    } finally {
      loading.value = false;
    }
  }

  async function add(
    item: Omit<Article, "id" | "slug" | "createdAt" | "updatedAt">,
  ) {
    error.value = null;
    const created = await api<Article>("/api/admin/artikel", {
      method: "POST",
      body: item,
    });
    articles.value.push(created);
    return created;
  }

  async function update(
    id: string,
    data: Omit<Article, "id" | "slug" | "createdAt" | "updatedAt">,
  ) {
    error.value = null;
    const updated = await api<Article>(`/api/admin/artikel/${id}`, {
      method: "PUT",
      body: data,
    });
    const idx = articles.value.findIndex((a) => a.id === id);
    if (idx !== -1) articles.value[idx] = updated;
    return updated;
  }

  async function remove(id: string) {
    error.value = null;
    await api<null>(`/api/admin/artikel/${id}`, { method: "DELETE" });
    articles.value = articles.value.filter((a) => a.id !== id);
  }

  async function getBySlug(slug: string): Promise<Article | undefined> {
    const cached = articles.value.find((a) => a.slug === slug);
    if (cached) return cached;
    try {
      return await api<Article>(`/api/artikel/${slug}`);
    } catch {
      return undefined;
    }
  }

  function getByTag(tag: string): Article[] {
    return articles.value
      .filter((a) => a.tag === tag)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  function getTags(): string[] {
    return [...new Set(articles.value.map((a) => a.tag))];
  }

  function getLatest(): Article[] {
    return [...articles.value].sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt),
    );
  }

  if (import.meta.client && articles.value.length === 0) {
    fetch();
  }

  return {
    articles,
    loading,
    error,
    fetch,
    add,
    update,
    remove,
    getBySlug,
    getByTag,
    getTags,
    getLatest,
  };
}
