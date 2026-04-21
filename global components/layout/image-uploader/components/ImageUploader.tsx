"use client";

import MediaAssetsErrorsProvider from "@features/mediaAndAssets/context/MediaAssetsErrorsProvider";
import ImageUploaderView from "./ImageUploaderView";
import MediaAssetsProcessingProvider from "@features/mediaAndAssets/context/MediaAssetsProcessingProvider";
import MediaAssetsProvider from "@features/mediaAndAssets/context/MediaAssetsProvider";
import MediaAssetsSearchProvider from "@features/mediaAndAssets/context/MediaAssetsSearchProvider";
import ImageProvider from "../context/ImageProvider";
import { FileType } from "@global utils/global-states.types";

export default function ImageUploader({
  targetFileTypes,
  path,
  changeFunc,
}: {
  targetFileTypes: FileType[];
  path: string;
  changeFunc: (val: string) => void;
}) {
  return (
    <MediaAssetsErrorsProvider>
      <MediaAssetsProcessingProvider>
        <MediaAssetsProvider>
          <MediaAssetsSearchProvider>
            <ImageProvider>
              <ImageUploaderView
                targetFileTypes={targetFileTypes}
                path={path}
                changeFunc={changeFunc}
              />
            </ImageProvider>
          </MediaAssetsSearchProvider>
        </MediaAssetsProvider>
      </MediaAssetsProcessingProvider>
    </MediaAssetsErrorsProvider>
  );
}
