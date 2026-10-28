export const ProcessingOverlay = () => {
  return (
    <div className="bg-base-secondary/15 dark:bg-base-primary/95 absolute inset-0 z-50 flex items-center justify-center rounded-xl backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <p className="text-action-primary text-xl font-bold">Mengkonversi gambar...</p>
      </div>
    </div>
  );
};
