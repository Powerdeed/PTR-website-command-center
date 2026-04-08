"use client";

import { createContext, Dispatch } from "react";

import { Homepage, Testimonial } from "../types/homePage.types";

type HomepageState = {
  // HOMEPAGE
  homepage: Homepage | null;
  setHomepage: Dispatch<React.SetStateAction<Homepage | null>>;

  homepagePrev: Homepage | null;
  setHomepagePrev: Dispatch<React.SetStateAction<Homepage | null>>;

  getHomepageDataError: string;
  setGetHomepageDataError: Dispatch<React.SetStateAction<string>>;

  updatingHomepage: boolean;
  setUpdatingHomepage: Dispatch<React.SetStateAction<boolean>>;

  updateHomepageDataError: string;
  setUpdateHomepageDataError: Dispatch<React.SetStateAction<string>>;

  // TESTIMONIALS
  testimonials: Testimonial[];
  setTestimonials: Dispatch<React.SetStateAction<Testimonial[]>>;

  testimonialsPrev: Testimonial[];
  setTestimonialsPrev: Dispatch<React.SetStateAction<Testimonial[]>>;

  getTestimonialsError: string;
  setGetTestimonialsError: Dispatch<React.SetStateAction<string>>;

  addTestimonialsError: string;
  setAddTestimonialsError: Dispatch<React.SetStateAction<string>>;

  addingTestimonials: boolean;
  setAddingTestimonials: Dispatch<React.SetStateAction<boolean>>;

  updatingTestimonials: boolean;
  setUpdatingTestimonials: Dispatch<React.SetStateAction<boolean>>;

  deletingTestimonials: boolean;
  setDeletingTestimonials: Dispatch<React.SetStateAction<boolean>>;

  testimonialsError: string;
  setTestimonialsError: Dispatch<React.SetStateAction<string>>;

  refreshFetchData: boolean;
  setRefreshFetchData: Dispatch<React.SetStateAction<boolean>>;

  editedTestimonials: string[];
  setEditedTestimonials: Dispatch<React.SetStateAction<string[]>>;

  hasHomePageChanged: boolean;
  setHasHomePageChanged: Dispatch<React.SetStateAction<boolean>>;

  hasTestimonialsChanged: boolean;
  setHasTestimonialsChanged: Dispatch<React.SetStateAction<boolean>>;

  fetchingHomepageData: boolean;
  setFetchingHomepageData: Dispatch<React.SetStateAction<boolean>>;

  fetchingTestimonialsData: boolean;
  setFetchingTestimonialsData: Dispatch<React.SetStateAction<boolean>>;
};

export const homepageContext = createContext<HomepageState | null>(null);
