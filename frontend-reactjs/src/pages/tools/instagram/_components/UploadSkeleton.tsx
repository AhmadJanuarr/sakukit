export const UploadSkeleton = () => {
  return (
    <div className="pointer-events-none translate-y-0 overflow-hidden py-10 opacity-100 transition-all duration-500 ease-out">
      <div className="bg-base-secondary border-line-strong flex flex-col gap-5 rounded-2xl border p-4 shadow-sm sm:p-5 md:flex-row md:gap-6 md:p-6 md:shadow-none">
        {/* Thumbnail Skeleton */}
        <div className="flex w-full shrink-0 items-start md:w-[280px]">
          <div className="border-line-light relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border bg-black/5 dark:bg-white/5">
            <div className="h-full w-full animate-pulse bg-black/10 dark:bg-white/10" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="mt-1 flex flex-1 flex-col justify-between py-0 md:mt-0 md:py-2">
          {/* Info Skeleton */}
          <div className="mb-5 space-y-2 md:mb-6 md:space-y-3">
            <div className="h-6 w-3/4 animate-pulse rounded bg-black/10 md:h-8 dark:bg-white/10" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-black/10 md:h-5 dark:bg-white/10" />
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <div className="h-5 w-24 animate-pulse rounded-full bg-black/10 md:h-6 dark:bg-white/10" />
            </div>
          </div>

          {/* Download List Skeleton */}
          <div className="mt-auto space-y-3">
            <div className="mb-2 h-4 w-32 animate-pulse rounded bg-black/10 dark:bg-white/10" />

            <div className="grid grid-cols-1 gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border-line-light bg-base-primary flex items-center justify-between overflow-hidden rounded-xl border p-3 md:p-4"
                >
                  <div className="relative z-10 flex w-full items-center gap-3 md:gap-4">
                    <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-black/10 md:h-12 md:w-12 dark:bg-white/10" />
                    <div className="flex w-full max-w-[200px] flex-col gap-2">
                      <div className="h-4 w-full animate-pulse rounded bg-black/10 dark:bg-white/10" />
                      <div className="h-3 w-2/3 animate-pulse rounded bg-black/10 dark:bg-white/10" />
                    </div>
                  </div>
                  <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-black/10 md:h-10 md:w-10 dark:bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
