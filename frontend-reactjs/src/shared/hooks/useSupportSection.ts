import { PaymentMethodProps } from "@/constants/payments";
import { useState } from "react";
import { toast } from "sonner";
import { useSoundEffect } from "./useSoundEffect";

export const useSupportSection = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodProps | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const errorSound = useSoundEffect("/sounds/error.mp3");

  const handleMethodClick = (method: PaymentMethodProps) => {
    if (method.id === "paypal" && method.link) {
      window.open(method.link, "_blank");
      toast.success("Membuka Paypal...");
    } else {
      setSelectedMethod(method);
    }
  };

  const handleCopy = async (text: string, fieldName: string) => {
    try {
      toast.success(`${fieldName} tersalin!`);
      await navigator.clipboard.writeText(text);
      errorSound.play();
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast.error("Gagal menyalin ke clipboard");
    }
  };

  const handleCloseModal = () => {
    setSelectedMethod(null);
    setCopiedField(null);
  };
  return {
    state: {
      selectedMethod,
      copiedField,
    },
    action: {
      handleCopy,
      handleMethodClick,
      handleCloseModal,
    },
  };
};
