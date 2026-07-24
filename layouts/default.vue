<script setup lang="ts">
import { headerNav, navCta, footerColumns } from '~/data/navigation'
</script>

<template>
  <AnnouncementBar />
  <AppNavbar
    :nav-items="headerNav"
    :cta-label="navCta.label"
    :cta-href="navCta.href"
  />
  <slot />
  <AppFooter :footer-columns="footerColumns" />
</template>
