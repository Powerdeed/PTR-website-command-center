"use client";

import { useContext, useEffect } from "react";

import { MediaAssetsContext } from "../context/MediaAssetsContext";
import { MediaAssetsProcessingContext } from "../context/MediaAssetsProcessingContext";

import useMediaAssetsState from "./useMediaAssetsState";

import { Asset } from "../types/mediaAssets.assets";
import useError from "./useError";

export default function useAssetEditing() {
  const mediaAssetsContext = useContext(MediaAssetsContext);
  const processingContext = useContext(MediaAssetsProcessingContext);

  if (!mediaAssetsContext || !processingContext) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const {
    setCurrentAsset,
    file,
    setFile,
    setAssetMode,
    fileName,
    setFileName,
    assetCategory,
    setAssetCategory,
    firstPath,
    setFirstPath,
    setFirstPathArr,
    secondPath,
    setSecondPath,
  } = mediaAssetsContext;

  const { setIsSupportedFile } = processingContext;

  const { resetErrors } = useError();

  const { newEmptyAsset, fileType } = useMediaAssetsState();

  const handleResetAssetStates = (reason: "cancel" | "re-upload") => {
    setFile(null);
    setFileName("");
    setAssetCategory("");
    setFirstPathArr(null);
    setFirstPath(undefined);
    setSecondPath(undefined);
    resetErrors();
    setAssetMode(reason === "re-upload" ? "new" : null);
    setCurrentAsset(reason === "re-upload" ? newEmptyAsset : null);
  };

  useEffect(() => {
    if (file) {
      setIsSupportedFile(
        ["document", "diagram", "image"].includes(fileType as Asset["type"]),
      );

      setCurrentAsset(newEmptyAsset);
    }
  }, [file, fileType]);

  useEffect(() => {
    const assetUsage = firstPath
      ? `${firstPath}${secondPath ? `/${secondPath}` : ""}`
      : "";

    setCurrentAsset((prev) =>
      prev
        ? {
            ...prev,
            ["name"]: fileName,
            ["category"]: assetCategory,
            ["usage"]: assetUsage,
            ["fullPath"]: `${assetCategory}${assetUsage && "/" + assetUsage}/${fileName}`,
          }
        : prev,
    );
  }, [fileName, assetCategory, firstPath, secondPath]);

  return { handleResetAssetStates };
}
