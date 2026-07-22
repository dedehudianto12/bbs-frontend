<script setup lang="ts">
defineProps<{
  beltConveyorItems: { label: string; link: string }[]
  produkLainnyaItems: { label: string; link: string }[]
  jasaItems: { label: string; link: string }[]
  waSales1: string
}>()

const isOpen = ref(false)
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white border-b border-border">
    <div class="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
      <!-- Wordmark -->
      <NuxtLink to="/" class="text-lg font-bold shrink-0">
        <span class="text-ink">BBS</span>
        <span class="text-gold">Conveyor</span>
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-6">
        <NavDropdown label="Belt Conveyor" link="/produk/belt-conveyor" :sub-items="beltConveyorItems" />
        <NavDropdown label="Produk Lainnya" link="/produk/lainnya" :sub-items="produkLainnyaItems" />
        <NavDropdown label="Jasa" link="/jasa" :sub-items="jasaItems" />
        <NuxtLink to="/tentang-kami" class="text-neutral hover:text-ink transition-colors">Tentang Kami</NuxtLink>
        <NuxtLink to="/artikel" class="text-neutral hover:text-ink transition-colors">Artikel</NuxtLink>
        <NuxtLink to="/kontak" class="text-neutral hover:text-ink transition-colors">Kontak</NuxtLink>
      </div>

      <!-- Desktop CTA -->
      <div class="hidden md:block shrink-0">
        <a :href="`https://wa.me/${waSales1}`" target="_blank" rel="noopener noreferrer" class="inline-block bg-ink text-white px-4 py-2 rounded font-medium hover:bg-gold hover:text-ink transition-colors">
          Hubungi Kami
        </a>
      </div>

      <!-- Hamburger -->
      <button class="md:hidden flex flex-col gap-1.5 p-2" @click="isOpen = !isOpen" aria-label="Toggle menu">
        <span class="block w-5 h-0.5 bg-ink transition-transform" :class="isOpen ? 'rotate-45 translate-y-2' : ''" />
        <span class="block w-5 h-0.5 bg-ink" :class="isOpen ? 'opacity-0' : ''" />
        <span class="block w-5 h-0.5 bg-ink transition-transform" :class="isOpen ? '-rotate-45 -translate-y-2' : ''" />
      </button>
    </div>

    <!-- Mobile panel -->
    <div v-show="isOpen" class="md:hidden border-t border-border bg-white px-4 pb-4 pt-2 flex flex-col gap-3">
      <NavDropdown label="Belt Conveyor" link="/produk/belt-conveyor" :sub-items="beltConveyorItems" />
      <NavDropdown label="Produk Lainnya" link="/produk/lainnya" :sub-items="produkLainnyaItems" />
      <NavDropdown label="Jasa" link="/jasa" :sub-items="jasaItems" />
      <NuxtLink to="/tentang-kami" class="text-neutral hover:text-ink transition-colors" @click="isOpen = false">Tentang Kami</NuxtLink>
      <NuxtLink to="/artikel" class="text-neutral hover:text-ink transition-colors" @click="isOpen = false">Artikel</NuxtLink>
      <NuxtLink to="/kontak" class="text-neutral hover:text-ink transition-colors" @click="isOpen = false">Kontak</NuxtLink>
      <a :href="`https://wa.me/${waSales1}`" target="_blank" rel="noopener noreferrer" class="bg-ink text-white px-4 py-2 rounded font-medium text-center hover:bg-gold hover:text-ink transition-colors" @click="isOpen = false">
        Hubungi Kami
      </a>
    </div>
  </nav>
</template>
