<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink text-bg-soft py-12">
    <div class="mx-auto max-w-6xl px-4">
      <div class="flex flex-col md:flex-row justify-between gap-8">
        <!-- Left: business info -->
        <div class="max-w-sm">
          <p class="font-bold text-lg">CV Bintang Berjaya Satu</p>
          <p class="mt-2 text-bg-soft/70 text-sm leading-relaxed">
            Connecting Power and Motion to Drive Industrial Excellence
          </p>
        </div>

        <!-- Right: links -->
        <div class="flex flex-col gap-2 text-sm">
          <NuxtLink to="/produk/belt-conveyor" class="text-neutral/60 hover:text-gold transition-colors">Produk</NuxtLink>
          <NuxtLink to="/artikel" class="text-neutral/60 hover:text-gold transition-colors">Artikel</NuxtLink>
          <NuxtLink to="/kontak" class="text-neutral/60 hover:text-gold transition-colors">Kontak</NuxtLink>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-neutral/30 text-bg-soft/50 text-xs">
        &copy; {{ year }} CV Bintang Berjaya Satu. All rights reserved.
      </div>
    </div>
  </footer>
</template>
