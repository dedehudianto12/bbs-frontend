<script setup lang="ts">
import { JASA_SLUGS } from '~/types/category'

const { services } = useServices()

useSeoMeta({
  title: 'Jasa — BBS Conveyor',
  description: 'Layanan pembuatan, pemasangan, dan perbaikan belt conveyor oleh BBS Conveyor. Incline Cleated Belt, Profile Guide, Reparasi, dan Onsite Joint.'
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-ink mb-2">Jasa Kami</h1>
    <p class="text-neutral mb-8">Layanan profesional untuk kebutuhan belt conveyor industri Anda.</p>

    <div v-if="services.length" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <ServiceCard v-for="service in services" :key="service.id" :service="service" />
    </div>
    <p v-else class="text-neutral text-center py-12">Belum ada layanan tersedia.</p>
  </div>
</template>
