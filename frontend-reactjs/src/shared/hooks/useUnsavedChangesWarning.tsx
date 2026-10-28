import { useBlocker } from "react-router-dom";
import { useModalStore } from "../stores/useModalStore";
import { useEffect } from "react";

interface UseUnsavedChangesWarningProps {
  hasUnsavedFiles: boolean;
}

export const useUnsavedChangesWarning = ({ hasUnsavedFiles }: UseUnsavedChangesWarningProps) => {
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => hasUnsavedFiles && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      openModal({
        title: "Tinggalkan Halaman Ini?",
        content: (
          <div className="space-y-4">
            <p className="text-ink-secondary text-sm">
              Kamu masih memiliki file yang sudah diunggah. Jika kamu pindah halaman sekarang, proses dan file kamu akan
              hilang.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  blocker.reset();
                }}
                className="border-line-strong text-ink-primary hover:bg-base-primary rounded-lg border px-4 py-2 text-sm font-medium"
              >
                Tetap di Sini
              </button>
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  blocker.proceed();
                }}
                className="bg-ink-danger rounded-lg px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Ya, Pindah Halaman
              </button>
            </div>
          </div>
        ),
      });
    }
  }, [blocker, openModal, closeModal]);
};
