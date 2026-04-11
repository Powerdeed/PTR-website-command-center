"use client";

import { createContext, Dispatch } from "react";

import { DraftifyDocument } from "draftify";

import { AboutUs } from "../../types/aboutPage.types";

type AboutpageState = {
  aboutUs: AboutUs[] | null;
  setAboutUs: Dispatch<React.SetStateAction<AboutUs[] | null>>;

  aboutUsPrev: AboutUs[] | null;
  setAboutUsPrev: Dispatch<React.SetStateAction<AboutUs[] | null>>;

  aboutUsId: string;
  setAboutUsId: Dispatch<React.SetStateAction<string>>;

  loadingAboutUs: boolean;
  setLoadingAboutUs: Dispatch<React.SetStateAction<boolean>>;

  loadingAboutUsError: string;
  setLoadingAboutUsError: Dispatch<React.SetStateAction<string>>;

  aboutOverviewDoc: DraftifyDocument;
  setAboutOverviewDoc: Dispatch<React.SetStateAction<DraftifyDocument>>;

  updatingAboutUs: boolean;
  setUpdatingAboutUs: Dispatch<React.SetStateAction<boolean>>;

  updatingAboutUsError: string;
  setUpdatingAboutUsError: Dispatch<React.SetStateAction<string>>;

  refreshAboutpage: boolean;
  setRefreshAboutpage: Dispatch<React.SetStateAction<boolean>>;

  hasHompageChanged: boolean;
  setHasAboutpageChanged: Dispatch<React.SetStateAction<boolean>>;
};

export const aboutpageContext = createContext<AboutpageState | null>(null);
