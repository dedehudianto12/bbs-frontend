// ponytail: static homepage config — was content/config/homepage.yml, move to backend if it changes often
export const homepageConfig = {
  hero: {
    // Leads with the one differentiator the client puts in writing — "lead time
    // pengerjaan produk hanya 2-3 hari" (company profile, p5). The previous
    // headline, "Solusi Belt & Roller Conveyor untuk Bisnis Anda", was
    // interchangeable with every competitor and answered no question the buyer
    // arrived with. He arrives because a conveyor stopped this morning.
    headline: 'Conveyor berhenti? Sambung lagi dalam 2–3 hari.',
    // Substrings rendered in logo gold. Lives here so a copy edit and its
    // highlight move together — this used to be a HIGHLIGHTS const inside
    // HeroSection, so changing the headline silently killed the gold.
    headlineHighlights: ['2–3 hari'],
    subheadline:
      'Penyambungan hot joint & cold joint di pabrik Anda atau di workshop kami. Belt conveyor, roller, dan komponen industri — CV Bintang Berjaya Satu, Jakarta Timur.',
    // primaryLink is built in pages/index.vue with waLink() so the prefilled
    // message carries which CTA fired. It is deliberately not a static path.
    primaryCTA: 'Chat WhatsApp',
    secondaryCTA: 'Lihat Produk',
    secondaryLink: '/produk/belt-conveyor',
  },
  company: {
    companyName: 'CV Bintang Berjaya Satu',
    tagline: 'Connecting Power and Motion to Drive Industrial Excellence',
    description:
      'BBS Conveyor adalah supplier conveyor terpercaya di Indonesia yang menyediakan belt conveyor, roller, dan komponen industri berkualitas tinggi.',
  },
  whyChooseUs: {
    items: [
      {
        title: 'Produk Berkualitas & Bermerek',
        description:
          'Kami menyediakan produk dan parts conveyor dari merek terkemuka dengan jaminan mutu — bukan barang kualitas rendah.',
      },
      {
        title: 'Harga Kompetitif',
        description:
          'Solusi conveyor berkualitas dengan harga yang bersaing. Nilai terbaik untuk anggaran Anda tanpa mengurangi standar.',
      },
      {
        title: 'Garansi Pengerjaan',
        description:
          'Setiap jasa penyambungan dan instalasi bergaransi. Jika ada masalah, kami kembali tanpa biaya tambahan.',
      },
      {
        title: 'Layanan Cepat & Responsif',
        description:
          'Tim kami siap merespon dalam hitungan jam — konsultasi produk, survey lokasi, hingga dukungan purna jual.',
      },
    ],
  },
  leadTime: {
    days: '2–3',
    headline: 'Pengerjaan cepat tanpa mengorbankan kualitas',
    description:
      'Kami memahami urgensi industri — conveyor yang berhenti berarti produksi yang terhenti. Setiap produk dikerjakan dengan standar tinggi dan dikirim tepat waktu.',
    steps: [
      { label: 'Konsultasi', detail: 'Tim kami memahami kebutuhan Anda dan memberikan rekomendasi produk yang tepat.' },
      { label: 'Fabrikasi & Persiapan', detail: 'Produk disiapkan dengan pengecekan kualitas menyeluruh sebelum dikirim.' },
      { label: 'Siap Dikirim / Dipasang', detail: 'Pengiriman ke seluruh Indonesia atau instalasi onsite oleh teknisi kami.' },
    ],
  },
  // No `statistics` block. "14 tahun / 500 proyek / 120 klien / 25 teknisi"
  // were invented: the client's own company profile (bbsconveyor.com, Dec 2024)
  // states no founding year and no figures of any kind, and `years: 14`
  // contradicted the "sejak 2010" claim it sat next to — it was written in 2024
  // and silently decayed. Proof on this site is carried by facts the client has
  // actually published instead: 2–3 day lead time, hot & cold joint, onsite at
  // your plant or our workshop. Any number added here must come from the
  // backend or from the client in writing.
  cta: {
    headline: 'Butuh Solusi Conveyor?',
    description:
      'Konsultasikan kebutuhan industri Anda dengan tim kami. Gratis dan tanpa komitmen.',
    buttonText: 'Hubungi Kami',
    buttonLink: '/kontak',
  },
  seo: {
    title: 'BBS Conveyor — Solusi Belt & Roller Conveyor Industri',
    description:
      'Supplier belt conveyor, roller, dan komponen industri berkualitas. CV Bintang Berjaya Satu — melayani konsultasi, instalasi, dan perbaikan di seluruh Indonesia.',
    ogImage: '/images/og-home.webp',
  },
}

export const whyChooseUsItems = homepageConfig.whyChooseUs.items
