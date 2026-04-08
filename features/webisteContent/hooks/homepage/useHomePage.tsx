"use client";

import useHomePageApi from "./useHomepageApi";
import useHomepageState from "./useHomepageState";
import useHomePageEditor from "./useHomepageEditor";
import useTestimonials from "./useTestimonials";

export default function useHomePage() {
  const state = useHomepageState();
  const homepageHandlers = useHomePageEditor();
  const testimonialHandlers = useTestimonials();
  const api = useHomePageApi();

  return {
    state,
    actions: { ...homepageHandlers, ...testimonialHandlers, ...api },
  };
}
