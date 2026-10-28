import { useImageUploader } from "@/shared/hooks/useImageUploader";
import { useState } from "react";

export const useImageTool = () => {
  const uploader = useImageUploader();
  const [isProcessing, setIsProcessing] = useState(false);

  return {
    state: {
      ...uploader.state,
      isUploading: uploader.state.isProcessing,
      isProcessing,
    },
    actions: {
      ...uploader.actions,
      setIsProcessing,
    },
  };
};
