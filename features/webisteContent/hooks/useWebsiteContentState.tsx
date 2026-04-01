"use client";

import { useContext } from "react";
import { websiteContentContext } from "../context/websiteContentContext";
import { homepageContext } from "../context/homepageContext";
import { aboutpageContext } from "../context/aboutpageContext";
import { contactpageContext } from "../context/contactpageContext";

export default function useWebsiteContentState() {
  const wContextState = useContext(websiteContentContext);
  const homepageState = useContext(homepageContext);
  const aboutpageState = useContext(aboutpageContext);
  const contactpageState = useContext(contactpageContext);

  if (!wContextState || !homepageState || !aboutpageState || !contactpageState)
    throw new Error("Context must be within a provider");

  return {
    ...wContextState,
    ...homepageState,
    ...aboutpageState,
    ...contactpageState,
  };
}
