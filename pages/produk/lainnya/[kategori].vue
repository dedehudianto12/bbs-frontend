<script setup lang="ts">
const route = useRoute()
useSeoMeta({ title: `${route.params.kategori} — Produk Lainnya — BBS Conveyor` })
</script>

<template><div>Produk Lainnya: {{ $route.params.kategori }}</div></template>
