<script setup lang="ts">
// Product-forward hero — a precise engineering side-elevation of a belt
// conveyor: head/tail pulleys, belt envelope, idlers, A-frame supports and
// carried load, annotated with dimension lines, a travel arrow and material
// callouts. Replaces the floating isometric glow illustration. Draws in with
// the shared rise/belt-travel motion; collapses under prefers-reduced-motion.
const RISE = [0, 80, 150, 220, 300, 360]

// Material / spec callouts anchored to points on the belt (SVG user units)
const callouts = [
  { label: 'PVC · PU', sub: 'FOOD-GRADE', x: 250, y: 96, tx: 250, ty: 132, delay: 380 },
  { label: 'LEBAR s/d 3000 mm', sub: '', x: 470, y: 96, tx: 470, ty: 132, delay: 440 },
  { label: 'ROLLER Ø25–76', sub: '', x: 560, y: 268, tx: 540, ty: 232, delay: 500 },
]
</script>

<template>
  <div class="relative mx-auto w-full max-w-4xl">
    <svg
      viewBox="0 0 760 340"
      class="h-auto w-full"
      fill="none"
      role="img"
      aria-label="Diagram teknis belt conveyor: pulley, belt, roller, dan rangka penyangga"
    >
      <!-- ground line -->
      <g class="animate-rise motion-reduce:animate-none" :style="{ animationDelay: `${RISE[0]}ms` }">
        <path d="M40 286h680" stroke="rgb(var(--ink) / 0.28)" stroke-width="1.5" />
        <path d="M40 292l14-6M80 292l14-6M120 292l14-6M160 292l14-6M200 292l14-6M240 292l14-6M280 292l14-6M320 292l14-6M360 292l14-6M400 292l14-6M440 292l14-6M480 292l14-6M520 292l14-6M560 292l14-6M600 292l14-6M640 292l14-6M680 292l14-6"
          stroke="rgb(var(--ink) / 0.18)" stroke-width="1" />
      </g>

      <!-- support frame (A-legs + end posts) -->
      <g class="animate-rise motion-reduce:animate-none" :style="{ animationDelay: `${RISE[1]}ms` }"
        stroke="rgb(var(--ink) / 0.55)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M140 200v86M620 200v86" />
        <path d="M250 210 224 286M250 210 276 286M250 250h-16M250 250h16" />
        <path d="M510 210 484 286M510 210 536 286M510 250h-16M510 250h16" />
      </g>

      <!-- carried load on the top run -->
      <g class="animate-rise motion-reduce:animate-none" :style="{ animationDelay: `${RISE[4]}ms` }"
        stroke="rgb(var(--ink) / 0.5)" stroke-width="2" stroke-linejoin="round">
        <rect x="232" y="112" width="46" height="30" rx="2" fill="rgb(var(--paper-soft))" />
        <rect x="452" y="108" width="52" height="34" rx="2" fill="rgb(var(--paper-soft))" />
        <path d="M245 112v30M491 108v34" stroke="rgb(var(--ink) / 0.2)" stroke-width="1.4" />
      </g>

      <!-- belt envelope + pulleys -->
      <g class="animate-rise motion-reduce:animate-none" :style="{ animationDelay: `${RISE[2]}ms` }">
        <rect x="106" y="142" width="548" height="68" rx="34"
          fill="rgb(var(--steel) / 0.04)" stroke="rgb(var(--ink) / 0.7)" stroke-width="2.4" />
        <!-- carrying surface line -->
        <path d="M140 148h480" stroke="rgb(var(--ink) / 0.28)" stroke-width="1.4" />
        <!-- belt travel: orange dashes crawling along the top run -->
        <path d="M150 148h460" stroke="rgb(var(--accent))" stroke-width="2.2"
          stroke-linecap="round" stroke-dasharray="2 12"
          class="animate-belt-travel motion-reduce:animate-none" />
        <!-- pulleys -->
        <circle cx="140" cy="176" r="22" fill="rgb(var(--paper-soft))" stroke="rgb(var(--ink) / 0.7)" stroke-width="2.4" />
        <circle cx="620" cy="176" r="22" fill="rgb(var(--paper-soft))" stroke="rgb(var(--ink) / 0.7)" stroke-width="2.4" />
        <circle cx="140" cy="176" r="4" fill="rgb(var(--ink) / 0.8)" />
        <circle cx="620" cy="176" r="4" fill="rgb(var(--ink) / 0.8)" />
      </g>

      <!-- idler rollers on the return run -->
      <g class="animate-rise motion-reduce:animate-none" :style="{ animationDelay: `${RISE[3]}ms` }">
        <circle v-for="cx in [250, 340, 430, 510]" :key="cx" :cx="cx" cy="204" r="8"
          fill="rgb(var(--paper-soft))" stroke="rgb(var(--ink) / 0.45)" stroke-width="1.8" />
      </g>

      <!-- travel-direction arrow -->
      <g class="animate-rise motion-reduce:animate-none" :style="{ animationDelay: `${RISE[3]}ms` }"
        stroke="rgb(var(--accent))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M300 128h150m0 0-10-7m10 7-10 7" />
      </g>

      <!-- overall-length dimension (orange) -->
      <g class="animate-rise motion-reduce:animate-none" :style="{ animationDelay: `${RISE[5]}ms` }">
        <path d="M106 232v34M654 232v34" stroke="rgb(var(--accent) / 0.55)" stroke-width="1.2" stroke-dasharray="3 4" />
        <path d="M106 258h548" stroke="rgb(var(--accent))" stroke-width="1.4" />
        <path d="M106 258l10-5m-10 5 10 5M654 258l-10-5m10 5-10 5" stroke="rgb(var(--accent))" stroke-width="1.4" stroke-linecap="round" />
        <rect x="342" y="248" width="76" height="20" rx="3" fill="rgb(var(--paper))" />
        <text x="380" y="262" text-anchor="middle" font-size="12" font-weight="600" letter-spacing="0.08em"
          fill="rgb(var(--accent))" class="tabular-nums">MODULAR</text>
      </g>

      <!-- width dimension (left) -->
      <g class="animate-rise motion-reduce:animate-none" :style="{ animationDelay: `${RISE[5]}ms` }"
        stroke="rgb(var(--ink) / 0.4)" stroke-width="1.2">
        <path d="M70 142v68" />
        <path d="M70 142l-5 10m5-10 5 10M70 210l-5-10m5 10 5-10" stroke-linecap="round" />
        <path d="M64 142h12M64 210h12" />
      </g>

      <!-- material / spec callouts -->
      <g v-for="c in callouts" :key="c.label" class="animate-rise motion-reduce:animate-none"
        :style="{ animationDelay: `${c.delay}ms` }">
        <circle :cx="c.tx" :cy="c.ty" r="2.5" fill="rgb(var(--accent))" />
        <path :d="`M${c.tx} ${c.ty}L${c.x} ${c.y}`" stroke="rgb(var(--ink) / 0.25)" stroke-width="1" stroke-dasharray="3 3" />
        <text :x="c.x" :y="c.y - 4" text-anchor="middle" font-size="11" font-weight="700" letter-spacing="0.12em" fill="rgb(var(--ink) / 0.72)">{{ c.label }}</text>
        <text v-if="c.sub" :x="c.x" :y="c.y + 9" text-anchor="middle" font-size="10" font-weight="600" letter-spacing="0.1em" fill="rgb(var(--accent))">{{ c.sub }}</text>
      </g>
    </svg>
  </div>
</template>
