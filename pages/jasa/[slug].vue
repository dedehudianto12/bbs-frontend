<script setup lang="ts">
const route = useRoute()
useSeoMeta({ title: `${route.params.slug} — Jasa — BBS Conveyor` })
</script>

<template><div>Jasa: {{ $route.params.slug }}</div></template>
