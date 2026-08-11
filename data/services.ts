// ── The service dossiers ────────────────────────────────────────────────────
//
// The backend owns each service's name and description (admin can edit them);
// what it has never owned is a photograph — `services.images` is `'{}'` for
// every row in seed.sql, so /jasa has been rendering four grey gradient
// placeholders since it shipped. This file supplies the half the API cannot:
// the client's own site photographs, and the two things a buyer actually scans
// a services page for — *is my problem on this list*, and *how do you do it*.
//
// Keyed by slug, merged over the API response in pages/jasa. A service the API
// returns that is missing here still renders (without a plate); a slug here
// that the API no longer returns does not render at all. The API stays the
// source of truth for what exists.
//
// Nothing below is invented. Every `specs` value is a restatement of the
// service's own full_description in seed.sql — methods, materials, cleat types,
// where the work happens. `keluhan` is the one editorial addition: the symptom
// the buyer arrives with, written from the same source text. No prices, no
// durations, no counts.

export interface ServiceDossier {
  /** The complaint the buyer arrives with. Set above the title, in the buyer's words. */
  keluhan: string
  /** Datasheet rows under the description. Three, so the four rows stay scannable. */
  specs: { key: string; value: string }[]
  photo: string
  /** Long-form, because the plate is the only thing on the row a screen reader cannot infer. */
  alt: string
  /** Plate caption. What you are looking at, not where it ranks. */
  caption: string
}

/**
 * Display order for /jasa, most urgent first: the two a stopped line brings
 * someone here for, then the two that get planned. The API returns rows in
 * insert order, which is neither.
 */
export const SERVICE_ORDER = [
  'jasa-onsite-joint',
  'jasa-reparasi',
  'profile-guide-belt',
  'incline-cleated-belt',
] as const

export const SERVICE_DOSSIERS: Record<string, ServiceDossier> = {
  'jasa-onsite-joint': {
    keluhan: 'Belt terputus saat produksi berlangsung dan jalur tidak dapat dibongkar.',
    specs: [
      { key: 'Metode', value: 'Hot splicing dan cold splicing' },
      { key: 'Lokasi kerja', value: 'Di pabrik Anda' },
      { key: 'Tahap akhir', value: 'Pengujian tracking dan tension' },
    ],
    photo: '/images/jasa-onsite.webp',
    alt: 'Dua teknisi bergaun dan berpenutup kepala menutup mesin press portabel pada belt PVC biru di ruang produksi pangan pelanggan saat penyambungan onsite',
    caption: 'Ruang produksi pangan · press onsite di jalur',
  },

  'jasa-reparasi': {
    keluhan: 'Belt sobek, cleat terlepas, fastener longgar, atau rangka bergeser.',
    specs: [
      { key: 'Lingkup', value: 'Belt, cleat, sidewall, fastener' },
      { key: 'Cakupan tambahan', value: 'Rangka, pulley, bearing' },
      { key: 'Lokasi kerja', value: 'Di lokasi atau di workshop' },
    ],
    photo: '/images/jasa-reparasi.webp',
    alt: 'Teknisi BBS mengelas rangka conveyor melengkung dengan pelindung wajah di workshop, percikan busur las terlihat di sepanjang sambungan',
    caption: 'Pengelasan rangka conveyor · workshop',
  },

  'profile-guide-belt': {
    keluhan: 'Belt melenceng keluar jalur, terutama ketika beban tidak seimbang.',
    specs: [
      { key: 'Tipe guide', value: 'V-guide, rectangular, custom' },
      { key: 'Pemasangan', value: 'Bonding presisi tinggi' },
      { key: 'Tahap akhir', value: 'Pengujian tracking' },
    ],
    photo: '/images/jasa-guide.webp',
    alt: 'Teknisi BBS berhelm dan rompi hi-vis melas profile guide hijau ke punggung belt PVC putih menggunakan mesin las udara panas di workshop',
    caption: 'Pemasangan profile guide · workshop',
  },

  'incline-cleated-belt': {
    keluhan: 'Material meluncur turun ketika jalur dibuat menanjak.',
    specs: [
      { key: 'Tipe cleat', value: 'T, C, L' },
      { key: 'Material', value: 'PVC, PU, rubber' },
      { key: 'Tahap awal', value: 'Assessment di lokasi' },
    ],
    photo: '/images/jasa-incline.webp',
    alt: 'Conveyor miring dengan sekat cleat hijau tua dan pagar pengaman di dalam pabrik pelanggan',
    caption: 'Incline conveyor · cleat dan sidewall',
  },
}

