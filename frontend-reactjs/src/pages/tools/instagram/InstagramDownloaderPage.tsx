import { ToolPageLayout } from "@/shared/components/layouts/ToolPageLayout";
import { useMediaDownloader } from "@/shared/hooks/useMediaDownloader";
import { SearchForm } from "@/shared/components/ui/SearchForm";
import { UploadSkeleton } from "./components/UploadSkeleton";
import {
  MediaPreviewCard,
  MediaPreviewContent,
  MediaPreviewDownloadList,
  MediaPreviewInfo,
  MediaPreviewThumbnail,
} from "@/shared/components/media-preview";
import { RecommendedTools } from "@/shared/components/RecommendedTools";

export default function InstagramDownloaderPage() {
  const { form, states, actions } = useMediaDownloader("instagram");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <ToolPageLayout>
      <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-6">
        <SearchForm
          errors={errors}
          register={register}
          onSubmit={handleSubmit(actions.onSubmit)}
          placeholder="Tempel link Instagram di sini (instagram.com/...)"
          isSubmitting={isSubmitting}
          isDownloading={states.isDownloading}
        />
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 pb-4">
          {isSubmitting ? (
            <UploadSkeleton />
          ) : (
            <MediaPreviewCard active={states.activePreviewCard}>
              <MediaPreviewThumbnail src={states.info?.thumbnail} alt={states.info?.title} useProxy />
              <MediaPreviewContent>
                <MediaPreviewInfo
                  title={states.info?.title}
                  author={states.info?.author}
                  duration={states.info?.duration}
                />
                <MediaPreviewDownloadList
                  formats={states.filteredFormats}
                  downloadingFormatId={states.downloadingFormatId}
                  isDownloading={states.isDownloading}
                  onDownloadClick={actions.onDownloadClick}
                />
              </MediaPreviewContent>
            </MediaPreviewCard>
          )}
          <RecommendedTools currentPath="/tools/instagram" isVisible={true} />
        </div>
      </div>
    </ToolPageLayout>
  );
}
