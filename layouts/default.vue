<script setup lang="ts">
const { data: navData } = await useAsyncData('site-navigation', () =>
  queryCollection('navigation').first()
)

const headerNav = computed(() => (navData.value as any)?.header ?? [])
const cta = computed(() => (navData.value as any)?.cta ?? { label: 'Hubungi Kami', href: '#' })
const footerCols = computed(() => (navData.value as any)?.footer ?? [])
</script>

<template>
  <AppNavbar
    :nav-items="headerNav"
    :cta-label="cta.label"
    :cta-href="cta.href"
  />
  <slot />
  <AppFooter :footer-columns="footerCols" />
</template>
