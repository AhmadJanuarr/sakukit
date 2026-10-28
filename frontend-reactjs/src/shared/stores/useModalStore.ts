import { ReactNode } from "react";
import { create } from "zustand";

export interface ModalOptions {
  title: string;
  content: ReactNode;
  onClose?: () => void;
}

interface ModalState {
  isOpen: boolean;
  title: string;
  content: ReactNode | null;
  onCloseCallback?: () => void;
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  title: "",
  content: null,
  onCloseCallback: undefined,
  openModal: ({ title, content, onClose }: ModalOptions) =>
    set({ isOpen: true, title, content, onCloseCallback: onClose }),
  closeModal: () => {
    const { onCloseCallback } = get();
    if (onCloseCallback) onCloseCallback();
    set({ isOpen: false, title: "", content: null, onCloseCallback: undefined });
  },
}));
