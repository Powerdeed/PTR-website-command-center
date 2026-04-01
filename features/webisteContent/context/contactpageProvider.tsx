"use client";

import { useState } from "react";

import { contactpageContext } from "./contactpageContext";
import { Contacts, contacts } from "../services/contact";

export default function ContactpageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contactData, setContactData] = useState<Contacts>(contacts);

  return (
    <contactpageContext.Provider
      value={{
        contactData,
        setContactData,
      }}
    >
      {children}
    </contactpageContext.Provider>
  );
}
