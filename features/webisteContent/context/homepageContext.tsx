"use client";

import { createContext, Dispatch } from "react";

import { Homepage, Testimonial } from "../types/homePage.types";

type HomepageState = {
  // HOMEPAGE
  homepage: Homepage | null;
  setHomepage: Dispatch<React.SetStateAction<Homepage | null>>;

  getHomepageDataError: string;
  setGetHomepageDataError: Dispatch<React.SetStateAction<string>>;

  updatingHomepage: boolean;
  setUpdatingHomepage: Dispatch<React.SetStateAction<boolean>>;

  updateHomepageDataError: string;
  setUpdateHomepageDataError: Dispatch<React.SetStateAction<string>>;

  // TESTIMONIALS
  testimonials: Testimonial[] | null;
  setTestimonials: Dispatch<React.SetStateAction<Testimonial[] | null>>;

  getTestimonialsError: string;
  setGetTestimonialsError: Dispatch<React.SetStateAction<string>>;

  updatingTestimonials: boolean;
  setUpdatingTestimonials: Dispatch<React.SetStateAction<boolean>>;

  updateTestimonialsError: string;
  setUpdateTestimonialsError: Dispatch<React.SetStateAction<string>>;
};

export const homepageContext = createContext<HomepageState | null>(null);
