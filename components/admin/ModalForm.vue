<script setup lang="ts">
defineProps<{ open: boolean; title: string }>()
defineEmits<{ close: [] }>()
</script>

<template>
  <Teleport to="body">
    <div v-if="open" style="position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center">
      <!-- Backdrop -->
      <div style="position:absolute;inset:0;background:rgba(28,30,34,0.5);backdrop-filter:blur(2px)" @click="$emit('close')" />
      <!-- Panel -->
      <div style="position:relative;background:#fff;border:1px solid rgb(var(--line));border-radius:12px;width:100%;max-width:700px;max-height:85vh;overflow-y:auto;margin:16px;box-shadow:0 20px 60px rgba(0,0,0,0.15)">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid rgb(var(--line));position:sticky;top:0;background:#fff;z-index:2">
          <h2 style="font-size:18px;font-weight:700;color:rgb(var(--ink));margin:0;letter-spacing:-0.01em">{{ title }}</h2>
          <button @click="$emit('close')" style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;border:1px solid rgb(var(--line));border-radius:6px;background:#fff;cursor:pointer;font-size:18px;color:rgb(var(--muted));line-height:1">&times;</button>
        </div>
        <div style="padding:24px">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
