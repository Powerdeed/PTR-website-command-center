"use client";

import { useContext } from "react";

import { isEqual } from "lodash";

import { homepageContext } from "../../context/homepageContext";

export default function useTestimonials() {
  const homepageState = useContext(homepageContext);

  if (!homepageState)
    throw new Error("Home page context must be within a provider");

  const {
    testimonialsPrev,
    setTestimonials,
    setEditedTestimonials,
    setHasTestimonialsChanged,
  } = homepageState;

  const updateTestimonial = (
    key: string,
    data: string,
    testimonialId: string,
  ) => {
    setEditedTestimonials((prev) =>
      prev.includes(testimonialId) ? prev : [...prev, testimonialId],
    );

    setTestimonials((prev) => {
      if (!prev) return prev;

      const updatedTestimonials = prev.map((testimonial) => {
        if (testimonial._id === testimonialId) {
          return {
            ...testimonial,
            [key]: data,
          };
        }
        return testimonial;
      });

      setHasTestimonialsChanged(
        !isEqual(updatedTestimonials, testimonialsPrev),
      );

      return updatedTestimonials;
    });
  };

  return {
    updateTestimonial,
  };
}
