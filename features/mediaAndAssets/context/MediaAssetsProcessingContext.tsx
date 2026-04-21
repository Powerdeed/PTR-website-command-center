"use client";

import { FileType } from "@global utils/global-states.types";
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

  targetFileTypes: FileType[];
  setTargetFileTypes: Dispatch<SetStateAction<FileType[]>>;
};

export const MediaAssetsProcessingContext =
  createContext<MediaAssetsProcessingState | null>(null);
