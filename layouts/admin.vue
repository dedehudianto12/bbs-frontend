<script setup lang="ts">
import { LogOut, Menu, X, LayoutDashboard, Package, Wrench, Image, FileText, Tags, Settings } from '@lucide/vue'

const { logout } = useAuth()

const mobileOpen = ref(false)
const route = useRoute()

async function onLogout() {
  logout()
  await navigateTo('/admin/login')
}

function closeMobile() {
  mobileOpen.value = false
}

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Produk', to: '/admin/produk', icon: Package },
  { label: 'Jasa', to: '/admin/jasa', icon: Wrench },
  { label: 'Galeri', to: '/admin/galeri', icon: Image },
  { label: 'Artikel', to: '/admin/artikel', icon: FileText },
  { label: 'Kategori Produk', to: '/admin/kategori', icon: Tags },
  { label: 'Pengaturan Umum', to: '/admin/pengaturan', icon: Settings },
]

function isActive(to: string) {
  if (to === '/admin') return route.path === '/admin'
  return route.path.startsWith(to)
}
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Mobile overlay -->
    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-40 bg-black/40 md:hidden"
      @click="closeMobile"
    />

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-neutral-200 bg-white transition-transform md:static md:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <!-- Brand -->
      <div class="flex items-center justify-between h-14 px-4 border-b border-neutral-200 shrink-0">
        <NuxtLink to="/admin" class="font-semibold text-neutral-900" @click="closeMobile">
          BBS Admin
        </NuxtLink>
        <button class="md:hidden p-1 rounded text-neutral-500 hover:bg-neutral-100" @click="closeMobile">
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Nav links -->
      <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            isActive(item.to)
              ? 'bg-neutral-100 text-neutral-900'
              : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700',
          ]"
          @click="closeMobile"
        >
          <component :is="item.icon" class="h-4 w-4 shrink-0" />
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Logout -->
      <div class="px-3 py-4 border-t border-neutral-200">
        <button
          class="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors"
          @click="onLogout"
        >
          <LogOut class="h-4 w-4 shrink-0" />
          Keluar
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Mobile top bar -->
      <header class="flex items-center h-14 px-4 border-b border-neutral-200 bg-white shrink-0 md:hidden">
        <button class="p-1 rounded text-neutral-500 hover:bg-neutral-100" @click="mobileOpen = true">
          <Menu class="h-5 w-5" />
        </button>
        <span class="ml-3 font-semibold text-neutral-900">BBS Admin</span>
      </header>

      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
