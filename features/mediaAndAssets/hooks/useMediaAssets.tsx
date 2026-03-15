"use client";

import { useEffect, useState } from "react";

import { sampleProcessedAssets } from "@features/mediaAndAssets/services/mediaAssets";

import { companyServices } from "@global-utils/constants/COMPANY_PROVISIONS";
import { companyStructure } from "@features/webisteContent/services/companyStructure";
import { projects } from "@features/projects/services/projects";

import {
  getCurrentDateFormatted,
  mediaType,
  sizeOfFile,
} from "@global-utils/conversions";
import { Asset } from "../types/mediaAssets.assets";

const assetUsagePaths: Record<string, string[]> = {
  "home page": ["Hero", "about top", "about bottom"],
  services: companyServices,
  "about structure": companyStructure.flatMap(({ levelName, positions }) =>
    positions.map((position) => `${levelName}-${position}`),
  ),
  "about certificates": [],
  projects: projects.map(({ category, name }) => `${category}-${name}`),
  "contact page": ["Hero"],
};

export default function UseMediaAssets() {
  // data
  const [mediaAssets, setMediaAssets] = useState<Asset[]>(
    sampleProcessedAssets,
  );
  const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);
  const [targetAssetType, setTargetAssetType] = useState<Asset["type"] | "All">(
    "All",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // states checkers
  const [compressing, setCompressing] = useState(false);
  const [isSupportedFile, setIsSupportedFile] = useState<boolean | null>(null);
  const [errorProcessingFile, setErrorProcessingFile] = useState(false);
  const [errorUploadingFile, setErrorUploadingFile] = useState(false);
  const [copying, setCopying] = useState(false);
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);

  // new asset states
  const [firstPathArr, setFirstPathArr] = useState<string[] | null>(null);
  const [fileName, setFileName] = useState("");
  const [assetCategory, setAssetCategory] = useState("");
  const [firstPath, setFirstPath] = useState<string | undefined>(undefined);
  const [secondPath, setSecondPath] = useState<string | undefined>(undefined);
  const [assetUsage, setAssetUsage] = useState("");

  const supportedTypes: Asset["type"][] = ["document", "diagram", "image"];
  const fileType = mediaType(fileName);
  const includesSecondPath = () =>
    assetUsagePaths[assetCategory][0].includes("-");

  const hasError =
    (!isSupportedFile && isSupportedFile !== null) ||
    errorProcessingFile ||
    errorUploadingFile;

  const errorMsg =
    !isSupportedFile && isSupportedFile !== null
      ? `Only: ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".avif", ".svg", ".pdf", ".docx", ".doc" and ".csv" are supported`
      : errorProcessingFile
        ? `Error processing file: try reselecting the file again.`
        : errorUploadingFile
          ? "Upload failed. Please try again."
          : "";

  useEffect(() => {
    setAssetUsage(
      firstPath ? `${firstPath}${secondPath ? `/${secondPath}` : ""}` : "",
    );
  }, [firstPath, secondPath]);

  useEffect(() => {
    if (file)
      setIsSupportedFile(supportedTypes.includes(fileType as Asset["type"]));

    setCurrentAsset({
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
    });
  }, [file, fileName, fileType]);

  useEffect(() => {
    const updateCurrentAsset = () => {
      setCurrentAsset((prev) =>
        prev
          ? {
              ...prev,
              ["name"]: fileName,
              ["category"]: assetCategory,
              ["usage"]: assetUsage,
              ["fullPath"]: `${assetCategory}${assetUsage && "/" + assetUsage}`,
            }
          : prev,
      );
    };

    updateCurrentAsset();
  }, [fileName, assetCategory, assetUsage]);

  useEffect(() => {
    setFirstPath(undefined);
    setSecondPath(undefined);

    if (assetCategory)
      setFirstPathArr(
        assetUsagePaths[assetCategory].map((path) => path.split("-")[0]),
      );
  }, [assetCategory]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    setMediaAssets(
      sampleProcessedAssets.filter(
        (asset) =>
          asset.name.toLowerCase().includes(query) ||
          asset.usage.toLowerCase().includes(query),
      ),
    );
  }, [searchQuery]);

  useEffect(() => {
    const filterByType = () => {
      if (targetAssetType === "All") {
        setMediaAssets(sampleProcessedAssets);
      } else {
        setMediaAssets(
          sampleProcessedAssets.filter(
            (asset) => asset.type === targetAssetType,
          ),
        );
      }
    };

    filterByType();
  }, [targetAssetType]);

  const handleCopy = async (key: keyof Asset) => {
    if (!currentAsset) return;

    setCopying(true);

    try {
      await navigator.clipboard.writeText(currentAsset[key]);

      setTimeout(() => {
        setCopying(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      setCopying(false);
    }
  };

  const handleReUpload = () => {
    setFile(null);
    setFileName("");
    setAssetCategory("");
    setFirstPath(undefined);
    setSecondPath(undefined);
    setCurrentAsset({} as Asset);
    setErrorProcessingFile(false);
    setErrorUploadingFile(false);
    setIsSupportedFile(null);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadingStatus(true);

    // logic to submit form
    try {
    } catch (error) {
      setErrorUploadingFile(true);

      if (error instanceof Error)
        console.error(`An error occurred during upload: ${error.message}`);
    }

    setUploadingStatus(false);
  };

  return {
    mediaAssets,
    searchQuery,
    setSearchQuery,
    supportedTypes,
    targetAssetType,
    setTargetAssetType,
    file,
    setFile,
    fileName,
    setFileName,
    compressing,
    compressionProgress,
    setCompressing,
    setCompressionProgress,
    hasError,
    errorMsg,
    uploadingStatus,
    errorProcessingFile,
    setErrorProcessingFile,
    errorUploadingFile,
    isSupportedFile,
    currentAsset,
    assetCategory,
    setAssetCategory,
    assetUsagePaths,
    firstPathArr,
    firstPath,
    setFirstPath,
    secondPath,
    setSecondPath,
    handleSubmit,
    handleCopy,
    copying,
    includesSecondPath,
    handleReUpload,
  };
}
