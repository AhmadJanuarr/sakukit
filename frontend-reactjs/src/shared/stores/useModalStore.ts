import { ReactNode } from "react";
import { create } from "zustand";

export interface ModalOptions {
  title: string;
  content: ReactNode;
}

interface ModalState {
  isOpen: boolean;
  title: string;
  content: ReactNode | null;
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: "",
  content: null,
  openModal: ({ title, content }: ModalOptions) => set({ isOpen: true, title, content }),
  closeModal: () => set({ isOpen: false, title: "", content: null }),
}));
