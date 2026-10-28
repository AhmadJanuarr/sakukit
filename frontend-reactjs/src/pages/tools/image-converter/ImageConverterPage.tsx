import { ToolPageLayout } from "@/shared/components/layouts/ToolPageLayout";
import { DropzoneContainer } from "@/shared/components/ui/DropzoneContainer";
import { RecommendedTools } from "@/shared/components/RecommendedTools";
import { UploadArea } from "@/shared/components/ui/UploadArea";
import { useUnsavedChangesWarning } from "@/shared/hooks/useUnsavedChangesWarning";
import { ImageQueue } from "./components/ImageQueue";
import { useImageConverter } from "./hooks/useImageConverter";

export default function ImageConverterPage() {
  const { state, actions } = useImageConverter();
  const hasFiles = state.files.length > 0;
  useUnsavedChangesWarning({ hasUnsavedFiles: hasFiles });

  return (
    <ToolPageLayout>
      <section className="flex flex-1 flex-col">
        <DropzoneContainer dragHandler={actions.handleEventDrop}>
          <UploadArea
            onChangeHandler={actions.handleFileInputChange}
            isProcessing={state.isUploading}
            pendingFileCount={state.files.length}
            variant="default"
          />
        </DropzoneContainer>
        <div className="flex flex-1 flex-col justify-between pt-6">
          <ImageQueue
            files={state.files}
            isProcessing={state.isProcessing}
            selectedFormats={state.selectedFormats}
            onFormatChange={actions.handleFormatChange}
            onRemoveFile={actions.removeFile}
            onProcess={actions.processFiles}
            onAddFiles={actions.addFiles}
            onClearFiles={actions.clearAllFiles}
          />
          <div className="mt-auto pt-6">
            <RecommendedTools currentPath="/tools/image-converter" isVisible={true} />
          </div>
        </div>
      </section>
    </ToolPageLayout>
  );
}
