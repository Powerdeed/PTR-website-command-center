"use client";

import { useContext } from "react";

import { homepageContext } from "../../context/homepageContext";

export default function useHomepageState() {
  const homepageState = useContext(homepageContext);

  if (!homepageState) throw new Error("Context must be within a provider");

  return {
    ...homepageState,
  };
}
