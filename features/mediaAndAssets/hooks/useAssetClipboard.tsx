"use client";

import { useContext } from "react";

import { Asset } from "../types/mediaAssets.types";

import { MediaAssetsContext } from "../context/MediaAssetsContext";

export default function useAssetClipboard() {
  const mediaAssetsContext = useContext(MediaAssetsContext);

  if (!mediaAssetsContext) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { currentAsset, setCopying } = mediaAssetsContext;

  const handleCopyAssetPath = async (key: keyof Asset) => {
    if (!currentAsset) return;

    setCopying(true);

    try {
      await navigator.clipboard.writeText(String(currentAsset[key]));

      setTimeout(() => {
        setCopying(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      setCopying(false);
    }
  };
  return { handleCopyAssetPath };
}
