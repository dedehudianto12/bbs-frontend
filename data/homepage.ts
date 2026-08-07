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
    // he can picture happening to his own line. Three stops, each one a thing
    // somebody physically does, the last one gold because it is the only one he
    // actually wants. Day marks are relative ("H+2") rather than absolute
    // because the clock starts when he calls, not on a calendar we control.
    //
    // Survey and measurement were merged into one H+0–1 stop for a while,
    // because the plate had lost a photograph and the rail may not outrun the
    // plate: a stop with no frame behind it never lights, and the stop that
    // would have gone dark is H+2–3 — the gold one, the only one the buyer is
    // actually here for. The client has since supplied a survey frame, so the
    // two are separate stops again and the narrative gets its line back.
    timeline: [
      { mark: 'H+0', label: 'Survei dan asesmen di lokasi' },
      { mark: 'H+1', label: 'Pengukuran dan persiapan sambungan' },
      { mark: 'H+2', label: 'Proses press: hot atau cold joint' },
      { mark: 'H+2–3', label: 'Conveyor kembali beroperasi' },
    ],

    // ── The plate: one frame per stop on the rail ──────────────────────────
    //
    // This was a single still — an on-site joint in a food plant — and it was
    // the right photograph for a hero that had nothing else to say. But the
    // rail directly beneath it already narrates the job stop by stop, and
    // printing one fixed image above a sequence means every stop but one is
    // asserted in 13px type and never shown. The plate carries them all, in
    // order, and the rail tracks it.
    //
    // ONE FRAME PER STOP. This array and `timeline` are read in lockstep —
    // frames[i] is what stop i is showing — so they must stay the same length.
    // Adding a frame without a stop plays a photograph nothing labels; removing
    // one without dropping a stop leaves that stop permanently dark, and since
    // the dark one is always the last, that is the gold payoff node. Dev warns
    // on the mismatch (HeroSection.vue), and `sm:grid-cols-*` on the rail's <ol>
    // is set to the stop count and has to move with it.
    //
    // The four are ordered as the job actually runs, and each was chosen for
    // what it proves rather than for how it looks:
    //
    //   H+0   a surveyor with a clipboard at the customer's own conveyor —
    //         the only frame with a person in it, and the one that says
    //         somebody comes out before anything is quoted
    //   H+1   a tape measure across a belt on the press bed, read off at the
    //         edge — the job starting from a measured number, not an estimate
    //   H+2   the belt under the press bar, hoses live
    //   H+2–3 a food-grade line back in service, the fresh joint visible
    //         running away down the blue belt
    //
    // The cutting step had a fourth frame — two hands cutting the finger splice
    // — and no longer does. It was the only photograph of that step in the
    // client's set, so there is nothing to put in its place; the stop was
    // merged into H+0–1 rather than left to strand the rail.
    //
    // `focus` is the object-position for that frame. The three photographs are
    // not composed alike — the tape reads low in its frame, the press sits high
    // in its — so a single anchor that suits one crops the subject out of
    // another as the cell changes shape. Each frame carries its own.
    //
    // All three are the client's own. H+2 and H+2–3 are cropped from the
    // 2254×2994 exports in the site-activity set with the "property of CV
    // Bintang Berjaya Satu" strip (rows 2836+) removed; H+0–1 is a later phone
    // frame and its crop is scripted in scripts/images/hero-plates.mjs.
    frames: [
      {
        src: '/images/hero/hero-2-survei.webp',
        alt: 'Petugas survei BBS mengenakan helm proyek, masker, dan rompi hi-vis mencatat pada papan jalan di samping belt conveyor pelanggan, dengan kru lain bekerja di latar belakang',
        caption: 'Survei di lokasi',
        // The only frame with a person standing in it, and the figure runs 70%
        // of the plate's height — so on the 4:3 mobile cell, which shows 46% of
        // those rows, he cannot fit whole no matter where this is anchored (see
        // the crop note in scripts/images/hero-plates.mjs: the source is not
        // wide enough for a landscape frame that holds him). What the anchor
        // can guarantee is that the cut never lands on him badly, and the
        // binding case is the 16:9 cell at sm, which shows only 34% of the
        // height: at 20% his hard hat clears the top edge with room to spare
        // there, on 4:3, and on the tall desktop cell alike. Anything lower
        // takes the top of his helmet off on a tablet.
        focus: '50% 20%',
      },
      {
        src: '/images/hero/hero-1-ukur.webp',
        alt: 'Meteran dibentangkan melintasi permukaan belt conveyor karet hitam hingga ke tepi belt yang dijepit batang aluminium, menunjukkan angka 20 sentimeter',
        // Captions must set on one line inside the caption box — half the
        // figure width minus padding, about 147px at 360px, or roughly 19
        // characters of tracked 11px mono. Anything longer is clipped on the
        // primary target device, so none of the three exceeds it.
        //
        // "Pengukuran belt" rather than the old "Survei di lokasi": this frame
        // is shot on the workshop press bed, and a caption claiming the
        // customer's site under a photograph that plainly isn't one costs more
        // than the claim is worth.
        //
        // The on-site claim is carried by the H+0 frame above it, which is
        // shot at a customer's line, and by the subheadline and the "Lokasi
        // pengerjaan" fact — none of which is a photo caption doing a spec
        // row's job.
        caption: 'Pengukuran belt',
        // Anchored low: the whole content is the tape crossing the belt edge at
        // the red 20, which sits at 63% of the frame's height. At 4/3 the plate
        // shows only 46% of these rows, and the default 42% would land that
        // band on empty rubber above the reading.
        focus: '50% 60%',
      },
      {
        src: '/images/hero/hero-3-press.webp',
        // The press frame is anchored high on purpose: the operator, the press
        // head, the hoses and the belt entering the bar all sit in the top
        // two-thirds, and that is the whole content of the shot. 20% rather
        // than the old 30%: the recut source (see scripts/images/hero-plates.mjs)
        // puts his head in the top fifth of the plate, and the 4:3 mobile cell
        // shows only 46% of the rows — at 30% the cut lands across his face.
        alt: 'Operator BBS mengenakan rompi hi-vis mengoperasikan mesin press sambungan panas, belt conveyor PVC hijau masuk ke batang press dengan selang hidrolik terpasang di workshop',
        caption: 'Proses press',
        focus: '50% 20%',
      },
      {
        src: '/images/hero/hero-4-jalan.webp',
        alt: 'Belt conveyor PVC biru kembali beroperasi di ruang produksi pangan dengan sambungan baru terlihat rapi',
        caption: 'Conveyor beroperasi',
        focus: '50% 46%',
      },
    ],

    // The inset holds still while the plate moves. It is the one thing in the
    // hero the wide shots cannot carry at any crop: the mechanical fastener
    // itself, seated on the belt edge, at the scale where you can count the
    // plates. Keeping it fixed also gives the eye somewhere to rest — four
    // frames changing behind a fifth that also changed would read as a
    // slideshow rather than as one job progressing.
    //
    // Cropped from a 1200×1600 phone frame to the 3:2 the plate renders at,
    // on the band that holds both rows of fasteners and the green belt above
    // them; the original's lower third is bare matting and carries nothing.
    detail: {
      src: '/images/hero/hero-detail-fastener.webp',
      alt: 'Detail sambungan mekanis pada tepi belt conveyor PVC hijau, dua baris pelat kawat gigi terpasang rapat dan saling mengunci',
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
  // ── Client logos, rendered by ClientLogoBand directly above the CTA ──
  //
  // Source files live outside the repo (Documents/BBS/Client); the WebP here is
  // built by scripts/images/client-logos.mjs, which also prints the w/h below.
  // Those two numbers are the *display* size at 1x — the asset is emitted at 2x
  // — and they are stored rather than computed because each mark is scaled to
  // equal optical area, so no two share a height and there is nothing to derive
  // them from at runtime. They exist to reserve the box and avoid layout shift.
  //
  // `sector` is the hover/touch caption. It is the industry, not the company's
  // legal name: the name is already legible in the logo, whereas the sector is
  // the thing a buyer is actually checking — whether we have worked a line like
  // theirs. It is also the only caption that cannot be got wrong.
  //
  // No `count`, no "dipercaya 120 perusahaan", no years. Same rule as the
  // deleted `statistics` block above: numbers come from the client in writing.
  //
  // Order is not alphabetical or by size. Sari Roti is the only badge in the
  // set — taller, boxed, and the only one carrying its own background — so it
  // sits in the middle as the row's visual anchor with two wordmarks either
  // side. Reordering these will unbalance the row.
  clients: {
    eyebrow: 'Dipercaya Oleh',
    note: 'Sebagian perusahaan yang menggunakan produk dan layanan kami.',
    items: [
      { name: 'J&T Express', sector: 'Logistik', src: '/images/clients/jnt.webp', w: 113, h: 24 },
      { name: 'Hilon', sector: 'Tekstil & Serat', src: '/images/clients/hilon.webp', w: 78, h: 36 },
      { name: 'Sari Roti', sector: 'Makanan & Minuman', src: '/images/clients/sari-roti.webp', w: 80, h: 44 },
      { name: 'Indah Kiat', sector: 'Pulp & Kertas', src: '/images/clients/indah-kiat.webp', w: 117, h: 26 },
      { name: 'Polytron', sector: 'Elektronik', src: '/images/clients/polytron.webp', w: 117, h: 15 },
    ],
  },

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
