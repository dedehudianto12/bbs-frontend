<script setup lang="ts">
// Fetch nav data from Nuxt Content for AppNavbar
const { data: products } = await useAsyncData('nav-products', () =>
  queryCollection('products').all()
)

const { data: services } = await useAsyncData('nav-services', () =>
  queryCollection('services').all()
)

// Derive nav categories grouped by the product listing pages
const beltConveyorItems = computed(() =>
  (products.value ?? [])
    .filter((p: any) => p.category === 'Belt Conveyor')
    .map((p: any) => ({ label: p.title, link: `/produk/${p.slug}` }))
)

const produkLainnyaItems = computed(() =>
  (products.value ?? [])
    .filter((p: any) => p.category !== 'Belt Conveyor')
    .map((p: any) => ({ label: p.title, link: `/produk/${p.slug}` }))
)

const jasaItems = computed(() =>
  (services.value ?? [])
    .map((s: any) => ({ label: s.title, link: `/jasa/${s.slug}` }))
)

// ponytail: hardcoded WA fallback — move to site-settings collection when needed
const waSales1 = '6281234567890'
</script>

<template>
  <AppNavbar
    :belt-conveyor-items="beltConveyorItems"
    :produk-lainnya-items="produkLainnyaItems"
    :jasa-items="jasaItems"
    :wa-sales-1="waSales1"
  />
  <slot />
  <AppFooter />
</template>
