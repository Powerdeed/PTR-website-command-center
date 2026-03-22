"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type MediaAssetsProcessingState = {
  compressing: boolean;
  setCompressing: Dispatch<SetStateAction<boolean>>;

  isSupportedFile: boolean | null;
  setIsSupportedFile: Dispatch<SetStateAction<boolean | null>>;

  uploadingStatus: boolean;
  setUploadingStatus: Dispatch<SetStateAction<boolean>>;

  compressionProgress: number;
  setCompressionProgress: Dispatch<SetStateAction<number>>;
};

export const MediaAssetsProcessingContext =
  createContext<MediaAssetsProcessingState | null>(null);
