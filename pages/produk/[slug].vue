<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// Fetch product by slug from Nuxt Content
const { data: allProducts } = await useAsyncData(`product-${slug}`, () =>
  queryCollection('products').all()
)

const product = computed(() =>
  (Array.isArray(allProducts.value) ? allProducts.value : []).find((p: any) => p.slug === slug)
)

// Derive category link for back-navigation
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

useSeoMeta({
  title: product.value
    ? `${(product.value as any).title} — BBS Conveyor`
    : 'Produk Tidak Ditemukan — BBS Conveyor',
  description: (product.value as any)?.excerpt ?? ''
})
</script>

<template>
  <article v-if="product" class="max-w-6xl mx-auto px-4 py-12">
    <!-- Back link -->
    <NuxtLink
      :to="categoryLink"
      class="text-sm text-gold-dark hover:text-gold transition-colors mb-8 inline-block"
    >
      &larr; Kembali
    </NuxtLink>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      <!-- Left: image gallery -->
      <div>
        <div class="aspect-[4/3] bg-bg-soft rounded-lg flex items-center justify-center text-neutral text-sm mb-4">
          {{ product.title }}
        </div>
        <!-- Thumbnails -->
        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="i in 4"
            :key="i"
            class="aspect-[4/3] bg-bg-soft rounded flex items-center justify-center text-neutral text-xs border-2 border-transparent"
          >
            {{ i }}
          </div>
        </div>
      </div>

      <!-- Right: product info -->
      <div>
        <span class="text-xs text-gold-dark font-medium uppercase tracking-wide">{{ product.category }}</span>
        <h1 class="text-2xl md:text-3xl font-bold text-ink mt-1 mb-4">{{ product.title }}</h1>

        <p class="text-neutral leading-relaxed mb-6">{{ product.excerpt }}</p>

        <a
          :href="`https://wa.me/${waSales1}?text=${encodeURIComponent(waMessage)}`"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded font-medium hover:bg-[#20bd5a] transition-colors"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Tanya Ketersediaan via WhatsApp
        </a>
      </div>
    </div>

    <!-- Detail Produk from markdown body -->
    <div class="mt-16">
      <h2 class="text-xl font-semibold text-ink mb-4">Detail Produk</h2>
      <div class="text-neutral leading-relaxed max-w-3xl prose">
        <ContentRenderer :value="product" />
      </div>
    </div>
  </article>

  <!-- Not found -->
  <div v-else class="max-w-6xl mx-auto px-4 py-20 text-center">
    <h1 class="text-2xl font-bold text-ink mb-4">Produk Tidak Ditemukan</h1>
    <p class="text-neutral mb-8">Produk yang Anda cari tidak tersedia.</p>
    <NuxtLink to="/produk/belt-conveyor" class="text-gold-dark hover:text-gold font-medium transition-colors">
      &larr; Kembali ke Produk
    </NuxtLink>
  </div>
</template>
