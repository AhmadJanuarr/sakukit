import { SITE_CONFIG } from "@/constants/site-config";
import { PiArrowRight } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-between px-6 py-12">
      <div className="h-4 w-full sm:h-8"></div>

      <div className="flex max-w-3xl flex-col items-center text-center">
        <div className="border-line-light bg-base-secondary text-ink-secondary mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide">
          v1.0.0 Stabil
        </div>
        <h1 className="text-ink-primary mb-6 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          Utilitas Konten, <br className="hidden sm:block" />
          <span className="text-ink-secondary">Disederhanakan.</span>
        </h1>

        {/* Professional Description */}
        <p className="text-ink-secondary mb-10 max-w-xl text-base leading-relaxed md:text-lg">
          Sistem perangkat utilitas modern yang dirancang untuk efisiensi. Kelola kompresi gambar hingga pengunduhan
          aset digital, dioptimalkan dalam satu lingkungan kerja yang presisi.
        </p>

        {/* Call to Action */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            to="/image/compress"
            className="group bg-ink-primary text-base-primary hover:bg-ink-primary/90 flex h-11 items-center justify-center gap-2 rounded-lg px-8 text-sm font-medium transition-all"
          >
            Mulai Sesi
            <PiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="https://github.com/maddlabs-id/toolkits"
            target="_blank"
            rel="noreferrer"
            className="border-line-strong text-ink-primary hover:bg-base-secondary flex h-11 items-center justify-center rounded-lg border bg-transparent px-8 text-sm font-medium transition-all"
          >
            Dokumentasi Sistem
          </a>
        </div>
      </div>

      {/* Server Status Indicator */}
      <div className="text-ink-secondary mt-16 flex items-center gap-2.5 text-xs font-medium sm:mt-0">
        <span className="relative flex h-2 w-2">
          <span className="bg-action-active absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
          <span className="bg-action-active relative inline-flex h-2 w-2 rounded-full"></span>
        </span>
        Sistem Beroperasi Normal
      </div>
    </div>
  );
}
