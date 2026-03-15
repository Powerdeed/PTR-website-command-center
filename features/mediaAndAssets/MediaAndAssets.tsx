"use client";

// components
import FormWrapper from "@global components/layout/FormWrapper";
import Button, { ButtonLight } from "@global components/ui/Button";
import SearchBar from "@global components/ui/SearchBar";
import { ProgressDonut } from "@global components/ui/Loader";

// utils
import { toCamelCase } from "@global-utils/conversions";

// feature components
import AssetCard from "./components/AssetCard";
import DropZone from "./components/DropZone";
import AssetMetaEditor from "./components/AssetMetaEditor";
import AssetHandlingError from "./components/AssetHandlingError";

// hooks
import UseMediaAssets from "./hooks/useMediaAssets";

import { PAGE_META } from "./constants/pageMeta";
import { ICON_COLORS } from "./constants/iconColors";

export default function MediaAndAssets() {
  const {
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
  } = UseMediaAssets();

  return (
    <div className="page-layout">
      <FormWrapper
        title={PAGE_META.title}
        subtitle={PAGE_META.subtitle}
        subtitleChildren={
          <Button buttonText="Upload Files" clickAction={() => {}} />
        }
      >
        <div className="feature-container-horizontal">
          <SearchBar
            val={searchQuery}
            placeholder="Search assets..."
            changeFunc={(val) => setSearchQuery(val)}
          />

          {["All", ...supportedTypes].map((category) => (
            <ButtonLight
              key={category}
              buttonText={category}
              clickAction={() =>
                setTargetAssetType(category as typeof targetAssetType)
              }
            />
          ))}
        </div>

        <div className="feature-container-vertical">
          <FormWrapper
            subtitle={`${targetAssetType === "All" ? "All Assets" : `${toCamelCase(targetAssetType)}s`} (${mediaAssets.length})`}
            subtitleChildren={
              <div className="text-(terciary-grey) text-style__small-text">
                Total Storage: {14.5} MB
              </div>
            }
          >
            <div className="grid grid-cols-3 gap-5">
              {mediaAssets.map((asset) => (
                <AssetCard
                  key={asset.name}
                  asset={asset}
                  iconColors={ICON_COLORS}
                />
              ))}
            </div>
          </FormWrapper>
        </div>

        {/* Ready to upload */}
        {!file && !compressing && !hasError && (
          <DropZone
            setFile={setFile}
            setFileName={setFileName}
            setCompressing={setCompressing}
            setCompressionProgress={setCompressionProgress}
          />
        )}

        {/* Compressing file before uploading */}
        {!file && compressing && !hasError && (
          <ProgressDonut progress={compressionProgress} />
        )}

        {/* After processing and compressing, we can update the file meta and upload */}
        {file && !compressing && !hasError && (
          <AssetMetaEditor
            assetCategory={assetCategory}
            setAssetCategory={setAssetCategory}
            assetUsagePaths={assetUsagePaths}
            currentAsset={currentAsset}
            firstPath={firstPath}
            setFirstPath={setFirstPath}
            firstPathArr={firstPathArr}
            secondPath={secondPath}
            setSecondPath={setSecondPath}
            handleSubmit={handleSubmit}
            fileName={fileName}
            setFileName={setFileName}
            copying={copying}
            handleCopy={handleCopy}
            includesSecondPath={includesSecondPath}
            handleReUpload={handleReUpload}
            uploadingStatus={uploadingStatus}
          />
        )}

        {/* error handler component and logic */}
        {hasError && (
          <AssetHandlingError
            errorMessage={errorMsg}
            handleReUpload={handleReUpload}
          />
        )}
      </FormWrapper>
    </div>
  );
}
