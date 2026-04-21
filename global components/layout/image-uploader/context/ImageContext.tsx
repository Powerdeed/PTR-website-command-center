"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type ImageState = {
  targetFileType: "image" | "document" | "diagram" | "video";
  setTargetFileType: Dispatch<
    SetStateAction<"image" | "document" | "diagram" | "video">
  >;
};

export const imageContext = createContext<ImageState | null>(null);
