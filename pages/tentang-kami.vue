<script setup lang="ts">
import { homepageConfig, whyChooseUsItems } from '~/data/homepage'

const stats = computed(() => {
  const s = homepageConfig.statistics
  return [
    { label: 'Tahun Pengalaman', value: `${s.years}+` },
    { label: 'Proyek Selesai', value: `${s.projects}+` },
    { label: 'Klien Aktif', value: `${s.clients}+` },
    { label: 'Tenaga Teknisi', value: `${s.engineers}+` },
  ]
})

useSeoMeta({
  title: 'Tentang Kami — BBS Conveyor',
  description: 'CV Bintang Berjaya Satu (BBS Conveyor) — supplier belt conveyor, roller, dan komponen industri terpercaya.'
})
</script>

<template>
  <div>
    <PageHero
      size="lg"
      eyebrow="Tentang Kami"
      title="CV Bintang Berjaya Satu"
      description="Connecting Power and Motion to Drive Industrial Excellence"
    />

    <section class="container-tech py-16 md:py-24">
      <div class="max-w-3xl space-y-6 text-lg leading-relaxed text-muted">
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

    <!-- Visi & Misi -->
    <section class="bg-paper">
      <div class="frame">
        <div class="border-b border-line px-6 py-14 md:px-10 md:py-16">
          <SectionTitle
            align="center"
            eyebrow="Visi &amp; Misi"
            title="Arah dan tujuan kami"
            description="Didirikan oleh tiga bersaudara dengan visi besar — setiap langkah kami dipandu oleh prinsip yang tercermin dalam nama BBS."
          />
        </div>

        <div class="grid grid-cols-1 gap-px bg-line lg:grid-cols-2">
          <!-- Visi -->
          <div class="bg-steel p-8 md:p-12 lg:p-14">
            <div class="flex items-start gap-3">
              <svg class="mt-0.5 h-6 w-6 shrink-0 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
              </svg>
              <div>
                <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">Visi</p>
                <p class="mt-4 text-xl font-medium leading-relaxed text-white md:text-2xl">
                  &ldquo;Menjadi Penyedia kebutuhan industri pabrik dalam berbagai aspek dengan cakupan secara nasional hingga internasional&rdquo;
                </p>
              </div>
            </div>
          </div>

          <!-- Misi -->
          <div class="divide-y divide-line bg-paper-soft">
            <div
              v-for="(item, i) in [
                {
                  letter: 'B',
                  label: 'Bintang',
                  text: 'Menjadi bintang dalam industri conveyor dengan memegang teguh prinsip integritas dan transparansi',
                },
                {
                  letter: 'B',
                  label: 'Berjaya',
                  text: 'Mencapai kejayaan melalui efisiensi operasional, kepuasan pelanggan, dan pengembangan berkelanjutan di setiap aspek bisnis',
                },
                {
                  letter: 'S',
                  label: 'Satu',
                  text: 'Menjadi satu kesatuan yang solid dan terpercaya dalam menyediakan solusi conveyor',
                },
              ]"
              :key="item.letter + i"
              class="group flex items-start gap-5 p-6 transition-colors hover:bg-paper md:gap-6 md:p-8"
            >
              <span
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-[15px] font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-white"
              >
                {{ item.letter }}
              </span>
              <div class="min-w-0">
                <h4 class="text-[15px] font-semibold text-ink">{{ item.label }}</h4>
                <p class="mt-1 text-sm leading-relaxed text-muted">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <WhyChooseUsSection :items="whyChooseUsItems" />

    <StatisticsSection v-if="stats.length" :items="stats" />

    <!-- Letter of Authorization -->
    <section class="bg-paper">
      <div class="frame border-b border-line">
        <div class="border-b border-line px-6 py-14 md:px-10 md:py-16">
          <SectionTitle
            align="center"
            title="Letter of Authorization"
            description="Didukung oleh sertifikasi dan otorisasi resmi dari mitra industri."
          />
        </div>
        <div class="grid gap-px bg-line sm:grid-cols-2">
          <DocumentCard
            href="/documents/authorization_1.pdf"
            preview="/documents/authorization_1-1.jpg"
            title="Letter of Authorization"
            description="Dokumen otorisasi resmi dari mitra industri."
          />
          <DocumentCard
            href="/documents/authorization_2.pdf"
            preview="/documents/authorization_2-1.jpg"
            title="Sertifikasi"
            description="Sertifikasi resmi pendukung kredibilitas perusahaan."
          />
        </div>
      </div>
    </section>

    <CTASection
      headline="Tertarik Bekerja Sama?"
      description="Konsultasikan kebutuhan belt conveyor dan komponen industri Anda dengan tim kami."
      button-text="Hubungi Kami"
      button-link="/kontak"
    />
  </div>
</template>
