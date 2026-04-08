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

  const [homepagePrev, setHomepagePrev] = useState<Homepage | null>(null);

  const [getHomepageDataError, setGetHomepageDataError] = useState("");

  const [updatingHomepage, setUpdatingHomepage] = useState(false);

  const [updateHomepageDataError, setUpdateHomepageDataError] = useState("");

  // TESTIMONIALS
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [testimonialsPrev, setTestimonialsPrev] = useState<Testimonial[]>([]);

  const [getTestimonialsError, setGetTestimonialsError] = useState("");

  const [addTestimonialsError, setAddTestimonialsError] = useState("");

  const [addingTestimonials, setAddingTestimonials] = useState(false);

  const [updatingTestimonials, setUpdatingTestimonials] = useState(false);

  const [deletingTestimonials, setDeletingTestimonials] = useState(false);

  const [testimonialsError, setTestimonialsError] = useState("");

  const [refreshFetchData, setRefreshFetchData] = useState(false);

  const [editedTestimonials, setEditedTestimonials] = useState<string[]>([]);

  const [hasHomePageChanged, setHasHomePageChanged] = useState(false);

  const [hasTestimonialsChanged, setHasTestimonialsChanged] = useState(false);

  const [fetchingHomepageData, setFetchingHomepageData] = useState(false);

  const [fetchingTestimonialsData, setFetchingTestimonialsData] =
    useState(false);
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

        // TESTIMONIALS
        testimonials,
        setTestimonials,
        testimonialsPrev,
        setTestimonialsPrev,
        getTestimonialsError,
        addTestimonialsError,
        setAddTestimonialsError,
        setGetTestimonialsError,
        addingTestimonials,
        setAddingTestimonials,
        updatingTestimonials,
        setUpdatingTestimonials,
        deletingTestimonials,
        setDeletingTestimonials,
        testimonialsError,
        setTestimonialsError,

        refreshFetchData,
        setRefreshFetchData,
        editedTestimonials,
        setEditedTestimonials,
        hasHomePageChanged,
        setHasHomePageChanged,
        hasTestimonialsChanged,
        setHasTestimonialsChanged,
        fetchingHomepageData,
        setFetchingHomepageData,
        fetchingTestimonialsData,
        setFetchingTestimonialsData,
      }}
    >
      {children}
    </homepageContext.Provider>
  );
}
