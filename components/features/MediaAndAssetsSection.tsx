"use client";

import { useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  dragHandler,
  dragLeaveHandler,
  dropHandler,
  onFileChange,
} from "draftify-react";

import FormWrapper, { SeparatorLine } from "@components/layout/FormWrapper";
import Button, { ButtonLight } from "@components/ui/Button";
import SearchBar from "@components/ui/SearchBar";

import UseMediaAssets from "@hooks/useMediaAssets";
import { mediaType } from "@utils/conversions";
import type { Asset } from "@services/mediaAssets";

const pageMeta = {
  title: "Media & Assets",
  subtitle: "Central storage for images, documents, and diagrams",
};

const fileCategories = ["All", "Images", "Documents", "Diagrams"];

export default function MediaAndAssetsSection() {
  const {
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
  } = UseMediaAssets();

  const mediaDropRef = useRef<HTMLDivElement | null>(null);

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
                Total Storage: {14.5}
              </div>
            }
          >
            <div className="grid grid-cols-3 gap-5">
              {mediaAssets.map((asset, index) => {
                const iconColors = {
                  image: "text-(--primary-blue)",
                  document: "text-(--primary-red)",
                  diagram: "text-(--primary-green)",
                };

                return (
                  <div
                    key={index}
                    className="p-5 flex flex-col border border-(--terciary-grey)/40 hover:border-(--secondary-blue) hover:bg-(--secondary-blue)/5 rounded-[10px] gap-2.5 h-60"
                  >
                    <div className="flex gap-2.5 h-12">
                      <div>
                        <FontAwesomeIcon
                          icon={[
                            "fas",
                            asset.type === "document" ? "file-lines" : "image",
                          ]}
                          className={`text-style__heading p-3 bg-(--terciary-grey)/30 rounded-[10px] ${iconColors[asset.type]}`}
                        />
                      </div>

                      <div>
                        <div className="text-style__body--bold">
                          {asset.name}
                        </div>
                        <div className="text-style__small-text text-(--secondary-grey)">
                          {asset.size}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-fit text-center text-style__small-text px-2 py-1 rounded-[10px] border border-(--terciary-grey)/40">
                        {asset.type}
                      </div>
                    </div>

                    <SeparatorLine />

                    <div className="text-style__small-text">
                      <span className="font-bold">Used in: </span>
                      {asset.usage}
                    </div>
                    <div className="text-style__small-text text-(--secondary-grey)">
                      Uploaded {asset.uploadDate}
                    </div>

                    <div className="flex justify-between">
                      <ButtonLight
                        buttonText="Download"
                        clickAction={() => {}}
                        icon={<FontAwesomeIcon icon={["fas", "download"]} />}
                      />

                      <ButtonLight buttonText="Delete" clickAction={() => {}} />
                    </div>
                  </div>
                );
              })}
            </div>
          </FormWrapper>
        </div>

        {file ? (
          mediaType(fileName) === "document" ||
          mediaType(fileName) === "diagram" ||
          mediaType(fileName) === "image" ? (
            <form
              onSubmit={handleSubmit}
              className="feature-container-vertical h-full"
            >
              <div>Edit file meta data before uploading</div>
              <div className="flex-1 grid grid-cols-2 gap-2.5">
                {currentAsset &&
                  Object.entries(currentAsset).map(([key, value]) => {
                    const editableFields: Partial<Record<keyof Asset, string>> =
                      {
                        name: "Rename file",
                        category: "Edit file category",
                        usage: "Where to use file",
                      };
                    const assetKey = key as keyof Asset;
                    const placeholder = editableFields[assetKey];
                    const isEditable = Boolean(placeholder);

                    return (
                      <MetaWrapper
                        key={key}
                        meta={
                          isEditable
                            ? assetKey === "name"
                              ? `${key}(optional)*`
                              : `${key}*`
                            : key
                        }
                        val={value}
                        {...(isEditable && {
                          placeholder,
                          changeHandler: (val) => updateAsset(assetKey, val),
                        })}
                      />
                    );
                  })}
              </div>

              <Button buttonText="Upload asset" clickAction={handleSubmit} />
            </form>
          ) : (
            <div className="feature-container-vertical h-80 grid items-center justify-center">
              {mediaType(fileName)}
              Only image documents or svg diagrams
              <Button
                buttonText="Re-upload file"
                clickAction={() => {
                  setFile(null);
                  setFileName("");
                }}
              />
            </div>
          )
        ) : (
          <div
            ref={mediaDropRef}
            onDrop={(e) => {
              setError(null);
              dropHandler(
                e,
                setFile,
                setFileName,
                setCompressing,
                setCompressionProgress,
              );
            }}
            onDragOver={(e) => dragHandler(e, mediaDropRef)}
            onDragLeave={(e) => dragLeaveHandler(e, mediaDropRef)}
            onMouseLeave={(e) => dragLeaveHandler(e, mediaDropRef)}
            className="w-full min-h-80 border-2 border-(--secondary-blue) border-dashed rounded-[10px] text-(--secondary-blue) grid items-center bg-white"
          >
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={(e) => {
                setError(null);
                onFileChange(
                  e,
                  setFile,
                  setFileName,
                  setCompressing,
                  setCompressionProgress,
                );
              }}
            />
            <label
              htmlFor="file"
              className="flex flex-col justify-center items-center text-center gap-5 px-4 py-2 rounded-[10px] cursor-pointer"
            >
              <div className="border rounded-[50%] flex justify-center items-center w-15 h-15 text-[20px] cursor-pointer">
                <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
              </div>
              <div className="text-style__body">
                Drop your image here or click to browse
              </div>
              <div className="text-style__small-text text-(--primary-grey)">
                Supported formats: JPG, PNG, SVG, PDF, DOC • Max file size: 10MB
              </div>
            </label>
          </div>
        )}
      </FormWrapper>
    </div>
  );
}

function MetaWrapper({
  meta,
  placeholder,
  val,
  changeHandler,
}: {
  meta: string;
  placeholder?: string;
  val: string;
  changeHandler?: (val: string) => void;
}) {
  return (
    <div className="flex gap-2.5 items-center">
      <div className="w-55">{meta}:</div>
      {placeholder && changeHandler ? (
        <textarea
          placeholder={placeholder}
          value={val}
          onChange={(e) => changeHandler(e.target.value)}
          className="w-full input-style field-sizing-content"
        />
      ) : (
        <div className="w-full min-h-10 input-style field-sizing-content">
          {val}
        </div>
      )}
    </div>
  );
}
