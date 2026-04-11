"use client";

import { useContext, useEffect } from "react";

import { testimonialsContext } from "../../context/homepage/testimonialsContext";

import {
  addTestimonial,
  deleteTestimonialData,
  getTestimonials,
  updateTestimonialData,
} from "../../services/testimonials";

import { DEFAULT_TESTIMONIAL } from "../../constants/defaultTestimonial";

import { execute } from "@lib/api/execute";

export default function useTestimonialsApi() {
  const testimonialsState = useContext(testimonialsContext);

  if (!testimonialsState)
    throw new Error("Home page context must be within a provider");

  const {
    testimonials,
    setTestimonials,
    setTestimonialsPrev,
    setGetTestimonialsError,
    setTestimonialsError,
    setAddingTestimonials,
    setAddTestimonialsError,
    setUpdatingTestimonials,
    editedTestimonials,
    setEditedTestimonials,
    setDeletingTestimonials,
    setFetchingTestimonialsData,
    setHasTestimonialsChanged,

    refreshFetchTestimonials,
  } = testimonialsState;

  useEffect(() => {
    const fetchData = async () =>
      await execute(getTestimonials, {
        setLoading: setFetchingTestimonialsData,
        setError: setGetTestimonialsError,
        onSuccess: (testimonials) => {
          if (testimonials) {
            setTestimonials(testimonials);
            setTestimonialsPrev(testimonials);
            setHasTestimonialsChanged(false);
          }
        },
      });

    fetchData();
  }, [
    refreshFetchTestimonials,
    setTestimonials,
    setTestimonialsPrev,
    setFetchingTestimonialsData,
    setGetTestimonialsError,
    setHasTestimonialsChanged,
  ]);

  const handleAddTestimonial = async () => {
    if (!testimonials) return;

    await execute(() => addTestimonial(DEFAULT_TESTIMONIAL), {
      setLoading: setAddingTestimonials,
      setError: setAddTestimonialsError,
      onSuccess: (newTestimonial) => {
        setTestimonials((prev) => [...prev, newTestimonial]);
      },
    });
  };

  const handleSaveTestimonials = async () => {
    if (!testimonials) return;

    await execute(
      () =>
        updateTestimonialData(
          testimonials.filter((t) => editedTestimonials.includes(t._id)),
        ),
      {
        setLoading: setUpdatingTestimonials,
        setError: setTestimonialsError,
        onSuccess: () => {
          setEditedTestimonials([]);
          setHasTestimonialsChanged(false);
        },
      },
    );
  };

  const handleDeleteTestimonial = async (testimonialId: string) =>
    await execute(() => deleteTestimonialData(testimonialId), {
      setLoading: setDeletingTestimonials,
      setError: setTestimonialsError,
      onSuccess: () => {
        setTestimonials((prev) =>
          prev
            ? prev.filter((testimonial) => testimonial._id !== testimonialId)
            : prev,
        );
      },
    });

  return {
    handleSaveTestimonials,
    handleAddTestimonial,
    handleDeleteTestimonial,
  };
}
