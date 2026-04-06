"use client";

import { useContext, useEffect } from "react";

import { homepageContext } from "@features/webisteContent/context/homepageContext";
import { ApiError } from "@lib/api/utils/apiError";
import { getHomePageData } from "@features/webisteContent/services/homepage";

export default function useHomePageApi() {
  const homepageState = useContext(homepageContext);

  if (!homepageState)
    throw new Error("Home page context must be within a provider");

  const { setHomepage, setGetHomepageDataError } = homepageState;
  useEffect(() => {
    const getHomepages = async () => {
      try {
        const homepages = await getHomePageData();

        console.log(homepages);
        // if (homepages.length > 0) setHomepage(homepages[0]);
      } catch (error) {
        if (error instanceof ApiError) setGetHomepageDataError(error.message);
      }
    };

    getHomepages();
  }, []);
  return {};
}
