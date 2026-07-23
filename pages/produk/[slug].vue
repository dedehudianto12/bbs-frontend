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

const heroTheme = computed(() => {
  let h = 0
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
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
  <article v-if="product" class="container-tech py-12 md:py-16">
    <Breadcrumb :items="breadcrumbItems" class="mb-10" />

    <div class="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
      <!-- Left: visual -->
      <GradientPanel :index="heroTheme" class="aspect-[4/3] w-full">
        <div class="absolute inset-0 flex flex-col justify-between p-7">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">BBS Conveyor</span>
          <span class="font-display text-3xl leading-tight text-ink">{{ product.title }}</span>
        </div>
      </GradientPanel>

      <!-- Right: info -->
      <div class="flex flex-col justify-center">
        <span class="inline-block w-fit rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-accent">
          {{ product.category }}
        </span>
        <h1 class="display mt-4 text-3xl text-ink md:text-4xl">
          {{ product.title }}
        </h1>
        <p class="mt-5 leading-relaxed text-muted">{{ product.excerpt }}</p>

        <div class="mt-8 flex flex-wrap gap-3">
          <Button
            :href="`https://wa.me/${waSales1}?text=${encodeURIComponent(waMessage)}`"
            variant="accent"
            external
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
            Tanya via WhatsApp
          </Button>
          <Button :to="categoryLink" variant="ghost">
            Lihat Produk Lain
          </Button>
        </div>
      </div>
    </div>

    <!-- Body content -->
    <div class="mt-20 border-t border-line pt-12">
      <h2 class="display text-2xl text-ink md:text-3xl">Detail Produk</h2>
      <div class="prose-tech mt-6 max-w-3xl">
        <ContentRenderer :value="product" />
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
    <p class="mt-4 text-muted">Produk yang Anda cari tidak tersedia.</p>
    <div class="mt-8 flex justify-center">
      <Button to="/produk/belt-conveyor" variant="ghost" arrow>Kembali ke Produk</Button>
    </div>
  </div>
</template>
