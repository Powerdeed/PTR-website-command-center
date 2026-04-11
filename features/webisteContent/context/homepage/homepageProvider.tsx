"use client";

import { useState } from "react";

import { homepageContext } from "./homepageContext";

import { Homepage } from "../../types/homePage.types";

export default function HomepageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [homepage, setHomepage] = useState<Homepage | null>(null);

  const [homepagePrev, setHomepagePrev] = useState<Homepage | null>(null);

  const [getHomepageDataError, setGetHomepageDataError] = useState("");

  const [updatingHomepage, setUpdatingHomepage] = useState(false);

  const [updateHomepageDataError, setUpdateHomepageDataError] = useState("");

  const [refreshFetchHomepage, setRefreshFetchHomepage] = useState(false);

  const [hasHomePageChanged, setHasHomePageChanged] = useState(false);

  const [fetchingHomepageData, setFetchingHomepageData] = useState(false);

  return (
    <homepageContext.Provider
      value={{
        homepage,
        setHomepage,
        homepagePrev,
        setHomepagePrev,
        getHomepageDataError,
        setGetHomepageDataError,
        updatingHomepage,
        setUpdatingHomepage,
        updateHomepageDataError,
        setUpdateHomepageDataError,
        refreshFetchHomepage,
        setRefreshFetchHomepage,
        hasHomePageChanged,
        setHasHomePageChanged,
        fetchingHomepageData,
        setFetchingHomepageData,
      }}
    >
      {children}
    </homepageContext.Provider>
  );
}
