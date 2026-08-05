<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { useTransition } from '@vueuse/core'
import { timeAgo } from '~/utils/date'

const { admin } = useAuth()
const { get } = useAdminApi()

// ── Stats ──
const { data: statsRes } = await useAsyncData('admin-stats', () =>
  get<Record<string, number>>('/admin/stats'), { server: false }
)
if (import.meta.client && !statsRes.value) await refreshNuxtData('admin-stats')

const raw = computed(() => ({
  products: statsRes.value?.data?.products ?? 0,
  articles: statsRes.value?.data?.articles ?? 0,
  services: statsRes.value?.data?.services ?? 0,
  galleries: statsRes.value?.data?.galleries ?? 0,
}))

const products = useTransition(() => raw.value.products, { duration: 800 })
const articles = useTransition(() => raw.value.articles, { duration: 900 })
const services = useTransition(() => raw.value.services, { duration: 1000 })
const galleries = useTransition(() => raw.value.galleries, { duration: 1100 })

const statCards = computed(() => [
  { label: 'Produk', count: products.value, href: '/admin/produk', color: 'from-amber-500 to-orange-600', icon: 'M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z' },
  { label: 'Artikel', count: articles.value, href: '/admin/artikel', color: 'from-blue-500 to-indigo-600', icon: 'M4 6h16M4 12h16M4 18h7' },
  { label: 'Jasa', count: services.value, href: '/admin/jasa', color: 'from-emerald-500 to-teal-600', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { label: 'Galeri', count: galleries.value, href: '/admin/galeri', color: 'from-violet-500 to-purple-600', icon: 'M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2l1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z' },
])

// ── Quick create ──
const quickActions = [
  { label: 'Produk Baru', desc: 'Belt, roller, komponen', to: '/admin/produk', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { label: 'Artikel Baru', desc: 'Tips, panduan, berita', to: '/admin/artikel/baru', icon: 'M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { label: 'Jasa Baru', desc: 'Instalasi, reparasi', to: '/admin/jasa/baru', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  { label: 'Galeri Baru', desc: 'Foto proyek & instalasi', to: '/admin/galeri', icon: 'M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z' },
]

// ── Recent activity ──
const { data: recentProduk } = await useAsyncData('recent-produk', () =>
  get<any>(`/admin/produk?limit=3&sort=desc`), { server: false }
)
if (import.meta.client && !recentProduk.value) await refreshNuxtData('recent-produk')

const { data: recentArtikel } = await useAsyncData('recent-artikel', () =>
  get<any>(`/admin/artikel?limit=3&sort=desc`), { server: false }
)
if (import.meta.client && !recentArtikel.value) await refreshNuxtData('recent-artikel')

const { data: recentJasa } = await useAsyncData('recent-jasa', () =>
  get<any>(`/admin/jasa?limit=3&sort=desc`), { server: false }
)
if (import.meta.client && !recentJasa.value) await refreshNuxtData('recent-jasa')

const { data: recentGaleri } = await useAsyncData('recent-galeri', () =>
  get<any>(`/admin/galeri?limit=3&sort=desc`), { server: false }
)
if (import.meta.client && !recentGaleri.value) await refreshNuxtData('recent-galeri')

interface Activity { type: string; title: string; time: string; to: string }

const activities = computed<Activity[]>(() => {
  const items: Activity[] = []
  const add = (list: any[], type: string, getTo: (item: any) => string) => {
    for (const item of list ?? []) {
      items.push({
        type,
        title: item.name ?? item.title ?? item.caption ?? '',
        time: item.createdAt ?? '',
        to: getTo(item),
      })
    }
  }
  add(recentProduk.value?.data?.items ?? [], 'Produk', (p) => `/admin/produk`)
  add(recentArtikel.value?.data?.items ?? [], 'Artikel', (a) => `/admin/artikel`)
  add(recentJasa.value?.data?.items ?? [], 'Jasa', (j) => `/admin/jasa`)
  add(recentGaleri.value?.data?.items ?? [], 'Galeri', (g) => `/admin/galeri`)
  return items.sort((a, b) => b.time.localeCompare(a.time)).slice(0, 5)
})

const typeBadge: Record<string, string> = {
  Produk: 'bg-amber-50 text-amber-700',
  Artikel: 'bg-blue-50 text-blue-700',
  Jasa: 'bg-emerald-50 text-emerald-700',
  Galeri: 'bg-violet-50 text-violet-700',
}

</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-8 flex items-end justify-between">
      <div>
        <h1 class="m-0 text-2xl font-bold tracking-[-0.02em] text-ink">Dashboard</h1>
        <p class="mt-1 text-[13px] text-muted">
          {{ new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}
        </p>
      </div>
      <div class="text-right">
        <ClientOnly>
          <div class="text-[13px] font-semibold text-ink">{{ admin?.name ?? '' }}</div>
          <div class="text-[11px] text-muted">CV Bintang Berjaya Satu</div>
        </ClientOnly>
      </div>
    </div>

    <!-- Stat cards -->
    <div class="mb-8 grid grid-cols-4 gap-4">
      <NuxtLink
        v-for="card in statCards"
        :key="card.label"
        :to="card.href"
        class="group relative overflow-hidden rounded-xl border border-line bg-white p-5 text-inherit no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg"
      >
        <!-- gradient bar top -->
        <div :class="`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.color}`" />
        <!-- icon -->
        <div class="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-paper-soft">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-muted" aria-hidden="true">
            <path :d="card.icon" />
          </svg>
        </div>
        <div class="text-[32px] font-extrabold tracking-[-0.02em] text-ink tabular-nums">
          {{ Math.round(card.count) }}
        </div>
        <div class="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">{{ card.label }}</div>
      </NuxtLink>
    </div>

    <!-- Quick create -->
    <div class="mb-8">
      <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">Buat Baru</p>
      <div class="grid grid-cols-4 gap-3">
        <NuxtLink
          v-for="action in quickActions"
          :key="action.label"
          :to="action.to"
          class="flex items-start gap-3 rounded-lg border border-line bg-white p-4 text-inherit no-underline transition-all duration-150 hover:border-accent/40 hover:bg-accent/5"
        >
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path :d="action.icon" />
            </svg>
          </div>
          <div class="min-w-0">
            <div class="text-[13px] font-semibold text-ink">{{ action.label }}</div>
            <div class="mt-0.5 truncate text-[11px] text-muted">{{ action.desc }}</div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Recent activity -->
    <div>
      <p class="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">Aktivitas Terbaru</p>
      <div class="overflow-hidden rounded-xl border border-line bg-white">
        <div v-if="!activities.length" class="px-5 py-10 text-center text-[13px] text-muted">
          Belum ada aktivitas.
        </div>
        <div
          v-for="(act, i) in activities"
          :key="i"
          class="flex items-center gap-4 border-b border-line px-5 py-3.5 last:border-b-0 transition-colors hover:bg-paper-soft"
        >
          <span :class="`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${typeBadge[act.type] ?? 'bg-slate-50 text-slate-600'}`">
            {{ act.type }}
          </span>
          <span class="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{{ act.title }}</span>
          <span class="shrink-0 text-[11px] tabular-nums text-muted">{{ timeAgo(act.time) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
