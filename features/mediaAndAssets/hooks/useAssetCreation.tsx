"use client";

import { useContext } from "react";

import useMediaAssetsState from "./useMediaAssetsState";
import useAssetPaths from "./useAssetPaths";

import { Asset } from "../types/mediaAssets.assets";

import { MediaAssetsContext } from "../context/MediaAssetsContext";

export default function useAssetCreation() {
  const mediaAssetsContext = useContext(MediaAssetsContext);

  if (!mediaAssetsContext) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { setCurrentAsset, setAssetMode } = mediaAssetsContext;

  const { updatePathSetters } = useAssetPaths();
  const { newEmptyAsset } = useMediaAssetsState();

  const handleCurrentAsset = (
    mode: "new" | "existing" | null,
    asset?: Asset,
  ) => {
    setAssetMode(mode);
    updatePathSetters(asset);

    if (mode === "new") {
      setCurrentAsset(newEmptyAsset);
    } else if (mode === "existing" && asset) {
      setCurrentAsset(asset);
    }
  };
  return { handleCurrentAsset };
}
