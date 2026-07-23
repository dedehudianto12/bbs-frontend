<script setup lang="ts">
// ponytail: OG image disabled — nuxt-og-image@6.7.4 resolveComponentName bug
// defineOgImage({
//   component: 'NuxtSeo',
//   title: '%s',
//   description: 'Solusi Belt & Roller Conveyor Industri',
//   siteName: 'BBS Conveyor',
//   theme: '#1A1A18',
//   colorMode: 'light',
// })
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
