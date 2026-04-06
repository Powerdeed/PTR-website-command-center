"use client";

import { useState } from "react";
import { homepageContext } from "./homepageContext";
import { Homepage, Testimonial } from "../types/homePage.types";

export default function HomepageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [homepage, setHomepage] = useState<Homepage | null>(null);

  const [getHomepageDataError, setGetHomepageDataError] = useState("");

  const [updatingHomepage, setUpdatingHomepage] = useState(false);

  const [updateHomepageDataError, setUpdateHomepageDataError] = useState("");

  // TESTIMONIALS
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);

  const [getTestimonialsError, setGetTestimonialsError] = useState("");

  const [updatingTestimonials, setUpdatingTestimonials] = useState(false);

  const [updateTestimonialsError, setUpdateTestimonialsError] = useState("");

  return (
    <homepageContext.Provider
      value={{
        homepage,
        setHomepage,
        getHomepageDataError,
        setGetHomepageDataError,
        updatingHomepage,
        setUpdatingHomepage,
        updateHomepageDataError,
        setUpdateHomepageDataError,

        // TESTIMONIALS
        testimonials,
        setTestimonials,
        getTestimonialsError,
        setGetTestimonialsError,
        updatingTestimonials,
        setUpdatingTestimonials,
        updateTestimonialsError,
        setUpdateTestimonialsError,
      }}
    >
      {children}
    </homepageContext.Provider>
  );
}
