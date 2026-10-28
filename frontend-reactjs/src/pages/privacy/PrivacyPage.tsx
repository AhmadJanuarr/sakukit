import { PageHeader } from "@/shared/components/ui/PageHeader";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
  const navItems = [
    { id: "pendahuluan", label: "1. Pendahuluan" },
    { id: "keamanan", label: "2. Keamanan dan Pemrosesan File" },
    { id: "informasi", label: "3. Informasi yang Kami Kumpulkan" },
    { id: "pihak-ketiga", label: "4. Layanan Pihak Ketiga" },
    { id: "cookie", label: "5. Penggunaan Cookie" },
    { id: "perubahan", label: "6. Perubahan Kebijakan" },
  ];

  return (
    <section className="mx-auto min-h-screen w-full max-w-5xl pt-10 pb-20 2xl:max-w-7xl">
      <PageHeader
        title="Data Kamu Aman, "
        subTitle="Privasi Terjaga!"
        description="Komitmen kami dalam menjaga privasi Anda. Dokumen ini menjelaskan secara transparan bagaimana kami mengelola, menggunakan, dan melindungi data Anda selama menggunakan MadLab Toolkits."
      />

      <div className="flex flex-col px-6 lg:flex-row lg:gap-16 xl:gap-24 xl:px-0">
        <aside className="hidden shrink-0 lg:block lg:w-64">
          <div className="sticky top-24 flex flex-col gap-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase">Di halaman ini</h3>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link key={item.id} to={`#${item.id}`} className="hover:text-action-primary transition-colors">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <article className="flex max-w-3xl flex-1 flex-col gap-10">
          <section id="pendahuluan" className="scroll-mt-24">
            <h2 className="mb-4 text-xl font-semibold">1. Pendahuluan</h2>
            <p className="text-justify">
              Selamat datang di MadLab Toolkits. Privasi Anda adalah prioritas utama kami. Kebijakan Privasi ini secara
              transparan menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat Anda
              mengakses dan menggunakan layanan alat (tools) kami.
            </p>
          </section>

          <section id="keamanan" className="scroll-mt-24">
            <h2 className="mb-4 text-xl font-semibold">2. Keamanan dan Pemrosesan File</h2>
            <p className="mb-4 text-justify">
              Layanan utama kami melibatkan pemrosesan file seperti gambar, video, dan dokumen. Berikut adalah komitmen
              kami terhadap file Anda:
            </p>
            <ul className="flex list-disc flex-col gap-3 pl-5 text-justify">
              <li>
                <strong className="font-semibold">Penghapusan Otomatis:</strong> File yang Anda unggah ke server kami
                (misalnya untuk kompresi atau konversi) hanya disimpan sementara. Sistem kami akan secara otomatis dan
                permanen menghapus file tersebut segera setelah proses selesai.
              </li>
              <li>
                <strong className="font-semibold">Tidak Ada Analisis Konten:</strong> Kami tidak pernah membuka,
                melihat, menyalin, atau membagikan konten dari file yang Anda unggah kepada pihak ketiga.
              </li>
              <li>
                <strong className="font-semibold">Pemrosesan Sisi Klien (Client-Side):</strong> Beberapa alat tertentu
                dirancang untuk memproses file sepenuhnya di dalam browser Anda (tanpa dikirim ke server kami).
              </li>
            </ul>
          </section>

          <section id="informasi" className="scroll-mt-24 text-justify">
            <h2 className="mb-4 text-xl font-semibold">3. Informasi yang Kami Kumpulkan</h2>
            <p className="mb-4">
              Untuk menjaga agar layanan tetap berjalan cepat dan gratis, kami merancang sistem untuk mengumpulkan
              sesedikit mungkin data pribadi. Data yang dikumpulkan meliputi:
            </p>
            <ul className="flex list-disc flex-col gap-3 pl-5 text-justify">
              <li>
                <strong className="font-semibold">Data Analitik:</strong> Kami menggunakan alat pelacakan standar
                (seperti jumlah kunjungan halaman dan alat mana yang paling populer) untuk meningkatkan kualitas layanan
                kami. Data ini bersifat anonim.
              </li>
              <li>
                <strong className="font-semibold">Log Server:</strong> Alamat IP, jenis browser, dan stempel waktu
                kunjungan dicatat secara otomatis untuk tujuan keamanan (seperti mencegah serangan DDoS atau
                penyalahgunaan layanan).
              </li>
            </ul>
          </section>

          <section id="pihak-ketiga" className="scroll-mt-24">
            <h2 className="mb-4 text-xl font-semibold">4. Layanan Pihak Ketiga (Downloader)</h2>
            <p className="text-justify">
              Fitur pengunduhan kami (YouTube, TikTok, Instagram) berinteraksi dengan layanan atau API dari platform
              pihak ketiga. Kami tidak memiliki afiliasi dengan platform tersebut. Penggunaan fitur pengunduh kami harus
              mematuhi undang-undang hak cipta yang berlaku. Anda hanya diizinkan untuk mengunduh konten untuk
              penggunaan pribadi dan non-komersial, atau konten yang Anda miliki hak ciptanya.
            </p>
          </section>

          <section id="cookie" className="scroll-mt-24">
            <h2 className="mb-4 text-xl font-semibold">5. Penggunaan Cookie</h2>
            <p className="text-justify">
              Kami mungkin menggunakan <i className="text-action-primary">cookies</i> atau penyimpanan lokal (Local
              Storage) murni untuk tujuan fungsional. Misalnya, menyimpan pengaturan preferensi tema (terang/gelap) atau
              preferensi pengaturan spesifik pada sebuah alat agar Anda tidak perlu mengaturnya ulang setiap kali
              berkunjung.
            </p>
          </section>

          <section id="perubahan" className="scroll-mt-24">
            <h2 className="mb-4 text-xl font-semibold">6. Perubahan Kebijakan</h2>
            <p className="text-justify">
              Kebijakan Privasi ini dapat diperbarui dari waktu ke waktu tanpa pemberitahuan sebelumnya untuk
              mencerminkan perubahan pada layanan kami. Anda disarankan untuk memeriksa halaman ini secara berkala.
            </p>
          </section>
        </article>
      </div>
    </section>
  );
}
