# Product Requirement Document (PRD) - OmniKit (All-in-One Toolkit)

## 1. Ringkasan Produk

Maddlab adalah platform web toolkit "all-in-one" modern dan minimalis yang menyediakan berbagai alat produktivitas gratis (Konversi Gambar, Downloader Media, dan Utilitas PDF) dalam satu halaman kerja terintegrasi tanpa perlu berpindah-pindah tab atau _refresh_ halaman penuh.

## 2. Target Pengguna & Karakteristik UI/UX

- **Target:** Kreator konten, copywriter, pengembang, dan pengguna umum.
- **Tema Visual:** Clean & Modern dengan pendekatan warna "White & Royal Blue" atau "Deep Charcoal & Chalk White" (High Contrast Minimalist).
- **Prinsip Utama:** Bebas gangguan (Distraction-free), tanpa iklan pop-up yang merusak estetika, dan responsif.

## 3. Fitur Utama (Fitur Fase 1 - Free Version)

### A. Modul Gambar (Image Toolkit)

- Konversi format massal (PNG, JPG, WEBP, SVG).
- Resize gambar
- Kompresi ukuran gambar dengan slider kualitas.

### B. Modul Media Downloader

- Pengunduh video/audio dari YouTube, TikTok (tanpa watermark), dan Instagram (Feeds/Reels).
- Deteksi otomatis link URL yang ditempel.

### C. Modul PDF

- Menggabungkan beberapa PDF (Merge).
- Memisahkan halaman PDF (Split).
- Konversi PDF ke Word (.docx).

## 4. Spesifikasi Fungsional Antarmuka (Layout Tata Letak)

- **Panel Kiri (Sidebar Tools Catalog):**
  - Bersifat kolapsibel (bisa disembunyikan untuk memperluas ruang kerja).
  - Pengelompokan alat berdasarkan kategori (Image, Media, PDF) dengan ikon minimalis standar.
  - Fitur pencarian cepat (_fuzzy search_) untuk menyaring daftar alat secara instan.
- **Panel Kanan/Tengah (Workspace / Meja Kerja):**
  - Area dinamis yang berubah isinya sesuai dengan alat yang sedang aktif di sidebar.
  - Area _Dropzone_ (seret file ke sini) yang besar dan bersih.
  - Indikator progres pemrosesan (loading bar) dan tombol unduh hasil akhir yang kontras.

## 5. Kebutuhan Teknis Dasar

- Sistem berbasis komponen modular (React/Next.js).
- State manajemen global (Zustand/Context) untuk mendeteksi alat aktif tanpa _page reload_.
- Menggunakan skema `ClientFetching` terpadu dengan penanganan tipe data `Blob` otomatis untuk unduhan file langsung dari memori browser.
