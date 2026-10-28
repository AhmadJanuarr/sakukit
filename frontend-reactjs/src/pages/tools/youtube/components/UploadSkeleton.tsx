export const UploadSkeleton = () => {
  return (
    <div className="pointer-events-none translate-y-0 py-10 opacity-100 transition-all duration-300">
      <div className="bg-base-secondary border-line-strong flex flex-col gap-5 rounded-2xl border p-4 shadow-sm sm:p-5 md:flex-row md:gap-3 md:rounded-xl md:p-6 md:shadow-none">
        {/* Thumbnail Skeleton */}
        <div className="flex w-full shrink-0 items-start md:w-auto">
          <div className="border-line-light flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border bg-black/5 md:w-125 md:max-w-xl dark:bg-white/5">
            <div className="h-full w-full animate-pulse bg-black/10 dark:bg-white/10" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="mt-1 flex flex-1 flex-col md:mt-0">
          {/* Info Skeleton */}
          <div className="mb-5 space-y-2 md:mb-6 md:space-y-1">
            <div className="h-6 w-3/4 animate-pulse rounded bg-black/10 md:h-8 dark:bg-white/10" />
            <div className="mt-2 flex items-center gap-2">
              <div className="h-5 w-32 animate-pulse rounded bg-black/10 md:h-6 dark:bg-white/10" />
              <div className="h-1 w-1 rounded-full bg-black/20 dark:bg-white/20" />
              <div className="h-5 w-16 animate-pulse rounded bg-black/10 md:h-6 dark:bg-white/10" />
            </div>
          </div>

          {/* Type Switcher Skeleton */}
          <div className="mb-4 flex w-fit gap-2 rounded-xl bg-black/5 p-1 dark:bg-white/5">
            <div className="h-9 w-24 animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
            <div className="h-9 w-24 animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
          </div>

          {/* Download List Skeleton */}
          <div className="border-line-light overflow-hidden rounded-xl border">
            <div className="divide-line-light grid grid-cols-1 divide-y">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-base-primary flex items-center justify-between p-3 md:p-4">
                  <div className="flex w-1/2 items-center gap-3">
                    <div className="h-5 w-16 animate-pulse rounded bg-black/10 dark:bg-white/10" />
                    <div className="h-4 w-12 animate-pulse rounded bg-black/10 dark:bg-white/10" />
                  </div>
                  <div className="h-8 w-24 animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
