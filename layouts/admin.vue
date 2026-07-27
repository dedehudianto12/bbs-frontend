<script setup lang="ts">
import { LayoutDashboard, Package, Tags, FileText, Wrench, Image, Factory, LogOut } from '@lucide/vue'

const { admin, logout } = useAuth()
const route = useRoute()
const displayName = computed(() => admin.value?.name ?? '')

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Produk', to: '/admin/produk', icon: Package },
  { label: 'Kategori', to: '/admin/kategori', icon: Tags },
  { label: 'Artikel', to: '/admin/artikel', icon: FileText },
  { label: 'Jasa', to: '/admin/jasa', icon: Wrench },
  { label: 'Galeri', to: '/admin/galeri', icon: Image },
  { label: 'Industri', to: '/admin/industri', icon: Factory },
]

function isActive(to: string) {
  if (to === '/admin') return route.path === '/admin'
  return route.path.startsWith(to)
}
</script>

<template>
  <div class="flex min-h-screen font-sans">
    <!-- Sidebar -->
    <aside class="flex w-[236px] shrink-0 flex-col border-r border-line bg-white">
      <!-- Brand -->
      <div class="px-5 pb-4 pt-5">
        <NuxtLink to="/admin" class="flex items-center gap-2.5 no-underline">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <span class="text-[13px] font-extrabold text-white">B</span>
          </div>
          <div>
            <div class="text-[14px] font-bold leading-tight tracking-[-0.01em] text-ink">BBS Conveyor</div>
            <div class="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Admin</div>
          </div>
        </NuxtLink>
      </div>

      <!-- Nav -->
      <nav class="flex-1 space-y-0.5 px-3 py-3">
        <p class="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted/60">Menu</p>
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :exact="item.to === '/admin'"
          class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium no-underline transition-all duration-150"
          :class="isActive(item.to)
            ? 'bg-accent/10 text-accent'
            : 'text-muted hover:bg-paper-soft hover:text-ink'"
        >
          <component
            :is="item.icon"
            :size="17"
            :stroke-width="isActive(item.to) ? 2.25 : 1.75"
            class="shrink-0 transition-colors"
          />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Footer -->
      <div class="border-t border-line px-4 py-3.5">
        <ClientOnly>
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-[11px] font-bold text-accent">
              {{ displayName?.[0]?.toUpperCase() || 'A' }}
            </div>
            <div class="min-w-0 flex-1">
              <div class="truncate text-[12px] font-semibold text-ink">{{ displayName || 'Admin' }}</div>
              <button class="mt-0.5 flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-[11px] text-muted transition-colors hover:text-accent" @click="logout()">
                <LogOut :size="11" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
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
