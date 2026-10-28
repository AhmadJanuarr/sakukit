# Toolkits-Backend-Server

REST API backend untuk Toolkits — platform all-in-one yang menyediakan berbagai utilitas online seperti kompresi & konversi gambar, serta downloader media sosial. Dibangun menggunakan vanilla Golang (tanpa framework) untuk performa yang ringan dan cepat.

## 🚀 Tech Stack

- **Bahasa:** Go 1.22+
- **HTTP Router:** net/http (Go standard library)
- **Database:** Tidak digunakan (stateless service)
- **Autentikasi:** Tidak digunakan
- **Tools lain:** Docker
- **Media Downloader:** yt-dlp

## ✨ Fitur Utama

- [x] Image Toolkit — convert, compress, dan resize gambar
- [x] Media Downloader — ambil info & unduh konten dari platform sosial media
- [x] Image Proxy — proxy untuk pengambilan gambar eksternal
- [x] Auto Cleanup Job — pembersihan file sementara secara berkala
- [x] Middleware Lengkap — CORS, rate limiting, timeout, dan request logging
- [x] Validasi & Error Handling terstruktur dengan respons JSON konsisten

## 📁 Struktur Folder

```
backend-golang/
├── internal/
│   ├── config/                    # Konfigurasi aplikasi (load dari .env)
│   │   └── config.go
│   ├── handlers/                  # HTTP request handlers
│   │   ├── downloader_handler.go
│   │   ├── image_handler.go
│   │   └── proxy_handler.go
│   ├── jobs/                      # Scheduled/background jobs
│   │   └── storage_cleanup.go
│   ├── middlewares/                # HTTP middlewares
│   │   ├── cors.go
│   │   ├── logger.go
│   │   ├── rate_limiter.go
│   │   └── timeout.go
│   ├── models/                     # Struct/entity definitions
│   │   └── downloader_info.go
│   ├── routes/                     # Route definitions
│   │   └── router.go
│   ├── services/                   # Business logic layer
│   │   ├── downloader_service.go
│   │   ├── image_service.go
│   │   └── storage_service.go
│   └── utils/                      # Helper & utility functions
│       ├── cache.go
│       ├── cleanest.go
│       ├── config.go
│       ├── download_file.go
│       ├── ensure_storage_dirs.go
│       ├── get_cookie_path.go
│       ├── image_utils.go
│       ├── json_response.go
│       ├── save_upload_file.go
│       └── validation_utils.go
├── temp/                            # Direktori penyimpanan sementara
│   ├── compressed/
│   ├── downloads/
│   ├── processed/
│   ├── resized/
│   └── uploads/
├── .dockerignore
├── .env.example
├── .gitignore
├── CHANGELOG.md
├── Dockerfile
├── go.mod
├── go.sum
├── main.go
└── README.md
├── backend-golang/
│   ├── .dockerignore
│   ├── .env
│   ├── .gitignore
│   ├── CHANGELOG.md
│   ├── Dockerfile
│   ├── go.mod
│   ├── go.sum
│   ├── ig-cookies.txt
│   ├── internal/
│   │   ├── config/
│   │   │   ├── config.go
│   │   ├── handlers/
│   │   │   ├── downloader_handler.go
│   │   │   ├── image_handler.go
│   │   │   ├── proxy_handler.go
│   │   ├── jobs/
│   │   │   ├── storage_cleanup.go
│   │   ├── middlewares/
│   │   │   ├── cors.go
│   │   │   ├── logger.go
│   │   │   ├── rate_limiter.go
│   │   │   ├── timeout.go
│   │   ├── models/
│   │   │   ├── downloader_info.go
│   │   ├── routes/
│   │   │   ├── router.go
│   │   ├── services/
│   │   │   ├── downloader_service.go
│   │   │   ├── image_service.go
│   │   │   ├── storage_service.go
│   │   ├── utils/
│   │   │   ├── cache.go
│   │   │   ├── cleanest.go
│   │   │   ├── config.go
│   │   │   ├── download_file.go
│   │   │   ├── ensure_storage_dirs.go
│   │   │   ├── get_cookie_path.go
│   │   │   ├── image_utils.go
│   │   │   ├── json_response.go
│   │   │   ├── save_upload_file.go
│   │   │   ├── validation_utils.go
│   ├── main.go
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── temp/
│   │   ├── compressed/
│   │   ├── downloads/
│   │   ├── processed/
│   │   ├── resized/
│   │   ├── uploads/
│   ├── youtube_cookies.txt
│   ├── yt-dlp.exe
```

## ⚙️ Prasyarat

Pastikan sudah terinstall:

