import { ToolPageLayout } from "@/shared/components/layouts/ToolPageLayout";
import { DropzoneContainer } from "@/shared/components/ui/DropzoneContainer";
import { RecommendedTools } from "@/shared/components/RecommendedTools";
import { UploadArea } from "@/shared/components/ui/UploadArea";
import { useUnsavedChangesWarning } from "@/shared/hooks/useUnsavedChangesWarning";
import { getToolByPath } from "@/shared/utils/tool-catalog";
import { ImageQueue } from "./components/ImageQueue";
import { useImageCompress } from "./hooks/useImageCompress";

export default function ImageCompressPage() {
  const { state, actions } = useImageCompress();
  const hasFiles = state.files.length > 0;
  useUnsavedChangesWarning({ hasUnsavedFiles: hasFiles });

  return (
    <ToolPageLayout>
      <section className="flex min-w-0 flex-1 flex-col">
        <DropzoneContainer dragHandler={actions.handleEventDrop}>
          <UploadArea
            onChangeHandler={actions.handleFileInputChange}
            isProcessing={state.isUploading}
            pendingFileCount={state.pendingFileCount}
            variant="default"
          />
        </DropzoneContainer>
        <div className="flex min-w-0 flex-1 flex-col justify-between pt-4 sm:pt-6">
          <ImageQueue
            quality={state.quality}
            files={state.files}
            compressedResults={state.compressedResults}
            isUploading={state.isUploading}
            isProcessing={state.isProcessing}
            onRemoveFile={actions.removeFile}
            onClearFiles={actions.clearAllFiles}
            onProcess={actions.processFiles}
            onDownloadFile={actions.handleDownloadSingle}
            onDownloadAll={actions.handleDownloadAll}
            onAddFiles={actions.addFiles}
            onQualityChange={actions.setQuality}
            pendingFileCount={state.pendingFileCount}
          />
          <div className="mt-auto pt-6">
            <RecommendedTools currentPath="/tools/image-compress" isVisible={true} />
          </div>
        </div>
      </section>
    </ToolPageLayout>
  );
}
