<script setup lang="ts">
// Light framed hero band for every inner page — sits inside the page frame,
// left-aligned, closed off by the frame's bottom hairline.
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center'
}>(), {
  size: 'md',
  align: 'left',
})

const padding = {
  sm: 'py-12 md:py-16',
  md: 'py-14 md:py-20',
  lg: 'py-16 md:py-24',
}
</script>

<template>
  <section class="bg-paper">
    <div class="frame border-b border-line">
      <div
        class="px-5 md:px-10"
        :class="[padding[size], align === 'center' ? 'text-center' : '']"
      >
        <div v-if="$slots.breadcrumb" class="mb-6">
          <slot name="breadcrumb" />
        </div>
        <p
          v-if="eyebrow"
          class="eyebrow mb-4 text-muted"
          :class="align === 'center' ? 'justify-center' : ''"
        >
          {{ eyebrow }}
        </p>
        <h1
          class="display text-4xl text-ink md:text-5xl"
          :class="align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-3xl'"
        >
          {{ title }}
        </h1>
        <p
          v-if="description"
          class="mt-5 text-lg leading-relaxed text-muted"
          :class="align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'"
        >
          {{ description }}
        </p>
        <div v-if="$slots.default" class="mt-8" :class="align === 'center' ? 'flex justify-center' : ''">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
