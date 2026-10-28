import { ToolPageLayout } from "@/shared/components/layouts/ToolPageLayout";
import { useImageResizer } from "./_hooks/useImageResizer";
import { DropzoneContainer } from "@/shared/components/ui/DropzoneContainer";
import { UploadArea } from "@/shared/components/ui/UploadArea";
import { ImagePreview } from "./_components/ImagePreview";
import { ResizerControls } from "./_components/ResizerControl";
import { useUnsavedChangesWarning } from "@/shared/hooks/useUnsavedChangesWarning";

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
  const hasFiles = state.file.length > 0;

  const onExecuteResize = async () => {
    if (state.file[0]) {
      await handleResize(state.file[0], height, width);
    }
  };
  useUnsavedChangesWarning({ hasUnsavedFiles: hasFiles });
  return (
    <ToolPageLayout
      title="Ubah Ukuran Gambar"
      desc="Ubah ukuran gambar dengan presisi tinggi dan lebar yang diinginkan."
    >
      <section className="group h-full">
        <DropzoneContainer dragHandler={actions.handleDrop}>
          {!hasFiles ? (
            <UploadArea
              onChangeHandler={actions.handleChange}
              isProcessing={state.isProcessing}
              pendingFileCount={state.pendingFileCount}
              variant="resize"
            />
          ) : (
            <div className="flex h-200 w-full flex-col justify-between p-3">
              <div className="flex h-full flex-col gap-4 md:flex-row">
                <div className="border-line-light relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border p-4">
                  <ImagePreview
                    file={state.file[0]}
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
      </section>
    </ToolPageLayout>
  );
}
