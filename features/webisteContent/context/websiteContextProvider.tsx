"use client";

import { useState } from "react";
import { websiteContentContext } from "./websiteContentContext";

export default function WebsiteContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("Home Page");

  return (
    <websiteContentContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </websiteContentContext.Provider>
  );
}
