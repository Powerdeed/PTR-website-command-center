"use client";

import { createContext, Dispatch, SetStateAction } from "react";

import { Asset } from "../types/mediaAssets.assets";

type MediaAssetsState = {
  // asset and meta
  mediaAssets: Asset[];
  setMediaAssets: Dispatch<SetStateAction<Asset[]>>;
  currentAsset: Asset | null;
  setCurrentAsset: Dispatch<SetStateAction<Asset | null>>;
  targetAssetType: "image" | "document" | "diagram" | "All";
  setTargetAssetType: Dispatch<
    SetStateAction<"image" | "document" | "diagram" | "All">
  >;
  assetMode: "new" | "existing" | null;
  setAssetMode: Dispatch<SetStateAction<"new" | "existing" | null>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
  firstPathArr: string[] | null;
  setFirstPathArr: Dispatch<SetStateAction<string[] | null>>;
  assetCategory: string;
  setAssetCategory: Dispatch<SetStateAction<string>>;
  firstPath: string | undefined;
  setFirstPath: Dispatch<SetStateAction<string | undefined>>;
  secondPath: string | undefined;
  setSecondPath: Dispatch<SetStateAction<string | undefined>>;

  // clipBoard states
  copying: boolean;
  setCopying: Dispatch<SetStateAction<boolean>>;
};

export const MediaAssetsContext = createContext<MediaAssetsState | null>(null);
