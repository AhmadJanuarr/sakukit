import { buttonVariants } from "@/shared/components/ui/Button";
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="flex min-h-full w-full items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
      <div className="flex w-full max-w-3xl flex-col items-center justify-center rounded-xl">
        <div className="max-w-full">
          <Link
            to="/changelog"
            className="group border-line-strong bg-base-primary text-ink-secondary hover:border-ink-secondary inline-flex max-w-full items-center gap-2 rounded-md border px-3 py-2 font-mono text-[10px] transition-all duration-300 sm:py-1.5 sm:text-xs"
          >
            <span className="flex size-1.5 shrink-0 animate-pulse rounded-full bg-green-500 sm:size-2" />
            <span className="truncate">v1.0_ Minimum Viable Product</span>
            <span className="text-ink-primary hidden shrink-0 font-semibold transition-transform group-hover:translate-x-0.5 sm:inline">
              [ Liat Fitur → ]
            </span>
          </Link>
        </div>
        <div className="my-8 flex flex-col items-center justify-center space-y-5 text-center sm:my-10 sm:space-y-6">
          <h1 className="text-3xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
            SAKU Kit, <br className="hidden sm:block" />
            <span className="text-ink-secondary">Satu tempat, semua alat yang kamu butuhkan.</span>
          </h1>
          <p className="text-ink-secondary max-w-2xl text-sm leading-relaxed sm:text-base">
            SakuKit menyederhanakan pekerjaan digital Anda dari kompresi dan konversi gambar, hingga pengunduhan aset
            digital, semua diproses instan tanpa instalasi tambahan.
          </p>
        </div>
        <div className="flex w-full justify-center">
          <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              to="/tools"
              className={buttonVariants({
                variant: "default",
                className: "w-full gap-2 p-4 text-sm sm:w-auto sm:p-5",
              })}
            >
              Coba sekarang <LuArrowUpRight aria-hidden="true" />
            </Link>

            <Link
              to="/changelog"
              className={buttonVariants({
                variant: "outline",
                className: "w-full p-4 text-sm sm:w-auto sm:p-5",
              })}
            >
              Update Terbaru
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
