import { ToolPageLayout } from "@/shared/components/layouts/ToolPageLayout";
import {
  MediaPreviewCard,
  MediaPreviewContent,
  MediaPreviewInfo,
  MediaPreviewThumbnail,
} from "@/shared/components/media-preview";
import { RecommendedTools } from "@/shared/components/RecommendedTools";
import { SearchForm } from "@/shared/components/ui/SearchForm";
import { useMediaDownloader } from "@/shared/hooks/useMediaDownloader";
import { DownloadTable } from "./components/DownloadTable";
import { DownloadTypeSwitcher } from "./components/DownloadTypeSwitcher";
import { UploadSkeleton } from "./components/UploadSkeleton";

export default function YoutubeDownloaderPage() {
  const { form, states, actions } = useMediaDownloader("youtube");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <ToolPageLayout>
      <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-6">
        <SearchForm
          onSubmit={handleSubmit(actions.onSubmit)}
          errors={errors}
          isSubmitting={isSubmitting}
          register={register}
          isDownloading={states.isDownloading}
          placeholder="Masukan link youtube disini (youtube.com/...)"
        />
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 pb-4">
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
                <DownloadTypeSwitcher
                  selectedDownloadOption={states.selectedDownloadOption}
                  setSelectedDownloadOption={actions.setSelectedDownloadOption}
                  isSubmitting={isSubmitting}
                  isDownloading={states.isDownloading}
                />
                <DownloadTable
                  downloadingFormatId={states.downloadingFormatId}
                  filteredFormats={states.filteredFormats}
                  selectedDownloadOption={states.selectedDownloadOption}
                  isSubmitting={isSubmitting}
                  isDownloading={states.isDownloading}
                  onDownloadClick={actions.onDownloadClick}
                />
              </MediaPreviewContent>
            </MediaPreviewCard>
          )}
          <RecommendedTools currentPath="/tools/youtube" isVisible={true} />
        </div>
      </div>
    </ToolPageLayout>
  );
}
