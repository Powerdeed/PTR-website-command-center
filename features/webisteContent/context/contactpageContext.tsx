"use client";

import { createContext, Dispatch } from "react";

import { Contacts } from "../services/contact";

type ContactpageState = {
  contactData: Contacts;
  setContactData: Dispatch<React.SetStateAction<Contacts>>;
};

export const contactpageContext = createContext<ContactpageState | null>(null);
