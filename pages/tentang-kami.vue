<script setup lang="ts">
const { data: whyChooseUs } = await useAsyncData('about-why-choose-us', () =>
  queryCollection('homepage').where('section', '=', 'why-choose-us').first()
)

const whyChooseUsItems = computed(() =>
  (whyChooseUs.value as any)?.items ?? []
)

useSeoMeta({
  title: 'Tentang Kami — BBS Conveyor',
  description: 'CV Bintang Berjaya Satu (BBS Conveyor) — supplier belt conveyor, roller, dan komponen industri terpercaya melayani manufaktur, tambang, dan pengolahan di Indonesia.'
})
</script>

<template>
  <div>
    <section class="py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-ink mb-4">CV Bintang Berjaya Satu</h1>
        <p class="text-lg text-neutral italic">"Connecting Power and Motion to Drive Industrial Excellence"</p>
      </div>
    </section>

    <section class="pb-16 md:pb-24">
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

    <section class="py-16 md:py-24">
      <div class="max-w-6xl mx-auto px-4">
        <span class="text-gold text-sm font-semibold tracking-[0.2em] uppercase">Galeri Proyek</span>
        <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="i in 4" :key="i" class="aspect-[4/3] bg-bg-soft rounded-lg flex items-center justify-center text-neutral text-sm">
            Foto Proyek {{ i }}
          </div>
        </div>
        <div class="mt-8 text-center">
          <NuxtLink to="/galeri" class="inline-block bg-ink text-white px-6 py-3 rounded font-medium hover:bg-gold hover:text-ink transition-colors">
            Lihat Galeri Lengkap
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-bg-soft">
      <div class="max-w-2xl mx-auto px-4 text-center">
        <h2 class="text-2xl font-bold text-ink mb-4">Tertarik bekerja sama dengan kami?</h2>
        <p class="text-neutral mb-8">Konsultasikan kebutuhan belt conveyor dan komponen industri Anda dengan tim kami. Kami siap membantu.</p>
        <NuxtLink to="/kontak" class="inline-block bg-ink text-white px-6 py-3 rounded font-medium hover:bg-gold hover:text-ink transition-colors">
          Hubungi Kami
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
