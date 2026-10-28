export type UpdateStatus = "NEW" | "UPDATE" | "REFACTOR" | "FIX";

export interface ReleaseNoteProps {
  version: string;
  date: string;
  updates: {
    status: UpdateStatus;
    message: string;
  }[];
}

export const APP_RELEASES: ReleaseNoteProps[] = [
  {
    version: "v1.1.0",
    date: "20 April 2026",
    updates: [
      { status: "NEW", message: "Fitur upload multi-format gambar (PNG, JPEG, GIF, TIFF, SVG)" },
      { status: "NEW", message: "Konversi gambar ke format WebP" },
      { status: "NEW", message: "Quality slider untuk mengatur tingkat kompresi" },
      { status: "NEW", message: "Fitur download hasil konversi" },

      {
        status: "REFACTOR",
        message: "Refactor struktur folder untuk organisasi kode yang lebih baik",
      },
      { status: "UPDATE", message: "Optimasi performa konversi gambar menggunakan Sharp" },
      { status: "UPDATE", message: "Peningkatan UI/UX pada komponen upload" },

      { status: "FIX", message: "Perbaikan bug pada mobile menu" },
      { status: "FIX", message: "Perbaikan layout pada berbagai ukuran layar" },
      { status: "FIX", message: "Perbaikan error handling untuk file yang tidak valid" },
    ],
  },
  {
    version: "v1.0.0",
    date: "02 Juni 2025",
    updates: [
      { status: "NEW", message: "Fitur konverter image yang support [webp, jpeg, jpg dan PNG]" },
      {
        status: "NEW",
        message: "Fitur donwloader berbagai platform seperti [Youtube, Instagram dan Tiktok]",
      },
      { status: "NEW", message: "Fitur Resize Image" },
    ],
  },
];
