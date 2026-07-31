<script setup lang="ts">
// Image with GradientPanel fallback (retains original design when no image).
withDefaults(
  defineProps<{
    src?: string | null
    alt?: string
    aspect?: string
    rounded?: string
    fit?: string
    fallbackIndex?: number
    /** Above the fold — skips lazy loading so it is not deferred. */
    eager?: boolean
  }>(),
  { eager: false },
)
</script>

<template>
  <div
    v-if="src"
    :class="[aspect ?? 'aspect-[4/3]', rounded ?? 'rounded-none', 'relative overflow-hidden bg-paper-soft w-full']"
  >
    <!-- Lazy by default. Nothing this component renders is above the fold —
         product cards, article cards and the gallery all sit below it — and the
         gallery alone is a dozen-plus images. Images are served exactly as
         uploaded (no srcset, no Cloudinary transform on the way out), so
         deferring what is off-screen is the only thing standing between a
         mid-range Android and the whole set at once. Pass `eager` if that ever
         stops being true for a given call site. -->
    <img
      :src="src"
      :alt="alt ?? ''"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      :class="['absolute inset-0 w-full h-full', fit ?? 'object-contain']"
    />
  </div>
  <GradientPanel
    v-else
    :index="fallbackIndex ?? 0"
    :rounded="rounded ?? 'rounded-none'"
    :class="aspect ?? 'aspect-[4/3]'"
    class="w-full"
  />
</template>
