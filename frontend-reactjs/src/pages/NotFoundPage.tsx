import { buttonVariants } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/class-names";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl">
        <h1 className="mb-8 text-6xl font-bold">404</h1>
        <h2 className="mb-6 text-3xl font-semibold">Oops! Page Not Found</h2>
        <div className="text-ink-primary/80 space-y-4 text-lg">
          <p>
            Kami minta maaf, tapi sepertinya Anda telah melangkah ke wilayah yang belum dijelajahi. Halaman yang Anda
            cari tampaknya telah pergi berlibur tanpa meninggalkan alamat pengalihan.
          </p>
          <p>
            Jangan khawatir - hal ini terjadi pada yang terbaik dari kami! Mungkin halaman ini sesdang bermain tembak
            tembak, atau mungkin ia telah berbelok ke arah yang salah di server terakhir.
          </p>
          <p>
            Sedang kami mengirimkan tim pencarian, mengapa tidak kembali ke halaman utama kami? Ada banyak konten
            menarik yang menunggu Anda di sana!
          </p>
        </div>
        <Link to="/" className={cn(buttonVariants({ variant: "default" }), "mt-8")}>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
