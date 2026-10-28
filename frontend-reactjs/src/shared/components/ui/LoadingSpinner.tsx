"use client";

import { useSoundEffect } from "@/shared/hooks/useSoundEffect";
import { cn } from "@/shared/utils/class-names";
import { useEffect } from "react";

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export const LoadingSpinner = ({ text = "Mohon tunggu...", className, ...props }: PlaceholderProps) => {
  const successSound = useSoundEffect("/sounds/succeed.mp3");
  useEffect(() => {
    if (successSound) {
      successSound.play();
    }
  }, []);
  return (
    <div className={cn("flex min-h-screen w-full flex-col items-center justify-center gap-3", className)} {...props}>
      <div className="border-action-primary size-10 animate-spin rounded-full border-2 border-t-transparent"></div>
      <p className="animate-pulse text-xl font-medium">{text}</p>
    </div>
  );
};
