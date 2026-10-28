import { ToolPageLayout } from "@/shared/components/layouts/ToolPageLayout";
import { useMediaDownloader } from "@/shared/hooks/useMediaDownloader";
import { SearchForm } from "@/shared/components/ui/SearchForm";
import {
  PreviewCard,
  PreviewContent,
  PreviewDownloadList,
  PreviewInfo,
  PreviewThumbnail,
  UploadSkeleton,
} from "./_components";

export default function InstagramDownloaderPage() {
  const { form, states, actions } = useMediaDownloader("instagram");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <ToolPageLayout
      title="Pengunduh Reel, Foto, & Video Instagram"
      desc="Unduh konten Reels, Feed, hingga Carousel dari Instagram dengan mudah dan kualitas tajam tanpa mengurangi resolusi."
    >
      <div className="h-full">
        <SearchForm
          errors={errors}
          register={register}
          onSubmit={handleSubmit(actions.onSubmit)}
          placeholder="Tempel link Instagram di sini (instagram.com/...)"
          isSubmitting={isSubmitting}
          isDownloading={states.isDownloading}
        />
        {isSubmitting ? (
          <UploadSkeleton />
        ) : (
          <PreviewCard active={states.activePreviewCard}>
            <PreviewThumbnail src={states.info?.thumbnail} alt={states.info?.title} />
            <PreviewContent>
              <PreviewInfo title={states.info?.title} author={states.info?.author} />
              <PreviewDownloadList
                formats={states.filteredFormats}
                downloadingFormatId={states.downloadingFormatId}
                downloadProgress={states.downloadProgress}
                isDownloading={states.isDownloading}
                onDownloadClick={actions.onDownloadClick}
              />
            </PreviewContent>
          </PreviewCard>
        )}
      </div>
    </ToolPageLayout>
  );
}
