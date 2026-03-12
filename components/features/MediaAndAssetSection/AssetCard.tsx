"use client";

import { SeparatorLine } from "@components/layout/FormWrapper";
import { ButtonLight } from "@components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UseMediaAssets from "@hooks/useMediaAssets";
import { Asset } from "@services/mediaAssets";
import { truncateString } from "@utils/conversions";

type AssetCardProps = {
  asset: Asset;
  iconColors: Record<string, string>;
};

export default function AssetCard({ asset, iconColors }: AssetCardProps) {
  const { mediumScreen } = UseMediaAssets();

  return (
    <div className="p-5 flex flex-col border border-(--terciary-grey)/40 hover:border-(--secondary-blue) hover:bg-(--secondary-blue)/5 rounded-[10px] gap-2.5 h-60">
      <div className="flex gap-2.5 h-12">
        <div>
          <FontAwesomeIcon
            icon={["fas", asset.type === "document" ? "file-lines" : "image"]}
            className={`text-style__heading p-3 bg-(--terciary-grey)/30 rounded-[10px] ${iconColors[asset.type]}`}
          />
        </div>

        <div>
          <div className="text-style__body--bold">
            {!mediumScreen ? truncateString(asset.name, 25) : asset.name}
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
}
