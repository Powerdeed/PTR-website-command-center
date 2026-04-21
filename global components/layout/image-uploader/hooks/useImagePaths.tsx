"use client";

import { useContext } from "react";
import { MediaAssetsContext } from "@features/mediaAndAssets/context/MediaAssetsContext";

export default function useImagePaths() {
  const mediaAssetState = useContext(MediaAssetsContext);

  if (!mediaAssetState)
    throw new Error("MediaAssetsContext context must be withing a provider.");

  const {
    setAssetCategory,
    setFirstPath,
    setSecondPath,
    setHasFeaturePath,
    setFeaturePath,
  } = mediaAssetState;

  const pathSetter = (path: string) => {
    const paths = path.split("/");

    setHasFeaturePath(true);
    setFeaturePath(path);
    setAssetCategory(paths[0] || "");
    setFirstPath(paths[1] || "");
    setSecondPath(paths[2] || "");
  };

  return { pathSetter };
}
