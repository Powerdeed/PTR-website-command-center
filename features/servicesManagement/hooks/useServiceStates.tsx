"use client";

import { useContext } from "react";
import { serviceContext } from "../context/serviceContext";

export default function useServiceStates() {
  const sContext = useContext(serviceContext);

  if (!sContext) throw new Error("sContext must be within a provider");

  return { ...sContext };
}
