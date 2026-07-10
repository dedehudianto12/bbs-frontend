<script setup lang="ts">
const values = [
  {
    title: 'Kualitas Terjamin',
    description: 'Produk conveyor dan komponen dipilih dari material berkualitas tinggi, melalui proses quality control ketat sebelum dikirim ke pelanggan.'
  },
  {
    title: 'Harga Bersaing',
    description: 'Kami menawarkan harga kompetitif tanpa mengorbankan kualitas, cocok untuk kebutuhan pengadaan B2B maupun proyek skala besar.'
  },
  {
    title: 'Lead Time Cepat',
    description: 'Proses produksi dan pengiriman yang efisien memastikan pesanan Anda tiba tepat waktu, menjaga operasional tetap berjalan.'
  },
  {
    title: 'Customer Oriented',
    description: 'Setiap kebutuhan pelanggan kami tangani secara personal — dari konsultasi pemilihan produk hingga dukungan purna jual.'
  },
  {
    title: 'Responsif',
    description: 'Tim kami siap merespons pertanyaan dan permintaan Anda dengan cepat, melalui telepon, WhatsApp, atau email.'
  }
]
</script>

<template>
  <section class="py-16 md:py-24 bg-bg-soft">
    <div class="mx-auto max-w-6xl px-4">
      <span class="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
        Kenapa Pilih BBS Conveyor
      </span>

      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div
          v-for="v in values"
          :key="v.title"
          class="text-center"
        >
          <div class="mx-auto w-10 h-10 rounded-full bg-gold flex items-center justify-center text-ink font-bold text-sm">
            {{ values.indexOf(v) + 1 }}
          </div>
          <p class="mt-3 text-ink font-bold text-sm">{{ v.title }}</p>
          <p class="mt-2 text-neutral text-sm leading-relaxed">{{ v.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
