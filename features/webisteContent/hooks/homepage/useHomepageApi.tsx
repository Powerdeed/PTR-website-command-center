"use client";

import { useContext, useEffect } from "react";

import { homepageContext } from "../../context/homepageContext";

import {
  addTestimonial,
  deleteTestimonialData,
  getHomePageData,
  getTestimonials,
  updateHomePageData,
  updateTestimonialData,
} from "../../services/homepage";

import { DEFAULT_TESTIMONIAL } from "@features/webisteContent/constants/defaultTestimonial";
import { execute } from "@lib/api/execute";

export default function useHomePageApi() {
  const homepageState = useContext(homepageContext);

  if (!homepageState)
    throw new Error("Home page context must be within a provider");

  const {
    homepage,
    setHomepage,
    setHomepagePrev,
    getHomepageDataError,
    setGetHomepageDataError,
    updateHomepageDataError,
    setUpdateHomepageDataError,
    setHasHomePageChanged,
    fetchingHomepageData,
    setFetchingHomepageData,
    setUpdatingHomepage,

    testimonials,
    setTestimonials,
    setTestimonialsPrev,
    getTestimonialsError,
    setGetTestimonialsError,
    testimonialsError,
    setTestimonialsError,
    setAddingTestimonials,
    setAddTestimonialsError,
    setUpdatingTestimonials,
    editedTestimonials,
    setEditedTestimonials,
    setDeletingTestimonials,
    fetchingTestimonialsData,
    setFetchingTestimonialsData,
    setHasTestimonialsChanged,

    refreshFetchData,
  } = homepageState;

  const fetchingData = fetchingHomepageData || fetchingTestimonialsData;

  const getErrors = getHomepageDataError
    ? `Error fetching homepage data: ${getHomepageDataError}.`
    : getTestimonialsError
      ? `Error fetching testimonials: ${getTestimonialsError}`
      : "";

  const updateErrors = updateHomepageDataError
    ? `Error updating homepage data: ${updateHomepageDataError}`
    : testimonialsError
      ? `Error updating testimonials: ${testimonialsError}`
      : "";

  useEffect(() => {
    const fetchData = async () => {
      await execute(getHomePageData, {
        setLoading: setFetchingHomepageData,
        setError: setGetHomepageDataError,
        onSuccess: (homepages) => {
          if (homepages?.length > 0) {
            setHomepage(homepages[0]);
            setHomepagePrev(homepages[0]);
          }
        },
      });

      await execute(getTestimonials, {
        setLoading: setFetchingTestimonialsData,
        setError: setGetTestimonialsError,
        onSuccess: (testimonials) => {
          if (testimonials) {
            setTestimonials(testimonials);
            setTestimonialsPrev(testimonials);
          }
        },
      });
    };

    fetchData();
  }, [
    refreshFetchData,
    setHomepage,
    setHomepagePrev,
    setFetchingHomepageData,
    setGetHomepageDataError,
    setTestimonials,
    setTestimonialsPrev,
    setFetchingTestimonialsData,
    setGetTestimonialsError,
  ]);

  const handleAddTestimonial = async () => {
    if (!testimonials) return;

    await execute(() => addTestimonial(DEFAULT_TESTIMONIAL), {
      setLoading: setAddingTestimonials,
      setError: setAddTestimonialsError,
      onSuccess: (newTestimonial) => {
        setTestimonials((prev) => [...prev, newTestimonial]);
      },
    });
  };

  const saveAllChanges = async () => {
    if (!homepage || !testimonials) return;

    // Update homepage
    await execute(() => updateHomePageData(homepage._id, homepage), {
      setLoading: setUpdatingHomepage,
      setError: setUpdateHomepageDataError,
      onSuccess: (updatedHomepage) => {
        if (updatedHomepage) setHomepage(updatedHomepage);
        setHasHomePageChanged(false);
      },
    });

    // Update testimonials
    await execute(
      () =>
        updateTestimonialData(
          testimonials.filter((t) => editedTestimonials.includes(t._id)),
        ),
      {
        setLoading: setUpdatingTestimonials,
        setError: setTestimonialsError,
        onSuccess: () => {
          setEditedTestimonials([]);
          setHasTestimonialsChanged(false);
        },
      },
    );
  };

  const handleDeleteTestimonial = async (testimonialId: string) =>
    await execute(() => deleteTestimonialData(testimonialId), {
      setLoading: setDeletingTestimonials,
      setError: setTestimonialsError,
      onSuccess: () => {
        setTestimonials((prev) =>
          prev
            ? prev.filter((testimonial) => testimonial._id !== testimonialId)
            : prev,
        );
      },
    });

  return {
    fetchingData,
    getErrors,
    updateErrors,
    saveAllChanges,
    handleAddTestimonial,
    handleDeleteTestimonial,
  };
}
