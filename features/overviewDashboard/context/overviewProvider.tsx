"use client";

import { useState } from "react";
import { overviewContext } from "./overviewContext";

export default function OverviewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visibleCount, setVisibleCount] = useState(5);
  return (
    <overviewContext.Provider value={{ visibleCount, setVisibleCount }}>
      {children}
    </overviewContext.Provider>
  );
}
