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
        title: 'Pengalaman 14+ Tahun',
        description:
          'Lebih dari satu dekade melayani industri manufaktur, tambang, dan logistik di seluruh Indonesia.',
      },
      {
        title: 'Produk Berkualitas',
        description:
          'Belt conveyor PVC, PU, Rubber, dan komponen dari material pilihan dengan standar industri.',
      },
      {
        title: 'Tim Teknisi Profesional',
        description:
          'Didukung oleh teknisi berpengalaman untuk instalasi, perbaikan, dan perawatan di lokasi Anda.',
      },
      {
        title: 'Jangkauan Nasional',
        description:
          'Melayani pengiriman dan pengerjaan ke seluruh Indonesia — Sumatera, Jawa, Kalimantan, hingga Indonesia Timur.',
      },
    ],
  },
  statistics: {
    projects: 500,
    years: 14,
    clients: 120,
    engineers: 25,
  },
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
