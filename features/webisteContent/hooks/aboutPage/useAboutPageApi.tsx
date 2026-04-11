"use client";

import { useContext, useEffect } from "react";

import { getAboutUsData, updateAboutUsData } from "../../services/aboutpage";

import { aboutpageContext } from "../../context/aboutpage/aboutpageContext";

import { execute } from "@lib/api/execute";

import { DraftifyBlock } from "draftify";

export default function useAboutPageApi() {
  const aboutpageState = useContext(aboutpageContext);

  if (!aboutpageState) throw new Error("Context must be within a provider");

  const {
    aboutUs,
    setAboutUs,
    setAboutUsPrev,
    setAboutOverviewDoc,
    aboutUsId,
    setAboutUsId,
    setLoadingAboutUs,
    setLoadingAboutUsError,
    refreshAboutpage,
    setUpdatingAboutUs,
    setUpdatingAboutUsError,
    setHasAboutpageChanged,
  } = aboutpageState;

  useEffect(() => {
    const fetchData = async () =>
      await execute(getAboutUsData, {
        setLoading: setLoadingAboutUs,
        setError: setLoadingAboutUsError,
        onSuccess: (homepages) => {
          const blocks = homepages[0].sections.find(
            (section) => section.title === "Company Overview",
          )?.description as DraftifyBlock[];

          setAboutUs(homepages[0].sections);
          setAboutUsPrev(homepages[0].sections);

          setAboutOverviewDoc({
            version: "0.0.1",
            metadata: {
              docTitle: "PTR Company Overview",
            },
            blocks,
          });

          setAboutUsId(homepages[0]._id);
        },
      });

    fetchData();
  }, [
    refreshAboutpage,
    setAboutOverviewDoc,
    setAboutUs,
    setAboutUsPrev,
    setAboutUsId,
    setLoadingAboutUs,
    setLoadingAboutUsError,
  ]);

  const handleSaveAboutPage = async () => {
    if (!aboutUs) return;

    const formattedData = aboutUs.map((data) => {
      const { title, description } = data;

      return { title, description };
    });

    await execute(() => updateAboutUsData(aboutUsId, formattedData), {
      setLoading: setUpdatingAboutUs,
      setError: setUpdatingAboutUsError,
      onSuccess: (updatedAboutUs) => {
        setAboutUs(updatedAboutUs);
        setAboutUsPrev(updatedAboutUs);
        setHasAboutpageChanged(false);
      },
    });
  };

  const resetChanges = () => {};

  return { resetChanges, handleSaveAboutPage };
}
