import { MediaPreviewCard, MediaPreviewContent } from "@/shared/components/media-preview";
import { Skeleton } from "@/shared/components/ui/Skeleton";

export const UploadSkeleton = () => {
  return (
    <MediaPreviewCard active={true}>
      <div className="flex w-full max-w-md shrink-0 items-start sm:w-70">
        <Skeleton className="aspect-square w-full rounded-xl" />
      </div>
      <MediaPreviewContent>
        <div className="space-y-3">
          <Skeleton className="h-8 w-3/4 rounded-lg" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-32 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
        </div>
        <div className="w-full">
          <Skeleton className="mb-3 h-4 w-40 rounded-md" />
          <div className="grid grid-cols-1 gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="border-line-light flex items-center justify-between rounded-xl border p-4">
                <div className="flex w-full items-center gap-4">
                  <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
                  <div className="w-full space-y-2">
                    <Skeleton className="h-5 w-32 rounded-md" />
                    <Skeleton className="h-3 w-40 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </MediaPreviewContent>
    </MediaPreviewCard>
  );
};
