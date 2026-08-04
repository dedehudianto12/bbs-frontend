<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { get } = useApi()

const { data: productRes, error: productErr } = await useAsyncData(`product-${slug}`, () =>
  get<any>(`/produk/${slug}`)
)

const product = computed(() => productRes.value?.data ?? null)

const specEntries = computed<[string, string][]>(() => {
  const s = product.value?.specs
  if (!s) return []
  try {
    const obj = typeof s === 'string' ? JSON.parse(s) : s
    if (typeof obj !== 'object' || !obj) return []
    return Object.entries(obj)
  } catch {
    return []
  }
})

const categoryLink = computed(() => {
  if (!product.value) return '/produk/belt-conveyor'
  return product.value.group === 'belt-conveyor'
    ? '/produk/belt-conveyor'
    : '/produk/lainnya'
})

import { waLink } from '~/utils/whatsapp'

const waHref = computed(() =>
  waLink({
    produk: product.value?.name,
    kategori: product.value?.category,
  }),
)

const heroTheme = computed(() => {
  let h = 0
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
})

// Related products — same category, exclude current
const { data: allProductRes } = await useAsyncData('produk-related', () =>
  get<any[]>('/produk')
)

const relatedProducts = computed(() => {
  if (!product.value) return []
  const cat = product.value.category
  return (allProductRes.value?.data ?? [])
    .filter((p: any) => p.category === cat && p.slug !== slug)
    .slice(0, 3)
    .map((p: any) => ({
      slug: p.slug,
      title: p.name,
      category: p.category,
      description: p.description,
      image: p.image ?? null,
    }))
})

const breadcrumbItems = computed(() => {
  const p = product.value
  if (!p) return []
  const groupLabel = p.group === 'belt-conveyor' ? 'Belt Conveyor' : 'Produk Lainnya'
  const groupLink = p.group === 'belt-conveyor' ? '/produk/belt-conveyor' : '/produk/lainnya'
  return [
    { label: 'Beranda', href: '/' },
    { label: 'Produk', href: '/produk/belt-conveyor' },
    { label: groupLabel, href: groupLink },
    { label: p.name },
  ]
})

useSeoMeta({
  title: product.value
    ? `${product.value.name} — BBS Conveyor`
    : 'Produk Tidak Ditemukan — BBS Conveyor',
  description: product.value?.description ?? ''
})
</script>

<template>
  <div v-if="productErr" class="container-tech py-24 md:py-32 text-center">
    <h1 class="display text-3xl text-ink md:text-4xl">Gagal Memuat</h1>
    <p class="mt-4 text-muted">Tidak dapat menghubungi server.</p>
    <div class="mt-8 flex justify-center">
      <UiButton @click="refreshNuxtData(`product-${slug}`)">Coba Lagi</UiButton>
    </div>
  </div>

  <article v-else-if="product" class="container-tech py-12 md:py-16">
    <Breadcrumb :items="breadcrumbItems" class="mb-10" />

    <div class="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
      <!-- Left: visual (sticky on desktop) -->
      <div
        v-if="product.image"
        class="relative aspect-[4/3] w-full rounded-none overflow-hidden border border-line bg-paper-soft md:sticky md:top-24"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <GradientPanel v-else :index="heroTheme" class="aspect-[4/3] w-full md:sticky md:top-24">
        <div class="absolute inset-0 flex flex-col justify-between p-7">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">BBS Conveyor</span>
          <span class="font-display text-3xl leading-tight text-ink">{{ product.name }}</span>
        </div>
      </GradientPanel>

      <!-- Right: info -->
      <div class="flex flex-col">
        <span class="inline-block w-fit rounded-none bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent">
          {{ product.category }}
        </span>
        <h1 class="display mt-4 text-3xl text-ink md:text-4xl">
          {{ product.name }}
        </h1>
        <p v-if="product.description && !product.detail" class="mt-5 leading-relaxed text-muted">{{ product.description }}</p>

        <div class="mt-8 flex flex-wrap gap-3">
          <UiButton :href="waHref">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
            Tanya via WhatsApp
          </UiButton>
          <UiButton :href="categoryLink" variant="ghost">
            Lihat Produk Lain
          </UiButton>
        </div>

        <!-- Specs table -->
        <div v-if="specEntries.length" class="mt-8 border-t border-line pt-6">
          <h2 class="display text-lg text-ink">Spesifikasi Teknis</h2>
          <!-- Datasheet register: mono keys + tabular figures so ranges like
               "300–1200 mm" align column-wise down the plate. -->
          <table class="mt-4 w-full">
            <tbody>
              <tr v-for="([key, val], i) in specEntries" :key="i" class="border-b border-line/40 last:border-b-0">
                <td class="spec-key w-32 whitespace-nowrap py-2.5 pr-4 align-top">{{ key }}</td>
                <td class="spec-val py-2.5">{{ val }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Detail Produk -->
        <div v-if="product.detail" class="mt-8 border-t border-line pt-6">
          <h2 class="display text-lg text-ink">Detail Produk</h2>
          <div class="prose-tech mt-4" v-html="product.detail" />
        </div>
      </div>
    </div>

    <!-- Related products -->
    <div v-if="relatedProducts.length" class="mt-20">
      <SectionTitle
        eyebrow="Terkait"
        title="Produk Terkait"
        description="Produk lain dalam kategori yang sama."
      />
      <div class="mt-10">
        <ProductGrid :products="relatedProducts" />
      </div>
    </div>
  </article>

  <!-- Not found -->
  <div v-else class="container-tech py-24 md:py-32 text-center">
    <h1 class="display text-3xl text-ink md:text-4xl">Produk Tidak Ditemukan</h1>
    <p class="mt-4 text-muted">Produk yang Anda cari tidak tersedia atau telah dihapus.</p>
    <div class="mt-8 flex justify-center">
      <UiButton href="/produk/belt-conveyor" variant="ghost">
        Kembali ke Produk
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </UiButton>
    </div>
  </div>
</template>
