import { useModalStore } from "@/shared/stores/useModalStore";
import { useEffect, useRef } from "react";

export const GlobalModal = () => {
  const { isOpen, title, content, closeModal } = useModalStore();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      dialog.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      className="border-line-light bg-card-primary fixed inset-0 z-50 m-auto w-full max-w-lg rounded-2xl border p-6 transition-all backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col gap-4">
        <div className="border-line-light flex items-center justify-between border-b pb-3">
          <h3 className="text-ink-primary x text-lg font-bold">{title}</h3>
          <button
            type="button"
            onClick={closeModal}
            className="text-ink-secondary hover:bg-ink-primary hover:text-base-primary flex size-8 items-center justify-center rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="text-ink-primary text-sm">{content}</div>
      </div>
    </dialog>
  );
};
