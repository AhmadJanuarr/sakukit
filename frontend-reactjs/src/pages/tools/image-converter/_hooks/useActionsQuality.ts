import { useEffect, useRef, useState } from "react";

export const useActionsQuality = (quality: number) => {
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [localQuality, setLocalQuality] = useState(quality);
  const qualityOptionsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setLocalQuality(quality);
  }, [quality]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        qualityOptionsRef.current &&
        !qualityOptionsRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowQualityOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    state: {
      showQualityOptions,
      localQuality,
      qualityOptionsRef,
      buttonRef,
    },
    action: {
      setShowQualityOptions,
      setLocalQuality,
    },
  };
};
