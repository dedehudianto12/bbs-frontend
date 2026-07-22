<script setup lang="ts">
import { Package, Wrench, Image, FileText, Tags } from "@lucide/vue";

definePageMeta({ middleware: ["admin-auth"] });

const { products } = useProducts();
const { services } = useServices();
const { items: galleryItems } = useGallery();
const { articles, getLatest } = useArticles();
const { items: kategoriItems } = useKategori();

const summaryCards = computed(() => [
  { label: "Total Produk", count: products.value.length, icon: Package },
  { label: "Total Jasa", count: services.value.length, icon: Wrench },
  { label: "Total Galeri", count: galleryItems.value.length, icon: Image },
  { label: "Total Artikel", count: articles.value.length, icon: FileText },
  { label: "Total Kategori", count: kategoriItems.value.length, icon: Tags },
]);

const recentArticles = computed(() => getLatest().slice(0, 5));
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-neutral-900 mb-6">Dashboard</h1>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <div
        v-for="card in summaryCards"
        :key="card.label"
        class="rounded-lg border border-neutral-200 bg-white p-4 flex items-start gap-3"
      >
        <div class="p-2 rounded-md bg-neutral-100 text-neutral-500 shrink-0">
          <component :is="card.icon" class="h-5 w-5" />
        </div>
        <div>
          <p class="text-2xl font-semibold text-neutral-900">
            {{ card.count }}
          </p>
          <p class="text-sm text-neutral-500">{{ card.label }}</p>
        </div>
      </div>
    </div>

    <!-- Recent Articles -->
    <div class="rounded-lg border border-neutral-200 bg-white">
      <div
        class="flex items-center justify-between px-4 py-3 border-b border-neutral-100"
      >
        <h2 class="font-medium text-neutral-900">Artikel Terbaru</h2>
        <NuxtLink
          to="/admin/artikel"
          class="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          Lihat Semua →
        </NuxtLink>
      </div>

      <div
        v-if="recentArticles.length === 0"
        class="px-4 py-8 text-center text-sm text-neutral-400"
      >
        Belum ada artikel.
      </div>

      <ul v-else class="divide-y divide-neutral-100">
        <li
          v-for="article in recentArticles"
          :key="article.id"
          class="flex items-center justify-between px-4 py-3 hover:bg-neutral-50/50 transition-colors"
        >
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-neutral-900 truncate">
              {{ article.title }}
            </p>
            <p class="text-xs text-neutral-400 mt-0.5">
              {{ article.tag }} ·
              {{
                new Date(article.publishedAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              }}
            </p>
          </div>
          <NuxtLink
            :to="`/admin/artikel`"
            class="ml-3 text-xs text-neutral-400 hover:text-neutral-600 transition-colors shrink-0"
          >
            Kelola
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
