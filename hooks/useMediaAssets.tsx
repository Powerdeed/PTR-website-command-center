"use client";

import { useEffect, useState } from "react";
import { Asset, sampleProcessedAssets } from "@services/mediaAssets";
import { companyServices } from "@services/services";
import { companyStructure } from "@services/companyStructure";
import { projects } from "@services/projects";

import { getCurrentDateFormatted, mediaType } from "@utils/conversions";

export default function UseMediaAssets() {
  const [mediaAssets, setMediaAssets] = useState<Asset[]>(
    sampleProcessedAssets,
  );
  const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);
  const [compressionProgress, setCompressionProgress] = useState<number>(0);
  const [currentAssetNew, setCurrentAssetNew] = useState(false);
  const [firstPathArr, setFirstPathArr] = useState<string[] | null>(null);
  const [firstPath, setFirstPath] = useState<string>();
  const [secondPath, setSecondPath] = useState<string>();

  const [fileName, setFileName] = useState<string>("");
  const [assetCategory, setAssetCategory] = useState("");
  const [assetUsage, setAssetUsage] = useState<string>("");

  const fileType = mediaType(fileName);
  const supportedTypes = ["document", "diagram", "image"];
  const isSupportedFile = supportedTypes.includes(fileType);

  useEffect(() => {
    if (file) {
      setCurrentAsset({
        id: crypto.randomUUID(),
        name: fileName,
        type:
          fileType === "video" || fileType === "unknown" ? "image" : fileType,
        size: `${file.size / 1000000} MB`,
        usage: "",
        uploadDate: getCurrentDateFormatted(),
        url: "",
        fullPath: "",
        category: "",
        contentType: `.${fileName.split(".").pop()}`,
      });
      setCurrentAssetNew(true);
    } else {
      setCurrentAssetNew(false);
    }
  }, [file, fileName]);

  const assetUsagePaths: Record<string, string[]> = {
    website: ["Hero", "about top", "about bottom"],
    services: companyServices,
    "about structure": companyStructure.flatMap(({ levelName, positions }) =>
      positions.map((position) => `${levelName}-${position}`),
    ),
    "about certificates": [],
    projects: projects.map(({ category, name }) => `${category}-${name}`),
    contact: ["Hero"],
  };

  useEffect(() => {
    const updateCurrentAsset = () => {
      setCurrentAsset((prev) =>
        prev
          ? {
              ...prev,
              ["name"]: fileName,
              ["category"]: assetCategory,
              ["usage"]: `${firstPath}/${secondPath !== undefined ? secondPath : ""}`,
              ["fullPath"]: `${assetCategory}/${firstPath}/${secondPath !== undefined ? secondPath : ""}`,
            }
          : prev,
      );
    };

    updateCurrentAsset();
  }, [fileName, assetCategory, firstPath, secondPath]);

  useEffect(() => {
    console.log(currentAsset);
  }, [currentAsset]);

  const handleSubmit = () => {};

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
    isSupportedFile,
    currentAsset,
    currentAssetNew,
    assetCategory,
    setAssetCategory,
    assetUsagePaths,
    firstPathArr,
    setFirstPathArr,
    firstPath,
    setFirstPath,
    secondPath,
    setSecondPath,
    handleSubmit,
  };
}
