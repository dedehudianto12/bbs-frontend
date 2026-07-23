<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: allProducts } = await useAsyncData(`product-${slug}`, () =>
  queryCollection('products').all()
)

const product = computed(() =>
  (Array.isArray(allProducts.value) ? allProducts.value : []).find((p: any) => p.slug === slug)
)

const categoryLink = computed(() => {
  if (!product.value) return '/produk/belt-conveyor'
  return (product.value as any).group === 'belt-conveyor'
    ? '/produk/belt-conveyor'
    : '/produk/lainnya'
})

// ponytail: hardcoded WA fallback — move to site-settings collection
const waSales1 = '6281234567890'

const waMessage = computed(() => {
  if (!product.value) return ''
  return `Halo, saya ingin menanyakan ketersediaan ${(product.value as any).title}`
})

// Related products — same category, exclude current
const relatedProducts = computed(() => {
  if (!product.value) return []
  const cat = (product.value as any).category
  return (Array.isArray(allProducts.value) ? allProducts.value : [])
    .filter((p: any) => p.category === cat && p.slug !== slug)
    .slice(0, 3)
    .map((p: any) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      description: p.excerpt,
    }))
})

const breadcrumbItems = computed(() => {
  const p = product.value as any
  if (!p) return []
  const groupLabel = p.group === 'belt-conveyor' ? 'Belt Conveyor' : 'Produk Lainnya'
  const groupLink = p.group === 'belt-conveyor' ? '/produk/belt-conveyor' : '/produk/lainnya'
  return [
    { label: 'Beranda', href: '/' },
    { label: 'Produk', href: '/produk/belt-conveyor' },
    { label: groupLabel, href: groupLink },
    { label: p.title },
  ]
})

useSeoMeta({
  title: product.value
    ? `${(product.value as any).title} — BBS Conveyor`
    : 'Produk Tidak Ditemukan — BBS Conveyor',
  description: (product.value as any)?.excerpt ?? ''
})
</script>

<template>
  <article v-if="product" class="max-w-6xl mx-auto px-4 py-12">
    <Breadcrumb :items="breadcrumbItems" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      <!-- Left: image -->
      <div>
        <div class="aspect-[4/3] bg-bg-soft rounded-xl flex items-center justify-center overflow-hidden">
          <div class="text-center text-neutral/40">
            <svg class="w-16 h-16 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span class="text-sm block">{{ product.title }}</span>
          </div>
        </div>
      </div>

      <!-- Right: info -->
      <div>
        <span class="text-xs font-medium text-gold-dark bg-gold/10 px-2.5 py-1 rounded-full">
          {{ product.category }}
        </span>
        <h1 class="text-2xl md:text-3xl font-bold text-ink mt-3 mb-4 tracking-tight">
          {{ product.title }}
        </h1>
        <p class="text-neutral leading-relaxed mb-8">{{ product.excerpt }}</p>

        <div class="flex flex-wrap gap-3">
          <Button
            :href="`https://wa.me/${waSales1}?text=${encodeURIComponent(waMessage)}`"
            variant="primary"
            external
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
            Tanya via WhatsApp
          </Button>
          <Button :to="categoryLink" variant="outline">
            Lihat Produk Lain
          </Button>
        </div>
      </div>
    </div>

    <!-- Body content -->
    <div class="mt-16">
      <h2 class="text-xl font-bold text-ink mb-6">Detail Produk</h2>
      <div class="text-neutral leading-relaxed max-w-3xl prose">
        <ContentRenderer :value="product" />
      </div>
    </div>

    <!-- Related products -->
    <div v-if="relatedProducts.length" class="mt-20">
      <SectionTitle
        title="Produk Terkait"
        description="Produk lain dalam kategori yang sama."
      />
      <div class="mt-8">
        <ProductGrid :products="relatedProducts" />
      </div>
    </div>
  </article>

  <!-- Not found -->
  <div v-else class="max-w-6xl mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-bold text-ink mb-4">Produk Tidak Ditemukan</h1>
    <p class="text-neutral mb-8">Produk yang Anda cari tidak tersedia.</p>
    <Button to="/produk/belt-conveyor" variant="outline">
      &larr; Kembali ke Produk
    </Button>
  </div>
</template>
