import { apiRequest } from "@lib/api/apiRequest";
import { Homepage, NewTestimonial, Testimonial } from "../types/homePage.types";

export const getHomePageData = () =>
  apiRequest<Homepage[]>({
    method: "GET",
    url: "/homepage",
  });

export const updateHomePageData = (dataId: string, data: Homepage) =>
  apiRequest<Homepage>({
    method: "PUT",
    url: `/homepage/${dataId}`,
    data,
  });

export const getTestimonials = () =>
  apiRequest<Testimonial[]>({
    method: "GET",
    url: "/testimonials",
  });

export const addTestimonial = (data: NewTestimonial) =>
  apiRequest<Testimonial>({
    method: "POST",
    url: "/testimonials",
    data,
  });

export const updateTestimonialData = (data: Testimonial[]) =>
  apiRequest<{
    matchedCount: number;
    modifiedCount: number;
  }>({
    method: "PUT",
    url: "/testimonials",
    data,
  });

export const deleteTestimonialData = (testimonialId: string) =>
  apiRequest({
    method: "DELETE",
    url: `/testimonials/${testimonialId}`,
  });
