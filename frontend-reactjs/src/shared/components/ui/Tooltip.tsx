import { ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string;
  children: ReactNode;
  show?: boolean;
}

export const Tooltip = ({ content, children, show = true }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  if (!show) return <>{children}</>;

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + rect.height / 2,
        left: rect.right + 12,
      });
      setIsVisible(true);
    }
  };
  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="flex w-full">
        {children}
      </div>
      {isVisible &&
        createPortal(
          <div
            className="animate-in fade-in-0 zoom-in-95 pointer-events-none fixed z-9999 rounded bg-gray-900 px-2.5 py-1 text-xs whitespace-nowrap text-white shadow-md"
            style={{
              top: coords.top,
              left: coords.left,
              transform: "translateY(-60%)",
            }}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
};