- [Go](https://go.dev/dl/) versi 1.22 atau lebih baru
- PostgreSQL / MySQL
- Docker (opsional, untuk menjalankan via container)
- yt-dlp binary (digunakan untuk fitur downloader)

## 🔧 Instalasi & Menjalankan

1. Clone repository

   ```bash
   git clone https://github.com/username/nama-repo.git
   cd nama-repo/backend
   ```

2. Install dependencies

   ```bash
   go mod download
   ```

3. Setup environment variables

   ```bash
   cp .env.example .env
   ```

   Sesuaikan isi file `.env` dengan konfigurasi lokal kamu.

4. Jalankan aplikasi

   ```bash
   go run cmd/main.go
   ```

   Server akan berjalan di `http://localhost:8080`

### Menjalankan dengan Docker

```bash
docker build -t toolkits-backend .
docker run -p 8080:8080 --env-file .env toolkits-backend
```

## 🔑 Environment Variables

| Variable                 | Deskripsi                                        | Contoh                                                   |
| ------------------------ | ------------------------------------------------ | -------------------------------------------------------- |
| `PORT`                   | Port aplikasi berjalan                           | `8080`                                                   |
| `GIN_MODE`               | Mode aplikasi (`debug` / `release`)              | `debug`                                                  |
| `ALLOWED_ORIGINS`        | Daftar origin yang diizinkan untuk CORS          | `http://localhost:5173,https://toolkits-beta.vercel.app` |
| `ALLOWED_METHODS`        | HTTP methods yang diizinkan                      | `GET,POST,PUT,DELETE,OPTIONS`                            |
| `ALLOWED_HEADERS`        | Header yang diizinkan pada request               | `Content-Type,Authorization`                             |
| `ALLOWED_EXPOSE_HEADERS` | Header yang di-expose ke client                  | `Content-Length,Content-Type,Content-Disposition`        |
| `MAX_GLOBAL_CONCURRENT`  | Batas maksimum proses konkuren secara global     | `4`                                                      |
| `MAX_FILE_SIZE`          | Ukuran maksimum file upload (byte)               | `5242880`                                                |
| `MAX_MULTIPART_MEMORY`   | Batas memori untuk parsing multipart form (byte) | `20971520`                                               |
| `MAX_DIMENSION`          | Dimensi maksimum gambar yang diproses (piksel)   | `4096`                                                   |
| `MAX_FILE_AGE`           | Usia maksimum file sementara sebelum dibersihkan | `24h`                                                    |
| `CLEANUP_INTERVAL`       | Interval job pembersihan file sementara          | `5s`                                                     |
| `COMPRESSED_DIR`         | Direktori penyimpanan hasil kompresi gambar      | `temp/compressed`                                        |
| `DOWNLOADS_DIR`          | Direktori penyimpanan hasil unduhan              | `temp/downloads`                                         |
| `PROCESSED_DIR`          | Direktori penyimpanan hasil proses gambar        | `temp/processed`                                         |
| `RESIZED_DIR`            | Direktori penyimpanan hasil resize gambar        | `temp/resized`                                           |
| `YTDLP_PATH`             | Path menuju binary `yt-dlp`                      | `./yt-dlp.exe`                                           |

> **Catatan:** Jangan pernah commit file `.env` yang berisi kredensial asli. Gunakan `.env.example` sebagai referensi dan pastikan `.env` sudah masuk `.gitignore`.

## 📚 API Documentation

Base URL: `http://localhost:8080/api/v1`

### Image Toolkit

| Method | Endpoint                | Deskripsi                      |
| ------ | ----------------------- | ------------------------------ |
| POST   | `/image/convert`        | Mengonversi format gambar      |
| POST   | `/image/compress-image` | Mengompres ukuran file gambar  |
| POST   | `/image/resize-image`   | Mengubah dimensi/ukuran gambar |

### Media Downloader

| Method | Endpoint               | Deskripsi                            |
| ------ | ---------------------- | ------------------------------------ |
| POST   | `/downloader/info`     | Mengambil informasi metadata media   |
| GET    | `/downloader/download` | Mengunduh media dari platform sosial |

### Image Proxy

| Method | Endpoint       | Deskripsi                                          |
| ------ | -------------- | -------------------------------------------------- |
| GET    | `/proxy/image` | Proxy untuk mengambil gambar dari sumber eksternal |

## Changelog

Riwayat perubahan proyek dapat dilihat di [CHANGELOG.md](./CHANGELOG.md).

## Kontribusi

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/nama-fitur`)
3. Commit perubahan (`git commit -m 'feat: menambahkan fitur X'`)
4. Push ke branch (`git push origin feature/nama-fitur`)
5. Buka Pull Request

## Author

**Ahmad Januar Amriyansah**
Full Stack Developer

- Email: ahmadjanuaramri2015@gmail.com
- GitHub: [@AhmadJanuarr](https://github.com/AhmadJanuarr)
