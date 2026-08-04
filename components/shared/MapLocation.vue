<script setup lang="ts">
import 'leaflet/dist/leaflet.css'

const props = withDefaults(
  defineProps<{
    lat: number
    lng: number
    label: string
    /** Shape of the map viewport. Override where the slot is not 4:3. */
    ratioClass?: string
    /**
     * Own hairline. Off when the map sits in a `gap-px bg-line` grid, which
     * paints the seam itself — a border there reads as a 2px double rule.
     */
    bordered?: boolean
  }>(),
  { ratioClass: 'aspect-[4/3]', bordered: true },
)

const mapContainer = ref<HTMLDivElement>()
let map: any = null

onMounted(async () => {
  if (!mapContainer.value) return
  const L = await import('leaflet')

  map = L.map(mapContainer.value, {
    center: [props.lat, props.lng],
    zoom: 16,
    zoomControl: false,
    attributionControl: false,
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map)

  const icon = L.divIcon({
    html: `<div style="width:28px;height:28px;background:#d6b045;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.2)"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })

  L.marker([props.lat, props.lng], { icon }).addTo(map)
    .bindPopup(`<strong>${props.label}</strong>`)
    .openPopup()
})

onBeforeUnmount(() => {
  map?.remove()
})
</script>

<template>
  <div
    class="relative z-0 overflow-hidden rounded-none"
    :class="bordered ? 'border border-line' : ''"
  >
    <div ref="mapContainer" class="w-full" :class="ratioClass" />
  </div>
</template>
