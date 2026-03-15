"use client";

import { useState } from "react";

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState("Home Page");
  return { activeSection, setActiveSection };
}
