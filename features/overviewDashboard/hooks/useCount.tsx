"use client";

import { useContext } from "react";
import { overviewContext } from "../context/overviewContext";

export default function useCount() {
  const overViewContext = useContext(overviewContext);

  if (!overViewContext)
    throw new Error("Overview context must be within a provider");

  return { ...overViewContext };
}
