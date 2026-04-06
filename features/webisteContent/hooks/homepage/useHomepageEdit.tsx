"use client";

import { useContext } from "react";

import {
  homepageData,
  testimonials,
} from "@features/webisteContent/services/homepage";

import { homepageContext } from "@features/webisteContent/context/homepageContext";
import {
  Homepage,
  Testimonial,
} from "@features/webisteContent/types/homePage.types";

export default function useHomePageEdit() {
  const homepageState = useContext(homepageContext);

  if (!homepageState)
    throw new Error("Home page context must be within a provider");

  const { homepage, setHomepage, testimonials, setTestimonials } =
    homepageState;

  const updateHomePageData = (
    key: string,
    innerKey: keyof Homepage,
    data: string | boolean,
    section?: number,
  ) => {
    if (!homepage) return;

    const { hero, aboutIntro } = homepage;

    if (innerKey === "hero") {
      setHomepage((prev) =>
        prev
          ? {
              ...prev,
              hero: { ...hero, [key]: data },
            }
          : prev,
      );
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
    setTestimonials((prev) => {
      if (!prev) return prev;

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
    setTestimonials((prev) =>
      prev
        ? [
            ...prev,
            {
              id: crypto.randomUUID(),
              name: "",
              position: "",
              industry: "",
              testimonial: "",
              profilePic: "",
            } as Testimonial,
          ]
        : prev,
    );
  };

  const handleDeleteTestimonial = (testimonialId: string) =>
    setTestimonials((prev) =>
      prev
        ? prev.filter((testimonial) => testimonial.id !== testimonialId)
        : prev,
    );

  const resetChanges = () => {
    setHomepage(homepageData);
    setTestimonials(testimonials);
  };

  const saveAllChanges = () => {};

  const handleImageUpload = () => {};

  return {
    updateHomePageData,
    updateTestimonial,
    handleAddTestimonial,
    handleDeleteTestimonial,
    resetChanges,
    saveAllChanges,
    handleImageUpload,
  };
}
