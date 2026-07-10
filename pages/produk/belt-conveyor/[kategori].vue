<script setup lang="ts">
const route = useRoute()
useSeoMeta({ title: `${route.params.kategori} — Belt Conveyor — BBS Conveyor` })
</script>

<template><div>Belt Conveyor: {{ $route.params.kategori }}</div></template>
