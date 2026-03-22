"use client";

import { useState } from "react";
import { MediaAssetsSearchContext } from "./MediaAssetsSearchContext";

export default function MediaAssetsSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MediaAssetsSearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </MediaAssetsSearchContext.Provider>
  );
}
