<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
// product CRUD uses modal in index.vue. This page redirects there.
await navigateTo('/admin/produk', { replace: true })
</script>

<template>
  <div />
</template>
