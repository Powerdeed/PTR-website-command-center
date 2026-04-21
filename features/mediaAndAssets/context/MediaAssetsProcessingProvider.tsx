"use client";

import { useState } from "react";
import { MediaAssetsProcessingContext } from "./MediaAssetsProcessingContext";
import { FileType } from "@global utils/global-states.types";

export default function MediaAssetsProcessingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [compressing, setCompressing] = useState(false);
  const [isSupportedFile, setIsSupportedFile] = useState<boolean | null>(null);
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [targetFileTypes, setTargetFileTypes] = useState<FileType[]>(["image"]);

  return (
    <MediaAssetsProcessingContext.Provider
      value={{
        compressing,
        setCompressing,
        isSupportedFile,
        setIsSupportedFile,
        uploadingStatus,
        setUploadingStatus,
        compressionProgress,
        setCompressionProgress,
        targetFileTypes,
        setTargetFileTypes,
      }}
    >
      {children}
    </MediaAssetsProcessingContext.Provider>
  );
}
