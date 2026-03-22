"use client";

import { useContext } from "react";

import { MediaAssetsContext } from "../context/MediaAssetsContext";

import { MediaAssetsProcessingContext } from "../context/MediaAssetsProcessingContext";
import { MediaAssetsErrorsContext } from "../context/MediaAssetsErrorsContext";
import { MediaAssetsSearchContext } from "../context/MediaAssetsSearchContext";

import {
  getCurrentDateFormatted,
  mediaType,
  sizeOfFile,
} from "../utils/conversions";

import { Asset } from "../types/mediaAssets.assets";

export default function useMediaAssetsState() {
  const mediaAssetsContext = useContext(MediaAssetsContext);
  const processingContext = useContext(MediaAssetsProcessingContext);
  const errorContext = useContext(MediaAssetsErrorsContext);
  const searchContext = useContext(MediaAssetsSearchContext);

  if (
    !mediaAssetsContext ||
    !processingContext ||
    !errorContext ||
    !searchContext
  ) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { file, fileName } = mediaAssetsContext;

  const fileType = fileName !== "" ? mediaType(fileName) : "image";

  const newEmptyAsset: Asset = {
    id: crypto.randomUUID(),
    name: fileName,
    type: fileType === "video" || fileType === "unknown" ? "image" : fileType,
    size: file ? sizeOfFile(file.size) : "unknown",
    usage: "",
    uploadDate: getCurrentDateFormatted(),
    url: "",
    fullPath: "",
    category: "",
    contentType: `.${fileName.split(".").pop()}`,
  };

  return {
    ...mediaAssetsContext,
    ...processingContext,
    ...errorContext,
    ...searchContext,
    fileType,
    newEmptyAsset,
  };
}
