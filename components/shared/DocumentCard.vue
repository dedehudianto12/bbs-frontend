<script setup lang="ts">
defineProps<{
  href: string
  preview?: string
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex flex-col bg-paper p-6 md:p-10">
    <!-- Preview image -->
    <a
      v-if="preview"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
      class="group relative mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-line bg-white transition-shadow hover:shadow-md"
    >
      <img
        :src="preview"
        :alt="title"
        class="w-full"
        loading="lazy"
      />
      <div class="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
        <span class="rounded-lg bg-black/60 px-4 py-2 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
          Klik untuk melihat
        </span>
      </div>
    </a>

    <h4 class="text-[15px] font-semibold text-ink" :class="{ 'text-center': !preview, 'mt-5': !preview, 'mt-4': !!preview }">{{ title }}</h4>
    <p class="mt-1 text-sm leading-relaxed text-muted" :class="{ 'text-center': !preview }">{{ description }}</p>

    <div class="mt-4 flex items-center gap-3" :class="{ 'justify-center': !preview }">
      <a
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:bg-paper-soft"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        Lihat
      </a>
      <a
        :href="href"
        download
        class="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-accent-glow"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <path d="M7 10l5 5 5-5" />
          <path d="M12 15V3" />
        </svg>
        Unduh
      </a>
    </div>
  </div>
</template>
