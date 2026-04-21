"use client";

import { ReactNode, useState } from "react";
import { imageContext } from "./ImageContext";

export default function ImageProvider({ children }: { children: ReactNode }) {
  const [targetFileType, setTargetFileType] = useState<
    "image" | "document" | "diagram" | "video"
  >("image");

  return (
    <imageContext.Provider value={{ targetFileType, setTargetFileType }}>
      {children}
    </imageContext.Provider>
  );
}
