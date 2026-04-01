"use client";

import { createContext, Dispatch } from "react";
import { Homepage, Testimonial } from "../services/homepage";

type HomepageState = {
  homepage: Homepage;
  setHomepage: Dispatch<React.SetStateAction<Homepage>>;

  testimonialData: Testimonial[];
  setTestimonialData: Dispatch<React.SetStateAction<Testimonial[]>>;
};

export const homepageContext = createContext<HomepageState | null>(null);
