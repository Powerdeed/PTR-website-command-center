"use client";

// modules
import { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// services
import { Asset } from "../types/mediaAssets.assets";

// components
import Button, { ButtonLight } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";

type AssetMetaEditorProps = {
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  currentAsset: Asset | null;
  assetCategory: string;
  setAssetCategory: Dispatch<SetStateAction<string>>;
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
  assetUsagePaths: Record<string, string[]>;
  firstPathArr: string[] | null;
  firstPath: string | undefined;
  secondPath: string | undefined;
  setFirstPath: (value: SetStateAction<string | undefined>) => void;
  setSecondPath: (value: SetStateAction<string | undefined>) => void;
  handleCopy: (key: keyof Asset) => void;
  copying: boolean;
  includesSecondPath: () => boolean;
  handleReUpload: () => void;
  uploadingStatus: boolean;
};

const fieldsToReview: (keyof Asset)[] = [
  "type",
  "size",
  "fullPath",
  "contentType",
];

export default function AssetMetaEditor({
  handleSubmit,
  currentAsset,
  assetCategory,
  fileName,
  setFileName,
  setAssetCategory,
  assetUsagePaths,
  firstPathArr,
  firstPath,
  setFirstPath,
  secondPath,
  setSecondPath,
  handleCopy,
  copying,
  includesSecondPath,
  handleReUpload,
  uploadingStatus,
}: AssetMetaEditorProps) {
  if (!currentAsset) return;

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="feature-container-vertical h-full text-style__body"
    >
      {"Edit file meta data before uploading (areas with '*' must be updated)."}

      <div className="grid grid-cols-2 gap-2.5">
        {Object.entries(currentAsset).map(([key, value]) => {
          if (fieldsToReview.includes(key as keyof Asset)) {
            return (
              <MetaWrapper key={key} meta={key} val={value}>
                {key === "fullPath" && (
                  <FontAwesomeIcon
                    icon={["fas", copying ? "check" : "copy"]}
                    className="cursor-pointer"
                    onClick={() => handleCopy(key)}
                  />
                )}
              </MetaWrapper>
            );
          }

          return null;
        })}

        <div className="flex gap-2.5 items-center">
          <div className="w-55">
            name (optional)<span className="text-(--primary-red)">*</span>:
          </div>

          <textarea
            placeholder="Rename file"
            value={fileName.split(".").slice(0, -1)}
            onChange={(e) =>
              setFileName(`${e.target.value}.${currentAsset.contentType}`)
            }
            className="w-full input-style field-sizing-content"
          />
        </div>

        <div className="flex gap-2.5 items-center">
          <div className="w-55">
            select category<span className="text-(--primary-red)">*</span>:
          </div>

          <select
            value={assetCategory}
            onChange={(e) => {
              setAssetCategory(e.target.value);
            }}
            className="input-style w-full"
          >
            <option value="" disabled>
              select category
            </option>

            {Object.keys(assetUsagePaths).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2.5 items-center">
        <div className="w-33">
          usage<span className="text-(--primary-red)">*</span>:
        </div>

        {firstPathArr ? (
          firstPathArr.length > 0 ? (
            <div className="w-full flex gap-2.5 items-center">
              <select
                value={firstPath}
                onChange={(e) => {
                  setFirstPath(e.target.value);
                  setSecondPath(undefined);
                }}
                className="input-style w-full"
              >
                <option value={undefined}>select specific location</option>

                {[...new Set(firstPathArr)].map((paths) => (
                  <option key={paths} value={paths}>
                    {paths}
                  </option>
                ))}
              </select>

              {firstPath && includesSecondPath() && (
                <select
                  value={secondPath}
                  onChange={(e) => setSecondPath(e.target.value)}
                  className="input-style w-full"
                >
                  <option value={undefined}>which {firstPath}?</option>

                  {assetUsagePaths[assetCategory].map((paths) => {
                    const path = paths.split("-")[1];

                    if (paths.includes(firstPath)) {
                      return (
                        <option key={path} value={path}>
                          {path}
                        </option>
                      );
                    }

                    return;
                  })}
                </select>
              )}
            </div>
          ) : (
            <div>no path selection needed</div>
          )
        ) : (
          <div>select a category first</div>
        )}
      </div>

      <div className="flex gap-2.5">
        <Button
          type="submit"
          className="flex-1"
          buttonText="Upload asset"
          clickAction={() => handleSubmit}
        >
          {uploadingStatus && <Loader />}
        </Button>

        <ButtonLight buttonText="re-upload" clickAction={handleReUpload} />
      </div>
    </form>
  );
}

function MetaWrapper({
  meta,
  val,
  children,
}: {
  meta: string;
  val: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex gap-2.5 items-center">
      <div className="w-33">{meta}:</div>

      <div className="flex-1 min-h-10 input-style items-center flex gap-2.5">
        <div className="flex-1">{val}</div>
        {children}
      </div>
    </div>
  );
}