// ── The onsite / workshop split ─────────────────────────────────────────────
// The question every one of the four services answers differently, and the one
// the old page never answered at all.
export const WORK_PLACES = [
  {
    key: 'Onsite',
    title: 'Di pabrik Anda',
    text: 'Tim beserta peralatan splicing kami mobilisasi ke lokasi Anda. Metode ini sesuai untuk belt yang sudah terpasang, jalur yang tidak dapat dibongkar, serta pekerjaan dengan waktu henti yang harus sesingkat mungkin.',
    // Deliberately not the masthead frame — the same photograph twice inside
    // one screen reads as a stock library with two entries.
    photo: '/images/jasa-lokasi-onsite.webp',
    alt: 'Teknisi berhelm dan rompi hi-vis mengukur belt conveyor dengan meteran langsung di jalur produksi pabrik pelanggan',
    caption: 'Pengukuran langsung pada conveyor pelanggan',
  },
  {
    key: 'Workshop',
    title: 'Di workshop Pulo Gebang',
    text: 'Belt dikerjakan di workshop kami. Metode ini sesuai untuk belt baru, pemasangan cleat dan profile guide, serta pekerjaan yang memerlukan mesin press dan bidang kerja yang rata.',
    photo: '/images/jasa-lokasi-workshop.webp',
    alt: 'Dua kru BBS membentangkan belt PVC hijau bertekstur di antara gulungan belt terbungkus di workshop Pulo Gebang',
    caption: 'Workshop Pulo Gebang, Cakung',
  },
] as const

// ── Hot joint vs cold joint ─────────────────────────────────────────────────
// Straight from the Onsite Joint description in seed.sql. The 90% figure is the
// client's own published claim, not ours — it is quoted, not computed.
export const JOINT_METHODS = [
  {
    name: 'Hot joint',
    sub: 'Vulkanisasi panas',
    text: 'Sambungan dipanaskan di bawah mesin press khusus hingga menyatu. Metode ini menghasilkan sambungan yang paling kuat dan paling tahan lama.',
    specs: [
      { key: 'Kekuatan', value: '±90% kekuatan asli belt' },
      { key: 'Aplikasi', value: 'Belt PVC dan PU' },
      // Not "Pangan, farmasi". The source (seed.sql, Cold Splicing) says only
      // "cocok untuk belt PVC/PU dan aplikasi dengan downtime terbatas" — food
      // and pharmaceutical were extrapolated from the belt material, and those
      // are the two sectors where naming a splicing method carries regulatory
      // weight we cannot vouch for.
      { key: 'Sektor', value: 'Aplikasi dengan waktu henti terbatas' },
    ],
    photo: '/images/jasa-joint-hot.webp',
    alt: 'Teknisi menyiapkan sambungan belt PVC hijau di atas plat press, jari-jari sambungan dijepit binder clip sebelum dipanaskan',
  },
  {
    name: 'Cold joint',
    sub: 'Adhesive, tanpa panas',
    text: 'Sambungan direkatkan menggunakan adhesive khusus. Waktu pengerjaannya lebih singkat sehingga jalur produksi dapat kembali beroperasi lebih cepat.',
    specs: [
      { key: 'Kekuatan', value: 'Sesuai spesifikasi adhesive' },
      { key: 'Aplikasi', value: 'Rubber belt, beban berat' },
      { key: 'Sektor', value: 'Pertambangan, pelabuhan' },
    ],
    photo: '/images/jasa-hotjoint.webp',
    alt: 'Plat pemanas merah pada mesin press vulkanisasi, dilihat memanjang di sepanjang bed press',
  },
] as const
