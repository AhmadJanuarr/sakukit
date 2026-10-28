export const DashedCenterFadeGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full xl:min-h-screen">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
          linear-gradient(to right, #e7e5e4 1px, transparent 1px),
          linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
        `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
         repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
            radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
        `,
          WebkitMaskImage: `
   repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
            radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
        `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      {children}
    </div>
  );
};
