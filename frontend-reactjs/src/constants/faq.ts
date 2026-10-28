export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface FAQCategoryProps {
  id: string;
  title: string;
  faqs: FAQItem[];
}

export const FAQ_DATA: FAQCategoryProps[] = [
  {
    id: "general",
    title: "Umum",
    faqs: [
      {
        id: 1,
        question: "Apakah aplikasi ini gratis untuk digunakan?",
        answer:
          "Ya, 100% gratis! Mad Labs Toolkits dibangun untuk membantu komunitas tanpa biaya tersembunyi atau langganan premium.",
      },
      {
        id: 2,
        question: "Apakah saya perlu membuat akun untuk menggunakan fitur?",
        answer:
          "Tidak perlu. Anda tidak perlu membuat akun atau login untuk menggunakan semua fitur yang ada di sini. Cukup buka website dan langsung gunakan.",
      },
      {
        id: 12,
        question: "Alat apa saja yang tersedia di Mad Labs Toolkits saat ini?",
        answer:
          "Saat ini kami memiliki alat yang berfokus pada manipulasi gambar seperti kompresi gambar dan konversi format. Fitur-fitur tambahan sedang dalam tahap pengembangan.",
      },
      {
        id: 13,
        question: "Apakah website ini bisa digunakan di smartphone?",
        answer:
          "Ya, tampilan dan fungsi website kami sepenuhnya responsif. Anda dapat menggunakannya dengan nyaman melalui browser di komputer, tablet, maupun smartphone Anda.",
      },
      {
        id: 14,
        question: "Apakah membutuhkan koneksi internet yang cepat?",
        answer:
          "Koneksi internet hanya diperlukan saat pertama kali memuat halaman web. Setelah halaman terbuka, sebagian besar pemrosesan berjalan secara lokal sehingga tidak terlalu bergantung pada kecepatan internet.",
      },
      {
        id: 15,
        question: "Apakah Mad Labs menyediakan API untuk developer?",
        answer:
          "Untuk saat ini, kami belum menyediakan akses API publik karena kami sedang berfokus pada pengembangan antarmuka (UI) untuk memberikan pengalaman terbaik bagi pengguna akhir.",
      },
    ],
  },
  {
    id: "limitations",
    title: "Batasan & Sistem",
    faqs: [
      {
        id: 3,
        question: "Berapa banyak file yang bisa saya proses sekaligus?",
        answer:
          "Saat ini Anda dapat memproses hingga 5 file sekaligus dalam satu batch. Kami menerapkan batasan ini untuk menjaga stabilitas dan performa perangkat Anda serta server kami.",
      },
      {
        id: 4,
        question: "Mengapa ada batasan fitur dibandingkan aplikasi lain?",
        answer:
          "Saat ini Mad Labs di-deploy pada server dengan sumber daya yang terbatas. Seiring berjalannya waktu dan dukungan dari kalian, kami akan terus meningkatkan kapasitas dan kapabilitas sistem.",
      },
      {
        id: 5,
        question: "Kenapa hasil kompresi saya terkadang masih besar?",
        answer:
          "Hasil kompresi bergantung pada tingkat kompleksitas gambar dan persentase kualitas yang Anda pilih. Jika file masih terlalu besar, cobalah untuk menurunkan tingkat kualitasnya sedikit.",
      },
      {
        id: 16,
        question: "Berapa ukuran maksimum per file yang bisa diunggah?",
        answer:
          "Karena semua pemrosesan berjalan di browser, kami menyarankan ukuran maksimal 50MB per file. File yang lebih besar dapat menyebabkan browser menjadi lambat atau kehabisan memori.",
      },
      {
        id: 17,
        question: "Format file apa saja yang didukung saat ini?",
        answer:
          "Saat ini kami mendukung format gambar populer seperti JPG/JPEG, PNG, dan WEBP. Dukungan untuk format gambar lainnya akan ditambahkan secara bertahap.",
      },
      {
        id: 18,
        question: "Apakah proses tetap berjalan jika saya mengecilkan (minimize) browser?",
        answer:
          "Banyak browser modern akan memperlambat proses pada tab yang tidak aktif untuk menghemat daya. Kami menyarankan untuk tetap membuka tab saat proses kompresi atau konversi sedang berlangsung.",
      },
      {
        id: 19,
        question: "Apakah file saya hilang jika saya me-refresh halaman web?",
        answer:
          "Ya. Karena file Anda diproses secara lokal dan tidak disimpan di server, me-refresh halaman akan mereset semuanya dan Anda harus mengunggah file kembali.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Keamanan & Privasi",
    faqs: [
      {
        id: 6,
        question: "Apakah file saya aman dan terjaga privasinya?",
        answer:
          "Sangat aman. Seluruh proses pengubahan dan kompresi file dilakukan secara lokal di browser Anda. File Anda tidak pernah diunggah atau disimpan di server kami. Privasi Anda adalah prioritas utama.",
      },
      {
        id: 7,
        question: "Apakah website ini menggunakan cookies pelacakan?",
        answer:
          "Kami tidak menggunakan pelacak agresif atau mengumpulkan data pribadi Anda untuk dijual kepada pihak ketiga.",
      },
    ],
  },
  {
    id: "about",
    title: "Pengembang & Pengerjaan",
    faqs: [
      {
        id: 8,
        question: "Siapa di balik pembuatan website ini?",
        answer:
          "Website ini dikembangkan dan dikelola secara mandiri oleh saya sendiri. Ini berawal dari kebutuhan personal akan tools praktis yang ringan, aman, dan tanpa iklan yang mengganggu.",
      },
      {
        id: 9,
        question: "Teknologi apa yang digunakan untuk membuat ini?",
        answer:
          "Frontend dibangun menggunakan React, Next.js, dan Tailwind CSS. Untuk memastikan performa yang cepat dan aman, banyak pemrosesan dilakukan menggunakan teknologi WebAssembly (WASM) langsung di browser.",
      },
      {
        id: 20,
        question: "Apakah proyek aplikasi ini open source?",
        answer:
          "Saat ini repository sumber (source code) masih bersifat privat. Namun, tidak menutup kemungkinan kami akan merilis beberapa bagian atau secara keseluruhan sebagai open source di masa mendatang.",
      },
      {
        id: 21,
        question: "Dari mana inspirasi untuk membangun Mad Labs Toolkits?",
        answer:
          "Proyek ini berawal dari rasa frustrasi ketika menggunakan alat online lain yang penuh dengan iklan, memiliki batasan pemakaian harian yang sangat ketat, atau memaksa pengguna membuat akun.",
      },
      {
        id: 22,
        question: "Bagaimana memastikan alat berjalan dengan baik?",
        answer:
          "Setiap fitur dan alat melalui serangkaian pengujian pada berbagai perangkat dan browser sebelum dirilis, untuk memastikan kinerjanya tetap stabil meskipun perangkat memiliki spesifikasi terbatas.",
      },
      {
        id: 23,
        question: "Bagaimana cara mendukung kelangsungan website ini?",
        answer:
          "Cara terbaik saat ini adalah dengan membagikan (share) website ini ke orang-orang yang mungkin membutuhkan. Kami juga berencana membuka opsi donasi (seperti Trakteer) untuk membantu biaya server ke depannya.",
      },
    ],
  },
  {
    id: "future",
    title: "Fitur Mendatang",
    faqs: [
      {
        id: 10,
        question: "Apakah akan ada fitur tambahan di masa depan?",
        answer:
          "Tentu! Kami terus mengembangkan berbagai alat bantu baru seperti konversi PDF, editor gambar, dan banyak lagi. Kami memiliki roadmap panjang untuk membuat toolkit ini semakin lengkap.",
      },
      {
        id: 11,
        question: "Bagaimana cara saya berkontribusi atau memberi ide?",
        answer:
          "Anda sangat diterima untuk berkontribusi! Anda bisa memberikan masukan, melaporkan bug, atau menyarankan fitur baru langsung di GitHub kami. Anda juga bisa mendukung kami melalui halaman Support.",
      },
    ],
  },
];
