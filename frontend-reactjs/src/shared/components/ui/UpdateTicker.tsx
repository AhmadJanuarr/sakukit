import { APP_RELEASES } from "@/constants/updates";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getBadgeColor = (type: string) => {
  switch (type) {
    case "NEW":
      return "bg-action-primary text-white";
    case "UPDATE":
      return "bg-blue-500 text-white";
    case "REFACTOR":
      return "bg-orange-500 text-white";
    case "FIX":
      return "bg-red-500 text-white";
    default:
      return "bg-stone-500 text-white";
  }
};

export const UpdateTicker = ({ href }: { href: string }) => {
  const [index, setIndex] = useState(0);

  const latestRelease = APP_RELEASES[0];
  const currentUpdates = latestRelease?.updates || [];

  useEffect(() => {
    if (currentUpdates.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % currentUpdates.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentUpdates.length]);

  const activeItem = currentUpdates[index];

  return (
    <div className="flex w-full flex-col items-center justify-center py-5">
      <div className="mb-3 flex items-center gap-1.5 text-xs">
        <span className="relative flex h-2 w-2">
          <span className="bg-action-primary/80 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
          <span className="bg-action-primary relative inline-flex h-2 w-2 rounded-full"></span>
        </span>
        Versi saat ini: <span className="">{latestRelease.version}</span>
      </div>{" "}
      <Link
        to={href}
        className="border-line-light hover:bg-action-hover flex w-full max-w-60 cursor-pointer items-center overflow-hidden rounded-full border py-1 text-xs transition-colors md:max-w-xs xl:py-2 xl:text-sm"
      >
        <div className="flex h-full items-center justify-center overflow-hidden pl-1 xl:pl-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={`${activeItem.status}-${index}`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`rounded-full px-2.5 py-1 text-[8px] font-bold tracking-widest ${getBadgeColor(activeItem.status)}`}
            >
              {activeItem.status}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="relative flex h-full flex-1 items-center overflow-hidden pl-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${activeItem.message}-${index}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="truncate"
            >
              {activeItem.message}
            </motion.p>
          </AnimatePresence>
        </div>

        <span className="px-4 font-mono text-[10px] text-stone-400">
          {index + 1}/{currentUpdates.length}
        </span>
      </Link>
    </div>
  );
};
