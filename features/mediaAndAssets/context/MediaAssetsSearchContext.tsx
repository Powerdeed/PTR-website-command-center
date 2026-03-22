"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type MediaAssetsSearchState = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

export const MediaAssetsSearchContext =
  createContext<MediaAssetsSearchState | null>(null);
