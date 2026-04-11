"use client";

import { useContext } from "react";

import useHomePageApi from "./useHomepageApi";
import useHomepageState from "./useHomepageState";
import useHomePageEditor from "./useHomepageEditor";
import useTestimonials from "./useTestimonials";
import useTestimonialsApi from "./useTestimonialsApi";

import { homepageContext } from "../../context/homepage/homepageContext";

import { testimonialsContext } from "../../context/homepage/testimonialsContext";

export default function useHomePage() {
  const homepageState = useContext(homepageContext);
  const testimonialsState = useContext(testimonialsContext);

  if (!homepageState || !testimonialsState)
    throw new Error("Home page context must be within a provider");

  const {
    getHomepageDataError,
    updateHomepageDataError,
    fetchingHomepageData,
  } = homepageState;

  const { getTestimonialsError, testimonialsError, fetchingTestimonialsData } =
    testimonialsState;

  const state = useHomepageState();
  const homepageHandlers = useHomePageEditor();
  const testimonialHandlers = useTestimonials();
  const homepageApi = useHomePageApi();
  const testimonialsApi = useTestimonialsApi();

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

  return {
    state,
    actions: {
      fetchingData,
      getErrors,
      updateErrors,
      ...homepageHandlers,
      ...testimonialHandlers,
      ...homepageApi,
      ...testimonialsApi,
    },
  };
}
