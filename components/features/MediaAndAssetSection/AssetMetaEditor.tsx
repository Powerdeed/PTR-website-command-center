import { Dispatch, SetStateAction } from "react";
import { Asset } from "@services/mediaAssets";
import Button from "@components/ui/Button";

type AssetMetaEditorProps = {
  handleSubmit: () => void;
  currentAsset: Asset | null;
  assetCategory: string;
  setAssetCategory: Dispatch<SetStateAction<string>>;
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
  setFirstPathArr: (value: SetStateAction<string[] | null>) => void;
  assetUsagePaths: Record<string, string[]>;
  firstPathArr: string[] | null;
  firstPath: string | undefined;
  secondPath: string | undefined;
  setFirstPath: (value: SetStateAction<string | undefined>) => void;
  setSecondPath: (value: SetStateAction<string | undefined>) => void;
};

export default function AssetMetaEditor({
  handleSubmit,
  currentAsset,
  assetCategory,
  fileName,
  setFileName,
  setAssetCategory,
  setFirstPathArr,
  assetUsagePaths,
  firstPathArr,
  firstPath,
  setFirstPath,
  secondPath,
  setSecondPath,
}: AssetMetaEditorProps) {
  return (
    <form onSubmit={handleSubmit} className="feature-container-vertical h-full">
      <div>
        {
          "Edit file meta data before uploading (areas with '*' must be updated)."
        }
      </div>

      <div className="flex-1 grid grid-cols-2 gap-2.5">
        {currentAsset &&
          Object.entries(currentAsset).map(([key, value]) => {
            if (key === "name" || key === "category" || key === "usage") return;

            return <MetaWrapper key={key} meta={key} val={value} />;
          })}

        <div className="flex gap-2.5 items-center">
          <div className="w-55">name(optional)*:</div>
          <textarea
            placeholder="Rename file"
            value={fileName.split(".").slice(0, -1)}
            onChange={(e) => {
              setFileName(`${e.target.value}.${fileName.split(".").pop()}`);
            }}
            className="w-full input-style field-sizing-content"
          />
        </div>

        <div className="flex gap-2.5 items-center">
          <div className="w-55">select category*:</div>

          <select
            value={assetCategory}
            onChange={(e) => {
              setAssetCategory(e.target.value);
              setFirstPathArr(
                assetUsagePaths[e.target.value].map(
                  (path) => path.split("-")[0],
                ),
              );
            }}
            className="input-style w-full"
          >
            <option value="" disabled>
              select category
            </option>

            {Object.keys(assetUsagePaths).map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2.5 items-center">
        <div className="w-33">usage*:</div>

        {firstPathArr ? (
          firstPathArr.length > 0 ? (
            <div className="flex gap-2.5 items-center">
              <select
                value={firstPath}
                onChange={(e) => setFirstPath(e.target.value)}
                className="input-style"
              >
                <option value="">select specific location</option>

                {firstPathArr.map((paths, idx) => (
                  <option key={idx} value={paths}>
                    {paths}
                  </option>
                ))}
              </select>

              {/* If the first path in the array doesn't include a "-", then no second path exists in that array */}
              {firstPath && assetUsagePaths[assetCategory][0].includes("-") && (
                <select
                  value={secondPath}
                  onChange={(e) => setSecondPath(e.target.value)}
                  className="input-style"
                >
                  <option value="">which {firstPath} location?</option>

                  {assetUsagePaths[assetCategory].map((paths, idx) => {
                    const path = paths.split("-")[1];

                    if (paths.includes(firstPath)) {
                      return (
                        <option key={idx} value={path}>
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

      <Button buttonText="Upload asset" clickAction={handleSubmit} />
    </form>
  );
}

function MetaWrapper({ meta, val }: { meta: string; val: string }) {
  return (
    <div className="flex gap-2.5 items-center">
      <div className="w-55">{meta}:</div>
      <div className="w-full min-h-10 input-style field-sizing-content">
        {val}
      </div>
    </div>
  );
}
