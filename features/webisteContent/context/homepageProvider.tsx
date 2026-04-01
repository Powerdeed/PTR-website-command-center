"use client";

import { useState } from "react";
import { homepageContext } from "./homepageContext";
import { Homepage, homepageData, testimonials } from "../services/homepage";

export default function HomepageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [homepage, setHomepage] = useState<Homepage>(homepageData);

  const [testimonialData, setTestimonialData] = useState(testimonials);

  return (
    <homepageContext.Provider
      value={{
        homepage,
        setHomepage,
        testimonialData,
        setTestimonialData,
      }}
    >
      {children}
    </homepageContext.Provider>
  );
}
