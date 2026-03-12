"use client";

// components
import FormWrapper from "@components/layout/FormWrapper";
import Button, { ButtonLight } from "@components/ui/Button";
import SearchBar from "@components/ui/SearchBar";

// feature components
import AssetCard from "./MediaAndAssetSection/AssetCard";
import DropZone from "./MediaAndAssetSection/DropZone";
import UnsupportedFile from "./MediaAndAssetSection/UnsupportedFile";
import AssetMetaEditor from "./MediaAndAssetSection/AssetMetaEditor";

// hooks
import UseMediaAssets from "@hooks/useMediaAssets";

const pageMeta = {
  title: "Media & Assets",
  subtitle: "Central storage for images, documents, and diagrams",
};

const fileCategories = ["All", "Images", "Documents", "Diagrams"];

const iconColors = {
  image: "text-(--primary-blue)",
  document: "text-(--primary-red)",
  diagram: "text-(--primary-green)",
};

export default function MediaAndAssetsSection() {
  const {
    mediaAssets,
    searchQuery,
    setSearchQuery,
    file,
    setFile,
    setFileName,
    setCompressing,
    setCompressionProgress,
    setError,
    isSupportedFile,
    currentAsset,
    updateAsset,
    assetCategory,
    setAssetCategory,
    assetUsagePaths,
    firstPathArr,
    setFirstPathArr,
    firstPath,
    setFirstPath,
    secondPath,
    setSecondPath,
  } = UseMediaAssets();

  const handleSubmit = () => {};

  return (
    <div className="page-layout">
      <FormWrapper
        title={pageMeta.title}
        subtitle={pageMeta.subtitle}
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

          {fileCategories.map((category) => (
            <ButtonLight
              key={category}
              buttonText={category}
              clickAction={(val) => console.log(val)}
            />
          ))}
        </div>

        <div className="feature-container-vertical">
          <FormWrapper
            subtitle={`All Assets (${mediaAssets.length})`}
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
                  iconColors={iconColors}
                />
              ))}
            </div>
          </FormWrapper>
        </div>

        {file &&
          (isSupportedFile ? (
            <AssetMetaEditor
              assetCategory={assetCategory}
              setAssetCategory={setAssetCategory}
              assetUsagePaths={assetUsagePaths}
              currentAsset={currentAsset}
              firstPath={firstPath}
              setFirstPath={setFirstPath}
              firstPathArr={firstPathArr}
              setFirstPathArr={setFirstPathArr}
              secondPath={secondPath}
              setSecondPath={setSecondPath}
              handleSubmit={handleSubmit}
              updateAsset={updateAsset}
            />
          ) : (
            <UnsupportedFile setFile={setFile} setFileName={setFileName} />
          ))}

        {!file && (
          <DropZone
            setFile={setFile}
            setFileName={setFileName}
            setCompressing={setCompressing}
            setCompressionProgress={setCompressionProgress}
            setError={setError}
          />
        )}
      </FormWrapper>
    </div>
  );
}
