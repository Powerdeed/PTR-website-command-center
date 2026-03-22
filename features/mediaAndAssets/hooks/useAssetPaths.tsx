"use client";

import { assetUsagePaths } from "../constants/assetUsagePaths";

import { Asset } from "../types/mediaAssets.assets";
import useMediaAssetsState from "./useMediaAssetsState";

export default function useAssetPaths() {
  const {
    firstPath,
    assetCategory,
    setFirstPath,
    setSecondPath,
    setFirstPathArr,
    setAssetCategory,
    setFileName,
  } = useMediaAssetsState();

  const getFirstPaths = (category: string) => {
    setFirstPath(undefined);
    setSecondPath(undefined);

    if (category) {
      const targetPath = assetUsagePaths[category];

      setFirstPathArr(
        targetPath ? targetPath.map((path) => path.split("-")[0]) : [],
      );
    }
  };

  const includesSecondPath = () =>
    assetUsagePaths[assetCategory][0].includes("-");

  const getSecondPaths = () => {
    if (firstPath) {
      const categoryBasedPaths = assetUsagePaths[assetCategory];
      const outputArr: string[] = [];

      categoryBasedPaths.map((paths) => {
        const path = paths.split("-")[1];

        if (paths.includes(firstPath)) {
          outputArr.push(path);
        }
      });
      return outputArr;
    }

    return [];
  };

  const updatePathSetters = (asset?: Asset) => {
    const paths = asset?.fullPath.split("/").slice(0, -1);
    const category = paths ? paths[0] : "";
    const firstPath = paths ? paths[1] : "";
    const secondPath = paths ? paths[2] : "";
    const name = asset?.fullPath.split("/").pop() ?? "";
    const usage = firstPath
      ? `${firstPath}${secondPath ? `/${secondPath}` : ""}`
      : "";

    setFileName(name);
    setAssetCategory(category);
    setFirstPath(firstPath);
    setSecondPath(secondPath);

    return {
      firstPath,
      secondPath,
      usage,
      fullPath: `${category}${usage ? "/" + usage : ""}/${name}`,
    };
  };

  return {
    getFirstPaths,
    getSecondPaths,
    includesSecondPath,
    updatePathSetters,
  };
}
