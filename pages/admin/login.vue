<script setup lang="ts">
definePageMeta({ layout: false, middleware: ['admin-auth'] })

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const { login } = useAuth()

async function onSubmit() {
  error.value = ''
  loading.value = true

  const ok = await login(email.value, password.value)

  if (ok) {
    await navigateTo('/admin')
  } else {
    error.value = 'Email atau kata sandi salah.'
  }

  loading.value = false
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
    <form class="w-full max-w-sm space-y-6" @submit.prevent="onSubmit">
      <h1 class="text-2xl font-bold text-center text-neutral-900">BBS Admin</h1>

      <div class="space-y-2">
        <Label for="email">Email</Label>
        <Input id="email" v-model="email" type="email" placeholder="admin@bbsconveyor.com" autocomplete="email" />
      </div>

      <div class="space-y-2">
        <Label for="password">Kata Sandi</Label>
        <Input id="password" v-model="password" type="password" placeholder="••••••" autocomplete="current-password" />
      </div>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <Button type="submit" class="w-full" :disabled="loading">
        {{ loading ? 'Memeriksa...' : 'Masuk' }}
      </Button>

      <p class="text-xs text-center text-neutral-400">
        Login sementara — mock auth, belum terhubung backend.
      </p>
    </form>
  </div>
</template>
