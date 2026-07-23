<script setup lang="ts">
defineProps<{
  footerColumns: { title: string; links: { label: string; href: string }[] }[]
}>()

const year = new Date().getFullYear()

const socials = [
  { label: 'WhatsApp', href: 'https://wa.me/6281234567890', icon: 'wa' },
  { label: 'Email', href: 'mailto:info@bbsconveyor.com', icon: 'mail' },
  { label: 'Lokasi', href: '/kontak', icon: 'pin' },
]

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <footer class="bg-steel text-white">
    <div class="frame frame-dark border-y-0">
      <!-- Steel banner with centered badge + blueprint grid -->
      <div class="relative border-b border-white/10 p-3 md:p-4">
        <div class="relative isolate grid h-36 place-items-center overflow-hidden rounded-lg bg-steel-soft md:h-44">
          <div class="blueprint-grid-steel absolute inset-0" aria-hidden="true" />
          <div class="hazard-stripe absolute inset-x-0 bottom-0 h-1 opacity-70" aria-hidden="true" />
          <BrandMark :size="60" />
        </div>
      </div>

      <!-- Link columns -->
      <div class="grid grid-cols-2 gap-x-8 gap-y-12 px-6 py-14 md:grid-cols-4 md:px-10 md:py-16">
        <div v-for="col in footerColumns" :key="col.title">
          <p class="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{{ col.title }}</p>
          <ul class="space-y-3.5">
            <li v-for="link in col.links" :key="link.label">
              <NuxtLink
                v-if="!link.href.startsWith('http')"
                :to="link.href"
                class="text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                {{ link.label }}
              </NuxtLink>
              <a
                v-else
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Social column -->
        <div>
          <p class="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Sosial</p>
          <ul class="space-y-3.5">
            <li v-for="s in socials" :key="s.label">
              <component
                :is="s.href.startsWith('/') ? NuxtLink : 'a'"
                :to="s.href.startsWith('/') ? s.href : undefined"
                :href="s.href.startsWith('/') ? undefined : s.href"
                :target="s.href.startsWith('http') ? '_blank' : undefined"
                :rel="s.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                class="flex items-center gap-2.5 text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                <svg v-if="s.icon === 'wa'" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                <svg v-else-if="s.icon === 'mail'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></svg>
                <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {{ s.label }}
              </component>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="flex flex-col gap-2 border-t border-white/10 px-6 py-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <span>&copy; {{ year }} CV Bintang Berjaya Satu. All Rights Reserved.</span>
        <span class="font-semibold uppercase tracking-[0.14em]">BBS · Jakarta Timur, Indonesia</span>
      </div>
    </div>
  </footer>
</template>
