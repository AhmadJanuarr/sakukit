export interface BenefitsDataProps {
  id: number;
  title: string;
  description: string;
  layout: string;
  cta: boolean;
  ctaText?: string;
}

export const BENEFITS_DATA: BenefitsDataProps[] = [
  {
    id: 1,
    title: "Hemat Waktu Berharga Anda",
    description:
      "Lupakan loading panjang dan antrian upload. Proses file dalam hitungan detik, langsung dari browser. Teknologi modern yang membuat pekerjaan selesai lebih cepat.",
    layout: "col-span-full xl:col-span-1 xl:row-span-1",
    cta: false,
  },
  {
    id: 2,
    title: "Hasil Tetap Profesional",
    description:
      "Kompresi file hingga 90% lebih kecil tanpa kehilangan kualitas. Warna tetap akurat, detail tetap tajam. Hasil yang layak untuk klien dan portfolio Anda.",
    layout: "col-span-full xl:col-span-1 xl:row-span-1",
    cta: false,
  },
  {
    id: 3,
    title: "Pemrosesan Batch yang Efisien",
    description:
      "Kenapa harus proses file satu-satu kalau bisa sekaligus? Upload hingga 5 file bersamaan, atur preferensi, dan sistem kami akan memprosesnya untuk Anda. Hemat waktu Anda dari pekerjaan repetitif.\n\nSangat cocok untuk kebutuhan sehari-hari yang membutuhkan pemrosesan cepat tanpa ribet. Fokus pada kreativitas Anda, biarkan kami yang menangani proses teknisnya.",
    layout: "col-span-full xl:col-span-2 xl:col-start-1 xl:row-start-2",
    cta: false,
  },
  {
    id: 4,
    title: "Keamanan Data yang Tidak Bisa Ditawar",
    description:
      "Kebanyakan tools online mengharuskan Anda upload file ke server mereka. Tapi bagaimana dengan file proyek klien? Dokumen rahasia perusahaan? Foto pribadi? Risiko kebocoran data itu nyata—dan Anda tidak perlu ambil risiko itu.\n\nSemua proses terjadi 100% di browser Anda. File tidak pernah meninggalkan perangkat Anda. Tidak ada server yang menyimpan, tidak ada tracking tersembunyi. Kami percaya privasi adalah hak dasar, bukan fitur premium. Dipercaya oleh 2 juta+ pengguna yang serius soal keamanan data.",
    layout: "col-span-full xl:col-start-3 xl:row-span-2 xl:row-start-1 bg-action-primary text-ink-secondary",
    cta: true,
    ctaText: "Lihat semua tools",
  },
];
