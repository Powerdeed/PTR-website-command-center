"use client";

import { useContext } from "react";

import { isEqual } from "lodash";

import { homepageContext } from "../../context/homepageContext";

import { Homepage } from "../../types/homePage.types";

export default function useHomePageEditor() {
  const homepageState = useContext(homepageContext);

  if (!homepageState)
    throw new Error("Home page context must be within a provider");

  const {
    homepage,
    setHomepage,
    homepagePrev,
    setUpdateHomepageDataError,
    setTestimonialsError,
    setHasHomePageChanged,
  } = homepageState;

  const updateHomePageData = (
    key: string,
    innerKey: keyof Homepage,
    data: string | boolean,
    section?: number,
  ) => {
    if (!homepage || !homepagePrev) return;

    setUpdateHomepageDataError("");
    setTestimonialsError("");

    setHomepage((prev) => {
      if (!prev) return prev;

      let updated;

      if (innerKey === "hero") {
        updated = {
          ...prev,
          hero: { ...prev.hero, [key]: data },
        };
      } else if (innerKey === "aboutIntro") {
        const updatedIntro = prev.aboutIntro.map((item, index) =>
          index === section ? { ...item, [key]: data } : item,
        );

        updated = {
          ...prev,
          aboutIntro: updatedIntro,
        };
      } else {
        return prev;
      }

      setHasHomePageChanged(!isEqual(updated, homepagePrev));

      return updated;
    });
  };

  return {
    updateHomePageData,
  };
}
