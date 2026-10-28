"use client";

import { useEffect, useState } from "react";

export const useSoundEffect = (src: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    setAudio(audio);
  }, [src]);

  return {
    play: () => {
      audio?.play().catch(console.log);
    },
    stop: () => {
      audio?.pause();
    },
  };
};
