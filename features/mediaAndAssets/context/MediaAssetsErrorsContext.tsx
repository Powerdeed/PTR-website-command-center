"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type MediaAssetsState = {
  errorProcessingFile: boolean;
  setErrorProcessingFile: Dispatch<SetStateAction<boolean>>;
  errorUploadingFile: boolean;
  setErrorUploadingFile: Dispatch<SetStateAction<boolean>>;
};

export const MediaAssetsErrorsContext = createContext<MediaAssetsState | null>(
  null,
);
