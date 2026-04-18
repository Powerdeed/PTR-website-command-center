"use client";

import { Testimonial } from "../../types/homePage.types";

import { createContext, Dispatch } from "react";

type TestimonialsState = {
  testimonials: Testimonial[];
  setTestimonials: Dispatch<React.SetStateAction<Testimonial[]>>;

  testimonialsPrev: Testimonial[] | null;
  setTestimonialsPrev: Dispatch<React.SetStateAction<Testimonial[] | null>>;

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

  refreshFetchTestimonials: boolean;
  setRefreshFetchTestimonials: Dispatch<React.SetStateAction<boolean>>;

  editedTestimonials: string[];
  setEditedTestimonials: Dispatch<React.SetStateAction<string[]>>;

  hasTestimonialsChanged: boolean;
  setHasTestimonialsChanged: Dispatch<React.SetStateAction<boolean>>;

  fetchingTestimonialsData: boolean;
  setFetchingTestimonialsData: Dispatch<React.SetStateAction<boolean>>;
};

export const testimonialsContext = createContext<TestimonialsState | null>(
  null,
);
