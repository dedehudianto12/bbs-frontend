<script setup lang="ts">
defineProps<{
  footerColumns: { title: string; links: { label: string; href: string }[] }[]
}>()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink text-white py-16">
    <div class="mx-auto max-w-6xl px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div>
          <p class="font-bold text-lg tracking-tight">
            <span class="text-white">BBS</span>
            <span class="text-gold">Conveyor</span>
          </p>
          <p class="mt-3 text-white/50 text-sm leading-relaxed">
            Connecting Power and Motion to Drive Industrial Excellence
          </p>
          <p class="mt-3 text-white/30 text-xs">
            CV Bintang Berjaya Satu
          </p>
        </div>

        <!-- Dynamic columns -->
        <div v-for="col in footerColumns" :key="col.title">
          <p class="font-semibold text-xs tracking-wider text-white/60 uppercase mb-4">{{ col.title }}</p>
          <ul class="space-y-2.5">
            <li v-for="link in col.links" :key="link.label">
              <NuxtLink
                v-if="!link.href.startsWith('http')"
                :to="link.href"
                class="text-white/50 text-sm hover:text-gold transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
              <a
                v-else
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-white/50 text-sm hover:text-gold transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-6 border-t border-white/10 text-white/30 text-xs flex flex-col sm:flex-row sm:justify-between gap-2">
        <span>&copy; {{ year }} CV Bintang Berjaya Satu. All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>
