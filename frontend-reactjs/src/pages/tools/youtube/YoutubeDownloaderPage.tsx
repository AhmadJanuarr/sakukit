import { ToolPageLayout } from "@/shared/components/layouts/ToolPageLayout";
import { SearchForm } from "@/shared/components/ui/SearchForm";
import { useMediaDownloader } from "@/shared/hooks/useMediaDownloader";
import {
  DownloadTable,
  DownloadTypeSwitcher,
  PreviewCard,
  PreviewContent,
  PreviewInfo,
  PreviewThumbnail,
  UploadSkeleton,
} from "./_components";

export default function YoutubeDownloaderPage() {
  const { form, states, actions } = useMediaDownloader("youtube");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  return (
    <ToolPageLayout
      title="Pengunduh Video YouTube"
      desc="Simpan video dan audio YouTube favoritmu dalam kualitas tinggi (1080p, 4K, MP3) hanya dalam hitungan detik. Tanpa registrasi, tanpa ribet."
    >
      <div className="h-full">
        <SearchForm
          onSubmit={handleSubmit(actions.onSubmit)}
          errors={errors}
          isSubmitting={isSubmitting}
          register={register}
          isDownloading={states.isDownloading}
          placeholder="Masukan link youtube disini (youtube.com/...)"
        />

        {isSubmitting ? (
          <UploadSkeleton />
        ) : (
          <PreviewCard active={states.activePreviewCard}>
            <PreviewThumbnail src={states.info?.thumbnail} alt={states.info?.title} />
            <PreviewContent>
              <PreviewInfo title={states.info?.title} author={states.info?.author} duration={states.info?.duration} />
              <DownloadTypeSwitcher
                selectedDownloadOption={states.selectedDownloadOption}
                setSelectedDownloadOption={actions.setSelectedDownloadOption}
                isSubmitting={isSubmitting}
                isDownloading={states.isDownloading}
              />
              <DownloadTable
                downloadProgress={states.downloadProgress}
                downloadingFormatId={states.downloadingFormatId}
                filteredFormats={states.filteredFormats}
                selectedDownloadOption={states.selectedDownloadOption}
                setSelectedDownloadOption={actions.setSelectedDownloadOption}
                isSubmitting={isSubmitting}
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
