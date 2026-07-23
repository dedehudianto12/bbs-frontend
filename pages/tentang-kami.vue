<script setup lang="ts">
const { data: whyChooseUs } = await useAsyncData('about-why-choose-us', () =>
  queryCollection('homepage').where('section', '=', 'why-choose-us').first()
)

const whyChooseUsItems = computed(() =>
  (whyChooseUs.value as any)?.items ?? []
)

const { data: hp } = await useAsyncData('about-hp', () =>
  queryCollection('homepageConfig').first()
)

const hpData = computed(() => (hp.value as any) ?? {})

const stats = computed(() => {
  const s = hpData.value?.statistics
  if (!s) return []
  return [
    { label: 'Tahun Pengalaman', value: `${s.years}+` },
    { label: 'Proyek Selesai', value: `${s.projects}+` },
    { label: 'Klien Aktif', value: `${s.clients}+` },
    { label: 'Tenaga Teknisi', value: `${s.engineers}+` },
  ].filter((item) => !item.value.startsWith('undefined'))
})

useSeoMeta({
  title: 'Tentang Kami — BBS Conveyor',
  description: 'CV Bintang Berjaya Satu (BBS Conveyor) — supplier belt conveyor, roller, dan komponen industri terpercaya.'
})
</script>

<template>
  <div>
    <section class="py-16 md:py-24 bg-bg-soft">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <span class="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-3 block">Tentang Kami</span>
        <h1 class="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">CV Bintang Berjaya Satu</h1>
        <p class="text-lg text-neutral italic">"Connecting Power and Motion to Drive Industrial Excellence"</p>
      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4 space-y-5 text-neutral leading-relaxed">
        <p>
          CV Bintang Berjaya Satu — dikenal luas sebagai <strong class="text-ink">BBS Conveyor</strong> — adalah perusahaan yang bergerak di bidang penyediaan belt conveyor, roller, dan komponen industri sejak 2010. Berawal dari bengkel kecil di kawasan industri Jakarta Timur, kami telah berkembang menjadi mitra terpercaya bagi ratusan pabrik manufaktur, fasilitas tambang, dan instalasi pengolahan di seluruh Indonesia.
        </p>
        <p>
          Kami menyediakan berbagai jenis belt conveyor: PVC, PU, Rubber, hingga Flat Belt, serta komponen pendukung seperti roller, pulley, fastener, dan cleat. Tidak hanya menjual produk, BBS Conveyor juga memberikan layanan teknis lengkap — mulai dari konsultasi pemilihan produk, instalasi di lokasi, perbaikan dan perawatan, hingga penyambungan belt (onsite joint) dengan metode hot splicing maupun cold splicing.
        </p>
        <p>
          Dengan tim teknisi berpengalaman dan jaringan logistik yang menjangkau Sumatera, Jawa, Kalimantan, hingga Indonesia Timur, kami berkomitmen menghadirkan solusi material handling yang andal, tepat waktu, dan sesuai anggaran. Kepuasan pelanggan adalah prioritas kami — setiap proyek kami tangani dengan standar kualitas tinggi dan dukungan purna jual yang responsif.
        </p>
      </div>
    </section>

    <WhyChooseUsSection :items="whyChooseUsItems" />

    <StatisticsSection v-if="stats.length" :items="stats" />

    <CTASection
      headline="Tertarik Bekerja Sama?"
      description="Konsultasikan kebutuhan belt conveyor dan komponen industri Anda dengan tim kami."
      button-text="Hubungi Kami"
      button-link="/kontak"
    />
  </div>
</template>
