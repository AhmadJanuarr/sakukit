import { ToolPageLayout } from "@/shared/components/layouts/ToolPageLayout";
import { useMediaDownloader } from "@/shared/hooks/useMediaDownloader";
import { SearchForm } from "@/shared/components/ui/SearchForm";
import {
  MediaPreviewCard,
  MediaPreviewContent,
  MediaPreviewDownloadList,
  MediaPreviewInfo,
  MediaPreviewThumbnail,
} from "@/shared/components/media-preview";
import { UploadSkeleton } from "./components/UploadSkeleton";
import { RecommendedTools } from "@/shared/components/RecommendedTools";

export default function TiktokDownloaderPage() {
  const { form, states, actions } = useMediaDownloader("tiktok");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  return (
    <ToolPageLayout>
      <SearchForm
        errors={errors}
        register={register}
        onSubmit={handleSubmit(actions.onSubmit)}
        placeholder="Tempel link video TikTok di sini (tiktok.com/...)"
        isSubmitting={isSubmitting}
        isDownloading={states.isDownloading}
      />
      <div className="flex size-full flex-col justify-between pb-4">
        <>
          {isSubmitting ? (
            <UploadSkeleton />
          ) : (
            <MediaPreviewCard active={states.activePreviewCard}>
              <MediaPreviewThumbnail src={states.info?.thumbnail} alt={states.info?.title} />
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
                  nonVideoLabel="Audio (MP3)"
                  nonVideoIcon="music"
                  fallbackQuality="Standard"
                />
              </MediaPreviewContent>
            </MediaPreviewCard>
          )}
        </>
        <RecommendedTools currentPath="/tools/tiktok" isVisible={true} />
      </div>
    </ToolPageLayout>
  );
}
