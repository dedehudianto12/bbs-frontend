<script setup lang="ts">
import { DUR, EASE_OUT_GSAP, EASE_OUT_CSS, usePrefersReducedMotion } from '~/utils/motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const reduced = usePrefersReducedMotion()

// The achievement grid (14 tahun / 500 proyek / 120 klien / 25 teknisi) and the
// 2010 → 2015 → 2020 milestone timeline are both gone. The client's own company
// profile states no founding year and no figures at all, so every date and
// count on this page was ours, not theirs — including "berawal dari bengkel
// kecil" and the Sumatera–Kalimantan logistics network. What is left is what
// the client has actually published: founded by three siblings, the services
// they list, and the guarantees they make.

// ── Premium staggered scroll animations ──
let stCtx: ReturnType<typeof gsap.context> | null = null

onMounted(() => {
  if (reduced.value) return

  stCtx = gsap.context(() => {
    // Story text paragraphs — fade up, stagger
    gsap.from('[data-anim="story-p"]', {
      scrollTrigger: { trigger: '#our-story', start: 'top 75%' },
      y: 40,
      opacity: 0,
      duration: 0.55,
      ease: 'power3.out',
      stagger: 0.1,
    })

    // Misi B-B-S items — slide from right, stagger
    gsap.from('[data-anim="misi-item"]', {
      scrollTrigger: { trigger: '#visi-misi', start: 'top 80%' },
      x: 60,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.12,
    })

    // Document cards — fade up, stagger
    gsap.from('[data-anim="doc-card"]', {
      scrollTrigger: { trigger: '#letter-auth', start: 'top 85%' },
      y: 48,
      opacity: 0,
      duration: 0.55,
      ease: 'power3.out',
      stagger: 0.1,
    })

    // CTA — subtle scale entrance
    gsap.from('[data-anim="cta-section"]', {
      scrollTrigger: { trigger: '#cta-section', start: 'top 90%' },
      scale: 0.95,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  })
})

onBeforeUnmount(() => {
  stCtx?.revert()
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

    <!-- Our Story — single column. The left half used to hold an invented
         2010–2020 milestone timeline; without it a two-column split leaves a
         dead cell, so the prose runs on its own measure instead. -->
    <section id="our-story" class="container-tech py-16 md:py-24">
      <div class="max-w-3xl">
        <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Tentang Perusahaan</span>
        <h2 class="display mt-3 text-2xl text-ink md:text-3xl">
          Didirikan oleh tiga bersaudara, untuk industri Indonesia
        </h2>

        <div class="mt-8 space-y-6 text-base leading-relaxed text-muted">
          <p data-anim="story-p">
            CV Bintang Berjaya Satu — dikenal luas sebagai <strong class="text-ink">BBS Conveyor</strong> — bergerak di bidang <em class="not-italic text-ink">Conveyor System and Parts Solution</em>, didirikan oleh tiga bersaudara dengan visi menjadi penyedia kebutuhan industri pabrik di Indonesia. Kantor dan workshop kami berada di Pulo Gebang, Cakung, Jakarta Timur.
          </p>
          <p data-anim="story-p">
            Kami menyediakan berbagai jenis belt conveyor: PVC, PU, Rubber, hingga Flat Belt, serta komponen pendukung seperti roller, pulley, fastener, dan cleat. Tidak hanya menjual produk, BBS Conveyor juga memberikan layanan teknis lengkap — mulai dari konsultasi pemilihan produk, instalasi di lokasi, perbaikan dan perawatan, hingga penyambungan belt dengan metode <em class="not-italic text-ink">hot joint</em> maupun <em class="not-italic text-ink">cold joint</em>, dikerjakan di pabrik Anda atau di workshop kami.
          </p>
          <p data-anim="story-p">
            Sejak awal berdirinya, kami membangun budaya efisiensi yang mengutamakan kecepatan, kualitas, dan produktivitas. Lead time pengerjaan produk kami jaga di <strong class="text-ink">2–3 hari</strong>, setiap jasa penyambungan bergaransi, dan harga kami jaga tetap kompetitif tanpa mengurangi mutu.
          </p>
        </div>
      </div>
    </section>

    <!-- Visi & Misi -->
    <section id="visi-misi" class="bg-paper">
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
              data-anim="misi-item"
              class="group flex items-start gap-5 p-6 transition-colors hover:bg-paper md:gap-6 md:p-8"
            >
              <span
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-accent/10 text-[15px] font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-white"
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

    <!-- Letter of Authorization -->
    <section id="letter-auth" class="bg-paper">
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
            data-anim="doc-card"
            href="/documents/authorization_1.pdf"
            preview="/documents/authorization_1-1.jpg"
            title="Letter of Authorization"
            description="Dokumen otorisasi resmi dari mitra industri."
          />
          <DocumentCard
            data-anim="doc-card"
            href="/documents/authorization_2.pdf"
            preview="/documents/authorization_2-1.jpg"
            title="Sertifikasi"
            description="Sertifikasi resmi pendukung kredibilitas perusahaan."
          />
        </div>
      </div>
    </section>

    <div id="cta-section" data-anim="cta-section">
      <CTASection
        headline="Tertarik Bekerja Sama?"
        description="Konsultasikan kebutuhan belt conveyor dan komponen industri Anda dengan tim kami."
        button-text="Hubungi Kami"
        button-link="/kontak"
      />
    </div>
  </div>
</template>
