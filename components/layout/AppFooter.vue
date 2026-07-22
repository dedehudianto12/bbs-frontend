<script setup lang="ts">
defineProps<{
  footerColumns: { title: string; links: { label: string; href: string }[] }[]
}>()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink text-bg-soft py-12">
    <div class="mx-auto max-w-6xl px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div>
          <p class="font-bold text-lg">CV Bintang Berjaya Satu</p>
          <p class="mt-2 text-bg-soft/70 text-sm leading-relaxed">
            Connecting Power and Motion to Drive Industrial Excellence
          </p>
        </div>

        <!-- Dynamic columns from navigation -->
        <div v-for="col in footerColumns" :key="col.title">
          <p class="font-semibold text-sm mb-3">{{ col.title }}</p>
          <ul class="space-y-2">
            <li v-for="link in col.links" :key="link.label">
              <NuxtLink
                v-if="!link.href.startsWith('http')"
                :to="link.href"
                class="text-bg-soft/60 text-sm hover:text-gold transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
              <a
                v-else
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-bg-soft/60 text-sm hover:text-gold transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-neutral/30 text-bg-soft/50 text-xs">
        &copy; {{ year }} CV Bintang Berjaya Satu. All rights reserved.
      </div>
    </div>
  </footer>
</template>
