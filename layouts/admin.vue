<script setup lang="ts">
const { admin, logout } = useAuth()
const route = useRoute()
const displayName = ref('')

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

onMounted(() => { displayName.value = admin.value?.name ?? '' })
</script>

<template>
  <div style="display:flex;min-height:100vh;font-family:'Inter',system-ui,sans-serif">
    <!-- Sidebar — brand steel dark -->
    <aside style="width:220px;flex-shrink:0;background:rgb(var(--steel));color:#fff;display:flex;flex-direction:column">
      <div style="padding:20px 20px 16px;border-bottom:1px solid rgb(var(--steel-soft))">
        <NuxtLink to="/admin" style="font-size:15px;font-weight:700;color:#fff;text-decoration:none;letter-spacing:-0.01em">
          BBS<span style="color:rgb(var(--accent))">.</span> Admin
        </NuxtLink>
      </div>
      <nav style="flex:1;padding:12px 12px">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :style="{
            display:'block',padding:'9px 14px',fontSize:'13px',borderRadius:'6px',marginBottom:'1px',textDecoration:'none',
            color:isActive(item.to)?'#fff':'rgba(255,255,255,0.6)',fontWeight:isActive(item.to)?'600':'400',
            background:isActive(item.to)?'rgb(var(--steel-soft))':'transparent'
          }"
          :exact="item.to === '/admin'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div style="padding:14px 20px;border-top:1px solid rgb(var(--steel-soft))">
        <div style="font-size:12px;color:rgba(255,255,255,0.4);margin-bottom:6px">{{ displayName }}</div>
        <button style="font-size:12px;color:rgb(var(--accent));background:none;border:none;cursor:pointer;padding:0" @click="logout()">Logout</button>
      </div>
    </aside>

    <!-- Main -->
    <main style="flex:1;background:rgb(var(--paper));overflow:auto">
      <div style="padding:28px 32px">
        <slot />
      </div>
    </main>
  </div>
</template>
