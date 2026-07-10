import type { Service } from '~/types/service'

export const mockServices: Service[] = [
  {
    id: '1',
    slug: 'incline-cleated-belt',
    name: 'Incline Cleated Belt',
    description: 'Pembuatan belt conveyor dengan cleat untuk jalur produksi miring. Cocok untuk membawa material curah seperti pasir, batu bara, dan hasil tambang pada sudut kemiringan tinggi tanpa risiko material longsor.',
    images: ['/images/services/incline-cleated-1.jpg', '/images/services/incline-cleated-2.jpg']
  },
  {
    id: '2',
    slug: 'profile-guide-belt',
    name: 'Profile Guide Belt',
    description: 'Pemasangan profile guide pada belt conveyor untuk mencegah belt melenceng dari jalur. Solusi efektif untuk conveyor dengan beban tidak seimbang atau jalur panjang yang rentan tracking error.',
    images: ['/images/services/profile-guide-1.jpg', '/images/services/profile-guide-2.jpg']
  },
  {
    id: '3',
    slug: 'jasa-reparasi',
    name: 'Jasa Reparasi',
    description: 'Layanan perbaikan belt conveyor rusak meliputi penyambungan sobek, penggantian bagian aus, dan perbaikan struktur rangka. Tim kami siap datang ke lokasi Anda untuk inspeksi dan perbaikan di tempat.',
    images: ['/images/services/reparasi-1.jpg', '/images/services/reparasi-2.jpg']
  },
  {
    id: '4',
    slug: 'jasa-onsite-joint',
    name: 'Jasa Onsite Joint',
    description: 'Penyambungan belt conveyor di lokasi proyek menggunakan teknik hot splicing atau cold splicing sesuai kebutuhan. Hasil sambungan kuat, presisi, dan meminimalkan downtime operasional Anda.',
    images: ['/images/services/onsite-joint-1.jpg', '/images/services/onsite-joint-2.jpg']
  }
]
