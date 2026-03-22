"use client";

import { useState } from "react";
import { MediaAssetsContext } from "./MediaAssetsContext";
import { Asset } from "../types/mediaAssets.assets";
import { getMediaAssets } from "../services/mediaAssets";

export default function MediaAssetsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mediaAssets, setMediaAssets] = useState<Asset[]>(getMediaAssets());
  const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);
  const [targetAssetType, setTargetAssetType] = useState<Asset["type"] | "All">(
    "All",
  );
  const [file, setFile] = useState<File | null>(null);
  const [assetMode, setAssetMode] = useState<"new" | "existing" | null>(null);
  const [copying, setCopying] = useState(false);
  const [firstPathArr, setFirstPathArr] = useState<string[] | null>(null);
  const [fileName, setFileName] = useState("");
  const [assetCategory, setAssetCategory] = useState("");
  const [firstPath, setFirstPath] = useState<string | undefined>(undefined);
  const [secondPath, setSecondPath] = useState<string | undefined>(undefined);

  return (
    <MediaAssetsContext.Provider
      value={{
        mediaAssets,
        setMediaAssets,
        currentAsset,
        setCurrentAsset,
        targetAssetType,
        setTargetAssetType,
        file,
        setFile,
        assetMode,
        setAssetMode,
        copying,
        setCopying,
        firstPathArr,
        setFirstPathArr,
        fileName,
        setFileName,
        assetCategory,
        setAssetCategory,
        firstPath,
        setFirstPath,
        secondPath,
        setSecondPath,
      }}
    >
      {children}
    </MediaAssetsContext.Provider>
  );
}
