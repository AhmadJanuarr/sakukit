export const QueueItemSkeleton = () => {
  return (
    <div className="border-line-light flex flex-col gap-3 border-b p-4 md:grid md:grid-cols-12 md:items-center md:gap-4 md:px-6 md:py-4">
      <div className="col-span-5 flex w-full items-start justify-between gap-3 md:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="bg-line-light size-12 shrink-0 animate-pulse rounded md:size-10" />
          <div className="flex min-w-0 flex-1 flex-col gap-2 md:gap-1.5">
            <div className="bg-line-light h-4 w-3/4 animate-pulse rounded" />
            <div className="flex items-center gap-2 md:hidden">
              <div className="bg-line-light h-4 w-12 animate-pulse rounded" />
              <div className="bg-line-light h-4 w-16 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 hidden md:block">
        <div className="bg-line-light h-6 w-12 animate-pulse rounded" />
      </div>

      <div className="col-span-2 hidden flex-col gap-1 md:flex">
        <div className="bg-line-light h-4 w-16 animate-pulse rounded" />
      </div>

      <div className="col-span-2 w-full md:pr-4">
        <div className="flex flex-col gap-1.5">
          <div className="bg-line-light h-4 w-12 animate-pulse rounded md:w-16" />
          <div className="bg-line-light h-1.5 w-full animate-pulse overflow-hidden rounded-full" />
        </div>
      </div>

      <div className="col-span-1 hidden justify-end gap-4 md:flex">
        <div className="bg-line-light size-5 animate-pulse rounded-full" />
        <div className="bg-line-light size-5 animate-pulse rounded-full" />
      </div>
    </div>
  );
};
