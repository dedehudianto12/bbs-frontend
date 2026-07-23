<script setup lang="ts">
const router = useRouter()

const { data: allProducts } = await useAsyncData('produk-belt-conveyor', () =>
  queryCollection('products').all()
)

const products = computed(() =>
  (Array.isArray(allProducts.value) ? allProducts.value : [])
    .filter((p: any) => p.group === 'belt-conveyor')
    .map((p: any) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      description: p.excerpt,
    }))
)

const subCategories = computed(() => {
  const cats = [...new Set(products.value.map((p) => p.category))]
  return cats.map((c) => ({ label: c, value: c.toLowerCase().replace(/\s+/g, '-') }))
})

function onFilterChange(subcat: string) {
  router.push(`/produk/belt-conveyor/${subcat}`)
}

useSeoMeta({
  title: 'Belt Conveyor — BBS Conveyor',
  description: 'PVC Belt, PU, Flat Belt, dan Rubber Belt berkualitas untuk kebutuhan industri Anda.'
})
</script>

<template>
  <div>
    <section class="bg-bg-soft py-14 md:py-20">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-ink tracking-tight">Belt Conveyor</h1>
        <p class="mt-4 text-neutral text-lg">Pilih dari berbagai jenis belt conveyor untuk aplikasi industri Anda.</p>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-4 py-12">
      <ProductFilter
        model-value=""
        :options="subCategories"
        class="mb-8"
        @update:model-value="onFilterChange"
      />

      <ProductGrid :products="products" />
    </div>

    <CTASection
      headline="Tidak Menemukan yang Anda Cari?"
      description="Tim kami siap membantu merekomendasikan belt conveyor yang sesuai dengan kebutuhan spesifik Anda."
      button-text="Konsultasi Gratis"
      button-link="/kontak"
    />
  </div>
</template>
