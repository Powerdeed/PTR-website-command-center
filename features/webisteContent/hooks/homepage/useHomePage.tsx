"use client";

import { useContext } from "react";

import {
  homepageData,
  testimonials,
  Testimonial,
  Homepage,
} from "@features/webisteContent/services/homepage";
import { homepageContext } from "@features/webisteContent/context/homepageContext";

export default function useHomePage() {
  const homepageState = useContext(homepageContext);

  if (!homepageState)
    throw new Error("Home page context must be within a provider");

  const { homepage, setHomepage, testimonialData, setTestimonialData } =
    homepageState;

  const updateHomePageData = (
    key: string,
    innerKey: keyof Homepage,
    data: string | boolean,
    section?: number,
  ) => {
    const { hero, aboutIntro } = homepage;

    if (innerKey === "hero") {
      setHomepage((prev) => ({
        ...prev,
        hero: { ...hero, [key]: data },
      }));
    } else if (innerKey === "aboutIntro") {
      setHomepage(() => {
        const updatedIntro = aboutIntro.map((item, index) =>
          index === section ? { ...item, [key]: data } : item,
        );
        return {
          hero,
          aboutIntro: updatedIntro,
        };
      });
    }
  };

  const updateTestimonial = (
    key: string,
    data: string,
    testimonialId: string,
  ) =>
    setTestimonialData((prev) => {
      const updatedTestimonials = prev.map((testimonial) => {
        if (testimonial.id === testimonialId) {
          return {
            ...testimonial,
            [key]: data,
          };
        }
        return testimonial;
      });

      return updatedTestimonials;
    });

  const handleAddTestimonial = () => {
    setTestimonialData((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        position: "",
        industry: "",
        testimonial: "",
        profilePic: "",
      } as Testimonial,
    ]);
  };

  const handleDeleteTestimonial = (testimonialId: string) =>
    setTestimonialData((prev) =>
      prev.filter((testimonial) => testimonial.id !== testimonialId),
    );

  const resetChanges = () => {
    setHomepage(homepageData);
    setTestimonialData(testimonials);
  };

  const saveAllChanges = () => {};

  const handleImageUpload = () => {};

  return {
    homepage,
    testimonialData,
    updateHomePageData,
    updateTestimonial,
    handleAddTestimonial,
    handleDeleteTestimonial,
    resetChanges,
    saveAllChanges,
    handleImageUpload,
  };
}
