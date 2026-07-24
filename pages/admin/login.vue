<script setup lang="ts">
definePageMeta({ layout: false })
const { login, admin, check } = useAuth()
const email = ref(''); const password = ref(''); const error = ref(''); const submitting = ref(false)

onMounted(async () => { await check(); if (admin.value) await navigateTo('/admin') })

async function handleLogin() {
  error.value = ''; submitting.value = true
  try { await login(email.value, password.value); await navigateTo('/admin') }
  catch (e: any) { error.value = e?.data?.error || 'Login gagal' }
  finally { submitting.value = false }
}
</script>

<template>
  <div style="display:flex;min-height:100vh;align-items:center;justify-content:center;background:rgb(var(--paper));padding:16px;font-family:'Inter',system-ui,sans-serif">
    <div style="width:100%;max-width:380px">
      <!-- Brand mark -->
      <div style="text-align:center;margin-bottom:40px">
        <div style="font-size:28px;font-weight:800;color:rgb(var(--ink));letter-spacing:-0.02em;margin-bottom:4px">
          BBS<span style="color:rgb(var(--accent))">.</span>
        </div>
        <div style="font-size:13px;color:rgb(var(--muted))">Admin Dashboard</div>
      </div>

      <div style="background:#fff;border:1px solid rgb(var(--line));border-radius:10px;padding:32px">
        <form @submit.prevent="handleLogin" style="display:flex;flex-direction:column;gap:20px">
          <div v-if="error" style="background:#fef2f2;color:#dc2626;padding:10px 14px;border-radius:6px;font-size:13px">
            {{ error }}
          </div>

          <label style="display:block">
            <span style="font-size:12px;font-weight:600;color:rgb(var(--ink));text-transform:uppercase;letter-spacing:0.08em">Email</span>
            <input v-model="email" type="email" required
              style="display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:inherit;box-sizing:border-box;outline:none;transition:border-color .15s"
              placeholder="admin@bbs.com"
              onfocus="this.style.borderColor='rgb(var(--accent))'"
              onblur="this.style.borderColor='rgb(var(--line))'" />
          </label>

          <label style="display:block">
            <span style="font-size:12px;font-weight:600;color:rgb(var(--ink));text-transform:uppercase;letter-spacing:0.08em">Password</span>
            <input v-model="password" type="password" required
              style="display:block;width:100%;margin-top:6px;padding:10px 14px;border:1px solid rgb(var(--line));border-radius:6px;font-size:14px;font-family:inherit;box-sizing:border-box;outline:none" />
          </label>

          <button type="submit" :disabled="submitting"
            style="width:100%;padding:12px;background:rgb(var(--accent));color:#fff;border:none;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;letter-spacing:0.01em;transition:background .15s;margin-top:4px"
            onmouseover="this.style.background='rgb(var(--accent-glow))'"
            onmouseout="this.style.background='rgb(var(--accent))'">
            {{ submitting ? 'Masuk...' : 'Masuk' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
