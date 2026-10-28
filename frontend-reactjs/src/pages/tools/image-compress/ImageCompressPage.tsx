import { ToolPageLayout } from "@/shared/components/layouts/ToolPageLayout";
import { DropzoneContainer } from "@/shared/components/ui/DropzoneContainer";
import { useImageCompress } from "./_hooks/useImageCompress";
import { UploadArea } from "@/shared/components/ui/UploadArea";
import { ImageQueue } from "./_components/ImageQueue";

export default function ImageCompressPage() {
  const {
    state,
    actions,
    quality,
    compressedResults,
    isCompressing,
    setQuality,
    startCompression,
    handleClearAll,
    handleDownloadSingle,
    handleDownloadAll,
  } = useImageCompress();

  return (
    <ToolPageLayout title="Kompress Gambar" desc="Kompres gambar dalam jumlah banyak dalam sekejap">
      <section className="group h-full">
        <DropzoneContainer dragHandler={actions.handleDrop}>
          <UploadArea
            onChangeHandler={actions.handleChange}
            isProcessing={state.isProcessing}
            pendingFileCount={state.pendingFileCount}
            variant="default"
          />
        </DropzoneContainer>
        <div className="flex flex-col p-3">
          <ImageQueue
            quality={quality}
            setQuality={setQuality}
            files={state.file}
            compressedResults={compressedResults}
            isCompression={isCompressing}
            handleRemove={(index) => actions.handleRemove(index)}
            handleClearAll={handleClearAll}
            startCompression={startCompression}
            handleDownloadSingle={handleDownloadSingle}
            handleDownloadAll={handleDownloadAll}
            handleAddMoreImages={actions.handleChange}
            isProcessing={state.isProcessing}
            pendingFileCount={state.pendingFileCount}
          />
        </div>
      </section>
    </ToolPageLayout>
  );
}
