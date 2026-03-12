"use client";

import { useEffect, useState } from "react";
import { Asset, sampleProcessedAssets } from "@services/mediaAssets";
import { companyServices } from "@services/services";
import { companyStructure } from "@services/companyStructure";
import { projects } from "@services/projects";
import { mediaType } from "@utils/conversions";

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
  const [assetCategory, setAssetCategory] = useState("");
  const [firstPathArr, setFirstPathArr] = useState<string[] | null>(null);
  const [firstPath, setFirstPath] = useState<string>();
  const [secondPath, setSecondPath] = useState<string>();
  const [mediumScreen, setMediumScreen] = useState(false);

  const fileType = mediaType(fileName);
  const supportedTypes = ["document", "diagram", "image"];
  const isSupportedFile = supportedTypes.includes(fileType);

  useEffect(() => {
    const screenSizeSetter = () => setMediumScreen(window.innerWidth < 1024);

    screenSizeSetter();
    window.addEventListener("resize", screenSizeSetter);

    return () => window.removeEventListener("resize", screenSizeSetter);
  }, []);

  useEffect(() => {
    if (file) {
      setCurrentAsset({
        id: "",
        name: fileName,
        type: "image",
        size: "",
        usage: "",
        uploadDate: "",
        url: "",
        fullPath: "",
        category: "",
        contentType: "",
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
    isSupportedFile,
    currentAsset,
    updateAsset,
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
    mediumScreen,
  };
}
