export const UploadSuccessful = ({ convertAgain }: { convertAgain: () => void }) => {
  return (
    <div className="flex min-h-96 w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <svg className="text-action-primary h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex flex-col gap-2">
          <h2 className="text-action-primary text-xl font-semibold">Success!</h2>
          <p className="text-sm">Gambar Anda telah berhasil dikonversi</p>
        </div>
        <button
          onClick={convertAgain}
          className="bg-action-primary hover:bg-action-primary/80 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-200"
        >
          Konversi Lagi gk?
        </button>
      </div>
    </div>
  );
};
