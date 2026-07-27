<script setup lang="ts">
// ponytail: hardcoded contact info — content/pages/kontak.md exists for editable version
const waSales1 = '6281234567890'
const waSales2 = '6281234567891'
const email = 'info@bbsconveyor.com'
const alamat = 'Jl. Industri Raya No. 123\nKawasan Industri Pulogadung\nJakarta Timur 13930'
const jamOperasional = 'Senin – Jumat, 08:00 – 17:00 WIB\nSabtu by appointment'

const alamatLines = alamat.split('\n').filter(Boolean)
const jamLines = jamOperasional.split('\n').filter(Boolean)

useSeoMeta({
  title: 'Hubungi Kami — BBS Conveyor',
  description: 'Hubungi BBS Conveyor untuk konsultasi belt conveyor, roller, dan komponen industri. Tersedia via WhatsApp, email, atau kunjungi kantor kami.'
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Kontak"
      title="Hubungi Kami"
      description="Konsultasikan kebutuhan belt conveyor Anda dengan tim kami."
    />

    <div class="container-tech py-16 md:py-24">
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
        <!-- Contact info -->
        <div class="space-y-10">
          <div>
            <p class="eyebrow mb-4 text-muted">WhatsApp</p>
            <div class="flex flex-wrap gap-3">
              <a :href="`https://wa.me/${waSales1}`" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded bg-[rgb(var(--accent))] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[rgb(var(--accent-glow))]">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
                Chat Sales 1
              </a>
              <a :href="`https://wa.me/${waSales2}`" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded px-3 py-1.5 text-xs font-semibold text-[rgb(var(--ink))] transition-colors hover:bg-[rgb(var(--paper-soft))]">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
                Chat Sales 2
              </a>
            </div>
          </div>

          <div>
            <p class="eyebrow mb-2 text-muted">Email</p>
            <a :href="`mailto:${email}`" class="text-ink transition-colors hover:text-accent">{{ email }}</a>
          </div>

          <div>
            <p class="eyebrow mb-2 text-muted">Jam Operasional</p>
            <p v-for="line in jamLines" :key="line" class="text-muted">{{ line }}</p>
          </div>

          <div>
            <p class="eyebrow mb-2 text-muted">Alamat Kantor</p>
            <p v-for="line in alamatLines" :key="line" class="text-muted">{{ line }}</p>
          </div>
        </div>

        <!-- Map -->
        <ClientOnly>
          <MapLocation :lat="-6.195" :lng="106.895" label="CV Bintang Berjaya Satu — Kawasan Industri Pulogadung" />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
