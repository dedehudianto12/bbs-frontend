import type { Product } from "~/types/product";

export function useProducts() {
  const { api } = useApi();
  const products = useState<Product[]>("bbs-products", () => []);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetch(group?: string, kategori?: string) {
    loading.value = true;
    error.value = null;
    try {
      const params = new URLSearchParams();
      if (group) params.set("group", group);
      if (kategori) params.set("kategori", kategori);
      const qs = params.toString();
      const path = `/api/produk${qs ? `?${qs}` : ""}`;
      const data = await api<Product[]>(path);
      products.value = data;
    } catch (e: any) {
      error.value = e.statusMessage ?? "Gagal memuat produk";
    } finally {
      loading.value = false;
    }
  }

  async function add(
    item: Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">,
  ) {
    error.value = null;
    const created = await api<Product>("/api/admin/produk", {
      method: "POST",
      body: item,
    });
    products.value.push(created);
    return created;
  }

  async function update(
    id: string,
    data: Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">,
  ) {
    error.value = null;
    const updated = await api<Product>(`/api/admin/produk/${id}`, {
      method: "PUT",
      body: data,
    });
    const idx = products.value.findIndex((p) => p.id === id);
    if (idx !== -1) products.value[idx] = updated;
    return updated;
  }

  async function remove(id: string) {
    error.value = null;
    await api<null>(`/api/admin/produk/${id}`, { method: "DELETE" });
    products.value = products.value.filter((p) => p.id !== id);
  }

  async function getBySlug(slug: string): Promise<Product | undefined> {
    // ponytail: check local cache first (hit when navigating from listing → detail)
    const cached = products.value.find((p) => p.slug === slug);
    if (cached) return cached;
    try {
      return await api<Product>(`/api/produk/${slug}`);
    } catch {
      return undefined;
    }
  }

  function getByGroup(group: Product["group"]): Product[] {
    return products.value.filter((p) => p.group === group);
  }

  function getByKategori(group: Product["group"], kategori: string): Product[] {
    return products.value.filter(
      (p) => p.group === group && p.kategori === kategori,
    );
  }

  // ponytail: auto-fetch on first call for public pages; admin pages call fetch() explicitly
  if (import.meta.client && products.value.length === 0) {
    fetch();
  }

  return {
    products,
    loading,
    error,
    fetch,
    add,
    update,
    remove,
    getBySlug,
    getByGroup,
    getByKategori,
  };
}
