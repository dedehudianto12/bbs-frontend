<script setup lang="ts">
definePageMeta({ layout: false })
const { login, admin, check } = useAuth()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)

// Where to land after signing in. The guard puts the blocked path in ?redirect,
// so a deep link into the panel survives the detour through this page. Only
// same-site paths are honoured — an absolute URL here would turn the login form
// into an open redirect.
const target = computed(() => {
  const r = route.query.redirect
  const path = typeof r === 'string' ? r : ''
  return path.startsWith('/admin') && !path.startsWith('//') ? path : '/admin'
})

onMounted(async () => {
  await check()
  if (admin.value) await navigateTo(target.value)
})

async function handleLogin() {
  error.value = ''
  submitting.value = true
  try {
    await login(email.value, password.value)
    await navigateTo(target.value)
  } catch (e: any) {
    error.value =
      e?.data?.error || e?.message || 'Tidak dapat terhubung ke server. Silakan coba lagi.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-paper p-4 font-sans">
    <div class="w-full max-w-[380px]">
      <!-- Brand mark -->
      <div class="mb-10 text-center">
        <div class="mb-1 text-[28px] font-extrabold tracking-[-0.02em] text-ink">
          BBS<span class="text-accent">.</span>
        </div>
        <div class="text-[13px] text-muted">Admin Dashboard</div>
      </div>

      <div class="rounded-[10px] border border-line bg-white p-8">
        <form class="flex flex-col gap-5" @submit.prevent="handleLogin">
          <div v-if="error" class="rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] text-red-600">
            {{ error }}
          </div>

          <label class="block">
            <span class="text-xs font-semibold uppercase tracking-[0.08em] text-ink">Email</span>
            <input v-model="email" type="email" required autocomplete="username"
              class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none transition-colors duration-150 focus:border-accent box-border"
              placeholder="nama@perusahaan.com" />
          </label>

          <label class="block">
            <span class="text-xs font-semibold uppercase tracking-[0.08em] text-ink">Password</span>
            <input v-model="password" type="password" required autocomplete="current-password"
              class="mt-1.5 block w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-sans outline-none transition-colors duration-150 focus:border-accent box-border" />
          </label>

          <button type="submit" :disabled="submitting"
            class="mt-1 w-full cursor-pointer rounded-md border-none bg-accent px-0 py-3 text-sm font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-accent-glow">
            {{ submitting ? 'Masuk...' : 'Masuk' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
