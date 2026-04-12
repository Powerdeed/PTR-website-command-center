"use client";

import { useState } from "react";

import { aboutpageContext } from "./aboutpageContext";

import { DraftifyBlock, DraftifyDocument } from "draftify";

import { AboutUs } from "../../types/aboutPage.types";

export default function AboutpageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [aboutUs, setAboutUs] = useState<AboutUs[] | null>(null);

  const [aboutUsPrev, setAboutUsPrev] = useState<AboutUs[] | null>(null);

  const [loadingAboutUs, setLoadingAboutUs] = useState(false);

  const [loadingAboutUsError, setLoadingAboutUsError] = useState("");

  const [aboutOverviewDoc, setAboutOverviewDoc] = useState<DraftifyDocument>({
    version: "0.0.0",
    metadata: {},
    blocks: [] as DraftifyBlock[],
  });

  const [updatingAboutUs, setUpdatingAboutUs] = useState(false);

  const [updatingAboutUsError, setUpdatingAboutUsError] = useState("");

  const [refreshAboutpage, setRefreshAboutpage] = useState(false);

  const [hasHompageChanged, setHasAboutpageChanged] = useState(false);

  return (
    <aboutpageContext.Provider
      value={{
        aboutUs,
        setAboutUs,
        aboutUsPrev,
        setAboutUsPrev,
        loadingAboutUs,
        setLoadingAboutUs,
        loadingAboutUsError,
        setLoadingAboutUsError,
        aboutOverviewDoc,
        setAboutOverviewDoc,
        updatingAboutUs,
        setUpdatingAboutUs,
        updatingAboutUsError,
        setUpdatingAboutUsError,
        refreshAboutpage,
        setRefreshAboutpage,
        hasHompageChanged,
        setHasAboutpageChanged,
      }}
    >
      {children}
    </aboutpageContext.Provider>
  );
}
