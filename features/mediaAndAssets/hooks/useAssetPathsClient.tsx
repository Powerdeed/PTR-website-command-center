"use client";

import { AssetUsagePaths, usagePaths } from "../constants/assetUsagePaths";

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

  const getFirstPaths = async (category: keyof AssetUsagePaths) => {
    setFirstPath("");
    setSecondPath("");

    if (category) {
      const assetPaths: AssetUsagePaths = await usagePaths;

      if (!assetPaths) return;

      const targetPath = assetPaths[category];

      setFirstPathArr(
        targetPath ? targetPath.map((path) => path.split("-")[0]) : [],
      );
    }
  };

  const includesSecondPath = async () => {
    const assetPaths = await usagePaths;

    if (!assetPaths) return false;

    return assetPaths[assetCategory as keyof AssetUsagePaths][0].includes("-");
  };

  const getSecondPaths = async () => {
    const assetPaths = await usagePaths;

    if (!assetPaths) return;

    if (firstPath) {
      const categoryBasedPaths =
        assetPaths[assetCategory as keyof AssetUsagePaths];
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
    setAssetCategory(category as keyof AssetUsagePaths);
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
