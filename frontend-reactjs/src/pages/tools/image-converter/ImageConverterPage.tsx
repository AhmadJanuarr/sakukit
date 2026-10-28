import { ToolPageLayout } from "@/shared/components/layouts/ToolPageLayout";
import { useImageConverter } from "./_hooks/useImageConverter";
import { DropzoneContainer } from "@/shared/components/ui/DropzoneContainer";
import { UploadArea } from "@/shared/components/ui/UploadArea";
import { ImageQueue, ProcessingOverlay, UploadSuccessful } from "./_components";

export default function ImageConverterPage() {
  const {
    state,
    actions,
    isConverting,
    selectedFormat,
    setSelectedFormat,
    handleConvert,
    handleClearAll,
    handleAddMoreImages,
  } = useImageConverter();
  const { file, isProcessing, isUploadSuccessful, pendingFileCount } = state;

  const hasFiles = file.length > 0;
  const showSuccess = isUploadSuccessful && !isConverting && hasFiles;
  return (
    <ToolPageLayout title="Konversi Gambar" desc="Konversi gambar ke format lain dengan mudah dan cepat.">
      <section className="group h-full">
        <DropzoneContainer dragHandler={actions.handleDrop}>
          <UploadArea
            onChangeHandler={actions.handleChange}
            isProcessing={isProcessing}
            pendingFileCount={pendingFileCount}
            variant="default"
          />
        </DropzoneContainer>
        <div className="flex flex-col p-3">
          <ImageQueue
            file={file}
            selectedFormat={selectedFormat}
            onFormatChange={setSelectedFormat}
            handleImageRemove={actions.handleRemove}
            convertImages={handleConvert}
            addMoreImages={handleAddMoreImages}
            handleClearAll={handleClearAll}
          />
        </div>
      </section>
    </ToolPageLayout>
  );
}
