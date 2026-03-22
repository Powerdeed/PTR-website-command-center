"use client";

import { useContext } from "react";
import { MediaAssetsContext } from "../context/MediaAssetsContext";
import { MediaAssetsProcessingContext } from "../context/MediaAssetsProcessingContext";
import { MediaAssetsErrorsContext } from "../context/MediaAssetsErrorsContext";

export default function useError() {
  const mediaAssetsContext = useContext(MediaAssetsContext);
  const processingContext = useContext(MediaAssetsProcessingContext);
  const errorContext = useContext(MediaAssetsErrorsContext);

  if (!mediaAssetsContext || !processingContext || !errorContext) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { file, assetMode, currentAsset } = mediaAssetsContext;

  const { compressing, isSupportedFile, setIsSupportedFile } =
    processingContext;

  const {
    errorProcessingFile,
    setErrorProcessingFile,
    errorUploadingFile,
    setErrorUploadingFile,
  } = errorContext;

  const hasError =
    (!isSupportedFile && isSupportedFile !== null) ||
    errorProcessingFile ||
    errorUploadingFile;

  const errorMsg =
    !isSupportedFile && isSupportedFile !== null
      ? `Only: ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".avif", ".svg", ".pdf", ".docx", ".doc" and ".csv" are supported`
      : errorProcessingFile
        ? `Error processing file: try reselecting the file again.`
        : errorUploadingFile
          ? "Upload failed. Please try again."
          : "";

  const popUpToDisplay = {
    dropZone: !file && assetMode === "new" && !compressing && !hasError,
    compressing: assetMode === "new" && compressing && !hasError,
    assetMediaEditor:
      ((assetMode === "new" && file) || assetMode === "existing") &&
      currentAsset &&
      !compressing &&
      !hasError,
    assetHandlingError: hasError,
  };

  const resetErrors = () => {
    setErrorProcessingFile(false);
    setErrorUploadingFile(false);
    setIsSupportedFile(null);
  };

  return { hasError, errorMsg, popUpToDisplay, resetErrors };
}
