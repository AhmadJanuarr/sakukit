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

export default function TiktokDownloaderPage() {
  const { form, states, actions } = useMediaDownloader("tiktok");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  return (
    <ToolPageLayout
      title="Pengunduh Video TikTok Tanpa Watermark"
      desc="Simpan video TikTok favoritmu dalam kualitas HD tanpa watermark. Cepat, gratis, dan bisa langsung disimpan ke HP atau laptop."
    >
      <div className="h-full">
        <SearchForm
          errors={errors}
          register={register}
          onSubmit={handleSubmit(actions.onSubmit)}
          placeholder="Tempel link video TikTok di sini (tiktok.com/...)"
          isSubmitting={isSubmitting}
          isDownloading={states.isDownloading}
        />

        {isSubmitting ? (
          <UploadSkeleton />
        ) : (
          <PreviewCard active={states.activePreviewCard}>
            <PreviewThumbnail src={states.info?.thumbnail} alt={states.info?.title} />
            <PreviewContent>
              <PreviewInfo title={states.info?.title} author={states.info?.author} duration={states.info?.duration} />
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
