"use client";

import { useEffect, useState } from "react";
import { Asset, sampleProcessedAssets } from "@services/mediaAssets";

const emptyAssetObj: Asset = {
  id: "",
  name: "",
  type: "image",
  size: "",
  usage: "",
  uploadDate: "",
  url: "",
  fullPath: "",
  category: "",
  contentType: "",
};

export default function UseMediaAssets() {
  const [mediaAssets, setMediaAssets] = useState<Asset[]>(
    sampleProcessedAssets,
  );
  const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [compressing, setCompressing] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);
  const [compressionProgress, setCompressionProgress] = useState<number>(0);
  const [currentAssetNew, setCurrentAssetNew] = useState(false);

  useEffect(() => {
    if (file) {
      setCurrentAsset(emptyAssetObj);
      setCurrentAssetNew(true);
    } else {
      setCurrentAssetNew(false);
    }
  }, [file]);

  const updateAsset = (key: string, val: string) => {};

  return {
    mediaAssets,
    searchQuery,
    setSearchQuery,
    file,
    setFile,
    fileName,
    setFileName,
    compressing,
    setCompressing,
    compressionProgress,
    setCompressionProgress,
    error,
    setError,
    currentAsset,
    updateAsset,
    currentAssetNew,
  };
}
