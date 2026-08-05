// static homepage config — was content/config/homepage.yml, move to backend if it changes often
export const homepageConfig = {
  hero: {
    // Leads with the one differentiator the client puts in writing — "lead time
    // pengerjaan produk hanya 2-3 hari" (company profile, p5). The previous
    // headline, "Solusi Belt & Roller Conveyor untuk Bisnis Anda", was
    // interchangeable with every competitor and answered no question the buyer
    // arrived with. He arrives because a conveyor stopped this morning.
    //
    // The `\n` are hard breaks, not formatting noise. Left to wrap on its own
    // at display size this set as four lines with "Conveyor" orphaned alone on
    // the first — the claim broken in half by whatever width the box happened
    // to be. Three lines of 17 / 16 / 15 characters, ending on the figure,
    // which is the strongest last line available.
    headline: 'Penyambungan belt\nconveyor selesai\ndalam 2–3 hari.',
    // Substrings rendered in logo gold. Lives here so a copy edit and its
    // highlight move together — this used to be a HIGHLIGHTS const inside
    // HeroSection, so changing the headline silently killed the gold.
    // Only the numeral, not "2–3 hari". Gold across two whole words at 68px
    // reads as highlighter pen; confined to the figure it reads as the one
    // measured thing on the page — accent buys weight in inverse proportion to
    // how much of it there is.
    headlineHighlights: ['2–3'],
    subheadline:
      'Kami melayani penyambungan hot joint dan cold joint di pabrik Anda maupun di workshop kami, serta menyediakan belt conveyor, roller, dan komponen industri. CV Bintang Berjaya Satu, Jakarta Timur.',
    // primaryLink is built in pages/index.vue with waLink() so the prefilled
    // message carries which CTA fired. It is deliberately not a static path.
    primaryCTA: 'Hubungi via WhatsApp',
    secondaryCTA: 'Lihat Katalog Produk',
    secondaryLink: '/produk/belt-conveyor',
    // The datasheet under the CTAs.
    //
    // "Lead time — 2–3 hari" used to lead this list and is now gone from it:
    // the rail across the foot of the hero *is* the lead time, drawn stop by
    // stop, and printing the same claim again in 12px mono two inches away is
    // the argument repeating itself rather than supporting itself.
    //
    // Every line is quotable from the client's company profile (bbsconveyor.com,
    // Dec 2024) — hot/cold joint and the onsite-or-workshop split from its
    // services page, the sectors from its numbered list. The industries row
    // names sectors rather than counting them: the source lists eight and then
    // adds "industri lainnya", so any total would be a guess.
    facts: [
      { key: 'Metode sambungan', value: 'Hot joint dan cold joint' },
      { key: 'Lokasi pengerjaan', value: 'Pabrik Anda atau workshop kami' },
      { key: 'Sektor industri', value: 'Manufaktur, pangan, farmasi, pertambangan' },
    ],

    // The 2–3 hari promise, drawn instead of asserted.
    //
    // A buyer does not believe a number in a spec row; he believes a sequence
    // he can picture happening to his own line. Four stops, each one a thing
    // somebody physically does, the last one gold because it is the only one he
    // actually wants. Day marks are relative ("H+1") rather than absolute
    // because the clock starts when he calls, not on a calendar we control.
    timeline: [
      { mark: 'H+0', label: 'Survei dan pengukuran di lokasi' },
      { mark: 'H+1', label: 'Pemotongan dan persiapan sambungan' },
      { mark: 'H+2', label: 'Proses press: hot atau cold joint' },
      { mark: 'H+2–3', label: 'Conveyor kembali beroperasi' },
    ],

    // ── The plate: one frame per stop on the rail ──────────────────────────
    //
    // This was a single still — an on-site joint in a food plant — and it was
    // the right photograph for a hero that had nothing else to say. But the
    // rail directly beneath it already narrates four stops, and printing one
    // fixed image above a four-stop sequence means three of those stops are
    // asserted in 13px type and only one is shown. The plate now carries all
    // four, in order, and the rail tracks it.
    //
    // The four are ordered as the job actually runs, and each was chosen for
    // what it proves rather than for how it looks:
    //
    //   H+0   a surveyor in hard hat and hi-vis with a clipboard against a
    //         running plant conveyor — the claim that we come to the site
    //   H+1   two hands cutting the finger splice, clips holding the lay
    //   H+2   the belt under the press bar, hoses live
    //   H+2–3 a food-grade line back in service, the fresh joint visible
    //         running away down the blue belt
    //
    // `focus` is the object-position for that frame. The four photographs are
    // not composed alike — the surveyor sits high in his frame, the press sits
    // low in its — so a single anchor that suits one crops the subject out of
    // another as the cell changes shape. Each frame carries its own.
    //
    // All four are the client's own, cropped from the 2254×2994 exports in the
    // site-activity set with the "property of CV Bintang Berjaya Satu" strip
    // (rows 2836+) removed.
    frames: [
      {
        src: '/images/hero/hero-1-survei.webp',
        alt: 'Teknisi BBS mengenakan helm dan rompi keselamatan memeriksa belt conveyor di area pabrik sambil mencatat hasil pengukuran',
        // Captions must set on one line inside the caption box — half the
        // figure width minus padding, about 147px at 360px, or roughly 19
        // characters of tracked 11px mono. Anything longer is clipped on the
        // primary target device, so none of the four exceeds it.
        caption: 'Survei di lokasi',
        focus: '58% 38%',
      },
      {
        src: '/images/hero/hero-2-finger.webp',
        alt: 'Tangan teknisi memotong pola finger splice pada belt PVC hijau yang dijepit rapi sebelum disambung',
        caption: 'Potong finger',
        focus: '50% 45%',
      },
      {
        src: '/images/hero/hero-3-press.webp',
        // The press frame is anchored high on purpose: the machine, the hoses
        // and the belt entering the bar all sit in the top two-thirds, and
        // that is the whole content of the shot.
        alt: 'Belt conveyor hijau masuk ke mesin press sambungan panas dengan selang hidrolik terpasang di workshop BBS',
        caption: 'Proses press',
        focus: '50% 30%',
      },
      {
        src: '/images/hero/hero-4-jalan.webp',
        alt: 'Belt conveyor PVC biru kembali beroperasi di ruang produksi pangan dengan sambungan baru terlihat rapi',
        caption: 'Conveyor beroperasi',
        focus: '50% 46%',
      },
    ],

    // The inset holds still while the plate moves. It is the one thing in the
    // hero the wide shots cannot carry at any crop: the finger splice itself,
    // squared up on the press bed, at the scale where you can count the teeth.
    // Keeping it fixed also gives the eye somewhere to rest — four frames
    // changing behind a fifth that also changed would read as a slideshow
    // rather than as one job progressing.
    detail: {
      src: '/images/hero/hero-detail-finger.webp',
      alt: 'Detail pola finger splice pada belt conveyor, tersusun rapat di atas landasan mesin press',
    },
  },
  company: {
    companyName: 'CV Bintang Berjaya Satu',
    tagline: 'Connecting Power and Motion to Drive Industrial Excellence',
    description:
      'BBS Conveyor adalah supplier conveyor terpercaya di Indonesia yang menyediakan belt conveyor, roller, dan komponen industri berkualitas tinggi.',
  },
  // The four values from the client's company profile (p5), cut to one line
  // each. They ran two to three clauses apiece and the client's own note was
  // that the section read as too much — a buyer scanning four cells is not
  // reading three sentences in any of them, so the detail was costing
  // comprehension rather than adding it. Each `icon` keys a pictogram in
  // components/brand/ValueIcon.vue.
  whyChooseUs: {
    items: [
      {
        icon: 'mutu',
        title: 'Produk Bermerek',
        description: 'Produk dari merek terkemuka dengan jaminan mutu.',
      },
      {
        icon: 'harga',
        title: 'Harga Kompetitif',
        description: 'Harga bersaing tanpa menurunkan standar kualitas.',
      },
      {
        icon: 'garansi',
        title: 'Garansi Pengerjaan',
        description: 'Setiap penyambungan dan instalasi kami jamin.',
      },
      {
        icon: 'respons',
        title: 'Respons Cepat',
        description: 'Setiap permintaan ditanggapi dalam hitungan jam.',
      },
    ],
  },
  leadTime: {
    days: '2–3',
    headline: 'Pengerjaan cepat dengan standar kualitas yang terjaga',
    description:
      'Conveyor yang berhenti berarti produksi yang terhenti. Karena itu setiap pekerjaan kami selesaikan sesuai jadwal, dengan pemeriksaan mutu pada setiap tahapnya.',
    steps: [
      { label: 'Konsultasi', detail: 'Tim kami mengidentifikasi kebutuhan Anda dan menyusun rekomendasi produk yang sesuai.' },
      { label: 'Fabrikasi dan Persiapan', detail: 'Produk disiapkan dan melalui pemeriksaan kualitas menyeluruh sebelum dikirim.' },
      { label: 'Pengiriman dan Instalasi', detail: 'Pengiriman ke seluruh Indonesia, atau instalasi di lokasi oleh teknisi kami.' },
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
    headline: 'Konsultasikan Kebutuhan Conveyor Anda',
    description:
      'Tim teknis kami siap membantu menentukan produk dan metode penanganan yang sesuai. Konsultasi tidak dipungut biaya dan tanpa ikatan.',
    buttonText: 'Hubungi Kami',
    buttonLink: '/kontak',
  },
  seo: {
    title: 'Solusi Belt dan Roller Conveyor Industri',
    description:
      'Supplier belt conveyor, roller, dan komponen industri. CV Bintang Berjaya Satu melayani konsultasi, instalasi, penyambungan, dan perbaikan di seluruh Indonesia.',
    ogImage: '/images/og-home.webp',
  },
}

export const whyChooseUsItems = homepageConfig.whyChooseUs.items
