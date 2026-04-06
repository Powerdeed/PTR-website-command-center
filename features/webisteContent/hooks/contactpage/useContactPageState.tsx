"use client";

import { useContext } from "react";

import { contactpageContext } from "../../context/contactpageContext";

export default function useContactPageState() {
  const contactpageState = useContext(contactpageContext);

  if (!contactpageState) throw new Error("Context must be within a provider");

  return {
    ...contactpageState,
  };
}
