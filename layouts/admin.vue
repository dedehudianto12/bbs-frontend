<script setup lang="ts">
const { admin, logout } = useAuth()
const route = useRoute()
const displayName = computed(() => admin.value?.name ?? '')

const navItems = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Produk', to: '/admin/produk' },
  { label: 'Kategori Produk', to: '/admin/kategori' },
  { label: 'Artikel', to: '/admin/artikel' },
  { label: 'Jasa', to: '/admin/jasa' },
  { label: 'Galeri', to: '/admin/galeri' },
  { label: 'Industri', to: '/admin/industri' },
]

function isActive(to: string) {
  if (to === '/admin') return route.path === '/admin'
  return route.path.startsWith(to)
}


</script>

<template>
  <div class="flex min-h-screen font-sans">
    <!-- Sidebar -->
    <aside class="flex w-[220px] shrink-0 flex-col bg-steel text-white">
      <div class="border-b border-steel-soft px-5 pb-4 pt-5">
        <NuxtLink to="/admin" class="text-[15px] font-bold text-white no-underline tracking-[-0.01em]">
          BBS<span class="text-accent">.</span> Admin
        </NuxtLink>
      </div>
      <nav class="flex-1 p-3">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :exact="item.to === '/admin'"
          class="mb-px block rounded-md px-3.5 py-2 text-[13px] no-underline"
          :class="isActive(item.to)
            ? 'bg-steel-soft font-semibold text-white'
            : 'bg-transparent font-normal text-white/60'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div class="border-t border-steel-soft px-5 py-3.5">
        <ClientOnly>
          <div class="mb-1.5 text-xs text-white/40">{{ displayName }}</div>
          <button class="cursor-pointer border-none bg-none p-0 text-xs text-accent" @click="logout()">Logout</button>
        </ClientOnly>
      </div>
    </aside>

    <!-- Main -->
    <main class="flex-1 overflow-auto bg-paper">
      <div class="px-8 py-7">
        <slot />
      </div>
    </main>
  </div>
</template>
