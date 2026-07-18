import type { Product } from '~/types/product'

export const mockProducts: Product[] = [
  // ── Belt Conveyor / PVC Belt ──
  {
    id: 'bc-pvc-01',
    slug: 'pvc-belt-hijau-food-grade',
    name: 'PVC Belt Hijau Food Grade',
    group: 'belt-conveyor',
    kategori: 'pvc-belt',
    category: 'PVC Belt',
    description: 'PVC belt hijau food grade untuk industri makanan dan pengemasan. Permukaan halus, non-toxic, tahan minyak, dan mudah dibersihkan.',
    detail: 'PVC belt hijau food grade untuk industri makanan dan pengemasan. Permukaan halus, non-toxic, tahan minyak, dan mudah dibersihkan.',
    image: '/images/products/pvc-hijau.jpg',
    specs: { Material: 'PVC', Warna: 'Hijau', Ketebalan: '2–5 mm', Lebar: '300–1200 mm', 'Suhu Kerja': '-10°C s/d 80°C' }
  },
  {
    id: 'bc-pvc-02',
    slug: 'pvc-belt-hitam-general',
    name: 'PVC Belt Hitam General Purpose',
    group: 'belt-conveyor',
    kategori: 'pvc-belt',
    category: 'PVC Belt',
    description: 'PVC belt hitam serbaguna untuk material handling umum di gudang, pabrik, dan jalur produksi.',
    detail: 'PVC belt hitam serbaguna untuk material handling umum di gudang, pabrik, dan jalur produksi.',
    image: '/images/products/pvc-hitam.jpg',
    specs: { Material: 'PVC', Warna: 'Hitam', Ketebalan: '2–6 mm', Lebar: '300–1500 mm', 'Suhu Kerja': '-10°C s/d 70°C' }
  },
  {
    id: 'bc-pvc-03',
    slug: 'pvc-belt-putih-packaging',
    name: 'PVC Belt Putih Packaging',
    group: 'belt-conveyor',
    kategori: 'pvc-belt',
    category: 'PVC Belt',
    description: 'PVC belt putih khusus untuk industri pengemasan dan farmasi ringan. Tampilan bersih dan profesional.',
    detail: 'PVC belt putih khusus untuk industri pengemasan dan farmasi ringan. Tampilan bersih dan profesional.',
    image: '/images/products/pvc-putih.jpg',
    specs: { Material: 'PVC', Warna: 'Putih', Ketebalan: '1.5–4 mm', Lebar: '200–1000 mm', 'Suhu Kerja': '-5°C s/d 70°C' }
  },

  // ── Belt Conveyor / PU ──
  {
    id: 'bc-pu-01',
    slug: 'pu-belt-putih-food-grade',
    name: 'PU Belt Putih Food Grade',
    group: 'belt-conveyor',
    kategori: 'pu',
    category: 'PU',
    description: 'PU belt putih food grade untuk industri makanan dan farmasi. Non-toxic, tahan abrasi, dan mudah disanitasi.',
    detail: 'PU belt putih food grade untuk industri makanan dan farmasi. Non-toxic, tahan abrasi, dan mudah disanitasi.',
    image: '/images/products/pu-putih.jpg',
    specs: { Material: 'PU (Polyurethane)', Warna: 'Putih', Ketebalan: '1.5–4 mm', Lebar: '300–1500 mm', 'Suhu Kerja': '-20°C s/d 100°C' }
  },
  {
    id: 'bc-pu-02',
    slug: 'pu-belt-anti-statis',
    name: 'PU Belt Anti-Statis',
    group: 'belt-conveyor',
    kategori: 'pu',
    category: 'PU',
    description: 'PU belt dengan sifat anti-statis untuk industri elektronik dan komponen sensitif terhadap listrik statis.',
    detail: 'PU belt dengan sifat anti-statis untuk industri elektronik dan komponen sensitif terhadap listrik statis.',
    image: '/images/products/pu-antistatis.jpg',
    specs: { Material: 'PU Anti-Statis', Warna: 'Abu-abu', Ketebalan: '2–5 mm', Lebar: '300–1200 mm', 'Resistansi': '10⁶–10⁸ Ω' }
  },
  {
    id: 'bc-pu-03',
    slug: 'pu-belt-tahan-minyak',
    name: 'PU Belt Tahan Minyak',
    group: 'belt-conveyor',
    kategori: 'pu',
    category: 'PU',
    description: 'PU belt tahan minyak untuk industri pengolahan makanan berminyak dan manufaktur dengan paparan oli.',
    detail: 'PU belt tahan minyak untuk industri pengolahan makanan berminyak dan manufaktur dengan paparan oli.',
    image: '/images/products/pu-oil.jpg',
    specs: { Material: 'PU Oil-Resistant', Warna: 'Krem', Ketebalan: '2–5 mm', Lebar: '300–1500 mm', 'Suhu Kerja': '-15°C s/d 90°C' }
  },

  // ── Belt Conveyor / Flat Belt ──
  {
    id: 'bc-flat-01',
    slug: 'flat-belt-nylon',
    name: 'Flat Belt Nylon',
    group: 'belt-conveyor',
    kategori: 'flat-belt',
    category: 'Flat Belt',
    description: 'Flat belt nylon dengan kekuatan tarik tinggi untuk conveyor jarak jauh dan beban sedang di sektor manufaktur.',
    detail: 'Flat belt nylon dengan kekuatan tarik tinggi untuk conveyor jarak jauh dan beban sedang di sektor manufaktur.',
    image: '/images/products/flat-nylon.jpg',
    specs: { Material: 'Nylon Core', Warna: 'Hijau / Putih', Ketebalan: '1–4 mm', Lebar: '20–500 mm', 'Kekuatan Tarik': 's/d 50 N/mm' }
  },
  {
    id: 'bc-flat-02',
    slug: 'flat-belt-polyester',
    name: 'Flat Belt Polyester',
    group: 'belt-conveyor',
    kategori: 'flat-belt',
    category: 'Flat Belt',
    description: 'Flat belt polyester dengan elongasi rendah, ideal untuk aplikasi yang memerlukan stabilitas dimensi tinggi.',
    detail: 'Flat belt polyester dengan elongasi rendah, ideal untuk aplikasi yang memerlukan stabilitas dimensi tinggi.',
    image: '/images/products/flat-polyester.jpg',
    specs: { Material: 'Polyester Fabric', Warna: 'Putih', Ketebalan: '0.8–3 mm', Lebar: '20–400 mm', 'Elongasi': '< 1%' }
  },
  {
    id: 'bc-flat-03',
    slug: 'flat-belt-rubber-cover',
    name: 'Flat Belt Rubber Cover',
    group: 'belt-conveyor',
    kategori: 'flat-belt',
    category: 'Flat Belt',
    description: 'Flat belt dengan lapisan rubber cover untuk grip ekstra pada permukaan licin atau miring.',
    detail: 'Flat belt dengan lapisan rubber cover untuk grip ekstra pada permukaan licin atau miring.',
    image: '/images/products/flat-rubber.jpg',
    specs: { Material: 'Rubber + Fabric', Warna: 'Hitam', Ketebalan: '2–6 mm', Lebar: '30–500 mm', 'Koefisien Gesek': 'Tinggi' }
  },

  // ── Belt Conveyor / Rubber Belt ──
  {
    id: 'bc-rub-01',
    slug: 'rubber-belt-nn',
    name: 'Rubber Belt NN (Nylon-Nylon)',
    group: 'belt-conveyor',
    kategori: 'rubber-belt',
    category: 'Rubber Belt',
    description: 'Rubber conveyor belt dengan carcass NN untuk aplikasi tambang, pelabuhan, dan industri berat dengan beban tinggi.',
    detail: 'Rubber conveyor belt dengan carcass NN untuk aplikasi tambang, pelabuhan, dan industri berat dengan beban tinggi.',
    image: '/images/products/rubber-nn.jpg',
    specs: { Material: 'Rubber + NN Carcass', Warna: 'Hitam', Ketebalan: '8–25 mm', Lebar: '500–2000 mm', 'Kekuatan': 's/d 400 N/mm' }
  },
  {
    id: 'bc-rub-02',
    slug: 'rubber-belt-ep',
    name: 'Rubber Belt EP (Polyester-Nylon)',
    group: 'belt-conveyor',
    kategori: 'rubber-belt',
    category: 'Rubber Belt',
    description: 'Rubber belt EP dengan elongasi rendah dan stabilitas tinggi untuk conveyor jarak menengah hingga jauh.',
    detail: 'Rubber belt EP dengan elongasi rendah dan stabilitas tinggi untuk conveyor jarak menengah hingga jauh.',
    image: '/images/products/rubber-ep.jpg',
    specs: { Material: 'Rubber + EP Carcass', Warna: 'Hitam', Ketebalan: '6–20 mm', Lebar: '500–1800 mm', 'Elongasi': '< 2%' }
  },
  {
    id: 'bc-rub-03',
    slug: 'rubber-belt-heat-resistant',
    name: 'Rubber Belt Tahan Panas',
    group: 'belt-conveyor',
    kategori: 'rubber-belt',
    category: 'Rubber Belt',
    description: 'Rubber belt tahan panas untuk industri semen, baja, dan pengolahan material bersuhu tinggi hingga 200°C.',
    detail: 'Rubber belt tahan panas untuk industri semen, baja, dan pengolahan material bersuhu tinggi hingga 200°C.',
    image: '/images/products/rubber-heat.jpg',
    specs: { Material: 'Heat-Resistant Rubber', Warna: 'Hitam', Ketebalan: '8–25 mm', Lebar: '500–2000 mm', 'Suhu Maks': 's/d 200°C' }
  },

  // ── Lainnya / Timing Belt ──
  {
    id: 'ln-tb-01',
    slug: 'timing-belt-at10',
    name: 'Timing Belt AT10',
    group: 'lainnya',
    kategori: 'timing-belt',
    category: 'Timing Belt',
    description: 'Timing belt AT10 dengan pitch 10 mm untuk aplikasi linear drive dan positioning presisi pada mesin industri.',
    detail: 'Timing belt AT10 dengan pitch 10 mm untuk aplikasi linear drive dan positioning presisi pada mesin industri.',
    image: '/images/products/timing-at10.jpg',
    specs: { Pitch: '10 mm', Material: 'PU + Steel Cord', Lebar: '16–100 mm', 'Suhu Kerja': '-20°C s/d 80°C' }
  },
  {
    id: 'ln-tb-02',
    slug: 'timing-belt-t5',
    name: 'Timing Belt T5',
    group: 'lainnya',
    kategori: 'timing-belt',
    category: 'Timing Belt',
    description: 'Timing belt T5 pitch 5 mm untuk aplikasi ringan seperti printer, mesin tekstil, dan otomasi kantor.',
    detail: 'Timing belt T5 pitch 5 mm untuk aplikasi ringan seperti printer, mesin tekstil, dan otomasi kantor.',
    image: '/images/products/timing-t5.jpg',
    specs: { Pitch: '5 mm', Material: 'PU + Kevlar Cord', Lebar: '10–50 mm', 'Suhu Kerja': '-15°C s/d 70°C' }
  },
  {
    id: 'ln-tb-03',
    slug: 'timing-belt-htd',
    name: 'Timing Belt HTD 8M',
    group: 'lainnya',
    kategori: 'timing-belt',
    category: 'Timing Belt',
    description: 'Timing belt HTD 8M high torque drive untuk aplikasi beban berat dengan profil gigi curvilinear.',
    detail: 'Timing belt HTD 8M high torque drive untuk aplikasi beban berat dengan profil gigi curvilinear.',
    image: '/images/products/timing-htd.jpg',
    specs: { Pitch: '8 mm', Material: 'Rubber + Fiberglass', Lebar: '20–85 mm', 'Profil': 'Curvilinear HTD' }
  },

  // ── Lainnya / Fastener ──
  {
    id: 'ln-fa-01',
    slug: 'alligator-lacing-steel',
    name: 'Alligator Lacing Baja',
    group: 'lainnya',
    kategori: 'fastener',
    category: 'Fastener',
    description: 'Alligator lacing baja untuk sambungan belt conveyor mekanis. Pemasangan mudah tanpa perlu vulkanisir panas.',
    detail: 'Alligator lacing baja untuk sambungan belt conveyor mekanis. Pemasangan mudah tanpa perlu vulkanisir panas.',
    image: '/images/products/fastener-alligator.jpg',
    specs: { Material: 'Baja Galvanis', Ketebalan: '1.5–3 mm', 'Lebar Belt': '300–1500 mm', 'Tipe': 'Alligator RS' }
  },
  {
    id: 'ln-fa-02',
    slug: 'clipper-wire-hook',
    name: 'Clipper Wire Hook Fastener',
    group: 'lainnya',
    kategori: 'fastener',
    category: 'Fastener',
    description: 'Clipper wire hook fastener untuk sambungan cepat belt conveyor ringan. Ideal untuk PVC dan PU belt.',
    detail: 'Clipper wire hook fastener untuk sambungan cepat belt conveyor ringan. Ideal untuk PVC dan PU belt.',
    image: '/images/products/fastener-clipper.jpg',
    specs: { Material: 'Stainless Steel', Diameter: '0.8–1.5 mm', 'Lebar Belt': '200–800 mm', 'Tipe': 'Clipper Lacing' }
  },
  {
    id: 'ln-fa-03',
    slug: 'bolt-solid-plate-fastener',
    name: 'Bolt Solid Plate Fastener',
    group: 'lainnya',
    kategori: 'fastener',
    category: 'Fastener',
    description: 'Bolt solid plate fastener untuk sambungan rubber belt tugas berat di tambang dan pelabuhan.',
    detail: 'Bolt solid plate fastener untuk sambungan rubber belt tugas berat di tambang dan pelabuhan.',
    image: '/images/products/fastener-bolt.jpg',
    specs: { Material: 'Baja Manganese', Ketebalan: '4–8 mm', 'Lebar Belt': '600–2000 mm', 'Kekuatan': 's/d 2000 N/mm' }
  },

  // ── Lainnya / Cleat ──
  {
    id: 'ln-cl-01',
    slug: 'cleat-pvc-tipe-c',
    name: 'Cleat PVC Tipe C',
    group: 'lainnya',
    kategori: 'cleat',
    category: 'Cleat',
    description: 'Cleat PVC tipe C untuk belt conveyor miring. Mencegah material tergelincir saat incline conveying.',
    detail: 'Cleat PVC tipe C untuk belt conveyor miring. Mencegah material tergelincir saat incline conveying.',
    image: '/images/products/cleat-pvc-c.jpg',
    specs: { Material: 'PVC', Tinggi: '10–50 mm', Tipe: 'C (Trapezoid)', Warna: 'Hijau' }
  },
  {
    id: 'ln-cl-02',
    slug: 'cleat-pu-tipe-a',
    name: 'Cleat PU Tipe A',
    group: 'lainnya',
    kategori: 'cleat',
    category: 'Cleat',
    description: 'Cleat PU tipe A food grade untuk conveyor makanan. Profil rendah, mudah dibersihkan, non-toxic.',
    detail: 'Cleat PU tipe A food grade untuk conveyor makanan. Profil rendah, mudah dibersihkan, non-toxic.',
    image: '/images/products/cleat-pu-a.jpg',
    specs: { Material: 'PU Food Grade', Tinggi: '8–25 mm', Tipe: 'A (Rectangle)', Warna: 'Putih' }
  },
  {
    id: 'ln-cl-03',
    slug: 'sidewall-cleat-rubber',
    name: 'Sidewall Cleat Rubber',
    group: 'lainnya',
    kategori: 'cleat',
    category: 'Cleat',
    description: 'Sidewall cleat rubber untuk conveyor sudut curam. Mencegah spillage material pada kemiringan tinggi.',
    detail: 'Sidewall cleat rubber untuk conveyor sudut curam. Mencegah spillage material pada kemiringan tinggi.',
    image: '/images/products/cleat-sidewall.jpg',
    specs: { Material: 'Rubber', Tinggi: '40–120 mm', Tipe: 'Sidewall + Cleat', Warna: 'Hitam' }
  },

  // ── Lainnya / Gravity Roll ──
  {
    id: 'ln-gr-01',
    slug: 'roller-conveyor-baja',
    name: 'Roller Conveyor Baja',
    group: 'lainnya',
    kategori: 'gravity-roll',
    category: 'Gravity Roll',
    description: 'Roller conveyor baja untuk sistem material handling di gudang, pabrik, dan jalur distribusi.',
    detail: 'Roller conveyor baja untuk sistem material handling di gudang, pabrik, dan jalur distribusi.',
    image: '/images/products/roller-baja.jpg',
    specs: { Material: 'Baja Karbon', Diameter: '50–150 mm', Panjang: '300–1500 mm', 'Kapasitas Beban': 's/d 500 kg/roller' }
  },
  {
    id: 'ln-gr-02',
    slug: 'roller-conveyor-stainless',
    name: 'Roller Conveyor Stainless Steel',
    group: 'lainnya',
    kategori: 'gravity-roll',
    category: 'Gravity Roll',
    description: 'Roller stainless steel untuk industri makanan, minuman, dan farmasi. Anti karat dan mudah disanitasi.',
    detail: 'Roller stainless steel untuk industri makanan, minuman, dan farmasi. Anti karat dan mudah disanitasi.',
    image: '/images/products/roller-stainless.jpg',
    specs: { Material: 'Stainless Steel 304', Diameter: '50–100 mm', Panjang: '300–1200 mm', 'Kapasitas Beban': 's/d 300 kg/roller' }
  },
  {
    id: 'ln-gr-03',
    slug: 'gravity-roll-pvc',
    name: 'Gravity Roll PVC',
    group: 'lainnya',
    kategori: 'gravity-roll',
    category: 'Gravity Roll',
    description: 'Gravity roll PVC ringan untuk conveyor manual dan aplikasi pergudangan ringan. Ekonomis dan tahan korosi.',
    detail: 'Gravity roll PVC ringan untuk conveyor manual dan aplikasi pergudangan ringan. Ekonomis dan tahan korosi.',
    image: '/images/products/roller-pvc.jpg',
    specs: { Material: 'PVC', Diameter: '40–76 mm', Panjang: '200–1000 mm', 'Kapasitas Beban': 's/d 50 kg/roller' }
  }
]
