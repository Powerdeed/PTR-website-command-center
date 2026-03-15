"use client";

import { useEffect, useState } from "react";

import { sampleProcessedAssets } from "../services/mediaAssets";

import {
  getCurrentDateFormatted,
  mediaType,
  sizeOfFile,
} from "../utils/conversions";

import { Asset } from "../types/mediaAssets.assets";
import { assetUsagePaths } from "../constants/assetUsagePaths";

export default function useMediaAssets() {
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
    const setAssetUsageFunc = () =>
      setAssetUsage(
        firstPath ? `${firstPath}${secondPath ? `/${secondPath}` : ""}` : "",
      );
    setAssetUsageFunc();
  }, [firstPath, secondPath]);

  useEffect(() => {
    if (file) {
      const setIsSupportedFileFunc = () =>
        setIsSupportedFile(
          ["document", "diagram", "image"].includes(fileType as Asset["type"]),
        );
      setIsSupportedFileFunc();
    }

    const setCurrentAssetFunc = () =>
      setCurrentAsset({
        id: crypto.randomUUID(),
        name: fileName,
        type:
          fileType === "video" || fileType === "unknown" ? "image" : fileType,
        size: file ? sizeOfFile(file.size) : "unknown",
        usage: "",
        uploadDate: getCurrentDateFormatted(),
        url: "",
        fullPath: "",
        category: "",
        contentType: `.${fileName.split(".").pop()}`,
      });

    setCurrentAssetFunc();
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
    const setPaths = () => {
      setFirstPath(undefined);
      setSecondPath(undefined);
    };

    setPaths();

    if (assetCategory) {
      const setFirstPathArrFunc = () =>
        setFirstPathArr(
          assetUsagePaths[assetCategory].map((path) => path.split("-")[0]),
        );
      setFirstPathArrFunc();
    }
  }, [assetCategory]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const setMediaAssetsFunc = () =>
      setMediaAssets(
        sampleProcessedAssets.filter(
          (asset) =>
            asset.name.toLowerCase().includes(query) ||
            asset.usage.toLowerCase().includes(query),
        ),
      );

    setMediaAssetsFunc();
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
