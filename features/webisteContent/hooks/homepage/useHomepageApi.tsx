"use client";

import { useContext, useEffect } from "react";

import { homepageContext } from "@features/webisteContent/context/homepage/homepageContext";

import { getHomePageData, updateHomePageData } from "../../services/homepage";

import { execute } from "@lib/api/execute";

export default function useHomePageApi() {
  const homepageState = useContext(homepageContext);

  if (!homepageState)
    throw new Error("Home page context must be within a provider");

  const {
    homepage,
    setHomepage,
    setHomepagePrev,
    setGetHomepageDataError,
    setUpdateHomepageDataError,
    setHasHomePageChanged,
    setFetchingHomepageData,
    setUpdatingHomepage,

    refreshFetchHomepage,
  } = homepageState;

  useEffect(() => {
    const fetchData = async () => {
      await execute(getHomePageData, {
        setLoading: setFetchingHomepageData,
        setError: setGetHomepageDataError,
        onSuccess: (homepages) => {
          if (homepages?.length > 0) {
            setHomepage(homepages[0]);
            setHomepagePrev(homepages[0]);
            setHasHomePageChanged(false);
          }
        },
      });
    };

    fetchData();
  }, [
    refreshFetchHomepage,
    setHomepage,
    setHomepagePrev,
    setFetchingHomepageData,
    setGetHomepageDataError,
    setHasHomePageChanged,
  ]);

  const handleSaveHomepage = async () => {
    if (!homepage) return;

    await execute(() => updateHomePageData(homepage._id, homepage), {
      setLoading: setUpdatingHomepage,
      setError: setUpdateHomepageDataError,
      onSuccess: (updatedHomepage) => {
        if (updatedHomepage) setHomepage(updatedHomepage);
        setHasHomePageChanged(false);
      },
    });
  };

  return {
    handleSaveHomepage,
  };
}
