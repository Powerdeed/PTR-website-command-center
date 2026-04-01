"use client";

import { createContext, Dispatch } from "react";

type websiteContentContextState = {
  activeSection: string;
  setActiveSection: Dispatch<React.SetStateAction<string>>;
};

export const websiteContentContext =
  createContext<websiteContentContextState | null>(null);
