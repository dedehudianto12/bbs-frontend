// Single source for contact info — used across kontak page, product detail,
// CTA section, navbar, and footer. Change here, updates everywhere.
export const contactInfo = {
  waSales1: '6281287859061',
  waSales2: '6282110227634',
  email: 'sales@bbsconveyor.com',
  alamat: 'Jl. Pulo Bangka, RT.1/RW.9, Pulo Gebang\nKec. Cakung, Jakarta Timur\nDKI Jakarta 13950',
  jamOperasional: 'Senin – Jumat, 08:00 – 17:00 WIB\nSabtu, 08:00 – 12:00 WIB',
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
