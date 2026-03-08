"use client";

import { useState } from "react";
import {
  aboutIntro,
  AboutIntro,
  hero,
  testimonials,
  Testimonial,
} from "@services/homepage";

export default function useHomePage() {
  const [heroSectionData, setHeroSectionData] = useState(hero);
  const [aboutSummaryData, setAboutSummaryData] =
    useState<AboutIntro[]>(aboutIntro);
  const [testimonialData, setTestimonialData] = useState(testimonials);

  const updateHeroContent = (key: string, data: string) =>
    setHeroSectionData((prev) => ({
      ...prev,
      [key]: data,
    }));

  const updateAboutIntro = (
    key: string,
    data: string | boolean,
    section: number,
  ) =>
    setAboutSummaryData((prev) =>
      prev.map((item, index) =>
        index === section ? { ...item, [key]: data } : item
      )
    );

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
    setHeroSectionData(hero);
    setAboutSummaryData(aboutIntro);
    setTestimonialData(testimonials);
  };

  const saveAllChanges = () => {};

  const handleImageUpload = () => {};

  return {
    heroSectionData,
    aboutSummaryData,
    testimonialData,
    updateAboutIntro,
    updateHeroContent,
    updateTestimonial,
    handleAddTestimonial,
    handleDeleteTestimonial,
    resetChanges,
    saveAllChanges,
    handleImageUpload,
  };
}
