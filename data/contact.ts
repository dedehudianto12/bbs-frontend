// Single source for contact info — used across kontak page, product detail,
// CTA section, navbar, and footer. Change here, updates everywhere.
export const contactInfo = {
  waSales1: '6281287859061',
  waSales2: '6282110227634',
  email: 'sales@bbsconveyor.com',
  alamat: 'Jl. Pulo Bangka, RT.1/RW.9, Pulo Gebang\nKec. Cakung, Jakarta Timur\nDKI Jakarta 13950',
  jamOperasional: 'Senin – Jumat, 08:00 – 17:00 WIB\nSabtu, 08:00 – 12:00 WIB',
  // Same hours, abbreviated for the hero datasheet where the full two-line
  // string will not set. Kept as its own field rather than sliced off
  // jamOperasional at runtime, so editing one does not silently truncate the
  // other.
  jamSingkat: 'Sen–Jum 08:00–17:00 WIB',

  // The same hours a third time, structured. The kontak page draws a week strip
  // from these and works out whether anyone is at the desk right now, neither of
  // which can be done safely by parsing jamOperasional — that string is prose,
  // and one edit to its dash or its comma would silently break the schedule
  // rather than fail loudly. Same reasoning as jamSingkat above: three fields,
  // one fact, and they are edited together or not at all.
  //
  // Minutes from midnight, Asia/Jakarta. `tutup: null` means closed all day.
  jamMingguan: [
    { hari: 'Senin', ringkas: 'Sen', buka: 480, tutup: 1020 },
    { hari: 'Selasa', ringkas: 'Sel', buka: 480, tutup: 1020 },
    { hari: 'Rabu', ringkas: 'Rab', buka: 480, tutup: 1020 },
    { hari: 'Kamis', ringkas: 'Kam', buka: 480, tutup: 1020 },
    { hari: 'Jumat', ringkas: 'Jum', buka: 480, tutup: 1020 },
    { hari: 'Sabtu', ringkas: 'Sab', buka: 480, tutup: 720 },
    { hari: 'Minggu', ringkas: 'Min', buka: null, tutup: null },
  ],

  waLabel1: 'Chat Sales 1',
  waLabel2: 'Chat Sales 2',

  // Marketplace storefronts, named on p12 of the client's company profile
  // (bbsconveyor.com, Dec 2024). For an Indonesian B2B buyer a shop with real
  // ratings and transaction history is a stronger trust signal than any
  // self-reported project count, and the site currently throws it away.
  //
  // The URLs are blank because the profile prints store names, not links, and a
  // search does not resolve either name to a shop we can confirm is theirs —
  // guessing a handle would point leads at a competitor. MarketplaceBand skips
  // any entry with no url and hides itself when none are set, so pasting the
  // two links below is all it takes to switch the section on.
  marketplaces: [
    { platform: 'Tokopedia', store: 'CONVEYOR BELT ID', url: '' },
    { platform: 'Shopee', store: 'CONVEYOR BELT GROSIR TEKNIK', url: '' },
  ],
} as const
