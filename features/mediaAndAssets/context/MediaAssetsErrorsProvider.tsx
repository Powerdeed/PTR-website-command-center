"use client";

import { useState } from "react";
import { MediaAssetsErrorsContext } from "./MediaAssetsErrorsContext";

export default function MediaAssetsErrorsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [errorProcessingFile, setErrorProcessingFile] = useState(false);
  const [errorUploadingFile, setErrorUploadingFile] = useState(false);

  return (
    <MediaAssetsErrorsContext.Provider
      value={{
        errorProcessingFile,
        setErrorProcessingFile,
        errorUploadingFile,
        setErrorUploadingFile,
      }}
    >
      {children}
    </MediaAssetsErrorsContext.Provider>
  );
}
