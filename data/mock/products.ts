import type { Product } from '~/types/product'

export const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'belt-conveyor-pvc-hijau',
    name: 'Belt Conveyor PVC Hijau',
    category: 'Belt Conveyor',
    description: 'Belt conveyor PVC hijau cocok untuk industri makanan, pengemasan, dan manufaktur ringan. Permukaan halus, tahan minyak, dan mudah dibersihkan.',
    image: '/images/products/belt-pvc-hijau.jpg',
    specs: {
      Material: 'PVC',
      Warna: 'Hijau',
      Ketebalan: '2–5 mm',
      Lebar: '300–1200 mm',
      'Suhu Kerja': '-10°C s/d 80°C'
    }
  },
  {
    id: '2',
    slug: 'belt-conveyor-pu-putih',
    name: 'Belt Conveyor PU Putih',
    category: 'Belt Conveyor',
    description: 'Belt conveyor PU putih untuk industri farmasi dan makanan. Food-grade, non-toxic, dan tahan abrasi tinggi.',
    image: '/images/products/belt-pu-putih.jpg',
    specs: {
      Material: 'PU (Polyurethane)',
      Warna: 'Putih',
      Ketebalan: '1.5–4 mm',
      Lebar: '300–1500 mm',
      'Suhu Kerja': '-20°C s/d 100°C'
    }
  },
  {
    id: '3',
    slug: 'belt-conveyor-rubber-hitam',
    name: 'Belt Conveyor Rubber Hitam',
    category: 'Belt Conveyor',
    description: 'Belt conveyor rubber hitam untuk industri berat seperti tambang, semen, dan pelabuhan. Tahan gesekan dan beban berat.',
    image: '/images/products/belt-rubber-hitam.jpg',
    specs: {
      Material: 'Rubber (Karet)',
      Warna: 'Hitam',
      Ketebalan: '6–20 mm',
      Lebar: '500–2000 mm',
      'Suhu Kerja': '-30°C s/d 150°C'
    }
  },
  {
    id: '4',
    slug: 'roller-conveyor-baja',
    name: 'Roller Conveyor Baja',
    category: 'Roller',
    description: 'Roller conveyor baja untuk sistem material handling di gudang, pabrik, dan jalur distribusi.',
    image: '/images/products/roller-baja.jpg',
    specs: {
      Material: 'Baja Karbon',
      Diameter: '50–150 mm',
      Panjang: '300–1500 mm',
      'Kapasitas Beban': 's/d 500 kg/roller'
    }
  },
  {
    id: '5',
    slug: 'roller-conveyor-stainless',
    name: 'Roller Conveyor Stainless Steel',
    category: 'Roller',
    description: 'Roller stainless steel untuk industri makanan, minuman, dan farmasi. Anti karat dan mudah disanitasi.',
    image: '/images/products/roller-stainless.jpg',
    specs: {
      Material: 'Stainless Steel 304',
      Diameter: '50–100 mm',
      Panjang: '300–1200 mm',
      'Kapasitas Beban': 's/d 300 kg/roller'
    }
  },
  {
    id: '6',
    slug: 'pulley-drive-conveyor',
    name: 'Pulley Drive Conveyor',
    category: 'Komponen',
    description: 'Pulley penggerak untuk sistem belt conveyor berbagai ukuran. Tersedia dengan rubber lagging untuk grip maksimal.',
    image: '/images/products/pulley-drive.jpg',
    specs: {
      Material: 'Baja Karbon / Stainless',
      Diameter: '100–800 mm',
      Panjang: '300–2000 mm',
      Lagging: 'Plain / Rubber'
    }
  }
]
