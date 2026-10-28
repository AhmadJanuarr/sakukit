import { ToolPageLayout } from "@/shared/components/layouts/ToolPageLayout";
import { useImageResizer } from "./hooks/useImageResizer";
import { DropzoneContainer } from "@/shared/components/ui/DropzoneContainer";
import { UploadArea } from "@/shared/components/ui/UploadArea";
import { ImagePreview } from "./components/ImagePreview";
import { ResizerControls } from "./components/ResizerControl";
import { useUnsavedChangesWarning } from "@/shared/hooks/useUnsavedChangesWarning";
import { RecommendedTools } from "@/shared/components/RecommendedTools";

export default function ImageResizerPage() {
  const {
    actions,
    state,
    isResizing,
    width,
    height,
    originalSize,
    setWidth,
    setHeight,
    handleResize,
    handleClearAll,
    onCropComplete,
  } = useImageResizer();
  const hasFiles = state.files.length > 0;

  const onExecuteResize = async () => {
    if (state.files[0]) {
      await handleResize(state.files[0], height, width);
    }
  };
  useUnsavedChangesWarning({ hasUnsavedFiles: hasFiles });

  return (
    <ToolPageLayout>
      <section className="flex flex-1 flex-col">
        <DropzoneContainer dragHandler={actions.handleEventDrop}>
          {!hasFiles ? (
            <UploadArea
              onChangeHandler={actions.handleFileInputChange}
              isProcessing={state.isProcessing}
              pendingFileCount={state.pendingFileCount}
              variant="resize"
            />
          ) : (
            <div className="flex h-200 w-full flex-col justify-between p-3">
              <div className="flex h-full flex-col gap-4 md:flex-row">
                <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl">
                  <ImagePreview
                    file={state.files[0]}
                    targetHeight={height}
                    targetWidth={width}
                    onCropComplete={onCropComplete}
                  />
                </div>
                <ResizerControls
                  width={width}
                  height={height}
                  originalSize={originalSize}
                  onWidthChange={setWidth}
                  onHeightChange={setHeight}
                  onCancel={handleClearAll}
                  onResize={onExecuteResize}
                  isResizing={isResizing}
                />
              </div>
            </div>
          )}
        </DropzoneContainer>
        <div className="mt-auto pt-6">
          <RecommendedTools currentPath="/tools/image-resizer" isVisible={true} />
        </div>
      </section>
    </ToolPageLayout>
  );
}
