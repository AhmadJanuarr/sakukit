import { IconType } from "react-icons";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { LuFileCog, LuFileText, LuImage, LuLink, LuLock, LuPalette, LuQrCode, LuType } from "react-icons/lu";

export type StatusLabel = "Tersedia" | "Segera Hadir" | "Beta" | "Perbaikan";

export type Availability = {
  isActive: boolean;
  label: StatusLabel;
};

export interface ListToolsProps {
  id: number;
  title: string;
  category: string;
  description?: string;
  href?: string;
  releaseDate?: string;
  availability: Availability;
  icon?: IconType;
}

export const TOOLS_CATALOG: ListToolsProps[] = [
  {
    id: 1,
    title: "Konversi Gambar",
    category: "Image",
    description: "Konversikan gambar ke format PNG, JPG, WEBP, SVG secara instan.",
    href: "/tools/image-converter",
    releaseDate: "2026-01-24",
    availability: { isActive: true, label: "Tersedia" },
    icon: LuImage,
  },
  {
    id: 2,
    title: "Tiktok Downloader",
    category: "Downloader",
    description: "Unduh video TikTok tanpa tanda air.",
    href: "/tools/tiktok",
    releaseDate: "2026-01-24",
    availability: { isActive: true, label: "Tersedia" },
    icon: FaTiktok,
  },
  {
    id: 3,
    title: "YouTube Downloader",
    category: "Downloader",
    description: "Unduh video YouTube tanpa tanda air.",
    href: "/tools/youtube",
    releaseDate: "2026-01-24",
    availability: { isActive: true, label: "Tersedia" },
    icon: FaYoutube,
  },
  {
    id: 4,
    title: "Instagram Downloader",
    category: "Downloader",
    description: "Unduh video Instagram tanpa tanda air.",
    href: "/tools/instagram",
    releaseDate: "2026-01-24",
    availability: { isActive: true, label: "Tersedia" },
    icon: FaInstagram,
  },
  {
    id: 6,
    title: "Image Compress",
    category: "Image",
    description: "Kompresi gambar untuk mengurangi ukuran bitrate .",
    href: "/tools/image-compress",
    releaseDate: "2026-01-24",
    availability: { isActive: true, label: "Tersedia" },
    icon: LuFileCog,
  },
  {
    id: 7,
    title: "Image Resizer",
    category: "Image",
    description: "Atur dimensi, rasio, dan format sesuai kebutuhan.",
    href: "/tools/image-resizer",
    releaseDate: "2026-01-24",
    availability: { isActive: true, label: "Tersedia" },
    icon: LuImage,
  },
  {
    id: 8,
    title: "PDF Tools",
    category: "Document",
    description: "Merge, Split, Compress, dan banyak lagi.",
    href: "/tools/utility/pdf-tools",
    releaseDate: "2026-01-24",
    availability: { isActive: false, label: "Segera Hadir" },
    icon: LuFileText,
  },
  {
    id: 9,
    title: "QR Code Generator",
    category: "Utility",
    description: "Generate QR Code untuk berbagai keperluan.",
    href: "/tools/utility/qr-code-generator",
    releaseDate: "2026-01-24",
    availability: { isActive: false, label: "Segera Hadir" },
    icon: LuQrCode,
  },
  {
    id: 10,
    title: "URL Shortener",
    category: "Utility",
    description: "Shorten your URLs with ease.",
    href: "/tools/url-shortener",
    releaseDate: "2026-01-24",
    availability: { isActive: false, label: "Segera Hadir" },
    icon: LuLink,
  },
  {
    id: 11,
    title: "Color Picker",
    category: "Design",
    description: "Pick colors with ease.",
    href: "/tools/color-picker",
    releaseDate: "2026-01-24",
    availability: { isActive: false, label: "Segera Hadir" },
    icon: LuPalette,
  },
  {
    id: 12,
    title: "Text Tools",
    category: "Text",
    description: "Tools untuk mengedit dan mengonversi teks.",
    href: "/tools/text-tools",
    releaseDate: "2026-01-24",
    availability: { isActive: false, label: "Segera Hadir" },
    icon: LuType,
  },
  {
    id: 13,
    title: "Password Generator",
    category: "Security",
    description: "Generate passwords with ease.",
    href: "/tools/password-generator",
    releaseDate: "2026-01-24",
    availability: { isActive: false, label: "Segera Hadir" },
    icon: LuLock,
  },
];
