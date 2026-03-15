"use client";

import { useState } from "react";

export default function useCount() {
  const [visibleCount, setVisibleCount] = useState(5);
  return { visibleCount, setVisibleCount };
}
