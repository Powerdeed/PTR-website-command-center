"use client";

import { useContext } from "react";

import { aboutpageContext } from "@features/webisteContent/context/aboutpageContext";

export default function useAboutpageState() {
  const state = useContext(aboutpageContext);

  if (!state) throw new Error("Context must be within a provider");

  return {
    ...state,
  };
}
