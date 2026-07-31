// ponytail: static homepage config — was content/config/homepage.yml, move to backend if it changes often
export const homepageConfig = {
  hero: {
    headline: 'Solusi Belt & Roller Conveyor untuk Bisnis Anda',
    subheadline:
      'CV Bintang Berjaya Satu — Supplier belt conveyor, roller, dan komponen industri berkualitas dengan layanan teknis profesional di seluruh Indonesia.',
    primaryCTA: 'Lihat Produk',
    primaryLink: '/produk/belt-conveyor',
    secondaryCTA: 'Hubungi Kami',
    secondaryLink: '/kontak',
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
