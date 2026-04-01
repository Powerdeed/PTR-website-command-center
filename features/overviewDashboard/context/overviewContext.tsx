"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type OverviewState = {
  visibleCount: number;
  setVisibleCount: Dispatch<SetStateAction<number>>;
};

export const overviewContext = createContext<OverviewState | null>(null);
